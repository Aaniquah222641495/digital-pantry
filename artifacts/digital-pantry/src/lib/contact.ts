import { useEffect, useState } from "react";
import { useTheme } from "./ThemeContext";

// Each side shows its own founder's WhatsApp: Day = Aaniquah, Night = Imaan.
// The studio email is the shared inbox for both, and the only contact we publish to search
// engines and AI assistants (founder, 2026-10-24). So the numbers and wa.me links are left out of
// the prerendered HTML that crawlers read: they appear only once the page is running in a
// visitor's browser. Text stays on the same line, so nothing shifts when they appear. Wrap any
// visible number in data-nosnippet so Google, which does run JavaScript, keeps it out of results.
const SIDES = {
  light: { name: "Aaniquah", whatsapp: "27724111011", display: "072 411 1011" },
  dark: { name: "Imaan", whatsapp: "27797027491", display: "079 702 7491" },
} as const;

export const STUDIO_EMAIL = "thedigitalpantryza@gmail.com";

export function useSideContact() {
  const { theme } = useTheme();
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);
  const c = SIDES[theme];
  return {
    name: c.name,
    display: live ? c.display : "",
    waLink: live ? `https://wa.me/${c.whatsapp}` : undefined,
    email: STUDIO_EMAIL,
  };
}
