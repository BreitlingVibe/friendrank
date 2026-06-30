import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { christmasFamilyGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: christmasFamilyGamesPage.metaTitle,
  metaDescription: christmasFamilyGamesPage.metaDescription,
  canonicalUrl: christmasFamilyGamesPage.canonicalUrl,
});

export default function ChristmasFamilyGamesPage() {
  return <IntentLandingPage page={christmasFamilyGamesPage} />;
}
