import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import Faq, { type FaqItem } from "@/components/faq";
import JsonLd from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

const PAGE_PATH = "/obsolete-electronic-components";

export const metadata: Metadata = {
  title: "Obsolete & Hard-to-Find Electronic Components | SongGlow",
  description:
    "SongGlow searches for obsolete, end-of-life, allocated, and hard-to-find electronic components and compares available source, quantity, lead-time, and quote options.",
  alternates: { canonical: PAGE_PATH },
};

const CHALLENGES = [
  {
    title: "Obsolete and end-of-life parts",
    body: "Search for discontinued semiconductors, passives, connectors, and electromechanical components when regular channels cannot meet the requirement.",
  },
  {
    title: "Allocation and long lead times",
    body: "Compare available supply routes when factory lead times or allocations threaten an active production schedule.",
  },
  {
    title: "Legacy equipment support",
    body: "Help maintain products and equipment whose original BOM includes components no longer supported by the manufacturer.",
  },
  {
    title: "Alternate component research",
    body: "Identify form-fit-function candidates for engineering review when the original manufacturer part number cannot be sourced responsibly.",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Confirm the requirement",
    body: "We review the manufacturer part number, quantity, target date, date-code constraints, approved manufacturers, and documentation needs.",
  },
  {
    num: "02",
    title: "Search supplier routes",
    body: "We compare potential sources for the correct part, requested quantity, lead time, pricing, and available documentation.",
  },
  {
    num: "03",
    title: "Receive and document",
    body: "After receipt, we visually check external packaging condition and photograph the packaging and labels. Available source documents are organized with the order.",
  },
  {
    num: "04",
    title: "Quote the clear options",
    body: "You receive the requested part and any alternate candidates as separate options. No substitution is made without customer approval.",
  },
];

const REQUEST_DETAILS = [
  "Full manufacturer part number",
  "Required quantity and target delivery date",
  "Approved manufacturers or alternates",
  "Acceptable lot and date-code range",
  "Packaging and documentation requirements",
  "Application or lifecycle context, when relevant",
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Can SongGlow source discontinued electronic components?",
    answer:
      "Yes. SongGlow searches appropriate supply channels for obsolete and discontinued components. Availability, source type, review scope, and documentation vary by part and are confirmed with the quote.",
  },
  {
    question: "What checks do you perform for hard-to-find parts?",
    answer:
      "We compare potential sources and request available channel documentation before ordering. After receipt, we visually check external packaging condition and take photos of the packaging and labels. This is not laboratory authentication and does not include X-ray, decapsulation, or electrical testing.",
  },
  {
    question: "Can you recommend a replacement for an obsolete part?",
    answer:
      "We can research form-fit-function candidates and present them separately for engineering review. The customer remains responsible for validating and approving any alternate for the intended application.",
  },
  {
    question: "What information should I include in an obsolete-part RFQ?",
    answer:
      "Include the full manufacturer part number, quantity, target date, acceptable date-code range, packaging, approved manufacturers, and documentation requirements. A photo, datasheet, or BOM can help when the part number is incomplete.",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${SITE_URL}${PAGE_PATH}#service`,
  name: "Obsolete and Hard-to-Find Electronic Component Sourcing",
  description:
    "Sourcing for obsolete, end-of-life, allocated, and hard-to-find electronic components, including quote comparison, alternate research, and available source documentation.",
  provider: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
  areaServed: "Worldwide",
  serviceType: "Obsolete electronic component sourcing",
  url: `${SITE_URL}${PAGE_PATH}`,
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Obsolete Electronic Components",
      item: `${SITE_URL}${PAGE_PATH}`,
    },
  ],
};

export default function ObsoleteElectronicComponentsPage() {
  return (
    <Animate>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />

      <header className="bom-hero">
        <div className="wrap bom-hero-grid">
          <div className="bom-hero-copy">
            <div className="eyebrow" data-hero-item>
              Obsolete Component Sourcing
            </div>
            <h1 data-hero-item>
              Source obsolete and hard-to-find electronic components.
            </h1>
            <p data-hero-item>
              Find end-of-life, allocated, and long-lead parts with clear supply
              options, relevant limitations, and available source documentation.
            </p>
            <div className="bom-hero-actions" data-hero-item>
              <Link href="/contact?project=obsolete-part" className="btn btn-navy btn-lg">
                Request a Part Quote
              </Link>
              <Link
                href="/guides/how-to-source-obsolete-electronic-components"
                className="btn btn-ghost btn-lg"
              >
                Read the Sourcing Guide
              </Link>
            </div>
            <p className="bom-file-note" data-hero-item>
              Send the manufacturer part number, quantity, target date, and any
              date-code or documentation requirements.
            </p>
          </div>

          <div className="bom-fit-card" data-hero-item>
            <div className="eyebrow">What We Search</div>
            <h2>More than one route to supply</h2>
            <p>
              Depending on the part, we review authorized distribution, vetted
              independent supply, alternate manufacturers, and lifecycle options.
              The available source information and documentation are made clear
              before approval.
            </p>
            <Link href="/quality" className="text-link">
              Review our quality approach →
            </Link>
          </div>
        </div>
      </header>

      <section className="answer-strip" aria-label="Obsolete component sourcing summary">
        <div className="wrap">
          <p>
            <strong>Direct answer:</strong> SongGlow researches potential supply
            routes for obsolete, end-of-life, allocated, and hard-to-find
            electronic components. We compare the requested part, quantity,
            lead time, source notes, and available documentation, while keeping
            alternate candidates separate for customer engineering approval.
            Availability varies by part and is confirmed with each quotation.
          </p>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="eyebrow">When Regular Supply Runs Out</div>
            <h2>Sourcing support for constrained and legacy BOMs</h2>
            <p>
              Use SongGlow for one critical line item or combine hard-to-find
              research with a complete electronic BOM sourcing project.
            </p>
          </div>
          <div className="grid-2" data-reveal-group>
            {CHALLENGES.map((item) => (
              <article key={item.title} className="service-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="block bom-deliverables-section">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="eyebrow">The Process</div>
            <h2>From part number to reviewed sourcing options</h2>
          </div>
          <div className="bom-process" data-reveal-group>
            {PROCESS.map((step) => (
              <article key={step.num} className="bom-step">
                <span className="bom-step-num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap bom-fit-grid">
          <div className="bom-fit-card" data-reveal>
            <div className="eyebrow">A Better RFQ</div>
            <h2>Details that help us search accurately</h2>
            <p>
              Clear constraints prevent unsuitable offers from being treated
              as a match and help us return a more useful quote.
            </p>
          </div>
          <ul className="bom-checklist" data-reveal-group>
            {REQUEST_DETAILS.map((item) => (
              <li key={item}>
                <span>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="block bom-faq-section">
        <div className="wrap">
          <div className="article" data-reveal>
            <Faq items={FAQ_ITEMS} heading="Obsolete component sourcing questions" />
            <p>
              For a deeper lifecycle and risk overview, read our guide to{" "}
              <Link href="/guides/how-to-source-obsolete-electronic-components">
                sourcing obsolete and end-of-life electronic components
              </Link>
              . If the complete list needs attention, explore our{" "}
              <Link href="/bom-sourcing">electronic BOM sourcing service</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="band-dark bom-final-cta" data-reveal>
            <div>
              <div className="eyebrow">Start With the Part Number</div>
              <h2>Let us map the available sourcing routes.</h2>
              <p>
                We aim to acknowledge RFQs within one business day, Monday
                through Friday. Research and quote timing varies by part.
              </p>
            </div>
            <Link href="/contact?project=obsolete-part" className="btn btn-clay btn-lg">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    </Animate>
  );
}
