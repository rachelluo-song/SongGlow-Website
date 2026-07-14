"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // "Request quote" buttons in the catalog link here with ?part=<part number>
  const part = useSearchParams().get("part");
  const prefilledMessage = part
    ? `I'd like a quote for part number: ${part}\n\nQuantity: \nTarget date: `
    : undefined;

  useEffect(() => {
    if (status === "sent" && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [status]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus("sending");

    const data = Object.fromEntries(new FormData(event.currentTarget));

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          typeof json.error === "string"
            ? json.error
            : "Something went wrong. Please try again."
        );
      }
      setStatus("sent");
    } catch (err) {
      setStatus("idle");
      setError(
        err instanceof Error && err.message
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={successRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: 380,
          gap: 12,
        }}
      >
        <span
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "var(--clay-tint)",
            color: "var(--clay-dark)",
            display: "grid",
            placeItems: "center",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5L10 17.5L19 7.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 style={{ fontSize: 22 }}>Message sent</h3>
        <p style={{ color: "var(--ink-soft)", maxWidth: 320 }}>
          Thanks for reaching out - our team will get back to you within 24
          hours, Monday through Friday.
        </p>
      </div>
    );
  }

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name *</label>
        <input id="name" name="name" type="text" placeholder="Jane Doe" required />
      </div>
      <div>
        <label htmlFor="company">Company *</label>
        <input
          id="company"
          name="company"
          type="text"
          placeholder="Acme Electronics"
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="jane@company.com"
          required
        />
      </div>
      <div>
        <label htmlFor="phone">Phone / WhatsApp *</label>
        <input
          id="phone"
          name="phone"
          type="text"
          placeholder="+1 555 000 0000"
          required
        />
      </div>
      <div className="full">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us about your BOM or project..."
          defaultValue={prefilledMessage}
          required
        />
      </div>
      {error && (
        <div
          className="full"
          role="alert"
          style={{
            background: "#FDF0EF",
            border: "1px solid #F2C9C4",
            color: "#B42318",
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 14.5,
          }}
        >
          {error}
        </div>
      )}
      <div className="full">
        <button
          type="submit"
          className="btn btn-clay btn-lg"
          style={{ width: "100%" }}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}
