import {
  getAllHubDefinitions,
  getHubDefinition,
} from "@/lib/topic-hubs/hub-registry";
import type {
  HubLandingPageRef,
  HubStats,
  TopicHub,
  TopicHubDefinition,
} from "@/lib/topic-hubs/hub-types";
import {
  computeHubStats,
  partitionHubPages,
  resolveHubMemberIntents,
  sortHubLandingPages,
} from "@/lib/topic-hubs/hub-utils";

function assembleHub(definition: TopicHubDefinition): TopicHub {
  const intents = resolveHubMemberIntents(definition);
  const { landingPages, plannedPages } = partitionHubPages(intents);
  const featuredSlugs = definition.featuredLandingPages ?? [];

  const sortedLandingPages = sortHubLandingPages(landingPages, featuredSlugs);
  const sortedPlannedPages = sortHubLandingPages(plannedPages, featuredSlugs);

  return {
    ...definition,
    intro: definition.hero,
    landingPages: sortedLandingPages,
    plannedPages: sortedPlannedPages,
    statistics: computeHubStats(sortedLandingPages, sortedPlannedPages),
  };
}

export function getHub(id: string): TopicHub | undefined {
  const definition = getHubDefinition(id);
  if (!definition) {
    return undefined;
  }

  return assembleHub(definition);
}

export function getAllHubs(): TopicHub[] {
  return getAllHubDefinitions().map(assembleHub);
}

export function getHubLandingPages(id: string): HubLandingPageRef[] {
  const hub = getHub(id);
  return hub?.landingPages ?? [];
}

export function getHubPlannedPages(id: string): HubLandingPageRef[] {
  const hub = getHub(id);
  return hub?.plannedPages ?? [];
}

export function getHubStats(id: string): HubStats | undefined {
  const hub = getHub(id);
  return hub?.statistics;
}
