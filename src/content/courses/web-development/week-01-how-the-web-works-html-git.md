---
title: "How the Web Works, HTML & Git/GitHub"
course: web-development
order: 1
week: 1
phase: "Foundations"
summary: "Write your first real web page and get it live on the internet this week, with a link you can send to anyone."
estimatedHours: 11
tools: ["VS Code", "Git & GitHub", "Chrome / Edge"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
---

**Goal:** By the end of this week you'll have a real web page **live on the internet** with a link you can
share. You turn from someone who uses the web into someone who builds it. Almost all doing, very little
reading.

## What you'll be able to do

- Say, in plain words, what happens when you open a website
- Write a valid HTML page with headings, paragraphs, lists, links and images
- Link pages and images together with correct file paths
- Track your work with Git and push it to GitHub
- Publish a page on **GitHub Pages** and share the live link

## Before you start (about 10 minutes)

- You set up VS Code (with Live Server), Git, and a GitHub account with 2FA in the Setup Guide. If you
  skipped it, do it now.
- Download the [Fresh Bites content kit](/downloads/web-development/fresh-bites-content.zip) and unzip it
  somewhere you can find it, you'll pull images and menu text from it.
- Warm-up (2 minutes): open any website, press `F12`, and in the Elements tab find one `<h1>` and one
  `<p>`. You're about to write those yourself.

## Try it 1 - See how the web works in 60 seconds

**Why it matters:** once you've pictured the request-and-response trip, every other step makes sense.

**Do this now:**
1. Open a new browser tab and type a full address, for example `developer.mozilla.org`, then press Enter.
2. As the page loads, say out loud: "My browser just sent a request to a server, and the server sent back
   the page."
3. Map it to ordering food at Fresh Bites:

| Restaurant | Web | What it means |
|---|---|---|
| Customer | **Browser** (Chrome, Edge) | The program you use to view sites |
| Order ("jollof, please") | **Request** | "Please send me this page" |
| Address of the restaurant | **URL** | Where the site lives |
| Kitchen | **Server** | A computer that stores and sends the site |
| The meal delivered | **Response** | The HTML, CSS and images sent back |
| The shared language | **HTTP** | The rules requests and responses follow |

**You've got it when:** you can explain, in one sentence, what happens between typing a URL and seeing a
page. Remember the three languages of the web: **HTML** (structure, this week), **CSS** (style, Weeks 3 to
4), **JavaScript** (behaviour, Weeks 5 to 7).

## Try it 2 - Write and run your first page

**Why it matters:** this is the moment you become a builder. Typing it (not pasting) builds muscle memory.

**Do this now:**
1. Make a folder `projects/web-dev/week-01`, open it in VS Code, and create a file called `index.html`.
2. **Type this out** (don't paste):

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

3. Right-click the file and choose **"Open with Live Server"**. Your page opens and refreshes every time
   you save. Change the `<h1>` text, save, and watch it update.

**You've got it when:** your page is open in the browser and updates live as you edit. That `<head>` holds
info about the page (character set, phone-friendly `viewport`, the tab `<title>`); the `<body>` holds
everything you see.

## Try it 3 - Learn HTML by building, not reading

**Why it matters:** HTML is just content wrapped in tags. Build a few and it clicks fast.

**Do this now, add each of these to your page and save after every one:**
1. An element is content wrapped in tags: `<p>I love jollof rice.</p>` (opening tag, content, closing tag).
2. Add headings and lists:

```html
<h1>Main heading</h1>
<h2>Section heading</h2>

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
```

3. Add a link and an image (grab an SVG from the content kit's `images` folder):

```html
<a href="menu.html">See our menu</a>
<img src="images/dish-placeholder.svg" alt="A plate of jollof rice" />
```

**You've got it when:** your page shows a heading, a bulleted list, a numbered list, a link and an image.
Rules to keep: one `<h1>` per page, use heading levels in order, and every `<img>` **must** have `alt`
text.

> **Quick win:** break something on purpose. Delete a closing `</p>` tag, save, and see what happens. Then
> fix it. Crossed tags (`<b><i>text</b></i>`) are wrong, close in reverse order (`<b><i>text</i></b>`).

## Try it 4 - Link files the right way

**Why it matters:** wrong paths are the number-one cause of broken images and dead links online.

**Do this now:**
1. Create a second file `favourites.html` in the same folder.
2. Link to it from `index.html` with a **relative path**: `<a href="favourites.html">My favourites</a>`.
3. Link back to home from `favourites.html`. Click between them in the browser.

**You've got it when:** you can move between both pages by clicking. Remember: `menu.html` is the same
folder, `images/logo.svg` is inside a folder, `../about.html` goes up one folder. Paths are case-sensitive
online, so stick to lowercase, hyphenated names.

## Try it 5 - Track your work with Git

**Why it matters:** Git saves snapshots of your project so you never lose work, and your commit history
tells your story to employers.

**Do this now,** in VS Code's terminal (`` Ctrl+` ``) inside your `week-01` folder:

```bash
git init                       # start tracking this folder
git status                     # see what changed
git add index.html             # stage a file (or: git add . for everything)
git commit -m "Add my first HTML page"
git log --oneline              # see your history
```

Then create a `.gitignore` file to keep junk out:

```
# .gitignore
.DS_Store
Thumbs.db
```

**You've got it when:** `git log --oneline` shows at least one clear commit. Commit often, after each small
working change. Good messages read like a done to-do: "Add menu page", "Fix broken image link".

## Try it 6 - Publish on GitHub Pages

**Why it matters:** this is the payoff, your work goes live for the whole world.

**Do this now:**
1. On **github.com**, click **New**, name the repository `fresh-bites` (lowercase), keep it **Public**,
   don't add a README.
2. GitHub shows "push an existing repository" commands. Run them in your terminal:

```bash
git remote add origin https://github.com/YOUR-USERNAME/fresh-bites.git
git branch -M main
git push -u origin main
```

3. On the repo page, go to **Settings, Pages**. Under "Source" choose **Deploy from a branch**, pick
   **`main`** and **`/ (root)`**, and **Save**.
4. Wait a minute, refresh, and open your live URL: `https://YOUR-USERNAME.github.io/fresh-bites/`.

**You've got it when:** your page loads from a `github.io` link you can send to a friend. If you see a 404,
wait 1 to 2 minutes and check your homepage is named exactly `index.html`.

### Watch out for

- Forgetting a closing tag, misspelling a tag, or crossing nested tags
- Capitals or spaces in file names (they break links online)
- An `<img>` with no `alt` text
- A GitHub Pages 404, usually a wrong file name or Pages not pointed at `main`/root

## This week's build: your first live two-page site

Build and **publish** a small, real two-page site you'd be happy to share:

1. An **"About Me"** page (`index.html`): who you are, why you're learning to code, and your goals.
2. A **Fresh Bites "Home"** content page (`freshbites.html`): the business name, a tagline, a short
   welcome paragraph, and a bulleted list of 4 to 6 menu items with prices in Naira.
3. Both pages link to each other, and at least one image shows with good `alt` text.
4. Published on **GitHub Pages** with at least **8 meaningful commits**.

*Tip: send your live link to a friend or family member this week. Shipping something real is the whole
point.*

### Grading guide

| Criteria | % |
|---|---|
| Valid HTML, correct structure (doctype, head, body, headings order) | 25 |
| Content complete and sensible (both pages, menu list) | 20 |
| Working links between pages and a working image with alt text | 15 |
| Published live on GitHub Pages (link works) | 20 |
| Git history: 8+ clear, well-named commits | 20 |

### Definition of done

- [ ] The live GitHub Pages link opens and shows your pages
- [ ] Links between pages work
- [ ] At least one image shows, with meaningful `alt` text
- [ ] `git log --oneline` shows 8+ clear commits
- [ ] File names are lowercase and hyphenated; homepage is `index.html`

## Extra quick wins (optional)

- Add an ordered list "How to order at Fresh Bites" with four steps.
- Build a `menu.html` listing six items from the kit's `menu.json`, linked from the home page.
- Add a list of five Nigerian foods you like, each with one line on why.

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0-10 | Review Week 0 checklist; confirm everyone's tools work |
| 10-30 | Live: build a page together, explaining each tag; use DevTools to inspect it |
| 30-55 | Live: `git init` to `add` to `commit` to `push`, then enable GitHub Pages together |
| 55-80 | Pair work: student starts the build while you circulate |
| 80-90 | Brief the build; set the Definition of done; agree next session time |

## Facilitator Notes

The two reliable blockers this week are Git authentication on first push (use the browser sign-in flow;
avoid typing passwords in the terminal) and GitHub Pages 404s (almost always a wrong file name or Pages
not pointed at `main`/root). Have the student say aloud what each HTML tag means as they type, passive
copying is the enemy. The "Try it 6" moment of seeing their own link go live is the emotional high of the
week, make time for it in session. Praise frequent commits; a messy single "final" commit is a red flag
you should correct now, before habits set.

## Can you do these now?

1. In your own words, what happens between typing a URL and seeing a page?
2. What is the difference between a relative and an absolute path?
3. What do `git add` and `git commit` each do?
4. Why must every `<img>` have an `alt` attribute?
5. What must your homepage file be named for GitHub Pages to show it?
