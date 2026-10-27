import { useMarket } from "../lib/MarketContext";
import type { Market } from "../lib/plans";

// Local / International: same pill as the Day / Night switch. Every price on the site follows it.
// `compact` shows the currency (R / $) so it fits beside the other controls at laptop width.
export function MarketSwitch({ compact = false }: { compact?: boolean }) {
  const { market, setMarket } = useMarket();
  const options: { key: Market; name: string; short: string; label: string }[] = [
    { key: "za", name: "Local", short: "R", label: "Local prices, in rand" },
    { key: "intl", name: "International", short: "$", label: "International prices, in US dollars" },
  ];

  return (
    <div
      role="radiogroup"
      aria-label="Show prices for"
      data-testid="market-switch"
      className="relative inline-flex items-center rounded-full border border-dp-line bg-dp-surface/60 p-1 backdrop-blur"
    >
      {options.map(({ key, name, short, label }) => {
        const active = market === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            data-testid={`market-${key}`}
            onClick={() => !active && setMarket(key)}
            className={`relative z-10 inline-flex h-8 items-center justify-center rounded-full text-[13px] font-medium transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dp-accent ${
              compact ? "w-9" : "px-3"
            } ${active ? "text-dp-cta-fg dark:font-semibold dark:text-dp-ink" : "text-dp-muted hover:text-dp-ink"}`}
          >
            <span aria-hidden="true" className={`absolute inset-0 -z-10 rounded-full bg-dp-cta dark:bg-[rgba(255,167,210,0.16)] dark:ring-1 dark:ring-inset dark:ring-[var(--im-accent)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${active ? "scale-100 opacity-100" : "scale-75 opacity-0"}`} />
            <span aria-hidden={compact ? undefined : "true"}>{compact ? short : name}</span>
          </button>
        );
      })}
    </div>
  );
}
