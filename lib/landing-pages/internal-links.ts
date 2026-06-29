import type { LandingPageRelatedPage } from "@/lib/landing-pages/landing-page-types";
import {
  getIntentBySlug,
  getLiveIntents,
} from "@/lib/landing-pages/planning/intent-registry";
import {
  getPriorityTier,
  type IntentPriorityTier,
} from "@/lib/landing-pages/planning/intent-priority";
import {
  getClusterBySlug,
  getClustersBySlug,
} from "@/lib/landing-pages/planning/keyword-clusters";

/** Popular live pages used to balance Related Games when cluster live links are sparse. */
export const POPULAR_LIVE_FALLBACK = [
  "most-likely-to-generator",
  "anonymous-voting-game",
  "group-voting-game",
  "party-voting-game",
  "best-friend-quiz",
  "who-knows-me-best",
  "friendship-test",
] as const;

const TARGET_LIVE_TOTAL = 6;
const MAX_LIVE_TOTAL = 7;
const MAX_SAME_CLUSTER_LIVE = 4;
const MAX_OVERLAPPING_LIVE = 3;
const MAX_POPULAR_FALLBACK_LIVE = 3;
const MAX_PLANNED = 3;

/** Rank used for popular fallback and generic live backfill (outside clusters). */
const FALLBACK_CLUSTER_RANK = 999;

const PLANNED_TIER_ORDER: IntentPriorityTier[] = ["High", "Medium", "Low"];

export type AutomaticRelatedPage = {
  slug: string;
  title: string;
  available: boolean;
  estimatedPriority: number;
  /** Lower is closer (0 = primary cluster). 999 = popular fallback. */
  clusterRank: number;
  priorityTier: IntentPriorityTier;
};

export type RelatedPagesOptions = {
  /** Optional manual override. When set, skips automatic cluster linking. */
  override?: LandingPageRelatedPage[];
  maxLive?: number;
  maxPlanned?: number;
};

function getLiveSlugSet(): Set<string> {
  return new Set(getLiveIntents().map((intent) => intent.slug));
}

function isKnownSlug(slug: string): boolean {
  return getIntentBySlug(slug) !== undefined;
}

function isLiveSlug(slug: string, liveSlugs: Set<string>): boolean {
  return liveSlugs.has(slug);
}

function getClusterRank(currentSlug: string, candidateSlug: string): number {
  const currentClusters = getClustersBySlug(currentSlug);
  if (currentClusters.length === 0) {
    return FALLBACK_CLUSTER_RANK;
  }

  const primaryClusterId = currentClusters[0]?.id;

  for (let index = 0; index < currentClusters.length; index++) {
    const cluster = currentClusters[index];
    if (!cluster.memberSlugs.includes(candidateSlug)) {
      continue;
    }

    if (cluster.id === primaryClusterId) {
      return 0;
    }

    return index + 1;
  }

  return FALLBACK_CLUSTER_RANK;
}

function collectClusterCandidateSlugs(currentSlug: string): string[] {
  const candidates = new Set<string>();

  for (const cluster of getClustersBySlug(currentSlug)) {
    for (const memberSlug of cluster.memberSlugs) {
      if (memberSlug !== currentSlug && isKnownSlug(memberSlug)) {
        candidates.add(memberSlug);
      }
    }
  }

  return [...candidates];
}

function toAutomaticRelatedPage(
  slug: string,
  currentSlug: string,
  liveSlugs: Set<string>,
  clusterRank: number,
): AutomaticRelatedPage | undefined {
  const intent = getIntentBySlug(slug);
  if (!intent) {
    return undefined;
  }

  return {
    slug,
    title: intent.title,
    available: isLiveSlug(slug, liveSlugs),
    estimatedPriority: intent.estimatedPriority,
    clusterRank,
    priorityTier: getPriorityTier(intent.estimatedPriority),
  };
}

function compareLiveCandidates(
  a: AutomaticRelatedPage,
  b: AutomaticRelatedPage,
): number {
  if (a.clusterRank !== b.clusterRank) {
    return a.clusterRank - b.clusterRank;
  }

  return b.estimatedPriority - a.estimatedPriority;
}

function comparePlannedCandidates(
  a: AutomaticRelatedPage,
  b: AutomaticRelatedPage,
): number {
  if (a.clusterRank !== b.clusterRank) {
    return a.clusterRank - b.clusterRank;
  }

  const tierDelta =
    PLANNED_TIER_ORDER.indexOf(a.priorityTier) -
    PLANNED_TIER_ORDER.indexOf(b.priorityTier);

  if (tierDelta !== 0) {
    return tierDelta;
  }

  return b.estimatedPriority - a.estimatedPriority;
}

function dedupeBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const result: T[] = [];

  for (const item of items) {
    if (seen.has(item.slug)) {
      continue;
    }

    seen.add(item.slug);
    result.push(item);
  }

  return result;
}

function addLivePages(
  selectedLive: AutomaticRelatedPage[],
  usedSlugs: Set<string>,
  candidates: AutomaticRelatedPage[],
  maxForTier: number,
  maxLiveTotal: number,
): number {
  let added = 0;

  for (const item of candidates) {
    if (
      added >= maxForTier ||
      selectedLive.length >= maxLiveTotal ||
      usedSlugs.has(item.slug) ||
      !item.available
    ) {
      continue;
    }

    selectedLive.push(item);
    usedSlugs.add(item.slug);
    added += 1;
  }

  return added;
}

type BuildAutomaticOptions = {
  maxLive: number;
  maxPlanned: number;
};

function buildAutomaticRelatedPages(
  slug: string,
  options: BuildAutomaticOptions,
): AutomaticRelatedPage[] {
  const liveSlugs = getLiveSlugSet();
  const usedSlugs = new Set<string>([slug]);

  const fromClusters = dedupeBySlug(
    collectClusterCandidateSlugs(slug)
      .map((candidateSlug) =>
        toAutomaticRelatedPage(
          candidateSlug,
          slug,
          liveSlugs,
          getClusterRank(slug, candidateSlug),
        ),
      )
      .filter((item): item is AutomaticRelatedPage => item !== undefined),
  );

  const liveFromClusters = fromClusters
    .filter((entry) => entry.available)
    .sort(compareLiveCandidates);

  const sameClusterLive = liveFromClusters.filter((entry) => entry.clusterRank === 0);
  const overlappingLive = liveFromClusters.filter(
    (entry) => entry.clusterRank > 0 && entry.clusterRank < FALLBACK_CLUSTER_RANK,
  );

  const selectedLive: AutomaticRelatedPage[] = [];

  addLivePages(
    selectedLive,
    usedSlugs,
    sameClusterLive,
    MAX_SAME_CLUSTER_LIVE,
    options.maxLive,
  );

  addLivePages(
    selectedLive,
    usedSlugs,
    overlappingLive,
    MAX_OVERLAPPING_LIVE,
    options.maxLive,
  );

  const popularFallbackLive = POPULAR_LIVE_FALLBACK.map((fallbackSlug) =>
    toAutomaticRelatedPage(fallbackSlug, slug, liveSlugs, FALLBACK_CLUSTER_RANK),
  ).filter((item): item is AutomaticRelatedPage => item !== undefined);

  addLivePages(
    selectedLive,
    usedSlugs,
    popularFallbackLive,
    MAX_POPULAR_FALLBACK_LIVE,
    options.maxLive,
  );

  if (selectedLive.length < TARGET_LIVE_TOTAL) {
    addLivePages(
      selectedLive,
      usedSlugs,
      remainingLiveFromIntents(slug, liveSlugs),
      Number.MAX_SAFE_INTEGER,
      Math.min(TARGET_LIVE_TOTAL, options.maxLive),
    );
  }

  if (selectedLive.length < options.maxLive) {
    addLivePages(
      selectedLive,
      usedSlugs,
      remainingLiveFromIntents(slug, liveSlugs),
      Number.MAX_SAFE_INTEGER,
      options.maxLive,
    );
  }

  const selectedPlanned: AutomaticRelatedPage[] = [];
  const plannedFromClusters = fromClusters
    .filter((entry) => !entry.available)
    .sort(comparePlannedCandidates);

  const sameClusterPlanned = plannedFromClusters.filter(
    (entry) => entry.clusterRank === 0,
  );

  for (const item of sameClusterPlanned) {
    if (selectedPlanned.length >= options.maxPlanned || usedSlugs.has(item.slug)) {
      continue;
    }

    selectedPlanned.push(item);
    usedSlugs.add(item.slug);
  }

  for (const tier of PLANNED_TIER_ORDER) {
    for (const item of plannedFromClusters) {
      if (selectedPlanned.length >= options.maxPlanned || usedSlugs.has(item.slug)) {
        continue;
      }

      if (item.priorityTier !== tier) {
        continue;
      }

      selectedPlanned.push(item);
      usedSlugs.add(item.slug);
    }
  }

  return [...selectedLive, ...selectedPlanned];
}

function remainingLiveFromIntents(
  slug: string,
  liveSlugs: Set<string>,
): AutomaticRelatedPage[] {
  return getLiveIntents()
    .sort((a, b) => b.estimatedPriority - a.estimatedPriority)
    .map((intent) =>
      toAutomaticRelatedPage(intent.slug, slug, liveSlugs, FALLBACK_CLUSTER_RANK),
    )
    .filter((item): item is AutomaticRelatedPage => item !== undefined);
}

/** Returns scored related slug candidates from clusters plus live backfill. */
export function getAutomaticRelatedPages(
  slug: string,
  options: Pick<RelatedPagesOptions, "maxLive" | "maxPlanned"> = {},
): AutomaticRelatedPage[] {
  return buildAutomaticRelatedPages(slug, {
    maxLive: options.maxLive ?? MAX_LIVE_TOTAL,
    maxPlanned: options.maxPlanned ?? MAX_PLANNED,
  });
}

export function getLiveRelatedPages(slug: string): LandingPageRelatedPage[] {
  return getAutomaticRelatedPages(slug)
    .filter((page) => page.available)
    .map(({ slug: pageSlug, title }) => ({
      slug: pageSlug,
      title,
      available: true,
    }));
}

export function getFutureRelatedPages(slug: string): LandingPageRelatedPage[] {
  return getAutomaticRelatedPages(slug)
    .filter((page) => !page.available)
    .map(({ slug: pageSlug, title }) => ({
      slug: pageSlug,
      title,
      available: false,
    }));
}

function toRelatedPageItem(page: AutomaticRelatedPage): LandingPageRelatedPage {
  return {
    slug: page.slug,
    title: page.title,
    available: page.available,
  };
}

/** Returns Related Games items for the landing page component. */
export function getRelatedLandingPageItems(
  slug: string,
  options: RelatedPagesOptions = {},
): LandingPageRelatedPage[] {
  if (options.override) {
    return options.override;
  }

  return getAutomaticRelatedPages(slug, options).map(toRelatedPageItem);
}

/** Returns the primary keyword cluster id for a slug, if any. */
export function getPrimaryClusterIdForSlug(slug: string): string | undefined {
  return getClusterBySlug(slug)?.id;
}
