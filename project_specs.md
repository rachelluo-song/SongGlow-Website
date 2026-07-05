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
- `/services` — six service cards, 3-step process, CTA band
- `/contact` — page hero, contact form (name, company, email, phone/WhatsApp,
  message), sales team cards (Rachel Luo, Phoebe Kim), response-time card

## Data models / storage
Supabase Postgres table `public.messages` (id, name, company, email, phone,
message, created_at) — schema in `supabase/schema.sql`. RLS is enabled with no
public policies; the browser never touches the table. The form POSTs to
`/app/api/contact` which inserts using the server-side `service_role` key.

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
