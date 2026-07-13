import { CONTENT_TOPICS } from "@/lib/growth/content-opportunities/topic-definitions";
import { getGlobalContentCounts } from "@/lib/growth/content-opportunities/opportunity-sources";
import {
  rankTopicsByOpportunity,
  scoreAllTopics,
} from "@/lib/growth/content-opportunities/opportunity-scoring";
import type {
  ContentOpportunityReport,
  TopicScorecard,
} from "@/lib/growth/content-opportunities/types";

export function buildContentOpportunityReport(): ContentOpportunityReport {
  const scorecards = scoreAllTopics(CONTENT_TOPICS);
  const rankedRoadmap = rankTopicsByOpportunity(scorecards);

  return {
    generatedAt: new Date().toISOString(),
    topicCount: scorecards.length,
    summary: getGlobalContentCounts(),
    scorecards,
    rankedRoadmap,
  };
}

function formatScore(value: number): string {
  return `${value}/100`;
}

function formatSlugList(slugs: string[], limit = 8): string {
  if (slugs.length === 0) {
    return "None";
  }

  const preview = slugs.slice(0, limit).map((slug) => `/${slug}`).join(", ");
  if (slugs.length <= limit) {
    return `${preview} (${slugs.length})`;
  }

  return `${preview}, … (${slugs.length} total)`;
}

function formatScorecard(scorecard: TopicScorecard, rank?: number): string[] {
  const lines: string[] = [];
  const rankPrefix = rank !== undefined ? `${rank}. ` : "";

  lines.push(`${rankPrefix}${scorecard.topicName}`);
  lines.push(`   Topic id: ${scorecard.topicId}`);
  if (scorecard.pillarSlug) {
    const pillarLabel = scorecard.pillarTitle ?? scorecard.pillarSlug;
    lines.push(
      `   Parent pillar: /${scorecard.pillarSlug} (${pillarLabel})`,
    );
  } else {
    lines.push("   Parent pillar: none (cross-cutting cluster)");
  }
  lines.push("");
  lines.push("   Coverage");
  lines.push(
    `   - Landing pages (live): ${formatSlugList(scorecard.landingPageSlugs)}`,
  );
  if (scorecard.plannedLandingPageSlugs.length > 0) {
    lines.push(
      `   - Landing pages (planned): ${formatSlugList(scorecard.plannedLandingPageSlugs, 5)}`,
    );
  }
  lines.push(
    `   - Evergreen hubs: ${formatSlugList(scorecard.evergreenHubSlugs, 6)}`,
  );
  lines.push(
    `   - Category hubs (live): ${formatSlugList(scorecard.liveCategoryHubSlugs, 6)}`,
  );
  if (
    scorecard.counts.plannedCategoryHubs > 0 ||
    scorecard.counts.seedCategoryHubs > 0
  ) {
    lines.push(
      `   - Category hubs (planned/seed): ${scorecard.counts.plannedCategoryHubs} planned, ${scorecard.counts.seedCategoryHubs} seed`,
    );
  }
  lines.push("");
  lines.push("   Scores");
  lines.push(`   - Authority score: ${formatScore(scorecard.authorityScore)}`);
  lines.push(
    `   - Content completeness: ${formatScore(scorecard.contentCompleteness)}`,
  );
  lines.push(
    `   - Opportunity score: ${formatScore(scorecard.opportunityScore)} (higher = more architectural gap)`,
  );
  lines.push(
    `   - Landing coverage: ${formatScore(scorecard.scores.landingCoverage)}`,
  );
  lines.push(
    `   - Evergreen coverage: ${formatScore(scorecard.scores.evergreenCoverage)}`,
  );
  lines.push(
    `   - Category coverage: ${formatScore(scorecard.scores.categoryCoverage)}`,
  );
  lines.push(
    `   - Linking completeness: ${formatScore(scorecard.scores.linkingCompleteness)}`,
  );
  lines.push(
    `   - Authority completeness: ${formatScore(scorecard.scores.authorityCompleteness)}`,
  );
  lines.push("");
  lines.push(`   Recommendation: ${scorecard.recommendation}`);
  for (const reason of scorecard.recommendationRationale) {
    lines.push(`   - ${reason}`);
  }
  lines.push("");
  lines.push("   Missing assets");
  if (scorecard.missingAssets.length === 0) {
    lines.push("   - None detected");
  } else {
    for (const asset of scorecard.missingAssets) {
      lines.push(`   - ${asset}`);
    }
  }

  return lines;
}

export function formatContentOpportunityReport(
  report: ContentOpportunityReport,
): string {
  const lines: string[] = [];

  lines.push("FriendRank Content Opportunity Engine");
  lines.push("Internal planning report — read-only architecture analysis.");
  lines.push("Does not modify production pages, metadata, or registries.");
  lines.push("");
  lines.push("====================================");
  lines.push("1. Executive summary");
  lines.push("====================================");
  lines.push(`Generated: ${report.generatedAt}`);
  lines.push(`Topics analyzed: ${report.topicCount}`);
  lines.push(
    `Live landing pages: ${report.summary.totalLiveLandingPages} | Planned: ${report.summary.totalPlannedLandingPages}`,
  );
  lines.push(
    `Evergreen hubs: ${report.summary.totalEvergreenHubs} | Live category hubs: ${report.summary.totalLiveCategoryHubs}`,
  );
  lines.push(
    `Planned category hubs: ${report.summary.totalPlannedCategoryHubs}`,
  );
  lines.push("");
  lines.push(
    "Scoring uses FriendRank registry and discovery graph data only — no search volumes.",
  );
  lines.push("");
  lines.push("====================================");
  lines.push("2. Ranked roadmap (highest opportunity first)");
  lines.push("====================================");

  report.rankedRoadmap.forEach((scorecard, index) => {
    lines.push("");
    lines.push(...formatScorecard(scorecard, index + 1));
  });

  lines.push("");
  lines.push("====================================");
  lines.push("3. Topic scorecards (alphabetical)");
  lines.push("====================================");

  const alphabetical = [...report.scorecards].sort((left, right) =>
    left.topicName.localeCompare(right.topicName),
  );

  for (const scorecard of alphabetical) {
    lines.push("");
    lines.push(...formatScorecard(scorecard));
  }

  lines.push("");
  lines.push("====================================");
  lines.push("4. Scoring reference");
  lines.push("====================================");
  lines.push("See docs/CONTENT_OPPORTUNITY_ENGINE.md for full scoring philosophy.");
  lines.push("");
  lines.push(
    "Authority score = weighted blend of landing, evergreen, category, linking, and authority completeness.",
  );
  lines.push(
    "Content completeness = how much of the intended pyramid exists for the cluster today.",
  );
  lines.push(
    "Opportunity score = inverse completeness plus missing-asset weight — use for prioritization.",
  );
  lines.push("");
  lines.push("Recommendation precedence:");
  lines.push("1. Build Evergreen Hub — pillar missing");
  lines.push("2. Build Category Hub — landing depth without mid-layer");
  lines.push("3. Expand Landing Pages — registry backlog or landing gap");
  lines.push("4. Maintain — thresholds met");
  lines.push("5. No action — no dominant gap");

  return lines.join("\n");
}

export function validateContentOpportunityReport(
  report: ContentOpportunityReport,
): { valid: boolean; issues: string[] } {
  const issues: string[] = [];

  if (report.topicCount === 0) {
    issues.push("No topics were analyzed.");
  }

  if (report.scorecards.length !== report.topicCount) {
    issues.push("Scorecard count does not match topic count.");
  }

  if (report.rankedRoadmap.length !== report.topicCount) {
    issues.push("Ranked roadmap length does not match topic count.");
  }

  for (const scorecard of report.scorecards) {
    if (scorecard.authorityScore < 0 || scorecard.authorityScore > 100) {
      issues.push(`Invalid authority score for ${scorecard.topicId}.`);
    }
  }

  return { valid: issues.length === 0, issues };
}
