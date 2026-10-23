import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { Reveal } from "../components/Reveal";
import { DeviceFrames } from "../components/DeviceFrames";
import { FreeTaste } from "../components/FreeTaste";
import { H1 } from "../lib/style";
import { OrderUp } from "../components/OrderUp";
import { Sticker, DAY, NIGHT } from "../components/Stickers";

const STACK_TAGS = ["React", "TypeScript", "Tailwind", "Netlify"];

const CASES = [
  {
    name: "Stuff'd Bagels",
    kind: "Food pop-up, Cape Town",
    url: "stuffdbagels.netlify.app",
    href: "https://stuffdbagels.netlify.app",
    testId: "link-stuffd-case-live",
    desktop: "/images/work/stuffd-desktop.webp",
    phone: "/images/work/stuffd-phone.webp",
    rows: [
      ["The problem", "Customers had to hunt for a WhatsApp number and scroll social media to place orders. No central hub, so sales slipped through the cracks."],
      ["What we cooked", "A single-page ordering site with the menu, this week's pop-up spots and one-tap WhatsApp ordering. Customers find what they need in seconds."],
    ],
    stack: STACK_TAGS,
  },
  {
    name: "Beginners Madrasah",
    kind: "Islamic learning for women and children",
    url: "beginnersmadrasah.co.za",
    href: "https://beginnersmadrasah.co.za/",
    testId: "link-madrasah-live",
    desktop: "/images/work/madrasah-desktop.webp",
    phone: "/images/work/madrasah-phone.webp",
    rows: [
      ["The brief", "A warm, safe-feeling home online for a beginner-friendly Islamic learning space, online and in person."],
      ["What we cooked", "Programmes, registration, testimonials and FAQs on one calm site that parents can use easily on a phone."],
    ],
    stack: STACK_TAGS,
  },
] as const;


export default function Portfolio() {
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[15%] -top-[30%] -z-10 h-[80vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,var(--dp-glow),transparent)] blur-2xl" />
        <Sticker day={DAY.star} night={NIGHT.moon} size={54} r={-10} d={0.3} style={{ left: "46%", top: "18%" }} />
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
            <dl className="dp-rise mt-10 grid max-w-[460px] grid-cols-3 overflow-hidden rounded-[18px] border border-dp-line bg-dp-surface text-center" style={{ "--d": "0.24s" } as CSSProperties}>
              {[
                ["Served", `${CASES.length} live sites`],
                ["Kitchen", "Cape Town"],
                ["Usual wait", "5 to 7 days"],
              ].map(([k, v], i) => (
                <div key={k} className={`px-3 py-4 ${i > 0 ? "border-l border-dashed border-dp-line" : ""}`}>
                  <dt className="font-mono text-[11px] text-dp-accent">{k}</dt>
                  <dd className="mt-1 text-[15px] font-semibold tracking-[-0.02em] text-dp-ink">{v}</dd>
                </div>
              ))}
            </dl>
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
            <article key={c.name} aria-labelledby={`case-${i}`} className="grid items-center gap-12 md:grid-cols-12 md:gap-12">
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
                <dl className="mt-8 flex flex-col gap-6">
                  {c.rows.map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-mono text-[12px] text-dp-accent">{k}</dt>
                      <dd className="mt-1.5 leading-relaxed text-dp-muted">{v}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-7 flex flex-wrap gap-2" aria-label="Built with">
                  {c.stack.map((t) => (
                    <li key={t} className="rounded-full border border-dp-line px-3 py-1 font-mono text-[12px] text-dp-muted" data-testid={i === 0 ? `tag-stack-${t.toLowerCase()}` : undefined}>
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={c.testId}
                  className="group mt-9 inline-flex items-center gap-1.5 text-[15px] font-medium text-dp-ink underline decoration-dp-line underline-offset-[6px] transition-colors hover:decoration-dp-accent"
                >
                  Visit the live site
                  <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Reveal>
            </article>
          );
        })}
      </div>


      <FreeTaste testId="portfolio-mockup-offer" />
    </main>
  );
}
