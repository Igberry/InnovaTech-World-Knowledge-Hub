/**
 * Single Supabase browser client (STUDENT-PORTAL-SPEC.md §6.1).
 * Only the PUBLIC url + anon key are used (safe because RLS is on).
 *
 * Importing this module pulls in @supabase/supabase-js, so import it only from
 * code paths that actually need the client. For a cheap on/off check, import
 * `isPortalEnabled` from './portal-config' instead.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { isPortalEnabled } from './portal-config';

export { isPortalEnabled, absoluteUrl } from './portal-config';

const url = import.meta.env.PUBLIC_SUPABASE_URL as string | undefined;
const anon = import.meta.env.PUBLIC_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;

/** The shared client, or null when the portal is not configured. */
export function getSupabase(): SupabaseClient | null {
  if (!isPortalEnabled) return null;
  if (!client) {
    client = createClient(url as string, anon as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
    });
  }
  return client;
}
