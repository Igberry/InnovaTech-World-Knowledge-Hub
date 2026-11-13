---
title: "Google Sheets: Inventory, Sales and a Dashboard"
course: google-workspace
order: 3
week: 3
summary: "Build a tidy tracker, use formulas and QUERY, and present a checked summary in a small dashboard."
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
**Goal:** Create a reliable inventory and sales tracker and present checked results in a simple dashboard.

## Learning Objectives

By the end of this week, you can:

- Import a CSV, preserve a clean header row and format Naira values as numbers.
- Use common formulas, lookups and Google Sheets-specific functions.
- Build dropdown validation, conditional formatting and protected ranges with appropriate limits.
- Create a pivot table, two charts and a one-page dashboard.
- Check formula outputs against source data and explain one limitation in the summary.

## Tools / Accounts Needed This Week

Google Sheets in a desktop browser and the two fictional CSV files. The assignment requires no paid plan. Some accounts may display different menus or locale-specific formula separators.

## Pre-Session Resources (about 2 hours)

- Review Google's official [Sheets function list](https://support.google.com/docs/table/25273) and [QUERY function guide](https://support.google.com/docs/answer/3093343) (about 35 minutes).
- Search YouTube: **"Google Sheets data validation dropdown pivot table beginner"** and **"Google Sheets dashboard chart tutorial"**. Choose current tutorials and watch about 45 minutes total.
- Open the inventory and sales CSV files in a text editor or spreadsheet. Check the headers, a few rows and the total row count (about 25 minutes).
- Spend 15 minutes identifying which numbers should be inputs and which should be calculated, then write one business question the dashboard should answer.

## Lessons

### Lesson 1: Import data and keep it tidy

A spreadsheet is easiest to analyse when each column holds one kind of information and each row represents one record. The sales file has one order per row; the inventory file has one stock item per row. Keep one header row, avoid blank rows inside the data and do not merge cells in the raw table. Put titles and notes on a separate dashboard sheet.

Import the CSV into a new spreadsheet and check that commas have separated columns. Dates should be recognised as dates, quantities as numbers and item names as text. If `2026-10-04` appears as text, correct the import or convert it before using date queries. Do not format a text value as currency and assume it became a number.

Use Naira formatting for money columns, but keep the underlying value numeric. A custom number format changes how a value displays; it should not change `3500` into the text `"₦3,500"`. If the locale uses different decimal, date or formula separators, note the locale before copying formulas. Google Sheets lets spreadsheet settings determine some formatting behavior. Confirm the result with a small test before filling a whole column.

Freeze the header row so it remains visible while scrolling. Use a filter to inspect specific categories or dates. A filter view can let a user work with a personal view without changing what collaborators see, depending on the current interface. Sorting a single column without including the rest of the table can disconnect values from their records; select the full dataset and sort by the chosen field.

### Lesson 2: Formulas that answer practical questions

In the sales sheet, `total_ngn` is quantity multiplied by unit price. Test a few rows manually before trusting the supplied totals. For example, a quantity of 2 at ₦3,500 each should produce ₦7,000. Use simple formulas first:

```text
=SUM(G2:G101)
=AVERAGE(G2:G101)
=IF(E2<=F2,"Reorder","OK")
=COUNTIF(D2:D101,"Meals")
=SUMIF(D2:D101,"Drinks",G2:G101)
```

`COUNTIFS` and `SUMIFS` apply multiple conditions. For example, count sales in one channel and category with `=COUNTIFS(I2:I101,"Walk-in",D2:D101,"Meals")`. Confirm that every condition range has the same number of rows. A result of zero may mean the text does not match exactly, the range is wrong, or the field has unexpected spaces.

`VLOOKUP` can find an item in the first column of a range and return a value to its right. `XLOOKUP` can search a single row or column and return a value from a matching position; the official Sheets function reference documents exact matching by default. For example, if the inventory table has item names in `B2:B21` and unit price in `G2:G21`, these formulas look up the item in `C2`:

```text
=XLOOKUP(C2,Inventory!B$2:B$21,Inventory!G$2:G$21,"Not found")
=VLOOKUP(C2,Inventory!B$2:G$21,6,FALSE)
```

`FALSE` requests an exact match in the VLOOKUP example. If a function is not available in a particular account, verify the current function list and use the alternative.

Avoid hiding errors with `IFERROR` until you understand the cause. A blank result can make a broken lookup look successful. First test whether the item exists and whether the search and result ranges have equal lengths.

### Lesson 3: Google-specific functions and QUERY

Google Sheets includes functions that can fill or transform a range. `ARRAYFORMULA` can apply an expression to multiple rows; `FILTER` returns rows that meet conditions; `SORT` orders a range; `UNIQUE` returns distinct values; and `SPARKLINE` draws a small chart inside a cell. Start with one function and a small range, then check whether the output expands as expected. Keep output ranges clear because a formula that returns multiple values can be blocked by content in a neighbouring cell.

Named ranges can give a meaningful name to a frequently used range, which can make a formula easier to read. Use a small, consistent set and keep the range boundaries current when you add rows. For an inventory count, a checkbox in a separate `counted` column can record whether a physical count was completed; it should not replace the numeric stock quantity or the date of the count.

`QUERY` runs a query-language expression across a range. The pattern is `=QUERY(data, query, headers)`. It can select columns, filter rows, group values and aggregate numbers. It resembles SQL but is not full SQL. In this course, the five worked examples use the sales table:

```text
=QUERY(Sales!A1:I101,"select D, sum(G) group by D",1)
=QUERY(Sales!A1:I101,"select C, sum(E) group by C order by sum(E) desc",1)
=QUERY(Sales!A1:I101,"select I, count(A) group by I",1)
```

The starter file contains two more examples for average sale by payment method and sales by date. The last example requires column B to contain actual date values. A text date may look correct but fail a date comparison. Set the header count to `1` for the supplied data. If Sheets guesses the header count, results can unexpectedly include a header or treat a header as data.

`IMPORTRANGE` reads a range from another spreadsheet after the user grants access. Treat that prompt as a data-sharing decision: confirm the source file, owner and scope before allowing access. Do not use a real client's workbook for practice. `IMPORTRANGE` is optional; the assignment can be completed in one spreadsheet. Use the official function list if a function's syntax or availability changes.

### Lesson 4: Validation, conditional formatting and protection

Data validation helps prevent inconsistent entries. In the inventory sheet, create a dropdown for `category` or `unit` and choose what happens when an invalid value is entered. In a status column, a dropdown could contain `In stock`, `Reorder` and `Out of stock`. Keep the list short and standardised.

Conditional formatting highlights a condition; for example, apply a visible style when `stock_on_hand` is less than or equal to `reorder_level`. Test one row above and one below the threshold so you know the rule is correct. Do not use colour as the only signal. Add a status label or text so the sheet still makes sense when printed or viewed by someone who cannot distinguish the colours.

Protected ranges help reduce accidental edits to formulas or headers. They are not a security boundary and do not hide data from someone who can view the sheet. Use sharing permissions to control who can open the file, and protect ranges only as an editing aid. Keep a copy of the original CSV before changing the workbook.

### Lesson 5: Pivot tables, charts and a one-page dashboard

A pivot table groups data without rewriting the source. Start with the full table and create a pivot on a separate sheet. For sales, put `category` in Rows and `total_ngn` in Values as a sum. Add `channel` to Columns or Filters to explore another angle. If the pivot shows a count instead of a sum, check whether the value column contains numbers or text.

Charts should answer a question. A bar chart can compare sales by category; a line chart can show daily sales across the month. Give each chart a descriptive title and show units. Avoid a 3D effect or a crowded legend. Check that the chart range includes the right headers and excludes totals that would be double-counted.

Build a Dashboard sheet with:

- Four KPI cells: total sales, number of orders, average order and low-stock item count.
- A bar chart for sales by category.
- A line or column chart for sales by date.
- A short summary of three findings and one limitation.

Use formula cells that refer to the raw or summary sheets rather than typing a number that could become stale. Keep the dashboard to one screen or printed page. Use a clear label and readable contrast; colour should support, not replace, text labels.

### Lesson 6: Collaboration and notifications

Share only with the people who need the workbook. Review the sheet's owner, link scope and role before sending it. A protected formula range does not prevent an Editor from copying or viewing the data. Use a separate fictional workbook to test a notification rule, then turn off notifications that are no longer useful. Notification options and frequency can vary by account and current settings.

Cross-link the process, not the accounts: [Automation](/courses/automation/) Week 2 shows how a form can feed a sheet and introduce Apps Script; [Data Analysis](/courses/data-analysis/) covers deeper cleaning and analysis. You do not need to configure an automation for this assignment.

## Common mistakes

- Sorting only one column and breaking the relationship between fields in a row.
- Treating a currency display format as proof that the underlying value is numeric.
- Using a formula range with an extra row or missing the last record.
- Counting text values with `COUNT` instead of `COUNTA` or `COUNTIF`.
- Forgetting the header count in `QUERY` or using a text date in a date comparison.
- Treating protected ranges as a way to hide confidential data.
- Building a dashboard before checking source totals and formula errors.

## Practice Exercises

1. Import both CSVs and confirm 20 inventory rows and 100 sales records.
2. Format `unit_price_ngn` and `total_ngn` as Naira values; verify that values remain numeric.
3. Add a low-stock status formula and manually check three items.
4. Use `COUNTIF` and `SUMIF` to answer one question about category or channel.
5. Recreate two `QUERY` examples and compare their totals with a direct formula.
6. Add a dropdown and conditional-formatting rule to the inventory sheet.
7. Create a pivot table and two labelled charts, then place them on a dashboard.

## Weekly Assignment and Mid-Course Checkpoint (Due Before Week 4)

**Assignment: Fresh Bites Inventory and Sales Tracker**

Submit one spreadsheet containing:

1. An inventory sheet with 20 items, a dropdown and a low-stock highlight.
2. A sales sheet with all 100 supplied fictional rows and checked totals.
3. A `QUERY`-based summary, a pivot table, two charts and a Dashboard tab.
4. Three plain-language observations and a short note describing how you checked the numbers.

**Grading guide:** correct formulas (35%); validation and formatting (20%); pivot table and charts (25%); dashboard clarity (20%).

**Definition of done:**

- [ ] All 100 sales rows and 20 inventory rows are present.
- [ ] Sample totals agree with manual checks and direct formulas.
- [ ] The dropdown and low-stock rule behave at both sides of the threshold.
- [ ] The pivot, charts and dashboard use the same source data.
- [ ] Findings describe what the sample shows and do not imply real business performance.
- [ ] Sharing is restricted to the intended practice audience.

**Mid-course checkpoint (90 minutes):** organise a mock inbox with labels and filters; format a Doc with heading styles and a table of contents; build a small Sheet with five formulas, one validation rule and a chart. The facilitator checks the process and explanation rather than comparing private account screenshots.

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

## Self-Check Questions

1. Why should the raw table have one header row and no merged cells?
2. What is the purpose of the last `1` in the supplied QUERY formulas?
3. How can you check whether a displayed Naira amount is a number or text?
4. Why is a protected range not a privacy control?
5. What two independent checks can you use before presenting a dashboard total?
