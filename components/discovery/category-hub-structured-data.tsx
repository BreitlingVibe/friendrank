import { buildCategoryHubStructuredData } from "@/lib/discovery/category-hub-schema";
import type { CategoryHubViewModel } from "@/lib/discovery/types";

type CategoryHubStructuredDataProps = {
  model: CategoryHubViewModel;
};

export function CategoryHubStructuredData({ model }: CategoryHubStructuredDataProps) {
  const structuredData = buildCategoryHubStructuredData(model);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
