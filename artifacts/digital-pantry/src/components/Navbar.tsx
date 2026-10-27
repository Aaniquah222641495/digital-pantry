import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { FounderSwitch } from "./FounderSwitch";
import { MarketSwitch } from "./MarketSwitch";
import { MagneticButton } from "./MagneticButton";

const NAV_LINKS = [
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
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
  const sentinel = useRef<HTMLSpanElement>(null);

  // A 1px marker 24px down the page: once it leaves the viewport, the bar turns solid.
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => setMenuOpen(false), [location]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <span ref={sentinel} aria-hidden="true" className="pointer-events-none absolute left-0 top-6 h-px w-px" />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled ? "border-b border-dp-line bg-dp-bg/75 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8">
          <Link href="/" aria-label="Digital Pantry home" className="shrink-0 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent">
            <Logo />
          </Link>

          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const active = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/ /g, "-")}`}
                  aria-current={active ? "page" : undefined}
                  className={`whitespace-nowrap rounded-full px-3 py-2 xl:px-4 text-[15px] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-dp-accent ${
                    active ? "text-dp-ink" : "text-dp-muted hover:text-dp-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {/* Compact switches keep the CTA on screen at laptop width */}
            <span className="xl:hidden"><MarketSwitch compact /></span>
            <span className="hidden xl:block"><MarketSwitch /></span>
            <span className="xl:hidden"><FounderSwitch compact /></span>
            <span className="hidden xl:block"><FounderSwitch /></span>
            <MagneticButton href="/contact" data-testid="nav-cta" size="sm">
              Let's Get Cooking
            </MagneticButton>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
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

      {menuOpen && (
          <div
            className="dp-menu-in fixed inset-0 z-40 flex flex-col bg-dp-bg px-6 pb-10 pt-28 lg:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((link, i) => (
                <div key={link.href} className="dp-menu-item" style={{ animationDelay: `${0.05 + i * 0.06}s` }}>
                  <Link
                    href={link.href}
                    className="block border-b border-dp-line py-4 text-[2rem] font-medium tracking-[-0.03em] text-dp-ink"
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </nav>
            <div className="mt-auto flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <MarketSwitch />
                <FounderSwitch />
              </div>
              <MagneticButton href="/contact">Let's Get Cooking</MagneticButton>
            </div>
          </div>
      )}
    </>
  );
}
