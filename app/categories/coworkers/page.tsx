import type { Metadata } from "next";
import {
  buildCategoryHubMetadata,
  CategoryHubPage,
} from "@/lib/discovery/category-hub-page";

const SLUG = "coworkers";

export const metadata: Metadata = buildCategoryHubMetadata(SLUG);

export default function CoworkersCategoryHubPage() {
  return <CategoryHubPage slug={SLUG} />;
}
