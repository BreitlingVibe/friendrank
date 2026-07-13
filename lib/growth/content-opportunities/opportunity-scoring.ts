import type { ContentTopicDefinition } from "@/lib/growth/content-opportunities/topic-definitions";
import {
  countCategoryHubsWithFullLiveRegistry,
  countLiveLandingPagesLinkedToCategoryHubs,
  getPillarComingSoonCards,
  getPillarTitle,
  getTopicCategoryHubSlugs,
  getTopicEvergreenHubSlugs,
  getTopicLandingSlugs,
  isPillarLive,
} from "@/lib/growth/content-opportunities/opportunity-sources";
import { findCategoriesForEvergreenPage } from "@/lib/discovery/discovery-utils";
import type {
  ContentRecommendation,
  TopicCoverageCounts,
  TopicScoreBreakdown,
  TopicScorecard,
} from "@/lib/growth/content-opportunities/types";

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function ratioScore(actual: number, target: number): number {
  if (target <= 0) {
    return actual > 0 ? 100 : 0;
  }

  return clampScore((actual / target) * 100);
}

function computeScores(
  topic: ContentTopicDefinition,
  counts: TopicCoverageCounts,
  liveLandingSlugs: string[],
  liveCategorySlugs: string[],
): TopicScoreBreakdown {
  const landingCoverage = ratioScore(
    counts.liveLandingPages,
    topic.targetLandingPages,
  );

  const expectedEvergreenHubs = topic.pillarSlug ? 1 : 0;
  const evergreenCoverage =
    expectedEvergreenHubs === 0
      ? counts.evergreenHubs > 0
        ? 100
        : 50
      : ratioScore(counts.evergreenHubs, expectedEvergreenHubs + 1);

  const categoryCoverage =
    topic.targetCategoryHubs === 0
      ? 100
      : ratioScore(counts.liveCategoryHubs, topic.targetCategoryHubs);

  const linkedLandingPages =
    countLiveLandingPagesLinkedToCategoryHubs(liveLandingSlugs);
  const linkingCompleteness =
    counts.liveLandingPages === 0
      ? 0
      : clampScore((linkedLandingPages / counts.liveLandingPages) * 100);

  const fullRegistryHubs =
    countCategoryHubsWithFullLiveRegistry(liveCategorySlugs);
  const registryLinkingBonus =
    liveCategorySlugs.length === 0
      ? 0
      : (fullRegistryHubs / liveCategorySlugs.length) * 20;

  const adjustedLinking = clampScore(
    linkingCompleteness * 0.8 + registryLinkingBonus,
  );

  let authorityCompleteness = 0;
  if (topic.pillarSlug && isPillarLive(topic.pillarSlug)) {
    authorityCompleteness += 40;
  }
  if (counts.evergreenHubs > 0) {
    authorityCompleteness += 20;
  }
  if (counts.liveCategoryHubs > 0) {
    authorityCompleteness += 20;
  }
  if (counts.liveLandingPages >= topic.targetLandingPages) {
    authorityCompleteness += 20;
  }
  authorityCompleteness = clampScore(authorityCompleteness);

  return {
    landingCoverage,
    evergreenCoverage,
    categoryCoverage,
    linkingCompleteness: adjustedLinking,
    authorityCompleteness,
  };
}

function computeAuthorityScore(scores: TopicScoreBreakdown): number {
  return clampScore(
    scores.landingCoverage * 0.25 +
      scores.evergreenCoverage * 0.2 +
      scores.categoryCoverage * 0.25 +
      scores.linkingCompleteness * 0.2 +
      scores.authorityCompleteness * 0.1,
  );
}

function computeContentCompleteness(scores: TopicScoreBreakdown): number {
  return clampScore(
    scores.landingCoverage * 0.35 +
      scores.evergreenCoverage * 0.15 +
      scores.categoryCoverage * 0.25 +
      scores.linkingCompleteness * 0.25,
  );
}

function computeOpportunityScore(
  contentCompleteness: number,
  missingAssets: string[],
): number {
  const gapScore = 100 - contentCompleteness;
  const assetPenalty = Math.min(missingAssets.length * 4, 30);
  return clampScore(gapScore * 0.7 + assetPenalty);
}

function countLandingPagesWithoutLiveCategoryParent(
  liveLandingSlugs: string[],
): number {
  return liveLandingSlugs.filter(
    (slug) =>
      !findCategoriesForEvergreenPage(slug).some(
        (category) => category.status === "live",
      ),
  ).length;
}

function buildMissingAssets(
  topic: ContentTopicDefinition,
  counts: TopicCoverageCounts,
  liveLandingSlugs: string[],
  plannedLandingSlugs: string[],
  liveCategorySlugs: string[],
  evergreenHubSlugs: string[],
): string[] {
  const missing: string[] = [];

  if (topic.pillarSlug && !isPillarLive(topic.pillarSlug)) {
    missing.push(`Primary pillar hub missing or not live: /${topic.pillarSlug}`);
  }

  if (counts.liveCategoryHubs < topic.targetCategoryHubs) {
    const gap = topic.targetCategoryHubs - counts.liveCategoryHubs;
    missing.push(
      `${gap} live category hub${gap === 1 ? "" : "s"} below blueprint target (${counts.liveCategoryHubs}/${topic.targetCategoryHubs})`,
    );
  }

  if (counts.plannedCategoryHubs > 0) {
    missing.push(
      `${counts.plannedCategoryHubs} category hub(s) registered as planned but not live`,
    );
  }

  if (counts.seedCategoryHubs > 0) {
    missing.push(
      `${counts.seedCategoryHubs} category hub seed entr${counts.seedCategoryHubs === 1 ? "y" : "ies"} without live route`,
    );
  }

  if (counts.liveLandingPages < topic.targetLandingPages) {
    const gap = topic.targetLandingPages - counts.liveLandingPages;
    missing.push(
      `${gap} live landing page${gap === 1 ? "" : "s"} below cluster target (${counts.liveLandingPages}/${topic.targetLandingPages})`,
    );
  }

  if (plannedLandingSlugs.length > 0) {
    missing.push(
      `${plannedLandingSlugs.length} planned landing page${plannedLandingSlugs.length === 1 ? "" : "s"} in registry backlog`,
    );
  }

  const unlinkedCount = countLandingPagesWithoutLiveCategoryParent(
    liveLandingSlugs,
  );

  if (unlinkedCount > 0 && liveCategorySlugs.length > 0) {
    missing.push(
      `${unlinkedCount} live landing page${unlinkedCount === 1 ? "" : "s"} not linked from a live category hub registry`,
    );
  } else if (unlinkedCount > 0 && counts.liveLandingPages >= 5) {
    missing.push(
      `${unlinkedCount} live landing pages lack a parent category hub in the discovery graph`,
    );
  }

  const comingSoonCards = getPillarComingSoonCards(topic.pillarSlug);
  if (comingSoonCards.length > 0) {
    missing.push(
      `${comingSoonCards.length} pillar category card(s) marked coming soon (${comingSoonCards.slice(0, 3).join(", ")}${comingSoonCards.length > 3 ? ", …" : ""})`,
    );
  }

  if (evergreenHubSlugs.length === 0 && topic.pillarSlug) {
    missing.push("No evergreen hub slug mapped in keyword cluster membership");
  }

  return missing;
}

function deriveRecommendation(
  topic: ContentTopicDefinition,
  counts: TopicCoverageCounts,
  scores: TopicScoreBreakdown,
  missingAssets: string[],
): { recommendation: ContentRecommendation; rationale: string[] } {
  const rationale: string[] = [];

  if (topic.pillarSlug && !isPillarLive(topic.pillarSlug)) {
    rationale.push("Primary pillar page is missing from the live evergreen hub layer.");
    return { recommendation: "Build Evergreen Hub", rationale };
  }

  if (
    counts.liveCategoryHubs === 0 &&
    topic.targetCategoryHubs > 0 &&
    counts.liveLandingPages >= 5
  ) {
    rationale.push(
      "Cluster has sufficient live landing pages but no live category hub mid-layer.",
    );
    return { recommendation: "Build Category Hub", rationale };
  }

  if (
    counts.liveCategoryHubs < topic.targetCategoryHubs &&
    counts.liveLandingPages >= topic.targetLandingPages * 0.6
  ) {
    rationale.push(
      "Landing coverage is mature enough to justify additional category hub depth.",
    );
    return { recommendation: "Build Category Hub", rationale };
  }

  if (
    counts.plannedLandingPages >= 2 ||
    scores.landingCoverage < 75 ||
    missingAssets.some((asset) => asset.includes("planned landing"))
  ) {
    rationale.push(
      "Registry backlog or landing coverage gap remains the primary architectural constraint.",
    );
    return { recommendation: "Expand Landing Pages", rationale };
  }

  if (
    scores.landingCoverage >= 85 &&
    scores.linkingCompleteness >= 70 &&
    scores.categoryCoverage >= 80 &&
    missingAssets.length <= 2
  ) {
    rationale.push(
      "Architecture coverage, linking, and hub depth meet current blueprint thresholds.",
    );
    return { recommendation: "Maintain", rationale };
  }

  if (missingAssets.length === 0) {
    rationale.push("No structural gaps detected in registries or discovery graph.");
    return { recommendation: "No action", rationale };
  }

  rationale.push(
    "Mixed gaps exist but no single layer dominates — monitor before expanding.",
  );
  return { recommendation: "No action", rationale };
}

export function scoreTopic(topic: ContentTopicDefinition): TopicScorecard {
  const { live: liveLandingSlugs, planned: plannedLandingSlugs } =
    getTopicLandingSlugs(topic);
  const evergreenHubSlugs = getTopicEvergreenHubSlugs(topic);
  const categoryHubs = getTopicCategoryHubSlugs(topic);

  const counts: TopicCoverageCounts = {
    liveLandingPages: liveLandingSlugs.length,
    plannedLandingPages: plannedLandingSlugs.length,
    totalLandingPages: liveLandingSlugs.length + plannedLandingSlugs.length,
    evergreenHubs: evergreenHubSlugs.length,
    liveCategoryHubs: categoryHubs.live.length,
    plannedCategoryHubs: categoryHubs.planned.length,
    seedCategoryHubs: categoryHubs.seed.length,
  };

  const scores = computeScores(
    topic,
    counts,
    liveLandingSlugs,
    categoryHubs.live,
  );
  const authorityScore = computeAuthorityScore(scores);
  const contentCompleteness = computeContentCompleteness(scores);
  const missingAssets = buildMissingAssets(
    topic,
    counts,
    liveLandingSlugs,
    plannedLandingSlugs,
    categoryHubs.live,
    evergreenHubSlugs,
  );
  const opportunityScore = computeOpportunityScore(
    contentCompleteness,
    missingAssets,
  );
  const { recommendation, rationale } = deriveRecommendation(
    topic,
    counts,
    scores,
    missingAssets,
  );

  return {
    topicId: topic.id,
    topicName: topic.name,
    pillarSlug: topic.pillarSlug,
    pillarTitle: getPillarTitle(topic.pillarSlug),
    landingPageSlugs: liveLandingSlugs,
    plannedLandingPageSlugs: plannedLandingSlugs,
    evergreenHubSlugs,
    categoryHubSlugs: [
      ...categoryHubs.live,
      ...categoryHubs.planned,
      ...categoryHubs.seed,
    ],
    liveCategoryHubSlugs: categoryHubs.live,
    counts,
    scores,
    authorityScore,
    contentCompleteness,
    opportunityScore,
    missingAssets,
    recommendation,
    recommendationRationale: rationale,
  };
}

export function scoreAllTopics(
  topics: ContentTopicDefinition[],
): TopicScorecard[] {
  return topics.map((topic) => scoreTopic(topic));
}

export function rankTopicsByOpportunity(
  scorecards: TopicScorecard[],
): TopicScorecard[] {
  return [...scorecards].sort((left, right) => {
    if (right.opportunityScore !== left.opportunityScore) {
      return right.opportunityScore - left.opportunityScore;
    }

    if (left.contentCompleteness !== right.contentCompleteness) {
      return left.contentCompleteness - right.contentCompleteness;
    }

    return left.topicName.localeCompare(right.topicName);
  });
}
