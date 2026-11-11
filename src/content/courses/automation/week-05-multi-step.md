---
title: "Multi-Step Automations and Safe Testing"
course: automation
order: 5
week: 5
phase: "Building Automations"
summary: "Chain several steps together with conditions and filters, and test and roll back safely so a bigger automation never causes a bigger problem."
estimatedHours: 8
tools: ["A no-code automation tool", "A spreadsheet", "Email"]
downloads:
  - label: "Automation blueprint"
    href: "/downloads/automation/automation-blueprint.md"
  - label: "Test and rollback checklist"
    href: "/downloads/automation/test-and-rollback-checklist.md"
---

**Goal:** Build an automation with several steps, add conditions so it only runs when it should, and test
and roll it back safely, so more power does not mean more risk.

## Learning Objectives

By the end of this week you can:

- Chain multiple actions into one automation
- Add conditions and filters so steps run only when appropriate
- Document a multi-step automation with a blueprint
- Test a multi-step automation in stages
- Write a rollback plan and a manual backup

## Tools / Accounts Needed This Week

- Your no-code automation tool, a spreadsheet, and email
- The [automation blueprint](/downloads/automation/automation-blueprint.md) and
  [test and rollback checklist](/downloads/automation/test-and-rollback-checklist.md)

## Pre-Session Resources (about 2 hours)

- Watch: *Search YouTube: "[your automation tool] multi-step / filters tutorial"*.
- Read: your tool's help page on conditions, filters, or paths.
- Try: take last week's automation and add one more action to it.

## Lesson 1: Chaining steps

A multi-step automation is just one trigger followed by **several actions** in order. For example:

> WHEN a new order form is submitted:
> 1. Add a row to the orders spreadsheet
> 2. Send the customer a confirmation email
> 3. Send the team a notification
> 4. Create a task to fulfil the order

Each step runs after the one before. The power is real, and so is the responsibility: more steps means more
places a mistake can happen, so testing matters more (Lesson 4).

## Lesson 2: Conditions and filters

Often you only want the automation to run, or a step to run, in certain cases. That is a **condition** (or
filter):

- ONLY IF the order total is over N10,000, DO also notify the manager.
- ONLY IF the email is from outside the company, DO create a support ticket.
- ONLY continue IF the form includes an email address.

Conditions keep automations sensible and stop them acting when they should not. Most tools let you add a
filter step ("only continue if...") or branch into different paths.

> **Tip:** Start with one condition at most. Each condition you add makes the automation harder to test and
> understand. Get the simple path working, then add a condition only if you truly need it.

## Lesson 3: Document it with a blueprint

Once an automation has several steps, write it down. The
[blueprint](/downloads/automation/automation-blueprint.md) records the steps, the apps, the conditions, the
human checkpoints, and, crucially, how to turn it off and do the job by hand. A documented automation is one
you can test, fix, hand over, and trust. An undocumented multi-step automation is a mystery waiting to break.

## Lesson 4: Test in stages

Test a multi-step automation **step by step**, not all at once:

1. **Dry run:** read the blueprint. Does each step do what you expect?
2. **Test each step** with sample data where the tool allows.
3. **One full run** with sample data; check every result by hand.
4. **A few watched real runs** before leaving it alone.

If something is wrong, you want to catch it on step 2 with a test form, not on 200 real customers.

> **Warning:** The more steps and the more it sends outward (emails, messages, records), the more a mistake
> multiplies. Always test multi-step automations with sample data first, and check every output.

## Lesson 5: Rollback and manual backup

Every automation, especially a multi-step one, needs two things before you trust it:

- A **rollback / off switch:** how to turn it off fast, and how to undo what it already did (or why it is
  safe if you cannot).
- A **manual backup:** how to do the job by hand if the automation is off. If no one knows how to do it
  manually, you are dangerously dependent on a tool that can break.

Write both into the blueprint. The [test and rollback checklist](/downloads/automation/test-and-rollback-checklist.md)
walks you through it.

> **Rule of thumb:** If you cannot turn it off and cannot do the job by hand, it is not ready to run on
> anything real.

### Common mistakes

- Adding many steps and conditions before the simple version works
- Testing only the whole thing, so you cannot tell which step failed
- No blueprint, so no one understands or can fix it
- No off switch or manual backup
- Letting a multi-step automation send real messages before testing

## Practice Exercises

1. Extend last week's automation to three steps; write the blueprint.
2. Add one condition (a filter) so an extra step runs only sometimes.
3. Test each step with sample data and record the results.
4. Deliberately break one step; confirm your testing catches it; fix it.
5. Write the rollback plan: how to switch it off and undo it.
6. Write the manual backup: how to do the task by hand.
7. Hand your blueprint to a classmate; can they understand and run it?

## Weekly Assignment (Due Before Week 6)

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

## Self-Check Questions

1. Why does testing matter more as you add steps?
2. What is a condition (filter), and when would you use one?
3. Why does every automation need a rollback plan and a manual backup?
4. Why test each step rather than only the whole automation?
