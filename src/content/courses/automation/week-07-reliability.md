---
title: "Reliability, Safety, and Maintenance"
course: automation
order: 7
week: 7
phase: "Putting It Together"
summary: "Keep automations trustworthy over time: handle errors, protect privacy, plan for failure, and maintain them so they do not quietly break."
estimatedHours: 8
tools: ["A no-code automation tool", "A document"]
downloads:
  - label: "Test and rollback checklist"
    href: "/downloads/automation/test-and-rollback-checklist.md"
  - label: "Automation blueprint"
    href: "/downloads/automation/automation-blueprint.md"
---

**Goal:** Make your automations reliable and safe over the long run, by handling errors, protecting
privacy, planning for failure, and maintaining them so they keep working as the world around them changes.

## Learning Objectives

By the end of this week you can:

- Anticipate what can go wrong with an automation and plan for it
- Build in error handling and notifications
- Protect privacy and account security in automated workflows
- Keep a rollback plan and a manual backup for every automation
- Maintain and review automations so they do not silently break

## Tools / Accounts Needed This Week

- Your no-code automation tool
- The [test and rollback checklist](/downloads/automation/test-and-rollback-checklist.md) and
  [automation blueprint](/downloads/automation/automation-blueprint.md)

## Pre-Session Resources (about 2 hours)

- Read: search the web for "why automations break" and read one practical article.
- Read: your tool's help page on error handling, run history, or notifications.
- Reflect: for one of your automations, list three things that could go wrong.

## Lesson 1: What goes wrong (so you can plan for it)

Automations break. Not because you did something wrong, but because the world changes around them.
Common causes:

- **A connected app changes** (a form field is renamed, a login expires)
- **Unexpected input** (a blank field, a strange value, a huge attachment)
- **A service is down** or slow
- **A rule was too broad** and fires when it should not
- **Access was revoked** or a password changed

The professional mindset is not "my automation will never fail." It is "when it fails, I will know quickly
and recover safely." Planning for failure is what separates a toy from a tool.

## Lesson 2: Error handling and notifications

Good automations tell you when something goes wrong. Most tools offer:

- **Run history / logs:** a record of each run and whether it succeeded. Check it.
- **Error notifications:** the tool emails or messages you when a run fails. Turn this on.
- **Fallback steps:** "if this step fails, do X" (e.g., log it, notify a human).
- **Filters that stop bad input:** "only continue if the email field is not empty."

The aim is that a failure becomes a quiet notification to you, not a silent gap that someone discovers
weeks later.

> **Tip:** Add a simple "notify me on failure" to any automation that matters. Finding out from your own
> alert is far better than finding out from an angry customer.

## Lesson 3: Privacy and security in automations

Automations hold access to your accounts and move data between them, so they carry real responsibility:

- **Least access:** give each connection only the access it needs. Do not grant full account access for a
  task that reads one spreadsheet.
- **Mind the data path:** know what data flows through the automation and where it ends up. Do not route
  private or confidential information through a tool or an inbox that should not have it.
- **Secure the accounts:** strong, unique passwords and two-step verification on everything connected.
- **Review access:** remove connections and tools you no longer use.

> **Privacy:** An automation can quietly copy data to places you did not intend, a public sheet, an
> external inbox, a third-party tool. Before you trust one, trace exactly where the data goes at every
> step.

## Lesson 4: Rollback and manual backup (always)

You met this in Week 5; now make it a rule for every automation you keep:

- A **rollback / off switch:** how to turn it off fast, and how to undo what it did.
- A **manual backup:** how to do the job by hand if the automation is off, and someone who knows how.

Write both into the [blueprint](/downloads/automation/automation-blueprint.md). An automation nobody can
turn off or do manually is a risk, not a help.

> **Warning:** The worst automation failures are the silent ones that run wrong for days. Build in
> notifications and checks so failure is loud and quick to catch, never silent and slow.

## Lesson 5: Maintenance (automations are not "set and forget")

An automation needs light, regular care:

- **Review on a schedule** (e.g., monthly): is it still doing the right thing?
- **Check after changes:** when a connected app updates, confirm the automation still works.
- **Keep the blueprint current:** update it when you change the automation.
- **Retire what you no longer need:** an old, forgotten automation can cause surprises.

A small habit of review keeps your automations trustworthy for the long run.

### Common mistakes

- Assuming an automation will run forever without care
- No failure notification, so breakage is silent
- Over-broad access to connected accounts
- Not tracing where data actually goes
- No rollback, no manual backup, and no one else who understands it

## Practice Exercises

1. For one automation, list five things that could go wrong and how you would know.
2. Turn on failure notifications and check the run history.
3. Add a filter that stops the automation on bad or empty input.
4. Trace the full data path of one automation; note anywhere data could leak.
5. Review the access each connection has; reduce any that is too broad.
6. Write (or update) the rollback plan and manual backup in the blueprint.
7. Set yourself a review reminder for one automation.

## Weekly Assignment (Due Before Week 8)

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

## Self-Check Questions

1. Name three reasons an automation might break over time.
2. How do you make a failure loud and quick to catch instead of silent?
3. What should you check about the data path and access of an automation?
4. Why does every kept automation need a rollback plan and a manual backup?
