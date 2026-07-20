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
  /** Click-worthy card subtitle: top brands in the category, or sample part numbers as fallback */
  subtitle: string;
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

// Supabase returns at most 1000 rows per request, so full reads are paged.
const PAGE_SIZE = 1000;
// Search results are capped — beyond this, refining the term beats scrolling.
export const SEARCH_LIMIT = 200;

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

  const build = (from: number, to: number) => {
    let request = supabase
      .from("products")
      .select(COLUMNS)
      .order("section", { ascending: true })
      .order("category", { ascending: true })
      .order("part_number", { ascending: true })
      .range(from, to);
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
    return request;
  };

  // Searches: one capped request.
  if (query?.trim()) {
    const { data, error } = await build(0, SEARCH_LIMIT - 1);
    if (error) {
      console.error("[catalog] search failed:", error.message);
      return [];
    }
    return (data ?? []) as Product[];
  }

  // Full reads: page through until a short page.
  const all: Product[] = [];
  for (let from = 0; ; from += PAGE_SIZE) {
    const { data, error } = await build(from, from + PAGE_SIZE - 1);
    if (error) {
      console.error("[catalog] fetch failed:", error.message);
      return all;
    }
    const rows = (data ?? []) as Product[];
    all.push(...rows);
    if (rows.length < PAGE_SIZE) break;
  }
  return all;
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
/**
 * Manufacturer cell → clean brand names for display.
 * "Eaton - Electronics Division" → ["Eaton"]; "YAGEO,WEC" → ["YAGEO", "WEC"];
 * "NDK (NIHON DEMPA KOGYO CO., LTD)" → ["NDK"]; "Littelfuse Inc." → ["Littelfuse"]
 */
function splitBrands(raw: string): string[] {
  return raw
    .split(" (")[0]
    .split(",")
    .map((part) =>
      part
        .split(" - ")[0]
        .replace(/,?\s+(inc\.?|llc|ltd\.?|corp\.?|co\.)$/i, "")
        .trim()
    )
    .filter(Boolean);
}

// Hardware directory ordering: most commonly used families first
// (user decision 2026-07-19); unknown families sort to the end.
const HARDWARE_FAMILY_ORDER = [
  "Screws",
  "Bolts",
  "Threaded Rods",
  "Nuts",
  "Washers",
  "Threaded Inserts",
  "Standoffs",
  "Spacers",
  "Dowel Pins",
  "Pins",
  "O-Rings",
  "Gaskets",
  "Compression Springs",
  "Torsion Springs",
  "Die Springs",
  "Springs",
  "Snap Fasteners",
  "Grommets",
  "Bushings",
  "Pipe Fittings",
  "Fittings",
  "Cable Ties",
  "Twist Ties",
  "Foam Mounting Tape",
  "Masking Tape",
  "Packaging Tape",
  "Optically Clear Repair Tape",
  "Solder",
];

/** "Screws - 18-8 (304) ... Pan Head" → "Screws" */
export function hardwareFamily(categoryName: string): string {
  const i = categoryName.indexOf(" - ");
  return i === -1 ? categoryName : categoryName.slice(0, i);
}

export function hardwareFamilyRank(family: string): number {
  const i = HARDWARE_FAMILY_ORDER.indexOf(family);
  return i === -1 ? HARDWARE_FAMILY_ORDER.length : i;
}

/**
 * Hardware size string → comparable inches: "#6" (numbered screw sizes),
 * "M4" / "4mm" (metric), "1/4\"" and "3 1/2\"" (fractions), "0.25\"".
 */
function sizeInches(s: string): number | null {
  const t = s.trim();
  const num = t.match(/^#(\d+)/);
  if (num) return 0.06 + 0.013 * parseInt(num[1]);
  const metric = t.match(/^M(\d+(?:\.\d+)?)/i);
  if (metric) return parseFloat(metric[1]) / 25.4;
  const mm = t.match(/^(\d+(?:\.\d+)?)\s*mm/i);
  if (mm) return parseFloat(mm[1]) / 25.4;
  const frac = t.match(/^(?:(\d+)\s+)?(\d+)\/(\d+)/);
  if (frac)
    return (
      (frac[1] ? parseInt(frac[1]) : 0) + parseInt(frac[2]) / parseInt(frac[3])
    );
  const dec = t.match(/^(\d+(?:\.\d+)?)/);
  if (dec) return parseFloat(dec[1]);
  return null;
}

function sizeCompare(a: string, b: string): number {
  const va = sizeInches(a);
  const vb = sizeInches(b);
  if (va !== null && vb !== null && va !== vb) return va - vb;
  return specValueCompare(a, b);
}

/**
 * Subcategory grouping within a hardware family, derived from the product-line
 * name. Currently defined for Screws; returns null for ungrouped families.
 * Extend SUBFAMILY_ORDER/rules as new families grow (Set Screws, Thumb
 * Screws, …).
 */
const SCREW_SUBFAMILY_ORDER = [
  "Machine Screws",
  "Socket Head Screws",
  "Sheet Metal & Self-Tapping Screws",
  "Set Screws",
  "Other Screws",
];

export function hardwareSubfamily(
  family: string,
  categoryName: string
): string | null {
  if (family !== "Screws") return null;
  const c = categoryName.toLowerCase();
  if (c.includes("set screw")) return "Set Screws";
  if (c.includes("sheet metal") || c.includes("self-tapping"))
    return "Sheet Metal & Self-Tapping Screws";
  if (
    c.includes("socket head") ||
    c.includes("button") ||
    c.includes("low-profile")
  )
    return "Socket Head Screws";
  if (
    c.includes("pan head") ||
    c.includes("cheese") ||
    c.includes("truss") ||
    c.includes("round head") ||
    c.includes("flat head") ||
    c.includes("slotted")
  )
    return "Machine Screws";
  // no head keyword in the name: these lines are socket head cap screws
  return "Socket Head Screws";
}

export function subfamilyRank(subfamily: string): number {
  const i = SCREW_SUBFAMILY_ORDER.indexOf(subfamily);
  return i === -1 ? SCREW_SUBFAMILY_ORDER.length : i;
}

/** The spec key whose values best describe a hardware family's size range. */
function primarySizeKey(family: string): string | null {
  if (family === "Screws" || family === "Bolts") return "Thread Size";
  if (family === "Washers" || family === "Nuts") return "For Screw Size";
  if (family === "O-Rings" || family === "Bushings" || family === "Grommets")
    return "ID";
  if (family === "Springs") return "OD";
  return null;
}

export type HardwareTreeItem = {
  label: string;
  href: string;
  count: number;
  lines?: number;
};

export type HardwareTreeFamily = {
  family: string;
  slug: string;
  count: number;
  lines: number;
  subtitle: string;
  /** subfamilies (linking to anchors on the family page) or product lines */
  items: HardwareTreeItem[];
};

/**
 * The hardware directory tree: families ordered by commonality, each with
 * either its subfamilies (Screws → Machine/Socket Head/…) or, for families
 * without subfamily rules, its product lines.
 */
export async function getHardwareTree(): Promise<HardwareTreeFamily[]> {
  const products = await fetchProducts("hardware");
  type FB = {
    count: number;
    cats: Map<string, number>;
    materials: Map<string, number>;
    sizes: Set<string>;
    subs: Map<string, { count: number; lines: Set<string> }>;
  };
  const map = new Map<string, FB>();
  for (const p of products) {
    const fam = hardwareFamily(p.category);
    let b = map.get(fam);
    if (!b) {
      b = {
        count: 0,
        cats: new Map(),
        materials: new Map(),
        sizes: new Set(),
        subs: new Map(),
      };
      map.set(fam, b);
    }
    b.count += 1;
    b.cats.set(p.category, (b.cats.get(p.category) ?? 0) + 1);
    const specs = p.specs ?? {};
    if (specs["Material"]) {
      b.materials.set(
        specs["Material"],
        (b.materials.get(specs["Material"]) ?? 0) + 1
      );
    }
    const sizeKey = primarySizeKey(fam);
    if (sizeKey && specs[sizeKey]) b.sizes.add(specs[sizeKey]);
    const sub = hardwareSubfamily(fam, p.category);
    if (sub) {
      const sb = b.subs.get(sub) ?? { count: 0, lines: new Set<string>() };
      sb.count += 1;
      sb.lines.add(p.category);
      b.subs.set(sub, sb);
    }
  }
  return [...map.entries()]
    .map(([family, b]) => {
      const mats = [...b.materials.entries()]
        .sort((x, y) => y[1] - x[1])
        .map(([m]) => m);
      const sizes = [...b.sizes].sort(sizeCompare);
      const parts: string[] = [];
      if (mats.length) {
        parts.push(
          mats.slice(0, 3).join(", ") +
            (mats.length > 3 ? ` +${mats.length - 3} more` : "")
        );
      }
      if (sizes.length > 1)
        parts.push(`${sizes[0]} – ${sizes[sizes.length - 1]}`);

      const slug = slugifyCategory(family);
      const items: HardwareTreeItem[] =
        b.subs.size > 0
          ? [...b.subs.entries()]
              .sort((x, y) => subfamilyRank(x[0]) - subfamilyRank(y[0]))
              .map(([sub, sb]) => ({
                label: sub,
                href: `/hardware/${slug}#${slugifyCategory(sub)}`,
                count: sb.count,
                lines: sb.lines.size,
              }))
          : [...b.cats.entries()]
              .sort((x, y) => y[1] - x[1])
              .map(([name, count]) => ({
                label: name.startsWith(`${family} - `)
                  ? name.slice(family.length + 3)
                  : name,
                href: `/hardware/${slugifyCategory(name)}`,
                count,
              }));

      return {
        family,
        slug,
        count: b.count,
        lines: b.cats.size,
        subtitle: parts.join(" · "),
        items,
      };
    })
    .sort((a, b) => {
      const r = hardwareFamilyRank(a.family) - hardwareFamilyRank(b.family);
      return r !== 0 ? r : b.count - a.count;
    });
}

export type BrandFacet = { key: string; label: string; count: number };

/** Brand chips for a category page: cleaned brand names with product counts. */
export function getBrandFacets(products: Product[]): BrandFacet[] {
  const counts = new Map<string, number>();
  const forms = new Map<string, Map<string, number>>();
  for (const p of products) {
    if (!p.manufacturer) continue;
    const seen = new Set<string>();
    for (const brand of splitBrands(p.manufacturer)) {
      const key = brand.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      counts.set(key, (counts.get(key) ?? 0) + 1);
      const f = forms.get(key) ?? new Map<string, number>();
      f.set(brand, (f.get(brand) ?? 0) + 1);
      forms.set(key, f);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([key, count]) => {
      const fs = [...(forms.get(key) ?? new Map<string, number>())].sort(
        (a, b) => b[1] - a[1]
      );
      return { key, label: fs[0]?.[0] ?? key, count };
    });
}

export function productHasBrand(p: Product, brandKey: string): boolean {
  if (!p.manufacturer) return false;
  return splitBrands(p.manufacturer).some(
    (b) => b.toLowerCase() === brandKey
  );
}

export type SpecFacet = {
  key: string;
  values: { value: string; count: number }[];
};

// Which spec keys make good filters, in preference order. A key qualifies if
// ≥80% of the category's parts carry it and it has 2–30 distinct values.
const SPEC_PRIORITY = [
  // hardware dimensions (only present on hardware parts)
  "Thread Size",
  "For Screw Size",
  "Length",
  "Cross Section",
  "Thickness",
  "ID",
  "OD",
  // electronics
  "Package",
  "Voltage",
  "Frequency",
  "Inductance",
  "Impedance",
  "Current",
  "Capacitance",
  "Resistance",
  "Power",
  "Mounting",
  "Tolerance",
  "Temperature",
  // shared/secondary
  "Hardness",
  "Threading",
  "Drive Type",
  "Finish",
];
const SPEC_MIN_COVERAGE = 0.8;
const SPEC_MAX_DISTINCT = 30;

/** Numeric-aware ordering so "5V" sorts before "10V" and "25V". */
function specValueCompare(a: string, b: string): number {
  const na = parseFloat((a.match(/-?\d+(\.\d+)?/) ?? [""])[0]);
  const nb = parseFloat((b.match(/-?\d+(\.\d+)?/) ?? [""])[0]);
  const aNum = !Number.isNaN(na);
  const bNum = !Number.isNaN(nb);
  if (aNum && bNum && na !== nb) return na - nb;
  if (aNum !== bNum) return aNum ? -1 : 1;
  return a.localeCompare(b);
}

/** Pick up to `max` filterable spec keys for a set of products. */
export function getSpecFacets(products: Product[], max = 2): SpecFacet[] {
  const n = products.length;
  if (n === 0) return [];
  const byKey = new Map<string, Map<string, number>>();
  for (const p of products) {
    for (const [k, v] of Object.entries(p.specs ?? {})) {
      const m = byKey.get(k) ?? new Map<string, number>();
      m.set(v, (m.get(v) ?? 0) + 1);
      byKey.set(k, m);
    }
  }
  const facets: SpecFacet[] = [];
  for (const key of SPEC_PRIORITY) {
    if (facets.length >= max) break;
    const m = byKey.get(key);
    if (!m) continue;
    const coverage = [...m.values()].reduce((a, b) => a + b, 0) / n;
    if (coverage < SPEC_MIN_COVERAGE) continue;
    if (m.size < 2 || m.size > SPEC_MAX_DISTINCT) continue;
    facets.push({
      key,
      values: [...m.entries()]
        .sort((x, y) => specValueCompare(x[0], y[0]))
        .map(([value, count]) => ({ value, count })),
    });
  }
  return facets;
}

export async function getCategorySummaries(
  section?: CatalogSection
): Promise<CategorySummary[]> {
  const products = await fetchProducts(section);

  type Bucket = {
    section: CatalogSection;
    name: string;
    count: number;
    brands: Map<string, number>;
    brandForms: Map<string, Map<string, number>>;
    partNumbers: string[];
    materials: Map<string, number>;
    sizes: Set<string>;
  };
  const map = new Map<string, Bucket>();
  for (const p of products) {
    const key = `${p.section}:${p.category}`;
    let bucket = map.get(key);
    if (!bucket) {
      bucket = {
        section: p.section,
        name: p.category,
        count: 0,
        brands: new Map(),
        brandForms: new Map(),
        partNumbers: [],
        materials: new Map(),
        sizes: new Set(),
      };
      map.set(key, bucket);
    }
    bucket.count += 1;
    if (p.manufacturer) {
      for (const brand of splitBrands(p.manufacturer)) {
        // merge case variants ("YAGEO"/"Yageo") under one key
        const key = brand.toLowerCase();
        bucket.brands.set(key, (bucket.brands.get(key) ?? 0) + 1);
        const forms = bucket.brandForms.get(key) ?? new Map<string, number>();
        forms.set(brand, (forms.get(brand) ?? 0) + 1);
        bucket.brandForms.set(key, forms);
      }
    }
    if (p.section === "hardware") {
      const specs = p.specs ?? {};
      if (specs["Material"]) {
        bucket.materials.set(
          specs["Material"],
          (bucket.materials.get(specs["Material"]) ?? 0) + 1
        );
      }
      const sizeKey = primarySizeKey(hardwareFamily(p.category));
      if (sizeKey && specs[sizeKey]) bucket.sizes.add(specs[sizeKey]);
    }
    if (bucket.partNumbers.length < 2) bucket.partNumbers.push(p.part_number);
  }

  return [...map.values()].map((b) => {
    const topBrands = [...b.brands.entries()]
      .sort((x, y) => y[1] - x[1])
      .map(([key]) => {
        // display the most common written form of this brand
        const forms = [...(b.brandForms.get(key) ?? new Map())];
        forms.sort((x, y) => y[1] - x[1]);
        return forms[0]?.[0] ?? key;
      });
    let subtitle: string;
    if (topBrands.length > 0) {
      subtitle = topBrands.slice(0, 3).join(" · ");
      const more = topBrands.length - 3;
      if (more > 0) {
        subtitle += ` +${more} more brand${more === 1 ? "" : "s"}`;
      }
    } else if (b.section === "hardware" && (b.materials.size || b.sizes.size)) {
      // generic hardware: materials + size range make the best subtitle
      const mats = [...b.materials.entries()]
        .sort((x, y) => y[1] - x[1])
        .map(([m]) => m);
      const sizes = [...b.sizes].sort(sizeCompare);
      const parts: string[] = [];
      if (mats.length) parts.push(mats.slice(0, 2).join(", "));
      if (sizes.length > 1) parts.push(`${sizes[0]} – ${sizes[sizes.length - 1]}`);
      else if (sizes.length === 1) parts.push(sizes[0]);
      subtitle = parts.join(" · ");
    } else {
      // no manufacturer data in this category — fall back to part numbers
      subtitle = b.partNumbers.join(" · ");
    }
    return {
      section: b.section,
      name: b.name,
      slug: slugifyCategory(b.name),
      count: b.count,
      subtitle,
    };
  }).sort((a, b) => {
    if (a.section !== b.section) return a.section === "components" ? -1 : 1;
    if (a.section === "hardware") {
      const ra = hardwareFamilyRank(hardwareFamily(a.name));
      const rb = hardwareFamilyRank(hardwareFamily(b.name));
      if (ra !== rb) return ra - rb;
      return b.count - a.count;
    }
    return a.name.localeCompare(b.name);
  });
}

/** A single category (by URL slug) within a section, or null if unknown. */
export async function getCategoryBySlug(
  section: CatalogSection,
  slug: string
): Promise<CatalogCategory | null> {
  const categories = await getCatalog(section);
  return categories.find((c) => c.slug === slug) ?? null;
}
