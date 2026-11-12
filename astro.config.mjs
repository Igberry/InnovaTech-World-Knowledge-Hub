// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { remarkFacilitator } from './src/plugins/remark-facilitator.mjs';
import { remarkCallouts } from './src/plugins/remark-callouts.mjs';
import { remarkSelfCheck } from './src/plugins/remark-selfcheck.mjs';
import { remarkAssignment } from './src/plugins/remark-assignment.mjs';
import { rehypeBaseLinks } from './src/plugins/rehype-base-links.mjs';
import { rehypeTableWrap } from './src/plugins/rehype-table-wrap.mjs';

// Deployment is base-path aware so the same code works on Vercel (served at the
// root), on GitHub Pages (served under /REPO/), and on a custom domain.
// (WEBSITE-BUILD-PROMPT.md §9) Explicit SITE_URL / BASE_PATH env vars always win.
const onVercel = Boolean(process.env.VERCEL);
const vercelProdUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

const SITE_URL =
  process.env.SITE_URL ||
  (vercelProdUrl ? `https://${vercelProdUrl}` : 'https://TODO.github.io');

// On Vercel the site lives at the domain root; elsewhere default to the GH Pages subpath.
const BASE_PATH = process.env.BASE_PATH || (onVercel ? '/' : '/innovatech-knowledge-hub');

export default defineConfig({
  adapter: vercel(),
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'always',
  integrations: [
    sitemap(),
    icon({
      iconDir: 'src/icons',
      include: {
        lucide: ['*'],
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    gfm: true,
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-light',
      wrap: false,
    },
    // Order matters: strip facilitator content first; style callouts while all
    // blockquotes are still top-level; THEN wrap sections (self-check, assignment).
    remarkPlugins: [remarkFacilitator, remarkCallouts, remarkSelfCheck, remarkAssignment],
    rehypePlugins: [
      rehypeBaseLinks,
      rehypeTableWrap,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: { className: ['heading-anchor'], ariaHidden: 'true', tabIndex: -1 },
          content: { type: 'text', value: '#' },
        },
      ],
    ],
  },
});
