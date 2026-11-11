---
title: "Power BI I - Power Query & Data Modelling"
course: "data-analysis"
order: 10
week: 10
phase: "Business Intelligence"
summary: "Load data into Power BI, clean it with Power Query, and build a proper data model."
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
**Goal:** Load data into Power BI, clean it with Power Query, and build a proper data model.

## Learning Objectives
- Navigate Power BI Desktop (Report, Table, Model views)
- Import and transform data with Power Query
- Understand fact and dimension tables (star schema)
- Create relationships and a Date table

## Tools
**Power BI Desktop** (Windows only; see [Setup Guide](/courses/data-analysis/00-setup-guide/)). Confirm access to a Windows PC before this week.

## Pre-Session Videos (about 3 hours)
- Search YouTube: **"Alex The Analyst Power BI tutorial for beginners"**
- Search YouTube: **"Guy in a Cube Power Query basics"**
- Search YouTube: **"Power BI star schema data modeling explained"**
- Official: **Microsoft Learn → "Get started with Power BI"** (learn.microsoft.com)

---

## Lesson 1: The Power BI Workflow
1. **Get Data** (connect to files, databases, web)
2. **Transform** (Power Query: clean and shape)
3. **Model** (relationships, measures)
4. **Visualise** (report pages)
5. **Share** (export/publish)

### Three views (left sidebar)
| View | Purpose |
|---|---|
| **Report** | Build visuals |
| **Table** | Inspect data |
| **Model** | Manage relationships |

## Lesson 2: Loading Data
**Home → Get Data → Text/CSV.** Load `orders_clean.csv`, `customers.csv`, `products.csv`. At the preview, click **Transform Data** (not Load) so you can clean first.

## Lesson 3: Power Query (Excel Week 2 + pandas Week 9, with clicks)
Power Query records every step in **Applied Steps** (right panel). You can click any step to see the data at that point, and delete or reorder steps.

### Common transformations
| Task | How |
|---|---|
| Promote headers | **Home → Use First Row as Headers** |
| Change data type | Click the type icon in the column header (ABC / 123 / calendar) |
| Trim/clean text | Right-click column → **Transform → Trim / Clean / Capitalize Each Word** |
| Replace values | **Transform → Replace Values** |
| Remove duplicates | Select columns → right-click → **Remove Duplicates** |
| Remove blanks/errors | Column filter dropdown → remove empty / **Remove Errors** |
| Split column | **Transform → Split Column → By Delimiter** |
| Add calculated column | **Add Column → Custom Column** → `[quantity] * [unit_price]` |
| Conditional column | **Add Column → Conditional Column** (if/then/else, like `CASE WHEN`) |
| Rename steps and columns | Double-click |
| Merge queries | **Home → Merge Queries** (like a join) |

**Practice with `orders_raw.csv`:** repeat your Week 2 cleaning in Power Query. Fix price text, standardise cities, handle blanks, and remove duplicates. Compare with the Excel and pandas methods: which took the fewest steps? Why is it useful that Power Query **can refresh** when new data arrives?

> **Dates:** set the type to **Date** and, if parsing is wrong, use **Change Type → Using Locale** and pick *English (United Kingdom)* for DD/MM/YYYY. Always check a few dates by eye.

Then **Close & Apply**.

---

## Lesson 4: Data Modelling (Star Schema)
Good reports use a **star schema**: one central **fact table** (events/measurements) surrounded by **dimension tables** (descriptions).

```
          customers (dim)
               │
products ──── orders (FACT) ──── calendar (dim)
  (dim)
```
| Type | Table | Contains |
|---|---|---|
| Fact | `orders` | One row per order; numbers (quantity, price) and keys |
| Dimension | `customers` | One row per customer; descriptive attributes |
| Dimension | `products` | One row per product |
| Dimension | `calendar` | One row per date |

### Relationships (Model view)
Drag `orders[customer_id]` onto `customers[customer_id]`, and `orders[product_id]` onto `products[product_id]`. Check:
- **Cardinality:** Many-to-one (`*` to `1`), from fact to dimension
- **Cross-filter direction:** Single (dimension filters fact)
- **Active:** yes

## Lesson 5: The Date Table
Time analysis needs a proper calendar table. In **Modeling (or Table tools) → New Table**, enter:
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
Then:
1. Select `Month` → **Column tools → Sort by column → Month Number** (so months show Jan, Feb, Mar rather than Apr, Aug, Dec).
2. Create a relationship `orders[order_date]` → `Calendar[Date]`.
3. Right-click the Calendar table → **Mark as date table** (if the option is available).

## Lesson 6: Calculated Columns (Preview)
In **Table view → New Column**:
```DAX
Net Revenue = orders[quantity] * orders[unit_price] * (1 - orders[discount_pct] / 100)
```
*(Week 11 explains why **measures** are usually better than calculated columns.)*

---

## Practice Exercises
1. Load the three CSVs, and clean `orders_raw.csv` in Power Query with at least 6 recorded steps.
2. Remove duplicates and confirm that the row count is 2,000.
3. Build the star schema and relationships; take a screenshot of the Model view.
4. Create the Calendar table, sort months properly, and relate it to orders.
5. Build a simple table visual showing `city`, `category`, and total `Net Revenue`.

---

## Weekly Assignment (Due Before Week 11)
Submit **`week10_model.pbix`** with:
1. Cleaned orders (from `orders_raw.csv` or `orders_clean.csv`), customers, products
2. A Calendar table with correct sort order
3. Correct relationships (screenshot of the Model view)
4. A **Power Query steps list** (screenshot of Applied Steps, or a short document that explains each step)
5. One report page with a table and a bar chart, checking totals against your Excel/SQL results

**Grading guide:** cleaning steps (30%), model correctness (35%), totals reconcile (20%), documentation (15%).

---

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0–10 min | Review Portfolio Project 1 GitHub links (quick feedback) |
| 10–25 | Install/open Power BI together (on a Windows PC) |
| 25–55 | Load the data and clean in Power Query step by step |
| 55–80 | Draw the star schema on paper, then build it in Model view |
| 80–90 | Assignment brief |

## Self-Check Questions
1. What is the difference between a fact table and a dimension table?
2. Why is a separate Calendar table needed?
3. What are Applied Steps, and why are they useful?
