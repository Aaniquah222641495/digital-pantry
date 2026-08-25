import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { AnimatedSection } from "../components/AnimatedSection";
import { CTAButton } from "../components/CTAButton";

const PLANS = [
  {
    name: "Starter", price: "R600", popular: false, cta: "Get Started ★",
    img: "/images/starter.webp",
    features: ["Single page","Menu section","WhatsApp button","Mobile responsive"],
  },
  {
    name: "Standard", price: "R1 000", popular: true, cta: "Most Popular ★",
    img: "/images/standard.webp",
    features: ["Everything in Starter","Locations section","About section","Social links"],
  },
  {
    name: "Premium", price: "R1 600", popular: false, cta: "Go Premium ★",
    img: "/images/premium.webp",
    features: ["Everything in Standard","Custom domain setup","Google Business setup","Basic SEO setup","1 month of updates"],
  },
];

const FAQ_ITEMS = [
  { question: "Do I need to know how to code?",  answer: "No! That's literally my job. You handle the business, I handle the website.", side: "left"  },
  { question: "Do I keep my WhatsApp number?",   answer: "Yes! We just add a click-to-WhatsApp button on your site. Easy.",             side: "right" },
  { question: "How long does it take?",           answer: "Most projects are done within 5 to 7 business days.",                         side: "left"  },
  { question: "What if I need changes later?",   answer: "That's what the R120/month retainer is for. Small edits, big peace of mind.", side: "right" },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

export default function Pricing() {
  return (
    <main className="pt-20">
      {/* ── Header ───────────────────────────────────── */}
      <section className="bg-[#FFF8FB] dark:bg-[#0A0A0A] grain-section py-16 md:py-20 relative overflow-hidden transition-colors duration-300">
        <span className="grain-deco top-10 right-8 text-[#FFD700]/8 text-[8rem] md:text-[12rem] font-bebas leading-none select-none pointer-events-none">★</span>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <AnimatedSection className="flex-1">
              <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-4">Investment</p>
              <h1 className="font-display font-black text-gray-900 dark:text-white leading-tight" style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}>
                <CutoutWord word="PRICING" /> <span className="text-[#FFD700]">★</span>
              </h1>
              <p className="font-body text-gray-500 dark:text-white/50 text-base md:text-lg mt-4 max-w-xl">
                Pick your package. We'll stock the shelves.
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right" className="flex-shrink-0">
              <img
                src="/images/pricing.webp"
                alt=""
                className="w-56 md:w-72 mr-4 md:mr-16 object-contain drop-shadow-[0_0_30px_rgba(255,45,135,0.25)]"
                loading="eager"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Pricing Cards ────────────────────────────── */}
      <section className="bg-[#FFF0F5] dark:bg-[#0f0a0d] py-16 md:py-20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {PLANS.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className={`rounded-2xl p-6 md:p-7 relative flex flex-col transition-all duration-300 ${
                  plan.popular
                    ? "bg-[#FF2D87] border-2 border-[#FF2D87] pink-glow"
                    : "bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/8 hover:border-[#FF2D87]/30 shadow-sm dark:shadow-none"
                }`}
                data-testid={`card-pricing-${plan.name.toLowerCase()}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#0A0A0A] text-xs font-mono-brand font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                    Most Popular ★
                  </div>
                )}

                {/* Tier image */}
                <div className="w-full h-36 mb-5 flex items-center justify-center">
                  <img
                    src={plan.img}
                    alt={`${plan.name} package`}
                    className="h-full w-auto object-contain drop-shadow-[0_4px_16px_rgba(255,45,135,0.25)]"
                    loading="lazy"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                </div>

                <div className="mb-6">
                  <p className={`font-mono-brand text-xs tracking-[0.2em] uppercase mb-3 ${plan.popular ? "text-white/70" : "text-gray-400 dark:text-white/40"}`}>{plan.name}</p>
                  <p className={`font-display font-black leading-none ${plan.popular ? "text-white" : "text-gray-900 dark:text-white"}`} style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
                    {plan.price}
                  </p>
                  <p className={`font-body text-sm mt-1 ${plan.popular ? "text-white/60" : "text-gray-400 dark:text-white/35"}`}>once-off</p>
                </div>

                <ul className="space-y-3 flex-1 mb-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check size={16} className={`mt-0.5 shrink-0 ${plan.popular ? "text-white" : "text-[#FF2D87]"}`} />
                      <span className={`font-body text-sm ${plan.popular ? "text-white/85" : "text-gray-600 dark:text-white/60"}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <CTAButton href="/contact" variant={plan.popular ? "ghost" : "outline"} className="w-full justify-center" data-testid={`button-pricing-${plan.name.toLowerCase()}`}>
                  {plan.cta}
                </CTAButton>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Retainer ─────────────────────────────────── */}
      <section className="bg-[#FFF8FB] dark:bg-[#0A0A0A] py-14 md:py-16 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white dark:bg-gradient-to-r dark:from-[#1a0a0f] dark:to-[#0f0a0d] border border-[#FFD700]/30 rounded-2xl p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-7 md:gap-8 shadow-sm dark:shadow-none"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#FFD700] text-2xl">★</span>
                  <p className="font-mono-brand text-[#FFD700] text-xs tracking-[0.2em] uppercase">Keep Your Pantry Stocked ★</p>
                </div>
                <p className="font-display font-black text-gray-900 dark:text-white text-4xl mb-2">
                  R120<span className="font-body font-normal text-gray-400 dark:text-white/40 text-lg">/month</span>
                </p>
                <p className="font-body text-gray-500 dark:text-white/50 text-sm leading-relaxed">Menu updates. Schedule changes. Small edits. Always fresh.</p>
              </div>
              <div className="flex-1 w-full">
                <ul className="space-y-2.5 mb-5">
                  {["Menu updates","Schedule changes","Small edits","Always fresh"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="text-[#FFD700] text-xs">★</span>
                      <span className="font-body text-gray-600 dark:text-white/65 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <CTAButton href="/contact" variant="outline" data-testid="button-retainer-cta">Add Retainer ★</CTAButton>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── iMessage FAQ ─────────────────────────────── */}
      <section className="bg-[#FFF0F5] dark:bg-[#0f0a0d] grain-section py-16 md:py-20 transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-10 md:mb-12">
            <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-2">FAQ</p>
            <h2 className="font-display font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl">
              Got questions? Let me dish it out. <span className="text-[#FFD700]">★</span>
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`flex flex-col gap-2 ${item.side === "right" ? "items-end" : "items-start"}`}>
                  {/* Customer question: always grey/white bubble */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`max-w-[85%] rounded-2xl px-4 md:px-5 py-3 md:py-3.5 text-sm bg-white dark:bg-[#1c1c1e] text-gray-800 dark:text-white border border-gray-200 dark:border-white/8 shadow-sm dark:shadow-none ${
                      item.side === "right" ? "rounded-tr-sm" : "rounded-tl-sm"
                    }`}
                  >
                    <p className="font-body leading-relaxed">{item.question}</p>
                  </motion.div>
                  {/* Aaniquah's answer: always pink bubble, opposite side */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`max-w-[85%] rounded-2xl px-4 md:px-5 py-3 md:py-3.5 text-sm bg-[#FF2D87] text-white ${
                      item.side === "right" ? "rounded-tl-sm self-start" : "rounded-tr-sm self-end"
                    }`}
                  >
                    <p className="font-body leading-relaxed">{item.answer}</p>
                  </motion.div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────── */}
      <section className="bg-[#FFF8FB] dark:bg-[#0A0A0A] py-16 md:py-20 text-center transition-colors duration-300">
        <AnimatedSection>
          <h2 className="font-display font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl mb-3">
            Ready to get <span className="text-[#FF2D87]">built</span>?
          </h2>
          <p className="font-body text-gray-500 dark:text-white/50 mb-8 max-w-md mx-auto px-4 text-sm md:text-base">
            Your business, beautifully built. No code knowledge needed, because that's literally my job.
          </p>
          <CTAButton href="/contact" data-testid="button-pricing-bottom-cta">Let's Build Something ★</CTAButton>
        </AnimatedSection>
      </section>
    </main>
  );
}
