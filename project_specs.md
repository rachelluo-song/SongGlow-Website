# Project Specs

## What the app does and who uses it
**SongGlow** — marketing website for an electronic-components sourcing agency
(BOM fulfillment for OEM/EMS teams). Visitors learn about services and contact
the sales team.

Source of truth for visuals: the Claude Design handoff bundle
`SongGlow Agency Website-handoff.zip` (index.html, services.html, contact.html,
styles.css, globe.js). The site is a faithful Next.js recreation of those designs.

## Tech stack
- **Language:** TypeScript
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind base + the SongGlow design system CSS ported verbatim
  from the handoff's `styles.css` (kept as global CSS so the result stays
  pixel-faithful to the design)
- **Animations:** GSAP + ScrollTrigger (entrance/scroll reveals, floating hero
  spheres), three.js (rotating Earth globe in the home hero) — all animations
  respect `prefers-reduced-motion`
- **Fonts:** Lora (serif) + Public Sans (sans) via `next/font`
- **Database/Auth:** none yet (contact form shows a success state client-side;
  Supabase wiring is a later task)
- **Hosting target:** Vercel

## Pages and user flows (all public, no auth)
- `/` — Home: dark hero card with three.js globe, trust strip, services
  preview, commitments list, dark CTA band
- `/components` — Electronic Components: directory of category cards
  (browse-first; search demoted to a "know the part number?" helper).
  `?q=` shows search results; no-match state offers "Request this part".
- `/components/[category]` — one category's parts table (breadcrumb back,
  "don't see the exact part?" CTA). Slug = lowercased-hyphenated category name.
- `/hardware` — directory grouped by family (Screws, Washers, O-Rings, …)
  ordered by commonality (`HARDWARE_FAMILY_ORDER` in lib/catalog.ts), then
  part count; card titles drop the family prefix
- `/hardware/[category]` — same template as components categories
- `/api/drawing/[id]` — parametric 2D dimension drawing (SVG) generated from
  the part's specs (lib/drawings.ts): screws (head style from category name),
  flat washers, O-rings. "Drawing ⤓" link appears on drawable rows. Geometry
  parses inch fractions/decimals, metric mm, ranges, and thread designations
  (#N, M-metric, fractional).
- Home page shows a "Browse the catalog" block (top 6 categories across both
  sections, revalidated every 5 min) when the catalog has data
- `/services` — six service cards, 3-step process, CTA band
- `/contact` — page hero, contact form (name, company, email, phone/WhatsApp,
  message; `?part=` prefills the message), sales team cards, response-time card

## Catalog content workflow (no deploy needed)
Rachel adds/edits rows in Supabase → Table Editor → `products`
(section = components|hardware, category, part_number, name, manufacturer,
description, specs as JSON key/values, optional datasheet_url). Catalog pages
render fresh on every request. Compliance: text specs only, datasheet LINKS to
manufacturer sites only (never rehost PDFs), no scraped distributor content.

## Data models / storage
Supabase Postgres, schema in `supabase/schema.sql`, RLS enabled with no public
policies on both tables; the browser never touches them directly.
- `public.messages` (id, name, company, email, phone, message, created_at) —
  contact form submissions via `/app/api/contact` (service_role insert)
- `public.products` (id, section, category, part_number, name, manufacturer,
  description, specs jsonb, datasheet_url, created_at) — catalog, read
  server-side by the /components and /hardware pages (service_role select)

## Third-party services
- **Supabase** — stores contact form submissions (env: `NEXT_PUBLIC_SUPABASE_URL`,
  `SUPABASE_SERVICE_ROLE_KEY`)
- **Resend** (optional) — emails the team on each new inquiry (env:
  `RESEND_API_KEY`, `CONTACT_NOTIFY_EMAIL`, `CONTACT_FROM_EMAIL`); skipped
  gracefully when unset, and an email failure never loses the stored message
- GSAP/three.js are client-side npm libraries. The globe texture loads from
  a public CDN (jsdelivr, with threejs.org fallback) — same as the design.

## Known deviations from the handoff (intentional)
- Emoji icons (✉️ 💬) on contact sales cards replaced with matching inline SVGs
  (CLAUDE.md rule: no emoji icons)
- `required` added to Company and Phone fields (labels marked * in the design)
- Form submit stores the message and shows a success panel (or a clear error)
- Nav "Contact Us" button unified to deep navy (`--navy-cta`, #0B00A0) on all
  pages (user decision 2026-07-04; design originally had navy on home only)
- Nav compacts slightly under 380px so logo and CTA don't collide (user
  request; ≥380px layouts untouched)

## What "done" looks like
- `npm run build` passes; no console errors in dev
- All three pages match the handoff visually, desktop and mobile
- Mobile nav toggle, form validation + success state work
