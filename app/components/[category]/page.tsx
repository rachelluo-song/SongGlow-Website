import type { Metadata } from "next";
import CatalogCategory from "@/components/catalog-category";
import JsonLd from "@/components/json-ld";
import { titleFromSlug } from "@/lib/catalog";
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
  return {
    title: `${title} — Electronic Components — SongGlow`,
    description: `${title} from SongGlow — part numbers, specs and datasheets, 100% authentic with full traceability. Request a quote for OEM and EMS production quantities.`,
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
