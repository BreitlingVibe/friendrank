import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { getToKnowYouGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: getToKnowYouGamePage.metaTitle,
  metaDescription: getToKnowYouGamePage.metaDescription,
  canonicalUrl: getToKnowYouGamePage.canonicalUrl,
});

export default function GetToKnowYouGamePage() {
  return <IntentLandingPage page={getToKnowYouGamePage} />;
}
