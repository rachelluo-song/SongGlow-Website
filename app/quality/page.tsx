import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import Faq, { type FaqItem } from "@/components/faq";
import JsonLd from "@/components/json-ld";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const PAGE_PATH = "/quality";
const PAGE_TITLE = "Receiving Checks & Documentation";

export const metadata: Metadata = {
  title: "Visual Receiving Checks & Source Documentation | SongGlow",
  description:
    "Learn how SongGlow visually checks packaging after receipt, takes customer photos, and requests available channel documentation for electronic component orders.",
  alternates: { canonical: PAGE_PATH },
};

const PRINCIPLES = [
  {
    title: "Visual packaging check",
    body: "After receipt, we visually check the external packaging for obvious damage and compare visible part-number and quantity information with the order.",
  },
  {
    title: "Customer photos",
    body: "We photograph the received packaging and visible labels so the customer can review what arrived before onward delivery.",
  },
  {
    title: "Available documentation",
    body: "We ask the source for available channel documents, lot details, or date codes and share what is provided for the specific quote or order.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Receive the order",
    body: "We receive the parts ordered against the approved quotation and BOM requirements.",
  },
  {
    step: "02",
    title: "Check the packaging visually",
    body: "We look for obvious external packaging damage and compare visible packaging or label information with the order.",
  },
  {
    step: "03",
    title: "Photograph and report",
    body: "We photograph the packaging and labels, report obvious issues, and prepare the order for onward delivery after customer review where required.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What source documentation can SongGlow provide?",
    answer:
      "SongGlow requests available channel documentation from the supplier and keeps the customer order connected with the packaging and label photos taken after receipt. The documentation available varies by source and part, so it is confirmed for each quotation rather than guaranteed for every line.",
  },
  {
    question: "Can SongGlow source parts from the open market?",
    answer:
      "When requested parts are difficult to locate through regular channels, we may present other sourcing options. We describe the available documentation and relevant limitations so the customer can decide whether to proceed.",
  },
  {
    question: "What documentation can I request before ordering?",
    answer:
      "Tell us the required channel, certificate, lot, or date-code information with the RFQ. We will ask the potential source and confirm what is available. We make a reasonable effort to obtain documentation, but cannot guarantee that every supplier will provide every requested record.",
  },
  {
    question: "Does SongGlow perform X-ray or laboratory authentication?",
    answer:
      "No. SongGlow's standard receiving check is visual and does not include X-ray, XRF, decapsulation, electrical testing, solderability testing, or other laboratory authentication. Customers requiring those services should arrange an appropriately qualified third-party laboratory and tell us before ordering.",
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${PAGE_TITLE} | ${SITE_NAME}`,
  url: `${SITE_URL}${PAGE_PATH}`,
  about: [
    "Electronic component receiving checks",
    "Electronic component sourcing",
    "Supplier documentation",
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
            Receiving Checks &amp; Documentation
          </div>
          <h1 data-hero-item>Visual receiving checks and source documentation</h1>
          <p data-hero-item>
            After parts reach us, we visually check packaging condition, take
            photos for the customer, and organize available source documents.
          </p>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <div className="article" data-reveal>
            <p>
              Our standard check is intentionally straightforward. We look for
              obvious external packaging damage and compare visible packaging or
              label information with the approved order.
            </p>
            <p>
              This is not a determination of authenticity or electrical
              performance. It does not include X-ray, decapsulation, electrical
              testing, or other laboratory analysis. We confirm available source
              documentation separately for each quotation.
            </p>
          </div>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 40 }} data-reveal>
            <div className="eyebrow">Our standard</div>
            <h2>What our standard receiving check includes</h2>
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
            <h2>A practical three-step receiving process</h2>
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
            <Faq items={FAQ_ITEMS} heading="Receiving and documentation questions" />
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
