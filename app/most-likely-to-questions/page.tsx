import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { mostLikelyToQuestionsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: mostLikelyToQuestionsPage.metaTitle,
  metaDescription: mostLikelyToQuestionsPage.metaDescription,
  canonicalUrl: mostLikelyToQuestionsPage.canonicalUrl,
});

export default function MostLikelyToQuestionsPage() {
  return <IntentLandingPage page={mostLikelyToQuestionsPage} />;
}
