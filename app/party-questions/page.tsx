import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { partyQuestionsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: partyQuestionsPage.metaTitle,
  metaDescription: partyQuestionsPage.metaDescription,
  canonicalUrl: partyQuestionsPage.canonicalUrl,
});

export default function PartyQuestionsPage() {
  return <IntentLandingPage page={partyQuestionsPage} />;
}
