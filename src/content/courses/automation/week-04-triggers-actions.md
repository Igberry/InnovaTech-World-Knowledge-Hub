---
title: "Connecting Apps: Triggers and Actions"
course: automation
order: 4
week: 4
phase: "Building Automations"
summary: "Use a no-code tool to connect two apps so that when something happens in one, an action runs in another, your first real cross-app automation."
estimatedHours: 8
tools: ["A no-code automation tool", "A form or spreadsheet", "Email"]
downloads:
  - label: "Trigger-action planner"
    href: "/downloads/automation/trigger-action-planner.md"
---

**Goal:** Build your first real cross-app automation with a no-code tool: a trigger in one app that runs
an action in another, planned, tested, and working.

## Learning Objectives

By the end of this week you can:

- Explain how a no-code automation tool connects apps
- Choose a trigger and an action and connect two apps
- Map fields so data moves correctly between apps
- Test an automation safely before trusting it
- Build one simple, working "when X, do Y" automation

## Tools / Accounts Needed This Week

- Your no-code automation tool (from Week 0)
- A form or spreadsheet, and email, to connect
- The [trigger-action planner](/downloads/automation/trigger-action-planner.md)

## Pre-Session Resources (about 2 hours)

- Watch: *Search YouTube: "[your automation tool] tutorial for beginners"* for the tool you chose.
- Read: your tool's "getting started" help page.
- Try: look at the tool's list of apps it can connect. Note which ones you already use.

## Lesson 1: How a no-code tool connects apps

A **no-code automation tool** sits between your apps and watches for a **trigger**. When the trigger
happens, it runs an **action** in another app, automatically. You set this up with menus and clicks, no
programming.

The shape is exactly what you learned in Week 1:

> **WHEN** (trigger in App A) **DO** (action in App B)

Example: WHEN a new response arrives in a Google Form, DO add a row to a Google Sheet and send yourself an
email. The tool connects the form, the sheet, and the email for you.

> **Note:** Different tools use different words (some say "trigger and action", others "when this, then
> that"), but the idea is identical. Learn the thinking and you can use any of them.

## Lesson 2: Choosing a trigger

The **trigger** is the event that starts the automation. Common beginner triggers:

- A new form submission
- A new row in a spreadsheet
- A new email matching something
- A scheduled time (every day at 8am)

Pick a trigger that happens cleanly and predictably. A good first automation uses a trigger you can create
on purpose for testing (like submitting your own test form), so you can check it safely.

## Lesson 3: Choosing an action and mapping fields

The **action** is what happens automatically. Common beginner actions:

- Add a row to a spreadsheet
- Send an email or a notification
- Create a task or a calendar event

The important detail is **field mapping**: telling the tool which piece of the trigger goes where in the
action. For example, the form's "Name" field maps to the spreadsheet's "Name" column, and "Email" to the
"Email" column. Getting the mapping right is what makes the data arrive correctly.

> **Tip:** Plan the automation on paper first with the
> [trigger-action planner](/downloads/automation/trigger-action-planner.md). Knowing your trigger, action,
> and field mapping before you open the tool makes building it quick and clear.

## Lesson 4: Test before you trust

Never switch a new automation on for real work without testing. The safe routine:

1. Use **sample data** (submit your own test form, add a test row).
2. Run it **once** and check the result by hand, did the right data land in the right place?
3. Watch a **few real runs** before leaving it alone.

Most tools have a "test" button that runs the automation with a sample so you can check each step. Use it.

> **Warning:** A new automation can quietly do the wrong thing on every run. Test with sample data first,
> and check the result yourself before trusting it with anything that matters.

## Lesson 5: Build your first automation

Put it together. A classic, safe first build:

> WHEN a new response is submitted to my test form, DO add a row to my spreadsheet and send me a
> notification email.

Plan it, build it, test it with your own submissions, and confirm the row and email appear correctly. That
is a complete, real automation, and the pattern behind thousands of useful ones.

### Common mistakes

- Mapping fields wrongly, so data lands in the wrong column
- Not testing, then trusting a broken automation
- Choosing a messy or unpredictable trigger for a first build
- Connecting an account with more access than the task needs
- Building something complex before the simple version works

## Practice Exercises

1. In the planner, design a "new form response, add a row" automation end to end.
2. Build it in your tool and map every field correctly.
3. Test it by submitting your own response; check the row is correct.
4. Add a second action: send yourself a notification email.
5. Deliberately mis-map one field, see the wrong result, then fix it.
6. Change the trigger to a scheduled time and observe the difference.
7. Write down the access you granted and whether it is the minimum needed.

## Weekly Assignment (Due Before Week 5)

Build and document **one working cross-app automation**:

1. A completed **trigger-action planner** for the automation
2. The **built automation** connecting two (or more) apps, with correct field mapping
3. Evidence of a **test**: a sample run and the correct result (a screenshot or description)
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

## Self-Check Questions

1. What are a trigger and an action, in a no-code automation?
2. What is field mapping, and why does getting it wrong cause problems?
3. How do you test a new automation safely?
4. Why grant a connected account only the minimum access?
