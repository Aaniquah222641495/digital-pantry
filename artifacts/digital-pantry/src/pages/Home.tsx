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
import { PLAN_PRICES } from "../lib/plans";
import { H2 } from "../lib/style";

// Imaan's pixel avatar is being made; until then her cards show a monogram.
const IMAAN_AVATAR: string | null = "/images/imaan.webp";


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
  { img: "/images/recipe.webp", title: "Read the recipe", body: "We learn your business, your customers and how you sell, then design a free first look." },
  { img: "/images/cooking.webp", title: "Cook from scratch", body: "Clean code, mobile first and fast. No templates, nothing you don't need." },
  { img: "/images/aaniquah.webp", title: "Served fresh", body: "Live on your own domain and ready for orders. Most sites take 5 to 7 business days." },
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
      <Sprinkles className="-z-10 opacity-70 dark:opacity-55" />
      <div className="mx-auto grid min-h-[92dvh] max-w-[1320px] items-center gap-14 px-5 pb-14 pt-28 sm:px-8 md:grid-cols-[1.15fr_1fr] md:gap-10 md:pt-24">
        <div>
          <p className="dp-rise dp-tag mb-6 inline-flex items-center gap-2 rounded-full border border-dp-line px-3.5 py-1.5 text-[13px] text-dp-muted" style={rise(0)}>
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
                src="/images/aaniquah.webp"
                alt="Aaniquah's pixel avatar coding at her desk"
                width={600}
                height={600}
                fetchPriority="high"
                className="aspect-square w-full rounded-[20px] bg-[#FFF7FA] object-contain"
              />
              <figcaption className="px-1 pb-1 pt-3 text-[13px] font-medium text-[#161214]">Aaniquah</figcaption>
            </figure>
            <figure className="translate-y-8 rotate-[3deg] rounded-[28px] border-[3px] border-[var(--im-border)] bg-[var(--im-surface)] p-3 shadow-[0_30px_60px_-30px_rgba(12,11,13,0.75)] transition-transform duration-700 ease-out hover:rotate-0">
              {IMAAN_AVATAR ? (
                <img src={IMAAN_AVATAR} alt="Imaan's pixel avatar designing at her desk" width={600} height={600} fetchPriority="high" className="aspect-square w-full rounded-[20px] bg-white object-contain" />
              ) : (
                <Monogram className="aspect-square w-full rounded-[20px] text-[clamp(2.5rem,6vw,4.5rem)]" />
              )}
              <figcaption className="px-1 pb-1 pt-3 text-[13px] font-medium text-[var(--im-text)]">Imaan</figcaption>
            </figure>
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

              <p className={`mt-8 max-w-[9ch] text-[clamp(2.6rem,5vw,4.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] ${t.accent}`}>{c.owns}.</p>
              {/* Pixel portrait, tucked into the top corner beside the headline */}
              <div className={`pointer-events-none absolute right-8 top-8 w-24 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5 sm:right-12 sm:top-12 sm:w-36 md:w-44 ${c.light ? "rotate-[-4deg] md:right-24 group-hover:rotate-0" : "rotate-[4deg] group-hover:rotate-0"}`}>
                {c.light ? (
                  <img src="/images/aaniquah.webp" alt="" width={600} height={600} loading="lazy" className="aspect-square w-full rounded-[22px] border-[3px] border-white bg-[#FFF7FA] object-contain shadow-[0_24px_50px_-24px_rgba(179,47,104,0.55)]" />
                ) : IMAAN_AVATAR ? (
                  <img src={IMAAN_AVATAR} alt="" width={600} height={600} loading="lazy" className="aspect-square w-full rounded-[22px] border-[3px] border-[var(--im-border)] object-contain" />
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
        <Reveal className="relative overflow-hidden rounded-[32px] bg-[#FDD2DE] p-8 text-[#161214] sm:p-10 md:col-span-4">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h3 className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1] tracking-[-0.04em]">You talk to the chefs.</h3>
              <p className="mt-4 max-w-[40ch] leading-relaxed text-[#463E44]">
                The two people on your calls are the two people making your site, from the first chat to launch day.
              </p>
            </div>
            <div aria-hidden="true" className="flex shrink-0 -space-x-4">
              <img src="/images/aaniquah.webp" alt="" width={600} height={600} loading="lazy" className="h-20 w-20 rotate-[-6deg] rounded-[20px] border-[3px] border-white bg-[#FFF7FA] object-contain" />
              {IMAAN_AVATAR ? (
                <img src={IMAAN_AVATAR} alt="" width={600} height={600} loading="lazy" className="h-20 w-20 rotate-[6deg] rounded-[20px] border-[3px] border-[var(--im-border)] object-contain" />
              ) : (
                <Monogram className="h-20 w-20 rotate-[6deg] rounded-[20px] border-[3px] border-[var(--im-border)] text-2xl" />
              )}
            </div>
          </div>
        </Reveal>

        {/* No handoffs: her design and her partner's code meet in the middle as the card scrolls in. */}
        <Reveal delay={0.08} className="dp-venn relative flex flex-col overflow-hidden rounded-[32px] bg-[var(--im-surface)] p-8 text-[var(--im-text)] sm:p-10 md:col-span-2">
          <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,var(--im-glow-strong),transparent)]" />
          <div aria-hidden="true" className="relative mx-auto flex h-36 w-full max-w-[260px] items-center justify-center">
            <span className="dp-venn-a absolute grid h-32 w-32 place-items-center rounded-full bg-[#FFA7D2] pr-8 text-[13px] font-semibold text-[#161214] mix-blend-screen">code</span>
            <span className="dp-venn-b absolute grid h-32 w-32 place-items-center rounded-full bg-[var(--im-deep)] pl-8 text-[13px] font-semibold text-[var(--im-text)] mix-blend-screen">design</span>
            <span className="dp-venn-star absolute z-10 grid h-9 w-9 place-items-center rounded-full bg-[#FFD43B] text-[15px] text-[#161214] shadow-[0_8px_20px_-6px_rgba(0,0,0,0.6)]">★</span>
          </div>
          <h3 className="mt-8 text-[clamp(1.5rem,2.2vw,1.9rem)] font-semibold leading-[1.05] tracking-[-0.035em]">No handoffs.</h3>
          <p className="mt-3 leading-relaxed text-[var(--im-muted)]">Design and code happen side by side, so nothing gets lost between how it looks and how it works.</p>
        </Reveal>

        <Reveal delay={0.12} className="relative overflow-hidden rounded-[32px] bg-[#FFD43B] p-8 text-[#161214] sm:p-12 md:col-span-6">
          <Sprinkles count={34} className="opacity-90" />
          <div className="relative grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
            <h3 className="text-[clamp(2.2rem,4.6vw,4rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
              Women-led. Made from <CutoutWord word="SCRATCH" tone="on-yellow" />
            </h3>
            <p className="max-w-[40ch] text-[17px] leading-relaxed text-[#3A3328]">
              Every site starts from your brand and your customers, never a template. Girl power is kind of the whole point here. ★
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
            <p className="mt-5 max-w-[36ch] text-lg leading-relaxed text-dp-muted">Three steps, one kitchen, and you taste everything before it's served.</p>
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

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Chefs />
      <Work />
      <Recipe />
      <Menu />
      <FreeTaste testId="home-mockup-offer" />
    </main>
  );
}
