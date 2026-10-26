import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { Reveal } from "../components/Reveal";
import { FreeTaste } from "../components/FreeTaste";
import { H1 } from "../lib/style";
import { COST_BANDS, COST_DRIVERS, COST_EXTRAS, COST_FAQ, COST_GUIDE, COST_SOURCES, INDUSTRIES, OUR_PRICES } from "../lib/guides";
import { TURNAROUND_TERMS } from "../lib/plans";

// "How much does a website cost in South Africa?": an answer-first guide built from the dated,
// sourced pricing brief. Every market figure names its source; ours come from src/lib/plans.ts.
const h2Cls = "text-[clamp(1.6rem,2.8vw,2.3rem)] font-semibold tracking-[-0.04em] text-dp-ink";
const pCls = "leading-relaxed text-dp-muted";
const linkCls = "text-dp-accent underline decoration-dp-line underline-offset-4 hover:decoration-dp-accent";

export default function CostGuide() {
  return (
    <main>
      <article>
        <header className="relative isolate overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -left-[15%] -top-[30%] -z-10 h-[80vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,var(--dp-glow),transparent)] blur-2xl" />
          <div className="mx-auto max-w-[900px] px-5 pb-10 pt-36 sm:px-8 md:pt-40">
            <nav aria-label="Breadcrumb" className="dp-rise mb-3 font-mono text-[12px] text-dp-muted">
              <Link href="/" className="inline-block py-3 underline decoration-dp-line underline-offset-4 hover:text-dp-ink">Home</Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page">Website costs</span>
            </nav>
            <h1 className={`dp-rise ${H1} !text-[clamp(2.4rem,5.6vw,4.6rem)]`}>
              <span className="sr-only">{COST_GUIDE.heading}</span>
              <span aria-hidden="true">
                How much does a website <CutoutWord word="COST" /> in South Africa?
              </span>
            </h1>
            <p className="dp-rise mt-6 font-mono text-[12px] text-dp-muted" style={{ "--d": "0.1s" } as CSSProperties}>
              By Aaniquah Dicks · Prices checked {COST_GUIDE.checked}
            </p>

            {/* The short answer, first */}
            <div className="dp-rise mt-10 rounded-[24px] border border-dp-line bg-dp-surface p-7 md:p-9" style={{ "--d": "0.16s" } as CSSProperties}>
              <p className="font-mono text-[12px] text-dp-accent">The short answer</p>
              <p className="mt-3 text-[clamp(1.1rem,1.6vw,1.3rem)] leading-relaxed text-dp-ink">
                Most South African small business websites cost <strong>R5 000 to R20 000</strong> for 5 to 10 pages, going by the agency price guides we checked. Simple template sites can cost R2 000 to R5 000, and larger custom builds run from R15 000 to well over R75 000.
              </p>
            </div>
          </div>
        </header>

        <div className="mx-auto flex max-w-[900px] flex-col gap-16 px-5 pb-24 sm:px-8 md:gap-20">
          <Reveal as="section">
            <h2 className={h2Cls}>Price ranges in 2026</h2>
            <div className="mt-6 overflow-hidden rounded-[20px] border border-dp-line">
              <table className="w-full text-left text-[14px] sm:text-[15px]">
                <caption className="sr-only">Typical website prices in South Africa, checked {COST_GUIDE.checked}</caption>
                <thead className="bg-dp-soft/60 font-mono text-[12px] text-dp-muted">
                  <tr>
                    <th scope="col" className="px-3 py-3 font-normal sm:px-5">Type of site</th>
                    <th scope="col" className="px-3 py-3 font-normal sm:px-5">Typical price</th>
                    <th scope="col" className="px-3 py-3 font-normal sm:px-5">Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dp-line">
                  {COST_BANDS.map((b) => (
                    <tr key={b.type}>
                      <th scope="row" className="px-3 py-4 font-medium text-dp-ink sm:px-5">{b.type}</th>
                      <td className="px-3 py-4 font-semibold tracking-[-0.02em] text-dp-ink sm:px-5">{b.range.replace(/(\d) (\d)/g, "$1\u00a0$2")}</td>
                      <td className="px-3 py-4 text-dp-muted sm:px-5">{b.sources.join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={`mt-4 text-[14px] ${pCls}`}>
              If you pay by the hour, HostAfrica puts South African freelancers at about R250 to R800 an hour and agencies at R800 to R2 500 or more. These figures come from agencies' own price guides, so treat them as a guide, not a quote.
            </p>
          </Reveal>

          <Reveal as="section">
            <h2 className={h2Cls}>What changes the price</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {COST_DRIVERS.map((d) => (
                <li key={d.title} className="rounded-[20px] border border-dp-line p-6">
                  <h3 className="font-semibold tracking-[-0.02em] text-dp-ink">{d.title}</h3>
                  <p className={`mt-2 text-[15px] ${pCls}`}>{d.body}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal as="section">
            <h2 className={h2Cls}>Costs people forget</h2>
            <dl className="mt-6 divide-y divide-dp-line border-y border-dp-line">
              {COST_EXTRAS.map((x) => (
                <div key={x.title} className="grid gap-1 py-5 sm:grid-cols-[200px_1fr] sm:gap-6">
                  <dt className="font-semibold tracking-[-0.02em] text-dp-ink">{x.title}</dt>
                  <dd className={pCls}>{x.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal as="section">
            <h2 className={h2Cls}>Questions to ask before you pay</h2>
            <ul className={`mt-6 list-disc space-y-2 pl-6 marker:text-dp-accent ${pCls}`}>
              <li>Will the domain be registered in my name?</li>
              <li>Can I see live sites you have built?</li>
              <li>What is included after launch, and what costs extra?</li>
              <li>Are there monthly fees, and what happens if I stop paying them?</li>
              <li>Will it work properly on a phone? Most of your customers will visit on one.</li>
            </ul>
          </Reveal>

          <Reveal as="section" className="rounded-[28px] bg-dp-soft/60 p-7 md:p-10">
            <h2 className={h2Cls}>Where Digital Pantry fits</h2>
            <p className={`mt-4 text-lg ${pCls}`}>{OUR_PRICES}</p>
            <p className={`mt-4 ${pCls}`}>
              We keep small business sites focused: the pages your customers actually use, built from scratch and mobile first. {TURNAROUND_TERMS} See what we build for{" "}
              {INDUSTRIES.map((ind, i) => (
                <span key={ind.path}>
                  {i > 0 && (i === INDUSTRIES.length - 1 ? " or " : ", ")}
                  <Link href={ind.path} className={linkCls}>{ind.label.replace("Websites for ", "")}</Link>
                </span>
              ))}
              .
            </p>
            <Link href="/pricing" className="mt-7 inline-flex h-[52px] items-center gap-2 rounded-full bg-dp-cta px-7 text-[15px] font-medium text-dp-cta-fg transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent">
              See our prices <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </Reveal>

          <Reveal as="section">
            <h2 className={h2Cls}>Questions</h2>
            <dl className="mt-6 divide-y divide-dp-line border-y border-dp-line">
              {COST_FAQ.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="font-semibold tracking-[-0.02em] text-dp-ink">{f.q}</dt>
                  <dd className={`mt-2 ${pCls}`}>{f.a}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal as="section">
            <h2 className="text-[1.1rem] font-semibold tracking-[-0.02em] text-dp-ink">Sources (checked {COST_GUIDE.checked})</h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[14px]">
              {COST_SOURCES.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkCls}>{s.name}</a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </article>

      <FreeTaste testId="cost-guide-mockup-offer" />
    </main>
  );
}
