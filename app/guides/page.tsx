import type { Metadata } from "next";
import Link from "next/link";
import Animate from "@/components/animate";
import { GUIDES } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Sourcing Guides - SongGlow",
  description:
    "Practical guides for electronics buyers and engineers: verifying component authenticity, sourcing obsolete and end-of-life parts, and protecting your production line.",
  alternates: { canonical: "/guides" },
};

export default function GuidesIndexPage() {
  return (
    <Animate>
      <header className="page-hero">
        <div className="wrap">
          <div className="eyebrow" data-hero-item>
            Guides
          </div>
          <h1 data-hero-item>Sourcing guides</h1>
          <p data-hero-item>
            Practical, no-fluff guidance for buyers and engineers on keeping a
            production line supplied with genuine parts.
          </p>
        </div>
      </header>

      <section className="block tight">
        <div className="wrap">
          <div className="guide-list" data-reveal-group>
            {GUIDES.map((guide) => (
              <Link
                key={guide.slug}
                href={`/guides/${guide.slug}`}
                className="guide-card"
              >
                <h2>{guide.title}</h2>
                <p>{guide.blurb}</p>
                <span className="guide-readmore">Read the guide →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Animate>
  );
}
