import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { CutoutWord } from "./CutoutWord";
import { Reveal } from "./Reveal";
import { H2 } from "../lib/style";
import { INTL_PRICES, LARGER_FROM, PLAN_PRICES } from "../lib/plans";

// The studio's full range, straight after the hero (PRD 1, 4.2, 4.8): small-business sites are one
// offer, not the whole studio. A menu board of mixed sizes, each offer with its own look, so it
// reads as a range rather than a list (founder 2026-10-26: "can look better"). Only offers the
// site already makes.
type Offer = {
  title: string;
  body: string;
  price: string;
  href: string;
  span: string;
  tone: "pink" | "ink" | "plain" | "soft";
  art?: { src: string; w: number; h: number; cls: string };
  big?: string;
};

const OFFERS: Offer[] = [
  {
    title: "Small business websites",
    body: "From one page with a WhatsApp button to a site that catches every lead. Fixed packages, clear prices.",
    price: `From ${PLAN_PRICES.Starter}`,
    href: "/pricing",
    span: "lg:col-span-7",
    tone: "pink",
    art: { src: "/images/art/aaniquah-serving.webp", w: 600, h: 600, cls: "w-[44%] max-w-[260px]" },
  },
  {
    title: "Custom builds and integrations",
    body: "Web apps and bigger sites: bookings, payments, forms and links to the systems you already use. Fixed quote after a chat.",
    price: `From ${LARGER_FROM}`,
    href: "/business-projects",
    span: "lg:col-span-5",
    tone: "ink",
    art: { src: "/images/art/imaan-serving.webp", w: 600, h: 600, cls: "w-[34%] max-w-[170px]" },
  },
  {
    title: "Agencies and designers",
    body: "You bring the client and the design, we build it properly. Under your name or ours.",
    price: "Let's talk",
    href: "/business-projects#agencies",
    span: "lg:col-span-5",
    tone: "plain",
    art: { src: "/images/art/launch-day.webp", w: 1600, h: 894, cls: "w-[48%] sm:w-[62%] max-w-[320px]" },
  },
  {
    title: "Clients outside South Africa",
    body: "The same kitchen and the same care, with packages priced in US dollars.",
    price: "Packages in USD",
    href: "/pricing?for=intl",
    span: "lg:col-span-7",
    tone: "soft",
    big: `From ${INTL_PRICES.Starter}`,
  },
];

const TONE: Record<Offer["tone"], string> = {
  pink: "bg-[#FDD2DE] text-[#161214] dark:bg-[var(--im-surface)] dark:text-[var(--im-text)] dark:ring-1 dark:ring-[var(--im-border)]",
  ink: "bg-dp-cta text-dp-cta-fg",
  plain: "bg-dp-surface text-dp-ink ring-1 ring-dp-line",
  soft: "bg-dp-soft text-dp-ink ring-1 ring-dp-line dark:bg-[var(--im-soft)]",
};

export function WhatWeCook() {
  return (
    <section aria-labelledby="cook-heading" className="border-t border-dp-line">
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:py-32">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="cook-heading" className={`md:col-span-7 ${H2}`}>
            What we <CutoutWord word="COOK" />
          </h2>
          <p className="max-w-[44ch] text-lg leading-relaxed text-dp-muted md:col-span-5">
            Websites, web apps and the systems behind them, designed and coded from scratch. Pick the table you're sitting at.
          </p>
        </Reveal>
        <ul className="mt-14 grid gap-4 lg:grid-cols-12">
          {OFFERS.map((o, i) => (
            <Reveal as="li" key={o.title} delay={(i % 2) * 0.06} className={o.span}>
              <Link
                href={o.href}
                className={`group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[32px] p-8 transition-transform duration-500 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent sm:p-10 ${TONE[o.tone]}`}
              >
                <span className={`relative z-10 block max-w-[17ch] text-[clamp(1.9rem,3vw,2.7rem)] font-semibold leading-[1.02] tracking-[-0.045em] ${o.art ? "sm:max-w-[13ch]" : ""}`}>{o.title}</span>
                <span className={`relative z-10 mt-4 block max-w-[34ch] text-[15.5px] leading-relaxed opacity-75 ${o.art ? "sm:max-w-[27ch]" : ""}`}>{o.body}</span>
                {o.big && (
                  <span aria-hidden="true" className="dp-cut-bebas relative z-10 mt-6 block text-[clamp(4.5rem,9vw,8rem)] leading-[0.85] tracking-[0.02em] text-dp-accent">
                    {o.big}
                  </span>
                )}
                <span className="relative z-10 mt-auto flex items-center gap-4 pt-8">
                  <span aria-hidden="true" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-current/10 ring-1 ring-current/25 transition-all duration-500 group-hover:-rotate-45 group-hover:bg-current/20">
                    <ArrowUpRight size={19} className="rotate-45" />
                  </span>
                  <span className="text-[1.15rem] font-semibold tracking-[-0.02em] tabular-nums">{o.price}</span>
                </span>
                {o.art && (
                  <img
                    src={o.art.src}
                    alt=""
                    width={o.art.w}
                    height={o.art.h}
                    loading="lazy"
                    decoding="async"
                    className={`pointer-events-none absolute -bottom-4 right-2 object-contain ${o.art.cls} drop-shadow-[0_20px_30px_rgba(12,11,13,0.25)] transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-[-2deg] sm:right-6`}
                  />
                )}
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
