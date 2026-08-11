import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Animate from "@/components/animate";
import Faq, { type FaqItem } from "@/components/faq";
import JsonLd from "@/components/json-ld";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const PAGE_PATH = "/quality";
const PAGE_TITLE = "Quality & Traceability";

export const metadata: Metadata = {
  title: "Electronic Component Inspection & Traceability | SongGlow",
  description:
    "Electronic component inspection and order-level traceability covering packaging, labels, markings, dimensions, lot details, and date codes before release.",
  alternates: { canonical: PAGE_PATH },
};

const PRINCIPLES = [
  {
    title: "Packaging inspection",
    body: "We review packaging condition and the consistency of available labels, part numbers, quantities, and visible lot or date-code information before release.",
  },
  {
    title: "Marking review",
    body: "We compare visible manufacturer and part markings for consistency with the ordered component and flag obvious discrepancies for clarification.",
  },
  {
    title: "Dimensional checks",
    body: "When applicable, accessible package dimensions can be checked against the ordered specification or manufacturer drawing before shipment.",
  },
  {
    title: "Traceability release",
    body: "We keep the order record, review notes, and available lot or date-code details organized while protecting confidential supplier identities and commercial terms.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Inspect packaging",
    body: "Review packaging condition and available label details for consistency with the ordered part and quantity.",
  },
  {
    step: "02",
    title: "Review markings and dimensions",
    body: "Check visible part markings and, when applicable, accessible package dimensions against the order requirements.",
  },
  {
    step: "03",
    title: "Release with a clear record",
    body: "Keep the order record and available lot or date-code information organized for the shipment without exposing confidential commercial details.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does SongGlow support component traceability?",
    answer:
      "SongGlow keeps order-level records together with available packaging, label, lot, and date-code information. The scope depends on the component and order. Confidential supplier identities, purchase prices, invoices, and other commercial terms are not part of the standard customer deliverables.",
  },
  {
    question: "Can SongGlow source parts from the open market?",
    answer:
      "Yes. For obsolete, allocation-constrained, or hard-to-find components, open-market sourcing may be necessary. We communicate relevant channel risk and the review scope without disclosing confidential supplier identities or commercial terms.",
  },
  {
    question: "What documentation can I request before ordering?",
    answer:
      "Available order-level documentation depends on the component and transaction. Tell us your requirements with the RFQ and we will confirm what can be included. Supplier identities, upstream invoices, purchase prices, and confidential commercial records are not provided as standard deliverables.",
  },
  {
    question: "Is SongGlow ISO 9001 or AS9120 certified?",
    answer:
      "Not yet. SongGlow does not currently hold formal ISO 9001 or AS9120 certification. We are transparent about that status and focus on maintaining clear documentation, source communication, and evidence for each order.",
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${PAGE_TITLE} | ${SITE_NAME}`,
  url: `${SITE_URL}${PAGE_PATH}`,
  about: [
    "Electronic component traceability",
    "Electronic component sourcing",
    "Supplier qualification",
  ],
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: PAGE_TITLE,
      item: `${SITE_URL}${PAGE_PATH}`,
    },
  ],
};

export default function QualityPage() {
  return (
    <Animate>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <header className="page-hero">
        <div className="wrap">
          <div className="eyebrow" data-hero-item>
            Quality &amp; Traceability
          </div>
          <h1 data-hero-item>Electronic component inspection and traceability</h1>
          <p data-hero-item>
            SongGlow helps OEM and EMS teams make informed sourcing decisions
            with packaging, marking, dimensional, and order-level traceability reviews.
          </p>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <div className="article" data-reveal>
            <p>
              Traceability is more than a claim. It means keeping the order,
              available lot or date-code details, and review notes connected so
              the shipment record remains clear.
            </p>
            <p>
              Our standard review does not disclose confidential supplier
              identities, upstream invoices, purchase prices, or other commercial
              terms. We confirm the review scope and available order-level records
              before you place an order.
            </p>
          </div>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <figure className="quality-workflow" data-reveal>
            <div
              className="quality-workflow-scroll"
              tabIndex={0}
              aria-label="Scrollable component verification workflow diagram"
            >
              <Image
                src="/component-verification-traceability.png"
                width={1774}
                height={887}
                sizes="(max-width: 700px) 760px, (max-width: 1240px) 92vw, 1144px"
                alt="Three-step electronic component verification workflow: packaging inspection, marking and dimensional checks, and traceability release."
              />
            </div>
            <figcaption>
              AI-generated illustration of SongGlow&apos;s packaging, marking,
              dimensional, and traceability review. The review scope depends on
              the component and order requirements.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 40 }} data-reveal>
            <div className="eyebrow">Our standard</div>
            <h2>Clear information for every sourcing decision</h2>
          </div>
          <div className="grid-3" data-reveal-group>
            {PRINCIPLES.map((item) => (
              <div key={item.title} className="card">
                <h3 style={{ fontSize: 19 }}>{item.title}</h3>
                <p
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: 15.5,
                    marginTop: 10,
                    lineHeight: 1.65,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 40 }} data-reveal>
            <div className="eyebrow">How it works</div>
            <h2>A practical three-step review</h2>
          </div>
          <div className="grid-3" data-reveal-group>
            {PROCESS.map((item) => (
              <div key={item.step} className="service-card">
                <div className="service-num">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="article" data-reveal>
            <Faq items={FAQ_ITEMS} heading="Quality and traceability questions" />
          </div>
          <div className="catalog-cta" data-reveal>
            <h2>Need documentation for a BOM or hard-to-find part?</h2>
            <p>
              Send your requirements with the part number, quantity, and target
              date. We will confirm the available sourcing route and documentation.
              You can also review our guide to{" "}
              <Link href="/guides/how-to-verify-authentic-electronic-components">
                verifying authentic electronic components
              </Link>{" "}
              before evaluating a source.
            </p>
            <div className="catalog-cta-row">
              <Link href="/contact" className="btn btn-navy btn-lg">
                Request a quote
              </Link>
              <Link href="/services" className="btn btn-ghost btn-lg">
                Explore sourcing services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Animate>
  );
}
