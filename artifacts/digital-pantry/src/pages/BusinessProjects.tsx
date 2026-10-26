import { useEffect, type CSSProperties } from "react";
import { Link } from "wouter";
import { ArrowUpRight, Check } from "lucide-react";
import { CutoutWord } from "../components/CutoutWord";
import { Reveal } from "../components/Reveal";
import { LeadForm } from "../components/LeadForm";
import { H1, H2 } from "../lib/style";
import { INTL_PRICES, LARGER_DRIVERS, LARGER_FROM } from "../lib/plans";

// Business projects (DPW-11; PRD 3.1, 4.1, 4.8). The separate route for larger sites, custom
// development, integrations, support and agency partnerships, so bigger buyers don't assume we
// only sell low-cost packages. Design: ops/units/web/projects/digital-pantry-website/
// design-business-projects-2026-10-26.md. Claims rule (PRD 4.8): only what we can show. The proof
// rows are live client work or this site's own measured results; everything else is described as
// what we scope, not as past results.

const BUILDS = [
  {
    title: "Custom websites",
    body: "Bigger sites with more pages, more content and your own brand system, designed and coded from scratch. No page builder and no template.",
  },
  {
    title: "Integrations",
    body: "Bookings, payments, forms and links to the systems you already use. We check what your tools allow before we promise anything.",
  },
  {
    title: "Lead systems",
    body: "Every enquiry saved to a Google Sheet you own, an email alert to your team and an automatic reply to the customer, tested before handover.",
  },
  {
    title: "Support after launch",
    body: "Updates, fixes and small changes on a monthly plan, quoted with the build so you know the running cost from day one.",
  },
] as const;

const PROOF = [
  { what: "One-tap WhatsApp ordering and a weekly locations board", where: "Stuff'd Bagels", href: "https://stuffdbagels.netlify.app" },
  { what: "Programmes, registration, testimonials and FAQs for parents", where: "Beginners Madrasah", href: "https://beginnersmadrasah.co.za" },
  { what: "Enquiries saved to a Google Sheet, with an email alert and an auto-reply", where: "This site's own enquiry form" },
  { what: "Accessibility 100 and SEO 100 on every page (Lighthouse, 26 Oct 2026)", where: "This site" },
] as const;

const STEPS = [
  { title: "Discovery call", body: "A short call about what the business does, who the site is for and what it has to do." },
  { title: "Scope and estimate", body: "We write down the pages, features and integrations, and what is out of scope." },
  { title: "Proposal", body: "A fixed price, milestones, what we need from you and how many rounds of changes are included." },
  { title: "Agreement and deposit", body: "You sign off the scope. Nothing is built before this." },
  { title: "Build in milestones", body: "You get a preview link at each milestone, so you see progress instead of waiting for a reveal." },
  { title: "Testing", body: "Real phones, keyboard only, speed, forms and every link, before anything goes live." },
  { title: "Launch and handover", body: "Your domain, your accounts and a plain-English note on how everything works. It's yours." },
] as const;

const BRIEF = [
  "What the business does and who the site is for",
  "What the site must do: sell, take bookings, collect enquiries, inform",
  "Features and any systems it needs to link to",
  "Your deadline, and why it's that date",
  "A budget range, even a rough one",
  "Whether you're the business, or an agency building for a client",
] as const;

export default function BusinessProjects() {
  // Links like /business-projects#brief arrive by client-side navigation, which doesn't scroll to the hash.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, []);

  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -right-[15%] -top-[30%] -z-10 h-[80vh] w-[60vw] rounded-full bg-[radial-gradient(closest-side,var(--dp-glow),transparent)] blur-2xl" />
        <div className="mx-auto max-w-[1320px] px-5 pb-16 pt-36 sm:px-8 md:grid md:grid-cols-12 md:items-center md:gap-10 md:pb-24 md:pt-40">
          <div className="md:col-span-7">
            <h1 className={`dp-rise max-w-[15ch] ${H1}`}>
              <span className="sr-only">Custom websites for bigger plans</span>
              <span aria-hidden="true">
                Custom websites for bigger <CutoutWord word="PLANS" />
              </span>
            </h1>
            <p className="dp-rise mt-6 max-w-[52ch] text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed text-dp-muted" style={{ "--d": "0.12s" } as CSSProperties}>
              For businesses that have outgrown a package, and agencies that need a build partner. Custom websites, integrations and support after launch, scoped with you and quoted at a fixed price.
            </p>
            <p className="dp-rise mt-5 text-[15px] text-dp-ink" style={{ "--d": "0.16s" } as CSSProperties}>
              From <span className="font-semibold tabular-nums text-dp-accent">{LARGER_FROM}</span>, set after a discovery call.
            </p>
            <div className="dp-rise mt-9 flex flex-wrap gap-3" style={{ "--d": "0.2s" } as CSSProperties}>
              <a href="#brief" className="inline-flex h-[52px] items-center gap-2 rounded-full bg-dp-cta px-7 text-[15px] font-medium text-dp-cta-fg transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dp-accent">
                Send us a brief <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <Link href="/portfolio" className="inline-flex h-[52px] items-center rounded-full border border-dp-line px-7 text-[15px] font-medium text-dp-ink transition-colors hover:border-dp-ink/40">
                See our work
              </Link>
            </div>
          </div>
          <figure className="dp-rise mx-auto mt-14 w-[min(100%,420px)] md:col-span-5 md:mt-0" style={{ "--d": "0.25s" } as CSSProperties}>
            <div className="rotate-[2deg] rounded-[30px] border-[3px] border-white bg-dp-surface p-2 shadow-[0_30px_60px_-30px_rgba(179,47,104,0.55)] dark:border-[var(--im-border)]">
              <img src="/images/stock/custom-coding-laptop.webp" alt="A developer typing code on a laptop, with a programming book beside it" width={800} height={1000} fetchPriority="high" className="aspect-[4/5] w-full rounded-[24px] object-cover" />
            </div>
            <figcaption className="mt-4 text-center font-mono text-[11px] text-dp-muted">Stock photo · Christina Morillo / Pexels</figcaption>
          </figure>
        </div>
      </section>

      {/* What we build: editorial rows, not a card grid */}
      <section aria-labelledby="build-heading" className="border-t border-dp-line">
        <div className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 md:py-32">
          <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
            <h2 id="build-heading" className={`md:col-span-7 ${H2}`}>
              What we <CutoutWord word="BUILD" />
            </h2>
            <p className="max-w-[44ch] text-lg leading-relaxed text-dp-muted md:col-span-5">
              The same kitchen as our small-business sites, with more moving parts and a scope written for your business.
            </p>
          </Reveal>
          <ul className="mt-14 border-t border-dp-ink/15 dark:border-white/15">
            {BUILDS.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 0.05} className="grid gap-3 border-b border-dp-ink/15 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:px-4 dark:border-white/15">
                <span className="font-mono text-[12px] tabular-nums text-dp-accent md:col-span-1">0{i + 1}</span>
                <h3 className="text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-dp-ink md:col-span-5">{b.title}</h3>
                <p className="max-w-[52ch] leading-relaxed text-dp-muted md:col-span-6">{b.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof: only work that is live or measured */}
      <section aria-labelledby="proof-heading" className="border-t border-dp-line bg-dp-soft/50 dark:bg-[var(--im-soft)]">
        <div className="mx-auto max-w-[1320px] px-5 py-20 sm:px-8 md:py-24">
          <Reveal>
            <h2 id="proof-heading" className="text-[clamp(1.9rem,3.4vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
              Already on the menu
            </h2>
            <p className="mt-4 max-w-[56ch] leading-relaxed text-dp-muted">Things we've built and you can check today. No made-up numbers.</p>
          </Reveal>
          <dl className="mt-10 grid gap-x-12 md:grid-cols-2">
            {PROOF.map((p, i) => (
              <Reveal key={p.what} delay={i * 0.05} className="border-t border-dp-ink/15 py-6 dark:border-white/15">
                <dt className="text-[1.15rem] font-semibold leading-snug tracking-[-0.02em] text-dp-ink">{p.what}</dt>
                <dd className="mt-2 text-[15px] text-dp-muted">
                  {"href" in p ? (
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 underline decoration-dp-line underline-offset-4 hover:text-dp-ink hover:decoration-dp-accent">
                      {p.where} <ArrowUpRight size={15} aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    p.where
                  )}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* Process (PRD 4.8): numbered timeline */}
      <section aria-labelledby="process-heading" className="border-t border-dp-line">
        <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-24 sm:px-8 md:grid-cols-12 md:gap-10 md:py-32">
          <Reveal className="md:col-span-5">
            <div className="md:sticky md:top-32">
              <h2 id="process-heading" className={`max-w-[12ch] ${H2}`}>
                How a custom build <CutoutWord word="RUNS" />
              </h2>
              <p className="mt-6 max-w-[40ch] text-lg leading-relaxed text-dp-muted">
                Scope, timeline and price are set after discovery, never before. You get a fixed quote before anything starts, and a preview at every milestone.
              </p>
            </div>
          </Reveal>
          <ol className="relative md:col-span-7">
            <span aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-dp-line" />
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.04} className="relative grid grid-cols-[40px_1fr] gap-5 pb-9 last:pb-0">
                <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-dp-line bg-dp-bg font-mono text-[13px] tabular-nums text-dp-accent">{i + 1}</span>
                <div className="pt-1.5">
                  <h3 className="text-[1.25rem] font-semibold tracking-[-0.025em] text-dp-ink">{s.title}</h3>
                  <p className="mt-1.5 max-w-[48ch] leading-relaxed text-dp-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Agencies and designers */}
      <section id="agencies" aria-labelledby="agency-heading" className="scroll-mt-24 px-5 sm:px-8">
        <Reveal className="mx-auto grid max-w-[1320px] gap-10 rounded-[36px] bg-dp-cta p-8 text-dp-cta-fg sm:p-12 md:grid-cols-12 md:gap-12 md:p-16">
          <div className="md:col-span-6">
            <h2 id="agency-heading" className="text-[clamp(2.2rem,4.4vw,3.8rem)] font-semibold leading-[1] tracking-[-0.045em]">
              Your client. Our <CutoutWord word="KITCHEN" />
            </h2>
            <p className="mt-6 max-w-[44ch] text-lg leading-relaxed opacity-80">
              For agencies, designers and marketers who need websites built properly and on time, without hiring a developer.
            </p>
            <a href="#brief" className="mt-9 inline-flex h-[52px] items-center gap-2 rounded-full bg-dp-bg px-7 text-[15px] font-medium text-dp-ink transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current">
              Talk partnership <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
          <ul className="flex flex-col gap-5 md:col-span-6 md:pt-2">
            {[
              "You keep the client relationship. We work through you.",
              "You send the design or the brief. We build it in code, test it and hand it back.",
              "Under your name or ours, whichever suits the job.",
              "A written scope for every job, so nobody is surprised by the bill or the date.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 border-t border-current/20 pt-5 text-[1.05rem] leading-relaxed">
                <Check size={18} strokeWidth={2.5} aria-hidden="true" className="mt-1 shrink-0" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Price */}
      <section aria-labelledby="price-heading">
        <div className="mx-auto grid max-w-[1320px] gap-10 px-5 py-24 sm:px-8 md:grid-cols-12 md:py-32">
          <Reveal className="md:col-span-5">
            <h2 id="price-heading" className="text-[clamp(1.9rem,3.4vw,2.9rem)] font-semibold leading-[1.02] tracking-[-0.045em]">
              From <span className="tabular-nums text-dp-accent">{LARGER_FROM}</span>. What moves the price:
            </h2>
            <p className="mt-5 max-w-[40ch] leading-relaxed text-dp-muted">
              Support after launch is quoted with the build. Outside South Africa? Our{" "}
              <Link href="/pricing?for=intl" className="text-dp-ink underline decoration-dp-line underline-offset-4 hover:decoration-dp-accent">
                US dollar packages
              </Link>{" "}
              start at {INTL_PRICES.Starter}.
            </p>
          </Reveal>
          <ul className="md:col-span-7">
            {LARGER_DRIVERS.map((d, i) => (
              <Reveal as="li" key={d} delay={i * 0.05} className="flex items-baseline gap-5 border-t border-dp-line py-5 text-[1.15rem] leading-snug text-dp-ink">
                <span className="font-mono text-[12px] tabular-nums text-dp-accent">0{i + 1}</span>
                {d}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* The brief */}
      <section id="brief" aria-labelledby="brief-heading" className="scroll-mt-24 border-t border-dp-line">
        <div className="mx-auto grid max-w-[1320px] gap-14 px-5 py-24 sm:px-8 md:grid-cols-[1fr_1.1fr] md:gap-16 md:py-32">
          <div className="md:sticky md:top-32 md:self-start">
            <Reveal>
              <h2 id="brief-heading" className={`max-w-[11ch] ${H2}`}>
                Send us a <CutoutWord word="BRIEF" />
              </h2>
              <p className="mt-6 max-w-[42ch] text-lg leading-relaxed text-dp-muted">
                A few lines is enough to start. Aaniquah or Imaan replies to book a discovery call. It helps if you tell us:
              </p>
            </Reveal>
            <ul className="mt-8 flex flex-col gap-3">
              {BRIEF.map((b) => (
                <li key={b} className="flex items-start gap-3 text-[15px] leading-relaxed text-dp-ink">
                  <Check size={16} strokeWidth={2.5} aria-hidden="true" className="mt-1 shrink-0 text-dp-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <Reveal>
            <LeadForm
              source="business-projects"
              defaultInterest="Larger business"
              messagePlaceholder="What the business does, what the site must do, deadline, budget range, and whether you're an agency."
            />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
