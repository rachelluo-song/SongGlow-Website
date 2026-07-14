import Link from "next/link";
import Animate from "@/components/animate";
import { getCatalog, type CatalogSection as Section } from "@/lib/catalog";

type Props = {
  section: Section;
  title: string;
  intro: string;
  query?: string;
};

function specsLine(specs: Record<string, string>) {
  const entries = Object.entries(specs ?? {});
  if (entries.length === 0) return null;
  return entries.map(([k, v]) => `${k}: ${v}`).join(" · ");
}

export default async function CatalogSection({
  section,
  title,
  intro,
  query,
}: Props) {
  const categories = await getCatalog(section, query);
  const basePath = section === "components" ? "/components" : "/hardware";
  const hasResults = categories.length > 0;

  return (
    <Animate>
      <header className="page-hero">
        <div className="wrap">
          <div className="eyebrow" data-hero-item>
            Catalog
          </div>
          <h1 data-hero-item>{title}</h1>
          <p data-hero-item>{intro}</p>

          <form
            method="get"
            action={basePath}
            className="catalog-search"
            data-hero-item
          >
            <input
              type="search"
              name="q"
              defaultValue={query ?? ""}
              placeholder="Search part number, name, manufacturer…"
              aria-label={`Search ${title}`}
            />
            <button type="submit" className="btn btn-clay">
              Search
            </button>
            {query ? (
              <Link href={basePath} className="catalog-clear">
                Clear
              </Link>
            ) : null}
          </form>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          {hasResults ? (
            categories.map((cat) => (
              <div key={cat.name} className="catalog-category" data-reveal>
                <h2>{cat.name}</h2>
                <div className="card catalog-card">
                  <div className="catalog-scroll">
                    <table className="catalog-table">
                      <thead>
                        <tr>
                          <th>Part number</th>
                          <th>Name</th>
                          <th>Manufacturer</th>
                          <th>Key specs</th>
                          <th aria-label="Actions"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cat.products.map((p) => (
                          <tr key={p.id}>
                            <td className="catalog-pn">{p.part_number}</td>
                            <td>
                              {p.name}
                              {p.description ? (
                                <span className="catalog-desc">
                                  {p.description}
                                </span>
                              ) : null}
                            </td>
                            <td>{p.manufacturer ?? "—"}</td>
                            <td className="catalog-specs">
                              {specsLine(p.specs) ?? "—"}
                              {p.datasheet_url ? (
                                <a
                                  href={p.datasheet_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="catalog-datasheet"
                                >
                                  Datasheet ↗
                                </a>
                              ) : null}
                            </td>
                            <td>
                              <Link
                                href={`/contact?part=${encodeURIComponent(p.part_number)}`}
                                className="btn btn-clay catalog-quote"
                              >
                                Request quote
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card catalog-empty" data-reveal>
              <h2>
                {query
                  ? `No matches for “${query}”`
                  : "This catalog is being stocked"}
              </h2>
              <p>
                {query
                  ? "We may still be able to source it — most of what we place never appears on a public list."
                  : "We're adding parts section by section. In the meantime, we source far more than we list."}{" "}
                Send us the part number or your whole BOM and we'll quote it
                within 24 hours.
              </p>
              <Link href="/contact" className="btn btn-clay btn-lg">
                Request a quote
              </Link>
            </div>
          )}
        </div>
      </section>
    </Animate>
  );
}
