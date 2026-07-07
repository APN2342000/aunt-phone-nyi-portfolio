# Portfolio.Api

The .NET backend for Aunt Phone Nyi's portfolio. A small ASP.NET Core Web
API that serves resume content as JSON and accepts contact-form
submissions.

## Stack

- ASP.NET Core 8 (Minimal hosting model, Controllers)
- Swagger / OpenAPI (available in Development at `/swagger`)
- Static in-memory seed data (see `Data/PortfolioData.cs`) — swap for a
  MySQL-backed repository via EF Core when you're ready, matching the MySQL
  skill on the resume

## Getting started

Requires the [.NET 8 SDK](https://dotnet.microsoft.com/download).

```bash
dotnet restore
dotnet run
```

By default this starts on `http://localhost:5080` (see
`Properties/launchSettings.json`), with Swagger UI at
`http://localhost:5080/swagger`.

## Endpoints

| Method | Route                  | Description                          |
|--------|------------------------|---------------------------------------|
| GET    | `/api/portfolio`       | Everything in one payload             |
| GET    | `/api/portfolio/profile`    | Name, title, about, contact info |
| GET    | `/api/portfolio/skills`     | Skill groups                     |
| GET    | `/api/portfolio/experience` | Work history                     |
| GET    | `/api/portfolio/education`  | Degrees                          |
| GET    | `/api/portfolio/projects`   | Projects                         |
| GET    | `/api/portfolio/strengths`  | Strengths list                   |
| GET    | `/api/portfolio/languages`  | Languages                        |
| POST   | `/api/contact`         | Submit a contact message (logged server-side) |

## Editing your content

Everything lives in `Data/PortfolioData.cs` as plain C# — edit the strings
and lists there. No database required to get started.

## CORS

`Program.cs` allows `http://localhost:4200` (the Angular dev server) by
default. Add your deployed frontend's origin to the `AngularDevCors` policy
before deploying.

## Next steps for production

- Wire `ContactController` to an actual email provider (SendGrid, SMTP) or
  persist messages to a database instead of just logging them.
- If you want the content editable without redeploying, replace
  `PortfolioData` with an EF Core `DbContext` against MySQL.
- Add authentication if you ever want an admin-only edit endpoint.

## Docker

A `Dockerfile` is included for container-based hosts (Render, Fly.io,
Azure Container Apps, etc.):

```bash
docker build -t portfolio-api .
docker run -p 8080:8080 -e PORT=8080 portfolio-api
```

`Program.cs` reads the `PORT` env var at startup and binds Kestrel to it —
this is what lets the same image run unmodified on Render, Fly.io, or any
host that assigns a port dynamically.

## Deploying to Render for free

See the top-level `README.md` (`Deploying for free` section) for the full
walkthrough. Short version: **New → Blueprint** on Render, pointed at this
repo — it picks up `../render.yaml` and deploys this folder as a free
Docker web service.
