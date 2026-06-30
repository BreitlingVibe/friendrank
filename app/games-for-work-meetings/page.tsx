import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { gamesForWorkMeetingsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: gamesForWorkMeetingsPage.metaTitle,
  metaDescription: gamesForWorkMeetingsPage.metaDescription,
  canonicalUrl: gamesForWorkMeetingsPage.canonicalUrl,
});

export default function GamesForWorkMeetingsPage() {
  return <IntentLandingPage page={gamesForWorkMeetingsPage} />;
}
