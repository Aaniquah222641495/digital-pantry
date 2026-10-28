import { useRef, type ReactNode } from "react";
import { Link } from "wouter";
import { usePointerVars } from "../lib/pointer";
import { ArrowUpRight } from "lucide-react";

// Primary and secondary buttons. The primary leans gently toward the cursor (desktop only,
// off for reduced motion). CSS variables only: no React state per mouse move.
export function MagneticButton({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  onClick,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
  external?: boolean;
  onClick?: () => void;
  "data-testid"?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  usePointerVars(ref);

  const pad = size === "sm" ? "h-10 px-5 text-[14px]" : "h-[52px] px-7 text-[15px]";
  const look =
    variant === "primary"
      ? "bg-dp-cta text-dp-cta-fg shadow-[0_10px_30px_-12px_var(--dp-glow)] hover:shadow-[0_16px_40px_-10px_var(--dp-glow)]"
      : "dp-outline-btn border border-dp-line text-dp-ink hover:border-dp-ink/40";

  const inner = (
    <span
      ref={ref}
      className={`dp-magnet group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[box-shadow,border-color] duration-500 active:scale-[0.98] ${pad} ${look}`}
    >
      {children}
      <ArrowUpRight
        size={size === "sm" ? 15 : 17}
        strokeWidth={2}
        aria-hidden="true"
        className="transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </span>
  );

  const focus = "inline-flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={focus} data-testid={rest["data-testid"]} onClick={onClick}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={focus} data-testid={rest["data-testid"]} onClick={onClick}>
      {inner}
    </Link>
  );
}
