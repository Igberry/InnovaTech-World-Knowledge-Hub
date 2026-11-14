---
title: "Connecting Apps: Triggers and Actions"
course: automation
order: 4
week: 4
phase: "Building Automations"
summary: "Build your first real cross-app automation: submit a form, and watch a row appear in a sheet and an email land in your inbox, all on its own. The satisfying week where it clicks."
estimatedHours: 8
tools: ["A no-code automation tool", "A form or spreadsheet", "Email"]
downloads:
  - label: "Trigger-action planner"
    href: "/downloads/automation/trigger-action-planner.md"
---

**Goal:** Build your first real cross-app automation with a no-code tool - a trigger in one app that runs
an action in another, planned, tested, and actually working. You will submit a test form and watch the
magic happen.

## What you'll be able to do

- Explain how a no-code tool connects apps
- Choose a trigger and an action and connect two apps
- Map fields so data moves to the right place
- Test an automation safely before trusting it
- Build one simple, working "when X, do Y" automation

## Before you start (about 10 minutes)

- Open your no-code tool and the
  [trigger-action planner](/downloads/automation/trigger-action-planner.md). Have a form (or sheet) and
  email ready to connect.
- Warm-up: in your tool, open the app list and find three apps you already use. You can connect any of
  them. That is the week in one glance.

## Try it 1 - See the tool bridge two apps

**Why it matters:** a no-code tool sits between your apps, watches for a trigger, and runs an action in
another app - the exact "WHEN ... DO" shape from Week 1, now across apps.

**Do this now:**
1. Start a new automation in your tool.
2. Notice it asks for a **trigger app** first, then an **action app**. That is the bridge.
3. Read one example in your head: WHEN a new Google Form response arrives, DO add a row to a Google Sheet.

**You've got it when:** you can describe, in one line, how the tool links App A to App B.

## Try it 2 - Choose a trigger you can test

**Why it matters:** the trigger is the event that starts everything. A good first trigger is one you can
fire on purpose to test safely.

**Do this now:**
1. Create a simple Google Form (or pick a spreadsheet) as your trigger source.
2. In your tool, set the trigger to "new form response" (or "new row").
3. Submit one test response yourself so the tool can find a sample to work with.

**You've got it when:** your tool recognises a test submission as the trigger.

## Try it 3 - Add an action and map the fields

**Why it matters:** field mapping tells the tool which piece of the trigger goes where in the action. Get
this right and the data arrives correctly; get it wrong and it lands in the wrong column.

**Do this now:**
1. Plan it first on the [planner](/downloads/automation/trigger-action-planner.md): trigger, action, and which field goes where.
2. Set the action to "add a row to a spreadsheet".
3. Map each field: the form's **Name** to the sheet's **Name** column, **Email** to **Email**, and so on.
4. Add a second action: **send yourself a notification email** with the new details.

**You've got it when:** every form field points to the right column and a notification is set.

## Try it 4 - Test before you trust

**Why it matters:** a new automation can quietly do the wrong thing on every run. Never switch it on for
real work without checking.

**Do this now:**
1. Use the tool's **test** button, or submit your own test form.
2. Check the result by hand: did the right data land in the right place, and did the email arrive?
3. Deliberately mis-map one field, run it, see the wrong result, then fix it.
4. Watch a couple more test runs before trusting it.

**You've got it when:** a test submission puts the correct row in your sheet and a correct email in your inbox.

### Watch out for

- Mapping fields wrongly, so data lands in the wrong column
- Not testing, then trusting a broken automation
- Choosing a messy or unpredictable trigger for a first build
- Connecting an account with more access than the task needs
- Building something complex before the simple version works

## This week's build: your first live cross-app automation

Build and document **one working automation** you would actually use (an enquiry logger, a sign-up
recorder, a market-stall order catcher):

1. A completed **trigger-action planner** for it
2. The **built automation** connecting two or more apps, with correct field mapping
3. Evidence of a **test**: a sample run and the correct result (a screenshot or a description)
4. A short note on the **access you granted** and why it is the minimum needed

### Grading guide

| Criteria | Weight |
|---|---|
| A real, working trigger-to-action automation | 40% |
| Correct field mapping (data lands right) | 20% |
| Evidence of safe testing | 25% |
| Sensible, minimal account access | 15% |

### Definition of done

- [ ] Planner completed
- [ ] Automation built and connecting apps
- [ ] A tested sample run with correct result
- [ ] A note on minimal access

## Extra quick wins (optional)

- Change the trigger to a scheduled time (every day at 8am) and see the difference.
- Add a third action: create a task or a calendar event from the same trigger.
- Share your test form with a friend and watch their response flow through.

## Mentoring Session Plan (90 minutes)

| Time | Activity |
|---|---|
| 0-10 min | Recap; the no-code tool as a bridge between apps |
| 10-40 min | Build a "form to spreadsheet to email" automation live |
| 40-60 min | Field mapping practice; fix a mis-mapped field together |
| 60-80 min | Test with sample data; read the run result |
| 80-90 min | Access and safety; brief for Week 5 |

## Facilitator Notes

This is the first real cross-app build, so keep it concrete and shared: build one automation live that
everyone can follow (form to sheet to email works well and is free). Drill field mapping, the most common
beginner error. Insist on testing with sample data before trusting anything. Note that tools change their
menus, so teach the trigger-action thinking over specific clicks. Watch account access; grant the minimum.

## Can you do these now?

1. What are a trigger and an action, in a no-code automation?
2. What is field mapping, and why does getting it wrong cause problems?
3. How do you test a new automation safely?
4. Why grant a connected account only the minimum access?
