import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { friendTestPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: friendTestPage.metaTitle,
  metaDescription: friendTestPage.metaDescription,
  canonicalUrl: friendTestPage.canonicalUrl,
});

export default function FriendTestPage() {
  return <IntentLandingPage page={friendTestPage} />;
}
