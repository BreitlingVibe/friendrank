import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { marriedCoupleGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: marriedCoupleGamesPage.metaTitle,
  metaDescription: marriedCoupleGamesPage.metaDescription,
  canonicalUrl: marriedCoupleGamesPage.canonicalUrl,
});

export default function MarriedCoupleGamesPage() {
  return <IntentLandingPage page={marriedCoupleGamesPage} />;
}
