import { useEffect, type RefObject } from "react";

// Pointer tracking without a framework: writes --px / --py (each -1..1, relative to the element)
// to the element's style once per frame. CSS turns those into tilt, pull or spotlight.
// Mouse and trackpad only; nothing happens for touch or reduced motion.
export function usePointerVars(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    let px = 0;
    let py = 0;
    const write = () => {
      frame = 0;
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = el.getBoundingClientRect();
      px = ((e.clientX - r.left) / r.width) * 2 - 1;
      py = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(write);
    };
    const leave = () => {
      px = 0;
      py = 0;
      if (!frame) frame = requestAnimationFrame(write);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [ref]);
}
