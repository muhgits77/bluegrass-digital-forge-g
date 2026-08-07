-- BLUEGRASS DIGITAL FORGE — Supabase schema for Demo Manager
-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

-- 1. Table
create table if not exists public.forge_demos (
  id text primary key,
  title text not null default '',
  slug text not null default '',
  category text not null default 'Other',
  href text not null default '',
  description text not null default '',
  image text,
  image_alt text,
  sort_order integer not null default 99,
  visible boolean not null default true,
  -- Homepage "Featured Work" flag (order lives in forge_settings.homepage_featured_slugs)
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- MIGRATIONS (safe to re-run)
-- Supabase Dashboard → SQL Editor → paste & run:
-- ============================================================
alter table public.forge_demos
  add column if not exists featured boolean not null default false;

alter table public.forge_demos
  add column if not exists image_alt text;

-- Ordered homepage Featured Work (max 6 slugs) — admin is source of truth
create table if not exists public.forge_settings (
  key text primary key,
  value jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists forge_demos_sort_order_idx on public.forge_demos (sort_order);
create index if not exists forge_demos_visible_idx on public.forge_demos (visible);
create index if not exists forge_demos_featured_idx on public.forge_demos (featured);
create unique index if not exists forge_demos_slug_unique on public.forge_demos (slug);

-- 2. Auto-update updated_at
create or replace function public.set_forge_demos_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists forge_demos_updated_at on public.forge_demos;
create trigger forge_demos_updated_at
  before update on public.forge_demos
  for each row execute function public.set_forge_demos_updated_at();

-- 3. RLS (enable + permissive anon policies for demo admin — tighten for production)
alter table public.forge_demos enable row level security;

drop policy if exists "forge_demos_anon_select" on public.forge_demos;
create policy "forge_demos_anon_select"
  on public.forge_demos for select
  to anon, authenticated
  using (true);

drop policy if exists "forge_demos_anon_insert" on public.forge_demos;
create policy "forge_demos_anon_insert"
  on public.forge_demos for insert
  to anon, authenticated
  with check (true);

drop policy if exists "forge_demos_anon_update" on public.forge_demos;
create policy "forge_demos_anon_update"
  on public.forge_demos for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "forge_demos_anon_delete" on public.forge_demos;
create policy "forge_demos_anon_delete"
  on public.forge_demos for delete
  to anon, authenticated
  using (true);

-- forge_settings RLS (homepage featured slug order, etc.)
alter table public.forge_settings enable row level security;

drop policy if exists "forge_settings_anon_select" on public.forge_settings;
create policy "forge_settings_anon_select"
  on public.forge_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "forge_settings_anon_insert" on public.forge_settings;
create policy "forge_settings_anon_insert"
  on public.forge_settings for insert
  to anon, authenticated
  with check (true);

drop policy if exists "forge_settings_anon_update" on public.forge_settings;
create policy "forge_settings_anon_update"
  on public.forge_settings for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "forge_settings_anon_delete" on public.forge_settings;
create policy "forge_settings_anon_delete"
  on public.forge_settings for delete
  to anon, authenticated
  using (true);

-- 4. Storage bucket (create "demos" as Public in Dashboard → Storage if not exists)
-- Then run these storage policies:

-- insert into storage.buckets (id, name, public) values ('demos', 'demos', true)
-- on conflict (id) do update set public = true;

-- drop policy if exists "demos_public_read" on storage.objects;
-- create policy "demos_public_read"
--   on storage.objects for select
--   to anon, authenticated
--   using (bucket_id = 'demos');

-- drop policy if exists "demos_anon_upload" on storage.objects;
-- create policy "demos_anon_upload"
--   on storage.objects for insert
--   to anon, authenticated
--   with check (bucket_id = 'demos' and (storage.foldername(name))[1] = 'demo-images');