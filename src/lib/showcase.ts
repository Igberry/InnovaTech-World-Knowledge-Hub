/**
 * Public read of APPROVED student showcase projects. Uses the SECURITY DEFINER
 * RPC get_showcase_projects (migration 0014) so logged-out visitors can read
 * them (anon cannot execute is_admin(), which a direct RLS read would need).
 */
import { getSupabase } from './supabase';

export interface ApprovedShowcase {
  name: string;
  course_slug: string | null;
  project_title: string;
  summary: string | null;
  url: string;
  submitted_at: string;
}

export async function getApprovedShowcase(): Promise<ApprovedShowcase[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.rpc('get_showcase_projects');
  if (error) return [];
  return (data as ApprovedShowcase[]) ?? [];
}
