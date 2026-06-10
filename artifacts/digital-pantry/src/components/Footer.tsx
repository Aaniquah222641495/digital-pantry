import { Link } from "wouter";
import { Instagram, Mail, MessageCircle } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-[#050505] border-t border-gray-200 dark:border-white/8 pt-14 pb-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-12">
          <div>
            <img
              src="/images/logo-nobg.png"
              alt="The Digital Pantry"
              className="h-40 w-auto object-contain mb-3"
            />
            <p className="font-body text-gray-500 dark:text-white/50 text-sm leading-relaxed">
              Coded in Pink. Built to Perform.
            </p>
            <p className="font-mono-brand text-[#FF2D87] text-xs mt-3 tracking-widest uppercase">
              Cape Town, South Africa
            </p>
          </div>

          <div>
            <p className="font-mono-brand text-gray-400 dark:text-white/40 text-xs tracking-widest uppercase mb-4">
              Navigation
            </p>
            <nav className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="font-body text-gray-600 dark:text-white/60 hover:text-[#FF2D87] dark:hover:text-[#FF2D87] transition-colors text-sm cursor-pointer">
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-mono-brand text-gray-400 dark:text-white/40 text-xs tracking-widest uppercase mb-4">
              Get in Touch
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/27000000000"
                className="flex items-center gap-2 font-body text-gray-600 dark:text-white/60 hover:text-[#FF2D87] dark:hover:text-[#FF2D87] transition-colors text-sm"
                data-testid="footer-link-whatsapp"
              >
                <MessageCircle size={15} className="shrink-0" />
                WhatsApp
              </a>
              <a
                href="mailto:hello@thedigitalpantry.co.za"
                className="flex items-center gap-2 font-body text-gray-600 dark:text-white/60 hover:text-[#FF2D87] dark:hover:text-[#FF2D87] transition-colors text-sm"
                data-testid="footer-link-email"
              >
                <Mail size={15} className="shrink-0" />
                hello@thedigitalpantry.co.za
              </a>
              <a
                href="https://instagram.com/thedigitalpantry"
                className="flex items-center gap-2 font-body text-gray-600 dark:text-white/60 hover:text-[#FF2D87] dark:hover:text-[#FF2D87] transition-colors text-sm"
                data-testid="footer-link-instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram size={15} className="shrink-0" />
                @thedigitalpantry
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-gray-400 dark:text-white/30 text-xs">
            © 2025 The Digital Pantry. Built from scratch.
          </p>
          <p className="font-mono-brand text-[#FF2D87]/60 text-xs tracking-widest">
            ★ CODED IN PINK ★
          </p>
        </div>
      </div>
    </footer>
  );
}
