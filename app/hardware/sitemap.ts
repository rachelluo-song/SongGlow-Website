import type { MetadataRoute } from "next";
import { getAllProducts, slugifyCategory, slugifyPart } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

// Catalog uploads should appear without waiting for a deployment.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts("hardware");
  return products.map((product) => ({
    url: `${SITE_URL}/hardware/${slugifyCategory(
      product.category
    )}/${slugifyPart(product.part_number)}`,
    changeFrequency: "monthly",
    priority: 0.6,
    ...(product.created_at ? { lastModified: product.created_at } : {}),
  }));
}
