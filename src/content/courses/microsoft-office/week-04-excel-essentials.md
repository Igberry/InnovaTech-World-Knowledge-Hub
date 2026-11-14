---
title: "Excel Essentials"
course: microsoft-office
order: 4
week: 4
summary: "Make numbers work for you: build a budget, an inventory list with a low-stock alert, and a sales tracker with a chart and PivotTable - all hands-on."
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
**Goal:** Build three working spreadsheets with your own formulas - a budget, an inventory list with a low-stock alert, and a sales tracker with a chart and PivotTable. You learn Excel by making it calculate, not by reading about cells.

## What you'll be able to do

- Keep data tidy: one header row, one record per row, no merged mess
- Format money, dates and percentages without breaking the underlying numbers
- Write the core functions and know when to lock a cell with `$`
- Turn a range into a Table, then sort and filter without scrambling records
- Add a low-stock highlight, a labelled chart and a first PivotTable
- Build a dropdown, freeze headers and set a clean print area

## Before you start (about 10 minutes)

- Open the three CSV files and spot which columns are text, dates, quantities and amounts.
- Warm-up: in a blank sheet type `=5+5` and press Enter. That `=` is every formula you will ever write. Now try `=SUM(1,2,3)`.
- Save a working copy as `.xlsx` and keep the untouched CSV.
- Optional 10-minute video: search YouTube for **"Kevin Stratvert Excel formulas tables sorting filtering beginners"**.

## Try it 1 - Keep data tidy and format it right

**Why it matters:** messy data breaks formulas, and a currency symbol typed into a cell stops it adding up.

**Do this now:**
1. Import the budget CSV and confirm the delimiter and dates read correctly.
2. Format a money column as Naira using the number-format controls - do not type `₦` into cells you want to calculate with.
3. Test a percentage: type `0.15`, format as percent, and confirm it shows `15%`, not `1500%`.
4. Store dates as real dates (`yyyy-mm-dd`) and sort to confirm they order correctly.

**You've got it when:** your money column sums correctly and your percentages are not 100x too big.

## Try it 2 - Write the core formulas

**Why it matters:** these ten functions cover most everyday spreadsheet work.

**Do this now - type each into a Table named `Sales` and watch it calculate:**

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
=TEXT(TODAY(),"yyyy-mm-dd")
```

`SUM`, `AVERAGE`, `MIN`, `MAX` and `COUNT` summarise. `IF` tests a condition. `SUMIF`/`SUMIFS` and `COUNTIF`/`COUNTIFS` add or count by criteria. `TODAY` returns today's date. `TEXT` turns a value into text, so do not feed its result into another calculation.

**You've got it when:** each formula returns a sensible number for the sample data.

## Try it 3 - Lock cells with absolute references

**Why it matters:** one visible input cell beats the same rate hard-coded into fifty formulas.

**Do this now:**
1. Put a tax or rate assumption in cell `K1`.
2. In another cell type `=E2*$K$1` and copy it down. The rate stays fixed.
3. Try the variations below and watch what moves.

| Reference | What stays fixed when copied | Example use |
|---|---|---|
| `A2` | Nothing | Row-by-row quantity |
| `$A$2` | Column and row | One fixed rate or setting |
| `$A2` | Column A only | Copy down a fixed lookup column |
| `A$2` | Row 2 only | Copy across a fixed header row |

**You've got it when:** you can copy a formula down a column and keep one input cell locked.

## Try it 4 - Tables, sorting and filtering

**Why it matters:** a real Table grows with new rows and keeps records together when you sort.

**Do this now:**
1. Click a cell in the data and press **Ctrl+T** to make a Table. Confirm it has headers and rename it `Sales` or `Inventory`.
2. Sort by a column using the Table's sort control, so whole rows move together.
3. Filter by City, Category or Payment_Method, then clear the filter before reading a total.

**You've got it when:** sorting never breaks the match between a name and its amount.

## Try it 5 - Low-stock highlight and a quick lookup

**Why it matters:** conditional formatting turns a wall of numbers into an at-a-glance alert, and a lookup pulls details from another table.

**Do this now:**
1. Add a status column and conditional formatting for items at or below reorder level:

```text
=IF([@Qty_On_Hand]<=[@Reorder_Level],"Reorder","OK")
```

2. Use one burgundy or red warning style plus the word **Reorder**, so the alert does not rely on colour alone.
3. Try a lookup. `XLOOKUP` is cleaner but is not in Excel 2016/2019; check your version:

```text
=XLOOKUP([@ItemID],Inventory[ItemID],Inventory[Unit_Cost_NGN],"Check item")
```

Older versions use `VLOOKUP` with an exact match (`FALSE`):

```text
=VLOOKUP(A2,Inventory[[ItemID]:[Unit_Cost_NGN]],6,FALSE)
```

**You've got it when:** a low item lights up with a **Reorder** label and your lookup returns the right cost. See [Microsoft Support's XLOOKUP documentation](https://support.microsoft.com/en-us/excel/functions/xlookup) for the version caveat (checked 12 November 2026).

## Try it 6 - A chart and a PivotTable

**Why it matters:** a chart answers a question at a glance; a PivotTable summarises without touching the source.

**Do this now:**
1. Summarise the sales sample by month or product first, then make a chart. Match the chart to the question.
2. Give it a descriptive title, axis labels and units (`NGN`). Skip 3-D effects.
3. Insert a PivotTable: put `City` in Rows and `Sales_NGN` in Values, and confirm the value is set to **Sum**, not Count. Refresh after adding a row.

| Question | Chart to consider | Check |
|---|---|---|
| How did a value change over time? | Line | Use a real date axis |
| Which few categories are larger? | Bar or column | Sort and label units |
| How does a whole split into parts? | Pie, only for a few parts | Categories must be mutually exclusive |

**You've got it when:** your chart has units and a title, and your PivotTable sums by city.

## Try it 7 - A dropdown, frozen headers and a clean print area

**Why it matters:** a dropdown stops spelling variations, and frozen headers keep you oriented while scrolling.

**Do this now:**
1. Put allowed categories on a `Lists` sheet, then use **Data then Data Validation then List** to make a dropdown. Test a value that is not on the list.
2. Freeze the top row with **View then Freeze Panes**.
3. Set a print area, repeat the header row on each page, and check print preview.

**You've got it when:** your category cell only accepts listed values and headers stay visible as you scroll.

### Watch out for

- Typing currency symbols into numeric cells, then wondering why sums fail
- Sorting one column instead of whole records
- Counting hidden rows without noticing an active filter
- Copying a relative formula when a fixed input needs `$`
- Using an approximate VLOOKUP match or the wrong column number
- Assuming XLOOKUP exists in every older Office version
- A chart with no units, title or question it answers

## This week's build: a three-sheet workbook

Submit one workbook with three clearly named sheets:

1. A **monthly budget** for Fresh Bites with formulas and clean Naira values.
2. A **20-item inventory** sheet with a low-stock highlight and a category dropdown.
3. A **sales tracker** on the 100 fictional records, with a chart and a simple PivotTable.

Keep the source dataset unchanged on its own sheet. Label the workbook and any screenshot as a fictional training exercise.

### Grading guide

| Criteria | Weight |
|---|---|
| Correct formulas | 35% |
| Formatting and clarity | 25% |
| Charts and PivotTable | 25% |
| Data validation | 15% |

### Definition of done

- [ ] Budget formulas calculate from editable input cells and totals reconcile.
- [ ] Inventory includes 20 records, a working category dropdown and visible low-stock status.
- [ ] Sales source stays intact; chart and PivotTable use the correct range and summary fields.
- [ ] Amounts, dates and percentages use appropriate formats.
- [ ] Workbook opens, filters are understood, and print preview is readable.

## Extra quick wins (optional)

- Add a `Difference_NGN` column to the budget and explain what a negative sign means.
- Total sales for Yenagoa with a conditional sum and count the Transfer payments.
- Refresh your PivotTable after adding a fictional row and watch the total change.

## Where to go next

This week covers everyday workbook tasks. The [Data Analysis course](/courses/data-analysis/) continues with data cleaning, deeper Excel, PivotTables, dashboards, SQL, Python and Power BI when you are ready for a longer pathway.

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0-10 min | Review Week 3 checkpoint and note the sample data is fictional |
| 10-25 min | Demo: tidy tables, number formats and relative references |
| 25-45 min | Build formulas and a low-stock validation rule together |
| 45-60 min | Sort, filter and create a PivotTable |
| 60-75 min | Create a chart and add a cautious one-sentence observation |
| 75-85 min | Peer-check formulas, units, range selection and print layout |
| 85-90 min | Review assignment and the Data Analysis course pathway |

## Facilitator Notes

Offer a no-login desktop or offline Calc equivalent if web access is unavailable. Before learners work with CSVs, confirm that date and numeric columns imported correctly. Use the same synthetic dataset for group demonstrations. Avoid presenting any sample amount as a local price or business forecast. When a function is unavailable, ask the learner to identify the version and demonstrate an equivalent rather than asking them to purchase an upgrade.

## Can you do these now?

1. How is a cell's stored value different from its number format?
2. Why should a sort move entire records together?
3. When do you use an absolute reference?
4. What can XLOOKUP do that VLOOKUP cannot, and which versions may lack it?
5. What does a PivotTable summarise, and when must it be refreshed?
