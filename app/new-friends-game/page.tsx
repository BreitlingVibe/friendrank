import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { newFriendsGamePage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: newFriendsGamePage.metaTitle,
  metaDescription: newFriendsGamePage.metaDescription,
  canonicalUrl: newFriendsGamePage.canonicalUrl,
});

export default function NewFriendsGamePage() {
  return <IntentLandingPage page={newFriendsGamePage} />;
}
