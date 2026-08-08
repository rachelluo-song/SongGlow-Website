import type { Metadata } from "next";
import CatalogSection from "@/components/catalog-section";

export const metadata: Metadata = {
  title: "Electronic Components - SongGlow",
  description:
    "Browse SongGlow's electronic component catalog: semiconductors, passives, and more. 100% authentic parts with order-level traceability confirmed per order.",
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
