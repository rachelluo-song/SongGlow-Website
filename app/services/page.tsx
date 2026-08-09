import type { Metadata } from "next";
import ServicesContent from "./services-content";

export const metadata: Metadata = {
  title: "Electronic Component Sourcing Services - SongGlow",
  description:
    "BOM sourcing, electronic component procurement, alternates, obsolete parts, cost review and multi-supplier coordination for OEM and EMS teams.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
