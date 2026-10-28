// Package names and prices shown on the site. Pricing.tsx, the shelf and the contact form all read
// from here so a price is only typed once in the React code. Keep src/seo.ts (numbers) and
// public/pricing.md in step when a price changes (README, "Changing prices").
// Founder decisions 2026-10-23 (ops/research/2026-10-23-pricing-tiers-and-international.md):
// ZAR packages are for small businesses with up to 10 staff; larger businesses are quoted from
// R8 000; international clients have their own USD packages.
// Thousands use a no-break space (\u00a0) so a price never wraps across two lines.
export const PLAN_PRICES = {
  Starter: "R600",
  Standard: "R1\u00a0000",
  Premium: "R1\u00a0600",
  Pro: "R2\u00a0500",
} as const;

export const INTL_PRICES = {
  Starter: "$450",
  Standard: "$750",
  Premium: "$1\u00a0200",
  Pro: "$1\u00a0800",
} as const;

// Turnaround, with the conditions from ADR-0025 (founder, 2026-10-26; per-package times amended
// 2026-10-28). Every "from 5 business days" on the site uses TURNAROUND_TERMS or the short note below,
// so the promise is never unconditional.
// Meta descriptions and JSON-LD are too short for the conditions, so they leave the number out.
export const TURNAROUND_TERMS =
  "When your deposit is paid, we plan your pages and send a content checklist (photos, menu, text). Build time starts once everything on it is in: Starter 5 to 7 business days, Standard 7 to 10, Premium 10 to 15 and Pro 15 to 20. Feedback within 2 business days keeps the date; slower feedback moves it by the same amount. Waiting on a domain registrar or on Google is not counted. Online shops and custom builds get an estimate in the quote.";
// Build time per package, shown on each Pricing card with TURNAROUND_TERMS underneath.
export const TURNAROUND_DAYS = { Starter: "5 to 7", Standard: "7 to 10", Premium: "10 to 15", Pro: "15 to 20" } as const;
export const TURNAROUND_NOTE =
  "Starter 5 to 7 business days, Standard 7 to 10, Premium 10 to 15, Pro 15 to 20, counted from when your deposit is paid and all your content is in. Online shops and custom builds are estimated in the quote.";

// What a package price does not cover (DPW-4; founder-settled S4/S6, 2026-10-26). Hosting is left out
// on purpose: it is stated only after web-finance confirms. Pricing.tsx, the FAQ (seo.ts) and
// public/pricing.md repeat this wording, so change them together.
// Plain words for the client: no registrar names (founder 2026-10-27).
export const INCLUDED_ALWAYS = [
  "Your site, designed and built from scratch",
  "Looks right on phones, tablets and laptops",
  "Your own domain connected",
  "2 rounds of revisions",
] as const;
export const EXTRAS = [
  { name: "Email on your domain", cost: "optional", note: "Like hello@yourbusiness.co.za. Small monthly fee, quoted first." },
  { name: "Branding design", cost: "quoted", note: "A logo, colours and fonts made for your business." },
  { name: "Writing your text", cost: "quoted", note: "Rather not write it yourself? We can." },
  { name: "Online shop and payments", cost: "quoted", note: "Priced to your products." },
  { name: "Extra changes", cost: "quoted", note: "After the 2 revision rounds, or bigger than the small edits in care." },
] as const;
// Every site goes live on its own domain (founder 2026-10-27: a must, it looks professional).
// Package prices exclude the domain (founder 2026-10-27): we register it in the client's name, they pay the fee.
// After year one: on care we renew it (at cost); otherwise the client renews it.
export const DOMAIN_FEE = "R100 to R150 a year";
export const BILLED_SEPARATELY = EXTRAS.map((e) => `${e.name} (${e.cost}): ${e.note}`);
export const BILLED_SEPARATELY_SUMMARY =
  "Package prices cover the site build only. Every site needs its own domain: we register it in your name and you pay its fee, about R100 to R150 a year. Extras, only if you want them: branding design, email on your own domain, copywriting, online shops and payments, and changes beyond 2 rounds of revisions or beyond the small edits in care. We quote any extra work in writing first.";

export const SMALL_BUSINESS_LIMIT = "up to 10 staff";
export const LARGER_FROM = "R8 000";

// Monthly care (ADR-0032 proposed: the default from launch, month to month; or we hand the site over).
// USD keeps the same premium as the international packages (founder: "you choose",
// 2026-10-24). Larger businesses get theirs quoted with the build.
export const RETAINER = "R150";
export const INTL_RETAINER = "$90";

// Free mock-up terms (DPW-7; ADR-0025, founder 2026-10-26). The form note, the FAQ, pricing.md and
// llms.txt all say the same thing, so change them together. The offer band (FreeTaste.tsx) shows
// only the short facts and links to the FAQ (founder 2026-10-26: "too much information").
// Excluded until the deposit is paid: development, a live link, source files, revisions.
export const MOCKUP_FORM_NOTE =
  "One free mock-up per business, for qualified enquiries: phone and desktop videos and a quote PDF within 5 business days of your brief. Nothing goes live or is editable until the deposit is paid.";
export const MOCKUP_TERMS =
  "One free mock-up per business, for qualified enquiries: a real business, with the decision-maker, open to a paid build. You get a mock-up pack (phone and desktop videos and a quote PDF), not a working site, within 5 business days of your brief. Development, a live link, source files and revisions start once the deposit is paid, and the concept and files stay ours until the agreed fee is paid.";

// Local / International switch (header). Copy that carries a price writes a token such as {Starter} or
// {retainer}; priced() fills it for the visitor's market. The prerendered HTML and the structured data
// always use "za", so what crawlers read matches what a first-time local visitor sees.
export type Market = "za" | "intl";
export type PlanName = keyof typeof PLAN_PRICES;
export const priceFor = (name: PlanName, market: Market) => (market === "intl" ? INTL_PRICES[name] : PLAN_PRICES[name]);
export const retainerFor = (market: Market) => (market === "intl" ? INTL_RETAINER : RETAINER);
export const priced = (text: string, market: Market) =>
  text.replace(/\{(Starter|Standard|Premium|Pro|retainer)\}/g, (_, k: string) => (k === "retainer" ? retainerFor(market) : priceFor(k as PlanName, market)));
