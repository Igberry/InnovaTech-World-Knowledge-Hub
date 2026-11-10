---
title: "Setup Guide: Install Your Tools"
course: "data-analysis"
order: 0
phase: "Getting Started"
summary: "Install everything you need, step by step, before the week that needs it."
estimatedHours: 2
tools: ["Excel", "SQLite", "Python", "Power BI"]
---
> Do each install **together in the mentoring session** the first time. Installing alone is where most beginners give up.

---

## 1. Microsoft Excel (Week 1)
- Desktop Excel is best (Windows or Mac).
- **No licence?** Use **Excel for the web**: go to office.com, sign in with a free Microsoft account, and open Excel. Most Week 1–4 features work, but PivotTable slicers and the Data Analysis ToolPak are limited. Desktop is strongly preferred for Week 4.
- **XLOOKUP** requires Microsoft 365 or Excel 2021 or later. If the student has an older version, teach `VLOOKUP` and `INDEX/MATCH` instead.

### Opening the CSV files correctly
Use **Data → From Text/CSV**, set *File Origin* to **UTF-8**, then **Load**. This makes the ₦ symbol display properly.

## 2. DB Browser for SQLite (Week 5)
1. Go to **sqlitebrowser.org/dl** and download the installer for your system.
2. Install with the default settings.
3. Open it, then **File → New Database** and save as `naijamart.db`.
4. Import data: **File → Import → Table from CSV file**. Tick *Column names in first line*. Repeat for `orders_clean.csv`, `customers.csv`, and `products.csv`.
5. Click **Write Changes** (Ctrl+S) after importing.
6. Run queries in the **Execute SQL** tab, then press **Ctrl+Enter**.

## 3. Python (Week 7)
**Option A, easiest and recommended for beginners: Google Colab (no install)**
- Go to **colab.research.google.com** and sign in with a Google account.
- Click **New notebook**. Upload CSVs using the folder icon on the left.
- Good for weak laptops and unreliable power: files are saved to Google Drive.

**Option B, install on the laptop: Anaconda**
1. Download **Anaconda Individual Edition** from **anaconda.com/download**.
2. Install with the default settings.
3. Open **Anaconda Navigator → Launch JupyterLab** (or Jupyter Notebook).
4. Test it by running `print("Hello, InnovaTech")`.

**Optional: Visual Studio Code** (code.visualstudio.com), then install the *Python* and *Jupyter* extensions.

## 4. Power BI Desktop (Week 10)
- **Windows only.** Download from the **Microsoft Store** (search "Power BI Desktop") or from **powerbi.microsoft.com/desktop**.
- If the student uses a Mac: use a Windows computer for these two weeks (office PC or a cyber café with permission).
- Publishing to the Power BI Service may require a **work or school email**, so Week 11 includes alternatives (PDF export, screenshots, `.pbix` file).

## 5. GitHub (Week 6)
1. Create a free account at **github.com**. Pick a professional username (e.g., `firstname-lastname-data`).
2. Create a public repository called `data-analysis-portfolio`.
3. Beginners can upload files through the website (**Add file → Upload files**). Git command-line is **not required**.

## 6. Kaggle (Week 9)
- Create a free account at **kaggle.com**. Use **Datasets** to find practice data and **Learn** for free micro-courses.

---

## Free Learning Resources Used Throughout (Verify Links Before Class)

| Resource | Best for | Where |
|---|---|---|
| Microsoft Learn | Excel, Power BI official training | learn.microsoft.com |
| SQLBolt | Interactive SQL lessons | sqlbolt.com |
| Mode SQL Tutorial | SQL for analysts | mode.com/sql-tutorial |
| W3Schools SQL / Python | Quick syntax reference | w3schools.com |
| Kaggle Learn | Python, pandas, SQL micro-courses | kaggle.com/learn |
| pandas documentation | Reference | pandas.pydata.org/docs |
| Khan Academy Statistics | Statistics fundamentals | khanacademy.org |

### YouTube Channels (Search the Topic Named in Each Week)
Alex The Analyst · freeCodeCamp.org · Kevin Stratvert · Leila Gharani · ExcelIsFun · Corey Schafer · Keith Galli · Programming with Mosh · StatQuest with Josh Starmer · Guy in a Cube · Curbal
