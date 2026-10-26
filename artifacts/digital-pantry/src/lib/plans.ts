// Package names and prices shown on the site. Pricing.tsx, the shelf and the contact form all read
// from here so a price is only typed once in the React code. Keep src/seo.ts (numbers) and
// public/pricing.md in step when a price changes (README, "Changing prices").
// Founder decisions 2026-10-23 (ops/research/2026-10-23-pricing-tiers-and-international.md):
// ZAR packages are for small businesses with up to 10 staff; larger businesses are quoted from
// R8 000; international clients have their own USD packages.
export const PLAN_PRICES = {
  Starter: "R600",
  Standard: "R1 000",
  Premium: "R1 600",
  Pro: "R2 500",
} as const;

export const INTL_PRICES = {
  Starter: "$450",
  Standard: "$750",
  Premium: "$1 200",
  Pro: "$1 800",
} as const;

// Turnaround, with the conditions from ADR-0025 (founder, 2026-10-26). Every "5 to 7 business days"
// on the site uses TURNAROUND_TERMS or the short note below, so the promise is never unconditional.
// Meta descriptions and JSON-LD are too short for the conditions, so they leave the number out.
export const TURNAROUND_TERMS =
  "Starter, Standard and Premium sites take 5 to 7 business days, counted from when your deposit is paid and all your content is in. Feedback within 2 business days keeps the date; slower feedback moves it by the same amount. Waiting on a domain registrar is not counted. Pro, e-commerce and custom builds get an estimate in the quote.";
export const TURNAROUND_NOTE =
  "Starter, Standard and Premium sites, counted from when your deposit is paid and all your content is in. Pro, e-commerce and custom builds are estimated in the quote.";

// What a package price does not cover (DPW-4; founder-settled S4/S6, 2026-10-26). Hosting is left out
// on purpose: it is stated only after web-finance confirms. Pricing.tsx, the FAQ (seo.ts) and
// public/pricing.md repeat this wording, so change them together.
export const BILLED_SEPARATELY = [
  "Your domain name. You buy it in your own name and it is yours. A .co.za renews at about R110 a year at xneelo (checked October 2026). Premium and Pro include the setup, not the registration fee.",
  "Email on your own domain, if you want it (a mail plan from your domain provider).",
  "Copywriting, if you want us to write your text.",
  "Online shops and payments (e-commerce), which are quoted separately.",
  "Changes beyond 2 rounds of revisions, and edits beyond the retainer's small updates. We quote these in writing before we start.",
] as const;
export const BILLED_SEPARATELY_SUMMARY =
  "Package prices cover the site build only. Billed separately: your domain name (you buy and own it; a .co.za renews at about R110 a year), email on your own domain, copywriting, online shops and payments, and changes beyond 2 rounds of revisions or beyond the retainer's small updates. We quote any extra work in writing first.";

export const SMALL_BUSINESS_LIMIT = "up to 10 staff";
export const LARGER_FROM = "R8 000";

// What moves a custom quote. Shown on Pricing (larger tab) and the Business projects page.
export const LARGER_DRIVERS = [
  "How many pages and how much content",
  "Integrations: bookings, payments, forms, your systems",
  "Brand and design work needed",
  "Timeline and how many people sign off",
] as const;

// Monthly retainer. USD keeps the same premium as the international packages (founder: "you choose",
// 2026-10-24). Larger businesses get theirs quoted with the build.
export const RETAINER = "R120";
export const INTL_RETAINER = "$90";

// Free mock-up terms (DPW-7; ADR-0025, founder 2026-10-26). The band, the form note, the FAQ,
// pricing.md and llms.txt all say the same thing, so change them together.
// Excluded until the deposit is paid: development, a live link, source files, revisions.
export const MOCKUP_BAND =
  "One free concept per business, for qualified enquiries. You get phone and desktop videos and a quote PDF within 5 business days of your brief. It's a mock-up, not a working site: nothing goes live and nothing is editable until the deposit is paid.";
export const MOCKUP_FORM_NOTE =
  "One free concept per business, for qualified enquiries: phone and desktop videos and a quote PDF within 5 business days of your brief. Nothing goes live or is editable until the deposit is paid.";
export const MOCKUP_TERMS =
  "One free concept per business, for qualified enquiries: a real business, with the decision-maker, open to a paid build. You get a mock-up pack (phone and desktop videos and a quote PDF), not a working site, within 5 business days of your brief. Development, a live link, source files and revisions start once the deposit is paid, and the concept and files stay ours until the agreed fee is paid.";
