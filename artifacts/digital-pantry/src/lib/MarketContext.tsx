import { createContext, startTransition, useContext, useEffect, useState, ReactNode } from "react";
import { priced, type Market } from "./plans";

// Local (rand) or International (US dollars): one choice that every price on the site follows.
// Stored in localStorage as "dp-market" ("za" / "intl"), on the visitor's device only, like the theme.
// Prerendered HTML is always Local, so the first client render is Local too and the saved choice is
// applied right after mount (hydration must match).
// No saved choice? We guess from the device's time zone (founder 2026-10-29: show the right prices
// without a switch in the header). It is read on the device only, never stored or sent. South Africa
// has one time zone, Africa/Johannesburg. Search engines always get Local so the indexed page matches
// the structured data. A guess is not saved, so the visitor's own pick (footer, Pricing) always wins.
const BOT = /bot|crawl|spider|slurp|lighthouse|headless|google|bing/i;
export function guessMarket(): Market {
  try {
    if (BOT.test(navigator.userAgent)) return "za";
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return !tz || tz === "Africa/Johannesburg" ? "za" : "intl";
  } catch {
    return "za";
  }
}
interface MarketContextValue {
  market: Market;
  intl: boolean;
  setMarket: (m: Market) => void;
  /** Fills {Starter}, {retainer} and friends in a piece of copy for the current market. */
  money: (text: string) => string;
}

const KEY = "dp-market";
const noop = () => {};
const MarketContext = createContext<MarketContextValue>({ market: "za", intl: false, setMarket: noop, money: (t) => priced(t, "za") });

export function MarketProvider({ children }: { children: ReactNode }) {
  const [market, setMarketState] = useState<Market>("za");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      const m: Market = saved === "intl" || saved === "za" ? saved : guessMarket();
      if (m === "intl") startTransition(() => setMarketState("intl"));
    } catch {}
  }, []);

  const setMarket = (m: Market) => {
    setMarketState(m);
    try {
      localStorage.setItem(KEY, m);
    } catch {}
  };

  return (
    <MarketContext.Provider value={{ market, intl: market === "intl", setMarket, money: (t) => priced(t, market) }}>
      {children}
    </MarketContext.Provider>
  );
}

export const useMarket = () => useContext(MarketContext);
