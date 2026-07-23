import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import JsonLd from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/guides/how-to-find-component-alternates";
const PAGE_TITLE =
  "How to Find Alternates and Cross-References for Electronic Components";
const AUTH_GUIDE = "/guides/how-to-verify-authentic-electronic-components";
const OBSOLETE_GUIDE = "/guides/how-to-source-obsolete-electronic-components";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} - SongGlow`,
  description:
    "A practical guide to finding and qualifying alternate electronic components: form-fit-function substitutes, cross-referencing, the datasheet parameters that actually matter, and how to second-source safely.",
  alternates: { canonical: PAGE_PATH },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: PAGE_TITLE,
  description:
    "A practical guide to finding and qualifying alternate and cross-reference electronic components.",
  url: `${SITE_URL}${PAGE_PATH}`,
  datePublished: "2026-07-22",
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

export default function AlternatesGuidePage() {
  return (
    <Animate>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <header className="page-hero">
        <div className="wrap">
          <div className="breadcrumb" data-hero-item>
            <Link href="/guides">Guides</Link>
            <span aria-hidden> / </span>
            Component Alternates
          </div>
          <h1 data-hero-item>{PAGE_TITLE}</h1>
          <p data-hero-item>
            When a part goes scarce, pricey, or obsolete, a qualified alternate
            keeps the line moving. Here&apos;s how to find one you can actually
            trust to drop in.
          </p>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <div className="article" data-reveal>
            <p>
              Sooner or later a part on your BOM becomes a problem. It lands on
              allocation with a 40-week lead time, the price doubles, it goes{" "}
              <Link href={OBSOLETE_GUIDE}>end-of-life</Link>, or you realize your
              whole build hangs on one supplier. The answer to all four is the
              same: a qualified alternate. Cross-referencing is the discipline of
              finding a substitute part you can trust to drop in without a nasty
              surprise later.
            </p>
            <p>
              Done well, it protects both your schedule and your cost. Done
              carelessly, it trades one problem for a worse one: a
              &quot;compatible&quot; part that behaves differently once it&apos;s
              in the field. Here&apos;s how to do it well.
            </p>

            <h2>1. Know what kind of substitute you&apos;re after</h2>
            <p>
              Not every alternate is equal. There are three tiers, in increasing
              order of effort to adopt:
            </p>
            <ul>
              <li>
                <strong>Direct (drop-in) replacement.</strong> The
                manufacturer&apos;s own recommended replacement, or an identical
                part from the same family. Lowest risk.
              </li>
              <li>
                <strong>Form-fit-function (FFF) alternate.</strong> A different
                part number, often from a different manufacturer, that matches
                the footprint, electrical behavior, and environmental ratings
                closely enough to drop in with no board change. This is the
                workhorse of second-sourcing.
              </li>
              <li>
                <strong>Functional equivalent.</strong> Does the same job but
                needs a layout, thermal, or firmware change to use. More work,
                but sometimes the only path.
              </li>
            </ul>

            <h2>2. Start with the manufacturer</h2>
            <ul>
              <li>
                When a part is discontinued, the discontinuance notice usually
                names a recommended replacement. Start there.
              </li>
              <li>
                Most manufacturers publish cross-reference guides mapping their
                parts to competitors&apos; equivalents. They&apos;re useful, but
                written to win the socket, so treat them as candidates and
                verify.
              </li>
            </ul>

            <h2>3. Use cross-reference tools, then verify</h2>
            <p>
              Distributor parametric search and cross-reference databases surface
              candidates fast by matching on parameters. They&apos;re a great
              starting point and a terrible finishing point. A parametric match
              on the headline spec tells you a part is worth a look, not that
              it&apos;s qualified. Every hit is a candidate until the datasheet
              says otherwise.
            </p>

            <h2>4. Read the datasheet like a skeptic</h2>
            <p>
              This is where alternates are won or lost. Two parts can look
              equivalent on a search page and behave differently in your circuit.
              The parameters that bite:
            </p>
            <ul>
              <li>
                <strong>Electrical.</strong> Voltage and current ratings,
                tolerance, temperature coefficient, timing and speed. Match the
                full envelope, not just the nominal value.
              </li>
              <li>
                <strong>Package and pinout.</strong> The same package name
                doesn&apos;t guarantee the same pinout. Check pitch, thermal pad,
                and orientation before assuming it drops in.
              </li>
              <li>
                <strong>Temperature grade.</strong> Commercial, industrial, and
                automotive (AEC-Q) grades are not interchangeable on a product
                that has to meet the higher one.
              </li>
              <li>
                <strong>Compliance and process fit.</strong> RoHS/REACH status,
                and the moisture sensitivity level (MSL) your reflow profile can
                handle.
              </li>
              <li>
                <strong>The subtle ones.</strong> Same nominal rating, different
                real behavior. An MLCC&apos;s effective capacitance drops under
                DC bias, two electrolytics with the same value can have very
                different ESR, and transistors in the same family vary in gain.
                These are exactly where &quot;drop-in&quot; alternates cause
                field failures.
              </li>
            </ul>

            <div className="article-callout">
              <h3>Common cross-referencing mistakes</h3>
              <ul>
                <li>
                  Matching on the headline parameter and missing package,
                  pinout, or temperature grade
                </li>
                <li>
                  Trusting a tool&apos;s &quot;equivalent&quot; label without
                  opening the datasheet
                </li>
                <li>
                  Ignoring real-world behavior (DC bias, ESR, thermal derating)
                  that only shows up in the application
                </li>
                <li>
                  Skipping re-qualification on a regulated or safety-critical
                  product
                </li>
              </ul>
            </div>

            <h2>5. Qualify before you commit</h2>
            <ul>
              <li>
                Buy samples and test in your actual application, not just on
                paper.
              </li>
              <li>
                For regulated, automotive, medical, or safety-critical products,
                an alternate needs formal re-qualification and sign-off. Budget
                the engineering time up front.
              </li>
              <li>
                Once it passes, document it on your approved vendor list so the
                next shortage is a purchasing decision, not an engineering
                project.
              </li>
            </ul>

            <h2>6. Don&apos;t drop your guard on authenticity</h2>
            <p>
              Alternates often come from a new supplier or the open market,
              especially when the original is constrained. A different source
              carries the same counterfeit risk as any open-market buy, so verify
              provenance before you commit. Our companion guide covers exactly
              how:{" "}
              <Link href={AUTH_GUIDE}>
                how to verify electronic components are authentic
              </Link>
              .
            </p>

            <h2>7. Build a second source before you need one</h2>
            <p>
              The best time to qualify an alternate is when nothing is on fire. A
              little groundwork turns the next shortage into a non-event:
            </p>
            <ul>
              <li>
                Identify the single-sourced and long-lead parts on your BOM now.
              </li>
              <li>
                Qualify a form-fit-function alternate for the critical ones while
                there&apos;s no schedule pressure.
              </li>
              <li>
                Keep those alternates on your approved vendor list so switching
                is a same-day decision.
              </li>
            </ul>

            <h2>How SongGlow helps with alternates</h2>
            <p>
              Recommending alternates is one of our core services. For parts that
              are constrained, discontinued, or simply overpriced, we cross-
              reference form-fit-function alternates and vet them before we ever
              put them in front of you. We handle the sourcing and the
              cross-referencing; final qualification for your design stays with
              your engineering team, which is exactly where it should be. Send us
              the part number or your whole BOM, and we&apos;ll come back with
              sourced alternates and pricing within 24 hours.
            </p>
          </div>

          <div className="catalog-cta" data-reveal>
            <h2>Need an alternate for a constrained or discontinued part?</h2>
            <p>
              Send us the part number or your BOM. We&apos;ll come back within 24
              hours with vetted alternates, 100% authentic with full
              traceability.
            </p>
            <div className="catalog-cta-row">
              <Link href="/contact" className="btn btn-navy btn-lg">
                Request a quote
              </Link>
              <Link href="/guides" className="btn btn-ghost btn-lg">
                More guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Animate>
  );
}
