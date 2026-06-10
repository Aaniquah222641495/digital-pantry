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
  { icon: Palette, title: "Design", desc: "Beautiful, mobile-first websites your customers will actually use." },
  { icon: Code2,   title: "Build",  desc: "Clean code, fast loads, zero corporate fluff." },
  { icon: Rocket,  title: "Launch", desc: "Deployed, live, and ready to take orders from day one." },
];

const PRICING_PREVIEW = [
  { label: "Starter",  price: "R1 500", popular: false },
  { label: "Standard", price: "R2 500", popular: true  },
  { label: "Premium",  price: "R4 000", popular: false },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

export default function Home() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="min-h-screen relative flex items-center bg-[#FFF8FB] dark:bg-[#0A0A0A] grain-section pt-20 transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF2D87]/5 via-transparent to-[#FFD700]/3 pointer-events-none" />
        <span className="grain-deco top-28 right-10 md:right-16 text-[#FFD700]/15 dark:text-[#FFD700]/20 text-6xl md:text-7xl font-bebas select-none pointer-events-none">★</span>
        <span className="grain-deco bottom-40 left-6 md:left-10 text-[#FF2D87]/10 dark:text-[#FF2D87]/15 text-5xl font-bebas select-none pointer-events-none">★</span>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full grid md:grid-cols-2 gap-10 md:gap-12 items-center py-12 md:py-16">
          {/* Text */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="order-2 md:order-1">
            <motion.p variants={fadeUp} className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-5">
              Cape Town Web Developer
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="font-display font-black text-gray-900 dark:text-white leading-[1.05] mb-4"
              style={{ fontSize: "clamp(2.2rem, 6vw, 4.8rem)" }}
            >
              Your website,
              <br />freshly <CutoutWord word="COOKED" baseSize="1em" /> ★
            </motion.h1>

            <motion.p variants={fadeUp} className="font-body text-gray-600 dark:text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              Web development for South African small businesses that mean business.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 md:gap-4">
              <CTAButton href="/contact" data-testid="button-hero-cta">Let's Get Cooking ★</CTAButton>
              <CTAButton href="/portfolio" variant="outline" data-testid="button-hero-portfolio">See My Work</CTAButton>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 md:mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {["#FF2D87","#FFD700","#FFB3D1"].map((c, i) => (
                  <div key={i} className="w-7 h-7 md:w-8 md:h-8 rounded-full border-2 border-[#FFF8FB] dark:border-[#0A0A0A]" style={{ backgroundColor: c }} />
                ))}
              </div>
              <p className="font-body text-gray-500 dark:text-white/40 text-sm">Small business energy. Professional web presence.</p>
            </motion.div>
          </motion.div>

          {/* Mascot */}
          <div className="order-1 md:order-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="float-bob">
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-[22rem] md:h-[22rem]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF2D87]/20 to-[#FFD700]/10 blur-3xl" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img
                      src={mascotImg}
                      alt="Digital Pantry mascot — pixel art girl coding at her desk"
                      className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(255,45,135,0.35)]"
                    />
                  </div>
                  <div className="absolute -top-3 -right-3 bg-[#FFD700] text-[#0A0A0A] text-xs font-mono-brand font-bold px-3 py-1 rounded-full shadow-lg whitespace-nowrap">
                    Engineering Diva ★
                  </div>
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
                    className="absolute -bottom-4 -left-2 sm:-left-4 bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-[#FF2D87]/30 rounded-xl px-3 py-2 shadow-xl"
                  >
                    <p className="font-mono-brand text-[#FF2D87] text-xs">const site =</p>
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
      <section className="bg-[#FFF0F5] dark:bg-[#0f0a0d] grain-section py-20 md:py-24 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-12 md:mb-16">
            <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-3">Services</p>
            <h2 className="font-display font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl">
              What I Do <span className="text-[#FFD700]">★</span>
            </h2>
          </AnimatedSection>

          <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            {SERVICES.map((s) => (
              <motion.div
                key={s.title}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/8 hover:border-[#FF2D87]/40 rounded-2xl p-7 md:p-8 transition-all duration-300 cursor-default shadow-sm dark:shadow-none"
              >
                <div className="w-11 h-11 bg-[#FF2D87]/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#FF2D87]/20 transition-colors">
                  <s.icon size={20} className="text-[#FF2D87]" />
                </div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-xl md:text-2xl mb-3">
                  <span className="text-[#FFD700]">★</span> {s.title}
                </h3>
                <p className="font-body text-gray-600 dark:text-white/55 leading-relaxed text-sm md:text-base">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Portfolio Preview ───────────────────────── */}
      <section className="bg-[#FFF8FB] dark:bg-[#0A0A0A] py-20 md:py-24 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="flex items-end justify-between mb-10 md:mb-12 flex-wrap gap-4">
            <div>
              <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-2">Portfolio</p>
              <h2 className="font-display font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl">
                Recent <CutoutWord word="WORK" baseSize="0.9em" />
              </h2>
            </div>
            <Link href="/portfolio">
              <span className="font-body text-[#FF2D87] hover:text-[#FFD700] transition-colors font-semibold cursor-pointer text-sm md:text-base">
                See All Work ★ →
              </span>
            </Link>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
            <AnimatedSection delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0f0a0d] border border-gray-200 dark:border-white/8 hover:border-[#FF2D87]/40 rounded-2xl overflow-hidden transition-all duration-300 group shadow-sm dark:shadow-none"
              >
                <div className="h-44 sm:h-52 bg-gradient-to-br from-pink-50 dark:from-[#1a0510] to-white dark:to-[#0A0A0A] relative overflow-hidden flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl md:text-6xl mb-2">🥯</div>
                    <p className="font-bebas text-[#FF2D87] text-xl md:text-2xl tracking-widest">STUFF'D BAGELS</p>
                  </div>
                  <div className="absolute top-3 left-3 bg-[#FF2D87] text-white text-xs font-mono-brand px-2 py-1 rounded-full">★ Live</div>
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg md:text-xl">
                      STUFF'D Bagels <span className="text-[#FFD700]">★</span>
                    </h3>
                    <a href="https://stuffdbagels.netlify.app" target="_blank" rel="noopener noreferrer" className="text-gray-400 dark:text-white/30 hover:text-[#FF2D87] transition-colors" data-testid="link-stuffd-live">
                      <ExternalLink size={16} />
                    </a>
                  </div>
                  <p className="font-mono-brand text-[#FF2D87] text-xs tracking-wider mb-4">Food & Beverage / Pop-Up</p>
                  <div className="space-y-2 mb-5 text-sm">
                    <div><span className="font-mono-brand text-gray-400 dark:text-white/30 text-xs uppercase">Problem: </span><span className="font-body text-gray-600 dark:text-white/60">Customers had to hunt for a WhatsApp number and scroll social media to place orders.</span></div>
                    <div><span className="font-mono-brand text-gray-400 dark:text-white/30 text-xs uppercase">Solution: </span><span className="font-body text-gray-600 dark:text-white/60">Single-page ordering site with menu, schedule and one-tap WhatsApp ordering.</span></div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {STACK_TAGS.map((tag) => (
                      <span key={tag} className="font-mono-brand text-xs text-[#FF2D87] bg-[#FF2D87]/10 border border-[#FF2D87]/20 px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-[#0f0a0d] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden h-full min-h-56 flex items-center justify-center transition-all duration-300 shadow-sm dark:shadow-none"
              >
                <div className="text-center p-8">
                  <div className="text-4xl mb-3 opacity-20 dark:opacity-30">★</div>
                  <p className="font-display font-bold text-gray-400 dark:text-white/25 text-xl md:text-2xl mb-2">Coming Soon</p>
                  <p className="font-body text-gray-400 dark:text-white/20 text-sm">More projects in the works</p>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Pricing Preview ─────────────────────────── */}
      <section className="bg-[#FFF0F5] dark:bg-[#0f0a0d] grain-section py-20 md:py-24 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="text-center mb-10 md:mb-12">
            <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-2">Investment</p>
            <h2 className="font-display font-black text-gray-900 dark:text-white text-3xl sm:text-4xl md:text-5xl mb-2">
              <CutoutWord word="PRICING" baseSize="0.85em" />
            </h2>
            <p className="font-body text-gray-500 dark:text-white/50 text-sm md:text-base">Straightforward. No hidden fees. Built from scratch.</p>
          </AnimatedSection>

          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {PRICING_PREVIEW.map((tier) => (
              <motion.div
                key={tier.label}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className={`rounded-2xl p-6 text-center transition-all duration-300 relative ${
                  tier.popular
                    ? "bg-[#FF2D87] border-2 border-[#FF2D87] pink-glow"
                    : "bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/8 hover:border-[#FF2D87]/30 shadow-sm dark:shadow-none"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFD700] text-[#0A0A0A] text-xs font-mono-brand font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Most Popular ★
                  </div>
                )}
                <p className={`font-mono-brand text-xs tracking-widest uppercase mb-3 ${tier.popular ? "text-white/70" : "text-gray-400 dark:text-white/40"}`}>{tier.label}</p>
                <p className={`font-display font-black text-2xl md:text-3xl ${tier.popular ? "text-white" : "text-gray-900 dark:text-white"}`}>{tier.price}</p>
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
      <section className="bg-[#FFF8FB] dark:bg-[#0A0A0A] py-20 md:py-24 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="relative max-w-xs sm:max-w-sm mx-auto md:mx-0">
                <img
                  src={aboutImg}
                  alt="Pink hard hat with 'About us' ransom note lettering — Engineering Diva"
                  className="w-full object-contain drop-shadow-[0_0_50px_rgba(255,45,135,0.35)]"
                />
                <div className="absolute top-4 right-4 bg-[#FFD700] text-[#0A0A0A] text-xs font-mono-brand font-bold px-3 py-1.5 rounded-full shadow-lg">
                  ★ Available for projects
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-4">About</p>
              <h2 className="font-display font-black text-gray-900 dark:text-white leading-tight mb-5" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                <CutoutWord word="Engineering" baseSize="0.85em" />
                <br /><CutoutWord word="Diva" baseSize="0.85em" />
              </h2>
              <p className="font-body text-gray-700 dark:text-white/60 text-base leading-relaxed mb-5">
                Cape Town girl. ICT graduate, Cum Laude. 1st place Vodacom Hackathon. Everything you see on this site? Self-taught, built from scratch, and done in pink. ★
              </p>
              <div className="flex flex-wrap gap-2 mb-7">
                {["ICT Graduate","Cum Laude","Vodacom Hackathon Winner","Golden Key Honour Society","Woman in STEM"].map((badge) => (
                  <span key={badge} className="font-mono-brand text-xs text-[#FF2D87] bg-[#FF2D87]/10 border border-[#FF2D87]/20 px-3 py-1 rounded-full">
                    ★ {badge}
                  </span>
                ))}
              </div>
              <CTAButton href="/contact" data-testid="button-about-cta">Work With Me ★</CTAButton>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </main>
  );
}
