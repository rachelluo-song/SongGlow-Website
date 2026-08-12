import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import Faq, { type FaqItem } from "@/components/faq";
import JsonLd from "@/components/json-ld";
import GuideReview, {
  GUIDE_REVIEW_DATE,
  reviewedBySchema,
} from "@/components/guide-review";
import { GuideResources, QuickAnswer } from "@/components/guide-support";
import { SITE_BRAND_IMAGE, SITE_URL } from "@/lib/site";

const PAGE_PATH =
  "/guides/how-to-prepare-a-bom-for-electronic-component-sourcing";
const PAGE_TITLE = "How to Prepare a BOM for Electronic Component Sourcing";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} | SongGlow`,
  description:
    "Learn how to prepare an electronic BOM for RFQ with correct manufacturer part numbers, quantities, approved alternates, target dates, and sourcing notes.",
  alternates: { canonical: PAGE_PATH },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: PAGE_TITLE,
  description:
    "A practical line-by-line guide to preparing an electronic bill of materials for supplier search and quotation.",
  url: `${SITE_URL}${PAGE_PATH}`,
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${PAGE_PATH}` },
  image: [SITE_BRAND_IMAGE],
  datePublished: "2026-08-11T00:00:00Z",
  dateModified: GUIDE_REVIEW_DATE,
  author: { "@id": `${SITE_URL}/#organization` },
  reviewedBy: reviewedBySchema,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Guides",
      item: `${SITE_URL}/guides`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: PAGE_TITLE,
      item: `${SITE_URL}${PAGE_PATH}`,
    },
  ],
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What are the minimum fields required for an electronic BOM RFQ?",
    answer:
      "For each line, provide the complete manufacturer part number, manufacturer, and requested quantity. A description, target date, reference designator, approved alternates, and sourcing notes make the request more accurate and reduce clarification time.",
  },
  {
    question: "Should I include internal company part numbers?",
    answer:
      "You may include them for your own reference, but an internal part number should not replace the manufacturer part number. Potential suppliers need the original manufacturer and complete manufacturer part number unless the item is defined by a drawing or specification.",
  },
  {
    question: "Can I write 'or equivalent' in the BOM?",
    answer:
      "It is better to identify already approved alternate manufacturers and part numbers. If you want new alternate research, state that separately. SongGlow presents potential alternates for customer engineering review and never treats them as approved substitutions automatically.",
  },
  {
    question: "What should I write in the BOM notes column?",
    answer:
      "Use notes for packaging, date-code, lot, documentation, channel, labeling, delivery, or other line-specific requirements. SongGlow asks potential sources and confirms what can be provided for each quotation; documentation is not guaranteed for every line.",
  },
  {
    question: "Does a complete BOM mean every item can be sourced?",
    answer:
      "No. A well-prepared BOM improves search accuracy, but some lines may still be obsolete, constrained, incomplete, or unavailable in the requested quantity and timing. Open questions and suitable quote options should be reported line by line.",
  },
];

export default function PrepareBomGuidePage() {
  return (
    <Animate>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />

      <header className="page-hero">
        <div className="wrap">
          <div className="breadcrumb" data-hero-item>
            <Link href="/guides">Guides</Link>
            <span aria-hidden> / </span>
            Preparing a BOM
          </div>
          <h1 data-hero-item>{PAGE_TITLE}</h1>
          <p data-hero-item>
            A clean sourcing BOM tells every potential source exactly which
            part, quantity, timing, and approved options the customer needs.
          </p>
          <GuideReview />
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <div className="article" data-reveal>
            <QuickAnswer>
              Put one purchasable part on each row. Include the manufacturer,
              complete manufacturer part number, requested quantity, target
              date, approved alternates, and any documentation or packaging
              requirements that affect the quotation.
            </QuickAnswer>

            <p>
              A bill of materials created for engineering is not always ready
              for sourcing. Internal codes, shortened part numbers, missing
              quantities, and undefined alternate rules can force every supplier
              to interpret the request differently. That makes quotations slower
              and harder to compare.
            </p>
            <p>
              A sourcing-ready BOM does not need to be complicated. It needs to
              make the commercial requirement unambiguous, line by line.
            </p>

            <h2>1. Use one row for each purchasable part</h2>
            <p>
              Do not combine several manufacturer part numbers or different
              requested quantities in one cell. Each row should describe one
              part that can be quoted, approved, ordered, and tracked separately.
              Reference designators such as C1–C8 or R12 can remain grouped when
              they use the same part number.
            </p>

            <h2>2. Separate manufacturer from manufacturer part number</h2>
            <p>
              The manufacturer is the company that makes the part. The
              manufacturer part number is the company&apos;s complete ordering
              code. A distributor name, customer vendor code, or internal ERP
              number is not a substitute for either field.
            </p>
            <p>
              Keep every suffix that identifies package, temperature range,
              voltage, tolerance, reel quantity, finish, or qualification.
              Removing a suffix can turn one exact sourcing request into several
              possible parts.
            </p>

            <h2>3. State the requested quantity for the RFQ</h2>
            <p>
              The quantity should describe what you want quoted now. If annual
              usage, prototype quantity, and production quantity all matter,
              label them separately instead of placing three unexplained numbers
              in one cell. Quantity affects price breaks, packaging, minimum
              order conditions, and which sources can respond.
            </p>

            <h2>4. Add a realistic target date</h2>
            <p>
              Use a consistent date format such as YYYY-MM-DD. A target date
              helps compare lead time with the production requirement; it does
              not create a guaranteed delivery promise. If different lines have
              different priorities, give each line its own date or priority note.
            </p>

            <h2>5. Distinguish approved alternates from alternate research</h2>
            <p>
              If engineering has already approved another manufacturer and part
              number, list that exact pair in the alternate columns. If no
              alternate has been approved but you want candidates researched,
              say so in the notes. A possible form-fit-function candidate is not
              an approved substitute until your engineering team validates it.
            </p>
            <p>
              Category-specific parameters still matter. For example, an{" "}
              <Link href="/components/aluminum-electrolytic-capacitors">
                aluminum electrolytic capacitor
              </Link>
              , a <Link href="/components/tvs-diodes">TVS diode</Link>, and a{" "}
              <Link href="/components/crystals">quartz crystal</Link> each need
              different electrical and package checks before an alternate can be
              approved.
            </p>

            <h2>6. Put sourcing constraints in the notes</h2>
            <p>
              Use the notes column for requirements that affect whether a quote
              is acceptable: packaging, lot or date-code limits, certificates,
              channel requirements, labeling, delivery instructions, or whether
              partial line coverage is useful. Requirements stated after the
              quote can change both source options and price.
            </p>
            <p>
              Source documentation varies by supplier and part. Ask for what the
              project needs, but treat it as something to confirm for the
              specific quotation rather than something guaranteed for every BOM
              line.
            </p>

            <h2>7. Attach drawings when the part number is not enough</h2>
            <p>
              Mechanical hardware, custom items, cables, springs, gaskets, and
              assemblies may need a drawing or specification. Include material,
              finish, dimensions, tolerances, revision, and any applicable
              standard. Make sure the drawing revision matches the BOM revision.
            </p>

            <h2>8. Run a final line-by-line check</h2>
            <ul>
              <li>Every requested line has a quantity.</li>
              <li>Manufacturer and manufacturer part number are separate.</li>
              <li>Part-number suffixes have not been shortened.</li>
              <li>Approved alternates are paired correctly.</li>
              <li>Target dates use one consistent format.</li>
              <li>Documentation and packaging requirements are stated upfront.</li>
              <li>Required drawings and specifications are attached.</li>
            </ul>

            <div className="article-callout">
              <h3>Start with the free SongGlow template</h3>
              <p>
                The Excel file includes the 11 fields used in this guide. Review
                the column explanations and download it from the{" "}
                <Link href="/bom-rfq-template">BOM RFQ template page</Link>.
              </p>
            </div>

            <Faq items={FAQ_ITEMS} heading="Preparing a sourcing BOM" />
            <GuideResources currentSlug="how-to-prepare-a-bom-for-electronic-component-sourcing" />
          </div>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="catalog-cta" data-reveal>
            <h2>Ready for a line-by-line BOM review?</h2>
            <p>
              Send your Excel, CSV, PDF, or ERP export with the requested
              quantities and target dates. SongGlow will review the requirement,
              search suitable sources, and confirm the next steps.
            </p>
            <div className="catalog-cta-row">
              <Link href="/contact?project=bom" className="btn btn-navy btn-lg">
                Send Your BOM
              </Link>
              <Link href="/bom-rfq-template" className="btn btn-ghost btn-lg">
                Download the Template
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Animate>
  );
}
