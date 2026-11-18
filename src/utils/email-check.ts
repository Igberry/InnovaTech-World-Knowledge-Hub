/**
 * Best-effort signup email validation (client-side). Catches the cases that
 * ARE catchable before sending: bad syntax, common typos, disposable/temp-mail
 * domains, and domains with no mail servers (via DNS-over-HTTPS MX lookup).
 *
 * It cannot prove a specific mailbox exists (e.g. test@gmail.com looks valid) -
 * that is what Supabase email confirmation is for. Network failures never block
 * signup (we fail open), since confirmation is the real gate.
 */

// A common subset of throwaway/temporary email providers.
const DISPOSABLE = new Set([
  '10minutemail.com', '20minutemail.com', '1secmail.com', 'burnermail.io', 'discard.email',
  'dispostable.com', 'emailondeck.com', 'fakeinbox.com', 'fakemail.net', 'getnada.com',
  'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org', 'sharklasers.com', 'grr.la',
  'maildrop.cc', 'mailinator.com', 'mailnesia.com', 'mintemail.com', 'moakt.com', 'mohmal.com',
  'mytemp.email', 'spamgourmet.com', 'temp-mail.org', 'tempmail.com', 'tempmailo.com',
  'tempr.email', 'throwawaymail.com', 'trashmail.com', 'yopmail.com', 'yopmail.net',
  'getairmail.com', 'inboxbear.com', 'tempmail.plus', 'mail-temp.com', 'mailsac.com',
  'trashmail.de', 'spam4.me', 'nowmymail.com', 'tmail.ws', 'mail.tm', 'emailtemporar.io',
]);

// Obvious typos of the big providers -> the correct domain.
const TYPOS: Record<string, string> = {
  'gmial.com': 'gmail.com', 'gmil.com': 'gmail.com', 'gmai.com': 'gmail.com',
  'gmaill.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gnail.com': 'gmail.com',
  'gmail.co': 'gmail.com', 'gmail.cm': 'gmail.com', 'gmail.con': 'gmail.com',
  'yahooo.com': 'yahoo.com', 'yaho.com': 'yahoo.com', 'yahoo.co': 'yahoo.com',
  'yahoo.con': 'yahoo.com', 'hotmial.com': 'hotmail.com', 'hotmai.com': 'hotmail.com',
  'hotmil.com': 'hotmail.com', 'hotmail.co': 'hotmail.com', 'hotmail.con': 'hotmail.com',
  'outlok.com': 'outlook.com', 'outloo.com': 'outlook.com', 'outlook.co': 'outlook.com',
  'iclou.com': 'icloud.com', 'icloud.co': 'icloud.com',
};

export interface EmailCheck {
  ok: boolean;
  message?: string;
}

function withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('timeout')), ms)),
  ]);
}

/** Does the domain have any MX (or fallback A) records, i.e. can it receive mail? */
async function domainCanReceiveMail(domain: string): Promise<boolean> {
  const resolve = async (type: 'MX' | 'A') => {
    const res = await withTimeout(
      fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`),
      4000,
    );
    if (!res.ok) throw new Error('dns');
    const data = (await res.json()) as { Answer?: { type: number }[] };
    return Array.isArray(data.Answer) && data.Answer.length > 0;
  };
  try {
    if (await resolve('MX')) return true; // has mail servers
    return await resolve('A'); // some domains accept mail on the A record
  } catch {
    return true; // DNS lookup failed -> don't block; confirmation is the real gate
  }
}

export async function checkEmail(raw: string): Promise<EmailCheck> {
  const email = (raw || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { ok: false, message: 'Your email address is not valid. Please enter a valid email address.' };
  }
  const domain = email.split('@')[1];

  if (TYPOS[domain]) {
    return { ok: false, message: `Did you mean @${TYPOS[domain]}? Please check your email address.` };
  }
  if (DISPOSABLE.has(domain)) {
    return { ok: false, message: 'Please use a permanent email address - temporary or disposable emails are not allowed.' };
  }
  if (!(await domainCanReceiveMail(domain))) {
    return { ok: false, message: 'That email domain cannot receive mail. Please check your email address.' };
  }
  return { ok: true };
}
