---
title: "Setup Guide: Your Developer Environment"
course: web-development
order: 0
phase: "Getting Started"
summary: "Install and configure everything you need to write, run and publish code."
estimatedHours: 3
tools: ["VS Code", "Chrome / Edge", "Git & GitHub", "Node.js"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
---

**Goal:** Set up a clean, professional developer environment on your computer (Windows first, with
macOS notes), so that from Week 1 you can write code, run it in a browser, and publish it online.

Do this guide **before** Week 1 - ideally together with your facilitator in the first session, because
installing alone is where most beginners get stuck. Work through it top to bottom and tick the
checklist at the end.

## Learning Objectives

By the end you can:

- Install and configure **VS Code** with the right extensions
- Open a web page and use the browser **DevTools**
- Install and configure **Git**, and create a secure **GitHub** account
- Install **Node.js** (needed from Week 8) and verify it
- Organise your project folders with clean, professional names
- Fall back to a browser-based editor when your laptop or power is limited

## 1. VS Code (your code editor)

VS Code is a free, professional editor from Microsoft.

1. Go to **code.visualstudio.com** and download **VS Code** for your system.
2. On Windows, run the installer. On the "Additional Tasks" screen, tick **"Add to PATH"** and
   **"Open with Code"** options - they make life easier later.
3. Open VS Code.

### Extensions to install

Open the Extensions panel (the squares icon on the left, or `Ctrl+Shift+X`) and install:

| Extension | Why |
|---|---|
| **Live Server** (Ritwick Dey) | Opens your HTML in a browser that refreshes as you save |
| **Prettier – Code formatter** | Formats your code neatly and consistently |
| **ESLint** *(optional, later)* | Flags JavaScript mistakes as you type |

### Settings to turn on

Open **File → Preferences → Settings** (`Ctrl+,`) and set:

- **Auto Save** → `afterDelay`
- Search "format on save" and tick **Editor: Format On Save**
- Search "default formatter" and set it to **Prettier**

> **Tip:** Type `settings.json` in the settings search, click "Edit in settings.json", and you can keep
> these as text. You will meet JSON (a data format) properly in Week 7 - for now just know the editor
> stores its settings this way.

> **macOS note:** Download the Mac build, drag VS Code into Applications, and open it. Extensions and
> settings are identical.

## 2. A modern browser + DevTools

Install **Google Chrome** or **Microsoft Edge** (Edge is already on Windows). Both have excellent
developer tools.

- Open any website, right-click a heading, and choose **Inspect**. The panel that opens is **DevTools**.
- Press `F12` to toggle it. You will live here: the **Elements** tab shows the page structure, the
  **Console** shows messages and errors.

Try it now: open DevTools on this page and find the `<h1>` in the Elements tab.

## 3. Git and GitHub

**Git** tracks the history of your code. **GitHub** stores it online and publishes it for free.

### Install Git (Windows)

1. Go to **git-scm.com** and download **Git for Windows**.
2. Run the installer. The defaults are fine - keep clicking **Next**. (When asked for the default
   editor, you can choose VS Code.)
3. Open VS Code's terminal (**Terminal → New Terminal**, or `Ctrl+` backtick) and check:

```bash
git --version
```

You should see a version number.

> **macOS note:** Open the **Terminal** app and type `git --version`. If Git is not installed, macOS
> will offer to install the Command Line Tools - accept.

### Tell Git who you are (once)

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Use the **same email** you will use for GitHub.

### Create a GitHub account

1. Go to **github.com** and sign up.
2. Pick a **professional username** - ideally your name, e.g. `firstname-lastname-dev`. This becomes
   part of your portfolio URL, so no nicknames.
3. **Turn on two-factor authentication** (Settings → Password and authentication). This protects your
   work and is expected of professionals.

> **Important:** From Week 1 you publish your work on GitHub. Treat your GitHub profile as your public
> CV from day one - clean usernames, clear project names, real README files.

## 4. Node.js (needed from Week 8)

Node.js lets you run JavaScript outside the browser and use developer tools like Vite.

1. Go to **nodejs.org** and download the **LTS** version (the stable one).
2. Install it with the defaults.
3. Verify in the terminal:

```bash
node -v
npm -v
```

Both should print version numbers. You don't use Node much until Week 8, but installing it now avoids
a scramble later.

## 5. A free Supabase account (needed Week 11)

In Week 11 you add a database. Create a free account now so it's ready:

1. Go to **supabase.com** and sign up (you can use your GitHub account).
2. **Do not create a project yet** - you'll set it up step by step in Week 11.

## 6. Organise your folders

Create a clean home for your work. In your user folder, make:

```
projects/
└── web-dev/
    ├── week-01/
    ├── week-02/
    └── ...
```

**File and folder naming rules (follow these all course):**

- lowercase only
- hyphens instead of spaces: `about-me.html`, not `About Me.html`
- no spaces, no capital letters, no special characters
- the homepage of any site is always `index.html`

> **Warning:** Spaces and capitals in file names cause broken links online, especially on GitHub Pages
> (which is case-sensitive). `Index.HTML` and `index.html` are different files to a web server. Build
> the habit now.

## 7. Fallbacks for weak laptops or unreliable power/internet

If your laptop struggles or power is unreliable, you can still do this course:

- **Browser-based editors:** **StackBlitz** (stackblitz.com) and **CodeSandbox** (codesandbox.io) run
  VS Code-like editors in your browser - useful for Weeks 8–11 when projects get heavier. Free-tier
  limits can change, so check their current terms.
- **Offline habits:** download the docs pages you need, work in battery-saver mode, **commit often**,
  and **push to GitHub when you next have internet**. Git works fully offline - only pushing needs a
  connection.
- Keep pages light (small images, little JavaScript) - good for your own low-data testing and good for
  your future users, many of whom are on phones and slow data.

## Verification checklist

Tick each item and show your facilitator:

- [ ] VS Code opens; Live Server and Prettier are installed; format-on-save works
- [ ] `git --version` prints a version
- [ ] `git config --global user.name` and `user.email` are set
- [ ] GitHub account created with a professional username and **2FA on**
- [ ] `node -v` and `npm -v` both print versions
- [ ] A free Supabase account exists (no project yet)
- [ ] A `projects/web-dev/` folder exists with lowercase, hyphenated names
- [ ] You can open DevTools (`F12`) and find an element on a page

## Facilitator Notes

Do this live in session one. The three reliable blockers are: Git not on PATH (restart the terminal or
VS Code after install), the student using a Microsoft account email that differs from their GitHub
email (reconcile early), and spaces/capitals in file names (enforce the naming rule hard now, it saves
hours of broken-link debugging on GitHub Pages later). For students on very weak machines, set them up
on StackBlitz from the start and treat local installs as a stretch goal.

## Self-Check Questions

1. Why must file names avoid spaces and capital letters?
2. What is the difference between Git and GitHub?
3. Which parts of Git work without internet, and which need a connection?
4. What does the browser's DevTools let you do?
