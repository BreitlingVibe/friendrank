import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { boysNightGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: boysNightGamesPage.metaTitle,
  metaDescription: boysNightGamesPage.metaDescription,
  canonicalUrl: boysNightGamesPage.canonicalUrl,
});

export default function BoysNightGamesPage() {
  return <IntentLandingPage page={boysNightGamesPage} />;
}
