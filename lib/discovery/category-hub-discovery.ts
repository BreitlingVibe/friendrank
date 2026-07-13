import { dedupeDiscoveryLinks } from "@/lib/discovery/link-utils";
import type { DiscoveryLink, RelatedContent } from "@/lib/discovery/types";

export type CategoryHubDiscoverySections = {
  primaryGames: DiscoveryLink[];
  additionalPages: DiscoveryLink[];
  liveCategories: DiscoveryLink[];
  parentPillar: DiscoveryLink | null;
  gameEntryPoint: DiscoveryLink;
  /** When false, render one combined explore section from primaryGames only. */
  showAdditionalPages: boolean;
};

function getAvailableLinks(links: DiscoveryLink[]): DiscoveryLink[] {
  return links.filter((link) => link.available);
}

/**
 * Partitions category hub discovery links without duplicate URLs across sections.
 * Unavailable registry entries (planned/seed categories) are excluded from UI.
 */
export function buildCategoryHubDiscoverySections(
  related: RelatedContent,
): CategoryHubDiscoverySections {
  const primaryGames = getAvailableLinks(related.relatedEvergreenPages);
  const primarySlugs = new Set(primaryGames.map((link) => link.slug));

  const additionalPages = dedupeDiscoveryLinks(
    getAvailableLinks(related.recommendedNextPages).filter(
      (link) => !primarySlugs.has(link.slug),
    ),
  );

  return {
    primaryGames,
    additionalPages,
    liveCategories: getAvailableLinks(related.relatedCategories),
    parentPillar: related.relatedPillar?.available ? related.relatedPillar : null,
    gameEntryPoint: related.gameEntryPoint,
    showAdditionalPages: additionalPages.length > 0,
  };
}
