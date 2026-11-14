---
title: "Layout, Flexbox, Grid & Responsive Design"
course: web-development
order: 4
week: 4
phase: "Foundations"
summary: "Make your site look great on any phone or laptop, then ship it as your first real portfolio project with a live link."
estimatedHours: 12
tools: ["VS Code", "Chrome DevTools"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
---

**Goal:** Lay out your Fresh Bites site with Flexbox and CSS Grid, make it work from phone to desktop, and
ship it as **Portfolio Project 1**, your first real, deployed project. You even learn two of the tools
through games. Mostly doing, almost no reading.

## What you'll be able to do

- Use Flexbox for rows of items (navbars, card rows) and for centring
- Use CSS Grid for two-dimensional layouts (a menu grid, page sections)
- Build mobile-first with media queries and sensible breakpoints
- Make images and type responsive (`max-width`, `clamp()`)
- Ship a documented, responsive project live with a README

## Before you start (about 10 minutes)

- Nothing new to install.
- Quick win first: play 3 or 4 levels of **Flexbox Froggy** (flexboxfroggy.com) and **Grid Garden**
  (cssgridgarden.com) right now. They teach the exact properties you're about to use, and they're fun.
- Open the DevTools device toolbar (`Ctrl+Shift+M`), you'll preview phone sizes all week.

## Try it 1 - Lay out a navbar with Flexbox

**Why it matters:** Flexbox makes the two most common layout jobs easy: a navbar and centring anything.

**Do this now:**
1. Turn your nav into a Flexbox row:

```css
.nav {
  display: flex;
  gap: 1.5rem;                     /* space between items */
  align-items: center;             /* vertical alignment */
  justify-content: space-between;  /* push logo and links apart */
}
```

2. Remember: `display: flex` goes on the **container**, not the items.

**You've got it when:** your nav links sit in a neat row with the brand on one side and links on the other.

Key container properties to try: `flex-direction` (`row`/`column`), `justify-content`, `align-items`,
`gap`, and `flex-wrap`.

## Try it 2 - Centre anything

**Why it matters:** "how do I centre a div" is a genuine job-interview question. Now you'll know.

**Do this now:**

```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}
```

**You've got it when:** your hero content sits dead-centre, horizontally and vertically.

## Try it 3 - Build a responsive menu grid

**Why it matters:** Grid lays out rows and columns at once, perfect for a menu of cards, and this one
pattern reflows itself with no media queries.

**Do this now:**

```css
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
```

1. Add several menu cards inside `.menu-grid`.
2. Drag your browser window narrower and wider and watch the columns reflow.

**You've got it when:** your menu goes from one column on a narrow window to several on a wide one, all on
its own. Rule of thumb: Flexbox for one row or column, Grid for a true two-dimensional layout.

## Try it 4 - Go mobile-first with media queries

**Why it matters:** most of the web is viewed on phones, often on slow data. Build for the phone first,
then add for bigger screens.

**Do this now:**

```css
/* Phone first: single column */
.menu-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet and up */
@media (min-width: 640px) {
  .menu-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .menu-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
}
```

1. Resize to **360px first** in the device toolbar, then widen.

**You've got it when:** your layout looks good at 360px, 768px and 1280px with no horizontal scrolling. Add
a breakpoint whenever the layout starts to look cramped, don't chase specific devices.

## Try it 5 - Make images and headings responsive

**Why it matters:** an oversized image is the classic cause of a page you can scroll sideways on a phone.

**Do this now:**

```css
img {
  max-width: 100%;   /* never overflow the container */
  height: auto;      /* keep the aspect ratio */
  display: block;
}

h1 {
  font-size: clamp(1.8rem, 1.2rem + 3vw, 3rem); /* min, preferred, max */
}
```

**You've got it when:** no image breaks the layout on mobile, and your main heading scales smoothly between
a minimum and maximum size.

### Watch out for

- Putting `display: flex` on the items instead of the **container**
- Fixed widths (`width: 1000px`) that overflow phones, use `max-width` and `%`/`fr`
- Forgetting the `viewport` meta tag, then media queries seem not to work on phones
- Designing desktop-first and cramming it onto mobile, start mobile-first

## This week's build: Portfolio Project 1

Ship a **fully responsive Fresh Bites website**, your first portfolio piece and something you'll actually
show people.

1. All pages (Home, Menu, About, Contact) styled and responsive, tested at **360px, 768px and 1280px** with
   no horizontal scrolling on mobile.
2. A Flexbox navbar and footer; a Grid menu layout.
3. Responsive images; fluid headings with `clamp()`.
4. A **README.md**: what it is, a screenshot or two, the live link, and what you learned.
5. Published on GitHub Pages; **Lighthouse mobile** scores in the README (aim: Performance >= 90,
   Accessibility >= 95).

*Tip: this is the first project worth pinning on your GitHub profile. Make the README and screenshots good,
recruiters read these first.*

### Grading guide

| Criteria | % |
|---|---|
| Correct, clean Flexbox and Grid layouts | 25 |
| Fully responsive at 360/768/1280; no mobile overflow | 25 |
| Responsive images and fluid type | 15 |
| README with screenshots, live link and Lighthouse scores | 15 |
| Published live; good commit history; cohesive brand | 20 |

### Definition of done

- [ ] Live on GitHub Pages; link in the README
- [ ] No horizontal scroll at 360px on any page
- [ ] Menu uses Grid; nav/footer use Flexbox
- [ ] README has screenshots, the live link, and Lighthouse mobile scores
- [ ] Lighthouse: Performance >= 90 and Accessibility >= 95 on mobile

## Extra quick wins (optional)

- Finish all levels of Flexbox Froggy and Grid Garden.
- Build a footer with three columns on desktop that stack on mobile.
- Use the device toolbar to screenshot your site at phone and desktop widths for the README.

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0-10 | Review Week 3 styling and commits |
| 10-35 | Live: build a responsive navbar (Flexbox) and menu grid (Grid) together |
| 35-55 | Live: add media queries mobile-first; test in the device toolbar |
| 55-80 | Pair work: student makes their menu page responsive |
| 80-90 | Brief Portfolio Project 1; explain the README + Lighthouse requirement |

## Facilitator Notes

This is the first "portfolio" week, set the bar for READMEs and screenshots now, because every later
project repeats it. The classic confusion is flex properties on the wrong element; have students point to
"the container" out loud. Push mobile-first hard: make them resize to 360px first. The two layout games are
genuinely the fastest way in, open the session with them. If a learner is struggling with Grid,
`repeat(auto-fill, minmax(…, 1fr))` alone covers most of their needs, teach that pattern well before the
fancier Grid features.

## Can you do these now?

1. When would you reach for Flexbox, and when for Grid?
2. What does `repeat(auto-fill, minmax(260px, 1fr))` do?
3. What does "mobile-first" mean in terms of media queries?
4. How do you stop an image from breaking a mobile layout?
5. What does `clamp()` give you that a fixed font size doesn't?
