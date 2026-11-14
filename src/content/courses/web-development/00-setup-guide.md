---
title: "Setup Guide: Your Developer Environment"
course: web-development
order: 0
phase: "Getting Started"
summary: "Get your machine ready to build the web: install the real tools professionals use, then prove each one works with a quick hands-on check."
estimatedHours: 3
tools: ["VS Code", "Chrome / Edge", "Git & GitHub", "Node.js"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
---

**Goal:** In one sitting you'll set up the exact toolkit real developers use, and prove each piece works
with a quick hands-on check. Less reading, more installing and clicking. By the end your machine is ready
to write code, run it in a browser, and publish it online.

Do this guide **before** Week 1, ideally live with your facilitator, because installing alone is where
most beginners get stuck. Work top to bottom and tick the checklist at the end.

## What you'll be able to do

- Write code in **VS Code** with the right extensions switched on
- Open **DevTools** and poke at any live web page
- Track work with **Git** and publish it from a secure **GitHub** account
- Run **Node.js** (you need it from Week 8)
- Keep clean, professional folder and file names
- Fall back to a browser editor when your laptop or power is limited

## Before you start (about 10 minutes)

- Make sure you have a stable-enough internet connection for a few downloads.
- Open your browser and keep this guide on screen while you work.
- Quick win: by the end of this page you'll have inspected a real website's code and pushed nothing is
  wasted, every step below produces something you can see.

## Try it 1 - Install VS Code, your code editor

**Why it matters:** this is where you'll live for the next 12 weeks. A good setup saves you hours.

**Do this now:**
1. Go to **code.visualstudio.com** and download **VS Code** for your system, then run the installer.
2. On Windows, on the "Additional Tasks" screen, tick **"Add to PATH"** and **"Open with Code"**.
3. Open VS Code, open the Extensions panel (`Ctrl+Shift+X`), and install:

| Extension | Why |
|---|---|
| **Live Server** (Ritwick Dey) | Opens your HTML in a browser that refreshes as you save |
| **Prettier - Code formatter** | Formats your code neatly and consistently |
| **ESLint** (optional, later) | Flags JavaScript mistakes as you type |

4. Open **File, Preferences, Settings** (`Ctrl+,`) and turn on: **Auto Save** set to `afterDelay`,
   **Editor: Format On Save** ticked, and the **default formatter** set to **Prettier**.

**You've got it when:** VS Code opens, and when you save a messy file it tidies itself automatically.

> **macOS note:** Download the Mac build, drag VS Code into Applications, open it. Extensions and settings
> are identical.

## Try it 2 - Open DevTools on a real site

**Why it matters:** DevTools lets you see and tweak the code behind any page on the internet. It's the
single most useful habit you'll build.

**Do this now:**
1. Install **Google Chrome** or use **Microsoft Edge** (already on Windows).
2. Open any website, right-click a heading, and choose **Inspect**. Press `F12` to toggle the panel.
3. In the **Elements** tab, find the page's `<h1>`. Double-click its text and change it, then watch the
   page update live.

**You've got it when:** you've edited a real website's heading in your own browser (it only changes for
you, and resets on refresh).

## Try it 3 - Install Git and verify it

**Why it matters:** Git records the history of your work so you never lose it. Employers read your Git
history.

**Do this now:**
1. Go to **git-scm.com**, download **Git for Windows**, and run the installer (the defaults are fine).
2. Open VS Code's terminal (**Terminal, New Terminal**, or `` Ctrl+` ``) and run:

```bash
git --version
```

3. Tell Git who you are (once), using the **same email** you'll use for GitHub:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

**You've got it when:** `git --version` prints a version number.

> **macOS note:** Open the **Terminal** app and type `git --version`. If Git is missing, macOS offers to
> install the Command Line Tools, accept it.

## Try it 4 - Create a professional GitHub account

**Why it matters:** from Week 1, GitHub is your public CV. Treat it like one from day one.

**Do this now:**
1. Go to **github.com** and sign up.
2. Pick a **professional username**, ideally your name, like `firstname-lastname-dev`. This becomes part of
   your portfolio URL, so no nicknames.
3. Turn on **two-factor authentication** (Settings, Password and authentication).

**You've got it when:** you can log in to GitHub, your username looks professional, and 2FA is on.

## Try it 5 - Install Node.js

**Why it matters:** Node runs JavaScript outside the browser and powers the tools you meet from Week 8.
Install it now so there's no scramble later.

**Do this now:**
1. Go to **nodejs.org** and download the **LTS** version (the stable one). Install with defaults.
2. Verify in the terminal:

```bash
node -v
npm -v
```

**You've got it when:** both commands print version numbers.

## Try it 6 - Create a free Supabase account

**Why it matters:** in Week 11 you add a real database. Having the account ready saves time later.

**Do this now:**
1. Go to **supabase.com** and sign up (you can use your GitHub account).
2. **Do not create a project yet.** You'll set that up step by step in Week 11.

**You've got it when:** you can log in to Supabase and see the dashboard.

## Try it 7 - Set up clean project folders

**Why it matters:** sloppy file names cause broken links online. Good habits now save hours of debugging.

**Do this now:**
1. In your user folder, create this structure:

```
projects/
└── web-dev/
    ├── week-01/
    ├── week-02/
    └── ...
```

2. Follow these naming rules all course: lowercase only, hyphens instead of spaces (`about-me.html`, not
   `About Me.html`), no capitals or special characters, and the homepage of any site is always
   `index.html`.

**You've got it when:** you have a `projects/web-dev/` folder with lowercase, hyphenated names.

> **Warning:** Spaces and capitals break links online, especially on GitHub Pages (which is
> case-sensitive). `Index.HTML` and `index.html` are different files to a web server. Build the habit now.

## When your laptop or power is unreliable

You can still do this whole course:

- **Browser editors:** **StackBlitz** (stackblitz.com) and **CodeSandbox** (codesandbox.io) run VS
  Code-like editors in your browser, useful for Weeks 8 to 11. Free-tier limits change, so check their
  current terms.
- **Offline habits:** download the docs you need, work in battery-saver mode, **commit often**, and
  **push to GitHub when you next have internet**. Git works fully offline, only pushing needs a connection.
- Keep pages light (small images, little JavaScript). Good for your low-data testing and good for your
  future users, many of whom are on phones and slow data.

## Verification checklist

Tick each item and show your facilitator:

- [ ] VS Code opens; Live Server and Prettier installed; format-on-save works
- [ ] `git --version` prints a version
- [ ] `git config --global user.name` and `user.email` are set
- [ ] GitHub account created with a professional username and **2FA on**
- [ ] `node -v` and `npm -v` both print versions
- [ ] A free Supabase account exists (no project yet)
- [ ] A `projects/web-dev/` folder exists with lowercase, hyphenated names
- [ ] You can open DevTools (`F12`) and find an element on a page

## Facilitator Notes

Do this live in session one. The three reliable blockers are: Git not on PATH (restart the terminal or
VS Code after install), the student using a Microsoft account email that differs from their GitHub email
(reconcile early), and spaces/capitals in file names (enforce the naming rule hard now, it saves hours of
broken-link debugging on GitHub Pages later). For students on very weak machines, set them up on
StackBlitz from the start and treat local installs as a stretch goal. Make the DevTools "edit a live
page" moment land, it is the first time most learners feel the web is theirs to change.

## Can you do these now?

1. Why must file names avoid spaces and capital letters?
2. What is the difference between Git and GitHub?
3. Which parts of Git work without internet, and which need a connection?
4. What does the browser's DevTools let you do?
