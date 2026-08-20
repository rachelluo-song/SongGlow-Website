"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePageAnimations } from "@/lib/use-page-animations";

const SERVICES = [
  {
    num: "01",
    title: "Multi-Line BOM Sourcing",
    body: "Send your bill of materials and requested quantities for line-by-line review, potential-source search, and suitable quote comparison.",
  },
  {
    num: "02",
    title: "Alternative Component Recommendations",
    body: "Potential form-fit-function candidates presented separately for customer engineering review when alternate research is requested.",
  },
  {
    num: "03",
    title: "Cost Optimization",
    body: "Competitive multi-supplier bidding and quantity comparison to improve total value without changing the approved part requirements.",
  },
  {
    num: "04",
    title: "Multi-Supplier Sourcing",
    body: "We search multiple supplier routes and compare quantity, lead time, pricing, and available documentation for each BOM line.",
  },
  {
    num: "05",
    title: "Obsolete & Hard-to-Find Components",
    body: "Wider supplier-route research for end-of-life, long-lead, and allocation-constrained requirements.",
  },
  {
    num: "06",
    title: "Supply Risk Management",
    body: "Second-source research, lead-time comparison, and clear sourcing notes to help your team evaluate supply risk.",
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
    title: "We source & compare",
    body: "We look for correctly specified parts in the requested quantities and compare suitable quotations.",
  },
  {
    step: "Step 3",
    title: "We receive & document",
    body: "After receipt, we visually check packaging condition and share photos. Available channel documents are passed along when provided.",
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
          <h1 data-hero-item>Electronic component sourcing for every stage of the BOM</h1>
          <p data-hero-item>
            Whatever the constraint - cost, allocation, obsolescence, or risk -
            <br />
            SongGlow builds the sourcing plan around it.
          </p>
        </div>
      </header>

      <section className="answer-strip" aria-label="Electronic component sourcing services summary">
        <div className="wrap">
          <p>
            <strong>Direct answer:</strong> SongGlow supports OEM, EMS, and
            procurement teams with quote-to-order electronic component and BOM
            sourcing. We receive the requested parts and quantities, search
            potential sources, compare suitable quotations for value and lead
            time, and coordinate the customer-approved order. We do not hold
            inventory or guarantee that every BOM line can be sourced.
          </p>
        </div>
      </section>

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
          <div style={{ marginTop: 36, textAlign: "center" }} data-reveal>
            <Link href="/obsolete-electronic-components" className="btn btn-ghost">
              Explore Obsolete Component Sourcing →
            </Link>
            <Link
              href="/electronic-component-sourcing-china"
              className="btn btn-ghost"
              style={{ marginLeft: 12 }}
            >
              Electronic Component Sourcing in China →
            </Link>
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
            <Link href="/bom-sourcing" className="btn btn-ghost btn-lg" style={{ marginLeft: 12, color: "var(--cream)", borderColor: "rgba(255,255,255,.35)" }}>
              Explore BOM Sourcing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
