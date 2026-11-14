---
title: "Python II - pandas for Data Analysis"
course: "data-analysis"
order: 8
week: 8
phase: "Programming"
summary: "Redo everything you did in Excel and SQL - but in a few lines of pandas that run in a second and repeat forever on new data."
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
**Goal:** Load, explore, filter, summarise, and combine the NaijaMart data with pandas - the same answers you got in Excel and SQL, but faster and repeatable. By the end you re-run a full analysis in seconds.

## What you'll be able to do
- Load CSVs into a DataFrame and inspect them
- Select, filter, sort, and create columns
- Summarise with `groupby` and `pivot_table`
- Merge (join) tables and work with dates

## Before you start (about 10 minutes)
- Open Colab and upload the four CSVs from the panel with the folder icon.
- Warm-up: run `import pandas as pd` then `pd.read_csv("orders_clean.csv").head()`.
- Optional: skim *"10 minutes to pandas"* at pandas.pydata.org/docs, or start **Kaggle Learn -> Pandas**.

## Try it 1 - Load and look

**Why it matters:** the first thing an analyst does with any file is get its shape and spot problems.

**Do this now:**
```python
import pandas as pd
orders = pd.read_csv("orders_clean.csv")

orders.head()          # first 5 rows
orders.shape           # (rows, columns)
orders.info()          # types + missing counts
orders.describe()      # summary stats (like Week 4!)
orders["city"].value_counts()
orders.isna().sum()    # missing values per column
```

**You've got it when:** you can state the row count, the columns, and which columns have missing values. (A DataFrame is a Table; a Series is a column.)

## Try it 2 - Filter like WHERE

**Why it matters:** this is SQL's `WHERE`, in Python.

**Do this now:**
```python
orders[orders["city"] == "Yenagoa"]
orders[(orders["status"] == "Completed") & (orders["quantity"] >= 3)]
orders[orders["city"].isin(["Lagos", "Abuja", "Warri"])]
orders[orders["payment_method"].isna()]
```

**You've got it when:** you can combine conditions. Use `&` and `|` (not `and`/`or`) and wrap each condition in parentheses.

## Try it 3 - Build new columns

**Why it matters:** revenue and size labels, created once, for every row.

**Do this now:**
```python
orders["revenue"] = orders["quantity"] * orders["unit_price"]
orders["net_revenue"] = orders["revenue"] * (1 - orders["discount_pct"] / 100)

import numpy as np
orders["size"] = np.where(orders["net_revenue"] >= 100000, "Large",
                 np.where(orders["net_revenue"] >= 30000, "Medium", "Small"))

orders.sort_values("net_revenue", ascending=False).head(10)
```

**You've got it when:** you have revenue, net revenue, and a size label, and can list the top 10 orders.

## Try it 4 - Summarise with groupby

**Why it matters:** this is the pivot table and SQL `GROUP BY`, in two lines.

**Do this now:**
```python
completed = orders[orders["status"] == "Completed"]

completed.groupby("city")["net_revenue"].sum().sort_values(ascending=False)

completed.groupby("city").agg(
    orders=("order_id", "count"),
    revenue=("net_revenue", "sum"),
    avg_order=("net_revenue", "mean")
).round(0).reset_index()
```

**You've got it when:** you get one row per city with orders, revenue, and average order value.

## Try it 5 - Work with dates

**Why it matters:** monthly trends need real dates, not text.

**Do this now:**
```python
orders["order_date"] = pd.to_datetime(orders["order_date"])
orders["month"] = orders["order_date"].dt.to_period("M")
orders["weekday"] = orders["order_date"].dt.day_name()
orders.groupby("month")["net_revenue"].sum()
```

**You've got it when:** you can show revenue by month and name the busiest weekday.

## Try it 6 - Merge the tables

**Why it matters:** this is the SQL join - bring in customer names and categories.

**Do this now:**
```python
customers = pd.read_csv("customers.csv")
products = pd.read_csv("products.csv")

df = (orders
      .merge(customers[["customer_id", "customer_name", "segment"]], on="customer_id", how="left")
      .merge(products[["product_id", "product_name", "category"]], on="product_id", how="left"))
print(df.shape)   # rows should stay 2000; if it grows, a key is duplicated
```

**You've got it when:** your merged table still has 2,000 rows and now shows names and categories. (`how="left"` is a SQL LEFT JOIN.)

## This week's build: a repeatable sales analysis

Submit `week8_sales_analysis.ipynb` that:
1. Loads and inspects the data (with notes on what you see).
2. Merges all three tables.
3. Answers **10 business questions** (at least 2 with `groupby`, 1 with `pivot_table`, 1 with dates, 1 with `merge`).
4. Ends with a **"Findings & Recommendations"** Markdown section (3 to 5 bullets).
5. Includes at least 2 charts (a quick `.plot(kind="line")` and `.plot(kind="bar")` are fine for now).

Upload it to GitHub. Save a summary file too: `df.to_csv("city_summary.csv", index=False)`.

*The magic: re-run the whole notebook on next month's file and every answer updates itself.*

### Grading guide

| Criteria | Weight |
|---|---|
| Correct results | 45% |
| Written insights | 25% |
| Code readability | 20% |
| Charts | 10% |

### Definition of done

- [ ] Data loaded, inspected, and all three tables merged (still 2,000 rows)
- [ ] 10 business questions answered with the required methods
- [ ] Findings & Recommendations section written
- [ ] At least 2 charts, uploaded to GitHub

## Extra quick wins (optional)
- Re-answer 3 of your Week 6 SQL questions in pandas and confirm the numbers match.
- Month-on-month growth in one line: `.pct_change()` on your monthly series.

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0-10 min | Review Week 7 programs |
| 10-25 min | Compare SQL, Excel, and pandas side by side on one question (revenue by city) |
| 25-70 min | Live notebook: facilitator poses questions, students code the answers |
| 70-85 min | "Find the bug" exercise (three broken pandas lines) |
| 85-90 min | Build brief |

## Facilitator Notes

The hook this week is "you already know this": show revenue-by-city in Excel, SQL, and pandas side by side so students see pandas is the same thinking in fewer keystrokes. The two reliable stumbling blocks are combining conditions (`&`/`|` with parentheses, not `and`/`or`) and merges that silently duplicate rows - make the 2,000-row check a reflex. Keep three broken pandas lines ready for the bug hunt. Encourage re-answering a SQL question in pandas; matching numbers across tools builds both confidence and the habit of reconciliation that interviews reward.

## Self-Check Questions
1. What is a DataFrame?
2. How is `merge(how="left")` like SQL `LEFT JOIN`?
3. Why wrap conditions in parentheses when combining them with `&`?
