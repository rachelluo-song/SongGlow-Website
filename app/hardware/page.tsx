import type { Metadata } from "next";
import CatalogSection from "@/components/catalog-section";

export const metadata: Metadata = {
  title: "Electronic Hardware & Mechanical Components Sourcing | SongGlow",
  description:
    "Source electronic hardware and mechanical components including fasteners, standoffs, enclosures, springs, gaskets, and thermal parts for your BOM.",
  alternates: { canonical: "/hardware" },
};

// Always render fresh so new rows added in Supabase appear immediately
export const dynamic = "force-dynamic";

export default async function HardwarePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <CatalogSection
      section="hardware"
      title="Electronic Hardware & Mechanical Components"
      intro="Source fasteners, standoffs, enclosures, springs, gaskets, and thermal parts—the mechanical line items that complete your BOM alongside the electronics."
      query={typeof q === "string" ? q : undefined}
    />
  );
}
