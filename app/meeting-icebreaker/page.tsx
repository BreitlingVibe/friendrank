import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { meetingIcebreakerPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: meetingIcebreakerPage.metaTitle,
  metaDescription: meetingIcebreakerPage.metaDescription,
  canonicalUrl: meetingIcebreakerPage.canonicalUrl,
});

export default function MeetingIcebreakerPage() {
  return <IntentLandingPage page={meetingIcebreakerPage} />;
}
