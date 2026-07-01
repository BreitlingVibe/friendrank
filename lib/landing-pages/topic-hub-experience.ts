import { introOverlapRatio } from "@/lib/landing-pages/content-experience";
import { getRecommendedTopicHubs } from "@/lib/topic-hubs/hub-recommendations";
import type { HubBenefit } from "@/lib/topic-hubs/hub-content-types";
import type { AssembledTopicHubPage } from "@/lib/topic-hubs/hub-page-data";
import type {
  ResolvedHubHeroCopy,
  ResolvedHubSectionCopy,
} from "@/lib/topic-hubs/hub-section-copy";
import type { EntityNavigation } from "@/lib/entities/entity-navigation";

export const TOPIC_HUB_MAIN_SECTIONS = [
  "exploreAllGames",
  "featuredGames",
  "entityExplore",
  "benefits",
  "faq",
  "authority",
  "otherHubs",
  "plannedGames",
] as const;

export type TopicHubMainSectionKey = (typeof TOPIC_HUB_MAIN_SECTIONS)[number];

export const APPROVED_TOPIC_HUB_SECTION_ORDER: TopicHubMainSectionKey[] = [
  "exploreAllGames",
  "featuredGames",
  "entityExplore",
  "benefits",
  "faq",
  "authority",
  "otherHubs",
  "plannedGames",
];

export const TOPIC_HUB_INTRO_MAX_CHARS = 220;
export const TOPIC_HUB_SECTION_INTRO_MAX_CHARS = 140;
export const TOPIC_HUB_MAX_BENEFITS = 4;
export const TOPIC_HUB_BENEFIT_DESC_MAX_CHARS = 120;

export type TopicHubRecommendationExperience = {
  otherHubsTitle: string;
  otherHubsIntro: string;
  entityExploreTitle: string;
  entityExploreIntro: string;
  showOtherHubs: boolean;
  showEntityExplore: boolean;
};

export type TopicHubContentExperience = {
  sectionOrder: TopicHubMainSectionKey[];
  suppressedSections: TopicHubMainSectionKey[];
  recommendations: TopicHubRecommendationExperience;
  compactBenefits: boolean;
  maxBenefits: number;
};

export type TopicHubPageData = AssembledTopicHubPage & {
  topicHubExperience: TopicHubContentExperience;
};

type HubHeadingProfile = {
  featuredTitle: string;
  liveTitle: string;
  benefitsTitle: string;
  entityExploreTitle: string;
  entityExploreIntro: string;
  otherHubsTitle: string;
  otherHubsIntro: string;
};

const HUB_HEADING_PROFILES: Record<string, HubHeadingProfile> = {
  "friend-games": {
    featuredTitle: "Popular formats",
    liveTitle: "Explore all games",
    benefitsTitle: "Why people enjoy these games",
    entityExploreTitle: "Browse by topic",
    entityExploreIntro: "Prefer conversation starters? Jump in by audience or format.",
    otherHubsTitle: "Explore another category",
    otherHubsIntro: "Need a game for a bigger group or a different vibe? Try these hubs.",
  },
  "party-games": {
    featuredTitle: "Quick party picks",
    liveTitle: "Explore all party games",
    benefitsTitle: "Where these games work best",
    entityExploreTitle: "Browse by occasion",
    entityExploreIntro: "Looking for something faster? Filter by hangout type or format.",
    otherHubsTitle: "Explore another category",
    otherHubsIntro: "Want games for coworkers, couples, or friend groups instead?",
  },
  "relationship-games": {
    featuredTitle: "Popular formats",
    liveTitle: "Explore all relationship games",
    benefitsTitle: "Choose the right game",
    entityExploreTitle: "Browse by topic",
    entityExploreIntro: "Prefer conversation starters? Explore couple and group angles.",
    otherHubsTitle: "Explore another category",
    otherHubsIntro: "Want party games or friend-group quizzes instead? Browse here.",
  },
  "team-building-games": {
    featuredTitle: "Quick ideas",
    liveTitle: "Explore all team games",
    benefitsTitle: "Where these games work best",
    entityExploreTitle: "Browse by workplace moment",
    entityExploreIntro: "Need a game for a bigger group? Filter by team size or occasion.",
    otherHubsTitle: "Explore another category",
    otherHubsIntro: "Looking for icebreakers or casual social games instead?",
  },
  "icebreaker-games": {
    featuredTitle: "Popular formats",
    liveTitle: "Explore all icebreaker games",
    benefitsTitle: "Why groups use these games",
    entityExploreTitle: "Browse by setting",
    entityExploreIntro: "Need a game for a bigger group? Filter by office, classroom, or event.",
    otherHubsTitle: "Explore another category",
    otherHubsIntro: "Want party games or team-building options instead?",
  },
  "question-games": {
    featuredTitle: "Popular formats",
    liveTitle: "Explore all question games",
    benefitsTitle: "Quick ideas",
    entityExploreTitle: "Browse by prompt style",
    entityExploreIntro: "Prefer conversation starters? Explore Would You Rather and similar formats.",
    otherHubsTitle: "Explore another category",
    otherHubsIntro: "Want friend games or party voting games instead?",
  },
};

function firstSentence(text: string): string {
  const sentence = text.split(".")[0]?.trim();
  return sentence ? `${sentence}.` : text.trim();
}

function truncateAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  const shortened = text.slice(0, maxLength - 1).replace(/\s+\S*$/, "");
  return `${shortened}…`;
}

function shortenSectionIntro(text: string): string {
  if (!text.trim()) {
    return text;
  }

  const sentence = firstSentence(text.trim());
  return truncateAtWord(sentence, TOPIC_HUB_SECTION_INTRO_MAX_CHARS);
}

function normalizeHeading(value: string): string {
  return value.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function headingRepeatsHubTitle(heading: string, hubTitle: string): boolean {
  const normalizedHeading = normalizeHeading(heading);
  const normalizedTitle = normalizeHeading(hubTitle);

  if (normalizedHeading === normalizedTitle) {
    return true;
  }

  if (normalizedHeading.startsWith(`${normalizedTitle} `)) {
    return true;
  }

  return introOverlapRatio(hubTitle, heading) >= 0.65;
}

function resolveHeadingProfile(hubId: string): HubHeadingProfile {
  return (
    HUB_HEADING_PROFILES[hubId] ?? {
      featuredTitle: "Popular choices",
      liveTitle: "Explore all games",
      benefitsTitle: "Why people enjoy these games",
      entityExploreTitle: "Browse by topic",
      entityExploreIntro: "Explore another angle by audience, format, or occasion.",
      otherHubsTitle: "Explore another category",
      otherHubsIntro: "Browse nearby game categories picked for similar groups.",
    }
  );
}

function refineHubHero(hero: ResolvedHubHeroCopy): ResolvedHubHeroCopy {
  let paragraphs = hero.paragraphs.filter(
    (paragraph) => introOverlapRatio(hero.lead, paragraph) < 0.42,
  );

  if (paragraphs.length > 1) {
    paragraphs = [paragraphs[0]];
  }

  if (paragraphs[0]) {
    const trimmed = truncateAtWord(firstSentence(paragraphs[0]), TOPIC_HUB_INTRO_MAX_CHARS);
    if (introOverlapRatio(hero.lead, trimmed) >= 0.35) {
      paragraphs = [];
    } else {
      paragraphs = [trimmed];
    }
  }

  return {
    lead: hero.lead.trim(),
    paragraphs,
  };
}

function refineSectionCopy(
  hubId: string,
  hubTitle: string,
  sectionCopy: ResolvedHubSectionCopy,
  profile: HubHeadingProfile,
): ResolvedHubSectionCopy {
  const featuredTitle = headingRepeatsHubTitle(sectionCopy.featuredSectionTitle, hubTitle)
    ? profile.featuredTitle
    : sectionCopy.featuredSectionTitle;

  const liveTitle = headingRepeatsHubTitle(sectionCopy.liveSectionTitle, hubTitle)
    ? profile.liveTitle
    : sectionCopy.liveSectionTitle;

  return {
    featuredSectionTitle: featuredTitle,
    featuredSectionIntro: shortenSectionIntro(sectionCopy.featuredSectionIntro),
    liveSectionTitle: liveTitle,
    liveSectionIntro: shortenSectionIntro(sectionCopy.liveSectionIntro),
    comingSoonIntro: shortenSectionIntro(sectionCopy.comingSoonIntro),
  };
}

function compressBenefits(benefits: HubBenefit[]): HubBenefit[] {
  return benefits.slice(0, TOPIC_HUB_MAX_BENEFITS).map((benefit) => ({
    title: benefit.title,
    description: truncateAtWord(
      firstSentence(benefit.description),
      TOPIC_HUB_BENEFIT_DESC_MAX_CHARS,
    ),
  }));
}

function extractNavigationDestinations(navigation: EntityNavigation): Set<string> {
  return new Set(
    navigation.groups
      .flatMap((group) => group.chips)
      .filter((chip) => chip.clickable && chip.href)
      .map((chip) => chip.href as string),
  );
}

function extractRecommendedHubDestinations(hubId: string): Set<string> {
  return new Set(
    getRecommendedTopicHubs(hubId).map((hub) => `/${hub.slug}`),
  );
}

function destinationOverlap(left: Set<string>, right: Set<string>): number {
  if (left.size === 0 || right.size === 0) {
    return 0;
  }

  const overlap = [...left].filter((destination) => right.has(destination)).length;
  return overlap / Math.min(left.size, right.size);
}

function resolveRecommendationExperience(
  hubId: string,
  entityNavigation: EntityNavigation,
  profile: HubHeadingProfile,
): TopicHubRecommendationExperience {
  const entityDestinations = extractNavigationDestinations(entityNavigation);
  const hubDestinations = extractRecommendedHubDestinations(hubId);
  const hubOverlap = destinationOverlap(entityDestinations, hubDestinations);

  const showOtherHubs = hubOverlap < 0.7;
  const showEntityExplore = entityNavigation.groups.length > 0;

  return {
    otherHubsTitle: profile.otherHubsTitle,
    otherHubsIntro: profile.otherHubsIntro,
    entityExploreTitle: profile.entityExploreTitle,
    entityExploreIntro: profile.entityExploreIntro,
    showOtherHubs,
    showEntityExplore,
  };
}

function resolveSuppressedSections(
  page: AssembledTopicHubPage,
  recommendations: TopicHubRecommendationExperience,
): TopicHubMainSectionKey[] {
  const suppressed: TopicHubMainSectionKey[] = [];

  if (page.allLivePages.length === 0) {
    suppressed.push("exploreAllGames");
  }

  if (page.featuredPages.length === 0) {
    suppressed.push("featuredGames");
  }

  if (!recommendations.showEntityExplore) {
    suppressed.push("entityExplore");
  }

  if (!page.benefits.length || !page.benefitsTitle) {
    suppressed.push("benefits");
  }

  if (!page.faq.length || !page.faqTitle) {
    suppressed.push("faq");
  }

  if (!recommendations.showOtherHubs || page.otherHubs.length <= 1) {
    suppressed.push("otherHubs");
  }

  if (page.plannedPages.length === 0) {
    suppressed.push("plannedGames");
  }

  return suppressed;
}

function resolveSectionOrder(
  suppressedSections: TopicHubMainSectionKey[],
): TopicHubMainSectionKey[] {
  return APPROVED_TOPIC_HUB_SECTION_ORDER.filter(
    (section) => !suppressedSections.includes(section),
  );
}

/** Transforms assembled topic hub pages for discovery-first reading experience. */
export function applyTopicHubExperience(
  page: AssembledTopicHubPage,
): TopicHubPageData {
  const profile = resolveHeadingProfile(page.hub.id);
  const heroCopy = refineHubHero(page.heroCopy);
  const sectionCopy = refineSectionCopy(
    page.hub.id,
    page.hub.title,
    page.sectionCopy,
    profile,
  );

  const recommendations = resolveRecommendationExperience(
    page.hub.id,
    page.entityNavigation,
    profile,
  );

  const suppressedSections = resolveSuppressedSections(page, recommendations);
  const sectionOrder = resolveSectionOrder(suppressedSections);

  const benefitsTitle =
    page.benefitsTitle &&
    !headingRepeatsHubTitle(page.benefitsTitle, page.hub.title)
      ? page.benefitsTitle
      : profile.benefitsTitle;

  return {
    ...page,
    heroCopy,
    sectionCopy,
    benefitsTitle,
    benefits: compressBenefits(page.benefits),
    entityNavigation: {
      ...page.entityNavigation,
      title: recommendations.entityExploreTitle,
    },
    topicHubExperience: {
      sectionOrder,
      suppressedSections,
      recommendations,
      compactBenefits: true,
      maxBenefits: TOPIC_HUB_MAX_BENEFITS,
    },
  };
}
