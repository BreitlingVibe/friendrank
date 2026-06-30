import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { wouldYouRatherFriendsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: wouldYouRatherFriendsPage.metaTitle,
  metaDescription: wouldYouRatherFriendsPage.metaDescription,
  canonicalUrl: wouldYouRatherFriendsPage.canonicalUrl,
});

export default function WouldYouRatherFriendsPage() {
  return <IntentLandingPage page={wouldYouRatherFriendsPage} />;
}
