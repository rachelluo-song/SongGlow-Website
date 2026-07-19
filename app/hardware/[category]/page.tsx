import type { Metadata } from "next";
import CatalogCategory from "@/components/catalog-category";
import CatalogFamily from "@/components/catalog-family";
import {
  getCategorySummaries,
  hardwareFamily,
  slugifyCategory,
  titleFromSlug,
} from "@/lib/catalog";

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

  // Family slugs (e.g. /hardware/screws) render the family's product lines;
  // full category slugs fall through to the parts table.
  const summaries = await getCategorySummaries("hardware");
  const familyLines = summaries.filter(
    (s) => slugifyCategory(hardwareFamily(s.name)) === category
  );
  if (
    familyLines.length > 0 &&
    !summaries.some((s) => s.slug === category)
  ) {
    return (
      <CatalogFamily
        family={hardwareFamily(familyLines[0].name)}
        lines={familyLines}
      />
    );
  }

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
