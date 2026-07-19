import Link from "next/link";
import Animate from "@/components/animate";
import CategoryCard from "@/components/category-card";
import {
  hardwareSubfamily,
  subfamilyRank,
  type CategorySummary,
} from "@/lib/catalog";

type Props = {
  family: string;
  lines: CategorySummary[];
};

/**
 * One hardware family (Screws, Washers, …). Families with defined
 * subcategories (e.g. Screws → Machine / Socket Head / Sheet Metal) render
 * grouped sections; others render a flat grid of product lines.
 */
export default function CatalogFamily({ family, lines }: Props) {
  const total = lines.reduce((n, l) => n + l.count, 0);

  const groups = new Map<string, CategorySummary[]>();
  let grouped = false;
  for (const line of lines) {
    const sub = hardwareSubfamily(family, line.name);
    if (sub) grouped = true;
    const key = sub ?? "";
    const list = groups.get(key) ?? [];
    list.push(line);
    groups.set(key, list);
  }
  const orderedGroups = [...groups.entries()].sort(
    (a, b) => subfamilyRank(a[0]) - subfamilyRank(b[0])
  );

  return (
    <Animate>
      <header className="page-hero">
        <div className="wrap">
          <div className="breadcrumb" data-hero-item>
            <Link href="/hardware">Hardware &amp; Mechanical</Link>
            <span aria-hidden> / </span>
            {family}
          </div>
          <h1 data-hero-item>{family}</h1>
          <p data-hero-item>
            {total} part{total === 1 ? "" : "s"} across {lines.length} product
            line{lines.length === 1 ? "" : "s"} - branded and standard options,
            every one spec-verified with a downloadable dimension drawing.
          </p>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          {grouped ? (
            orderedGroups.map(([sub, subLines]) => (
              <div key={sub || "other"} className="family-group" data-reveal>
                <h2 className="family-group-title">
                  {sub || `Other ${family}`}
                  <span className="family-group-count">
                    {subLines.reduce((n, l) => n + l.count, 0)} parts ·{" "}
                    {subLines.length} line{subLines.length === 1 ? "" : "s"}
                  </span>
                </h2>
                <div className="cat-grid">
                  {subLines.map((cat) => (
                    <CategoryCard
                      key={cat.slug}
                      cat={cat}
                      basePath="/hardware"
                      stripPrefix={`${family} - `}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="cat-grid" data-reveal-group>
              {lines.map((cat) => (
                <CategoryCard
                  key={cat.slug}
                  cat={cat}
                  basePath="/hardware"
                  stripPrefix={`${family} - `}
                />
              ))}
            </div>
          )}

          <div className="catalog-cta" data-reveal>
            <h2>Don&apos;t see the exact line?</h2>
            <p>
              We source far more than we list - send us a part number, a
              standard (DIN/ISO/GB), or your whole BOM and we&apos;ll quote it
              within 24 hours.
            </p>
            <div className="catalog-cta-row">
              <Link href="/contact" className="btn btn-clay btn-lg">
                Request a quote
              </Link>
              <Link href="/hardware" className="btn btn-ghost btn-lg">
                All hardware
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Animate>
  );
}
