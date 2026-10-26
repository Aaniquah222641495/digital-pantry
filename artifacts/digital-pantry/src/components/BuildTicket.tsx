import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { CutoutWord } from "./CutoutWord";
import { Reveal } from "./Reveal";
import { H2 } from "../lib/style";

// "Built to Perform", made literal (PRD 2.1-2.2: the aesthetic is feminine, the execution is
// serious, technical capability is visible). A kitchen order ticket that prints out with this
// site's own measured results. Every figure is real: Lighthouse 13.5 over all sitemap pages and
// the baseline audit (ops/.../baseline-audit-2026-10-26.md). Re-measure and update MEASURED and
// the lines together; never round up.
export const MEASURED = "26 Oct 2026";

const LINES: { item: string; value: string; note?: string }[] = [
  { item: "Accessibility", value: "100/100", note: "every page" },
  { item: "SEO", value: "100/100", note: "every page" },
  { item: "Speed, computer", value: "99–100" },
  { item: "Speed, phone", value: "86–96" },
  { item: "Layout shift", value: "0" },
  { item: "Page builders", value: "none" },
  { item: "Tracking cookies", value: "none" },
  { item: "Security headers", value: "on" },
  { item: "Privacy notice", value: "POPIA" },
];

const PROMISES = [
  { title: "Hand-written code", body: "React and TypeScript, built for your business. No page builder, no template." },
  { title: "Fast on a phone", body: "Small images, self-hosted fonts and nothing loading that you don't need." },
  { title: "Usable by everyone", body: "Proper headings, labels, contrast and keyboard focus, checked in a real browser." },
  { title: "Careful with people's details", body: "Forms ask only for what you need, with a privacy notice written for POPIA." },
];

export function BuildTicket() {
  return (
    <section aria-labelledby="build-heading" className="relative isolate overflow-hidden border-t border-dp-line">
      <div aria-hidden="true" className="pointer-events-none absolute -left-[10%] top-1/3 -z-10 h-[60vh] w-[50vw] rounded-full bg-[radial-gradient(closest-side,var(--dp-glow),transparent)] blur-2xl" />
      <div className="mx-auto grid max-w-[1320px] gap-16 px-5 py-24 sm:px-8 md:grid-cols-12 md:gap-10 md:py-32">
        <div className="md:col-span-6 lg:col-span-7">
          <Reveal>
            <h2 id="build-heading" className={`max-w-[14ch] text-balance ${H2}`}>
              Sweet on the outside. <CutoutWord word="SERIOUS" /> about the build.
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-dp-muted">
              The pink is a choice, not a shortcut. Under the sprinkles is code we write ourselves, tested the way bigger studios test theirs. This is our own site's ticket.
            </p>
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {PROMISES.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.05 * i}>
                <h3 className="text-[1.15rem] font-semibold tracking-[-0.025em] text-dp-ink">{p.title}</h3>
                <p className="mt-2 max-w-[34ch] leading-relaxed text-dp-muted">{p.body}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <Link href="/contact" className="group mt-12 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-dp-ink underline decoration-dp-line underline-offset-[6px] hover:decoration-dp-accent">
              Order one like it
              <ArrowUpRight size={16} aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="md:col-span-6 lg:col-span-5">
          {/* The ticket rail: the ticket prints down out of it when the section scrolls in */}
          <Reveal className="dp-ticket-wrap mx-auto w-full max-w-[420px]">
            <div aria-hidden="true" className="relative z-10 h-4 rounded-full bg-dp-ink shadow-[0_8px_20px_-8px_rgba(22,18,20,0.6)] dark:bg-[var(--im-border)]" />
            <div className="dp-ticket-clip -mt-2 px-3">
              <figure className="dp-ticket relative rotate-[-0.6deg] px-5 pb-10 pt-9 sm:rotate-[-1.5deg] sm:px-7 text-[#211A1E] shadow-[0_30px_60px_-30px_rgba(179,47,104,0.6)]">
                <figcaption className="text-center">
                  <span className="dp-cut-bebas block text-[2.2rem] leading-none tracking-[0.08em]">The Digital Pantry</span>
                  <span className="mt-2 block font-mono text-[12px] text-[#5E5258]">Order: digitalpantry.co.za</span>
                  <span className="block font-mono text-[12px] text-[#5E5258]">Checked {MEASURED} · Lighthouse</span>
                </figcaption>
                <div aria-hidden="true" className="my-5 border-t-2 border-dashed border-[#211A1E]/25" />
                <dl className="flex flex-col gap-2.5 font-mono text-[12.5px] sm:text-[14px]">
                  {LINES.map((l) => (
                    <div key={l.item} className="flex items-baseline gap-2">
                      <dt className="shrink-0">{l.item}</dt>
                      <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b-2 border-dotted border-[#211A1E]/30" />
                      <dd className="shrink-0 font-semibold tabular-nums">
                        {l.value}
                        {l.note && <span className="sr-only">, {l.note}</span>}
                      </dd>
                    </div>
                  ))}
                </dl>
                <div aria-hidden="true" className="my-5 border-t-2 border-dashed border-[#211A1E]/25" />
                <p className="flex items-baseline justify-between gap-3">
                  <span className="dp-cut-bebas text-[1.6rem] tracking-[0.06em]">Total</span>
                  <span className="dp-cut-bebas text-[1.6rem] tracking-[0.06em] text-[#B32F68]">Built to perform</span>
                </p>
                <p className="mt-5 text-center font-mono text-[11px] leading-relaxed text-[#5E5258]">
                  Accessibility and SEO scored on every page of this site. Every client site goes through our launch checks before it goes live.
                </p>
              </figure>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
