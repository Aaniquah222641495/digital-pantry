import { useEffect } from "react";
import { useLocation } from "wouter";
import Lenis from "lenis";

// Weighted, smooth page scrolling for mouse and trackpad users. Off for touch (native scroll is
// better there and it avoids a frame loop on phones) and for visitors who ask for reduced motion.
// Also takes over "scroll to top on page change".
export function SmoothScroll() {
  const [location] = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 4) });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [location]);

  return null;
}
