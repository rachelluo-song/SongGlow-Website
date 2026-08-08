import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import JsonLd from "@/components/json-ld";
import Faq, { type FaqItem } from "@/components/faq";
import GuideReview, { GUIDE_REVIEW_DATE, reviewedBySchema } from "@/components/guide-review";
import { GuideResources, QuickAnswer } from "@/components/guide-support";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/guides/how-to-choose-a-sourcing-partner";
const PAGE_TITLE = "How to Choose an Electronic Components Sourcing Partner";

export const metadata: Metadata = {
  title: `${PAGE_TITLE} - SongGlow`,
  description:
    "A practical checklist for choosing an electronic components sourcing partner: traceability, sourcing channels, counterfeit avoidance, coverage, responsiveness, and the exact questions to ask before you place an order.",
  alternates: { canonical: PAGE_PATH },
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: PAGE_TITLE,
  description:
    "How to evaluate and choose a reliable electronic components sourcing partner, with the questions to ask before you commit an order.",
  url: `${SITE_URL}${PAGE_PATH}`,
  datePublished: "2026-08-01",
  dateModified: GUIDE_REVIEW_DATE,
  author: { "@type": "Organization", name: "SongGlow", url: SITE_URL },
  reviewedBy: reviewedBySchema,
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

const FAQ_ITEMS: FaqItem[] = [
  {
    question:
      "What is the difference between a broker and a sourcing partner?",
    answer:
      "A broker finds a price. A sourcing partner takes responsibility for what arrives: they can trace the parts back to the manufacturer, work to a counterfeit-avoidance standard, and stand behind the documentation. The cheapest quote from an anonymous source is rarely the cheapest outcome once you count the risk of a line-down event.",
  },
  {
    question:
      "What documentation should a sourcing partner provide?",
    answer:
      "At minimum, a Certificate of Conformance naming the manufacturer, part number, quantity, and date and lot codes, plus a traceability chain showing every company the parts passed through. A partner should also be able to provide purchase orders or invoices from the original manufacturer or an authorized distributor, and real photos of the actual stock on request.",
  },
  {
    question:
      "Should I use an authorized distributor or an independent supplier?",
    answer:
      "Use an authorized distributor whenever the part is available there, especially for anything safety-critical, because parts flow directly from the manufacturer with full warranty. Independents are legitimate and often necessary for obsolete, allocated, or long-lead parts, but only when they can document their source and work to a counterfeit-avoidance standard. A good partner uses both channels and tells you which one a given part came from.",
  },
  {
    question: "What questions should I ask before placing an order?",
    answer:
      "Ask where the parts come from, what documentation ships with them, how the supplier handles suspect or counterfeit parts, how fast they quote, and whether they can show you photos of the actual stock. Honest, specific answers are the signal you are looking for. Vague answers or a refusal to name the channel are a reason to walk away.",
  },
];

export default function ChoosePartnerGuidePage() {
  return (
    <Animate>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <header className="page-hero">
        <div className="wrap">
          <div className="breadcrumb" data-hero-item>
            <Link href="/guides">Guides</Link>
            <span aria-hidden> / </span>
            Choosing a Partner
          </div>
          <h1 data-hero-item>{PAGE_TITLE}</h1>
          <p data-hero-item>
            The part number is the easy part. Choosing who sources it decides
            whether your line keeps running. Here is how to tell a real partner
            from a broker with a spreadsheet.
          </p>
          <GuideReview />
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <div className="article" data-reveal>
            <QuickAnswer>
              Choose a partner that names the sourcing channel, provides
              traceability and actual-stock evidence, explains open-market
              risk, and remains accountable after delivery—not simply the
              supplier with the lowest line-item price.
            </QuickAnswer>
            <p>
              Two suppliers can quote the same part number at very different
              prices, and the cheaper one can still be the more expensive
              decision. What you are really buying from a sourcing partner is
              certainty: that the parts are genuine, that they arrive on
              schedule, and that someone can prove where they came from if a
              board fails. Use the criteria below to evaluate anyone before you
              hand them a BOM.
            </p>

            <h2>1. Traceability and documentation</h2>
            <p>
              This is the first filter, and for good reason. A partner should be
              able to trace a part back to the manufacturer and hand you the
              paper to prove it: a Certificate of Conformance, a traceability
              chain, and, where relevant, purchase orders or invoices from the
              original manufacturer or an authorized distributor. If a supplier
              treats their source as a secret, treat that as a red flag rather
              than a trade secret.
            </p>

            <h2>2. Sourcing channels</h2>
            <p>
              Ask which channels they actually use. Authorized (franchised)
              distributors should come first, because parts flow directly from
              the manufacturer with full warranty. For obsolete, allocated, or
              long-lead parts, the open market is legitimate and often
              unavoidable, but only through vetted independents who document
              their sources. A partner who relies on a single channel has a
              single point of failure.
            </p>

            <h2>3. Counterfeit-avoidance process</h2>
            <p>
              Counterfeit parts follow shortages. A serious partner works to a
              counterfeit-avoidance standard such as AS6081, verifies date and
              lot codes against the paperwork, and quarantines suspect stock
              rather than returning it to the market. Ask them directly how they
              handle a part that fails inspection. The answer tells you a lot.
            </p>

            <h2>4. Coverage and reach</h2>
            <p>
              A partner worth keeping can handle more than the easy lines. Look
              for the ability to quote a full bill of materials, find
              form-fit-function alternates when a part is constrained, and reach
              obsolete or hard-to-find parts other suppliers cannot place. The
              value is having one point of contact for the whole list, not five
              vendors for five problems.
            </p>

            <h2>5. Responsiveness and communication</h2>
            <p>
              Sourcing is a time-sensitive business. Quote turnaround, a single
              named point of contact, and honest updates when a part slips
              matter as much as price. A partner who tells you a line is at risk
              early is worth more than one who goes quiet until the ship date.
            </p>

            <h2>6. Pricing and cost transparency</h2>
            <p>
              Competitive pricing should come from real multi-supplier bidding
              and volume strategy, not from cutting corners on authenticity. Be
              wary of a quote that sits far below every other offer for a scarce
              part: on the open market, a price that good usually means the part
              is not what the label says.
            </p>

            <h2>7. Logistics and quality standards</h2>
            <p>
              Finally, look at how parts are handled and shipped:
              manufacturer-compliant packaging, moisture-sensitive devices in
              intact barrier bags, and documentation that follows the parts. If
              you build to US or EU expectations, confirm the partner sources to
              those standards.
            </p>

            <div className="article-callout">
              <h3>Questions to ask before you commit</h3>
              <ul>
                <li>Where do these parts come from, and can you document it?</li>
                <li>What paperwork ships with the order?</li>
                <li>How do you handle a part that fails incoming inspection?</li>
                <li>Can you send photos of the actual stock before I pay?</li>
                <li>How fast do you quote, and who is my point of contact?</li>
              </ul>
            </div>

            <h2>How SongGlow measures up</h2>
            <p>
              We built SongGlow around exactly these criteria. Every part is
              sourced through qualified suppliers with a documented trail back to
              the manufacturer, and we can provide purchase orders and invoices
              from original manufacturers and their authorized distributors. On
              request, we share real photos of the actual stock, including
              packaging, box labels, and markings, so you can verify authenticity
              before anything ships.
            </p>
            <p>
              Behind the quotes is an experienced team: a semiconductor
              specialist with over ten years in the field, a dedicated capacitor
              specialist, and a supply-chain lead whose network gives us direct
              access to source factories that meet US and EU quality standards.
              When a line on your BOM carries open-market risk, we tell you
              honestly rather than ship you a question mark.
            </p>

            <GuideResources />
            <Faq items={FAQ_ITEMS} />
          </div>

          <div className="catalog-cta" data-reveal>
            <h2>Ready to put a partner to the test?</h2>
            <p>
              Send us your BOM or a single hard-to-find part number. We will
              quote it with full traceability, and flag any line that carries
              real risk.
            </p>
            <div className="catalog-cta-row">
              <Link href="/contact" className="btn btn-navy btn-lg">
                Request a quote
              </Link>
              <Link href="/about" className="btn btn-ghost btn-lg">
                About SongGlow
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Animate>
  );
}
