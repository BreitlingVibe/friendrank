import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { icebreakerQuestionsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: icebreakerQuestionsPage.metaTitle,
  metaDescription: icebreakerQuestionsPage.metaDescription,
  canonicalUrl: icebreakerQuestionsPage.canonicalUrl,
});

export default function IcebreakerQuestionsPage() {
  return <IntentLandingPage page={icebreakerQuestionsPage} />;
}
