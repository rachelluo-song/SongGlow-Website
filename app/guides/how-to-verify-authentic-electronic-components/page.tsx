import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import JsonLd from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/guides/how-to-verify-authentic-electronic-components";
const PAGE_TITLE = "How to Verify Electronic Components Are Authentic";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} — SongGlow`,
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
  datePublished: "2026-07-20",
  author: { "@type": "Organization", name: "SongGlow", url: SITE_URL },
  publisher: { "@type": "Organization", name: "SongGlow", url: SITE_URL },
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
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <div className="article" data-reveal>
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
              Provenance beats inspection. A part with an unbroken paper trail
              back to the manufacturer rarely needs a lab; a part with no
              history can pass every visual check and still fail in the field.
            </p>
            <ul>
              <li>
                <strong>Authorized (franchised) distributors first.</strong>{" "}
                Parts flow directly from the manufacturer with full warranty.
                For anything safety-critical, this is the only channel worth
                using.
              </li>
              <li>
                <strong>Vetted independents for the rest.</strong> When a part
                is obsolete or on allocation, the open market is legitimate,
                but the supplier must be able to document who they bought from,
                and should work to a counterfeit-avoidance standard such as{" "}
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
                <strong>Traceability chain</strong> listing every company the
                parts passed through. &quot;We can&apos;t disclose our
                source&quot; is a red flag, not a trade secret.
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
                <li>No traceability, or a supplier who won&apos;t name their source</li>
                <li>Mixed or implausible date codes within one lot</li>
                <li>Refusal to allow inspection or testing before payment</li>
                <li>Photos that don&apos;t match the actual stock, or reluctance to send any</li>
              </ul>
            </div>

            <h2>How SongGlow handles authenticity</h2>
            <p>
              Every part we supply is sourced through qualified suppliers with
              full supply-chain traceability. Documentation follows the parts,
              date and lot codes are verified against the paperwork, and
              suspect stock never re-enters the market through us. If a line
              on your BOM can only be found on the open market, we&apos;d
              rather tell you the risk honestly than ship you a question mark.
            </p>
          </div>

          <div className="catalog-cta" data-reveal>
            <h2>Sourcing a hard-to-find part?</h2>
            <p>
              Send us the part number and we&apos;ll quote it within 24 hours,
              100% authentic with full traceability.
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
