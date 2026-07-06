import { buildTopicHubStructuredData } from "@/lib/topic-hubs/hub-schema";
import type { AiCitationLayer } from "@/lib/geo/ai-citation";
import type { GeoFoundation } from "@/lib/geo/geo-foundation";
import type { HubFaqItem } from "@/lib/topic-hubs/hub-content-types";
import type { EntityNavigation } from "@/lib/entities/entity-navigation";

type TopicHubStructuredDataProps = {
  title: string;
  slug: string;
  schemaDescription: string;
  faq: HubFaqItem[];
  entityNavigation?: EntityNavigation;
  geoFoundation?: GeoFoundation;
  aiCitation?: AiCitationLayer;
};

export function TopicHubStructuredData({
  title,
  slug,
  schemaDescription,
  faq,
  entityNavigation,
  geoFoundation,
  aiCitation,
}: TopicHubStructuredDataProps) {
  const structuredData = buildTopicHubStructuredData({
    title,
    slug,
    schemaDescription,
    faq,
    entityNavigation,
    geoFoundation,
    aiCitation,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
