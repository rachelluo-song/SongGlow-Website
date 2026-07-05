"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePageAnimations } from "@/lib/use-page-animations";

const SERVICES = [
  {
    num: "01",
    title: "Complete BOM Sourcing",
    body: "Send your full bill of materials and we quote, source, and manage every line item end to end - one point of contact for the whole list.",
  },
  {
    num: "02",
    title: "Alternative Component Recommendations",
    body: "Cross-referenced, form-fit-function alternates for parts that are constrained, discontinued, or overpriced - vetted before we ever suggest them.",
  },
  {
    num: "03",
    title: "Cost Optimization",
    body: "Competitive multi-supplier bidding and volume strategy to bring landed cost down without compromising authenticity.",
  },
  {
    num: "04",
    title: "Multi-Supplier Sourcing",
    body: "A qualified network spanning authorized distributors and vetted open-market partners, so no single point of failure holds up your line.",
  },
  {
    num: "05",
    title: "Obsolete & Hard-to-Find Components",
    body: "Deep-reach sourcing for end-of-life, long-lead, and allocation-constrained parts other suppliers can't place.",
  },
  {
    num: "06",
    title: "Supply Risk Management",
    body: "Inventory strategy, dual-sourcing, and lead-time monitoring built to keep your production schedule protected.",
  },
];

const PROCESS_STEPS = [
  {
    step: "Step 1",
    title: "Share your BOM",
    body: "Send your list, target dates, and any constraints - no format required.",
  },
  {
    step: "Step 2",
    title: "We source & verify",
    body: "Every part is quoted, cross-checked against qualified suppliers, and authenticated.",
  },
  {
    step: "Step 3",
    title: "Traceable delivery",
    body: "Manufacturer-compliant packaging with full lot and date-code documentation.",
  },
];

export default function ServicesContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  usePageAnimations(rootRef);

  return (
    <div ref={rootRef}>
      <header className="page-hero">
        <div className="wrap">
          <div className="eyebrow" data-hero-item>
            Services
          </div>
          <h1 data-hero-item>Sourcing coverage for every stage of the BOM</h1>
          <p data-hero-item>
            Whatever the constraint - cost, allocation, obsolescence, or risk -
            <br />
            SongGlow builds the sourcing plan around it.
          </p>
        </div>
      </header>

      <section className="block">
        <div className="wrap">
          <div className="grid-3" data-reveal-group>
            {SERVICES.map((service) => (
              <div key={service.num} className="service-card">
                <div className="service-num">{service.num}</div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="section-head center" style={{ marginBottom: 56 }} data-reveal>
            <div className="eyebrow" style={{ justifyContent: "center", width: "100%" }}>
              How It Works
            </div>
            <h2>From BOM to delivery</h2>
          </div>
          <div className="grid-3" data-reveal-group>
            {PROCESS_STEPS.map((item) => (
              <div key={item.step} className="card">
                <div className="service-num">{item.step}</div>
                <h3 style={{ fontSize: 19 }}>{item.title}</h3>
                <p
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: 15,
                    marginTop: 10,
                    lineHeight: 1.6,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="band-dark" data-reveal>
            <div className="section-head" style={{ marginBottom: 32 }}>
              <div className="eyebrow" style={{ color: "var(--clay-tint)" }}>
                Let&apos;s Talk Sourcing
              </div>
              <h2 style={{ fontSize: 38, maxWidth: 560 }}>
                Have a BOM that needs a home?
              </h2>
            </div>
            <Link href="/contact" className="btn btn-clay btn-lg">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
