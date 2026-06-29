import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { bestFriendQuizPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: bestFriendQuizPage.metaTitle,
  metaDescription: bestFriendQuizPage.metaDescription,
  canonicalUrl: bestFriendQuizPage.canonicalUrl,
});

export default function BestFriendQuizPage() {
  return <IntentLandingPage page={bestFriendQuizPage} />;
}
