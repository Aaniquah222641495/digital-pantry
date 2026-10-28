# The Digital Pantry website

Studio site for Digital Pantry Web Studio: portfolio, pricing and contact. Live at https://digitalpantry.co.za.

## What runs where

- **The live site** is `artifacts/digital-pantry`: React + Vite + Tailwind, built to static files and hosted on Netlify.
- It has no server of its own. The contact form posts to a small Google Apps Script (`apps-script/`) that saves each lead to a Google Sheet and emails alerts (see "Lead form" below). If that is not set up or fails, the form falls back to WhatsApp and email. No cookies, no analytics.
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
- GitHub Actions (`.github/workflows/ci.yml`) runs typecheck, build, the analytics egress test, a browser check and a dependency audit on every pull request.
- Browser check (`pnpm --filter @workspace/digital-pantry run test:browser`, after a build): every sitemap page, the 404 page and each `/concepts/` site at 393 and 1440 px in Night and Day, under the real CSP. Fails on console, CSP or page errors, failed requests, sideways scroll, broken images or any axe (WCAG 2.1 A/AA) violation.
- Dependabot opens weekly update PRs.

## Lead form

- `src/components/LeadForm.tsx` (used on Contact), rules and request code in `src/lib/leads.ts`. The "Free mock-up" bands on Home and Pricing link to `/contact?interest=mockup`.
- The backend is `apps-script/Code.gs`. Click-by-click set-up, quotas and how the browser talks to it: `apps-script/README.md`.
- **Endpoint:** the Apps Script web app URL lives in `src/lib/leads.ts` (`DEFAULT_ENDPOINT`; public by design, no secret), so the form works on any host. The build fails if it is missing. `VITE_LEADS_ENDPOINT` overrides it at build time (e.g. a test deployment). If you redeploy the Apps Script as a new web app, update `DEFAULT_ENDPOINT`.
- The field limits and the phone rule live in two places, `src/lib/leads.ts` and `apps-script/Code.gs`. Change both together.
- Never submit real leads while testing: mock the endpoint (Playwright `page.route`) or use your own details.

## SEO and AI search

- Every page is **prerendered** at build time (`scripts/prerender.mjs`), so Google, Bing and AI crawlers (ChatGPT, Claude, Perplexity, which mostly don't run JavaScript) get the full content, title, description and structured data in plain HTML. React then hydrates it in the browser.
- **All titles, descriptions, structured data (JSON-LD) and the FAQ live in `src/seo.ts`.** The sitemap is generated from it. Keep titles under 60 characters and descriptions under 155, and only state facts that are on the site.
- **Adding a page:** add the route in `App.tsx`, an entry in `PAGES` in `src/seo.ts`, and a line in `public/_redirects`. Update `public/llms.txt`.
- **Changing prices:** update `src/lib/plans.ts` (shown on Pricing and in the contact form), `src/seo.ts` (PLANS) and `public/pricing.md`. The build fails if the pricing page stops showing a price the structured data uses.
- `public/llms.txt` (summary for AI assistants), `public/pricing.md` (prices as plain text), `public/robots.txt` (all crawlers allowed, AI bots named).
- Bump `LAST_UPDATED` in `src/seo.ts` when content changes (it feeds the sitemap).

## Netlify files (in `artifacts/digital-pantry/public/`)

- `_headers`: security headers (CSP and friends) and caching. If you add a new outside service (fonts, embeds, scripts), add its domain to the Content-Security-Policy or the browser will block it.
- `_redirects`: clean URLs (`/pricing`) serve the prerendered `pricing.html`; anything else serves `404.html` with a real 404 status.
- `og-card.jpg` (1200x630) is the link preview card for every page (WhatsApp, LinkedIn, X). Give a replacement a new filename: WhatsApp caches previews by image URL.

## Releasing

Branch, open a PR, let CI pass, then merge to `main` (founder's yes). Netlify then deploys it (the build settings live in the Netlify dashboard, not this repo). To undo a bad deploy: Netlify > Deploys > pick the last good one > "Publish deploy".
