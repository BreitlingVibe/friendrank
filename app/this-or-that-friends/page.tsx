import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { thisOrThatFriendsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: thisOrThatFriendsPage.metaTitle,
  metaDescription: thisOrThatFriendsPage.metaDescription,
  canonicalUrl: thisOrThatFriendsPage.canonicalUrl,
});

export default function ThisOrThatFriendsPage() {
  return <IntentLandingPage page={thisOrThatFriendsPage} />;
}
