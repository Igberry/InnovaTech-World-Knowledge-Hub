import { createClient } from '@supabase/supabase-js';
import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { getInsights as getMarkdownInsights, insightSlug } from '../utils/insights';
import { isPortalEnabled } from './portal-config';

const INSIGHT_COLUMNS =
  'id, slug, title, description, body_markdown, category, tags, author, status, featured_image_url, featured_image_alt, scheduled_at, published_at, created_at, updated_at';

export interface PublicInsight {
  slug: string;
  title: string;
  description: string;
  bodyMarkdown: string;
  category: string | null;
  tags: string[];
  author: string;
  image: string | null;
  imageAlt: string | null;
  source: 'markdown' | 'cms';
  publishDate: Date;
  updatedDate: Date | null;
}

interface CmsInsight {
  id: string;
  slug: string;
  title: string;
  description: string;
  body_markdown: string;
  category: string | null;
  tags: string[] | null;
  author: string | null;
  status: 'draft' | 'scheduled' | 'published';
  featured_image_url: string | null;
  featured_image_alt: string | null;
  scheduled_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

function publicClient() {
  if (!isPortalEnabled) return null;

  const url = import.meta.env.PUBLIC_SUPABASE_URL as string;
  const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string;
  return createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

/** Returns public Markdown posts and CMS posts currently published or due. */
export async function getPublicInsights(): Promise<PublicInsight[]> {
  const markdownPosts: PublicInsight[] = (await getMarkdownInsights()).map((post) => ({
    slug: insightSlug(post),
    title: post.data.title,
    description: post.data.description,
    bodyMarkdown: post.body ?? '',
    category: post.data.tags[0] ?? null,
    tags: post.data.tags,
    author: post.data.author ?? 'InnovaTech World',
    image: null,
    imageAlt: null,
    source: 'markdown' as const,
    publishDate: post.data.publishDate,
    updatedDate: post.data.updatedDate ?? null,
  }));
  const sb = publicClient();
  if (!sb) return markdownPosts.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());

  const now = new Date().toISOString();
  const useMarkdownOnly = (reason: string) => {
    console.error(
      `Could not load CMS Insights (${reason}). Showing bundled Markdown articles only; check migration 0006_insights_cms.sql, the public read policy, and Supabase availability.`,
    );
    return markdownPosts.sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
  };
  let cmsPosts: CmsInsight[] | null;
  try {
    const { data, error } = await sb
      .from('insight_posts')
      .select(INSIGHT_COLUMNS)
      .or(`status.eq.published,and(status.eq.scheduled,scheduled_at.lte.${now})`);
    if (error) return useMarkdownOnly(`${error.code}: ${error.message}`);
    cmsPosts = data as CmsInsight[] | null;
  } catch (error) {
    return useMarkdownOnly(error instanceof Error ? error.message : String(error));
  }

  const postsBySlug = new Map(markdownPosts.map((post) => [post.slug, post]));
  for (const raw of cmsPosts ?? []) {
    const publishDate = raw.published_at ?? raw.scheduled_at ?? raw.created_at;
    postsBySlug.set(raw.slug, {
      slug: raw.slug,
      title: raw.title,
      description: raw.description,
      bodyMarkdown: raw.body_markdown,
      category: raw.category,
      tags: raw.tags ?? [],
      author: raw.author ?? 'InnovaTech World',
      image: raw.featured_image_url,
      imageAlt: raw.featured_image_alt,
      source: 'cms',
      publishDate: new Date(publishDate),
      updatedDate: raw.updated_at ? new Date(raw.updated_at) : null,
    });
  }

  return [...postsBySlug.values()].sort((a, b) => b.publishDate.getTime() - a.publishDate.getTime());
}

export async function getPublicInsight(slug: string): Promise<PublicInsight | undefined> {
  return (await getPublicInsights()).find((post) => post.slug === slug);
}

const allowedTags = [
  'a', 'blockquote', 'br', 'code', 'del', 'em', 'h2', 'h3', 'h4', 'hr', 'img',
  'li', 'ol', 'p', 'pre', 'strong', 'table', 'tbody', 'td', 'th', 'thead', 'tr', 'ul',
];

/** Renders editor-authored Markdown while stripping unsafe HTML and attributes. */
export async function renderInsightMarkdown(markdown: string): Promise<string> {
  const rendered = await marked.parse(markdown, { gfm: true, breaks: false });
  return sanitizeHtml(rendered, {
    allowedTags,
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      th: ['align'],
      td: ['align'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
    },
  });
}
