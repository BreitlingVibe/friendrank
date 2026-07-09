import type { CategoryDefinition, PillarDefinition } from "@/lib/discovery/types";

/** Route prefix for live category hub pages. */
export const CATEGORY_HUB_ROUTE_PREFIX = "/categories";

/** Parent pillars — existing evergreen hub routes. Not category hub pages. */
export const PILLAR_REGISTRY: Record<string, PillarDefinition> = {
  "friend-games": {
    slug: "friend-games",
    title: "Friend Games",
    description:
      "Browser games for close friend groups — quizzes, voting, and icebreakers.",
  },
  "party-games": {
    slug: "party-games",
    title: "Party Games",
    description:
      "Party-ready browser games for birthdays, hangouts, and group celebrations.",
  },
  "team-building-games": {
    slug: "team-building-games",
    title: "Team Building Games",
    description:
      "Coworker-friendly icebreakers and team activities for meetings and remote teams.",
  },
  "relationship-games": {
    slug: "relationship-games",
    title: "Relationship Games",
    description:
      "Couple quizzes and playful games for partners and close pairs.",
  },
};

/**
 * Central registry for category hubs (mid-layer between pillars and evergreen pages).
 * Add one entry here, then create app/categories/{slug}/page.tsx for live hubs.
 */
export const CATEGORY_REGISTRY: CategoryDefinition[] = [
  {
    slug: "friend-games",
    title: "Friend Games",
    description:
      "Anchor category for friend-group games. Maps to the friend-games pillar.",
    parentPillar: "friend-games",
    primaryKeywords: ["friend games", "games with friends"],
    relatedCategorySlugs: ["best-friends", "party-games"],
    relatedEvergreenSlugs: [
      "best-friend-quiz",
      "who-knows-me-best",
      "friendship-test",
    ],
    status: "seed",
  },
  {
    slug: "party-games",
    title: "Party Games",
    description:
      "Anchor category for party-oriented group games. Maps to the party-games pillar.",
    parentPillar: "party-games",
    primaryKeywords: ["party games", "group party games"],
    relatedCategorySlugs: ["friend-games"],
    relatedEvergreenSlugs: ["party-voting-game", "birthday-party-game"],
    status: "seed",
  },
  {
    slug: "team-building",
    title: "Team Building",
    description:
      "Workplace and remote team activities for coworkers and new groups.",
    parentPillar: "team-building-games",
    primaryKeywords: ["team building games", "workplace icebreakers"],
    relatedCategorySlugs: ["coworkers"],
    relatedEvergreenSlugs: ["team-building-game", "office-icebreaker"],
    status: "seed",
  },
  {
    slug: "couples",
    title: "Couples",
    description:
      "Playful quizzes and voting games for couples and date nights.",
    parentPillar: "relationship-games",
    primaryKeywords: ["couple games", "relationship quiz"],
    relatedCategorySlugs: [],
    relatedEvergreenSlugs: ["couple-quiz", "relationship-quiz", "date-night-game"],
    status: "planned",
  },
  {
    slug: "best-friends",
    title: "Best Friends",
    description:
      "Games built for best friend circles — quizzes, voting, and shared reveals.",
    parentPillar: "friend-games",
    primaryKeywords: ["best friend games", "best friend quiz"],
    relatedCategorySlugs: ["friend-games", "couples"],
    relatedEvergreenSlugs: [
      "best-friend-quiz",
      "bestie-quiz",
      "who-knows-me-best",
      "friendship-test",
    ],
    status: "live",
  },
  {
    slug: "coworkers",
    title: "Coworkers",
    description:
      "Browser games for coworkers — icebreakers, voting rounds, and team activities for meetings, remote calls, and workshops.",
    parentPillar: "team-building-games",
    primaryKeywords: ["coworker games", "office icebreaker"],
    relatedCategorySlugs: ["team-building"],
    relatedEvergreenSlugs: [
      "office-icebreaker",
      "team-building-game",
      "meeting-icebreaker",
      "most-likely-to-generator",
      "anonymous-voting-game",
      "remote-team-game",
      "virtual-team-building",
      "onboarding-games",
      "workshop-games",
      "team-bonding-game",
      "work-team-game",
      "employee-engagement-game",
      "friday-team-games",
      "games-for-remote-teams",
    ],
    status: "live",
  },
];

const categoryBySlug = new Map(
  CATEGORY_REGISTRY.map((category) => [category.slug, category]),
);

export function getAllCategories(): CategoryDefinition[] {
  return [...CATEGORY_REGISTRY];
}

export function getCategoryBySlug(slug: string): CategoryDefinition | undefined {
  return categoryBySlug.get(slug);
}

export function getLiveCategories(): CategoryDefinition[] {
  return CATEGORY_REGISTRY.filter((category) => category.status === "live");
}

export function getCategoriesByPillar(pillarSlug: string): CategoryDefinition[] {
  return CATEGORY_REGISTRY.filter(
    (category) => category.parentPillar === pillarSlug,
  );
}

export function getPillarBySlug(slug: string): PillarDefinition | undefined {
  return PILLAR_REGISTRY[slug];
}

export function getAllPillars(): PillarDefinition[] {
  return Object.values(PILLAR_REGISTRY);
}

export function getCategoryHubPath(slug: string): string {
  return `${CATEGORY_HUB_ROUTE_PREFIX}/${slug}`;
}

export function isCategoryHubLive(slug: string): boolean {
  return getCategoryBySlug(slug)?.status === "live";
}
