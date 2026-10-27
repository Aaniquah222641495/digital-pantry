// One source of truth for every page's title, description and structured data.
// Used at build time (scripts/prerender.mjs writes it into each page's HTML) and in the
// browser (RouteMeta keeps the tab title and tags right when visitors click between pages).
// Only state facts that are already on the site. Update `LAST_UPDATED` when content changes.

import { ALL_FAQ } from "./lib/faq";
import { BEAUTY, FOOD, PRODUCT_BRANDS, TRADES, type Industry } from "./lib/guides";
import { priced } from "./lib/plans";

export const SITE_URL = "https://digitalpantry.co.za";
export const SITE_NAME = "The Digital Pantry";
export const LAST_UPDATED = "2026-10-27";
const OG_IMAGE = `${SITE_URL}/og-card.jpg`; // 1200x630 link-preview card (WhatsApp, LinkedIn, X)
// Email is the contact we publish to search engines and AI assistants (founder, 2026-10-24).
// The founders' WhatsApp numbers stay on the pages for visitors but are left out of this data.
const EMAIL = "thedigitalpantryza@gmail.com";

export interface PageMeta {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
  jsonLd: object[];
}

const ORG_ID = `${SITE_URL}/#business`;
const PERSON_ID = `${SITE_URL}/#aaniquah`;
const IMAAN_ID = `${SITE_URL}/#imaan`;

// International packages (USD), founder decision 2026-10-23.
const INTL_PLANS = [
  { name: "Starter", price: 450 },
  { name: "Standard", price: 750 },
  { name: "Premium", price: 1200 },
  { name: "Pro", price: 1800 },
];

const PLANS = [
  { name: "Starter", price: 600, includes: "Single page, menu section, WhatsApp button, mobile responsive, your own domain connected (domain billed separately)." },
  { name: "Standard", price: 1000, includes: "Everything in Starter plus locations, about section and social links." },
  { name: "Premium", price: 1600, includes: "Everything in Standard plus Google Business setup, basic SEO setup and 1 month of updates." },
  { name: "Pro", price: 2500, includes: "Everything in Premium plus a lead capture form with instant alerts, leads saved to your Google Sheet, an auto-reply to every enquiry and a WhatsApp follow-up button, tested before handover." },
];

const business = {
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: SITE_NAME,
  alternateName: "Digital Pantry Web Studio",
  slogan: "Coded in Pink. Built to Perform.",
  description:
    "Cape Town web studio building custom websites from scratch for South African small businesses. Packages from R600 to R2 500.",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo-wordmark.webp`,
  image: OG_IMAGE,
  email: EMAIL,
  priceRange: "R600 - R2 500",
  currenciesAccepted: "ZAR",
  address: { "@type": "PostalAddress", addressLocality: "Cape Town", addressRegion: "Western Cape", addressCountry: "ZA" },
  areaServed: [{ "@type": "City", name: "Cape Town" }, { "@type": "Country", name: "South Africa" }],
  knowsAbout: ["Web design", "Web development", "React", "TypeScript", "Small business websites", "Lead capture automation"],
  founder: [{ "@id": PERSON_ID }, { "@id": IMAAN_ID }],
};

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Aaniquah Dicks",
  jobTitle: "Founder and software engineer",
  worksFor: { "@id": ORG_ID },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Cape Peninsula University of Technology" },
  award: [
    "1st place, GirlCode Pan-African Hackathon 2026 (team lead)",
    "1st place, Vodacom Bursar Mini Hackathon 2025 (team lead)",
    "Advanced Diploma in ICT, cum laude",
    "Golden Key International Honour Society member",
  ],
  homeLocation: { "@type": "City", name: "Cape Town" },
};

const imaan = {
  "@type": "Person",
  "@id": IMAAN_ID,
  name: "Imaan Cooper",
  jobTitle: "Co-founder and creative director",
  worksFor: { "@id": ORG_ID },
  knowsAbout: ["Creative direction", "Web design", "Branding", "Figma"],
  homeLocation: { "@type": "City", name: "Cape Town" },
};

const crumbs = (name: string, path: string) => ({
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
  ],
});

const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });


const faqPage = (faq: { q: string; a: string }[]) => ({
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});

const industryPage = (p: Industry, title: string, description: string): PageMeta => ({
  path: p.path,
  title,
  description,
  jsonLd: [
    graph(
      {
        "@type": "Service",
        name: p.heading,
        serviceType: "Web design and development",
        description: p.intro,
        provider: { "@id": ORG_ID },
        areaServed: [{ "@type": "City", name: "Cape Town" }, { "@type": "Country", name: "South Africa" }],
        offers: { "@type": "AggregateOffer", lowPrice: 600, highPrice: 2500, priceCurrency: "ZAR", url: `${SITE_URL}/pricing` },
        url: `${SITE_URL}${p.path}`,
      },
      faqPage(p.faq.map((f) => ({ q: f.q, a: priced(f.a, "za") }))),
      crumbs(p.label, p.path),
    ),
  ],
});

export const PAGES: PageMeta[] = [
  {
    path: "/",
    title: "Web Developer in Cape Town | The Digital Pantry",
    description:
      "Custom websites for South African small businesses, built from scratch by Aaniquah and Imaan in Cape Town. From R600.",
    jsonLd: [
      graph(
        { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: SITE_NAME, publisher: { "@id": ORG_ID }, inLanguage: "en-ZA" },
        business,
        person,
        imaan,
      ),
    ],
  },
  {
    path: "/pricing",
    title: "Website Prices in South Africa from R600 | Digital Pantry",
    description:
      "Small business website packages: Starter R600, Standard R1 000, Premium R1 600, Pro R2 500 with lead automation. Optional R150/month for updates ($90/month internationally).",
    jsonLd: [
      graph(
        {
          "@type": "Service",
          name: "Custom small business website",
          serviceType: "Web design and development",
          provider: { "@id": ORG_ID },
          areaServed: [{ "@type": "Country", name: "South Africa" }, { "@type": "Place", name: "Worldwide" }],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Website packages",
            itemListElement: [
              ...PLANS.map((p) => ({
                "@type": "Offer",
                name: `${p.name} website`,
                description: p.includes,
                price: p.price,
                priceCurrency: "ZAR",
                url: `${SITE_URL}/pricing`,
              })),
              ...INTL_PLANS.map((p) => ({
                "@type": "Offer",
                name: `${p.name} website (international)`,
                description: "International package, priced in US dollars.",
                price: p.price,
                priceCurrency: "USD",
                eligibleRegion: { "@type": "Place", name: "Outside South Africa" },
                url: `${SITE_URL}/pricing`,
              })),
              {
                "@type": "Offer",
                name: "Monthly retainer",
                description: "Menu updates, schedule changes and small edits.",
                priceSpecification: { "@type": "UnitPriceSpecification", price: 150, priceCurrency: "ZAR", unitText: "MONTH" },
                url: `${SITE_URL}/pricing`,
              },
              {
                "@type": "Offer",
                name: "Monthly retainer (international)",
                description: "Menu updates, schedule changes and small edits.",
                priceSpecification: { "@type": "UnitPriceSpecification", price: 90, priceCurrency: "USD", unitText: "MONTH" },
                eligibleRegion: { "@type": "Place", name: "Outside South Africa" },
                url: `${SITE_URL}/pricing`,
              },
            ],
          },
        },
        // No FAQPage here: Pricing shows only some of the questions, and the full FAQPage (word for word
        // with the visible text) lives on /faq, so the same questions aren't marked up on two pages.
        crumbs("Pricing", "/pricing"),
      ),
    ],
  },
  {
    path: "/faq",
    title: "Website FAQ: Prices, Domain, Hosting | Digital Pantry",
    description:
      "Straight answers on website prices, how we work, your domain and hosting, who owns your site, revisions and changes after launch. Cape Town web studio.",
    jsonLd: [
      graph(
        { "@type": "WebPage", "@id": `${SITE_URL}/faq#page`, url: `${SITE_URL}/faq`, name: "Website questions answered", about: { "@id": ORG_ID }, inLanguage: "en-ZA" },
        faqPage(ALL_FAQ),
        crumbs("FAQ", "/faq"),
      ),
    ],
  },
  {
    path: "/portfolio",
    title: "Portfolio: Websites Built in Cape Town | The Digital Pantry",
    description:
      "Live websites built from scratch for South African small businesses, including STUFF'D Bagels (WhatsApp ordering) and Beginners Madrasah.",
    jsonLd: [
      graph(
        {
          "@type": "CollectionPage",
          name: "The Digital Pantry portfolio",
          url: `${SITE_URL}/portfolio`,
          about: { "@id": ORG_ID },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: [
              { "@type": "ListItem", position: 1, item: { "@type": "WebSite", name: "STUFF'D Bagels", url: "https://stuffdbagels.netlify.app", creator: { "@id": ORG_ID } } },
              { "@type": "ListItem", position: 2, item: { "@type": "WebSite", name: "Beginners Madrasah", url: "https://beginnersmadrasah.co.za/", creator: { "@id": ORG_ID } } },
            ],
          },
        },
        crumbs("Portfolio", "/portfolio"),
      ),
    ],
  },
  {
    path: "/contact",
    title: "Contact: Get a Website Quote | The Digital Pantry",
    description:
      "Email thedigitalpantryza@gmail.com for a quote or a free mock-up of your website, or use the enquiry form. Cape Town, South Africa.",
    jsonLd: [
      graph(
        { "@type": "ContactPage", name: "Contact The Digital Pantry", url: `${SITE_URL}/contact`, about: { "@id": ORG_ID } },
        {
          ...business,
          contactPoint: { "@type": "ContactPoint", contactType: "sales", email: EMAIL, availableLanguage: "English", areaServed: "ZA" },
        },
        crumbs("Contact", "/contact"),
      ),
    ],
  },
  {
    path: "/privacy",
    title: "Privacy Notice (POPIA) | The Digital Pantry",
    description:
      "How The Digital Pantry collects, uses and protects personal information under South Africa's POPIA, and how to contact us about your rights.",
    jsonLd: [graph(crumbs("Privacy Notice", "/privacy"))],
  },
  industryPage(
    FOOD,
    "Websites for Food Businesses in Cape Town | Digital Pantry",
    "Websites for bakeries, pop-ups, home kitchens and takeaways in Cape Town: your menu, where to find you and one-tap WhatsApp ordering. From R600.",
  ),
  industryPage(
    BEAUTY,
    "Websites for Nail Techs and Beauty Businesses in Cape Town | Digital Pantry",
    "Websites for nail techs, lash and brow studios and salons in Cape Town: services and prices, a gallery of your work and one clear way to book. From R600.",
  ),
  industryPage(
    PRODUCT_BRANDS,
    "Websites for Small Product Brands in South Africa | Digital Pantry",
    "Websites for small product brands: a catalogue of your products, your story and a clear way to buy, from WhatsApp orders to an online shop. From R600.",
  ),
  industryPage(
    TRADES,
    "Websites for Trades and Local Services in Cape Town | Digital Pantry",
    "Websites for plumbers, electricians, detailers, cleaners and other local services: your services, your area and quick quote requests. From R600.",
  ),
];

export const NOT_FOUND: PageMeta = {
  path: "/404",
  title: "Page not found | The Digital Pantry",
  description: "This page isn't in the pantry. Head back to the home page or get in touch.",
  noindex: true,
  jsonLd: [],
};

export function metaFor(path: string): PageMeta {
  const clean = path.replace(/\/+$/, "") || "/";
  return PAGES.find((p) => p.path === clean) ?? NOT_FOUND;
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The <head> tags for one page, as HTML. Used by the prerender script. */
export function headHtml(m: PageMeta): string {
  const url = m.noindex ? undefined : `${SITE_URL}${m.path === "/" ? "/" : m.path}`;
  const tags = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="${m.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}" />`,
    url ? `<link rel="canonical" href="${url}" />` : "",
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="en_ZA" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    url ? `<meta property="og:url" content="${url}" />` : "",
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="Aaniquah and Imaan at the Digital Pantry counter, with the line Coded in Pink. Built to Perform." />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    ...m.jsonLd.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, "\\u003c")}</script>`),
  ];
  return tags.filter(Boolean).join("\n    ");
}

/** Keeps the browser tab title and key tags right after client-side navigation. */
export function applyMeta(path: string) {
  const m = metaFor(path);
  document.title = m.title;
  const set = (sel: string, attr: string, val: string) => document.head.querySelector(sel)?.setAttribute(attr, val);
  set('meta[name="description"]', "content", m.description);
  set('meta[property="og:title"]', "content", m.title);
  set('meta[property="og:description"]', "content", m.description);
  set('meta[name="twitter:title"]', "content", m.title);
  set('meta[name="twitter:description"]', "content", m.description);
  if (!m.noindex) {
    const url = `${SITE_URL}${m.path === "/" ? "/" : m.path}`;
    set('link[rel="canonical"]', "href", url);
    set('meta[property="og:url"]', "content", url);
  }
}
