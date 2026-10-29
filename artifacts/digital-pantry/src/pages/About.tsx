import type { CSSProperties } from "react";
import { CutoutWord } from "../components/CutoutWord";
import { FreeTaste } from "../components/FreeTaste";
import { Reveal } from "../components/Reveal";
import { Chefs } from "../components/Chefs";
import { Sprinkles } from "../components/Sprinkles";

// About (founder 2026-10-29). The story is in the founder's own words; keep her phrasing.
// Hero: the two of us holding the blank pink board from the marketing pack, with the page title
// written on the board as real text (readable to Google and screen readers). The board's inner
// edges were measured on founders-board-1000.webp: left 11.3%, right 9.4%, top 53.1%, bottom 9.5%.
// Chefs moved here from Home so the founders are told once.
const rise = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;

export default function About() {
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -left-[10%] top-[10%] -z-10 h-[70vh] w-[55vw] rounded-full bg-[radial-gradient(closest-side,var(--dp-glow),transparent)] blur-2xl" />
        <Sprinkles count={12} className="-z-10 opacity-50 dark:opacity-40" />
        <div className="mx-auto grid max-w-[1320px] items-end gap-10 px-5 pt-28 sm:px-8 md:pt-32 lg:grid-cols-12 lg:gap-12">
          {/* The board. Its title scales with the picture (container query units), so it always sits on the board. */}
          <div className="dp-rise relative mx-auto w-full max-w-[640px] lg:col-span-6 lg:mx-0" style={{ ...rise(0), containerType: "inline-size" }}>
            <img
              src="/images/art/founders-board-1000.webp"
              srcSet="/images/art/founders-board-600.webp 600w, /images/art/founders-board-1000.webp 1000w"
              sizes="(min-width: 1024px) 600px, 92vw"
              alt="Pixel-art Aaniquah and Imaan holding a pink Digital Pantry board together"
              width={1000}
              height={1007}
              fetchPriority="high"
              className="block h-auto w-full [image-rendering:pixelated]"
            />
            <h1
              className="absolute grid place-content-center text-center font-semibold leading-[0.95] tracking-[-0.05em] text-[#161214]"
              style={{ left: "11.3%", right: "9.4%", top: "57%", bottom: "9.5%", fontSize: "8.6cqw" }}
            >
              <span className="sr-only">About Digital Pantry: </span>
              <span>Two women</span>
              <span>
                with a <CutoutWord word="DREAM" />
              </span>
            </h1>
          </div>

          <div className="pb-4 lg:col-span-6 lg:pb-[9%]">
            <p className="dp-rise inline-flex items-center gap-2 rounded-full border border-dp-line px-3.5 py-1.5 text-[13px] text-dp-muted" style={rise(0.08)}>
              <span aria-hidden="true" className="text-dp-accent">★</span> Women-led studio, Cape Town
            </p>
            <p className="dp-rise mt-6 max-w-[26ch] text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.035em] text-dp-ink" style={rise(0.14)}>
              We started Digital Pantry so small businesses get a real chance to grow, at prices they can afford.
            </p>
            <p className="dp-rise mt-5 max-w-[40ch] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] text-dp-muted" style={rise(0.2)}>
              You do what you do best: <span className="text-dp-ink">the business.</span>
            </p>
          </div>
        </div>
        {/* The counter the board rests on */}
        <div aria-hidden="true" className="mx-auto h-px max-w-[1320px] bg-dp-line" />
      </section>

      {/* Why we started: one statement, set big, on a blush band */}
      <section aria-labelledby="why-heading" className="relative overflow-hidden bg-[#FCE8F0] text-[#161214] dark:bg-[var(--im-surface)] dark:text-[var(--im-text)]">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-[radial-gradient(closest-side,#FFA7D2,transparent)] opacity-70 dark:bg-[radial-gradient(closest-side,var(--im-glow),transparent)]" />
        <Reveal className="relative mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:py-32">
          <h2 id="why-heading" className="text-[13px] font-semibold uppercase tracking-[0.24em] text-[#B32F68] dark:text-[var(--im-accent)]">
            Why we started
          </h2>
          <p className="mt-8 max-w-[22ch] text-[clamp(2rem,4.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.045em]">
            We got tired of the stereotypes that come with being a woman in STEM.
          </p>
          <p className="mt-10 max-w-[40ch] text-[clamp(1.2rem,2vw,1.6rem)] leading-[1.45] tracking-[-0.015em] text-[#463E44] md:ml-[18%] dark:text-[var(--im-muted)]">
            So we're showing little girls and young women that it's okay to be multifaceted, and yes, we can be{" "}
            <CutoutWord word="BADDIES" /> <span className="text-[#161214] dark:text-[var(--im-text)]">in tech.</span>
          </p>
        </Reveal>
      </section>

      <Chefs />
      <FreeTaste testId="about-mockup-offer" />
    </main>
  );
}
