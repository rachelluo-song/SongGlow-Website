import Link from "next/link";
import type { Product } from "@/lib/catalog";
import { canDrawProduct } from "@/lib/drawings";

// Most decision-relevant specs first; anything unlisted follows alphabetically.
// (The database stores spec keys sorted by length, which is meaningless.)
const SPEC_DISPLAY_ORDER = [
  "Thread Size",
  "For Screw Size",
  "Length",
  "ID",
  "OD",
  "Cross Section",
  "Thickness",
  "Head Type",
  "Head Diameter",
  "Head Height",
  "Drive Type",
  "Threading",
  "Thread Style",
  "Package",
  "Capacitance",
  "Resistance",
  "Inductance",
  "Impedance",
  "Frequency",
  "Voltage",
  "Current",
  "Power",
  "Load Capacitance",
  "Tolerance",
  "Material",
  "Finish",
  "Hardness",
  "Color",
  "Grade/Class",
  "Tensile Strength",
  "Temperature",
  "Temp Range",
];

function orderedSpecs(specs: Record<string, string>): [string, string][] {
  const rank = (k: string) => {
    const i = SPEC_DISPLAY_ORDER.indexOf(k);
    return i === -1 ? SPEC_DISPLAY_ORDER.length : i;
  };
  return Object.entries(specs ?? {}).sort(
    (a, b) => rank(a[0]) - rank(b[0]) || a[0].localeCompare(b[0])
  );
}

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
              <td className="catalog-pn">{p.part_number}</td>
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
                  <a
                    href={`/api/drawing/${p.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doc-link"
                  >
                    <DrawingIcon /> Drawing
                  </a>
                ) : null}
                {!p.datasheet_url && !canDrawProduct(p) ? "—" : null}
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
  );
}
