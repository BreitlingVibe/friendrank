import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageStructuredData } from "@/lib/landing-pages/landing-page-schema";
import { validateStructuredDataGraph } from "@/lib/seo/schema-validation";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

function requireNonEmpty(
  issues: ValidationIssue[],
  code: string,
  message: string,
  slug: string,
  value: string,
): void {
  if (!value.trim()) {
    issues.push(issue(code, "error", message, slug));
  }
}

/** Validates landing page content completeness for indexing quality. */
export function validateContentCompleteness(): ValidationResult {
  const issues: ValidationIssue[] = [];

  for (const page of LANDING_PAGES) {
    requireNonEmpty(
      issues,
      "content.missing_hero",
      "Landing page is missing hero copy.",
      page.slug,
      page.heroSubtitle,
    );
    requireNonEmpty(
      issues,
      "content.missing_intent_summary",
      "Landing page is missing intent summary.",
      page.slug,
      page.intentSummary,
    );
    requireNonEmpty(
      issues,
      "content.missing_final_cta_title",
      "Landing page is missing final CTA title.",
      page.slug,
      page.finalCtaTitle,
    );
    requireNonEmpty(
      issues,
      "content.missing_final_cta_subtitle",
      "Landing page is missing final CTA subtitle.",
      page.slug,
      page.finalCtaSubtitle,
    );
    requireNonEmpty(
      issues,
      "content.missing_schema_description",
      "Landing page is missing schema description.",
      page.slug,
      page.schemaDescription,
    );

    if (page.bestForTags.length === 0) {
      issues.push(
        issue(
          "content.missing_best_for",
          "error",
          "Landing page is missing Best For tags.",
          page.slug,
        ),
      );
    }

    if (page.howToPlay.steps.length === 0) {
      issues.push(
        issue(
          "content.missing_how_to_play",
          "error",
          "Landing page is missing How to Play steps.",
          page.slug,
        ),
      );
    }

    if (page.exampleQuestions.length === 0) {
      issues.push(
        issue(
          "content.missing_example_questions",
          "error",
          "Landing page is missing example questions.",
          page.slug,
        ),
      );
    }

    if (page.faq.length === 0) {
      issues.push(
        issue(
          "content.missing_faq",
          "error",
          "Landing page is missing FAQ entries.",
          page.slug,
        ),
      );
    }

    if (page.entityNavigation.groups.length === 0) {
      issues.push(
        issue(
          "content.missing_entity_explorer",
          "error",
          "Landing page is missing entity explorer groups.",
          page.slug,
        ),
      );
    }

    if (page.entityAuthorityPanel.bullets.length === 0) {
      issues.push(
        issue(
          "content.missing_authority_panel",
          "error",
          "Landing page is missing authority panel bullets.",
          page.slug,
        ),
      );
    }

    const quality = page.contentQuality;
    if (
      quality.goodFor.paragraphs.length === 0 &&
      quality.goodFor.bullets.length === 0
    ) {
      issues.push(
        issue(
          "content.missing_good_for",
          "error",
          "Landing page is missing the content quality good-for section.",
          page.slug,
        ),
      );
    }

    if (quality.whenToUse.bullets.length < 4) {
      issues.push(
        issue(
          "content.missing_when_to_use",
          "error",
          "Landing page must include at least four when-to-use cases.",
          page.slug,
        ),
      );
    }

    if (quality.whatMakesDifferent.bullets.length === 0) {
      issues.push(
        issue(
          "content.missing_differentiators",
          "error",
          "Landing page is missing what-makes-it-different bullets.",
          page.slug,
        ),
      );
    }

    if (quality.quickSetup.steps.length === 0) {
      issues.push(
        issue(
          "content.missing_quick_setup",
          "error",
          "Landing page is missing quick setup steps.",
          page.slug,
        ),
      );
    }

    requireNonEmpty(
      issues,
      "content.missing_enhanced_intro",
      "Landing page is missing enhanced intro lead.",
      page.slug,
      page.intentLead ?? "",
    );

    const sectionTitles = [
      quality.goodFor.title,
      quality.whenToUse.title,
      quality.whatMakesDifferent.title,
      quality.quickSetup.title,
    ];
    if (new Set(sectionTitles).size !== sectionTitles.length) {
      issues.push(
        issue(
          "content.duplicate_quality_headings",
          "error",
          "Content quality sections contain duplicate headings.",
          page.slug,
        ),
      );
    }

    for (const block of [
      quality.goodFor,
      quality.whenToUse,
      quality.whatMakesDifferent,
    ]) {
      for (const paragraph of block.paragraphs) {
        if (!paragraph.trim()) {
          issues.push(
            issue(
              "content.empty_quality_copy",
              "error",
              `Content quality section "${block.title}" contains empty copy.`,
              page.slug,
            ),
          );
        }
      }

      for (const bullet of block.bullets) {
        if (!bullet.trim()) {
          issues.push(
            issue(
              "content.empty_quality_copy",
              "error",
              `Content quality section "${block.title}" contains empty bullets.`,
              page.slug,
            ),
          );
        }
      }
    }

    const schemaResult = validateStructuredDataGraph(
      buildLandingPageStructuredData(page),
      page.slug,
    );
    if (!schemaResult.valid) {
      for (const schemaIssue of schemaResult.issues.filter(
        (entry) => entry.severity === "error",
      )) {
        issues.push(
          issue(
            "content.invalid_structured_data",
            "error",
            schemaIssue.message,
            page.slug,
          ),
        );
      }
    }

    if (!page.entitySummary?.trim()) {
      issues.push(
        issue(
          "content.missing_entity_summary",
          "warning",
          "Landing page is missing entity summary copy.",
          page.slug,
        ),
      );
    }

    if (!page.formatComparison) {
      issues.push(
        issue(
          "content.missing_format_comparison",
          "warning",
          "Landing page has no format comparison block.",
          page.slug,
        ),
      );
    }
  }

  return createValidationResult(issues);
}
