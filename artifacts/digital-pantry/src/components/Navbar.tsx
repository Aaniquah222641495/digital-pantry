import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-[#0A0A0A]/80 border-b border-white/8 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" data-testid="nav-logo">
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <img
                src="/images/logo-nobg.webp"
                alt="The Digital Pantry logo"
                className="h-16 w-auto object-contain"
              />
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`nav-link-${link.label.toLowerCase()}`}>
                <span
                  className={`font-body text-sm font-medium transition-colors cursor-pointer relative group ${
                    location === link.href ? "text-[#FF2D87]" : "text-white/80 hover:text-[#FF2D87]"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#FF2D87] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <motion.span
                data-testid="nav-cta"
                className="font-body text-sm font-semibold bg-[#FF2D87] text-white px-5 py-2 rounded-full cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Talk ★
              </motion.span>
            </Link>
          </nav>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            data-testid="button-menu-toggle"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] flex flex-col items-center justify-center gap-10"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link href={link.href}>
                  <span className="font-display text-4xl font-bold text-white hover:text-[#FF2D87] transition-colors cursor-pointer">
                    {link.label}
                  </span>
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.07 }}
            >
              <Link href="/contact">
                <span className="font-body font-semibold bg-[#FF2D87] text-white px-8 py-3.5 rounded-full text-lg cursor-pointer">
                  Let's Talk ★
                </span>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
