import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { teamMeetingQuestionsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: teamMeetingQuestionsPage.metaTitle,
  metaDescription: teamMeetingQuestionsPage.metaDescription,
  canonicalUrl: teamMeetingQuestionsPage.canonicalUrl,
});

export default function TeamMeetingQuestionsPage() {
  return <IntentLandingPage page={teamMeetingQuestionsPage} />;
}
