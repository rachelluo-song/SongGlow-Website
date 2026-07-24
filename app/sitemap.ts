import type { MetadataRoute } from "next";
import {
  getAllProducts,
  getCategorySummaries,
  hardwareFamily,
  slugifyCategory,
  slugifyPart,
} from "@/lib/catalog";
import { GUIDES } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

// Catalog changes go live instantly (CSV upload), so the sitemap must too.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();

  // Honest lastmod dates from each part's created_at. ISO strings with the
  // same UTC offset compare lexicographically, so string max === latest date.
  const catDate = new Map<string, string>(); // `${section}/${slug}` -> newest
  const famDate = new Map<string, string>(); // `${section}/${familySlug}`
  const sectionDate = new Map<string, string>();
  let overall = "";
  const bump = (map: Map<string, string>, key: string, d: string) => {
    if (d > (map.get(key) ?? "")) map.set(key, d);
  };
  for (const p of products) {
    const d = p.created_at ?? "";
    if (!d) continue;
    bump(catDate, `${p.section}/${slugifyCategory(p.category)}`, d);
    bump(famDate, `${p.section}/${slugifyCategory(hardwareFamily(p.category))}`, d);
    bump(sectionDate, p.section, d);
    if (d > overall) overall = d;
  }
  const at = (d?: string) => (d ? { lastModified: d } : {});

  // Guides are dated by their publish date; the hub by the newest guide.
  const newestGuide = GUIDES.map((g) => g.datePublished).sort().at(-1);

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1, ...at(overall) },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${SITE_URL}/components`,
      changeFrequency: "daily",
      priority: 0.9,
      ...at(sectionDate.get("components")),
    },
    {
      url: `${SITE_URL}/hardware`,
      changeFrequency: "daily",
      priority: 0.9,
      ...at(sectionDate.get("hardware")),
    },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
    {
      url: `${SITE_URL}/guides`,
      changeFrequency: "monthly",
      priority: 0.7,
      ...at(newestGuide),
    },
    ...GUIDES.map((g) => ({
      url: `${SITE_URL}/guides/${g.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: g.datePublished,
    })),
  ];

  const summaries = await getCategorySummaries();

  const categoryPages: MetadataRoute.Sitemap = summaries.map((s) => ({
    url: `${SITE_URL}/${s.section}/${s.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
    ...at(catDate.get(`${s.section}/${s.slug}`)),
  }));

  // Hardware family directory pages (/hardware/screws). A family slug that
  // collides with a full category slug renders the category page instead and
  // is already listed above.
  const hardwareSlugs = new Set(
    summaries.filter((s) => s.section === "hardware").map((s) => s.slug)
  );
  const familyPages: MetadataRoute.Sitemap = [
    ...new Set(
      summaries
        .filter((s) => s.section === "hardware")
        .map((s) => slugifyCategory(hardwareFamily(s.name)))
    ),
  ]
    .filter((slug) => !hardwareSlugs.has(slug))
    .map((slug) => ({
      url: `${SITE_URL}/hardware/${slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      ...at(famDate.get(`hardware/${slug}`)),
    }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/${p.section}/${slugifyCategory(
      p.category
    )}/${slugifyPart(p.part_number)}`,
    changeFrequency: "monthly",
    priority: 0.6,
    ...at(p.created_at ?? undefined),
  }));

  return [...staticPages, ...familyPages, ...categoryPages, ...productPages];
}
