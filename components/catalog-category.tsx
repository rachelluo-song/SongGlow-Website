import Link from "next/link";
import Animate from "@/components/animate";
import ProductTable from "@/components/product-table";
import {
  getBrandFacets,
  getCategoryBySlug,
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
};

export default async function CatalogCategory({
  section,
  sectionTitle,
  slug,
  page = 1,
  brand,
}: Props) {
  const basePath = section === "components" ? "/components" : "/hardware";
  const category = await getCategoryBySlug(section, slug);

  const facets = category ? getBrandFacets(category.products) : [];
  const activeBrand = brand?.toLowerCase();
  const activeFacet = facets.find((f) => f.key === activeBrand);
  const products = category
    ? activeFacet
      ? category.products.filter((p) => productHasBrand(p, activeFacet.key))
      : category.products
    : [];

  const total = products.length;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * PER_PAGE;
  const visible = products.slice(start, start + PER_PAGE);

  const pageUrl = (p: number) => {
    const params = new URLSearchParams();
    if (activeFacet) params.set("brand", activeFacet.key);
    if (p > 1) params.set("page", String(p));
    const qs = params.toString();
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
            {activeFacet ? (
              <>
                <span aria-hidden> / </span>
                {activeFacet.label}
              </>
            ) : null}
          </div>
          <h1 data-hero-item>
            {category
              ? activeFacet
                ? `${activeFacet.label} ${category.name}`
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
          {category && facets.length > 1 && (
            <nav className="brand-filters" aria-label="Filter by brand" data-reveal>
              <Link
                href={`${basePath}/${slug}`}
                className={`brand-chip ${activeFacet ? "" : "active"}`}
              >
                All ({category.products.length})
              </Link>
              {facets.map((f) => (
                <Link
                  key={f.key}
                  href={`${basePath}/${slug}?brand=${encodeURIComponent(f.key)}`}
                  className={`brand-chip ${
                    activeFacet?.key === f.key ? "active" : ""
                  }`}
                >
                  {f.label} ({f.count})
                </Link>
              ))}
            </nav>
          )}

          {category ? (
            total > 0 ? (
              <>
                <div className="card catalog-card" data-reveal>
                  <ProductTable products={visible} />
                </div>
                {totalPages > 1 && (
                  <nav className="catalog-pagination" aria-label="Catalog pages">
                    {current > 1 ? (
                      <Link href={pageUrl(current - 1)} className="btn btn-ghost">
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
                      <Link href={pageUrl(current + 1)} className="btn btn-ghost">
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
                  No parts match that brand filter.{" "}
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
