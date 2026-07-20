import type { Metadata } from "next";
import CatalogSection from "@/components/catalog-section";

export const metadata: Metadata = {
  title: "Electronic Components - SongGlow",
  description:
    "Browse SongGlow's electronic component catalog: semiconductors, passives, and more. Every part 100% authentic with full traceability.",
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
      intro="Semiconductors, passives, connectors and more - every part sourced through qualified suppliers, 100% authentic, fully traceable."
      query={typeof q === "string" ? q : undefined}
    />
  );
}
