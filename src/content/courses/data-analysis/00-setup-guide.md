---
title: "Setup Guide: Install Your Tools"
course: "data-analysis"
order: 0
phase: "Getting Started"
summary: "Get every tool working in one short, guided session so nothing blocks you on the week you need it."
estimatedHours: 2
tools: ["Excel", "SQLite", "Python", "Power BI"]
---
**Goal:** Install and test every tool, one at a time, so that the week you need it you can just start building. Do the installs the first time together in the mentoring session - installing alone is where most beginners give up.

## What you'll be able to do
- Open a CSV in Excel with the naira (₦) symbol showing correctly
- Create and query a SQLite database
- Run Python in the browser (no install) or on your laptop
- Open Power BI Desktop and sign in to GitHub and Kaggle

## Before you start (about 10 minutes)
- Have a laptop with a stable power source. If power is shaky, lean on Google Colab for Python (it saves to the cloud).
- Create one email you will use for all accounts (GitHub, Google, Kaggle).
- Tick each tool off below as it opens and runs. You only need Excel for Week 1; install the rest when its week arrives.

## Try it 1 - Excel (needed Week 1)

**Why it matters:** Excel is where you do your first analysis. A CSV opened the wrong way turns ₦ into garbled symbols.

**Do this now:**
1. Open desktop Excel if you have it. No licence? Go to office.com, sign in with a free Microsoft account, open **Excel for the web**.
2. Open a CSV the right way: **Data -> From Text/CSV**, set *File Origin* to **UTF-8**, then **Load**.
3. Check that the ₦ symbol shows correctly in the price column.

**You've got it when:** a CSV opens with clean columns and the ₦ symbol looks right.

> Desktop Excel is strongly preferred for Week 4. On the web, PivotTable slicers and the Data Analysis ToolPak are limited. `XLOOKUP` needs Microsoft 365 or Excel 2021+; on older versions you will use `VLOOKUP` and `INDEX/MATCH` instead.

## Try it 2 - DB Browser for SQLite (needed Week 5)

**Why it matters:** this is your free database. SQL is on almost every analyst job advert.

**Do this now:**
1. Go to **sqlitebrowser.org/dl** and install the version for your system with default settings.
2. Open it, then **File -> New Database** and save it as `naijamart.db`.
3. Import data: **File -> Import -> Table from CSV file**. Tick *Column names in first line*. Repeat for `orders_clean.csv`, `customers.csv`, and `products.csv`.
4. Click **Write Changes** (Ctrl+S).
5. In the **Execute SQL** tab, type `SELECT * FROM orders LIMIT 5;` and press **Ctrl+Enter**.

**You've got it when:** five rows of orders appear in the results grid.

## Try it 3 - Python (needed Week 7)

**Why it matters:** Python lets you repeat an analysis on new data in seconds.

**Do this now (easiest route, no install):**
1. Go to **colab.research.google.com** and sign in with a Google account.
2. Click **New notebook**.
3. In the first cell type `print("Hello, InnovaTech")` and press **Shift+Enter**.
4. Upload a CSV with the folder icon on the left when you need one.

**You've got it when:** the cell prints your message with no error.

> Prefer to install locally? Download **Anaconda** from anaconda.com/download, open **Anaconda Navigator -> Launch JupyterLab**, and run the same `print` test. Visual Studio Code with the *Python* and *Jupyter* extensions is an optional extra.

## Try it 4 - Power BI Desktop (needed Week 10)

**Why it matters:** Power BI is how analysts ship interactive dashboards managers actually click.

**Do this now:**
1. Windows only: install from the **Microsoft Store** (search "Power BI Desktop") or powerbi.microsoft.com/desktop.
2. Open it and close the start-up dialog so you can see the three views on the left.
3. On a Mac? Plan ahead now: book time on a Windows PC (office or a cyber cafe with permission) for Weeks 10 and 11.

**You've got it when:** Power BI Desktop opens and you can see Report, Table, and Model views.

## Try it 5 - GitHub and Kaggle (accounts only)

**Why it matters:** GitHub is your public portfolio. Kaggle is where you find practice data.

**Do this now:**
1. Create a free account at **github.com** with a professional username (for example `firstname-lastname-data`).
2. Create a **public** repository called `data-analysis-portfolio`. You can upload files through the website later - no command line needed.
3. Create a free account at **kaggle.com**. Browse **Datasets** and the free **Learn** micro-courses.

**You've got it when:** you can open your empty portfolio repo and your Kaggle home page.

## This week's build: your "ready to go" screenshot

Make one image (or a short tick-list) that proves your kit works, ready to paste into your Week 1 assignment:
1. Excel open with a CSV loaded and ₦ showing
2. Your GitHub `data-analysis-portfolio` repo page
3. Your Google or Kaggle account signed in

*Quick win: pin your GitHub repo link somewhere safe. You will add every project to it over the next 12 weeks.*

## Free learning resources used throughout

| Resource | Best for | Where |
|---|---|---|
| Microsoft Learn | Excel, Power BI official training | learn.microsoft.com |
| SQLBolt | Interactive SQL lessons | sqlbolt.com |
| Mode SQL Tutorial | SQL for analysts | mode.com/sql-tutorial |
| W3Schools SQL / Python | Quick syntax reference | w3schools.com |
| Kaggle Learn | Python, pandas, SQL micro-courses | kaggle.com/learn |
| pandas documentation | Reference | pandas.pydata.org/docs |
| Khan Academy Statistics | Statistics fundamentals | khanacademy.org |

Helpful YouTube channels (search the topic named each week): Alex The Analyst, freeCodeCamp.org, Kevin Stratvert, Leila Gharani, ExcelIsFun, Corey Schafer, Keith Galli, Programming with Mosh, StatQuest with Josh Starmer, Guy in a Cube, Curbal.

## Facilitator Notes

Run every first install live in the session; this single hour prevents most week-one drop-off. Walk the room during installs and fix issues on the spot: UTF-8 on CSV import, Windows-only Power BI (confirm Mac students have a plan before Week 10), and firewall or storage blocks on Anaconda. For weak laptops or unreliable power, steer students to Google Colab and web Excel rather than losing them to setup pain. Verify every external link before class, as download URLs drift. Have students who finish early help the next person - peer installs build confidence.
