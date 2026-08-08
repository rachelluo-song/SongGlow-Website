import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import JsonLd from "@/components/json-ld";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "BOM Sourcing & Fulfillment for OEM and EMS Teams - SongGlow",
  description:
    "Send SongGlow your electronic bill of materials for a line-by-line sourcing review, supplier qualification, alternates, cost optimization, and consolidated delivery.",
  alternates: { canonical: "/bom-sourcing" },
};

const OUTCOMES = [
  { value: "24h", label: "Initial response", detail: "Monday–Friday" },
  { value: "1", label: "Point of contact", detail: "Across the full BOM" },
  { value: "100%", label: "Source visibility", detail: "No hidden substitutions" },
];

const STEPS = [
  {
    num: "01",
    title: "Send the BOM",
    body: "Excel, CSV, PDF, or an export from your ERP. Add quantities, target dates, and approved manufacturers when available.",
  },
  {
    num: "02",
    title: "Line-by-line review",
    body: "We normalize part numbers, flag incomplete data, and separate straightforward lines from constrained or high-risk items.",
  },
  {
    num: "03",
    title: "Source and compare",
    body: "We check qualified channels, compare lead time and landed cost, and identify alternates only where your team permits them.",
  },
  {
    num: "04",
    title: "Approve and deliver",
    body: "You receive one organized quote. After approval, we coordinate suppliers, inspection, documentation, and consolidated delivery.",
  },
];

const DELIVERABLES = [
  ["Normalized BOM", "Clean manufacturer and part-number data, with questions called out instead of guessed."],
  ["Line-level quote", "Quantity, unit price, lead time, manufacturer, condition, and sourcing route by item."],
  ["Risk flags", "Lifecycle, allocation, date-code, documentation, and open-market risks made visible before approval."],
  ["Alternate options", "Form-fit-function candidates presented separately for engineering review—never substituted silently."],
  ["Consolidated plan", "Multiple suppliers coordinated into one purchasing and delivery plan for easier execution."],
  ["Traceability pack", "Available source documents, lot and date-code details, and inspection records kept with the order."],
];

const FITS = [
  "New product introduction and pilot builds",
  "Production BOMs split across too many suppliers",
  "Cost-down and second-source projects",
  "Obsolete, allocated, or long-lead components",
  "Electronics and mechanical hardware in one request",
  "Overflow sourcing support for busy procurement teams",
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Electronic BOM Sourcing and Fulfillment",
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  areaServed: "Worldwide",
  serviceType: "Electronic component sourcing and bill of materials fulfillment",
  url: `${SITE_URL}/bom-sourcing`,
};

export default function BomSourcingPage() {
  return (
    <Animate>
      <JsonLd data={serviceSchema} />
      <header className="bom-hero">
        <div className="wrap bom-hero-grid">
          <div className="bom-hero-copy">
            <div className="eyebrow" data-hero-item>BOM Sourcing</div>
            <h1 data-hero-item>Your BOM, turned into a clear sourcing plan.</h1>
            <p data-hero-item>
              One team to review every line, qualify supply, surface risk, and
              coordinate delivery—without losing visibility along the way.
            </p>
            <div className="bom-hero-actions" data-hero-item>
              <Link href="/contact?project=bom" className="btn btn-navy btn-lg">
                Send Your BOM
              </Link>
              <a href="#process" className="btn btn-ghost btn-lg">See How It Works</a>
            </div>
            <p className="bom-file-note" data-hero-item>
              Excel, CSV, PDF, drawings, and spec sheets accepted.
            </p>
          </div>

          <div className="bom-review-card" data-hero-item aria-label="Example BOM review summary">
            <div className="bom-review-head">
              <div>
                <span className="bom-review-kicker">Review snapshot</span>
                <h2>Production BOM</h2>
              </div>
              <span className="bom-status">In review</span>
            </div>
            <div className="bom-progress"><span /></div>
            <div className="bom-review-rows">
              <div><span>Ready to quote</span><strong>74 lines</strong></div>
              <div><span>Alternate suggested</span><strong>8 lines</strong></div>
              <div><span>Risk review</span><strong>5 lines</strong></div>
              <div><span>Needs clarification</span><strong>3 lines</strong></div>
            </div>
            <div className="bom-review-foot">
              <span>90 total line items</span>
              <span>Electronics + hardware</span>
            </div>
          </div>
        </div>
      </header>

      <section className="bom-metrics" aria-label="Service commitments">
        <div className="wrap bom-metrics-grid" data-reveal-group>
          {OUTCOMES.map((item) => (
            <div key={item.label} className="bom-metric">
              <strong>{item.value}</strong>
              <div><span>{item.label}</span><small>{item.detail}</small></div>
            </div>
          ))}
        </div>
      </section>

      <section className="block" id="process">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="eyebrow">The Process</div>
            <h2>From spreadsheet to supply plan</h2>
            <p>Every line moves through the same visible, disciplined workflow.</p>
          </div>
          <div className="bom-process" data-reveal-group>
            {STEPS.map((step) => (
              <article key={step.num} className="bom-step">
                <span className="bom-step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="block bom-deliverables-section">
        <div className="wrap bom-split">
          <div className="bom-sticky-copy" data-reveal>
            <div className="eyebrow">What You Receive</div>
            <h2>A quote your team can actually evaluate</h2>
            <p>
              Availability is only useful when the source, assumptions, and
              tradeoffs are clear. We organize the information your buyers and
              engineers need to make a confident decision.
            </p>
            <Link href="/quality" className="text-link">Our quality approach →</Link>
          </div>
          <div className="bom-deliverables" data-reveal-group>
            {DELIVERABLES.map(([title, body], index) => (
              <article key={title} className="bom-deliverable">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{body}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap bom-fit-grid">
          <div className="bom-fit-card" data-reveal>
            <div className="eyebrow">Built For Real BOMs</div>
            <h2>Use us for one difficult line—or the entire list.</h2>
            <p>
              SongGlow supports OEM, EMS, engineering, and procurement teams
              from Shenzhen and Hong Kong, with worldwide delivery.
            </p>
          </div>
          <ul className="bom-checklist" data-reveal-group>
            {FITS.map((item) => <li key={item}><span>✓</span>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="band-dark bom-final-cta" data-reveal>
            <div>
              <div className="eyebrow">Ready When You Are</div>
              <h2>Send the BOM. We’ll map the next move.</h2>
              <p>No fixed template required. Include whatever information you have.</p>
            </div>
            <Link href="/contact?project=bom" className="btn btn-clay btn-lg">
              Start a BOM Review
            </Link>
          </div>
        </div>
      </section>
    </Animate>
  );
}
