import {
  formatEntityAuditReport,
  runEntityAudit,
  type EntityAuditReport,
} from "@/lib/entities/validation/run-entity-audit";
import {
  formatIndexAuditReport,
  runIndexAudit,
  type IndexAuditReport,
} from "@/lib/audit/run-index-audit";
import { validateRecommendationIntegrity } from "@/lib/seo/validation/recommendation-validation";
import { validateRouteIntegrity } from "@/lib/seo/validation/route-validation";
import { validateCategoryRegistry } from "@/lib/discovery/validate-category-registry";
import {
  countIssuesBySeverity,
  mergeValidationResults,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

function dedupeIssues(issues: ValidationIssue[]): ValidationIssue[] {
  const seen = new Set<string>();

  return issues.filter((entry) => {
    const key = `${entry.code}|${entry.context ?? ""}|${entry.message}`;
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export type FullAuditReport = {
  valid: boolean;
  entityAudit: EntityAuditReport;
  indexAudit: IndexAuditReport;
  routes: ValidationResult;
  recommendations: ValidationResult;
  discovery: ValidationResult;
  totals: {
    errors: number;
    warnings: number;
  };
};

/** Runs entity, index, route, and recommendation audits. */
export function runFullAudit(): FullAuditReport {
  const entityAudit = runEntityAudit();
  const indexAudit = runIndexAudit();
  const routes = validateRouteIntegrity();
  const recommendations = validateRecommendationIntegrity();
  const discovery = validateCategoryRegistry();

  const supplemental = mergeValidationResults(routes, recommendations, discovery);
  const allIssues = dedupeIssues([
    ...Object.values(entityAudit.results).flatMap((result) => result.issues),
    ...Object.values(indexAudit.results).flatMap((result) => result.issues),
    ...supplemental.issues,
  ]);

  return {
    valid: entityAudit.valid && indexAudit.valid && supplemental.valid,
    entityAudit,
    indexAudit,
    routes,
    recommendations,
    discovery,
    totals: countIssuesBySeverity(allIssues),
  };
}

export function formatFullAuditReport(report: FullAuditReport): string {
  const sections: Array<[string, ValidationResult]> = [
    ["Route integrity", report.routes],
    ["Recommendations and links", report.recommendations],
    ["Discovery graph", report.discovery],
  ];

  const lines: string[] = [
    "FriendRank full SEO audit",
    `Status: ${report.valid ? "PASS" : "FAIL"}`,
    `Errors: ${report.totals.errors}`,
    `Warnings: ${report.totals.warnings}`,
    "",
    formatEntityAuditReport(report.entityAudit),
    "",
    formatIndexAuditReport(report.indexAudit),
    "",
    "Additional checks",
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
