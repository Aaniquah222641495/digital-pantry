import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { MOCKUP_BAND } from "../lib/plans";
import { Reveal } from "./Reveal";

// "Free mock-up" offer band, shared by Home, Pricing and Portfolio.
export function FreeTaste({ testId }: { testId: string }) {
  return (
    <section aria-labelledby={`${testId}-heading`} className="px-5 pb-24 sm:px-8 md:pb-28" data-testid={testId}>
      <Reveal className="relative mx-auto grid max-w-[1320px] items-center gap-10 overflow-hidden rounded-[36px] bg-[#FDD2DE] px-8 py-14 text-[#161214] sm:px-14 md:grid-cols-[1.4fr_1fr] md:py-20 dark:border dark:border-[var(--im-border)] dark:bg-[var(--im-surface)] dark:text-[var(--im-text)]">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-1/2 -right-1/4 h-[140%] w-[70%] rounded-full bg-[radial-gradient(closest-side,#FFA7D2,transparent)] dark:bg-[radial-gradient(closest-side,rgba(255,92,168,0.45),transparent)]" />
        <div className="relative">
          <h2 id={`${testId}-heading`} className="text-[clamp(2.4rem,5.2vw,4.5rem)] font-semibold leading-[1] tracking-[-0.045em]">
            Get a free taste first. <span aria-hidden="true" className="dark:text-[#FFD43B] dark:[text-shadow:0_0_16px_rgba(255,212,59,0.45)]">★</span>
          </h2>
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-[#463E44] dark:text-[var(--im-muted)]">
            Tell us about your business and we'll design a free concept of your site. You see it before you decide, with no obligation to go ahead.
          </p>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-[#463E44] dark:text-[var(--im-muted)]" data-testid={`${testId}-terms`}>
            {MOCKUP_BAND}
          </p>
          <Link
            href="/contact?interest=mockup"
            data-testid={`${testId}-cta`}
            className="mt-10 inline-flex h-[52px] items-center gap-2 rounded-full bg-[#161214] px-7 text-[15px] font-medium text-[#FFF7FA] dark:bg-[var(--im-cta)] dark:text-[var(--im-cta-fg)] dark:shadow-[0_10px_30px_-10px_rgba(255,92,168,0.6)] transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#161214]"
          >
            Get My Free Mock-up
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <img src="/images/art/free-taste.webp" alt="" width={600} height={600} loading="lazy" className="relative mx-auto w-56 drop-shadow-[0_24px_30px_rgba(179,47,104,0.35)] md:w-80" />
      </Reveal>
    </section>
  );
}
