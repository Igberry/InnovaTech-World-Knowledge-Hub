// Service catalogue (marketing copy + layout metadata).
// Prices and tier features live in Supabase (service_plans) and are editable in
// the Admin dashboard. This file holds only the public-facing descriptions and
// the slug that links a service to its pricing rows. Keep slugs in sync with
// supabase/migrations/0008_service_plans.sql.

export type ServiceCadence = 'hour';

export interface ServiceMeta {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string; // lucide icon name
  cadence: ServiceCadence; // how the price reads: per project or per month
}

export const services: ServiceMeta[] = [
  {
    slug: 'full-stack-web-development',
    title: 'Full Stack Web Development',
    tagline: 'Custom websites and web apps, built to perform.',
    description:
      'We design, build and deploy fast, modern websites and full web applications, coded from the ground up for your exact needs.',
    icon: 'lucide:code',
    cadence: 'hour',
  },
  {
    slug: 'wordpress-web-development',
    title: 'WordPress Web Development',
    tagline: 'Professional WordPress sites you can manage yourself.',
    description:
      'Polished, secure WordPress sites and online stores, set up so you can update content on your own with confidence.',
    icon: 'lucide:layout-template',
    cadence: 'hour',
  },
  {
    slug: 'data-analysis',
    title: 'Data Analysis',
    tagline: 'Turn your data into clear, usable decisions.',
    description:
      'We clean, analyse and visualise your data into dashboards and reports that show what is really happening and what to do next.',
    icon: 'lucide:bar-chart-3',
    cadence: 'hour',
  },
  {
    slug: 'automation',
    title: 'Automation',
    tagline: 'Cut repetitive work with reliable automations.',
    description:
      'We map your repetitive tasks and build dependable automations that save hours every week, using affordable no-code tools.',
    icon: 'lucide:workflow',
    cadence: 'hour',
  },
  {
    slug: 'graphics-design',
    title: 'Graphics Design',
    tagline: 'Clean, professional visuals for your brand.',
    description:
      'Logos, brand kits and social media designs that make your business look credible and consistent everywhere it appears.',
    icon: 'lucide:palette',
    cadence: 'hour',
  },
  {
    slug: 'seo-aeo-geo',
    title: 'SEO, AEO & GEO',
    tagline: 'Get found on search and in AI answers.',
    description:
      'We optimise your site so people find you on Google (SEO), in AI answer engines (AEO) and in generative results (GEO).',
    icon: 'lucide:search',
    cadence: 'hour',
  },
  {
    slug: 'virtual-assistance',
    title: 'Virtual Assistance',
    tagline: 'Trained VAs to handle your day-to-day.',
    description:
      'Reliable, trained virtual assistants who manage your inbox, schedule, customers and admin so you can focus on the work that grows your business.',
    icon: 'lucide:headset',
    cadence: 'hour',
  },
];

export const serviceTitle = (slug: string): string =>
  services.find((s) => s.slug === slug)?.title ?? slug;

export const serviceCadence = (slug: string): ServiceCadence =>
  services.find((s) => s.slug === slug)?.cadence ?? 'hour';
