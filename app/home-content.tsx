"use client";

import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePageAnimations } from "@/lib/use-page-animations";

const GlobeSphere = dynamic(() => import("./globe-sphere"), { ssr: false });

const TRUST_ITEMS = [
  {
    title: "100% Authentic",
    body: "Original, genuine components - every time, with zero exceptions.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3L20 6.5V12C20 16.5 16.9 20.5 12 21.5C7.1 20.5 4 16.5 4 12V6.5L12 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M9 12L11 14L15 10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Full Traceability",
    body: "Lot and date-code tracking across the entire supply chain.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 7L12 3L21 7V17L12 21L3 17V7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M3 7L12 11L21 7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 11V21" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    title: "Qualified Suppliers",
    body: "Strict vetting standards protect you from counterfeit risk.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="9" r="3.2" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M5 20C5.8 16.5 8.6 14.5 12 14.5C15.4 14.5 18.2 16.5 19 20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const SERVICE_PREVIEWS = [
  {
    title: "Complete BOM Sourcing",
    body: "Upload your full bill of materials and we quote, source and manage every line item end to end.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 6H20M4 12H20M4 18H14"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Obsolete & Hard-to-Find",
    body: "Deep supplier network reach for end-of-life and allocation-constrained parts others can't place.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3V13M12 13L8 9M12 13L16 9M5 17H19"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Cost Optimization",
    body: "Multi-supplier bidding and alternative recommendations to bring landed cost down without risk.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 17L9 12L13 16L20 8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const COMMITMENTS = [
  "100% authentic and original components",
  "Full supply chain traceability",
  "Strict supplier qualification",
  "Counterfeit risk prevention",
  "Manufacturer-compliant packaging",
  "Lot and date code traceability, when available",
];

export default function HomeContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  usePageAnimations(rootRef);

  return (
    <div ref={rootRef}>
      <header className="hero">
        <div className="hero-card">
          <div className="hero-shapes">
            <div className="blob b4 sphere-deep">
              <div className="globe-frame">
                <GlobeSphere />
                <div className="globe-sheen" />
              </div>
            </div>
            <div className="blob b6 sphere-deep" data-float />
          </div>
          <div className="hero-content">
            <div className="hero-row" data-hero-item>
              <span className="pill">
                <span className="pill-dot" />
                100% Authentic Components
              </span>
            </div>
            <h1 data-hero-item>
              Your entire BOM,
              <br />
              sourced and verified.
            </h1>
            <div className="hero-row" data-hero-item>
              <Link
                href="/contact"
                className="avatars"
                aria-label="Contact our sales team"
              >
                <div className="av">RL</div>
                <div className="av">JT</div>
                <div className="av">MK</div>
                <div className="arrow">→</div>
              </Link>
            </div>
            <p className="hero-sub" style={{ fontFamily: "var(--serif)" }} data-hero-item>
              SongGlow supplies electronic components and semiconductors with
              full supply-chain traceability - sourcing, procurement, logistics
              and inventory management for OEM and EMS teams.
            </p>
            <div className="hero-cta-row" data-hero-item>
              <Link href="/contact" className="btn btn-navy btn-lg">
                Get a Quote
              </Link>
              <Link
                href="/services"
                className="btn btn-ghost btn-lg"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "#FBF9F4",
                }}
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <div className="trust-strip" data-reveal>
            {TRUST_ITEMS.map((item) => (
              <div key={item.title} className="trust-item">
                <div className="trust-icon">{item.icon}</div>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="section-head" data-reveal>
            <div className="eyebrow" style={{ color: "var(--navy-cta)" }}>
              What We Do
            </div>
            <h2>Sourcing support built for OEM &amp; EMS teams</h2>
            <p>
              From full BOM fulfillment to hard-to-find allocations, SongGlow
              keeps your production line supplied.
            </p>
          </div>
          <div className="grid-3" data-reveal-group>
            {SERVICE_PREVIEWS.map((service) => (
              <div key={service.title} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3>{service.title}</h3>
                <p>{service.body}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 36, textAlign: "center" }} data-reveal>
            <Link href="/services" className="btn btn-ghost">
              See All Services →
            </Link>
          </div>
        </div>
      </section>

      <section className="block tight">
        <div className="wrap">
          <div className="grid-2" style={{ alignItems: "center", gap: 64 }}>
            <div data-reveal>
              <div className="eyebrow">Our Commitment</div>
              <h2 style={{ fontSize: 38, marginBottom: 20 }}>
                Every shipment held to the same standard
              </h2>
              <p
                style={{
                  fontSize: 17,
                  color: "var(--ink-soft)",
                  marginBottom: 8,
                }}
              >
                Counterfeit risk is the biggest threat to a production line.
                Our process is built to eliminate it at every step.
              </p>
            </div>
            <div className="card" style={{ padding: 8 }} data-reveal>
              <div style={{ display: "flex", flexDirection: "column" }}>
                {COMMITMENTS.map((text, i) => (
                  <div
                    key={text}
                    style={{
                      display: "flex",
                      gap: 16,
                      padding: "20px 22px",
                      borderBottom:
                        i < COMMITMENTS.length - 1
                          ? "1px solid var(--line)"
                          : undefined,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--clay-dark)",
                        fontFamily: "var(--serif)",
                        fontWeight: 600,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="wrap">
          <div className="band-dark" data-reveal>
            <div className="section-head" style={{ marginBottom: 32 }}>
              <div className="eyebrow" style={{ color: "var(--clay-tint)" }}>
                Ready When You Are
              </div>
              <h2 style={{ fontSize: 38, maxWidth: 560 }}>
                Send us your BOM - get sourcing back within 24 hours
              </h2>
            </div>
            <Link href="/contact" className="btn btn-navy btn-lg">
              Contact Our Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
