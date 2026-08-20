import type { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "Request an Electronic Component or BOM Quote | SongGlow",
  description:
    "Have a BOM to source? Send SongGlow the part numbers, requested quantities, target dates, and sourcing requirements for an initial review.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactContent />;
}
