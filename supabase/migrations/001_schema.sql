-- Oasis Elevators CMS — core schema
-- Run this in the Supabase SQL Editor (or `supabase db push` if using the CLI).

create extension if not exists "pgcrypto";

-- ============================================================
-- Admin authorization (links to Supabase Auth's auth.users)
-- ============================================================
create table if not exists admin_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- ============================================================
-- Singleton content (one row each — page-level sections that must
-- always render something, so they're not draft/publish gated)
-- ============================================================
create table if not exists site_settings (
  id int primary key default 1 check (id = 1),
  company_name text not null default '',
  logo_url text,
  favicon_url text,
  phone text,
  emergency_phone text,
  email text,
  address_line1 text,
  address_line2 text,
  city text,
  state text,
  postal_code text,
  country text default 'India',
  geo_lat double precision,
  geo_lng double precision,
  facebook_url text,
  linkedin_url text,
  instagram_url text,
  primary_cta_text text,
  primary_cta_link text,
  copyright_text text,
  google_analytics_id text,
  updated_at timestamptz not null default now()
);

create table if not exists hero (
  id int primary key default 1 check (id = 1),
  heading text not null default '',
  subheading text,
  description text,
  badge_text text,
  supporting_text text,
  primary_cta_text text,
  primary_cta_link text,
  secondary_cta_text text,
  secondary_cta_link text,
  image_url text,
  video_url text,
  updated_at timestamptz not null default now()
);

create table if not exists about_section (
  id int primary key default 1 check (id = 1),
  title text not null default '',
  subtitle text,
  description text,
  image_url text,
  -- Array of {title, description} — the two intro blocks ("Engineering, not
  -- just installation." / "Quality over quantity.").
  supporting_points jsonb not null default '[]'::jsonb,
  -- Array of {icon, title, description} — the three mission pillars
  -- (Quality/Commitment/Execution). Not in the spec's literal field list for
  -- "About Oasis", but it's real editable copy on the page, so it's included
  -- under the same "entire website is manageable" goal.
  mission_items jsonb not null default '[]'::jsonb,
  cta_text text,
  cta_link text,
  updated_at timestamptz not null default now()
);

create table if not exists footer_section (
  id int primary key default 1 check (id = 1),
  description text,
  business_hours text,
  copyright_text text,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- Ordered / publishable collections
-- ============================================================
create table if not exists why_oasis_items (
  id uuid primary key default gen_random_uuid(),
  eyebrow text,
  title text not null,
  description text not null,
  image_url text,
  image_alt text,
  image_position text default 'right' check (image_position in ('left', 'right')),
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text,
  short_description text,
  full_description text,
  image_url text,
  image_alt text,
  features text[] not null default '{}',
  applications text[] not null default '{}',
  ideal_for text,
  specifications jsonb not null default '{}'::jsonb,
  featured boolean not null default false,
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists product_gallery (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  image_url text not null,
  alt_text text,
  display_order int not null default 0
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  image_url text,
  image_alt text,
  icon text,
  features text[] not null default '{}',
  cta_text text,
  cta_link text,
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists industries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  image_url text,
  image_alt text,
  icon text,
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists process_steps (
  id uuid primary key default gen_random_uuid(),
  floor_number int,
  title text not null,
  description text not null,
  short_label text,
  icon text,
  image_url text,
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  location text,
  client text,
  project_type text,
  description text,
  image_url text,
  image_alt text,
  products_used text[] not null default '{}',
  completion_date date,
  featured boolean not null default false,
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_gallery (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  image_url text not null,
  alt_text text,
  display_order int not null default 0
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  company text,
  designation text,
  testimonial text not null,
  photo_url text,
  rating int check (rating between 1 and 5),
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists statistics (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value numeric not null,
  prefix text default '',
  suffix text default '',
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuing_organization text,
  image_url text,
  description text,
  year int,
  link text,
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo_url text,
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  display_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists navigation_items (
  id uuid primary key default gen_random_uuid(),
  menu_name text not null,
  link text not null,
  is_external boolean not null default false,
  display_order int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists seo_settings (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null unique,
  page_title text,
  meta_description text,
  keywords text,
  og_title text,
  og_description text,
  og_image_url text,
  canonical_url text,
  robots text not null default 'index, follow',
  updated_at timestamptz not null default now()
);

create table if not exists media (
  id uuid primary key default gen_random_uuid(),
  filename text not null,
  storage_path text not null,
  bucket_id text not null default 'media',
  public_url text not null,
  alt_text text default '',
  mime_type text,
  file_size bigint,
  width int,
  height int,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id)
);

create table if not exists activity_logs (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references auth.users(id),
  admin_name text,
  action text not null,
  table_name text not null,
  record_id text,
  record_label text,
  details jsonb,
  created_at timestamptz not null default now()
);

-- Seed the singleton rows so `select` always finds a row to read/update.
insert into site_settings (id) values (1) on conflict (id) do nothing;
insert into hero (id) values (1) on conflict (id) do nothing;
insert into about_section (id) values (1) on conflict (id) do nothing;
insert into footer_section (id) values (1) on conflict (id) do nothing;

-- updated_at auto-touch trigger, reused by every table that has the column.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array[
    'site_settings', 'hero', 'about_section', 'footer_section',
    'why_oasis_items', 'products', 'services', 'industries', 'process_steps',
    'projects', 'testimonials', 'statistics', 'certifications', 'faqs', 'clients',
    'navigation_items', 'seo_settings'
  ]
  loop
    execute format(
      'drop trigger if exists set_updated_at on %I; create trigger set_updated_at before update on %I for each row execute function public.touch_updated_at();',
      t, t
    );
  end loop;
end $$;
