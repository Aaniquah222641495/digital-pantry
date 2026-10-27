// The single source for every studio question and answer (DPW-9). The /faq page shows all of them,
// Pricing links here instead of repeating them (founder 2026-10-27), and the FAQPage structured data on /faq (src/seo.ts)
// is built from the same list, so the visible text and the markup match word for word.
// Every answer reads from src/lib/plans.ts or a recorded decision; do not type a price here by hand.
// Sources: plans.ts terms, ADR-0024 amendment (2026-10-26), ADR-0025, PROJECT.md S4/S6, finance check 2026-10-26.
import {
  BILLED_SEPARATELY_SUMMARY,
  LARGER_FROM,
  INTL_PRICES,
  INTL_RETAINER,
  MOCKUP_TERMS,
  PLAN_PRICES,
  RETAINER,
  SMALL_BUSINESS_LIMIT,
  TURNAROUND_TERMS,
} from "./plans";

export interface FaqItem {
  /** Anchor on /faq, so other pages can link straight to one answer. */
  id: string;
  q: string;
  a: string;
}
export interface FaqGroup {
  id: string;
  title: string;
  blurb: string;
  items: FaqItem[];
}

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "prices",
    title: "Prices",
    blurb: "What you pay and what you don't.",
    items: [
      {
        id: "how-much",
        q: "How much does a website cost?",
        a: `Our small business packages are once-off and in rand: Starter ${PLAN_PRICES.Starter}, Standard ${PLAN_PRICES.Standard}, Premium ${PLAN_PRICES.Premium} and Pro ${PLAN_PRICES.Pro}, for South African businesses with ${SMALL_BUSINESS_LIMIT}. Each price covers the build of your site.`,
      },
      {
        id: "deposit",
        q: "How do I pay?",
        a: "Every package starts with a 50% deposit, plus your domain registration fee if you need a new domain. The other 50% is due when your site goes live. We send an invoice for each.",
      },
      { id: "not-included", q: "What is not included in the price?", a: BILLED_SEPARATELY_SUMMARY },
      {
        id: "bigger-companies",
        q: "Do these prices apply to bigger companies?",
        a: `No. The rand packages are for South African small businesses with ${SMALL_BUSINESS_LIMIT}. Larger businesses get a custom quote, from ${LARGER_FROM}.`,
      },
      {
        id: "international",
        q: "Do you work with international clients?",
        a: `Yes. International packages are priced in US dollars: Starter ${INTL_PRICES.Starter}, Standard ${INTL_PRICES.Standard}, Premium ${INTL_PRICES.Premium} and Pro ${INTL_PRICES.Pro}, once-off.`,
      },
      {
        id: "pro-monthly",
        q: "Does Pro have monthly fees?",
        a: "No. Your lead system runs on free Google tools that you own. Every enquiry lands in your inbox and your own Sheet.",
      },
    ],
  },
  {
    id: "process",
    title: "Process",
    blurb: "From first chat to launch.",
    items: [
      {
        id: "how-it-works",
        q: "How does it work, from first chat to launch?",
        a: "Three steps. First we learn your business, your customers and how you sell, then send one free mock-up pack within 5 business days of your brief, for qualified enquiries. Next we build your site from scratch: clean code, mobile first, no templates and nothing you don't need. Then it goes live on your own domain. Building starts once your deposit is paid.",
      },
      { id: "how-long", q: "How long does it take?", a: TURNAROUND_TERMS },
      { id: "free-mock-up", q: "What do I get in the free mock-up?", a: MOCKUP_TERMS },
      {
        id: "what-we-need",
        q: "What do you need from me?",
        a: "Your content: your logo, the text, menu or prices and photos that go on your site. The days for your build start counting once your deposit is paid and all of it is in. If you would rather not write your own text, we can write it for you, billed separately.",
      },
      { id: "coding", q: "Do I need to know how to code?", a: "No! That's literally our job. You handle the business, we handle the website." },
      { id: "whatsapp", q: "Do I keep my WhatsApp number?", a: "Yes! We just add a click-to-WhatsApp button on your site. Easy." },
    ],
  },
  {
    id: "site",
    title: "Your site and domain",
    blurb: "Who owns what, and who looks after it.",
    items: [
      {
        id: "ownership",
        q: "Who owns my website?",
        a: "You do. Your website and your domain name are yours. The one exception is the free mock-up: that concept and its files stay ours until the agreed fee is paid.",
      },
      {
        id: "domain",
        q: "How does my domain name work?",
        a: "Every site goes live on its own domain, like yourbusiness.co.za, because it looks professional. We register it for you, in your name, so you are the owner. You pay the registration and every yearly renewal, on top of your package and any maintenance fee: a .co.za is about R100 to R150 a year. We tell you the cost before anything is bought. Every package includes setting it up, not the registration fee.",
      },
      {
        id: "hosting",
        q: "Who looks after my hosting, and what does it cost?",
        a: "We set up and look after your hosting. Today that is R0 a month, on a free plan. Free plans have limits set by the host, which can change, and no uptime guarantee. If a site ever outgrows the free plan, we tell you the cost before anything changes.",
      },
      {
        id: "email",
        q: "Can I have email on my own domain?",
        a: "If you want it, yes. It needs a mail plan from your domain provider and is billed separately from your package.",
      },
    ],
  },
  {
    id: "after",
    title: "After launch",
    blurb: "Changes, extras and keeping it fresh.",
    items: [
      {
        id: "revisions",
        q: "How many rounds of revisions are included?",
        a: "Every package includes 2 rounds of revisions. A round is one list of changes, sent together in one message; we make them all, then you check the result. Anything beyond that is quoted in writing before we start, so there are no surprises.",
      },
      {
        id: "extra-work",
        q: "What if I want something that isn't in my package?",
        a: "Tell us. We quote any extra work in writing first, so you know the cost before we start.",
      },
      {
        id: "changes-later",
        q: "What if I need changes later?",
        a: `That's what the ${RETAINER}/month retainer is for (${INTL_RETAINER}/month for international clients). Small edits, big peace of mind.`,
      },
    ],
  },
];

export const ALL_FAQ: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items);
