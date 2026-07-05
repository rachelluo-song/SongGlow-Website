# SongGlow Website

Marketing site for SongGlow — electronic component sourcing & BOM fulfillment
for OEM/EMS teams. Built with Next.js (App Router), Tailwind CSS, GSAP, and a
three.js Earth in the hero. Contact form submissions are stored in Supabase
with an optional Resend email notification.

## Run locally

1. Copy `.env.example` to `.env.local` and fill in the values
2. `npm install`
3. `npm run dev`
4. Open http://localhost:3000

## Database

Run `supabase/schema.sql` once in the Supabase SQL Editor to create the
`messages` table (RLS enabled; the app writes via the server-side
`service_role` key only).

See `project_specs.md` for the full project blueprint.
