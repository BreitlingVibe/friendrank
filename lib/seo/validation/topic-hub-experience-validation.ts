import { getAllHubs } from "@/lib/topic-hubs";
import { assembleTopicHubPage } from "@/lib/topic-hubs/hub-page-data";
import { introOverlapRatio } from "@/lib/landing-pages/content-experience";
import {
  APPROVED_TOPIC_HUB_SECTION_ORDER,
  applyTopicHubExperience,
  TOPIC_HUB_INTRO_MAX_CHARS,
  TOPIC_HUB_MAIN_SECTIONS,
  type TopicHubMainSectionKey,
} from "@/lib/landing-pages/topic-hub-experience";
import { getRecommendedTopicHubs } from "@/lib/topic-hubs/hub-recommendations";
import {
  createValidationResult,
  issue,
  type ValidationIssue,
  type ValidationResult,
} from "@/lib/entities/validation/types";

function normalizeHeading(value: string): string {
  return value.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function collectPageHeadings(page: ReturnType<typeof applyTopicHubExperience>): string[] {
  const { sectionCopy, topicHubExperience, hub } = page;
  const headings = [
    sectionCopy.liveSectionTitle,
    sectionCopy.featuredSectionTitle,
    page.benefitsTitle,
    topicHubExperience.recommendations.entityExploreTitle,
    topicHubExperience.recommendations.otherHubsTitle,
    page.faqTitle,
    page.authorityPanel.title,
  ].filter((heading): heading is string => Boolean(heading?.trim()));

  return headings.filter(
    (heading) => normalizeHeading(heading) !== normalizeHeading(hub.title),
  );
}

function educationSectionIndex(sectionOrder: TopicHubMainSectionKey[]): number {
  const educationSections: TopicHubMainSectionKey[] = [
    "benefits",
    "faq",
    "authority",
  ];

  return sectionOrder.findIndex((section) => educationSections.includes(section));
}

/** Validates topic hub reading experience quality. */
export function validateTopicHubExperience(): ValidationResult {
  const issues: ValidationIssue[] = [];

  for (const hub of getAllHubs()) {
    const page = applyTopicHubExperience(assembleTopicHubPage(hub));
    const experience = page.topicHubExperience;
    const context = hub.slug;

    for (const section of experience.sectionOrder) {
      if (!TOPIC_HUB_MAIN_SECTIONS.includes(section)) {
        issues.push(
          issue(
            "topic_hub.invalid_section",
            "error",
            `Section "${section}" is not an approved topic hub section.`,
            context,
          ),
        );
      }
    }

    if (new Set(experience.sectionOrder).size !== experience.sectionOrder.length) {
      issues.push(
        issue(
          "topic_hub.duplicate_sections",
          "error",
          "Topic hub section order contains duplicates.",
          context,
        ),
      );
    }

    const approvedPrefix = APPROVED_TOPIC_HUB_SECTION_ORDER.filter((section) =>
      experience.sectionOrder.includes(section),
    );
    if (approvedPrefix.join("|") !== experience.sectionOrder.join("|")) {
      issues.push(
        issue(
          "topic_hub.invalid_section_order",
          "error",
          "Topic hub sections are not in the approved discovery-first order.",
          context,
        ),
      );
    }

    for (const paragraph of page.heroCopy.paragraphs) {
      if (introOverlapRatio(page.heroCopy.lead, paragraph) >= 0.42) {
        issues.push(
          issue(
            "topic_hub.duplicated_hero_intro",
            "error",
            "Hero lead and intro paragraph repeat the same opening.",
            context,
          ),
        );
      }

      if (paragraph.length > TOPIC_HUB_INTRO_MAX_CHARS) {
        issues.push(
          issue(
            "topic_hub.intro_too_long",
            "error",
            `Intro paragraph exceeds ${TOPIC_HUB_INTRO_MAX_CHARS} characters.`,
            context,
          ),
        );
      }
    }

    const exploreIndex = experience.sectionOrder.indexOf("exploreAllGames");
    const educationIndex = educationSectionIndex(experience.sectionOrder);
    if (
      exploreIndex >= 0 &&
      educationIndex >= 0 &&
      exploreIndex > educationIndex
    ) {
      issues.push(
        issue(
          "topic_hub.explore_not_early",
          "error",
          "Explore-all-games section must appear before long educational content.",
          context,
        ),
      );
    }

    const headings = collectPageHeadings(page);
    if (new Set(headings.map(normalizeHeading)).size !== headings.length) {
      issues.push(
        issue(
          "topic_hub.duplicate_headings",
          "error",
          "Repeated headings appear across topic hub sections.",
          context,
        ),
      );
    }

    if (
      experience.recommendations.showOtherHubs &&
      experience.recommendations.showEntityExplore
    ) {
      const entityDestinations = new Set(
        page.entityNavigation.groups
          .flatMap((group) => group.chips)
          .filter((chip) => chip.clickable && chip.href)
          .map((chip) => chip.href as string),
      );
      const hubDestinations = new Set(
        getRecommendedTopicHubs(hub.id).map((entry) => `/${entry.slug}`),
      );

      if (entityDestinations.size > 0 && hubDestinations.size > 0) {
        const overlap = [...entityDestinations].filter((destination) =>
          hubDestinations.has(destination),
        ).length;
        const overlapRatio =
          overlap / Math.min(entityDestinations.size, hubDestinations.size);

        if (overlapRatio >= 0.7) {
          issues.push(
            issue(
              "topic_hub.redundant_recommendations",
              "error",
              "Entity explore and other hubs expose nearly identical destinations.",
              context,
            ),
          );
        }
      }
    }

    const recommendationTitles = [
      experience.recommendations.entityExploreTitle,
      experience.recommendations.otherHubsTitle,
    ];
    if (new Set(recommendationTitles).size !== recommendationTitles.length) {
      issues.push(
        issue(
          "topic_hub.duplicate_recommendation_titles",
          "error",
          "Recommendation section titles must be unique on the topic hub.",
          context,
        ),
      );
    }
  }

  return createValidationResult(issues);
}
