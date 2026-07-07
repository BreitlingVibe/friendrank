import type { Metadata } from "next";
import { EvergreenHubPage } from "@/components/evergreen-hubs/evergreen-hub-page";
import { relationshipGamesPillar } from "@/lib/evergreen-hubs/relationship-games-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: relationshipGamesPillar.metaTitle,
  metaDescription: relationshipGamesPillar.metaDescription,
  canonicalUrl: relationshipGamesPillar.canonicalUrl,
});

export default function RelationshipGamesPage() {
  return <EvergreenHubPage page={relationshipGamesPillar} />;
}
