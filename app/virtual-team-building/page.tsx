import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { virtualTeamBuildingPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: virtualTeamBuildingPage.metaTitle,
  metaDescription: virtualTeamBuildingPage.metaDescription,
  canonicalUrl: virtualTeamBuildingPage.canonicalUrl,
});

export default function VirtualTeamBuildingPage() {
  return <IntentLandingPage page={virtualTeamBuildingPage} />;
}
