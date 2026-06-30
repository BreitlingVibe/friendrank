import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { drinkingQuestionsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: drinkingQuestionsPage.metaTitle,
  metaDescription: drinkingQuestionsPage.metaDescription,
  canonicalUrl: drinkingQuestionsPage.canonicalUrl,
});

export default function DrinkingQuestionsPage() {
  return <IntentLandingPage page={drinkingQuestionsPage} />;
}
