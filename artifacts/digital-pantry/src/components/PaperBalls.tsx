import { useEffect, useRef, type CSSProperties } from "react";

// Stereotypes women in STEM hear, written on paper notes that crumple into balls and get tossed
// onto a pile (founder 2026-10-29). Plays once when the band scrolls into view. Reduced motion and
// no-JS visitors see the notes crossed out instead. The notes are real text in a list, so screen
// readers get the words; the balls are decoration.
// Positions are container units (cqw / cqh) so the throw lands on the pile at every size.
const NOTES = [
  { text: "Girls can't code.", x: 2, y: 2, r: -6 },
  { text: "Tech is a boys' club.", x: 50, y: 8, r: 5 },
  { text: "You don't look like an engineer.", x: 4, y: 27, r: 4 },
  { text: "Who helped you build it?", x: 52, y: 33, r: -5 },
  { text: "Women aren't good at maths.", x: 2, y: 52, r: -3 },
  { text: "Pick one: pretty or smart.", x: 50, y: 58, r: 6 },
] as const;

// Where each ball comes to rest: a small pyramid at the bottom right (left/top in %, of the container).
const PILE = [
  { x: 58, y: 79 }, { x: 69, y: 81 }, { x: 80, y: 78 },
  { x: 63, y: 68 }, { x: 75, y: 69 }, { x: 69, y: 58 },
] as const;

function Ball({ seed }: { seed: number }) {
  // One drawn ball, turned differently each time so the pile doesn't look copy-pasted.
  return (
    <svg viewBox="0 0 60 60" className="h-full w-full" style={{ transform: `rotate(${seed * 67}deg)` }} aria-hidden="true">
      <path d="M8 26 L14 11 L27 6 L41 9 L52 18 L55 33 L49 47 L36 55 L21 53 L10 44 Z" fill="#FFFDF8" stroke="#161214" strokeWidth="2" strokeLinejoin="round" />
      <path d="M14 11 L24 24 L41 9 M24 24 L21 53 M24 24 L52 33 L36 55 M10 44 L24 24 M52 18 L40 27" fill="none" stroke="#C9BFC4" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M27 6 L30 16 L41 9" fill="#F3EDE6" stroke="#C9BFC4" strokeWidth="1.2" />
      <path d="M36 55 L38 42 L49 47" fill="#EFE7DF" stroke="#C9BFC4" strokeWidth="1.2" />
    </svg>
  );
}

export function PaperBalls({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("pb-armed");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("pb-play");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`pb-stage relative ${className}`} style={{ containerType: "size" }}>
      <ul aria-label="Stereotypes we've heard" className="contents">
        {NOTES.map((n, i) => (
          <li
            key={n.text}
            className="pb-note absolute w-[46cqw] max-w-[230px]"
            style={{ left: `${n.x}cqw`, top: `${n.y}cqh`, "--r": `${n.r}deg`, "--d": `${0.2 + i * 1.05}s` } as CSSProperties}
          >
            <span className="pb-paper block rounded-[4px] px-4 py-3 text-[clamp(0.85rem,1.2vw,1rem)] font-medium leading-snug text-[#3A3236] shadow-[0_14px_28px_-16px_rgba(22,18,20,0.55)]">
              <span className="pb-words">{n.text}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* Soft shadow the pile sits on */}
      <div aria-hidden="true" className="pb-shadow pointer-events-none absolute left-[56cqw] top-[90cqh] h-[6cqh] w-[40cqw] rounded-[50%] bg-[radial-gradient(closest-side,rgba(122,31,69,0.22),transparent)]" />
      {NOTES.map((n, i) => {
        const p = PILE[i];
        // The ball starts where the middle of its note was and ends on its spot in the pile.
        const sx = n.x + 18, sy = n.y + 4;
        return (
          <div
            key={`ball-${i}`}
            aria-hidden="true"
            className="pb-ball-x pointer-events-none absolute h-[clamp(52px,12cqw,78px)] w-[clamp(52px,12cqw,78px)]"
            style={{
              left: `${sx}cqw`, top: `${sy}cqh`,
              "--dx": `${p.x - sx}cqw`, "--dy": `${p.y - sy}cqh`,
              "--d": `${0.2 + i * 1.05 + 2.05}s`,
              "--spin": `${(i % 2 ? -1 : 1) * (300 + i * 40)}deg`,
            } as CSSProperties}
          >
            <div className="pb-ball-y h-full w-full">
              <Ball seed={i} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
