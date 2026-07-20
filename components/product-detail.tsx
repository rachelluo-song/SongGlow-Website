import Link from "next/link";
import Animate from "@/components/animate";
import JsonLd from "@/components/json-ld";
import {
  getProductBySlug,
  orderedSpecs,
  slugifyPart,
  type CatalogSection as Section,
} from "@/lib/catalog";
import { canDrawProduct } from "@/lib/drawings";
import { SITE_URL } from "@/lib/site";

type Props = {
  section: Section;
  sectionTitle: string;
  categorySlug: string;
  partSlug: string;
};

const RELATED_LIMIT = 12;

export default async function ProductDetail({
  section,
  sectionTitle,
  categorySlug,
  partSlug,
}: Props) {
  const basePath = section === "components" ? "/components" : "/hardware";
  const hit = await getProductBySlug(section, categorySlug, partSlug);

  if (!hit) {
    return (
      <Animate>
        <header className="page-hero">
          <div className="wrap wrap-wide">
            <div className="breadcrumb" data-hero-item>
              <Link href={basePath}>{sectionTitle}</Link>
              <span aria-hidden> / </span>
              Part
            </div>
            <h1 data-hero-item>Part not found</h1>
            <p data-hero-item>
              This part isn&apos;t listed (or its number changed), but we can
              almost certainly still source it.
            </p>
          </div>
        </header>
        <section className="block tight">
          <div className="wrap wrap-wide">
            <div className="catalog-cta" data-reveal>
              <h2>Send us the part number anyway</h2>
              <p>
                We source far more than we list. We&apos;ll quote it within 24
                hours.
              </p>
              <div className="catalog-cta-row">
                <Link href="/contact" className="btn btn-navy btn-lg">
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

  const { category, product } = hit;
  const drawable = canDrawProduct(product);
  const specs = orderedSpecs(product.specs);
  const pageUrl = `${SITE_URL}${basePath}/${categorySlug}/${partSlug}`;
  const related = category.products
    .filter((p) => p.id !== product.id)
    .slice(0, RELATED_LIMIT);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.part_number,
    mpn: product.part_number,
    url: pageUrl,
    category: category.name,
    ...(product.description ? { description: product.description } : {}),
    ...(product.manufacturer
      ? { brand: { "@type": "Brand", name: product.manufacturer } }
      : {}),
    ...(drawable ? { image: `${SITE_URL}/api/drawing/${product.id}` } : {}),
    additionalProperty: specs.map(([name, value]) => ({
      "@type": "PropertyValue",
      name,
      value,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: sectionTitle,
        item: `${SITE_URL}${basePath}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category.name,
        item: `${SITE_URL}${basePath}/${categorySlug}`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: product.part_number,
        item: pageUrl,
      },
    ],
  };

  return (
    <Animate>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      <header className="page-hero">
        <div className="wrap wrap-wide">
          <div className="breadcrumb" data-hero-item>
            <Link href={basePath}>{sectionTitle}</Link>
            <span aria-hidden> / </span>
            <Link href={`${basePath}/${categorySlug}`}>{category.name}</Link>
            <span aria-hidden> / </span>
            {product.part_number}
          </div>
          <h1 data-hero-item>{product.part_number}</h1>
          <p data-hero-item>
            {product.name}
            {product.manufacturer ? ` · ${product.manufacturer}` : ""}
          </p>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap wrap-wide">
          <div className="drawing-actions" data-reveal>
            <Link
              href={`/contact?part=${encodeURIComponent(product.part_number)}`}
              className="btn btn-navy"
            >
              Request quote
            </Link>
            <a
              className="btn btn-ghost"
              href={`/api/spec-sheet/${product.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Spec Sheet (PDF)
            </a>
            {drawable ? (
              <Link href={`/drawing/${product.id}`} className="btn btn-ghost">
                Dimension drawing
              </Link>
            ) : null}
            {product.datasheet_url ? (
              <a
                className="btn btn-ghost"
                href={product.datasheet_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Datasheet
              </a>
            ) : null}
          </div>

          {drawable ? (
            <div className="card drawing-frame" data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/drawing/${product.id}`}
                alt={`Dimension drawing of ${product.part_number}`}
              />
            </div>
          ) : null}

          {product.description ? (
            <p className="catalog-results-note" data-reveal>
              {product.description}
            </p>
          ) : null}

          {specs.length > 0 ? (
            <div className="card catalog-card" data-reveal>
              <div className="catalog-scroll">
                <table className="catalog-table">
                  <thead>
                    <tr>
                      <th>Specification</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="catalog-pn">Part number</td>
                      <td>{product.part_number}</td>
                    </tr>
                    {product.manufacturer ? (
                      <tr>
                        <td className="catalog-pn">Manufacturer</td>
                        <td>{product.manufacturer}</td>
                      </tr>
                    ) : null}
                    {specs.map(([k, v]) => (
                      <tr key={k}>
                        <td className="catalog-pn">{k}</td>
                        <td>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {related.length > 0 ? (
            <nav
              className="brand-filters"
              aria-label={`More ${category.name}`}
              data-reveal
            >
              <span className="spec-filter-label">Related</span>
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`${basePath}/${categorySlug}/${slugifyPart(
                    p.part_number
                  )}`}
                  className="brand-chip"
                >
                  {p.part_number}
                </Link>
              ))}
              <Link href={`${basePath}/${categorySlug}`} className="brand-chip">
                All {category.name} →
              </Link>
            </nav>
          ) : null}

          <div className="catalog-cta" data-reveal>
            <h2>Need {product.part_number} in production quantities?</h2>
            <p>
              Send us your target quantity and date. We&apos;ll quote it within
              24 hours, 100% authentic with full traceability.
            </p>
            <div className="catalog-cta-row">
              <Link
                href={`/contact?part=${encodeURIComponent(
                  product.part_number
                )}`}
                className="btn btn-navy btn-lg"
              >
                Request a quote
              </Link>
              <Link
                href={`${basePath}/${categorySlug}`}
                className="btn btn-ghost btn-lg"
              >
                All {category.name}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Animate>
  );
}
