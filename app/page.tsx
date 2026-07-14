import HomeContent from "./home-content";
import { getCategorySummaries } from "@/lib/catalog";

// Refresh the home page's catalog block every 5 minutes
export const revalidate = 300;

export default async function HomePage() {
  const catalogCategories = (await getCategorySummaries()).slice(0, 6);
  return <HomeContent catalogCategories={catalogCategories} />;
}
