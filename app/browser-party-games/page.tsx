import type { Metadata } from "next";
import { EvergreenHubPage } from "@/components/evergreen-hubs/evergreen-hub-page";
import { browserPartyGamesHub } from "@/lib/evergreen-hubs/browser-party-games-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: browserPartyGamesHub.metaTitle,
  metaDescription: browserPartyGamesHub.metaDescription,
  canonicalUrl: browserPartyGamesHub.canonicalUrl,
});

export default function BrowserPartyGamesPage() {
  return <EvergreenHubPage page={browserPartyGamesHub} />;
}
