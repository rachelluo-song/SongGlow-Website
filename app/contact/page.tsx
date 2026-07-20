import type { Metadata } from "next";
import ContactContent from "./contact-content";

export const metadata: Metadata = {
  title: "Contact — SongGlow",
  description:
    "Have a BOM to source? Send SongGlow a message or reach a sales contact directly — we reply within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactContent />;
}
