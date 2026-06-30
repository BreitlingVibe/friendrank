import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { graduationPartyGamesPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: graduationPartyGamesPage.metaTitle,
  metaDescription: graduationPartyGamesPage.metaDescription,
  canonicalUrl: graduationPartyGamesPage.canonicalUrl,
});

export default function GraduationPartyGamesPage() {
  return <IntentLandingPage page={graduationPartyGamesPage} />;
}
