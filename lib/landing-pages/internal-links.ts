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

const DEFAULT_MAX_LIVE_LINKS = 6;
const DEFAULT_MIN_LIVE_LINKS = 3;
const DEFAULT_MAX_PLANNED_LINKS = 4;

const PLANNED_TIER_ORDER: IntentPriorityTier[] = ["High", "Medium", "Low"];

export type AutomaticRelatedPage = {
  slug: string;
  title: string;
  available: boolean;
  estimatedPriority: number;
  /** Lower is closer (0 = primary cluster). 999 = live backfill outside clusters. */
  clusterRank: number;
  priorityTier: IntentPriorityTier;
};

export type RelatedPagesOptions = {
  /** Optional manual override. When set, skips automatic cluster linking. */
  override?: LandingPageRelatedPage[];
  maxLive?: number;
  minLive?: number;
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
    return 999;
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

  return 999;
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

type BuildAutomaticOptions = {
  maxLive: number;
  minLive: number;
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

  const selectedLive: AutomaticRelatedPage[] = [];

  for (const item of fromClusters.filter((entry) => entry.available).sort(compareLiveCandidates)) {
    if (selectedLive.length >= options.maxLive || usedSlugs.has(item.slug)) {
      continue;
    }

    selectedLive.push(item);
    usedSlugs.add(item.slug);
  }

  if (selectedLive.length < options.minLive) {
    for (const intent of getLiveIntents().sort(
      (a, b) => b.estimatedPriority - a.estimatedPriority,
    )) {
      if (selectedLive.length >= options.minLive || selectedLive.length >= options.maxLive) {
        break;
      }

      if (usedSlugs.has(intent.slug)) {
        continue;
      }

      const backfill = toAutomaticRelatedPage(intent.slug, slug, liveSlugs, 999);
      if (!backfill) {
        continue;
      }

      selectedLive.push(backfill);
      usedSlugs.add(backfill.slug);
    }
  }

  const selectedPlanned: AutomaticRelatedPage[] = [];
  const plannedCandidates = fromClusters
    .filter((entry) => !entry.available)
    .sort(comparePlannedCandidates);

  for (const tier of PLANNED_TIER_ORDER) {
    for (const item of plannedCandidates) {
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

/** Returns scored related slug candidates from clusters plus live backfill. */
export function getAutomaticRelatedPages(
  slug: string,
  options: Pick<RelatedPagesOptions, "maxLive" | "minLive" | "maxPlanned"> = {},
): AutomaticRelatedPage[] {
  return buildAutomaticRelatedPages(slug, {
    maxLive: options.maxLive ?? DEFAULT_MAX_LIVE_LINKS,
    minLive: options.minLive ?? DEFAULT_MIN_LIVE_LINKS,
    maxPlanned: options.maxPlanned ?? DEFAULT_MAX_PLANNED_LINKS,
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
