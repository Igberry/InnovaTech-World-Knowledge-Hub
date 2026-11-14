---
title: "Python III - Cleaning, EDA & Visualisation (Portfolio Project 1)"
course: "data-analysis"
order: 9
week: 9
phase: "Programming"
summary: "Take a dataset you have never seen, clean it, explore it, and turn it into a story with great charts - your first full portfolio project."
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
**Goal:** Clean a messy file in pandas, explore it like a detective, and present real findings with professional charts. By the end you publish Portfolio Project 1 - a complete analysis anyone can read on GitHub.

## What you'll be able to do
- Clean data in pandas (missing values, duplicates, types, text)
- Run Exploratory Data Analysis (EDA) on any new dataset
- Make professional charts with matplotlib and seaborn
- Tell a clear data story in a notebook

## Before you start (about 10 minutes)
- Open Colab, upload `orders_raw.csv`, and run `import pandas as pd; pd.read_csv("orders_raw.csv").head()`.
- Warm-up: run `df.info()` and `df.isna().sum()` and note what looks broken.
- Optional: watch five minutes of *"Alex The Analyst Data Cleaning in Pandas"* or start **Kaggle Learn -> Data Cleaning**.

## Try it 1 - Clean it in code

**Why it matters:** this is Week 2's Excel cleaning, now repeatable on any file in seconds.

**Do this now:**
```python
import pandas as pd
raw = pd.read_csv("orders_raw.csv")
df = raw.copy()                              # always keep the original

df = df.drop_duplicates()                    # 1. duplicates
df["city"] = (df["city"].str.strip()         # 2. text (TRIM + PROPER + SUBSTITUTE)
                         .str.replace("-", " ", regex=False)
                         .str.title())
df["unit_price"] = (df["unit_price"].astype(str)     # 3. numbers stored as text
                    .str.replace("₦", "", regex=False)
                    .str.replace(",", "", regex=False).astype(float))
df["payment_method"] = df["payment_method"].fillna("Unknown")   # 4. blanks
df["quantity"] = df["quantity"].abs()        # 5. invalid values (decision: typos)
```

**You've got it when:** your city column is consistent and prices are real numbers.

## Try it 2 - Fix the mixed dates carefully

**Why it matters:** `09/07/2025` could be 9 July or 7 September. Careless parsing silently flips day and month.

**Do this now:**
```python
s = df["order_date"].astype(str)
d = pd.to_datetime(s, format="%Y-%m-%d", errors="coerce")           # 2025-07-09
d = d.fillna(pd.to_datetime(s, format="%d/%m/%Y", errors="coerce")) # 09/07/2025
d = d.fillna(pd.to_datetime(s, format="%d-%b-%Y", errors="coerce")) # 09-Jul-2025
print("Unparsed dates:", d.isna().sum())     # should be 0
df["order_date"] = d
```

**You've got it when:** zero dates are left unparsed. Do not use `dayfirst=True` or `format="mixed"` blindly; parse each known format with `errors="coerce"`, then confirm nothing is left.

## Try it 3 - Run the EDA routine

**Why it matters:** this is the first thing you do with every unfamiliar dataset for the rest of your career.

**Do this now:**
```python
df.shape
df.describe(include="all")
df.isna().sum()
for col in df.select_dtypes("object"):
    print(col, df[col].nunique()); print(df[col].value_counts().head())
```
Then ask: what does one row represent? What period does it cover? How are the key numbers distributed? What changes over time? What looks wrong?

**You've got it when:** you can describe the dataset in three sentences without opening it in Excel.

## Try it 4 - Make charts that carry a message

**Why it matters:** a good chart with an insight title is the payoff of all the cleaning.

**Do this now:**
```python
import matplotlib.pyplot as plt
import seaborn as sns
sns.set_theme(style="whitegrid")

sns.histplot(df["unit_price"], bins=30)
plt.title("Most orders are small, a few are large"); plt.xlabel("Price (₦)"); plt.show()

(df.groupby("city")["unit_price"].sum().sort_values()
   .plot(kind="barh", figsize=(7,4), title="Revenue by City")); plt.show()

sns.boxplot(data=df, x="category", y="unit_price"); plt.xticks(rotation=45); plt.show()
```

**You've got it when:** each chart has a title that states the finding, labelled axes, and no clutter.

## Try it 5 - Tell the story

**Why it matters:** a notebook that reads like a report is what gets shared and gets you hired.

**Do this now, structure your notebook as:**
1. Title and objective (the business question)
2. Data description (source, size, period)
3. Cleaning steps (what you changed and why)
4. Analysis (each section ends with "What this means")
5. Key findings (3 to 5 bullets)
6. Recommendations
7. Limitations and next steps

**You've got it when:** a non-technical reader could follow your notebook top to bottom and get the point.

## This week's build: Portfolio Project 1 - public dataset EDA

Choose a dataset on **kaggle.com/datasets** that is 1,000 to 100,000 rows, about business, sales, HR, health, education, or finance, and messy enough to need cleaning. Good local angles: Nigerian or African economic indicators, retail transactions, loan applications, school performance.

**Deliver:**
- At least 5 cleaning steps, documented
- At least 6 visuals, each with an insight title
- 5 written findings plus 3 recommendations
- Published on GitHub with a README (what, why, key results, how to run)
- A 150-word summary written for a non-technical manager

*Check the dataset licence before re-uploading it; if unsure, link to the Kaggle page instead. This is a real portfolio piece - make it one you are proud to send.*

### Grading guide

| Criteria | Weight |
|---|---|
| Cleaning quality | 25% |
| Analysis depth | 25% |
| Visual quality | 20% |
| Written insights | 20% |
| GitHub presentation | 10% |

### Definition of done

- [ ] Dataset chosen and licence checked
- [ ] At least 5 documented cleaning steps
- [ ] At least 6 visuals with insight titles
- [ ] 5 findings and 3 recommendations
- [ ] Published to GitHub with a README and a 150-word manager summary

## Extra quick wins (optional)
- Add a correlation heatmap: `sns.heatmap(df.select_dtypes("number").corr(), annot=True, cmap="Blues")`.
- Make one chart badly on purpose, then fix it, and keep both to show the improvement.

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0-10 min | Review pandas notebooks |
| 10-30 min | Live cleaning of `orders_raw.csv` in pandas; compare with Excel Week 2 |
| 30-50 min | Make one chart badly, then fix it together (before/after) |
| 50-75 min | Students pick Kaggle datasets and run the first EDA routine; coach |
| 75-90 min | Story structure and build brief |

## Facilitator Notes

This is the first project students will show employers, so protect its quality. The before/after chart demo (make one cluttered, then fix it) teaches visual judgement faster than any rule list. Hammer the date-parsing caution: `format="mixed"` and `dayfirst=True` can silently swap day and month, so parse each format explicitly and confirm zero unparsed. Help students choose a dataset that is messy enough to be interesting but small enough to finish; usability score and the discussion tab on Kaggle help. Reinforce data ethics: check licences, never re-upload restricted data, and anonymise anything personal.

## Self-Check Questions
1. Why create `df = raw.copy()` before cleaning?
2. Which chart shows a trend? A distribution? A comparison?
3. What belongs in the "Limitations" section of an analysis?
