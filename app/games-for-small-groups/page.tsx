import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { gamesForSmallGroupsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: gamesForSmallGroupsPage.metaTitle,
  metaDescription: gamesForSmallGroupsPage.metaDescription,
  canonicalUrl: gamesForSmallGroupsPage.canonicalUrl,
});

export default function GamesForSmallGroupsPage() {
  return <IntentLandingPage page={gamesForSmallGroupsPage} />;
}
