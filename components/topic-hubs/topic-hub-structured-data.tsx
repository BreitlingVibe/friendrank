import { buildTopicHubStructuredData } from "@/lib/topic-hubs/hub-schema";
import type { HubFaqItem } from "@/lib/topic-hubs/hub-content-types";
import type { EntityNavigation } from "@/lib/entities/entity-navigation";

type TopicHubStructuredDataProps = {
  title: string;
  slug: string;
  schemaDescription: string;
  faq: HubFaqItem[];
  entityNavigation?: EntityNavigation;
};

export function TopicHubStructuredData({
  title,
  slug,
  schemaDescription,
  faq,
  entityNavigation,
}: TopicHubStructuredDataProps) {
  const structuredData = buildTopicHubStructuredData({
    title,
    slug,
    schemaDescription,
    faq,
    entityNavigation,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
