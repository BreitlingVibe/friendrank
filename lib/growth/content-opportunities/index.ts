export type {
  ContentOpportunityReport,
  ContentRecommendation,
  TopicScoreBreakdown,
  TopicScorecard,
} from "@/lib/growth/content-opportunities/types";

export {
  CONTENT_TOPICS,
  PRIMARY_PILLAR_SLUGS,
} from "@/lib/growth/content-opportunities/topic-definitions";

export {
  buildContentOpportunityReport,
  formatContentOpportunityReport,
  validateContentOpportunityReport,
} from "@/lib/growth/content-opportunities/opportunity-report";

export {
  scoreTopic,
  scoreAllTopics,
  rankTopicsByOpportunity,
} from "@/lib/growth/content-opportunities/opportunity-scoring";
