import { anonymousVotingGamesHub } from "@/lib/evergreen-hubs/anonymous-voting-games-data";
import { browserPartyGamesHub } from "@/lib/evergreen-hubs/browser-party-games-data";
import { icebreakerGamesHub } from "@/lib/evergreen-hubs/icebreaker-games-data";
import { partyGamesPillar } from "@/lib/evergreen-hubs/party-games-data";
import type { EvergreenHubDefinition, EvergreenHubPageData } from "@/lib/evergreen-hubs/types";

export const EVERGREEN_HUBS: EvergreenHubDefinition[] = [
  {
    slug: partyGamesPillar.slug,
    title: partyGamesPillar.title,
    description: partyGamesPillar.schemaDescription,
    primaryKeyword: "party games",
  },
  {
    slug: browserPartyGamesHub.slug,
    title: browserPartyGamesHub.title,
    description: browserPartyGamesHub.schemaDescription,
    primaryKeyword: "browser party games",
  },
  {
    slug: anonymousVotingGamesHub.slug,
    title: anonymousVotingGamesHub.title,
    description: anonymousVotingGamesHub.schemaDescription,
    primaryKeyword: "anonymous voting games",
  },
  {
    slug: icebreakerGamesHub.slug,
    title: icebreakerGamesHub.title,
    description: icebreakerGamesHub.schemaDescription,
    primaryKeyword: "icebreaker games",
  },
];

const EVERGREEN_HUB_DATA: Record<string, EvergreenHubPageData> = {
  [partyGamesPillar.slug]: partyGamesPillar,
  [browserPartyGamesHub.slug]: browserPartyGamesHub,
  [anonymousVotingGamesHub.slug]: anonymousVotingGamesHub,
  [icebreakerGamesHub.slug]: icebreakerGamesHub,
};

export function getAllEvergreenHubs(): EvergreenHubDefinition[] {
  return EVERGREEN_HUBS;
}

export function getEvergreenHubBySlug(slug: string): EvergreenHubPageData | undefined {
  return EVERGREEN_HUB_DATA[slug];
}

export function getAllEvergreenHubPages(): EvergreenHubPageData[] {
  return EVERGREEN_HUBS.map((hub) => EVERGREEN_HUB_DATA[hub.slug]).filter(Boolean);
}
