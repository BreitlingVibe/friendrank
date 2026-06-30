import { getEntity } from "@/lib/entities/entity-utils";
import { isValidNavigationTarget } from "@/lib/entities/entity-targets";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

function validateEntityRefs(
  slug: string,
  label: string,
  entities: LandingPageData["primaryEntities"],
  issues: ValidationIssue[],
): void {
  for (const entityRef of entities) {
    if (!getEntity(entityRef.id)) {
      issues.push(
        issue(
          "landing.invalid_entity_id",
          "error",
          `${label} references unknown entity id "${entityRef.id}".`,
          slug,
        ),
      );
    }
  }
}

function validateChipList(
  slug: string,
  label: string,
  chips: Array<{
    id: string;
    href: string | null;
    clickable: boolean;
  }>,
  issues: ValidationIssue[],
): void {
  const seen = new Set<string>();

  for (const chip of chips) {
    if (seen.has(chip.id)) {
      issues.push(
        issue(
          "landing.duplicate_chip",
          "error",
          `${label} contains duplicate chip "${chip.id}".`,
          slug,
        ),
      );
    }

    seen.add(chip.id);

    if (chip.clickable) {
      if (!chip.href) {
        issues.push(
          issue(
            "landing.clickable_chip_missing_href",
            "error",
            `${label} chip "${chip.id}" is clickable without an href.`,
            slug,
          ),
        );
      } else if (!isValidNavigationTarget(chip.href)) {
        issues.push(
          issue(
            "landing.broken_chip_href",
            "error",
            `${label} chip "${chip.id}" links to invalid route "${chip.href}".`,
            slug,
          ),
        );
      }
    }
  }
}

/** Validates entity resolution output for one landing page. */
export function validateLandingPageEntities(page: LandingPageData): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (page.primaryEntities.length === 0) {
    issues.push(
      issue(
        "landing.missing_primary_entity",
        "error",
        "Landing page has no primary entities.",
        page.slug,
      ),
    );
  }

  validateEntityRefs(page.slug, "primaryEntities", page.primaryEntities, issues);
  validateEntityRefs(
    page.slug,
    "secondaryEntities",
    page.secondaryEntities,
    issues,
  );
  validateEntityRefs(page.slug, "relatedEntities", page.relatedEntities, issues);
  validateChipList(page.slug, "entityChips", page.entityChips, issues);

  for (const group of page.entityNavigation.groups) {
    validateChipList(
      page.slug,
      `entityNavigation.${group.groupKey}`,
      group.chips,
      issues,
    );

    for (const chip of group.chips) {
      if (!chip.name.trim()) {
        issues.push(
          issue(
            "landing.empty_explorer_chip",
            "error",
            `Entity explorer group "${group.groupKey}" has an empty chip name.`,
            page.slug,
          ),
        );
      }
    }
  }

  if (page.entityAuthorityPanel.bullets.length === 0) {
    issues.push(
      issue(
        "landing.empty_authority_panel",
        "warning",
        "Entity authority panel has no bullets.",
        page.slug,
      ),
    );
  }

  if (page.entityNavigation.groups.length === 0) {
    issues.push(
      issue(
        "landing.empty_entity_explorer",
        "warning",
        "Entity explorer has no navigation groups.",
        page.slug,
      ),
    );
  }

  return createValidationResult(issues);
}

/** Validates entity resolution for all assembled landing pages. */
export function validateAllLandingPageEntities(
  pages: LandingPageData[],
): ValidationResult {
  const issues: ValidationIssue[] = [];

  for (const page of pages) {
    issues.push(...validateLandingPageEntities(page).issues);
  }

  return createValidationResult(issues);
}
