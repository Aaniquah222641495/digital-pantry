import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";

// "Free mock-up" offer band, shared by Home, Pricing, Portfolio, the cost guide and the industry
// pages with a case study. Kept short on purpose (founder 2026-10-26: "too much information"):
// the full terms (ADR-0025) live in the Pricing FAQ (MOCKUP_TERMS) and the contact form note.
const FACTS = ["One per business", "Ready in 5 business days", "No obligation"];

export function FreeTaste({ testId }: { testId: string }) {
  return (
    <section aria-labelledby={`${testId}-heading`} className="px-5 pb-24 sm:px-8 md:pb-28" data-testid={testId}>
      <Reveal className="relative mx-auto grid max-w-[1320px] items-center gap-8 overflow-hidden rounded-[36px] bg-[#FDD2DE] px-8 py-12 text-[#161214] sm:px-14 md:grid-cols-[1.5fr_1fr] md:py-16 dark:border dark:border-[var(--im-border)] dark:bg-[var(--im-surface)] dark:text-[var(--im-text)]">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-1/2 -right-1/4 h-[140%] w-[70%] rounded-full bg-[radial-gradient(closest-side,#FFA7D2,transparent)] dark:bg-[radial-gradient(closest-side,rgba(255,92,168,0.45),transparent)]" />
        <div className="relative">
          <h2 id={`${testId}-heading`} className="text-[clamp(2.4rem,5.2vw,4.5rem)] font-semibold leading-[1] tracking-[-0.045em]">
            Get a free taste first. <span aria-hidden="true" className="dark:text-[#FFD43B] dark:[text-shadow:0_0_16px_rgba(255,212,59,0.45)]">★</span>
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-[#463E44] dark:text-[var(--im-muted)]">
            See a concept of your own site before you decide anything.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" data-testid={`${testId}-terms`}>
            {FACTS.map((f) => (
              <li key={f} className="rounded-full bg-white/70 px-4 py-2 text-[14px] font-medium text-[#161214] dark:bg-white/10 dark:text-[var(--im-text)]">
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link
              href="/contact?interest=mockup"
              data-testid={`${testId}-cta`}
              className="inline-flex h-[52px] items-center gap-2 rounded-full bg-[#161214] px-7 text-[15px] font-medium text-[#FFF7FA] transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#161214] dark:bg-[var(--im-cta)] dark:text-[var(--im-cta-fg)] dark:shadow-[0_10px_30px_-10px_rgba(255,92,168,0.6)]"
            >
              Get My Free Mock-up
              <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <a href="/pricing#faq-heading" className="inline-flex min-h-11 items-center text-[14px] text-[#463E44] underline decoration-[#161214]/25 underline-offset-4 hover:text-[#161214] dark:text-[var(--im-muted)] dark:decoration-white/25 dark:hover:text-[var(--im-text)]">
              The fine print
            </a>
          </div>
        </div>
        <img src="/images/art/free-taste.webp" alt="" width={600} height={600} loading="lazy" className="relative mx-auto w-48 drop-shadow-[0_24px_30px_rgba(179,47,104,0.35)] md:w-72" />
      </Reveal>
    </section>
  );
}
