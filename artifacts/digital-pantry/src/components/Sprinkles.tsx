import { useEffect, useRef } from "react";

// Falling sprinkles, the bakery side of the pantry. Drawn on one canvas (cheap), paused when
// off screen or the tab is hidden, and not drawn at all for visitors who ask for reduced motion.
// mode "drift": a slow, endless fall behind a section. mode "burst": one celebratory shower.
const COLORS = ["#FFA7D2", "#E8508A", "#FFD43B", "#FFFFFF", "#FDD2DE", "#B32F68"];

type Sprinkle = { x: number; y: number; vy: number; vx: number; rot: number; vr: number; len: number; w: number; color: string };

export function Sprinkles({ mode = "drift", count = 46, className = "" }: { mode?: "drift" | "burst"; count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const make = (startAbove: boolean): Sprinkle => ({
      x: Math.random() * w,
      y: startAbove ? -20 - Math.random() * h * (mode === "burst" ? 0.6 : 1) : Math.random() * h,
      vy: mode === "burst" ? 2.2 + Math.random() * 2.8 : 0.35 + Math.random() * 0.55,
      vx: (Math.random() - 0.5) * (mode === "burst" ? 1.6 : 0.3),
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.04,
      len: 9 + Math.random() * 8,
      w: 3.4 + Math.random() * 1.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });
    let items = Array.from({ length: count }, () => make(mode === "burst"));

    let visible = true;
    let frame = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of items) {
        s.y += s.vy;
        s.x += s.vx + Math.sin((s.y + s.len) * 0.01) * 0.15;
        s.rot += s.vr;
        if (mode === "drift" && s.y > h + 20) Object.assign(s, make(true), { y: -20 });
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rot);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.roundRect(-s.len / 2, -s.w / 2, s.len, s.w, s.w / 2);
        ctx.fill();
        ctx.restore();
      }
      if (mode === "burst") {
        items = items.filter((s) => s.y < h + 20);
        if (!items.length) return;
      }
      if (visible && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was) frame = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    const onVis = () => {
      if (!document.hidden && visible) frame = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    frame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [mode, count]);

  return <canvas ref={ref} aria-hidden="true" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
