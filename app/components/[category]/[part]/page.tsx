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
  const hit = await getProductBySlug("components", category, part);
  if (!hit) return { title: "Part not found — SongGlow" };
  const { product } = hit;
  const topSpecs = orderedSpecs(product.specs)
    .slice(0, 4)
    .map(([k, v]) => `${k} ${v}`)
    .join(", ");
  return {
    title: `${product.part_number} — ${product.name} — SongGlow`,
    description: `${product.part_number}${
      product.manufacturer ? ` by ${product.manufacturer}` : ""
    } — ${product.name}${
      topSpecs ? ` (${topSpecs})` : ""
    }. 100% authentic, full traceability. Request a quote from SongGlow.`,
    alternates: { canonical: `/components/${category}/${part}` },
  };
}

export default async function ComponentProductPage({
  params,
}: {
  params: Promise<{ category: string; part: string }>;
}) {
  const { category, part } = await params;
  return (
    <ProductDetail
      section="components"
      sectionTitle="Electronic Components"
      categorySlug={category}
      partSlug={part}
    />
  );
}
