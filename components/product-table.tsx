import Link from "next/link";
import {
  orderedSpecs,
  slugifyCategory,
  slugifyPart,
  type Product,
} from "@/lib/catalog";
import { canDrawProduct } from "@/lib/drawings";

function DatasheetIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 3H14L19 8V21H6V3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M14 3V8H19" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function DrawingIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" stroke="currentColor" strokeWidth="2" />
      <path
        d="M3 15L8 10L12 14L16 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M17 19V16M14 19V17.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function ProductTable({ products }: { products: Product[] }) {
  // Hardware is largely generic — no Manufacturer column; a maker, when
  // present (branded hardware), shows as a line under the part name instead.
  const isHardware = products[0]?.section === "hardware";
  return (
    <div className="catalog-scroll">
      <table className="catalog-table">
        <thead>
          <tr>
            <th>Part number</th>
            <th>Name</th>
            {!isHardware && <th>Manufacturer</th>}
            <th>Key specs</th>
            <th>Docs</th>
            <th aria-label="Actions"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="catalog-pn">
                <Link
                  href={`/${p.section}/${slugifyCategory(
                    p.category
                  )}/${slugifyPart(p.part_number)}`}
                >
                  {p.part_number}
                </Link>
              </td>
              <td className="catalog-name">
                {p.name}
                {isHardware && p.manufacturer ? (
                  <span className="catalog-brand-line">{p.manufacturer}</span>
                ) : null}
                {p.description ? (
                  <span className="catalog-desc">{p.description}</span>
                ) : null}
              </td>
              {!isHardware && <td>{p.manufacturer ?? "—"}</td>}
              <td className="catalog-specs">
                {orderedSpecs(p.specs).length > 0
                  ? orderedSpecs(p.specs).map(([k, v]) => (
                      <div key={k} className="spec-line">
                        <span className="spec-k">{k}</span> {v}
                      </div>
                    ))
                  : "—"}
              </td>
              <td className="catalog-docs">
                {p.datasheet_url ? (
                  <a
                    href={p.datasheet_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doc-link"
                  >
                    <DatasheetIcon /> Datasheet
                  </a>
                ) : null}
                {canDrawProduct(p) ? (
                  <Link href={`/drawing/${p.id}`} className="doc-link">
                    <DrawingIcon /> Drawing
                  </Link>
                ) : null}
                <a
                  href={`/api/spec-sheet/${p.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="doc-link"
                >
                  <DatasheetIcon /> Spec Sheet
                </a>
              </td>
              <td>
                <Link
                  href={`/contact?part=${encodeURIComponent(p.part_number)}`}
                  className="btn btn-navy catalog-quote"
                >
                  Request quote
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
