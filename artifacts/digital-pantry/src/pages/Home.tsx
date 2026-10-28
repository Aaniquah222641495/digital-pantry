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

// Imaan's pixel avatar is being made; until then her cards show a monogram.
const IMAAN_AVATAR: string | null = "/images/imaan-cut.webp";


// Founders framed the way premium studios do it: two halves of one practice, what each
// one owns for the client, and a single proof point each (not a CV).
const CHEFS = [
  {
    side: "Day",
    name: "Aaniquah Dicks",
    role: "Founder, engineering",
    owns: "Owns the build",
    body: "Aaniquah turns the design into a fast, solid site and keeps it that way after launch. She writes every line of code, connects your domain and makes sure Google can find you.",
    proof: "Winner, GirlCode Pan-African Hackathon 2026",
    light: true,
  },
  {
    side: "Night",
    name: "Imaan Cooper",
    role: "Co-founder, creative direction",
    owns: "Owns the look",
    body: "Imaan turns your brief into a look that feels like your brand: layout, colour, type and the small details customers notice. She shapes how your site feels before a line of code is written.",
    proof: "Creative direction for local and international clients since 2023",
    light: false,
  },
] as const;


// Case studies (PRD 4.4, full version on Portfolio; Home shows the need and what we built): client and context, the business need, what we built, and the technical
// side next to the screenshots, with a live link. Every line checked against the live site and the
// project records on 2026-10-26. No results or testimonials we can't verify.
const WORK = [
  {
    name: "Stuff'd Bagels",
    kind: "Food pop-up, Cape Town",
    url: "stuffdbagels.netlify.app",
    href: "https://stuffdbagels.netlify.app",
    desktop: "/images/work/stuffd-desktop.webp",
    phone: "/images/work/stuffd-phone.webp",
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
  { img: "/images/art/aaniquah-serving.webp", imgNight: "/images/art/imaan-serving.webp", title: "Served fresh", body: "Live on your own domain and ready for orders. Sites take 5 to 7 business days.*" },
] as const;


function Monogram({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Imaan Cooper"
      className={`grid place-items-center bg-[var(--im-bg)] font-mono font-medium tracking-[-0.06em] text-[var(--im-accent)] ${className}`}
    >
      IC
    </div>
  );
}

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
            We design and build websites for small businesses, from scratch, so customers can find you, see what you offer and get in touch in one tap.
          </p>
          <div data-no-sprinkle className="dp-rise mt-10 flex flex-wrap items-center gap-3" style={rise(0.26)}>
            <MagneticButton href="/contact" data-testid="button-hero-cta">
              Get a quote
            </MagneticButton>
            <MagneticButton href="/portfolio" variant="ghost" data-testid="button-hero-portfolio">
              See our work
            </MagneticButton>
          </div>
        </div>

        {/* The kitchen, kept to one idea so the hero stays calm (founder 2026-10-26). Live work
            follows straight after in What we cook and Fresh out the kitchen. */}
        <div className="mx-auto w-full max-w-[720px]">
        <div className="relative">
          <div className="dp-rise relative" style={rise(0.18)}>
            <Sticker day={DAY.star} night={NIGHT.moon} size={58} r={-10} style={{ left: "-18px", top: "-26px" }} />
            <HeroScene />
          </div>


        </div>
        </div>
      </div>
    </section>
  );
}

// Rotating badge that sits on the seam between the two chefs (static for reduced motion).
function SeamBadge() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute bottom-14 left-1/2 z-20 hidden h-36 w-36 -translate-x-1/2 md:block">
      <div className="absolute inset-0 rounded-full bg-[#FFD43B] shadow-[0_20px_50px_-15px_rgba(12,11,13,0.55)]" />
      <svg viewBox="0 0 144 144" className="dp-spin absolute inset-0 h-full w-full">
        <defs>
          <path id="seam-circle" d="M72,72 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0" />
        </defs>
        <text className="dp-cut-bebas" fontSize="17" letterSpacing="2.6" fill="#161214">
          <textPath href="#seam-circle">TWO CHEFS ★ ONE KITCHEN ★ TWO CHEFS ★ ONE KITCHEN ★</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 grid place-items-center text-3xl text-[#161214]">★</span>
    </div>
  );
}

function Chefs() {
  const contact = useSideContact();
  return (
    <section aria-labelledby="chefs-heading" className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:py-32">
      <Reveal className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <h2 id="chefs-heading" className={H2}>
            Meet the <CutoutWord word="CHEFS" />
          </h2>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-dp-muted">
            One of us codes in pink, the other designs in the dark, and you work with both of us directly.
          </p>
        </div>
        <p className="text-[14px] text-dp-muted">Flip the switch at the top to see the studio through either of our eyes.</p>
      </Reveal>

      {/* The two halves. On desktop the half you hover gently takes more of the counter. */}
      <div className="relative mt-14 flex flex-col overflow-hidden rounded-[36px] md:h-[620px] md:flex-row">
        {CHEFS.map((c, i) => {
          const t = c.light
            ? { bg: "bg-[#FCE8F0]", ink: "text-[#161214]", muted: "text-[#463E44]", label: "border-[#161214]/15 text-[#463E44]", accent: "text-[#B32F68]", glow: "bg-[radial-gradient(closest-side,#FFA7D2,transparent)]" }
            : { bg: "bg-[var(--im-bg)]", ink: "text-[var(--im-text)]", muted: "text-[var(--im-muted)]", label: "border-white/15 text-[var(--im-muted)]", accent: "text-[var(--im-accent)]", glow: "bg-[radial-gradient(closest-side,var(--im-glow),transparent)]" };
          return (
            <Reveal
              as="article"
              key={c.name}
              delay={i * 0.1}
              className={`group relative isolate flex min-h-[560px] flex-1 flex-col overflow-hidden p-8 transition-[flex-grow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-12 md:hover:flex-[1.22] ${c.light ? "md:pr-24" : "md:pl-24"} ${t.bg} ${t.ink}`}
            >
              <div aria-hidden="true" className={`absolute -bottom-1/4 ${c.light ? "-right-1/4" : "-left-1/4"} -z-10 h-[90%] w-[90%] rounded-full ${t.glow}`} />
              <span className={`inline-flex w-fit items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] ${t.label} ${c.light ? "" : "lowercase tracking-[0.32em]"}`}>
                <span aria-hidden="true">{c.light ? "☀" : "☾"}</span> {c.side}
              </span>

              <p className={`mt-8 max-w-[9ch] pr-28 text-[clamp(2.6rem,5vw,4.5rem)] sm:pr-0 sm:max-w-[calc(100%-10rem)] md:max-w-[calc(100%-12rem)] font-semibold leading-[0.95] tracking-[-0.05em] ${t.accent}`}>{c.owns}.</p>
              {/* Pixel portrait, tucked into the top corner beside the headline */}
              <div className={`pointer-events-none absolute right-8 top-8 w-24 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 sm:right-12 sm:top-12 sm:w-36 md:w-44 ${c.light ? "rotate-[-4deg] md:right-24 group-hover:rotate-0" : "rotate-[4deg] group-hover:rotate-0"}`}>
                {c.light ? (
                  <img src="/images/aaniquah.webp" alt="" width={600} height={600} loading="lazy" className="aspect-square w-full rounded-[22px] border-[3px] border-white bg-[#FFF7FA] object-contain shadow-[0_24px_50px_-24px_rgba(179,47,104,0.55)]" />
                ) : IMAAN_AVATAR ? (
                  <img src={IMAAN_AVATAR} alt="" width={600} height={600} loading="lazy" className="aspect-square w-full rounded-[22px] border-[3px] border-[var(--im-border)] bg-[var(--im-soft)] object-contain" />
                ) : (
                  <Monogram className="aspect-square w-full rounded-[22px] border-[3px] border-[var(--im-border)] !bg-[var(--im-soft)] text-[clamp(1.8rem,3.4vw,3rem)]" />
                )}
              </div>

              <div className="relative z-10 mt-auto pt-10">
                <div className="min-w-0 flex-1">
                  <h3 className="text-[1.5rem] font-semibold tracking-[-0.03em]">{c.name}</h3>
                  <p className={`text-[14px] ${c.light ? "text-[#61575E]" : "text-[var(--im-label)]"}`}>{c.role}</p>
                  <p className={`mt-4 max-w-[40ch] leading-relaxed ${t.muted}`}>{c.body}</p>
                  <p
                    className={`mt-7 inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-[13px] font-medium ${
                      c.light ? "bg-[#FFD43B] text-[#161214] shadow-[0_10px_24px_-12px_rgba(224,176,0,0.8)]" : "border border-white/15 bg-white/[0.04] text-[var(--im-text)]"
                    }`}
                  >
                    <span aria-hidden="true" className={c.light ? "" : "text-[var(--im-accent)]"}>★</span> {c.proof}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
        <SeamBadge />
      </div>

      {/* Promises as colour blocks: blush, ink, butter. */}
      <div className="mt-5 grid gap-5 md:grid-cols-6">
        {/* You talk to the chefs: an illustrative chat thread (not a real client conversation). */}
        <Reveal className="dp-chat relative grid gap-8 overflow-hidden rounded-[32px] bg-[#FDD2DE] p-8 text-[#161214] sm:p-10 md:col-span-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,#FFA7D2,transparent)]" />
          <div className="relative">
            <h3 className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1] tracking-[-0.04em]">You talk to the chefs.</h3>
            <p className="mt-4 max-w-[34ch] leading-relaxed text-[#463E44]">
              The two people on your calls are the two people making your site, from the first chat to launch day.
            </p>
            <a
              href={contact.waLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { surface: "home_chefs" })}
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-full bg-[#161214] px-5 text-[14px] font-medium text-[#FFF7FA] transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#161214]"
            >
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#25D366]" /> WhatsApp {contact.name}
            </a>
          </div>

          <ol aria-label="Example of how a chat with us goes" className="relative flex flex-col gap-3 rounded-[24px] bg-white/70 p-4 shadow-[0_24px_50px_-30px_rgba(179,47,104,0.6)] backdrop-blur sm:p-5">
            <li className="dp-chat-msg flex justify-end" style={{ "--i": 0 } as CSSProperties}>
              <p className="max-w-[80%] rounded-[18px] rounded-br-md bg-[#161214] px-4 py-2.5 text-[14px] leading-snug text-[#FFF7FA]">
                Hi! Can you help with a website for my bakery?
              </p>
            </li>
            <li className="dp-chat-msg flex items-end gap-2.5" style={{ "--i": 1 } as CSSProperties}>
              <img src="/images/aaniquah.webp" alt="" width={600} height={600} loading="lazy" className="h-9 w-9 shrink-0 rounded-full border-2 border-white bg-[#FFF7FA] object-cover" />
              <p className="max-w-[78%] rounded-[18px] rounded-bl-md bg-[#FFA7D2] px-4 py-2.5 text-[14px] leading-snug">
                <span className="block text-[11px] font-semibold text-[#7A1F45]">Aaniquah</span>
                Yes! Tell us how you take orders and I'll handle the build.
              </p>
            </li>
            <li className="dp-chat-msg flex items-end gap-2.5" style={{ "--i": 2 } as CSSProperties}>
              <img src={IMAAN_AVATAR ?? "/images/imaan-cut.webp"} alt="" width={600} height={600} loading="lazy" className="h-9 w-9 shrink-0 rounded-full border-2 border-[var(--im-border)] bg-[var(--im-soft)] object-cover" />
              <p className="max-w-[78%] rounded-[18px] rounded-bl-md bg-[var(--im-surface)] px-4 py-2.5 text-[14px] leading-snug text-[var(--im-text)]">
                <span className="block text-[11px] font-semibold text-[var(--im-accent)]">Imaan</span>
                And I'll make it look as good as your cakes.
              </p>
            </li>
            <li className="dp-chat-msg flex items-center gap-1.5 pl-12 text-[#61575E]" style={{ "--i": 3 } as CSSProperties} aria-label="typing">
              <span className="dp-typing h-1.5 w-1.5 rounded-full bg-current" />
              <span className="dp-typing h-1.5 w-1.5 rounded-full bg-current [animation-delay:0.15s]" />
              <span className="dp-typing h-1.5 w-1.5 rounded-full bg-current [animation-delay:0.3s]" />
            </li>
          </ol>
        </Reveal>

        <Reveal delay={0.12} className="relative overflow-hidden rounded-[32px] bg-[#FFD43B] p-8 text-[#161214] sm:p-12 md:col-span-6 dark:bg-[#2A2008] dark:text-[var(--im-text)] dark:ring-1 dark:ring-[rgba(255,212,59,0.3)]">
          {/* Night: a deep gold-brown band with a warm glow, so yellow stays an accent and not a floodlight. */}
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 hidden h-72 w-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,212,59,0.28),transparent)] dark:block" />
          <Sprinkles count={20} className="opacity-90 dark:opacity-70" />
          <div className="relative grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
            <h3 data-no-sprinkle className="text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
              Women-led. Made from <CutoutWord word="SCRATCH" tone="on-yellow" />
            </h3>
            <p data-no-sprinkle className="max-w-[40ch] text-[17px] leading-relaxed text-[#3A3328] dark:text-[var(--im-muted)]">
              Every site starts from your brand and your customers, never a template. Girl power is kind of the whole point here. <span aria-hidden="true" className="dark:text-[#FFD43B]">★</span>
            </p>
          </div>
        </Reveal>
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
                  <DeviceFrames desktop={w.desktop} phone={w.phone} alt={`The ${w.name} website`} url={w.url} flip={flip} />
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
                    Visit the live site
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
          <Link href="/pricing" className="text-dp-accent underline decoration-dp-line underline-offset-4 hover:decoration-dp-accent">Full terms on Pricing</Link>.
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
      <Chefs />
      <FreeTaste testId="home-mockup-offer" />
    </main>
  );
}
