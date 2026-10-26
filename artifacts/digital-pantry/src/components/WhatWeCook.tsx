import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import { CutoutWord } from "./CutoutWord";
import { Reveal } from "./Reveal";
import { H2 } from "../lib/style";
import { INTL_PRICES, LARGER_FROM, PLAN_PRICES } from "../lib/plans";

// The studio's full range, straight after the hero (PRD 1, 4.2, 4.8): small-business sites are one
// offer, not the whole studio. Custom, agency and international work each get a visible route so
// bigger buyers don't assume we only sell low-cost packages. Only offers the site already makes.
const OFFERS = [
  {
    title: "Small business websites",
    body: "From one page with a WhatsApp button to a site that catches every lead. Fixed packages, clear prices.",
    price: `From ${PLAN_PRICES.Starter}`,
    href: "/pricing",
  },
  {
    title: "Custom builds and integrations",
    body: "Bigger sites with more moving parts: bookings, payments, forms and links to the systems you already use. Scoped with you, then a fixed quote.",
    price: `From ${LARGER_FROM}`,
    href: "/pricing?for=larger",
  },
  {
    title: "Agencies and designers",
    body: "You bring the client and the design, we build it properly. Ask us how we can work together.",
    price: "Ask us",
    href: "/contact?interest=larger",
  },
  {
    title: "Clients outside South Africa",
    body: "The same kitchen and the same care, with packages priced in US dollars.",
    price: `From ${INTL_PRICES.Starter}`,
    href: "/pricing?for=intl",
  },
] as const;

export function WhatWeCook() {
  return (
    <section aria-labelledby="cook-heading" className="border-t border-dp-line">
      <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:py-32">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <h2 id="cook-heading" className={`md:col-span-7 ${H2}`}>
            What we <CutoutWord word="COOK" />
          </h2>
          <p className="max-w-[44ch] text-lg leading-relaxed text-dp-muted md:col-span-5">
            Websites and custom web builds, designed and coded from scratch. Pick the table you're sitting at.
          </p>
        </Reveal>
        <ul className="mt-14 border-t border-dp-ink/15 dark:border-white/15">
          {OFFERS.map((o, i) => (
            <Reveal as="li" key={o.title} delay={i * 0.05} className="border-b border-dp-ink/15 dark:border-white/15">
              <Link
                href={o.href}
                className="group grid gap-3 py-8 transition-colors hover:bg-dp-soft/60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-dp-accent md:grid-cols-12 md:items-center md:gap-8 md:px-4 dark:hover:bg-[var(--im-soft)]"
              >
                <span className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-dp-ink md:col-span-5">{o.title}</span>
                <span className="max-w-[48ch] leading-relaxed text-dp-muted md:col-span-5">{o.body}</span>
                <span className="flex items-center justify-between gap-3 md:col-span-2 md:justify-end">
                  <span className="text-[15px] font-semibold tabular-nums text-dp-accent">{o.price}</span>
                  <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-dp-line transition-all duration-500 group-hover:-rotate-45 group-hover:border-dp-ink group-hover:bg-dp-ink group-hover:text-dp-bg dark:group-hover:bg-[var(--im-cta)] dark:group-hover:text-[var(--im-cta-fg)]">
                    <ArrowUpRight size={18} className="rotate-45" />
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
