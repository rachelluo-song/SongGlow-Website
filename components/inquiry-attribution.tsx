"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { getInquiryAttribution } from "@/lib/attribution";

export default function InquiryAttribution() {
  useEffect(() => {
    getInquiryAttribution();

    function trackContactIntent(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const chatButton = event.target.closest(".chat-trigger");
      if (chatButton) {
        track("Live Chat Opened");
        return;
      }

      const anchor = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      if (href.startsWith("mailto:")) {
        track("Direct Contact Clicked", { channel: "email" });
        return;
      }

      if (href.startsWith("https://wa.me/")) {
        track("Direct Contact Clicked", { channel: "whatsapp" });
        return;
      }

      const destination = new URL(href, window.location.origin);
      if (
        destination.origin === window.location.origin &&
        destination.pathname === "/contact"
      ) {
        track("Contact CTA Clicked", {
          inquiry_type: destination.searchParams.has("part")
            ? "part"
            : destination.searchParams.get("project") === "bom"
              ? "bom"
              : "general",
        });
      }
    }

    document.addEventListener("click", trackContactIntent, true);
    return () => document.removeEventListener("click", trackContactIntent, true);
  }, []);

  return null;
}
