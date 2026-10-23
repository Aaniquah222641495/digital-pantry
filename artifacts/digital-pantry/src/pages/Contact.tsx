import type { CSSProperties } from "react";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { Reveal } from "../components/Reveal";
import { LeadForm } from "../components/LeadForm";
import { H1 } from "../lib/style";

const QUICK_CONTACTS = [
  { icon: MessageCircle, label: "WhatsApp", sub: "072 411 1011, fastest reply", href: "https://wa.me/27724111011", testId: "button-contact-whatsapp", iconCls: "bg-[#25D366]/15 text-[#1F8A50] dark:text-[#5BD38E]" },
  { icon: Mail, label: "Email", sub: "thedigitalpantryza@gmail.com", href: "mailto:thedigitalpantryza@gmail.com", testId: "button-contact-email", iconCls: "bg-dp-soft text-dp-accent" },
];

export default function Contact() {
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[15%] -top-[30%] -z-10 h-[80vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,var(--dp-glow),transparent)] blur-2xl" />
        <div className="mx-auto grid max-w-[1320px] gap-14 px-5 pb-24 pt-36 sm:px-8 md:grid-cols-[1fr_1.1fr] md:gap-16 md:pt-40">
          {/* Left: the invitation, the chefs and the quick ways to reach us */}
          <div className="md:sticky md:top-32 md:self-start">
            <h1 className={`dp-rise ${H1}`}>
              <span className="sr-only">Get a website quote: </span>
              Let's get <CutoutWord word="COOKING" /> <span aria-hidden="true" className="text-[0.8em]">★</span>
            </h1>
            <p className="dp-rise mt-6 max-w-[40ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-dp-muted" style={{ "--d": "0.12s" } as CSSProperties}>
              Ask for a quote, or pick the free mock-up and see your site before you decide. It comes straight to Aaniquah and Imaan.
            </p>

            <div className="dp-rise mt-10 flex flex-col gap-3" style={{ "--d": "0.22s" } as CSSProperties}>
              {QUICK_CONTACTS.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  data-testid={c.testId}
                  className="group flex items-center gap-4 rounded-[20px] border border-dp-line bg-dp-surface/70 p-4 pr-5 transition-colors hover:border-dp-ink/30"
                >
                  <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-full ${c.iconCls}`}>
                    <c.icon size={19} aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-medium text-dp-ink">{c.label}</span>
                    <span className="block text-[14px] text-dp-muted">{c.sub}</span>
                  </span>
                  <ArrowUpRight size={17} aria-hidden="true" className="text-dp-muted transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>

            <div className="mt-10 hidden items-end gap-3 md:flex" aria-hidden="true">
              <img src="/images/art/order-ticket.webp" alt="" width={600} height={600} className="h-40 w-40 object-contain" />
              <span className="mb-3 rounded-full border border-dp-line px-3 py-1.5 text-[13px] text-dp-muted">Your order goes straight to us ★</span>
            </div>
          </div>

          {/* Right: the form */}
          <Reveal>
            <h2 className="mb-6 text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold tracking-[-0.035em]">Send us your order</h2>
            <LeadForm source="contact-page" />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
