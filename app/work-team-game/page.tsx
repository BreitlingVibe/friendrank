import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { workTeamGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: workTeamGamePage.metaTitle,
  metaDescription: workTeamGamePage.metaDescription,
  canonicalUrl: workTeamGamePage.canonicalUrl,
});

export default function WorkTeamGamePage() {
  return <IntentLandingPage page={workTeamGamePage} />;
}
