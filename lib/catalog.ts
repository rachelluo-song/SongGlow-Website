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
  products: Product[];
};

/**
 * Fetch one section's catalog, grouped by category, optionally filtered by a
 * search term (matches part number, name, manufacturer, or category).
 * Server-side only — uses the service_role key. Returns empty on any error
 * (e.g. table not created yet) so the page renders its "being stocked" state.
 */
export async function getCatalog(
  section: CatalogSection,
  query?: string
): Promise<CatalogCategory[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return [];

  const supabase = createClient(url, serviceKey);

  let request = supabase
    .from("products")
    .select(
      "id, section, category, part_number, name, manufacturer, description, specs, datasheet_url"
    )
    .eq("section", section)
    .order("category", { ascending: true })
    .order("part_number", { ascending: true })
    .limit(1000);

  const term = query?.trim();
  if (term) {
    const like = `%${term.replaceAll("%", "").replaceAll(",", " ")}%`;
    request = request.or(
      `part_number.ilike.${like},name.ilike.${like},manufacturer.ilike.${like},category.ilike.${like}`
    );
  }

  const { data, error } = await request;
  if (error) {
    console.error(`[catalog] fetch failed for ${section}:`, error.message);
    return [];
  }

  const byCategory = new Map<string, Product[]>();
  for (const row of (data ?? []) as Product[]) {
    const list = byCategory.get(row.category) ?? [];
    list.push(row);
    byCategory.set(row.category, list);
  }

  return [...byCategory.entries()].map(([name, products]) => ({
    name,
    products,
  }));
}
