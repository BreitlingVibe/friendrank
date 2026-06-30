import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { newlyDatingGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: newlyDatingGamesPage.metaTitle,
  metaDescription: newlyDatingGamesPage.metaDescription,
  canonicalUrl: newlyDatingGamesPage.canonicalUrl,
});

export default function NewlyDatingGamesPage() {
  return <IntentLandingPage page={newlyDatingGamesPage} />;
}
