import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { boyfriendGirlfriendQuizPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: boyfriendGirlfriendQuizPage.metaTitle,
  metaDescription: boyfriendGirlfriendQuizPage.metaDescription,
  canonicalUrl: boyfriendGirlfriendQuizPage.canonicalUrl,
});

export default function BoyfriendGirlfriendQuizPage() {
  return <IntentLandingPage page={boyfriendGirlfriendQuizPage} />;
}
