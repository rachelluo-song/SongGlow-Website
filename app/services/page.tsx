import type { Metadata } from "next";
import ServicesContent from "./services-content";

export const metadata: Metadata = {
  title: "Electronic Component Sourcing Services | SongGlow",
  description:
    "Electronic component sourcing services for OEM and EMS teams: BOM procurement, obsolete and hard-to-find parts, alternates, cost review, and supplier coordination.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
