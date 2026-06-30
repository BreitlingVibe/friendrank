import {
  getHubClusterAudienceText,
  getHubSearchIntentText,
  textOverlapScore,
} from "@/lib/landing-pages/recommendation-utils";
import {
  getAllHubDefinitions,
  getHubDefinition,
} from "@/lib/topic-hubs/hub-registry";
import { resolveHubMemberIntents } from "@/lib/topic-hubs/hub-utils";
import type { TopicHubDefinition } from "@/lib/topic-hubs/hub-types";

function getHubIntentCategories(hub: TopicHubDefinition): Set<string> {
  return new Set(
    resolveHubMemberIntents(hub).map((intent) => intent.intentCategory),
  );
}

function scoreHubRelation(
  source: TopicHubDefinition,
  candidate: TopicHubDefinition,
): number {
  if (source.id === candidate.id) {
    return -1;
  }

  let score = 0;

  score += textOverlapScore(source.description, candidate.description) * 120;
  score += textOverlapScore(source.hero, candidate.hero) * 80;
  score += textOverlapScore(source.primaryKeyword, candidate.primaryKeyword) * 60;
  score +=
    textOverlapScore(
      getHubClusterAudienceText(source),
      getHubClusterAudienceText(candidate),
    ) * 100;
  score +=
    textOverlapScore(
      getHubSearchIntentText(source),
      getHubSearchIntentText(candidate),
    ) * 90;

  const sourceCategories = getHubIntentCategories(source);
  const candidateCategories = getHubIntentCategories(candidate);

  for (const category of candidateCategories) {
    if (sourceCategories.has(category)) {
      score += 35;
    }
  }

  const sharedClusters = source.clusterIds.filter((clusterId) =>
    candidate.clusterIds.includes(clusterId),
  );
  score += sharedClusters.length * 25;

  return score;
}

/** Relevance-ranked Topic Hubs for cross-linking (excludes current hub). */
export function getRecommendedTopicHubs(
  currentHubId: string,
  limit = 5,
): TopicHubDefinition[] {
  const source = getHubDefinition(currentHubId);
  if (!source) {
    return getAllHubDefinitions()
      .filter((hub) => hub.id !== currentHubId)
      .slice(0, limit);
  }

  return getAllHubDefinitions()
    .filter((hub) => hub.id !== currentHubId)
    .map((hub) => ({ hub, score: scoreHubRelation(source, hub) }))
    .filter((entry) => entry.score >= 0)
    .sort((entryA, entryB) => entryB.score - entryA.score)
    .slice(0, limit)
    .map((entry) => entry.hub);
}
