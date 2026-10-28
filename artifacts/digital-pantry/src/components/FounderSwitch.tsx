import { Moon, Sun } from "lucide-react";
import { useTheme } from "../lib/ThemeContext";

// The light/dark switch is the founders switch: Day is Aaniquah's side, Night is Imaan's.
// It also picks whose WhatsApp the site links to (lib/contact.ts), so the label says so (2026-10-29).
export function FounderSwitch({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const sides = [
    { key: "light", name: "Aaniquah", Icon: Sun, label: "Day: chat with Aaniquah" },
    { key: "dark", name: "Imaan", Icon: Moon, label: "Night: chat with Imaan" },
  ] as const;

  const group = (
    <div
      role="radiogroup"
      aria-label="Day or Night: also picks who you chat with on WhatsApp"
      className="relative inline-flex items-center rounded-full border border-dp-line bg-dp-surface/60 p-1 backdrop-blur"
    >
      {sides.map(({ key, name, Icon, label }) => {
        const active = theme === key;
        return (
          <button
            key={key}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => !active && toggle()}
            className={`relative z-10 inline-flex h-8 items-center gap-1.5 rounded-full text-[13px] font-medium transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dp-accent ${
              compact ? "w-9 justify-center" : "px-3"
            } ${active ? "text-dp-cta-fg dark:font-semibold dark:text-dp-ink" : "text-dp-muted hover:text-dp-ink"}`}
          >
            <span aria-hidden="true" className={`absolute inset-0 -z-10 rounded-full bg-dp-cta dark:bg-[rgba(255,167,210,0.16)] dark:ring-1 dark:ring-inset dark:ring-[var(--im-accent)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${active ? "scale-100 opacity-100" : "scale-75 opacity-0"}`} />
            <Icon size={14} strokeWidth={2} aria-hidden="true" />
            {!compact && <span>{name}</span>}
          </button>
        );
      })}
    </div>
  );

  return compact ? (
    group
  ) : (
    <span className="inline-flex items-center gap-2">
      <span aria-hidden="true" className="text-[13px] text-dp-muted">Chat with</span>
      {group}
    </span>
  );
}
