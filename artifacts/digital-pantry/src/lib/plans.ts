// Package names and prices shown on the site. Pricing.tsx and the contact form both read
// from here so a price is only typed once in the React code. Keep src/seo.ts (numbers) and
// public/pricing.md in step when a price changes (README, "Changing prices").
export const PLAN_PRICES = {
  Starter: "R600",
  Standard: "R1 000",
  Premium: "R1 600",
  Pro: "R2 500",
} as const;
