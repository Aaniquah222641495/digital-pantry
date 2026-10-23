import { useRef, type ReactNode } from "react";
import { Link } from "wouter";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Primary and secondary buttons. The primary leans gently toward the cursor (desktop only,
// off for reduced motion). Motion values only: no React state per mouse move.
export function MagneticButton({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  size?: "sm" | "md";
  external?: boolean;
  "data-testid"?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const pad = size === "sm" ? "h-10 px-5 text-[14px]" : "h-[52px] px-7 text-[15px]";
  const look =
    variant === "primary"
      ? "bg-dp-cta text-dp-cta-fg shadow-[0_10px_30px_-12px_var(--dp-glow)] hover:shadow-[0_16px_40px_-10px_var(--dp-glow)]"
      : "border border-dp-line text-dp-ink hover:border-dp-ink/40";

  const inner = (
    <motion.span
      ref={ref}
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-[box-shadow,border-color] duration-500 active:scale-[0.98] ${pad} ${look}`}
    >
      {children}
      <ArrowUpRight
        size={size === "sm" ? 15 : 17}
        strokeWidth={2}
        aria-hidden="true"
        className="transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
    </motion.span>
  );

  const focus = "inline-flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent";
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={focus} data-testid={rest["data-testid"]}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={focus} data-testid={rest["data-testid"]}>
      {inner}
    </Link>
  );
}
