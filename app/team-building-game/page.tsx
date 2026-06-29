import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { teamBuildingGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: teamBuildingGamePage.metaTitle,
  metaDescription: teamBuildingGamePage.metaDescription,
  canonicalUrl: teamBuildingGamePage.canonicalUrl,
});

export default function TeamBuildingGamePage() {
  return <IntentLandingPage page={teamBuildingGamePage} />;
}
