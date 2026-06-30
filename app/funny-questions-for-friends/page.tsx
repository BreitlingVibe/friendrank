import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { funnyQuestionsForFriendsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: funnyQuestionsForFriendsPage.metaTitle,
  metaDescription: funnyQuestionsForFriendsPage.metaDescription,
  canonicalUrl: funnyQuestionsForFriendsPage.canonicalUrl,
});

export default function FunnyQuestionsForFriendsPage() {
  return <IntentLandingPage page={funnyQuestionsForFriendsPage} />;
}
