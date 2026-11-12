/**
 * Admin-side portal data (STUDENT-PORTAL-SPEC.md §6.4). Admins can read all rows
 * (enforced by RLS); related tables are fetched separately and joined in the
 * client by user_id, since there are no direct profile foreign keys to embed.
 */
import { getSupabase } from './supabase';
import { currentUser, type Result } from './auth';

export interface AdminProfile {
  id: string;
  full_name: string;
  email: string | null;
  cohort: string | null;
}
export interface AdminEnrollment { user_id: string; course_slug: string; status: string; enrolled_at: string }
export interface AdminProgress { user_id: string; course_slug: string; lesson_slug: string; updated_at: string }
export interface AdminSubmission {
  id: string; user_id: string; course_slug: string; lesson_slug: string;
  link_url: string | null; note: string | null; submitted_at: string;
}
export interface AdminReview {
  submission_id: string; status: 'approved' | 'needs_changes'; score: number | null;
  feedback: string | null; reviewed_at: string;
}
export interface AdminAttendance {
  id: string; user_id: string; course_slug: string; session_date: string;
  status: 'present' | 'absent' | 'excused'; note: string | null;
}

async function selectAll<T>(table: string, columns: string): Promise<T[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data } = await sb.from(table).select(columns);
  return (data as T[]) ?? [];
}

export interface AdminCertificate {
  id: string;
  code: string;
  student_name: string;
  course: string;
  duration: string | null;
  grade: string | null;
  issued_at: string;
}

export const getProfiles = () => selectAll<AdminProfile>('profiles', 'id, full_name, email, cohort');
export const getEnrollments = () => selectAll<AdminEnrollment>('enrollments', 'user_id, course_slug, status, enrolled_at');
export const getProgress = () => selectAll<AdminProgress>('lesson_progress', 'user_id, course_slug, lesson_slug, updated_at');
export const getSubmissions = () => selectAll<AdminSubmission>('submissions', 'id, user_id, course_slug, lesson_slug, link_url, note, submitted_at');
export const getReviews = () => selectAll<AdminReview>('reviews', 'submission_id, status, score, feedback, reviewed_at');
export const getAttendance = () => selectAll<AdminAttendance>('attendance', 'id, user_id, course_slug, session_date, status, note');
export const getCertificates = () =>
  selectAll<AdminCertificate>('certificates', 'id, code, student_name, course, duration, grade, issued_at');

export async function issueCertificate(c: {
  code: string;
  student_name: string;
  course: string;
  duration?: string;
  grade?: string;
  issued_at?: string;
}): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  try {
    const { error } = await sb.from('certificates').insert({
      code: c.code.trim(),
      student_name: c.student_name.trim(),
      course: c.course.trim(),
      duration: c.duration?.trim() || null,
      grade: c.grade?.trim() || null,
      ...(c.issued_at ? { issued_at: c.issued_at } : {}),
    });
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function deleteCertificate(id: string): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  try {
    const { error } = await sb.from('certificates').delete().eq('id', id);
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

// ---------- Access & pricing (payments) ----------
export interface CoursePlanRow {
  id: string; course_slug: string; plan: string; price_kobo: number;
  currency: string; features: string[]; active: boolean;
}
export const getCoursePlans = () =>
  selectAll<CoursePlanRow>('course_plans', 'id, course_slug, plan, price_kobo, currency, features, active, sort');

export async function updateCoursePlan(
  id: string,
  patch: { price_kobo?: number; features?: string[]; active?: boolean },
): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  try {
    const { error } = await sb
      .from('course_plans')
      .update({ ...patch, updated_at: new Date().toISOString() })
      .eq('id', id);
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export interface VoucherRow {
  id: string; code: string; kind: string; value: number;
  course_slug: string | null; plan: string | null;
  max_uses: number | null; used_count: number; expires_at: string | null;
  active: boolean; created_at: string;
}
export const getVouchers = () =>
  selectAll<VoucherRow>('vouchers', 'id, code, kind, value, course_slug, plan, max_uses, used_count, expires_at, active, created_at');

export async function createVoucher(v: {
  code: string; kind: string; value: number;
  course_slug: string | null; plan: string | null;
  max_uses: number | null; expires_at: string | null;
}): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  try {
    const { error } = await sb.from('vouchers').insert({ ...v, code: v.code.trim() });
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function setVoucherActive(id: string, active: boolean): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  try {
    const { error } = await sb.from('vouchers').update({ active }).eq('id', id);
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export interface PaymentRow {
  id: string; reference: string; user_id: string | null; course_slug: string;
  plan: string; amount_kobo: number; status: string; voucher_code: string | null; created_at: string;
}
export const getPayments = () =>
  selectAll<PaymentRow>('payments', 'id, reference, user_id, course_slug, plan, amount_kobo, status, voucher_code, created_at');

export interface EntitlementRow {
  id: string; user_id: string; course_slug: string; plan: string;
  source: string; status: string; created_at: string;
}

export interface AdminInsightPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  body_markdown: string;
  category: string | null;
  tags: string[];
  author: string;
  status: 'draft' | 'scheduled' | 'published';
  scheduled_at: string | null;
  published_at: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  created_at: string;
  updated_at: string;
}

const INSIGHT_POST_COLUMNS =
  'id, slug, title, description, body_markdown, category, tags, author, status, scheduled_at, published_at, featured_image_url, featured_image_alt, created_at, updated_at';

export async function getInsightPosts(): Promise<Result<AdminInsightPost[]>> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  try {
    const { data, error } = await sb
      .from('insight_posts')
      .select(INSIGHT_POST_COLUMNS)
      .order('updated_at', { ascending: false });
    if (error) return { ok: false, error: error.message };
    return { ok: true, data: (data ?? []) as AdminInsightPost[] };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export type InsightPostInput = Omit<AdminInsightPost, 'id' | 'created_at' | 'updated_at'>;

export async function saveInsightPost(
  input: InsightPostInput,
  id?: string,
): Promise<Result<AdminInsightPost>> {
  const sb = getSupabase();
  const user = await currentUser();
  if (!sb || !user) return { ok: false, error: 'Not signed in.' };
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) {
    return { ok: false, error: 'Use a lowercase URL slug with letters, numbers, and hyphens.' };
  }
  if (input.featured_image_url && !input.featured_image_alt?.trim()) {
    return { ok: false, error: 'Add alternative text for the featured image.' };
  }
  if (input.status === 'scheduled' && !input.scheduled_at) {
    return { ok: false, error: 'Choose a publication date and time for scheduled posts.' };
  }

  try {
    const now = new Date().toISOString();
    const post = {
      ...input,
      title: input.title.trim(),
      description: input.description.trim(),
      body_markdown: input.body_markdown.trim(),
      category: input.category?.trim() || null,
      tags: input.tags.map((tag) => tag.trim()).filter(Boolean),
      author: input.author.trim() || 'InnovaTech World',
      featured_image_alt: input.featured_image_url ? input.featured_image_alt?.trim() : null,
      scheduled_at: input.status === 'scheduled' ? input.scheduled_at : null,
      published_at: input.status === 'published' ? input.published_at ?? now : null,
      updated_at: now,
      ...(id ? {} : { created_by: user.id }),
    };
    const query = id
      ? sb.from('insight_posts').update(post).eq('id', id)
      : sb.from('insight_posts').insert(post);
    const { data, error } = await query.select(INSIGHT_POST_COLUMNS).single();
    if (error) return { ok: false, error: error.message };
    return { ok: true, data: data as AdminInsightPost };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function deleteInsightPost(id: string): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  try {
    const { error } = await sb.from('insight_posts').delete().eq('id', id);
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function uploadInsightImage(file: File): Promise<Result<{ url: string }>> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/avif']);
  if (!allowedTypes.has(file.type)) {
    return { ok: false, error: 'Choose a JPG, PNG, WebP, or AVIF image.' };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { ok: false, error: 'Images must be 5 MB or smaller.' };
  }

  try {
    const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const path = `${crypto.randomUUID()}.${extension}`;
    const { data, error } = await sb.storage.from('insights-images').upload(path, file, {
      cacheControl: '31536000',
      contentType: file.type,
      upsert: false,
    });
    if (error) return { ok: false, error: error.message };
    const { data: urlData } = sb.storage.from('insights-images').getPublicUrl(data.path);
    return { ok: true, data: { url: urlData.publicUrl } };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
export const getEntitlements = () =>
  selectAll<EntitlementRow>('entitlements', 'id, user_id, course_slug, plan, source, status, created_at');

/** Grant free access to a course for the account with this email (must already have signed up). */
export async function grantFreePass(email: string, courseSlug: string, plan: string): Promise<Result> {
  const sb = getSupabase();
  const me = await currentUser();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  try {
    const { data: prof, error: pe } = await sb
      .from('profiles').select('id').ilike('email', email.trim()).maybeSingle();
    if (pe) return { ok: false, error: pe.message };
    if (!prof) return { ok: false, error: 'No account with that email. Ask them to sign up first.' };
    const { error } = await sb.from('entitlements').upsert(
      { user_id: (prof as { id: string }).id, course_slug: courseSlug, plan, source: 'free_pass', status: 'active', granted_by: me?.id ?? null, note: 'free pass' },
      { onConflict: 'user_id,course_slug' },
    );
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function revokeEntitlement(id: string): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  try {
    const { error } = await sb.from('entitlements').update({ status: 'revoked' }).eq('id', id);
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function saveReview(
  submissionId: string,
  status: 'approved' | 'needs_changes',
  score: number | null,
  feedback: string,
): Promise<Result> {
  const sb = getSupabase();
  const user = await currentUser();
  if (!sb || !user) return { ok: false, error: 'Not signed in.' };
  try {
    const { error } = await sb.from('reviews').upsert(
      {
        submission_id: submissionId,
        reviewer_id: user.id,
        status,
        score,
        feedback: feedback || null,
        reviewed_at: new Date().toISOString(),
      },
      { onConflict: 'submission_id' },
    );
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function setEnrollment(
  userId: string,
  courseSlug: string,
  status: 'active' | 'paused' | 'completed',
): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  try {
    const { error } = await sb
      .from('enrollments')
      .upsert({ user_id: userId, course_slug: courseSlug, status }, { onConflict: 'user_id,course_slug' });
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function saveAttendance(
  rows: Array<{ user_id: string; course_slug: string; session_date: string; status: string; note?: string }>,
): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  if (rows.length === 0) return { ok: true, data: undefined };
  try {
    const { error } = await sb
      .from('attendance')
      .upsert(rows, { onConflict: 'user_id,course_slug,session_date' });
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/** Build a CSV string and trigger a download in the browser. */
export function downloadCsv(filename: string, headers: string[], rows: (string | number | null)[][]): void {
  const esc = (v: string | number | null) => {
    const s = v === null || v === undefined ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [headers.map(esc).join(','), ...rows.map((r) => r.map(esc).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
