// What we make for a business, not about us (founder 2026-10-26: "the banner should reflect
// the business"). Only things the site already offers; the founders' story lives in Meet the Chefs.
const PHRASES = [
  "Websites",
  "Web apps",
  "Lead systems",
  "One-tap WhatsApp orders",
  "Bookings and enquiries",
  "Found on Google and AI search",
  "Fast on any phone",
  "Care after launch",
  "Built from scratch",
];

// The one marquee on the page. Pauses on hover; still for reduced motion (index.css).
export function Ticker() {
  const run = (
    <span className="flex shrink-0 items-center">
      {PHRASES.map((p) => (
        <span key={p} className="flex items-center">
          <span className="dp-cut-bebas dp-ticker-text px-6 text-[clamp(1.5rem,2.6vw,2.25rem)] tracking-[0.06em]">{p}</span>
          <span aria-hidden="true" className="text-[1.1rem] dark:text-[var(--im-hot)] dark:[text-shadow:0_0_14px_rgba(255,92,168,0.7)]">★</span>
        </span>
      ))}
    </span>
  );
  return (
    <div className="relative overflow-hidden border-y border-[#161214]/10 bg-[#FFA7D2] py-4 text-[#161214] dark:border-white/10 dark:bg-[var(--im-band)] dark:py-5 dark:text-[var(--im-text)]">
      <p className="sr-only">{PHRASES.join(", ")}</p>
      <div className="ticker-track flex w-max" aria-hidden="true">
        {run}
        {run}
      </div>
    </div>
  );
}
