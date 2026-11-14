-- =====================================================================
-- Per-SERVICE hourly rate (USD), separate from the fixed-price packages.
-- Run in Supabase -> SQL Editor, after 0008-0010. Re-running is safe.
--
-- Model now:
--   service_plans.fixed_price_kobo  -> Basic/Advanced/Premium FIXED one-time price (NGN)
--   service_rates.hourly_price_kobo -> ONE hourly rate per service (USD cents),
--                                      for clients hiring the service on contract /
--                                      as an ongoing hire. Paid in the Naira equivalent.
-- Edit both in Admin. (service_plans.price_kobo is no longer used for display.)
-- =====================================================================

create table if not exists public.service_rates (
  service_slug      text primary key,
  hourly_price_kobo integer not null default 0,  -- USD cents ($20.00 = 2000)
  currency          text not null default 'USD',
  active            boolean not null default true,
  updated_at        timestamptz not null default now()
);

alter table public.service_rates enable row level security;

drop policy if exists service_rates_read on public.service_rates;
create policy service_rates_read on public.service_rates
  for select to anon, authenticated using (active or public.is_admin());

drop policy if exists service_rates_admin on public.service_rates;
create policy service_rates_admin on public.service_rates
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Seed one hourly rate per service (USD cents). Placeholder — edit in Admin.
insert into public.service_rates (service_slug, hourly_price_kobo) values
  ('full-stack-web-development', 4000),
  ('wordpress-web-development',  2500),
  ('data-analysis',             3500),
  ('automation',                3500),
  ('graphics-design',           2200),
  ('seo-aeo-geo',               3000),
  ('virtual-assistance',        1400)
on conflict (service_slug) do nothing;
