/**
 * Tiny, dependency-free portal flags. Importing this does NOT pull in
 * @supabase/supabase-js, so public pages can check `isPortalEnabled` cheaply and
 * lazy-import the heavy client only when the portal is actually on.
 * (STUDENT-PORTAL-SPEC.md §6.5)
 */
const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;
const PLACEHOLDER = 'PASTE_ANON_KEY_HERE';
export const ALLOWED_URL = 'https://rrjyfrqidwndgfgdncnp.supabase.co';

export const isPortalEnabled = Boolean(
  url && anon && anon !== PLACEHOLDER && url.replace(/\/+$/, '') === ALLOWED_URL,
);

/** Absolute URL for a site path (respects the deployment base path). */
export function absoluteUrl(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const rest = path.startsWith('/') ? path : `/${path}`;
  return `${window.location.origin}${base}${rest}`;
}
