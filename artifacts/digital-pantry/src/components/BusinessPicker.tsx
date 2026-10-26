import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { CutoutWord } from "./CutoutWord";
import { Reveal } from "./Reveal";
import { H2 } from "../lib/style";
import { INDUSTRIES } from "../lib/guides";

// "What are you cooking up?" (DPW-14): send each visitor to the page for their kind of business.
// Lives on Pricing, where people decide which package fits (moved off Home 2026-10-27 so Home
// stays short: founder "we don't want decision fatigue"). Only pages that exist.
export function BusinessPicker() {
  return (
    <section aria-labelledby="cooking-heading" className="border-t border-dp-line">
      <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 md:py-24">
        <Reveal>
          <h2 id="cooking-heading" className={H2}>
            What are you <CutoutWord word="COOKING" /> up?
          </h2>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-dp-muted">Not sure which jar? Pick your kind of business to see what your site needs and which package fits.</p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="segment-selector">
          {INDUSTRIES.map((ind, i) => (
            <li key={ind.path}>
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <Link
                  href={ind.path}
                  className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-dp-line bg-dp-surface transition-[border-color,box-shadow] duration-500 hover:border-dp-accent hover:shadow-[0_24px_50px_-30px_rgba(179,47,104,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent"
                >
                  <span className="relative block aspect-[16/9] overflow-hidden">
                    <img
                      src={ind.card.image}
                      alt=""
                      width={800}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/92 px-3 py-1 font-mono text-[11px] text-[#211A1E] backdrop-blur-sm">{ind.card.tag}</span>
                  </span>
                  <span className="flex flex-1 flex-col p-6">
                    <span className="flex items-start justify-between gap-3 text-[1.35rem] font-semibold leading-tight tracking-[-0.03em] text-dp-ink">
                      {ind.card.title}
                      <ArrowUpRight aria-hidden="true" size={18} className="mt-1 shrink-0 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                    <span className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-dp-muted">{ind.card.body}</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
