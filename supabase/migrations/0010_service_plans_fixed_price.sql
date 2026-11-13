-- =====================================================================
-- Add a FIXED one-time price (in Naira) to service packages, refresh
-- features to include an estimated duration, and drop part/full-time wording.
-- Run in Supabase -> SQL Editor, after 0008 and 0009. Re-running is safe.
--
-- Services now have TWO prices:
--   price_kobo        -> HOURLY rate in USD cents   (currency = 'USD')
--   fixed_price_kobo  -> one-time FIXED price in NGN kobo
-- A client chooses hourly (billed per hour, paid in Naira equivalent) OR the
-- fixed one-time Naira price. Edit both in Admin -> Services pricing.
-- =====================================================================

alter table public.service_plans
  add column if not exists fixed_price_kobo integer not null default 0;

update public.service_plans sp
set features         = v.features,
    fixed_price_kobo = v.fixed_kobo,
    updated_at       = now()
from (values
  -- service_slug, plan, features (duration first), fixed one-time NGN (kobo)
  ('full-stack-web-development','basic',    array['Estimated timeline: 3 months','Up to 5 custom pages','Mobile-responsive design','Contact form and basic SEO setup','Deployed and live']::text[], 15000000),
  ('full-stack-web-development','advanced', array['Estimated timeline: 2 months','Everything in Basic','Up to 12 pages or a simple CMS','Custom features and integrations','Analytics and performance tuning']::text[], 40000000),
  ('full-stack-web-development','premium',  array['Estimated timeline: 1 month','Everything in Advanced','Full web app (accounts and database)','Payments or bookings integration','Priority support and handover training']::text[], 90000000),

  ('wordpress-web-development','basic',     array['Estimated timeline: 1 month','Up to 5-page WordPress site','Premium theme setup','Mobile-responsive','Basic on-page SEO']::text[], 8000000),
  ('wordpress-web-development','advanced',  array['Estimated timeline: 3 weeks','Everything in Basic','Up to 10 pages plus a blog','Custom design and plugins','Speed and security setup']::text[], 18000000),
  ('wordpress-web-development','premium',   array['Estimated timeline: 2 weeks','Everything in Advanced','WooCommerce online store','Advanced integrations','Training to manage it yourself']::text[], 35000000),

  ('data-analysis','basic',                 array['Estimated timeline: 3 weeks','One dataset cleaned and analysed','Key insights report','One dashboard or chart set']::text[], 6000000),
  ('data-analysis','advanced',              array['Estimated timeline: 2 weeks','Everything in Basic','Interactive dashboard (Power BI or Sheets)','Multiple data sources combined','Recommendations walkthrough']::text[], 15000000),
  ('data-analysis','premium',               array['Estimated timeline: 1 week','Everything in Advanced','Automated reporting pipeline','Ongoing monthly insights','Team training session']::text[], 35000000),

  ('automation','basic',                    array['Estimated timeline: 3 weeks','One workflow automated','Built with free / no-code tools','Documentation and handover']::text[], 5000000),
  ('automation','advanced',                 array['Estimated timeline: 2 weeks','Everything in Basic','Multi-step automations','App and data integrations','Error alerts and monitoring']::text[], 12000000),
  ('automation','premium',                  array['Estimated timeline: 1 week','Everything in Advanced','Full process automation suite','Custom integrations','Ongoing maintenance support']::text[], 30000000),

  ('graphics-design','basic',               array['Estimated timeline: 2 weeks','Logo design (3 concepts)','2 rounds of revisions','Final files in all formats']::text[], 2500000),
  ('graphics-design','advanced',            array['Estimated timeline: 1 week','Everything in Basic','Full brand kit (colours and fonts)','Business card and letterhead','Social media templates']::text[], 7000000),
  ('graphics-design','premium',             array['Estimated timeline: 5 days','Everything in Advanced','Complete brand guidelines','10 social media designs','Priority turnaround']::text[], 15000000),

  ('seo-aeo-geo','basic',                   array['Estimated timeline: 3 months','Site and keyword audit','On-page SEO fixes','Monthly performance report']::text[], 6000000),
  ('seo-aeo-geo','advanced',                array['Estimated timeline: 2 months','Everything in Basic','Content and keyword strategy','Technical SEO and backlinks','AEO (AI answers) optimisation']::text[], 15000000),
  ('seo-aeo-geo','premium',                 array['Estimated timeline: 1 month','Everything in Advanced','Full SEO / AEO / GEO growth plan','Content production','Priority strategy calls']::text[], 35000000),

  ('virtual-assistance','basic',            array['Minimum engagement: 1 month','Email and calendar management','Basic admin and data entry']::text[], 4000000),
  ('virtual-assistance','advanced',         array['Minimum engagement: 1 month','Everything in Basic','Customer support and scheduling','Weekly reporting']::text[], 9000000),
  ('virtual-assistance','premium',          array['Minimum engagement: 1 month','Everything in Advanced','Senior VA with backup cover','Project and team coordination','Priority availability']::text[], 18000000)
) as v(service_slug, plan, features, fixed_kobo)
where sp.service_slug = v.service_slug and sp.plan = v.plan;
