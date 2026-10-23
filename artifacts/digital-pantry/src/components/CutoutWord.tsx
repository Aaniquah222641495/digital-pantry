// The brand's ransom-note word: each letter cut from a different "label" (font, colour, tilt).
// Colours swap with the side through CSS (dark: variant), so prerendered HTML matches on hydration.
const FONTS = ["dp-cut-bebas", "dp-cut-marker", "dp-cut-playfair"];
const COLORS = [
  "text-[#E8508A] dark:text-[#FF5C9E]",
  "text-[#E0B000] dark:text-[#FFD43B]",
  "text-[#161214] dark:text-[#F3EFF2]",
  "text-[#F08DBA] dark:text-[#FFB3D1]",
];
const ROTATIONS = [-4, 3, -2, 5, -3, 2, -5, 4];
const SIZES = ["1em", "1.08em", "0.94em", "1.12em", "1.02em", "0.96em"];

// "on-yellow": a palette for the butter-yellow panel, where yellow and white letters would vanish.
const ON_YELLOW = ["text-[#B32F68]", "text-[#161214]", "text-[#E8508A]", "text-[#6B2142]"];

export function CutoutWord({ word, className = "", tone = "default" }: { word: string; className?: string; tone?: "default" | "on-yellow" }) {
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
