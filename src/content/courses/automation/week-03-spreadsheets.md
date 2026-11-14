---
title: "Spreadsheets as Automation"
course: automation
order: 3
week: 3
phase: "Core Skills"
summary: "Turn a spreadsheet into a little machine that calculates, checks, and tidies itself. You type formulas, break one on purpose, and fix it - hands-on from the first minute."
estimatedHours: 8
tools: ["A spreadsheet app"]
downloads:
  - label: "Task-audit log (CSV)"
    href: "/downloads/automation/task-audit-log.csv"
---

**Goal:** Turn a spreadsheet from a place you type into a tool that works for you - calculating, checking,
and updating on its own. You build every formula with your own hands and even break one to see what happens.

## What you'll be able to do

- Use formulas to calculate and summarise automatically
- Use functions to look things up and count or add by condition
- Use data validation to stop entry errors before they happen
- Use auto-formatting and sorting to keep data tidy with no effort
- Decide when a spreadsheet is the right automation tool

## Before you start (about 10 minutes)

- Open a spreadsheet app (Google Sheets or Excel) and the
  [task-audit log](/downloads/automation/task-audit-log.csv) to practise on. Work on a copy.
- Warm-up: in any empty cell, type `=SUM(1,2,3)` and press Enter. It shows 6. The spreadsheet just did
  work for you. That is the whole idea.

## Try it 1 - Make formulas do the maths

**Why it matters:** the moment you use a formula, the spreadsheet does work you used to do by hand, and it
recalculates the instant the data changes.

**Do this now (these work in Sheets and Excel):**
1. In your task-audit log copy, total a column with `=SUM(B2:B10)`.
2. Average it with `=AVERAGE(B2:B10)`.
3. Multiply two cells, for example quantity by price: `=B2*C2`.
4. Find the biggest and smallest with `=MAX(B2:B10)` and `=MIN(B2:B10)`.
5. Change a number in the range and watch the totals update themselves.

**You've got it when:** your totals change on their own the moment you edit a number.

## Try it 2 - Let the sheet decide and look things up

**Why it matters:** a few functions remove a lot of manual counting and matching.

**Do this now:**
1. Add a decision with `=IF(B2>10000, "Big order", "Normal")`.
2. Count matches with `=COUNTIF(A2:A50, "Paid")`.
3. Add by condition with `=SUMIF(A2:A50, "Paid", B2:B50)`.
4. Build a tiny product list, then pull a price by name with a lookup (`XLOOKUP` or `VLOOKUP`).
5. Stuck on a formula? Ask an AI to draft it (from the AI course), then test it on a small copy.

**You've got it when:** the sheet answers "how many paid? total paid?" without you counting.

## Try it 3 - Stop bad data with validation

**Why it matters:** data validation restricts what can be typed, so mistakes never get in.

**Do this now:**
1. Pick a status column and add a **dropdown** so people pick "Paid / Unpaid" instead of typing variations.
2. Add a rule on another column that only allows numbers, or only dates.
3. Try to type something invalid and watch it get blocked.

**You've got it when:** the sheet refuses a wrong entry before it can cause a problem.

## Try it 4 - Formatting and sorting that update themselves

**Why it matters:** these keep a sheet readable and current with almost no upkeep.

**Do this now:**
1. Add **conditional formatting** so overdue or high-time items turn red automatically.
2. **Sort or filter** your data, then change a value and watch the colours follow.
3. Break one formula on purpose (delete a bracket), read the error message, then fix it.

**You've got it when:** cells recolour themselves as data changes, and you have fixed a broken formula by reading its error.

### Watch out for

- Doing by hand what a formula could do (and getting it wrong)
- Not using validation, then fighting messy, inconsistent data
- Writing a complex formula without testing it on a small copy
- Overwriting the only copy while experimenting
- Using a spreadsheet for a job that really needs app-to-app automation

## This week's build: a self-calculating spreadsheet

Build a sheet for a real or realistic need (a simple sales tracker, an expense log, a market-stall takings
sheet, or your task-audit log extended) that does its own work:

1. At least **four formulas/functions** that automate calculation (including one `IF` and one `COUNTIF` or `SUMIF`)
2. **Data validation** on at least one column (a dropdown, or a number/date rule)
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

## Extra quick wins (optional)

- Make a tiny budget that shows "over/under" in red or green automatically.
- Add a dropdown to a sheet a family member uses and watch their typos disappear.
- Ask an AI to explain one formula you do not understand, then test its answer.

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

## Can you do these now?

1. How is using a formula a form of automation?
2. What does `COUNTIF` (or `SUMIF`) let you do automatically?
3. How does data validation prevent errors?
4. When is a spreadsheet the right automation tool, and when is it not?
