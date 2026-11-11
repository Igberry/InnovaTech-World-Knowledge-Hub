---
title: "Modern Tooling: npm, Vite, Tailwind & Deployment"
course: web-development
order: 8
week: 8
phase: "Tooling & React"
summary: "Use the terminal, npm and Vite; style with Tailwind CSS; and deploy with a professional Git workflow."
estimatedHours: 12
tools: ["Node.js", "VS Code terminal", "Vite", "Tailwind CSS"]
---

**Goal:** Step up to professional tools - the terminal, **npm**, **Vite** and **Tailwind CSS** - and
deploy your Fresh Bites app using a real Git branch-and-pull-request workflow.

Until now you wrote plain files. Real projects use a **build tool** that bundles your code, a fast dev
server, and a package manager. This week you join that world.

## Learning Objectives

By the end of this week you can:

- Use basic terminal commands and understand `npm` and `package.json`
- Create and run a project with **Vite**
- Install and use **Tailwind CSS** for styling
- Work with Git branches, pull requests and merges
- Deploy to GitHub Pages (with a base path) and a host like Netlify or Vercel

## Tools to Install This Week

**Node.js** (from Week 0 - check `node -v`). Everything else installs per-project with npm.

## Pre-Session Resources (about 2 hours)

- Read: **vite.dev** → "Getting Started"; **tailwindcss.com/docs** → "Installation" (the Vite guide).
- Read: **docs.github.com** → "About pull requests".
- Watch (search YouTube): *"Fireship Vite in 100 seconds"*, *"Net Ninja Tailwind CSS tutorial"*,
  *"freeCodeCamp Git branches and pull requests"*.

## Lesson 1: The terminal and npm

The **terminal** runs text commands. The essentials:

```bash
pwd            # where am I?
ls             # list files (dir on Windows CMD; ls works in VS Code's terminal)
cd projects    # change directory
cd ..          # go up one
mkdir week-08  # make a folder
```

**npm** (Node Package Manager) installs code libraries and runs scripts. A project's `package.json`
lists its dependencies and scripts:

```bash
npm install        # install everything in package.json (creates node_modules/)
npm install axios  # add a package
npm run dev        # run the "dev" script defined in package.json
```

> **Important:** Never commit the `node_modules/` folder - it's huge and rebuildable. Your `.gitignore`
> should list `node_modules`. Commit `package.json` and `package-lock.json` instead.

## Lesson 2: Vite

**Vite** gives you a lightning-fast dev server and an optimised production build. Create a project:

```bash
npm create vite@latest fresh-bites-app
# choose: Vanilla, then JavaScript (we add React in Week 9)
cd fresh-bites-app
npm install
npm run dev     # starts the dev server - open the printed localhost URL
```

Key scripts (in `package.json`):

- `npm run dev` - start the dev server (auto-reloads as you save).
- `npm run build` - produce an optimised `dist/` folder for deployment.
- `npm run preview` - preview the built site locally.

Project structure: your code lives in `src/`, static files in `public/`, and the HTML entry is
`index.html` at the root.

> **Tip:** On a weak laptop or unreliable power, **StackBlitz** and **CodeSandbox** run Vite in the
> browser - useful this week and next. Commit and push whenever you have internet.

## Lesson 3: Tailwind CSS

**Tailwind** is a utility-first CSS framework: instead of writing CSS files, you compose small classes
in your HTML. Install it in your Vite project (this is the **current official method** - confirm on
`tailwindcss.com/docs` as versions update):

```bash
npm install tailwindcss @tailwindcss/vite
```

Add the plugin to `vite.config.js`:

```js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

Add one line to your main CSS (e.g. `src/style.css`):

```css
@import "tailwindcss";
```

Now use utility classes:

```html
<button class="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700">
  Add to cart
</button>

<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <!-- menu cards -->
</div>
```

| Class | Means |
|---|---|
| `px-4 py-2` | padding left/right 1rem, top/bottom 0.5rem |
| `rounded-lg` | large border radius |
| `bg-red-600` | background colour |
| `hover:bg-red-700` | background on hover |
| `sm:grid-cols-2 lg:grid-cols-3` | 2 columns on small screens, 3 on large (responsive prefixes) |

> **Note:** Tailwind feels strange at first - "styling in HTML?" - but it is fast and consistent once it
> clicks. For a repeated pattern, extract a component (a function/React component) rather than copying
> classes everywhere.

## Lesson 4: Git branches and pull requests

Professionals don't commit straight to `main`. They work on a **branch**, open a **pull request (PR)**,
and merge it after review.

```bash
git checkout -b feature/weather-widget   # create and switch to a branch
# ... make changes, commit ...
git push -u origin feature/weather-widget
```

Then on GitHub, open a **Pull Request** from your branch into `main`, review the changes, and **Merge**.
Back locally:

```bash
git checkout main
git pull            # get the merged changes
```

If two branches change the same lines, you get a **merge conflict**. Git marks the conflict in the file
with `<<<<<<<`, `=======`, `>>>>>>>`; edit to keep the right version, remove the markers, and commit.

## Lesson 5: Deployment

Your Vite app builds to `dist/`. Options:

- **GitHub Pages:** set `base` in `vite.config.js` to your repo name so paths work:
  ```js
  export default defineConfig({ base: "/fresh-bites-app/", plugins: [tailwindcss()] });
  ```
  Build, then publish `dist/` (a GitHub Action or the `gh-pages` approach - see the Vite deploy docs).
- **Netlify / Vercel / Cloudflare Pages:** connect your GitHub repo; they detect Vite, run
  `npm run build`, and deploy automatically on every push. Free tiers are generous (limits can change -
  check current terms). These serve at the **root**, so you usually don't need a `base` path.

**Environment variables:** Vite exposes variables that start with `VITE_` to your code via
`import.meta.env.VITE_SOMETHING`. Put them in a `.env` file and **git-ignore `.env`** - never commit
secrets.

> **Warning:** Anything in front-end code (including `VITE_` variables) is **visible to users**. Only
> put public values there (like a public API URL). Real secrets belong on a server, which you'll meet
> with Supabase's security model in Week 11.

## Lesson 6: A professional README

Every repo needs a `README.md`: what the project is, a screenshot, the live link, how to run it
(`npm install`, `npm run dev`), the tech used, and what you learned. Recruiters read READMEs first.

## Practice Exercises

1. **Easy:** Create a Vite vanilla project and run the dev server.
2. **Easy:** Install Tailwind and style a button with utility classes.
3. **Medium:** Rebuild your menu card with Tailwind classes, responsive at `sm`/`lg`.
4. **Medium:** Create a feature branch, make a change, push, and open a PR to yourself.
5. **Medium:** Add a `.env` with a `VITE_` variable and read it in code.
6. **Stretch:** Deploy the Vite app to Netlify or Vercel from your GitHub repo.
7. **Stretch:** Write a complete README with a screenshot and live link.

## Weekly Assignment (Due Before Week 9)

**Rebuild your Week 7 app with Vite + Tailwind, deployed, using a Git branch + PR.**

1. New Vite project; move your menu/cart/weather logic in.
2. Styled with Tailwind (responsive, on-brand with the kit palette).
3. All work done on a **feature branch**, merged to `main` via a **pull request**.
4. Deployed (Netlify/Vercel or GitHub Pages with the correct base path).
5. A clean README.

**Grading guide (100%):**

| Criteria | % |
|---|---|
| Working Vite project; correct scripts; `node_modules` ignored | 20 |
| Tailwind used well; responsive and on-brand | 30 |
| Branch + pull request workflow (visible on GitHub) | 20 |
| Deployed and working; env handled safely | 15 |
| README; clean commit history | 15 |

**Definition of done:**

- [ ] App runs with `npm run dev` and builds with `npm run build`
- [ ] Styled with Tailwind, responsive
- [ ] At least one merged pull request from a feature branch
- [ ] Deployed; live link in the README
- [ ] `node_modules` and `.env` are git-ignored

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0–10 | Review Portfolio Project 2 |
| 10–30 | Live: terminal basics, create a Vite project, explore `package.json` |
| 30–55 | Live: install Tailwind; restyle a component together |
| 55–80 | Live: branch → commit → push → PR → merge; resolve a small conflict |
| 80–90 | Brief the assignment; set up their host (Netlify/Vercel) |

## Facilitator Notes

This is a big tooling jump - expect friction with the terminal and npm. Reassure students that the dev
server auto-reloading and Tailwind's speed are worth the discomfort. Check `.gitignore` includes
`node_modules` and `.env` before they push (a committed `node_modules` is the week's classic mistake).
Verify the Tailwind install steps against the live docs in session, as the install method has changed
between major versions. For very weak machines, run the whole week in StackBlitz.

## Self-Check Questions

1. What does `npm install` do, and why is `node_modules` git-ignored?
2. What do `npm run dev` and `npm run build` each produce?
3. How does Tailwind's approach differ from writing a CSS file?
4. What is a pull request, and why not commit straight to `main`?
5. Why is it unsafe to put a secret key in a `VITE_` variable?
