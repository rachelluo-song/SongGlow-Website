import Link from "next/link";
import Animate from "@/components/animate";
import CategoryCard from "@/components/category-card";
import ProductTable from "@/components/product-table";
import {
  getCatalog,
  getCategorySummaries,
  getHardwareTree,
  SEARCH_LIMIT,
  type CatalogSection as Section,
} from "@/lib/catalog";

type Props = {
  section: Section;
  title: string;
  intro: string;
  query?: string;
};

function SourcingCta() {
  return (
    <div className="catalog-cta" data-reveal>
      <h2>We source far more than we list</h2>
      <p>
        The catalog shows a curated selection - most of what we place for
        customers never appears on a public list. Send us a part number or your
        whole BOM and we&apos;ll quote it within 24 hours.
      </p>
      <Link href="/contact" className="btn btn-navy btn-lg">
        Request a quote
      </Link>
    </div>
  );
}

export default async function CatalogSection({
  section,
  title,
  intro,
  query,
}: Props) {
  const basePath = section === "components" ? "/components" : "/hardware";

  // With a search term: results view. Without: the directory — major family
  // cards for hardware, category cards for components.
  const results = query ? await getCatalog(section, query) : null;
  const families =
    !query && section === "hardware" ? await getHardwareTree() : null;
  const categories =
    !query && section === "components" ? await getCategorySummaries(section) : null;

  return (
    <Animate>
      <header className="page-hero">
        <div className="wrap">
          <div className="eyebrow" data-hero-item>
            Catalog
          </div>
          <h1 data-hero-item>{title}</h1>
          <p data-hero-item>{intro}</p>

          <form method="get" action={basePath} className="catalog-search" data-hero-item>
            <span className="catalog-search-label">
              Know the part number? Jump straight to it:
            </span>
            <div className="catalog-search-row">
              <input
                type="search"
                name="q"
                defaultValue={query ?? ""}
                placeholder="Part number, name, or manufacturer…"
                aria-label={`Search ${title}`}
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
          {results ? (
            <>
              <p className="catalog-results-note" data-reveal>
                <Link href={basePath}>← All {title.toLowerCase()} categories</Link>
                {results.reduce((n, c) => n + c.products.length, 0) >=
                SEARCH_LIMIT
                  ? ` · Showing the first ${SEARCH_LIMIT} matches - refine your search to narrow down.`
                  : null}
              </p>
              {results.length > 0 ? (
                results.map((cat) => (
                  <div key={cat.slug} className="catalog-category" data-reveal>
                    <h2>
                      <Link href={`${basePath}/${cat.slug}`}>{cat.name}</Link>
                    </h2>
                    <div className="card catalog-card">
                      <ProductTable products={cat.products} />
                    </div>
                  </div>
                ))
              ) : (
                <div className="catalog-cta" data-reveal>
                  <h2>No matches for &ldquo;{query}&rdquo;</h2>
                  <p>
                    Not listed doesn&apos;t mean not available - most of what we
                    source never appears on a public list. Send us the part
                    number and we&apos;ll quote it within 24 hours.
                  </p>
                  <Link
                    href={`/contact?part=${encodeURIComponent(query ?? "")}`}
                    className="btn btn-navy btn-lg"
                  >
                    Request this part
                  </Link>
                </div>
              )}
            </>
          ) : families && families.length > 0 ? (
            <>
              <div className="hw-accordion" data-reveal>
                {families.map((fam) => (
                  <details key={fam.slug} className="hw-acc">
                    <summary>
                      <span className="hw-acc-chev" aria-hidden>
                        ▸
                      </span>
                      <span className="hw-acc-head">
                        <span className="hw-acc-name">{fam.family}</span>
                        <span className="hw-acc-sub">{fam.subtitle}</span>
                      </span>
                      <span className="hw-acc-count">
                        {fam.count} parts · {fam.lines} line
                        {fam.lines === 1 ? "" : "s"}
                      </span>
                    </summary>
                    <div className="hw-acc-body">
                      {fam.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="hw-acc-item"
                        >
                          <span>{item.label}</span>
                          <span className="hw-acc-item-count">
                            {item.count} parts
                            {item.lines ? ` · ${item.lines} lines` : ""}
                          </span>
                        </Link>
                      ))}
                      <Link
                        href={`${basePath}/${fam.slug}`}
                        className="hw-acc-all"
                      >
                        View all {fam.family} →
                      </Link>
                    </div>
                  </details>
                ))}
              </div>
              <SourcingCta />
            </>
          ) : categories && categories.length > 0 ? (
            <>
              <div className="cat-grid" data-reveal-group>
                {categories.map((cat) => (
                  <CategoryCard key={cat.slug} cat={cat} basePath={basePath} />
                ))}
              </div>
              <SourcingCta />
            </>
          ) : (
            <div className="catalog-cta" data-reveal>
              <h2>This catalog is being stocked</h2>
              <p>
                We&apos;re adding parts section by section. In the meantime, we
                source far more than we list - send us the part number or your
                whole BOM and we&apos;ll quote it within 24 hours.
              </p>
              <Link href="/contact" className="btn btn-navy btn-lg">
                Request a quote
              </Link>
            </div>
          )}
        </div>
      </section>
    </Animate>
  );
}
