import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";
import { Reveal } from "../components/Reveal";
import { DeviceFrames } from "../components/DeviceFrames";
import { CutoutWord } from "../components/CutoutWord";
import { Ticker } from "../components/Ticker";
import { FreeTaste } from "../components/FreeTaste";
import { Sprinkles } from "../components/Sprinkles";
import { HeroScene } from "../components/HeroScene";
import { Sticker, DAY, NIGHT } from "../components/Stickers";
import { H2 } from "../lib/style";
import { useSideContact } from "../lib/contact";
import { track } from "../lib/analytics";
import { TURNAROUND_NOTE } from "../lib/plans";
import { WhatWeCook } from "../components/WhatWeCook";
import { HeroTickets } from "../components/OfferArt";

// Case studies (PRD 4.4, full version on Portfolio; Home shows the need and what we built): client and context, the business need, what we built, and the technical
// side next to the screenshots, with a live link. Every line checked against the live site and the
// project records on 2026-10-26. No results or testimonials we can't verify.
const WORK = [
  {
    name: "Stuff'd Bagels",
    kind: "Food pop-up, Cape Town",
    url: "stuffdbagels.netlify.app",
    // Our copy of the final, client-approved version, until stuffdbagels.co.za exists (founder 2026-10-28; public/work/).
    href: "/work/stuffd-bagels/",
    desktop: "/images/work/stuffd-desktop-v2.webp",
    phone: "/images/work/stuffd-phone-v2.webp",
    facts: [
      ["The client", "A stuffed-bagel pop-up selling at markets and events across Cape Town."],
      ["The need", "Customers had to hunt for a WhatsApp number and scroll social media to place an order."],
      ["What we built", "One mobile-first page with the menu, this week's pickup spots and an order form."],
      ["Under the hood", "The form writes the order, pickup spot and total into a WhatsApp message, so it arrives ready to confirm."],
    ],
  },
  {
    name: "Beginners Madrasah",
    kind: "Islamic learning for women and children",
    url: "beginnersmadrasah.co.za",
    href: "https://beginnersmadrasah.co.za/",
    desktop: "/images/work/madrasah-desktop.webp",
    phone: "/images/work/madrasah-phone.webp",
    facts: [
      ["The client", "Beginner-friendly Islamic classes for women and children, online and in person."],
      ["The need", "Parents and students needed one clear place for programmes, registration and answers, easy to read on a phone."],
      ["What we built", "A 12-page site on their own domain: a page for every programme, registration, testimonials and FAQs."],
      ["Under the hood", "Every page is pre-built for speed, with structured data for Google and AI search and strict security headers."],
    ],
  },
] as const;

// Each step shows Aaniquah's chef on Day and Imaan's on Night.
const RECIPE = [
  { img: "/images/art/aaniquah-reading.webp", imgNight: "/images/art/imaan-reading.webp", title: "Read the recipe", body: "We learn your business, your customers and how you sell, then send one free mock-up pack within 5 business days of your brief, for qualified enquiries." },
  { img: "/images/art/aaniquah-chef.webp", imgNight: "/images/art/imaan-chef.webp", title: "Cook from scratch", body: "Clean code, mobile first and fast. No templates, nothing you don't need." },
  { img: "/images/art/aaniquah-serving.webp", imgNight: "/images/art/imaan-serving.webp", title: "Served fresh", body: "Live on your own domain and ready for orders. Sites take from 5 business days.*" },
] as const;


function Hero() {
  const rise = (d: number) => ({ "--d": `${d}s` }) as CSSProperties;
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[20%] -top-[30%] -z-10 h-[90vh] w-[70vw] rounded-full bg-[radial-gradient(closest-side,var(--dp-glow),transparent)] blur-2xl"
      />
      <Sprinkles count={14} className="-z-10 opacity-60 dark:opacity-45" />
      <div className="mx-auto grid min-h-[94dvh] max-w-[1320px] items-center gap-16 px-5 pb-24 pt-32 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12 lg:pb-20 lg:pt-28">
        <div className="relative">
          {/* Sprinkles shower onto the headline once on load */}
          <Sprinkles mode="burst" count={30} className="-inset-x-6 -top-10 bottom-1/3 !h-auto" />
          <h1 data-no-sprinkle className="dp-rise text-[clamp(3rem,6.6vw,6.25rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-dp-ink" style={rise(0)}>
            Your website,
            <br />
            <span className="whitespace-nowrap">
              freshly <CutoutWord word="COOKED" />
            </span>
          </h1>
          <p data-no-sprinkle className="dp-rise mt-8 max-w-[38ch] text-[clamp(1.15rem,1.7vw,1.4rem)] leading-[1.45] tracking-[-0.01em] text-dp-ink/80" style={rise(0.14)}>
            We design, build and look after websites for small businesses in Cape Town: one-page sites, online shops, Google setup, and lead systems that save and answer every enquiry for you.
          </p>
          <div data-no-sprinkle className="dp-rise mt-10 flex flex-wrap items-center gap-3" style={rise(0.26)}>
            <MagneticButton href="/contact" data-testid="button-hero-cta">
              Get a quote
            </MagneticButton>
            <MagneticButton href="/portfolio" variant="ghost" data-testid="button-hero-portfolio">
              See our work
            </MagneticButton>
          </div>
          <p data-no-sprinkle className="dp-rise mt-6 text-[15px] text-dp-muted" style={rise(0.32)}>
            Not sure yet?{" "}
            <Link href="/contact?interest=mockup" data-testid="link-hero-mockup" className="font-medium text-dp-ink underline decoration-dp-line underline-offset-4 transition-colors hover:decoration-dp-accent">
              Get a free mock-up first
            </Link>
            .
          </p>
        </div>

        {/* The kitchen, kept to one idea so the hero stays calm (founder 2026-10-26). Live work
            follows straight after in What we cook and Fresh out the kitchen. */}
        <div className="mx-auto w-full max-w-[720px]">
        <div className="relative">
          <div className="dp-rise relative" style={rise(0.18)}>
            <Sticker day={DAY.star} night={NIGHT.moon} size={58} r={-10} style={{ left: "-18px", top: "-26px" }} />
            <HeroScene />
          </div>
          <HeroTickets />


        </div>
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section aria-labelledby="work-heading" className="border-t border-dp-line">
      <div className="mx-auto max-w-[1320px] px-5 pb-16 pt-20 sm:px-8 md:pb-20 md:pt-24">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="work-heading" className={H2}>
            Fresh out the <CutoutWord word="KITCHEN" />
          </h2>
          <Link href="/portfolio" className="group inline-flex min-h-11 items-center gap-1.5 text-[15px] text-dp-muted transition-colors hover:text-dp-ink">
            All our work
            <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <div className="mt-14 flex flex-col gap-24 md:mt-16 md:gap-28">
          {WORK.map((w, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={w.name} aria-labelledby={`work-${i}`} className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
                <Reveal className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                  <DeviceFrames desktop={w.desktop} phone={w.phone} alt={`The ${w.name} website`} url={w.url} href={w.href} flip={flip} />
                </Reveal>
                <Reveal delay={0.1} className={`md:col-span-5 ${flip ? "md:order-1 md:pr-6" : "md:pl-6"}`}>
                  <p className="text-[14px] text-dp-muted">
                    <span className="tabular-nums text-dp-accent">0{i + 1}</span>
                    <span className="mx-2 text-dp-line" aria-hidden="true">/</span>
                    {w.kind}
                  </p>
                  <h3 id={`work-${i}`} className="mt-2 text-[clamp(1.9rem,3.2vw,2.75rem)] font-semibold tracking-[-0.04em]">
                    {w.name}
                  </h3>
                  <dl className="mt-7 flex flex-col gap-4">
                    {w.facts.filter(([k]) => k === "The need" || k === "What we built").map(([k, v]) => (
                      <div key={k} className="grid gap-1 sm:grid-cols-[116px_1fr] sm:gap-4">
                        <dt className="pt-0.5 text-[13px] font-semibold text-dp-accent">{k}</dt>
                        <dd className="text-[15px] leading-relaxed text-dp-muted">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-dp-cta px-5 text-[15px] font-medium text-dp-cta-fg transition-transform duration-500 hover:-translate-y-0.5"
                  >
                    {w.href.startsWith("/work/") ? "See the site" : "Visit the live site"}
                    <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <Link href="/portfolio" className="ml-5 inline-flex min-h-11 items-center text-[15px] font-medium text-dp-ink underline decoration-dp-line underline-offset-[6px] hover:decoration-dp-accent">
                    Full case study
                  </Link>
                </Reveal>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Recipe() {
  const [first, ...rest] = RECIPE;
  const Art = ({ s, cls }: { s: (typeof RECIPE)[number]; cls: string }) => (
    <div aria-hidden="true" className={`dp-stage ${cls}`}>
      <img src={s.img} alt="" width={600} height={600} loading="lazy" className="w-full object-contain dark:hidden" />
      <img src={s.imgNight} alt="" width={600} height={600} loading="lazy" className="hidden w-full object-contain dark:block" />
    </div>
  );
  return (
    <section aria-labelledby="recipe-heading" className="relative border-t border-dp-line bg-dp-soft/50">
      <div className="mx-auto max-w-[1320px] px-5 pb-20 pt-16 sm:px-8 md:pb-24 md:pt-20">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="recipe-heading" className={H2}>
            The <CutoutWord word="RECIPE" />
          </h2>
          <p className="max-w-[36ch] text-lg leading-relaxed text-dp-muted">Three steps, one kitchen, and you taste everything before it's served.</p>
        </Reveal>

        {/* Bento: step 1 tall on the left, steps 2 and 3 stacked on the right */}
        <ol className="mt-14 grid gap-5 md:grid-cols-[1.1fr_1fr] md:grid-rows-2">
          <Reveal as="li" early className="relative flex flex-col overflow-hidden rounded-[32px] border border-dp-line bg-dp-surface p-8 sm:p-10 md:row-span-2">
            <span className="font-mono text-[13px] text-dp-accent">Step 1</span>
            <h3 className="mt-3 text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.04em]">{first.title}</h3>
            <p className="mt-3 max-w-[42ch] leading-relaxed text-dp-muted">{first.body}</p>
            <Art s={first} cls="mx-auto mt-auto w-[min(100%,380px)] pt-8" />
          </Reveal>
          {rest.map((s, i) => (
            <Reveal as="li" key={s.title} delay={0.08 * (i + 1)} className="relative grid items-center gap-4 overflow-hidden rounded-[32px] border border-dp-line bg-dp-surface p-8 sm:grid-cols-[1fr_auto] sm:p-10">
              <div>
                <span className="font-mono text-[13px] text-dp-accent">Step {i + 2}</span>
                <h3 className="mt-3 text-[clamp(1.6rem,2.4vw,2.1rem)] font-semibold tracking-[-0.035em]">{s.title}</h3>
                <p className="mt-3 max-w-[36ch] leading-relaxed text-dp-muted">{s.body}</p>
              </div>
              <Art s={s} cls="mx-auto w-44 sm:w-48 md:w-52" />
            </Reveal>
          ))}
        </ol>
        <p className="mt-6 max-w-[70ch] text-[13px] leading-relaxed text-dp-muted">
          * {TURNAROUND_NOTE}{" "}
          <Link href="/pricing#turnaround" className="text-dp-accent underline decoration-dp-line underline-offset-4 hover:decoration-dp-accent">Full terms on Pricing</Link>.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <WhatWeCook />
      <Work />
      <Recipe />
      <FreeTaste testId="home-mockup-offer" />
    </main>
  );
}
