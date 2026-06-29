import { buildLandingPageStructuredData } from "@/lib/landing-pages/landing-page-schema";
import type { LandingPageData } from "@/lib/landing-pages/landing-page-types";

type LandingPageStructuredDataProps = {
  page: LandingPageData;
};

export function LandingPageStructuredData({ page }: LandingPageStructuredDataProps) {
  const structuredData = buildLandingPageStructuredData(page);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
