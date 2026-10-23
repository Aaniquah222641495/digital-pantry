import { useTheme } from "./ThemeContext";

// Each side shows its own founder's WhatsApp: Day = Aaniquah, Night = Imaan.
// The studio email is the shared inbox for both. Search engines and the lead form use the
// main studio number (src/seo.ts, src/lib/leads.ts).
const SIDES = {
  light: { name: "Aaniquah", whatsapp: "27724111011", display: "072 411 1011" },
  dark: { name: "Imaan", whatsapp: "27797027491", display: "079 702 7491" },
} as const;

export const STUDIO_EMAIL = "thedigitalpantryza@gmail.com";

export function useSideContact() {
  const { theme } = useTheme();
  const c = SIDES[theme];
  return { ...c, waLink: `https://wa.me/${c.whatsapp}`, email: STUDIO_EMAIL };
}
