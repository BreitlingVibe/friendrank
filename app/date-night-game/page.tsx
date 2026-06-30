import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { dateNightGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: dateNightGamePage.metaTitle,
  metaDescription: dateNightGamePage.metaDescription,
  canonicalUrl: dateNightGamePage.canonicalUrl,
});

export default function DateNightGamePage() {
  return <IntentLandingPage page={dateNightGamePage} />;
}
