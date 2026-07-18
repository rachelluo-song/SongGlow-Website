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
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string; brand?: string }>;
}) {
  const { category } = await params;
  const { page, brand } = await searchParams;
  return (
    <CatalogCategory
      section="hardware"
      sectionTitle="Hardware & Mechanical"
      slug={category}
      page={Number(page) || 1}
      brand={typeof brand === "string" ? brand : undefined}
    />
  );
}
