import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product-detail";
import {
  getProductBySlug,
  productSeoDescription,
  productSeoTitle,
  slugifyCategory,
  slugifyPart,
} from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; part: string }>;
}): Promise<Metadata> {
  const { category, part } = await params;
  const hit = await getProductBySlug("hardware", category, part);
  if (!hit) return { title: "Part not found - SongGlow" };
  const { category: catalogCategory, product } = hit;
  const canonical = `/hardware/${slugifyCategory(
    catalogCategory.name
  )}/${slugifyPart(product.part_number)}`;
  const title = productSeoTitle(product, catalogCategory.name);
  const description = productSeoDescription(product, catalogCategory.name);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: { title, description, url: canonical, type: "website" },
  };
}

export default async function HardwareProductPage({
  params,
}: {
  params: Promise<{ category: string; part: string }>;
}) {
  const { category, part } = await params;
  const hit = await getProductBySlug("hardware", category, part);
  if (!hit) notFound();

  return (
    <ProductDetail
      section="hardware"
      sectionTitle="Hardware & Mechanical"
      categorySlug={category}
      partSlug={part}
    />
  );
}
