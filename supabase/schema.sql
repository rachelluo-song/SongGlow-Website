-- SongGlow contact form messages
-- Run this once in your Supabase project: Dashboard → SQL Editor → New query → paste → Run.

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  company text not null,
  email text not null,
  phone text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- RLS stays ON with no public policies: the anon (browser) key can neither
-- read nor write this table. Inserts happen only through the app's API route,
-- which uses the server-side service_role key.
alter table public.messages enable row level security;

-- ============================================================
-- Product catalog (Components + Hardware sections)
-- Add/edit rows in Dashboard → Table Editor → products.
-- The website reads this server-side; changes appear on the site
-- automatically (no deploy needed).
-- ============================================================

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  -- which catalog section the part belongs to
  section text not null check (section in ('components', 'hardware')),
  -- free-form category name, e.g. 'Microcontrollers', 'Fasteners'
  category text not null,
  part_number text not null,
  name text not null,
  manufacturer text,
  description text,
  -- key/value spec pairs shown on the site, e.g. {"Package": "LQFP48", "Flash": "64 KB"}
  specs jsonb not null default '{}'::jsonb,
  -- optional link to the manufacturer's official datasheet page (do not
  -- rehost PDFs — see compliance notes in project_specs.md)
  datasheet_url text,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- Optional: run this block once if you want two sample rows to see the
-- catalog pages working, then delete them in the Table Editor.
-- insert into public.products (section, category, part_number, name, manufacturer, specs) values
--   ('components', 'Microcontrollers', 'STM32F103C8T6', 'ARM Cortex-M3 MCU, 64KB Flash', 'STMicroelectronics',
--    '{"Package": "LQFP48", "Core": "Cortex-M3", "Flash": "64 KB"}'),
--   ('hardware', 'Fasteners', 'M3x8-PH-SS', 'M3 x 8mm Phillips Pan Head Screw, Stainless', null,
--    '{"Thread": "M3", "Length": "8 mm", "Material": "304 Stainless"}');
