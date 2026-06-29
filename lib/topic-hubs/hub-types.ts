import type { IntentDefinition } from "@/lib/landing-pages/planning/intent-registry";

/** Static hub definition. Member pages are discovered via clusterIds, not listed here. */
export type TopicHubDefinition = {
  id: string;
  slug: string;
  title: string;
  description: string;
  /** Hero / intro copy for the hub page (future sprint). */
  hero: string;
  primaryKeyword: string;
  /** Keyword cluster ids whose memberSlugs define hub membership. */
  clusterIds: string[];
  /** Optional slugs pinned to the top of hub page lists (must still be cluster members). */
  featuredLandingPages?: string[];
};

/** Landing page reference resolved from the Intent Registry. */
export type HubLandingPageRef = Pick<
  IntentDefinition,
  | "slug"
  | "title"
  | "status"
  | "estimatedPriority"
  | "intentCategory"
  | "searchIntent"
  | "audience"
>;

export type HubStats = {
  liveCount: number;
  plannedCount: number;
  totalCount: number;
  highestPriorityPage: HubLandingPageRef | null;
  averagePriority: number;
};

/** Fully resolved hub with discovered member pages and statistics. */
export type TopicHub = TopicHubDefinition & {
  intro: string;
  landingPages: HubLandingPageRef[];
  plannedPages: HubLandingPageRef[];
  statistics: HubStats;
};
