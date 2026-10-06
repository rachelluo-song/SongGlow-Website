import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import JsonLd from "@/components/json-ld";
import PrintChecklistButton from "@/components/print-checklist-button";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/bom-quote-comparison-checklist";

export const metadata: Metadata = {
  title: "BOM Quote Comparison Checklist for Component Buyers | SongGlow",
  description:
    "Use this printable checklist to compare electronic component BOM quotations by part number, quantity, MOQ, lead time, packaging, source route, documentation, alternates, and total cost.",
  alternates: { canonical: PAGE_PATH },
};

const CHECKS = [
  {
    num: "01",
    title: "Part identity",
    question: "Does the quote show the complete manufacturer part number, including every suffix?",
    record: "Manufacturer, exact MPN, package, grade, and any customer-approved deviation.",
  },
  {
    num: "02",
    title: "Quantity coverage",
    question: "Does the offered quantity cover the requested quantity, or is the shortage clearly shown?",
    record: "Requested quantity, quoted quantity, split quantity, and any balance still open.",
  },
  {
    num: "03",
    title: "MOQ and order value",
    question: "Is a low unit price tied to a larger minimum order than the project needs?",
    record: "MOQ, order multiple, quoted unit price, line total, and excess quantity.",
  },
  {
    num: "04",
    title: "Lead-time basis",
    question: "Is the timing stated as ready-to-ship, supplier lead time, or an estimate?",
    record: "Lead time, quote date, expected ship date, and the event that starts the clock.",
  },
  {
    num: "05",
    title: "Packaging",
    question: "Does the packaging suit production and match the quantity being quoted?",
    record: "Reel, tray, tube, cut tape, bulk, factory packaging, and packing quantity.",
  },
  {
    num: "06",
    title: "Source route",
    question: "Is the channel type and its relevant limitation clear enough for the customer to decide?",
    record: "Manufacturer, authorized distribution, independent source, or another stated route.",
  },
  {
    num: "07",
    title: "Available documentation",
    question: "Which requested records can the supplier actually provide for this part and order?",
    record: "Available invoice, channel, lot, date-code, certificate, or other order documentation.",
  },
  {
    num: "08",
    title: "Date code and lot",
    question: "Are date-code, lot-consistency, labeling, or compliance requirements written into the quote?",
    record: "Required range, offered information, exceptions, and what remains to be confirmed.",
  },
  {
    num: "09",
    title: "Alternate control",
    question: "Is every alternate separated from the requested part and held for engineering approval?",
    record: "Candidate MPN, comparison basis, unresolved differences, and approval status.",
  },
  {
    num: "10",
    title: "Commercial completeness",
    question: "Can the buyer calculate the real landed decision instead of comparing unit price alone?",
    record: "Currency, validity, payment terms, freight, taxes, Incoterm, and open conditions.",
  },
] as const;

const WORKSHEET_ROWS = [
  "Quotation reference",
  "Exact requested part or alternate",
  "Quantity covered",
  "Unit price and line total",
  "MOQ / order multiple",
  "Lead time and timing basis",
  "Packaging",
  "Source-route note",
  "Documentation confirmed",
  "Freight, tax, and Incoterm",
  "Quote validity",
  "Open questions / customer action",
] as const;

const RED_FLAGS = [
  "A shortened or changed part number with no explanation",
  "Availability stated without quantity, timing basis, or quote validity",
  "A lower unit price that requires an unmentioned excess quantity",
  "An alternate placed on the quote as though it were the requested part",
  "Documentation described as guaranteed without confirming the supplier and part",
  "Inspection or authenticity claims with no stated method, scope, or report",
] as const;

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}${PAGE_PATH}#webpage`,
  name: "BOM Quote Comparison Checklist",
  url: `${SITE_URL}${PAGE_PATH}`,
  description:
    "A printable checklist for comparing electronic component quotations line by line.",
  publisher: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/bom-sourcing#service` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "BOM Sourcing",
      item: `${SITE_URL}/bom-sourcing`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "BOM Quote Comparison Checklist",
      item: `${SITE_URL}${PAGE_PATH}`,
    },
  ],
};

export default function BomQuoteComparisonChecklistPage() {
  return (
    <Animate>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <header className="quote-checklist-hero">
        <div className="wrap quote-checklist-hero-grid">
          <div className="quote-checklist-hero-copy">
            <div className="eyebrow" data-hero-item>
              Printable Buyer Tool
            </div>
            <h1 data-hero-item>BOM Quote Comparison Checklist</h1>
            <p data-hero-item>
              Compare electronic component quotations line by line—before a low
              unit price hides the wrong part, excess quantity, uncertain timing,
              or an unapproved substitution.
            </p>
            <div className="bom-hero-actions quote-checklist-actions" data-hero-item>
              <PrintChecklistButton />
              <Link
                href="/sample-bom-sourcing-response"
                className="btn btn-ghost btn-lg"
              >
                View Sample Response
              </Link>
            </div>
            <p className="quote-checklist-print-note" data-hero-item>
              No account required · Print directly or choose “Save as PDF” in
              your browser’s print dialog.
            </p>
          </div>

          <div className="quote-checklist-hero-card" data-hero-item>
            <span className="quote-checklist-card-kicker">Decision order</span>
            <ol>
              <li><span>1</span><div><strong>Correct identity</strong><small>Exact requested MPN or approved alternate</small></div></li>
              <li><span>2</span><div><strong>Quantity and timing</strong><small>Enough parts on a usable schedule</small></div></li>
              <li><span>3</span><div><strong>Source conditions</strong><small>Packaging, route, and available documents</small></div></li>
              <li><span>4</span><div><strong>Total commercial fit</strong><small>MOQ, landed value, validity, and terms</small></div></li>
            </ol>
            <p>The cheapest unit price is not automatically the best quotation.</p>
          </div>
        </div>
      </header>

      <section className="answer-strip" aria-label="BOM quote comparison summary">
        <div className="wrap">
          <p>
            <strong>Direct answer:</strong> To compare BOM sourcing quotations,
            first confirm the exact part number and quantity coverage. Then
            compare MOQ, total order value, timing basis, packaging, source
            route, available documentation, alternate approval, freight, terms,
            and quote validity. Do not choose on unit price alone.
          </p>
        </div>
      </section>

      <section className="block quote-checklist-main">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="eyebrow">Ten Checks</div>
            <h2>What should a component quotation include?</h2>
            <p>
              Use one copy per important BOM line, or work through the checklist
              once for each supplier option being considered.
            </p>
          </div>

          <div className="quote-checklist-list" data-reveal-group>
            {CHECKS.map((item) => (
              <article key={item.num} className="quote-checklist-item">
                <div className="quote-checklist-item-number">{item.num}</div>
                <div className="quote-checklist-item-copy">
                  <h3>{item.title}</h3>
                  <p>{item.question}</p>
                  <small><strong>Record:</strong> {item.record}</small>
                </div>
                <label className="quote-checklist-box">
                  <input type="checkbox" aria-label={`${item.title} checked`} />
                  <span>Checked</span>
                </label>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="block quote-checklist-worksheet-section">
        <div className="wrap wrap-wide">
          <div className="section-head" data-reveal>
            <div className="eyebrow">Comparison Worksheet</div>
            <h2>Put three supplier options on the same page</h2>
            <p>
              Leave a field blank only when it is genuinely not applicable. Mark
              unknown information as open rather than treating it as confirmed.
            </p>
          </div>

          <div className="quote-checklist-worksheet-wrap" data-reveal>
            <table className="quote-checklist-worksheet">
              <caption className="sr-only">
                Blank worksheet for comparing three component sourcing quotations
              </caption>
              <thead>
                <tr>
                  <th scope="col">Comparison field</th>
                  <th scope="col">Option A</th>
                  <th scope="col">Option B</th>
                  <th scope="col">Option C</th>
                </tr>
              </thead>
              <tbody>
                {WORKSHEET_ROWS.map((row) => (
                  <tr key={row}>
                    <th scope="row">{row}</th>
                    <td><span className="quote-checklist-write-line" /></td>
                    <td><span className="quote-checklist-write-line" /></td>
                    <td><span className="quote-checklist-write-line" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="block quote-checklist-decide-section">
        <div className="wrap quote-checklist-decide-grid">
          <div className="quote-checklist-decision-card" data-reveal>
            <div className="eyebrow">Decision Rule</div>
            <h2>Reject uncertainty before optimizing price.</h2>
            <p>
              A commercially attractive quote still needs the correct part,
              sufficient quantity, usable timing, acceptable source conditions,
              and customer approval. Compare price after those conditions are
              visible.
            </p>
            <Link href="/sample-bom-sourcing-response" className="text-link">
              See the rule applied to a sample response →
            </Link>
          </div>

          <div className="quote-checklist-red-flags" data-reveal>
            <div className="eyebrow">Pause Before Approval</div>
            <h2>Six quotation red flags</h2>
            <ul>
              {RED_FLAGS.map((flag) => (
                <li key={flag}><span>!</span>{flag}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="block quote-checklist-scope-section">
        <div className="wrap">
          <div className="quote-checklist-scope" data-reveal>
            <div>
              <div className="eyebrow">How SongGlow Uses This</div>
              <h2>A comparison framework, not a stock promise</h2>
            </div>
            <div>
              <p>
                SongGlow receives the customer’s specified part numbers and
                quantities, searches potential sources, compares suitable
                quotations, and coordinates only the customer-approved order.
                SongGlow does not hold inventory or guarantee every BOM line can
                be sourced.
              </p>
              <p>
                Source documentation varies by supplier and part. After receipt,
                SongGlow visually checks external packaging condition and visible
                order or label information, then photographs the packaging and
                labels. This is not laboratory authentication or electrical testing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="block tight quote-checklist-final">
        <div className="wrap">
          <div className="band-dark bom-final-cta" data-reveal>
            <div>
              <div className="eyebrow">Need a Line-by-Line Response?</div>
              <h2>Send the BOM and requested quantities.</h2>
              <p>We will organize suitable options and open questions for review.</p>
            </div>
            <Link href="/contact?project=bom" className="btn btn-clay btn-lg">
              Request a BOM Review
            </Link>
          </div>
        </div>
      </section>
    </Animate>
  );
}
