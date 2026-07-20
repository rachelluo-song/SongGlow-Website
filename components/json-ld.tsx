/**
 * Renders a Schema.org structured-data block. Plain <script> (not
 * next/script) per the Next.js JSON-LD guide; "<" is escaped so catalog
 * strings can never break out of the tag.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
