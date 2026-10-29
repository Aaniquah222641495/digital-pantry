import type { CSSProperties } from "react";
import { CutoutWord } from "../components/CutoutWord";
import { FreeTaste } from "../components/FreeTaste";
import { Reveal } from "../components/Reveal";
import { Chefs } from "../components/Chefs";
import { H1 } from "../lib/style";

// About (founder 2026-10-29). The story is in the founder's own words; keep her phrasing.
// The chefs section moved here from Home so the founders are told once, not twice.
export default function About() {
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[15%] -top-[30%] -z-10 h-[80vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,var(--dp-glow),transparent)] blur-2xl" />
        <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-36 sm:px-8 md:pb-16 md:pt-40">
          <h1 className={`dp-rise max-w-[14ch] ${H1}`}>
            <span className="sr-only">About Digital Pantry: </span>
            <span aria-hidden="true">
              Two women with a <CutoutWord word="DREAM" />
            </span>
          </h1>
          <p className="dp-rise mt-7 max-w-[46ch] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.5] text-dp-ink/80" style={{ "--d": "0.12s" } as CSSProperties}>
            We started Digital Pantry to give small businesses a chance to grow at prices they can afford, so they can focus on what they do best: the business.
          </p>
        </div>
      </section>

      <section aria-labelledby="why-heading" className="border-t border-dp-line">
        <Reveal className="mx-auto grid max-w-[1320px] gap-6 px-5 py-20 sm:px-8 md:grid-cols-12 md:items-start md:py-24">
          <h2 id="why-heading" className="text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1] tracking-[-0.045em] md:col-span-5">
            Why we <span className="text-dp-accent">started</span>
          </h2>
          <div className="space-y-5 text-lg leading-relaxed text-dp-muted md:col-span-7">
            <p>
              Aaniquah and Imaan were tired of the stereotypes that come with being a woman. We want little girls and young women to see that it's okay to be many things at once.
            </p>
            <p className="text-dp-ink">And that we can be baddies in tech.</p>
          </div>
        </Reveal>
      </section>

      <Chefs />
      <FreeTaste testId="about-mockup-offer" />
    </main>
  );
}
