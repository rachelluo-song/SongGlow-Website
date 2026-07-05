import type { Metadata } from "next";
import ServicesContent from "./services-content";

export const metadata: Metadata = {
  title: "Services — SongGlow",
  description:
    "Sourcing coverage for every stage of the BOM — complete BOM sourcing, alternates, cost optimization, multi-supplier sourcing, obsolete parts, and supply risk management.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
