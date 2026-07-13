/** Evidence level for snippet optimization opportunities. */
export const SNIPPET_EVIDENCE_LEVELS = [
  "verified",
  "partial",
  "heuristic",
] as const;

export type SnippetEvidenceLevel = (typeof SNIPPET_EVIDENCE_LEVELS)[number];

export const SNIPPET_EVIDENCE_STATUSES = [
  "missing",
  "partial",
  "verified",
] as const;

export type SnippetEvidenceStatus = (typeof SNIPPET_EVIDENCE_STATUSES)[number];

export const SNIPPET_PAGE_TYPES = [
  "landing-page",
  "evergreen-hub",
  "topic-hub",
  "category-hub",
  "homepage",
] as const;

export type SnippetPageType = (typeof SNIPPET_PAGE_TYPES)[number];

export const SNIPPET_CANDIDATE_VARIANTS = [
  "search-intent-first",
  "benefit-first",
  "brand-balanced",
] as const;

export type SnippetCandidateVariant = (typeof SNIPPET_CANDIDATE_VARIANTS)[number];

export const SNIPPET_FIT_LABELS = [
  "strong fit",
  "reasonable fit",
  "weak fit",
] as const;

export type SnippetFitLabel = (typeof SNIPPET_FIT_LABELS)[number];

export const SNIPPET_EXPERIMENT_STATUSES = [
  "proposed",
  "approved",
  "active",
  "pending_measurement",
  "successful",
  "inconclusive",
  "unsuccessful",
  "reverted",
] as const;

export type SnippetExperimentStatus = (typeof SNIPPET_EXPERIMENT_STATUSES)[number];

/** Manual Search Console query-to-page evidence for one target URL. */
export type SearchConsoleCompetingUrl = {
  slug: string;
  impressions: number;
  clicks: number;
  /** Omit or null when not recorded — never invent. */
  averagePosition?: number | null;
  notes?: string;
};

export type SearchConsoleOpportunityRecord = {
  targetQuery: string;
  targetSlug: string;
  relatedQueries?: readonly string[];
  impressions: number;
  clicks: number;
  /** Omit to derive from clicks/impressions when both are present. */
  ctr?: number;
  /** Null when not recorded in Search Console export. */
  averagePosition?: number | null;
  /** ISO date or placeholder string when range unknown. */
  observationStartDate?: string | null;
  observationEndDate?: string | null;
  source: "manual-search-console";
  evidenceStatus: "verified";
  competingUrls: readonly SearchConsoleCompetingUrl[];
  notes?: string;
};

/** Resolved page snapshot used by the snippet engine — read-only from codebase. */
export type SnippetPageSnapshot = {
  slug: string;
  pageUrl: string;
  pageType: SnippetPageType;
  currentTitle: string;
  currentDescription: string;
  currentH1: string;
  canonical: string;
  primaryIntent: string;
  audience: string;
  searchIntent: string;
  /** Accurate product claims this page may use in snippets. */
  allowedClaims: readonly string[];
};

/** Full opportunity after merging page snapshot with evidence. */
export type SnippetOptimizationOpportunity = {
  slug: string;
  pageUrl: string;
  pageType: SnippetPageType;
  evidenceLevel: SnippetEvidenceLevel;
  evidenceStatus: SnippetEvidenceStatus;
  targetQuery?: string;
  relatedQueries: readonly string[];
  impressions?: number;
  clicks?: number;
  ctr?: number;
  averagePosition?: number | null;
  observationStartDate?: string | null;
  observationEndDate?: string | null;
  source: string;
  competingUrls: readonly SearchConsoleCompetingUrl[];
  notes?: string;
  page: SnippetPageSnapshot;
};

export type SnippetCandidate = {
  variant: SnippetCandidateVariant;
  variantLabel: string;
  title: string;
  metaDescription: string;
  rationale: string;
  targetIntent: string;
  claimsUsed: readonly string[];
  possibleRisk: string;
  titleLength: number;
  descriptionLength: number;
  qualitativeFit: SnippetFitLabel;
  fitReason: string;
};

export type SnippetQualityEvaluation = {
  /** Internal quality score — not predicted CTR. */
  internalQualityScore: number;
  scoreLabel: string;
  queryAlignment: SnippetFitLabel;
  intentClarity: SnippetFitLabel;
  productAccuracy: SnippetFitLabel;
  differentiation: SnippetFitLabel;
  titleReadability: SnippetFitLabel;
  descriptionReadability: SnippetFitLabel;
  duplicationRisk: "low" | "medium" | "high";
  cannibalizationRisk: "low" | "medium" | "high";
  titleLengthStatus: "ok" | "short" | "long";
  descriptionLengthStatus: "ok" | "short" | "long";
  brandUsage: "none" | "balanced" | "heavy";
  ctaClarity: SnippetFitLabel;
  reasons: readonly string[];
  warnings: readonly string[];
};

export type EvaluatedSnippetCandidate = SnippetCandidate & {
  evaluation: SnippetQualityEvaluation;
};

export type SnippetCannibalizationWarning = {
  severity: "warning" | "error";
  code: string;
  message: string;
  relatedSlug?: string;
};

export type SnippetExperimentRecord = {
  id: string;
  name: string;
  status: SnippetExperimentStatus;
  targetSlug: string;
  targetQuery: string;
  deploymentDate?: string | null;
  measurementDate?: string | null;
  measurementWindowDays: readonly [number, number];
  beforeTitle?: string;
  afterTitle?: string;
  beforeDescription?: string;
  afterDescription?: string;
  notes?: string;
};

export type SnippetExperimentRecommendation = {
  opportunity: SnippetOptimizationOpportunity;
  candidates: EvaluatedSnippetCandidate[];
  cannibalizationWarnings: SnippetCannibalizationWarning[];
  recommendedCandidate?: EvaluatedSnippetCandidate;
  recommendationRationale?: string;
  recommendationRisks?: readonly string[];
  status: "needs human approval" | "blocked_active_experiment" | "blocked_no_evidence";
  measurementWindow?: string;
};

export type SnippetOptimizationReport = {
  executiveSummary: {
    verifiedCount: number;
    partialCount: number;
    heuristicCount: number;
    activeExperiments: number;
    blockedPages: number;
    recommendedNextExperiment?: string;
    topVerifiedOpportunity?: {
      slug: string;
      query: string;
      evidence: string;
      status: string;
    };
  };
  verifiedOpportunities: SnippetOptimizationOpportunity[];
  partialOpportunities: SnippetOptimizationOpportunity[];
  heuristicOpportunities: SnippetOptimizationOpportunity[];
  experimentRecommendations: SnippetExperimentRecommendation[];
  pagesNotReady: Array<{ slug: string; reason: string }>;
  activeExperiments: SnippetExperimentRecord[];
};
