import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import JsonLd from "@/components/json-ld";
import Faq, { type FaqItem } from "@/components/faq";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Electronic BOM Sourcing & Fulfillment Services | SongGlow",
  description:
    "Electronic BOM sourcing and fulfillment for OEM and EMS teams. Get line-by-line component quotes, alternates, risk review, and consolidated delivery.",
  alternates: { canonical: "/bom-sourcing" },
};

const OUTCOMES = [
  { value: "1 day", label: "Initial reply target", detail: "Business days" },
  { value: "1", label: "Point of contact", detail: "Across the submitted BOM" },
  { value: "Line by line", label: "Quote visibility", detail: "No silent substitutions" },
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
    body: "We search supplier channels, compare requested quantity, lead time, and total cost, and identify alternates only where your team permits them.",
  },
  {
    num: "04",
    title: "Approve and deliver",
    body: "You receive one organized quote. After approval, we coordinate suppliers, visually check packaging after receipt, take photos, and arrange delivery.",
  },
];

const DELIVERABLES = [
  ["Normalized BOM", "Clean manufacturer and part-number data, with questions called out instead of guessed."],
  ["Line-level quote", "Quantity, unit price, lead time, manufacturer, condition, and relevant channel notes by item."],
  ["Risk flags", "Lifecycle, allocation, date-code, documentation, and open-market risks made visible before approval."],
  ["Alternate options", "Form-fit-function candidates presented separately for engineering review—never substituted silently."],
  ["Consolidated plan", "Multiple suppliers coordinated into one purchasing and delivery plan for easier execution."],
  ["Receiving record", "Packaging and label photos taken after receipt, plus available channel documents, lot details, or date codes when the supplier provides them."],
];

const FITS = [
  "New product introduction and pilot builds",
  "Production BOMs split across too many suppliers",
  "Cost-down and second-source projects",
  "Obsolete, allocated, or long-lead components",
  "Electronics and mechanical hardware in one request",
  "Overflow sourcing support for busy procurement teams",
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What file format can I send for a BOM quote?",
    answer:
      "Use the downloadable Excel template on this page or send your existing Excel, CSV, PDF, or ERP export. Drawings and specification sheets can be attached with the list. No fixed template is required, although manufacturer part number, quantity, and target date help us return a more complete quote.",
  },
  {
    question: "How quickly will I receive a BOM quote?",
    answer:
      "SongGlow aims to acknowledge BOM inquiries within one business day. Quote timing depends on the number of lines and how many parts require alternate, lifecycle, or open-market research; we will confirm the expected turnaround after the initial review.",
  },
  {
    question: "Can SongGlow source both electronics and mechanical hardware?",
    answer:
      "We can search potential sources for semiconductors, passives, electromechanical components, and mechanical hardware such as fasteners, springs, gaskets, and enclosures within the same BOM request. Suitable quote options and open questions are reported line by line.",
  },
  {
    question: "Can you recommend alternates for unavailable parts?",
    answer:
      "Yes. When an original part is constrained, obsolete, or overpriced, we can identify form-fit-function candidates and clearly separate them from the requested part. Your engineering team reviews and approves any alternate before it is ordered; SongGlow never makes a silent substitution.",
  },
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
            <h1 data-hero-item>Electronic BOM sourcing, turned into a clear supply plan.</h1>
            <p data-hero-item>
              One team to review the submitted lines, search suitable sources,
              surface risk, and coordinate delivery—without losing visibility
              along the way.
            </p>
            <div className="bom-hero-actions" data-hero-item>
              <Link href="/contact?project=bom" className="btn btn-navy btn-lg">
                Send Your BOM
              </Link>
              <Link href="/bom-rfq-template" className="btn btn-ghost btn-lg">
                Free BOM RFQ Template
              </Link>
            </div>
            <p className="bom-file-note" data-hero-item>
              Use our Excel template—or send your existing CSV, PDF, drawings,
              spec sheets, or ERP export.
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
            <h2>Use us for one difficult line—or a multi-line request.</h2>
            <p>
              SongGlow supports OEM, EMS, engineering, and procurement teams
              from Shenzhen and Hong Kong, with worldwide delivery.
            </p>
            <Link href="/obsolete-electronic-components" className="text-link">
              Sourcing an obsolete or hard-to-find line? →
            </Link>
            <br />
            <Link href="/electronic-component-sourcing-china" className="text-link">
              Electronic component sourcing support in China →
            </Link>
          </div>
          <ul className="bom-checklist" data-reveal-group>
            {FITS.map((item) => <li key={item}><span>✓</span>{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="block bom-faq-section">
        <div className="wrap">
          <div className="article" data-reveal>
            <Faq items={FAQ_ITEMS} heading="BOM sourcing questions" />
            <p>
              When an unavailable line needs a substitute, use our guide to{" "}
              <Link href="/guides/how-to-find-component-alternates">
                finding and qualifying electronic component alternates
              </Link>.
            </p>
            <p>
              Preparing a new sourcing file? Download the{" "}
              <Link href="/bom-rfq-template">free electronic BOM RFQ template</Link>{" "}
              or follow our guide to{" "}
              <Link href="/guides/how-to-prepare-a-bom-for-electronic-component-sourcing">
                preparing a BOM for component sourcing
              </Link>.
            </p>
          </div>
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
