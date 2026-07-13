import { getCtrImprovementCandidates } from "@/lib/growth/ctr-optimization";
import {
  computeCtr,
  formatSearchConsoleEvidence,
  getSearchConsoleOpportunities,
} from "@/lib/growth/search-console-opportunities";
import { analyzeCannibalization } from "@/lib/growth/snippet-optimization/cannibalization";
import { generateSnippetCandidates } from "@/lib/growth/snippet-optimization/candidate-generator";
import {
  evaluateSnippetCandidates,
  pickRecommendedCandidate,
} from "@/lib/growth/snippet-optimization/candidate-evaluator";
import {
  formatMeasurementWindow,
  getActiveSnippetExperiments,
  getExperimentForSlug,
  isSnippetExperimentBlocked,
} from "@/lib/growth/snippet-optimization/experiment-registry";
import {
  getAllSnippetPageSnapshots,
  resolveSnippetPageSnapshot,
} from "@/lib/growth/snippet-optimization/page-metadata";
import type {
  SnippetExperimentRecommendation,
  SnippetOptimizationOpportunity,
  SnippetOptimizationReport,
} from "@/lib/growth/snippet-optimization/types";

function buildVerifiedOpportunity(
  record: ReturnType<typeof getSearchConsoleOpportunities>[number],
): SnippetOptimizationOpportunity | null {
  const page = resolveSnippetPageSnapshot(record.targetSlug);
  if (!page) {
    return null;
  }

  return {
    slug: record.targetSlug,
    pageUrl: page.pageUrl,
    pageType: page.pageType,
    evidenceLevel: "verified",
    evidenceStatus: "verified",
    targetQuery: record.targetQuery,
    relatedQueries: record.relatedQueries ?? [],
    impressions: record.impressions,
    clicks: record.clicks,
    ctr: record.ctr ?? computeCtr(record.clicks, record.impressions),
    averagePosition: record.averagePosition ?? null,
    observationStartDate: record.observationStartDate ?? null,
    observationEndDate: record.observationEndDate ?? null,
    source: record.source,
    competingUrls: record.competingUrls,
    notes: record.notes,
    page,
  };
}

function buildHeuristicOpportunity(input: {
  slug: string;
  reason: string;
  targetQuery?: string;
}): SnippetOptimizationOpportunity | null {
  const page =
    input.slug === "" ? getAllSnippetPageSnapshots()[0] : resolveSnippetPageSnapshot(input.slug);
  if (!page) {
    return null;
  }

  return {
    slug: page.slug,
    pageUrl: page.pageUrl,
    pageType: page.pageType,
    evidenceLevel: "heuristic",
    evidenceStatus: "missing",
    targetQuery: input.targetQuery,
    relatedQueries: [],
    source: input.reason,
    competingUrls: [],
    page,
  };
}

function buildExperimentRecommendation(
  opportunity: SnippetOptimizationOpportunity,
): SnippetExperimentRecommendation {
  const experiment = getExperimentForSlug(opportunity.slug);
  const blocked = isSnippetExperimentBlocked(opportunity.slug);

  if (blocked && experiment) {
    return {
      opportunity,
      candidates: [],
      cannibalizationWarnings: [],
      status: "blocked_active_experiment",
      measurementWindow: formatMeasurementWindow(experiment),
      recommendationRationale: `Experiment "${experiment.name}" is ${experiment.status.replace(/_/g, " ")}. Do not change metadata again until the measurement window ends.`,
      recommendationRisks: [
        "Changing metadata again would contaminate the controlled experiment.",
      ],
    };
  }

  if (opportunity.evidenceLevel === "heuristic") {
    return {
      opportunity,
      candidates: [],
      cannibalizationWarnings: [],
      status: "blocked_no_evidence",
      recommendationRationale:
        "Heuristic-only page — add Search Console query-to-page evidence before approving a snippet experiment.",
      recommendationRisks: [
        "No verified Search Console evidence for a target query on this URL.",
      ],
    };
  }

  const baseCannibalization = analyzeCannibalization({
    page: opportunity.page,
    competingUrls: opportunity.competingUrls,
  });

  const candidates = generateSnippetCandidates({
    page: opportunity.page,
    targetQuery: opportunity.targetQuery,
  });

  const evaluated = evaluateSnippetCandidates({
    candidates,
    page: opportunity.page,
    targetQuery: opportunity.targetQuery,
    duplicationRisk: baseCannibalization.duplicationRisk,
    cannibalizationRisk: baseCannibalization.cannibalizationRisk,
  }).map((candidate) => {
    const perCandidate = analyzeCannibalization({
      page: opportunity.page,
      candidate,
      competingUrls: opportunity.competingUrls,
    });
    return {
      ...candidate,
      evaluation: {
        ...candidate.evaluation,
        duplicationRisk: perCandidate.duplicationRisk,
        cannibalizationRisk: perCandidate.cannibalizationRisk,
        warnings: [
          ...candidate.evaluation.warnings,
          ...perCandidate.warnings.map((warning) => warning.message),
        ],
      },
    };
  });

  const cannibalizationWarnings = [
    ...baseCannibalization.warnings,
    ...evaluated.flatMap((candidate) =>
      analyzeCannibalization({
        page: opportunity.page,
        candidate,
        competingUrls: opportunity.competingUrls,
      }).warnings,
    ),
  ];

  const recommended = pickRecommendedCandidate(evaluated);

  return {
    opportunity,
    candidates: evaluated,
    cannibalizationWarnings,
    recommendedCandidate: recommended,
    recommendationRationale: recommended
      ? `${recommended.variantLabel} scored highest on internal quality checks (${recommended.evaluation.internalQualityScore}/100 — not predicted CTR). ${recommended.rationale}`
      : "No candidate passed internal quality checks.",
    recommendationRisks: recommended
      ? [recommended.possibleRisk, ...recommended.evaluation.warnings]
      : ["No viable candidate generated."],
    status: "needs human approval",
    measurementWindow: "7–14 days after Google recrawls the page",
  };
}

/** Builds the full snippet optimization report for human review. */
export function buildSnippetOptimizationReport(): SnippetOptimizationReport {
  const verifiedOpportunities = getSearchConsoleOpportunities()
    .map(buildVerifiedOpportunity)
    .filter((entry): entry is SnippetOptimizationOpportunity => entry != null);

  const verifiedSlugs = new Set(verifiedOpportunities.map((entry) => entry.slug));
  const activeExperiments = getActiveSnippetExperiments();

  const ctrCandidates = getCtrImprovementCandidates({ includeTiers: ["P0", "P1"] });
  const heuristicOpportunities = ctrCandidates
    .filter((candidate) => !verifiedSlugs.has(candidate.path.slice(1)))
    .slice(0, 10)
    .map((candidate) =>
      buildHeuristicOpportunity({
        slug: candidate.path.slice(1),
        reason: `CTR optimization heuristic: ${candidate.reason}`,
      }),
    )
    .filter((entry): entry is SnippetOptimizationOpportunity => entry != null);

  const partialOpportunities: SnippetOptimizationOpportunity[] = [];

  const experimentRecommendations = verifiedOpportunities.map(buildExperimentRecommendation);

  const blockedPages = activeExperiments.map((experiment) => experiment.targetSlug);
  const pagesNotReady = heuristicOpportunities.map((opportunity) => ({
    slug: opportunity.slug,
    reason:
      "Heuristic CTR candidate only — record Search Console query-to-page evidence before changing metadata.",
  }));

  const openVerified = verifiedOpportunities.filter(
    (opportunity) => !isSnippetExperimentBlocked(opportunity.slug),
  );
  const recommendedNextExperiment = openVerified[0]
    ? `/${openVerified[0].slug}`
    : undefined;

  const topVerified = verifiedOpportunities[0];
  const topExperiment = topVerified ? getExperimentForSlug(topVerified.slug) : undefined;

  return {
    executiveSummary: {
      verifiedCount: verifiedOpportunities.length,
      partialCount: partialOpportunities.length,
      heuristicCount: heuristicOpportunities.length,
      activeExperiments: activeExperiments.length,
      blockedPages: blockedPages.length,
      recommendedNextExperiment,
      topVerifiedOpportunity: topVerified
        ? {
            slug: `/${topVerified.slug}`,
            query: topVerified.targetQuery ?? "—",
            evidence: formatSearchConsoleEvidence({
              targetQuery: topVerified.targetQuery ?? "",
              targetSlug: topVerified.slug,
              impressions: topVerified.impressions ?? 0,
              clicks: topVerified.clicks ?? 0,
              ctr: topVerified.ctr,
              averagePosition: topVerified.averagePosition ?? null,
              source: "manual-search-console",
              evidenceStatus: "verified",
              competingUrls: topVerified.competingUrls,
            }),
            status: topExperiment
              ? `Experiment ${topExperiment.status.replace(/_/g, " ")} — do not change again until measurement window ends`
              : "Needs human approval",
          }
        : undefined,
    },
    verifiedOpportunities,
    partialOpportunities,
    heuristicOpportunities,
    experimentRecommendations,
    pagesNotReady,
    activeExperiments: [...activeExperiments],
  };
}

export function getTopVerifiedSnippetOpportunity():
  | SnippetOptimizationReport["executiveSummary"]["topVerifiedOpportunity"]
  | undefined {
  return buildSnippetOptimizationReport().executiveSummary.topVerifiedOpportunity;
}
