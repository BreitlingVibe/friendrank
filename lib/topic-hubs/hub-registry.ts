import type { TopicHubDefinition } from "@/lib/topic-hubs/hub-types";

export const TOPIC_HUBS: TopicHubDefinition[] = [
  {
    id: "relationship-games",
    slug: "relationship-games",
    title: "Relationship Games",
    description:
      "Relationship quizzes and couple games adapted to group voting for dates and friend groups.",
    hero: "Turn relationship quizzes into a social game. Vote anonymously on playful roles and reveal compatibility results together.",
    primaryKeyword: "relationship games",
    clusterIds: ["relationships"],
    featuredLandingPages: [
      "relationship-quiz",
      "couple-quiz",
      "boyfriend-girlfriend-quiz",
    ],
  },
  {
    id: "question-games",
    slug: "question-games",
    title: "Question Games",
    description:
      "Would You Rather, Never Have I Ever, and question prompts turned into live group voting games.",
    hero: "Turn question prompts into a live voting game. Pick a format, share one link, vote on phones, and reveal funny group picks together.",
    primaryKeyword: "question games",
    clusterIds: ["questions"],
    featuredLandingPages: [
      "would-you-rather-friends",
      "never-have-i-ever-friends",
      "most-likely-to-questions",
    ],
  },
];

export function getHubDefinition(id: string): TopicHubDefinition | undefined {
  return TOPIC_HUBS.find(
    (hub) => hub.id === id || hub.slug === id,
  );
}

export function getAllHubDefinitions(): TopicHubDefinition[] {
  return [...TOPIC_HUBS];
}
