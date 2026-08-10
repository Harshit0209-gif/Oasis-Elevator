-- Row Level Security: public can read published content only; admins
-- (rows in admin_profiles with is_active = true) get full read/write.

-- security definer + fixed search_path: the recommended-safe pattern for a
-- role-check helper — runs with the function owner's privileges so it can
-- read admin_profiles regardless of that table's own RLS, without being
-- hijackable via a manipulated search_path.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from admin_profiles
    where user_id = auth.uid() and is_active = true
  );
$$;

-- ============================================================
-- admin_profiles — users can read their own row (to check their own
-- role client-side); only admins can read/manage everyone's.
-- ============================================================
alter table admin_profiles enable row level security;

create policy "self read" on admin_profiles
  for select to authenticated
  using (user_id = auth.uid());

create policy "admin full access" on admin_profiles
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- Singletons — always publicly readable (there's only one row; gating
-- it behind draft/published would mean the whole Hero/About/Footer
-- section could vanish). Only admins can update.
-- ============================================================
do $$
declare
  t text;
begin
  foreach t in array array['site_settings', 'hero', 'about_section', 'footer_section']
  loop
    execute format('alter table %I enable row level security;', t);
    execute format('create policy "public read" on %I for select using (true);', t);
    execute format('create policy "admin update" on %I for update to authenticated using (public.is_admin()) with check (public.is_admin());', t);
  end loop;
end $$;

-- ============================================================
-- Ordered/publishable collections — public reads published only,
-- admins get full CRUD.
-- ============================================================
do $$
declare
  t text;
begin
  foreach t in array array[
    'why_oasis_items', 'products', 'services', 'industries', 'process_steps',
    'projects', 'testimonials', 'statistics', 'certifications', 'faqs', 'clients'
  ]
  loop
    execute format('alter table %I enable row level security;', t);
    execute format('create policy "public read published" on %I for select using (status = ''published'');', t);
    execute format('create policy "admin full access" on %I for all to authenticated using (public.is_admin()) with check (public.is_admin());', t);
  end loop;
end $$;

-- Gallery tables inherit visibility from their parent product/project —
-- simplest correct rule: public can read a gallery row if its parent is
-- published; admins can do anything.
alter table product_gallery enable row level security;

create policy "public read via parent" on product_gallery
  for select
  using (exists (select 1 from products p where p.id = product_id and p.status = 'published'));

create policy "admin full access" on product_gallery
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

alter table project_gallery enable row level security;

create policy "public read via parent" on project_gallery
  for select
  using (exists (select 1 from projects p where p.id = project_id and p.status = 'published'));

create policy "admin full access" on project_gallery
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- Navigation — public reads visible items only; admin full CRUD.
-- ============================================================
alter table navigation_items enable row level security;

create policy "public read visible" on navigation_items
  for select using (is_visible = true);

create policy "admin full access" on navigation_items
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- SEO settings — publicly readable (needed to render <head> tags for
-- any visitor, including crawlers who never authenticate), admin-write.
-- ============================================================
alter table seo_settings enable row level security;

create policy "public read" on seo_settings
  for select using (true);

create policy "admin full access" on seo_settings
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- Media — publicly readable (harmless metadata; actual files are
-- separately gated via storage policies), admin-only write.
-- ============================================================
alter table media enable row level security;

create policy "public read" on media
  for select using (true);

create policy "admin full access" on media
  for all to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- ============================================================
-- Activity log — admin-only, no public access at all.
-- ============================================================
alter table activity_logs enable row level security;

create policy "admin read" on activity_logs
  for select to authenticated
  using (public.is_admin());

create policy "admin insert" on activity_logs
  for insert to authenticated
  with check (public.is_admin());
