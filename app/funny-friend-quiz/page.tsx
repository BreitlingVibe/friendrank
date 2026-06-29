import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { funnyFriendQuizPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: funnyFriendQuizPage.metaTitle,
  metaDescription: funnyFriendQuizPage.metaDescription,
  canonicalUrl: funnyFriendQuizPage.canonicalUrl,
});

export default function FunnyFriendQuizPage() {
  return <IntentLandingPage page={funnyFriendQuizPage} />;
}
