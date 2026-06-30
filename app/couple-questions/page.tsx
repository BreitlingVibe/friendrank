import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { coupleQuestionsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: coupleQuestionsPage.metaTitle,
  metaDescription: coupleQuestionsPage.metaDescription,
  canonicalUrl: coupleQuestionsPage.canonicalUrl,
});

export default function CoupleQuestionsPage() {
  return <IntentLandingPage page={coupleQuestionsPage} />;
}
