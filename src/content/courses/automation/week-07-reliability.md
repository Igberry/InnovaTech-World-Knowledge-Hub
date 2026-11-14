---
title: "Reliability, Safety, and Maintenance"
course: automation
order: 7
week: 7
phase: "Putting It Together"
summary: "Turn a working automation into a trustworthy one: make failure loud, trace where your data really goes, lock down access, and set a review habit so nothing quietly breaks."
estimatedHours: 8
tools: ["A no-code automation tool", "A document"]
downloads:
  - label: "Test and rollback checklist"
    href: "/downloads/automation/test-and-rollback-checklist.md"
  - label: "Automation blueprint"
    href: "/downloads/automation/automation-blueprint.md"
---

**Goal:** Make your automations reliable and safe for the long run - handle errors, make failure loud,
protect privacy, and keep a review habit - so they keep working as the world around them changes. You turn
on alerts, trace a data path, and tighten access with your own hands.

## What you'll be able to do

- Anticipate what can go wrong and plan for it
- Build in error handling and failure notifications
- Protect privacy and account security in automated workflows
- Keep a rollback plan and a manual backup for every automation
- Maintain and review automations so they do not silently break

## Before you start (about 10 minutes)

- Open your no-code tool, the
  [test and rollback checklist](/downloads/automation/test-and-rollback-checklist.md) and the
  [automation blueprint](/downloads/automation/automation-blueprint.md).
- Warm-up: pick one automation you built and list three things that could go wrong with it. That list is
  your work for the week.

## Try it 1 - Brainstorm what could break

**Why it matters:** automations break not because you erred, but because the world changes around them. The
pro mindset is "when it fails, I will know fast and recover safely."

**Do this now - for one automation, write down what would happen if:**
1. A connected app changes (a form field is renamed, a login expires).
2. The input is odd (a blank field, a strange value, a huge attachment).
3. A service is down or slow.
4. A rule was too broad and fired when it should not.

**You've got it when:** you have a short, honest list of real failure modes for one automation.

## Try it 2 - Make failure loud

**Why it matters:** the worst failures are silent ones that run wrong for days. You want a quiet alert to
you, not an angry customer weeks later.

**Do this now:**
1. Open your tool's **run history / logs** and read the last few runs.
2. Turn on **error notifications** so the tool messages you when a run fails.
3. Add a **filter that stops bad input**, for example "only continue if the email field is not empty".
4. Trigger a failure on purpose (submit bad input) and confirm you get the alert.

**You've got it when:** a deliberate failure sends you an alert instead of passing silently.

## Try it 3 - Trace the data path and tighten access

**Why it matters:** automations hold the keys to your accounts and move data between them. An automation can
quietly copy data to places you did not intend.

**Do this now:**
1. For one automation, **trace the data** from trigger to final step. Write down every place it lands.
2. Flag anywhere data could leak (a public sheet, an external inbox, a third-party tool).
3. Review the **access** each connection has, and reduce any that is broader than the task needs.
4. Confirm two-step verification on every connected account.

**You've got it when:** you can name every place your data goes, and each connection has only the access it needs.

## Try it 4 - Rollback, backup, and a review habit

**Why it matters:** an automation nobody can turn off or do by hand is a risk, not a help. And automations
are not "set and forget" - they need light, regular care.

**Do this now:**
1. Write the **rollback / off switch** into the [blueprint](/downloads/automation/automation-blueprint.md): how to stop it and undo it.
2. Write the **manual backup**: how to do the job by hand, and who knows how.
3. Set yourself a **review reminder** (for example monthly) to check it still does the right thing.
4. Retire any old automation you no longer need.

**You've got it when:** your blueprint has a rollback, a manual backup, and a review date.

### Watch out for

- Assuming an automation will run forever without care
- No failure notification, so breakage is silent
- Over-broad access to connected accounts
- Not tracing where data actually goes
- No rollback, no manual backup, and no one else who understands it

## This week's build: a reliability and safety review

Produce a **reliability and safety review** for one of your automations:

1. A **failure plan**: what could go wrong, how you will be alerted, and your fallback
2. Evidence you **turned on notifications / checked run history**
3. A **privacy and access review**: the data path and the access each connection has
4. An updated **blueprint** with a rollback plan, manual backup, and a review schedule

### Grading guide

| Criteria | Weight |
|---|---|
| Realistic failure plan with alerting | 30% |
| Notifications / run history in place | 20% |
| Thoughtful privacy and access review | 25% |
| Blueprint with rollback, backup, and review schedule | 25% |

### Definition of done

- [ ] Failure plan with alerts and a fallback
- [ ] Notifications on; run history checked
- [ ] Data path traced; access reduced where needed
- [ ] Blueprint updated with rollback, backup, review date

## Extra quick wins (optional)

- Add a "notify me on failure" step to every automation you plan to keep.
- Set a calendar reminder to review your automations once a month.
- Remove one old app connection you no longer use from your accounts.

## Mentoring Session Plan (90 minutes)

| Time | Activity |
|---|---|
| 0-10 min | Recap; "plan for failure, not perfection" |
| 10-35 min | Failure brainstorm for a shared automation; add notifications and filters |
| 35-55 min | Privacy and access review; trace a data path together |
| 55-75 min | Write rollback and manual backup into a blueprint |
| 75-90 min | Maintenance habits; brief for the Week 8 capstone |

## Facilitator Notes

This week turns learners from people who can build an automation into people who can be trusted with one.
Emphasise loud failure (notifications, logs) over silent breakage, and the non-negotiable rollback plus
manual backup. Do a live data-path trace to reveal where information could leak. Stress least-access and
account security, especially since connected accounts hold real keys. Keep all data fictional, and connect
back to the privacy habits from the AI course.

## Can you do these now?

1. Name three reasons an automation might break over time.
2. How do you make a failure loud and quick to catch instead of silent?
3. What should you check about the data path and access of an automation?
4. Why does every kept automation need a rollback plan and a manual backup?
