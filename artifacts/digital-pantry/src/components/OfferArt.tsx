import type { CSSProperties, ReactNode } from "react";
import { SiGmail, SiGooglemaps, SiGooglesheets, SiWhatsapp } from "react-icons/si";
import { Lock, PencilLine, RefreshCw, Search } from "lucide-react";

// Small UI vignettes for the three service cards in WhatWeCook (founder 2026-10-29: "use the actual
// SVG", e.g. Google for SEO). Each one shows what the service does, using the real product marks
// (Simple Icons via react-icons, Google's four-colour G from its sign-in button). Decorative: the
// card's title and body carry the meaning, so the art is aria-hidden. No ratings or results shown.
export type OfferArtKind = "google" | "leads" | "care";

function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

const CHIP = "flex items-center gap-3 rounded-2xl bg-dp-soft px-3.5 py-2.5 ring-1 ring-dp-line transition-transform duration-500";

// One notification-style row; `shift` staggers the hover lift so the stack feels alive.
function Row({ icon, title, sub, shift }: { icon: ReactNode; title: string; sub?: string; shift: string }) {
  return (
    <div className={`${CHIP} ${shift}`}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-dp-surface ring-1 ring-dp-line">{icon}</span>
      <span className="min-w-0">
        <span className="block truncate text-[13.5px] font-semibold leading-tight tracking-[-0.01em] text-dp-ink">{title}</span>
        {sub && <span className="block truncate text-[12px] leading-tight text-dp-muted">{sub}</span>}
      </span>
    </div>
  );
}

function GoogleArt() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-3 rounded-full bg-dp-soft px-4 py-2.5 ring-1 ring-dp-line">
        <GoogleG className="h-5 w-5 shrink-0" />
        <span className="flex-1 truncate text-[13.5px] text-dp-ink">bakery near me</span>
        <Search size={16} className="shrink-0 text-dp-muted" />
      </div>
      <Row
        shift="group-hover:-translate-y-1"
        icon={<SiGooglemaps className="h-4 w-4" color="#4285F4" />}
        title="Your business"
        sub="Open now · Directions · Call"
      />
    </div>
  );
}

function LeadsArt() {
  return (
    <div className="space-y-2">
      <Row shift="group-hover:-translate-y-1" icon={<SiGooglesheets className="h-4 w-4" color="#34A853" />} title="New enquiry saved" sub="Added to your Google Sheet" />
      <Row shift="group-hover:-translate-y-1 group-hover:delay-75 sm:ml-4" icon={<SiGmail className="h-4 w-4" color="#EA4335" />} title="Instant reply sent" sub="Your customer hears back now" />
      <Row shift="group-hover:-translate-y-1 group-hover:delay-150 sm:ml-8" icon={<SiWhatsapp className="h-4 w-4" color="#25D366" />} title="Follow up on WhatsApp" sub="One tap from the alert" />
    </div>
  );
}

function CareArt() {
  return (
    <div className="space-y-2.5">
      <div className="overflow-hidden rounded-2xl bg-dp-soft ring-1 ring-dp-line">
        <div className="flex items-center gap-1.5 border-b border-dp-line px-3.5 py-2">
          <span className="h-2 w-2 rounded-full bg-current opacity-20" />
          <span className="h-2 w-2 rounded-full bg-current opacity-20" />
          <span className="h-2 w-2 rounded-full bg-current opacity-20" />
        </div>
        <div className="flex items-center gap-2 px-3.5 py-2.5">
          <Lock size={14} className="shrink-0 text-[#1E8E3E] dark:text-[#5BD47F]" />
          <span className="truncate font-mono text-[13px] text-dp-ink">yourbusiness.co.za</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <span className={`${CHIP} !gap-2 !rounded-full !py-1.5 text-[12.5px] font-semibold text-dp-ink group-hover:-translate-y-1`}>
          <RefreshCw size={13} className="text-dp-accent" /> Domain renewed
        </span>
        <span className={`${CHIP} !gap-2 !rounded-full !py-1.5 text-[12.5px] font-semibold text-dp-ink group-hover:-translate-y-1 group-hover:delay-75`}>
          <PencilLine size={13} className="text-dp-accent" /> Menu updated
        </span>
      </div>
    </div>
  );
}

export function OfferArt({ kind }: { kind: OfferArtKind }) {
  return (
    <div aria-hidden="true" className="relative z-10 mt-7 select-none motion-reduce:[&_*]:!transition-none">
      {kind === "google" && <GoogleArt />}
      {kind === "leads" && <LeadsArt />}
      {kind === "care" && <CareArt />}
    </div>
  );
}

// Three "order tickets" pinned around the hero kitchen (founder 2026-10-29: the hero should reflect
// what we offer). Same marks and look as the WhatWeCook cards. Desktop: they hang off the edges of
// the scene so they never cover the founders. Mobile: one wrapped row under the scene.
// Decorative: the hero copy names the offers in text.
const TICKET = "flex items-center gap-2.5 rounded-2xl bg-dp-surface/95 px-3 py-2 shadow-[0_18px_40px_-22px_rgba(22,18,20,0.45)] ring-1 ring-dp-line backdrop-blur-sm";

function Ticket({ icon, title, sub }: { icon: ReactNode; title: string; sub: string }) {
  return (
    <div className={TICKET}>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-dp-soft ring-1 ring-dp-line">{icon}</span>
      <span className="min-w-0 pr-1">
        <span className="block whitespace-nowrap text-[13px] font-semibold leading-tight tracking-[-0.01em] text-dp-ink">{title}</span>
        <span className="block whitespace-nowrap text-[11.5px] leading-tight text-dp-muted">{sub}</span>
      </span>
    </div>
  );
}

const HERO_TICKETS = [
  { key: "google", pos: "lg:-right-6 lg:-top-7", d: 0.5, icon: <GoogleG className="h-4 w-4" />, title: "Found on Google", sub: "Search and Maps" },
  { key: "lead", pos: "lg:-bottom-8 lg:-left-8", d: 0.65, icon: <SiWhatsapp className="h-4 w-4" color="#25D366" />, title: "New enquiry saved", sub: "Reply in one tap" },
  { key: "care", pos: "lg:-bottom-6 lg:right-10", d: 0.8, icon: <Lock size={15} className="text-[#1E8E3E] dark:text-[#5BD47F]" />, title: "yourbusiness.co.za", sub: "Hosted and cared for" },
] as const;

export function HeroTickets() {
  return (
    <div aria-hidden="true" className="mt-6 flex select-none flex-wrap justify-center gap-2.5 lg:contents">
      {HERO_TICKETS.map((t) => (
        <div key={t.key} className={`dp-rise lg:absolute lg:z-20 ${t.pos}`} style={{ "--d": `${t.d}s` } as CSSProperties}>
          <Ticket icon={t.icon} title={t.title} sub={t.sub} />
        </div>
      ))}
    </div>
  );
}
