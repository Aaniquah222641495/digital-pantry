import type { CSSProperties } from "react";

// Pixel-art stickers (cut from the generated sheets). Day stickers show on Aaniquah's side,
// Night stickers on Imaan's; each placement names one of each so the swap is automatic.
export const DAY = { sparkle: "sparkle", star: "star", mug: "heart-mug", code: "code-tag", donut: "donut" } as const;
export const NIGHT = { moon: "moon", star: "silver-star", mug: "night-mug", stylus: "stylus" } as const;

type Spot = { day: string; night: string; size: number; style: CSSProperties; r?: number; d?: number };

export function Sticker({ day, night, size, style, r = 0, d = 0 }: Spot) {
  const common = { "--r": `${r}deg`, "--d": `${d}s`, width: size, ...style } as CSSProperties;
  return (
    <span aria-hidden="true" className="dp-sticker-float pointer-events-none absolute z-10" style={common}>
      <img src={`/images/stickers/${day}.webp`} alt="" className="dp-sticker w-full dark:hidden" style={{ transform: `rotate(${r}deg)` }} />
      <img src={`/images/stickers/${night}.webp`} alt="" className="dp-sticker hidden w-full dark:block" style={{ transform: `rotate(${r}deg)` }} />
    </span>
  );
}
