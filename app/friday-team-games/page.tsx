import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { fridayTeamGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: fridayTeamGamesPage.metaTitle,
  metaDescription: fridayTeamGamesPage.metaDescription,
  canonicalUrl: fridayTeamGamesPage.canonicalUrl,
});

export default function FridayTeamGamesPage() {
  return <IntentLandingPage page={fridayTeamGamesPage} />;
}
