import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import JsonLd from "@/components/json-ld";
import Faq, { type FaqItem } from "@/components/faq";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/about";
const PAGE_TITLE = "About SongGlow";

export const metadata: Metadata = {
  title: "About SongGlow - Electronic Component Sourcing Partner",
  description:
    "SongGlow is a Shenzhen and Hong Kong electronic component sourcing partner helping customers source BOM lines, compare quotes, and coordinate supplier documentation.",
  alternates: { canonical: PAGE_PATH },
};

const TEAM = [
  {
    stat: "5+ yrs",
    title: "Electronic components",
    body: "Our team brings more than five years across the electronic components industry: sourcing, quoting, and day-to-day supply management for production teams.",
  },
  {
    stat: "10+ yrs",
    title: "Semiconductors & ICs",
    body: "A dedicated chip sourcing specialist with over a decade in the semiconductor space leads our IC and semiconductor work, including allocation-constrained and hard-to-place parts.",
  },
  {
    stat: "5 yrs",
    title: "US supply-chain network",
    body: "Our supply-chain lead spent five years in US-based supply chain management, bringing additional supplier reach and customer-side procurement experience to each project.",
  },
  {
    stat: "3+ yrs",
    title: "Capacitors & passives",
    body: "A dedicated capacitor specialist with three-plus years in the category handles passives sourcing, where date codes and lot consistency matter as much as price.",
  },
];

const PROOF = [
  {
    title: "Available source documentation",
    body: "We ask suppliers for available channel documents, lot details, or date codes and share what can be provided for the specific quote or order.",
  },
  {
    title: "Photos after receipt",
    body: "When the parts reach us, we visually check the packaging condition and photograph the packaging and labels for the customer before onward delivery.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Where is SongGlow based?",
    answer:
      "SongGlow has offices in Shenzhen (Futian and Longhua districts) and Hong Kong (Tuen Mun). We are positioned in the heart of the electronics supply chain and serve customers worldwide.",
  },
  {
    question: "Is SongGlow ISO 9001 or AS9120 certified?",
    answer:
      "No. SongGlow does not currently hold ISO 9001 or AS9120 certification. We state that clearly and do not imply certifications or inspection capabilities we do not have.",
  },
  {
    question: "What checks does SongGlow perform after receiving parts?",
    answer:
      "We visually check the external packaging for obvious damage and compare visible packaging or label information with the order. We then photograph the packaging and labels for the customer. This standard receiving check is not laboratory authentication and does not include X-ray, decapsulation, or electrical testing.",
  },
  {
    question: "Who does SongGlow work with?",
    answer:
      "We work with manufacturing companies and with hardware startups building their own products. Our goal on every order is the same: help our customers reduce costs, improve efficiency, and increase profitability.",
  },
  {
    question: "What makes SongGlow different from a typical broker?",
    answer:
      "We work through the BOM line by line. Our team searches for the specified parts and quantities, compares suitable quotations, requests available channel documentation, and coordinates receiving photos and delivery. We do not promise that every line can be found or claim tests we do not perform.",
  },
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}${PAGE_PATH}#webpage`,
  url: `${SITE_URL}${PAGE_PATH}`,
  name: PAGE_TITLE,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  mainEntity: { "@id": `${SITE_URL}/#organization` },
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

export default function AboutPage() {
  return (
    <Animate>
      <JsonLd data={aboutSchema} />
      <JsonLd data={breadcrumbSchema} />

      <header className="page-hero">
        <div className="wrap">
          <div className="eyebrow" data-hero-item>
            About
          </div>
          <h1 data-hero-item>A practical partner for electronic BOM sourcing</h1>
          <p data-hero-item>
            SongGlow is an electronic component sourcing partner in Shenzhen and
            Hong Kong. We help manufacturers and hardware teams search for the
            specified BOM parts, requested quantities, and competitive quotes.
          </p>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <div className="article" data-reveal>
            <p>
              Founded in 2026, SongGlow is based across the Shenzhen and Hong
              Kong electronics corridor, with offices in Futian, Longhua, and
              Tuen Mun. We are a young company built on experienced people: our
              team spent years inside the components industry before we started
              sourcing under our own name.
            </p>
            <p>
              Our work starts with the customer&apos;s BOM. We search for the
              specified parts and quantities, compare suitable supplier quotes,
              and organize the information so the customer can decide. When
              documentation is available from the source, we make a reasonable
              effort to obtain and share it.
            </p>
          </div>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 40 }} data-reveal>
            <div className="eyebrow">The team</div>
            <h2>Experienced people behind every quote</h2>
          </div>
          <div className="grid-3" data-reveal-group>
            {TEAM.map((member) => (
              <div key={member.title} className="service-card">
                <div className="service-num">{member.stat}</div>
                <h3>{member.title}</h3>
                <p>{member.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="section-head" style={{ marginBottom: 40 }} data-reveal>
            <div className="eyebrow">What We Provide</div>
            <h2>Clear sourcing information and receiving photos</h2>
          </div>
          <div className="grid-3" data-reveal-group>
            {PROOF.map((item) => (
              <div key={item.title} className="card">
                <h3 style={{ fontSize: 19 }}>{item.title}</h3>
                <p
                  style={{
                    color: "var(--ink-soft)",
                    fontSize: 15.5,
                    marginTop: 10,
                    lineHeight: 1.65,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="article" data-reveal>
            <div className="article-callout">
              <h3>Where we stand on certification</h3>
              <p>
                SongGlow does not currently hold ISO 9001 or AS9120
                certification. Our standard receiving check is visual and
                limited to packaging condition and visible order information. It
                does not include X-ray, decapsulation, electrical testing, or
                laboratory authentication.
              </p>
            </div>

            <Faq items={FAQ_ITEMS} />
          </div>

          <div className="catalog-cta" data-reveal>
            <h2>Have a BOM or a hard-to-find part?</h2>
            <p>
              Send us the list or part number. We will search suitable sources,
              compare quotations, and confirm what documentation is available.
            </p>
            <div className="catalog-cta-row">
              <Link href="/contact" className="btn btn-navy btn-lg">
                Request a quote
              </Link>
              <Link href="/services" className="btn btn-ghost btn-lg">
                Our sourcing services
              </Link>
              <Link
                href="/electronic-component-sourcing-china"
                className="btn btn-ghost btn-lg"
              >
                China sourcing support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Animate>
  );
}
