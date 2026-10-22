import { AnimatedSection } from "./AnimatedSection";
import { CTAButton } from "./CTAButton";

/** "Free mock-up" call to action. Links to the contact form with the mock-up option preselected. */
export function MockupOffer({ bgClass, testId }: { bgClass: string; testId: string }) {
  return (
    <section className={`${bgClass} py-16 md:py-20 transition-colors duration-300`} aria-labelledby={`${testId}-heading`} data-testid={testId}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <AnimatedSection>
          <div className="relative grid md:grid-cols-[1fr_auto] items-center gap-8 md:gap-12 bg-white dark:bg-[#120a0e] border-2 border-[#111] dark:border-[#FF2D87]/50 rounded-2xl p-6 sm:p-8 md:p-12 shadow-[6px_6px_0_#FF2D87] dark:shadow-[6px_6px_0_rgba(255,45,135,0.45)]">
            <div>
              <p className="font-mono-brand text-[#B0004F] dark:text-[#FF8DBD] text-xs tracking-[0.25em] uppercase mb-3">Free mock-up</p>
              <h2 id={`${testId}-heading`} className="font-display font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-4">
                See your site before you <span className="text-[#FF2D87]">decide</span> <span className="text-[#FFD700]">★</span>
              </h2>
              <p className="font-body text-gray-700 dark:text-white/70 text-base md:text-lg max-w-xl mb-7">
                Tell me about your business and I'll show you what your website could look like. It's a free preview, with no obligation to go ahead.
              </p>
              <CTAButton href="/contact?interest=mockup" data-testid={`${testId}-cta`}>
                Get my free mock-up ★
              </CTAButton>
            </div>

            {/* Decorative browser window, CSS only */}
            <div aria-hidden="true" className="hidden md:block w-60 rotate-3">
              <div className="rounded-xl border-2 border-[#111] dark:border-white/30 bg-[#FFF0F5] dark:bg-[#1a0f15] overflow-hidden shadow-[4px_4px_0_#111] dark:shadow-[4px_4px_0_rgba(255,255,255,0.15)]">
                <div className="flex items-center gap-1.5 px-3 py-2 border-b-2 border-[#111] dark:border-white/30 bg-white dark:bg-[#0A0A0A]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF2D87]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#111] dark:bg-white/50" />
                </div>
                <div className="p-4 space-y-3">
                  <div className="h-14 rounded-lg bg-[#FF2D87]" />
                  <div className="h-2.5 w-4/5 rounded bg-[#111]/70 dark:bg-white/50" />
                  <div className="h-2.5 w-3/5 rounded bg-[#111]/30 dark:bg-white/25" />
                  <div className="h-7 w-24 rounded-full bg-[#FFD700]" />
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
