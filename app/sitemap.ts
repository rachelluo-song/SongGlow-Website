import type { MetadataRoute } from "next";
import {
  getAllProducts,
  getCategorySummaries,
  hardwareFamily,
  slugifyCategory,
} from "@/lib/catalog";
import { GUIDES } from "@/lib/guides";
import { SITE_URL } from "@/lib/site";

// Significant page-level updates only. Keep these dates truthful: Google may
// verify sitemap lastmod values against the page content and structured data.
const PAGE_UPDATED = {
  home: "2026-08-21",
  services: "2026-08-20",
  bomSourcing: "2026-08-21",
  bomRfqTemplate: "2026-08-20",
  chinaSourcing: "2026-08-20",
  obsoleteComponents: "2026-08-20",
  quality: "2026-08-11",
  about: "2026-08-20",
  contact: "2026-08-20",
} as const;

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
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: overall > PAGE_UPDATED.home ? overall : PAGE_UPDATED.home,
    },
    {
      url: `${SITE_URL}/services`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: PAGE_UPDATED.services,
    },
    {
      url: `${SITE_URL}/bom-sourcing`,
      changeFrequency: "monthly",
      priority: 0.9,
      lastModified: PAGE_UPDATED.bomSourcing,
    },
    {
      url: `${SITE_URL}/bom-rfq-template`,
      changeFrequency: "monthly",
      priority: 0.9,
      lastModified: PAGE_UPDATED.bomRfqTemplate,
    },
    {
      url: `${SITE_URL}/electronic-component-sourcing-china`,
      changeFrequency: "monthly",
      priority: 0.9,
      lastModified: PAGE_UPDATED.chinaSourcing,
    },
    {
      url: `${SITE_URL}/obsolete-electronic-components`,
      changeFrequency: "monthly",
      priority: 0.9,
      lastModified: PAGE_UPDATED.obsoleteComponents,
    },
    {
      url: `${SITE_URL}/quality`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: PAGE_UPDATED.quality,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: PAGE_UPDATED.about,
    },
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
    {
      url: `${SITE_URL}/contact`,
      changeFrequency: "yearly",
      priority: 0.7,
      lastModified: PAGE_UPDATED.contact,
    },
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
      lastModified: g.dateModified,
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

  // Exact product pages live in section-specific sitemaps. Keeping this root
  // sitemap focused on the main content and category hubs makes crawl progress
  // measurable without changing which canonical pages are eligible to index.
  return [...staticPages, ...familyPages, ...categoryPages];
}
