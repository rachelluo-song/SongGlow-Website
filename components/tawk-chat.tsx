"use client";

import { useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Tawk_API?: {
      maximize?: () => void;
    };
  }
}

export default function TawkChat() {
  const [shouldLoad, setShouldLoad] = useState(false);

  function openChat() {
    if (window.Tawk_API?.maximize) {
      window.Tawk_API.maximize();
      return;
    }
    setShouldLoad(true);
  }

  return (
    <>
      {shouldLoad && (
        <Script
          id="tawk-to"
          src="https://embed.tawk.to/6a64d3a185c9821d4774c059/1juctlcm5"
          strategy="afterInteractive"
          onLoad={() => window.Tawk_API?.maximize?.()}
        />
      )}
      {!shouldLoad && (
        <button
          type="button"
          className="chat-trigger"
          onClick={openChat}
          aria-label="Open SongGlow live chat"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M20 11.5C20 15.6 16.4 19 12 19C10.8 19 9.7 18.8 8.7 18.4L4 19.5L5.4 15.8C4.8 14.7 4.5 13.6 4.5 12.5C4.5 8.4 7.8 5 12 5C16.2 5 20 7.4 20 11.5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
            <path d="M8.5 12H15.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          Chat
        </button>
      )}
    </>
  );
}
