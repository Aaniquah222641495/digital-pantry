import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

// Rise-in on scroll. The prerendered HTML is always visible: the hidden start state only
// applies once public/theme-init.js has marked the page with .js, and theme-init reveals
// everything after a few seconds if the app never starts. The hero uses CSS keyframes
// (.dp-rise) instead, so it never waits for JavaScript.
// `early` is for tall blocks: a 12% area threshold can sit several hundred pixels into a tall card,
// so its shorter neighbours would appear first and leave a blank hole beside them. Early blocks
// reveal as soon as their top edge enters the view.
const observers: Partial<Record<"normal" | "early", IntersectionObserver>> = {};
function getObserver(kind: "normal" | "early") {
  let observer = observers[kind];
  if (!observer) {
    const o = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            o.unobserve(e.target);
          }
        }
      },
      kind === "early" ? { rootMargin: "0px 0px -6% 0px", threshold: 0 } : { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    observer = observers[kind] = o;
  }
  return observer;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  early = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
  early?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = getObserver(early ? "early" : "normal");
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [early]);

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      className={className}
      style={{ "--d": `${delay}s` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
