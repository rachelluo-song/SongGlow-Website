/**
 * Registry of published guides. Single source of truth for the /guides
 * index and the sitemap. Individual guide pages keep their own detailed
 * metadata; the `blurb` here is the index-card summary.
 */
export type GuideMeta = {
  slug: string;
  title: string;
  blurb: string;
  datePublished: string;
  dateModified: string;
};

export const GUIDES: GuideMeta[] = [
  {
    slug: "how-to-choose-a-sourcing-partner",
    title: "How to Choose an Electronic Components Sourcing Partner",
    blurb:
      "The criteria that separate a real sourcing partner from a broker: traceability, channels, counterfeit avoidance, coverage, and the exact questions to ask before you commit an order.",
    datePublished: "2026-08-01",
    dateModified: "2026-08-08",
  },
  {
    slug: "how-to-find-component-alternates",
    title: "How to Find Alternates & Cross-References for Components",
    blurb:
      "Finding a substitute you can trust: form-fit-function alternates, cross-referencing without getting burned, the datasheet parameters that actually bite, and how to second-source before you need to.",
    datePublished: "2026-07-22",
    dateModified: "2026-08-08",
  },
  {
    slug: "how-to-source-obsolete-electronic-components",
    title: "How to Source Obsolete & End-of-Life Components",
    blurb:
      "What to do when a part goes end-of-life: last-time buys, approved alternates, authorized aftermarket, and how to buy on the open market without getting burned.",
    datePublished: "2026-07-22",
    dateModified: "2026-08-08",
  },
  {
    slug: "how-to-verify-authentic-electronic-components",
    title: "How to Verify Electronic Components Are Authentic",
    blurb:
      "A practical counterfeit-detection guide: sourcing rules, the documentation to demand, package and marking inspection, lab tests, and the red flags that should stop a purchase.",
    datePublished: "2026-07-20",
    dateModified: "2026-08-08",
  },
];
