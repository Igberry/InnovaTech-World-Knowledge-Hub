---
title: "Setup Guide: Get Ready to Start"
course: "data-analysis"
order: 0
phase: "Getting Started"
summary: "A beginner-friendly checklist. Set up only what you need for Week 1 today, and install the other tools later when the course tells you to. Nothing here assumes you have done this before."
estimatedHours: 2
tools: ["Excel", "SQLite", "Python", "Power BI"]
downloads:
  - label: "Orders (clean) CSV - use this in Week 1"
    href: "/downloads/data-analysis/orders_clean.csv"
  - label: "Orders (raw, messy) CSV - for later weeks"
    href: "/downloads/data-analysis/orders_raw.csv"
  - label: "Customers CSV - for later weeks"
    href: "/downloads/data-analysis/customers.csv"
  - label: "Products CSV - for later weeks"
    href: "/downloads/data-analysis/products.csv"
---
**Read this first.** You do NOT have to install everything today. For Week 1 you only need **Excel** and two free accounts. The other tools (SQLite, Python, Power BI) are for much later weeks, and this guide will tell you exactly which week each one is for. If you try to install all of them now, you will get stuck on something you do not need yet. So: do **Part 1** today, and come back to **Part 2** only when a week asks for it.

## A few words you will see a lot

You are not expected to know these yet. Here they are in plain English:

| Word | What it really means |
|---|---|
| **Spreadsheet** | A grid of boxes (cells) for numbers and text. Excel and Google Sheets are spreadsheets. |
| **CSV** | A plain text file full of rows of data, with commas between the values. You open it in a spreadsheet. The practice files on this page are CSVs. |
| **Column** | A line of boxes going down, with one heading (for example "city"). |
| **Row** | A line of boxes going across. One row is usually one thing, for example one order. |
| **Database** | A tidy store for large amounts of data that you ask questions with code. You meet this in Week 5, not now. |
| **UTF-8** | A setting that makes special characters like the naira sign (₦) show correctly instead of as strange symbols. |

Keep this table open the first few weeks. You will stop needing it quickly.

## Download your practice files (2 minutes, do this today)

Every week in this course uses the same NaijaMart shop data. Get the files now so they are ready.

**Do this now:**
1. Look at the **"Files for this lesson"** box on this page (just below or beside this lesson).
2. Click **"Orders (clean) CSV - use this in Week 1"**. Your browser saves it to your **Downloads** folder.
3. Do the same for the other three files. You will not touch the Customers, Products, or "raw messy" files until later weeks, but it is easier to grab them all once.
4. On your computer, open your **Downloads** folder and check the four files are there. That is all for now. Do not open them yet; Week 1 shows you the correct way to open a CSV so the ₦ sign is not broken.

**You have done this right when:** four files named `orders_clean.csv`, `orders_raw.csv`, `customers.csv`, and `products.csv` are sitting in your Downloads folder.

---

# Part 1 - Do this today (this is all you need for Week 1)

## Step 1 - Get Excel working

**Why it matters:** Excel is where you do your very first analysis in Week 1. Everything else can wait.

**If you already have Excel on your computer:** open it once to confirm it starts, then skip to Step 2. You are done.

**If you do NOT have Excel, use the free online version:**
1. Open your web browser and go to **office.com**.
2. Click **Sign in**. If you do not have a Microsoft account, click **Create one!** and follow the steps (it is free and takes about 3 minutes). Use an email you will remember.
3. Once signed in, click the **Excel** icon (a green square). This is **Excel for the web** and it works for almost everything in this course.
4. Click **Blank workbook** to check it opens. You should see an empty grid of cells. Close it; you do not need to save anything yet.

**You have done this right when:** Excel (installed or online) opens and you can see an empty grid of cells.

> Small heads-up for later, not now: desktop Excel is better than the web version for Week 4 and beyond. If you only have the web version, that is fine to start. We will remind you before it matters.

## Step 2 - Create two free accounts

**Why it matters:** **GitHub** will hold your finished projects so employers can see them. **Google** gives you a free account you will reuse for Python later. Making them now saves time every week.

**Do this now:**
1. Go to **github.com** and click **Sign up**. Pick a clean, professional username, for example `amaka-okafor-data`. Avoid nicknames; this is part of your CV.
2. After signing up, click the **+** at the top right, then **New repository**. (A "repository", or "repo", is just a folder for one project.)
3. Name it `data-analysis-portfolio`, leave it set to **Public**, and click **Create repository**. You can add files through the website later; no code needed.
4. If you do not already have a Google account, go to **accounts.google.com**, click **Create account**, and follow the steps. If you already use Gmail, you are done; that is a Google account.

**You have done this right when:** you can open your empty `data-analysis-portfolio` page on GitHub, and you can sign in to Google.

## This week's build: your "I am ready" proof

Before Week 1, put together one short proof that your kit is ready. This is your first tiny assignment:
1. A screenshot of **Excel open** (installed or online) with the empty grid showing.
2. A screenshot or the **link to your GitHub** `data-analysis-portfolio` page.
3. A one-line note: *"My four practice CSV files are downloaded and my GitHub and Google accounts are ready."*

*Quick win: paste your GitHub repo link somewhere safe (a notes app or a document). You will add a project to it almost every week for the next 12 weeks.*

# Part 2 - Install these ONLY when the course tells you to

**Do not do this section today.** Each tool below is for a specific later week. Come back and do just one step when you reach that week. Doing them early is the most common way beginners get stuck and give up.

<details>
<summary><strong>SQLite database - you need this in Week 5 (not before)</strong></summary>

**What it is:** a free program for storing data and asking it questions with SQL. SQL appears on almost every analyst job advert.

**When Week 5 arrives, do this:**
1. Go to **sqlitebrowser.org/dl** and download **"DB Browser for SQLite"** for your system (Windows or Mac). Install it with the default options (just keep clicking Next / Continue).
2. Open the program. Click **New Database** and save it as `naijamart.db` in an easy-to-find place.
3. Click **File -> Import -> Table from CSV file** and choose `orders_clean.csv`. In the import box, set the **table name to `orders`** (type over the suggested name), tick **"Column names in first line"**, and click OK.
4. Import `customers.csv` as a table named `customers`, and `products.csv` as a table named `products`, the same way.
5. Click **Write Changes** (or press Ctrl+S) to save.
6. Click the **Execute SQL** tab, type `SELECT * FROM orders LIMIT 5;` and press **Ctrl+Enter**.

**You have done this right when:** five rows of orders appear in the results grid at the bottom.

</details>

<details>
<summary><strong>Python - you need this in Week 7 (not before)</strong></summary>

**What it is:** a programming language that lets you repeat an analysis on new data in seconds. We use the free online version first so there is nothing to install.

**When Week 7 arrives, do this (easiest, no install):**
1. Go to **colab.research.google.com** and sign in with the Google account you made in Part 1.
2. Click **New notebook**.
3. In the first box (called a "cell"), type exactly: `print("Hello, Innovatech World")`
4. Press **Shift+Enter** to run it.
5. To use a file later, click the **folder icon** on the left, then the **upload** icon, and choose a CSV.

**You have done this right when:** the words `Hello, Innovatech World` appear under the cell with no red error.

> Prefer Python on your own laptop instead of online? Download **Anaconda** from anaconda.com/download, open **Anaconda Navigator**, launch **JupyterLab**, and run the same `print` line. Online Colab is the recommended path if your internet or power is unreliable, because it saves your work to the cloud.

</details>

<details>
<summary><strong>Power BI Desktop - you need this in Week 10 (not before)</strong></summary>

**What it is:** the tool analysts use to build interactive dashboards that managers click through. **Windows only.**

**When Week 10 arrives, do this:**
1. On Windows: open the **Microsoft Store**, search **"Power BI Desktop"**, and click **Get / Install**. (Or download from powerbi.microsoft.com/desktop.)
2. Open it and close the welcome pop-up so you can see the three buttons on the left: **Report**, **Table**, and **Model** views.
3. **Using a Mac?** Power BI does not run on Mac. Plan ahead now: arrange to use a Windows computer (a friend's, the office, or a cyber cafe with permission) for Weeks 10 and 11.

**You have done this right when:** Power BI Desktop opens and you can see the Report, Table, and Model view buttons.

</details>

<details>
<summary><strong>Kaggle account - handy from Week 7, optional</strong></summary>

**What it is:** a free website with practice datasets and short free courses.

**When you want extra practice, do this:**
1. Go to **kaggle.com** and create a free account (you can sign in with Google).
2. Browse **Datasets** for practice data and **Learn** for free micro-courses on Python, pandas, and SQL.

**You have done this right when:** you can open your Kaggle home page while signed in.

</details>

## Free learning resources used throughout

You do not need these to pass. They are free extra help if a topic is not clicking.

| Resource | Best for | Where |
|---|---|---|
| Microsoft Learn | Excel and Power BI official training | learn.microsoft.com |
| SQLBolt | Interactive SQL lessons | sqlbolt.com |
| Mode SQL Tutorial | SQL for analysts | mode.com/sql-tutorial |
| W3Schools SQL / Python | Quick syntax reference | w3schools.com |
| Kaggle Learn | Python, pandas, SQL micro-courses | kaggle.com/learn |
| pandas documentation | Reference | pandas.pydata.org/docs |
| Khan Academy Statistics | Statistics fundamentals | khanacademy.org |

Helpful YouTube channels (search the topic named each week): Alex The Analyst, freeCodeCamp.org, Kevin Stratvert, Leila Gharani, ExcelIsFun, Corey Schafer, Keith Galli, Programming with Mosh, StatQuest with Josh Starmer, Guy in a Cube, Curbal.

## Facilitator Notes

Run every first install live in the session; this single hour prevents most week-one drop-off. The new structure is deliberate: students should leave the first session having done only Part 1 (Excel + accounts + downloaded files). Do NOT install SQLite, Python, or Power BI in week one, even if a keen student asks - it creates confusion about what is needed when. Walk the room during Part 1 and fix issues on the spot: creating the Microsoft account for web Excel, GitHub username choices, and confirming the four CSVs actually landed in Downloads. When you reach Weeks 5, 7, and 10, reopen this guide and do that one Part 2 install together at the start of the session. Confirm Mac students have a Windows plan before Week 10. For weak laptops or unreliable power, steer students to web Excel and Google Colab. Verify every external link before class, as download URLs drift. Have students who finish early help the next person.
