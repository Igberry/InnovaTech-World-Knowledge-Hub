---
title: "Spreadsheets as Automation"
course: automation
order: 3
week: 3
phase: "Core Skills"
summary: "Use a spreadsheet to remove manual work: formulas that calculate for you, validation that prevents errors, and features that update automatically."
estimatedHours: 8
tools: ["A spreadsheet app"]
downloads:
  - label: "Task-audit log (CSV)"
    href: "/downloads/automation/task-audit-log.csv"
---

**Goal:** Turn a spreadsheet from a place you type into a tool that does work for you, calculating,
checking, and updating automatically, so you stop doing it by hand.

## Learning Objectives

By the end of this week you can:

- Use formulas to calculate and summarise automatically
- Use functions to look things up and count or add by condition
- Use data validation to prevent entry errors
- Use auto-formatting and sorting to keep data tidy without effort
- Decide when a spreadsheet is the right automation tool

## Tools / Accounts Needed This Week

- A spreadsheet app (Google Sheets or Excel)
- The [task-audit log](/downloads/automation/task-audit-log.csv) to practise on

## Pre-Session Resources (about 2 hours)

- Watch: *Search YouTube: "Google Sheets formulas for beginners"* or the Excel equivalent.
- Read: search "spreadsheet data validation tutorial" and read one guide.
- Try: open the task-audit log and add a cell that totals the "Total minutes" column.

## Lesson 1: Formulas do the maths for you

A **formula** is an instruction a spreadsheet calculates automatically. The moment you use one, the
spreadsheet is doing work you used to do by hand, and it updates itself when the data changes.

Start with the basics (these work in Google Sheets and Excel):

- `=SUM(B2:B10)` adds a range
- `=AVERAGE(B2:B10)` averages it
- `=B2*C2` multiplies two cells (e.g., quantity x price)
- `=MAX(B2:B10)` / `=MIN(B2:B10)` find the largest/smallest

Type the formula once; it recalculates forever. That is automation.

> **Tip:** Click a cell to see its formula. Copying a formula down a column adjusts the references
> automatically, so you can calculate a whole column in seconds.

## Lesson 2: Functions that decide and look up

A few more functions remove a lot of manual work:

- `=IF(condition, value_if_true, value_if_false)` makes a decision, e.g.
  `=IF(B2>10000, "Big order", "Normal")`.
- `=COUNTIF(range, "Paid")` counts how many cells say "Paid".
- `=SUMIF(A2:A50, "Paid", B2:B50)` adds the amounts where the status is "Paid".
- A lookup function (such as `XLOOKUP` or `VLOOKUP`) finds a matching value in another table, e.g. pull a
  price from a product list by its name.

These let a spreadsheet answer questions ("how many paid? total paid?") automatically, instead of you
counting by hand.

> **Note:** You do not need to memorise functions. Learn the few above well, and search for others when a
> task needs them. The AI course's prompting skills help here: ask an AI to explain or draft a formula,
> then test it on a small copy.

## Lesson 3: Validation prevents errors

**Data validation** restricts what can be typed in a cell, which stops mistakes before they happen:

- A dropdown list so people pick "Paid / Unpaid" instead of typing variations
- A rule that only allows numbers, or dates, in a column
- A warning if a value is outside an expected range

This is automation in the sense that the spreadsheet enforces the rules for you, keeping the data clean
without you policing every entry.

## Lesson 4: Formatting and sorting that update themselves

- **Conditional formatting** colours cells automatically based on their value (e.g., overdue items turn
  red). You set it once; it updates as data changes.
- **Sorting and filtering** reorganise data on demand without retyping.
- **Named ranges and tables** keep formulas working as you add rows.

Together these keep a spreadsheet readable and current with almost no manual upkeep.

## Lesson 5: When a spreadsheet is the right tool

A spreadsheet is a great, free automation tool when the job is about **numbers, lists, and simple rules**:
trackers, summaries, calculations, simple reports. It is not the right tool when you need to connect
different apps or trigger actions in other systems, that is what Weeks 4 to 6 are for.

> **Rule of thumb:** If the whole task lives inside a table of data, a spreadsheet can probably automate
> it. If it needs to reach into email, forms, or other apps, you will want a no-code automation tool.

### Common mistakes

- Doing by hand what a formula could do (and getting it wrong)
- Not using validation, then fighting messy, inconsistent data
- Writing a complex formula without testing it on a small copy
- Overwriting the only copy while experimenting
- Using a spreadsheet for a job that really needs app-to-app automation

## Practice Exercises

1. In the task-audit log, add formulas to total minutes and average minutes per task.
2. Add an `IF` column that flags any task over 20 total minutes as "Automate".
3. Use `COUNTIF` to count how many tasks are marked "Yes" to automate.
4. Add a dropdown (validation) to the "Automate candidate?" column.
5. Add conditional formatting to highlight high-time tasks in red.
6. Build a tiny product list and use a lookup to pull a price into an orders sheet.
7. Break one formula on purpose, read the error, and fix it.

## Weekly Assignment (Due Before Week 4)

Build a **self-calculating spreadsheet** for a real or realistic need (e.g., a simple sales tracker,
expense log, or the task-audit log extended):

1. At least **four formulas/functions** that do work automatically (including one `IF` and one `COUNTIF`
   or `SUMIF`)
2. **Data validation** on at least one column (a dropdown or a number/date rule)
3. **Conditional formatting** that highlights something useful
4. A short note on **what manual work this removes**

### Grading guide

| Criteria | Weight |
|---|---|
| Formulas work and genuinely automate calculation | 35% |
| Validation prevents real errors | 20% |
| Conditional formatting is useful and correct | 20% |
| Clear note on the manual work removed | 25% |

### Definition of done

- [ ] Four+ working formulas, including IF and COUNTIF/SUMIF
- [ ] Validation on at least one column
- [ ] Useful conditional formatting
- [ ] A note on time/effort saved

## Mentoring Session Plan (90 minutes)

| Time | Activity |
|---|---|
| 0-10 min | Recap; a spreadsheet as a tool that works for you |
| 10-35 min | Build formulas live: SUM, IF, COUNTIF/SUMIF on a shared sheet |
| 35-55 min | Add validation and conditional formatting together |
| 55-75 min | A lookup example; test formulas on a safe copy |
| 75-90 min | When a spreadsheet is the right tool; brief for Week 4 |

## Facilitator Notes

Keep it hands-on; spreadsheet skills stick only through doing. Build formulas live and have learners fix a
deliberately broken one, reading the error message. Stress testing on a copy and never overwriting the
only version. Connect to the AI course: learners can ask an AI to explain a formula, then verify it. For
learners who also took Data Analysis, this reinforces and reframes those skills as automation. Keep data
fictional.

## Self-Check Questions

1. How is using a formula a form of automation?
2. What does `COUNTIF` (or `SUMIF`) let you do automatically?
3. How does data validation prevent errors?
4. When is a spreadsheet the right automation tool, and when is it not?
