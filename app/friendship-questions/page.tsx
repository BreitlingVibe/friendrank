import type { Metadata } from "next";
import { IntentLandingPage } from "@/components/landing-pages/intent-landing-page";
import { friendshipQuestionsPage } from "@/lib/landing-pages/landing-page-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: friendshipQuestionsPage.metaTitle,
  metaDescription: friendshipQuestionsPage.metaDescription,
  canonicalUrl: friendshipQuestionsPage.canonicalUrl,
});

export default function FriendshipQuestionsPage() {
  return <IntentLandingPage page={friendshipQuestionsPage} />;
}
