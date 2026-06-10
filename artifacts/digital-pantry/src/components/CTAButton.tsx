import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "wouter";

interface CTAButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
  "data-testid"?: string;
  type?: "button" | "submit";
}

export function CTAButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  "data-testid": testId,
  type = "button",
}: CTAButtonProps) {
  const [, navigate] = useLocation();

  const base =
    "inline-flex items-center gap-2 font-body font-semibold rounded-full px-7 py-3.5 text-base transition-all cursor-pointer select-none";

  const variants = {
    primary:
      "bg-[#FF2D87] text-white hover:bg-[#e0006e] border-2 border-[#FF2D87] hover:border-[#e0006e]",
    outline:
      "bg-transparent text-[#FF2D87] border-2 border-[#FF2D87] hover:bg-[#FF2D87] hover:text-white",
    ghost: "bg-white/10 text-white border-2 border-white/20 hover:bg-white/20",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, stiffness: 350, damping: 20 },
  };

  if (href) {
    const isExternal = /^(https?:|mailto:|tel:)/.test(href);
    return (
      <motion.a
        href={href}
        onClick={isExternal ? undefined : (e) => { e.preventDefault(); navigate(href); }}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={cls}
        data-testid={testId}
        {...motionProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={cls}
      data-testid={testId}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
