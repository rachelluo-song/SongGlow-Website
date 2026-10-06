import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import JsonLd from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/sample-bom-sourcing-response";

export const metadata: Metadata = {
  title: "Sample BOM Sourcing Response & Quote Format | SongGlow",
  description:
    "See an illustrative SongGlow BOM sourcing response with line-by-line quote options, MOQ, lead time, packaging, documentation notes, and open decisions.",
  alternates: { canonical: PAGE_PATH },
};

const RESPONSE_LINES = [
  {
    line: "01",
    part: "RC0402FR-0710KL",
    quantity: "50,000",
    status: "2 quote options",
    tone: "quoted",
    commercial: "From US$0.0059 / pc",
    timing: "3–6 weeks",
    packaging: "Full reel",
    note: "Exact requested part. Two example routes are compared below.",
    action: "Select one route",
  },
  {
    line: "02",
    part: "ABM8-25.000MHZ-B2-T",
    quantity: "5,000",
    status: "1 suitable quote",
    tone: "quoted",
    commercial: "US$0.4200 / pc",
    timing: "6 weeks",
    packaging: "Tape and reel",
    note: "Exact requested part. Supplier documentation to be reconfirmed with the final quote.",
    action: "Approve or hold",
  },
  {
    line: "03",
    part: "SRP4020TA-2R2M",
    quantity: "2,500",
    status: "Alternate candidate",
    tone: "review",
    commercial: "US$0.5800 / pc",
    timing: "4–5 weeks",
    packaging: "Tape and reel",
    note: "The requested timing was not met in this example. A potential alternate is separated for engineering review.",
    action: "Engineering approval",
  },
  {
    line: "04",
    part: "EEE-FK1J101P",
    quantity: "1,200",
    status: "No suitable quote",
    tone: "open",
    commercial: "—",
    timing: "Open",
    packaging: "Requested: reel",
    note: "No example offer met the requested quantity and timing. SongGlow would keep the line open or revise the search with the customer.",
    action: "Confirm next search",
  },
] as const;

const NEXT_STEPS = [
  {
    num: "01",
    title: "Confirm the selected lines",
    body: "The customer identifies the exact quote route to proceed with and confirms any quantity or timing changes.",
  },
  {
    num: "02",
    title: "Reconfirm supplier terms",
    body: "SongGlow reconfirms the selected quotation, documentation, commercial terms, and lead time before an order is placed.",
  },
  {
    num: "03",
    title: "Coordinate the approved order",
    body: "Only customer-approved parts and routes are coordinated. Alternate candidates are never substituted silently.",
  },
  {
    num: "04",
    title: "Receive, check, and photograph",
    body: "After receipt, SongGlow visually checks external packaging and visible order or label information, then photographs the packaging and labels for the customer.",
  },
] as const;

const pageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}${PAGE_PATH}#webpage`,
  name: "Sample BOM Sourcing Response",
  url: `${SITE_URL}${PAGE_PATH}`,
  description:
    "An illustrative BOM sourcing response showing how SongGlow presents quote options, open questions, and customer decisions line by line.",
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
      name: "Sample BOM Sourcing Response",
      item: `${SITE_URL}${PAGE_PATH}`,
    },
  ],
};

export default function SampleBomSourcingResponsePage() {
  return (
    <Animate>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <header className="sample-response-hero">
        <div className="wrap sample-response-hero-grid">
          <div className="sample-response-hero-copy">
            <div className="eyebrow" data-hero-item>
              Illustrative Procurement Document
            </div>
            <h1 data-hero-item>Sample BOM Sourcing Response</h1>
            <p data-hero-item>
              See how a four-line component request can be returned with clear
              quote options, open questions, and customer decisions—without
              presenting a catalog listing as availability.
            </p>
            <div className="bom-hero-actions" data-hero-item>
              <Link href="/contact?project=bom" className="btn btn-navy btn-lg">
                Send Your BOM
              </Link>
              <Link href="/bom-rfq-template" className="btn btn-ghost btn-lg">
                Download BOM Template
              </Link>
            </div>
            <p className="sample-response-disclosure" data-hero-item>
              All prices, routes, lead times, availability, and company details
              below are fictional examples—not a live quotation.
            </p>
          </div>

          <div className="sample-response-preview" data-hero-item>
            <div className="sample-response-preview-top">
              <span>SG-SAMPLE-001</span>
              <strong>ILLUSTRATIVE</strong>
            </div>
            <div className="sample-response-preview-title">
              <span>Sample response</span>
              <h2>Prototype controller BOM</h2>
            </div>
            <dl className="sample-response-preview-stats">
              <div><dt>Submitted</dt><dd>4 lines</dd></div>
              <div><dt>Quoted</dt><dd>2 lines</dd></div>
              <div><dt>Alternate</dt><dd>1 line</dd></div>
              <div><dt>Open</dt><dd>1 line</dd></div>
            </dl>
            <div className="sample-response-preview-foot">
              <span>Currency: USD</span>
              <span>Quote-to-order</span>
            </div>
          </div>
        </div>
      </header>

      <section className="answer-strip" aria-label="Sample response summary">
        <div className="wrap">
          <p>
            <strong>Direct answer:</strong> A SongGlow BOM sourcing response can
            show each requested part number and quantity, suitable quotation
            options, MOQ, illustrative unit pricing, lead time, packaging,
            available source notes, and the decision needed from the customer.
            It is a sourcing response—not a statement that SongGlow holds stock.
          </p>
        </div>
      </section>

      <section className="block sample-response-section">
        <div className="wrap wrap-wide">
          <div className="sample-response-document" data-reveal>
            <div className="sample-response-document-head">
              <div>
                <span className="sample-response-doc-kicker">BOM sourcing response</span>
                <h2>Example Hardware Team</h2>
                <p>Prototype controller · pilot build</p>
              </div>
              <div className="sample-response-stamp">
                <strong>ILLUSTRATIVE SAMPLE</strong>
                <span>NOT LIVE PRICING</span>
              </div>
            </div>

            <div className="sample-response-summary">
              <div><span>Reference</span><strong>SG-SAMPLE-001</strong></div>
              <div><span>Quote basis</span><strong>Specified MPNs</strong></div>
              <div><span>Requested timing</span><strong>6–8 weeks</strong></div>
              <div><span>Currency</span><strong>USD</strong></div>
            </div>

            <div className="sample-response-table-wrap">
              <table className="sample-response-table">
                <caption className="sr-only">
                  Illustrative line-by-line BOM sourcing response
                </caption>
                <thead>
                  <tr>
                    <th scope="col">Line / request</th>
                    <th scope="col">Example response</th>
                    <th scope="col">Commercial</th>
                    <th scope="col">Source / packaging notes</th>
                    <th scope="col">Customer action</th>
                  </tr>
                </thead>
                <tbody>
                  {RESPONSE_LINES.map((item) => (
                    <tr key={item.line}>
                      <td data-label="Line / request">
                        <span className="sample-response-line">Line {item.line}</span>
                        <strong className="sample-response-part">{item.part}</strong>
                        <small>Requested qty: {item.quantity}</small>
                      </td>
                      <td data-label="Example response">
                        <span className={`sample-response-status ${item.tone}`}>
                          {item.status}
                        </span>
                        <p>{item.note}</p>
                      </td>
                      <td data-label="Commercial">
                        <strong>{item.commercial}</strong>
                        <small>Example lead time: {item.timing}</small>
                      </td>
                      <td data-label="Source / packaging notes">
                        <strong>{item.packaging}</strong>
                        <small>
                          Source and document details are confirmed only with the
                          final supplier quotation.
                        </small>
                      </td>
                      <td data-label="Customer action">
                        <span className="sample-response-action">{item.action}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="sample-response-document-note">
              Fictional commercial values for format demonstration only. They do
              not indicate present availability, supplier commitment, or an offer
              to sell. Actual quotations can change until reconfirmed and approved.
            </p>
          </div>
        </div>
      </section>

      <section className="block sample-response-options-section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="eyebrow">Option Comparison</div>
            <h2>One line can have more than one suitable route</h2>
            <p>
              The response separates commercial tradeoffs so the customer can
              choose. These two Line 01 options are fictional examples.
            </p>
          </div>

          <div className="sample-response-options" data-reveal-group>
            <article className="sample-response-option recommended">
              <div className="sample-response-option-head">
                <span>Example Option A</span>
                <strong>Lower commitment</strong>
              </div>
              <h3>Exact requested part</h3>
              <dl>
                <div><dt>Example source route</dt><dd>Authorized distribution quote</dd></div>
                <div><dt>MOQ</dt><dd>50,000 pcs</dd></div>
                <div><dt>Illustrative price</dt><dd>US$0.0068 / pc</dd></div>
                <div><dt>Example lead time</dt><dd>3–4 weeks</dd></div>
                <div><dt>Packaging</dt><dd>Full reel</dd></div>
              </dl>
              <p>
                Example strength: matches the requested quantity and has the
                shorter stated lead time.
              </p>
            </article>

            <article className="sample-response-option">
              <div className="sample-response-option-head">
                <span>Example Option B</span>
                <strong>Lower unit cost</strong>
              </div>
              <h3>Exact requested part</h3>
              <dl>
                <div><dt>Example source route</dt><dd>Independent-source quote</dd></div>
                <div><dt>MOQ</dt><dd>100,000 pcs</dd></div>
                <div><dt>Illustrative price</dt><dd>US$0.0059 / pc</dd></div>
                <div><dt>Example lead time</dt><dd>5–6 weeks</dd></div>
                <div><dt>Packaging</dt><dd>Full reel</dd></div>
              </dl>
              <p>
                Example tradeoff: lower unit price, but a higher order quantity
                and separate documentation review would be required.
              </p>
            </article>
          </div>

          <p className="sample-response-route-note" data-reveal>
            “Authorized distribution quote” describes an example supplier route;
            it does not mean SongGlow is an authorized distributor. SongGlow does
            not own the illustrated inventory.
          </p>
        </div>
      </section>

      <section className="block sample-response-decisions-section">
        <div className="wrap sample-response-decisions-grid">
          <div className="sample-response-decisions-copy" data-reveal>
            <div className="eyebrow">Open Decisions</div>
            <h2>What the customer would confirm next</h2>
            <p>
              A useful sourcing response makes unanswered questions visible. It
              does not turn assumptions into approvals.
            </p>
          </div>
          <ol className="sample-response-decision-list" data-reveal-group>
            <li><span>01</span><div><strong>Select a route for Line 01</strong><p>Choose the lower commitment or lower illustrative unit-cost example.</p></div></li>
            <li><span>02</span><div><strong>Review the Line 03 candidate</strong><p>Customer engineering must approve any alternate before ordering.</p></div></li>
            <li><span>03</span><div><strong>Set the Line 04 priority</strong><p>Confirm whether timing, quantity, or the exact requested part may change.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="eyebrow">After Customer Approval</div>
            <h2>From selected quote to coordinated order</h2>
          </div>
          <div className="bom-process sample-response-process" data-reveal-group>
            {NEXT_STEPS.map((step) => (
              <article key={step.num} className="bom-step">
                <span className="bom-step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="block sample-response-scope-section">
        <div className="wrap">
          <div className="sample-response-scope" data-reveal>
            <div>
              <div className="eyebrow">Important Scope Notes</div>
              <h2>What this sample does—and does not—represent</h2>
            </div>
            <ul>
              <li>SongGlow is a quote-to-order sourcing service and does not hold inventory.</li>
              <li>Supplier and channel documentation is best-effort and varies by source and part.</li>
              <li>Not every BOM line or requested delivery date can be sourced.</li>
              <li>Potential alternates require customer engineering review and written approval.</li>
              <li>
                Receiving work is limited to a visual check of external packaging
                and visible order or label information, plus photographs. It is
                not laboratory authentication or electrical testing.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="band-dark bom-final-cta" data-reveal>
            <div>
              <div className="eyebrow">Your BOM, Your Requirements</div>
              <h2>Send the real list when you are ready.</h2>
              <p>
                Include part numbers, quantities, target dates, and approved
                alternates where available.
              </p>
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
