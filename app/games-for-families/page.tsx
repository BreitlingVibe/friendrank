import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { gamesForFamiliesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: gamesForFamiliesPage.metaTitle,
  metaDescription: gamesForFamiliesPage.metaDescription,
  canonicalUrl: gamesForFamiliesPage.canonicalUrl,
});

export default function GamesForFamiliesPage() {
  return <IntentLandingPage page={gamesForFamiliesPage} />;
}
