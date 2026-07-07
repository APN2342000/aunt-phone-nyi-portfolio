# Aunt Phone Nyi — Portfolio

A full-stack portfolio site built with **Angular** (frontend) and **.NET /
C#** (backend API), showcasing web developer experience at Kumo Solutions
Mandalay along with an Electronics & Communications Engineering background.

```
aunt-phone-nyi-portfolio/
  portfolio-app/     Angular 17 frontend
  Portfolio.Api/      ASP.NET Core 9 Web API backend
  render.yaml          Render blueprint for one-click free API hosting
```

## Local development

You'll need:
- [.NET SDK](https://dotnet.microsoft.com/download) (9.0 — check `dotnet --version`; adjust `TargetFramework` in the `.csproj` if you're on a different major version)
- [Node.js](https://nodejs.org) 18+ and npm

**1. Start the API** (in one terminal):

```bash
cd Portfolio.Api
dotnet restore
dotnet run
```

This runs on `http://localhost:5080` (Swagger docs at `/swagger`).

**2. Start the Angular app** (in another terminal):

```bash
cd portfolio-app
npm install
npm start
```

This runs on `http://localhost:4200` and calls the API automatically.

> The frontend also works with the API turned off — it falls back to local
> seed data so you can iterate on the UI alone.

## Editing your resume content

Everything is in one file: `Portfolio.Api/Data/PortfolioData.cs`. Change
the strings and lists there — your name, experience, skills, projects,
education — and it flows through to the site.

---

## Deploying for free

This stack deploys for **$0/month** using two free-tier hosts:

| Piece    | Host                                     | Why                                                            |
|----------|-------------------------------------------|-----------------------------------------------------------------|
| Backend  | [Render](https://render.com) (free Web Service, Docker) | Native Docker support, free Postgres if you add a DB later |
| Frontend | [Cloudflare Pages](https://pages.cloudflare.com) (or Netlify/Vercel) | Static hosting, generous free bandwidth, auto-deploys on git push |

Both redeploy automatically every time you push to your Git repo — that's
the "auto run" part: no manual server restarts, no SSH'ing in to redeploy.

### 1. Push this project to GitHub

```bash
cd aunt-phone-nyi-portfolio
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<you>/aunt-phone-nyi-portfolio.git
git push -u origin main
```

### 2. Deploy the API to Render (free)

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New** → **Blueprint**, and point it at your GitHub repo. Render will detect `render.yaml` at the repo root and configure the service automatically (Docker, free plan, root directory `Portfolio.Api`).
   - No `render.yaml`? Create the service manually instead: **New → Web Service**, connect the repo, set **Root Directory** to `Portfolio.Api`, **Runtime** to `Docker`, and **Instance Type** to `Free`.
2. Deploy. You'll get a URL like `https://portfolio-api-xxxx.onrender.com`.
3. Confirm it works: visit `https://portfolio-api-xxxx.onrender.com/swagger`.

**Free tier caveats (as of 2026):** the service spins down after 15 minutes
of no traffic and takes ~30–60 seconds to wake back up on the next request
— totally fine for a portfolio, just know the first visitor of the day
might wait a bit. You get 750 free instance-hours/month, which covers one
always-referenced service comfortably.

### 3. Deploy the frontend to Cloudflare Pages (free)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**, and select your repo.
2. Set:
   - **Root directory**: `portfolio-app`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist/portfolio-app/browser`
3. Before your first deploy (or right after), update
   `portfolio-app/src/environments/environment.prod.ts` with your real
   Render API URL:
   ```ts
   export const environment = {
     production: true,
     apiUrl: 'https://portfolio-api-xxxx.onrender.com/api'
   };
   ```
   Commit and push — Cloudflare Pages redeploys automatically.
4. You'll get a URL like `https://aunt-phone-nyi-portfolio.pages.dev` (a custom domain can be attached for free too).

### 4. Close the loop: update CORS on the API

Back in the Render dashboard, open your API service → **Environment**, and
set:

```
AllowedOrigins = https://aunt-phone-nyi-portfolio.pages.dev
```

(Comma-separate multiple origins if you add a custom domain later.) Render
redeploys the service automatically when you change an environment
variable — no code changes needed, since `Program.cs` reads this at
startup.

### From here on: it just runs

Once both are wired up, **every `git push` to `main` auto-deploys both
sides** — that's your "production auto run": no servers to babysit, no
manual restarts. If you want a staging area, create a second branch and a
second Render/Pages environment pointed at it.

### If you outgrow the free tier

- Render web services start at $7/month for an always-on instance (no
  spin-down).
- Azure App Service's Free (F1) tier is another no-cost option if you'd
  rather stay in the Microsoft ecosystem, though it has daily CPU quotas
  better suited to light traffic.
- Cloudflare Pages/Netlify/Vercel's free static-hosting tiers are generous
  enough that you're unlikely to outgrow them for a portfolio site.

See the `README.md` inside each folder for more detail on that piece.
