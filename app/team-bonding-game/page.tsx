import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { teamBondingGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: teamBondingGamePage.metaTitle,
  metaDescription: teamBondingGamePage.metaDescription,
  canonicalUrl: teamBondingGamePage.canonicalUrl,
});

export default function TeamBondingGamePage() {
  return <IntentLandingPage page={teamBondingGamePage} />;
}
