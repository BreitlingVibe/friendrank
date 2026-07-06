import { buildHomepageFaqStructuredData } from "@/lib/seo/homepage-faq-schema";

export function HomepageFaqStructuredData() {
  const structuredData = buildHomepageFaqStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
