import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import JsonLd from "@/components/json-ld";
import Faq, { type FaqItem } from "@/components/faq";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const PAGE_PATH = "/about";
const PAGE_TITLE = "About SongGlow";

export const metadata: Metadata = {
  title: "About SongGlow - Electronic Component Sourcing Partner",
  description:
    "SongGlow is an electronic component sourcing partner based in Shenzhen and Hong Kong, with a team spanning semiconductor, capacitor, and US supply-chain experience. Order-level traceability and honest sourcing.",
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
    body: "Our supply-chain lead spent five years in US-based supply chain management. That network gives us direct access to source factories that meet US and EU quality standards.",
  },
  {
    stat: "3+ yrs",
    title: "Capacitors & passives",
    body: "A dedicated capacitor specialist with three-plus years in the category handles passives sourcing, where date codes and lot consistency matter as much as price.",
  },
];

const PROOF = [
  {
    title: "A clear order-level record",
    body: "We keep the order, review notes, and available lot or date-code details organized while protecting confidential supplier identities, purchase prices, and commercial terms.",
  },
  {
    title: "Physical proof before parts ship",
    body: "On request, we share real photos of the actual stock: packaging, box labels, and part markings, so you can check authenticity for yourself rather than take it on faith.",
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
      "Not yet. SongGlow does not currently hold formal ISO 9001 or AS9120 certification. Our traceability process and documentation standards are built to meet those expectations, and formal certification is on our roadmap as the company grows. We would rather tell you exactly where we stand than imply a credential we do not hold.",
  },
  {
    question: "How does SongGlow prove that parts are authentic?",
    answer:
      "We review available packaging, labels, part markings, and, when applicable, accessible package dimensions against the order requirements. We keep available lot or date-code information with the order record. Confidential supplier identities, upstream invoices, purchase prices, and commercial terms are not standard customer deliverables.",
  },
  {
    question: "Who does SongGlow work with?",
    answer:
      "We work with manufacturing companies and with hardware startups building their own products. Our goal on every order is the same: help our customers reduce costs, improve efficiency, and increase profitability.",
  },
  {
    question: "What makes SongGlow different from a typical broker?",
    answer:
      "Order-level traceability and specialists. Our team includes a semiconductor specialist with over ten years of experience and a dedicated capacitor specialist. We review available packaging, labels, markings, and order details while protecting confidential commercial information. When a part carries additional sourcing risk, we communicate the relevant considerations honestly.",
  },
];

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: `${SITE_URL}${PAGE_PATH}`,
  name: PAGE_TITLE,
  mainEntity: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
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
          <h1 data-hero-item>A sourcing partner built around traceability</h1>
          <p data-hero-item>
            SongGlow is an electronic component sourcing partner in Shenzhen and
            Hong Kong. We help manufacturers and hardware teams get genuine
            parts with a clear, organized order record.
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
              What we sell is not just parts. It is the confidence that the part
              on your bench is the part on your BOM, sourced through qualified
              suppliers and reviewed against the order requirements. Our
              goal on every order is to help customers reduce costs, improve
              efficiency, and increase profitability.
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
            <div className="eyebrow">How we prove it</div>
            <h2>Authenticity you can check for yourself</h2>
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
                SongGlow does not yet hold formal ISO 9001 or AS9120
                certification. Our traceability process and documentation
                standards are built to meet those expectations, and formal
                certification is on our roadmap as we grow. We would rather be
                straight about where we are than imply a credential we do not
                have.
              </p>
            </div>

            <Faq items={FAQ_ITEMS} />
          </div>

          <div className="catalog-cta" data-reveal>
            <h2>Have a BOM or a hard-to-find part?</h2>
            <p>
              Send us the list or the part number and we will quote it with full
              traceability. If a line carries open-market risk, we will tell you.
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
