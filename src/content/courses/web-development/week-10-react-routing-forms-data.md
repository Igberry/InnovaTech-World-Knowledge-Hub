---
title: "React II: Routing, Forms & Data Fetching"
course: web-development
order: 10
week: 10
phase: "Tooling & React"
summary: "Turn your single React page into a real multi-page app with routing, live data and working forms, then ship your third portfolio project."
estimatedHours: 12
tools: ["Node.js", "Vite", "React", "React Router"]
---

**Goal:** Turn your single React page into a real multi-page app with **React Router**, **controlled
forms**, and **data fetching**, then ship **Portfolio Project 3**. You build each page and feature by hand
and see it work.

## What you'll be able to do

- Add client-side routing with React Router (pages, links, layouts, 404)
- Build controlled forms with validation
- Fetch data in a component with `useEffect`, handling loading and errors
- Share state across pages with Context (introductory)
- Deploy a single-page app so refresh and deep links work

## Before you start (about 10 minutes)

- React Router installs per project with npm.
- Warm-up (2 minutes): open a large single-page app you use and click around, notice the URL changes but the
  page never fully reloads. You're about to build that.

## Try it 1 - Add real pages with React Router

**Why it matters:** routing maps URLs to components so your app has proper, shareable pages without full
reloads.

**Do this now:** (check `reactrouter.com` for the current install command and version)

```bash
npm install react-router-dom
```

```jsx
// main.jsx
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter><App /></BrowserRouter>
);
```

```jsx
// App.jsx
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
```

**You've got it when:** clicking the nav swaps pages without a full reload, and a made-up URL hits your 404
route (`path="*"`).

## Try it 2 - Build a controlled form

**Why it matters:** in React, a form input's value is driven by state. That's a "controlled component", the
standard React way.

**Do this now:**

```jsx
import { useState } from "react";

function Reservations() {
  const [form, setForm] = useState({ name: "", guests: 2 });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name.trim() === "") return setError("Please enter your name.");
    setError("");
    setDone(true);               // (Week 11: save this to Supabase)
  };

  if (done) return <p>Thank you, {form.name}. Reservation received.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" value={form.name} onChange={handleChange} />
      {error && <p className="error">{error}</p>}
      <button type="submit">Reserve</button>
    </form>
  );
}
```

**You've got it when:** your form validates on submit and shows a thank-you. Each input has `value` (from
state) and `onChange` (updates state); use `htmlFor` instead of `for` on labels.

## Try it 3 - Fetch data with useEffect

**Why it matters:** `useEffect` runs code after render, perfect for loading data when a component appears.

**Do this now:**

```jsx
import { useState, useEffect } from "react";

function Weather() {
  const [temp, setTemp] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=4.92&longitude=6.26&current=temperature_2m"
        );
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        setTemp(data.current.temperature_2m);
        setStatus("ready");
      } catch { setStatus("error"); }
    }
    load();
  }, []); // [] = run once, after the first render

  if (status === "loading") return <p>Loading weather...</p>;
  if (status === "error") return <p>Couldn't load the weather.</p>;
  return <p>Yenagoa: {temp} degrees C</p>;
}
```

**You've got it when:** your weather shows loading, then the temperature, and the error message if you go
offline. The dependency array `[]` means "run once".

## Try it 4 - Share the cart with Context

**Why it matters:** Context shares state without passing props through many layers ("prop drilling").

**Do this now:**

```jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (item) => setCart((c) => [...c, item]);
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
```

1. Wrap your app in `<CartProvider>` and call `useCart()` from two different pages.

**You've got it when:** two separate pages read and update the same cart. Reach for Context only when
prop-passing genuinely hurts, lifted state is fine for simple cases.

## Try it 5 - Deploy the single-page app so refresh works

**Why it matters:** because routing is client-side, a careless deploy makes refreshing `/menu` give a 404.

**Do this now:**
1. Deploy to Netlify or Vercel (they handle SPA routing automatically).
2. Visit a sub-page like `/menu`, then **refresh**. It should still load, not 404.

**You've got it when:** refreshing a deep link loads the right page instead of a 404. On GitHub Pages a
common fix is a `404.html` that loads the app, check your host's SPA docs.

### Watch out for

- Forgetting to wrap the app in `<BrowserRouter>`
- An uncontrolled input (value not tied to state) that "won't update"
- A `useEffect` fetch with the wrong dependency array causing an infinite loop
- Deploying an SPA without SPA routing, so deep links 404

## This week's build: Portfolio Project 3

Ship a **multi-page React Fresh Bites app**, your third portfolio piece:

1. Pages: Home, Menu, Cart, Reservations, About (React Router), plus a 404.
2. Controlled, validated reservation form.
3. Weather widget fetched with `useEffect` (loading/error states).
4. Cart shared via Context or lifted state; total shown.
5. Responsive (Tailwind). Deployed as an SPA (deep links work). README with screenshots + live link.

### Grading guide

| Criteria | % |
|---|---|
| Routing with multiple pages + 404 | 20 |
| Controlled form with validation | 20 |
| Data fetching with `useEffect` + states | 20 |
| Shared cart (Context/lifted); total correct | 20 |
| Deployed SPA (deep links work); README | 20 |

### Definition of done

- [ ] Multiple routes work, including a 404
- [ ] Reservation form is controlled and validates
- [ ] Weather fetch shows loading, success, error
- [ ] Cart works across pages; total correct
- [ ] Deployed; refreshing a sub-page doesn't 404; README has live link

## Extra quick wins (optional)

- Style the active nav link with `NavLink`.
- Extract the weather logic into a custom hook, `useWeather()`.
- Add an About page with your real story and a link to your GitHub.

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0-10 | Review the React components build |
| 10-35 | Live: add React Router, pages, nav and 404 |
| 35-55 | Live: build a controlled form; fetch with `useEffect` |
| 55-80 | Live: move the cart into Context |
| 80-90 | Brief Portfolio Project 3; cover SPA deployment |

## Facilitator Notes

Routing is usually smooth; controlled forms and `useEffect` dependency arrays are the sticking points. Demo
an infinite-loop `useEffect` (missing `[]`) so they recognise it. For SPA deployment, pre-check the
student's host and have the redirect/404 fix ready, a "works locally, 404 on refresh when deployed" bug is
demoralising if unexplained. Keep Context minimal; some learners are better served by lifted state for one
more week. Confirm the current React Router install command against reactrouter.com in session.

## Can you do these now?

1. What does `<BrowserRouter>` provide, and what do `<Routes>`/`<Route>` do?
2. What makes a form input "controlled"?
3. What does the dependency array in `useEffect` control?
4. What problem does Context solve?
5. Why can a deployed single-page app 404 on refresh, and how do you fix it?
