import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { friendshipChallengePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: friendshipChallengePage.metaTitle,
  metaDescription: friendshipChallengePage.metaDescription,
  canonicalUrl: friendshipChallengePage.canonicalUrl,
});

export default function FriendshipChallengePage() {
  return <IntentLandingPage page={friendshipChallengePage} />;
}
