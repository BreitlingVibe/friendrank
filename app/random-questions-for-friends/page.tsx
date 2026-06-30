import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { randomQuestionsForFriendsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: randomQuestionsForFriendsPage.metaTitle,
  metaDescription: randomQuestionsForFriendsPage.metaDescription,
  canonicalUrl: randomQuestionsForFriendsPage.canonicalUrl,
});

export default function RandomQuestionsForFriendsPage() {
  return <IntentLandingPage page={randomQuestionsForFriendsPage} />;
}
