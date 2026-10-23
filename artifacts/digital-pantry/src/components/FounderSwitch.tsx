import { Moon, Sun } from "lucide-react";
import { useTheme } from "../lib/ThemeContext";

// The light/dark switch is the founders switch: Day is Aaniquah's side, Night is Imaan's.
export function FounderSwitch({ compact = false }: { compact?: boolean }) {
  const { theme, toggle } = useTheme();
  const sides = [
    { key: "light", name: "Aaniquah", Icon: Sun, label: "Day: Aaniquah's side" },
    { key: "dark", name: "Imaan", Icon: Moon, label: "Night: Imaan's side" },
  ] as const;

  return (
    <div
      role="radiogroup"
      aria-label="Choose a side of the studio"
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
            } ${active ? "text-dp-cta-fg" : "text-dp-muted hover:text-dp-ink"}`}
          >
            <span aria-hidden="true" className={`absolute inset-0 -z-10 rounded-full bg-dp-cta transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${active ? "scale-100 opacity-100" : "scale-75 opacity-0"}`} />
            <Icon size={14} strokeWidth={2} aria-hidden="true" />
            {!compact && <span>{name}</span>}
          </button>
        );
      })}
    </div>
  );
}
