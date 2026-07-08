# Aunt Phone Nyi — Portfolio

A full-stack portfolio site built with **Angular** (frontend) and **.NET /
C#** (backend API), showcasing web developer experience at Kumo Solutions
Mandalay along with an Electronics & Communications Engineering background.

```
aunt-phone-nyi-portfolio/
  portfolio-app/     Angular 17 frontend
  Portfolio.Api/      ASP.NET Core 9 Web API backend
  render.yaml          Optional Render blueprint (see "Deploying for free")
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

## Deploying for free — the practical answer

If the goal is "a link I can put on my resume that works 24/7 without my
laptop being on," here's the direct path: **deploy only the frontend.**

The Angular app already has a complete built-in fallback data set (your
real resume content, bundled into the app itself) and a contact form that
opens the visitor's email client when there's no live API. So the deployed
site is fully self-sufficient — no backend to host, no server to keep
running, no account needed beyond a free static-hosting one.

This is the default the project ships with
(`environment.prod.ts` has `apiEnabled: false`), and it's genuinely the
right call for a job-hunting portfolio: recruiters get a real, always-on
site; you get zero infrastructure to babysit.

### Deploy the frontend to Cloudflare Pages (free, no card, ever)

1. Push this project to GitHub:
   ```bash
   cd aunt-phone-nyi-portfolio
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<you>/aunt-phone-nyi-portfolio.git
   git push -u origin main
   ```
2. Go to [dash.cloudflare.com](https://dash.cloudflare.com), sign up (email only — Pages has never required a card).
3. **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → select your repo.
4. Set:
   - **Root directory**: `portfolio-app`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist/portfolio-app/browser`
5. Deploy. You'll get a permanent URL like `https://aunt-phone-nyi-portfolio.pages.dev` — put that on your resume.

That's the whole thing. Every `git push` to `main` auto-redeploys it —
that's your "production auto run," with nothing else to maintain.

**Editing your resume content after this point:** since there's no live
backend, edit `portfolio-app/src/app/core/services/portfolio.fallback-data.ts`
directly (it mirrors `Portfolio.Api/Data/PortfolioData.cs`), commit, and
push. Cloudflare Pages rebuilds automatically.

---

## Optional: adding a live .NET API later

The full backend (`Portfolio.Api/`) is still here and still demonstrates
real C#/.NET skills — it's just not required for the deployed site to
work. Good reasons to stand it up anyway: a technical interviewer asks to
see it live, or you want the contact form to post through your own API
instead of opening email.

When you're ready, you have two paths:

**A. A cloud host, accepting that a card may be requested for identity
verification (you still pay $0 on the Free tier):**
- **Koyeb** — [app.koyeb.com](https://app.koyeb.com) → Create Web Service → GitHub → Dockerfile builder (`Portfolio.Api` folder) → Free instance.
- **Render** — [dashboard.render.com](https://dashboard.render.com) → New → Web Service (not Blueprint) → Docker → Free.

**B. Fully card-free, self-hosted from your own machine, for demos:**
```powershell
cd Portfolio.Api
dotnet run
```
Then in another terminal:
```powershell
winget install --id Cloudflare.cloudflared
cloudflared tunnel --url http://localhost:5080
```
This prints a public HTTPS URL instantly — no account, no card. Good for
a live demo link you send an interviewer, less suited to permanent
production use since the URL changes if you restart the tunnel.

**Either way**, once you have a live URL:

1. Set `apiEnabled: true` and `apiUrl: 'https://your-api-url/api'` in `portfolio-app/src/environments/environment.prod.ts`.
2. Set the `AllowedOrigins` environment variable on your API host (or `$env:AllowedOrigins` locally) to your Cloudflare Pages URL, so CORS allows it.
3. Commit and push — Cloudflare Pages rebuilds with the live data and a working AJAX contact form.

See the `README.md` inside each folder for more detail on that piece.
