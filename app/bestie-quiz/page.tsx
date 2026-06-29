import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { bestieQuizPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: bestieQuizPage.metaTitle,
  metaDescription: bestieQuizPage.metaDescription,
  canonicalUrl: bestieQuizPage.canonicalUrl,
});

export default function BestieQuizPage() {
  return <IntentLandingPage page={bestieQuizPage} />;
}
