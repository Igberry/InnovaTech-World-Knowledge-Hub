---
title: "How the Web Works, HTML & Git/GitHub"
course: web-development
order: 1
week: 1
phase: "Foundations"
summary: "Understand how the web works, write your first HTML, and publish it online with Git and GitHub."
estimatedHours: 11
tools: ["VS Code", "Git & GitHub", "Chrome / Edge"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
---

**Goal:** Understand how the web works, write your first web page in HTML, and publish it online for
free using Git and GitHub.

This week turns you from someone who *uses* the web into someone who *builds* it. By the end you will
have a real page live on the internet with a link you can share.

## Learning Objectives

By the end of this week you can:

- Explain in plain words what happens when you open a website
- Write a valid HTML page using headings, paragraphs, lists, links and images
- Use correct file paths to link pages and images together
- Track your work with Git (`init`, `add`, `commit`) and push it to GitHub
- Publish a page on **GitHub Pages** and share the live link

## Tools to Install This Week

You set these up in the **Setup Guide** (Week 0): VS Code (with Live Server), Git, and a GitHub
account with two-factor authentication. If you skipped it, do it now.

## Pre-Session Resources (about 2 hours)

- Read: **developer.mozilla.org** → search "MDN HTML basics" and "MDN How the web works".
- Watch (search YouTube): *"Traversy Media HTML Crash Course"* and *"SuperSimpleDev how the internet works"*.
- Interactive: **theodinproject.com** → the Foundations "HTML Foundations" lessons.
- Reference: **docs.github.com** → search "GitHub Pages quickstart".

## Lesson 1: How the web works (plain language)

Think of ordering food at Fresh Bites. You (the **customer**) tell a **waiter** what you want. The
waiter takes it to the **kitchen**, which prepares it and sends it back. The web works the same way:

| Restaurant | Web | What it means |
|---|---|---|
| Customer | **Browser** (Chrome, Edge) | The program you use to view sites |
| Order ("jollof, please") | **Request** | "Please send me this page" |
| Address of the restaurant | **URL** (e.g. `freshbites.example`) | Where the site lives |
| Kitchen | **Server** | A computer that stores and sends the website |
| The meal delivered | **Response** (the web page) | The HTML, CSS and images sent back |
| The language you both speak | **HTTP** | The rules for how requests and responses travel |

So: you type a **URL**, the **browser** sends an **HTTP request** to a **server**, and the server
sends back a **response** - the files that make up the page. The browser then draws the page on screen.

**Three languages build every web page:**

- **HTML** - the structure and content (headings, text, images). *This week.*
- **CSS** - the styling (colours, layout, fonts). *Weeks 3–4.*
- **JavaScript** - the behaviour (clicks, interactivity). *Weeks 5–7.*

> **Note:** "Frontend" means the part users see (HTML/CSS/JS in the browser). "Backend" means the
> server and database behind the scenes. "Full-stack" means both. You'll touch the backend in Week 11.

## Lesson 2: Your first HTML page

Create a folder `projects/web-dev/week-01`, open it in VS Code, and make a file called `index.html`.
**Type this (don't paste)** - typing builds muscle memory:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, Yenagoa!</h1>
    <p>This is my first web page. I am learning web development.</p>
  </body>
</html>
```

Right-click the file in VS Code and choose **"Open with Live Server"**. Your page opens in the browser
and refreshes every time you save. Congratulations - you are writing the web.

**What each part does:**

- `<!DOCTYPE html>` tells the browser "this is modern HTML".
- `<html lang="en">` wraps the whole page and states the language (good for accessibility).
- `<head>` holds information *about* the page (not shown in the body): the character set, the
  `viewport` (makes it work on phones), and the `<title>` (shown on the browser tab).
- `<body>` holds everything you actually see.

## Lesson 3: HTML anatomy - elements, tags, attributes

An **element** is a piece of content wrapped in **tags**:

```html
<p>I love jollof rice.</p>
```

- `<p>` is the **opening tag**, `</p>` is the **closing tag**, and the text between is the content.
- Some elements are **empty** (no closing tag), like an image: `<img src="logo.svg" alt="Logo" />`.
- **Attributes** give extra information inside the opening tag: `src` and `alt` above are attributes.

Elements **nest** inside each other, like boxes inside boxes. Indent your code so the nesting is clear:

```html
<body>
  <main>
    <h1>Fresh Bites</h1>
    <p>Fresh, local, made to order.</p>
  </main>
</body>
```

> **Common mistakes:** forgetting a closing tag, spelling a tag wrong, or crossing tags (`<b><i>text</b></i>`
> - wrong; close in reverse order: `<b><i>text</i></b>`).

## Lesson 4: The content elements you need this week

```html
<h1>Main heading</h1>
<h2>Section heading</h2>
<h3>Smaller heading</h3>

<p>A paragraph of text.</p>

<ul>
  <li>Jollof Rice</li>
  <li>Suya Platter</li>
  <li>Puff Puff</li>
</ul>

<ol>
  <li>Choose your meal</li>
  <li>Place your order</li>
  <li>Enjoy</li>
</ol>

<a href="menu.html">See our menu</a>

<img src="images/dish-placeholder.svg" alt="A plate of jollof rice" />
```

- Use **one `<h1>` per page**, then `<h2>`, `<h3>` in order - don't skip levels. This is about meaning,
  not size (CSS controls size later).
- `<ul>` is an unordered (bulleted) list; `<ol>` is ordered (numbered). Each item is an `<li>`.
- `<a href="...">` makes a link. `<img>` shows an image and **must** have `alt` text describing it.

### Paths: how files find each other

- **Relative path** (recommended): where a file is *relative to the current file*.
  - `menu.html` - a file in the same folder.
  - `images/logo.svg` - the `logo.svg` inside an `images` folder next to this file.
  - `../about.html` - go up one folder, then find `about.html`.
- **Absolute path**: a full web address, e.g. `https://example.com/menu.html`. Use these only for
  *other* websites.

> **Warning:** paths are case-sensitive on the web. `Images/Logo.SVG` ≠ `images/logo.svg`. Stick to
> lowercase, hyphenated names (Setup Guide, section 6).

## Lesson 5: Git - track your work

**Git** records snapshots ("commits") of your project so you never lose work and can see your history.
Open VS Code's terminal (`` Ctrl+` ``) in your `week-01` folder and run:

```bash
git init
```

This creates a hidden `.git` folder - your project is now tracked. The core loop is **add → commit**:

```bash
git status                     # see what changed
git add index.html             # stage a file (or: git add . for everything)
git commit -m "Add my first HTML page"
git log --oneline              # see your history
```

- `git add` chooses what goes into the next snapshot.
- `git commit -m "message"` saves the snapshot with a **clear message** (what you did, present tense).
- Commit **often** - after each small, working change. Aim for many small commits, not one giant one.

Create a `.gitignore` file to keep junk out of Git (you'll use it more later):

```
# .gitignore
.DS_Store
Thumbs.db
```

> **Tip:** Good commit messages read like a to-do done: "Add menu page", "Fix broken image link",
> "Add opening hours to home page". Facilitators grade your commit history, so make it tell a story.

## Lesson 6: Publish on GitHub Pages

1. On **github.com**, click **New** to create a repository. Name it `fresh-bites` (lowercase). Keep it
   **Public**. Don't add a README for now.
2. GitHub shows commands to "push an existing repository". In your terminal, run them - they look like:

```bash
git remote add origin https://github.com/YOUR-USERNAME/fresh-bites.git
git branch -M main
git push -u origin main
```

(The first time, GitHub asks you to sign in - follow the browser prompt.)

3. On the repository page, go to **Settings → Pages**. Under "Source", choose **Deploy from a branch**,
   pick **`main`** and **`/ (root)`**, and **Save**.
4. Wait a minute, refresh, and GitHub shows your live URL:
   `https://YOUR-USERNAME.github.io/fresh-bites/`. Open it - your page is on the internet.

> **Note:** GitHub Pages can take 1–2 minutes to update after a push. If you see a 404, wait and
> refresh. Make sure your homepage file is named exactly `index.html`.

## Practice Exercises

Build these in your `week-01` folder, committing after each.

1. **Easy:** Make a page with your name as an `<h1>` and three paragraphs about why you're learning web
   development.
2. **Easy:** Add an unordered list of five Nigerian foods you like.
3. **Medium:** Add a second page `favourites.html` and link to it from `index.html` and back.
4. **Medium:** Add an image using one of the SVGs from the Fresh Bites content kit, with good `alt` text.
5. **Medium:** Create an ordered list titled "How to order at Fresh Bites" with four steps.
6. **Stretch:** Make a `menu.html` page listing six Fresh Bites items (from `menu.json` in the kit) as a
   heading + paragraph each. Link it from the home page.
7. **Stretch:** Commit your work with at least six clear messages and push it all to GitHub.

## Weekly Assignment (Due Before Week 2)

Build and **publish** a small two-page site:

1. An **"About Me"** page (`index.html`): who you are, why you're learning to code, and your goals.
2. A **Fresh Bites "Home"** content page (`freshbites.html` or a second repo): the business name,
   tagline, a short welcome paragraph, and a bulleted list of 4–6 menu items with prices in Naira.
3. Both pages link to each other.
4. Published on **GitHub Pages**, with at least **8 meaningful commits**.

**Grading guide (100%):**

| Criteria | % |
|---|---|
| Valid HTML, correct structure (doctype, head, body, headings order) | 25 |
| Content complete and sensible (both pages, menu list) | 20 |
| Working links between pages and a working image with alt text | 15 |
| Published live on GitHub Pages (link works) | 20 |
| Git history: 8+ clear, well-named commits | 20 |

**Definition of done:**

- [ ] The live GitHub Pages link opens and shows your pages
- [ ] Links between pages work
- [ ] At least one image shows, with meaningful `alt` text
- [ ] `git log --oneline` shows 8+ clear commits
- [ ] File names are lowercase and hyphenated; homepage is `index.html`

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0–10 | Review Week 0 checklist; confirm everyone's tools work |
| 10–30 | Live: build a page together, explaining each tag; use DevTools to inspect it |
| 30–55 | Live: `git init → add → commit → push`, then enable GitHub Pages together |
| 55–80 | Pair work: student starts the assignment while you circulate |
| 80–90 | Brief the assignment; set the Definition of done; agree next session time |

## Facilitator Notes

The two reliable blockers this week are Git authentication on first push (use the browser sign-in flow;
avoid typing passwords in the terminal) and GitHub Pages 404s (almost always a wrong file name or
Pages not pointed at `main`/root). Have the student *say aloud* what each HTML tag means as they type -
passive copying is the enemy. Praise frequent commits; a messy single "final" commit is a red flag you
should correct now, before habits set.

## Self-Check Questions

1. In your own words, what happens between typing a URL and seeing a page?
2. What is the difference between a relative and an absolute path?
3. What do `git add` and `git commit` each do?
4. Why must every `<img>` have an `alt` attribute?
5. What must your homepage file be named for GitHub Pages to show it?
