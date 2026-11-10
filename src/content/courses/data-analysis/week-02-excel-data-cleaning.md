---
title: "Excel — Data Cleaning"
course: "data-analysis"
order: 2
week: 2
phase: "Foundations"
summary: "Turn a messy dataset into a trustworthy one and document every decision."
estimatedHours: 10
tools: ["Excel"]
downloads:
  - label: "Orders (raw, messy) CSV"
    href: "/downloads/data-analysis/orders_raw.csv"
---
**Goal:** Turn a messy dataset into a trustworthy one and document every decision.

## Learning Objectives
- Identify common data quality problems
- Use text, date, and logical functions to fix data
- Remove duplicates and handle blanks and invalid values
- Keep a **data-cleaning log**
- Use Data Validation to prevent future errors

## Pre-Session Videos (about 2 hours)
- Search YouTube: **"Alex The Analyst Data Cleaning in Excel"**
- Search YouTube: **"Leila Gharani Excel TRIM CLEAN PROPER text functions"**
- Search YouTube: **"ExcelIsFun Remove Duplicates"**

---

## Lesson 1: Why Cleaning Matters
"Garbage in, garbage out." If the same city is spelled four ways, a pivot table will show four cities. If duplicates exist, revenue is overstated, and a wrong number in front of a client costs trust.

### The `orders_raw.csv` problems (you will find all of these)
| Problem | Example | Fix |
|---|---|---|
| Extra spaces | `" Benin City"` | `TRIM` |
| Inconsistent case | `YENAGOA`, `yenagoa ` | `PROPER` |
| Different spellings | `Port-Harcourt` | `SUBSTITUTE` / Find & Replace |
| Mixed date formats | `09/07/2025`, `2025-07-09`, `09-Jul-2025` | Convert to real dates |
| Numbers stored as text | `"₦22,000"`, `"2 units"` | `SUBSTITUTE` + `VALUE` |
| Negative quantities | `-1` | Investigate, then correct or flag |
| Missing values | blank `payment_method` | Fill with "Unknown" or flag |
| Duplicate rows | same `order_id` twice | Remove Duplicates |

---

## Lesson 2: Cleaning Toolkit

### 2.1 Always keep the raw data safe
1. Copy `orders_raw.csv` into a workbook. Name the sheet **Raw**. **Never edit it.**
2. Copy to a new sheet named **Clean**. Work there.
3. Add a third sheet called **Cleaning Log** (see below).

### 2.2 Text functions
```
=TRIM(H2)                     removes extra spaces
=PROPER(TRIM(H2))             "port harcourt" → "Port Harcourt"
=UPPER(A2)  =LOWER(A2)
=LEN(A2)                      count characters
=LEFT(A2,3)  =RIGHT(A2,2)  =MID(A2,2,4)
=SUBSTITUTE(H2,"-"," ")       "Port-Harcourt" → "Port Harcourt"
=SUBSTITUTE(F2,"₦","")        remove the currency symbol
=SUBSTITUTE(F2,",","")        remove thousands commas
=VALUE("22000")               text to number
=CLEAN(A2)                    removes hidden characters
```
**Combine them (nested):**
```
=PROPER(TRIM(SUBSTITUTE(H2,"-"," ")))
```
Port-Harcourt, PORT HARCOURT, and ` port harcourt ` all become `Port Harcourt`.

**Cleaning price text:**
```
=VALUE(SUBSTITUTE(SUBSTITUTE(F2,"₦",""),",",""))
```
> After a formula column is correct, **copy → Paste Special → Values** so the cleaned result no longer depends on the raw column.

### 2.3 Quantities like "2 units"
```
=VALUE(LEFT(E2,FIND(" ",E2&" ")-1))
```
This takes everything before the first space. For plain numbers it returns them unchanged.

### 2.4 Fixing dates
Dates arrive as text in mixed formats. Strategy:
1. Check which values are *real dates* (right-aligned) vs *text* (left-aligned).
2. For text dates like `09/07/2025` (DD/MM/YYYY):
```
=DATE(RIGHT(B2,4), MID(B2,4,2), LEFT(B2,2))
```
3. For `YYYY-MM-DD` text:
```
=DATE(LEFT(B2,4), MID(B2,6,2), RIGHT(B2,2))
```
4. Use a helper formula with IF to detect which format applies, for example `=IF(MID(B2,5,1)="-", ..., ...)`. The `DD-Mon-YYYY` format can be fixed with **Find & Replace** after switching the system date format, or with `DATEVALUE`.
5. Format the final column as **Short Date** and verify that every date falls within 2025.

> **Teaching tip:** Messy dates are the hardest part of this week. Work through the first format together, then let students do the other two. Beginners can alternatively use **Data → Text to Columns → Date (DMY)** for the DD/MM/YYYY block.

### 2.5 Logical functions
```
=IF(E2<0,"CHECK","OK")                        flag problems
=IF(I2="","Unknown",I2)                       fill blanks
=IFERROR(VALUE(A2),"")                        avoid #VALUE! errors
=IF(AND(E2>0,F2>0),E2*F2,"")                  multiple conditions
```

### 2.6 Remove duplicates
1. Click in data, then **Data → Remove Duplicates**.
2. Tick **all columns** to remove exact duplicates (or tick only `order_id` if each order should be unique).
3. Excel tells you how many were removed. **Write it in the log.**

### 2.7 Find blanks
**Home → Find & Select → Go To Special → Blanks.** Or filter a column and tick *(Blanks)*.

### 2.8 Data Validation (prevent future mess)
**Data → Data Validation → List**, source: `Transfer,Card,Cash,POS`. Anyone entering a payment method must now pick from the list.

### 2.9 Handling negative quantities
Don't just delete them. Decide: Is it a typing mistake (use the absolute value `=ABS(E2)`) or a return/cancellation (keep it but flag it)? **Write the decision in the log.** Analysts get trusted for being transparent.

---

## Lesson 3: The Cleaning Log
Create a sheet with these columns:

| # | Issue found | Column | How many rows | Action taken | Formula / method | Date |
|---|---|---|---|---|---|---|
| 1 | Duplicate rows | all | 25 | Removed | Remove Duplicates | |
| 2 | Extra spaces and mixed case in city | city | ~700 | Standardised | `PROPER(TRIM())` | |

A log shows an employer that you work professionally and make traceable decisions.

---

## Practice Exercises
1. Count how many distinct spellings of city exist **before** cleaning (use a filter dropdown), then count after cleaning. You should end with exactly **6** cities.
2. Count the blank `payment_method` cells.
3. Create a flag column showing every row with quantity ≤ 0.
4. Convert all prices to numbers.
5. After cleaning, check the row count: it should be **2,000** (matching `orders_clean.csv` if every duplicate is removed).

---

## Weekly Assignment (Due Before Week 3)
**Submit `week2_cleaning.xlsx` with 3 sheets:**
1. **Raw** (untouched)
2. **Clean** (all issues resolved: 6 cities, real dates, numeric price/quantity, no duplicates, blanks handled)
3. **Cleaning Log** (at least 8 issues documented)

**Bonus:** Add Data Validation lists for `city`, `payment_method`, and `status`.

**Grading guide:** all issue types fixed (50%), log quality (25%), raw data preserved (10%), correct final row count (15%).

---

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0–10 min | Review Week 1 assignment, quick feedback |
| 10–30 min | Live demo: nested `PROPER(TRIM(...))`, then students repeat it |
| 30–65 min | Pair challenge: fix dates and prices while the facilitator circulates |
| 65–80 min | Review each student's cleaning log aloud ("explain this decision") |
| 80–90 min | Preview Week 3, set the due date |

## Self-Check Questions
1. Why do we keep a Raw sheet?
2. What does `=TRIM(PROPER(A2))` do vs `=PROPER(TRIM(A2))`? (Does order matter?)
3. Give two reasons not to delete rows with negative quantities immediately.
