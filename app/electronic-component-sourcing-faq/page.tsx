import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import Faq, { type FaqItem } from "@/components/faq";
import JsonLd from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/electronic-component-sourcing-faq";
const PAGE_TITLE = "Electronic Component Sourcing FAQ";

export const metadata: Metadata = {
  title: `${PAGE_TITLE}: Buyer Questions Answered | SongGlow`,
  description:
    "Straight answers to common electronic component sourcing questions about BOM RFQs, quote comparison, MOQ, alternates, documentation, receiving checks, and order coordination.",
  alternates: { canonical: PAGE_PATH },
};

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}${PAGE_PATH}#webpage`,
  name: PAGE_TITLE,
  description:
    "A buyer answer center for electronic component and BOM sourcing questions.",
  url: `${SITE_URL}${PAGE_PATH}`,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/services#service` },
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

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is electronic component sourcing?",
    answer:
      "Electronic component sourcing is the process of turning specified manufacturer part numbers and quantities into suitable supply options. It can include searching potential supplier routes, comparing quotations, clarifying lead time and packaging, checking what documentation is available, and coordinating the approved order.",
  },
  {
    question: "What information should I include in a BOM RFQ?",
    answer:
      "Provide the manufacturer part number, manufacturer name when known, requested quantity, target delivery date, ship-to country, and whether alternates are allowed. Also state any required packaging, date-code, lot, documentation, or approved-supplier constraints so quotations can be compared on the same basis.",
  },
  {
    question: "Can I request a quote without an exact manufacturer part number?",
    answer:
      "You can share the available description, drawing, or key specifications, but an exact quotation may not be possible until the requirement is unambiguous. Similar-looking parts can differ in electrical ratings, dimensions, tolerance, finish, lifecycle status, or compliance, so the customer must confirm the final part specification.",
  },
  {
    question: "Why can quotations for the same part number be different?",
    answer:
      "Two quotations may use different source routes, quantities, minimum order requirements, packaging, lead-time assumptions, date or lot information, documentation, delivery terms, and payment terms. Compare the full commercial and sourcing basis rather than treating unit price as the only difference.",
  },
  {
    question: "Does receiving a quotation mean the parts are reserved?",
    answer:
      "No. A quotation records an offer at a point in time and may remain subject to supplier confirmation, validity dates, quantity changes, or prior sale. Availability should be reconfirmed before the customer approves and places the order.",
  },
  {
    question: "What do MOQ and order multiple mean?",
    answer:
      "MOQ is the minimum quantity a supplier will accept for an order. An order multiple means the quantity must increase in set increments, often because of reel, tray, tube, carton, or factory-packaging requirements. Both can change the total order value even when the unit price looks attractive.",
  },
  {
    question: "Can SongGlow source every line in a BOM?",
    answer:
      "No. SongGlow searches potential sources and reports suitable quotations where they can be found, but some lines may remain unresolved because of obsolescence, allocation, specification gaps, quantity constraints, or unavailable documentation. Those open lines are reported rather than presented as guaranteed supply.",
  },
  {
    question: "What happens when the exact part is unavailable?",
    answer:
      "The requirement can be searched through additional supplier routes, or potential alternates can be researched when the customer permits it. Any alternate should be presented separately with the relevant differences and must be reviewed and approved by the customer’s engineering or quality team before use.",
  },
  {
    question: "Does SongGlow approve substitute components?",
    answer:
      "No. SongGlow can identify potential alternate candidates and organize the available comparison information, but it does not approve a substitute for the customer’s design. Final form, fit, function, compliance, and application approval remains with the customer.",
  },
  {
    question: "What source documentation is available with an order?",
    answer:
      "Documentation varies by part, supplier, and source route. Before an order is approved, ask what is available for that specific quotation, such as order records, packing or label information, a Certificate of Conformance where applicable, or other supplier-provided documents. Complete documentation cannot be guaranteed for every BOM line.",
  },
  {
    question: "What does SongGlow check when parts are received?",
    answer:
      "SongGlow visually checks the condition of the external packaging and visible order or label information, then photographs the packaging and labels for the customer. This is a receiving and documentation step, not an electrical or laboratory inspection.",
  },
  {
    question: "Can packaging and label photos prove that components are authentic?",
    answer:
      "No. Photos and visual receiving checks can document visible condition and identify obvious inconsistencies, but they cannot prove authenticity or internal condition. SongGlow does not perform X-ray, XRF, decapsulation, electrical, solderability, destructive, or laboratory authentication testing.",
  },
  {
    question: "When should independent laboratory testing be considered?",
    answer:
      "Consider an appropriately qualified independent laboratory when the source route, application risk, component value, shortage conditions, or customer quality plan requires more than document and visual review. The appropriate test plan depends on the device and risk, and should be agreed before the parts are accepted or used.",
  },
  {
    question: "Does SongGlow hold electronic component inventory?",
    answer:
      "No. SongGlow is a quote-to-order sourcing service. Customers send specified part numbers and quantities; SongGlow searches potential sources, compares suitable quotations, and coordinates the customer-approved order.",
  },
  {
    question: "What happens after I approve a quotation?",
    answer:
      "SongGlow coordinates the approved order and communicates relevant order progress. After receipt, it completes the stated visual packaging and label check, shares photos, and coordinates the onward delivery according to the agreed order terms.",
  },
];

const RESOURCES = [
  {
    href: "/bom-rfq-template",
    title: "Prepare the RFQ",
    body: "Use a structured BOM template so quantities, part numbers, constraints, and requested dates are clear.",
  },
  {
    href: "/sample-bom-sourcing-response",
    title: "See a sample response",
    body: "Review an illustrative line-by-line sourcing response with quote options and open customer decisions.",
  },
  {
    href: "/bom-quote-comparison-checklist",
    title: "Compare quotations",
    body: "Check price, quantity, lead time, packaging, source route, documentation, and commercial terms together.",
  },
  {
    href: "/quality",
    title: "Understand receiving checks",
    body: "See what SongGlow checks after receipt, what evidence is shared, and what the process does not prove.",
  },
];

export default function ElectronicComponentSourcingFaqPage() {
  return (
    <Animate>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <header className="page-hero">
        <div className="wrap">
          <div className="eyebrow" data-hero-item>
            Buyer Answer Center
          </div>
          <h1 data-hero-item>{PAGE_TITLE}</h1>
          <p data-hero-item>
            Clear, practical answers about BOM RFQs, quote comparison,
            documentation, alternates, receiving checks, and order coordination.
          </p>
        </div>
      </header>

      <section
        className="answer-strip"
        aria-label="Electronic component sourcing direct answer"
      >
        <div className="wrap">
          <p>
            <strong>Direct answer:</strong> A sourcing partner helps turn a
            defined part requirement into comparable supply options. The buyer
            should compare the exact part, quantity, source route, lead time,
            packaging, available documentation, and total commercial terms
            before approving an order—not unit price alone.
          </p>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="article" data-reveal>
            <p>
              These answers describe the questions that commonly appear between
              sending a BOM and approving a component order. For a line-specific
              decision, the requirements and the basis of each quotation still
              need to be checked individually.
            </p>

            <h2>Practical buyer tools</h2>
            <div className="answer-resource-grid">
              {RESOURCES.map((resource) => (
                <Link
                  key={resource.href}
                  href={resource.href}
                  className="answer-resource-card"
                >
                  <h3>{resource.title}</h3>
                  <p>{resource.body}</p>
                  <span>Open resource →</span>
                </Link>
              ))}
            </div>

            <Faq
              items={FAQ_ITEMS}
              heading="Electronic component sourcing questions"
            />
          </div>

          <div className="catalog-cta" data-reveal>
            <h2>Have a question about a specific BOM line?</h2>
            <p>
              Send the manufacturer part number, requested quantity, target
              date, and any documentation or alternate constraints. SongGlow
              will review the requirement and search for suitable quote options.
            </p>
            <div className="catalog-cta-row">
              <Link href="/contact" className="btn btn-navy btn-lg">
                Send your requirement
              </Link>
              <Link href="/bom-sourcing" className="btn btn-ghost btn-lg">
                View the sourcing workflow
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Animate>
  );
}
