import type { Metadata } from "next";
import ProductDetail from "@/components/product-detail";
import { getProductBySlug, orderedSpecs } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; part: string }>;
}): Promise<Metadata> {
  const { category, part } = await params;
  const hit = await getProductBySlug("hardware", category, part);
  if (!hit) return { title: "Part not found — SongGlow" };
  const { product } = hit;
  const topSpecs = orderedSpecs(product.specs)
    .slice(0, 4)
    .map(([k, v]) => `${k} ${v}`)
    .join(", ");
  return {
    title: `${product.part_number} — ${product.name} — SongGlow`,
    description: `${product.part_number} — ${product.name}${
      topSpecs ? ` (${topSpecs})` : ""
    }. Dimension drawings and spec sheets available. Request a quote from SongGlow.`,
    alternates: { canonical: `/hardware/${category}/${part}` },
  };
}

export default async function HardwareProductPage({
  params,
}: {
  params: Promise<{ category: string; part: string }>;
}) {
  const { category, part } = await params;
  return (
    <ProductDetail
      section="hardware"
      sectionTitle="Hardware & Mechanical"
      categorySlug={category}
      partSlug={part}
    />
  );
}
