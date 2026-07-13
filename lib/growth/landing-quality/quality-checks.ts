import { PRODUCTION_APP_URL } from "@/lib/app-url";
import { findCategoriesForEvergreenPage } from "@/lib/discovery/discovery-utils";
import { isSnippetExperimentBlocked } from "@/lib/growth/snippet-optimization/experiment-registry";
import {
  buildLandingPageAuditContext,
  collectVisibleLinkSlugs,
  countInternalLinks,
  countVisibleSections,
  getIntroText,
  hasDuplicateVisibleLinks,
  measureContentFieldCompleteness,
} from "@/lib/growth/landing-quality/page-source";
import type {
  DimensionScores,
  FindingConfidence,
  FindingSeverity,
  LandingPageAuditContext,
  LandingPageScorecard,
  QualityDimension,
  QualityFinding,
  QualityRecommendation,
} from "@/lib/growth/landing-quality/types";
import { buildLandingPageStructuredData } from "@/lib/landing-pages/landing-page-schema";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import { introOverlapRatio } from "@/lib/landing-pages/content-experience";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";

const GENERIC_CTA_PATTERNS = [
  /^start (the )?game$/i,
  /^play now$/i,
  /^get started$/i,
  /^create game$/i,
];

function finding(
  dimension: QualityDimension,
  severity: FindingSeverity,
  confidence: FindingConfidence,
  message: string,
  recommendation: QualityRecommendation,
  extras?: Partial<QualityFinding>,
): QualityFinding {
  return {
    dimension,
    severity,
    confidence,
    message,
    recommendation,
    ...extras,
  };
}

function scoreFromFindings(
  findings: QualityFinding[],
  dimension: QualityDimension,
): number {
  const penalties: Record<FindingSeverity, number> = {
    blocking: 40,
    important: 25,
    moderate: 12,
    minor: 5,
    informational: 0,
  };

  let score = 100;
  for (const entry of findings.filter((item) => item.dimension === dimension)) {
    score -= penalties[entry.severity];
  }

  return Math.max(0, Math.min(100, score));
}

function tokenOverlap(left: string, right: string): number {
  const normalize = (value: string) =>
    value.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
  const leftTokens = new Set(normalize(left).split(" ").filter(Boolean));
  const rightTokens = new Set(normalize(right).split(" ").filter(Boolean));

  if (leftTokens.size === 0 || rightTokens.size === 0) {
    return 0;
  }

  let intersection = 0;
  for (const token of leftTokens) {
    if (rightTokens.has(token)) {
      intersection += 1;
    }
  }

  return intersection / Math.max(leftTokens.size, rightTokens.size);
}

function resolvePrimaryRecommendation(
  findings: QualityFinding[],
  score: number,
  activeExperimentProtected: boolean,
): QualityRecommendation {
  if (activeExperimentProtected) {
    return "Active experiment — do not modify relevant metadata or experimental copy.";
  }

  const verifiedBlocking = findings.some(
    (entry) =>
      entry.severity === "blocking" &&
      entry.confidence === "verified" &&
      entry.recommendation === "Fix verified technical issue",
  );
  if (verifiedBlocking) {
    return "Fix verified technical issue";
  }

  if (
    score >= 80 &&
    findings.filter((entry) => entry.severity !== "informational").length <= 1
  ) {
    return "Maintain";
  }

  const overlapFinding = findings.find(
    (entry) => entry.recommendation === "Review overlap with another page",
  );
  if (overlapFinding) {
    return "Review overlap with another page";
  }

  const linkFinding = findings.find(
    (entry) =>
      entry.dimension === "internalLinking" &&
      (entry.severity === "blocking" || entry.severity === "important"),
  );
  if (linkFinding) {
    return "Review internal links";
  }

  const ctaFinding = findings.find((entry) => entry.dimension === "conversionClarity");
  if (ctaFinding && ctaFinding.severity !== "informational") {
    return "Review CTA clarity";
  }

  const contentFinding = findings.find(
    (entry) =>
      entry.dimension === "contentUsefulness" &&
      (entry.severity === "important" || entry.severity === "moderate"),
  );
  if (contentFinding) {
    return "Improve content depth";
  }

  if (score < 70) {
    return "Human review recommended";
  }

  return "Insufficient evidence";
}

function computeHumanReviewUrgency(findings: QualityFinding[]): number {
  const weights: Record<FindingSeverity, number> = {
    blocking: 40,
    important: 22,
    moderate: 10,
    minor: 4,
    informational: 0,
  };

  let urgency = 0;

  for (const entry of findings) {
    if (
      entry.severity === "informational" ||
      entry.recommendation === "Maintain" ||
      entry.message.startsWith("Active experiment") ||
      entry.message.startsWith("Landing page template exposes")
    ) {
      continue;
    }

    if (
      entry.dimension === "metadataConsistency" &&
      entry.requiresSearchConsoleEvidence
    ) {
      continue;
    }

    urgency += weights[entry.severity];

    if (entry.confidence === "verified" && entry.severity !== "minor") {
      urgency += 4;
    }
  }

  return urgency;
}

function assignReviewPriorities(
  scorecards: LandingPageScorecard[],
): LandingPageScorecard[] {
  const ranked = [...scorecards].sort(
    (left, right) =>
      right.humanReviewUrgency - left.humanReviewUrgency ||
      left.internalQualityScore - right.internalQualityScore,
  );

  const highCount = Math.min(8, ranked.length);
  const moderateCount = Math.min(17, Math.max(0, ranked.length - highCount));

  return scorecards.map((scorecard) => {
    const rank = ranked.findIndex((entry) => entry.slug === scorecard.slug);
    let reviewPriority: LandingPageScorecard["reviewPriority"] = "maintain";

    if (rank >= 0 && rank < highCount && scorecard.humanReviewUrgency > 0) {
      reviewPriority = "high";
    } else if (
      rank >= highCount &&
      rank < highCount + moderateCount &&
      scorecard.humanReviewUrgency > 0
    ) {
      reviewPriority = "moderate";
    }

    return {
      ...scorecard,
      reviewPriority,
    };
  });
}

function resolveReviewPriority(
  urgency: number,
): LandingPageScorecard["reviewPriority"] {
  if (urgency === 0) {
    return "maintain";
  }

  return "moderate";
}

function resolveConfidence(findings: QualityFinding[]): FindingConfidence {
  if (findings.some((entry) => entry.confidence === "verified")) {
    return "verified";
  }

  if (findings.some((entry) => entry.confidence === "strong signal")) {
    return "strong signal";
  }

  if (findings.length === 0) {
    return "verified";
  }

  return "heuristic";
}

function auditIntentClarity(page: LandingPageData): QualityFinding[] {
  const findings: QualityFinding[] = [];
  const intent = getIntentBySlug(page.slug);

  if (!intent) {
    findings.push(
      finding(
        "intentClarity",
        "blocking",
        "verified",
        "No intent registry entry for this live landing page.",
        "Fix verified technical issue",
      ),
    );
    return findings;
  }

  if (!intent.searchIntent.trim()) {
    findings.push(
      finding(
        "intentClarity",
        "important",
        "verified",
        "Intent registry searchIntent is empty.",
        "Review intent alignment",
      ),
    );
  }

  const titleOverlap = tokenOverlap(page.h1, page.title);
  if (titleOverlap < 0.35) {
    findings.push(
      finding(
        "intentClarity",
        "moderate",
        "heuristic",
        "H1 and page title share few tokens — review intent alignment.",
        "Review intent alignment",
      ),
    );
  }

  const slugTokens = page.slug.split("-").filter((token) => token.length > 2);
  const h1Normalized = page.h1.toLowerCase();
  const slugInHeading = slugTokens.some((token) => h1Normalized.includes(token));
  if (!slugInHeading && slugTokens.length >= 2) {
    findings.push(
      finding(
        "intentClarity",
        "minor",
        "heuristic",
        "Route slug tokens are not reflected in the visible H1.",
        "Review intent alignment",
      ),
    );
  }

  const metaTitleOverlap = tokenOverlap(page.metaTitle, page.h1);
  if (metaTitleOverlap < 0.25) {
    findings.push(
      finding(
        "intentClarity",
        "moderate",
        "heuristic",
        "Meta title and H1 appear misaligned.",
        "Review intent alignment",
      ),
    );
  }

  return findings;
}

function auditContentUsefulness(
  page: LandingPageData,
  context: LandingPageAuditContext,
): QualityFinding[] {
  const findings: QualityFinding[] = [];
  const introLength = getIntroText(page).length;
  const portfolioMedian = context.portfolio.introLengthMedian;

  if (introLength < portfolioMedian * 0.55 && introLength < portfolioMedian - 80) {
    findings.push(
      finding(
        "contentUsefulness",
        "important",
        "strong signal",
        "Introduction substantially thinner than portfolio median.",
        "Improve content depth",
      ),
    );
  } else if (introLength < portfolioMedian * 0.75) {
    findings.push(
      finding(
        "contentUsefulness",
        "moderate",
        "strong signal",
        "Introduction shorter than portfolio median.",
        "Improve content depth",
      ),
    );
  }

  if (!page.intentSummary.trim()) {
    findings.push(
      finding(
        "contentUsefulness",
        "blocking",
        "verified",
        "Intent summary is empty.",
        "Fix verified technical issue",
      ),
    );
  }

  if (page.howToPlay.steps.length === 0) {
    findings.push(
      finding(
        "contentUsefulness",
        "important",
        "verified",
        "How-to-play steps are missing.",
        "Fix verified technical issue",
      ),
    );
  }

  if (page.exampleQuestions.length === 0) {
    findings.push(
      finding(
        "contentUsefulness",
        "moderate",
        "verified",
        "Example questions section is empty.",
        "Improve content depth",
      ),
    );
  }

  const completeness = measureContentFieldCompleteness(page);
  if (completeness < context.portfolio.contentFieldCompletenessMedian - 20) {
    findings.push(
      finding(
        "contentUsefulness",
        "moderate",
        "strong signal",
        "Content field completeness is below portfolio median.",
        "Improve content depth",
      ),
    );
  }

  return findings;
}

function auditConversionClarity(page: LandingPageData): QualityFinding[] {
  const findings: QualityFinding[] = [];

  if (!page.primaryCta.label.trim() || !page.primaryCta.href.trim()) {
    findings.push(
      finding(
        "conversionClarity",
        "blocking",
        "verified",
        "Primary CTA label or href is missing.",
        "Fix verified technical issue",
      ),
    );
  }

  if (
    page.secondaryCta &&
    page.secondaryCta.label.trim() &&
    page.secondaryCta.label === page.primaryCta.label &&
    page.secondaryCta.href !== page.primaryCta.href
  ) {
    findings.push(
      finding(
        "conversionClarity",
        "moderate",
        "verified",
        "Primary and secondary CTAs share the same label but different destinations.",
        "Review CTA clarity",
      ),
    );
  }

  if (GENERIC_CTA_PATTERNS.some((pattern) => pattern.test(page.primaryCta.label.trim()))) {
    findings.push(
      finding(
        "conversionClarity",
        "moderate",
        "heuristic",
        "Primary CTA wording looks generic for this page intent.",
        "Review CTA clarity",
      ),
    );
  }

  if (!page.finalCtaTitle.trim() || !page.finalCtaSubtitle.trim()) {
    findings.push(
      finding(
        "conversionClarity",
        "important",
        "verified",
        "Final CTA block is incomplete.",
        "Review CTA clarity",
      ),
    );
  }

  if (!page.primaryCta.href.includes("create-game")) {
    findings.push(
      finding(
        "conversionClarity",
        "minor",
        "verified",
        "Primary CTA does not point to the standard game creation anchor.",
        "Review CTA clarity",
      ),
    );
  }

  return findings;
}

function auditInternalLinking(
  page: LandingPageData,
  context: LandingPageAuditContext,
): QualityFinding[] {
  const findings: QualityFinding[] = [];
  const categories = findCategoriesForEvergreenPage(page.slug);
  const inboundCount = context.inboundLinkCounts.get(page.slug) ?? 0;
  const internalLinkCount = countInternalLinks(page);

  if (categories.length === 0) {
    findings.push(
      finding(
        "internalLinking",
        "moderate",
        "verified",
        "No category hub relationship detected in discovery registries.",
        "Review internal links",
      ),
    );
  }

  if (internalLinkCount < context.portfolio.internalLinkCountMedian - 2) {
    findings.push(
      finding(
        "internalLinking",
        "moderate",
        "strong signal",
        "Fewer visible internal links than portfolio median.",
        "Review internal links",
      ),
    );
  }

  if (categories.length === 0 && inboundCount === 0) {
    findings.push(
      finding(
        "internalLinking",
        "important",
        "strong signal",
        "Possible orphan signal — no category relationship and no inbound landing-page links.",
        "Review internal links",
      ),
    );
  }

  const duplicateLinks = hasDuplicateVisibleLinks(page);
  if (duplicateLinks.length > 0) {
    findings.push(
      finding(
        "internalLinking",
        "moderate",
        "verified",
        `Duplicate visible internal links: ${duplicateLinks.join(", ")}.`,
        "Fix verified technical issue",
      ),
    );
  }

  const unavailableLinks = collectVisibleLinkSlugs(page).length === 0 &&
    [
      ...page.relatedPages,
      ...page.youMayAlsoLike,
      ...page.playersAlsoEnjoy,
    ].some((entry) => !entry.available);

  if (unavailableLinks) {
    findings.push(
      finding(
        "internalLinking",
        "informational",
        "verified",
        "Related link sections include unavailable targets (expected for planned pages).",
        "Insufficient evidence",
      ),
    );
  }

  const linkIssues = context.linkValidationIssuesBySlug.get(page.slug) ?? [];
  for (const message of linkIssues) {
    findings.push(
      finding(
        "internalLinking",
        "blocking",
        "verified",
        message,
        "Fix verified technical issue",
      ),
    );
  }

  return findings;
}

function auditMetadataConsistency(
  page: LandingPageData,
  context: LandingPageAuditContext,
): QualityFinding[] {
  const findings: QualityFinding[] = [];

  if (!page.metaTitle.trim()) {
    findings.push(
      finding(
        "metadataConsistency",
        "blocking",
        "verified",
        "Meta title is missing.",
        "Fix verified technical issue",
      ),
    );
  }

  if (!page.metaDescription.trim()) {
    findings.push(
      finding(
        "metadataConsistency",
        "blocking",
        "verified",
        "Meta description is missing.",
        "Fix verified technical issue",
      ),
    );
  }

  if (!page.canonicalUrl.trim()) {
    findings.push(
      finding(
        "metadataConsistency",
        "blocking",
        "verified",
        "Canonical URL is missing.",
        "Fix verified technical issue",
      ),
    );
  } else if (page.canonicalUrl !== `${PRODUCTION_APP_URL}/${page.slug}`) {
    findings.push(
      finding(
        "metadataConsistency",
        "important",
        "verified",
        "Canonical URL does not match the expected production slug URL.",
        "Fix verified technical issue",
      ),
    );
  }

  if (page.metaTitle.length < 25 || page.metaTitle.length > 70) {
    findings.push(
      finding(
        "metadataConsistency",
        "minor",
        "heuristic",
        "Meta title length is materially unusual for this portfolio.",
        "Insufficient evidence",
        { requiresSearchConsoleEvidence: true },
      ),
    );
  }

  if (page.metaDescription.length < 90 || page.metaDescription.length > 180) {
    findings.push(
      finding(
        "metadataConsistency",
        "minor",
        "heuristic",
        "Meta description length is materially unusual for this portfolio.",
        "Insufficient evidence",
        { requiresSearchConsoleEvidence: true },
      ),
    );
  }

  const metadataIssues = context.metadataIssuesBySlug.get(page.slug) ?? [];
  for (const message of metadataIssues) {
    findings.push(
      finding(
        "metadataConsistency",
        message.toLowerCase().includes("duplicate") ? "moderate" : "important",
        "verified",
        message,
        message.toLowerCase().includes("duplicate")
          ? "Insufficient evidence"
          : "Fix verified technical issue",
        { requiresSearchConsoleEvidence: message.toLowerCase().includes("duplicate") },
      ),
    );
  }

  return findings;
}

function auditStructuredData(page: LandingPageData): QualityFinding[] {
  const findings: QualityFinding[] = [];

  try {
    const structuredData = buildLandingPageStructuredData(page);
    const graph = Array.isArray(structuredData["@graph"])
      ? (structuredData["@graph"] as Array<Record<string, unknown>>)
      : [];

    const faqNode = graph.find((node) => node["@type"] === "FAQPage");
    if (page.faq.length > 0 && !faqNode) {
      findings.push(
        finding(
          "structuredData",
          "important",
          "verified",
          "Visible FAQ exists but FAQPage schema node is missing.",
          "Fix verified technical issue",
        ),
      );
    }

    if (page.faq.length === 0 && faqNode) {
      findings.push(
        finding(
          "structuredData",
          "important",
          "verified",
          "FAQPage schema exists without visible FAQ content.",
          "Fix verified technical issue",
        ),
      );
    }

    const webPageNode = graph.find((node) => node["@type"] === "WebPage");
    const webPageUrl =
      typeof webPageNode?.url === "string" ? webPageNode.url : undefined;
    if (webPageUrl && webPageUrl !== page.canonicalUrl) {
      findings.push(
        finding(
          "structuredData",
          "important",
          "verified",
          "WebPage schema URL does not match canonical URL.",
          "Fix verified technical issue",
        ),
      );
    }
  } catch (error) {
    findings.push(
      finding(
        "structuredData",
        "blocking",
        "verified",
        `Structured data generation failed: ${error instanceof Error ? error.message : "unknown error"}.`,
        "Fix verified technical issue",
      ),
    );
  }

  return findings;
}

function auditAccessibilityStructure(page: LandingPageData): QualityFinding[] {
  const findings: QualityFinding[] = [];

  if (!page.h1.trim()) {
    findings.push(
      finding(
        "accessibilityStructure",
        "blocking",
        "verified",
        "Visible H1 text is missing from page data.",
        "Fix verified technical issue",
      ),
    );
  }

  if (page.contentExperience.sectionOrder.length === 0) {
    findings.push(
      finding(
        "accessibilityStructure",
        "important",
        "verified",
        "Experience section order is empty.",
        "Fix verified technical issue",
      ),
    );
  }

  const linksMissingLabels = [
    ...page.relatedPages,
    ...page.youMayAlsoLike,
    ...page.playersAlsoEnjoy,
  ].filter(
    (entry) =>
      entry.available &&
      (!entry.linkLabel || entry.linkLabel.trim().length < 4),
  );

  if (linksMissingLabels.length > 0) {
    findings.push(
      finding(
        "accessibilityStructure",
        "moderate",
        "strong signal",
        `${linksMissingLabels.length} internal link(s) use weak or missing descriptive labels.`,
        "Human review recommended",
      ),
    );
  }

  findings.push(
    finding(
      "accessibilityStructure",
      "informational",
      "verified",
      "Landing page template exposes one hero H1 and a main landmark via shared IntentLandingPage component.",
      "Maintain",
    ),
  );

  return findings;
}

function auditUniquenessRisk(
  page: LandingPageData,
  context: LandingPageAuditContext,
): QualityFinding[] {
  const findings: QualityFinding[] = [];
  const intro = getIntroText(page);

  let highestIntroOverlap = 0;
  let highestIntroSlug = "";

  for (const otherPage of context.pages) {
    if (otherPage.slug === page.slug) {
      continue;
    }

    const overlap = introOverlapRatio(intro, getIntroText(otherPage));
    if (overlap > highestIntroOverlap) {
      highestIntroOverlap = overlap;
      highestIntroSlug = otherPage.slug;
    }
  }

  if (highestIntroOverlap >= 0.78) {
    findings.push(
      finding(
        "uniquenessRisk",
        "important",
        "strong signal",
        `Introduction overlaps heavily with /${highestIntroSlug}.`,
        "Review overlap with another page",
        { relatedSlug: highestIntroSlug },
      ),
    );
  } else if (highestIntroOverlap >= 0.62) {
    findings.push(
      finding(
        "uniquenessRisk",
        "moderate",
        "strong signal",
        `Possible intro overlap with /${highestIntroSlug}.`,
        "Review overlap with another page",
        { relatedSlug: highestIntroSlug },
      ),
    );
  }

  const faqQuestions = page.faq.map((item) => item.question.toLowerCase());
  for (const otherPage of context.pages) {
    if (otherPage.slug === page.slug) {
      continue;
    }

    const sharedQuestions = otherPage.faq.filter((item) =>
      faqQuestions.includes(item.question.toLowerCase()),
    ).length;

    if (sharedQuestions >= 6) {
      findings.push(
        finding(
          "uniquenessRisk",
          "important",
          "strong signal",
          `FAQ set overlaps with /${otherPage.slug} (${sharedQuestions} shared questions).`,
          "Review FAQ usefulness",
          { relatedSlug: otherPage.slug },
        ),
      );
      break;
    }

    if (sharedQuestions >= 4) {
      findings.push(
        finding(
          "uniquenessRisk",
          "moderate",
          "strong signal",
          `FAQ set overlaps with /${otherPage.slug} (${sharedQuestions} shared questions).`,
          "Review FAQ usefulness",
          { relatedSlug: otherPage.slug },
        ),
      );
      break;
    }
  }

  const intent = getIntentBySlug(page.slug);
  if (intent) {
    const similarIntentPages = context.pages.filter((otherPage) => {
      if (otherPage.slug === page.slug) {
        return false;
      }

      const otherIntent = getIntentBySlug(otherPage.slug);
      return (
        otherIntent != null &&
        otherIntent.intentCategory === intent.intentCategory &&
        otherIntent.audience === intent.audience
      );
    });

    if (similarIntentPages.length >= 2) {
      findings.push(
        finding(
          "uniquenessRisk",
          "minor",
          "heuristic",
          "Multiple routes share the same intent category and audience in the registry.",
          "Review overlap with another page",
        ),
      );
    }
  }

  if (findings.length === 0) {
    findings.push(
      finding(
        "uniquenessRisk",
        "informational",
        "strong signal",
        "Low uniqueness risk based on conservative intro and FAQ overlap checks.",
        "Maintain",
      ),
    );
  }

  return findings;
}

export function auditLandingPage(
  page: LandingPageData,
  context: LandingPageAuditContext,
): LandingPageScorecard {
  const activeExperimentProtected = isSnippetExperimentBlocked(page.slug);
  const findings: QualityFinding[] = [
    ...auditIntentClarity(page),
    ...auditContentUsefulness(page, context),
    ...auditConversionClarity(page),
    ...auditInternalLinking(page, context),
    ...auditMetadataConsistency(page, context),
    ...auditStructuredData(page),
    ...auditAccessibilityStructure(page),
    ...auditUniquenessRisk(page, context),
  ];

  if (activeExperimentProtected) {
    findings.unshift(
      finding(
        "metadataConsistency",
        "informational",
        "verified",
        "Active experiment — do not modify relevant metadata or experimental copy.",
        "Active experiment — do not modify relevant metadata or experimental copy.",
      ),
    );
  }

  const dimensionScores: DimensionScores = {
    intentClarity: scoreFromFindings(findings, "intentClarity"),
    contentUsefulness: scoreFromFindings(findings, "contentUsefulness"),
    conversionClarity: scoreFromFindings(findings, "conversionClarity"),
    internalLinking: scoreFromFindings(findings, "internalLinking"),
    metadataConsistency: scoreFromFindings(findings, "metadataConsistency"),
    structuredData: scoreFromFindings(findings, "structuredData"),
    accessibilityStructure: scoreFromFindings(findings, "accessibilityStructure"),
    uniquenessRisk: scoreFromFindings(findings, "uniquenessRisk"),
  };

  const internalQualityScore = Math.round(
    dimensionScores.intentClarity * 0.2 +
      dimensionScores.contentUsefulness * 0.25 +
      dimensionScores.conversionClarity * 0.15 +
      dimensionScores.internalLinking * 0.2 +
      dimensionScores.metadataConsistency * 0.05 +
      dimensionScores.structuredData * 0.05 +
      dimensionScores.accessibilityStructure * 0.05 +
      dimensionScores.uniquenessRisk * 0.05,
  );

  const verifiedIssueCount = findings.filter(
    (entry) =>
      entry.confidence === "verified" &&
      entry.severity !== "informational" &&
      entry.recommendation !== "Maintain",
  ).length;

  const humanReviewUrgency = computeHumanReviewUrgency(findings);

  return {
    slug: page.slug,
    path: `/${page.slug}`,
    title: page.title,
    internalQualityScore,
    humanReviewUrgency,
    dimensionScores,
    findings,
    primaryRecommendation: resolvePrimaryRecommendation(
      findings,
      internalQualityScore,
      activeExperimentProtected,
    ),
    reviewPriority: resolveReviewPriority(humanReviewUrgency),
    confidence: resolveConfidence(findings),
    activeExperimentProtected,
    verifiedIssueCount,
    stats: {
      introLength: getIntroText(page).length,
      faqCount: page.faq.length,
      visibleSectionCount: countVisibleSections(page),
      internalLinkCount: countInternalLinks(page),
      contentFieldCompleteness: measureContentFieldCompleteness(page),
      categoryRelationships: findCategoriesForEvergreenPage(page.slug).length,
      inboundLinkCount: context.inboundLinkCounts.get(page.slug) ?? 0,
    },
  };
}

export function auditAllLandingPages(
  context: LandingPageAuditContext = buildLandingPageAuditContext(),
): LandingPageScorecard[] {
  const scorecards = context.pages.map((page) => auditLandingPage(page, context));
  return assignReviewPriorities(scorecards).sort(
    (left, right) =>
      right.humanReviewUrgency - left.humanReviewUrgency ||
      left.internalQualityScore - right.internalQualityScore,
  );
}

export function findOverlapReviewPairs(
  scorecards: LandingPageScorecard[],
): Array<{
  slugA: string;
  slugB: string;
  overlapType: string;
  confidence: FindingConfidence;
  label: "low uniqueness risk" | "possible overlap" | "needs human comparison";
}> {
  const pairs: Array<{
    slugA: string;
    slugB: string;
    overlapType: string;
    confidence: FindingConfidence;
    label: "low uniqueness risk" | "possible overlap" | "needs human comparison";
  }> = [];

  for (const scorecard of scorecards) {
    for (const entry of scorecard.findings) {
      if (!entry.relatedSlug) {
        continue;
      }

      const slugA = scorecard.slug;
      const slugB = entry.relatedSlug;
      const pairKey = [slugA, slugB].sort().join("|");
      if (pairs.some((pair) => [pair.slugA, pair.slugB].sort().join("|") === pairKey)) {
        continue;
      }

      const label =
        entry.severity === "important"
          ? "needs human comparison"
          : entry.severity === "moderate"
            ? "possible overlap"
            : "low uniqueness risk";

      pairs.push({
        slugA,
        slugB,
        overlapType: entry.message,
        confidence: entry.confidence,
        label,
      });
    }
  }

  return pairs.sort((left, right) => left.label.localeCompare(right.label));
}

export function collectVerifiedTechnicalIssues(
  scorecards: LandingPageScorecard[],
): QualityFinding[] {
  const issues: QualityFinding[] = [];

  for (const scorecard of scorecards) {
    for (const entry of scorecard.findings) {
      if (
        entry.confidence === "verified" &&
        (entry.severity === "blocking" || entry.severity === "important") &&
        entry.recommendation === "Fix verified technical issue"
      ) {
        issues.push({
          ...entry,
          message: `/${scorecard.slug}: ${entry.message}`,
        });
      }
    }
  }

  return issues;
}

export function collectInternalLinkingGaps(
  scorecards: LandingPageScorecard[],
): Array<{ slug: string; message: string; confidence: FindingConfidence }> {
  return scorecards.flatMap((scorecard) =>
    scorecard.findings
      .filter((entry) => entry.dimension === "internalLinking")
      .filter((entry) => entry.severity === "important" || entry.severity === "moderate")
      .map((entry) => ({
        slug: scorecard.slug,
        message: entry.message,
        confidence: entry.confidence,
      })),
  );
}

export function collectMetadataFindingsRequiringScEvidence(
  scorecards: LandingPageScorecard[],
): QualityFinding[] {
  return scorecards.flatMap((scorecard) =>
    scorecard.findings
      .filter((entry) => entry.dimension === "metadataConsistency")
      .filter(
        (entry) =>
          entry.requiresSearchConsoleEvidence ||
          entry.message.toLowerCase().includes("duplicate"),
      )
      .map((entry) => ({
        ...entry,
        message: `/${scorecard.slug}: ${entry.message} Needs Search Console evidence before production change.`,
        requiresSearchConsoleEvidence: true,
      })),
  );
}
