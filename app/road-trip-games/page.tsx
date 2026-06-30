import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { roadTripGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: roadTripGamesPage.metaTitle,
  metaDescription: roadTripGamesPage.metaDescription,
  canonicalUrl: roadTripGamesPage.canonicalUrl,
});

export default function RoadTripGamesPage() {
  return <IntentLandingPage page={roadTripGamesPage} />;
}
