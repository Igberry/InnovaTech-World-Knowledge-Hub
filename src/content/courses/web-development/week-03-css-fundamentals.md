---
title: "CSS Fundamentals"
course: web-development
order: 3
week: 3
phase: "Foundations"
summary: "Give your plain HTML site a real brand this week: colours, type and reusable styles that make it look like a business, not a school project."
estimatedHours: 11
tools: ["VS Code", "Chrome DevTools"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
---

**Goal:** Turn your plain Fresh Bites HTML into a styled, branded site using CSS: colours, typography,
spacing and reusable classes. By Friday it should look like a real business. You learn by styling, not by
reading about styling.

## What you'll be able to do

- Link CSS to HTML and write rules with selectors
- Explain the cascade and specificity, and why they decide which style wins
- Use the box model (margin, border, padding, `box-sizing`) deliberately
- Build a colour palette and type scale with good contrast
- Use CSS variables to keep styles consistent

## Before you start (about 10 minutes)

- Nothing new to install. You'll lean hard on **Chrome DevTools** to inspect and live-edit styles.
- Open the Fresh Bites content kit and find the warm food palette, you'll use those colours.
- Warm-up (3 minutes): open your Week 2 site, press `F12`, click an element, and in the Styles panel
  change its `color`. See how instant styling is before you write a single line.

## Try it 1 - Link a stylesheet and write your first rule

**Why it matters:** CSS is a separate file that controls the whole look. One change can restyle every page.

**Do this now:**
1. Create `styles.css` next to your HTML and link it in the `<head>`:

```html
<link rel="stylesheet" href="styles.css" />
```

2. Add your first rule and save:

```css
h1 {
  color: #c8372d;        /* property: value; */
  font-size: 2rem;
}
```

**You've got it when:** your `<h1>` changes colour in the browser. The **selector** (`h1`) chooses what to
style; each **declaration** sets one property and ends with a semicolon.

## Try it 2 - Target elements with selectors

**Why it matters:** selectors are how you point CSS at exactly the right thing.

**Do this now, add each and watch what it hits:**

```css
p            { }   /* every <p> (element selector) */
.card        { }   /* every element with class="card" (class selector) */
#hero        { }   /* the element with id="hero" (id selector) */
nav a        { }   /* <a> inside <nav> (descendant) */
a:hover      { }   /* an <a> while hovered (pseudo-class) */
.btn:focus   { }   /* a .btn while focused */
```

1. Add `class="btn"` to a button and style `.btn`.
2. Add `:hover` and `:focus` styles so interaction is visible.

**You've got it when:** you've styled something by class, and your buttons show a clear `:focus` state for
keyboard users. Use classes for almost everything (reusable), ids rarely (must be unique).

## Try it 3 - Win the "why won't this apply?" game

**Why it matters:** when a style seems ignored, it's almost always the cascade or specificity. Learn to see
it.

**Do this now:**
1. Add these three rules targeting the same paragraph:

```css
p        { color: black; }   /* low specificity */
.intro   { color: gray;  }   /* beats the element rule */
#lead    { color: red;   }   /* beats the class rule */
```

2. Open DevTools, select the element, and look at the Styles panel: it shows which rule won and strikes
   through the overridden ones.

**You've got it when:** you can predict which colour wins and confirm it in DevTools. Rule of thumb: style
with classes, avoid ids and `!important`.

## Try it 4 - Control space with the box model

**Why it matters:** padding and margin confusion causes most "my spacing is wrong" bugs. The box model
clears it up.

**Do this now:**
1. Set `box-sizing` globally so widths behave:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

2. Build a card and feel the difference between padding and margin:

```css
.card {
  width: 300px;
  padding: 1rem;            /* space INSIDE the border */
  border: 1px solid #eadfd3;
  margin: 1rem;             /* space OUTSIDE, between elements */
}
```

3. In DevTools, open the **box model diagram** (bottom of the Styles panel) and hover to see each layer.

**You've got it when:** you can say which of padding and margin is inside the box, and you've seen both in
the DevTools diagram.

## Try it 5 - Build your brand: palette and type

**Why it matters:** variables let you set your brand once and reuse it everywhere, exactly how real design
systems work.

**Do this now:**
1. Define the Fresh Bites palette as CSS variables:

```css
:root {
  --tomato: #c8372d;
  --tomato-dark: #9e2a22;
  --cream: #fff7ed;
  --charcoal: #2b2320;
  --leaf: #2e7d4f;
  --border: #eadfd3;
}

body {
  background: var(--cream);
  color: var(--charcoal);
  line-height: 1.6;
}
```

2. Build a type scale with `rem` for `h1`, `h2`, `h3`, body and small text.
3. Add a web font: search "Google Fonts Poppins", paste the `<link>` into your `<head>`, and use it in CSS.

**You've got it when:** your whole site uses your variables, and changing `--tomato` once updates every
accent. Prefer `rem` for sizes (it respects user settings, better for accessibility):

| Unit | Use for |
|---|---|
| `px` | borders, small fixed sizes |
| `rem` | **font sizes and spacing** |
| `%` | fluid widths |
| `vw` / `vh` | full-screen sections |

## Try it 6 - Make it feel alive: buttons and cards

**Why it matters:** rounded corners, subtle shadows and smooth hovers are what make a site feel finished.

**Do this now:**

```css
.btn {
  background: var(--tomato);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.btn:hover { background: var(--tomato-dark); }

.card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
```

**You've got it when:** your buttons smoothly change colour on hover, and your menu cards have soft rounded
corners and a subtle shadow.

### Watch out for

- Forgetting the semicolon or misspelling a property
- Expecting margin to add space *inside* a box (that's padding)
- Reaching for `!important` or ids instead of clean classes
- Pixel-everything, prefer `rem` for type and spacing

## This week's build: brand the full Fresh Bites site

Style all four pages into one coherent brand, still live on GitHub Pages:

1. A palette and type scale defined with CSS variables (the kit's warm colours).
2. Reusable classes (`.btn`, `.card`, `.nav`) applied across all pages.
3. A styled header/nav, menu cards, a styled form, and a footer.
4. Visible focus states and good contrast throughout.

*Tip: when you're done, put your old Week 2 screenshot next to the new one. The before-and-after is
genuinely satisfying, and great for your portfolio.*

### Grading guide

| Criteria | % |
|---|---|
| CSS variables for palette; consistent colours across pages | 20 |
| Box model used well (readable spacing, `border-box`) | 20 |
| A clear type scale and readable typography | 20 |
| Reusable classes (not repeated inline styles); hover + focus states | 20 |
| Good contrast; cohesive brand; published live | 20 |

### Definition of done

- [ ] One linked `styles.css`; no inline `style=""` attributes
- [ ] Palette and type scale defined as `:root` variables
- [ ] `.btn` and `.card` reused across pages
- [ ] Every interactive element has a visible `:focus` style
- [ ] Contrast passes; site looks like one coherent brand; live on GitHub Pages

## Extra quick wins (optional)

- Use DevTools to live-tweak your menu cards until the spacing feels right, then copy the values into CSS.
- Check text contrast with the DevTools contrast tool and fix any pair that fails.
- Add a subtle hover lift to cards with `transform: translateY(-2px)`.

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0-10 | Review Week 2 sites; look at commit history |
| 10-30 | Live: cascade and specificity demo in DevTools; fix a "why won't this apply?" bug |
| 30-50 | Live: build the box model and a `.card` together; set `border-box` globally |
| 50-75 | Pair work: student styles the nav and menu cards |
| 75-90 | Brief the build; show the DevTools contrast checker |

## Facilitator Notes

The two conceptual humps are specificity (demo it live in DevTools, seeing the struck-through rules clicks
for most students) and the margin-vs-padding distinction (use the DevTools box diagram). Steer students
away from `!important` and ids; insist on reusable classes now, because Week 4's layout work assumes a
clean class-based stylesheet. Watch for pixel-everything, nudge them toward `rem`. The before-and-after
screenshot is a strong motivator, make time for it.

## Can you do these now?

1. When two rules target the same element, how does CSS decide which wins?
2. What is the difference between margin and padding?
3. What does `box-sizing: border-box` change, and why is it helpful?
4. Why use CSS variables instead of repeating colour values?
5. Why prefer `rem` over `px` for font sizes?
