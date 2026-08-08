import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogCategory from "@/components/catalog-category";
import JsonLd from "@/components/json-ld";
import { getBrandFacets, getCategoryBySlug, titleFromSlug } from "@/lib/catalog";
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
        name: "Electronic Components",
        item: `${SITE_URL}/components`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: titleFromSlug(category),
        item: `${SITE_URL}/components/${category}`,
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
  // Enrich the description with this category's real part count and top brands
  // (the terms buyers actually search) so each category page is unique. The
  // read is deduped with the page body by getCatalog's request cache.
  const cat = await getCategoryBySlug("components", category);
  const count = cat?.products.length ?? 0;
  const brands = cat
    ? getBrandFacets(cat.products)
        .slice(0, 4)
        .map((b) => b.label)
    : [];
  const brandStr = brands.length ? ` Brands include ${brands.join(", ")}.` : "";
  const lead = count
    ? `${title} from SongGlow: ${count.toLocaleString("en-US")} part${
        count === 1 ? "" : "s"
      } with specs and datasheets, 100% authentic and fully traceable.`
    : `${title} from SongGlow: part numbers, specs and datasheets, 100% authentic with full traceability.`;
  return {
    title: `${title} - Electronic Components - SongGlow`,
    description: `${lead}${brandStr} Request a quote for OEM and EMS production quantities.`,
    alternates: { canonical: `/components/${category}` },
  };
}

export default async function ComponentsCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { category } = await params;
  const sp = await searchParams;
  const cat = await getCategoryBySlug("components", category);
  if (!cat) notFound();

  return (
    <>
      <JsonLd data={breadcrumbSchema(category)} />
      <CatalogCategory
        section="components"
        sectionTitle="Electronic Components"
        slug={category}
        page={Number(sp.page) || 1}
        brand={typeof sp.brand === "string" ? sp.brand : undefined}
        params={sp}
      />
    </>
  );
}
