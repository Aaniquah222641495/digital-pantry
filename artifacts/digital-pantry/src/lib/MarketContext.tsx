import { createContext, startTransition, useContext, useEffect, useState, ReactNode } from "react";
import { priced, type Market } from "./plans";

// Local (rand) or International (US dollars): one choice that every price on the site follows.
// Stored in localStorage as "dp-market" ("za" / "intl"), on the visitor's device only, like the theme.
// Prerendered HTML is always Local, so the first client render is Local too and the saved choice is
// applied right after mount (hydration must match).
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
      if (localStorage.getItem(KEY) === "intl") startTransition(() => setMarketState("intl"));
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
