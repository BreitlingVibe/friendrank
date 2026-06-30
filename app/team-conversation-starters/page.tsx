import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { teamConversationStartersPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: teamConversationStartersPage.metaTitle,
  metaDescription: teamConversationStartersPage.metaDescription,
  canonicalUrl: teamConversationStartersPage.canonicalUrl,
});

export default function TeamConversationStartersPage() {
  return <IntentLandingPage page={teamConversationStartersPage} />;
}
