import Link from "next/link";
import type { Product } from "@/lib/catalog";

function specsLine(specs: Record<string, string>) {
  const entries = Object.entries(specs ?? {});
  if (entries.length === 0) return null;
  return entries.map(([k, v]) => `${k}: ${v}`).join(" · ");
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
  );
}
