import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { deepQuestionsForFriendsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: deepQuestionsForFriendsPage.metaTitle,
  metaDescription: deepQuestionsForFriendsPage.metaDescription,
  canonicalUrl: deepQuestionsForFriendsPage.canonicalUrl,
});

export default function DeepQuestionsForFriendsPage() {
  return <IntentLandingPage page={deepQuestionsForFriendsPage} />;
}
