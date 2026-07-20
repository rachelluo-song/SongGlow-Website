import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import ProductTable from "@/components/product-table";
import { searchCatalog, SEARCH_LIMIT } from "@/lib/catalog";

export const dynamic = "force-dynamic";

// Internal search results shouldn't be indexed; links are still followable.
export const metadata: Metadata = {
  title: "Search the Catalog - SongGlow",
  description:
    "Search SongGlow's electronic components and hardware catalog by part number, name, or manufacturer.",
  robots: { index: false, follow: true },
};

const SECTION_LABEL = {
  components: "Electronic Components",
  hardware: "Hardware & Mechanical",
} as const;

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const query = typeof sp.q === "string" ? sp.q.trim() : "";
  const results = query ? await searchCatalog(query) : [];
  const total = results.reduce((n, c) => n + c.products.length, 0);

  return (
    <Animate>
      <header className="page-hero">
        <div className="wrap">
          <div className="eyebrow" data-hero-item>
            Catalog
          </div>
          <h1 data-hero-item>Search the catalog</h1>
          <p data-hero-item>
            Part numbers, names, and manufacturers across electronic components
            and hardware.
          </p>

          <form
            method="get"
            action="/search"
            className="catalog-search"
            data-hero-item
          >
            <span className="catalog-search-label">
              Know the part number? Jump straight to it:
            </span>
            <div className="catalog-search-row">
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder="Part number, name, or manufacturer…"
                aria-label="Search the catalog"
              />
              <button type="submit" className="btn btn-ghost">
                Search
              </button>
            </div>
          </form>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          {query ? (
            results.length > 0 ? (
              <>
                <p className="catalog-results-note" data-reveal>
                  {total} match{total === 1 ? "" : "es"} for &ldquo;{query}
                  &rdquo;
                  {total >= SEARCH_LIMIT
                    ? ` · Showing the first ${SEARCH_LIMIT}. Refine your search to narrow down.`
                    : null}
                </p>
                {results.map((cat) => (
                  <div
                    key={`${cat.section}-${cat.slug}`}
                    className="catalog-category"
                    data-reveal
                  >
                    <h2>
                      <Link href={`/${cat.section}/${cat.slug}`}>
                        {cat.name}
                      </Link>{" "}
                      <span className="spec-filter-label">
                        {SECTION_LABEL[cat.section]}
                      </span>
                    </h2>
                    <div className="card catalog-card">
                      <ProductTable products={cat.products} />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="catalog-cta" data-reveal>
                <h2>No matches for &ldquo;{query}&rdquo;</h2>
                <p>
                  Not listed doesn&apos;t mean not available - most of what we
                  source never appears on a public list. Send us the part
                  number and we&apos;ll quote it within 24 hours.
                </p>
                <Link
                  href={`/contact?part=${encodeURIComponent(query)}`}
                  className="btn btn-navy btn-lg"
                >
                  Request this part
                </Link>
              </div>
            )
          ) : (
            <div className="catalog-cta" data-reveal>
              <h2>Looking for something specific?</h2>
              <p>
                Type a part number above, or browse the catalog by section.
              </p>
              <div className="catalog-cta-row">
                <Link href="/components" className="btn btn-ghost btn-lg">
                  Electronic components
                </Link>
                <Link href="/hardware" className="btn btn-ghost btn-lg">
                  Hardware
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </Animate>
  );
}
