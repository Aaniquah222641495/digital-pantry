import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { Reveal } from "../components/Reveal";
import { DeviceFrames } from "../components/DeviceFrames";
import { FreeTaste } from "../components/FreeTaste";
import { H1, H2 } from "../lib/style";

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

const ON_THE_STOVE = [
  { name: "Snaccidents ZA", category: "Food & snacks" },
  { name: "Sweet Sisters CPT", category: "Bakery" },
  { name: "Kremco CPT", category: "Food & beverage" },
];

export default function Portfolio() {
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[15%] -top-[30%] -z-10 h-[80vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,var(--dp-glow),transparent)] blur-2xl" />
        <div className="mx-auto max-w-[1320px] px-5 pb-6 pt-36 sm:px-8 md:pt-40">
          <h1 className={`dp-rise ${H1}`}>
            <span className="sr-only">Websites built in Cape Town: </span>
            Fresh out the <CutoutWord word="KITCHEN" />
          </h1>
          <p className="dp-rise mt-6 max-w-[42ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-dp-muted" style={{ "--d": "0.12s" } as CSSProperties}>
            Websites built in Cape Town, from scratch. Here's what we've been cooking. <span aria-hidden="true" className="text-dp-accent">★</span>
          </p>
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
                  <span className="rounded-full bg-[#2FB36A]/15 px-2.5 py-0.5 text-[12px] font-medium text-[#1F8A50] dark:text-[#5BD38E]">Live</span>
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

      <section aria-labelledby="stove-heading" className="border-t border-dp-line">
        <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-24 sm:px-8 md:grid-cols-[1fr_1.4fr] md:py-32">
          <Reveal>
            <h2 id="stove-heading" className={H2}>
              On the <CutoutWord word="STOVE" />
            </h2>
            <p className="mt-5 max-w-[36ch] text-lg leading-relaxed text-dp-muted">Still simmering. These sites are on their way.</p>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-3">
            {ON_THE_STOVE.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 0.07} className="flex flex-col justify-between gap-10 rounded-[24px] border border-dp-line bg-dp-surface p-6">
                <span className="w-fit rounded-full bg-dp-soft px-2.5 py-0.5 text-[12px] text-dp-muted">Coming soon</span>
                <div>
                  <p className="text-[1.25rem] font-semibold tracking-[-0.03em]">{s.name}</p>
                  <p className="mt-1 text-[14px] text-dp-muted">{s.category}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <FreeTaste testId="portfolio-mockup-offer" />
    </main>
  );
}
