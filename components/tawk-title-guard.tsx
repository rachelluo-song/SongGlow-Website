"use client";

import { useEffect } from "react";

/**
 * Stops Tawk.to from flashing the browser tab title with "N new message"
 * (it toggles document.title on a timer, which reads as flickering). We watch
 * the <title> and revert any Tawk-style notification back to the real page
 * title; genuine route-change titles are accepted so navigation still works.
 */
export default function TawkTitleGuard() {
  useEffect(() => {
    const titleEl = document.querySelector("title");
    if (!titleEl) return;

    // Tawk notifications look like "1 new message" or "(1) …" — never a real
    // SongGlow page title, so these are safe to treat as the flash to block.
    const NOTIFICATION = /^\s*\(\d+\)|new message|unread/i;
    let realTitle = document.title;

    const observer = new MutationObserver(() => {
      const current = document.title;
      if (current === realTitle) return;
      if (NOTIFICATION.test(current)) {
        document.title = realTitle; // undo Tawk's flash
      } else {
        realTitle = current; // a legit page-navigation title
      }
    });

    observer.observe(titleEl, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    return () => observer.disconnect();
  }, []);

  return null;
}
