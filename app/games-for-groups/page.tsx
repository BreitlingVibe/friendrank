import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { gamesForGroupsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: gamesForGroupsPage.metaTitle,
  metaDescription: gamesForGroupsPage.metaDescription,
  canonicalUrl: gamesForGroupsPage.canonicalUrl,
});

export default function GamesForGroupsPage() {
  return <IntentLandingPage page={gamesForGroupsPage} />;
}
