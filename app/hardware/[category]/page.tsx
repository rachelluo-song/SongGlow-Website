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
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { category } = await params;
  const sp = await searchParams;
  return (
    <CatalogCategory
      section="hardware"
      sectionTitle="Hardware & Mechanical"
      slug={category}
      page={Number(sp.page) || 1}
      brand={typeof sp.brand === "string" ? sp.brand : undefined}
      params={sp}
    />
  );
}
