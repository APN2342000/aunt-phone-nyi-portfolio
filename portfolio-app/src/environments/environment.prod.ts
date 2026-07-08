// By default, production runs WITHOUT a live backend — the site uses the
// bundled fallback data (see portfolio.fallback-data.ts) and the contact
// form opens the visitor's email client instead of posting to an API.
// This means the deployed site works 24/7 with zero servers to keep
// running, and zero hosting accounts to sign up for.
//
// If you later stand up a live Portfolio.Api (self-hosted tunnel, Koyeb,
// Render, etc.), flip apiEnabled to true and set apiUrl to that address —
// the site will then fetch live data and post real contact messages.
export const environment = {
  production: true,
  apiEnabled: false,
  apiUrl: 'https://your-deployed-api.example.com/api'
};
