import type { QualityDimension } from "@/lib/growth/landing-quality/types";

export const SCORE_LABEL =
  "Internal implementation quality score — not a traffic or ranking prediction.";

export const REPORT_DISCLAIMER =
  "Results are internal code/content-quality signals requiring human review. This audit does not predict traffic, rankings, CTR, or conversions.";

export const SCORING_REFERENCE: Array<{
  dimension: QualityDimension;
  weightPercent: number;
  label: string;
}> = [
  { dimension: "intentClarity", weightPercent: 20, label: "Intent clarity" },
  { dimension: "contentUsefulness", weightPercent: 25, label: "Content usefulness" },
  { dimension: "conversionClarity", weightPercent: 15, label: "Conversion clarity" },
  { dimension: "internalLinking", weightPercent: 20, label: "Internal linking" },
  { dimension: "metadataConsistency", weightPercent: 5, label: "Metadata consistency" },
  { dimension: "structuredData", weightPercent: 5, label: "Structured data" },
  {
    dimension: "accessibilityStructure",
    weightPercent: 5,
    label: "Accessibility and presentation structure",
  },
  { dimension: "uniquenessRisk", weightPercent: 5, label: "Uniqueness risk" },
];

export const AUDIT_EXCLUSIONS = [
  "Homepage (/)",
  "Game/session routes (/game/[share_code])",
  "Voting, results, admin, and documentation routes",
  "Planned or unavailable landing pages",
  "Category hubs (/categories/*)",
  "Evergreen pillar pages (topic hubs such as /friend-games)",
];

export const AUDIT_SCOPE_NOTE =
  "Live, indexable landing pages from LANDING_PAGES and INTENT_REGISTRY only. Analysis uses existing registries and assembled page data — no rendering or external services.";

export const AUDIT_CADENCE_DAYS = 30;
