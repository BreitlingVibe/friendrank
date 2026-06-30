import { isValidNavigationTarget } from "@/lib/entities/entity-targets";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

function validateUniqueSlugs(
  slug: string,
  label: string,
  pages: Array<{ slug: string }>,
  issues: ValidationIssue[],
): void {
  const seen = new Set<string>();

  for (const page of pages) {
    if (seen.has(page.slug)) {
      issues.push(
        issue(
          "links.duplicate_recommendation",
          "error",
          `${label} contains duplicate slug "${page.slug}".`,
          slug,
        ),
      );
    }

    seen.add(page.slug);

    if (page.slug === slug) {
      issues.push(
        issue(
          "links.self_recommendation",
          "error",
          `${label} includes the current page slug.`,
          slug,
        ),
      );
    }
  }
}

function collectShownSlugs(page: LandingPageData): Set<string> {
  return new Set([
    page.slug,
    ...page.relatedPages.map((entry) => entry.slug),
    ...page.youMayAlsoLike.map((entry) => entry.slug),
    ...page.playersAlsoEnjoy.map((entry) => entry.slug),
  ]);
}

/** Validates recommendation and entity link safety for one landing page. */
export function validateLandingPageInternalLinks(
  page: LandingPageData,
): ValidationResult {
  const issues: ValidationIssue[] = [];

  validateUniqueSlugs(page.slug, "relatedPages", page.relatedPages, issues);
  validateUniqueSlugs(
    page.slug,
    "youMayAlsoLike",
    page.youMayAlsoLike,
    issues,
  );
  validateUniqueSlugs(
    page.slug,
    "playersAlsoEnjoy",
    page.playersAlsoEnjoy,
    issues,
  );

  for (const section of [
    { label: "relatedPages", pages: page.relatedPages },
    { label: "youMayAlsoLike", pages: page.youMayAlsoLike },
    { label: "playersAlsoEnjoy", pages: page.playersAlsoEnjoy },
  ]) {
    for (const relatedPage of section.pages) {
      if (relatedPage.available && relatedPage.slug === page.slug) {
        issues.push(
          issue(
            "links.active_self_link",
            "error",
            `${section.label} links to the current page as an active route.`,
            page.slug,
          ),
        );
      }

      if (relatedPage.available && !isValidNavigationTarget(`/${relatedPage.slug}`)) {
        issues.push(
          issue(
            "links.invalid_active_recommendation",
            "error",
            `${section.label} active link "${relatedPage.slug}" is not a live route.`,
            page.slug,
          ),
        );
      }
    }
  }

  const shownSlugs = collectShownSlugs(page);

  for (const searchLink of page.popularSearches) {
    if (searchLink.kind === "landing" && shownSlugs.has(searchLink.slug)) {
      issues.push(
        issue(
          "links.popular_search_overlap",
          "warning",
          `Popular search "${searchLink.slug}" overlaps a slug already shown above.`,
          page.slug,
        ),
      );
    }

    if (
      searchLink.kind === "landing" &&
      !isValidNavigationTarget(`/${searchLink.slug}`)
    ) {
      issues.push(
        issue(
          "links.invalid_popular_search",
          "error",
          `Popular search links to invalid landing slug "${searchLink.slug}".`,
          page.slug,
        ),
      );
    }

    if (searchLink.kind === "hub" && !isValidNavigationTarget(`/${searchLink.slug}`)) {
      issues.push(
        issue(
          "links.invalid_popular_hub",
          "error",
          `Popular search links to invalid hub slug "${searchLink.slug}".`,
          page.slug,
        ),
      );
    }
  }

  for (const chip of page.entityChips) {
    if (chip.clickable && chip.href && !isValidNavigationTarget(chip.href)) {
      issues.push(
        issue(
          "links.invalid_entity_chip",
          "error",
          `Entity chip "${chip.id}" links to invalid route "${chip.href}".`,
          page.slug,
        ),
      );
    }
  }

  return createValidationResult(issues);
}

/** Validates internal link safety for all landing pages. */
export function validateAllLandingPageInternalLinks(
  pages: LandingPageData[],
): ValidationResult {
  const issues: ValidationIssue[] = [];

  for (const page of pages) {
    issues.push(...validateLandingPageInternalLinks(page).issues);
  }

  return createValidationResult(issues);
}
