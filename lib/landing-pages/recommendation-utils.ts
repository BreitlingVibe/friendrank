import { getCluster, getClustersBySlug } from "@/lib/landing-pages/planning/keyword-clusters";
import {
  getIntentBySlug,
  type IntentDefinition,
} from "@/lib/landing-pages/planning/intent-registry";
import { getAllHubDefinitions } from "@/lib/topic-hubs/hub-registry";
import { collectHubMemberSlugs } from "@/lib/topic-hubs/hub-utils";
import type { TopicHubDefinition } from "@/lib/topic-hubs/hub-types";

export type RecommendationTier =
  | "intent"
  | "audience"
  | "topic_hub"
  | "cluster"
  | "fallback";

export const RECOMMENDATION_TIER_ORDER: Record<RecommendationTier, number> = {
  intent: 0,
  audience: 1,
  topic_hub: 2,
  cluster: 3,
  fallback: 4,
};

let slugToHubIdsCache: Map<string, string[]> | null = null;

function buildSlugToHubIdsMap(): Map<string, string[]> {
  const map = new Map<string, string[]>();

  for (const hub of getAllHubDefinitions()) {
    for (const memberSlug of collectHubMemberSlugs(hub)) {
      const existing = map.get(memberSlug) ?? [];
      if (!existing.includes(hub.id)) {
        existing.push(hub.id);
      }
      map.set(memberSlug, existing);
    }
  }

  return map;
}

function getSlugToHubIdsMap(): Map<string, string[]> {
  if (!slugToHubIdsCache) {
    slugToHubIdsCache = buildSlugToHubIdsMap();
  }

  return slugToHubIdsCache;
}

export function getTopicHubIdsForSlug(slug: string): string[] {
  return getSlugToHubIdsMap().get(slug) ?? [];
}

export function getPrimaryTopicHubIdForSlug(slug: string): string | undefined {
  return getTopicHubIdsForSlug(slug)[0];
}

export function sharesTopicHub(slugA: string, slugB: string): boolean {
  const hubsA = new Set(getTopicHubIdsForSlug(slugA));
  return getTopicHubIdsForSlug(slugB).some((hubId) => hubsA.has(hubId));
}

export function tokenizeText(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3),
  );
}

export function textOverlapScore(textA: string, textB: string): number {
  const tokensA = tokenizeText(textA);
  const tokensB = tokenizeText(textB);

  if (tokensA.size === 0 || tokensB.size === 0) {
    return 0;
  }

  let intersection = 0;

  for (const token of tokensA) {
    if (tokensB.has(token)) {
      intersection += 1;
    }
  }

  return intersection / Math.min(tokensA.size, tokensB.size);
}

export function getRecommendationTier(
  sourceSlug: string,
  candidateSlug: string,
): RecommendationTier {
  const source = getIntentBySlug(sourceSlug);
  const candidate = getIntentBySlug(candidateSlug);

  if (!source || !candidate) {
    return "fallback";
  }

  if (source.intentCategory === candidate.intentCategory) {
    return "intent";
  }

  const audienceOverlap = textOverlapScore(source.audience, candidate.audience);
  const searchIntentOverlap = textOverlapScore(
    source.searchIntent,
    candidate.searchIntent,
  );

  if (audienceOverlap >= 0.25 || searchIntentOverlap >= 0.2) {
    return "audience";
  }

  if (sharesTopicHub(sourceSlug, candidateSlug)) {
    return "topic_hub";
  }

  for (const cluster of getClustersBySlug(sourceSlug)) {
    if (cluster.memberSlugs.includes(candidateSlug)) {
      return "cluster";
    }
  }

  return "fallback";
}

export function compareRecommendationSlugs(
  sourceSlug: string,
  slugA: string,
  slugB: string,
): number {
  const intentA = getIntentBySlug(slugA);
  const intentB = getIntentBySlug(slugB);
  const source = getIntentBySlug(sourceSlug);

  if (!intentA || !intentB || !source) {
    return 0;
  }

  const tierA = RECOMMENDATION_TIER_ORDER[getRecommendationTier(sourceSlug, slugA)];
  const tierB = RECOMMENDATION_TIER_ORDER[getRecommendationTier(sourceSlug, slugB)];

  if (tierA !== tierB) {
    return tierA - tierB;
  }

  const overlapA = Math.max(
    textOverlapScore(source.audience, intentA.audience),
    textOverlapScore(source.searchIntent, intentA.searchIntent),
  );
  const overlapB = Math.max(
    textOverlapScore(source.audience, intentB.audience),
    textOverlapScore(source.searchIntent, intentB.searchIntent),
  );

  if (overlapB !== overlapA) {
    return overlapB - overlapA;
  }

  return intentB.estimatedPriority - intentA.estimatedPriority;
}

export function getHubClusterAudienceText(hub: TopicHubDefinition): string {
  return hub.clusterIds
    .map((clusterId) => getCluster(clusterId)?.targetAudience ?? "")
    .filter(Boolean)
    .join(" ");
}

export function getHubSearchIntentText(hub: TopicHubDefinition): string {
  return hub.clusterIds
    .map((clusterId) => getCluster(clusterId)?.searchIntent ?? "")
    .filter(Boolean)
    .join(" ");
}

export function scoreIntentAgainstHub(
  intent: IntentDefinition,
  hub: TopicHubDefinition,
): number {
  let score = 0;

  score += textOverlapScore(intent.audience, hub.description) * 100;
  score += textOverlapScore(intent.searchIntent, hub.description) * 80;
  score += textOverlapScore(intent.audience, getHubClusterAudienceText(hub)) * 60;
  score += textOverlapScore(intent.searchIntent, getHubSearchIntentText(hub)) * 40;
  score += textOverlapScore(hub.primaryKeyword, intent.title) * 30;

  return score;
}
