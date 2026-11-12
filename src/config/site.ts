/**
 * ALL editable site settings live here. Non-developers: this is the one file
 * to change for contact details, social links, navigation and analytics.
 * (WEBSITE-BUILD-PROMPT.md §5.3)
 *
 * Anything marked "TODO" must be replaced with a real value by the owner.
 * NEVER invent contact details. Links/buttons that are still "TODO" are hidden
 * automatically rather than rendered broken.
 */
import { HIDDEN_SECTION_HEADINGS } from './hidden-sections.mjs';

export const site = {
  name: 'InnovaTech World Knowledge Hub',
  shortName: 'InnovaTech Hub',
  tagline: 'Learn digital skills. Build a global career.',
  description:
    'Practical, beginner-friendly digital-skills training from InnovaTech World in Yenagoa, Bayelsa State, Nigeria. Follow weekly lessons, download real datasets, and build a job-ready portfolio.',

  // Deployment - these are overridden by SITE_URL / BASE_PATH env vars at build
  // time (see astro.config.mjs). Kept here only for display/fallback.
  url: 'https://TODO.github.io/innovatech-knowledge-hub',

  // Public GitHub repo, used for the "Edit this page on GitHub" links.
  repo: {
    // TODO: set to the real repo, e.g. "InnovaTechWorld/innovatech-knowledge-hub"
    slug: 'TODO/innovatech-knowledge-hub',
    branch: 'main',
  },

  location: 'Yenagoa, Bayelsa State, Nigeria',

  facilitator: {
    name: 'David C. Igberi',
    title: 'Founder & Lead Facilitator',
  },

  contact: {
    // International format WITHOUT the leading "+", e.g. 234XXXXXXXXXX
    whatsappNumber: '2349121681159',
    email: 'info.innovatech.expertise@gmail.com',
    // Office call line, full international format with "+". Shown as a "Call us" link.
    phone: '+2349121681159',
    whatsappDefaultMessage:
      "Hello InnovaTech World, I'd like to know more about the {course} course.",
  },

  social: {
    facebook: 'TODO',
    instagram: 'TODO',
    linkedin: 'TODO',
    youtube: 'TODO',
    tiktok: 'TODO',
  },

  nav: [
    { label: 'Home', href: '/' },
    { label: 'Academy', href: '/courses/' },
    { label: 'Services', href: '/services/' },
    {
      label: 'About',
      href: '/about/',
      children: [
        { label: 'About', href: '/about/' },
        { label: 'Resources', href: '/resources/' },
        { label: 'Insights', href: '/insights/' },
      ],
    },
    { label: 'Contact', href: '/contact/' },
  ],

  services: [
    'Full Stack Web Development',
    'Data Analysis',
    'Automation',
    'Graphics Design',
    'WordPress Web Development',
    'SEO, AEO & GEO',
    'Virtual Assistance',
  ],

  // Form service for the contact form and newsletter (WEBSITE-BUILD-PROMPT.md §7.8, §10).
  // Set provider to "formspree" and paste your endpoints to switch the forms on.
  // While a value is "TODO"/empty, that form is hidden and a WhatsApp/email fallback shows.
  forms: {
    provider: 'none' as 'none' | 'formspree',
    contactEndpoint: 'TODO', // e.g. https://formspree.io/f/xxxxxxxx
    newsletterEndpoint: 'TODO', // e.g. https://formspree.io/f/yyyyyyyy
  },

  // Headings whose whole section is stripped from the rendered site.
  hideSectionsHeadings: HIDDEN_SECTION_HEADINGS,

  // Student portal options.
  portal: {
    // Show a "Create an account" (self sign-up) form on the login page.
    // The student also enters their name here. For this to actually work you must
    // ALSO enable sign-ups in Supabase (Authentication → keep "Allow new users to
    // sign up" ON). Set false to stay strictly invite-only.
    allowSignups: true,
  },

  // Optional privacy-friendly analytics. OFF by default (WEBSITE-BUILD-PROMPT.md §7.10).
  analytics: {
    enabled: false,
    provider: 'none' as 'none' | 'plausible' | 'ga4',
    // For Plausible: the domain you registered. For GA4: the measurement ID.
    domain: '',
  },
} as const;

export type SiteConfig = typeof site;

/** A value that still needs the owner to fill it in. */
export function isTodo(value: string | undefined | null): boolean {
  return !value || value.trim() === '' || value.trim().toUpperCase() === 'TODO';
}
