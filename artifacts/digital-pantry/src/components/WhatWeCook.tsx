import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { CutoutWord } from "./CutoutWord";
import { Reveal } from "./Reveal";
import { H2 } from "../lib/style";
import { priceFor, type Market } from "../lib/plans";
import { useMarket } from "../lib/MarketContext";

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

// Two offers: ready-made packages, and custom work quoted after a chat. The agencies and the
// USD cards were cut (founder 2026-10-27): the header switch now shows dollar prices everywhere.
const offers = (market: Market): Offer[] => [
  {
    title: "Small business websites",
    body: "From one page with a WhatsApp button to a site that catches every lead. Fixed packages, clear prices.",
    price: `From ${priceFor("Starter", market)}`,
    href: "/pricing",
    span: "lg:col-span-7",
    tone: "pink",
    art: { src: "/images/art/aaniquah-serving.webp", w: 600, h: 600, cls: "w-[44%] max-w-[260px]" },
  },
  {
    title: "Online shops and bigger builds",
    body: "Online shops, bookings, payments and bigger sites. Fixed quote after a chat.",
    price: "Ask for a quote",
    href: "/contact?interest=larger",
    span: "lg:col-span-5",
    tone: "soft",
    art: { src: "/images/art/imaan-serving.webp", w: 600, h: 600, cls: "w-[34%] max-w-[170px]" },
  },
];

const TONE: Record<Offer["tone"], string> = {
  // The main offer is the one bright card; the secondary stays quiet in both themes (founder review 2026-10-27).
  pink: "bg-[#FFA7D2] text-[#161214] shadow-[0_30px_70px_-40px_rgba(255,92,168,0.7)]",
  ink: "bg-dp-cta text-dp-cta-fg",
  plain: "bg-dp-surface text-dp-ink ring-1 ring-dp-line",
  soft: "bg-dp-soft text-dp-ink ring-1 ring-dp-line dark:bg-[var(--im-surface)] dark:ring-[var(--im-border)]",
};

export function WhatWeCook() {
  const { market } = useMarket();
  return (
    <section aria-labelledby="cook-heading" className="border-t border-dp-line">
      <div className="mx-auto max-w-[1320px] px-5 pb-16 pt-20 sm:px-8 md:pb-20 md:pt-24">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="cook-heading" className={`md:col-span-7 ${H2}`}>
            What we <CutoutWord word="COOK" />
          </h2>
          <p className="max-w-[44ch] text-lg leading-relaxed text-dp-muted md:col-span-5">
            Websites for small businesses, designed and coded from scratch.
          </p>
        </Reveal>
        <ul className="mt-14 grid gap-4 lg:grid-cols-12">
          {offers(market).map((o, i) => (
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
