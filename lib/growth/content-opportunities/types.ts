export type ContentRecommendation =
  | "Build Category Hub"
  | "Build Evergreen Hub"
  | "Expand Landing Pages"
  | "Maintain"
  | "No action";

export type TopicScoreBreakdown = {
  landingCoverage: number;
  evergreenCoverage: number;
  categoryCoverage: number;
  linkingCompleteness: number;
  authorityCompleteness: number;
};

export type TopicCoverageCounts = {
  liveLandingPages: number;
  plannedLandingPages: number;
  totalLandingPages: number;
  evergreenHubs: number;
  liveCategoryHubs: number;
  plannedCategoryHubs: number;
  seedCategoryHubs: number;
};

export type TopicScorecard = {
  topicId: string;
  topicName: string;
  pillarSlug: string | null;
  pillarTitle: string | null;
  landingPageSlugs: string[];
  plannedLandingPageSlugs: string[];
  evergreenHubSlugs: string[];
  categoryHubSlugs: string[];
  liveCategoryHubSlugs: string[];
  counts: TopicCoverageCounts;
  scores: TopicScoreBreakdown;
  authorityScore: number;
  contentCompleteness: number;
  opportunityScore: number;
  missingAssets: string[];
  recommendation: ContentRecommendation;
  recommendationRationale: string[];
};

export type ContentOpportunityReport = {
  generatedAt: string;
  topicCount: number;
  summary: {
    totalLiveLandingPages: number;
    totalPlannedLandingPages: number;
    totalEvergreenHubs: number;
    totalLiveCategoryHubs: number;
    totalPlannedCategoryHubs: number;
  };
  scorecards: TopicScorecard[];
  rankedRoadmap: TopicScorecard[];
};
