import {
  getLiveCategories,
  getPillarBySlug,
} from "@/lib/discovery/category-registry";
import { getGameEntryPoint } from "@/lib/discovery/discovery-utils";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

/** Ensures live category hubs are connected in the discovery graph. */
export function validateCategoryRegistry(): ValidationResult {
  const issues: ValidationIssue[] = [];

  for (const category of getLiveCategories()) {
    const pillar = getPillarBySlug(category.parentPillar);
    if (!pillar) {
      issues.push(
        issue(
          "discovery.missing_parent_pillar",
          "error",
          `Live category "${category.slug}" references missing parent pillar "${category.parentPillar}".`,
          category.slug,
        ),
      );
    }

    const resolvedEvergreen = category.relatedEvergreenSlugs.filter((slug) =>
      Boolean(getIntentBySlug(slug)),
    );

    if (resolvedEvergreen.length === 0) {
      issues.push(
        issue(
          "discovery.missing_related_page",
          "error",
          `Live category "${category.slug}" must reference at least one intent-registry evergreen page.`,
          category.slug,
        ),
      );
    }

    const cta = getGameEntryPoint();
    if (!cta.href || !cta.title) {
      issues.push(
        issue(
          "discovery.missing_cta",
          "error",
          `Live category "${category.slug}" is missing a game creation entry point.`,
          category.slug,
        ),
      );
    }
  }

  return createValidationResult(issues);
}
