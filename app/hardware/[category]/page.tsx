import type { Metadata } from "next";
import CatalogCategory from "@/components/catalog-category";
import CatalogFamily from "@/components/catalog-family";
import JsonLd from "@/components/json-ld";
import {
  getCategorySummaries,
  hardwareFamily,
  slugifyCategory,
  titleFromSlug,
} from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

function breadcrumbSchema(category: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Hardware",
        item: `${SITE_URL}/hardware`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: titleFromSlug(category),
        item: `${SITE_URL}/hardware/${category}`,
      },
    ],
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const title = titleFromSlug(category);
  return {
    title: `${title} — Hardware — SongGlow`,
    description: `${title} from SongGlow — part numbers, sizes, materials and dimension drawings. Request a quote for production quantities.`,
    alternates: { canonical: `/hardware/${category}` },
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
      <>
        <JsonLd data={breadcrumbSchema(category)} />
        <CatalogFamily
          family={hardwareFamily(familyLines[0].name)}
          lines={familyLines}
        />
      </>
    );
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema(category)} />
      <CatalogCategory
        section="hardware"
        sectionTitle="Hardware & Mechanical"
        slug={category}
        page={Number(sp.page) || 1}
        brand={typeof sp.brand === "string" ? sp.brand : undefined}
        params={sp}
      />
    </>
  );
}
