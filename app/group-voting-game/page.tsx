import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { groupVotingGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: groupVotingGamePage.metaTitle,
  metaDescription: groupVotingGamePage.metaDescription,
  canonicalUrl: groupVotingGamePage.canonicalUrl,
});

export default function GroupVotingGamePage() {
  return <IntentLandingPage page={groupVotingGamePage} />;
}
