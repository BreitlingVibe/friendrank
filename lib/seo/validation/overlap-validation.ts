import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import { getIntentBySlug } from "@/lib/landing-pages/planning/intent-registry";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenizeSlug(slug: string): string[] {
  return slug.split("-").filter(Boolean);
}

function jaccardSimilarity(a: string[], b: string[]): number {
  const setA = new Set(a);
  const setB = new Set(b);
  const intersection = [...setA].filter((token) => setB.has(token)).length;
  const union = new Set([...setA, ...setB]).size;
  return union === 0 ? 0 : intersection / union;
}

function levenshteinRatio(a: string, b: string): number {
  if (a === b) {
    return 1;
  }

  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array<number>(b.length + 1).fill(0),
  );

  for (let i = 0; i <= a.length; i += 1) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= b.length; j += 1) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  const distance = matrix[a.length][b.length];
  const maxLength = Math.max(a.length, b.length);
  return maxLength === 0 ? 1 : 1 - distance / maxLength;
}

function areSlugVariants(a: string, b: string): boolean {
  if (a === b) {
    return false;
  }

  if (a + "s" === b || b + "s" === a) {
    return true;
  }

  const singularGame = (slug: string) =>
    slug.replace(/-games$/, "-game").replace(/-game$/, "");
  if (singularGame(a) === singularGame(b)) {
    return true;
  }

  return jaccardSimilarity(tokenizeSlug(a), tokenizeSlug(b)) >= 0.85;
}

function areNearDuplicateText(a: string, b: string): boolean {
  const left = normalizeText(a);
  const right = normalizeText(b);

  if (!left || !right) {
    return false;
  }

  if (left === right) {
    return false;
  }

  if (left.length >= 24 && right.length >= 24) {
    if (left.includes(right) || right.includes(left)) {
      return true;
    }
  }

  return levenshteinRatio(left, right) >= 0.9;
}

/** Flags possible search intent overlap and cannibalization risks. */
export function validateSearchOverlap(): ValidationResult {
  const issues: ValidationIssue[] = [];
  const pages = LANDING_PAGES;

  for (let i = 0; i < pages.length; i += 1) {
    for (let j = i + 1; j < pages.length; j += 1) {
      const left = pages[i];
      const right = pages[j];

      if (areSlugVariants(left.slug, right.slug)) {
        issues.push(
          issue(
            "overlap.similar_slug",
            "warning",
            `Slug "${left.slug}" may overlap with "${right.slug}".`,
            left.slug,
          ),
        );
      }

      if (areNearDuplicateText(left.metaTitle, right.metaTitle)) {
        issues.push(
          issue(
            "overlap.similar_title",
            "warning",
            `Meta title overlaps with "${right.slug}".`,
            left.slug,
          ),
        );
      }

      if (areNearDuplicateText(left.metaDescription, right.metaDescription)) {
        issues.push(
          issue(
            "overlap.similar_description",
            "warning",
            `Meta description overlaps with "${right.slug}".`,
            left.slug,
          ),
        );
      }

      const leftIntent = getIntentBySlug(left.slug);
      const rightIntent = getIntentBySlug(right.slug);
      if (
        leftIntent &&
        rightIntent &&
        normalizeText(leftIntent.title) === normalizeText(rightIntent.title)
      ) {
        issues.push(
          issue(
            "overlap.shared_primary_keyword",
            "warning",
            `Intent title "${leftIntent.title}" is shared with "${right.slug}".`,
            left.slug,
          ),
        );
      }
    }
  }

  const keywordOwners = new Map<string, string>();
  for (const hub of getAllHubDefinitions()) {
    const keyword = normalizeText(hub.primaryKeyword);
    const previous = keywordOwners.get(keyword);
    if (previous && previous !== hub.slug) {
      issues.push(
        issue(
          "overlap.shared_hub_keyword",
          "warning",
          `Primary keyword "${hub.primaryKeyword}" overlaps hub "${previous}".`,
          hub.slug,
        ),
      );
      continue;
    }

    keywordOwners.set(keyword, hub.slug);
  }

  return createValidationResult(issues);
}
