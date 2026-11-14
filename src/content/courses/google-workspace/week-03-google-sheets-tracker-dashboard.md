---
title: "Google Sheets: Inventory, Sales and a Dashboard"
course: google-workspace
order: 3
week: 3
summary: "Turn two raw CSV files into a working tracker, write formulas and QUERY that answer real questions, and ship a one-page dashboard."
estimatedHours: 10
tools: ["Google Sheets", "Google Drive"]
downloads:
  - label: "20-item fictional inventory CSV"
    href: "/downloads/google-workspace/inventory-20-items.csv"
  - label: "100-row fictional sales CSV"
    href: "/downloads/google-workspace/sales-sample-100.csv"
  - label: "Five QUERY practice examples"
    href: "/downloads/google-workspace/query-practice-examples.md"
draft: false
---

**Goal:** This week you'll turn two raw CSV files into a working inventory and sales tracker, write formulas that answer real business questions, and build a one-page dashboard. Nearly all hands-on in the actual spreadsheet.

## What you'll be able to do

- Import a CSV, keep a clean header row and format Naira as real numbers
- Write formulas, lookups and Google-only functions that answer questions
- Add dropdowns, conditional formatting and protected ranges sensibly
- Build a pivot table, two charts and a one-page dashboard
- Check every total against the source before you trust it

## Before you start (about 10 minutes)

- Download the [inventory CSV](/downloads/google-workspace/inventory-20-items.csv) and the [sales CSV](/downloads/google-workspace/sales-sample-100.csv), and open the [five QUERY examples](/downloads/google-workspace/query-practice-examples.md) in a tab.
- Peek at both files: check the headers, a couple of rows and the row counts (20 items, 100 sales).
- Warm-up: write down one business question your dashboard should answer, for example "which category sells most?".

## Try it 1 - Import the data and keep it tidy

**Why it matters:** clean data in means trustworthy numbers out. One header row, one record per row, no merged cells.

**Do this now:**
1. Import both CSVs into a new spreadsheet and confirm commas split into columns.
2. Check that dates read as dates, quantities as numbers and names as text. Fix any `2026-10-04` that imported as text.
3. Format `unit_price_ngn` and `total_ngn` as Naira - but check the underlying value is still `3500`, not the text `"₦3,500"`.
4. Freeze the header row and add a filter.

**You've got it when:** 20 inventory rows and 100 sales rows are present, money shows as Naira, and the values are still real numbers.

## Try it 2 - Write formulas that answer real questions

**Why it matters:** formulas turn a pile of rows into answers. Test a couple by hand first so you trust the rest.

**Do this now:**
1. Manually check one row: quantity 2 at ₦3,500 should be ₦7,000. Does `total_ngn` agree?
2. Try these in the sales sheet:

```text
=SUM(G2:G101)
=AVERAGE(G2:G101)
=IF(E2<=F2,"Reorder","OK")
=COUNTIF(D2:D101,"Meals")
=SUMIF(D2:D101,"Drinks",G2:G101)
```

3. Add two conditions with `=COUNTIFS(I2:I101,"Walk-in",D2:D101,"Meals")`. If it returns zero, check the text matches exactly and the ranges are the same length.
4. Look up an item's price two ways:

```text
=XLOOKUP(C2,Inventory!B$2:B$21,Inventory!G$2:G$21,"Not found")
=VLOOKUP(C2,Inventory!B$2:G$21,6,FALSE)
```

**You've got it when:** your formula totals match your manual checks, and a lookup returns the right price (not a hidden error).

> Quick win: don't reach for `IFERROR` yet - a blank can make a broken lookup look like it worked. Find out why it broke first.

## Try it 3 - Group and filter with QUERY

**Why it matters:** QUERY answers "sales by category" or "orders by channel" in one line - the closest thing to asking the sheet a question.

**Do this now:**
1. Run these against the sales table:

```text
=QUERY(Sales!A1:I101,"select D, sum(G) group by D",1)
=QUERY(Sales!A1:I101,"select C, sum(E) group by C order by sum(E) desc",1)
=QUERY(Sales!A1:I101,"select I, count(A) group by I",1)
```

2. Set the header count to `1` so a header row is not treated as data.
3. Try `FILTER`, `SORT`, `UNIQUE` and `ARRAYFORMULA` on a small range and watch the output expand - keep the cells below empty so it has room.

**You've got it when:** a QUERY total matches the same number from a direct `SUMIF`, and you know why the last `1` is there.

## Try it 4 - Add validation, highlights and protection

**Why it matters:** dropdowns stop messy entries, and a low-stock highlight turns a wall of numbers into an at-a-glance alert.

**Do this now:**
1. Add a dropdown to the inventory `category` or a status column (`In stock`, `Reorder`, `Out of stock`).
2. Add conditional formatting that flags a row when `stock_on_hand` is at or below `reorder_level`. Test one row just above and one just below the threshold.
3. Add a text status too, so the sheet still reads if someone cannot tell the colours apart.
4. Protect the header and formula ranges as an editing aid (not a security boundary).

**You've got it when:** a bad entry is blocked, and the low-stock rule fires correctly on both sides of the threshold.

## Try it 5 - Build the one-page dashboard

**Why it matters:** this is the deliverable a manager actually looks at. It must be correct and fit one screen.

**Do this now:**
1. On a new Dashboard sheet, add four KPI cells by formula: total sales, number of orders, average order, low-stock item count.
2. Add a bar chart for sales by category and a line or column chart for sales by date. Give each a title and units; skip 3D effects.
3. Point every KPI cell at the raw or summary sheets - never type a number that can go stale.
4. Write three findings and one honest limitation.

**You've got it when:** the whole dashboard fits one screen, every number traces back to the source, and nothing is hand-typed.

### Watch out for

- Sorting one column and breaking the row's relationships - select the whole table.
- Treating a currency display as proof the value is numeric.
- A formula range with an extra row or a missing last record.
- Forgetting the header count in QUERY, or using a text date in a date comparison.
- Treating a protected range as a way to hide confidential data.
- Building the dashboard before checking source totals.

## This week's build: the Fresh Bites Inventory and Sales Tracker

Ship one spreadsheet a small shop could run on:

1. An inventory sheet with 20 items, a dropdown and a low-stock highlight.
2. A sales sheet with all 100 fictional rows and checked totals.
3. A QUERY-based summary, a pivot table, two charts and a Dashboard tab.
4. Three plain-language findings and a short note on how you checked the numbers.

*Tip: present only what the sample shows - fictional practice data, not real business performance.*

### Grading guide

| Criteria | Weight |
|---|---|
| Correct formulas | 35% |
| Validation and formatting | 20% |
| Pivot table and charts | 25% |
| Dashboard clarity | 20% |

### Definition of done

- [ ] All 100 sales rows and 20 inventory rows are present.
- [ ] Sample totals agree with manual checks and direct formulas.
- [ ] The dropdown and low-stock rule behave at both sides of the threshold.
- [ ] The pivot, charts and dashboard use the same source data.
- [ ] Findings describe only what the sample shows.
- [ ] Sharing is restricted to the intended practice audience.

**Mid-course checkpoint (90 minutes):** organise a mock inbox with labels and filters; format a Doc with heading styles and a table of contents; build a small Sheet with five formulas, one validation rule and a chart. The facilitator checks your process and explanation, not private screenshots.

## Extra quick wins (optional)

- Add a `SPARKLINE` in a cell to show a category's trend inline.
- Recreate the two remaining QUERY examples (average sale by payment method, sales by date).
- Cross-link the process, not the accounts: [Automation](/courses/automation/) Week 2 shows a form feeding a sheet; [Data Analysis](/courses/data-analysis/) goes deeper on cleaning.

## Mentoring Session Plan (90 minutes)

| Time | Activity |
|---|---|
| 0–10 min | Review the Week 2 document and privacy checklist |
| 10–25 min | Import CSVs, confirm row counts and format numeric fields |
| 25–45 min | Demonstrate a formula, lookup and QUERY; learners explain their ranges |
| 45–60 min | Build validation, a low-stock rule and a pivot table |
| 60–75 min | Add charts and connect dashboard cells to checked summaries |
| 75–85 min | Run the mid-course checkpoint tasks in short timed sections |
| 85–90 min | Check assignment scope and preview Week 4 |

## Facilitator Notes

The datasets are fictional and should remain unchanged as starter files. Encourage learners to duplicate them in their own practice Drive. Do not publish completed work or expose student account details. The checkpoint may be completed with screenshots or a local copy if a learner's managed account restricts a feature. For any formula mismatch, have the learner trace a row before replacing the formula.

## Can you do these now?

1. Why should the raw table have one header row and no merged cells?
2. What is the purpose of the last `1` in the supplied QUERY formulas?
3. How can you check whether a displayed Naira amount is a number or text?
4. Why is a protected range not a privacy control?
5. What two independent checks can you run before presenting a dashboard total?
