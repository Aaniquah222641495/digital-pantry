// Content for the search landing pages: two industry pages and the website cost guide.
// The pages and src/seo.ts (FAQPage structured data) both read from here, so the questions and
// answers Google sees always match the page word for word. Only state facts that are already on
// the site or in a dated, sourced brief (ops/research/2026-10-23-pricing-tiers-and-international.md).
import { LARGER_FROM, PLAN_PRICES, TURNAROUND_TERMS } from "./plans";

export interface Faq {
  q: string;
  a: string;
}

export interface Industry {
  path: string;
  /** Breadcrumb and footer label */
  label: string;
  /** Plain-text H1 for screen readers and structured data */
  heading: string;
  /** Visible H1: text before and after the pixel word */
  before: string;
  word: string;
  after: string;
  intro: string;
  needs: { title: string; body: string }[];
  /** A live site we built for this kind of business. Left out until we have a real, permitted one. */
  proof?: {
    name: string;
    kind: string;
    url: string;
    href: string;
    desktop: string;
    phone: string;
    rows: [string, string][];
  };
  fit: string;
  faq: Faq[];
  /** Short card copy for the "What are you cooking up?" selector on Home */
  card: { title: string; body: string; tag: string };
}

export const FOOD: Industry = {
  path: "/websites-for-food-businesses",
  label: "Websites for food businesses",
  heading: "Websites for food businesses in Cape Town",
  before: "Websites for",
  word: "FOOD",
  after: "businesses",
  intro:
    "Bakeries, pop-ups, home kitchens and takeaways in Cape Town. We build a site where hungry customers find your menu, see where you are this week and order on WhatsApp in one tap.",
  needs: [
    { title: "Your menu, easy to read on a phone", body: "Prices and photos customers can scroll through, with no PDF to download." },
    { title: "Where and when to find you", body: "Market days, pop-up spots and opening hours, kept up to date when they change." },
    { title: "One-tap WhatsApp ordering", body: "Customers tap once and land in a chat with you. You keep your number and take orders the way you already do." },
    { title: "Found on Google", body: "Premium and Pro include your own domain, a Google Business Profile and basic SEO, so people nearby can find you." },
  ],
  proof: {
    name: "Stuff'd Bagels",
    kind: "Food pop-up, Cape Town",
    url: "stuffdbagels.netlify.app",
    href: "https://stuffdbagels.netlify.app",
    desktop: "/images/work/stuffd-desktop.webp",
    phone: "/images/work/stuffd-phone.webp",
    rows: [
      ["The problem", "Customers had to hunt for a WhatsApp number and scroll social media to place orders. No central hub, so sales slipped through the cracks."],
      ["What we cooked", "A single-page ordering site with the menu, this week's pop-up spots and one-tap WhatsApp ordering."],
    ],
  },
  fit: `Starter (${PLAN_PRICES.Starter}) is one page with your menu and a WhatsApp button, which is all many food businesses need. Premium (${PLAN_PRICES.Premium}) adds your own domain, a Google Business Profile and basic SEO.`,
  faq: [
    { q: "Can customers order without an online shop?", a: "Yes. The site sends them to your WhatsApp with one tap, so you take orders the way you already do and don't pay for an online shop." },
    { q: "Can you update my menu after launch?", a: "Yes. The optional R120/month retainer covers menu updates, schedule changes and small edits." },
    { q: "How long does a food business website take?", a: TURNAROUND_TERMS },
  ],
  card: { title: "Food and drinks", body: "Menus, market days and one-tap WhatsApp orders.", tag: "Bakes, pop-ups, cafes" },
};

export const SCHOOLS: Industry = {
  path: "/websites-for-schools-and-madrasahs",
  label: "Websites for schools and madrasahs",
  heading: "Websites for schools and madrasahs in Cape Town",
  before: "Websites for",
  word: "SCHOOLS",
  after: "and madrasahs",
  intro:
    "Madrasahs, schools, tutors and learning centres. We build a calm site where parents find your programmes, register their children and get answers, all from a phone.",
  needs: [
    { title: "Programmes and classes", body: "What you offer, who it's for and when it runs, set out clearly." },
    { title: "Registration that works on a phone", body: "A WhatsApp button or a simple form, so parents can sign up without printing anything." },
    { title: "Answers before they ask", body: "FAQs and testimonials, so new families feel at ease before they get in touch." },
    { title: "Care with families' details", body: "Forms ask only for what you need, with a privacy notice written for POPIA." },
  ],
  proof: {
    name: "Beginners Madrasah",
    kind: "Islamic learning for women and children",
    url: "beginnersmadrasah.co.za",
    href: "https://beginnersmadrasah.co.za/",
    desktop: "/images/work/madrasah-desktop.webp",
    phone: "/images/work/madrasah-phone.webp",
    rows: [
      ["The brief", "A warm, safe-feeling home online for a beginner-friendly Islamic learning space, online and in person."],
      ["What we cooked", "Programmes, registration, testimonials and FAQs on one calm site that parents can use easily on a phone."],
    ],
  },
  fit: `A one-page site starts at ${PLAN_PRICES.Starter} (Starter). Premium (${PLAN_PRICES.Premium}) adds your own domain, a Google Business Profile and basic SEO. Pro (${PLAN_PRICES.Pro}) adds a form that saves every registration to your Google Sheet and alerts you straight away.`,
  faq: [
    { q: "Can parents register online?", a: "Yes. Pro includes a form that saves every registration to your own Google Sheet and emails you straight away. Smaller packages use a WhatsApp button instead." },
    { q: "Do you build websites for madrasahs and Islamic schools?", a: "Yes. Beginners Madrasah is one of our live sites, and we're happy to build for madrasahs, masjids and Islamic learning centres." },
    { q: "How long does a school website take?", a: TURNAROUND_TERMS },
  ],
  card: { title: "Schools and tutors", body: "Programmes, registrations and answers for parents.", tag: "Madrasahs, tutors, centres" },
};

// The next four have no case study yet (PRD 3.3: only genuinely relevant work, no invented claims).
// Their pages show what we'd build and offer the free concept instead. Add `proof` when a real,
// permitted site exists.

export const BEAUTY: Industry = {
  path: "/websites-for-beauty-businesses",
  label: "Websites for beauty businesses",
  heading: "Websites for salons, lash and nail techs and beauty businesses in Cape Town",
  before: "Websites for",
  word: "BEAUTY",
  after: "businesses",
  intro:
    "Salons, lash and brow studios, nail techs, spas and home-based beauty businesses. We build a site that shows your services and prices, your best work and how to book, so clients stop asking the same questions in your DMs.",
  needs: [
    { title: "Services and prices, clearly listed", body: "Every treatment with its price and how long it takes, easy to read on a phone." },
    { title: "A gallery of your work", body: "Your own photos, set out so clients can see your style before they book." },
    { title: "One clear way to book", body: "A WhatsApp button, or a link to the booking app you already use. Built-in online booking is quoted on request." },
    { title: "Easy to find", body: "Your area, hours and directions, plus your own domain, a Google Business Profile and basic SEO on Premium and Pro." },
  ],
  fit: `Standard (${PLAN_PRICES.Standard}) covers your services, an about section, your location and social links. Premium (${PLAN_PRICES.Premium}) adds your own domain, a Google Business Profile and basic SEO. Pro (${PLAN_PRICES.Pro}) adds an enquiry form that saves every lead to your Google Sheet and replies straight away.`,
  faq: [
    { q: "Can clients book online?", a: "Yes. We can link the booking app you already use, or send clients to WhatsApp. A built-in booking setup is quoted on request." },
    { q: "Can I update my prices later?", a: "Yes. The optional R120/month retainer covers price changes, new treatments and small edits." },
    { q: "How long does a beauty website take?", a: TURNAROUND_TERMS },
  ],
  card: { title: "Beauty and personal care", body: "Services, prices, your best work and one way to book.", tag: "Salons, lashes, nails" },
};

export const CONSULTANTS: Industry = {
  path: "/websites-for-consultants",
  label: "Websites for consultants and professional services",
  heading: "Websites for consultants and professional services in South Africa",
  before: "Websites for",
  word: "CONSULTANTS",
  after: "and pros",
  intro:
    "Coaches, bookkeepers, consultants, therapists and other professionals. We build a site that explains what you do in plain words, shows why people can trust you and makes it easy to get in touch.",
  needs: [
    { title: "What you do, in plain words", body: "Your services, who they are for and how working with you goes, without jargon." },
    { title: "Reasons to trust you", body: "Your background, qualifications and client words you have permission to share." },
    { title: "Answers to the usual questions", body: "Fees or how pricing works, process and timing, so enquiries arrive better informed." },
    { title: "Enquiries that come with context", body: "Pro adds a form that asks the right questions, saves every lead to your Google Sheet and replies straight away." },
  ],
  fit: `Standard (${PLAN_PRICES.Standard}) is a clear site with your services and about section. Premium (${PLAN_PRICES.Premium}) adds your own domain, a Google Business Profile and basic SEO. Pro (${PLAN_PRICES.Pro}) adds the lead form, instant alerts and an auto-reply. Bigger builds, from ${LARGER_FROM}, are quoted after a short chat.`,
  faq: [
    { q: "Can I use my own domain and email?", a: "Yes. You buy the domain in your own name. Premium and Pro include setting it up; email on your domain is a separate plan from your domain provider." },
    { q: "Can the site take bookings for calls?", a: "Yes. We can link your calendar or booking app. A built-in booking setup is quoted on request." },
    { q: "How long does it take?", a: TURNAROUND_TERMS },
  ],
  card: { title: "Consultants and pros", body: "Clear services, real trust signals and better enquiries.", tag: "Coaches, bookkeepers" },
};

export const PRODUCT_BRANDS: Industry = {
  path: "/websites-for-product-brands",
  label: "Websites for product brands",
  heading: "Websites for small product brands in South Africa",
  before: "Websites for",
  word: "PRODUCT",
  after: "brands",
  intro:
    "Candles, skincare, clothing, crafts and other small product brands. We build a site that tells your story, shows your products properly and gives customers a clear way to buy, whether that's WhatsApp, an order form or an online shop.",
  needs: [
    { title: "Your products, shown properly", body: "A catalogue with your photos, prices and the details customers ask about." },
    { title: "A clear way to buy", body: "Order on WhatsApp, an order form, or an online shop with payments, quoted separately." },
    { title: "Your story", body: "Who makes it, how and why, so customers remember you." },
    { title: "Found by new customers", body: "Your own domain, a Google Business Profile and basic SEO on Premium and Pro." },
  ],
  fit: `Standard (${PLAN_PRICES.Standard}) or Premium (${PLAN_PRICES.Premium}) suit a catalogue with WhatsApp ordering. An online shop with payments is quoted to your product range, because it changes the build and the monthly costs.`,
  faq: [
    { q: "Do I need an online shop?", a: "Not always. Many small brands sell well with a catalogue and WhatsApp orders. If you want card payments and stock, we quote an online shop separately." },
    { q: "Who takes the product photos?", a: "You supply them. Photography is available on request." },
    { q: "How long does it take?", a: TURNAROUND_TERMS },
  ],
  card: { title: "Product brands", body: "A catalogue, your story and a clear way to buy.", tag: "Candles, skincare, crafts" },
};

export const TRADES: Industry = {
  path: "/websites-for-trades-and-local-services",
  label: "Websites for trades and local services",
  heading: "Websites for trades and local services in Cape Town",
  before: "Websites for",
  word: "TRADES",
  after: "and local services",
  intro:
    "Plumbers, electricians, car washes, detailers, cleaners and other local services. We build a site that says what you do and where, shows your work and gets you quote requests you can answer fast.",
  needs: [
    { title: "What you do and where", body: "Your services and the areas you cover, so the right customers call." },
    { title: "Proof of your work", body: "Photos of finished jobs and any accreditation you hold." },
    { title: "Quote requests that make sense", body: "A WhatsApp button, or on Pro a form that collects the job details, saves them to your Google Sheet and alerts you." },
    { title: "Found when someone searches nearby", body: "A Google Business Profile, your own domain and basic SEO on Premium and Pro." },
  ],
  fit: `Starter (${PLAN_PRICES.Starter}) is one page with your services and a WhatsApp button. Premium (${PLAN_PRICES.Premium}) adds your own domain, a Google Business Profile and basic SEO, which matter most for local searches. Pro (${PLAN_PRICES.Pro}) adds the quote-request form and instant alerts.`,
  faq: [
    { q: "Will this get me to the top of Google?", a: "Nobody can promise that. We set up the basics properly: a Google Business Profile, clear service and area pages and fast loading, which give you a fair chance in local search." },
    { q: "Can customers send photos of the job?", a: "They can send them on WhatsApp straight from the site. A form with photo upload is quoted on request." },
    { q: "How long does it take?", a: TURNAROUND_TERMS },
  ],
  card: { title: "Trades and local services", body: "Your services, your area and fast quote requests.", tag: "Plumbers, detailers, cleaners" },
};

export const INDUSTRIES = [FOOD, BEAUTY, CONSULTANTS, PRODUCT_BRANDS, SCHOOLS, TRADES];

/* ------------------------------------------------------------------ */
/* Website cost guide                                                  */
/* ------------------------------------------------------------------ */

export const COST_GUIDE = {
  path: "/website-cost-south-africa",
  label: "How much does a website cost?",
  heading: "How much does a website cost in South Africa?",
  published: "2026-10-24",
  checked: "23 October 2026",
};

/** Market price bands, each tied to the sources that state it (checked 23 October 2026). */
export const COST_BANDS: { type: string; range: string; sources: string[] }[] = [
  { type: "Budget template site", range: "R2 000 to R5 000", sources: ["Clevex"] },
  { type: "Small business site, 5 to 10 pages", range: "R5 000 to R20 000", sources: ["HostAfrica", "New Perspective"] },
  { type: "Custom corporate site", range: "R15 000 to R50 000", sources: ["HostAfrica"] },
  { type: "Complex or large builds", range: "R75 000 to R250 000+", sources: ["Blacksnow", "Advertising Solutions"] },
];

export const COST_SOURCES: { name: string; href: string }[] = [
  { name: "HostAfrica", href: "https://hostafrica.co.za/blog/websites/web-design/how-much-does-web-design-cost-in-south-africa/" },
  { name: "New Perspective", href: "https://www.newperspectivestudio.co.za/wp/what-is-the-cost-of-creating-a-website-in-south-africa/" },
  { name: "Clevex", href: "https://clevex.co.za/website-design-prices-south-africa" },
  { name: "Blacksnow", href: "https://blacksnowgroup.co.za/website-design-costs-in-south-africa-2026/" },
  { name: "Advertising Solutions", href: "https://advertisingsolutions.co.za/website-design-cost-south-africa/" },
  { name: "xneelo (mailbox pricing)", href: "https://xneelo.co.za/help-centre/email/can-i-order-additional-mailboxes-to-my-current-web-hosting-package/" },
];

export const COST_DRIVERS: { title: string; body: string }[] = [
  { title: "Pages and content", body: "A one-page menu costs far less than a 20-page site, and someone has to write the words and take the photos." },
  { title: "Features", body: "Bookings, payments, registration forms and links to your other systems all add build and testing time." },
  { title: "Design", body: "A ready-made template is cheaper. A design made for your brand takes longer and costs more." },
  { title: "Timeline and sign-offs", body: "Rush jobs and long approval chains with many people both push the price up." },
];

export const COST_EXTRAS: { title: string; body: string }[] = [
  { title: "Your domain name", body: "A .co.za address is a yearly cost. Ours renews at R110 a year with xneelo (October 2026)." },
  { title: "Hosting", body: "A simple, fast site can run on a free hosting plan. Online shops and booking systems usually come with monthly fees." },
  { title: "Email on your domain", body: "An address like hello@yourbusiness.co.za usually needs a mail plan. xneelo, for example, charges R9 a month for an extra mailbox." },
  { title: "Updates after launch", body: "Menus, prices and timetables change. Ask whether updates are included, charged per job or covered by a monthly plan." },
];

export const COST_FAQ: Faq[] = [
  {
    q: "How much does a basic website cost in South Africa?",
    a: `Agency figures we checked in October 2026 put budget template sites at about R2 000 to R5 000 and most small business sites at R5 000 to R20 000. Our one-page Starter site is ${PLAN_PRICES.Starter}.`,
  },
  {
    q: "Are there monthly costs after the website is built?",
    a: "Usually a yearly domain fee, and sometimes hosting, email or a maintenance plan. Our packages are once-off, and the R120/month retainer for updates is optional.",
  },
  {
    q: "Why do website prices vary so much?",
    a: "The number of pages, the features, how custom the design is, and how fast you need it. A one-page menu and a 20-page corporate site are very different jobs.",
  },
  {
    q: "How long does it take to build a website?",
    a: TURNAROUND_TERMS,
  },
];

export const OUR_PRICES = `Our small business packages run from ${PLAN_PRICES.Starter} to ${PLAN_PRICES.Pro}, once-off, for South African businesses with up to 10 staff. Larger businesses are quoted from ${LARGER_FROM}, and international clients have their own packages in US dollars.`;
