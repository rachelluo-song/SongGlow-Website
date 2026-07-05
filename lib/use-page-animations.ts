"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Shared GSAP entrance/scroll animations, driven by data attributes:
 * - [data-hero-item]    staggered rise on page load
 * - [data-reveal]       fade-up when scrolled into view
 * - [data-reveal-group] children fade-up together with a stagger
 * - [data-float]        slow endless vertical drift (hero spheres)
 * All animations are skipped when the user prefers reduced motion.
 */
export function usePageAnimations(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-hero-item]", {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform",
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 36,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          gsap.from(group.children, {
            y: 36,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: group, start: "top 84%" },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 === 0 ? -16 : 14,
            duration: 6 + i * 1.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          });
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [rootRef]);
}
