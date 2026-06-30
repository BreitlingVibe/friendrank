import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { bridalShowerGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: bridalShowerGamesPage.metaTitle,
  metaDescription: bridalShowerGamesPage.metaDescription,
  canonicalUrl: bridalShowerGamesPage.canonicalUrl,
});

export default function BridalShowerGamesPage() {
  return <IntentLandingPage page={bridalShowerGamesPage} />;
}
