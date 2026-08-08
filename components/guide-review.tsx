import Link from "next/link";
import { SITE_URL } from "@/lib/site";

export const GUIDE_REVIEW_DATE = "2026-08-08";

export const reviewedBySchema = {
  "@type": "Person",
  name: "Rachel Luo",
  jobTitle: "Sales Manager",
  url: `${SITE_URL}/about`,
  worksFor: {
    "@type": "Organization",
    name: "SongGlow",
    url: SITE_URL,
  },
};

export default function GuideReview() {
  return (
    <div className="guide-review" data-hero-item>
      <span>Written by SongGlow</span>
      <span aria-hidden>•</span>
      <span>
        Reviewed by <Link href="/about">Rachel Luo</Link>, Sales Manager
      </span>
      <span aria-hidden>•</span>
      <time dateTime={GUIDE_REVIEW_DATE}>Last reviewed August 8, 2026</time>
    </div>
  );
}
