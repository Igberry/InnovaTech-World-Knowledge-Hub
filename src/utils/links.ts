/**
 * Link helpers. ALL internal links must go through `withBase` so the site works
 * at https://USER.github.io/REPO/ and at a custom domain root alike.
 * (WEBSITE-BUILD-PROMPT.md §9 point 2)
 */
import { site, isTodo } from '../config/site';

const BASE = import.meta.env.BASE_URL; // e.g. "/innovatech-knowledge-hub/" or "/"

/** Prefix an internal path with the deployment base path, avoiding double slashes. */
export function withBase(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path; // external / protocol links pass through
  }
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const rest = path.startsWith('/') ? path : `/${path}`;
  return `${base}${rest}` || '/';
}

/** Build a WhatsApp click-to-chat URL, or null if no number is configured. */
export function whatsappUrl(course?: string): string | null {
  if (isTodo(site.contact.whatsappNumber)) return null;
  const number = site.contact.whatsappNumber.replace(/[^\d]/g, '');
  const message = site.contact.whatsappDefaultMessage.replace(
    '{course}',
    course ?? 'training',
  );
  const encodedMessage = encodeURIComponent(message).replace(/[!'()*]/g, (character) =>
    `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );
  return `https://wa.me/${number}?text=${encodedMessage}`;
}

/** tel: link for the office call line, or null if not configured. */
export function phoneUrl(): string | null {
  const phone = (site.contact as { phone?: string }).phone;
  if (isTodo(phone)) return null;
  return `tel:${(phone as string).replace(/[^\d+]/g, '')}`;
}

/** mailto: link, or null if no email is configured. */
export function emailUrl(subject?: string): string | null {
  if (isTodo(site.contact.email)) return null;
  const q = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${site.contact.email}${q}`;
}

/** Configured social links only (drops any still-TODO). */
export function activeSocials(): Array<{ platform: string; url: string }> {
  return Object.entries(site.social)
    .filter(([, url]) => !isTodo(url))
    .map(([platform, url]) => ({ platform, url: url as string }));
}

/** Form POST endpoint for "contact" or "newsletter", or null if not configured. */
export function formEndpoint(kind: 'contact' | 'newsletter'): string | null {
  if (site.forms.provider === 'none') return null;
  const value = kind === 'contact' ? site.forms.contactEndpoint : site.forms.newsletterEndpoint;
  return isTodo(value) ? null : value;
}

/** "Edit this page on GitHub" URL for a content file, or null if repo is TODO. */
export function editOnGitHubUrl(contentPath: string): string | null {
  if (isTodo(site.repo.slug)) return null;
  return `https://github.com/${site.repo.slug}/edit/${site.repo.branch}/${contentPath}`;
}
