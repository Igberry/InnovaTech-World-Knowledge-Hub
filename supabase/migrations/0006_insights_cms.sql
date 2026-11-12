-- Supabase-backed Insights editor and public article storage.
-- Run manually in the owner's Supabase SQL Editor after migrations 0001-0005.

create table public.insight_posts (
  id                  uuid primary key default gen_random_uuid(),
  slug                text not null unique
                      check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title               text not null check (length(trim(title)) between 1 and 160),
  description         text not null check (length(trim(description)) between 1 and 320),
  body_markdown       text not null check (length(trim(body_markdown)) > 0),
  category            text,
  tags                text[] not null default '{}',
  author              text not null default 'InnovaTech World',
  status              text not null default 'draft'
                      check (status in ('draft', 'scheduled', 'published')),
  scheduled_at        timestamptz,
  published_at        timestamptz,
  featured_image_url  text,
  featured_image_alt  text,
  created_by          uuid not null default auth.uid() references auth.users(id),
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  check (status <> 'scheduled' or scheduled_at is not null),
  check (featured_image_url is null or nullif(trim(featured_image_alt), '') is not null)
);

create index insight_posts_public_order
  on public.insight_posts (published_at desc, scheduled_at desc)
  where status in ('scheduled', 'published');

alter table public.insight_posts enable row level security;
revoke all on public.insight_posts from anon, authenticated;
grant select on public.insight_posts to anon, authenticated;
grant insert, update, delete on public.insight_posts to authenticated;

create policy insight_posts_public_read
  on public.insight_posts for select to anon, authenticated
  using (
    (status = 'published' and (scheduled_at is null or scheduled_at <= now()))
    or (status = 'scheduled' and scheduled_at <= now())
  );

create policy insight_posts_admin_read
  on public.insight_posts for select to authenticated
  using (public.is_admin());

create policy insight_posts_admin_insert
  on public.insight_posts for insert to authenticated
  with check (public.is_admin() and created_by = (select auth.uid()));

create policy insight_posts_admin_update
  on public.insight_posts for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy insight_posts_admin_delete
  on public.insight_posts for delete to authenticated
  using (public.is_admin());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'insights-images',
  'insights-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

grant select on storage.objects to anon, authenticated;
grant insert, update, delete on storage.objects to authenticated;

create policy insights_images_public_read
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'insights-images');

create policy insights_images_admin_insert
  on storage.objects for insert to authenticated
  with check (bucket_id = 'insights-images' and public.is_admin());

create policy insights_images_admin_update
  on storage.objects for update to authenticated
  using (bucket_id = 'insights-images' and public.is_admin())
  with check (bucket_id = 'insights-images' and public.is_admin());

create policy insights_images_admin_delete
  on storage.objects for delete to authenticated
  using (bucket_id = 'insights-images' and public.is_admin());
