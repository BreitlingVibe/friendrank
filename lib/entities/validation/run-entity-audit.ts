import { getAllEvergreenHubPages } from "@/lib/evergreen-hubs/registry";
import { buildEvergreenHubStructuredData } from "@/lib/evergreen-hubs/evergreen-hub-schema";
import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageStructuredData } from "@/lib/landing-pages/landing-page-schema";
import { validateEntityRegistry } from "@/lib/entities/validation/entity-registry-validation";
import { validateAllLandingPageInternalLinks } from "@/lib/entities/validation/internal-link-validation";
import { validateAllLandingPageEntities } from "@/lib/entities/validation/landing-page-validation";
import { validateAllTopicHubEntities } from "@/lib/entities/validation/topic-hub-validation";
import { validateStructuredDataGraph } from "@/lib/seo/schema-validation";
import { getEntityNavigationForHub } from "@/lib/entities/entity-navigation";
import { getHubPageContent } from "@/lib/topic-hubs/hub-content";
import { buildTopicHubStructuredData } from "@/lib/topic-hubs/hub-schema";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";
import {
  countIssuesBySeverity,
  mergeValidationResults,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

export type EntityAuditReport = {
  valid: boolean;
  results: {
    registry: ValidationResult;
    landingPages: ValidationResult;
    topicHubs: ValidationResult;
    internalLinks: ValidationResult;
    structuredData: ValidationResult;
  };
  totals: {
    errors: number;
    warnings: number;
  };
};

/** Runs the full development-time entity, link, and schema audit. */
export function runEntityAudit(): EntityAuditReport {
  const registry = validateEntityRegistry();
  const landingPages = validateAllLandingPageEntities(LANDING_PAGES);
  const topicHubs = validateAllTopicHubEntities();
  const internalLinks = validateAllLandingPageInternalLinks(LANDING_PAGES);

  const schemaIssues: ValidationIssue[] = [];

  for (const page of LANDING_PAGES) {
    schemaIssues.push(
      ...validateStructuredDataGraph(
        buildLandingPageStructuredData(page),
        page.slug,
      ).issues,
    );
  }

  for (const hub of getAllHubDefinitions()) {
    const content = getHubPageContent(hub.id);
    if (!content) {
      continue;
    }

    schemaIssues.push(
      ...validateStructuredDataGraph(
        buildTopicHubStructuredData({
          title: hub.title,
          slug: hub.slug,
          schemaDescription: content.schemaDescription,
          faq: content.faq,
          entityNavigation: getEntityNavigationForHub(hub.id),
        }),
        hub.id,
      ).issues,
    );
  }

  for (const page of getAllEvergreenHubPages()) {
    schemaIssues.push(
      ...validateStructuredDataGraph(
        buildEvergreenHubStructuredData(page),
        page.slug,
      ).issues,
    );
  }

  const structuredData = {
    valid: schemaIssues.every((entry) => entry.severity !== "error"),
    issues: schemaIssues,
  };

  const merged = mergeValidationResults(
    registry,
    landingPages,
    topicHubs,
    internalLinks,
    structuredData,
  );

  return {
    valid: merged.valid,
    results: {
      registry,
      landingPages,
      topicHubs,
      internalLinks,
      structuredData,
    },
    totals: countIssuesBySeverity(merged.issues),
  };
}

export function formatEntityAuditReport(report: EntityAuditReport): string {
  const sections = [
    ["Entity registry", report.results.registry],
    ["Landing page entities", report.results.landingPages],
    ["Topic hub entities", report.results.topicHubs],
    ["Internal links", report.results.internalLinks],
    ["Structured data", report.results.structuredData],
  ] as const;

  const lines: string[] = [
    "FriendRank entity audit",
    `Status: ${report.valid ? "PASS" : "FAIL"}`,
    `Errors: ${report.totals.errors}`,
    `Warnings: ${report.totals.warnings}`,
    "",
  ];

  for (const [label, result] of sections) {
    const counts = countIssuesBySeverity(result.issues);
    lines.push(`${label}: ${counts.errors} errors, ${counts.warnings} warnings`);

    for (const entry of result.issues) {
      const context = entry.context ? ` [${entry.context}]` : "";
      lines.push(
        `  - ${entry.severity.toUpperCase()} ${entry.code}${context}: ${entry.message}`,
      );
    }

    lines.push("");
  }

  return lines.join("\n").trimEnd();
}
