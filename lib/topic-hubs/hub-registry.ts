import type { TopicHubDefinition } from "@/lib/topic-hubs/hub-types";

export const TOPIC_HUBS: TopicHubDefinition[] = [
  {
    id: "friend-games",
    slug: "friend-games",
    title: "Friend Games",
    description:
      "Friend quizzes, voting games, and Most Likely To generators for close groups and group chats.",
    hero: "Play friend quizzes and group voting games with your crew. Pick a game, share one link, vote on phones, and reveal results together.",
    primaryKeyword: "friend games",
    clusterIds: ["friendship", "social-voting", "most-likely"],
    featuredLandingPages: [
      "best-friend-quiz",
      "who-knows-me-best",
      "most-likely-to-generator",
    ],
  },
  {
    id: "team-building-games",
    slug: "team-building-games",
    title: "Team Building Games",
    description:
      "Workplace team building and coworker games with anonymous group voting.",
    hero: "Bring your team together with light team building games. Create a game, invite coworkers, vote anonymously, and reveal results together.",
    primaryKeyword: "team building games",
    clusterIds: ["teams"],
    featuredLandingPages: [
      "team-building-game",
      "office-icebreaker",
      "team-bonding-game",
    ],
  },
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
