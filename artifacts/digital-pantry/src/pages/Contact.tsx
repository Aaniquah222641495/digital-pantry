import { motion } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { AnimatedSection } from "../components/AnimatedSection";
import { LeadForm } from "../components/LeadForm";

const QUICK_CONTACTS = [
  { icon: MessageCircle, label: "WhatsApp", sub: "Fastest response",           href: "https://wa.me/27724111011",           color: "#25D366", testId: "button-contact-whatsapp" },
  { icon: Mail,          label: "Email",    sub: "thedigitalpantryza@gmail.com", href: "mailto:thedigitalpantryza@gmail.com", color: "#FF2D87", testId: "button-contact-email"    },
];

export default function Contact() {
  return (
    <main className="pt-20">
      {/* ── Header ──────────────────────────────────── */}
      <section className="bg-[#FFF8FB] dark:bg-[#0A0A0A] grain-section py-16 md:py-20 relative overflow-hidden transition-colors duration-300">
        <span className="grain-deco top-10 right-8 text-[#FFD700]/8 text-[8rem] md:text-[10rem] font-bebas leading-none select-none pointer-events-none">★</span>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <AnimatedSection className="flex-1">
              <h1 className="font-display font-black text-gray-900 dark:text-white leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                <span className="block font-normal font-mono-brand text-[#FF2D87] text-xs tracking-[0.25em] uppercase mb-4 leading-normal">Get a Website Quote</span>
                Let's Get <CutoutWord word="COOKING" baseSize="0.95em" /> ★
              </h1>
              <p className="font-body text-gray-500 dark:text-white/50 text-base md:text-lg mt-4 max-w-lg">
                Ready to get cooking? Let's build something delicious.
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right" className="flex-shrink-0">
              <img
                src="/images/contact.webp"
                alt=""
                className="w-56 md:w-72 mr-4 md:mr-16 object-contain drop-shadow-[0_0_30px_rgba(255,45,135,0.25)]"
                loading="eager"
              />
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Quick Contact ────────────────────────────── */}
      <section className="bg-[#FFF0F5] dark:bg-[#0f0a0d] py-12 md:py-16 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="mb-6 md:mb-8">
            <p className="font-mono-brand text-gray-400 dark:text-white/40 text-xs tracking-[0.2em] uppercase">Reach Me On</p>
          </AnimatedSection>

          <div className="flex flex-wrap gap-3 md:gap-4">
            {QUICK_CONTACTS.map((contact, i) => (
              <AnimatedSection key={contact.label} delay={i * 0.05}>
                <motion.a
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-testid={contact.testId}
                  whileHover={{ y: -4, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 rounded-2xl border-2 px-6 py-4 bg-white dark:bg-transparent transition-all duration-200 shadow-sm dark:shadow-none"
                  style={{ borderColor: `${contact.color}40` }}
                >
                  <contact.icon size={20} style={{ color: contact.color }} className="shrink-0" />
                  <div>
                    <p className="font-body font-semibold text-gray-900 dark:text-white text-sm">{contact.label}</p>
                    <p className="font-mono-brand text-gray-500 dark:text-white/40 text-xs">{contact.sub}</p>
                  </div>
                </motion.a>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form ─────────────────────────────── */}
      <section className="bg-[#FFF8FB] dark:bg-[#0A0A0A] py-16 md:py-20 transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <AnimatedSection className="mb-8 md:mb-10">
            <h2 className="font-display font-bold text-gray-900 dark:text-white text-2xl md:text-4xl">
              Send a Message <span className="text-[#FFD700]">★</span>
            </h2>
            <p className="font-body text-gray-600 dark:text-white/60 mt-2 text-sm md:text-base">
              Ask for a quote, or pick the free mock-up to see your site before you decide. Fill this in and it comes straight to me.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <LeadForm source="contact-page" />
          </AnimatedSection>
        </div>
      </section>

      {/* ── Bottom strip ─────────────────────────────── */}
      <section className="bg-[#FF2D87] py-8 md:py-10 text-center">
        <p className="font-bebas text-white text-xl md:text-2xl tracking-widest px-4">CODED IN PINK ★ BUILT TO PERFORM ★ CAPE TOWN</p>
      </section>
    </main>
  );
}
