import type { Metadata } from "next";
import { EvergreenHubPage } from "@/components/evergreen-hubs/evergreen-hub-page";
import { questionGamesPillar } from "@/lib/evergreen-hubs/question-games-data";
import { buildLandingPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildLandingPageMetadata({
  metaTitle: questionGamesPillar.metaTitle,
  metaDescription: questionGamesPillar.metaDescription,
  canonicalUrl: questionGamesPillar.canonicalUrl,
});

export default function QuestionGamesPage() {
  return <EvergreenHubPage page={questionGamesPillar} />;
}
