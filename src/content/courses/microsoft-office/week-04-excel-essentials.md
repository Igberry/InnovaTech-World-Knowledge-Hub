---
title: "Excel Essentials"
course: microsoft-office
order: 4
week: 4
summary: "Build a budget, inventory list and sales tracker using safe spreadsheet structure and core tools."
estimatedHours: 9
tools: ["Microsoft Excel", "LibreOffice Calc (optional)"]
downloads:
  - label: "Fictional monthly budget starter"
    href: "/downloads/microsoft-office/budget-starter.csv"
  - label: "Twenty-item fictional inventory"
    href: "/downloads/microsoft-office/inventory-items-20.csv"
  - label: "One hundred fictional sales records"
    href: "/downloads/microsoft-office/sales-sample-100.csv"
draft: false
---
**Goal:** Build clear, reliable workbook sheets with formulas, filters, a chart, a simple PivotTable and a low-stock check.

## Learning Objectives

By the end of this week, you can:

- Explain workbook, worksheet, cell, range, row and column using a tidy data table.
- Enter values and apply number formats for Naira, dates and percentages without changing the underlying values.
- Use the required core functions and explain relative versus absolute references.
- Convert ranges to Tables, sort and filter without separating records.
- Apply conditional formatting, build a labelled chart and create an introductory PivotTable.
- Add a validation list, freeze panes, protect a sheet and prepare a readable print area.

## Tools / Accounts Needed This Week

Use Excel desktop or web where the feature is available. LibreOffice Calc can practise most spreadsheet concepts, though commands and some compatibility details differ. Download the three fictional starter files. No live business data, customer information or personal finances should be entered.

## Pre-Session Resources (about 2 hours)

- Search YouTube: **"Kevin Stratvert Excel formulas tables sorting filtering beginners"**.
- Search YouTube: **"Leila Gharani Excel PivotTable chart conditional formatting"**.
- Review [Microsoft Support's XLOOKUP documentation](https://support.microsoft.com/en-us/excel/functions/xlookup) and note its version caveat. The Office 2016/2019 limitation was checked on 12 November 2026.
- Open the three CSV files, inspect their headers and identify which columns are text, dates, quantities and amounts.

## Lessons

### Lesson 1: Workbooks, worksheets, cells and ranges

An Excel **workbook** is the whole file, usually `.xlsx`; it contains one or more **worksheets**. A worksheet is a grid. Columns are labelled with letters, rows with numbers, and a **cell** is one intersection such as `B4`. A **range** is a set of cells such as `A1:D20`. A table is a structured list with one header row and one record per row.

Keep raw records rectangular: one header row, no blank rows inside the data, no merged cells, and one kind of information per column. Each row should represent one sale or one inventory item, not several different events. Do not mix a total row into the middle of the records. If a sheet needs a title, place it above the table and keep it outside the range.

Import a CSV through the app's Open or Data import workflow and confirm the delimiter and date interpretation. A CSV stores plain text values separated by commas; it does not preserve formulas, formatting, charts or multiple sheets. Save a working version as `.xlsx` before adding workbook features. Keep an untouched CSV copy.

### Lesson 2: Number formats for money, dates and percentages

The value stored in a cell and the way it is displayed are different. The number `6500` can be displayed as `₦6,500`, but applying a currency format does not change the stored value. Keep currency as a numeric value and use the number-format controls to show the symbol and separators. Do not type `₦` or `NGN` into every cell if you need to calculate with the amount.

Dates should be stored as dates, not mixed text such as `12 Nov`, `11/12/26` and `2026-11-12`. Pick a clear format, such as `yyyy-mm-dd`, and verify that sorting places dates in the expected order. Percentages are fractions: `0.15` formatted as a percentage displays `15%`. If you type `15` and format it as a percentage, the result may display `1500%`. Always test one value.

For the practice budget, format money columns consistently and dates as dates. A title like "Practice budget - fictional values" helps prevent a screenshot from being mistaken for a real financial report.

### Lesson 3: Formulas, functions and references

A formula begins with `=` and can use cell references, operators and functions. Examples below assume a Table named `Sales` with the supplied column names. If a workbook uses another language or regional setting, function names and list separators can differ; adapt to your app rather than copying punctuation blindly.

```text
=SUM(Sales[Sales_NGN])
=AVERAGE(Sales[Sales_NGN])
=MIN(Sales[Sales_NGN])
=MAX(Sales[Sales_NGN])
=COUNT(Sales[Quantity])
=IF([@Qty_On_Hand]<=[@Reorder_Level],"Check stock","OK")
=SUMIF(Sales[City],"Yenagoa",Sales[Sales_NGN])
=SUMIFS(Sales[Sales_NGN],Sales[City],A2,Sales[Product],B2)
=COUNTIF(Sales[Payment_Method],"Transfer")
=COUNTIFS(Sales[City],"Lagos",Sales[Category],"Meal")
=TEXT(TODAY(),"yyyy-mm-dd")
```

`SUM` adds values; `AVERAGE` calculates their mean; `MIN` and `MAX` show extremes; `COUNT` counts numeric cells. `IF` tests a condition and returns one result for true and another for false. `SUMIF` and `SUMIFS` add values matching one or more criteria. `COUNTIF` and `COUNTIFS` count matching entries. `TODAY` returns the current date and changes as time passes. `TEXT` formats a value as text; after using it, the result is text, so do not feed it into a calculation that needs a number.

A relative reference such as `A2` changes when a formula is copied. An absolute reference such as `$A$2` stays fixed. Mixed references such as `$A2` or `A$2` lock only a column or row. If a tax rate or exchange assumption is stored in `K1`, a formula like `=E2*$K$1` keeps the rate cell fixed as the formula is copied down. Do not hard-code the same assumption into many formulas; one visible input cell is easier to review.

| Reference | What stays fixed when copied | Example use |
|---|---|---|
| `A2` | Nothing | Row-by-row quantity |
| `$A$2` | Column and row | One fixed rate or setting |
| `$A2` | Column A only | Copy down a fixed lookup column |
| `A$2` | Row 2 only | Copy across a fixed header row |

`XLOOKUP` can search a lookup column and return a related value without requiring the return column to be on the right. Microsoft support states it is not available in Excel 2016 or Excel 2019; check the version in use. For example:

```text
=XLOOKUP([@ItemID],Inventory[ItemID],Inventory[Unit_Cost_NGN],"Check item")
```

`VLOOKUP` is available in older versions but looks in the first column of its selected range and returns a column to the right. Use exact match with `FALSE`:

```text
=VLOOKUP(A2,Inventory[[ItemID]:[Unit_Cost_NGN]],6,FALSE)
```

The lookup range begins with `ItemID`; `Unit_Cost_NGN` is the sixth column in that range. Check the range and column number before copying a formula. A lookup can return the wrong row if identifiers are duplicated or stored as text in one table and numbers in another.

> **Tip:** Confirm the learner's Excel version before teaching a lookup. If XLOOKUP is unavailable, use VLOOKUP with an exact match and explain its left-to-right limitation.

### Lesson 4: Tables, sorting and filtering

Select one cell in the data range and choose **Insert → Table** or press **Ctrl+T** in supported desktop versions. Confirm that the table has headers. A Table can expand when new rows are added and lets formulas use readable column names. Rename it to a clear name such as `Sales` or `Inventory`.

Sort one column using the table's sort controls. If you select only one column and sort it independently from its related records, names and amounts will no longer match. Use the table sort command so entire rows move together. Filters hide records that do not match a condition; they do not delete them. Clear filters before reporting a total that should include all rows.

For the inventory list, filter `Category` or sort by `Qty_On_Hand`. For the sales tracker, filter by City, Category or Payment_Method. Record what filters were active when taking a screenshot.

### Lesson 5: Conditional formatting and low-stock rules

Conditional formatting changes how a cell appears when a rule is true. Select the `Qty_On_Hand` cells and create a formula-based rule that compares each row's quantity with its reorder threshold, or add a helper status column:

```text
=IF([@Qty_On_Hand]<=[@Reorder_Level],"Reorder","OK")
```

Use one burgundy or red warning style with a text status such as **Reorder** so the message does not rely on colour alone. Avoid colouring every cell; highlight exceptions that need attention. Test the rule against one row above and one at the threshold to confirm the logic.

### Lesson 6: Charts and a short message

Choose a chart based on the question. A **column chart** compares a small set of categories; a **line chart** shows change over time; a **pie chart** shows parts of a whole when categories are few and mutually exclusive. If there are many categories or values are close, a sorted bar chart is easier to compare.

| Question | Chart to consider | Check |
|---|---|---|
| How did a value change over time? | Line | Use a real date axis |
| Which few categories are larger? | Bar or column | Sort and label units |
| How does a whole split into parts? | Pie, only for a few parts | Categories must be mutually exclusive |

Use a descriptive title, label axes and include units such as `NGN`. Avoid 3-D effects, crowded legends and unexplained colours. Before charting the sales sample, summarise data by month or product so that the chart communicates a pattern rather than plotting 100 individual rows. Add a one-sentence note that states what the chart shows without claiming why it happened.

### Lesson 7: Introductory PivotTables

A PivotTable groups and summarises a Table without changing its source records. Select a cell in `Sales`, choose **Insert → PivotTable**, and place `City` in Rows and `Sales_NGN` in Values to summarise sales by city. Confirm that the value field is set to **Sum**, not Count. Try Category in Columns or Payment_Method in Filters. The exact menu labels differ by version and web/desktop app.

Refresh a PivotTable after changing source rows. Check the source range if a new record is missing. Format the summarized amount as Naira and give the PivotTable a clear heading. A simple PivotTable is a starting point for analysis, not proof that the data is correct.

### Lesson 8: Data validation and dropdowns

Data validation can limit what a user enters. Put the allowed inventory categories in a small range on a `Lists` worksheet, then select the Category cells and use **Data → Data Validation → List** to point to that range. A dropdown can prevent spelling variations, but it does not verify whether an item is safe, available or correctly priced.

Add a short input message and an error alert where supported. Test a valid category and an invalid one. Do not put an allowed list into a formula as a long comma-separated string if it will be difficult to maintain. Check regional list separators and web-app limitations.

### Lesson 9: Protection, freeze panes and printing

Freeze the top row so column headings stay visible while scrolling. **View → Freeze Panes** options vary by version; choose the cell below and to the right of the rows and columns you want to keep. Set a print area for the report, repeat header rows on each printed page, and use landscape only when it improves readability.

Protecting a worksheet can prevent accidental edits to selected cells, but it is not strong confidentiality or encryption. Keep the original file and store a password only if the protection feature requires one and you can manage it safely. Do not use sheet protection as a substitute for access permissions.

### Lesson 10: Where to continue

This week covers everyday workbook tasks, not advanced analysis. The [Data Analysis course](/courses/data-analysis/) continues with data cleaning, deeper Excel analysis, PivotTables and dashboards, statistics, SQL, Python and Power BI. Continue only when you are ready for a longer analytics pathway; the current course's goal is to make common office work clearer and more reliable.

## Common Mistakes

- Typing currency symbols into numeric cells and then wondering why sums fail.
- Sorting one column instead of whole records.
- Counting hidden rows without noticing an active filter.
- Copying a relative formula when a fixed input cell needs `$` references.
- Using an approximate VLOOKUP match or the wrong return-column number.
- Assuming XLOOKUP exists in every older Office version.
- Making a chart without units, a clear title or a question it answers.
- Treating sheet protection as a security boundary or PivotTable as self-updating.

## Practice Exercises

1. Import the budget CSV and format planned amounts as Naira. Add a `Difference_NGN` column and explain its sign.
2. Convert the 20-item inventory into a Table named `Inventory`; freeze the header row and filter to one category.
3. Add a `Stock_Status` formula and conditional formatting for items at or below reorder level.
4. Create a dropdown for Category from a list on a separate worksheet and test a value not on the list.
5. In the sales Table, calculate total, average, minimum and maximum sales amounts and a count of rows.
6. Use a conditional sum to total sales for Yenagoa and a conditional count of Transfer records.
7. Build a monthly summary, create a labelled line or column chart and add one careful observation.
8. Create a PivotTable of Sales_NGN by City and Category, format the values, and refresh after adding a fictional row.

## Weekly Assignment (Due Before Week 5)

Submit one workbook with three components:

1. A **monthly budget** for Fresh Bites with formulas and clearly formatted Naira values.
2. A **20-item inventory sheet** with a low-stock highlight and a category dropdown.
3. A **sales tracker** based on the 100 fictional records, including a chart and a simple PivotTable.

Use separate, clearly named sheets. Keep the source dataset unchanged on its own sheet. Label the workbook and any screenshot as a fictional training exercise; the included amounts are not market quotes or a real business budget.

**Grading guide:** correct formulas 35%, formatting and clarity 25%, charts and PivotTable 25%, data validation 15%.

**Definition of done**

- [ ] Budget formulas calculate from editable input cells and totals reconcile.
- [ ] Inventory includes 20 records, a working category dropdown and visible low-stock status.
- [ ] Sales source remains intact; chart and PivotTable use the correct range and summary fields.
- [ ] Amounts, dates and percentages use appropriate formats.
- [ ] Workbook opens, filters are understood, and print preview is readable.

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0–10 min | Review Week 3 checkpoint and explain the sample data is fictional |
| 10–25 min | Demonstrate tidy tables, number formats and relative references |
| 25–45 min | Build formulas and a low-stock validation rule together |
| 45–60 min | Sort, filter and create a PivotTable |
| 60–75 min | Create a chart and add a cautious one-sentence observation |
| 75–85 min | Peer-check formulas, units, range selection and print layout |
| 85–90 min | Review assignment and the Data Analysis course pathway |

## Facilitator Notes

Offer a no-login desktop or offline Calc equivalent if web access is unavailable. Before learners work with CSVs, confirm that date and numeric columns imported correctly. Use the same synthetic dataset for group demonstrations. Avoid presenting any sample amount as a local price or business forecast. When a function is unavailable, ask the learner to identify the version and demonstrate an equivalent rather than asking them to purchase an upgrade.

## Self-Check Questions

1. How is a cell's stored value different from its number format?
2. Why should a sort move entire records together?
3. When do you use an absolute reference?
4. What can XLOOKUP do that VLOOKUP cannot, and which versions may lack it?
5. What does a PivotTable summarise, and when must it be refreshed?
