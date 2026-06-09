import { motion } from "framer-motion";
import { Link } from "wouter";
import { CutoutWord } from "../components/CutoutWord";
import { CTAButton } from "../components/CTAButton";
import { AnimatedSection } from "../components/AnimatedSection";
import { Ticker } from "../components/Ticker";
import { ExternalLink, Code2, Rocket, Palette } from "lucide-react";
const mascotImg = "/images/mascot.webp";
const aboutImg = "/images/about.webp";

const STACK_TAGS = ["React", "TypeScript", "Tailwind", "Netlify"];

const SERVICES = [
  {
    icon: Palette,
    title: "Design",
    desc: "Beautiful, mobile-first websites your customers will actually use.",
  },
  {
    icon: Code2,
    title: "Build",
    desc: "Clean code, fast loads, zero corporate fluff.",
  },
  {
    icon: Rocket,
    title: "Launch",
    desc: "Deployed, live, and ready to take orders from day one.",
  },
];

const PRICING_PREVIEW = [
  { label: "Starter", price: "R1 500", popular: false },
  { label: "Standard", price: "R2 500", popular: true },
  { label: "Premium", price: "R4 000", popular: false },
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="min-h-screen relative flex items-center bg-[#0A0A0A] grain-section pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D87]/6 via-transparent to-[#FFD700]/4 pointer-events-none" />

        {/* Decorative stars */}
        <span className="absolute top-32 right-16 text-[#FFD700]/20 text-7xl font-bebas select-none">★</span>
        <span className="absolute bottom-40 left-10 text-[#FF2D87]/15 text-5xl font-bebas select-none">★</span>
        <span className="absolute top-1/2 right-1/4 text-[#FFB3D1]/10 text-3xl font-bebas select-none">★</span>

        <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center py-16">
          {/* Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="order-2 md:order-1"
          >
            <motion.p
              variants={fadeUp}
              className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-6"
            >
              Cape Town Web Developer
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display font-black text-white leading-[1.05] mb-4"
              style={{ fontSize: "clamp(2.6rem, 6vw, 4.8rem)" }}
            >
              Coded in{" "}
              <CutoutWord word="PINK" baseSize="1em" />
              <br />
              Built to Perform.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body text-white/60 text-lg leading-relaxed mb-8 max-w-md"
            >
              Web development for South African small businesses that mean business.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <CTAButton href="/contact" data-testid="button-hero-cta">
                Let's Build Something ★
              </CTAButton>
              <CTAButton href="/portfolio" variant="outline" data-testid="button-hero-portfolio">
                See My Work
              </CTAButton>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["#FF2D87", "#FFD700", "#FFB3D1"].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#0A0A0A]"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <p className="font-body text-white/40 text-sm">
                Small business energy. Professional web presence.
              </p>
            </motion.div>
          </motion.div>

          {/* Mascot / Visual */}
          <div className="order-1 md:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="float-bob">
                <div className="relative w-72 h-72 md:w-[22rem] md:h-[22rem]">
                  {/* Glow ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF2D87]/25 to-[#FFD700]/15 blur-3xl" />

                  {/* Real mascot image */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={mascotImg}
                      alt="Digital Pantry mascot — pixel art girl coding at her desk"
                      className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,45,135,0.4)]"
                    />
                  </div>

                  {/* Badge */}
                  <div className="absolute -top-3 -right-3 bg-[#FFD700] text-[#0A0A0A] text-xs font-mono-brand font-bold px-3 py-1 rounded-full shadow-lg">
                    Engineering Diva ★
                  </div>

                  {/* Floating code tag */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
                    className="absolute -bottom-4 -left-4 bg-[#0A0A0A] border border-[#FF2D87]/30 rounded-xl px-3 py-2 shadow-xl"
                  >
                    <p className="font-mono-brand text-[#FF2D87] text-xs">const site = </p>
                    <p className="font-mono-brand text-[#FFD700] text-xs">{"  ✨ perfection"}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Ticker ─────────────────────────────────── */}
      <Ticker />

      {/* ── What I Do ──────────────────────────────── */}
      <section className="bg-[#0f0a0d] grain-section py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-3">
              Services
            </p>
            <h2 className="font-display font-black text-white text-4xl md:text-5xl">
              What I Do <span className="text-[#FFD700]">★</span>
            </h2>
          </AnimatedSection>

          <motion.div
            className="grid md:grid-cols-3 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            {SERVICES.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group bg-[#0A0A0A] border border-white/8 hover:border-[#FF2D87]/40 rounded-2xl p-8 transition-all duration-300 cursor-default"
              >
                <div className="w-12 h-12 bg-[#FF2D87]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#FF2D87]/20 transition-colors">
                  <s.icon size={22} className="text-[#FF2D87]" />
                </div>
                <h3 className="font-display font-bold text-white text-2xl mb-3">
                  <span className="text-[#FFD700]">★</span> {s.title}
                </h3>
                <p className="font-body text-white/55 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Portfolio Preview ───────────────────────── */}
      <section className="bg-[#0A0A0A] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-2">
                Portfolio
              </p>
              <h2 className="font-display font-black text-white text-4xl md:text-5xl">
                Recent{" "}
                <CutoutWord word="WORK" baseSize="0.9em" />
              </h2>
            </div>
            <Link href="/portfolio">
              <span className="font-body text-[#FF2D87] hover:text-[#FFD700] transition-colors font-semibold cursor-pointer">
                See All Work ★ →
              </span>
            </Link>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Featured project */}
            <AnimatedSection delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-[#0f0a0d] border border-white/8 hover:border-[#FF2D87]/40 rounded-2xl overflow-hidden transition-all duration-300 group"
              >
                {/* Image placeholder */}
                <div className="h-52 bg-gradient-to-br from-[#1a0510] to-[#0A0A0A] relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">🥯</div>
                      <p className="font-bebas text-[#FF2D87] text-2xl tracking-widest">STUFF'D BAGELS</p>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-[#FF2D87] text-white text-xs font-mono-brand px-2 py-1 rounded-full">
                    ★ Live Project
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-display font-bold text-white text-xl">
                      STUFF'D Bagels <span className="text-[#FFD700]">★</span>
                    </h3>
                    <a
                      href="https://stuffdbagels.netlify.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/30 hover:text-[#FF2D87] transition-colors"
                      data-testid="link-stuffd-live"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="font-mono-brand text-[#FF2D87] text-xs tracking-wider mb-4">
                    Food & Beverage / Pop-Up
                  </p>
                  <div className="space-y-2 mb-5">
                    <div>
                      <span className="font-mono-brand text-white/30 text-xs uppercase">Problem: </span>
                      <span className="font-body text-white/60 text-sm">
                        Customers had to hunt for a WhatsApp number and scroll social media to place orders.
                      </span>
                    </div>
                    <div>
                      <span className="font-mono-brand text-white/30 text-xs uppercase">Solution: </span>
                      <span className="font-body text-white/60 text-sm">
                        Single-page ordering site with menu, schedule and one-tap WhatsApp ordering.
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {STACK_TAGS.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono-brand text-xs text-[#FF2D87] bg-[#FF2D87]/10 border border-[#FF2D87]/20 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>

            {/* Coming Soon */}
            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-[#0f0a0d] border border-white/5 rounded-2xl overflow-hidden h-full min-h-64 flex items-center justify-center transition-all duration-300"
              >
                <div className="text-center p-8">
                  <div className="text-5xl mb-4 opacity-30">★</div>
                  <p className="font-display font-bold text-white/25 text-2xl mb-2">
                    Coming Soon
                  </p>
                  <p className="font-body text-white/20 text-sm">
                    More projects in the works
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Pricing Preview ─────────────────────────── */}
      <section className="bg-[#0f0a0d] grain-section py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-2">
              Investment
            </p>
            <h2 className="font-display font-black text-white text-4xl md:text-5xl mb-3">
              <CutoutWord word="PRICING" baseSize="0.85em" />
            </h2>
            <p className="font-body text-white/50">Straightforward. No hidden fees. Built from scratch.</p>
          </AnimatedSection>

          <motion.div
            className="grid md:grid-cols-3 gap-4 mb-8"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {PRICING_PREVIEW.map((tier) => (
              <motion.div
                key={tier.label}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className={`rounded-2xl p-6 text-center transition-all duration-300 relative ${
                  tier.popular
                    ? "bg-[#FF2D87] border-2 border-[#FF2D87] pink-glow"
                    : "bg-[#0A0A0A] border border-white/8 hover:border-[#FF2D87]/30"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#0A0A0A] text-xs font-mono-brand font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Most Popular ★
                  </div>
                )}
                <p className={`font-mono-brand text-xs tracking-widest uppercase mb-3 ${tier.popular ? "text-white/70" : "text-white/40"}`}>
                  {tier.label}
                </p>
                <p className={`font-display font-black text-3xl ${tier.popular ? "text-white" : "text-white"}`}>
                  {tier.price}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection className="text-center">
            <Link href="/pricing">
              <motion.span
                data-testid="button-pricing-preview-cta"
                className="inline-block font-body font-semibold text-[#FF2D87] hover:text-[#FFD700] transition-colors cursor-pointer"
                whileHover={{ scale: 1.04 }}
              >
                See Full Packages →
              </motion.span>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── About Strip ─────────────────────────────── */}
      <section className="bg-[#0A0A0A] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="relative max-w-sm mx-auto">
                <img
                  src={aboutImg}
                  alt="Pink hard hat with 'About us' ransom note lettering — Engineering Diva"
                  className="w-full object-contain drop-shadow-[0_0_50px_rgba(255,45,135,0.45)]"
                />
                <div className="absolute top-4 right-4 bg-[#FFD700] text-[#0A0A0A] text-xs font-mono-brand font-bold px-3 py-1.5 rounded-full shadow-lg">
                  ★ Available for projects
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-4">
                About
              </p>
              <h2 className="font-display font-black text-white leading-tight mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
                <CutoutWord word="Engineering" baseSize="0.85em" />
                <br />
                <CutoutWord word="Diva" baseSize="0.85em" />
              </h2>
              <p className="font-body text-white/60 text-lg leading-relaxed mb-4">
                Cape Town born.
              </p>
              <p className="font-body text-white/60 leading-relaxed mb-8">
                Building websites for businesses that don't have time to wait. No code knowledge needed — that's literally my job.
              </p>
              <CTAButton href="/contact" data-testid="button-about-cta">
                Work With Me ★
              </CTAButton>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
