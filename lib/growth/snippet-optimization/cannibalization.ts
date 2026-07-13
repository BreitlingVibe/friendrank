import type {
  SnippetCannibalizationWarning,
  SnippetCandidate,
  SnippetPageSnapshot,
} from "@/lib/growth/snippet-optimization/types";
import {
  getAllSnippetPageSnapshots,
  getRelatedPageSnapshots,
} from "@/lib/growth/snippet-optimization/page-metadata";
import type { SearchConsoleCompetingUrl } from "@/lib/growth/snippet-optimization/types";

function normalizeText(value: string): string {
  return value.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function similarity(left: string, right: string): number {
  const leftTokens = new Set(normalizeText(left).split(" ").filter(Boolean));
  const rightTokens = normalizeText(right).split(" ").filter(Boolean);
  if (rightTokens.length === 0) {
    return 0;
  }
  const matched = rightTokens.filter((token) => leftTokens.has(token)).length;
  return matched / rightTokens.length;
}

function singularPluralConflict(slugA: string, slugB: string): boolean {
  if (slugA === slugB) {
    return false;
  }
  return slugA.replace(/s$/, "") === slugB.replace(/s$/, "");
}

export function analyzeCannibalization(input: {
  page: SnippetPageSnapshot;
  candidate?: SnippetCandidate;
  competingUrls?: readonly SearchConsoleCompetingUrl[];
}): {
  warnings: SnippetCannibalizationWarning[];
  duplicationRisk: "low" | "medium" | "high";
  cannibalizationRisk: "low" | "medium" | "high";
} {
  const warnings: SnippetCannibalizationWarning[] = [];
  const related = getRelatedPageSnapshots(input.page.slug, 20);
  const allPages = getAllSnippetPageSnapshots();

  const candidateTitle = input.candidate?.title ?? input.page.currentTitle;
  const candidateDescription =
    input.candidate?.metaDescription ?? input.page.currentDescription;

  for (const relatedPage of related) {
    const titleSimilarity = similarity(candidateTitle, relatedPage.currentTitle);
    if (titleSimilarity >= 0.85) {
      warnings.push({
        severity: "error",
        code: "cannibalization.near_identical_title",
        message: `Candidate title is nearly identical to ${relatedPage.slug} title.`,
        relatedSlug: relatedPage.slug,
      });
    } else if (titleSimilarity >= 0.65) {
      warnings.push({
        severity: "warning",
        code: "cannibalization.similar_title",
        message: `Candidate title overlaps heavily with ${relatedPage.slug}.`,
        relatedSlug: relatedPage.slug,
      });
    }

    if (singularPluralConflict(input.page.slug, relatedPage.slug)) {
      const playableVsGuide =
        (input.page.pageType === "landing-page" &&
          relatedPage.pageType === "evergreen-hub") ||
        (input.page.pageType === "evergreen-hub" &&
          relatedPage.pageType === "landing-page");
      if (playableVsGuide && titleSimilarity >= 0.5) {
        warnings.push({
          severity: "warning",
          code: "cannibalization.singular_plural",
          message: `Singular/plural sibling ${relatedPage.slug} may compete without clear snippet distinction.`,
          relatedSlug: relatedPage.slug,
        });
      }
    }

    if (
      normalizeText(relatedPage.currentH1) === normalizeText(input.page.currentH1) &&
      relatedPage.pageType !== input.page.pageType
    ) {
      warnings.push({
        severity: "warning",
        code: "cannibalization.shared_h1",
        message: `Related page ${relatedPage.slug} shares the same H1 theme.`,
        relatedSlug: relatedPage.slug,
      });
    }
  }

  for (const competing of input.competingUrls ?? []) {
    if (competing.slug === input.page.slug) {
      continue;
    }
    if (competing.impressions > 0) {
      warnings.push({
        severity: "warning",
        code: "cannibalization.search_console_competitor",
        message: `Search Console shows query impressions on sibling URL /${competing.slug} (${competing.impressions} impressions).`,
        relatedSlug: competing.slug,
      });
    }
  }

  const duplicateTitle = allPages.find(
    (entry) =>
      entry.slug !== input.page.slug &&
      normalizeText(entry.currentTitle) === normalizeText(candidateTitle),
  );
  if (duplicateTitle) {
    warnings.push({
      severity: "error",
      code: "cannibalization.duplicate_live_title",
      message: `Candidate title duplicates live title on /${duplicateTitle.slug}.`,
      relatedSlug: duplicateTitle.slug,
    });
  }

  const duplicateDescription = allPages.find(
    (entry) =>
      entry.slug !== input.page.slug &&
      normalizeText(entry.currentDescription) === normalizeText(candidateDescription),
  );
  if (duplicateDescription) {
    warnings.push({
      severity: "warning",
      code: "cannibalization.duplicate_live_description",
      message: `Candidate description duplicates live description on /${duplicateDescription.slug}.`,
      relatedSlug: duplicateDescription.slug,
    });
  }

  const hasError = warnings.some((warning) => warning.severity === "error");
  const warningCount = warnings.length;

  const cannibalizationRisk: "low" | "medium" | "high" = hasError
    ? "high"
    : warningCount >= 3
      ? "high"
      : warningCount >= 1
        ? "medium"
        : "low";

  const duplicationRisk =
    duplicateTitle || duplicateDescription
      ? "high"
      : warnings.some((warning) => warning.code.includes("near_identical"))
        ? "high"
        : warningCount > 0
          ? "medium"
          : "low";

  return { warnings, duplicationRisk, cannibalizationRisk };
}
