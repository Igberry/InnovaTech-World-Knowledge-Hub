---
title: "Multi-Step Automations and Safe Testing"
course: automation
order: 5
week: 5
phase: "Building Automations"
summary: "Chain several steps into one automation, add a condition so it only fires when it should, then test it in stages and build a real off-switch. More power, under control."
estimatedHours: 8
tools: ["A no-code automation tool", "A spreadsheet", "Email"]
downloads:
  - label: "Automation blueprint"
    href: "/downloads/automation/automation-blueprint.md"
  - label: "Test and rollback checklist"
    href: "/downloads/automation/test-and-rollback-checklist.md"
---

**Goal:** Build an automation with several steps, add a condition so it only runs when it should, test it in
stages, and write a real rollback - so more power does not mean more risk. You build it, break it, and prove
you can switch it off.

## What you'll be able to do

- Chain several actions into one automation
- Add conditions and filters so steps run only when appropriate
- Document a multi-step automation with a blueprint
- Test a multi-step automation in stages
- Write a rollback plan and a manual backup

## Before you start (about 10 minutes)

- Open your tool, a spreadsheet, and email, plus the
  [automation blueprint](/downloads/automation/automation-blueprint.md) and
  [test and rollback checklist](/downloads/automation/test-and-rollback-checklist.md).
- Warm-up: take last week's automation and add one more action to it (for example a second notification).
  You have just made your first multi-step automation.

## Try it 1 - Chain several steps

**Why it matters:** a multi-step automation is one trigger followed by several actions in order. More power,
and more places a mistake can hide, so each step must earn its place.

**Do this now - build this chain in your tool with a test form:**
1. WHEN a new order form is submitted, DO add a row to the orders spreadsheet.
2. DO send the customer a confirmation email.
3. DO send the team a notification.
4. DO create a task to fulfil the order.
5. Run it once with a test submission and check all four happened in order.

**You've got it when:** one test submission triggers all your steps, in sequence.

## Try it 2 - Add a condition so it fires only when it should

**Why it matters:** often you only want a step to run in certain cases. A condition (or filter) keeps the
automation sensible.

**Do this now:**
1. Add a filter: ONLY IF the order total is over N10,000, DO also notify the manager.
2. Or: ONLY continue IF the form includes an email address.
3. Test both a case that should pass the condition and one that should not.
4. Keep it to one condition for now - each one makes testing harder.

**You've got it when:** the extra step runs for the right cases and skips the rest.

## Try it 3 - Write the blueprint

**Why it matters:** once an automation has several steps, an undocumented one is a mystery waiting to break.
The blueprint is what lets you test, fix, hand over, and trust it.

**Do this now:**
1. Open the [blueprint](/downloads/automation/automation-blueprint.md).
2. Write down the steps, the apps, the condition, and the human checkpoints.
3. Add the most important line of all: how to turn it off and do the job by hand.

**You've got it when:** someone else could read your blueprint and run or stop the automation.

## Try it 4 - Test in stages, then prove the off-switch

**Why it matters:** test step by step, not all at once, so you catch a fault on a test form, not on 200 real
customers. And every automation needs a way to stop and a way to do the job by hand.

**Do this now:**
1. **Dry run:** read the blueprint - does each step do what you expect?
2. **Test each step** with sample data where the tool allows.
3. **One full run** with sample data; check every result by hand.
4. Deliberately **break one step**, confirm your testing catches it, then fix it.
5. Write the **rollback** (how to switch it off and undo it) and the **manual backup** (how to do it by hand).

**You've got it when:** you can switch the whole thing off, undo it, and do the task by hand if needed.

### Watch out for

- Adding many steps and conditions before the simple version works
- Testing only the whole thing, so you cannot tell which step failed
- No blueprint, so no one understands or can fix it
- No off switch or manual backup
- Letting a multi-step automation send real messages before testing

## This week's build: one safe multi-step automation

Build and document **one multi-step automation** (at least three steps, one condition):

1. A completed **blueprint** (steps, apps, condition, human checks)
2. The **built automation**, tested in stages with sample data
3. A **rollback plan** and a **manual backup**
4. A short note on **what could go wrong** and how you would know

### Grading guide

| Criteria | Weight |
|---|---|
| A working multi-step automation with a sensible condition | 35% |
| Clear, complete blueprint | 20% |
| Evidence of staged, safe testing | 25% |
| Rollback plan and manual backup present | 20% |

### Definition of done

- [ ] Three+ steps with one condition
- [ ] Blueprint completed
- [ ] Tested in stages with sample data
- [ ] Rollback and manual backup written

## Extra quick wins (optional)

- Hand your blueprint to a classmate - can they understand and run it without you?
- Add a branch: send a different message for one type of order.
- Time how long the manual version takes, so next week's reliability work has a number to beat.

## Mentoring Session Plan (90 minutes)

| Time | Activity |
|---|---|
| 0-10 min | Recap; more power means more need to test |
| 10-40 min | Build a multi-step automation live; add one condition |
| 40-60 min | Write the blueprint together; identify human checkpoints |
| 60-80 min | Stage-by-stage testing; catch a broken step |
| 80-90 min | Rollback and manual backup; brief for Week 6 |

## Facilitator Notes

The lesson that must land is safe testing with a rollback and a manual backup, this is where careless
automation causes real damage. Build a multi-step automation live, then deliberately break a step so
learners see staged testing catch it. Insist every automation has an off switch and a manual backup before
it runs for real. Discourage over-complicating; one condition is plenty at this stage. Keep all test data
fictional.

## Can you do these now?

1. Why does testing matter more as you add steps?
2. What is a condition (filter), and when would you use one?
3. Why does every automation need a rollback plan and a manual backup?
4. Why test each step rather than only the whole automation?
