import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import { applyTopicHubExperience } from "@/lib/landing-pages/topic-hub-experience";
import { applyAiCitationLayer } from "@/lib/geo/ai-citation";
import {
  applyGeoFoundation,
  collectGeoPageRecords,
  GEO_CONTENT_TYPES,
  GEO_PURPOSES,
  GEO_SUMMARY_MAX_CHARS,
  GEO_USER_INTENTS,
} from "@/lib/geo/geo-foundation";
import { getAllHubs } from "@/lib/topic-hubs";
import { assembleTopicHubPage } from "@/lib/topic-hubs/hub-page-data";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

function countByValue(values: string[]): Map<string, number> {
  const counts = new Map<string, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return counts;
}

function buildTopicHubPagesWithGeo() {
  return getAllHubs().map((hub) =>
    applyAiCitationLayer(
      applyGeoFoundation(applyTopicHubExperience(assembleTopicHubPage(hub))),
    ),
  );
}

/** Validates GEO foundation metadata across indexable pages. */
export function validateGeoFoundation(): ValidationResult {
  const issues: ValidationIssue[] = [];
  const landingPages = LANDING_PAGES;
  const topicHubPages = buildTopicHubPagesWithGeo();
  const records = collectGeoPageRecords({ landingPages, topicHubPages });

  for (const record of records) {
    const geo = record.geoFoundation;
    const context = record.path;

    if (!geo.primaryEntity.trim()) {
      issues.push(
        issue(
          "geo.missing_primary_entity",
          "error",
          "GEO primary entity is missing.",
          context,
        ),
      );
    }

    if (!geo.audience.trim()) {
      issues.push(
        issue(
          "geo.missing_audience",
          "error",
          "GEO audience is missing.",
          context,
        ),
      );
    }

    if (!GEO_USER_INTENTS.includes(geo.userIntent)) {
      issues.push(
        issue(
          "geo.invalid_intent",
          "error",
          `GEO user intent "${geo.userIntent}" is not approved.`,
          context,
        ),
      );
    }

    if (!geo.summary.trim()) {
      issues.push(
        issue(
          "geo.missing_summary",
          "error",
          "GEO machine-readable summary is missing.",
          context,
        ),
      );
    }

    if (geo.summary.length > GEO_SUMMARY_MAX_CHARS) {
      issues.push(
        issue(
          "geo.summary_too_long",
          "error",
          `GEO summary exceeds ${GEO_SUMMARY_MAX_CHARS} characters.`,
          context,
        ),
      );
    }

    if (!GEO_CONTENT_TYPES.includes(geo.contentType)) {
      issues.push(
        issue(
          "geo.invalid_content_type",
          "error",
          `GEO content type "${geo.contentType}" is not approved.`,
          context,
        ),
      );
    }

    if (!GEO_PURPOSES.includes(geo.purpose)) {
      issues.push(
        issue(
          "geo.invalid_purpose",
          "error",
          `GEO purpose "${geo.purpose}" is not approved.`,
          context,
        ),
      );
    }

    if (geo.contentSignals.primaryTopics.length === 0) {
      issues.push(
        issue(
          "geo.empty_primary_topics",
          "error",
          "GEO primary topic graph is empty.",
          context,
        ),
      );
    }

    if (
      geo.contentSignals.primaryTopics.length +
        geo.contentSignals.secondaryTopics.length +
        geo.contentSignals.relatedConcepts.length ===
      0
    ) {
      issues.push(
        issue(
          "geo.empty_topic_graph",
          "error",
          "GEO topic graph has no populated layers.",
          context,
        ),
      );
    }
  }

  for (const page of landingPages) {
    if (!page.geoFoundation) {
      issues.push(
        issue(
          "geo.missing_landing_geo",
          "error",
          "Landing page is missing GEO foundation metadata.",
          page.slug,
        ),
      );
    }
  }

  return createValidationResult(issues);
}

export type GeoAuditReport = {
  valid: boolean;
  totalPages: number;
  intentDistribution: Map<string, number>;
  audienceDistribution: Map<string, number>;
  contentTypeDistribution: Map<string, number>;
  entityCoverage: number;
  missingSummaries: string[];
  validation: ValidationResult;
};

/** Builds a GEO audit report for CLI output. */
export function buildGeoAuditReport(): GeoAuditReport {
  const landingPages = LANDING_PAGES;
  const topicHubPages = buildTopicHubPagesWithGeo();
  const records = collectGeoPageRecords({ landingPages, topicHubPages });
  const validation = validateGeoFoundation();

  const uniquePrimaryEntities = new Set(
    records.map((record) => record.geoFoundation.primaryEntity.toLowerCase()),
  );

  return {
    valid: validation.valid,
    totalPages: records.length,
    intentDistribution: countByValue(
      records.map((record) => record.geoFoundation.userIntent),
    ),
    audienceDistribution: countByValue(
      records.map((record) => record.geoFoundation.audience),
    ),
    contentTypeDistribution: countByValue(
      records.map((record) => record.geoFoundation.contentType),
    ),
    entityCoverage: uniquePrimaryEntities.size,
    missingSummaries: records
      .filter((record) => !record.geoFoundation.summary.trim())
      .map((record) => record.path),
    validation,
  };
}

export function formatGeoAuditReport(report: GeoAuditReport): string {
  const lines: string[] = [
    "FriendRank GEO foundation report",
    `Status: ${report.valid ? "PASS" : "FAIL"}`,
    `Total pages: ${report.totalPages}`,
    `Primary entity coverage: ${report.entityCoverage}`,
    `Missing summaries: ${report.missingSummaries.length}`,
    "",
    "Intent distribution",
  ];

  for (const [intent, count] of [...report.intentDistribution.entries()].sort()) {
    lines.push(`- ${intent}: ${count}`);
  }

  lines.push("", "Audience distribution");
  for (const [audience, count] of [...report.audienceDistribution.entries()].sort()) {
    lines.push(`- ${audience}: ${count}`);
  }

  lines.push("", "Content type distribution");
  for (const [contentType, count] of [
    ...report.contentTypeDistribution.entries(),
  ].sort()) {
    lines.push(`- ${contentType}: ${count}`);
  }

  if (report.missingSummaries.length > 0) {
    lines.push("", "Pages missing summaries");
    for (const path of report.missingSummaries) {
      lines.push(`- ${path}`);
    }
  }

  if (report.validation.issues.length > 0) {
    lines.push("", "Validation issues");
    for (const entry of report.validation.issues) {
      const context = entry.context ? ` [${entry.context}]` : "";
      lines.push(
        `  - ${entry.severity.toUpperCase()} ${entry.code}${context}: ${entry.message}`,
      );
    }
  }

  return lines.join("\n").trimEnd();
}
