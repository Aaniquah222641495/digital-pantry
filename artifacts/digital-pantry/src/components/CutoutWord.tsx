// The brand's ransom-note word: each letter cut from a different "label" (font, colour, tilt).
// Colours swap with the side through CSS (dark: variant), so prerendered HTML matches on hydration.
// Night uses vintage-magazine clippings in Imaan's palette: hot pink, butter yellow and bubblegum (with a soft glow), and ivory.
const FONTS = ["dp-cut-bebas", "dp-cut-marker", "dp-cut-playfair"];
const COLORS = [
  "text-[#E8508A] dark:text-[var(--im-hot)] dark:[text-shadow:0_0_18px_rgba(255,92,168,0.55)]",
  "text-[#E0B000] dark:text-[#FFD43B] dark:[text-shadow:0_0_16px_rgba(255,212,59,0.45)]",
  "text-[#161214] dark:text-[var(--im-text)]",
  "text-[#F08DBA] dark:text-[var(--im-accent)] dark:[text-shadow:0_0_16px_rgba(255,167,210,0.4)]",
];
const ROTATIONS = [-4, 3, -2, 5, -3, 2, -5, 4];
const SIZES = ["1em", "1.08em", "0.94em", "1.12em", "1.02em", "0.96em"];

// "on-yellow": a palette for the butter-yellow panel, where yellow and white letters would vanish.
const ON_YELLOW = ["text-[#B32F68]", "text-[#161214]", "text-[#E8508A]", "text-[#6B2142]"];

// Branded sticker lettering made for the main headings (public/images/words/<WORD>.webp, with
// width/height for no layout shift). Where one exists it replaces the cut-out letters.
// Kitchen-style lettering (icing, drips, steam) is taller than the plain stickers.
const TALL: Record<string, true> = { COOKED: true };

const WORDMARKS: Record<string, [number, number]> = {
  COOKED: [780,300],
  CHEFS: [674,220],
  KITCHEN: [830,220],
  RECIPE: [780,220],
  MENU: [646,220],
  COOKING: [680,220],
  DISH: [576,220],
  SCRATCH: [858,220],
};

export function CutoutWord({ word, className = "", tone = "default" }: { word: string; className?: string; tone?: "default" | "on-yellow" }) {
  const mark = WORDMARKS[word];
  if (mark) {
    const [w, h] = mark;
    return (
      <img
        src={`/images/words/${word}.webp`}
        alt={word.charAt(0) + word.slice(1).toLowerCase()}
        width={w}
        height={h}
        className={`dp-wordmark inline-block w-auto ${word in TALL ? "h-[1.5em] align-[-0.42em]" : "h-[1.18em] align-[-0.22em]"} ${className}`}
      />
    );
  }
  const palette = tone === "on-yellow" ? ON_YELLOW : COLORS;
  return (
    <span role="img" aria-label={word} className={`inline-flex items-baseline gap-[0.03em] align-baseline ${className}`}>
      {word.split("").map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`inline-block leading-none ${FONTS[i % FONTS.length]} ${palette[i % palette.length]}`}
          style={{ fontSize: SIZES[i % SIZES.length], transform: `rotate(${ROTATIONS[i % ROTATIONS.length]}deg)` }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}
