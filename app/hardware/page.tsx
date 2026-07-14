import type { Metadata } from "next";
import CatalogSection from "@/components/catalog-section";

export const metadata: Metadata = {
  title: "Hardware — SongGlow",
  description:
    "Browse SongGlow's hardware catalog — fasteners, enclosures, thermal and mechanical parts to complete your BOM alongside the electronics.",
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
      title="Hardware & Mechanical"
      intro="Fasteners, standoffs, enclosures, thermal parts - the mechanical line items that complete your BOM, sourced alongside the electronics."
      query={typeof q === "string" ? q : undefined}
    />
  );
}
