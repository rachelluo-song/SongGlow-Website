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

export default function ProductTable({ products }: { products: Product[] }) {
  return (
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
          {products.map((p) => (
            <tr key={p.id}>
              <td className="catalog-pn">{p.part_number}</td>
              <td>
                {p.name}
                {p.description ? (
                  <span className="catalog-desc">{p.description}</span>
                ) : null}
              </td>
              <td>{p.manufacturer ?? "—"}</td>
              <td className="catalog-specs">
                {orderedSpecs(p.specs).length > 0
                  ? orderedSpecs(p.specs).map(([k, v]) => (
                      <div key={k} className="spec-line">
                        <span className="spec-k">{k}</span> {v}
                      </div>
                    ))
                  : "—"}
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
                {canDrawProduct(p) ? (
                  <a
                    href={`/api/drawing/${p.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="catalog-datasheet"
                  >
                    Drawing ⤓
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
  );
}
