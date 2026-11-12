import { getSupabase } from '../lib/supabase';
import { withBase } from '../utils/links';

const IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const CHECK_INTERVAL_MS = 15 * 1000;
const ACTIVITY_KEY = 'itw:last-activity:';
const ACTIVITY_EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const;

export function initSessionTimeout(): void {
  const supabase = getSupabase();
  if (!supabase) return;

  let userId: string | null = null;
  let interval: number | undefined;
  let expiring = false;

  const activityKey = () => (userId ? `${ACTIVITY_KEY}${userId}` : null);
  const lastActivity = () => {
    const key = activityKey();
    const value = key ? Number(localStorage.getItem(key)) : 0;
    return Number.isFinite(value) && value > 0 ? value : Date.now();
  };

  const stop = () => {
    if (interval !== undefined) window.clearInterval(interval);
    interval = undefined;
    ACTIVITY_EVENTS.forEach((event) => document.removeEventListener(event, recordActivity));
    document.removeEventListener('visibilitychange', checkIdle);
    window.removeEventListener('storage', syncActivity);
  };

  const expire = async () => {
    if (expiring || !userId) return;
    expiring = true;
    const key = activityKey();
    const wasAdminPage = /\/admin(?:\/|$)/.test(window.location.pathname);
    stop();
    if (key) localStorage.removeItem(key);
    await supabase.auth.signOut({ scope: 'local' });
    if (wasAdminPage || /\/account(?:\/|$)/.test(window.location.pathname)) {
      window.location.replace(withBase('/login/?reason=session-timeout'));
    }
  };

  function checkIdle(): void {
    if (userId && Date.now() - lastActivity() >= IDLE_TIMEOUT_MS) void expire();
  }

  function recordActivity(): void {
    if (!userId || document.hidden) return;
    if (Date.now() - lastActivity() >= IDLE_TIMEOUT_MS) {
      void expire();
      return;
    }
    const key = activityKey();
    if (key) localStorage.setItem(key, String(Date.now()));
  }

  function syncActivity(event: StorageEvent): void {
    const key = activityKey();
    if (key && event.key === key) checkIdle();
  }

  const start = (id: string) => {
    stop();
    userId = id;
    expiring = false;
    const key = activityKey();
    const stored = key ? Number(localStorage.getItem(key)) : 0;
    if (stored && Date.now() - stored >= IDLE_TIMEOUT_MS) {
      void expire();
      return;
    }
    if (key && !stored) localStorage.setItem(key, String(Date.now()));

    ACTIVITY_EVENTS.forEach((event) =>
      document.addEventListener(event, recordActivity, { passive: true }),
    );
    document.addEventListener('visibilitychange', checkIdle);
    window.addEventListener('storage', syncActivity);
    interval = window.setInterval(checkIdle, CHECK_INTERVAL_MS);
  };

  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) start(session.user.id);
    else {
      stop();
      userId = null;
      expiring = false;
    }
  });
}
