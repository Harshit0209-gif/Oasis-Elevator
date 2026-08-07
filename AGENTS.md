# Oasis Elevators — project notes

This is a Vite + React 19 + TypeScript single-page app (migrated off Next.js — no SSR, no App Router, no API routes). Routing is client-side via `react-router-dom`.

- `@/*` resolves to the repo root (see `vite.config.ts` / `tsconfig.json`), so `components/`, `data/`, `lib/`, `hooks/` stay at the top level rather than under `src/`.
- `src/` holds only the app shell: `main.tsx` (entry), `App.tsx` (routes + layout), `pages/*.tsx` (one per route), `index.css` (Tailwind v4, CSS-first config).
- Per-page `<title>`/`<meta>` tags are set via `lib/seo.tsx`'s `<Seo>` component, which relies on React 19's native hoisting of `<title>`/`<meta>`/`<link>` rendered anywhere in the tree — no `react-helmet` needed.
- Because this is a static client-rendered SPA, there's no server for the contact form to post to. `ContactForm.tsx` reads an optional `VITE_CONTACT_ENDPOINT` env var; without one set, submissions just validate and show a success state locally. Wire up a real form backend (Formspree, a hosted function, etc.) before relying on this in production.
- `npm run build` type-checks (`tsc --noEmit`) then runs `vite build` to `dist/`. `npm run dev` starts the Vite dev server on port 3000.
