/**
 * Per-serverless-instance secondary rate limit.
 * Vercel Firewall rules are still required for a shared, cross-instance limit.
 */
export function createLocalRateLimiter(options = {}) {
  const tenMinuteLimit = options.tenMinuteLimit ?? 6;
  const dailyLimit = options.dailyLimit ?? 30;
  const maxEntries = options.maxEntries ?? 20000;
  const clients = new Map();
  let calls = 0;

  return (identity, now = Date.now()) => {
    const tenMinuteWindow = Math.floor(now / 600000);
    const dayWindow = Math.floor(now / 86400000);
    let client = clients.get(identity);

    if (client && client.dayWindow !== dayWindow) {
      client = undefined;
      clients.delete(identity);
    }

    if (!client) {
      client = { tenMinuteWindow, tenMinuteCount: 0, dayWindow, dailyCount: 0, lastSeen: now };
      clients.set(identity, client);
    }

    if (client.tenMinuteWindow !== tenMinuteWindow) {
      client.tenMinuteWindow = tenMinuteWindow;
      client.tenMinuteCount = 0;
    }
    client.lastSeen = now;

    if (client.dailyCount >= dailyLimit) {
      return { allowed: false, reason: 'daily', retryAfterSeconds: Math.max(1, Math.ceil(((dayWindow + 1) * 86400000 - now) / 1000)) };
    }
    if (client.tenMinuteCount >= tenMinuteLimit) {
      return { allowed: false, reason: 'burst', retryAfterSeconds: Math.max(1, Math.ceil(((tenMinuteWindow + 1) * 600000 - now) / 1000)) };
    }

    client.tenMinuteCount += 1;
    client.dailyCount += 1;
    calls += 1;

    if (calls % 128 === 0 || clients.size > maxEntries) {
      for (const [key, record] of clients) {
        if (now - record.lastSeen >= 86400000) clients.delete(key);
      }
    }

    if (clients.size > maxEntries) {
      return { allowed: false, reason: 'capacity', retryAfterSeconds: 60 };
    }

    return { allowed: true, reason: null, retryAfterSeconds: 0 };
  };
}
