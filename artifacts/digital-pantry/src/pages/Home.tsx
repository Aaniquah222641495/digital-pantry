import type { CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "../components/MagneticButton";
import { Reveal } from "../components/Reveal";
import { DeviceFrames } from "../components/DeviceFrames";
import { CutoutWord } from "../components/CutoutWord";
import { Ticker } from "../components/Ticker";
import { PLAN_PRICES } from "../lib/plans";

// Imaan's pixel avatar is being made; until then her cards show a monogram.
const IMAAN_AVATAR: string | null = null;

const H2 = "text-[clamp(2.4rem,5.2vw,4.5rem)] font-semibold leading-[1] tracking-[-0.045em]";

const CHEFS = [
  {
    side: "Day",
    name: "Aaniquah Dicks",
    role: "Founder & Web Developer",
    bio: "Software engineer and the pink half. Taught herself to make websites look as good as they work, then built a studio to do it for small brands.",
    win: "Winner, GirlCode Pan-African Hackathon 2026, as team lead",
    pantry: [
      "Two-time hackathon winner",
      "1st, Vodacom Bursar Mini Hackathon 2025",
      "Advanced Diploma in ICT, cum laude (CPUT)",
      "Golden Key International Honour Society",
      "React, TypeScript, Java, SQL and AI tooling",
    ],
    light: true,
  },
  {
    side: "Night",
    name: "Imaan Cooper",
    role: "Co-founder & Web Developer",
    bio: "Creative director and the darker half. Turns a brief into a look, then works side by side with Aaniquah until it's live.",
    pantry: [
      "Former Head of Design, QuadCorp Digital",
      "Led creative direction on client websites and campaigns",
      "Design lead on a R30 000 e-commerce build",
      "Freelance designer and developer since 2023",
      "Bespoke sites for local and US clients",
      "Figma, Adobe Creative Suite, HTML and CSS",
    ],
    light: false,
  },
] as const;

const WORK = [
  {
    name: "Stuff'd Bagels",
    kind: "Food pop-up, Cape Town",
    url: "stuffdbagels.netlify.app",
    href: "https://stuffdbagels.netlify.app",
    desktop: "/images/work/stuffd-desktop.webp",
    phone: "/images/work/stuffd-phone.webp",
    lines: [
      ["Before", "Customers had to hunt for a WhatsApp number and scroll social media to place an order."],
      ["Now", "A single-page ordering site with the menu, this week's spots and one-tap WhatsApp ordering."],
    ],
  },
  {
    name: "Beginners Madrasah",
    kind: "Islamic learning for women and children",
    url: "beginnersmadrasah.co.za",
    href: "https://beginnersmadrasah.co.za/",
    desktop: "/images/work/madrasah-desktop.webp",
    phone: "/images/work/madrasah-phone.webp",
    lines: [
      ["Built", "A calm, welcoming home for programmes, registration, testimonials and FAQs."],
      ["For", "Parents and students who want clear answers on a phone, online or in person."],
    ],
  },
] as const;

const RECIPE = [
  { img: "/images/recipe.webp", title: "Read the recipe", body: "We start with your business, your customers and the way you already sell." },
  { img: "/images/contact.webp", title: "A free taste", body: "We design a first look at your site, so you see it before you decide." },
  { img: "/images/cooking.webp", title: "Cook from scratch", body: "Clean code, mobile first and fast. No templates, nothing you don't need." },
  { img: "/images/served.webp", title: "Served fresh", body: "Live on your own domain and ready for orders. Most sites take 5 to 7 business days." },
] as const;

const MENU = [
  { name: "Starter", price: PLAN_PRICES.Starter, img: "/images/starter.webp", note: "One page, a menu section and a WhatsApp button." },
  { name: "Standard", price: PLAN_PRICES.Standard, img: "/images/standard.webp", note: "Adds locations, an about section and your socials.", popular: true },
  { name: "Premium", price: PLAN_PRICES.Premium, img: "/images/premium.webp", note: "Adds your own domain, Google Business and basic SEO." },
  { name: "Pro", price: PLAN_PRICES.Pro, img: "/images/pro.webp", note: "Adds a lead form with instant alerts to your phone." },
] as const;

function Monogram({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Imaan Cooper"
      className={`grid place-items-center bg-[#0C0B0D] font-mono font-medium tracking-[-0.06em] text-[#FFA7D2] ${className}`}
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
      <div className="mx-auto grid min-h-[92dvh] max-w-[1320px] items-center gap-14 px-5 pb-14 pt-28 sm:px-8 md:grid-cols-[1.15fr_1fr] md:gap-10 md:pt-24">
        <div>
          <p className="dp-rise mb-6 inline-flex items-center gap-2 rounded-full border border-dp-line px-3.5 py-1.5 text-[13px] text-dp-muted" style={rise(0)}>
            <span aria-hidden="true" className="text-dp-accent">★</span> A women-led web studio in Cape Town
          </p>
          <h1 className="dp-rise text-[clamp(2.6rem,6.4vw,5.75rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-dp-ink" style={rise(0.06)}>
            Your website,
            <br />
            <span className="whitespace-nowrap">
              freshly <CutoutWord word="COOKED" /> <span aria-hidden="true" className="text-[0.8em]">★</span>
            </span>
          </h1>
          <p className="dp-rise mt-7 max-w-[38ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-dp-muted" style={rise(0.18)}>
            Made from scratch by Aaniquah and Imaan. No off-the-shelf ingredients. No boring templates.
          </p>
          <div className="dp-rise mt-10 flex flex-wrap items-center gap-3" style={rise(0.3)}>
            <MagneticButton href="/contact" data-testid="button-hero-cta">
              Let's Get Cooking
            </MagneticButton>
            <MagneticButton href="/portfolio" variant="ghost" data-testid="button-hero-portfolio">
              See Our Work
            </MagneticButton>
          </div>
        </div>

        {/* The two chefs, as a pair of stickers */}
        <div className="dp-rise relative mx-auto w-full max-w-[520px]" style={rise(0.2)}>
          <span aria-hidden="true" className="absolute -left-4 -top-6 text-4xl text-[#FFD43B]">★</span>
          <span aria-hidden="true" className="absolute -right-2 bottom-2 text-3xl text-dp-pink">✦</span>
          <div className="grid grid-cols-2 items-end gap-4 sm:gap-6">
            <figure className="rotate-[-3deg] rounded-[28px] border-[3px] border-white bg-[#FDD2DE] p-3 shadow-[0_30px_60px_-30px_rgba(179,47,104,0.5)] transition-transform duration-700 ease-out hover:rotate-0">
              <img
                src="/images/mascot.webp"
                alt="Aaniquah's pixel avatar coding at her desk"
                width={600}
                height={600}
                fetchPriority="high"
                className="aspect-square w-full rounded-[20px] bg-[#FFF7FA] object-contain"
              />
              <figcaption className="px-1 pb-1 pt-3 text-[13px] font-medium text-[#161214]">Aaniquah</figcaption>
            </figure>
            <figure className="translate-y-8 rotate-[3deg] rounded-[28px] border-[3px] border-[#2A262B] bg-[#141215] p-3 shadow-[0_30px_60px_-30px_rgba(12,11,13,0.75)] transition-transform duration-700 ease-out hover:rotate-0">
              {IMAAN_AVATAR ? (
                <img src={IMAAN_AVATAR} alt="Imaan's pixel avatar" className="aspect-square w-full rounded-[20px] object-contain" />
              ) : (
                <Monogram className="aspect-square w-full rounded-[20px] text-[clamp(2.5rem,6vw,4.5rem)]" />
              )}
              <figcaption className="px-1 pb-1 pt-3 text-[13px] font-medium text-[#F3EFF2]">Imaan</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chefs() {
  return (
    <section aria-labelledby="chefs-heading" className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:py-32">
      <Reveal>
        <h2 id="chefs-heading" className={H2}>
          Meet the <CutoutWord word="CHEFS" />
        </h2>
        <p className="mt-5 max-w-[54ch] text-lg leading-relaxed text-dp-muted">
          One of us codes in pink, the other in the dark. Same kitchen, same standards. Flip the switch at the top to see the studio through either of our eyes.
        </p>
      </Reveal>

      <div className="mt-14 grid overflow-hidden rounded-[32px] border border-dp-line md:grid-cols-2">
        {CHEFS.map((c, i) => {
          const t = c.light
            ? { bg: "bg-[#FCE8F0]", ink: "text-[#161214]", muted: "text-[#463E44]", label: "text-[#61575E]", accent: "text-[#B32F68]", chip: "border-[#161214]/12 bg-white/70", star: "text-[#E8508A]" }
            : { bg: "bg-[#0C0B0D]", ink: "text-[#F3EFF2]", muted: "text-[#C9C2C7]", label: "text-[#A49CA2]", accent: "text-[#FFA7D2]", chip: "border-white/10 bg-white/[0.04]", star: "text-[#FFA7D2]" };
          return (
            <Reveal as="article" key={c.name} delay={i * 0.1} className={`flex flex-col gap-10 p-8 sm:p-12 ${t.bg} ${t.ink}`}>
              <div className="flex items-start justify-between gap-6">
                <span className={`font-mono text-[12px] ${t.label}`}>{c.side}</span>
                {c.light ? (
                  <img src="/images/mascot.webp" alt="" width={600} height={600} loading="lazy" className="h-24 w-24 rounded-2xl bg-[#FFF7FA] object-contain" />
                ) : IMAAN_AVATAR ? (
                  <img src={IMAAN_AVATAR} alt="" loading="lazy" className="h-24 w-24 rounded-2xl object-contain" />
                ) : (
                  <Monogram className="h-24 w-24 rounded-2xl !bg-[#1B181C] text-3xl" />
                )}
              </div>
              <div>
                <h3 className="text-[clamp(1.9rem,3vw,2.6rem)] font-semibold tracking-[-0.04em]">{c.name}</h3>
                <p className={`mt-1 text-[15px] ${t.accent}`}>{c.role}</p>
                <p className={`mt-6 max-w-[44ch] leading-relaxed ${t.muted}`}>{c.bio}</p>
              </div>
              <div>
                {"win" in c && (
                  <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#FFD43B] px-4 py-2 text-[14px] font-semibold text-[#161214] shadow-[0_10px_24px_-12px_rgba(224,176,0,0.8)]">
                    <span aria-hidden="true">★</span> {c.win}
                  </p>
                )}
                <p className={`mb-3 font-mono text-[12px] ${t.label}`}>In the pantry</p>
                <ul className="flex flex-wrap gap-2">
                  {c.pantry.map((item) => (
                    <li key={item} className={`rounded-full border px-3.5 py-1.5 text-[13px] ${t.chip}`}>
                      <span aria-hidden="true" className={`mr-1.5 ${t.star}`}>★</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10">
        <p className="text-[clamp(1.25rem,2vw,1.6rem)] font-medium tracking-[-0.02em] text-dp-ink">
          Girl power is kind of the whole point here. <span className="text-dp-accent">★</span>
        </p>
      </Reveal>
    </section>
  );
}

function Work() {
  return (
    <section aria-labelledby="work-heading" className="border-t border-dp-line">
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="work-heading" className={H2}>
            Fresh out the <CutoutWord word="KITCHEN" />
          </h2>
          <Link href="/portfolio" className="group inline-flex items-center gap-1.5 text-[15px] text-dp-muted transition-colors hover:text-dp-ink">
            All our work
            <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <div className="mt-16 flex flex-col gap-28 md:gap-36">
          {WORK.map((w, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={w.name} className="grid items-center gap-12 md:grid-cols-12 md:gap-10">
                <Reveal className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                  <DeviceFrames desktop={w.desktop} phone={w.phone} alt={`The ${w.name} website`} url={w.url} flip={flip} />
                </Reveal>
                <Reveal delay={0.1} className={`md:col-span-5 ${flip ? "md:order-1 md:pr-6" : "md:pl-6"}`}>
                  <p className="text-[14px] text-dp-muted">{w.kind}</p>
                  <h3 className="mt-2 text-[clamp(1.9rem,3.2vw,2.75rem)] font-semibold tracking-[-0.04em]">
                    {w.name} <span aria-hidden="true" className="text-dp-accent">★</span>
                  </h3>
                  <dl className="mt-8 flex flex-col gap-5">
                    {w.lines.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[72px_1fr] gap-4">
                        <dt className="pt-0.5 font-mono text-[12px] text-dp-accent">{k}</dt>
                        <dd className="leading-relaxed text-dp-muted">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <a
                    href={w.href}
                    target="_blank"
                    rel="noopener noreferrer"
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
      </div>
    </section>
  );
}

function Recipe() {
  return (
    <section aria-labelledby="recipe-heading" className="border-t border-dp-line bg-dp-soft/50">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-24 sm:px-8 md:grid-cols-[1fr_1.3fr] md:py-32">
        <div className="md:sticky md:top-32 md:self-start">
          <Reveal>
            <h2 id="recipe-heading" className={H2}>
              The <CutoutWord word="RECIPE" />
            </h2>
            <p className="mt-5 max-w-[36ch] text-lg leading-relaxed text-dp-muted">Four steps, one kitchen, and you taste everything before it's served.</p>
          </Reveal>
        </div>
        <ol className="flex flex-col gap-5">
          {RECIPE.map((s, i) => (
            <li
              key={s.title}
              className="sticky grid grid-cols-[1fr_auto] items-center gap-6 rounded-[24px] border border-dp-line bg-dp-surface p-7 shadow-[0_24px_60px_-40px_rgba(12,11,13,0.5)] sm:p-9"
              style={{ top: `${112 + i * 18}px` }}
            >
              <div>
                <span className="font-mono text-[13px] text-dp-accent">Step {i + 1}</span>
                <h3 className="mt-4 text-[clamp(1.5rem,2.4vw,2rem)] font-semibold tracking-[-0.035em]">{s.title}</h3>
                <p className="mt-3 max-w-[40ch] leading-relaxed text-dp-muted">{s.body}</p>
              </div>
              <img src={s.img} alt="" width={240} height={240} loading="lazy" className="h-24 w-24 object-contain sm:h-32 sm:w-32" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Menu() {
  return (
    <section aria-labelledby="menu-heading" className="border-t border-dp-line">
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2 id="menu-heading" className={H2}>
              On the <CutoutWord word="MENU" />
            </h2>
            <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-dp-muted">Clear prices. No hidden fees. Built from scratch.</p>
          </div>
          <Link href="/pricing" className="group inline-flex items-center gap-1.5 text-[15px] text-dp-muted transition-colors hover:text-dp-ink" data-testid="button-pricing-preview-cta">
            See full packages
            <ArrowUpRight size={16} className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MENU.map((t, i) => {
            const popular = "popular" in t;
            return (
              <Reveal
                key={t.name}
                delay={i * 0.06}
                className={`relative flex flex-col rounded-[24px] border p-7 transition-transform duration-500 hover:-translate-y-1 ${
                  popular ? "border-transparent bg-dp-cta text-dp-cta-fg" : "border-dp-line bg-dp-surface"
                }`}
              >
                {popular && (
                  <span className="absolute -top-3 left-7 rounded-full bg-[#FFD43B] px-3 py-1 text-[12px] font-semibold text-[#161214]">Most popular ★</span>
                )}
                <img src={t.img} alt="" width={240} height={240} loading="lazy" className="h-20 w-20 object-contain" />
                <p className={`mt-6 text-[15px] ${popular ? "opacity-80" : "text-dp-muted"}`}>{t.name}</p>
                <p className="mt-1 text-[clamp(2.4rem,3.6vw,3rem)] font-semibold tracking-[-0.05em]">{t.price}</p>
                <p className={`mt-3 text-[15px] leading-relaxed ${popular ? "opacity-80" : "text-dp-muted"}`}>{t.note}</p>
              </Reveal>
            );
          })}
        </div>
        <p className="mt-6 text-[14px] text-dp-muted">Once-off prices in rand. Small edits after launch from R120 a month.</p>
      </div>
    </section>
  );
}

function FreeTaste() {
  return (
    <section aria-labelledby="taste-heading" className="px-5 pb-24 sm:px-8 md:pb-28" data-testid="home-mockup-offer">
      <Reveal className="relative mx-auto grid max-w-[1320px] items-center gap-10 overflow-hidden rounded-[36px] bg-[#FDD2DE] px-8 py-14 text-[#161214] sm:px-14 md:grid-cols-[1.4fr_1fr] md:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-1/2 -right-1/4 h-[140%] w-[70%] rounded-full bg-[radial-gradient(closest-side,#FFA7D2,transparent)]" />
        <div className="relative">
          <h2 id="taste-heading" className="text-[clamp(2.4rem,5.2vw,4.5rem)] font-semibold leading-[1] tracking-[-0.045em]">
            Get a free taste first. <span aria-hidden="true">★</span>
          </h2>
          <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-[#463E44]">
            Tell us about your business and we'll design a free mock-up of your site. You see it before you decide, with no obligation to go ahead.
          </p>
          <Link
            href="/contact?interest=mockup"
            data-testid="home-mockup-offer-cta"
            className="mt-10 inline-flex h-[52px] items-center gap-2 rounded-full bg-[#161214] px-7 text-[15px] font-medium text-[#FFF7FA] transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#161214]"
          >
            Get My Free Mock-up
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <img src="/images/work.webp" alt="" width={300} height={300} loading="lazy" className="relative mx-auto w-40 rotate-6 drop-shadow-[0_20px_30px_rgba(179,47,104,0.3)] md:w-56" />
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Chefs />
      <Work />
      <Recipe />
      <Menu />
      <FreeTaste />
    </main>
  );
}
