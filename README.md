This is the Oasis Elevators marketing site — a Vite + React + TypeScript single-page app.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the homepage by modifying `src/pages/HomePage.tsx`. The page auto-updates as you edit files.

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check and build a production bundle to `dist/`
- `npm run preview` — locally preview the production build
- `npm run lint` — run ESLint

## Notes

- Routing is client-side (`react-router-dom`); there is no server-side rendering.
- The contact form (`components/sections/contact/ContactForm.tsx`) needs a `VITE_CONTACT_ENDPOINT` env var pointing at a real backend before it can actually deliver submissions — see `AGENTS.md` for details.
