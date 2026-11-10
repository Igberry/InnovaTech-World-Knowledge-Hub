---
title: "Python I — Programming Basics"
course: "data-analysis"
order: 7
week: 7
phase: "Programming"
summary: "Get comfortable writing and reading simple Python so that pandas (Week 8) makes sense."
estimatedHours: 10
tools: ["Python", "Google Colab"]
---
**Goal:** Get comfortable writing and reading simple Python so that pandas (Week 8) makes sense.

## Learning Objectives
- Run Python in Google Colab or Jupyter
- Use variables, data types, strings, numbers, lists, dictionaries
- Write `if` statements, `for` loops, and functions
- Read error messages without panic
- Read a CSV file with Python

## Tools
Google Colab (easiest) or Anaconda + JupyterLab. See [Setup Guide](/courses/data-analysis/00-setup-guide/).

## Pre-Session Videos (about 3 hours)
- Search YouTube: **"Corey Schafer Python tutorial for beginners"** (variables, strings, lists, dictionaries, conditionals, loops, functions)
- Search YouTube: **"freeCodeCamp Python for beginners full course"** (first 2 hours)
- Interactive: **Kaggle Learn → Python** (kaggle.com/learn)

---

## Lesson 1: Your First Notebook
A **notebook** mixes code cells and text cells.
- Run a cell: **Shift+Enter**
- Add a text (Markdown) cell for headings and notes
- Restart and run all if things behave strangely

```python
print("Hello, InnovaTech")
2 + 3 * 4
```

## Lesson 2: Variables and Data Types
```python
city = "Yenagoa"          # str (text)
orders = 120              # int (whole number)
avg_price = 18500.75      # float (decimal)
is_active = True          # bool
```
```python
type(city)                # <class 'str'>
total = orders * avg_price
print("Total revenue:", total)
print(f"Total revenue: ₦{total:,.2f}")   # f-string formatting
```
**Naming rules:** letters, numbers, underscores; no spaces; use `snake_case`; case-sensitive.

### Arithmetic
`+  -  *  /  //` (floor division) `%` (remainder) `**` (power)

## Lesson 3: Strings
```python
name = "  port harcourt  "
name.strip()              # remove spaces → 'port harcourt'
name.strip().title()      # 'Port Harcourt'
name.upper()  name.lower()
name.replace("-", " ")
"harcourt" in name        # True
len(name)
"Port Harcourt".split(" ")      # ['Port', 'Harcourt']
```
*(Compare with Excel: `TRIM`, `PROPER`, `SUBSTITUTE`.)*

## Lesson 4: Lists and Dictionaries
```python
cities = ["Yenagoa", "Lagos", "Abuja"]
cities[0]                 # first item (index starts at 0)
cities.append("Warri")
len(cities)
cities[-1]                # last item
cities[1:3]               # slice

prices = {"Laptop Bag": 18000, "Wireless Mouse": 6500}
prices["Laptop Bag"]
prices["Webcam"] = 24000
prices.keys()
prices.items()
```

## Lesson 5: Conditions
```python
revenue = 85000
if revenue >= 100000:
    size = "Large"
elif revenue >= 30000:
    size = "Medium"
else:
    size = "Small"
print(size)
```
Comparison: `== != > < >= <=` · Logic: `and or not`
> **Indentation matters.** Python uses 4 spaces to show what is inside the `if`, `for`, or function.

## Lesson 6: Loops
```python
for city in cities:
    print(city)

total = 0
for p in [18000, 6500, 5500]:
    total += p
print(total)

for i in range(5):        # 0,1,2,3,4
    print(i)
```

## Lesson 7: Functions
```python
def net_revenue(quantity, price, discount_pct=0):
    return quantity * price * (1 - discount_pct / 100)

net_revenue(3, 18000, 10)    # 48600.0
```

## Lesson 8: Reading Files and Errors
```python
import csv
with open("orders_clean.csv", encoding="utf-8-sig") as f:
    reader = csv.DictReader(f)
    rows = list(reader)
print(len(rows))
print(rows[0])
```
*In Colab:* upload via the folder icon first. The file path is just the name, e.g., `"orders_clean.csv"`.

### Reading error messages
| Error | Usually means |
|---|---|
| `NameError` | Typo, or you didn't run the cell that defines the variable |
| `SyntaxError` | Missing colon/bracket/quote |
| `IndentationError` | Spaces don't line up |
| `KeyError` | Dictionary or column name doesn't exist |
| `FileNotFoundError` | Wrong filename/location |
| `TypeError` | Mixing incompatible types (e.g., text + number) |

**Debugging habit:** read the *last line* of the error, find the line number, and check spelling.

---

## Practice Exercises
1. Store your name, city, and age in variables and print a sentence with an f-string.
2. Given `[18000, 6500, 5500, 22000]`, calculate the total, average, minimum, and maximum **without** using `sum()` (then verify with `sum()`, `min()`, `max()`).
3. Write a function `classify_order(revenue)` returning "Large", "Medium", or "Small".
4. Clean `["  yenagoa", "LAGOS ", "port-harcourt"]` into proper city names using a loop.
5. Read `orders_clean.csv` with the `csv` module and count how many rows have `status == "Returned"`.
6. Complete the first **5 Kaggle Learn Python** lessons.

---

## Weekly Assignment (Due Before Week 8)
Submit a notebook **`week7_python_basics.ipynb`** (download from Colab: File → Download .ipynb) with **5 small programs**:
1. A function that calculates net revenue
2. A loop that cleans a list of messy city names
3. A function that classifies orders as Large/Medium/Small
4. A program that reads `orders_clean.csv` and counts orders per city using a dictionary
5. A program that finds the highest-value order and prints it in a friendly sentence

Each program needs a Markdown cell describing what it does.

**Grading guide:** programs work (60%), clean readable code (20%), explanations (20%).

---

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0–10 min | Review Week 6 GitHub repos, give feedback |
| 10–30 min | Open Colab together; run first cells; upload a CSV |
| 30–70 min | **Live coding.** Facilitator types, students predict the output **before** running |
| 70–85 min | Break the code on purpose, and read each error message together |
| 85–90 min | Assignment brief |

## Self-Check Questions
1. What is the difference between a list and a dictionary?
2. What does `"  Yenagoa ".strip().upper()` return?
3. Why does Python code need correct indentation?
