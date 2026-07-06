import { buildEvergreenHubStructuredData } from "@/lib/evergreen-hubs/evergreen-hub-schema";
import type { EvergreenHubPageData } from "@/lib/evergreen-hubs/types";

type EvergreenHubStructuredDataProps = {
  page: EvergreenHubPageData;
};

export function EvergreenHubStructuredData({ page }: EvergreenHubStructuredDataProps) {
  const structuredData = buildEvergreenHubStructuredData(page);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
