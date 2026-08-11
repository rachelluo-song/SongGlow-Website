<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## SongGlow commercial-copy guardrails

- SongGlow is a quote-to-order BOM sourcing service and holds no inventory. Never write `in stock`, imply owned stock, or present catalog listings as availability.
- Describe the workflow accurately: receive the customer BOM and requested quantities, search potential sources, compare suitable quotations for value and lead time, and coordinate the approved order.
- Source or channel documentation is best-effort and varies by supplier and part. Never guarantee complete traceability or documentation for every BOM line.
- After receipt, SongGlow performs a visual check of external packaging condition and visible order/label information, then photographs the packaging and labels for the customer.
- SongGlow does not perform X-ray, XRF, decapsulation, electrical testing, solderability testing, destructive testing, or laboratory authentication. Do not imply that visual receiving checks prove authenticity.
- Do not promise that every BOM line can be sourced, do not claim `100% authentic`, and do not imply certifications or authorized-distributor status that SongGlow does not hold.
