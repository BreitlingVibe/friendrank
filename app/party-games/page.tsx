import type { Metadata } from "next";
import { EvergreenHubPage } from "@/components/evergreen-hubs/evergreen-hub-page";
import { partyGamesPillar } from "@/lib/evergreen-hubs/party-games-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: partyGamesPillar.metaTitle,
  metaDescription: partyGamesPillar.metaDescription,
  canonicalUrl: partyGamesPillar.canonicalUrl,
});

export default function PartyGamesPage() {
  return <EvergreenHubPage page={partyGamesPillar} />;
}
