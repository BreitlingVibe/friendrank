export {
  buildSnippetOptimizationReport,
  getTopVerifiedSnippetOpportunity,
} from "@/lib/growth/snippet-optimization/run-snippet-report";

export { formatSnippetOptimizationReport } from "@/lib/growth/snippet-optimization/format-snippet-report";

export {
  SNIPPET_EXPERIMENT_REGISTRY,
  getActiveSnippetExperiments,
  getExperimentForSlug,
  getSnippetExperiments,
  isSnippetExperimentBlocked,
  formatMeasurementWindow,
} from "@/lib/growth/snippet-optimization/experiment-registry";

export {
  SEARCH_CONSOLE_OPPORTUNITIES,
  computeCtr,
  formatCtr,
  formatSearchConsoleEvidence,
  getSearchConsoleOpportunities,
  getSearchConsoleOpportunityByQuery,
  getSearchConsoleOpportunityBySlug,
} from "@/lib/growth/search-console-opportunities";

export {
  generateSnippetCandidates,
} from "@/lib/growth/snippet-optimization/candidate-generator";

export {
  evaluateSnippetCandidate,
  evaluateSnippetCandidates,
  pickRecommendedCandidate,
} from "@/lib/growth/snippet-optimization/candidate-evaluator";

export {
  analyzeCannibalization,
} from "@/lib/growth/snippet-optimization/cannibalization";

export {
  getAllSnippetPageSnapshots,
  getHomepageSnippetSnapshot,
  getRelatedPageSnapshots,
  resolveSnippetPageSnapshot,
} from "@/lib/growth/snippet-optimization/page-metadata";

export type {
  EvaluatedSnippetCandidate,
  SearchConsoleCompetingUrl,
  SearchConsoleOpportunityRecord,
  SnippetCandidate,
  SnippetCandidateVariant,
  SnippetCannibalizationWarning,
  SnippetEvidenceLevel,
  SnippetEvidenceStatus,
  SnippetExperimentRecommendation,
  SnippetExperimentRecord,
  SnippetExperimentStatus,
  SnippetFitLabel,
  SnippetOptimizationOpportunity,
  SnippetOptimizationReport,
  SnippetPageSnapshot,
  SnippetPageType,
  SnippetQualityEvaluation,
} from "@/lib/growth/snippet-optimization/types";
