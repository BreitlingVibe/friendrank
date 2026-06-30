import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { teamLunchGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: teamLunchGamesPage.metaTitle,
  metaDescription: teamLunchGamesPage.metaDescription,
  canonicalUrl: teamLunchGamesPage.canonicalUrl,
});

export default function TeamLunchGamesPage() {
  return <IntentLandingPage page={teamLunchGamesPage} />;
}
