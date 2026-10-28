import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useTheme } from "./ThemeContext";

// Each side links to its own founder's WhatsApp: Day = Aaniquah, Night = Imaan.
// The numbers are never shown on the page (founder, 2026-10-28): visitors see one only once they
// open WhatsApp. The studio email is the shared inbox for both, and the only contact we publish to
// search engines and AI assistants (founder, 2026-10-24), so the wa.me links are left out of the
// prerendered HTML that crawlers read and appear only once the page runs in a visitor's browser.
const SIDES = {
  light: { name: "Aaniquah", whatsapp: "27724111011" },
  dark: { name: "Imaan", whatsapp: "27797027491" },
} as const;

export const STUDIO_EMAIL = "thedigitalpantryza@gmail.com";

// Page names used in the prefilled WhatsApp message (DPW-25). The message carries the page name only:
// no personal data, and nothing about the visitor.
const PAGE_NAMES: Record<string, string> = {
  "/": "Home",
  "/portfolio": "Portfolio",
  "/pricing": "Pricing",
  "/contact": "Contact",
  "/privacy": "Privacy",
  "/websites-for-food-businesses": "Websites for food businesses",
  "/websites-for-beauty-businesses": "Websites for nails and beauty",
  "/websites-for-product-brands": "Websites for product brands",
  "/websites-for-trades-and-local-services": "Websites for trades and local services",
};

export function whatsappText(name: string, path: string): string {
  const page = PAGE_NAMES[path.replace(/\/+$/, "") || "/"];
  return page
    ? `Hi ${name}, I'm on the ${page} page of the Digital Pantry website and have a question.`
    : `Hi ${name}, I'm on the Digital Pantry website and have a question.`;
}

export function useSideContact() {
  const { theme } = useTheme();
  const [location] = useLocation();
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);
  const c = SIDES[theme];
  return {
    name: c.name,
    waLink: live ? `https://wa.me/${c.whatsapp}?text=${encodeURIComponent(whatsappText(c.name, location))}` : undefined,
    email: STUDIO_EMAIL,
  };
}
