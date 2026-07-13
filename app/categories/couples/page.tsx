import type { Metadata } from "next";
import {
  buildCategoryHubMetadata,
  CategoryHubPage,
} from "@/lib/discovery/category-hub-page";

const SLUG = "couples";

export const metadata: Metadata = buildCategoryHubMetadata(SLUG);

export default function CouplesCategoryHubPage() {
  return <CategoryHubPage slug={SLUG} />;
}
