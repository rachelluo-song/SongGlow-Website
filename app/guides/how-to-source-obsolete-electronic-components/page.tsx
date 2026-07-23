import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import JsonLd from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/guides/how-to-source-obsolete-electronic-components";
const PAGE_TITLE = "How to Source Obsolete and End-of-Life Electronic Components";
const AUTH_GUIDE = "/guides/how-to-verify-authentic-electronic-components";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} - SongGlow`,
  description:
    "A practical guide to sourcing obsolete and end-of-life components: reading discontinuance notices, last-time buys, approved alternates, authorized aftermarket, and buying the open market safely.",
  alternates: { canonical: PAGE_PATH },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: PAGE_TITLE,
  description:
    "A practical guide to sourcing obsolete and end-of-life electronic components without stopping the line.",
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

export default function ObsoleteSourcingGuidePage() {
  return (
    <Animate>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <header className="page-hero">
        <div className="wrap">
          <div className="breadcrumb" data-hero-item>
            <Link href="/guides">Guides</Link>
            <span aria-hidden> / </span>
            Sourcing Obsolete Parts
          </div>
          <h1 data-hero-item>{PAGE_TITLE}</h1>
          <p data-hero-item>
            A part on your BOM just went end-of-life. Here&apos;s the order to
            work the problem in, from the cheapest fix to the last resort, and
            how to keep counterfeits out along the way.
          </p>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <div className="article" data-reveal>
            <p>
              Every semiconductor has a life cycle, and eventually the
              manufacturer stops making it. A fab retires an old process node, a
              product line gets consolidated, or demand drops below what&apos;s
              worth producing. For consumer products that&apos;s rarely a
              problem. For industrial, medical, aerospace, and infrastructure
              gear that ships for fifteen or twenty years, a single obsolete
              part can put a whole production line at risk.
            </p>
            <p>
              The good news: obsolescence is a managed problem, not a dead end.
              Work it in this order and you&apos;ll usually find a path that
              doesn&apos;t involve a redesign.
            </p>

            <h2>1. Read the notice and confirm the status</h2>
            <p>
              Obsolescence is almost always announced before it happens. When a
              manufacturer plans to discontinue a part, it issues a{" "}
              <strong>PCN</strong> (Product Change Notification) or{" "}
              <strong>PDN</strong> (Product Discontinuance Notification), usually
              6 to 12 months ahead of the last ship date. Before you do anything
              else, pin down where the part actually sits:
            </p>
            <ul>
              <li>
                <strong>Active</strong> means still in normal production.
              </li>
              <li>
                <strong>NRND</strong> (Not Recommended for New Designs) is the
                warning shot. The part is still available but on its way out.
              </li>
              <li>
                <strong>EOL / Obsolete</strong> means production has ended or is
                ending. The PCN/PDN will list the{" "}
                <strong>last-time-buy (LTB) date</strong> and the final ship
                date.
              </li>
            </ul>
            <p>
              If you&apos;re still inside the last-time-buy window, you have the
              simplest option available: buy the parts while the factory is
              still making them.
            </p>

            <h2>2. Place a last-time buy, sized honestly</h2>
            <p>
              A last-time buy means purchasing enough inventory to cover
              production and service for the remaining life of your product.
              This is the cleanest outcome because the parts are still factory
              fresh and fully traceable. The hard part is the quantity: buy too
              few and you&apos;re back here in two years paying broker prices,
              buy too many and you&apos;re holding dead stock and tying up cash.
            </p>
            <ul>
              <li>
                Forecast the full remaining production run plus spares and
                warranty/repair demand.
              </li>
              <li>
                Factor in shelf life. Some parts (certain electrolytics,
                anything with solderability concerns) don&apos;t store
                indefinitely, and moisture-sensitive devices need proper
                storage.
              </li>
              <li>
                Decide who holds the inventory. A sourcing partner can warehouse
                a last-time buy and release it against your schedule so you
                aren&apos;t carrying it all at once.
              </li>
            </ul>

            <h2>3. Qualify an approved alternate</h2>
            <p>
              If the last-time-buy window has closed, the next question is
              whether you even need the exact part. A{" "}
              <strong>form-fit-function</strong> alternate is a different part
              number that matches the original&apos;s footprint, electrical
              behavior, and environmental ratings closely enough to drop in.
            </p>
            <ul>
              <li>
                Manufacturers often name a recommended replacement right in the
                discontinuance notice. Start there.
              </li>
              <li>
                Cross-reference tools and distributor databases surface
                pin-compatible parts from other makers, but a datasheet match
                isn&apos;t a guarantee. Timing, tolerances, and temperature
                behavior still need to be verified.
              </li>
              <li>
                Any alternate on a regulated or safety-critical product will
                need re-qualification and sign-off. Budget the engineering time.
              </li>
            </ul>

            <h2>4. Go to the authorized aftermarket</h2>
            <p>
              For a genuinely obsolete part with no drop-in alternate, the
              safest source is the authorized aftermarket. These are companies
              the original manufacturer has licensed to continue production,
              often using the original tooling, wafers, and test programs.
              Rochester Electronics is the best-known example. Parts from this
              channel are guaranteed authentic and carry a clean traceability
              chain, which is exactly what you want on a critical line.
            </p>

            <h2>5. Buy the open market carefully</h2>
            <p>
              When none of the above works, the independent (open) market is a
              legitimate and often necessary source for obsolete parts. It is
              also where counterfeit risk is highest, precisely because scarcity
              is what counterfeiters exploit. This is the moment to be
              disciplined, not desperate:
            </p>
            <ul>
              <li>
                Buy through a supplier who can document the full traceability
                chain and works to a counterfeit-avoidance standard.
              </li>
              <li>
                Treat a price far below every other quote as a warning, not a
                win.
              </li>
            </ul>
            <div className="article-callout">
              <h3>Before you buy obsolete parts on the open market</h3>
              <p>
                Obsolete and allocation-constrained parts are the single most
                counterfeited category, so provenance matters more here than
                anywhere else. Our companion guide walks through exactly how to
                verify a part is genuine:{" "}
                <Link href={AUTH_GUIDE}>
                  How to verify electronic components are authentic
                </Link>
                .
              </p>
            </div>

            <h2>6. Redesign, as a last resort</h2>
            <p>
              If a part is truly unobtainable, the remaining options are
              engineering ones: redesign the board around a current part, or use
              a drop-in emulation of the original built on modern silicon.
              Redesign is the most expensive and slowest path, which is why it
              sits at the bottom of the list, but for a long-life product it is
              sometimes the right call.
            </p>

            <h2>Stay ahead of it: manage obsolescence before it bites</h2>
            <p>
              The cheapest obsolescence problem is the one you see coming. A
              little proactive work turns a fire drill into a planned buy:
            </p>
            <ul>
              <li>
                Run periodic lifecycle checks against your BOM so NRND and PCN
                flags surface months early, not the week you go to reorder.
              </li>
              <li>
                Identify single-sourced and long-lead parts and qualify a second
                source before you need one.
              </li>
              <li>
                Keep a relationship with a sourcing partner who monitors this
                for you and can move quickly when a notice lands.
              </li>
            </ul>

            <h2>How SongGlow helps with obsolete parts</h2>
            <p>
              Hard-to-find and end-of-life parts are core to what we do. We reach
              across authorized stock, last-time-buy inventory, the authorized
              aftermarket, and a vetted independent network to place parts other
              suppliers can&apos;t. Every shipment is visually inspected and its
              condition documented before dispatch, and for high-value or
              critical lots we can arrange independent lab testing on your
              behalf. Our core guarantee on every part we deliver is traceability
              and authenticity. We can also hold a last-time buy and release it
              against your schedule, so you aren&apos;t warehousing it all at
              once. If a line on your BOM is going obsolete, send us the part
              number and your remaining demand, and we&apos;ll come back with a
              sourcing plan within 24 hours.
            </p>
          </div>

          <div className="catalog-cta" data-reveal>
            <h2>Chasing an obsolete or end-of-life part?</h2>
            <p>
              Send us the part number and your remaining demand. We&apos;ll come
              back within 24 hours, 100% authentic with full traceability.
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
