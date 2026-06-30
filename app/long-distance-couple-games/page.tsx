import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { longDistanceCoupleGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: longDistanceCoupleGamesPage.metaTitle,
  metaDescription: longDistanceCoupleGamesPage.metaDescription,
  canonicalUrl: longDistanceCoupleGamesPage.canonicalUrl,
});

export default function LongDistanceCoupleGamesPage() {
  return <IntentLandingPage page={longDistanceCoupleGamesPage} />;
}
