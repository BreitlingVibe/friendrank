import type { Metadata } from "next";
import { EvergreenHubPage } from "@/components/evergreen-hubs/evergreen-hub-page";
import { teamBuildingGamesPillar } from "@/lib/evergreen-hubs/team-building-games-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: teamBuildingGamesPillar.metaTitle,
  metaDescription: teamBuildingGamesPillar.metaDescription,
  canonicalUrl: teamBuildingGamesPillar.canonicalUrl,
});

export default function TeamBuildingGamesPage() {
  return <EvergreenHubPage page={teamBuildingGamesPillar} />;
}
