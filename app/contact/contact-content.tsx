"use client";

import { Suspense, useRef } from "react";
import { usePageAnimations } from "@/lib/use-page-animations";
import ContactForm from "./contact-form";

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 7L12 13L20 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 12C21 16.4 17 20 12 20C10.7 20 9.5 19.8 8.4 19.4L3.5 20.5L5 16.6C4.4 15.5 4 14.3 4 13C4 8.6 7.6 5 12 5C16.4 5 21 7.6 21 12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SALES_TEAM = [
  {
    initials: "RL",
    role: "Sales Manager",
    name: "Rachel Luo",
    email: "rachel@songglow.com",
    whatsapp: "+86 137 2893 1414",
    avatarStyle: undefined,
  },
  {
    initials: "PK",
    role: "Sales Representative",
    name: "Phoebe Kim",
    email: "phoebe.kim@songglow.com",
    whatsapp: "+86 136 5955 5210",
    avatarStyle: {
      background: "linear-gradient(150deg, var(--sage) 0%, #4b5640 100%)",
    },
  },
];

export default function ContactContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  usePageAnimations(rootRef);

  return (
    <div ref={rootRef}>
      <header className="page-hero">
        <div className="wrap">
          <div className="eyebrow" data-hero-item>
            Get In Touch
          </div>
          <h1 data-hero-item>Have a BOM to source?</h1>
          <p data-hero-item>
            Fill out the form below and our team will get back to you within 24
            hours - or reach out to a sales contact directly.
          </p>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <div className="grid-2" style={{ gap: 40, alignItems: "start" }}>
            <div className="card" style={{ padding: 40 }} data-reveal>
              <h2 style={{ fontSize: 24, marginBottom: 28 }}>Send a message</h2>
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
              data-reveal-group
            >
              <h2 style={{ fontSize: 24, marginBottom: 4 }}>
                Contact our sales team
              </h2>

              {SALES_TEAM.map((person) => (
                <div key={person.initials} className="sales-card">
                  <div className="sales-avatar" style={person.avatarStyle}>
                    {person.initials}
                  </div>
                  <div>
                    <div className="sales-role">{person.role}</div>
                    <h4 style={{ color: "#0F1430" }}>{person.name}</h4>
                    <div className="sales-contact">
                      <a
                        className="sales-contact-row"
                        href={`mailto:${person.email}`}
                      >
                        <MailIcon /> {person.email}
                      </a>
                      <a
                        className="sales-contact-row"
                        href={`https://wa.me/${person.whatsapp.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ChatIcon /> WhatsApp: {person.whatsapp}
                      </a>
                    </div>
                  </div>
                </div>
              ))}

              <div
                className="card"
                style={{
                  background: "var(--dark)",
                  border: "none",
                  marginTop: 8,
                }}
              >
                <h4
                  style={{
                    fontFamily: "var(--serif)",
                    color: "var(--cream)",
                    fontSize: 18,
                    margin: "0 0 10px",
                    fontWeight: 600,
                  }}
                >
                  Response time
                </h4>
                <p
                  style={{
                    color: "rgba(247,244,236,0.7)",
                    fontSize: 15,
                    lineHeight: 1.6,
                  }}
                >
                  Our team replies to every inquiry within 24 hours, Monday
                  through Friday.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
