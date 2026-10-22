# The Digital Pantry website

Studio site for Digital Pantry Web Studio: portfolio, pricing and contact. Live at https://thedigitalpantry.netlify.app.

## What runs where

- **The live site** is `artifacts/digital-pantry`: React + Vite + Tailwind, built to static files and hosted on Netlify.
- It has no backend. The contact form opens the visitor's own email app (`mailto:`); WhatsApp links go to wa.me. No cookies, no analytics.
- `.replit` is kept so the site can still be opened in Replit. The unused Replit scaffolding (API server, database, codegen, mockup sandbox) was removed on 2026-10-22.

## Run it locally

Needs Node 24 and pnpm 10 (the lockfile and the overrides in `pnpm-workspace.yaml` need pnpm 10; pnpm 9 ignores them).

```sh
pnpm install
PORT=5173 BASE_PATH=/ pnpm --filter @workspace/digital-pantry run dev
```

Build the static site (output in `artifacts/digital-pantry/dist/public`):

```sh
NODE_ENV=production PORT=3000 BASE_PATH=/ pnpm --filter @workspace/digital-pantry run build
```

`PORT` and `BASE_PATH` are required by `vite.config.ts`, even for a build.

## Checks

- `pnpm run typecheck` checks the whole workspace.
- GitHub Actions (`.github/workflows/ci.yml`) runs typecheck, build and a dependency audit on every pull request.
- Dependabot opens weekly update PRs.

## Netlify files (in `artifacts/digital-pantry/public/`)

- `_headers`: security headers (CSP and friends) and caching. If you add a new outside service (fonts, embeds, scripts), add its domain to the Content-Security-Policy or the browser will block it.
- `_redirects`: real pages return 200; anything else shows the 404 page with a real 404 status. **Add a line here when you add a page**, plus a `<url>` in `sitemap.xml`.
- `robots.txt`, `sitemap.xml`, `opengraph.jpg` (link preview image).

## Releasing

Branch, open a PR, let CI pass, then merge to `main` (founder's yes). Netlify then deploys it (the build settings live in the Netlify dashboard, not this repo). To undo a bad deploy: Netlify > Deploys > pick the last good one > "Publish deploy".
