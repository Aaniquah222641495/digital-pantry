import { useRef, type CSSProperties } from "react";
import { usePointerVars } from "../lib/pointer";

// The two chefs at one counter (pixel art). No tint over the art: the frame is a camera that
// rests on Aaniquah's pink day side and pans across the counter to Imaan's burgundy night side
// when the founders switch flips (founder 2026-10-26: no overlay). The image and its small
// effects (sun, stars, sign glow, laptop shine, steam) sit on one wide layer that moves
// together, so the effects stay on the art. Positions are percentages of the illustration.
// Motion stops for reduced motion (index.css, "Hero scene").
const STARS: [number, number, number][] = [
  [86.6, 12.6, 0],
  [90.8, 20.6, 1.1],
  [84.2, 22.8, 2.2],
  [93.2, 9.4, 0.6],
  [81.2, 9.2, 1.7],
];

const at = (left: number, top: number, extra: CSSProperties = {}) => ({ left: `${left}%`, top: `${top}%`, ...extra }) as CSSProperties;

export function HeroScene() {
  const ref = useRef<HTMLDivElement>(null);
  usePointerVars(ref);

  return (
    <div ref={ref} className="dp-tilt [perspective:1400px]">
      <figure className="dp-tilt-target relative isolate aspect-[1240/830] w-full overflow-hidden rounded-[30px] border-[3px] border-white bg-[#FCE8F0] shadow-[0_40px_90px_-40px_rgba(179,47,104,0.55)] dark:border-[var(--im-border)] dark:bg-[#2A0E18] dark:shadow-[0_40px_90px_-30px_rgba(255,92,168,0.35)]">
        <div className="dp-pan absolute inset-y-0 left-[-1.3%] w-[129.04%]">
          <img
            src="/images/hero-scene.webp"
            srcSet="/images/hero-scene-900.webp 900w, /images/hero-scene.webp 1600w"
            sizes="(min-width: 1024px) 60vw, 130vw"
            width={1600}
            height={830}
            alt="Aaniquah and Imaan at one kitchen counter: Aaniquah on the pink daytime side with a mixing bowl and laptop, Imaan on the burgundy night side tasting from a silver spoon, under a Digital Pantry sign"
            fetchPriority="high"
            className="dp-scene-img block h-full w-full object-cover"
          />
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
        </div>
      </figure>
    </div>
  );
}
