import type { CSSProperties } from "react";
import { Sprinkles } from "./Sprinkles";

// The two chefs at one counter (pixel art), brought to life with light CSS effects layered on
// top: sun glow, twinkling night stars, steam from the bowl, a shine across the laptop and a
// soft pulse on the logo sign. Positions are percentages of the illustration. All motion stops
// for reduced motion (index.css, "Hero scene").
const STARS: [number, number, number][] = [
  [86.6, 12.6, 0],
  [90.8, 20.6, 1.1],
  [84.2, 22.8, 2.2],
  [93.2, 9.4, 0.6],
  [81.2, 9.2, 1.7],
];

const at = (left: number, top: number, extra: CSSProperties = {}) => ({ left: `${left}%`, top: `${top}%`, ...extra }) as CSSProperties;

export function HeroScene() {
  return (
    <figure className="dp-scene relative isolate w-full overflow-hidden rounded-[30px] border-[3px] border-white bg-[#FCE8F0] shadow-[0_40px_90px_-40px_rgba(179,47,104,0.55)] dark:border-[var(--im-border)] dark:shadow-[0_40px_90px_-30px_rgba(255,92,168,0.35)]">
      <img
        src="/images/hero-scene.webp"
        srcSet="/images/hero-scene-900.webp 900w, /images/hero-scene.webp 1600w"
        sizes="(min-width: 768px) 55vw, 100vw"
        width={1600}
        height={830}
        alt="Aaniquah and Imaan at one kitchen counter: Aaniquah on the pink daytime side with a mixing bowl and laptop, Imaan on the burgundy night side tasting from a silver spoon, under a Digital Pantry sign"
        fetchPriority="high"
        className="dp-scene-img block aspect-[1600/830] w-full object-cover"
      />

      {/* Day/Night: the side that isn't "on" softens a little */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[#FFF7FA]/15 transition-colors duration-700 dark:bg-transparent" />
      <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-transparent transition-colors duration-700 dark:bg-[#150708]/25" />

      <span aria-hidden="true" className="dp-sun absolute h-[16%] w-[11%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={at(11.2, 16)} />
      {STARS.map(([l, t, d]) => (
        <span key={`${l}-${t}`} aria-hidden="true" className="dp-twinkle absolute h-[3.2%] w-[1.8%] -translate-x-1/2 -translate-y-1/2" style={at(l, t, { "--d": `${d}s` } as CSSProperties)} />
      ))}
      <span aria-hidden="true" className="dp-sign-glow absolute h-[22%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={at(50.6, 42.6)} />
      <span aria-hidden="true" className="dp-screen-shine absolute overflow-hidden" style={at(42.6, 62.8, { width: "15.6%", height: "16.4%" })}>
        <span />
      </span>
      {[0, 1.3, 2.6].map((d) => (
        <span key={d} aria-hidden="true" className="dp-steam absolute h-[9%] w-[1.6%] -translate-x-1/2 rounded-full" style={at(31 + d, 66, { "--d": `${d}s` } as CSSProperties)} />
      ))}
      <Sprinkles count={16} className="opacity-80" />
    </figure>
  );
}
