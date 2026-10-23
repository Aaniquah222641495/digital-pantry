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

export const SMALL_BUSINESS_LIMIT = "up to 10 staff";
export const LARGER_FROM = "R8 000";

// Monthly retainer. USD keeps the same premium as the international packages (founder: "you choose",
// 2026-10-24). Larger businesses get theirs quoted with the build.
export const RETAINER = "R120";
export const INTL_RETAINER = "$90";
