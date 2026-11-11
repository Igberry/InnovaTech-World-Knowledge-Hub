---
title: "Semantic HTML, Forms & Accessibility"
course: web-development
order: 2
week: 2
phase: "Foundations"
summary: "Structure pages with meaningful HTML, build forms, and make your site usable by everyone."
estimatedHours: 11
tools: ["VS Code", "Chrome / Edge", "Git & GitHub"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
---

**Goal:** Build a complete, multi-page Fresh Bites site in HTML using *meaningful* elements, working
forms, and accessibility good practice — all before adding any CSS.

Good structure makes your site easier to style, easier to maintain, better for search engines, and
usable by people with disabilities. This is the foundation everything else sits on.

## Learning Objectives

By the end of this week you can:

- Structure a page with semantic landmarks (`header`, `nav`, `main`, `footer`, etc.)
- Build an accessible form with labels, inputs and validation attributes
- Explain and apply accessibility basics (alt text, labels, keyboard use, contrast)
- Add correct page metadata (`title`, description, viewport, favicon)
- Run a Lighthouse report and read the accessibility section

## Tools to Install This Week

Nothing new — keep using VS Code, Live Server, and Git from Week 1.

## Pre-Session Resources (about 2 hours)

- Read: **developer.mozilla.org** → search "MDN HTML semantic elements", "MDN HTML forms", and
  "MDN HTML accessibility".
- Learn: **web.dev/learn** → search "web.dev Learn HTML" and "web.dev Learn Accessibility".
- Watch (search YouTube): *"Kevin Powell semantic HTML"* and *"Web Dev Simplified HTML forms"*.

## Lesson 1: Semantic HTML — meaning, not just boxes

Early websites wrapped everything in `<div>` (a generic box). Modern HTML has **semantic** elements
that say what a section *is*. This helps browsers, search engines, and screen readers.

```html
<body>
  <header>
    <nav>
      <a href="index.html">Home</a>
      <a href="menu.html">Menu</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <main>
    <section>
      <h1>Welcome to Fresh Bites</h1>
      <p>Fresh, local, made to order.</p>
    </section>

    <article>
      <h2>Today's special</h2>
      <p>Smoky jollof rice with grilled chicken.</p>
    </article>
  </main>

  <aside>
    <h2>Opening hours</h2>
    <p>Mon–Fri, 9:00–21:00</p>
  </aside>

  <footer>
    <p>&copy; Fresh Bites, Yenagoa.</p>
  </footer>
</body>
```

| Element | Use it for |
|---|---|
| `<header>` | Top of the page or a section (logo, nav) |
| `<nav>` | A set of navigation links |
| `<main>` | The main content — **one per page** |
| `<section>` | A thematic grouping with its own heading |
| `<article>` | A self-contained piece (a review, a card, a blog post) |
| `<aside>` | Related but secondary content (hours, a sidebar) |
| `<footer>` | Bottom of the page or section (copyright, links) |

> **Tip:** Still use `<div>` and `<span>` — but only when no semantic element fits (usually for styling
> hooks). `<div>` groups block content; `<span>` wraps a bit of inline text.

### Heading hierarchy

Headings (`h1`–`h6`) form an outline of your page. Use them in order and don't skip levels. Screen
reader users navigate by headings, so this is about access, not size.

## Lesson 2: More content elements

```html
<figure>
  <img src="images/jollof.svg" alt="A plate of jollof rice and chicken" />
  <figcaption>Our signature jollof rice.</figcaption>
</figure>

<table>
  <caption>Opening hours</caption>
  <thead>
    <tr><th>Day</th><th>Hours</th></tr>
  </thead>
  <tbody>
    <tr><td>Monday</td><td>9:00–21:00</td></tr>
    <tr><td>Saturday</td><td>10:00–22:00</td></tr>
  </tbody>
</table>
```

- `<figure>` + `<figcaption>` group an image with its caption.
- Use `<table>` for **real tabular data** (like opening hours), never for page layout — that's CSS's
  job (Week 4). A table needs `<th>` header cells and `<td>` data cells inside `<tr>` rows.

## Lesson 3: Forms

Forms collect input: a reservation, a contact message, an order. Here is an accessible reservation
form for Fresh Bites:

```html
<form action="#" method="post">
  <fieldset>
    <legend>Reserve a table</legend>

    <label for="name">Full name</label>
    <input type="text" id="name" name="name" required />

    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />

    <label for="phone">Phone</label>
    <input type="tel" id="phone" name="phone" pattern="[0-9+ ]{7,15}" />

    <label for="guests">Number of guests</label>
    <input type="number" id="guests" name="guests" min="1" max="20" value="2" />

    <label for="date">Date</label>
    <input type="date" id="date" name="date" required />

    <label for="notes">Special requests</label>
    <textarea id="notes" name="notes" rows="3"></textarea>

    <button type="submit">Request reservation</button>
  </fieldset>
</form>
```

**The key ideas:**

- Every input has a `<label>` whose `for` matches the input's `id`. Clicking the label focuses the
  input, and screen readers announce it. **Every input needs a label.**
- `name` is the field's name when the form is submitted; `id` connects the label. They're often the
  same word but play different roles.
- **Input types** give the right keyboard and validation: `email`, `tel`, `number`, `date`, `password`.
- **Validation attributes:** `required`, `pattern` (a rule), `min`/`max` (for numbers/dates). The
  browser checks these before submitting — free validation.
- `<fieldset>` + `<legend>` group related fields with a caption.
- A `<button type="submit">` sends the form.

> **Note:** Right now the form has nowhere to send data (`action="#"`). Submitting just reloads. You'll
> handle form data with JavaScript in Week 6 and save it to a database in Week 11.

## Lesson 4: Accessibility basics

Accessibility (often "a11y") means building so **everyone** can use your site — including people using
screen readers, keyboards only, or who can't see colour well. It overlaps heavily with good HTML.

**The essentials:**

- **Alt text** on images: describe the content (`alt="Grilled croaker fish on a plate"`). For purely
  decorative images, use empty `alt=""`.
- **Labels** on every form field (Lesson 3).
- **Keyboard:** you must be able to reach and use every link, button and field with the `Tab` key and
  `Enter`/`Space`. Try it: unplug your mouse and navigate your page.
- **Landmarks:** semantic elements (`header`, `nav`, `main`, `footer`) let screen reader users jump
  around. One `<main>` per page.
- **Colour contrast:** text must stand out from its background (you'll control this with CSS next week;
  aim for strong contrast).
- **Link text** should make sense alone: "See our menu", not "click here".

> **Important:** About **15% of people** live with some disability. Accessible sites are also better for
> everyone — clearer, faster, more usable on phones. Build it in from the start; it's much harder to
> bolt on later.

## Lesson 5: Metadata and Lighthouse

The `<head>` describes your page to browsers, search engines and social media:

```html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Menu — Fresh Bites, Yenagoa</title>
  <meta name="description" content="Fresh Nigerian home-style food in Yenagoa. See our menu and reserve a table." />
  <link rel="icon" href="images/logo.svg" />
</head>
```

- `<title>` shows on the browser tab and in search results — make it specific per page.
- The meta `description` is the summary search engines may show.
- `viewport` makes your site work on phones (never leave it out).
- `<link rel="icon">` sets the little tab icon (favicon).

### Run Lighthouse

In Chrome/Edge, open DevTools (`F12`) → the **Lighthouse** tab → tick **Accessibility** → **Analyze
page load**. Read the report. Fix anything it flags (missing labels, low contrast, missing alt text).
You'll use Lighthouse all course.

## Practice Exercises

1. **Easy:** Rebuild your Week 1 home page using semantic elements (`header`, `nav`, `main`, `footer`).
2. **Easy:** Add a proper `<title>` and meta `description` to every page.
3. **Medium:** Build the opening-hours `<table>` from the content kit.
4. **Medium:** Build the reservation `<form>` with labels and validation attributes.
5. **Medium:** Add a `<figure>` with a dish image and caption.
6. **Stretch:** Navigate your whole site using only the `Tab` and `Enter` keys. Fix anything you can't reach.
7. **Stretch:** Run Lighthouse Accessibility on each page and get every score to 100 (structure only — no CSS yet).

## Weekly Assignment (Due Before Week 3)

Build the **4-page Fresh Bites HTML site** (no CSS yet):

1. **Home** (`index.html`): welcome, tagline, intro, a few highlights.
2. **Menu** (`menu.html`): all menu items grouped by category (use the kit's `menu.json`), with prices
   in Naira.
3. **About** (`about.html`): the business story (fictional — say so), opening-hours table.
4. **Contact** (`contact.html`): address, a reservation `<form>` with labels and validation.

All pages share a `<header>`/`<nav>`, use semantic HTML, have correct metadata, and are published on
GitHub Pages.

**Grading guide (100%):**

| Criteria | % |
|---|---|
| Semantic structure used correctly (landmarks, heading order) | 25 |
| All four pages complete with correct content | 20 |
| Accessible form (labels, types, validation) | 20 |
| Metadata on every page; working nav between all pages | 15 |
| Lighthouse Accessibility ≥ 95 on each page; published live | 20 |

**Definition of done:**

- [ ] Four linked pages, live on GitHub Pages
- [ ] Each uses `header`/`nav`/`main`/`footer` and one `<h1>`
- [ ] The form has a label for every field and sensible validation
- [ ] Each page has a unique `<title>` and a meta description
- [ ] Lighthouse Accessibility ≥ 95 on each page
- [ ] You can navigate the whole site with the keyboard only

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0–10 | Review last week's live sites and commit history |
| 10–30 | Live: refactor a `<div>` soup page into semantic landmarks; explain each |
| 30–55 | Live: build the reservation form together; test keyboard + Lighthouse |
| 55–80 | Pair work: student starts the 4-page site |
| 80–90 | Brief the assignment and Definition of done |

## Facilitator Notes

Students over-use `<div>` and `<section>`; push them to justify each element's meaning. The form is the
hard part — watch for missing `for`/`id` pairing (the single most common a11y bug) and inputs without
labels. Make them do the "keyboard only" and Lighthouse checks in session so the habit sticks. Resist
the urge to style anything yet; separating structure (now) from style (next week) is a deliberate
teaching choice.

## Self-Check Questions

1. Why use `<nav>` and `<main>` instead of `<div>` everywhere?
2. What connects a `<label>` to its input, and why does it matter?
3. Name three things that make a form accessible.
4. When is a `<table>` the right element — and when is it wrong?
5. What does the Lighthouse Accessibility report check for?
