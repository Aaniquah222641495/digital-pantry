// Copies a client site we built into public/work/<slug>/ so Portfolio can open the exact version the
// client approved, before (or instead of) their own domain. Founder 2026-10-28: Stuff'd Bagels until
// stuffdbagels.co.za exists.
// Build the client site first with its Vite base set to /work/<slug>/ (BASE_PATH=/work/<slug>/), then:
//   node scripts/import-work.mjs <client dist/public> <slug>
// What it does:
// - copies the build, minus host files (_headers, _redirects, robots.txt, sitemap.xml, llms.txt, *.md, 404.html);
// - prefixes root paths in HTML, JS and CSS ("/ig/a.jpg" -> "/work/<slug>/ig/a.jpg") for files in the copy;
// - points calls to the client's own API ("/api/<name>") at a static "null" file, as our site has no API;
// - adds the studio's "Want a website like this?" card (public/showcase.js and .css);
// - drops files nothing references, so the copy stays small.
// The copy is noindex (public/_headers), and its canonical still names the client's own site.
import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const [src, slug] = process.argv.slice(2);
if (!src || !/^[a-z0-9-]+$/.test(slug ?? "")) throw new Error("usage: node scripts/import-work.mjs <client dist/public> <slug>");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dest = path.join(root, "public/work", slug);
const base = `/work/${slug}`;
const SKIP = new Set(["_headers", "_redirects", "robots.txt", "sitemap.xml", "llms.txt", "404.html"]);

await rm(dest, { recursive: true, force: true });
await mkdir(dest, { recursive: true });
await cp(path.resolve(src), dest, {
  recursive: true,
  filter: (f) => !SKIP.has(path.basename(f)) && !f.endsWith(".md") && path.basename(f) !== ".DS_Store",
});

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else out.push(p);
  }
  return out;
}
const rel = (f) => "/" + path.relative(dest, f).split(path.sep).join("/");
let files = await walk(dest);
const code = files.filter((f) => /\.(html|js|css)$/.test(f));

// Root paths of the copy's own files, longest first so "/logo-white.svg" wins over "/logo".
const own = files.map(rel).filter((p) => !p.startsWith("/assets/")).sort((a, b) => b.length - a.length);
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const ownRe = new RegExp(`(["'\`(\\s,])(${own.map(esc).join("|")})(?=["'\`)\\s,?#])`, "g");
const apiRe = /(["'`])\/api\/([a-z0-9-]+)\1/g;
const apis = new Set();

for (const f of code) {
  let s = await readFile(f, "utf8");
  s = s.replace(ownRe, (_, q, p) => `${q}${base}${p}`);
  s = s.replace(apiRe, (_, q, name) => (apis.add(name), `${q}${base}/api/${name}.json${q}`));
  await writeFile(f, s);
}
// The studio's "Want a website like this?" card (public/showcase.*), on every page of the copy.
for (const f of code.filter((f) => f.endsWith(".html"))) {
  const s = await readFile(f, "utf8");
  if (!s.includes("/showcase.js")) await writeFile(f, s.replace("</head>", '<link rel="stylesheet" href="/showcase.css"><script src="/showcase.js" defer></script></head>'));
}
for (const name of apis) {
  await mkdir(path.join(dest, "api"), { recursive: true });
  await writeFile(path.join(dest, "api", `${name}.json`), "null\n");
}

// Drop files no HTML, JS or CSS mentions (fallback images the page never uses, originals, spares).
const text = (await Promise.all(code.map((f) => readFile(f, "utf8")))).join("\n");
files = await walk(dest);
let dropped = 0;
for (const f of files) {
  const p = rel(f);
  if (/\.(html|js|css|json)$/.test(f) || p.startsWith("/assets/") || text.includes(`${base}${p}`)) continue;
  await rm(f);
  dropped++;
}
const kept = await walk(dest);
const bytes = (await Promise.all(kept.map((f) => stat(f)))).reduce((n, s) => n + s.size, 0);
console.log(`Imported ${slug}: ${kept.length} files, ${(bytes / 1048576).toFixed(1)} MB (${dropped} unused dropped). API stubs: ${[...apis].join(", ") || "none"}.`);
