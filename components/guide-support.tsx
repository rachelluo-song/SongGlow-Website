import Link from "next/link";
import { GUIDES } from "@/lib/guides";

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
        <Link href="/quality">Quality &amp; traceability →</Link>
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
