import type { Metadata } from "next";
import { EvergreenHubPage } from "@/components/evergreen-hubs/evergreen-hub-page";
import { friendGamesPillar } from "@/lib/evergreen-hubs/friend-games-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: friendGamesPillar.metaTitle,
  metaDescription: friendGamesPillar.metaDescription,
  canonicalUrl: friendGamesPillar.canonicalUrl,
});

export default function FriendGamesPage() {
  return <EvergreenHubPage page={friendGamesPillar} />;
}
