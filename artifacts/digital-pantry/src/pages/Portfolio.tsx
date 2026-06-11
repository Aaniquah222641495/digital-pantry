import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { AnimatedSection } from "../components/AnimatedSection";
import { CTAButton } from "../components/CTAButton";

const STACK_TAGS = ["React", "TypeScript", "Tailwind", "Netlify"];

const COMING_SOON = [
  { name: "Snaccidents ZA",  category: "Food & Snacks" },
  { name: "Sweet Sisters CPT", category: "Bakery" },
  { name: "Kremco CPT",      category: "Food & Beverage" },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

export default function Portfolio() {
  return (
    <main className="pt-20">
      {/* ── Header ──────────────────────────────────── */}
      <section className="bg-[#FFF8FB] dark:bg-[#0A0A0A] grain-section py-16 md:py-20 relative overflow-hidden transition-colors duration-300">
        <span className="grain-deco top-16 right-8 md:right-16 text-[#FFD700]/10 dark:text-[#FFD700]/10 text-[8rem] md:text-[10rem] font-bebas leading-none select-none pointer-events-none">★</span>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <AnimatedSection className="flex-1">
              <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-4">My Work</p>
              <h1 className="font-display font-black text-gray-900 dark:text-white leading-tight" style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)" }}>
                <CutoutWord word="WORK" /> <span className="text-[#FFD700]">★</span>
              </h1>
              <p className="font-body text-gray-500 dark:text-white/50 text-base md:text-lg mt-4 max-w-lg">
                Fresh out the kitchen. Here's what I've been cooking. ✦
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right" className="flex-shrink-0">
              <img
                src="/images/work.webp"
                alt=""
                className="w-56 md:w-72 mr-4 md:mr-16 object-contain drop-shadow-[0_0_30px_rgba(255,45,135,0.25)]"
                loading="eager"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Featured Case Study ─────────────────────── */}
      <section className="bg-[#FFF0F5] dark:bg-[#0f0a0d] py-16 md:py-20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="mb-8 md:mb-10">
            <p className="font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-2">Fresh Out The Kitchen</p>
            <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl md:text-3xl">Case Study</h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="bg-white dark:bg-[#0A0A0A] border border-gray-200 dark:border-white/8 rounded-3xl overflow-hidden shadow-sm dark:shadow-none">
              <div className="h-52 md:h-72 bg-gradient-to-br from-pink-50 dark:from-[#200d17] to-white dark:to-[#0A0A0A] relative flex items-center justify-center overflow-hidden">
                <div className="text-center z-10">
                  <div className="text-6xl md:text-8xl mb-3">🥯</div>
                  <p className="font-bebas text-[#FF2D87] text-2xl md:text-3xl tracking-widest">STUFF'D BAGELS</p>
                  <p className="font-mono-brand text-gray-400 dark:text-white/30 text-sm">stuffdbagels.netlify.app</p>
                </div>
                <div className="absolute inset-0 bg-[#FF2D87]/2" />
                <div className="absolute top-4 left-4 bg-[#FF2D87] text-white text-xs font-mono-brand px-3 py-1 rounded-full">★ Live</div>
              </div>

              <div className="p-6 md:p-10">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl md:text-4xl">
                      STUFF'D Bagels <span className="text-[#FFD700]">★</span>
                    </h2>
                    <p className="font-mono-brand text-[#FF2D87] text-sm tracking-widest mt-1">Food & Beverage / Pop-Up</p>
                  </div>
                  <a
                    href="https://stuffdbagels.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-body text-sm font-semibold text-[#FF2D87] border border-[#FF2D87]/30 hover:border-[#FF2D87] hover:bg-[#FF2D87]/10 px-4 py-2 rounded-full transition-all"
                    data-testid="link-stuffd-case-live"
                  >
                    <ExternalLink size={14} /> View Live Site
                  </a>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mb-8">
                  <div className="bg-gray-50 dark:bg-[#0f0a0d] border border-gray-200 dark:border-white/6 rounded-xl p-5">
                    <p className="font-mono-brand text-gray-400 dark:text-white/40 text-xs uppercase tracking-wider mb-3">The Problem</p>
                    <p className="font-body text-gray-600 dark:text-white/70 leading-relaxed text-sm md:text-base">
                      Customers had to hunt for a WhatsApp number and scroll social media to place orders. No central hub. Sales were slipping through the cracks.
                    </p>
                  </div>
                  <div className="bg-pink-50 dark:bg-[#0f0a0d] border border-[#FF2D87]/20 dark:border-[#FF2D87]/15 rounded-xl p-5">
                    <p className="font-mono-brand text-[#FF2D87] text-xs uppercase tracking-wider mb-3">The Solution ★</p>
                    <p className="font-body text-gray-600 dark:text-white/70 leading-relaxed text-sm md:text-base">
                      Single-page ordering site with menu, schedule and one-tap WhatsApp ordering. Customers find what they need in seconds.
                    </p>
                  </div>
                </div>

                <div>
                  <p className="font-mono-brand text-gray-400 dark:text-white/40 text-xs uppercase tracking-wider mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {STACK_TAGS.map((tag) => (
                      <span key={tag} className="font-mono-brand text-sm text-[#FF2D87] bg-[#FF2D87]/10 border border-[#FF2D87]/25 px-3 py-1.5 rounded-full" data-testid={`tag-stack-${tag.toLowerCase()}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Coming Soon Grid ────────────────────────── */}
      <section className="bg-[#FFF8FB] dark:bg-[#0A0A0A] py-16 md:py-20 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="mb-8 md:mb-10">
            <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl md:text-3xl">
              More <span className="text-[#FFD700]">★</span> Coming Soon
            </h2>
            <p className="font-body text-gray-400 dark:text-white/40 mt-2 text-sm">These businesses are getting built up.</p>
          </AnimatedSection>

          <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            {COMING_SOON.map((project) => (
              <motion.div
                key={project.name}
                variants={fadeUp}
                className="bg-white dark:bg-[#0f0a0d] border border-gray-200 dark:border-white/5 rounded-2xl p-6 md:p-7 relative overflow-hidden shadow-sm dark:shadow-none"
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/5 mb-4 flex items-center justify-center">
                  <span className="text-gray-300 dark:text-white/20 font-bebas text-lg">★</span>
                </div>
                <p className="font-mono-brand text-[#FFD700]/60 text-xs tracking-widest uppercase mb-2">★ Coming Soon</p>
                <h3 className="font-display font-bold text-gray-300 dark:text-white/40 text-xl mb-1">{project.name}</h3>
                <p className="font-mono-brand text-gray-300 dark:text-white/20 text-xs">{project.category}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="bg-[#FF2D87] py-16 md:py-20 text-center grain-section">
        <AnimatedSection>
          <p className="font-mono-brand text-white/70 text-xs tracking-[0.25em] uppercase mb-4">Your business next?</p>
          <h2 className="font-display font-black text-white text-3xl sm:text-4xl md:text-5xl mb-6">Let's Build Something ★</h2>
          <p className="font-body text-white/70 mb-8 max-w-md mx-auto px-4 text-sm md:text-base">Small business energy. Professional web presence. Built from scratch.</p>
          <CTAButton href="/contact" variant="ghost" data-testid="button-portfolio-cta">Get in Touch ★</CTAButton>
        </AnimatedSection>
      </section>
    </main>
  );
}
