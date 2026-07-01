import { validateAllLandingPageInternalLinks } from "@/lib/entities/validation/internal-link-validation";
import { validateLandingPageEntities } from "@/lib/entities/validation/landing-page-validation";
import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import {
  createValidationResult,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

const RECOMMENDATION_ISSUE_PREFIXES = ["links."];
const CHIP_ISSUE_CODES = new Set([
  "landing.duplicate_chip",
  "landing.clickable_chip_missing_href",
  "landing.broken_chip_href",
]);

function isRecommendationIssue(entry: ValidationIssue): boolean {
  return (
    RECOMMENDATION_ISSUE_PREFIXES.some((prefix) =>
      entry.code.startsWith(prefix),
    ) || CHIP_ISSUE_CODES.has(entry.code)
  );
}

/** Validates recommendation sections and entity chip link safety. */
export function validateRecommendationIntegrity(): ValidationResult {
  const linkResult = validateAllLandingPageInternalLinks(LANDING_PAGES);
  const chipIssues = LANDING_PAGES.flatMap((page) =>
    validateLandingPageEntities(page).issues.filter(isRecommendationIssue),
  );

  return createValidationResult([...linkResult.issues, ...chipIssues]);
}
