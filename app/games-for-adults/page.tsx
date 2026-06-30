import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { gamesForAdultsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: gamesForAdultsPage.metaTitle,
  metaDescription: gamesForAdultsPage.metaDescription,
  canonicalUrl: gamesForAdultsPage.canonicalUrl,
});

export default function GamesForAdultsPage() {
  return <IntentLandingPage page={gamesForAdultsPage} />;
}
