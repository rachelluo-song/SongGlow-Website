"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";
import { getInquiryAttribution } from "@/lib/attribution";

export default function InquiryAttribution() {
  useEffect(() => {
    getInquiryAttribution();

    function trackContactIntent(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const analyticsTarget = event.target.closest<HTMLElement>(
        "[data-analytics-event]"
      );
      if (analyticsTarget) {
        const eventName = analyticsTarget.dataset.analyticsEvent;
        if (eventName) {
          const properties: Record<string, string> = {
            source_page: window.location.pathname,
          };
          if (analyticsTarget.dataset.analyticsLocation) {
            properties.location = analyticsTarget.dataset.analyticsLocation;
          }
          if (analyticsTarget.dataset.analyticsFormat) {
            properties.format = analyticsTarget.dataset.analyticsFormat;
          }
          track(eventName, properties);
          return;
        }
      }

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
          source_page: window.location.pathname,
        });
      }
    }

    function trackCatalogSearch(event: SubmitEvent) {
      if (!(event.target instanceof HTMLFormElement)) return;
      const form = event.target;
      const action = new URL(form.action, window.location.origin);
      if (action.origin !== window.location.origin || action.pathname !== "/search") {
        return;
      }

      const query = new FormData(form).get("q");
      if (typeof query !== "string" || !query.trim()) return;

      track("Catalog Search Submitted", {
        source: form.dataset.analyticsSearchSource ?? "unknown",
        query: query.trim().slice(0, 100),
      });
    }

    document.addEventListener("click", trackContactIntent, true);
    document.addEventListener("submit", trackCatalogSearch, true);
    return () => {
      document.removeEventListener("click", trackContactIntent, true);
      document.removeEventListener("submit", trackCatalogSearch, true);
    };
  }, []);

  return null;
}
