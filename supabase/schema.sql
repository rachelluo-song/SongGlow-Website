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
