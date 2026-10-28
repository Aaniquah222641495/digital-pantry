import { Check } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { Reveal } from "../components/Reveal";
import { MagneticButton } from "../components/MagneticButton";
import { FreeTaste } from "../components/FreeTaste";
import { PantryShelf } from "../components/PantryShelf";
import { MarketSwitch } from "../components/MarketSwitch";
import { BusinessPicker } from "../components/BusinessPicker";
import { Sticker, DAY, NIGHT } from "../components/Stickers";
import { DOMAIN_FEE, EXTRAS, INCLUDED_ALWAYS, INTL_PRICES, PLAN_PRICES, SMALL_BUSINESS_LIMIT, retainerFor } from "../lib/plans";
import { useRef } from "react";
import { useMarket } from "../lib/MarketContext";
import { track, useTrackOnView, type Package } from "../lib/analytics";
import { Link } from "wouter";
import { H1 } from "../lib/style";

const PLANS = [
  {
    name: "Starter", price: PLAN_PRICES.Starter, usd: INTL_PRICES.Starter, popular: false, img: "/images/starter.webp",
    line: "A one-page site that gets you found.",
    features: ["Single page", "Menu or services section", "WhatsApp button", "Mobile responsive", "Your own domain connected"],
  },
  {
    name: "Standard", price: PLAN_PRICES.Standard, usd: INTL_PRICES.Standard, popular: true, img: "/images/standard.webp",
    line: "The full shop window for most small brands.",
    features: ["Everything in Starter", "Locations section", "About section", "Social links"],
  },
  {
    name: "Premium", price: PLAN_PRICES.Premium, usd: INTL_PRICES.Premium, popular: false, img: "/images/premium.webp",
    line: "Google knows you exist, and locals can find you.",
    features: ["Everything in Standard", "Google Business setup", "Basic SEO setup", "1 month of updates"],
  },
  {
    name: "Pro", price: PLAN_PRICES.Pro, usd: INTL_PRICES.Pro, popular: false, img: "/images/pro.webp",
    line: "Every enquiry caught, saved and answered.",
    features: ["Everything in Premium", "Lead capture form + instant alerts", "Leads saved to your Google Sheet", "Auto-reply to every enquiry", "WhatsApp follow-up button", "Tested before handover"],
  },
] as const;

function PlanCard({ p }: { p: (typeof PLANS)[number] }) {
  const { intl, market } = useMarket();
  const ref = useRef<HTMLDivElement>(null);
  const pkg = p.name.toLowerCase() as Package;
  useTrackOnView(ref, "package_view", { package: pkg, market, surface: "pricing" }, market);
  return (
    <div ref={ref} id={`card-${pkg}`} data-testid={`card-pricing-${p.name.toLowerCase()}`} className="flex h-full scroll-mt-32 flex-col">
      {p.popular && (
        <span className="absolute -top-3 left-8 rounded-full bg-[#FFD43B] px-3 py-1 text-[12px] font-semibold text-[#161214]">Our pick ★</span>
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
            onClick={() => track("package_cta_click", { package: pkg, market, surface: "pricing" })}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-dp-bg text-[15px] font-medium text-dp-ink transition-transform active:scale-[0.98]"
          >
            Choose {p.name}
          </a>
        ) : (
          <a
            href={intl ? "/contact?interest=international" : `/contact?interest=${p.name.toLowerCase()}`}
            data-testid={`button-pricing-${p.name.toLowerCase()}`}
            onClick={() => track("package_cta_click", { package: pkg, market, surface: "pricing" })}
            className="dp-outline-btn inline-flex h-12 w-full items-center justify-center rounded-full border border-dp-line text-[15px] font-medium text-dp-ink transition-colors hover:border-dp-ink/40 active:scale-[0.98]"
          >
            Choose {p.name}
          </a>
        )}
      </div>
    </div>
  );
}


export default function Pricing() {
  const { intl, market } = useMarket();
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
            Website prices for small businesses, from {intl ? INTL_PRICES.Starter : PLAN_PRICES.Starter} once-off. Pick your jar.
          </p>
          {/* The header's Local / International switch is hidden below lg, so phones get it here */}
          <div className="dp-rise mt-6 lg:hidden" style={{ "--d": "0.16s" } as React.CSSProperties}>
            <MarketSwitch />
          </div>

          <div className="dp-rise mt-14 md:mt-16" style={{ "--d": "0.2s" } as React.CSSProperties}>
            <PantryShelf surface="pricing_shelf" toCards />
            <p className="mt-10 max-w-[70ch] text-[14px] leading-relaxed text-dp-muted">
              {intl ? "Once-off prices in US dollars." : `Once-off prices in rand, for South African businesses with ${SMALL_BUSINESS_LIMIT}.`} Need an online shop, or a bigger business?{" "}
              <Link
                href="/contact?interest=larger"
                onClick={() => track("custom_project_cta_click", { surface: "pricing_larger" })}
                className="text-dp-accent underline decoration-dp-line underline-offset-4 hover:decoration-dp-accent"
              >
                Ask us for a custom quote.
              </Link>
            </p>
            <BusinessPicker />
          </div>
        </div>
        <Sticker day={DAY.sparkle} night={NIGHT.star} size={48} r={10} style={{ right: "8%", top: "22%" }} />
        <Sticker day={DAY.donut} night={NIGHT.moon} size={66} r={-8} d={0.8} className="max-md:hidden" style={{ right: "18%", top: "12%" }} />
      </section>

      <Reveal className="mx-auto max-w-[1320px] px-5 pb-8 pt-10 sm:px-8">
        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em]">What's in each jar</h2>
      </Reveal>

      <section aria-label="Packages" className="mx-auto max-w-[1320px] px-5 pb-24 sm:px-8 md:pb-32">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {PLANS.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 0.07}
              className={`relative flex flex-col rounded-[28px] border p-7 sm:p-8 ${
                p.popular ? "border-transparent bg-dp-cta text-dp-cta-fg shadow-[0_30px_60px_-30px_var(--dp-glow)]" : "border-dp-line bg-dp-surface"
              }`}
            >
              <PlanCard p={p} />
            </Reveal>
          ))}
        </div>

        {/* What every package includes, and the extras on their own slip (plain words, no registrar names) */}
        <Reveal className="mt-8 grid items-start gap-10 rounded-[28px] border border-dp-line bg-dp-surface p-5 sm:p-10 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
            <div data-testid="pricing-billed-separately">
              <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold tracking-[-0.035em]">What the price covers</h2>
              <p className="mt-3 max-w-[44ch] leading-relaxed text-dp-muted">
                One price for your site, plus your domain. You pay 50% to start and the rest when your site goes live. Extras only if you want them, quoted first.
              </p>
              <p className="mt-8 font-mono text-[13px] text-dp-accent">In every package</p>
              <ul className="mt-4 flex flex-col gap-3">
                {INCLUDED_ALWAYS.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-[15px] leading-relaxed">
                    <Check size={16} strokeWidth={2.5} aria-hidden="true" className="mt-1 shrink-0 text-dp-accent" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              {/* The domain is not optional: every site gets its own (founder 2026-10-27) */}
              <div className="mt-8 rounded-[20px] bg-dp-soft/70 p-5 sm:p-6">
                <p className="font-mono text-[13px] text-dp-accent">Every site needs</p>
                <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="text-[17px] font-semibold tracking-[-0.01em]">Your own domain</p>
                  <p className="text-[15px] font-semibold tabular-nums">{DOMAIN_FEE}</p>
                </div>
                <p className="mt-2 max-w-[46ch] text-[14px] leading-relaxed text-dp-muted">
                  Like yourbusiness.co.za. We register it in your name and set it up. After year one, we renew it for you on care, or you renew it yourself.
                </p>
              </div>
            </div>
            <figure className="dp-ticket relative w-full px-5 pb-10 pt-8 sm:rotate-[0.6deg] sm:px-8 text-[#211A1E]">
              <figcaption className="text-center">
                <span className="dp-cut-bebas block text-[1.7rem] leading-none tracking-[0.08em]">Extras</span>
                <span className="mt-2 block font-mono text-[12px] text-[#5E5258]">Only if you need them</span>
              </figcaption>
              <div aria-hidden="true" className="my-5 border-t-2 border-dashed border-[#211A1E]/25" />
              <ul className="flex flex-col gap-4">
                {EXTRAS.map((e) => (
                  <li key={e.name}>
                    <div className="flex flex-wrap items-baseline gap-x-2 font-mono text-[13px] sm:text-[14px]">
                      <span className="font-semibold">{e.name}</span>
                      <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b-2 border-dotted border-[#211A1E]/25" />
                      <span className="ml-auto text-right">{e.cost}</span>
                    </div>
                    <p className="mt-1 text-[14px] leading-snug text-[#5E5258]">{e.note}</p>
                  </li>
                ))}
              </ul>
            </figure>
          </Reveal>

        {/* Care: the default from launch, with handover as the alternative (ADR-0032) */}
        <Reveal className="mt-8 grid items-center gap-8 rounded-[28px] border border-dp-line bg-dp-soft/60 p-8 sm:p-10 md:grid-cols-[auto_1fr_auto]">
          <img src="/images/art/sprinkle-jar.webp" alt="" width={600} height={600} loading="lazy" className="h-24 w-24 object-contain md:h-28 md:w-28" />
          <div>
            <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold tracking-[-0.035em]">
              Keep your pantry stocked <span aria-hidden="true" className="text-dp-accent">★</span>
            </h2>
            <p className="mt-2 max-w-[52ch] leading-relaxed text-dp-muted">
              Every new site starts on care: we host it and keep it running, renew your domain for you (renewal at cost) and
              make small edits like menu and schedule changes. Month to month, cancel any time.
            </p>
            <p className="mt-2 max-w-[52ch] text-[14px] leading-relaxed text-dp-muted">
              Rather look after it yourself? We hand the site over to your own hosting account.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <p className="text-[2.4rem] font-semibold tracking-[-0.05em]">
              {retainerFor(market)}
              <span className="text-[1rem] font-normal text-dp-muted"> /month</span>
            </p>
            <a
              href="/contact"
              data-testid="button-retainer-cta"
              className="dp-outline-btn inline-flex h-12 items-center rounded-full border border-dp-line px-6 text-[15px] font-medium text-dp-ink transition-colors hover:border-dp-ink/40"
            >
              Ask about care
            </a>
          </div>
        </Reveal>
      </section>

      {/* Questions live on /faq (one place, founder 2026-10-27); Pricing stays about choosing a jar */}
      <Reveal className="mx-auto max-w-[1320px] px-5 pb-20 sm:px-8 md:pb-24">
        <div className="flex flex-col items-start gap-5 rounded-[28px] bg-dp-surface p-7 sm:p-9 md:flex-row md:items-center md:justify-between" data-testid="pricing-faq-pointer">
          <div>
            <h2 className="text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-[-0.035em]">
              Got questions? We'll <CutoutWord word="DISH" /> it out.
            </h2>
            <p className="mt-2 max-w-[52ch] leading-relaxed text-dp-muted">
              Deposits, domains, hosting, revisions and more, answered plainly.
            </p>
          </div>
          <MagneticButton href="/faq" variant="ghost" data-testid="pricing-more-questions">
            Read the FAQ
          </MagneticButton>
        </div>
      </Reveal>

      <FreeTaste testId="pricing-mockup-offer" />
    </main>
  );
}
