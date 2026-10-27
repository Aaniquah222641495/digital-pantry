import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Plus } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { Reveal } from "../components/Reveal";
import { DeviceFrames } from "../components/DeviceFrames";
import { FreeTaste } from "../components/FreeTaste";
import { H1, H2 } from "../lib/style";
import { priceFor } from "../lib/plans";
import { useMarket } from "../lib/MarketContext";
import { BEAUTY, FOOD, PRODUCT_BRANDS, TRADES, type Industry } from "../lib/guides";
import { useTrackOnMount } from "../lib/analytics";

// Search landing pages for one kind of business: what their site needs, a live site we built
// for that kind of business, which package fits, and their questions. Content: src/lib/guides.ts.
// Packages named in the page's advice, in shelf order, so the order slip never repeats a price by hand.
const PLAN_ORDER = ["Starter", "Standard", "Premium", "Pro"] as const;
const plansIn = (text: string) => PLAN_ORDER.filter((name) => new RegExp(`\\b${name}\\b`).test(text));

function IndustryPage({ page }: { page: Industry }) {
  const { proof } = page;
  const { market, money } = useMarket();
  const plans = plansIn(page.fit);
  return (
    <main>
      {/* Hero: the promise on the left, the kind of business on the right */}
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[15%] -top-[30%] -z-10 h-[80vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,var(--dp-glow),transparent)] blur-2xl" />
        <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-5 pb-20 pt-32 sm:px-8 md:grid-cols-12 md:gap-10 md:pb-28 md:pt-36">
          <div className="md:col-span-6 lg:col-span-7">
            <nav aria-label="Breadcrumb" className="dp-rise mb-3 font-mono text-[12px] text-dp-muted">
              <Link href="/" className="inline-block py-3 underline decoration-dp-line underline-offset-4 hover:text-dp-ink">Home</Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page">{page.label}</span>
            </nav>
            <h1 className={`dp-rise max-w-[14ch] ${H1}`}>
              <span className="sr-only">{page.heading}</span>
              <span aria-hidden="true">
                {page.before} <CutoutWord word={page.word} /> {page.after}
              </span>
            </h1>
            <p className="dp-rise mt-7 max-w-[46ch] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.5] text-dp-ink/80" style={{ "--d": "0.12s" } as CSSProperties}>
              {page.intro}
            </p>
            <div className="dp-rise mt-10 flex flex-wrap gap-3" style={{ "--d": "0.2s" } as CSSProperties}>
              <Link href="/contact" className="inline-flex h-[52px] items-center gap-2 rounded-full bg-dp-cta px-7 text-[15px] font-medium text-dp-cta-fg transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent">
                Get a quote <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <a href="#fit-heading" className="dp-outline-btn inline-flex h-[52px] items-center rounded-full border border-dp-line px-7 text-[15px] font-medium text-dp-ink transition-colors hover:border-dp-ink/40">
                Which package fits
              </a>
            </div>
          </div>
          {page.photo && (
            <figure className="dp-rise relative mx-auto w-full max-w-[520px] md:col-span-6 lg:col-span-5" style={{ "--d": "0.25s" } as CSSProperties}>
              <div className="overflow-hidden rounded-[36px] bg-dp-surface shadow-[0_40px_80px_-40px_rgba(179,47,104,0.6)] ring-1 ring-dp-line">
                <img src={page.photo.src} alt={page.photo.alt} width={800} height={1000} fetchPriority="high" className="aspect-[4/5] w-full object-cover" />
              </div>
              <p className="absolute -left-4 bottom-10 rotate-[-3deg] rounded-2xl bg-dp-surface px-5 py-3.5 shadow-[0_20px_40px_-18px_rgba(12,11,13,0.45)] ring-1 ring-dp-line sm:-left-8">
                <span className="block text-[12px] text-dp-muted">Packages from</span>
                <span className="block text-[1.6rem] font-semibold leading-tight tracking-[-0.03em] tabular-nums text-dp-ink">{priceFor("Starter", market)}</span>
              </p>
            </figure>
          )}
        </div>
      </section>

      {/* What the site needs: big numbered rows, not boxes */}
      <section aria-labelledby="needs-heading" className="border-t border-dp-line">
        <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:py-32">
          <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 id="needs-heading" className={`md:col-span-7 ${H2}`}>
              What your site <CutoutWord word="NEEDS" />
            </h2>
          </Reveal>
          <ol className="mt-14 border-t border-dp-ink/15 dark:border-white/15">
            {page.needs.map((n, i) => (
              <Reveal as="li" key={n.title} delay={i * 0.05} className="group grid gap-3 border-b border-dp-ink/15 py-8 transition-colors hover:bg-dp-soft/50 md:grid-cols-12 md:items-baseline md:gap-8 md:px-4 dark:border-white/15 dark:hover:bg-[var(--im-soft)]">
                <span aria-hidden="true" className="dp-cut-bebas text-[2.6rem] leading-none text-dp-accent md:col-span-1">0{i + 1}</span>
                <h3 className="text-[clamp(1.5rem,2.6vw,2.2rem)] font-semibold leading-[1.08] tracking-[-0.04em] text-dp-ink md:col-span-5">{n.title}</h3>
                <p className="max-w-[50ch] text-[1.05rem] leading-relaxed text-dp-muted md:col-span-6">{n.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* A live site for this kind of business, or the free concept when we have none yet */}
      {proof ? (
        <section aria-labelledby="proof-heading" className="bg-dp-soft/60 dark:bg-[var(--im-soft)]">
          <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 py-24 sm:px-8 md:grid-cols-12 md:py-32">
            <Reveal className="md:col-span-7">
              <DeviceFrames desktop={proof.desktop} phone={proof.phone} alt={proof.concept ? `A concept design for ${proof.name}` : `The ${proof.name} website`} url={proof.url} />
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-5">
              <p className="text-[14px] text-dp-muted">{proof.concept ? "Our concept design" : "Fresh out the kitchen"} · {proof.kind}</p>
              <h2 id="proof-heading" className="mt-3 text-[clamp(2.2rem,3.8vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                {proof.name} <span aria-hidden="true" className="text-dp-accent">★</span>
              </h2>
              <dl className="mt-8 flex flex-col gap-6">
                {proof.rows.map(([k, v]) => (
                  <div key={k} className="border-l-2 border-dp-accent pl-5">
                    <dt className="text-[13px] font-semibold text-dp-ink">{k}</dt>
                    <dd className="mt-1.5 leading-relaxed text-dp-muted">{v}</dd>
                  </div>
                ))}
              </dl>
              {proof.href && (
              <a href={proof.href} target="_blank" rel="noopener noreferrer" className="group mt-8 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-dp-ink underline decoration-dp-line underline-offset-[6px] transition-colors hover:decoration-dp-accent">
                Visit the live site
                <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              )}
            </Reveal>
          </div>
        </section>
      ) : (
        <section aria-labelledby="proof-heading" className="px-5 sm:px-8">
          <Reveal className="mx-auto grid max-w-[1320px] gap-10 rounded-[36px] bg-dp-cta p-8 text-dp-cta-fg sm:p-12 md:grid-cols-12 md:items-end md:p-16">
            <div className="md:col-span-8">
              <p className="text-[14px] opacity-75">Free mock-up, no obligation</p>
              <h2 id="proof-heading" className="mt-4 max-w-[16ch] text-[clamp(2.3rem,4.6vw,4rem)] font-semibold leading-[1] tracking-[-0.045em]">
                See yours before anyone else's
              </h2>
              <p className="mt-6 max-w-[48ch] text-lg leading-relaxed opacity-80">
                Send us your brief and we'll design a free mock-up of your own site.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
              <Link href="/contact?interest=mockup" className="inline-flex h-[52px] items-center gap-2 rounded-full bg-dp-bg px-7 text-[15px] font-medium text-dp-ink transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current">
                Get a free mock-up <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link href="/portfolio" className="inline-flex h-[52px] items-center rounded-full border border-current/30 px-7 text-[15px] font-medium transition-colors hover:border-current">
                See our live work
              </Link>
            </div>
          </Reveal>
        </section>
      )}

      {/* Which package: an order slip, then the questions */}
      <section aria-labelledby="fit-heading" className={proof ? "" : "pt-8"}>
        <div className="mx-auto grid max-w-[1320px] gap-16 px-5 py-24 sm:px-8 md:grid-cols-12 md:gap-10 md:py-32">
          <div className="md:col-span-5">
            <Reveal>
              <h2 id="fit-heading" className={`scroll-mt-28 ${H2}`}>
                Your <CutoutWord word="ORDER" />
              </h2>
              <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-dp-muted">The packages that suit this kind of business.</p>
            </Reveal>
            <Reveal delay={0.08} className="mt-10">
              <figure className="dp-ticket relative mx-auto max-w-[440px] rotate-[-1deg] px-6 pb-10 pt-8 text-[#211A1E] sm:px-8">
                <figcaption className="text-center">
                  <span className="dp-cut-bebas block text-[1.9rem] leading-none tracking-[0.08em]">Order slip</span>
                  <span className="mt-2 block font-mono text-[12px] text-[#5E5258]">{page.label}</span>
                </figcaption>
                <div aria-hidden="true" className="my-5 border-t-2 border-dashed border-[#211A1E]/25" />
                <dl className="flex flex-col gap-3 font-mono text-[14px]">
                  {plans.map((name) => (
                    <div key={name} className="flex items-baseline gap-2">
                      <dt className="shrink-0">
                        <Link href={`/contact?interest=${name.toLowerCase()}`} className="underline decoration-[#211A1E]/25 underline-offset-4 hover:decoration-[#B32F68] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B32F68]">
                          {name}
                          <span className="sr-only"> package: choose it</span>
                        </Link>
                      </dt>
                      <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b-2 border-dotted border-[#211A1E]/30" />
                      <dd className="shrink-0 font-semibold tabular-nums">{priceFor(name, market)}</dd>
                    </div>
                  ))}
                </dl>
                <div aria-hidden="true" className="my-5 border-t-2 border-dashed border-[#211A1E]/25" />
                <p className="text-[14.5px] leading-relaxed">{money(page.fit)}</p>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Link href="/contact" className="inline-flex h-12 items-center gap-2 rounded-full bg-[#211A1E] px-6 text-[14px] font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B32F68]">
                    Get a quote <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                  <Link href="/pricing" className="inline-flex min-h-11 items-center text-[14px] font-medium underline decoration-[#211A1E]/30 underline-offset-4 hover:decoration-[#B32F68]">
                    Compare all packages
                  </Link>
                </div>
              </figure>
            </Reveal>
          </div>

          <Reveal delay={0.08} className="md:col-span-6 md:col-start-7">
            <h2 className="text-[clamp(2rem,3.4vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.045em]">Questions people ask</h2>
            <div className="mt-8 border-t border-dp-ink/15 dark:border-white/15">
              {page.faq.map((f, i) => (
                <details key={f.q} className="group border-b border-dp-ink/15 dark:border-white/15" open={i === 0}>
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-6 text-[1.2rem] font-semibold leading-snug tracking-[-0.02em] text-dp-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus size={20} aria-hidden="true" className="shrink-0 text-dp-accent transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="max-w-[56ch] pb-7 leading-relaxed text-dp-muted">{money(f.a)}</p>
                </details>
              ))}
            </div>
            <p className="mt-6 text-[15px] text-dp-muted">
              More answers on prices, domains and hosting?{" "}
              <Link href="/faq" className="text-dp-ink underline decoration-dp-line underline-offset-4 hover:decoration-dp-accent">
                Read the full FAQ
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pages without a case study already offer the free concept above, so it isn't repeated here */}
      {proof && <FreeTaste testId={`${page.word.toLowerCase()}-mockup-offer`} />}
    </main>
  );
}

export function FoodBusinesses() {
  useTrackOnMount("segment_page_view", { segment: "food" });
  return <IndustryPage page={FOOD} />;
}

export function BeautyBusinesses() {
  return <IndustryPage page={BEAUTY} />;
}

export function ProductBrands() {
  return <IndustryPage page={PRODUCT_BRANDS} />;
}

export function TradesAndLocalServices() {
  return <IndustryPage page={TRADES} />;
}
