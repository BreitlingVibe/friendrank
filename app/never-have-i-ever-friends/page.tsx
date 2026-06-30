import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { neverHaveIEverFriendsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: neverHaveIEverFriendsPage.metaTitle,
  metaDescription: neverHaveIEverFriendsPage.metaDescription,
  canonicalUrl: neverHaveIEverFriendsPage.canonicalUrl,
});

export default function NeverHaveIEverFriendsPage() {
  return <IntentLandingPage page={neverHaveIEverFriendsPage} />;
}
