import { useRef, type CSSProperties, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { Reveal } from "../components/Reveal";
import { DeviceFrames } from "../components/DeviceFrames";
import { FreeTaste } from "../components/FreeTaste";
import { H1 } from "../lib/style";
import { TURNAROUND_NOTE } from "../lib/plans";
import { OrderUp } from "../components/OrderUp";
import { Sticker, DAY, NIGHT } from "../components/Stickers";
import { useTrackOnView, type EventProps } from "../lib/analytics";


// Case studies (PRD 4.4): client, need, what we built and the technical side, checked against the
// live sites and project records on 2026-10-26. Home shows the short version.
const CASES = [
  {
    name: "Stuff'd Bagels",
    caseKey: "stuffd_bagels",
    kind: "Food pop-up, Cape Town",
    url: "stuffdbagels.netlify.app",
    href: "https://stuffdbagels.netlify.app",
    testId: "link-stuffd-case-live",
    desktop: "/images/work/stuffd-desktop.webp",
    phone: "/images/work/stuffd-phone.webp",
    rows: [
      ["The client", "A stuffed-bagel pop-up selling at markets and events across Cape Town."],
      ["The need", "Customers had to hunt for a WhatsApp number and scroll social media to place an order."],
      ["What we built", "One mobile-first page with the menu, this week's pickup spots and an order form."],
      ["Under the hood", "The form writes the order, pickup spot and total into a WhatsApp message, so it arrives ready to confirm."],
    ],
  },
  {
    name: "Beginners Madrasah",
    caseKey: "beginners_madrasah",
    kind: "Islamic learning for women and children",
    url: "beginnersmadrasah.co.za",
    href: "https://beginnersmadrasah.co.za/",
    testId: "link-madrasah-live",
    desktop: "/images/work/madrasah-desktop.webp",
    phone: "/images/work/madrasah-phone.webp",
    rows: [
      ["The client", "Beginner-friendly Islamic classes for women and children, online and in person."],
      ["The need", "Parents and students needed one clear place for programmes, registration and answers, easy to read on a phone."],
      ["What we built", "A 12-page site on their own domain: a page for every programme, registration, testimonials and FAQs."],
      ["Under the hood", "Every page is pre-built for speed, with structured data for Google and AI search and strict security headers."],
    ],
  },
] as const;

function CaseArticle({ caseKey, i, children }: { caseKey: NonNullable<EventProps["case"]>; i: number; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useTrackOnView(ref, "portfolio_case_study_view", { case: caseKey });
  return (
    <article ref={ref} aria-labelledby={`case-${i}`} className="grid items-center gap-12 md:grid-cols-12 md:gap-12">
      {children}
    </article>
  );
}

export default function Portfolio() {
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[15%] -top-[30%] -z-10 h-[80vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,var(--dp-glow),transparent)] blur-2xl" />
        <Sticker day={DAY.star} night={NIGHT.moon} size={54} r={-10} d={0.3} className="max-md:hidden" style={{ left: "46%", top: "18%" }} />
        <div className="mx-auto grid min-h-[86dvh] max-w-[1320px] items-center gap-12 px-5 pb-10 pt-32 sm:px-8 md:grid-cols-[0.85fr_1.15fr] md:pt-28">
          <div>
            <h1 className={`dp-rise ${H1}`}>
              <span className="sr-only">Websites built in Cape Town: </span>
              Fresh out the <CutoutWord word="KITCHEN" />
            </h1>
            <p className="dp-rise mt-6 max-w-[38ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-dp-muted" style={{ "--d": "0.12s" } as CSSProperties}>
              Websites built in Cape Town, from scratch. Here's what we've been cooking. <span aria-hidden="true" className="text-dp-accent">★</span>
            </p>
            {/* Order ticket strip: facts only */}
            <dl className="dp-rise mt-10 grid max-w-[460px] grid-cols-2 overflow-hidden rounded-[18px] border border-dp-line bg-dp-surface text-center" style={{ "--d": "0.24s" } as CSSProperties}>
              {[
                ["Kitchen", "Cape Town"],
                ["Turnaround", "5 to 7 business days*"],
              ].map(([k, v], i) => (
                <div key={k} className={`px-3 py-4 ${i > 0 ? "border-l border-dashed border-dp-line" : ""}`}>
                  <dt className="font-mono text-[11px] text-dp-accent">{k}</dt>
                  <dd className="mt-1 text-[15px] font-semibold tracking-[-0.02em] text-dp-ink">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="dp-rise mt-3 max-w-[460px] text-[13px] leading-relaxed text-dp-muted" style={{ "--d": "0.3s" } as CSSProperties}>
              * {TURNAROUND_NOTE}{" "}
              <Link href="/pricing" className="text-dp-accent underline decoration-dp-line underline-offset-4 hover:decoration-dp-accent">Full terms on Pricing</Link>.
            </p>
          </div>
          <div className="dp-rise pt-16 md:pt-24" style={{ "--d": "0.15s" } as CSSProperties}>
            <OrderUp />
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-[1320px] flex-col gap-28 px-5 py-20 sm:px-8 md:gap-40 md:py-28">
        {CASES.map((c, i) => {
          const flip = i % 2 === 1;
          return (
            <CaseArticle key={c.name} caseKey={c.caseKey} i={i}>
              <Reveal className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                <DeviceFrames desktop={c.desktop} phone={c.phone} alt={`The ${c.name} website`} url={c.url} flip={flip} />
              </Reveal>
              <Reveal delay={0.1} className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                <p className="flex items-center gap-2 text-[14px] text-dp-muted">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-dp-line px-2.5 py-0.5 text-[12px] font-medium text-dp-ink">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#2FB36A] shadow-[0_0_8px_#2FB36A]" />
                    Live
                  </span>
                  {c.kind}
                </p>
                <h2 id={`case-${i}`} className="mt-3 text-[clamp(2rem,3.4vw,3rem)] font-semibold tracking-[-0.04em]">
                  {c.name} <span aria-hidden="true" className="text-dp-accent">★</span>
                </h2>
                <dl className="mt-8 flex flex-col gap-5">
                  {c.rows.map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-mono text-[12px] text-dp-accent">{k}</dt>
                      <dd className="mt-1.5 leading-relaxed text-dp-muted">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={c.testId}
                  className="group mt-7 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-medium text-dp-ink underline decoration-dp-line underline-offset-[6px] transition-colors hover:decoration-dp-accent"
                >
                  Visit the live site
                  <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Reveal>
            </CaseArticle>
          );
        })}
      </div>


      <FreeTaste testId="portfolio-mockup-offer" />
    </main>
  );
}
