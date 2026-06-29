import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { friendshipTestPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: friendshipTestPage.metaTitle,
  metaDescription: friendshipTestPage.metaDescription,
  canonicalUrl: friendshipTestPage.canonicalUrl,
});

export default function FriendshipTestPage() {
  return <IntentLandingPage page={friendshipTestPage} />;
}
