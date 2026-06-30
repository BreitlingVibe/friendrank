import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { anniversaryGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: anniversaryGamePage.metaTitle,
  metaDescription: anniversaryGamePage.metaDescription,
  canonicalUrl: anniversaryGamePage.canonicalUrl,
});

export default function AnniversaryGamePage() {
  return <IntentLandingPage page={anniversaryGamePage} />;
}
