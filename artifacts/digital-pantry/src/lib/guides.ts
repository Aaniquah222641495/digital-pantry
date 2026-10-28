// Content for the four industry pages (food, product brands, nails and beauty, trades and local services).
// The pages and src/seo.ts (FAQPage structured data) both read from here, so the questions and
// answers Google sees always match the page word for word. Only state facts that are already on
// the site or in a dated, sourced brief (ops/research/2026-10-23-pricing-tiers-and-international.md).

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
    /** The live site, or for a concept design its clickable build under /concepts/. */
    href?: string;
    /** True for our own concept designs. The page then says so, and the link reads "Try the concept". */
    concept?: boolean;
    desktop: string;
    phone: string;
    rows: [string, string][];
  };
  /** Price tokens such as {Starter} are filled for the visitor's market (priced() in plans.ts) */
  fit: string;
  faq: Faq[];
  /** Licensed stock photo for the hero (Pexels; credits in public/images/stock/CREDITS.md). Never presented as client work. */
  photo?: { src: string; alt: string; credit: string };
  /** Short card copy for the "What are you cooking up?" selector on Home */
  card: { title: string; body: string; tag: string; /** Stock photo for the card (Pexels, see CREDITS.md); decorative, the title carries the meaning */ image: string };
}

export const FOOD: Industry = {
  path: "/websites-for-food-businesses",
  label: "Websites for food businesses",
  heading: "Websites for food businesses in Cape Town",
  before: "Websites for",
  word: "FOOD",
  after: "businesses",
  intro: "Bakeries, pop-ups, home kitchens and takeaways. Customers find your menu, see where you are this week and order on WhatsApp in one tap.",
  needs: [
    { title: "Your menu, easy to read on a phone", body: "Prices and photos to scroll through. No PDF to download." },
    { title: "Where and when to find you", body: "Market days, pop-up spots and opening hours, kept up to date." },
    { title: "One-tap WhatsApp ordering", body: "Customers land in a chat with you. You keep your number." },
  ],
  proof: {
    name: "Stuff'd Bagels",
    kind: "Food pop-up, Cape Town",
    url: "stuffdbagels.netlify.app",
    // Our copy of the final, client-approved version, until stuffdbagels.co.za exists (founder 2026-10-28; public/work/).
    href: "/work/stuffd-bagels/",
    desktop: "/images/work/stuffd-desktop-v2.webp",
    phone: "/images/work/stuffd-phone-v2.webp",
    rows: [
      ["The need", "Customers had to hunt for a WhatsApp number and scroll social media to place an order."],
      ["What we built", "One mobile-first page with the menu, this week's pickup spots and an order form that sends the order to WhatsApp."],
    ],
  },
  fit: "Starter ({Starter}) is one page with your menu and a WhatsApp button, which is all many food businesses need. Premium ({Premium}) adds a Google Business Profile and basic SEO.",
  faq: [
    { q: "Can customers order without an online shop?", a: "Yes. The site sends them to your WhatsApp with one tap, so you take orders the way you already do." },
    { q: "Can you update my menu after launch?", a: "Yes. The optional {retainer}/month retainer covers menu updates, schedule changes and small edits." },
  ],
  photo: { src: "/images/stock/food-cafe-counter.webp", alt: "A café counter with an espresso machine, pendant lights and stools under a pink wall", credit: "Merve" },
  card: { title: "Food and drinks", body: "Menus, market days and one-tap WhatsApp orders.", tag: "Bakes, pop-ups, cafes", image: "/images/stock/food-cafe-counter.webp" },
};

// The next three have no live case study yet (PRD 3.3: only genuinely relevant work, no invented claims).
// Their pages show what we'd build and offer the free concept instead. Add `proof` when a real,
// permitted site exists. Nails and beauty shows our own concept design, labelled as one (founder 2026-10-27).

// Nails first (founder 2026-10-27); the URL stays /websites-for-beauty-businesses so nothing breaks.
export const BEAUTY: Industry = {
  path: "/websites-for-beauty-businesses",
  label: "Websites for nails and beauty",
  heading: "Websites for nail techs and beauty businesses in Cape Town",
  before: "Websites for",
  word: "NAILS",
  after: "and beauty",
  intro: "Nail techs, lash and brow studios, salons and home-based beauty businesses. Clients see your services and prices, your best work and how to book.",
  needs: [
    { title: "Services and prices, clearly listed", body: "Every treatment with its price, easy to read on a phone." },
    { title: "A gallery of your work", body: "Your own photos, so clients see your style before they book." },
    { title: "One clear way to book", body: "A WhatsApp button, or a link to the booking app you already use." },
  ],
  proof: {
    name: "Saltbush & Linen",
    kind: "Beauty studio, Cape Town (concept)",
    url: "concept design",
    href: "/concepts/saltbush-linen/",
    concept: true,
    desktop: "/images/work/concept-beauty-desktop.webp",
    phone: "/images/work/concept-beauty-phone.webp",
    rows: [
      ["The brief", "A calm website for a beauty studio: treatments, prices and an easy way to book."],
      ["What we designed", "A menu you tap through, and a booking request that opens in WhatsApp already written."],
    ],
  },
  fit: "Standard ({Standard}) covers your services, an about section, your location and social links. Premium ({Premium}) adds a Google Business Profile and basic SEO. Pro ({Pro}) adds an enquiry form that saves every lead to your Google Sheet and replies straight away.",
  faq: [
    { q: "Can clients book online?", a: "Yes. We can link the booking app you already use, or send clients to WhatsApp. A built-in booking setup is quoted on request." },
    { q: "Can I update my prices later?", a: "Yes. The optional {retainer}/month retainer covers price changes, new treatments and small edits." },
  ],
  photo: { src: "/images/stock/beauty-nail-care.webp", alt: "A nail technician in pink gloves filing a client's nails at a salon table", credit: "Larysa Stratiichuk" },
  card: { title: "Nails and beauty", body: "Services, prices, your best work and one way to book.", tag: "Nails, lashes, salons", image: "/images/stock/beauty-nail-care.webp" },
};

export const PRODUCT_BRANDS: Industry = {
  path: "/websites-for-product-brands",
  label: "Websites for product brands",
  heading: "Websites for small product brands in South Africa",
  before: "Websites for",
  word: "PRODUCT",
  after: "brands",
  intro: "Candles, skincare, clothing, crafts and other small product brands. Your story, your products shown properly and a clear way to buy.",
  needs: [
    { title: "Your products, shown properly", body: "A catalogue with your photos, prices and the details customers ask about." },
    { title: "A clear way to buy", body: "WhatsApp, an order form, or an online shop with payments, quoted separately." },
    { title: "Your story", body: "Who makes it, how and why, so customers remember you." },
  ],
  fit: "Standard ({Standard}) or Premium ({Premium}) suit a catalogue with WhatsApp ordering. An online shop with payments is quoted to your product range.",
  faq: [
    { q: "Do I need an online shop?", a: "Not always. Many small brands sell well with a catalogue and WhatsApp orders. If you want card payments and stock, we quote an online shop separately." },
    { q: "Who takes the product photos?", a: "You supply them. Photography is available on request." },
  ],
  photo: { src: "/images/stock/product-candles.webp", alt: "Handmade candles in glass jars on a wooden table, with spare wicks beside them", credit: "Anna Shvets" },
  card: { title: "Product brands", body: "A catalogue, your story and a clear way to buy.", tag: "Candles, skincare, crafts", image: "/images/stock/product-candles.webp" },
};

export const TRADES: Industry = {
  path: "/websites-for-trades-and-local-services",
  label: "Websites for trades and local services",
  heading: "Websites for trades and local services in Cape Town",
  before: "Websites for",
  word: "TRADES",
  after: "and local services",
  intro: "Plumbers, electricians, car washes, detailers, cleaners and other local services. Say what you do and where, show your work and get quote requests you can answer fast.",
  needs: [
    { title: "What you do and where", body: "Your services and the areas you cover, so the right customers call." },
    { title: "Proof of your work", body: "Photos of finished jobs and any accreditation you hold." },
    { title: "Quote requests that make sense", body: "A WhatsApp button, or on Pro a form that collects the job details and alerts you." },
  ],
  fit: "Starter ({Starter}) is one page with your services and a WhatsApp button. Premium ({Premium}) adds a Google Business Profile and basic SEO, which matter most for local searches. Pro ({Pro}) adds the quote-request form and instant alerts.",
  faq: [
    { q: "Will this get me to the top of Google?", a: "Nobody can promise that. We set up the basics properly: a Google Business Profile, clear service and area pages and fast loading, which give you a fair chance in local search." },
    { q: "Can customers send photos of the job?", a: "They can send them on WhatsApp straight from the site. A form with photo upload is quoted on request." },
  ],
  photo: { src: "/images/stock/trades-plumbing.webp", alt: "A plumber's hands tightening a pipe fitting under a counter", credit: "Anıl Karakaya" },
  card: { title: "Trades and local services", body: "Your services, your area and fast quote requests.", tag: "Plumbers, detailers, cleaners", image: "/images/stock/trades-plumbing.webp" },
};

export const INDUSTRIES = [FOOD, PRODUCT_BRANDS, BEAUTY, TRADES];
