# Mizaniya Partner Platform

A premium fintech dashboard for the Mizaniya Partner Platform, built with Next.js (App Router), TypeScript, and Tailwind CSS v4.

This build focuses on the **vTPE Terminals** experience: viewing, searching, filtering, and creating vTPE payment terminals, on top of a reusable design system.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app redirects to `/payments/vtpe/terminals`.

## Design system

The reusable design system lives in `src/design-system` (tokens, components, utilities) and is showcased on its own route at `/design-system`, independent of the vTPE page.

## Structure

- `src/design-system` — tokens (`tokens.css`) and components (buttons, forms, badges, table, overlays, feedback, financial primitives).
- `src/components/layout` — `AppShell`, `Sidebar`, `Topbar`, `Breadcrumbs`, mobile navigation, and the nav config.
- `src/features/vtpe` — the vTPE Terminals feature: mock data, types, and the page's composed components (metrics grid, toolbar, table, create-terminal drawer, add-bank-account modal).
- `src/app` — Next.js App Router routes. Most product pages live under the `(app)` route group, which applies the shared `AppShell`.

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint
