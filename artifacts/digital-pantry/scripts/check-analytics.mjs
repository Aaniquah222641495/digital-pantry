// Static checks for the analytics setup (ADR-0026). Runs in CI before the build; no browser needed.
// Fails if the vendored tracker changed without review, the script tag or CSP drifted, or code
// outside src/lib/analytics.ts talks to Umami directly.
import { createHash } from "node:crypto";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => readFile(path.join(root, p), "utf8");
const errors = [];
const fail = (msg) => errors.push(msg);

// 1. The vendored tracker is byte-for-byte the reviewed upstream file (after our 5-line header).
const TRACKER_SHA256 = "91a876d767646fd5b7701b6fabf97f8a99ae53b94e7e5b58d465bad1e5d763e0";
const tracker = (await read("public/js/u.js")).split("\n");
const body = tracker.slice(5).join("\n");
const sha = createHash("sha256").update(body).digest("hex");
if (sha !== TRACKER_SHA256) fail(`public/js/u.js changed (sha256 ${sha}). Review the new tracker, then update the hash here and in its header.`);
if (!tracker[2].includes(TRACKER_SHA256)) fail("public/js/u.js header does not state the pinned sha256");

// 2. Script tags: guard first, then the tracker with every privacy setting, and nothing that identifies people.
const html = await read("index.html");
const guardAt = html.indexOf('<script defer src="/js/u-guard.js"></script>');
const tag = html.match(/<script defer src="\/js\/u\.js"[^>]*><\/script>/)?.[0];
if (guardAt < 0) fail("index.html: /js/u-guard.js script tag missing");
if (!tag) fail("index.html: /js/u.js script tag missing");
else {
  if (html.indexOf(tag) < guardAt) fail("index.html: u-guard.js must come before u.js");
  for (const attr of [
    'data-domains="digitalpantry.co.za"',
    'data-exclude-search="true"',
    'data-exclude-hash="true"',
    'data-do-not-track="true"',
    'data-before-send="dpUmamiScrub"',
  ]) {
    if (!tag.includes(attr)) fail(`index.html: u.js tag is missing ${attr}`);
  }
  for (const attr of ["data-host-url", "data-distinct-id", "data-tag", "data-performance", "data-fetch-credentials"]) {
    if (tag.includes(attr)) fail(`index.html: u.js tag must not set ${attr}`);
  }
}

// 3. CSP: scripts from our own site only; the one analytics host is in connect-src.
const csp = (await read("public/_headers")).match(/Content-Security-Policy: (.*)/)?.[1] ?? "";
if (!/(^|; )script-src 'self';/.test(csp)) fail("_headers: script-src must stay 'self' only");
if (!/connect-src [^;]*https:\/\/gateway\.umami\.is/.test(csp)) fail("_headers: connect-src is missing https://gateway.umami.is");
if (csp.includes("cloud.umami.is")) fail("_headers: cloud.umami.is is not approved (ADR-0026 security review)");

// 4. Only src/lib/analytics.ts talks to Umami; no identify calls or click attributes anywhere.
async function walk(dir) {
  const out = [];
  for (const e of await readdir(path.join(root, dir), { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (/\.(tsx?|jsx?)$/.test(e.name)) out.push(p);
  }
  return out;
}
for (const file of await walk("src")) {
  const src = await read(file);
  // Lowercase only: the privacy notice names "Umami" in its text, which is fine.
  if (file === path.join("src", "lib", "analytics.ts")) {
    if (/\.identify\s*\(/.test(src)) fail(`${file}: umami.identify is not allowed`);
    continue;
  }
  if (/\bumami\b/.test(src)) fail(`${file}: only src/lib/analytics.ts may use Umami directly`);
  if (/\bidentify\s*\(/.test(src)) fail(`${file}: umami.identify is not allowed`);
  if (/data-umami-event/.test(src)) fail(`${file}: data-umami-event attributes are not allowed; use track()`);
}

// 5. The guard and the wrapper allow the same event names and property keys.
const ts = await read("src/lib/analytics.ts");
const guard = await read("public/js/u-guard.js");
const list = (src, name) => {
  const m = src.match(new RegExp(`${name}\\s*=\\s*\\[([\\s\\S]*?)\\]`));
  return m ? [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]).sort().join(",") : "";
};
for (const name of ["EVENTS", "PROP_KEYS"]) {
  if (!list(ts, name) || list(ts, name) !== list(guard, name)) fail(`${name} differs between src/lib/analytics.ts and public/js/u-guard.js`);
}

if (errors.length) {
  console.error(`Analytics check failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}
console.log("Analytics check passed: tracker pinned, tag and CSP as approved, Umami only in analytics.ts.");
