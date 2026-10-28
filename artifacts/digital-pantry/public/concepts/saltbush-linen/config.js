/* Saltbush & Linen: a concept mock-up for the Digital Pantry portfolio. Fictional business, sample photos (Pexels), sample prices. */
window.MOCKUP = {
  name: "Saltbush & Linen",
  scriptWord: "Saltbush",
  tagline: "Southern suburbs, Cape Town",
  badge: "Concept design",
  intro: "Browse the treatment menu at any hour, then request the day and time that suit you.",
  bannerNote: "Concept design by Digital Pantry. Not a real business. Photos, treatments and prices are samples.",
  cta: {
    title: "Ready to book?",
    text: "Browse at any hour, then send your request in one message.",
    points: ["Request at any hour", "Confirmed on WhatsApp", "Open Saturdays", "Open late on Wednesdays"],
    button: "Request a booking"
  },
  why: {
    title: "Why book with Saltbush & Linen",
    intro: "A few plain facts about the studio and how booking works.",
    points: [
      { title: "Request a booking at any hour", text: "Your request goes to us on WhatsApp, and we confirm your time." },
      { title: "Open Wednesday evenings and Saturdays", text: "Wednesday until 19:00. Saturday 09:00 to 14:00." },
      { title: "Treatments and prices upfront", text: "Every treatment, duration and price is on the menu." }
    ],
    button: "Request a booking"
  },
  insights: {
    title: "Our Latest Insights",
    note: "Sample cards for now.",
    chip: "Sample article",
    more: "Read more",
    sample: "Sample article.",
    items: [
      { title: "Gel nail aftercare: what to do at home", image: { src: "images/insight-nail-polish-hands.jpg", alt: "Sample photo: hands holding a small bottle of glitter nail polish", w: 1000, h: 857, pos: "50% 70%" } },
      { title: "What is a dermaplaning facial?", image: { src: "images/insight-facial-serum.jpg", alt: "Sample photo: a woman lying back with her eyes closed while a serum is brushed onto her face", w: 1000, h: 857, pos: "50% 45%" } },
      { title: "Lash lift or brow lamination: which one?", image: { src: "images/brows-shaping-closeup.jpg", alt: "Sample photo: close-up of eyebrows being shaped with a brush and tweezers", w: 1000, h: 1250, pos: "50% 36%" } }
    ]
  },
  colours: {
    primary: "#1F4A42", accent: "#E0A98F", ink: "#18302B", bg: "#FAF7F2", soft: "#EDE8DF",
    script: "#2F5D50", gold: "#6C5120", "gold-line": "#B9935A", star: "#8F6B2E", blush: "#F1E2D8"
  },
  headingFont: "serif",
  typeset: "A",
  phone: "000 000 0000",
  whatsapp: "27000000000",
  email: "",
  socials: [],
  waMessage: "Hi Saltbush & Linen, I have a question please.",
  images: {
    hero:  { src: "images/hero-facial-treatment.jpg", alt: "Sample photo: a woman resting with her eyes closed while a therapist brushes a facial mask onto her face", w: 1000, h: 1250, pos: "45% 30%", posPhone: "40% 28%" },
    why1:  { src: "images/gallery-foot-care.jpg", alt: "Sample photo: a therapist's hands holding a client's foot during a foot treatment", w: 800, h: 1000 },
    why2:  { src: "images/gallery-brow-treatment.jpg", alt: "Sample photo: a woman resting with her eyes closed while her eyebrows are shaped", w: 1000, h: 1250 },
    why3:  { src: "images/why-facial-massage.jpg", alt: "Sample photo: a woman lying back with her eyes closed during a facial massage", w: 1000, h: 625 },
    cta:   { src: "images/cta-therapist-treatment.jpg", alt: "Sample photo: a therapist holding a mirror for a client who is wearing a face mask", w: 1000, h: 750 },
    faq:   { src: "images/faq-portrait-robe.jpg", alt: "Sample photo: a smiling woman in a white robe with a towel wrapped around her hair", w: 800, h: 1100 },
    about: { src: "images/about-therapist-facial.jpg", alt: "Sample photo: a smiling therapist in a white tunic cleansing a client's face", w: 1000, h: 1250 }
  },
  heroFloral: false,
  area: "Cape Town southern suburbs",
  addressNote: "Sample location",
  hours: [
    { days: "Monday",    time: "09:00 to 17:00" },
    { days: "Tuesday",   time: "09:00 to 17:00" },
    { days: "Wednesday", time: "09:00 to 19:00" },
    { days: "Thursday",  time: "09:00 to 17:00" },
    { days: "Friday",    time: "09:00 to 16:00" },
    { days: "Saturday",  time: "09:00 to 14:00" },
    { days: "Sunday",    time: "Closed" }
  ],
  hoursNote: "Sample hours",
  booking: {
    title: "Request a booking",
    text: "Choose a treatment, a day and a time. Your request opens in WhatsApp, already written.",
    note: "Sample booking flow.",
    confirmNote: "We'll confirm your time on WhatsApp.",
    message: "Hi, I'd like to book: {treatment} on {date} at {time}. Is that available?",
    step: 30,
    hours: { mon: ["09:00", "17:00"], tue: ["09:00", "17:00"], wed: ["09:00", "19:00"], thu: ["09:00", "17:00"], fri: ["09:00", "16:00"], sat: ["09:00", "14:00"], sun: null }
  },
  reviews: { title: "", items: [] },
  servicesNote: "Sample treatments and prices.",
  servicesHint: "Choose a category, then tap a treatment to see it and request it.",
  services: [
    { title: "Signature Facials", short: "Signature Facials", card: "Signature Facials", image: { src: "images/facial-sheet-mask.jpg", alt: "Sample photo: a woman resting with a white sheet mask on her face during a facial", w: 800, h: 1000, pos: "50% 40%" }, items: [
      { name: "Calming Facial", extra: "75 mins", price: "R690", desc: "A gentle cleanse, mask and massage" },
      { name: "Deep Renewal Facial", extra: "100 mins", price: "R890", desc: "Exfoliation and a nourishing mask" },
      { name: "Dermaplaning Facial", extra: "60 mins", price: "R720", desc: "Smooth skin and a soft glow" }
    ] },
    { title: "Glow Facials", short: "Glow Facials", card: "Glow Facials", image: { src: "images/facial-massage-hands.jpg", alt: "Sample photo: a therapist's hands giving a gentle facial massage", w: 1000, h: 1250, pos: "50% 45%" }, items: [
      { name: "Express Cleanse Facial", extra: "45 mins", price: "R480" },
      { name: "Hydrating Facial", extra: "60 mins", price: "R620" },
      { name: "Facial with LED mask", extra: "75 mins", price: "R750" }
    ] },
    { title: "Hands and Feet", short: "Hands and Feet", image: { src: "images/hands-manicure-polish.jpg", alt: "Sample photo: a manicurist painting a client's nails with polish", w: 1000, h: 1250, pos: "50% 50%" }, items: [
      { name: "Full pedicure", extra: "75 mins", price: "R340" },
      { name: "Express pedicure", extra: "40 mins", price: "R240" },
      { name: "Full manicure", extra: "60 mins", price: "R300" },
      { name: "Express manicure", extra: "40 mins", price: "R210" }
    ] },
    { title: "Gel Nails", short: "Gel Nails", image: { src: "images/gel-nails-curing.jpg", alt: "Sample photo: a hand resting under a white lamp that cures gel nail polish", w: 1000, h: 1250, pos: "50% 45%" }, items: [
      { name: "Gel manicure", price: "R360" },
      { name: "Gel pedicure", price: "R440" },
      { name: "Gel removal and new set", price: "R400" },
      { name: "Gel removal only", price: "R150" }
    ] },
    { title: "Waxing", short: "Waxing", image: { src: "images/waxing-leg-strip.jpg", alt: "Sample photo: a wax strip being applied to a leg", w: 1000, h: 1250, pos: "50% 55%" }, items: [
      { name: "Lip, brow or chin (each)", price: "R90" },
      { name: "Underarm", price: "R120" },
      { name: "Full arm", price: "R150" },
      { name: "Half leg", price: "R210" },
      { name: "Full leg", price: "R240" },
      { name: "Bikini line", price: "R140" },
      { name: "Brazilian", price: "R280" }
    ] },
    { title: "Lashes and Brows", short: "Lashes and Brows", image: { src: "images/lashes-treatment.jpg", alt: "Sample photo: a therapist placing a pad under a client's closed eye before a lash treatment", w: 1000, h: 1250, pos: "60% 70%", posPhone: "78% 72%" }, items: [
      { name: "Lash lift and tint", price: "R400" },
      { name: "Brow lamination and tint", price: "R380" },
      { name: "Lash lift and brow lamination", price: "R680" },
      { name: "Lash tint", price: "R90" },
      { name: "Brow tint", price: "R80" }
    ] }
  ],
  faq: {
    title: "Questions, answered",
    note: "The questions clients ask most.",
    items: [
      { q: "How do I book a treatment?", a: "Browse the treatment menu, choose a treatment, then pick a day and a time. WhatsApp opens with your request already written, and we confirm your time with you there." },
      { q: "Can I send a request outside opening hours?", a: "Yes. You can browse and send a request at any hour. The times offered follow our opening hours, and we reply to confirm." },
      { q: "Which treatments do you offer?", a: "Facials, hands and feet, gel nails, waxing, and lashes and brows. Every treatment, duration and price is on the menu above." },
      { q: "When are you open?", a: "Opening hours are listed {link}.", link: { text: "further down this page", href: "#hours" } },
      { q: "What is your cancellation policy?", a: "Your own wording goes here.", placeholder: true }
    ]
  },
  aboutLabel: "About Saltbush & Linen",
  aboutTitle: "A calm studio in the southern suburbs",
  aboutPhotoNote: "Sample photo",
  aboutButton: "See treatments",
  about: [
    "Saltbush & Linen is a concept for a beauty studio offering facials, nails, waxing, lashes and brows.",
    "Your story goes here: who you are, how long you have been doing this, and what a visit is like."
  ]
};

// Picks the type option before any font is requested (kept here, not inline, for the studio site CSP).
document.documentElement.setAttribute("data-typeset", String((window.MOCKUP || {}).typeset || "A").toLowerCase());
