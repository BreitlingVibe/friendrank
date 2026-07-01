import { validateCanonicalUrls } from "@/lib/seo/validation/canonical-validation";
import { validateContentCompleteness } from "@/lib/seo/validation/content-completeness-validation";
import { validateMetadataConsistency } from "@/lib/seo/validation/metadata-validation";
import { validateSearchOverlap } from "@/lib/seo/validation/overlap-validation";
import { validateRobotsReadiness } from "@/lib/seo/validation/robots-validation";
import { validateSitemapIntegrity } from "@/lib/seo/validation/sitemap-validation";
import { validateContentExperience } from "@/lib/seo/validation/content-experience-validation";
import { validateContentVariation } from "@/lib/seo/validation/content-variation-validation";
import { validateTopicHubExperience } from "@/lib/seo/validation/topic-hub-experience-validation";
import {
  countIssuesBySeverity,
  mergeValidationResults,
  type ValidationResult,
} from "@/lib/entities/validation/types";

export type IndexAuditReport = {
  valid: boolean;
  results: {
    canonical: ValidationResult;
    metadata: ValidationResult;
    sitemap: ValidationResult;
    robots: ValidationResult;
    overlap: ValidationResult;
    content: ValidationResult;
    variation: ValidationResult;
    experience: ValidationResult;
    topicHubExperience: ValidationResult;
  };
  totals: {
    errors: number;
    warnings: number;
  };
};

/** Runs index quality and Search Console readiness audits. */
export function runIndexAudit(): IndexAuditReport {
  const canonical = validateCanonicalUrls();
  const metadata = validateMetadataConsistency();
  const sitemap = validateSitemapIntegrity();
  const robots = validateRobotsReadiness();
  const overlap = validateSearchOverlap();
  const content = validateContentCompleteness();
  const variation = validateContentVariation();
  const experience = validateContentExperience();
  const topicHubExperience = validateTopicHubExperience();

  const merged = mergeValidationResults(
    canonical,
    metadata,
    sitemap,
    robots,
    overlap,
    content,
    variation,
    experience,
    topicHubExperience,
  );

  return {
    valid: merged.valid,
    results: {
      canonical,
      metadata,
      sitemap,
      robots,
      overlap,
      content,
      variation,
      experience,
      topicHubExperience,
    },
    totals: countIssuesBySeverity(merged.issues),
  };
}

export function formatIndexAuditReport(report: IndexAuditReport): string {
  const sections = [
    ["Canonical URLs", report.results.canonical],
    ["Metadata consistency", report.results.metadata],
    ["Sitemap quality", report.results.sitemap],
    ["Robots readiness", report.results.robots],
    ["Search overlap", report.results.overlap],
    ["Content completeness", report.results.content],
    ["Content variation", report.results.variation],
    ["Content experience", report.results.experience],
    ["Topic hub experience", report.results.topicHubExperience],
  ] as const;

  const lines: string[] = [
    "FriendRank index quality audit",
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
