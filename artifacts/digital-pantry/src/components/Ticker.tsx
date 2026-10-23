const PHRASES = [
  "Women-led studio",
  "Built from scratch",
  "Cape Town",
  "Girl power",
  "GirlCode Pan-African Hackathon winner 2026",
  "Women in STEM",
  "Cooked to order",
  "No boring templates",
];

// The one marquee on the page. Pauses on hover; still for reduced motion (index.css).
export function Ticker() {
  const run = (
    <span className="flex shrink-0 items-center">
      {PHRASES.map((p) => (
        <span key={p} className="flex items-center">
          <span className="dp-cut-bebas px-6 text-[clamp(1.5rem,2.6vw,2.25rem)] tracking-[0.06em]">{p}</span>
          <span aria-hidden="true" className="text-[1.1rem]">★</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className="overflow-hidden border-y border-[#161214]/10 bg-[#FFA7D2] py-4 text-[#161214]" aria-label={PHRASES.join(", ")}>
      <div className="ticker-track flex w-max" aria-hidden="true">
        {run}
        {run}
      </div>
    </div>
  );
}
