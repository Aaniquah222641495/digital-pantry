// The single source for every studio question and answer (DPW-9). The /faq page shows all of them,
// Pricing links here instead of repeating them (founder 2026-10-27), and the FAQPage structured data on /faq (src/seo.ts)
// is built from the same list, so the visible text and the markup match word for word.
// Every answer reads from src/lib/plans.ts or a recorded decision. Prices are tokens ({Starter}, {retainer}):
// the page fills them for the Local / International switch, and the structured data uses Local (ALL_FAQ).
// `aIntl` replaces the answer when International is on. The "international" answer keeps its dollar prices
// as plain text, so they are also in the server HTML (scripts/prerender.mjs checks them).
// Sources: plans.ts terms, ADR-0024 amendment (2026-10-26), ADR-0025, PROJECT.md S4/S6, finance check 2026-10-26.
import {
  BILLED_SEPARATELY_SUMMARY,
  LARGER_FROM,
  INTL_PRICES,
  INTL_RETAINER,
  MOCKUP_TERMS,
  SMALL_BUSINESS_LIMIT,
  TURNAROUND_TERMS,
  priced,
} from "./plans";

export interface FaqItem {
  /** Anchor on /faq, so other pages can link straight to one answer. */
  id: string;
  q: string;
  a: string;
  /** Shown instead of `a` when International is on */
  aIntl?: string;
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
        a: `Our packages are once-off and in rand: Starter {Starter}, Standard {Standard}, Premium {Premium} and Pro {Pro}, for South African businesses with ${SMALL_BUSINESS_LIMIT}. Each price covers the build of your site.`,
        aIntl: "Our packages are once-off and in US dollars: Starter {Starter}, Standard {Standard}, Premium {Premium} and Pro {Pro}. Each price covers the build of your site.",
      },
      {
        id: "deposit",
        q: "How do I pay?",
        a: "Every package starts with a 50% deposit. The other 50% is due when your site goes live. We send an invoice for each.",
      },
      { id: "not-included", q: "What is not included in the price?", a: BILLED_SEPARATELY_SUMMARY },
      {
        id: "bigger-companies",
        q: "Do these prices apply to bigger companies?",
        a: `No. The rand packages are for South African small businesses with ${SMALL_BUSINESS_LIMIT}. Larger businesses get a custom quote, from ${LARGER_FROM}.`,
        aIntl: "These packages are made for small businesses. A larger business gets a custom quote, so ask us.",
      },
      {
        id: "international",
        q: "Do you work with international clients?",
        a: `Yes. International packages are priced in US dollars: Starter ${INTL_PRICES.Starter}, Standard ${INTL_PRICES.Standard}, Premium ${INTL_PRICES.Premium} and Pro ${INTL_PRICES.Pro}, once-off. The optional retainer is ${INTL_RETAINER}/month. Use the switch at the top of the page to see every price in dollars.`,
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
        a: "Three steps. We learn your business and send one free mock-up pack within 5 business days of your brief, for qualified enquiries. Then we build your site from scratch, once your deposit is paid. Then it goes live on your own domain.",
      },
      { id: "how-long", q: "How long does it take?", a: TURNAROUND_TERMS },
      { id: "free-mock-up", q: "What do I get in the free mock-up?", a: MOCKUP_TERMS },
      {
        id: "what-we-need",
        q: "What do you need from me?",
        a: "Your content: your logo, the text, menu or prices and photos for your site. The days for your build start counting once your deposit is paid and all of it is in. We can write your text for you, billed separately.",
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
        a: "Every site goes live on its own domain, like yourbusiness.co.za, because it looks professional. You register it in your own name with a domain provider, so you are the owner, and you renew it every year: a .co.za is about R100 to R150 a year. We connect it to your site. Keep your details current and renew on time, or the site goes offline.",
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
        a: "Every package includes 2 rounds of revisions. A round is one list of changes, sent together in one message. Anything beyond that is quoted in writing before we start.",
      },
      {
        id: "extra-work",
        q: "What if I want something that isn't in my package?",
        a: "Tell us. We quote any extra work in writing first, so you know the cost before we start.",
      },
      {
        id: "changes-later",
        q: "What if I need changes later?",
        a: "That's what the {retainer}/month retainer is for. Small edits, big peace of mind.",
      },
    ],
  },
];

// Local wording, for the structured data (the prerendered page is Local too).
export const ALL_FAQ: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items).map((f) => ({ ...f, a: priced(f.a, "za") }));
