import { buildTopicHubStructuredData } from "@/lib/topic-hubs/hub-schema";
import type { HubFaqItem } from "@/lib/topic-hubs/hub-content-types";

type TopicHubStructuredDataProps = {
  title: string;
  slug: string;
  schemaDescription: string;
  faq: HubFaqItem[];
};

export function TopicHubStructuredData({
  title,
  slug,
  schemaDescription,
  faq,
}: TopicHubStructuredDataProps) {
  const structuredData = buildTopicHubStructuredData({
    title,
    slug,
    schemaDescription,
    faq,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
