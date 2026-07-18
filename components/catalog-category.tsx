import Link from "next/link";
import Animate from "@/components/animate";
import ProductTable from "@/components/product-table";
import {
  getBrandFacets,
  getCategoryBySlug,
  getSpecFacets,
  productHasBrand,
  type CatalogSection as Section,
} from "@/lib/catalog";

const PER_PAGE = 100;

type Props = {
  section: Section;
  sectionTitle: string;
  slug: string;
  page?: number;
  brand?: string;
  /** Raw query params — spec filters are picked out of these by facet key */
  params?: Record<string, string | string[] | undefined>;
};

export default async function CatalogCategory({
  section,
  sectionTitle,
  slug,
  page = 1,
  brand,
  params = {},
}: Props) {
  const basePath = section === "components" ? "/components" : "/hardware";
  const category = await getCategoryBySlug(section, slug);

  const baseProducts = category?.products ?? [];
  const brandFacets = category ? getBrandFacets(baseProducts) : [];
  const activeBrand = brandFacets.find((f) => f.key === brand?.toLowerCase());
  const brandFiltered = activeBrand
    ? baseProducts.filter((p) => productHasBrand(p, activeBrand.key))
    : baseProducts;

  // Spec filter rows are chosen from the brand-filtered set; active selections
  // come from query params that match a facet key and a real value.
  const specFacets = getSpecFacets(brandFiltered);
  const activeSpecs: Record<string, string> = {};
  for (const facet of specFacets) {
    const v = params[facet.key];
    if (typeof v === "string" && facet.values.some((x) => x.value === v)) {
      activeSpecs[facet.key] = v;
    }
  }

  const matchesSpecs = (
    p: (typeof baseProducts)[number],
    except?: string
  ): boolean =>
    Object.entries(activeSpecs).every(
      ([k, v]) => k === except || (p.specs ?? {})[k] === v
    );

  const products = brandFiltered.filter((p) => matchesSpecs(p));

  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * PER_PAGE;
  const visible = products.slice(start, start + PER_PAGE);

  const urlWith = (over: {
    brand?: string | null;
    page?: number;
    spec?: [string, string | null];
  }): string => {
    const sp = new URLSearchParams();
    const b = over.brand === undefined ? activeBrand?.key : over.brand;
    if (b) sp.set("brand", b);
    const specs = { ...activeSpecs };
    if (over.spec) {
      const [k, v] = over.spec;
      if (v === null) delete specs[k];
      else specs[k] = v;
    }
    for (const [k, v] of Object.entries(specs)) sp.set(k, v);
    if (over.page && over.page > 1) sp.set("page", String(over.page));
    const qs = sp.toString();
    return `${basePath}/${slug}${qs ? `?${qs}` : ""}`;
  };

  return (
    <Animate>
      <header className="page-hero">
        <div className="wrap">
          <div className="breadcrumb" data-hero-item>
            <Link href={basePath}>{sectionTitle}</Link>
            <span aria-hidden> / </span>
            {category?.name ?? "Category"}
            {activeBrand ? (
              <>
                <span aria-hidden> / </span>
                {activeBrand.label}
              </>
            ) : null}
          </div>
          <h1 data-hero-item>
            {category
              ? activeBrand
                ? `${activeBrand.label} ${category.name}`
                : category.name
              : "Category not found"}
          </h1>
          <p data-hero-item>
            {category
              ? `${total} part${
                  total === 1 ? "" : "s"
                } listed - every one sourced through qualified suppliers, 100% authentic, fully traceable.`
              : "This category doesn't exist (or was renamed)."}
          </p>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          {category && brandFacets.length > 1 && (
            <nav className="brand-filters" aria-label="Filter by brand" data-reveal>
              <span className="spec-filter-label">Brand</span>
              <Link
                href={urlWith({ brand: null, page: 0 })}
                className={`brand-chip ${activeBrand ? "" : "active"}`}
              >
                All ({baseProducts.length})
              </Link>
              {brandFacets.map((f) => (
                <Link
                  key={f.key}
                  href={urlWith({ brand: f.key, page: 0 })}
                  className={`brand-chip ${
                    activeBrand?.key === f.key ? "active" : ""
                  }`}
                >
                  {f.label} ({f.count})
                </Link>
              ))}
            </nav>
          )}

          {category &&
            specFacets.map((facet) => {
              const rowProducts = brandFiltered.filter((p) =>
                matchesSpecs(p, facet.key)
              );
              const countFor = (value: string) =>
                rowProducts.filter((p) => (p.specs ?? {})[facet.key] === value)
                  .length;
              return (
                <nav
                  key={facet.key}
                  className="brand-filters"
                  aria-label={`Filter by ${facet.key}`}
                  data-reveal
                >
                  <span className="spec-filter-label">{facet.key}</span>
                  <Link
                    href={urlWith({ spec: [facet.key, null], page: 0 })}
                    className={`brand-chip ${
                      activeSpecs[facet.key] ? "" : "active"
                    }`}
                  >
                    All
                  </Link>
                  {facet.values.map(({ value }) => {
                    const n = countFor(value);
                    if (n === 0) return null;
                    return (
                      <Link
                        key={value}
                        href={urlWith({ spec: [facet.key, value], page: 0 })}
                        className={`brand-chip ${
                          activeSpecs[facet.key] === value ? "active" : ""
                        }`}
                      >
                        {value} ({n})
                      </Link>
                    );
                  })}
                </nav>
              );
            })}

          {category ? (
            total > 0 ? (
              <>
                <div className="card catalog-card" data-reveal>
                  <ProductTable products={visible} />
                </div>
                {totalPages > 1 && (
                  <nav className="catalog-pagination" aria-label="Catalog pages">
                    {current > 1 ? (
                      <Link
                        href={urlWith({ page: current - 1 })}
                        className="btn btn-ghost"
                      >
                        ← Previous
                      </Link>
                    ) : (
                      <span />
                    )}
                    <span className="catalog-pagination-note">
                      Showing {start + 1}–{Math.min(start + PER_PAGE, total)} of{" "}
                      {total} · Page {current} of {totalPages}
                    </span>
                    {current < totalPages ? (
                      <Link
                        href={urlWith({ page: current + 1 })}
                        className="btn btn-ghost"
                      >
                        Next →
                      </Link>
                    ) : (
                      <span />
                    )}
                  </nav>
                )}
              </>
            ) : (
              <div className="card catalog-card" data-reveal style={{ padding: 32 }}>
                <p style={{ color: "var(--ink-soft)" }}>
                  No parts match those filters.{" "}
                  <Link
                    href={`${basePath}/${slug}`}
                    style={{ color: "var(--clay-dark)", fontWeight: 600 }}
                  >
                    Show all {category.name} →
                  </Link>
                </p>
              </div>
            )
          ) : null}

          <div className="catalog-cta" data-reveal>
            <h2>
              {category
                ? "Don't see the exact part?"
                : "Looking for something specific?"}
            </h2>
            <p>
              We source far more than we list - send us a part number or your
              whole BOM and we&apos;ll quote it within 24 hours.
            </p>
            <div className="catalog-cta-row">
              <Link href="/contact" className="btn btn-clay btn-lg">
                Request a quote
              </Link>
              <Link href={basePath} className="btn btn-ghost btn-lg">
                All {sectionTitle.toLowerCase()}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Animate>
  );
}
