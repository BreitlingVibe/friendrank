import { buildStructuredDataGraph } from "@/lib/seo/site-metadata";

export function FriendRankStructuredData() {
  const structuredData = buildStructuredDataGraph();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
