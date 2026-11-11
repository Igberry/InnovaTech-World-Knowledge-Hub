---
title: "Passwords, 2FA, and Account Security"
course: cybersecurity
order: 2
week: 2
phase: "Core Protection"
summary: "Lock down your accounts: strong unique passwords, a password manager, two-step verification, passkeys, and safe account recovery."
estimatedHours: 8
tools: ["A password manager", "An authenticator app"]
downloads:
  - label: "Password and 2FA audit (CSV)"
    href: "/downloads/cybersecurity/password-2fa-audit.csv"
---

**Goal:** Secure your most important accounts properly, with strong unique passwords, a password manager,
two-step verification, and safe recovery, closing the most common way accounts get taken.

## Learning Objectives

By the end of this week you can:

- Explain why reused and weak passwords are so dangerous
- Use a password manager to create and store strong, unique passwords
- Set up two-step verification, and choose stronger 2FA methods
- Explain what passkeys are and why they help
- Set safe account recovery so you do not get locked out or taken over

## Tools / Accounts Needed This Week

- Your password manager and an authenticator app (from Week 0)
- The [password and 2FA audit](/downloads/cybersecurity/password-2fa-audit.csv)

## Pre-Session Resources (about 2 hours)

- Read: search the web for "why password reuse is dangerous" and read one clear guide.
- Watch: *Search YouTube: "how to use a password manager for beginners"*.
- Read: search "what is a passkey" and read one beginner explainer.

## Lesson 1: Why passwords are the front door

Most everyday account takeovers come down to passwords. Two habits cause the damage:

- **Weak passwords** (short, common, guessable) that automated tools crack quickly.
- **Reused passwords:** when one site is breached, attackers try that same email and password on many other
  sites. If you reused it, they walk straight in.

Huge lists of leaked passwords circulate online. Attackers run automated tools that try them against millions
of accounts. The single most powerful fix is a **different, strong password for every account**, which is only
practical with a password manager.

> **Important:** You cannot remember a unique strong password for every site, and you should not try. That is
> exactly what a password manager is for.

## Lesson 2: Use a password manager

A **password manager** creates, stores, and fills strong, unique passwords. You remember **one** strong master
password; it handles the rest.

- Make the **master password** long and unique, a passphrase of several random words is strong and memorable.
- Let it **generate** new passwords as you update each account.
- It works across your phone and laptop, and fills logins for you.

Yes, it feels odd to "put all your passwords in one place", but a reputable password manager is far safer than
the alternative (reuse and weak passwords), because it encrypts everything behind your master password and
2FA.

## Lesson 3: Two-step verification (2FA)

**Two-step verification** adds a second step at login, so a stolen password alone is not enough. Methods, from
stronger to weaker:

| Method | Strength | Note |
|---|---|---|
| Passkey / security key | Strongest | Phishing-resistant; use where offered |
| Authenticator app | Strong | A code that changes every 30 seconds |
| SMS text code | Okay | Better than nothing, but can be SIM-swapped or intercepted |

Turn on 2FA for **email first** (it resets your other accounts), then money, then social. Prefer an
authenticator app or passkey over SMS where you can, but any 2FA beats none.

> **Warning:** Never share a one-time code or OTP with anyone, even someone claiming to be support or a
> "friend in trouble." A real service will never ask you to read out your code. Sharing it hands over your
> account.

## Lesson 4: Passkeys (the newer, stronger way)

A **passkey** lets you sign in with your device's unlock (fingerprint, face, or PIN) instead of a password.
Behind the scenes it uses strong cryptography tied to your device, so there is no password to steal or phish.

- Passkeys are **phishing-resistant**: there is nothing to type into a fake site.
- More services support them each year. Use them where offered, especially for important accounts.
- Keep your device secure (lock screen, backups), since it now holds your sign-in.

## Lesson 5: Safe account recovery

Attackers often take over accounts through **recovery** (the "forgot password" path), and lock you out by
changing your recovery details. Protect this:

- Set a **recovery email and phone** that are yours and well secured.
- Save any **backup/recovery codes** somewhere safe (offline is fine).
- After any incident, **re-check** recovery settings, attackers change them.
- Secure your **email** above all; whoever controls your email can reset most other accounts.

### Common mistakes

- Reusing one password across many sites
- Relying on memory instead of a password manager
- No 2FA, or 2FA only on minor accounts but not email
- Sharing a one-time code with a "support agent" (always a scam)
- Ignoring recovery settings until you are locked out

## Practice Exercises

1. Complete the password/2FA audit for your important accounts.
2. Set a strong master password (a multi-word passphrase) for your password manager.
3. Replace reused passwords on your top five accounts with generated ones.
4. Turn on 2FA for your email using an authenticator app.
5. Set up a passkey on one account that supports it.
6. Save your backup/recovery codes somewhere safe and note where.
7. Check and fix the recovery email/phone on your email account.

## Weekly Assignment (Due Before Week 3)

Secure your accounts and document it:

1. A completed **password/2FA audit** (before state) with an **after** column showing what you fixed
2. **At least five accounts** moved to unique, strong passwords in a password manager
3. **2FA turned on** for email and at least two other key accounts (note the method used)
4. A short note on your **recovery setup** and why email is protected first

### Grading guide

| Criteria | Weight |
|---|---|
| Audit completed honestly with before/after | 25% |
| Five+ accounts on unique strong passwords | 30% |
| 2FA on email + key accounts, stronger methods where possible | 30% |
| Safe recovery set, email prioritised | 15% |

### Definition of done

- [ ] Audit with before and after
- [ ] Five+ accounts on unique passwords
- [ ] 2FA on email and two+ others
- [ ] Recovery settings checked and secured

## Mentoring Session Plan (90 minutes)

| Time | Activity |
|---|---|
| 0-10 min | Recap; why passwords are the front door |
| 10-35 min | Set up a password manager together; generate and save passwords |
| 35-55 min | Turn on 2FA live; compare authenticator app vs SMS; try a passkey |
| 55-75 min | Recovery settings; the "never share your OTP" rule with examples |
| 75-90 min | Finish audits; brief for Week 3 |

## Facilitator Notes

This is the highest-impact week, give it real hands-on time; learners should leave with accounts genuinely
secured, not just informed. Walk through a password manager and 2FA setup live. Hammer the "never share your
one-time code" rule, OTP-sharing scams are extremely common locally (mobile money, WhatsApp). Explain
SIM-swap simply so learners prefer app-based 2FA. Emphasise securing email first. Keep it supportive; some
will have many reused passwords to fix.

## Self-Check Questions

1. Why is reusing passwords so dangerous, and what is the fix?
2. What does 2FA add, and which methods are stronger?
3. Why should you never share a one-time code, even with "support"?
4. Why secure your email account before all others?
