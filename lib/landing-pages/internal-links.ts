import type { LandingPageRelatedPage } from "@/lib/landing-pages/landing-page-types";
import {
  getLandingPageLinkLabel,
} from "@/lib/landing-pages/link-labels";
import {
  compareRecommendationSlugs,
  getRecommendationTier,
  RECOMMENDATION_TIER_ORDER,
} from "@/lib/landing-pages/recommendation-utils";
import {
  getIntentBySlug,
  getLiveIntents,
} from "@/lib/landing-pages/planning/intent-registry";
import {
  getPriorityTier,
  type IntentPriorityTier,
} from "@/lib/landing-pages/planning/intent-priority";
import { getClustersBySlug } from "@/lib/landing-pages/planning/keyword-clusters";

/** High-traffic live pages used when recommendation tiers are sparse. */
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
const MAX_PLANNED = 3;

const PLANNED_TIER_ORDER: IntentPriorityTier[] = ["High", "Medium", "Low"];

export type AutomaticRelatedPage = {
  slug: string;
  title: string;
  available: boolean;
  estimatedPriority: number;
  tier: number;
  priorityTier: IntentPriorityTier;
  linkLabel: string;
};

export type RelatedPagesOptions = {
  /** Optional manual override. When set, skips automatic linking. */
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

function collectCandidateSlugs(currentSlug: string): string[] {
  const candidates = new Set<string>();

  for (const cluster of getClustersBySlug(currentSlug)) {
    for (const memberSlug of cluster.memberSlugs) {
      if (memberSlug !== currentSlug && isKnownSlug(memberSlug)) {
        candidates.add(memberSlug);
      }
    }
  }

  for (const intent of getLiveIntents()) {
    if (intent.slug !== currentSlug) {
      candidates.add(intent.slug);
    }
  }

  return [...candidates];
}

function toAutomaticRelatedPage(
  slug: string,
  currentSlug: string,
  liveSlugs: Set<string>,
): AutomaticRelatedPage | undefined {
  const intent = getIntentBySlug(slug);
  if (!intent) {
    return undefined;
  }

  const tier = RECOMMENDATION_TIER_ORDER[getRecommendationTier(currentSlug, slug)];

  return {
    slug,
    title: intent.title,
    available: isLiveSlug(slug, liveSlugs),
    estimatedPriority: intent.estimatedPriority,
    tier,
    priorityTier: getPriorityTier(intent.estimatedPriority),
    linkLabel: getLandingPageLinkLabel(intent.title, slug, "view"),
  };
}

function comparePlannedCandidates(
  a: AutomaticRelatedPage,
  b: AutomaticRelatedPage,
): number {
  if (a.tier !== b.tier) {
    return a.tier - b.tier;
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
  maxPlanned: number;
};

function buildAutomaticRelatedPages(
  slug: string,
  options: BuildAutomaticOptions,
): AutomaticRelatedPage[] {
  const liveSlugs = getLiveSlugSet();
  const usedSlugs = new Set<string>([slug]);

  const candidates = dedupeBySlug(
    collectCandidateSlugs(slug)
      .map((candidateSlug) => toAutomaticRelatedPage(candidateSlug, slug, liveSlugs))
      .filter((item): item is AutomaticRelatedPage => item !== undefined),
  );

  const liveCandidates = candidates
    .filter((entry) => entry.available)
    .sort((entryA, entryB) => compareRecommendationSlugs(slug, entryA.slug, entryB.slug));

  const selectedLive: AutomaticRelatedPage[] = [];

  for (const item of liveCandidates) {
    if (selectedLive.length >= options.maxLive || usedSlugs.has(item.slug)) {
      continue;
    }

    selectedLive.push(item);
    usedSlugs.add(item.slug);
  }

  if (selectedLive.length < TARGET_LIVE_TOTAL) {
    for (const fallbackSlug of POPULAR_LIVE_FALLBACK) {
      if (selectedLive.length >= TARGET_LIVE_TOTAL || usedSlugs.has(fallbackSlug)) {
        continue;
      }

      const fallback = toAutomaticRelatedPage(fallbackSlug, slug, liveSlugs);
      if (!fallback?.available) {
        continue;
      }

      selectedLive.push(fallback);
      usedSlugs.add(fallbackSlug);
    }
  }

  if (selectedLive.length < options.maxLive) {
    for (const intent of getLiveIntents().sort(
      (intentA, intentB) => intentB.estimatedPriority - intentA.estimatedPriority,
    )) {
      if (selectedLive.length >= options.maxLive || usedSlugs.has(intent.slug)) {
        continue;
      }

      const backfill = toAutomaticRelatedPage(intent.slug, slug, liveSlugs);
      if (!backfill?.available) {
        continue;
      }

      selectedLive.push(backfill);
      usedSlugs.add(intent.slug);
    }
  }

  const selectedPlanned: AutomaticRelatedPage[] = [];
  const plannedCandidates = candidates
    .filter((entry) => !entry.available)
    .sort(comparePlannedCandidates);

  for (const item of plannedCandidates) {
    if (selectedPlanned.length >= options.maxPlanned || usedSlugs.has(item.slug)) {
      continue;
    }

    selectedPlanned.push(item);
    usedSlugs.add(item.slug);
  }

  return [...selectedLive, ...selectedPlanned];
}

function toRelatedPageItem(page: AutomaticRelatedPage): LandingPageRelatedPage {
  return {
    slug: page.slug,
    title: page.title,
    available: page.available,
    linkLabel: page.linkLabel,
  };
}

/** Returns scored related slug candidates using intent, audience, hub, and cluster signals. */
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
    .map(toRelatedPageItem);
}

export function getFutureRelatedPages(slug: string): LandingPageRelatedPage[] {
  return getAutomaticRelatedPages(slug)
    .filter((page) => !page.available)
    .map(toRelatedPageItem);
}

/** Returns Related Games items for the landing page component. */
export function getRelatedLandingPageItems(
  slug: string,
  options: RelatedPagesOptions = {},
): LandingPageRelatedPage[] {
  if (options.override) {
    return options.override.map((page) => ({
      ...page,
      linkLabel:
        page.linkLabel ??
        getLandingPageLinkLabel(page.title, page.slug, "view"),
    }));
  }

  return getAutomaticRelatedPages(slug, options).map(toRelatedPageItem);
}

/** Returns the primary keyword cluster id for a slug, if any. */
export function getPrimaryClusterIdForSlug(slug: string): string | undefined {
  return getClustersBySlug(slug)[0]?.id;
}
