---
title: "Python II — pandas for Data Analysis"
course: "data-analysis"
order: 8
week: 8
phase: "Programming"
summary: "Load, explore, filter, summarise, and combine data with pandas — repeating everything you've done in Excel and SQL, but faster and repeatable."
estimatedHours: 10
tools: ["Python", "pandas"]
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
**Goal:** Load, explore, filter, summarise, and combine data with pandas — repeating everything you've done in Excel and SQL, but faster and repeatable.

## Learning Objectives
- Load CSVs into a DataFrame and inspect them
- Select, filter, sort, and create columns
- Summarise with `groupby` and `pivot_table`
- Merge tables (join) and work with dates

## Pre-Session Videos (about 3 hours)
- Search YouTube: **"Keith Galli Complete Pandas Tutorial"**
- Search YouTube: **"Corey Schafer Pandas tutorial series"**
- Search YouTube: **"Alex The Analyst Pandas tutorial"**
- Interactive: **Kaggle Learn → Pandas** (kaggle.com/learn)
- Reference: **pandas.pydata.org/docs** ("10 minutes to pandas")

---

## Lesson 1: Load and Inspect
```python
import pandas as pd

orders = pd.read_csv("orders_clean.csv")
customers = pd.read_csv("customers.csv")
products = pd.read_csv("products.csv")

orders.head()          # first 5 rows
orders.tail(3)
orders.shape           # (rows, columns)
orders.columns
orders.dtypes          # data types
orders.info()          # types + missing counts
orders.describe()      # summary statistics (like Week 4!)
orders["city"].value_counts()
orders.isna().sum()    # missing values per column
```
**Mapping from earlier weeks**
| Excel / SQL | pandas |
|---|---|
| Table | DataFrame |
| Column | Series |
| `COUNT` | `.count()` / `len()` |
| `DISTINCT` | `.unique()` / `.nunique()` |

## Lesson 2: Selecting and Filtering
```python
orders["city"]                          # one column
orders[["order_id", "city", "status"]]  # several columns

orders[orders["city"] == "Yenagoa"]                                     # WHERE
orders[(orders["status"] == "Completed") & (orders["quantity"] >= 3)]   # AND
orders[(orders["city"] == "Lagos") | (orders["city"] == "Abuja")]       # OR
orders[orders["city"].isin(["Lagos", "Abuja", "Warri"])]                # IN
orders[orders["payment_method"].isna()]                                 # IS NULL
```
> Use `&` and `|` (not `and`/`or`) and **wrap each condition in parentheses**.

## Lesson 3: New Columns and Sorting
```python
orders["revenue"] = orders["quantity"] * orders["unit_price"]
orders["net_revenue"] = orders["revenue"] * (1 - orders["discount_pct"] / 100)

orders.sort_values("net_revenue", ascending=False).head(10)

import numpy as np
orders["size"] = np.where(orders["net_revenue"] >= 100000, "Large",
                 np.where(orders["net_revenue"] >= 30000, "Medium", "Small"))
```

## Lesson 4: Dates
```python
orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["month"] = orders["order_date"].dt.to_period("M")
orders["weekday"] = orders["order_date"].dt.day_name()
orders["order_date"].min(), orders["order_date"].max()
```

## Lesson 5: groupby (Pivot Tables and SQL GROUP BY)
```python
completed = orders[orders["status"] == "Completed"]

# Revenue by city
completed.groupby("city")["net_revenue"].sum().sort_values(ascending=False)

# Several measures at once
completed.groupby("city").agg(
    orders=("order_id", "count"),
    revenue=("net_revenue", "sum"),
    avg_order=("net_revenue", "mean")
).round(0).reset_index()

# Monthly revenue
monthly = completed.groupby("month")["net_revenue"].sum()

# Pivot table (like Excel)
pd.pivot_table(completed, values="net_revenue", index="city",
               columns="payment_method", aggfunc="sum", margins=True)
```

## Lesson 6: Merging (Joins)
```python
df = (orders
      .merge(customers[["customer_id", "customer_name", "segment"]], on="customer_id", how="left")
      .merge(products[["product_id", "product_name", "category"]], on="product_id", how="left"))
df.shape        # row count should remain 2000. If it grows, a key is duplicated
```
`how="inner"`, `"left"`, `"right"`, `"outer"` correspond to SQL join types.

## Lesson 7: Quick Visuals
```python
monthly.plot(kind="line", title="Monthly Net Revenue")
completed.groupby("category")["net_revenue"].sum().plot(kind="bar")
```
(Full charting is covered in Week 9.)

## Lesson 8: Save Your Results
```python
summary.to_csv("city_summary.csv", index=False)
summary.to_excel("city_summary.xlsx", index=False)   # needs openpyxl (included in Anaconda)
```

---

## Practice Exercises
1. How many orders, rows, and columns are there? Which columns have missing values?
2. Total and average net revenue for completed orders.
3. Net revenue by category and by city (use a pivot table).
4. Top 10 customers by spend (with names, via merge).
5. Return rate by product category.
6. Which weekday has the most orders?
7. Month-on-month revenue growth (`.pct_change()`).
8. Re-answer 3 of your SQL questions from Week 6 in pandas and confirm the numbers match.

---

## Weekly Assignment (Due Before Week 9)
Submit **`week8_sales_analysis.ipynb`** (notebook) that:
1. Loads and inspects the data (with notes on what you see)
2. Merges all three tables
3. Answers **10 business questions** (at least 2 using `groupby`, 1 using `pivot_table`, 1 using dates, 1 using `merge`)
4. Ends with a **"Findings & Recommendations"** Markdown section (3 to 5 bullet points)
5. Includes at least 2 charts

Upload to GitHub.

**Grading guide:** correct results (45%), code readability (20%), written insights (25%), charts (10%).

---

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0–10 min | Review Week 7 programs |
| 10–25 | Compare SQL, Excel, and pandas side by side on one question (revenue by city) |
| 25–70 | Live notebook: facilitator poses questions; students code the answers |
| 70–85 | "Find the bug" exercise (three broken pandas lines) |
| 85–90 | Assignment brief |

## Self-Check Questions
1. What is a DataFrame?
2. How is `merge(how="left")` like SQL `LEFT JOIN`?
3. Why wrap conditions in parentheses when combining them with `&`?
