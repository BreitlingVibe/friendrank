import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { childhoodFriendsQuizPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: childhoodFriendsQuizPage.metaTitle,
  metaDescription: childhoodFriendsQuizPage.metaDescription,
  canonicalUrl: childhoodFriendsQuizPage.canonicalUrl,
});

export default function ChildhoodFriendsQuizPage() {
  return <IntentLandingPage page={childhoodFriendsQuizPage} />;
}
