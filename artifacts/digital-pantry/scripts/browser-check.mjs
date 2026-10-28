// Browser check for every page (DPW-18). Serves the built site with its real CSP and opens each page
// from the sitemap (plus the 404 page, the public concepts and the client-site copies in /work/) at phone and desktop size, in Night
// and Day. Fails on console or CSP errors, page errors, failed requests to our own site, sideways
// scroll, broken images, or any axe violation (WCAG 2 A/AA). Nothing leaves this machine: analytics
// and the leads endpoint are answered locally.
// Run after `pnpm run build`: node scripts/browser-check.mjs
import { createServer } from "node:http";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist/public");
const HOST = "digitalpantry.co.za";

// --- Static server with the CSP from public/_headers (minus the https upgrade, as this runs over http).
const headersFile = await readFile(path.join(dist, "_headers"), "utf8");
const csp = headersFile.match(/Content-Security-Policy: (.*)/)[1].replace(/;\s*upgrade-insecure-requests/, "");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".json": "application/json", ".txt": "text/plain", ".xml": "application/xml" };
async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  for (const candidate of [clean, `${clean}.html`, path.join(clean, "index.html")]) {
    const file = path.join(dist, candidate);
    if (!file.startsWith(dist)) return null;
    try {
      if ((await stat(file)).isFile()) return file;
    } catch {}
  }
  return null;
}
const server = createServer(async (req, res) => {
  const file = (await resolveFile(req.url)) ?? path.join(dist, "404.html");
  res.writeHead(file.endsWith("404.html") && !req.url.startsWith("/404") ? 404 : 200, {
    "Content-Type": TYPES[path.extname(file)] ?? "application/octet-stream",
    "Content-Security-Policy": csp,
  });
  res.end(await readFile(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://${HOST}:${server.address().port}`;

// --- Pages: the sitemap, the 404 page and every public concept.
const sitemap = await readFile(path.join(dist, "sitemap.xml"), "utf8");
const paths = [...sitemap.matchAll(/<loc>https:\/\/[^/]+(\/[^<]*)<\/loc>/g)].map((m) => m[1]);
paths.push("/404");
for (const dir of ["concepts", "work"]) {
  for (const c of await readdir(path.join(dist, dir)).catch(() => [])) paths.push(`/${dir}/${c}/`);
}

const VIEWPORTS = [{ name: "phone", width: 393, height: 852 }, { name: "desktop", width: 1440, height: 900 }];
const THEMES = ["dark", "light"];

const browser = await chromium.launch({ args: [`--host-resolver-rules=MAP ${HOST} 127.0.0.1`] });
const failures = [];
let runs = 0;

for (const theme of THEMES) {
  for (const vp of VIEWPORTS) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, reducedMotion: "reduce" });
    await context.addInitScript((t) => { try { localStorage.setItem("dp-theme", t); } catch {} }, theme);
    await context.route("**/*", (route) => {
      const host = new URL(route.request().url()).hostname;
      if (host === "gateway.umami.is" || host.startsWith("script.google")) {
        return route.fulfill({ status: 200, contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: "{}" });
      }
      if (host !== HOST) return route.abort();
      return route.continue();
    });

    for (const p of paths) {
      runs++;
      const label = `${p} · ${vp.name} · ${theme === "dark" ? "Night" : "Day"}`;
      const page = await context.newPage();
      const problems = [];
      page.on("console", (m) => { if (m.type() === "error") problems.push(`console: ${m.text().slice(0, 300)}`); });
      page.on("pageerror", (e) => problems.push(`page error: ${e.message.slice(0, 300)}`));
      page.on("response", (r) => {
        const u = new URL(r.url());
        if (u.hostname === HOST && r.status() >= 400 && !(p === "/404" && u.pathname === "/404")) problems.push(`HTTP ${r.status()} ${u.pathname}`);
      });

      await page.goto(base + p, { waitUntil: "load" });
      // Scroll to the bottom and back so lazy images load and reveal animations finish before axe runs.
      const height = await page.evaluate(() => document.body.scrollHeight);
      for (let y = 0; y < height; y += 600) await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(400);

      const info = await page.evaluate(() => ({
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        broken: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute("src")),
      }));
      if (info.overflow > 0) problems.push(`sideways scroll: ${info.overflow}px`);
      if (info.broken.length) problems.push(`broken images: ${info.broken.join(", ")}`);

      const axe = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      for (const v of axe.violations) {
        problems.push(`axe ${v.id} (${v.impact}): ${v.nodes.length}x, e.g. ${v.nodes[0].target.join(" ")}`);
      }

      if (problems.length) failures.push({ label, problems });
      await page.close();
    }
    await context.close();
  }
}
await browser.close();
server.close();

if (failures.length) {
  for (const f of failures) console.error(`✗ ${f.label}\n  - ${f.problems.join("\n  - ")}`);
  console.error(`\nBrowser check failed: ${failures.length} of ${runs} page runs have problems.`);
  process.exit(1);
}
console.log(`Browser check passed: ${runs} page runs (${paths.length} pages x phone/desktop x Night/Day), no errors, no sideways scroll, no broken images, no axe violations.`);
