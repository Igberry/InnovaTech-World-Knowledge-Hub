---
title: "Modern Tooling: npm, Vite, Tailwind & Deployment"
course: web-development
order: 8
week: 8
phase: "Tooling & React"
summary: "Join the professional workflow: spin up a project with Vite, style fast with Tailwind, and ship it through a real branch-and-pull-request flow."
estimatedHours: 12
tools: ["Node.js", "VS Code terminal", "Vite", "Tailwind CSS"]
---

**Goal:** Step up to the tools real developers use every day, the terminal, **npm**, **Vite** and
**Tailwind CSS**, and deploy your Fresh Bites app using a real Git branch-and-pull-request workflow. Lots of
running commands and watching things work, little reading.

## What you'll be able to do

- Use basic terminal commands and understand `npm` and `package.json`
- Create and run a project with **Vite**
- Install and use **Tailwind CSS** for styling
- Work with Git branches, pull requests and merges
- Deploy to GitHub Pages (with a base path) and a host like Netlify or Vercel

## Before you start (about 10 minutes)

- Confirm Node works: run `node -v`. Everything else installs per project with npm.
- On a weak laptop or unreliable power, you can run this whole week in **StackBlitz** or **CodeSandbox** in
  the browser.
- Warm-up (2 minutes): open the terminal and run `pwd`, then `ls`. You're about to live in here.

## Try it 1 - Get comfortable in the terminal

**Why it matters:** the terminal runs the tools. A handful of commands cover most of what you need.

**Do this now:**

```bash
pwd            # where am I?
ls             # list files
cd projects    # change directory
cd ..          # go up one
mkdir week-08  # make a folder
```

**You've got it when:** you can move between folders and make a new one without touching the file explorer.

## Try it 2 - Create and run a Vite project

**Why it matters:** Vite gives you a lightning-fast dev server and an optimised production build, the modern
starting point for real projects.

**Do this now:**

```bash
npm create vite@latest fresh-bites-app
# choose: Vanilla, then JavaScript (React comes in Week 9)
cd fresh-bites-app
npm install
npm run dev     # open the printed localhost URL
```

**You've got it when:** the dev server is running and your starter page loads in the browser, and
auto-reloads when you edit `src/`. The key scripts: `npm run dev` (dev server), `npm run build` (optimised
`dist/`), `npm run preview` (preview the build).

> **Important:** never commit `node_modules/`, it's huge and rebuildable. Make sure `.gitignore` lists
> `node_modules`. Commit `package.json` and `package-lock.json` instead.

## Try it 3 - Style fast with Tailwind

**Why it matters:** Tailwind lets you style by composing small classes right in your markup, fast and
consistent once it clicks.

**Do this now:** (this is the current official method, confirm on `tailwindcss.com/docs` as versions change)

```bash
npm install tailwindcss @tailwindcss/vite
```

Add the plugin to `vite.config.js`:

```js
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({ plugins: [tailwindcss()] });
```

Add one line to your main CSS (`src/style.css`): `@import "tailwindcss";` Then style a button:

```html
<button class="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700">
  Add to cart
</button>
```

**You've got it when:** your button is styled entirely with Tailwind classes and changes colour on hover.
Quick reference: `px-4 py-2` (padding), `rounded-lg` (radius), `bg-red-600` (background),
`sm:grid-cols-2 lg:grid-cols-3` (responsive columns).

## Try it 4 - Work on a branch and open a pull request

**Why it matters:** professionals don't commit straight to `main`. They branch, open a pull request, and
merge after review, exactly the workflow you're practising.

**Do this now:**

```bash
git checkout -b feature/weather-widget   # create and switch to a branch
# ... make changes, commit ...
git push -u origin feature/weather-widget
```

1. On GitHub, open a **Pull Request** from your branch into `main`, review the diff, and **Merge**.
2. Back locally:

```bash
git checkout main
git pull            # get the merged changes
```

**You've got it when:** you've merged at least one pull request from a feature branch, visible on GitHub. If
two branches change the same lines you get a merge conflict, Git marks it with `<<<<<<<`, `=======`,
`>>>>>>>`; edit to keep the right version, remove the markers, and commit.

## Try it 5 - Deploy your built app

**Why it matters:** this is how your Vite app gets online for real.

**Do this now, pick one:**
- **Netlify / Vercel / Cloudflare Pages:** connect your GitHub repo; they detect Vite, run `npm run build`,
  and deploy on every push. These serve at the root, so you usually don't need a base path.
- **GitHub Pages:** set `base` in `vite.config.js` to your repo name so paths work:
  ```js
  export default defineConfig({ base: "/fresh-bites-app/", plugins: [tailwindcss()] });
  ```

For environment variables, Vite exposes names starting with `VITE_` via `import.meta.env.VITE_SOMETHING`.
Put them in a `.env` file and **git-ignore `.env`**.

**You've got it when:** your app is live on a public URL built from your repo.

> **Warning:** anything in front-end code (including `VITE_` variables) is visible to users. Only put public
> values there. Real secrets belong on a server, which you meet with Supabase in Week 11.

### Watch out for

- Committing `node_modules/` or `.env` (git-ignore both before pushing)
- Forgetting the GitHub Pages `base` path (broken asset links)
- Expecting the Tailwind install to match old tutorials, confirm the current method in the docs
- Putting a secret in a `VITE_` variable

## This week's build: Vite + Tailwind, deployed via a PR

**Rebuild your Week 7 app with Vite + Tailwind, deployed, using a Git branch and pull request:**

1. New Vite project; move your menu/cart/weather logic in.
2. Styled with Tailwind (responsive, on-brand with the kit palette).
3. All work on a **feature branch**, merged to `main` via a **pull request**.
4. Deployed (Netlify/Vercel or GitHub Pages with the correct base path).
5. A clean README (what it is, screenshot, live link, how to run it, tech used, what you learned).

### Grading guide

| Criteria | % |
|---|---|
| Working Vite project; correct scripts; `node_modules` ignored | 20 |
| Tailwind used well; responsive and on-brand | 30 |
| Branch + pull request workflow (visible on GitHub) | 20 |
| Deployed and working; env handled safely | 15 |
| README; clean commit history | 15 |

### Definition of done

- [ ] App runs with `npm run dev` and builds with `npm run build`
- [ ] Styled with Tailwind, responsive
- [ ] At least one merged pull request from a feature branch
- [ ] Deployed; live link in the README
- [ ] `node_modules` and `.env` are git-ignored

## Extra quick wins (optional)

- Rebuild your menu card with Tailwind, responsive at `sm`/`lg`.
- Add a `.env` with a `VITE_` variable and read it in code.
- Deploy the same app to a second host and compare the experience.

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0-10 | Review Portfolio Project 2 |
| 10-30 | Live: terminal basics, create a Vite project, explore `package.json` |
| 30-55 | Live: install Tailwind; restyle a component together |
| 55-80 | Live: branch to commit to push to PR to merge; resolve a small conflict |
| 80-90 | Brief the build; set up their host (Netlify/Vercel) |

## Facilitator Notes

This is a big tooling jump, expect friction with the terminal and npm. Reassure students that the dev
server auto-reloading and Tailwind's speed are worth the discomfort. Check `.gitignore` includes
`node_modules` and `.env` before they push (a committed `node_modules` is the week's classic mistake).
Verify the Tailwind install steps against the live docs in session, as the install method has changed
between major versions. For very weak machines, run the whole week in StackBlitz.

## Can you do these now?

1. What does `npm install` do, and why is `node_modules` git-ignored?
2. What do `npm run dev` and `npm run build` each produce?
3. How does Tailwind's approach differ from writing a CSS file?
4. What is a pull request, and why not commit straight to `main`?
5. Why is it unsafe to put a secret key in a `VITE_` variable?
