import { Check } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { Reveal } from "../components/Reveal";
import { MagneticButton } from "../components/MagneticButton";
import { FreeTaste } from "../components/FreeTaste";
import { PantryShelf } from "../components/PantryShelf";
import { Sticker, DAY, NIGHT } from "../components/Stickers";
import { PLAN_PRICES } from "../lib/plans";
import { H1, H2 } from "../lib/style";
import { FAQ } from "../seo";

const PLANS = [
  {
    name: "Starter", price: PLAN_PRICES.Starter, popular: false, img: "/images/starter.webp",
    line: "A one-page site that gets you found.",
    features: ["Single page", "Menu section", "WhatsApp button", "Mobile responsive"],
  },
  {
    name: "Standard", price: PLAN_PRICES.Standard, popular: true, img: "/images/standard.webp",
    line: "The full shop window for most small brands.",
    features: ["Everything in Starter", "Locations section", "About section", "Social links"],
  },
  {
    name: "Premium", price: PLAN_PRICES.Premium, popular: false, img: "/images/premium.webp",
    line: "Your own domain, and Google knows you exist.",
    features: ["Everything in Standard", "Custom domain setup", "Google Business setup", "Basic SEO setup", "1 month of updates"],
  },
  {
    name: "Pro", price: PLAN_PRICES.Pro, popular: false, img: "/images/pro.webp",
    line: "Every enquiry caught, saved and answered.",
    features: ["Everything in Premium", "Lead capture form + instant alerts", "Leads saved to your Google Sheet", "Auto-reply to every enquiry", "WhatsApp follow-up button", "Tested before handover"],
  },
] as const;

export default function Pricing() {
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
            Website prices for South African small businesses, once-off and in rand. Pick your jar. We'll stock the shelves.
          </p>
          <div className="dp-rise mt-16 md:mt-20" style={{ "--d": "0.2s" } as React.CSSProperties}>
            <PantryShelf />
          </div>
        </div>
        <Sticker day={DAY.sparkle} night={NIGHT.star} size={48} r={10} style={{ right: "8%", top: "22%" }} />
        <Sticker day={DAY.donut} night={NIGHT.moon} size={66} r={-8} d={0.8} style={{ right: "18%", top: "12%" }} />
      </section>

      <Reveal className="mx-auto flex max-w-[1320px] flex-wrap items-end justify-between gap-6 px-5 pb-8 pt-10 sm:px-8">
        <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em]">What's in each jar</h2>
        <p className="max-w-[46ch] rounded-[16px] border border-dp-line bg-dp-surface px-5 py-3 text-[14px] leading-relaxed text-dp-muted">
          <span className="font-medium text-dp-ink">Small-business pricing.</span> Bigger companies or larger projects?{" "}
          <a href="/contact" className="text-dp-accent underline decoration-dp-line underline-offset-4 hover:decoration-dp-accent">Ask us for a custom quote.</a>
        </p>
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
              <div data-testid={`card-pricing-${p.name.toLowerCase()}`} className="flex h-full flex-col">
                {p.popular && (
                  <span className="absolute -top-3 left-8 rounded-full bg-[#FFD43B] px-3 py-1 text-[12px] font-semibold text-[#161214]">Most popular ★</span>
                )}
                <p className={`text-[15px] ${p.popular ? "opacity-75" : "text-dp-muted"}`}>{p.name}</p>
                <p className="mt-1 text-[clamp(2.6rem,4vw,3.25rem)] font-semibold tracking-[-0.05em]">{p.price}</p>
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
                      href={`/contact?interest=${p.name.toLowerCase()}`}
                      data-testid={`button-pricing-${p.name.toLowerCase()}`}
                      className="inline-flex h-12 w-full items-center justify-center rounded-full bg-dp-bg text-[15px] font-medium text-dp-ink transition-transform active:scale-[0.98]"
                    >
                      Choose {p.name}
                    </a>
                  ) : (
                    <a
                      href={`/contact?interest=${p.name.toLowerCase()}`}
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
            <p className="text-[2.4rem] font-semibold tracking-[-0.05em]">
              R120<span className="text-[1rem] font-normal text-dp-muted"> /month</span>
            </p>
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
