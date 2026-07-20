import type { Metadata } from "next";
import Link from "next/link";
import { cache } from "react";
import { createClient } from "@supabase/supabase-js";
import PngDownloadButton from "@/components/png-download-button";
import { slugifyCategory, slugifyPart, type Product } from "@/lib/catalog";
import { canDrawProduct } from "@/lib/drawings";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Dimension Drawing - SongGlow" };
  return {
    title: `${product.part_number} Dimension Drawing - SongGlow`,
    // The product page is the canonical home for this part
    alternates: {
      canonical: `/${product.section}/${slugifyCategory(
        product.category
      )}/${slugifyPart(product.part_number)}`,
    },
  };
}

const getProduct = cache(async (id: string): Promise<Product | null> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  const supabase = createClient(url, serviceKey);
  const { data } = await supabase
    .from("products")
    .select(
      "id, section, category, part_number, name, manufacturer, description, specs, datasheet_url"
    )
    .eq("id", id)
    .maybeSingle();
  return (data as Product) ?? null;
});

export default async function DrawingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  const drawable = product ? canDrawProduct(product) : false;
  const backHref = product
    ? `/${product.section}/${slugifyCategory(product.category)}`
    : "/hardware";

  return (
    <div>
      <header className="page-hero">
        <div className="wrap">
          <div className="breadcrumb">
            <Link href={backHref}>{product?.category ?? "Catalog"}</Link>
            <span aria-hidden> / </span>
            Drawing
          </div>
          <h1>{product?.part_number ?? "Part not found"}</h1>
          {product ? <p>{product.name}</p> : null}
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          {product && drawable ? (
            <>
              <div className="drawing-actions">
                <a
                  className="btn btn-clay"
                  href={`/api/drawing/${product.id}`}
                  download={`${product.part_number.replaceAll("/", "-")}.svg`}
                >
                  Download SVG
                </a>
                <PngDownloadButton
                  svgUrl={`/api/drawing/${product.id}`}
                  filename={`${product.part_number.replaceAll("/", "-")}.png`}
                />
                <a
                  className="btn btn-ghost"
                  href={`/api/spec-sheet/${product.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Spec Sheet (PDF)
                </a>
                <Link
                  href={`/contact?part=${encodeURIComponent(product.part_number)}`}
                  className="btn btn-navy"
                >
                  Request quote
                </Link>
              </div>
              <div className="card drawing-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/drawing/${product.id}`}
                  alt={`Dimension drawing of ${product.part_number}`}
                />
              </div>
            </>
          ) : (
            <div className="catalog-cta">
              <h2>No drawing available</h2>
              <p>
                {product
                  ? "This part doesn't have the dimensional specs needed for a drawing yet."
                  : "We couldn't find this part."}
              </p>
              <Link href={backHref} className="btn btn-clay btn-lg">
                Back to catalog
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
