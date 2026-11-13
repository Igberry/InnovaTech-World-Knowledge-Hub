-- =====================================================================
-- Switch service packages to USD HOURLY rates  (run in Supabase -> SQL Editor)
-- Services are now quoted per hour in US Dollars. Clients still PAY in Naira,
-- at the current Naira equivalent (a note is shown on the website).
--
-- price_kobo holds the amount in the row's `currency` MINOR units:
--   NGN rows -> kobo;  USD rows -> US cents.  (1 unit = 100 minor units.)
-- Re-running is safe. Edit later in Admin -> Services pricing (USD / hour).
-- =====================================================================

update public.service_plans sp
set price_kobo = v.cents,
    currency   = 'USD',
    updated_at = now()
from (values
  -- service_slug, plan, hourly rate in US cents ($20.00 = 2000)
  ('full-stack-web-development','basic',    2000),
  ('full-stack-web-development','advanced', 4000),
  ('full-stack-web-development','premium',  7000),

  ('wordpress-web-development','basic',     1500),
  ('wordpress-web-development','advanced',  2500),
  ('wordpress-web-development','premium',   4500),

  ('data-analysis','basic',                 2000),
  ('data-analysis','advanced',              3500),
  ('data-analysis','premium',               6000),

  ('automation','basic',                    2000),
  ('automation','advanced',                 3500),
  ('automation','premium',                  6000),

  ('graphics-design','basic',               1200),
  ('graphics-design','advanced',            2200),
  ('graphics-design','premium',             4000),

  ('seo-aeo-geo','basic',                   1800),
  ('seo-aeo-geo','advanced',                3000),
  ('seo-aeo-geo','premium',                 5000),

  ('virtual-assistance','basic',             800),
  ('virtual-assistance','advanced',         1400),
  ('virtual-assistance','premium',          2500)
) as v(service_slug, plan, cents)
where sp.service_slug = v.service_slug and sp.plan = v.plan;
