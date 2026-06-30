import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { conferenceIcebreakerGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: conferenceIcebreakerGamesPage.metaTitle,
  metaDescription: conferenceIcebreakerGamesPage.metaDescription,
  canonicalUrl: conferenceIcebreakerGamesPage.canonicalUrl,
});

export default function ConferenceIcebreakerGamesPage() {
  return <IntentLandingPage page={conferenceIcebreakerGamesPage} />;
}
