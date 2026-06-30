import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { gamesForLargeGroupsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: gamesForLargeGroupsPage.metaTitle,
  metaDescription: gamesForLargeGroupsPage.metaDescription,
  canonicalUrl: gamesForLargeGroupsPage.canonicalUrl,
});

export default function GamesForLargeGroupsPage() {
  return <IntentLandingPage page={gamesForLargeGroupsPage} />;
}
