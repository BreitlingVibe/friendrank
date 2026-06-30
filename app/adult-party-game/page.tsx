import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { adultPartyGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: adultPartyGamePage.metaTitle,
  metaDescription: adultPartyGamePage.metaDescription,
  canonicalUrl: adultPartyGamePage.canonicalUrl,
});

export default function AdultPartyGamePage() {
  return <IntentLandingPage page={adultPartyGamePage} />;
}
