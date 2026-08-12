import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import JsonLd from "@/components/json-ld";
import Faq, { type FaqItem } from "@/components/faq";
import GuideReview, { GUIDE_REVIEW_DATE, reviewedBySchema } from "@/components/guide-review";
import {
  GuideResources,
  GuideSources,
  QuickAnswer,
  type GuideSource,
} from "@/components/guide-support";
import { SITE_BRAND_IMAGE, SITE_URL } from "@/lib/site";

const PAGE_PATH = "/guides/how-to-choose-a-sourcing-partner";
const PAGE_TITLE = "How to Choose an Electronic Components Sourcing Partner";

const SOURCES: GuideSource[] = [
  {
    title: "What We Do: the authorized electronic component channel",
    organization: "Electronic Components Industry Association (ECIA)",
    url: "https://www.ecianow.org/what-we-do/",
    note: "Industry context for authorized distribution, trusted sources, and supply-chain integrity.",
  },
  {
    title: "Electronic component quality resources",
    organization: "Electronic Components Industry Association (ECIA)",
    url: "https://www.ecianow.org/quality/",
    note: "Public resources covering traceability, counterfeit mitigation, certificates, product changes, and distributor practices.",
  },
  {
    title: "AS6496 Authorized Distributor Anti-Counterfeiting Standard",
    organization: "Electronic Components Industry Association (ECIA)",
    url: "https://www.ecianow.org/quality/sae-as6496-anti-counterfeiting-standard/",
    note: "A public overview of channel definitions and controls for purchasing, records, traceability, suspect parts, and inventory.",
  },
];

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
  mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${PAGE_PATH}` },
  image: [SITE_BRAND_IMAGE],
  datePublished: "2026-08-01T00:00:00Z",
  dateModified: GUIDE_REVIEW_DATE,
  author: { "@id": `${SITE_URL}/#organization` },
  reviewedBy: reviewedBySchema,
  publisher: { "@id": `${SITE_URL}/#organization` },
  citation: SOURCES.map((source) => source.url),
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
      "A broker finds a price. A sourcing partner also manages channel selection, order records, review scope, and sourcing risk. The cheapest quote from an unexplained channel is rarely the cheapest outcome once you count the risk of a line-down event.",
  },
  {
    question:
      "What documentation should a sourcing partner provide?",
    answer:
      "Ask what is available for the specific part and channel: a Certificate of Conformance where applicable, manufacturer and part-number details, quantities, lot or date codes, order-level records, and photos of the goods or packaging when the source can provide them. Upstream supplier identities, invoices, prices, and other commercial terms may remain confidential.",
  },
  {
    question:
      "Should I use an authorized distributor or an independent supplier?",
    answer:
      "Use an authorized distributor when the part is available there, especially for safety-critical applications. Independents are legitimate and often necessary for obsolete, allocated, or long-lead parts when they use appropriate counterfeit-avoidance controls and maintain suitable order records. A good partner explains the channel type and relevant risk without necessarily disclosing confidential upstream relationships.",
  },
  {
    question: "What questions should I ask before placing an order?",
    answer:
      "Ask where the parts come from, what documentation is available, how the supplier handles suspect or counterfeit parts, how fast they quote, and what receiving photos or checks they provide. Honest, specific answers are the signal you are looking for. Vague answers or a refusal to explain the channel are a reason to walk away.",
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
              available documentation and receiving evidence, explains open-market
              risk, and remains accountable after delivery—not simply the
              supplier with the lowest line-item price.
            </QuickAnswer>
            <p>
              Two suppliers can quote the same part number at very different
              prices, and the cheaper one can still be the more expensive
              decision. What you are really buying from a sourcing partner is
              a clear explanation of the source, requirements, documentation,
              delivery plan, and limitations. Use the criteria below to evaluate
              anyone before you hand them a BOM.
            </p>

            <h2>1. Traceability and documentation</h2>
            <p>
              This is the first filter, and for good reason. A partner should be
              able to explain the sourcing channel and confirm which records are
              available for the specific order. Depending on the part and
              channel, that may include a Certificate of Conformance, packaging
              and label details, lot or date codes, and photos when available.
              Confidential upstream supplier identities, invoices, prices, and
              commercial terms do not need to be standard customer deliverables.
            </p>

            <h2>2. Sourcing channels</h2>
            <p>
              Ask which channels they actually use. Authorized (franchised)
              distributors should come first, because parts flow directly from
              the manufacturer through a manufacturer-backed channel. For
              obsolete, allocated, or long-lead parts, the open market is
              legitimate and often unavoidable, but it should be approached
              through vetted independents who explain the channel type and keep
              suitable order records. A partner who relies on a single channel
              has a single point of failure.
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
              for a clear process for multi-line bills of materials, potential
              alternate research when a part is constrained, and wider
              supplier-route searches for obsolete or hard-to-find parts. The
              value is having one point of contact who reports suitable options
              and unresolved lines honestly.
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
                <li>What photos or receiving checks do you provide?</li>
                <li>How fast do you quote, and who is my point of contact?</li>
              </ul>
            </div>

            <h2>How SongGlow measures up</h2>
            <p>
              SongGlow works through the BOM line by line. We search for the
              specified parts and quantities, compare suitable quotations, and
              ask what source documentation is available. After receipt, we
              visually check external packaging condition and photograph the
              packaging and labels. We do not claim that this visual check proves
              authenticity or replaces laboratory testing.
            </p>
            <p>
              Behind the quotes is an experienced team: a semiconductor
              specialist with over ten years in the field, a dedicated capacitor
              specialist, and a supply-chain lead whose network gives us direct
              access to source factories that meet US and EU quality standards.
              When a line on your BOM carries open-market risk, we tell you
              honestly rather than ship you a question mark.
            </p>

            <GuideSources sources={SOURCES} />
            <GuideResources currentSlug="how-to-choose-a-sourcing-partner" />
            <Faq items={FAQ_ITEMS} />
          </div>

          <div className="catalog-cta" data-reveal>
            <h2>Ready to put a partner to the test?</h2>
            <p>
              Send us your BOM or a single hard-to-find part number. We will
              confirm the requirement, compare suitable quote options, and state
              what source documentation is available.
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
