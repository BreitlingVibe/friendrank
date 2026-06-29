import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { anonymousVotingGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: anonymousVotingGamePage.metaTitle,
  metaDescription: anonymousVotingGamePage.metaDescription,
  canonicalUrl: anonymousVotingGamePage.canonicalUrl,
});

export default function AnonymousVotingGamePage() {
  return <IntentLandingPage page={anonymousVotingGamePage} />;
}
