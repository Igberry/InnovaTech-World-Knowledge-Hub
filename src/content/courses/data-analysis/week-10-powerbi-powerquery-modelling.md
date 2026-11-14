---
title: "Power BI I - Power Query & Data Modelling"
course: "data-analysis"
order: 10
week: 10
phase: "Business Intelligence"
summary: "Load data into Power BI, clean it with clicks in Power Query, and build a proper data model - the foundation of every professional dashboard."
estimatedHours: 10
tools: ["Power BI", "Power Query"]
downloads:
  - label: "Orders (clean) CSV"
    href: "/downloads/data-analysis/orders_clean.csv"
  - label: "Customers CSV"
    href: "/downloads/data-analysis/customers.csv"
  - label: "Products CSV"
    href: "/downloads/data-analysis/products.csv"
  - label: "Orders (raw, messy) CSV"
    href: "/downloads/data-analysis/orders_raw.csv"
---
**Goal:** Load the NaijaMart data into Power BI, clean it with Power Query (no formulas, just clicks that repeat on refresh), and wire up a proper star-schema model ready for next week's dashboard.

## What you'll be able to do
- Navigate Power BI Desktop (Report, Table, Model views)
- Import and transform data with Power Query
- Build a star schema from fact and dimension tables
- Create relationships and a Date table

## Before you start (about 10 minutes)
- Open **Power BI Desktop** (Windows only; see the [Setup Guide](/courses/data-analysis/00-setup-guide/)). On a Mac, use a Windows PC for this week and next.
- Warm-up: click through the three views on the left (Report, Table, Model) so you know where each lives.
- Optional: watch five minutes of *"Alex The Analyst Power BI tutorial for beginners"*.

## Try it 1 - Load and start cleaning

**Why it matters:** Power BI cleans at import, and the steps re-run automatically when new data arrives.

**Do this now:**
1. **Home -> Get Data -> Text/CSV**. Pick `orders_raw.csv`.
2. At the preview, click **Transform Data** (not Load) to open Power Query.
3. Notice the **Applied Steps** panel on the right - every click is recorded here.

**You've got it when:** you are in Power Query with `orders_raw` open and the Applied Steps panel visible.

## Try it 2 - Repeat your Week 2 cleaning with clicks

**Why it matters:** the same fixes you typed in Excel are now menu clicks that refresh themselves.

**Do this now:**
1. Fix text: right-click the `city` column -> **Transform -> Trim**, then **Capitalize Each Word**.
2. Replace values: **Transform -> Replace Values** to turn `-` into a space in city names.
3. Price text: **Replace Values** to remove `₦` and commas, then set the column type to Decimal.
4. **Remove Duplicates** (select columns, right-click) and remove blank/error rows via the filter dropdown.
5. Dates: set the type to **Date**; if parsing is wrong, use **Change Type -> Using Locale -> English (United Kingdom)** for DD/MM/YYYY, then eyeball a few.
6. **Close & Apply**.

**You've got it when:** your data loads clean with at least 6 recorded Applied Steps, and the row count is 2,000.

## Try it 3 - Build the star schema

**Why it matters:** a clean model (one fact table, several dimensions) is what makes every later chart and measure behave.

**Do this now:**
1. Load `customers.csv` and `products.csv` too.
2. Go to **Model view**. Drag `orders[customer_id]` onto `customers[customer_id]`, and `orders[product_id]` onto `products[product_id]`.
3. Check each relationship: Many-to-one (`*` to `1`) from fact to dimension, single cross-filter direction, active.

**You've got it when:** `orders` sits in the middle, linked out to `customers` and `products`, like a star.

## Try it 4 - Add a Date table

**Why it matters:** proper time analysis (months in the right order, year-to-date) needs a real calendar table.

**Do this now:**
1. **Modeling (or Table tools) -> New Table**:
```DAX
Calendar =
ADDCOLUMNS(
    CALENDAR(DATE(2025,1,1), DATE(2025,12,31)),
    "Year", YEAR([Date]),
    "Month Number", MONTH([Date]),
    "Month", FORMAT([Date], "MMM"),
    "Weekday", FORMAT([Date], "ddd")
)
```
2. Select `Month` -> **Column tools -> Sort by column -> Month Number** so months show Jan, Feb, Mar.
3. Create a relationship `orders[order_date]` -> `Calendar[Date]`, then right-click the Calendar table -> **Mark as date table**.

**You've got it when:** a chart by month shows Jan to Dec in order, not alphabetically.

## This week's build: a clean, modelled Power BI file

Submit `week10_model.pbix` with:
1. Cleaned orders, plus customers and products.
2. A Calendar table with the correct month sort order.
3. Correct relationships (include a screenshot of the Model view).
4. A Power Query steps list (screenshot of Applied Steps, or a short note explaining each step).
5. One report page with a table and a bar chart, with totals that match your Excel, SQL, and pandas results.

*Reconciling totals across four tools is a genuine analyst skill - call it out in your notes.*

### Grading guide

| Criteria | Weight |
|---|---|
| Model correctness (star schema, relationships) | 35% |
| Cleaning steps in Power Query | 30% |
| Totals reconcile with earlier weeks | 20% |
| Documentation | 15% |

### Definition of done

- [ ] `orders_raw.csv` cleaned in Power Query with 6+ Applied Steps, row count 2,000
- [ ] Star schema built with correct relationships (screenshot)
- [ ] Calendar table created and sorted correctly
- [ ] One report page (table + bar chart) with reconciled totals

## Extra quick wins (optional)
- Add a calculated column `Net Revenue = orders[quantity] * orders[unit_price] * (1 - orders[discount_pct] / 100)` in Table view (Week 11 shows why measures are usually better).
- Compare: which tool cleaned the data in the fewest steps, and why does refresh matter?

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0-10 min | Review Portfolio Project 1 GitHub links (quick feedback) |
| 10-25 min | Open Power BI together on a Windows PC |
| 25-55 min | Load the data and clean in Power Query step by step |
| 55-80 min | Draw the star schema on paper, then build it in Model view |
| 80-90 min | Build brief |

## Facilitator Notes

Confirm every student has Windows access before this week; a Mac student with no plan will lose two weeks. The big idea is that Power Query steps are recorded and re-runnable, unlike one-off Excel edits - demonstrate a refresh so they feel it. The star schema is abstract; draw it on paper (fact in the middle, dimensions around it) before building it on screen. Date parsing by locale trips people up, so walk through Change Type Using Locale once. Keep tying back: Power Query cleaning is Week 2 and Week 9 with clicks, and the model is just the joins they already know, made permanent.

## Self-Check Questions
1. What is the difference between a fact table and a dimension table?
2. Why is a separate Calendar table needed?
3. What are Applied Steps, and why are they useful?
