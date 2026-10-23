import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { FounderSwitch } from "./FounderSwitch";
import { MagneticButton } from "./MagneticButton";

const NAV_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

// Logo sits on a light sticker tile on Night (brand rule: logo only on light or blush).
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1.5 transition-colors duration-500 dark:bg-[#FFF7FA] dark:shadow-[0_6px_24px_-8px_rgba(255,167,210,0.45)] ${className}`}>
      <img src="/images/logo-wordmark.webp" alt="Digital Pantry" width={640} height={152} className="h-7 w-auto sm:h-8" />
    </span>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => setMenuOpen(false), [location]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled ? "border-b border-dp-line bg-dp-bg/75 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" aria-label="Digital Pantry home" className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent">
            <Logo />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-[15px] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-dp-accent ${
                    active ? "text-dp-ink" : "text-dp-muted hover:text-dp-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <FounderSwitch />
            <MagneticButton href="/contact" data-testid="nav-cta" size="sm">
              Let's Get Cooking
            </MagneticButton>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <FounderSwitch compact />
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full border border-dp-line text-dp-ink"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              data-testid="button-menu-toggle"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col bg-dp-bg px-6 pb-10 pt-28 md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    className="block border-b border-dp-line py-4 text-[2rem] font-medium tracking-[-0.03em] text-dp-ink"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <FounderSwitch />
              <MagneticButton href="/contact">Let's Get Cooking</MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
