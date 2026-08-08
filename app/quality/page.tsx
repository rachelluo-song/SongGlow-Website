import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import Faq, { type FaqItem } from "@/components/faq";
import JsonLd from "@/components/json-ld";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const PAGE_PATH = "/quality";
const PAGE_TITLE = "Quality & Traceability";

export const metadata: Metadata = {
  title: "Quality & Traceability - SongGlow",
  description:
    "Learn how SongGlow supports traceable electronic component sourcing: source documentation, actual-stock photos, qualified suppliers, and transparent open-market risk communication.",
  alternates: { canonical: PAGE_PATH },
};

const PRINCIPLES = [
  {
    title: "Source documentation",
    body: "When available, we can provide purchase orders and invoices from original manufacturers and their authorized distributors, so the paper trail leads back to where the parts were made.",
  },
  {
    title: "Actual-stock proof",
    body: "On request, we share real photos of the stock being offered, including packaging, box labels, and part markings, so you can review the evidence before parts ship.",
  },
  {
    title: "Qualified supply routes",
    body: "We source through original manufacturers, authorized distributors, and vetted open-market partners. The route matters, and we explain it clearly before you place an order.",
  },
  {
    title: "Honest risk communication",
    body: "When a part can only be found on the open market, we explain the supply risk and available documentation rather than treating every source as equivalent.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Set the requirements",
    body: "Share the part number or BOM, quantity, target date, date-code preference, and documentation requirements before sourcing begins.",
  },
  {
    step: "02",
    title: "Assess the supply route",
    body: "We review available sources and communicate the route, availability, and any open-market considerations with the quotation.",
  },
  {
    step: "03",
    title: "Review the evidence",
    body: "For applicable orders, you can request supporting documentation and actual-stock photos of packaging, labels, and part markings before shipment.",
  },
  {
    step: "04",
    title: "Keep the record clear",
    body: "We keep the sourcing conversation, available documents, and order details organized so your team can make an informed buying decision.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How does SongGlow support component traceability?",
    answer:
      "When available, SongGlow can provide purchase orders and invoices from original manufacturers and their authorized distributors. We can also share real photos of the actual stock, including packaging, box labels, and part markings, before shipment on request.",
  },
  {
    question: "Can SongGlow source parts from the open market?",
    answer:
      "Yes. For obsolete, allocation-constrained, or hard-to-find components, open-market sourcing may be necessary. We explain the source route, available documentation, and risk factors clearly so you can decide whether the option fits your requirements.",
  },
  {
    question: "What documentation can I request before ordering?",
    answer:
      "Documentation availability depends on the source and the specific part. Tell us your documentation requirements with the RFQ, and we will confirm what can be provided before you place an order.",
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
          <h1 data-hero-item>Evidence you can review before you buy</h1>
          <p data-hero-item>
            SongGlow helps OEM and EMS teams make informed sourcing decisions
            with clear supply routes, available documentation, and actual-stock proof.
          </p>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <div className="article" data-reveal>
            <p>
              Traceability is more than a claim. It means knowing where a part
              comes from, what evidence is available, and where supply risk may
              remain. We make that information clear before an order is placed.
            </p>
            <p>
              We do not present every supply route as the same. When a part is
              sourced through an original manufacturer or authorized distributor,
              we explain the available documentation. When an open-market option
              is necessary, we explain the risk and supporting evidence honestly.
            </p>
          </div>
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
            <h2>Traceability starts before the quote</h2>
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
