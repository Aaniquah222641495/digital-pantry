import { useEffect, type CSSProperties } from "react";
import { Link } from "wouter";
import { Plus } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { FreeTaste } from "../components/FreeTaste";
import { Reveal } from "../components/Reveal";
import { Sticker, DAY, NIGHT } from "../components/Stickers";
import { COST_GUIDE } from "../lib/guides";
import { FAQ_GROUPS } from "../lib/faq";
import { H1 } from "../lib/style";

// Every studio question in one calm place (DPW-9). The questions live in src/lib/faq.ts, which also
// feeds the FAQPage structured data, so the text here and in the markup is identical.

// A link such as /faq#free-mock-up should land on that answer already open.
function openFromHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;
  const el = document.getElementById(id);
  if (el instanceof HTMLDetailsElement) {
    el.open = true;
    el.scrollIntoView({ block: "center" });
  }
}

export default function Faq() {
  useEffect(() => {
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[15%] -top-[30%] -z-10 h-[80vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,var(--dp-glow),transparent)] blur-2xl" />
        <div className="mx-auto max-w-[1320px] px-5 pb-12 pt-36 sm:px-8 md:pb-16 md:pt-40">
          <h1 className={`dp-rise max-w-[14ch] ${H1}`}>
            <span className="sr-only">Website questions, answered: </span>
            <span aria-hidden="true">
              Got <span className="whitespace-nowrap"><CutoutWord word="QUESTIONS" />?</span> Ask away.
            </span>
          </h1>
          <p className="dp-rise mt-7 max-w-[46ch] text-[clamp(1.1rem,1.6vw,1.3rem)] leading-[1.5] text-dp-ink/80" style={{ "--d": "0.12s" } as CSSProperties}>
            Prices, how we work, your domain and hosting, and what happens after launch. Plain answers, no fine print hiding.
          </p>
          <nav aria-label="Question groups" className="dp-rise mt-9 flex flex-wrap gap-2" style={{ "--d": "0.2s" } as CSSProperties}>
            {FAQ_GROUPS.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-dp-line bg-dp-surface px-5 text-[15px] font-medium text-dp-ink transition-colors hover:border-dp-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dp-accent"
              >
                {g.title}
              </a>
            ))}
          </nav>
        </div>
        <Sticker day={DAY.sparkle} night={NIGHT.star} size={48} r={10} style={{ right: "8%", top: "26%" }} />
      </section>

      <div className="mx-auto max-w-[1320px] px-5 pb-20 sm:px-8 md:pb-28">
        {FAQ_GROUPS.map((g) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-heading`} className="grid scroll-mt-28 gap-6 border-t border-dp-line py-12 md:grid-cols-12 md:gap-10 md:py-16">
            <Reveal className="md:col-span-4">
              <div className="md:sticky md:top-32">
                <h2 id={`${g.id}-heading`} className="text-[clamp(1.9rem,3.2vw,2.7rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
                  {g.title}
                </h2>
                <p className="mt-3 max-w-[30ch] leading-relaxed text-dp-muted">{g.blurb}</p>
              </div>
            </Reveal>
            <div className="md:col-span-8">
              <div className="border-t border-dp-ink/15 dark:border-white/15">
                {g.items.map((f) => (
                  <details key={f.id} id={f.id} className="group scroll-mt-28 border-b border-dp-ink/15 dark:border-white/15">
                    <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.15rem] font-semibold leading-snug tracking-[-0.02em] text-dp-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <Plus size={20} aria-hidden="true" className="shrink-0 text-dp-accent transition-transform duration-300 group-open:rotate-45" />
                    </summary>
                    <p className="max-w-[60ch] pb-6 leading-relaxed text-dp-muted">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ))}

        <div className="border-t border-dp-line pt-10">
        <p className="max-w-[60ch] leading-relaxed text-dp-muted">
          Comparing quotes?{" "}
          <Link href={COST_GUIDE.path} className="text-dp-accent underline decoration-dp-line underline-offset-4 hover:decoration-dp-accent">
            See what websites cost in South Africa
          </Link>
          . Or see the{" "}
          <Link href="/pricing" className="text-dp-accent underline decoration-dp-line underline-offset-4 hover:decoration-dp-accent">
            packages
          </Link>
          . Still wondering?{" "}
          <Link href="/contact" className="text-dp-accent underline decoration-dp-line underline-offset-4 hover:decoration-dp-accent">
            Ask us
          </Link>
          .
        </p>
        </div>
      </div>

      <FreeTaste testId="faq-mockup-offer" />
    </main>
  );
}
