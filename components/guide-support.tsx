import Link from "next/link";
import { GUIDES } from "@/lib/guides";

export type GuideSource = {
  title: string;
  organization: string;
  url: string;
  note: string;
};

export function QuickAnswer({ children }: { children: React.ReactNode }) {
  return (
    <aside className="quick-answer" aria-label="Quick answer">
      <strong>Quick answer</strong>
      <p>{children}</p>
    </aside>
  );
}

export function GuideResources({ currentSlug }: { currentSlug: string }) {
  const relatedGuides = GUIDES.filter((guide) => guide.slug !== currentSlug);

  return (
    <aside className="guide-resources" aria-label="Related SongGlow resources">
      <h2>Related SongGlow resources</h2>
      <div>
        <Link href="/bom-sourcing">BOM sourcing &amp; fulfillment →</Link>
        <Link href="/quality">Receiving checks &amp; documentation →</Link>
        <Link href="/components">Browse electronic components →</Link>
        {relatedGuides.map((guide) => (
          <Link key={guide.slug} href={`/guides/${guide.slug}`}>
            {guide.title} →
          </Link>
        ))}
      </div>
    </aside>
  );
}

export function GuideSources({ sources }: { sources: GuideSource[] }) {
  return (
    <aside className="guide-sources" aria-labelledby="industry-references">
      <h2 id="industry-references">Industry references</h2>
      <p className="guide-sources-note">
        These public sources inform the general guidance above. They do not
        represent SongGlow certifications or testing accreditations.
      </p>
      <ul>
        {sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer">
              {source.title}
            </a>
            <span>{source.organization}</span>
            <p>{source.note}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
