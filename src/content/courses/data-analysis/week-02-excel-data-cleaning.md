---
title: "Excel - Data Cleaning"
course: "data-analysis"
order: 2
week: 2
phase: "Foundations"
summary: "Take a genuinely messy file and fix it like a pro - spot the problems, repair them, and log every decision so an employer trusts your numbers."
estimatedHours: 10
tools: ["Excel"]
downloads:
  - label: "Orders (raw, messy) CSV"
    href: "/downloads/data-analysis/orders_raw.csv"
---
**Goal:** You get a deliberately messy sales file. By the end of the week you turn it into a clean, trustworthy dataset and keep a log of every fix. This is what analysts spend most of their real time doing.

## What you'll be able to do
- Spot the common data quality problems at a glance
- Fix text, dates, and numbers with Excel functions
- Remove duplicates and handle blanks and bad values
- Keep a professional cleaning log
- Stop future mess with Data Validation

## Before you start (about 10 minutes)
- Download the **Orders (raw, messy) CSV** from the panel on this page and open it with **Data -> From Text/CSV**, UTF-8, Load.
- Warm-up, 3 minutes: filter the `city` column and count how many different spellings of the same cities you can see. Note the number. You will fix this today.
- Optional: search YouTube for *"Alex The Analyst Data Cleaning in Excel"* and watch five minutes.

## Try it 1 - Protect the original

**Why it matters:** never edit raw data. If a fix goes wrong, you need something to fall back to, and employers expect it.

**Do this now:**
1. Paste the raw data into a sheet named **Raw**. Never touch it again.
2. Copy it to a new sheet named **Clean**. Do all work here.
3. Add a third sheet named **Cleaning Log** with columns: # , Issue found, Column, Rows affected, Action taken, Formula/method, Date.

**You've got it when:** you have three sheets and the Raw sheet is untouched.

## Try it 2 - Fix the text

**Why it matters:** if one city is spelled four ways, your report will show four cities and your numbers will be wrong.

**Do this now, in a helper column next to `city`:**
1. Clean spaces and case together: `=PROPER(TRIM(H2))`.
2. Replace dashes in names: `=PROPER(TRIM(SUBSTITUTE(H2,"-"," ")))`. Now `Port-Harcourt`, `PORT HARCOURT`, and ` port harcourt ` all become `Port Harcourt`.
3. Copy the cleaned column, then **Paste Special -> Values** so it no longer depends on the messy original.

**You've got it when:** your city column has exactly **6** clean, consistent names.

## Try it 3 - Turn text back into numbers

**Why it matters:** `"₦22,000"` looks like money but Excel treats it as text, so it will not add up.

**Do this now:**
1. Strip the symbol and commas, then convert: `=VALUE(SUBSTITUTE(SUBSTITUTE(F2,"₦",""),",",""))`.
2. For quantities like `"2 units"`, take the number before the space: `=VALUE(LEFT(E2,FIND(" ",E2&" ")-1))`.
3. Paste Special -> Values over your cleaned columns.

**You've got it when:** `SUM` works on the price and quantity columns and returns a real total.

## Try it 4 - Fix the dates (the tricky one)

**Why it matters:** dates arrive in three formats. Mixed dates quietly break every monthly report.

**Do this now:**
1. Spot the text dates: text sits on the left of the cell, real dates on the right.
2. For `DD/MM/YYYY` text like `09/07/2025`: `=DATE(RIGHT(B2,4),MID(B2,4,2),LEFT(B2,2))`.
3. For `YYYY-MM-DD` text: `=DATE(LEFT(B2,4),MID(B2,6,2),RIGHT(B2,2))`.
4. Easiest for a whole DD/MM/YYYY block: **Data -> Text to Columns -> Date (DMY)**.
5. Format the final column as **Short Date** and check every date lands in 2025.

**You've got it when:** every date is a real date and none fall outside 2025.

## Try it 5 - Remove duplicates and blanks

**Why it matters:** duplicate orders overstate revenue. Blanks hide problems.

**Do this now:**
1. **Data -> Remove Duplicates**. Tick all columns for exact duplicates, or only `order_id` if each order must be unique. Write the number removed in your log.
2. Find blanks: **Home -> Find & Select -> Go To Special -> Blanks**, or filter a column for *(Blanks)*.
3. Fill blank payment methods: `=IF(I2="","Unknown",I2)`.
4. Flag bad quantities: `=IF(E2<0,"CHECK","OK")`. Do not just delete them - decide if each is a typo (`=ABS(E2)`) or a return to keep and flag. Record the decision.

**You've got it when:** your row count is **2,000**, there are no blanks left unhandled, and every bad quantity is flagged.

## Try it 6 - Stop the mess coming back

**Why it matters:** a tiny bit of prevention saves hours of cleaning later.

**Do this now:**
1. Select the `payment_method` column.
2. **Data -> Data Validation -> List**, source: `Transfer,Card,Cash,POS`.
3. Try typing a wrong value - Excel now rejects it.

**You've got it when:** typing anything outside the list is blocked.

## This week's build: a clean file and a cleaning log

Submit `week2_cleaning.xlsx` with three sheets anyone could trust:
1. **Raw** - untouched.
2. **Clean** - all issues fixed: 6 cities, real dates, numeric price and quantity, no duplicates, blanks handled.
3. **Cleaning Log** - at least 8 issues documented, each with what you did and why.

**Bonus:** add Data Validation lists for `city`, `payment_method`, and `status`.

*A cleaning log is what makes an employer trust you. It says: this person makes traceable, honest decisions.*

### Grading guide

| Criteria | Weight |
|---|---|
| All issue types fixed correctly | 50% |
| Cleaning log quality | 25% |
| Correct final row count (2,000) | 15% |
| Raw data preserved | 10% |

### Definition of done

- [ ] Raw sheet preserved, Clean sheet fully repaired
- [ ] Exactly 6 cities, all dates real and within 2025
- [ ] Prices and quantities are numbers, no duplicates
- [ ] Blanks and bad quantities handled with a recorded decision
- [ ] Cleaning log has at least 8 documented issues

## Extra quick wins (optional)
- Count distinct city spellings before and after cleaning - a satisfying before/after number for your log.
- Try `=CLEAN(A2)` to strip hidden characters, and `=LEN(A2)` to catch sneaky trailing spaces.

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0-10 min | Review Week 1 builds, quick feedback |
| 10-30 min | Live demo: nested `PROPER(TRIM(...))`, then students repeat it |
| 30-65 min | Pair challenge: fix dates and prices while the facilitator circulates |
| 65-80 min | Each student reads one log entry aloud and defends the decision |
| 80-90 min | Preview Week 3, set the due date |

## Facilitator Notes

"Garbage in, garbage out" lands best as a live demo: build a quick pivot on the messy city column so students see four "cities" that are really one. Messy dates (Try it 4) are the hardest part of the week; work the first format together, then let students do the other two, and keep Text to Columns as the escape hatch for anyone stuck. Push hard on the cleaning log and on not deleting negative quantities blindly - transparency is the professional habit this week teaches. Order of operations matters: `PROPER(TRIM())` vs `TRIM(PROPER())` is a good discussion, though the result is the same here.

## Self-Check Questions
1. Why do we keep a Raw sheet we never edit?
2. What does `=PROPER(TRIM(A2))` do, and does the order matter?
3. Give two reasons not to delete rows with negative quantities straight away.
