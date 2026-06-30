import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { gamesForRoommatesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: gamesForRoommatesPage.metaTitle,
  metaDescription: gamesForRoommatesPage.metaDescription,
  canonicalUrl: gamesForRoommatesPage.canonicalUrl,
});

export default function GamesForRoommatesPage() {
  return <IntentLandingPage page={gamesForRoommatesPage} />;
}
