import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Two sides of the studio: Night is Imaan's (the default), Day is Aaniquah's.
// Stored as "dark" / "light" so earlier visitors keep their choice.
type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({ theme: "dark", toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Prerendered HTML is Night; public/theme-init.js has already set the real side before paint.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  const toggle = () => {
    setTheme((t) => {
      const next: Theme = t === "dark" ? "light" : "dark";
      const root = document.documentElement;
      root.classList.add("dp-theme-shift");
      root.classList.toggle("dark", next === "dark");
      window.setTimeout(() => root.classList.remove("dp-theme-shift"), 700);
      try {
        localStorage.setItem("dp-theme", next);
      } catch {}
      return next;
    });
  };

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
