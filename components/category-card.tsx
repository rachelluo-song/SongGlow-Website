import Link from "next/link";
import type { CategorySummary } from "@/lib/catalog";

export default function CategoryCard({
  cat,
  basePath,
  stripPrefix,
}: {
  cat: CategorySummary;
  basePath: string;
  stripPrefix?: string;
}) {
  const title =
    stripPrefix && cat.name.startsWith(stripPrefix)
      ? cat.name.slice(stripPrefix.length)
      : cat.name;
  return (
    <Link href={`${basePath}/${cat.slug}`} className="cat-card">
      <div className="cat-count">
        {cat.count} part{cat.count === 1 ? "" : "s"}
      </div>
      <h3>{title}</h3>
      <p className="cat-sample">{cat.subtitle}</p>
      <span className="cat-arrow">Browse →</span>
    </Link>
  );
}
