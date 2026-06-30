import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { gamesForTeensPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: gamesForTeensPage.metaTitle,
  metaDescription: gamesForTeensPage.metaDescription,
  canonicalUrl: gamesForTeensPage.canonicalUrl,
});

export default function GamesForTeensPage() {
  return <IntentLandingPage page={gamesForTeensPage} />;
}
