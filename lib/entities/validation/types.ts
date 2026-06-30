export type ValidationSeverity = "error" | "warning";

export type ValidationIssue = {
  code: string;
  severity: ValidationSeverity;
  message: string;
  /** Slug, entity id, hub id, or other scope label. */
  context?: string;
};

export type ValidationResult = {
  valid: boolean;
  issues: ValidationIssue[];
};

export function createValidationResult(issues: ValidationIssue[]): ValidationResult {
  return {
    valid: issues.every((issue) => issue.severity !== "error"),
    issues,
  };
}

export function mergeValidationResults(
  ...results: ValidationResult[]
): ValidationResult {
  const issues = results.flatMap((result) => result.issues);
  return createValidationResult(issues);
}

export function issue(
  code: string,
  severity: ValidationSeverity,
  message: string,
  context?: string,
): ValidationIssue {
  return { code, severity, message, context };
}

export function countIssuesBySeverity(issues: ValidationIssue[]): {
  errors: number;
  warnings: number;
} {
  return {
    errors: issues.filter((entry) => entry.severity === "error").length,
    warnings: issues.filter((entry) => entry.severity === "warning").length,
  };
}
