import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import {
  isApprovedDifferentHeading,
  isApprovedGoodForHeading,
  isApprovedLayoutId,
  isApprovedQuickSetupHeading,
  isApprovedWhenHeading,
} from "@/lib/landing-pages/content-variation";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

const REQUIRED_TRANSITION_KEYS = [
  "beforeWhenToUse",
  "beforeQuickSetup",
] as const;

/** Validates content variation presentation rules for landing pages. */
export function validateContentVariation(): ValidationResult {
  const issues: ValidationIssue[] = [];

  for (const page of LANDING_PAGES) {
    const variation = page.contentVariation;
    const quality = page.contentQuality;

    if (!isApprovedLayoutId(variation.layoutId)) {
      issues.push(
        issue(
          "variation.invalid_layout",
          "error",
          `Layout "${variation.layoutId}" is not an approved layout.`,
          page.slug,
        ),
      );
    }

    if (variation.sectionOrder.length !== 9) {
      issues.push(
        issue(
          "variation.invalid_section_order",
          "error",
          "Section order must include all nine reorderable sections.",
          page.slug,
        ),
      );
    }

    const uniqueSections = new Set(variation.sectionOrder);
    if (uniqueSections.size !== variation.sectionOrder.length) {
      issues.push(
        issue(
          "variation.duplicate_sections",
          "error",
          "Section order contains duplicate section keys.",
          page.slug,
        ),
      );
    }

    if (!variation.personalityHeroSubtitle.trim()) {
      issues.push(
        issue(
          "variation.missing_hero_personality",
          "error",
          "Personality hero subtitle is missing.",
          page.slug,
        ),
      );
    }

    if (!isApprovedGoodForHeading(quality.goodFor.title)) {
      issues.push(
        issue(
          "variation.invalid_good_for_heading",
          "error",
          `Good-for heading "${quality.goodFor.title}" is not approved.`,
          page.slug,
        ),
      );
    }

    if (!isApprovedWhenHeading(quality.whenToUse.title)) {
      issues.push(
        issue(
          "variation.invalid_when_heading",
          "error",
          `When-to-use heading "${quality.whenToUse.title}" is not approved.`,
          page.slug,
        ),
      );
    }

    if (!isApprovedDifferentHeading(quality.whatMakesDifferent.title)) {
      issues.push(
        issue(
          "variation.invalid_different_heading",
          "error",
          `Differentiator heading "${quality.whatMakesDifferent.title}" is not approved.`,
          page.slug,
        ),
      );
    }

    if (!isApprovedQuickSetupHeading(quality.quickSetup.title)) {
      issues.push(
        issue(
          "variation.invalid_quick_setup_heading",
          "error",
          `Quick setup heading "${quality.quickSetup.title}" is not approved.`,
          page.slug,
        ),
      );
    }

    const headingValues = [
      quality.goodFor.title,
      quality.whenToUse.title,
      quality.whatMakesDifferent.title,
      quality.quickSetup.title,
    ];
    if (new Set(headingValues).size !== headingValues.length) {
      issues.push(
        issue(
          "variation.duplicate_headings",
          "error",
          "Duplicate heading variants appear on the same page.",
          page.slug,
        ),
      );
    }

    for (const key of REQUIRED_TRANSITION_KEYS) {
      const transition = variation.transitions[key];
      if (!transition?.trim()) {
        issues.push(
          issue(
            "variation.missing_transition",
            "error",
            `Missing required transition copy for "${key}".`,
            page.slug,
          ),
        );
      }
    }

    for (const transition of Object.values(variation.transitions)) {
      if (transition && transition.split(".").length > 2) {
        issues.push(
          issue(
            "variation.transition_too_long",
            "warning",
            "Transition copy should stay to one sentence.",
            page.slug,
          ),
        );
      }
    }

    if (!variation.cta.finalButtonLabel.trim() || !variation.cta.primaryLabel.trim()) {
      issues.push(
        issue(
          "variation.missing_cta",
          "error",
          "CTA variation labels are missing.",
          page.slug,
        ),
      );
    }

    if (!variation.navigation.entityExplorerIntro.trim()) {
      issues.push(
        issue(
          "variation.missing_navigation_intro",
          "error",
          "Entity explorer intro copy is missing.",
          page.slug,
        ),
      );
    }
  }

  return createValidationResult(issues);
}
