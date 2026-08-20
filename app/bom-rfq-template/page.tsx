import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import Faq, { type FaqItem } from "@/components/faq";
import JsonLd from "@/components/json-ld";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const PAGE_PATH = "/bom-rfq-template";
const DOWNLOAD_PATH = "/SongGlow-BOM-RFQ-Template.xlsx";

export const metadata: Metadata = {
  title: "Free Electronic BOM RFQ Template (Excel) | SongGlow",
  description:
    "Download a free electronic BOM RFQ Excel template with manufacturer, part number, quantity, approved alternates, target date, and sourcing notes fields.",
  alternates: { canonical: PAGE_PATH },
};

const TEMPLATE_FIELDS = [
  [
    "DESCRIPTION",
    "A short, recognizable description of the component or hardware item.",
    "Helps identify incomplete or mismatched part-number information.",
  ],
  [
    "DESIGNATOR (OPTIONAL)",
    "Reference designators such as C12, R8, U3, or J1.",
    "Connects the purchasing line to the schematic or assembly.",
  ],
  [
    "MANUFACTURER",
    "The requested or approved original component manufacturer.",
    "Separates the manufacturer from a distributor or internal vendor name.",
  ],
  [
    "PART NUMBER",
    "The complete manufacturer part number, including suffixes.",
    "The most important identifier for an accurate supplier search.",
  ],
  [
    "QTY",
    "The quantity required for this sourcing request.",
    "Allows suppliers to quote the correct price break and order quantity.",
  ],
  [
    "ALTERNATE MANUFACTURER 1",
    "A first manufacturer already approved by your engineering team.",
    "Makes the approved sourcing scope clear without silent substitution.",
  ],
  [
    "ALTERNATE PART NUMBER 1",
    "The approved part number from Alternate Manufacturer 1.",
    "Keeps an approved alternate paired with the correct manufacturer.",
  ],
  [
    "ALTERNATE MANUFACTURER 2",
    "A second approved manufacturer, if one exists.",
    "Adds another permitted sourcing route for the same BOM line.",
  ],
  [
    "ALTERNATE PART NUMBER 2",
    "The approved part number from Alternate Manufacturer 2.",
    "Prevents an alternate manufacturer from being listed without its exact part.",
  ],
  [
    "TARGET DATE",
    "The date the parts are needed, preferably in YYYY-MM-DD format.",
    "Helps compare quoted lead time against the production requirement.",
  ],
  [
    "NOTES",
    "Packaging, date-code, documentation, or other line-specific requirements.",
    "Keeps sourcing constraints visible before a quotation is approved.",
  ],
];

const CHECKLIST = [
  "Use one row for each separately purchasable part number.",
  "Keep every suffix and package code in the manufacturer part number.",
  "Enter the requested quantity for this RFQ, not a price or annual forecast.",
  "List alternates only when they are already approved by your engineering team.",
  "Put channel-document, lot, date-code, and packaging requirements in NOTES.",
  "Attach drawings or specifications when a commercial part number is not enough.",
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is the SongGlow BOM RFQ template free?",
    answer:
      "Yes. The Excel template is free to download and can be edited for your own electronic component or hardware sourcing request.",
  },
  {
    question: "Do I have to use this template to request a quote?",
    answer:
      "No. You may send your existing Excel, CSV, PDF, or ERP export. The template is simply a clear starting point when your current file does not organize manufacturer, part number, quantity, alternates, target date, and notes consistently.",
  },
  {
    question: "Where should I enter source-documentation requirements?",
    answer:
      "Add the requirement in the NOTES column for the relevant line. State the channel, certificate, lot, date-code, packaging, or photo requirement as specifically as possible. SongGlow will ask potential sources and confirm what is available for the quotation; documentation is not guaranteed for every supplier or part.",
  },
  {
    question: "Does a completed BOM guarantee every line can be sourced?",
    answer:
      "No. A complete BOM makes the search and comparison more accurate, but some parts may be obsolete, constrained, incorrectly identified, or unavailable in the requested quantity and timing. SongGlow reports suitable quote options and open questions line by line.",
  },
];

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Free Electronic BOM RFQ Template",
  url: `${SITE_URL}${PAGE_PATH}`,
  description:
    "A free Excel template for preparing an electronic bill of materials request for quotation.",
  publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  mainEntity: {
    "@type": "DigitalDocument",
    name: "SongGlow BOM RFQ Template",
    encodingFormat:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    url: `${SITE_URL}${DOWNLOAD_PATH}`,
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "BOM RFQ Template",
      item: `${SITE_URL}${PAGE_PATH}`,
    },
  ],
};

export default function BomRfqTemplatePage() {
  return (
    <Animate>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <header className="bom-hero">
        <div className="wrap bom-hero-grid">
          <div className="bom-hero-copy">
            <div className="eyebrow" data-hero-item>
              Free Excel Template
            </div>
            <h1 data-hero-item>Electronic BOM RFQ Template</h1>
            <p data-hero-item>
              Organize manufacturer, part number, quantity, approved alternates,
              target date, and sourcing notes before sending your BOM for quote.
            </p>
            <div className="bom-hero-actions" data-hero-item>
              <a
                href={DOWNLOAD_PATH}
                className="btn btn-navy btn-lg"
                download="SongGlow-BOM-RFQ-Template.xlsx"
                data-analytics-event="BOM Template Download Clicked"
                data-analytics-location="hero"
              >
                Download Excel Template
              </a>
              <Link
                href="/guides/how-to-prepare-a-bom-for-electronic-component-sourcing"
                className="btn btn-ghost btn-lg"
              >
                Read the BOM Guide
              </Link>
            </div>
            <p className="bom-file-note" data-hero-item>
              Microsoft Excel format · 11 sourcing fields · No account required
            </p>
          </div>

          <div className="bom-fit-card" data-hero-item>
            <div className="eyebrow">Built For RFQs</div>
            <h2>A cleaner BOM produces clearer supplier questions</h2>
            <p>
              The template keeps the requested part, quantity, timing, approved
              alternates, and documentation requirements on the same line. It
              does not represent availability or guarantee that every line can
              be sourced.
            </p>
            <Link href="/bom-sourcing" className="text-link">
              Explore SongGlow BOM sourcing →
            </Link>
          </div>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="eyebrow">Template Columns</div>
            <h2>What to enter in each field</h2>
            <p>
              These are the exact columns included in the downloadable SongGlow
              Excel template.
            </p>
          </div>
          <div className="card catalog-card" data-reveal>
            <div className="catalog-scroll">
              <table className="catalog-table">
                <thead>
                  <tr>
                    <th>Template column</th>
                    <th>What to enter</th>
                    <th>Why it matters</th>
                  </tr>
                </thead>
                <tbody>
                  {TEMPLATE_FIELDS.map(([field, entry, reason]) => (
                    <tr key={field}>
                      <td className="catalog-pn">{field}</td>
                      <td>{entry}</td>
                      <td>{reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="block tight bom-deliverables-section">
        <div className="wrap bom-fit-grid">
          <div className="bom-fit-card" data-reveal>
            <div className="eyebrow">Before You Send It</div>
            <h2>Six checks for a more useful BOM RFQ</h2>
            <p>
              Clear inputs reduce clarification rounds and help potential
              sources quote the same requirement.
            </p>
          </div>
          <ul className="bom-checklist" data-reveal-group>
            {CHECKLIST.map((item) => (
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
            <Faq items={FAQ_ITEMS} heading="BOM RFQ template questions" />
          </div>
          <div className="catalog-cta" data-reveal>
            <h2>Ready to send the completed BOM?</h2>
            <p>
              Attach the Excel file with quantities, target dates, and any
              documentation requirements. We will review it line by line and
              confirm the next steps.
            </p>
            <div className="catalog-cta-row">
              <Link href="/contact?project=bom" className="btn btn-navy btn-lg">
                Send Your BOM
              </Link>
              <a
                href={DOWNLOAD_PATH}
                className="btn btn-ghost btn-lg"
                download="SongGlow-BOM-RFQ-Template.xlsx"
                data-analytics-event="BOM Template Download Clicked"
                data-analytics-location="final-cta"
              >
                Download Template
              </a>
            </div>
          </div>
        </div>
      </section>
    </Animate>
  );
}
