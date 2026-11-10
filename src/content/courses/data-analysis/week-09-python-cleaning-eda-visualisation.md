---
title: "Python III — Cleaning, EDA & Visualisation (Portfolio Project 1)"
course: "data-analysis"
order: 9
week: 9
phase: "Programming"
summary: "Take a dataset you have never seen, clean it, explore it, find insights, and present them with good charts."
estimatedHours: 10
tools: ["Python", "pandas", "Matplotlib"]
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
**Goal:** Take a dataset you have never seen, clean it, explore it, find insights, and present them with good charts.

## Learning Objectives
- Clean data in pandas (missing values, duplicates, types, text)
- Perform **Exploratory Data Analysis (EDA)**
- Create professional charts with matplotlib and seaborn
- Tell a data story in a notebook

## Pre-Session Videos (about 3 hours)
- Search YouTube: **"Alex The Analyst Data Cleaning in Pandas"** (his "Data Cleaning" portfolio project series)
- Search YouTube: **"Exploratory data analysis Python pandas seaborn"**
- Search YouTube: **"Matplotlib tutorial Corey Schafer"**
- Search YouTube: **"Storytelling with data Cole Nussbaumer Knaflic"** (design principles)
- Interactive: **Kaggle Learn → Data Cleaning** and **Data Visualization**

---

## Lesson 1: Cleaning in pandas
Use `orders_raw.csv` for practice.
```python
import pandas as pd
raw = pd.read_csv("orders_raw.csv")
df = raw.copy()                              # always keep the original

# 1. Duplicates
print(df.duplicated().sum())
df = df.drop_duplicates()

# 2. Text cleaning (like TRIM + PROPER + SUBSTITUTE)
df["city"] = (df["city"].str.strip()
                         .str.replace("-", " ", regex=False)
                         .str.title())

# 3. Numbers stored as text
df["unit_price"] = (df["unit_price"].astype(str)
                    .str.replace("₦", "", regex=False)
                    .str.replace(",", "", regex=False)
                    .astype(float))
df["quantity"] = (df["quantity"].astype(str).str.extract(r"(-?\d+)")[0].astype(int))

# 4. Dates in mixed formats: parse each known format separately
s = df["order_date"].astype(str)
d = pd.to_datetime(s, format="%Y-%m-%d", errors="coerce")                       # 2025-07-09
d = d.fillna(pd.to_datetime(s, format="%d/%m/%Y", errors="coerce"))             # 09/07/2025
d = d.fillna(pd.to_datetime(s, format="%d-%b-%Y", errors="coerce"))             # 09-Jul-2025
print("Unparsed dates:", d.isna().sum())                                        # should be 0
df["order_date"] = d
```
> **Date caution:** a value like `09/07/2025` could be 9 July or 7 September. Do **not** use `dayfirst=True` or `format="mixed"` blindly: with mixed formats pandas can silently flip day and month. Parse each known format explicitly with `errors="coerce"`, then confirm nothing is left unparsed. In real projects, confirm the format with the data owner.

```python
# 5. Missing values
df["payment_method"] = df["payment_method"].fillna("Unknown")
# df.dropna(subset=["customer_id"])      # drop rows missing critical fields

# 6. Invalid values
print((df["quantity"] <= 0).sum())
df["quantity"] = df["quantity"].abs()        # decision: treat as typing mistakes
```
**Cleaning checklist:** duplicates · spelling and case · data types · missing values · impossible values · outliers · consistent categories. **Document every decision** in a Markdown cell.

## Lesson 2: The EDA Routine
Run this for **every** new dataset:
```python
df.shape
df.info()
df.describe(include="all")
df.isna().sum()
for col in df.select_dtypes("object"):
    print(col, df[col].nunique()); print(df[col].value_counts().head())
```
Then ask:
1. What does each row represent?
2. What time period does it cover?
3. How are key numbers distributed? (histograms, boxplots)
4. How do categories compare?
5. What changes over time?
6. Which variables seem related? (correlation heatmap)
7. What looks strange or wrong?

## Lesson 3: Visualisation
```python
import matplotlib.pyplot as plt
import seaborn as sns
sns.set_theme(style="whitegrid")

# Histogram: distribution
sns.histplot(df["unit_price"], bins=30)
plt.title("Distribution of Unit Prices"); plt.xlabel("Price (₦)"); plt.show()

# Line: trend over time
monthly = df.set_index("order_date")["unit_price"].resample("ME").sum()
monthly.plot(figsize=(9,4), title="Monthly Revenue"); plt.ylabel("₦"); plt.show()

# Bar: comparison
(df.groupby("city")["unit_price"].sum().sort_values()
   .plot(kind="barh", figsize=(7,4), title="Revenue by City"))
plt.show()

# Boxplot: spread and outliers
sns.boxplot(data=df, x="category", y="unit_price"); plt.xticks(rotation=45); plt.show()

# Heatmap: correlation
sns.heatmap(df.select_dtypes("number").corr(), annot=True, cmap="Blues"); plt.show()
```
> `resample("ME")` may show a warning in newer pandas where `"ME"` is preferred. Both work; use whichever your version accepts.

### Chart rules
- Title that says the finding · labelled axes with units
- Sort bars · limit colours · remove clutter
- Right chart for the question (line = time, bar = comparison, histogram = distribution, scatter = relationship)

## Lesson 4: Telling a Story
A strong notebook has this structure:
1. **Title and objective** (the business question)
2. **Data description** (source, size, period)
3. **Cleaning steps** (what you changed and why)
4. **Analysis** (each section ends with "What this means")
5. **Key findings** (3 to 5 bullets)
6. **Recommendations**
7. **Limitations / next steps**

---

## Portfolio Project 1: Public Dataset EDA
**Choose a dataset on Kaggle (kaggle.com/datasets)** that is:
- Between 1,000 and 100,000 rows
- Related to business, sales, HR, health, education, or finance
- Messy enough to require cleaning (the **usability score** shown on Kaggle can help; also check the discussion tab)

*Suggested ideas:* online retail transactions, employee attrition, customer churn, e-commerce delivery, Nigerian/African economic indicators, loan applications, school performance.

> Check the dataset **licence** before publishing it in your repo. If unsure, link to the Kaggle page instead of re-uploading.

**Requirements:**
- At least 5 cleaning steps, documented
- At least 6 visuals, with insight titles
- 5 written findings plus 3 recommendations
- Published on GitHub with a README (what, why, key results, how to run)

---

## Weekly Assignment (Due Before Week 10)
Submit the **Portfolio Project 1 notebook** and the **GitHub link**. Also submit a **150-word summary** written for a non-technical manager.

**Grading guide:** cleaning quality (25%), analysis depth (25%), visual quality (20%), written insights (20%), GitHub presentation (10%).

---

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0–10 min | Review pandas notebooks |
| 10–30 | Live cleaning of `orders_raw.csv` in pandas; compare with Excel Week 2 |
| 30–50 | Make one chart badly, then fix it together (**before/after**) |
| 50–75 | Students choose Kaggle datasets and run the first EDA routine; facilitator coaches |
| 75–90 | Story structure and assignment brief |

## Self-Check Questions
1. Why create `df = raw.copy()`?
2. Which chart would you use to show a trend? A distribution? A comparison?
3. What belongs in the "Limitations" section of an analysis?
