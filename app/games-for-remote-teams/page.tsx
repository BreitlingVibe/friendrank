import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { gamesForRemoteTeamsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: gamesForRemoteTeamsPage.metaTitle,
  metaDescription: gamesForRemoteTeamsPage.metaDescription,
  canonicalUrl: gamesForRemoteTeamsPage.canonicalUrl,
});

export default function GamesForRemoteTeamsPage() {
  return <IntentLandingPage page={gamesForRemoteTeamsPage} />;
}
