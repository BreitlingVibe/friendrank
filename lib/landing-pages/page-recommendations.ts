import type {
  LandingPageRelatedPage,
  PopularSearchLink,
} from "@/lib/landing-pages/landing-page-types";
import {
  getHubBrowseLabel,
  getLandingPageLinkLabel,
} from "@/lib/landing-pages/link-labels";
import {
  compareRecommendationSlugs,
  getPrimaryTopicHubIdForSlug,
  getRecommendationTier,
  getTopicHubIdsForSlug,
  RECOMMENDATION_TIER_ORDER,
  scoreIntentAgainstHub,
  textOverlapScore,
} from "@/lib/landing-pages/recommendation-utils";
import { getClustersBySlug } from "@/lib/landing-pages/planning/keyword-clusters";
import {
  getIntentBySlug,
  getLiveIntents,
} from "@/lib/landing-pages/planning/intent-registry";
import { scoreEntityRelationship } from "@/lib/entities/entity-navigation";
import { getSharedEntityIds } from "@/lib/entities/entity-utils";
import { getRecommendedTopicHubs } from "@/lib/topic-hubs/hub-recommendations";
import {
  getAllHubDefinitions,
  getHubDefinition,
} from "@/lib/topic-hubs/hub-registry";

export const YOU_MAY_ALSO_LIKE_TITLE = "You may also like";
export const POPULAR_SEARCHES_TITLE = "Popular searches";
export const PLAYERS_ALSO_ENJOY_TITLE = "Players also enjoy";

const MIN_YOU_MAY_ALSO_LIKE = 3;
const MAX_YOU_MAY_ALSO_LIKE = 5;
const MIN_POPULAR_SEARCHES = 5;
const MAX_POPULAR_SEARCHES = 8;
const MIN_PLAYERS_ALSO_ENJOY = 3;
const MAX_PLAYERS_ALSO_ENJOY = 5;

function toExcludeSet(
  slug: string,
  excludeSlugs?: Iterable<string>,
): Set<string> {
  const exclude = new Set<string>([slug]);

  if (excludeSlugs) {
    for (const excludedSlug of excludeSlugs) {
      exclude.add(excludedSlug);
    }
  }

  return exclude;
}

function toRelatedPage(
  candidateSlug: string,
  available: boolean,
  style: "play" | "view" | "popular" = "play",
): LandingPageRelatedPage | undefined {
  const intent = getIntentBySlug(candidateSlug);
  if (!intent) {
    return undefined;
  }

  return {
    slug: candidateSlug,
    title: intent.title,
    available,
    linkLabel: getLandingPageLinkLabel(intent.title, candidateSlug, style),
  };
}

function sortLiveCandidates(sourceSlug: string, slugs: string[]): string[] {
  return [...slugs].sort((slugA, slugB) =>
    compareRecommendationSlugs(sourceSlug, slugA, slugB),
  );
}

function collectClusterCandidateSlugs(sourceSlug: string): string[] {
  const candidates = new Set<string>();

  for (const cluster of getClustersBySlug(sourceSlug)) {
    for (const memberSlug of cluster.memberSlugs) {
      if (memberSlug !== sourceSlug && getIntentBySlug(memberSlug)) {
        candidates.add(memberSlug);
      }
    }
  }

  for (const intent of getLiveIntents()) {
    if (intent.slug !== sourceSlug) {
      candidates.add(intent.slug);
    }
  }

  return [...candidates];
}

/** Cross-hub recommendations shown below FAQ on landing pages. */
export function getYouMayAlsoLikeItems(
  slug: string,
  options: { excludeSlugs?: Iterable<string> } = {},
): LandingPageRelatedPage[] {
  const exclude = toExcludeSet(slug, options.excludeSlugs);
  const primaryHubId = getPrimaryTopicHubIdForSlug(slug);
  const liveSlugs = getLiveIntents()
    .map((intent) => intent.slug)
    .filter((candidateSlug) => !exclude.has(candidateSlug));

  const scored = liveSlugs.map((candidateSlug) => {
    const candidateHubId = getPrimaryTopicHubIdForSlug(candidateSlug);
    const crossHubBoost =
      primaryHubId && candidateHubId && primaryHubId !== candidateHubId ? 1 : 0;

    return {
      candidateSlug,
      tier: RECOMMENDATION_TIER_ORDER[getRecommendationTier(slug, candidateSlug)],
      crossHubBoost,
      priority: getIntentBySlug(candidateSlug)?.estimatedPriority ?? 0,
    };
  });

  scored.sort((entryA, entryB) => {
    if (entryA.tier !== entryB.tier) {
      return entryA.tier - entryB.tier;
    }

    if (entryB.crossHubBoost !== entryA.crossHubBoost) {
      return entryB.crossHubBoost - entryA.crossHubBoost;
    }

    return entryB.priority - entryA.priority;
  });

  return scored
    .slice(0, MAX_YOU_MAY_ALSO_LIKE)
    .map((entry) => toRelatedPage(entry.candidateSlug, true, "play"))
    .filter((page): page is LandingPageRelatedPage => page !== undefined);
}

/** Ensures at least MIN_YOU_MAY_ALSO_LIKE items when possible. */
export function getYouMayAlsoLikeItemsWithMinimum(
  slug: string,
  options: { excludeSlugs?: Iterable<string> } = {},
): LandingPageRelatedPage[] {
  const exclude = toExcludeSet(slug, options.excludeSlugs);
  let items = getYouMayAlsoLikeItems(slug, options);

  if (items.length >= MIN_YOU_MAY_ALSO_LIKE) {
    return items;
  }

  const used = new Set([...exclude, ...items.map((item) => item.slug)]);

  for (const candidateSlug of sortLiveCandidates(slug, collectClusterCandidateSlugs(slug))) {
    if (used.has(candidateSlug)) {
      continue;
    }

    const page = toRelatedPage(candidateSlug, true, "play");
    if (!page) {
      continue;
    }

    items.push(page);
    used.add(candidateSlug);

    if (items.length >= MIN_YOU_MAY_ALSO_LIKE) {
      break;
    }
  }

  return items.slice(0, MAX_YOU_MAY_ALSO_LIKE);
}

function getRecommendedHubsForLandingPage(slug: string, limit: number) {
  const primaryHubId = getPrimaryTopicHubIdForSlug(slug);

  if (primaryHubId) {
    return getRecommendedTopicHubs(primaryHubId, limit);
  }

  const source = getIntentBySlug(slug);
  if (!source) {
    return getAllHubDefinitions().slice(0, limit);
  }

  return getAllHubDefinitions()
    .map((hub) => ({ hub, score: scoreIntentAgainstHub(source, hub) }))
    .sort((entryA, entryB) => entryB.score - entryA.score)
    .slice(0, limit)
    .map((entry) => entry.hub);
}

/** Dynamic internal search links for the bottom of landing pages. */
export function getPopularSearchLinks(
  slug: string,
  options: { excludeSlugs?: Iterable<string> } = {},
): PopularSearchLink[] {
  const exclude = toExcludeSet(slug, options.excludeSlugs);
  const source = getIntentBySlug(slug);
  const links: PopularSearchLink[] = [];

  for (const hub of getRecommendedHubsForLandingPage(slug, 3)) {
    if (exclude.has(hub.slug)) {
      continue;
    }

    links.push({
      slug: hub.slug,
      title: hub.title,
      linkLabel: getHubBrowseLabel(hub.title, hub.slug),
      kind: "hub",
    });
  }

  if (source) {
    const sameCategory = getLiveIntents()
      .filter(
        (intent) =>
          intent.intentCategory === source.intentCategory &&
          !exclude.has(intent.slug),
      )
      .sort((intentA, intentB) => intentB.estimatedPriority - intentA.estimatedPriority);

    for (const intent of sameCategory.slice(0, 3)) {
      links.push({
        slug: intent.slug,
        title: intent.title,
        linkLabel: getLandingPageLinkLabel(intent.title, intent.slug, "popular"),
        kind: "landing",
      });
    }
  }

  for (const hubId of getTopicHubIdsForSlug(slug)) {
    const hub = getHubDefinition(hubId);
    if (!hub || exclude.has(hub.slug)) {
      continue;
    }

    for (const featuredSlug of hub.featuredLandingPages ?? []) {
      if (exclude.has(featuredSlug)) {
        continue;
      }

      const intent = getIntentBySlug(featuredSlug);
      if (!intent || intent.status !== "live") {
        continue;
      }

      links.push({
        slug: featuredSlug,
        title: intent.title,
        linkLabel: getLandingPageLinkLabel(intent.title, featuredSlug, "create"),
        kind: "landing",
      });
    }
  }

  for (const cluster of getClustersBySlug(slug)) {
    for (const memberSlug of cluster.memberSlugs) {
      if (exclude.has(memberSlug)) {
        continue;
      }

      const intent = getIntentBySlug(memberSlug);
      if (!intent || intent.status !== "live") {
        continue;
      }

      const overlap = source
        ? Math.max(
            textOverlapScore(source.searchIntent, intent.searchIntent),
            textOverlapScore(source.title, intent.title),
          )
        : 0;

      if (overlap < 0.15 && getRecommendationTier(slug, memberSlug) === "fallback") {
        continue;
      }

      links.push({
        slug: memberSlug,
        title: intent.title,
        linkLabel: getLandingPageLinkLabel(intent.title, memberSlug, "view"),
        kind: "landing",
      });
    }
  }

  const deduped: PopularSearchLink[] = [];
  const seen = new Set<string>();

  for (const link of links) {
    const key = `${link.kind}:${link.slug}`;
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    deduped.push(link);

    if (deduped.length >= MAX_POPULAR_SEARCHES) {
      return deduped;
    }
  }

  if (deduped.length < MIN_POPULAR_SEARCHES) {
    for (const intent of getLiveIntents().sort(
      (intentA, intentB) => intentB.estimatedPriority - intentA.estimatedPriority,
    )) {
      const key = `landing:${intent.slug}`;
      if (exclude.has(intent.slug) || seen.has(key)) {
        continue;
      }

      seen.add(key);
      deduped.push({
        slug: intent.slug,
        title: intent.title,
        linkLabel: getLandingPageLinkLabel(intent.title, intent.slug, "popular"),
        kind: "landing",
      });

      if (deduped.length >= MIN_POPULAR_SEARCHES) {
        break;
      }
    }
  }

  return deduped.slice(0, MAX_POPULAR_SEARCHES);
}

/** Adjacent formats and experiences, distinct from Related Games scoring. */
export function getPlayersAlsoEnjoyItems(
  slug: string,
  options: { excludeSlugs?: Iterable<string> } = {},
): LandingPageRelatedPage[] {
  const exclude = toExcludeSet(slug, options.excludeSlugs);
  const source = getIntentBySlug(slug);
  if (!source) {
    return [];
  }

  const clusterSlugs = new Set<string>();
  for (const cluster of getClustersBySlug(slug)) {
    for (const memberSlug of cluster.memberSlugs) {
      if (memberSlug !== slug) {
        clusterSlugs.add(memberSlug);
      }
    }
  }

  const scored = getLiveIntents()
    .filter((intent) => !exclude.has(intent.slug))
    .map((intent) => {
      let score = 0;
      const tier = getRecommendationTier(slug, intent.slug);

      if (intent.intentCategory === source.intentCategory) {
        score += 30;
      }

      if (clusterSlugs.has(intent.slug)) {
        score += 25;
      }

      if (getSharedEntityIds(slug, intent.slug).length > 0) {
        score += 12;
      }

      score += Math.min(scoreEntityRelationship(slug, intent.slug), 18);

      if (tier === "entity") {
        score += 14;
      } else if (tier === "cluster") {
        score += 22;
      } else if (tier === "audience") {
        score += 16;
      } else if (tier === "topic_hub") {
        score += 12;
      } else if (tier === "intent") {
        score += 6;
      }

      score += intent.estimatedPriority / 10;

      return { slug: intent.slug, score };
    })
    .sort((entryA, entryB) => entryB.score - entryA.score);

  let items = scored
    .slice(0, MAX_PLAYERS_ALSO_ENJOY)
    .map((entry) => toRelatedPage(entry.slug, true, "play"))
    .filter((page): page is LandingPageRelatedPage => page !== undefined);

  if (items.length >= MIN_PLAYERS_ALSO_ENJOY) {
    return items;
  }

  const used = new Set([...exclude, ...items.map((item) => item.slug)]);

  for (const candidateSlug of sortLiveCandidates(slug, collectClusterCandidateSlugs(slug))) {
    if (used.has(candidateSlug)) {
      continue;
    }

    const page = toRelatedPage(candidateSlug, true, "play");
    if (!page) {
      continue;
    }

    items.push(page);
    used.add(candidateSlug);

    if (items.length >= MIN_PLAYERS_ALSO_ENJOY) {
      break;
    }
  }

  return items.slice(0, MAX_PLAYERS_ALSO_ENJOY);
}
