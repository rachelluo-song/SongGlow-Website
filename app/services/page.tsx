import type { Metadata } from "next";
import JsonLd from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";
import ServicesContent from "./services-content";

export const metadata: Metadata = {
  title: "Electronic Component Sourcing Services | SongGlow",
  description:
    "Electronic component sourcing services for OEM and EMS teams: BOM procurement, obsolete and hard-to-find parts, alternates, cost review, and supplier coordination.",
  alternates: { canonical: "/services" },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}/services#service`,
  name: "Electronic Component Sourcing Services",
  description:
    "Quote-to-order BOM sourcing, alternate research, obsolete component sourcing, quote comparison, and supplier coordination for OEM and EMS teams.",
  url: `${SITE_URL}/services`,
  provider: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
  areaServed: "Worldwide",
  serviceType: [
    "Electronic component sourcing",
    "BOM sourcing",
    "Obsolete component sourcing",
    "Alternate component research",
  ],
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={serviceSchema} />
      <ServicesContent />
    </>
  );
}
