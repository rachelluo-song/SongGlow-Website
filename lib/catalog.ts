import { createClient } from "@supabase/supabase-js";

export type CatalogSection = "components" | "hardware";

export type Product = {
  id: string;
  section: CatalogSection;
  category: string;
  part_number: string;
  name: string;
  manufacturer: string | null;
  description: string | null;
  specs: Record<string, string>;
  datasheet_url: string | null;
};

export type CatalogCategory = {
  name: string;
  slug: string;
  products: Product[];
};

export type CategorySummary = {
  section: CatalogSection;
  name: string;
  slug: string;
  count: number;
  sample: string[];
};

export function slugifyCategory(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** "surface-mount-resistors" → "Surface Mount Resistors" (fallback page titles) */
export function titleFromSlug(slug: string): string {
  return slug
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey);
}

const COLUMNS =
  "id, section, category, part_number, name, manufacturer, description, specs, datasheet_url";

/**
 * Server-side only (service_role key). Returns [] on any error — e.g. the
 * table not existing yet — so pages render their "being stocked" states.
 */
async function fetchProducts(
  section?: CatalogSection,
  query?: string
): Promise<Product[]> {
  const supabase = getClient();
  if (!supabase) return [];

  let request = supabase
    .from("products")
    .select(COLUMNS)
    .order("section", { ascending: true })
    .order("category", { ascending: true })
    .order("part_number", { ascending: true })
    .limit(1000);

  if (section) {
    request = request.eq("section", section);
  }

  const term = query?.trim();
  if (term) {
    const like = `%${term.replaceAll("%", "").replaceAll(",", " ")}%`;
    request = request.or(
      `part_number.ilike.${like},name.ilike.${like},manufacturer.ilike.${like},category.ilike.${like}`
    );
  }

  const { data, error } = await request;
  if (error) {
    console.error("[catalog] fetch failed:", error.message);
    return [];
  }
  return (data ?? []) as Product[];
}

function groupByCategory(products: Product[]): CatalogCategory[] {
  const byCategory = new Map<string, Product[]>();
  for (const row of products) {
    const list = byCategory.get(row.category) ?? [];
    list.push(row);
    byCategory.set(row.category, list);
  }
  return [...byCategory.entries()].map(([name, list]) => ({
    name,
    slug: slugifyCategory(name),
    products: list,
  }));
}

/** One section's products grouped by category, optionally search-filtered. */
export async function getCatalog(
  section: CatalogSection,
  query?: string
): Promise<CatalogCategory[]> {
  return groupByCategory(await fetchProducts(section, query));
}

/**
 * Category cards for the directory pages (and the home page block when no
 * section is given): name, slug, part count, and a few sample part numbers.
 */
export async function getCategorySummaries(
  section?: CatalogSection
): Promise<CategorySummary[]> {
  const products = await fetchProducts(section);
  const map = new Map<string, CategorySummary>();
  for (const p of products) {
    const key = `${p.section}:${p.category}`;
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
      if (existing.sample.length < 3) existing.sample.push(p.part_number);
    } else {
      map.set(key, {
        section: p.section,
        name: p.category,
        slug: slugifyCategory(p.category),
        count: 1,
        sample: [p.part_number],
      });
    }
  }
  return [...map.values()];
}

/** A single category (by URL slug) within a section, or null if unknown. */
export async function getCategoryBySlug(
  section: CatalogSection,
  slug: string
): Promise<CatalogCategory | null> {
  const categories = await getCatalog(section);
  return categories.find((c) => c.slug === slug) ?? null;
}
