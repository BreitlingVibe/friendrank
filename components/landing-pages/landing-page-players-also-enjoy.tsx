import { LandingPageRelated } from "@/components/landing-pages/landing-page-related";
import type { LandingPageRelatedPage } from "@/lib/landing-pages/landing-page-types";

type LandingPagePlayersAlsoEnjoyProps = {
  title: string;
  pages: LandingPageRelatedPage[];
};

export function LandingPagePlayersAlsoEnjoy({
  title,
  pages,
}: LandingPagePlayersAlsoEnjoyProps) {
  return (
    <LandingPageRelated
      title={title}
      pages={pages}
      headingId="landing-players-also-enjoy-heading"
    />
  );
}
