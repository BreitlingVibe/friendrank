import type { TopicHubDefinition } from "@/lib/topic-hubs/hub-types";

export const TOPIC_HUBS: TopicHubDefinition[] = [];

export function getHubDefinition(id: string): TopicHubDefinition | undefined {
  return TOPIC_HUBS.find(
    (hub) => hub.id === id || hub.slug === id,
  );
}

export function getAllHubDefinitions(): TopicHubDefinition[] {
  return [...TOPIC_HUBS];
}
