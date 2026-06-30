import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { remoteTeamGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: remoteTeamGamePage.metaTitle,
  metaDescription: remoteTeamGamePage.metaDescription,
  canonicalUrl: remoteTeamGamePage.canonicalUrl,
});

export default function RemoteTeamGamePage() {
  return <IntentLandingPage page={remoteTeamGamePage} />;
}
