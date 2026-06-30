import { LandingPageRelated } from "@/components/landing-pages/landing-page-related";
import type { LandingPageRelatedPage } from "@/lib/landing-pages/landing-page-types";

type LandingPagePlayersAlsoEnjoyProps = {
  title: string;
  pages: LandingPageRelatedPage[];
  explanation?: string;
};

export function LandingPagePlayersAlsoEnjoy({
  title,
  pages,
  explanation,
}: LandingPagePlayersAlsoEnjoyProps) {
  return (
    <LandingPageRelated
      title={title}
      pages={pages}
      headingId="landing-players-also-enjoy-heading"
      explanation={explanation}
    />
  );
}
