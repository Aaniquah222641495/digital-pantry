import { useTheme } from "../lib/ThemeContext";

interface LetterStyle {
  font: string;
  darkColor: string;
  lightColor: string;
  rotate: number;
  size: string;
}

const FONTS = ["font-bebas", "font-marker", "font-display"];

const DARK_COLORS  = ["#FF2D87", "#FFD700", "#FFFFFF", "#FFB3D1"];
const LIGHT_COLORS = ["#FF2D87", "#FFD700", "#1A0A14", "#FFB3D1"];

const ROTATIONS = [-4, 3, -2, 5, -3, 2, -5, 4];
const SIZES     = ["1em", "1.08em", "0.94em", "1.12em", "1.02em", "0.96em"];

interface CutoutWordProps {
  word: string;
  className?: string;
  baseSize?: string;
}

export function CutoutWord({ word, className = "", baseSize }: CutoutWordProps) {
  const { theme } = useTheme();

  const letters: LetterStyle[] = word.split("").map((_, i) => ({
    font:       FONTS[i % FONTS.length],
    darkColor:  DARK_COLORS[i % DARK_COLORS.length],
    lightColor: LIGHT_COLORS[i % LIGHT_COLORS.length],
    rotate:     ROTATIONS[i % ROTATIONS.length],
    size:       SIZES[i % SIZES.length],
  }));

  return (
    <span
      className={`inline-flex items-baseline gap-[0.02em] ${className}`}
      style={baseSize ? { fontSize: baseSize } : undefined}
      aria-label={word}
    >
      {word.split("").map((letter, i) => (
        <span
          key={i}
          className={letters[i].font}
          style={{
            color:       theme === "dark" ? letters[i].darkColor : letters[i].lightColor,
            fontSize:    letters[i].size,
            display:     "inline-block",
            transform:   `rotate(${letters[i].rotate}deg)`,
            lineHeight:  1,
            letterSpacing: "0.02em",
          }}
        >
          {letter}
        </span>
      ))}
    </span>
  );
}
