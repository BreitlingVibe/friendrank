export type {
  DimensionScores,
  FindingConfidence,
  FindingSeverity,
  LandingPageAuditContext,
  LandingPageScorecard,
  LandingQualityAuditSummary,
  LandingQualityReport,
  PortfolioStats,
  QualityDimension,
  QualityFinding,
  QualityRecommendation,
} from "@/lib/growth/landing-quality/types";

export {
  buildInboundLinkCounts,
  buildIntroFingerprints,
  buildLandingPageAuditContext,
  buildPortfolioStats,
  collectVisibleLinkSlugs,
  countInternalLinks,
  countVisibleSections,
  getEligibleLandingPages,
  getIntroText,
  hasDuplicateVisibleLinks,
  measureContentFieldCompleteness,
  tokenOverlap,
} from "@/lib/growth/landing-quality/page-source";

export {
  auditAllLandingPages,
  auditLandingPage,
  collectInternalLinkingGaps,
  collectMetadataFindingsRequiringScEvidence,
  collectVerifiedTechnicalIssues,
  findOverlapReviewPairs,
} from "@/lib/growth/landing-quality/quality-checks";

export {
  AUDIT_CADENCE_DAYS,
  AUDIT_EXCLUSIONS,
  AUDIT_SCOPE_NOTE,
  REPORT_DISCLAIMER,
  SCORE_LABEL,
  SCORING_REFERENCE,
} from "@/lib/growth/landing-quality/quality-scoring";

export {
  buildLandingQualityAuditSummary,
  buildLandingQualityReport,
  formatLandingQualityReport,
  loadLandingQualitySummary,
  persistLandingQualitySummary,
  shouldRecommendLandingQualityAudit,
  validateLandingQualityReport,
} from "@/lib/growth/landing-quality/quality-report";
