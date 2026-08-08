import type { Metadata } from "next";
import HomeContent from "./home-content";
import JsonLd from "@/components/json-ld";
import { getCategorySummaries } from "@/lib/catalog";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Refresh the home page's catalog block every 5 minutes
export const revalidate = 300;

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default async function HomePage() {
  const catalogCategories = (await getCategorySummaries()).slice(0, 4);
  return (
    <>
      <JsonLd data={websiteSchema} />
      <HomeContent catalogCategories={catalogCategories} />
    </>
  );
}
