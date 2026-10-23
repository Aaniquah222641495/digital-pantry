import { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

// Kept for older pages; now a plain Reveal so prerendered content is never hidden.
export function AnimatedSection({ children, className = "", delay = 0 }: AnimatedSectionProps) {
  return (
    <Reveal className={className} delay={delay}>
      {children}
    </Reveal>
  );
}
