// Egress test for the analytics (ADR-0026, security condition 5 and counsel condition 2).
// Serves the built site with its real CSP, opens it in Chromium as digitalpantry.co.za (so the
// tracker's data-domains check passes), walks the funnel with personal data typed into the form,
// and fails if anything personal, or any URL query, reaches the analytics endpoint, or if the page
// talks to any host we have not approved. Umami is mocked: nothing leaves this machine.
// Run after `pnpm run build`: node scripts/egress-test.mjs
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist/public");
const HOST = "digitalpantry.co.za";
const ALLOWED_HOSTS = new Set([HOST, "gateway.umami.is", "script.google.com", "script.googleusercontent.com"]);
const PAYLOAD_KEYS = new Set(["website", "screen", "language", "title", "hostname", "url", "referrer", "tag", "id", "name", "data"]);
const PERSONAL = /@|mailto|wa\.me|\d{7,}/i;

// The test visitor's details. None of these may ever reach the analytics endpoint.
const VISITOR = {
  name: "Zanele Testperson",
  business: "Zanele's Test Bakery",
  phone: "082 123 4567",
  email: "zanele.test@example.com",
  message: "Please call 0821234567 or mail zanele.test@example.com",
};

// --- A small static server that applies the CSP from public/_headers (minus the https upgrade, as
// this runs over http) and the clean-URL rules from _redirects.
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
const port = server.address().port;
const base = `http://${HOST}:${port}`;

const browser = await chromium.launch({ args: [`--host-resolver-rules=MAP ${HOST} 127.0.0.1`] });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();

const sends = [];
const leadPosts = [];
const otherHosts = new Set();
const cspErrors = [];
page.on("console", (m) => {
  if (m.type() === "error" && /Content Security Policy|Refused to/i.test(m.text())) cspErrors.push(m.text());
});
await context.route("**/*", async (route) => {
  const req = route.request();
  const url = new URL(req.url());
  if (url.hostname === "gateway.umami.is") {
    sends.push({ raw: req.postData() ?? "", headers: req.headers() });
    return route.fulfill({ status: 200, contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: "{}" });
  }
  // The leads endpoint is mocked: a test must never write to the real Sheet. It answers "not saved",
  // so the form shows its fallback and the test can check those clicks too.
  if (url.hostname === "script.google.com" || url.hostname === "script.googleusercontent.com") {
    leadPosts.push(req.method());
    return route.fulfill({ status: 200, contentType: "application/json", headers: { "Access-Control-Allow-Origin": "*" }, body: '{"ok":false}' });
  }
  if (!ALLOWED_HOSTS.has(url.hostname) && url.protocol.startsWith("http")) {
    otherHosts.add(url.hostname);
    return route.abort();
  }
  return route.continue();
});

// Keep WhatsApp and mailto clicks on the page (React's handlers still run first), so the test can
// check what the click sent without opening WhatsApp or a mail app.
await context.addInitScript(() => {
  document.addEventListener("click", (e) => {
    const a = e.target instanceof Element ? e.target.closest("a[href]") : null;
    if (a && /^(mailto:|https:\/\/wa\.me)/.test(a.getAttribute("href") ?? "")) e.preventDefault();
  });
});

const settle = () => page.waitForTimeout(700);
async function scrollThrough() {
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 400) {
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(60);
  }
  await settle();
}

// --- Walk the funnel.
await page.goto(`${base}/?utm_source=test&fbclid=1234567890`, { waitUntil: "load" });
await settle();
await scrollThrough();

await page.goto(`${base}/pricing`, { waitUntil: "load" });
await settle();
await scrollThrough();
// International prices now come from the header's Local / International switch (no Pricing tab).
await page.locator('[data-testid="market-intl"]:visible').first().click();
// Scroll back up with the wheel: the smooth-scroll library ignores window.scrollTo.
{
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 400) {
    await page.mouse.wheel(0, -400);
    await page.waitForTimeout(60);
  }
}
await settle();
await scrollThrough();
await page.locator('[data-testid="market-za"]:visible').first().click();
await settle();
await page.getByRole("link", { name: /custom quote/ }).click();
await settle();

await page.goto(`${base}/pricing`, { waitUntil: "load" });
await page.getByTestId("button-pricing-standard").scrollIntoViewIfNeeded();
await settle();
await page.getByTestId("button-pricing-standard").click();
await page.waitForURL(/\/contact/);
await settle();

// Form: invalid send first, then a full one. The mocked endpoint says "not saved", so it falls back.
await page.getByTestId("input-name").fill(VISITOR.name);
await page.getByTestId("button-submit").click();
await settle();
await page.getByTestId("input-business-name").fill(VISITOR.business);
await page.getByTestId("input-phone").fill(VISITOR.phone);
await page.getByTestId("input-email").fill(VISITOR.email);
await page.getByTestId("checkbox-mockup").check();
await page.getByTestId("textarea-message").fill(VISITOR.message);
await page.getByTestId("button-submit").click();
await page.getByTestId("lead-fallback").waitFor();
await page.getByTestId("button-fallback-whatsapp").click();
await page.getByTestId("button-fallback-email").click();
await page.getByTestId("button-contact-email").click();
await page.getByTestId("footer-link-email").click();
await settle();

await page.goto(`${base}/websites-for-food-businesses`, { waitUntil: "load" });
await settle();
await page.goto(`${base}/portfolio`, { waitUntil: "load" });
await settle();
await scrollThrough();

// The guard on its own: payloads that must be dropped.
const guardDrops = await page.evaluate(() => {
  const scrub = window.dpUmamiScrub;
  const ok = { website: "x", hostname: "digitalpantry.co.za", url: "https://digitalpantry.co.za/", title: "T", referrer: "" };
  return [
    scrub("identify", { ...ok, id: "abc" }),
    scrub("performance", ok),
    scrub("event", { ...ok, name: "not_on_the_list" }),
    scrub("event", { ...ok, name: "email_click", data: { surface: "a@b.co" } }),
    scrub("event", { ...ok, name: "email_click", data: { surface: "0821234567" } }),
    scrub("event", { ...ok, name: "email_click", data: { href: "footer" } }),
    scrub("event", { ...ok, name: "email_click", data: { surface: "Free text value" } }),
    scrub("event", { ...ok, url: "https://wa.me/27820000000?text=hi" }),
    scrub("event", { ...ok, extra: "x" }),
  ].map((r) => r === null);
});

await browser.close();
server.close();

// --- Checks.
const errors = [];
const events = [];
for (const s of sends) {
  let body;
  try {
    body = JSON.parse(s.raw);
  } catch {
    errors.push(`unreadable payload: ${s.raw.slice(0, 120)}`);
    continue;
  }
  const p = body.payload ?? {};
  if (body.type !== "event") errors.push(`payload type ${body.type} sent`);
  for (const k of Object.keys(p)) if (!PAYLOAD_KEYS.has(k)) errors.push(`unexpected payload key "${k}"`);
  if (p.id) errors.push("payload carries an identify id");
  if (PERSONAL.test(s.raw)) errors.push(`personal-looking data sent: ${s.raw}`);
  if (/[?#]/.test(p.url ?? "") || /[?#]/.test(p.referrer ?? "")) errors.push(`query or hash sent: ${p.url} ${p.referrer}`);
  for (const v of Object.values(p.data ?? {})) if (typeof v !== "string" || !/^[a-z0-9_-]{1,40}$/.test(v)) errors.push(`property value not a fixed value: ${v}`);
  if (s.headers["cookie"]) errors.push("a cookie was sent to the analytics host");
  events.push(p.name ? `${p.name}${p.data ? " " + JSON.stringify(p.data) : ""}` : `pageview ${p.url}`);
}
const has = (re) => events.some((e) => re.test(e));
const expected = {
  "pageview": /^pageview /,
  "package_view (intl)": /package_view .*"market":"intl"/,
  "package_view pricing_shelf": /package_view .*"pricing_shelf"/,
  "custom_project_cta_click": /custom_project_cta_click/,
  "package_cta_click (standard)": /package_cta_click .*"standard"/,
  "enquiry_form_start": /enquiry_form_start/,
  "enquiry_form_error validation": /enquiry_form_error .*validation/,
  "enquiry_form_error rejected": /enquiry_form_error .*rejected/,
  "whatsapp_click form_fallback": /whatsapp_click .*form_fallback/,
  "email_click form_fallback": /email_click .*form_fallback/,
  "email_click contact_card": /email_click .*contact_card/,
  "email_click footer": /email_click .*footer/,
  "segment_page_view food": /segment_page_view .*food/,
  "portfolio_case_study_view": /portfolio_case_study_view/,
};
for (const [label, re] of Object.entries(expected)) if (!has(re)) errors.push(`expected event not seen: ${label}`);
if (!leadPosts.includes("POST")) errors.push("the form never posted to the (mocked) leads endpoint");
if (otherHosts.size) errors.push(`requests to unapproved hosts: ${[...otherHosts].join(", ")}`);
if (cspErrors.length) errors.push(`CSP errors: ${cspErrors.join(" | ")}`);
if (guardDrops.some((d) => !d)) errors.push(`guard let a bad payload through: ${JSON.stringify(guardDrops)}`);

console.log(`${sends.length} analytics requests:\n  ${events.join("\n  ")}`);
if (errors.length) {
  console.error(`\nEgress test FAILED:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("\nEgress test passed: no personal data, no query strings, no unapproved hosts, no CSP errors.");
