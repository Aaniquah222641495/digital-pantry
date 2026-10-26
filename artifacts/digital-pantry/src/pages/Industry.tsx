import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { Reveal } from "../components/Reveal";
import { DeviceFrames } from "../components/DeviceFrames";
import { FreeTaste } from "../components/FreeTaste";
import { H1, H2 } from "../lib/style";
import { BEAUTY, CONSULTANTS, COST_GUIDE, FOOD, PRODUCT_BRANDS, SCHOOLS, TRADES, type Industry } from "../lib/guides";

// Search landing pages for one kind of business: what their site needs, a live site we built
// for that kind of business, which package fits, and their questions. Content: src/lib/guides.ts.
function IndustryPage({ page }: { page: Industry }) {
  const { proof } = page;
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[15%] -top-[30%] -z-10 h-[80vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,var(--dp-glow),transparent)] blur-2xl" />
        <div className={`mx-auto max-w-[1320px] px-5 pb-16 pt-36 sm:px-8 md:pb-24 md:pt-40 ${page.photo ? "md:grid md:grid-cols-12 md:items-center md:gap-10" : ""}`}>
          <div className={page.photo ? "md:col-span-7" : ""}>
          <nav aria-label="Breadcrumb" className="dp-rise mb-3 font-mono text-[12px] text-dp-muted">
            <Link href="/" className="inline-block py-3 underline decoration-dp-line underline-offset-4 hover:text-dp-ink">Home</Link>
            <span aria-hidden="true" className="mx-2">/</span>
            <span aria-current="page">{page.label}</span>
          </nav>
          <h1 className={`dp-rise max-w-[16ch] ${H1}`}>
            <span className="sr-only">{page.heading}</span>
            <span aria-hidden="true">
              {page.before} <CutoutWord word={page.word} /> {page.after}
            </span>
          </h1>
          <p className="dp-rise mt-6 max-w-[52ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-dp-muted" style={{ "--d": "0.12s" } as CSSProperties}>
            {page.intro}
          </p>
          <div className="dp-rise mt-9 flex flex-wrap gap-3" style={{ "--d": "0.2s" } as CSSProperties}>
            <Link href="/contact" className="inline-flex h-[52px] items-center gap-2 rounded-full bg-dp-cta px-7 text-[15px] font-medium text-dp-cta-fg transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent">
              Get a quote <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <Link href="/pricing" className="inline-flex h-[52px] items-center rounded-full border border-dp-line px-7 text-[15px] font-medium text-dp-ink transition-colors hover:border-dp-ink/40">
              See prices
            </Link>
          </div>
          </div>
          {page.photo && (
            <figure className="dp-rise mx-auto mt-14 w-[min(100%,420px)] md:col-span-5 md:mt-0" style={{ "--d": "0.25s" } as CSSProperties}>
              <div className="rotate-[2deg] rounded-[30px] border-[3px] border-white bg-dp-surface p-2 shadow-[0_30px_60px_-30px_rgba(179,47,104,0.55)] dark:border-[var(--im-border)]">
                <img src={page.photo.src} alt={page.photo.alt} width={800} height={1000} fetchPriority="high" className="aspect-[4/5] w-full rounded-[24px] object-cover" />
              </div>
              <figcaption className="mt-4 text-center font-mono text-[11px] text-dp-muted">
                Stock photo · {page.photo.credit} / Pexels
              </figcaption>
            </figure>
          )}
        </div>
      </section>

      {/* What the site needs */}
      <section aria-labelledby="needs-heading" className="border-t border-dp-line">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 md:py-28">
          <Reveal>
            <h2 id="needs-heading" className={`max-w-[18ch] ${H2}`}>What your site needs</h2>
          </Reveal>
          <ul className="mt-12 grid gap-4 sm:grid-cols-2">
            {page.needs.map((n, i) => (
              <Reveal as="li" key={n.title} delay={i * 0.05} className="rounded-[24px] border border-dp-line bg-dp-surface p-7">
                <h3 className="text-[1.25rem] font-semibold tracking-[-0.03em]">
                  <span aria-hidden="true" className="mr-2 text-dp-accent">★</span>
                  {n.title}
                </h3>
                <p className="mt-2 leading-relaxed text-dp-muted">{n.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* A live site for this kind of business, or the free concept when we have none yet */}
      {proof ? (
      <section aria-labelledby="proof-heading" className="border-t border-dp-line">
        <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-5 py-20 sm:px-8 md:grid-cols-12 md:py-28">
          <Reveal className="md:col-span-7">
            <DeviceFrames desktop={proof.desktop} phone={proof.phone} alt={`The ${proof.name} website`} url={proof.url} />
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <p className="text-[14px] text-dp-muted">Live site we built · {proof.kind}</p>
            <h2 id="proof-heading" className="mt-3 text-[clamp(2rem,3.4vw,3rem)] font-semibold tracking-[-0.04em]">
              {proof.name} <span aria-hidden="true" className="text-dp-accent">★</span>
            </h2>
            <dl className="mt-8 flex flex-col gap-6">
              {proof.rows.map(([k, v]) => (
                <div key={k}>
                  <dt className="font-mono text-[12px] text-dp-accent">{k}</dt>
                  <dd className="mt-1.5 leading-relaxed text-dp-muted">{v}</dd>
                </div>
              ))}
            </dl>
            <a href={proof.href} target="_blank" rel="noopener noreferrer" className="group mt-7 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-dp-ink underline decoration-dp-line underline-offset-[6px] transition-colors hover:decoration-dp-accent">
              Visit the live site
              <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>
      </section>
      ) : (
        <section aria-labelledby="proof-heading" className="border-t border-dp-line">
          <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 md:py-28">
            <Reveal className="grid gap-8 rounded-[28px] border border-dashed border-dp-line bg-dp-soft/50 p-8 sm:p-12 md:grid-cols-[1.2fr_1fr] md:items-end">
              <div>
                <p className="font-mono text-[12px] text-dp-accent">No case study here yet</p>
                <h2 id="proof-heading" className="mt-3 max-w-[18ch] text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.04em]">
                  See yours before anyone else's
                </h2>
                <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-dp-muted">
                  We haven't published a site for this kind of business yet, so we won't pretend we have. Send us your brief and we'll design a free concept of your own site instead.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Link href="/contact?interest=mockup" className="inline-flex h-[52px] items-center gap-2 rounded-full bg-dp-cta px-7 text-[15px] font-medium text-dp-cta-fg transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent">
                  Get a free concept <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <Link href="/portfolio" className="inline-flex h-[52px] items-center rounded-full border border-dp-line px-7 text-[15px] font-medium text-dp-ink transition-colors hover:border-dp-ink/40">
                  See our live work
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Which package, and questions */}
      <section aria-labelledby="fit-heading" className="border-t border-dp-line">
        <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-20 sm:px-8 md:grid-cols-2 md:py-28">
          <Reveal>
            <h2 id="fit-heading" className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em]">Which package fits</h2>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-dp-muted">{page.fit}</p>
            <p className="mt-5 max-w-[48ch] leading-relaxed text-dp-muted">
              Wondering how that compares?{" "}
              <Link href={COST_GUIDE.path} className="text-dp-accent underline decoration-dp-line underline-offset-4 hover:decoration-dp-accent">
                See what websites cost in South Africa
              </Link>
              .
            </p>
            <Link href="/pricing" className="group mt-8 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-dp-ink underline decoration-dp-line underline-offset-[6px] hover:decoration-dp-accent">
              Compare all packages <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em]">Questions</h2>
            <dl className="mt-6 divide-y divide-dp-line border-y border-dp-line">
              {page.faq.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="font-semibold tracking-[-0.02em] text-dp-ink">{f.q}</dt>
                  <dd className="mt-2 leading-relaxed text-dp-muted">{f.a}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <FreeTaste testId={`${page.word.toLowerCase()}-mockup-offer`} />
    </main>
  );
}

export function FoodBusinesses() {
  return <IndustryPage page={FOOD} />;
}

export function SchoolsAndMadrasahs() {
  return <IndustryPage page={SCHOOLS} />;
}

export function BeautyBusinesses() {
  return <IndustryPage page={BEAUTY} />;
}

export function Consultants() {
  return <IndustryPage page={CONSULTANTS} />;
}

export function ProductBrands() {
  return <IndustryPage page={PRODUCT_BRANDS} />;
}

export function TradesAndLocalServices() {
  return <IndustryPage page={TRADES} />;
}
