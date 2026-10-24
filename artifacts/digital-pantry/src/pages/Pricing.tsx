import { Check } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { Reveal } from "../components/Reveal";
import { MagneticButton } from "../components/MagneticButton";
import { FreeTaste } from "../components/FreeTaste";
import { PantryShelf } from "../components/PantryShelf";
import { Sticker, DAY, NIGHT } from "../components/Stickers";
import { INTL_PRICES, INTL_RETAINER, LARGER_FROM, PLAN_PRICES, RETAINER, SMALL_BUSINESS_LIMIT } from "../lib/plans";
import { useEffect, useState } from "react";
import { Link, useSearch } from "wouter";
import { COST_GUIDE } from "../lib/guides";
import { H1, H2 } from "../lib/style";
import { FAQ } from "../seo";

const PLANS = [
  {
    name: "Starter", price: PLAN_PRICES.Starter, usd: INTL_PRICES.Starter, popular: false, img: "/images/starter.webp",
    line: "A one-page site that gets you found.",
    features: ["Single page", "Menu section", "WhatsApp button", "Mobile responsive"],
  },
  {
    name: "Standard", price: PLAN_PRICES.Standard, usd: INTL_PRICES.Standard, popular: true, img: "/images/standard.webp",
    line: "The full shop window for most small brands.",
    features: ["Everything in Starter", "Locations section", "About section", "Social links"],
  },
  {
    name: "Premium", price: PLAN_PRICES.Premium, usd: INTL_PRICES.Premium, popular: false, img: "/images/premium.webp",
    line: "Your own domain, and Google knows you exist.",
    features: ["Everything in Standard", "Custom domain setup", "Google Business setup", "Basic SEO setup", "1 month of updates"],
  },
  {
    name: "Pro", price: PLAN_PRICES.Pro, usd: INTL_PRICES.Pro, popular: false, img: "/images/pro.webp",
    line: "Every enquiry caught, saved and answered.",
    features: ["Everything in Premium", "Lead capture form + instant alerts", "Leads saved to your Google Sheet", "Auto-reply to every enquiry", "WhatsApp follow-up button", "Tested before handover"],
  },
] as const;

type Audience = "small" | "larger" | "intl";
const AUDIENCES: { id: Audience; label: string; short: string }[] = [
  { id: "small", label: "Small business", short: "South Africa, " + SMALL_BUSINESS_LIMIT },
  { id: "larger", label: "Larger business", short: "Custom builds" },
  { id: "intl", label: "International", short: "Priced in US dollars" },
];

const LARGER_DRIVERS = [
  "How many pages and how much content",
  "Integrations: bookings, payments, forms, your systems",
  "Brand and design work needed",
  "Timeline and how many people sign off",
];

export default function Pricing() {
  const search = useSearch();
  const [audience, setAudience] = useState<Audience>("small");
  useEffect(() => {
    const f = new URLSearchParams(search).get("for");
    if (f === "larger" || f === "intl" || f === "small") setAudience(f);
  }, [search]);
  const choose = (a: Audience) => {
    setAudience(a);
    const url = new URL(window.location.href);
    if (a === "small") url.searchParams.delete("for");
    else url.searchParams.set("for", a);
    window.history.replaceState(null, "", url);
  };
  const intl = audience === "intl";
  return (
    <main>
      {/* Header + the pantry shelf of jars */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -left-[15%] -top-[30%] -z-10 h-[80vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,var(--dp-glow),transparent)] blur-2xl" />
        <div className="mx-auto max-w-[1320px] px-5 pb-10 pt-36 sm:px-8 md:pt-40">
          <h1 className={`dp-rise ${H1}`}>
            <span className="sr-only">Website prices in South Africa: </span>
            On the <CutoutWord word="MENU" /> <span aria-hidden="true" className="text-[0.8em]">★</span>
          </h1>
          <p className="dp-rise mt-6 max-w-[40ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-dp-muted" style={{ "--d": "0.12s" } as React.CSSProperties}>
            Website prices for small businesses, larger businesses and clients abroad. Pick your table, then your jar.
          </p>

          {/* Who is ordering? */}
          <div role="tablist" aria-label="Choose who the prices are for" className="dp-rise mt-10 grid w-full grid-cols-1 gap-2 rounded-[22px] sm:inline-grid sm:w-auto border border-dp-line bg-dp-surface p-1.5 sm:grid-cols-3" style={{ "--d": "0.18s" } as React.CSSProperties}>
            {AUDIENCES.map((a) => {
              const on = audience === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  role="tab"
                  id={`tab-${a.id}`}
                  aria-selected={on}
                  aria-controls="audience-panel"
                  onClick={() => choose(a.id)}
                  className={`rounded-[16px] px-5 py-3 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dp-accent ${
                    on ? "bg-dp-cta text-dp-cta-fg shadow-[0_10px_24px_-12px_var(--dp-glow)]" : "text-dp-ink hover:bg-dp-soft"
                  }`}
                >
                  <span className="block text-[15px] font-semibold">{a.label}</span>
                  <span className={`block text-[12px] ${on ? "opacity-80" : "text-dp-muted"}`}>{a.short}</span>
                </button>
              );
            })}
          </div>

          <div id="audience-panel" role="tabpanel" aria-labelledby={`tab-${audience}`} className="dp-rise mt-14 md:mt-16" style={{ "--d": "0.24s" } as React.CSSProperties}>
            {audience === "larger" ? (
              <div className="grid items-center gap-10 rounded-[32px] border border-dp-line bg-dp-surface p-8 sm:p-12 md:grid-cols-[1.1fr_1fr]">
                <div>
                  <p className="font-mono text-[13px] text-dp-accent">Larger business</p>
                  <h2 className="mt-3 text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                    Custom builds from <span className="text-dp-accent">{LARGER_FROM}</span>
                  </h2>
                  <p className="mt-4 max-w-[44ch] leading-relaxed text-dp-muted">
                    More than {SMALL_BUSINESS_LIMIT.replace("up to ", "")}, more pages or more moving parts? We scope it with you and send a fixed quote.
                  </p>
                  <ul className="mt-6 flex flex-col gap-2.5">
                    {LARGER_DRIVERS.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-[15px]">
                        <Check size={16} strokeWidth={2.5} aria-hidden="true" className="mt-0.5 shrink-0 text-dp-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <MagneticButton href="/contact?interest=larger">Request a quote</MagneticButton>
                  </div>
                </div>
                <div className="dp-stage mx-auto w-full max-w-[460px]">
                  <img src="/images/art/launch-day.webp" alt="" width={1600} height={893} loading="lazy" className="w-full object-contain" />
                </div>
              </div>
            ) : (
              <>
                <PantryShelf currency={intl ? "USD" : "ZAR"} />
                <p className="mt-10 max-w-[70ch] text-[14px] leading-relaxed text-dp-muted">
                  {intl
                    ? "International packages, once-off and priced in US dollars. Same kitchen, same care. We confirm payment options with your quote."
                    : `Small-business prices for South African businesses with ${SMALL_BUSINESS_LIMIT}, once-off and in rand.`}
                </p>
              </>
            )}
          </div>
        </div>
        <Sticker day={DAY.sparkle} night={NIGHT.star} size={48} r={10} style={{ right: "8%", top: "22%" }} />
        <Sticker day={DAY.donut} night={NIGHT.moon} size={66} r={-8} d={0.8} className="max-md:hidden" style={{ right: "18%", top: "12%" }} />
      </section>

      {audience !== "larger" && (
      <Reveal className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-6 px-5 pb-8 pt-10 sm:px-8">
        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em]">What's in each jar</h2>
        <p className="max-w-[46ch] rounded-[16px] border border-dp-line bg-dp-surface px-5 py-3 text-[14px] leading-relaxed text-dp-muted">
          <span className="font-medium text-dp-ink">{intl ? "Prices in US dollars." : `For businesses with ${SMALL_BUSINESS_LIMIT}.`}</span> Bigger business?{" "}
          <button type="button" onClick={() => choose("larger")} className="text-dp-accent underline decoration-dp-line underline-offset-4 hover:decoration-dp-accent">
            Custom builds from {LARGER_FROM}.
          </button>
        </p>
      </Reveal>
      )}

      <section aria-label="Packages" className="mx-auto max-w-[1320px] px-5 pb-24 sm:px-8 md:pb-32">
        {audience !== "larger" && (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 0.07}
              className={`relative flex flex-col rounded-[28px] border p-7 sm:p-8 ${
                p.popular ? "border-transparent bg-dp-cta text-dp-cta-fg shadow-[0_30px_60px_-30px_var(--dp-glow)]" : "border-dp-line bg-dp-surface"
              }`}
            >
              <div data-testid={`card-pricing-${p.name.toLowerCase()}`} className="flex h-full flex-col">
                {p.popular && (
                  <span className="absolute -top-3 left-8 rounded-full bg-[#FFD43B] px-3 py-1 text-[12px] font-semibold text-[#161214]">Most popular ★</span>
                )}
                <p className={`text-[15px] ${p.popular ? "opacity-75" : "text-dp-muted"}`}>{p.name}</p>
                <p className="mt-1 text-[clamp(2.6rem,4vw,3.25rem)] font-semibold tracking-[-0.05em]">{intl ? p.usd : p.price}</p>
                <p className={`text-[13px] ${p.popular ? "opacity-70" : "text-dp-muted"}`}>once-off</p>
                <p className={`mt-5 leading-relaxed ${p.popular ? "opacity-85" : "text-dp-muted"}`}>{p.line}</p>
                <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[15px]">
                      <Check size={16} strokeWidth={2.5} aria-hidden="true" className={`mt-0.5 shrink-0 ${p.popular ? "" : "text-dp-accent"}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {p.popular ? (
                    <a
                      href={intl ? "/contact?interest=international" : `/contact?interest=${p.name.toLowerCase()}`}
                      data-testid={`button-pricing-${p.name.toLowerCase()}`}
                      className="inline-flex h-12 w-full items-center justify-center rounded-full bg-dp-bg text-[15px] font-medium text-dp-ink transition-transform active:scale-[0.98]"
                    >
                      Choose {p.name}
                    </a>
                  ) : (
                    <a
                      href={intl ? "/contact?interest=international" : `/contact?interest=${p.name.toLowerCase()}`}
                      data-testid={`button-pricing-${p.name.toLowerCase()}`}
                      className="inline-flex h-12 w-full items-center justify-center rounded-full border border-dp-line text-[15px] font-medium text-dp-ink transition-colors hover:border-dp-ink/40 active:scale-[0.98]"
                    >
                      Choose {p.name}
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        )}

        {/* Retainer */}
        <Reveal className="mt-8 grid items-center gap-8 rounded-[28px] border border-dp-line bg-dp-soft/60 p-8 sm:p-10 md:grid-cols-[auto_1fr_auto]">
          <img src="/images/art/sprinkle-jar.webp" alt="" width={600} height={600} loading="lazy" className="h-24 w-24 object-contain md:h-28 md:w-28" />
          <div>
            <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold tracking-[-0.035em]">
              Keep your pantry stocked <span aria-hidden="true" className="text-dp-accent">★</span>
            </h2>
            <p className="mt-2 max-w-[52ch] leading-relaxed text-dp-muted">
              Menu updates, schedule changes and small edits after launch, so your site always tastes fresh.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            {audience === "larger" ? (
              <p className="max-w-[16ch] text-[1.1rem] font-semibold leading-snug">Quoted with your build</p>
            ) : (
              <p className="text-[2.4rem] font-semibold tracking-[-0.05em]">
                {intl ? INTL_RETAINER : RETAINER}
                <span className="text-[1rem] font-normal text-dp-muted"> /month</span>
              </p>
            )}
            <a
              href="/contact"
              data-testid="button-retainer-cta"
              className="inline-flex h-12 items-center rounded-full border border-dp-line px-6 text-[15px] font-medium text-dp-ink transition-colors hover:border-dp-ink/40"
            >
              Add the retainer
            </a>
          </div>
        </Reveal>
      </section>

      {/* FAQ as a text-message thread: the client asks, we answer */}
      <section aria-labelledby="faq-heading" className="border-t border-dp-line">
        <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-24 sm:px-8 md:grid-cols-[1fr_1.2fr] md:py-32">
          <Reveal className="md:sticky md:top-32 md:self-start">
            <h2 id="faq-heading" className={H2}>
              Got questions? We'll <CutoutWord word="DISH" /> it out.
            </h2>
            <p className="mt-5 max-w-[36ch] text-lg leading-relaxed text-dp-muted">Still hungry for answers? WhatsApp us and a real person replies.</p>
            <p className="mt-4 max-w-[36ch] leading-relaxed text-dp-muted">
              Comparing quotes?{" "}
              <Link href={COST_GUIDE.path} className="text-dp-accent underline decoration-dp-line underline-offset-4 hover:decoration-dp-accent">
                See what websites cost in South Africa
              </Link>
              .
            </p>
            <div className="mt-8">
              <MagneticButton href="/contact" variant="ghost">
                Ask us anything
              </MagneticButton>
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.05} className="flex flex-col gap-2">
                <p className="max-w-[85%] self-start rounded-[22px] rounded-bl-md border border-dp-line bg-dp-surface px-5 py-3.5 text-[15px]">{f.q}</p>
                <p className="max-w-[85%] self-end rounded-[22px] rounded-br-md bg-dp-cta px-5 py-3.5 text-[15px] leading-relaxed text-dp-cta-fg">{f.a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FreeTaste testId="pricing-mockup-offer" />
    </main>
  );
}
