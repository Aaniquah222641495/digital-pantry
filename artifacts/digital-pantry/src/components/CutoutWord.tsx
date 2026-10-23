// Brand words in headings ("COOKED", "CHEFS", ...): pixel icing lettering that matches the
// pixel-art illustrations. Real text, so it stays readable to Google and screen readers.
// Styling lives in index.css (.dp-pixel-word). The old cut-out letters and generated image
// wordmarks are retired (2026-10-23, founder: words should go with the pixelation).
export function CutoutWord({ word, className = "" }: { word: string; className?: string; tone?: "default" | "on-yellow" }) {
  return <span className={`dp-pixel-word ${className}`}>{word}</span>;
}
