import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import JsonLd from "@/components/json-ld";
import Faq, { type FaqItem } from "@/components/faq";
import GuideReview, { GUIDE_REVIEW_DATE, reviewedBySchema } from "@/components/guide-review";
import { GuideResources, QuickAnswer } from "@/components/guide-support";
import { SITE_BRAND_IMAGE, SITE_URL } from "@/lib/site";

const PAGE_PATH = "/guides/how-to-verify-authentic-electronic-components";
const PAGE_TITLE = "How to Verify Electronic Components Are Authentic";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} - SongGlow`,
  description:
    "A practical counterfeit-detection guide for buyers and engineers: sourcing rules, documentation to demand, package and marking inspection, lab tests, and the red flags that should stop a purchase.",
  alternates: { canonical: PAGE_PATH },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: PAGE_TITLE,
  description:
    "A practical counterfeit-detection guide for electronics buyers and engineers.",
  url: `${SITE_URL}${PAGE_PATH}`,
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${PAGE_PATH}` },
  image: [SITE_BRAND_IMAGE],
  datePublished: "2026-07-20T00:00:00Z",
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
      name: PAGE_TITLE,
      item: `${SITE_URL}${PAGE_PATH}`,
    },
  ],
};

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How can I tell if an electronic component is counterfeit?",
    answer:
      "Start with provenance, not the part. A component with an unbroken paper trail back to the manufacturer rarely needs a lab, while a part with no history can pass a visual check and still fail in the field. From there, inspect the packaging and labels, check that date and lot codes agree across paperwork and markings, look for resurfaced or blacktopped surfaces, and confirm the markings survive a solvent wipe. Escalate to X-ray or decapsulation only when the value or risk justifies it.",
  },
  {
    question: "What documentation should I demand before parts ship?",
    answer:
      "Ask what is available for the specific part and channel: a Certificate of Conformance where applicable, manufacturer and part-number details, quantities, lot or date codes, order-level records, and actual-stock photos when available. Date and lot codes should be consistent across the available paperwork, labels, and part markings. Confidential upstream identities and commercial terms may remain protected.",
  },
  {
    question: "Is it safe to buy from independent distributors?",
    answer:
      "Yes, when the part is obsolete, allocated, or long-lead and the independent uses appropriate counterfeit-avoidance controls, maintains suitable order records, and communicates the channel risk. For safety-critical applications, an authorized or manufacturer-backed channel is strongly preferred.",
  },
  {
    question: "What are the biggest red flags of a counterfeit part?",
    answer:
      "A price far below every other quote for a scarce part, no explanation of the sourcing channel or appropriate order records, mixed or implausible date codes within one lot, refusal to discuss an appropriate inspection scope, and photos that do not match the actual stock. Any one of these deserves further review before purchase.",
  },
];

export default function AuthenticityGuidePage() {
  return (
    <Animate>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <header className="page-hero">
        <div className="wrap">
          <div className="breadcrumb" data-hero-item>
            <Link href="/">Home</Link>
            <span aria-hidden> / </span>
            Guides
          </div>
          <h1 data-hero-item>{PAGE_TITLE}</h1>
          <p data-hero-item>
            Counterfeit parts follow shortages. Here&apos;s how experienced
            buyers keep them off the line, and how to check the parts already
            on your bench.
          </p>
          <GuideReview />
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <div className="article" data-reveal>
            <QuickAnswer>
              Verify provenance first, then compare documentation, packaging,
              date and lot codes, and part markings. Escalate to electrical,
              X-ray, or destructive testing only when the source risk or
              application justifies it.
            </QuickAnswer>
            <p>
              Counterfeit electronic components show up wherever demand outruns
              supply: allocation crunches, end-of-life parts, and long-lead
              items that a production schedule can&apos;t wait for. That&apos;s
              exactly when buyers are pushed off the authorized channel and
              into the open market, and when a too-good-to-be-true offer is
              most tempting. The failure modes range from a line-down event at
              incoming inspection to field failures months later, which is why
              counterfeit avoidance is a process, not a single test.
            </p>
            <p>
              This guide covers the five layers of that process, from cheapest
              to most involved. Most counterfeits are caught by the first
              three.
            </p>

            <h2>1. Control where the part comes from</h2>
            <p>
              Provenance beats inspection. A documented manufacturer-backed
              channel offers the clearest starting point. Open-market parts need
              a review scope that reflects the component, channel, and
              application risk because a visual check alone cannot prove every
              internal characteristic.
            </p>
            <ul>
              <li>
                <strong>Authorized (franchised) distributors first.</strong>{" "}
                Parts flow through a manufacturer-backed channel with the
                applicable channel documentation and warranty terms. This route
                is strongly preferred for safety-critical applications.
              </li>
              <li>
                <strong>Vetted independents for the rest.</strong> When a part
                is obsolete or on allocation, the open market is legitimate,
                but the supplier should explain the channel type, keep suitable
                order records, and work to a counterfeit-avoidance standard such as{" "}
                <strong>AS6081</strong> (distributors) aligned with{" "}
                <strong>AS5553</strong> (OEM programs).
              </li>
              <li>
                <strong>Ask how the supplier handles suspect parts.</strong> A
                serious independent quarantines and reports them (for example
                through industry databases like ERAI) rather than returning
                them to the market.
              </li>
            </ul>

            <h2>2. Demand documentation before the parts ship</h2>
            <ul>
              <li>
                <strong>Certificate of Conformance</strong> naming the
                manufacturer, part number, quantity, and date/lot codes.
              </li>
              <li>
                <strong>Order-level traceability</strong> appropriate to the
                part and channel. Upstream supplier identities, invoices,
                prices, and other commercial terms may remain confidential.
              </li>
              <li>
                <strong>Consistent codes.</strong> Date and lot codes on the
                paperwork, labels, and part markings should agree, and the date
                code should be plausible for the part&apos;s production life.
              </li>
            </ul>

            <h2>3. Inspect the packaging</h2>
            <p>
              Counterfeiters copy parts more carefully than they copy
              logistics. Look at the outside first:
            </p>
            <ul>
              <li>
                Moisture-sensitive devices should arrive in intact
                moisture-barrier bags with desiccant and a humidity indicator
                card, not loose in a zip-lock.
              </li>
              <li>
                Labels should match the manufacturer&apos;s current format
                (fonts, logos, barcode style), with no typos, no re-taped
                seals, and no labels layered over older labels.
              </li>
              <li>
                Reels, trays, and tubes should be the factory&apos;s own, with
                uniform orientation and no mixed date codes inside one reel.
              </li>
            </ul>

            <h2>4. Inspect the parts themselves</h2>
            <ul>
              <li>
                <strong>Surface texture:</strong>{" "}remarked parts are often
                &quot;blacktopped,&quot; meaning resurfaced and reprinted. Look for
                sanding marks, a texture different from the underside, or
                filled-in mold cavities and pin-1 indicators.
              </li>
              <li>
                <strong>Marking permanence:</strong> genuine laser or ink
                markings survive a solvent wipe (acetone). Marking that
                smears, or reveals a different part number underneath, ends
                the inspection.
              </li>
              <li>
                <strong>Leads and terminations:</strong> parts sold as new
                should not show solder residue, scratched or oxidized leads,
                or bent pins. These are classic signs of harvested or
                refurbished stock.
              </li>
              <li>
                <strong>Dimensions:</strong>{" "}measure body size, lead pitch,
                and thickness against the datasheet&apos;s package drawing.
                Wrong-size dies get remarked into bigger part numbers more
                often than you&apos;d think.
              </li>
            </ul>

            <h2>5. Escalate to testing when the stakes justify it</h2>
            <p>
              For high-value or high-consequence lots, third-party labs can go
              further: <strong>X-ray</strong> to compare die size and wire
              bonding across samples, <strong>XRF</strong> to verify lead
              finish and RoHS claims, <strong>decapsulation</strong> to read
              the die markings directly, plus solderability and electrical
              curve-trace testing against a known-good golden sample. None of
              this is exotic. A reputable independent distributor will either
              provide it or arrange it before you commit.
            </p>

            <div className="article-callout">
              <h3>Red flags that should stop a purchase</h3>
              <ul>
                <li>A price far below every other quote for a scarce part</li>
                <li>No channel explanation or appropriate order-level records</li>
                <li>Mixed or implausible date codes within one lot</li>
                <li>Refusal to discuss an appropriate inspection scope</li>
                <li>Photos that don&apos;t match the actual stock, or reluctance to send any</li>
              </ul>
            </div>

            <h2>How SongGlow handles authenticity</h2>
            <p>
              Every part we supply is sourced through qualified suppliers with
              an organized order-level record. We review available packaging,
              labels, markings, and, when applicable, accessible dimensions.
              Available lot or date-code details stay with the order while
              confidential supplier identities and commercial terms remain
              protected. If a line carries additional sourcing risk, we&apos;d
              rather explain the relevant considerations than overstate the
              review performed.
            </p>

            <GuideResources currentSlug="how-to-verify-authentic-electronic-components" />
            <Faq items={FAQ_ITEMS} />
          </div>

          <div className="catalog-cta" data-reveal>
            <h2>Sourcing a hard-to-find part?</h2>
            <p>
              Send us the part number and we&apos;ll quote it within 24 hours,
              with 100% authentic parts and the available order-level
              traceability confirmed for the quote.
            </p>
            <div className="catalog-cta-row">
              <Link href="/contact" className="btn btn-navy btn-lg">
                Request a quote
              </Link>
              <Link href="/services" className="btn btn-ghost btn-lg">
                Our sourcing services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Animate>
  );
}
