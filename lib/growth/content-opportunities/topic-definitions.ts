import { GROWTH_CATEGORY_GROUPS } from "@/lib/growth/growth-priority";
import { KEYWORD_CLUSTERS } from "@/lib/landing-pages/planning/keyword-clusters";

/** Primary pillar slugs in the evergreen hub layer. */
export const PRIMARY_PILLAR_SLUGS = [
  "friend-games",
  "party-games",
  "team-building-games",
  "relationship-games",
  "question-games",
] as const;

/** Supplemental evergreen hubs mapped to parent pillars for scoring. */
export const SUPPLEMENTAL_EVERGREEN_HUB_PARENT: Record<string, string> = {
  "anonymous-voting-games": "friend-games",
  "browser-party-games": "party-games",
  "icebreaker-games": "team-building-games",
};

export type ContentTopicDefinition = {
  id: string;
  name: string;
  pillarSlug: string | null;
  clusterIds: readonly string[];
  /** Minimum live landing pages expected for a mature cluster. */
  targetLandingPages: number;
  /** Minimum live category hubs expected once pillar exists. */
  targetCategoryHubs: number;
};

const CLUSTER_TO_PILLAR: Record<string, string | null> = {
  friendship: "friend-games",
  "social-voting": "friend-games",
  "most-likely": "friend-games",
  party: "party-games",
  icebreakers: "team-building-games",
  teams: "team-building-games",
  relationships: "relationship-games",
  entertainment: "question-games",
  questions: "question-games",
  audience: null,
};

const CLUSTER_DISPLAY_NAMES: Record<string, string> = {
  friendship: "Friend Games",
  "social-voting": "Social Voting Games",
  "most-likely": "Most Likely To Games",
  party: "Party Games",
  icebreakers: "Icebreaker Games",
  teams: "Team Building Games",
  relationships: "Relationship Games",
  entertainment: "Entertainment Games",
  questions: "Question Games",
  audience: "Audience Games",
};

/** Blueprint-aligned targets — architecture only, not search volume. */
const CLUSTER_TARGETS: Record<
  string,
  { landingPages: number; categoryHubs: number }
> = {
  friendship: { landingPages: 8, categoryHubs: 2 },
  "social-voting": { landingPages: 5, categoryHubs: 1 },
  "most-likely": { landingPages: 3, categoryHubs: 1 },
  party: { landingPages: 10, categoryHubs: 2 },
  icebreakers: { landingPages: 8, categoryHubs: 1 },
  teams: { landingPages: 10, categoryHubs: 2 },
  relationships: { landingPages: 8, categoryHubs: 2 },
  entertainment: { landingPages: 6, categoryHubs: 1 },
  questions: { landingPages: 12, categoryHubs: 1 },
  audience: { landingPages: 15, categoryHubs: 0 },
};

export const CONTENT_TOPICS: ContentTopicDefinition[] = KEYWORD_CLUSTERS.map(
  (cluster) => ({
    id: cluster.id,
    name: CLUSTER_DISPLAY_NAMES[cluster.id] ?? cluster.name,
    pillarSlug: CLUSTER_TO_PILLAR[cluster.id] ?? null,
    clusterIds: [cluster.id],
    targetLandingPages: CLUSTER_TARGETS[cluster.id]?.landingPages ?? 5,
    targetCategoryHubs: CLUSTER_TARGETS[cluster.id]?.categoryHubs ?? 1,
  }),
);

export function getGrowthGroupLabelForPillar(
  pillarSlug: string | null,
): string | null {
  if (!pillarSlug) {
    return null;
  }

  for (const [key, group] of Object.entries(GROWTH_CATEGORY_GROUPS)) {
    if (group.hubIds.includes(pillarSlug)) {
      return group.label;
    }
  }

  return null;
}

export function getClusterMemberSlugs(clusterId: string): string[] {
  const cluster = KEYWORD_CLUSTERS.find((entry) => entry.id === clusterId);
  return cluster ? [...cluster.memberSlugs] : [];
}
