import type { TopicHubDefinition } from "@/lib/topic-hubs/hub-types";

export const TOPIC_HUBS: TopicHubDefinition[] = [
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
