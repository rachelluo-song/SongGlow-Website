import { SITE_URL } from "@/lib/site";

export const GUIDE_REVIEW_DATE = "2026-08-09T00:00:00Z";
const RACHEL_LINKEDIN = "https://www.linkedin.com/in/rachel-y-lo-6499a0387/";

export const reviewedBySchema = {
  "@type": "Person",
  name: "Rachel Luo",
  jobTitle: "Sales Manager",
  url: `${SITE_URL}/about`,
  sameAs: [RACHEL_LINKEDIN],
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
        Reviewed by{" "}
        <a
          href={RACHEL_LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
        >
          Rachel Luo
        </a>
        , Sales Manager
      </span>
      <span aria-hidden>•</span>
      <time dateTime={GUIDE_REVIEW_DATE}>Last reviewed August 9, 2026</time>
    </div>
  );
}
