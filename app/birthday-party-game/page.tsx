import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { birthdayPartyGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: birthdayPartyGamePage.metaTitle,
  metaDescription: birthdayPartyGamePage.metaDescription,
  canonicalUrl: birthdayPartyGamePage.canonicalUrl,
});

export default function BirthdayPartyGamePage() {
  return <IntentLandingPage page={birthdayPartyGamePage} />;
}
