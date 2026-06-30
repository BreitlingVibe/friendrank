import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { teamBuildingQuestionsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: teamBuildingQuestionsPage.metaTitle,
  metaDescription: teamBuildingQuestionsPage.metaDescription,
  canonicalUrl: teamBuildingQuestionsPage.canonicalUrl,
});

export default function TeamBuildingQuestionsPage() {
  return <IntentLandingPage page={teamBuildingQuestionsPage} />;
}
