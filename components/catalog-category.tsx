import Link from "next/link";
import Animate from "@/components/animate";
import ProductTable from "@/components/product-table";
import { getCategoryBySlug, type CatalogSection as Section } from "@/lib/catalog";

const PER_PAGE = 100;

type Props = {
  section: Section;
  sectionTitle: string;
  slug: string;
  page?: number;
};

export default async function CatalogCategory({
  section,
  sectionTitle,
  slug,
  page = 1,
}: Props) {
  const basePath = section === "components" ? "/components" : "/hardware";
  const category = await getCategoryBySlug(section, slug);

  const total = category?.products.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * PER_PAGE;
  const visible = category?.products.slice(start, start + PER_PAGE) ?? [];
  const pageUrl = (p: number) => `${basePath}/${slug}${p > 1 ? `?page=${p}` : ""}`;

  return (
    <Animate>
      <header className="page-hero">
        <div className="wrap">
          <div className="breadcrumb" data-hero-item>
            <Link href={basePath}>{sectionTitle}</Link>
            <span aria-hidden> / </span>
            {category?.name ?? "Category"}
          </div>
          <h1 data-hero-item>{category?.name ?? "Category not found"}</h1>
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
          {category ? (
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
