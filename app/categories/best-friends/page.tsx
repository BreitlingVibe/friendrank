import type { Metadata } from "next";
import {
  buildCategoryHubMetadata,
  CategoryHubPage,
} from "@/lib/discovery/category-hub-page";

const SLUG = "best-friends";

export const metadata: Metadata = buildCategoryHubMetadata(SLUG);

export default function BestFriendsCategoryHubPage() {
  return <CategoryHubPage slug={SLUG} />;
}
