import { LANDING_PAGES } from "@/lib/landing-pages/landing-page-data";
import {
  PACING_PROFILES,
  TAIL_SECTIONS,
  introOverlapRatio,
} from "@/lib/landing-pages/content-experience";
import { REORDERABLE_SECTIONS } from "@/lib/landing-pages/content-variation";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

/** Validates reading experience quality for landing pages. */
export function validateContentExperience(): ValidationResult {
  const issues: ValidationIssue[] = [];

  for (const page of LANDING_PAGES) {
    const experience = page.contentExperience;

    if (!PACING_PROFILES.includes(experience.pacingProfile)) {
      issues.push(
        issue(
          "experience.invalid_pacing_profile",
          "error",
          `Pacing profile "${experience.pacingProfile}" is not approved.`,
          page.slug,
        ),
      );
    }

    if (experience.sectionOrder.length === 0) {
      issues.push(
        issue(
          "experience.empty_section_order",
          "error",
          "Experience section order is empty.",
          page.slug,
        ),
      );
    }

    for (const section of experience.sectionOrder) {
      if (!REORDERABLE_SECTIONS.includes(section)) {
        issues.push(
          issue(
            "experience.invalid_section",
            "error",
            `Section "${section}" is not an approved reorderable section.`,
            page.slug,
          ),
        );
      }
    }

    if (new Set(experience.sectionOrder).size !== experience.sectionOrder.length) {
      issues.push(
        issue(
          "experience.duplicate_sections",
          "error",
          "Experience section order contains duplicates.",
          page.slug,
        ),
      );
    }

    for (const section of experience.tailSectionOrder) {
      if (!TAIL_SECTIONS.includes(section)) {
        issues.push(
          issue(
            "experience.invalid_tail_section",
            "error",
            `Tail section "${section}" is not approved.`,
            page.slug,
          ),
        );
      }
    }

    if (page.intentLead && introOverlapRatio(page.heroSubtitle, page.intentLead) >= 0.42) {
      issues.push(
        issue(
          "experience.duplicated_intro",
          "error",
          "Intro lead repeats the hero subtitle opening.",
          page.slug,
        ),
      );
    }

    if (
      page.intentLead &&
      introOverlapRatio(page.intentLead, page.intentSummary) >= 0.55
    ) {
      issues.push(
        issue(
          "experience.duplicated_intro_summary",
          "error",
          "Intro lead and intent summary repeat the same opening.",
          page.slug,
        ),
      );
    }

    const recommendationTitles = [
      page.relatedPagesTitle,
      page.youMayAlsoLikeTitle,
      page.popularSearchesTitle,
      page.playersAlsoEnjoyTitle,
    ];
    if (new Set(recommendationTitles).size !== recommendationTitles.length) {
      issues.push(
        issue(
          "experience.duplicate_recommendation_titles",
          "error",
          "Recommendation section titles must be unique on the page.",
          page.slug,
        ),
      );
    }

    if (
      experience.recommendations.showPlayersAlsoEnjoy &&
      experience.recommendations.showYouMayAlsoLike
    ) {
      const enjoySlugs = new Set(page.playersAlsoEnjoy.map((entry) => entry.slug));
      const overlap = page.youMayAlsoLike.filter((entry) =>
        enjoySlugs.has(entry.slug),
      ).length;
      if (
        overlap >=
        Math.min(page.playersAlsoEnjoy.length, page.youMayAlsoLike.length)
      ) {
        issues.push(
          issue(
            "experience.redundant_recommendations",
            "warning",
            "Players also enjoy and you may also like expose nearly identical links.",
            page.slug,
          ),
        );
      }
    }

    if (!experience.transitions.beforeWhenToUse?.trim()) {
      issues.push(
        issue(
          "experience.missing_transition",
          "error",
          "Missing when-to-use transition copy.",
          page.slug,
        ),
      );
    }

    if (!experience.transitions.beforeQuickSetup?.trim()) {
      issues.push(
        issue(
          "experience.missing_transition",
          "error",
          "Missing quick setup transition copy.",
          page.slug,
        ),
      );
    }

    if (!page.relatedPagesTitle.trim() || !page.popularSearchesTitle.trim()) {
      issues.push(
        issue(
          "experience.missing_navigation_labels",
          "error",
          "Recommendation navigation labels are missing.",
          page.slug,
        ),
      );
    }

    const pageHeadings = [
      page.contentQuality.goodFor.title,
      page.contentQuality.whenToUse.title,
      page.contentQuality.whatMakesDifferent.title,
      page.intentSummaryTitle,
      page.relatedPagesTitle,
      page.youMayAlsoLikeTitle,
      page.popularSearchesTitle,
    ];
    if (new Set(pageHeadings).size !== pageHeadings.length) {
      issues.push(
        issue(
          "experience.duplicate_headings",
          "error",
          "Repeated headings appear across page sections.",
          page.slug,
        ),
      );
    }
  }

  return createValidationResult(issues);
}
