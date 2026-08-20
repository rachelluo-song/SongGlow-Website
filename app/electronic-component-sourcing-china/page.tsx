import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import Faq, { type FaqItem } from "@/components/faq";
import JsonLd from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/electronic-component-sourcing-china";

export const metadata: Metadata = {
  title: "Electronic Component Sourcing in China | SongGlow",
  description:
    "China electronic component sourcing for OEM and EMS BOMs. SongGlow searches potential sources, compares suitable quotes, and coordinates approved orders.",
  alternates: { canonical: PAGE_PATH },
};

const WORKFLOW = [
  {
    number: "01",
    title: "Receive the BOM",
    body: "We review the manufacturer part numbers, requested quantities, target dates, approved alternates, and line-specific requirements you provide.",
  },
  {
    number: "02",
    title: "Search potential sources",
    body: "Our Shenzhen and Hong Kong team looks for supplier routes that match the specified parts and requested quantities. SongGlow does not hold inventory.",
  },
  {
    number: "03",
    title: "Compare suitable quotations",
    body: "We organize price, quantity, lead time, source notes, and available documentation so the customer can compare the suitable options.",
  },
  {
    number: "04",
    title: "Coordinate the approved order",
    body: "After customer approval, we coordinate the selected source. When goods reach us, we visually check the external packaging and visible label information and take photos for the customer.",
  },
];

const RFQ_DETAILS = [
  "Manufacturer and complete manufacturer part number",
  "Requested quantity for each BOM line",
  "Target date and delivery destination",
  "Approved alternate manufacturers and part numbers",
  "Packaging, date-code, lot, or documentation requirements",
  "Drawings and revisions for custom mechanical items",
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is SongGlow an electronic component sourcing company in China?",
    answer:
      "Yes. SongGlow operates from Shenzhen and Hong Kong and supports international OEM, EMS, engineering, and procurement teams with quote-to-order electronic component and BOM sourcing.",
  },
  {
    question: "Does SongGlow hold electronic component inventory?",
    answer:
      "No. SongGlow holds no inventory. We start with the customer's part numbers and requested quantities, search potential sources, compare suitable quotations, and coordinate the option the customer approves.",
  },
  {
    question: "Can SongGlow source every line in my BOM?",
    answer:
      "A complete BOM helps us search accurately, but we do not promise that every requested line can be sourced. Some parts may be obsolete, constrained, incorrectly identified, or unavailable in the requested quantity or timing. We report suitable quote options and open questions line by line.",
  },
  {
    question: "What source documentation can SongGlow provide?",
    answer:
      "Tell us which channel, certificate, lot, date-code, or order records your project requires. We make a reasonable effort to request them and confirm what is available for the specific quotation. Documentation varies by supplier and part and is not guaranteed for every BOM line.",
  },
  {
    question: "How does SongGlow check parts after receipt?",
    answer:
      "We visually check the condition of the external packaging and visible order or label information, then photograph the packaging and labels for the customer. This receiving check does not prove authenticity and does not include X-ray, XRF, decapsulation, electrical testing, solderability testing, destructive testing, or laboratory authentication.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}${PAGE_PATH}#service`,
  name: "Electronic Component Sourcing in China",
  description:
    "Quote-to-order electronic component and BOM sourcing from Shenzhen and Hong Kong for international OEM and EMS teams.",
  url: `${SITE_URL}${PAGE_PATH}`,
  provider: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
  areaServed: "Worldwide",
  serviceType: "Electronic component sourcing and BOM procurement support",
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Electronic Component Sourcing in China",
      item: `${SITE_URL}${PAGE_PATH}`,
    },
  ],
};

export default function ElectronicComponentSourcingChinaPage() {
  return (
    <Animate>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <header className="bom-hero">
        <div className="wrap bom-hero-grid">
          <div className="bom-hero-copy">
            <div className="eyebrow" data-hero-item>
              Shenzhen &amp; Hong Kong
            </div>
            <h1 data-hero-item>
              Electronic Component Sourcing in China for OEM &amp; EMS BOMs
            </h1>
            <p data-hero-item>
              Send the specified parts and quantities. SongGlow searches
              potential sources, compares suitable quotations, and coordinates
              the customer-approved order from the Shenzhen–Hong Kong
              electronics corridor.
            </p>
            <div className="bom-hero-actions" data-hero-item>
              <Link href="/contact?project=bom" className="btn btn-navy btn-lg">
                Send Your BOM
              </Link>
              <Link href="/bom-rfq-template" className="btn btn-ghost btn-lg">
                Free BOM RFQ Template
              </Link>
            </div>
          </div>

          <div className="bom-fit-card" data-hero-item>
            <div className="eyebrow">Quote-To-Order</div>
            <h2>Local sourcing support without an inventory claim</h2>
            <p>
              SongGlow does not operate a stocked catalog. Each search begins
              with the customer&apos;s BOM, requested quantities, target timing,
              and approved requirements.
            </p>
            <Link href="/bom-sourcing" className="text-link">
              Explore our BOM sourcing workflow →
            </Link>
          </div>
        </div>
      </header>

      <section className="answer-strip" aria-label="China electronic component sourcing summary">
        <div className="wrap">
          <p>
            <strong>Direct answer:</strong> SongGlow is a Shenzhen and Hong Kong
            quote-to-order sourcing team for international OEM and EMS BOMs. We
            use the customer&apos;s specified parts and quantities to search
            potential sources, compare suitable quotations, and coordinate the
            approved order. We do not operate a stocked catalog.
          </p>
        </div>
      </section>

      <section className="block" id="workflow">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="eyebrow">How It Works</div>
            <h2>From China supplier search to an approved order</h2>
            <p>
              The workflow keeps the requested part, quantity, commercial
              comparison, and receiving record connected line by line.
            </p>
          </div>
          <div className="bom-process" data-reveal-group>
            {WORKFLOW.map((step) => (
              <article key={step.number} className="bom-step">
                <span className="bom-step-num">{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="block tight bom-deliverables-section">
        <div className="wrap bom-fit-grid">
          <div className="bom-fit-card" data-reveal>
            <div className="eyebrow">For A Clearer RFQ</div>
            <h2>What to include in your China sourcing request</h2>
            <p>
              Clear line-level requirements reduce clarification rounds and
              help potential sources quote the same commercial requirement.
            </p>
            <Link
              href="/guides/how-to-prepare-a-bom-for-electronic-component-sourcing"
              className="text-link"
            >
              How to prepare an electronic BOM →
            </Link>
          </div>
          <ul className="bom-checklist" data-reveal-group>
            {RFQ_DETAILS.map((item) => (
              <li key={item}>
                <span>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="article" data-reveal>
            <h2>Why work with a Shenzhen and Hong Kong sourcing team?</h2>
            <p>
              Shenzhen and Hong Kong sit close to a broad electronics supplier
              ecosystem. For an overseas buyer, a local point of contact can
              coordinate supplier questions, compare quotations in a consistent
              format, follow the approved order, and photograph visible
              packaging and label information after receipt.
            </p>
            <p>
              Geography does not remove sourcing risk. The manufacturer part
              number, quantity, source type, available documentation, price,
              lead time, and application requirements still need to be reviewed
              for the individual quote. SongGlow keeps those limits visible
              rather than presenting catalog listings as confirmed supply.
            </p>

            <Faq
              items={FAQ_ITEMS}
              heading="China electronic component sourcing questions"
            />
          </div>

          <div className="catalog-cta" data-reveal>
            <h2>Have a component list ready for supplier search?</h2>
            <p>
              Send the manufacturer part numbers, requested quantities, target
              dates, and required documentation. We will review the request and
              confirm the next steps.
            </p>
            <div className="catalog-cta-row">
              <Link href="/contact?project=bom" className="btn btn-navy btn-lg">
                Request a BOM Review
              </Link>
              <Link href="/services" className="btn btn-ghost btn-lg">
                View Sourcing Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Animate>
  );
}
