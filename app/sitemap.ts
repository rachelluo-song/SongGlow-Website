import type { MetadataRoute } from "next";
import {
  getAllProducts,
  getCategorySummaries,
  hardwareFamily,
  slugifyCategory,
  slugifyPart,
} from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

// Catalog changes go live instantly (CSV upload), so the sitemap must too.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/components`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/hardware`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.7 },
  ];

  const summaries = await getCategorySummaries();

  const categoryPages: MetadataRoute.Sitemap = summaries.map((s) => ({
    url: `${SITE_URL}/${s.section}/${s.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
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
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const productPages: MetadataRoute.Sitemap = (await getAllProducts()).map(
    (p) => ({
      url: `${SITE_URL}/${p.section}/${slugifyCategory(
        p.category
      )}/${slugifyPart(p.part_number)}`,
      changeFrequency: "monthly",
      priority: 0.6,
    })
  );

  return [...staticPages, ...familyPages, ...categoryPages, ...productPages];
}
