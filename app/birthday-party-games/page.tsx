import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { birthdayPartyGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: birthdayPartyGamesPage.metaTitle,
  metaDescription: birthdayPartyGamesPage.metaDescription,
  canonicalUrl: birthdayPartyGamesPage.canonicalUrl,
});

export default function BirthdayPartyGamesPage() {
  return <IntentLandingPage page={birthdayPartyGamesPage} />;
}
