// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { remarkFacilitator } from './src/plugins/remark-facilitator.mjs';
import { remarkCallouts } from './src/plugins/remark-callouts.mjs';
import { remarkSelfCheck } from './src/plugins/remark-selfcheck.mjs';
import { remarkAssignment } from './src/plugins/remark-assignment.mjs';
import { rehypeBaseLinks } from './src/plugins/rehype-base-links.mjs';
import { rehypeTableWrap } from './src/plugins/rehype-table-wrap.mjs';

// Deployment is base-path aware so the same code works at
// https://USERNAME.github.io/REPO/ and later at a custom domain with base "/".
// (WEBSITE-BUILD-PROMPT.md §9)
const SITE_URL = process.env.SITE_URL || 'https://TODO.github.io';
const BASE_PATH = process.env.BASE_PATH || '/innovatech-knowledge-hub';

export default defineConfig({
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
