import { Link } from "wouter";
import { Logo } from "./Navbar";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";
import { useSideContact } from "../lib/contact";
import { track } from "../lib/analytics";
import { COST_GUIDE, INDUSTRIES } from "../lib/guides";

// Guides for search visitors: linked from every page so Google finds and weighs them.
const GUIDE_LINKS = [...INDUSTRIES.map((p) => ({ label: p.label, href: p.path })), { label: "What websites cost", href: COST_GUIDE.path }];

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

export function Footer() {
  const contact = useSideContact();
  return (
    <footer className="relative overflow-hidden border-t border-dp-line">
      <div className="mx-auto max-w-[1320px] px-5 pb-10 pt-24 sm:px-8 md:pt-32">
        <Reveal className="flex flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[14ch] text-[clamp(2.6rem,7vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.05em] text-dp-ink">
            Coded in <span className="text-dp-accent">Pink.</span> Built to Perform.
          </h2>
          <MagneticButton href="/contact" data-testid="footer-cta">
            Let's Get Cooking
          </MagneticButton>
        </Reveal>

        <div className="mt-20 grid gap-10 border-t border-dp-line pt-10 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          <div className="flex flex-col items-start gap-4">
            <Logo />
            <p className="max-w-xs text-[15px] leading-relaxed text-dp-muted">
              A Cape Town web studio by Aaniquah Dicks and Imaan Cooper. Every site built from scratch.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="w-fit py-1.5 text-[15px] text-dp-muted transition-colors duration-300 hover:text-dp-ink">
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Guides" className="flex flex-col">
            {GUIDE_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="w-fit py-1.5 text-[15px] text-dp-muted transition-colors duration-300 hover:text-dp-ink">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col text-[15px]">
            <a href={contact.waLink} className="w-fit py-1.5 text-dp-muted transition-colors duration-300 hover:text-dp-ink" data-testid="footer-link-whatsapp" onClick={() => track("whatsapp_click", { surface: "footer" })}>
              WhatsApp {contact.name} <span data-nosnippet="">{contact.display}</span>
            </a>
            <a href="mailto:thedigitalpantryza@gmail.com" className="w-fit py-1.5 text-dp-muted transition-colors duration-300 hover:text-dp-ink" data-testid="footer-link-email" onClick={() => track("email_click", { surface: "footer" })}>
              thedigitalpantryza@gmail.com
            </a>
            <p className="py-1.5 text-dp-muted">Cape Town, South Africa</p>
          </div>
        </div>

        <p className="mt-14 text-[13px] text-dp-muted">© {new Date().getFullYear()} The Digital Pantry. Built from scratch.</p>
      </div>
    </footer>
  );
}
