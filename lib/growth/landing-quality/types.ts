import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";

export const QUALITY_DIMENSIONS = [
  "intentClarity",
  "contentUsefulness",
  "conversionClarity",
  "internalLinking",
  "metadataConsistency",
  "structuredData",
  "accessibilityStructure",
  "uniquenessRisk",
] as const;

export type QualityDimension = (typeof QUALITY_DIMENSIONS)[number];

export const FINDING_SEVERITIES = [
  "blocking",
  "important",
  "moderate",
  "minor",
  "informational",
] as const;

export type FindingSeverity = (typeof FINDING_SEVERITIES)[number];

export const FINDING_CONFIDENCES = [
  "verified",
  "strong signal",
  "heuristic",
  "unavailable",
] as const;

export type FindingConfidence = (typeof FINDING_CONFIDENCES)[number];

export const QUALITY_RECOMMENDATIONS = [
  "Human review recommended",
  "Improve content depth",
  "Review intent alignment",
  "Review internal links",
  "Review CTA clarity",
  "Review FAQ usefulness",
  "Review overlap with another page",
  "Fix verified technical issue",
  "Maintain",
  "Insufficient evidence",
  "Active experiment — do not modify relevant metadata or experimental copy.",
] as const;

export type QualityRecommendation = (typeof QUALITY_RECOMMENDATIONS)[number];

export type QualityFinding = {
  dimension: QualityDimension;
  severity: FindingSeverity;
  confidence: FindingConfidence;
  message: string;
  recommendation: QualityRecommendation;
  /** Needs Search Console evidence label for metadata findings. */
  requiresSearchConsoleEvidence?: boolean;
  relatedSlug?: string;
};

export type DimensionScores = Record<QualityDimension, number>;

export type PortfolioStats = {
  pageCount: number;
  introLengthMedian: number;
  faqCountMedian: number;
  visibleSectionCountMedian: number;
  internalLinkCountMedian: number;
  contentFieldCompletenessMedian: number;
};

export type LandingPageScorecard = {
  slug: string;
  path: string;
  title: string;
  internalQualityScore: number;
  humanReviewUrgency: number;
  dimensionScores: DimensionScores;
  findings: QualityFinding[];
  primaryRecommendation: QualityRecommendation;
  reviewPriority: "high" | "moderate" | "maintain";
  confidence: FindingConfidence;
  activeExperimentProtected: boolean;
  verifiedIssueCount: number;
  stats: {
    introLength: number;
    faqCount: number;
    visibleSectionCount: number;
    internalLinkCount: number;
    contentFieldCompleteness: number;
    categoryRelationships: number;
    inboundLinkCount: number;
  };
};

export type LandingQualityReport = {
  generatedAt: string;
  disclaimer: string;
  scoreLabel: string;
  pagesAnalyzed: number;
  scopeNote: string;
  exclusions: string[];
  portfolioStats: PortfolioStats;
  verifiedTechnicalIssues: QualityFinding[];
  scorecards: LandingPageScorecard[];
  overlapReviewPairs: Array<{
    slugA: string;
    slugB: string;
    overlapType: string;
    confidence: FindingConfidence;
    label: "low uniqueness risk" | "possible overlap" | "needs human comparison";
  }>;
  internalLinkingGaps: Array<{
    slug: string;
    message: string;
    confidence: FindingConfidence;
  }>;
  metadataFindingsRequiringScEvidence: QualityFinding[];
  scoringReference: Array<{
    dimension: QualityDimension;
    weightPercent: number;
    label: string;
  }>;
  summary: {
    verifiedIssueCount: number;
    importantHumanReviewCount: number;
    moderateReviewCount: number;
    maintainCount: number;
    topReviewCandidates: Array<{
      slug: string;
      path: string;
      score: number;
      confidence: FindingConfidence;
      reasons: string[];
      recommendation: QualityRecommendation;
    }>;
    strongPagesToMaintain: string[];
    nextAction: string;
  };
};

export type LandingQualityAuditSummary = {
  generatedAt: string;
  pagesAnalyzed: number;
  verifiedIssueCount: number;
  importantHumanReviewCount: number;
  moderateReviewCount: number;
  maintainCount: number;
  topReviewCandidates: Array<{
    slug: string;
    path: string;
    score: number;
    recommendation: QualityRecommendation;
  }>;
  auditRecommended: boolean;
  auditRecommendedReason: string;
};

export type LandingPageAuditContext = {
  pages: LandingPageData[];
  portfolio: PortfolioStats;
  inboundLinkCounts: Map<string, number>;
  metadataIssuesBySlug: Map<string, string[]>;
  linkValidationIssuesBySlug: Map<string, string[]>;
  introFingerprints: Map<string, string>;
};
