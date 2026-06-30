import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { deepQuestionsForCouplesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: deepQuestionsForCouplesPage.metaTitle,
  metaDescription: deepQuestionsForCouplesPage.metaDescription,
  canonicalUrl: deepQuestionsForCouplesPage.canonicalUrl,
});

export default function DeepQuestionsForCouplesPage() {
  return <IntentLandingPage page={deepQuestionsForCouplesPage} />;
}
