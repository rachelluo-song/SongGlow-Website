import type { Metadata } from "next";
import CatalogCategory from "@/components/catalog-category";
import { titleFromSlug } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  return {
    title: `${titleFromSlug(category)} — Hardware — SongGlow`,
  };
}

export default async function HardwareCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return (
    <CatalogCategory
      section="hardware"
      sectionTitle="Hardware & Mechanical"
      slug={category}
    />
  );
}
