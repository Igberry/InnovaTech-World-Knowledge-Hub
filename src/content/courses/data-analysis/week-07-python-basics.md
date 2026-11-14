---
title: "Python I - Programming Basics"
course: "data-analysis"
order: 7
week: 7
phase: "Programming"
summary: "Write your first Python by building small, useful programs on real sales data - enough to make pandas feel easy next week."
estimatedHours: 10
tools: ["Python", "Google Colab"]
---
**Goal:** Get comfortable writing and reading simple Python by building tiny programs that do real jobs on the NaijaMart data. You type code from minute one, so pandas (Week 8) feels natural.

## What you'll be able to do
- Run Python in Google Colab or Jupyter
- Use variables, numbers, text, lists, and dictionaries
- Write `if` statements, `for` loops, and functions
- Read an error message calmly and fix it
- Read a CSV file with Python

## Before you start (about 10 minutes)
- Open Google Colab (colab.research.google.com) and click **New notebook**. No install needed. See the [Setup Guide](/courses/data-analysis/00-setup-guide/) for the Anaconda alternative.
- Warm-up: in the first cell type `print("Hello, InnovaTech")` and press **Shift+Enter**.
- Optional: start the free **Kaggle Learn -> Python** micro-course.

## Try it 1 - Store and show values

**Why it matters:** variables hold your data. f-strings make output readable.

**Do this now, each in its own cell (Shift+Enter):**
```python
city = "Yenagoa"          # text (str)
orders = 120              # whole number (int)
avg_price = 18500.75      # decimal (float)
total = orders * avg_price
print(f"Total revenue: ₦{total:,.2f}")
```

**You've got it when:** your cell prints a tidy naira total using an f-string.

## Try it 2 - Clean text like Excel did

**Why it matters:** this is Week 2's `TRIM` and `PROPER`, now in Python.

**Do this now:**
```python
name = "  port harcourt  "
print(name.strip().title())     # 'Port Harcourt'
print(name.replace("-", " "))
print("harcourt" in name)       # True
print("Port Harcourt".split(" "))
```

**You've got it when:** you can turn a messy city name into a clean one in one line.

## Try it 3 - Lists and dictionaries

**Why it matters:** lists hold many values; dictionaries map a name to a value, like a price list.

**Do this now:**
```python
cities = ["Yenagoa", "Lagos", "Abuja"]
cities.append("Warri")
print(cities[0], cities[-1], len(cities))

prices = {"Laptop Bag": 18000, "Wireless Mouse": 6500}
prices["Webcam"] = 24000
print(prices["Laptop Bag"])
print(prices.items())
```

**You've got it when:** you can add to a list and look up a price in a dictionary.

## Try it 4 - Make decisions and repeat work

**Why it matters:** `if` classifies; `for` repeats. Together they process any list of orders.

**Do this now:**
```python
for city in cities:
    print(city)

revenue = 85000
if revenue >= 100000:
    size = "Large"
elif revenue >= 30000:
    size = "Medium"
else:
    size = "Small"
print(size)
```

**You've got it when:** your loop prints every city and your `if` labels the order correctly. Watch your indentation - Python uses 4 spaces to show what is inside.

## Try it 5 - Write a reusable function

**Why it matters:** a function lets you compute net revenue for any order, forever, with one name.

**Do this now:**
```python
def net_revenue(quantity, price, discount_pct=0):
    return quantity * price * (1 - discount_pct / 100)

print(net_revenue(3, 18000, 10))    # 48600.0
```

**You've got it when:** calling `net_revenue(...)` returns the right number for any order.

## Try it 6 - Read the real CSV, and read errors

**Why it matters:** your programs become useful the moment they read real data. And every programmer meets errors; the skill is staying calm.

**Do this now:**
1. In Colab, upload `orders_clean.csv` with the folder icon on the left.
2. Read it:
```python
import csv
with open("orders_clean.csv", encoding="utf-8-sig") as f:
    rows = list(csv.DictReader(f))
print(len(rows))
print(rows[0])
```
3. Break it on purpose: misspell the filename and run it. Read the **last line** of the error (`FileNotFoundError`), then fix it.

**You've got it when:** you can read the file, print the row count, and explain what one error message was telling you.

Common errors to recognise: `NameError` (typo or cell not run), `SyntaxError` (missing colon/bracket/quote), `IndentationError` (spaces off), `KeyError` (column name wrong), `FileNotFoundError` (wrong filename).

## This week's build: five small programs that do real jobs

Submit `week7_python_basics.ipynb` (Colab: File -> Download .ipynb) with five programs, each with a Markdown cell explaining it:
1. A function that calculates net revenue.
2. A loop that cleans a list of messy city names.
3. A function that classifies an order as Large, Medium, or Small.
4. A program that reads `orders_clean.csv` and counts orders per city using a dictionary.
5. A program that finds the highest-value order and prints it in a friendly sentence.

*Quick win: program 4 does in Python what a pivot did in Excel. Same answer, repeatable forever.*

### Grading guide

| Criteria | Weight |
|---|---|
| Programs work | 60% |
| Clean, readable code | 20% |
| Clear explanations | 20% |

### Definition of done

- [ ] Five working programs in one notebook
- [ ] Each has a Markdown explanation
- [ ] Program reads the real CSV successfully
- [ ] Notebook downloaded as `.ipynb`

## Extra quick wins (optional)
- Without `sum()`, total a list of prices with a loop, then check against `sum()`.
- Finish the first five **Kaggle Learn -> Python** lessons.

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0-10 min | Review Week 6 GitHub repos, give feedback |
| 10-30 min | Open Colab together; run first cells; upload a CSV |
| 30-70 min | Live coding: facilitator types, students predict the output before running |
| 70-85 min | Break the code on purpose and read each error together |
| 85-90 min | Build brief |

## Facilitator Notes

Predict-before-you-run is the key technique: type a line, ask the room what it will print, then run it. This builds real understanding instead of copy-paste. Deliberately cause each common error at least once so students learn the error is information, not failure - read the last line, find the line number, check spelling. Steer weak-laptop or unreliable-power students to Colab so a crash never loses their work. Keep tying Python back to what they already did: `.strip().title()` is `TRIM` and `PROPER`, the dictionary count is a pivot. Indentation will bite someone; make 4-space discipline a habit early.

## Self-Check Questions
1. What is the difference between a list and a dictionary?
2. What does `"  Yenagoa ".strip().upper()` return?
3. Why does Python code need correct indentation?
