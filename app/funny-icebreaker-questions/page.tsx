import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { funnyIcebreakerQuestionsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: funnyIcebreakerQuestionsPage.metaTitle,
  metaDescription: funnyIcebreakerQuestionsPage.metaDescription,
  canonicalUrl: funnyIcebreakerQuestionsPage.canonicalUrl,
});

export default function FunnyIcebreakerQuestionsPage() {
  return <IntentLandingPage page={funnyIcebreakerQuestionsPage} />;
}
