import { Link } from "wouter";
import { INTL_PRICES, PLAN_PRICES } from "../lib/plans";

// The four packages as jars standing on one wooden pantry shelf, each with a hanging price tag.
// Used on Home ("On the MENU") and as the Pricing page header.
const JARS = [
  { name: "Starter", price: PLAN_PRICES.Starter, usd: INTL_PRICES.Starter, img: "/images/starter.webp", note: "One page, a menu and WhatsApp." },
  { name: "Standard", price: PLAN_PRICES.Standard, usd: INTL_PRICES.Standard, img: "/images/standard.webp", note: "The full shop window.", popular: true },
  { name: "Premium", price: PLAN_PRICES.Premium, usd: INTL_PRICES.Premium, img: "/images/premium.webp", note: "Google Business and basic SEO." },
  { name: "Pro", price: PLAN_PRICES.Pro, usd: INTL_PRICES.Pro, img: "/images/pro.webp", note: "Every enquiry caught for you." },
] as const;

// toCards: on Pricing the cards below carry the prices, so each jar shows its name and jumps to its card.
export function PantryShelf({ link = true, currency = "ZAR", toCards = false }: { link?: boolean; currency?: "ZAR" | "USD"; toCards?: boolean }) {
  const intl = currency === "USD";
  return (
    <div className="relative">
      <ul className="relative z-10 grid grid-cols-2 gap-x-4 gap-y-16 md:grid-cols-4 md:gap-y-0">
        {JARS.map((j, i) => {
          const popular = "popular" in j;
          const tag = (
            <>
              <div className="dp-stage mx-auto w-[min(100%,190px)]">
                <img
                  src={j.img}
                  alt={`${j.name} jar`}
                  width={400}
                  height={400}
                  loading="lazy"
                  className="mx-auto w-full origin-bottom object-contain [image-rendering:pixelated] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:-rotate-3"
                />
              </div>
              {/* Shelf plank under each jar on phones (the desktop shelf runs the full width) */}
              <span aria-hidden="true" className="block h-3 rounded-sm bg-[#B98454] shadow-[0_8px_0_-2px_#8A5C35,0_18px_24px_-10px_rgba(80,40,20,0.5)] md:hidden" />
              {/* Hanging price tag */}
              <div className="relative mx-auto mt-5 w-fit md:mt-10">
                <span aria-hidden="true" className="absolute -top-5 left-1/2 h-5 w-px -translate-x-1/2 bg-dp-muted/50 md:-top-10 md:h-10" />
                <div
                  className={`relative rotate-[-2deg] rounded-[14px] px-5 py-3 text-center transition-transform duration-500 group-hover:rotate-0 ${
                    popular ? "bg-dp-cta text-dp-cta-fg shadow-[0_14px_30px_-12px_var(--dp-glow)]" : "border border-dp-line bg-dp-surface"
                  }`}
                >
                  {popular && (
                    <span className="absolute -right-3 -top-3 rounded-full bg-[#FFD43B] px-2 py-0.5 text-[11px] font-semibold text-[#161214] shadow-sm">Popular ★</span>
                  )}
                  {!toCards && <p className={`text-[13px] ${popular ? "opacity-80" : "text-dp-muted"}`}>{j.name}</p>}
                  {toCards ? (
                    <p className="text-[clamp(1.3rem,2vw,1.6rem)] font-semibold tracking-[-0.04em]">{j.name}</p>
                  ) : (
                    <p className="text-[clamp(1.6rem,2.4vw,2.1rem)] font-semibold tracking-[-0.05em]">{intl ? j.usd : j.price}</p>
                  )}
                  <p className={`mt-0.5 max-w-[17ch] text-[13px] leading-snug ${popular ? "opacity-80" : "text-dp-muted"}`}>{j.note}</p>
                </div>
              </div>
            </>
          );
          return (
            <li key={j.name} className="group" style={{ transitionDelay: `${i * 60}ms` }}>
              {toCards ? (
                <a href={`#card-${j.name.toLowerCase()}`} className="block rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent">
                  {tag}
                  <span className="sr-only"> See what is in this package.</span>
                </a>
              ) : link ? (
                <Link href={intl ? "/contact?interest=international" : `/contact?interest=${j.name.toLowerCase()}`} className="block rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent">
                  {tag}
                  {/* The visible words stay in the link's name (voice control users say what they see) */}
                  <span className="sr-only"> Ask about this package.</span>
                </Link>
              ) : (
                tag
              )}
            </li>
          );
        })}
      </ul>
      {/* Desktop: one long wooden shelf behind the jars, sitting under their bases */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-[-2%] top-[156px] hidden md:block">
        <div className="h-4 rounded-[4px] bg-[linear-gradient(180deg,#D29A63,#B98454_40%,#9A6A3F)] shadow-[0_10px_0_-2px_#7A4E2C,0_26px_40px_-14px_rgba(60,25,10,0.55)] dark:shadow-[0_10px_0_-2px_#5A3620,0_30px_50px_-12px_rgba(0,0,0,0.8)]" />
        <div className="flex justify-between px-[8%]">
          <span className="h-7 w-3 rounded-b-sm bg-[#3A2A22]" />
          <span className="h-7 w-3 rounded-b-sm bg-[#3A2A22]" />
        </div>
      </div>
    </div>
  );
}
