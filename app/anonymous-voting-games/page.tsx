import type { Metadata } from "next";
import { EvergreenHubPage } from "@/components/evergreen-hubs/evergreen-hub-page";
import { anonymousVotingGamesHub } from "@/lib/evergreen-hubs/anonymous-voting-games-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: anonymousVotingGamesHub.metaTitle,
  metaDescription: anonymousVotingGamesHub.metaDescription,
  canonicalUrl: anonymousVotingGamesHub.canonicalUrl,
});

export default function AnonymousVotingGamesPage() {
  return <EvergreenHubPage page={anonymousVotingGamesHub} />;
}
