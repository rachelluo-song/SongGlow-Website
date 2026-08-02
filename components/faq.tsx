import JsonLd from "@/components/json-ld";

/**
 * A single FAQ entry. `answer` may be one paragraph or several; the same
 * text drives both the visible block and the FAQPage schema, so the two can
 * never drift apart (Google requires FAQ markup to match on-page content).
 */
export type FaqItem = { question: string; answer: string | string[] };

const paras = (answer: string | string[]): string[] =>
  Array.isArray(answer) ? answer : [answer];

/**
 * Renders a visible FAQ list plus matching FAQPage structured data. Drop one
 * per page (a page should carry at most one FAQPage). Sits inside `.article`
 * so it inherits guide typography; the heading is a plain <h2>.
 */
export default function Faq({
  items,
  heading = "Frequently asked questions",
}: {
  items: FaqItem[];
  heading?: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: paras(item.answer).join("\n\n"),
      },
    })),
  };

  return (
    <div className="faq">
      <JsonLd data={schema} />
      <h2>{heading}</h2>
      <dl className="faq-list">
        {items.map((item) => (
          <div key={item.question} className="faq-item">
            <dt>{item.question}</dt>
            <dd>
              {paras(item.answer).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
