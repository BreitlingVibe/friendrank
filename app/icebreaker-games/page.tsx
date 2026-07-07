import type { Metadata } from "next";
import { EvergreenHubPage } from "@/components/evergreen-hubs/evergreen-hub-page";
import { icebreakerGamesHub } from "@/lib/evergreen-hubs/icebreaker-games-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: icebreakerGamesHub.metaTitle,
  metaDescription: icebreakerGamesHub.metaDescription,
  canonicalUrl: icebreakerGamesHub.canonicalUrl,
});

export default function IcebreakerGamesPage() {
  return <EvergreenHubPage page={icebreakerGamesHub} />;
}
