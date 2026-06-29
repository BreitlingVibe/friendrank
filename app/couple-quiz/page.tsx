import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { coupleQuizPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: coupleQuizPage.metaTitle,
  metaDescription: coupleQuizPage.metaDescription,
  canonicalUrl: coupleQuizPage.canonicalUrl,
});

export default function CoupleQuizPage() {
  return <IntentLandingPage page={coupleQuizPage} />;
}
