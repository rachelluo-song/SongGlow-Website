"use client";

import { useRef } from "react";
import { usePageAnimations } from "@/lib/use-page-animations";

/**
 * Client wrapper that applies the shared GSAP entrance/scroll animations
 * (data-hero-item / data-reveal / data-reveal-group) to server-rendered
 * children, e.g. the catalog pages.
 */
export default function Animate({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  usePageAnimations(rootRef);
  return <div ref={rootRef}>{children}</div>;
}
