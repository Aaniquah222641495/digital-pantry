import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../lib/ThemeContext";

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
  const { theme, toggle } = useTheme();

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
            ? "backdrop-blur-xl bg-white/90 dark:bg-[#0A0A0A]/85 border-b border-gray-200 dark:border-white/8 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" data-testid="nav-logo">
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="flex items-center cursor-pointer"
            >
              <img
                src="/images/logo-nobg.webp"
                alt="The Digital Pantry logo"
                className="h-14 w-auto object-contain"
              />
            </motion.div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} data-testid={`nav-link-${link.label.toLowerCase()}`}>
                <span
                  className={`font-body text-sm font-medium transition-colors cursor-pointer relative group ${
                    location === link.href
                      ? "text-[#FF2D87]"
                      : "text-gray-700 dark:text-white/80 hover:text-[#FF2D87] dark:hover:text-[#FF2D87]"
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#FF2D87] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </span>
              </Link>
            ))}

            {/* Theme toggle */}
            <motion.button
              onClick={toggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              data-testid="button-theme-toggle"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-white/60 hover:text-[#FF2D87] dark:hover:text-[#FF2D87] transition-colors border border-gray-200 dark:border-white/10 hover:border-[#FF2D87]/40"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>

            <Link href="/contact">
              <motion.span
                data-testid="nav-cta"
                className="font-body text-sm font-semibold bg-[#FF2D87] text-white px-5 py-2 rounded-full cursor-pointer whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Let's Talk ★
              </motion.span>
            </Link>
          </nav>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              onClick={toggle}
              whileTap={{ scale: 0.9 }}
              data-testid="button-theme-toggle-mobile"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              className="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-white/60 border border-gray-200 dark:border-white/10"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </motion.button>
            <button
              className="text-gray-800 dark:text-white p-2"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              data-testid="button-menu-toggle"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-40 bg-[#FFF8FB] dark:bg-[#0A0A0A] flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link href={link.href}>
                  <span className="font-display text-4xl font-bold text-gray-900 dark:text-white hover:text-[#FF2D87] transition-colors cursor-pointer">
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
