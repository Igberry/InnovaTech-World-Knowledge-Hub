-- =====================================================================
-- Service packages & pricing  (run in Supabase -> SQL Editor)
-- One row per service per tier (basic / advanced / premium).
-- Mirrors course_plans. Needs public.is_admin() (from 0001).
-- Money is stored in KOBO (1 naira = 100 kobo). Re-running is safe.
-- Edit prices/features later in the Admin dashboard (Services pricing).
-- =====================================================================

create table if not exists public.service_plans (
  id           uuid primary key default gen_random_uuid(),
  service_slug text not null,
  plan         text not null check (plan in ('basic','advanced','premium')),
  price_kobo   integer not null check (price_kobo >= 0),
  currency     text not null default 'NGN',
  features     text[] not null default '{}',
  active       boolean not null default true,
  sort         integer not null default 0,
  updated_at   timestamptz not null default now(),
  unique (service_slug, plan)
);

alter table public.service_plans enable row level security;

drop policy if exists service_plans_read on public.service_plans;
create policy service_plans_read on public.service_plans
  for select to anon, authenticated using (active or public.is_admin());

drop policy if exists service_plans_admin on public.service_plans;
create policy service_plans_admin on public.service_plans
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- Seed packages (NGN, in kobo). Placeholder prices — edit in admin. ----------
insert into public.service_plans (service_slug, plan, price_kobo, features, sort) values
  -- Full Stack Web Development (per project)
  ('full-stack-web-development','basic',    15000000, array['Up to 5 custom pages','Mobile-responsive design','Contact form and basic SEO setup','Deployed and live'], 1),
  ('full-stack-web-development','advanced', 40000000, array['Everything in Basic','Up to 12 pages or a simple CMS','Custom features and integrations','Analytics and performance tuning'], 2),
  ('full-stack-web-development','premium',  90000000, array['Everything in Advanced','Full web app (accounts and database)','Payments or bookings integration','Priority support and handover training'], 3),

  -- WordPress Web Development (per project)
  ('wordpress-web-development','basic',     8000000, array['Up to 5-page WordPress site','Premium theme setup','Mobile-responsive','Basic on-page SEO'], 1),
  ('wordpress-web-development','advanced', 18000000, array['Everything in Basic','Up to 10 pages plus a blog','Custom design and plugins','Speed and security setup'], 2),
  ('wordpress-web-development','premium',  35000000, array['Everything in Advanced','WooCommerce online store','Advanced integrations','Training to manage it yourself'], 3),

  -- Data Analysis (per project)
  ('data-analysis','basic',     6000000, array['One dataset cleaned and analysed','Key insights report','One dashboard or chart set'], 1),
  ('data-analysis','advanced', 15000000, array['Everything in Basic','Interactive dashboard (Power BI or Sheets)','Multiple data sources combined','Recommendations walkthrough'], 2),
  ('data-analysis','premium',  35000000, array['Everything in Advanced','Automated reporting pipeline','Ongoing monthly insights','Team training session'], 3),

  -- Automation (per project)
  ('automation','basic',     5000000, array['One workflow automated','Built with free / no-code tools','Documentation and handover'], 1),
  ('automation','advanced', 12000000, array['Everything in Basic','Multi-step automations','App and data integrations','Error alerts and monitoring'], 2),
  ('automation','premium',  30000000, array['Everything in Advanced','Full process automation suite','Custom integrations','Ongoing maintenance support'], 3),

  -- Graphics Design (per project)
  ('graphics-design','basic',     2500000, array['Logo design (3 concepts)','2 rounds of revisions','Final files in all formats'], 1),
  ('graphics-design','advanced',  7000000, array['Everything in Basic','Full brand kit (colours and fonts)','Business card and letterhead','Social media templates'], 2),
  ('graphics-design','premium',  15000000, array['Everything in Advanced','Complete brand guidelines','10 social media designs','Priority turnaround'], 3),

  -- SEO, AEO & GEO (per month)
  ('seo-aeo-geo','basic',     6000000, array['Site and keyword audit','On-page SEO fixes','Monthly performance report'], 1),
  ('seo-aeo-geo','advanced', 15000000, array['Everything in Basic','Content and keyword strategy','Technical SEO and backlinks','AEO (AI answers) optimisation'], 2),
  ('seo-aeo-geo','premium',  35000000, array['Everything in Advanced','Full SEO / AEO / GEO growth plan','Content production','Priority strategy calls'], 3),

  -- Virtual Assistance (per month)
  ('virtual-assistance','basic',     4000000, array['Part-time VA (up to 20 hrs/week)','Email and calendar management','Basic admin tasks'], 1),
  ('virtual-assistance','advanced',  9000000, array['Everything in Basic','Dedicated VA (up to 40 hrs/week)','Customer support and data entry','Weekly reporting'], 2),
  ('virtual-assistance','premium',  18000000, array['Everything in Advanced','Senior VA plus backup cover','Project and team coordination','Priority availability'], 3)
on conflict (service_slug, plan) do nothing;
