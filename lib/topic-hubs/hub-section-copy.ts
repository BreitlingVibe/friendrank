import { getCluster } from "@/lib/landing-pages/planning/keyword-clusters";
import type { HubPageContent } from "@/lib/topic-hubs/hub-content-types";
import type { TopicHubDefinition } from "@/lib/topic-hubs/hub-types";

const GENERIC_LIVE_SECTION_TITLE = "Explore all games";

export type ResolvedHubSectionCopy = {
  featuredSectionTitle: string;
  featuredSectionIntro: string;
  liveSectionTitle: string;
  liveSectionIntro: string;
  comingSoonIntro: string;
};

function buildFeaturedIntro(hub: TopicHubDefinition): string {
  const audience =
    getCluster(hub.clusterIds[0] ?? "")?.targetAudience ??
    "groups looking for something fun on their phones";

  return `Popular starting points for ${hub.primaryKeyword} built for ${audience.toLowerCase()}.`;
}

function buildLiveIntro(hub: TopicHubDefinition): string {
  const audience =
    getCluster(hub.clusterIds[0] ?? "")?.targetAudience ??
    "your group";

  return `Browse every live ${hub.primaryKeyword} page for ${audience.toLowerCase()}. Pick a game, add names, share one link, and let everyone vote from their phones.`;
}

function buildComingSoonIntro(hub: TopicHubDefinition): string {
  return `More ${hub.primaryKeyword} are coming to this category as FriendRank continues expanding.`;
}

/** Merges curated hub content with keyword-aware defaults from the hub registry. */
export function resolveHubSectionCopy(
  hub: TopicHubDefinition,
  content?: HubPageContent,
): ResolvedHubSectionCopy {
  const keyword = hub.primaryKeyword;

  const liveSectionTitle =
    content?.liveSectionTitle &&
    content.liveSectionTitle !== GENERIC_LIVE_SECTION_TITLE
      ? content.liveSectionTitle
      : `Explore all ${keyword}`;

  return {
    featuredSectionTitle:
      content?.featuredSectionTitle ?? `Start with these ${keyword}`,
    featuredSectionIntro: content?.featuredSectionIntro ?? buildFeaturedIntro(hub),
    liveSectionTitle,
    liveSectionIntro: content?.liveSectionIntro ?? buildLiveIntro(hub),
    comingSoonIntro: content?.comingSoonIntro ?? buildComingSoonIntro(hub),
  };
}
