# Aunt Phone Nyi — Portfolio (Angular)

A single-page portfolio built with standalone Angular components. The visual
concept treats the page like a circuit board — sections are "components"
with silkscreen-style part numbers (U1, U2...), connected by a copper trace
rail on the left, since the design is a nod to an Electronics &
Communications Engineering background.

## Stack

- Angular 17 (standalone components, no NgModules)
- SCSS with a small design-token system (see `src/styles.scss`)
- `HttpClient` + RxJS to talk to the companion `Portfolio.Api` .NET backend
- Reactive Forms for the contact form

## Getting started

```bash
npm install
npm start        # ng serve, http://localhost:4200
```

The app expects the .NET API at `http://localhost:5080/api` (see
`src/environments/environment.ts`). **If the API isn't running, the page
still works** — it falls back to local seed data in
`src/app/core/services/portfolio.fallback-data.ts`, and the contact form
will show a friendly error instead of crashing.

To run frontend + backend together:

1. In one terminal: `cd ../Portfolio.Api && dotnet run`
2. In another: `cd portfolio-app && npm start`

## Editing your content

All resume content lives in one place on the backend:
`Portfolio.Api/Data/PortfolioData.cs`. Edit that file (name, experience,
skills, projects, education) and it flows straight into the site — no
Angular changes needed. The matching `portfolio.fallback-data.ts` file in
the Angular project is a mirror for offline/frontend-only development; keep
the two in sync if you edit both.

## Project structure

```
src/app/
  core/
    models/            TypeScript interfaces matching the API DTOs
    services/          PortfolioService (HTTP + fallback), fallback data
  components/
    trace-rail/         the left-hand PCB trace + section nav
    hero/                intro section
    about/               strengths + languages
    experience/          work history timeline
    skills/              skills as "IC chips"
    projects/            capstone project
    education/           degrees
    contact/             contact form (posts to the API)
    footer/
```

## Building for production

```bash
npm run build
```

Output goes to `dist/portfolio-app/browser`. Deploy that folder to any
static host (Netlify, Vercel, Azure Static Web Apps, GitHub Pages, etc.),
and update `src/environments/environment.prod.ts` with your deployed API URL
first.

## Design notes

Tokens (colors, fonts, spacing) are defined once as CSS custom properties in
`src/styles.scss`. If you want to restyle without hunting through every
component, start there.

## Animation system

A small motion layer sits on top of the PCB concept — glowing, HUD-style
touches rather than anything flashy:

- **`[appReveal]` directive** (`src/app/core/directives/reveal.directive.ts`)
  — fades + lifts elements into place the first time they scroll into view.
  Pass a number for a stagger delay in ms: `[appReveal]="i * 80"`.
- **Power-on hero** — the hero content fades/blurs in on page load with a
  staggered delay per line (`.power-on` class + `--power-on-delay` var).
- **Trace pulse** — a soft glow travels down the left-hand rail on a loop
  (`.rail__pulse`, `@keyframes trace-pulse` in `styles.scss`).
- **Reactor ping** — the "open to new roles" LED pulses with an expanding
  ring (`@keyframes reactor-ping`).
- **Hover shine** — primary buttons and cards get a subtle energy sweep /
  lift on hover.

Everything respects `prefers-reduced-motion` globally (see the media query
in `styles.scss`), so it degrades gracefully for anyone who has that set.
