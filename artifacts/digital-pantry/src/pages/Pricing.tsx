import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { AnimatedSection } from "../components/AnimatedSection";
import { CTAButton } from "../components/CTAButton";

const PLANS = [
  {
    name: "Starter",
    price: "R1 500",
    features: [
      "Single page",
      "Menu section",
      "WhatsApp button",
      "Mobile responsive",
    ],
    popular: false,
    cta: "Get Started ★",
  },
  {
    name: "Standard",
    price: "R2 500",
    features: [
      "Everything in Starter",
      "Locations section",
      "About section",
      "Social links",
    ],
    popular: true,
    cta: "Most Popular ★",
  },
  {
    name: "Premium",
    price: "R4 000",
    features: [
      "Everything in Standard",
      "Custom domain setup",
      "Google Business setup",
      "Basic SEO setup",
      "1 month of updates",
    ],
    popular: false,
    cta: "Go Premium ★",
  },
];

const FAQ_ITEMS = [
  {
    question: "Do I need to know how to code?",
    answer: "No! That's literally my job. You handle the business, I handle the website.",
    side: "left",
  },
  {
    question: "Do I keep my WhatsApp number?",
    answer: "Yes! We just add a click-to-WhatsApp button on your site. Easy.",
    side: "right",
  },
  {
    question: "How long does it take?",
    answer: "Most projects are done within 5–7 business days.",
    side: "left",
  },
  {
    question: "What if I need changes later?",
    answer: "That's what the R300/month retainer is for. Small edits, big peace of mind.",
    side: "right",
  },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Pricing() {
  return (
    <main className="pt-20">
      {/* ── Header ───────────────────────────────────── */}
      <section className="bg-[#0A0A0A] grain-section py-20 relative overflow-hidden">
        <span className="absolute top-10 right-10 text-[#FFD700]/8 text-[12rem] font-bebas leading-none select-none pointer-events-none">★</span>
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-4">
              Investment
            </p>
            <h1 className="font-display font-black text-white leading-tight" style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
              <CutoutWord word="PRICING" /> <span className="text-[#FFD700]">★</span>
            </h1>
            <p className="font-body text-white/50 text-lg mt-4 max-w-lg">
              Straightforward. No hidden fees. No corporate fluff.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Pricing Cards ────────────────────────────── */}
      <section className="bg-[#0f0a0d] py-20">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {PLANS.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className={`rounded-2xl p-7 relative flex flex-col transition-all duration-300 ${
                  plan.popular
                    ? "bg-[#FF2D87] border-2 border-[#FF2D87] pink-glow"
                    : "bg-[#0A0A0A] border border-white/8 hover:border-[#FF2D87]/30"
                }`}
                data-testid={`card-pricing-${plan.name.toLowerCase()}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#0A0A0A] text-xs font-mono-brand font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-lg">
                    Most Popular ★
                  </div>
                )}

                <div className="mb-6">
                  <p className={`font-mono-brand text-xs tracking-[0.2em] uppercase mb-3 ${plan.popular ? "text-white/70" : "text-white/40"}`}>
                    {plan.name}
                  </p>
                  <p className={`font-display font-black leading-none ${plan.popular ? "text-white" : "text-white"}`} style={{ fontSize: "clamp(2.2rem, 5vw, 3rem)" }}>
                    {plan.price}
                  </p>
                  <p className={`font-body text-sm mt-1 ${plan.popular ? "text-white/60" : "text-white/35"}`}>
                    once-off
                  </p>
                </div>

                <ul className="space-y-3 flex-1 mb-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check
                        size={16}
                        className={`mt-0.5 shrink-0 ${plan.popular ? "text-white" : "text-[#FF2D87]"}`}
                      />
                      <span className={`font-body text-sm ${plan.popular ? "text-white/85" : "text-white/60"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <CTAButton
                  href="/contact"
                  variant={plan.popular ? "ghost" : "outline"}
                  className="w-full justify-center"
                  data-testid={`button-pricing-${plan.name.toLowerCase()}`}
                >
                  {plan.cta}
                </CTAButton>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Retainer ─────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-16">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-r from-[#1a0a0f] to-[#0f0a0d] border border-[#FFD700]/25 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#FFD700] text-2xl">★</span>
                  <p className="font-mono-brand text-[#FFD700] text-xs tracking-[0.2em] uppercase">
                    Monthly Retainer
                  </p>
                </div>
                <p className="font-display font-black text-white text-4xl mb-2">
                  R300
                  <span className="font-body font-normal text-white/40 text-lg">/month</span>
                </p>
                <p className="font-body text-white/50 text-sm leading-relaxed">
                  Keep your site fresh without lifting a finger.
                </p>
              </div>
              <div className="flex-1">
                <ul className="space-y-2.5">
                  {["Menu updates", "Schedule updates", "Small edits"].map((item) => (
                    <li key={item} className="flex items-center gap-2.5">
                      <span className="text-[#FFD700] text-xs">★</span>
                      <span className="font-body text-white/65 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <CTAButton href="/contact" variant="outline" className="mt-5" data-testid="button-retainer-cta">
                  Add Retainer ★
                </CTAButton>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── iMessage FAQ ─────────────────────────────── */}
      <section className="bg-[#0f0a0d] grain-section py-20">
        <div className="max-w-2xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-2">
              FAQ
            </p>
            <h2 className="font-display font-black text-white text-4xl md:text-5xl">
              Got questions? <span className="text-[#FFD700]">★</span>
            </h2>
          </AnimatedSection>

          {/* iMessage-style bubbles */}
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className={`flex flex-col gap-2 ${item.side === "right" ? "items-end" : "items-start"}`}>
                  {/* Question bubble */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`max-w-[80%] rounded-2xl px-5 py-3.5 ${
                      item.side === "right"
                        ? "rounded-tr-sm bg-[#FF2D87] text-white"
                        : "rounded-tl-sm bg-[#1c1c1e] text-white border border-white/8"
                    }`}
                  >
                    <p className="font-body text-sm leading-relaxed">{item.question}</p>
                  </motion.div>

                  {/* Answer bubble - opposite side */}
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className={`max-w-[80%] rounded-2xl px-5 py-3.5 ${
                      item.side === "right"
                        ? "rounded-tl-sm bg-[#1c1c1e] text-white border border-white/8 self-start"
                        : "rounded-tr-sm bg-[#FF2D87] text-white self-end"
                    }`}
                  >
                    <p className="font-body text-sm leading-relaxed">{item.answer}</p>
                  </motion.div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-20 text-center">
        <AnimatedSection>
          <h2 className="font-display font-black text-white text-4xl md:text-5xl mb-3">
            Ready to get <span className="text-[#FF2D87]">built</span>?
          </h2>
          <p className="font-body text-white/50 mb-8 max-w-md mx-auto">
            Your business, beautifully built. No code knowledge needed — that's literally my job.
          </p>
          <CTAButton href="/contact" data-testid="button-pricing-bottom-cta">
            Let's Build Something ★
          </CTAButton>
        </AnimatedSection>
      </section>
    </main>
  );
}
