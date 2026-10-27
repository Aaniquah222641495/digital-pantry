// Runs after `vite build`. Saves every page as finished HTML so search engines and AI
// crawlers (most of which don't run JavaScript) can read the content, titles and
// structured data. React then attaches to this HTML in the browser (hydrateRoot).
import { readFile, writeFile, rm, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(here, "../dist/public");
const serverEntry = path.resolve(here, "../dist/server/entry-server.js");

const { render, PAGES, NOT_FOUND, headHtml, SITE_URL, LAST_UPDATED } = await import(pathToFileURL(serverEntry).href);
const template = await readFile(path.join(out, "index.html"), "utf8");

if (!SITE_URL || !LAST_UPDATED) throw new Error("entry-server.tsx must export SITE_URL and LAST_UPDATED");
if (!template.includes("<!--seo-->") || !template.includes('<div id="root"></div>')) {
  throw new Error("index.html is missing the <!--seo--> marker or the empty #root div");
}

// Preload the fonts used at the top of every page (body sans and the pixel lettering), so text
// paints in its final font and doesn't jump when the font arrives (layout shift).
const assets = await readdir(path.join(out, "assets"));
const preloads = [/^geist-latin-wght-normal-.*\.woff2$/, /^jersey-10-latin-400-normal-.*\.woff2$/]
  .map((re) => assets.find((f) => re.test(f)))
  .filter(Boolean)
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`)
  .join("\n    ");

const fileFor = (p) => (p === "/" ? "index.html" : p === NOT_FOUND.path ? "404.html" : `${p.slice(1)}.html`);

for (const page of [...PAGES, NOT_FOUND]) {
  const routePath = page === NOT_FOUND ? "/this-page-does-not-exist" : page.path;
  const body = await render(routePath);
  if (body.includes("<script")) throw new Error(`Inline script in ${page.path}: it would break the CSP`);
  // Guard: structured-data prices must match what the site shows. The server HTML is always Local, so
  // rand prices are checked on Pricing. The dollar prices only show on Pricing once a visitor flips the
  // Local / International switch, so they are checked on /faq, whose "international clients" answer
  // states them in plain text (src/lib/faq.ts). Pricing has no custom-quote number any more (it says
  // "ask us"), so R8 000 is checked on /faq too, where the bigger-companies answer states it.
  const mustShow = {
    "/pricing": ["R600", "R1 000", "R1 600", "R2 500", "R150"],
    "/faq": ["R8 000", "$450", "$750", "$1 200", "$1 800", "$90"],
  }[page.path];
  for (const price of mustShow ?? []) {
    if (!body.includes(price)) throw new Error(`${page.path} no longer shows ${price}: update src/seo.ts and public/pricing.md`);
  }
  const html = template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, `${preloads}\n    ${headHtml(page)}`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  await writeFile(path.join(out, fileFor(page.path)), html);
  console.log(`prerendered ${page.path.padEnd(11)} -> ${fileFor(page.path)} (${Math.round(body.length / 1024)} KB)`);
}

// Sitemap built from the same page list, so a new page can't be forgotten.
const urls = PAGES.filter((p) => !p.noindex)
  .map((p) => `  <url><loc>${SITE_URL}${p.path === "/" ? "/" : p.path}</loc><lastmod>${LAST_UPDATED}</lastmod></url>`)
  .join("\n");
await writeFile(
  path.join(out, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`sitemap.xml with ${PAGES.length} pages`);

await rm(path.resolve(here, "../dist/server"), { recursive: true, force: true });
