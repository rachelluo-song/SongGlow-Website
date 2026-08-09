import type { Metadata } from "next";
import CatalogSection from "@/components/catalog-section";

export const metadata: Metadata = {
  title: "Electronic Components Sourcing & RFQ - SongGlow",
  description:
    "Search electronic component part numbers, specifications and datasheets. Request an RFQ from SongGlow for OEM and EMS sourcing, alternates and order-level traceability.",
  alternates: { canonical: "/components" },
};

// Always render fresh so new rows added in Supabase appear immediately
export const dynamic = "force-dynamic";

export default async function ComponentsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <CatalogSection
      section="components"
      title="Electronic Components"
      intro="Semiconductors, passives, connectors and more - sourced through qualified channels, 100% authentic, with available order-level traceability confirmed per order."
      query={typeof q === "string" ? q : undefined}
    />
  );
}
