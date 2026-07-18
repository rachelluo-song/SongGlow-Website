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
    title: `${titleFromSlug(category)} — Electronic Components — SongGlow`,
  };
}

export default async function ComponentsCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { category } = await params;
  const { page } = await searchParams;
  return (
    <CatalogCategory
      section="components"
      sectionTitle="Electronic Components"
      slug={category}
      page={Number(page) || 1}
    />
  );
}
