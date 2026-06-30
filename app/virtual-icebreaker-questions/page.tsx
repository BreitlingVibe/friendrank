import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { virtualIcebreakerQuestionsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: virtualIcebreakerQuestionsPage.metaTitle,
  metaDescription: virtualIcebreakerQuestionsPage.metaDescription,
  canonicalUrl: virtualIcebreakerQuestionsPage.canonicalUrl,
});

export default function VirtualIcebreakerQuestionsPage() {
  return <IntentLandingPage page={virtualIcebreakerQuestionsPage} />;
}
