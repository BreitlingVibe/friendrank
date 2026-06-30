import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { romanticQuestionsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: romanticQuestionsPage.metaTitle,
  metaDescription: romanticQuestionsPage.metaDescription,
  canonicalUrl: romanticQuestionsPage.canonicalUrl,
});

export default function RomanticQuestionsPage() {
  return <IntentLandingPage page={romanticQuestionsPage} />;
}
