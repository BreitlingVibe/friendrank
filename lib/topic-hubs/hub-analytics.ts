import type { CtaLocation } from "@/lib/analytics";

const HUB_CTA_LOCATION_BY_ID: Record<string, CtaLocation> = {
  "friend-games": "landing_friend_games",
  "party-games": "landing_party_games",
  "team-building-games": "landing_team_building_games",
  "relationship-games": "landing_relationship_games",
  "icebreaker-games": "landing_icebreaker_games",
};

const HOMEPAGE_HUB_CTA_LOCATION_BY_ID: Record<string, CtaLocation> = {
  "friend-games": "homepage_friend_games",
  "party-games": "homepage_party_games",
  "team-building-games": "homepage_team_building_games",
  "relationship-games": "homepage_relationship_games",
  "icebreaker-games": "homepage_icebreaker_games",
};

export function getTopicHubCtaLocation(hubId: string): CtaLocation {
  const location = HUB_CTA_LOCATION_BY_ID[hubId];
  if (!location) {
    throw new Error(`Unknown topic hub analytics location for hub id: ${hubId}`);
  }

  return location;
}

export function getHomepageHubCtaLocation(hubId: string): CtaLocation {
  const location = HOMEPAGE_HUB_CTA_LOCATION_BY_ID[hubId];
  if (!location) {
    throw new Error(
      `Unknown homepage hub analytics location for hub id: ${hubId}`,
    );
  }

  return location;
}
