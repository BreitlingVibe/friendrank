import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import { getLiveIntents } from "@/lib/landing-pages/planning/intent-registry";
import { validateLandingPageInternalLinks } from "@/lib/entities/validation/internal-link-validation";
import { validateMetadataConsistency } from "@/lib/seo/validation/metadata-validation";
import type {
  LandingPageAuditContext,
  PortfolioStats,
} from "@/lib/growth/landing-quality/types";

function median(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }

  const sorted = [...values].sort((left, right) => left - right);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return Math.round((sorted[middle - 1]! + sorted[middle]!) / 2);
  }

  return sorted[middle]!;
}

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

export function getEligibleLandingPages(): LandingPageData[] {
  const liveSlugs = new Set(getLiveIntents().map((intent) => intent.slug));
  return LANDING_PAGES.filter((page) => liveSlugs.has(page.slug));
}

export function getIntroText(page: LandingPageData): string {
  return [
    page.heroSubtitle,
    page.intentLead ?? "",
    page.contentQuality.enhancedHeroSubtitle,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();
}

export function countVisibleSections(page: LandingPageData): number {
  return (
    page.contentExperience.sectionOrder.length +
    page.contentExperience.tailSectionOrder.length +
    (page.faq.length > 0 ? 1 : 0)
  );
}

export function countInternalLinks(page: LandingPageData): number {
  const sections = [
    ...page.relatedPages,
    ...page.youMayAlsoLike,
    ...page.playersAlsoEnjoy,
    ...page.popularSearches
      .filter((entry) => entry.kind === "landing")
      .map((entry) => ({
        slug: entry.slug,
        available: true,
      })),
  ];

  const seen = new Set<string>();
  let count = 0;

  for (const entry of sections) {
    if (!entry.available || seen.has(entry.slug)) {
      continue;
    }

    seen.add(entry.slug);
    count += 1;
  }

  return count;
}

export function measureContentFieldCompleteness(page: LandingPageData): number {
  const quality = page.contentQuality;
  const fields = [
    page.heroSubtitle,
    page.intentSummary,
    quality.goodFor.paragraphs.join(" "),
    quality.whenToUse.bullets.join(" "),
    quality.whatMakesDifferent.bullets.join(" "),
    quality.quickSetup.steps.join(" "),
    page.howToPlay.steps.map((step) => step.description).join(" "),
    page.faq.map((item) => item.answer).join(" "),
  ];

  const nonEmpty = fields.filter((value) => value.trim().length > 0).length;
  return Math.round((nonEmpty / fields.length) * 100);
}

export function buildPortfolioStats(pages: LandingPageData[]): PortfolioStats {
  const introLengths = pages.map((page) => getIntroText(page).length);
  const faqCounts = pages.map((page) => page.faq.length);
  const sectionCounts = pages.map((page) => countVisibleSections(page));
  const linkCounts = pages.map((page) => countInternalLinks(page));
  const completenessScores = pages.map((page) => measureContentFieldCompleteness(page));

  return {
    pageCount: pages.length,
    introLengthMedian: median(introLengths),
    faqCountMedian: median(faqCounts),
    visibleSectionCountMedian: median(sectionCounts),
    internalLinkCountMedian: median(linkCounts),
    contentFieldCompletenessMedian: median(completenessScores),
  };
}

export function buildInboundLinkCounts(pages: LandingPageData[]): Map<string, number> {
  const counts = new Map<string, number>();

  for (const page of pages) {
    counts.set(page.slug, 0);
  }

  for (const page of pages) {
    const linkedSlugs = new Set<string>();

    for (const section of [
      ...page.relatedPages,
      ...page.youMayAlsoLike,
      ...page.playersAlsoEnjoy,
    ]) {
      if (section.available) {
        linkedSlugs.add(section.slug);
      }
    }

    for (const slug of linkedSlugs) {
      counts.set(slug, (counts.get(slug) ?? 0) + 1);
    }
  }

  return counts;
}

export function buildIntroFingerprints(pages: LandingPageData[]): Map<string, string> {
  const fingerprints = new Map<string, string>();

  for (const page of pages) {
    fingerprints.set(page.slug, normalizeText(getIntroText(page)));
  }

  return fingerprints;
}

export function buildLandingPageAuditContext(
  pages: LandingPageData[] = getEligibleLandingPages(),
): LandingPageAuditContext {
  const metadataIssuesBySlug = new Map<string, string[]>();
  for (const validationIssue of validateMetadataConsistency().issues) {
    if (!validationIssue.context) {
      continue;
    }

    const existing = metadataIssuesBySlug.get(validationIssue.context) ?? [];
    existing.push(validationIssue.message);
    metadataIssuesBySlug.set(validationIssue.context, existing);
  }

  const linkValidationIssuesBySlug = new Map<string, string[]>();
  for (const page of pages) {
    const linkIssues = validateLandingPageInternalLinks(page).issues;
    if (linkIssues.length > 0) {
      linkValidationIssuesBySlug.set(
        page.slug,
        linkIssues.map((entry) => entry.message),
      );
    }
  }

  return {
    pages,
    portfolio: buildPortfolioStats(pages),
    inboundLinkCounts: buildInboundLinkCounts(pages),
    metadataIssuesBySlug,
    linkValidationIssuesBySlug,
    introFingerprints: buildIntroFingerprints(pages),
  };
}

export function collectVisibleLinkSlugs(page: LandingPageData): string[] {
  const slugs: string[] = [];

  for (const section of [
    ...page.relatedPages,
    ...page.youMayAlsoLike,
    ...page.playersAlsoEnjoy,
  ]) {
    if (section.available) {
      slugs.push(section.slug);
    }
  }

  return slugs;
}

export function hasDuplicateVisibleLinks(page: LandingPageData): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();

  for (const slug of collectVisibleLinkSlugs(page)) {
    if (seen.has(slug)) {
      duplicates.add(slug);
    }

    seen.add(slug);
  }

  return [...duplicates];
}

export function tokenOverlap(left: string, right: string): number {
  const leftTokens = new Set(normalizeText(left).split(" ").filter(Boolean));
  const rightTokens = new Set(normalizeText(right).split(" ").filter(Boolean));

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
