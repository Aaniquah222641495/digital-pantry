import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MessageCircle } from "lucide-react";
import { Link, useSearch } from "wouter";
import {
  INTEREST_OPTIONS,
  LIMITS,
  interestFromQuery,
  interestPhrase,
  leadSchema,
  mailtoUrl,
  submitLead,
  whatsappUrl,
  type LeadFormValues,
} from "../lib/leads";
import { MOCKUP_FORM_NOTE } from "../lib/plans";
import { useMarket } from "../lib/MarketContext";
import { interestValue, track, type EventProps } from "../lib/analytics";
import { Sprinkles } from "./Sprinkles";

type Phase = { name: "form" } | { name: "sent"; values: LeadFormValues } | { name: "fallback"; values: LeadFormValues };

const inputCls =
  "dp-field w-full min-h-12 bg-dp-bg border border-dp-line focus-visible:border-dp-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dp-accent aria-[invalid=true]:border-[#C2005F] dark:aria-[invalid=true]:border-[#FF7AB2] rounded-[14px] px-4 py-3 text-dp-ink text-base transition-colors placeholder:text-dp-muted/80";
const labelCls = "block text-[14px] font-medium text-dp-ink mb-2";
const errCls = "text-[#B0004F] dark:text-[#FF8DBD] text-sm mt-1.5";

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p id={id} role="alert" className={errCls}>
      {message}
    </p>
  ) : null;
}

const waBtnCls =
  "inline-flex items-center justify-center gap-2 min-h-12 rounded-full bg-[#1FA855] hover:bg-[#188a45] text-white font-body font-semibold px-6 py-3 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1FA855]";
const mailBtnCls =
  "dp-outline-btn inline-flex items-center justify-center gap-2 min-h-12 rounded-full border border-dp-line text-dp-ink hover:border-dp-ink/40 font-body font-semibold px-6 py-3 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dp-accent";

/**
 * The lead form. Sends to the Google Apps Script endpoint (VITE_LEADS_ENDPOINT, see apps-script/).
 * If that is missing or fails, the visitor gets their details back with WhatsApp and email buttons,
 * so a lead is never silently lost.
 * `source` is saved with the lead so we know which page it came from.
 */
export function LeadForm({
  source = "contact-page",
  defaultInterest,
  messagePlaceholder = "Tell us about your business and what you need.",
}: {
  source?: string;
  /** Preselected package when the URL has none (e.g. "Larger business"). Otherwise "Not sure yet". */
  defaultInterest?: LeadFormValues["interest"];
  messagePlaceholder?: string;
}) {
  const [phase, setPhase] = useState<Phase>({ name: "form" });
  const search = useSearch();
  const { money, market } = useMarket();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const started = useRef(false);
  // Analytics gets the page name only, from a fixed list (ADR-0026).
  const sourceProp: EventProps["source"] = source === "contact-page" ? source : undefined;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", phone: "", email: "", businessName: "", interest: "Not sure yet", mockup: false, message: "", companySite: "" },
  });

  // Preselect from ?interest=standard or ?interest=mockup. Done after mount so the prerendered HTML matches the first render.
  useEffect(() => {
    const q = interestFromQuery(search);
    const wanted = q?.interest ?? defaultInterest;
    if (wanted) setValue("interest", wanted);
    if (q?.mockup) setValue("mockup", true);
  }, [search, setValue]);

  useEffect(() => {
    if (phase.name !== "form") headingRef.current?.focus();
  }, [phase.name]);

  const mockup = watch("mockup");

  const onSubmit = async (values: LeadFormValues) => {
    // A filled honeypot means a bot. Pretend it worked and send nothing.
    if (values.companySite) {
      setPhase({ name: "sent", values });
      return;
    }
    const result = await submitLead(values, source, market);
    if (result.status === "sent") {
      track("enquiry_form_success", { source: sourceProp, interest: interestValue(values.interest) });
      if (values.mockup) track("free_mockup_request", { source: sourceProp });
    } else {
      track("enquiry_form_error", { source: sourceProp, reason: result.reason });
    }
    setPhase(result.status === "sent" ? { name: "sent", values } : { name: "fallback", values });
  };

  const cardCls =
    "bg-dp-surface border border-dp-line rounded-[28px] shadow-[0_40px_80px_-50px_rgba(12,11,13,0.5)]";

  if (phase.name === "sent") {
    const { values } = phase;
    return (
      <div className={`${cardCls} relative overflow-hidden p-8 md:p-10 text-center`} data-testid="lead-success">
        <Sprinkles mode="burst" count={90} />
        <div className="text-5xl mb-3 text-[#E0B000] dark:text-[#FFD43B]" aria-hidden="true">★</div>
        <h3 data-no-sprinkle ref={headingRef} tabIndex={-1} className="font-semibold tracking-[-0.03em] text-dp-ink text-2xl md:text-3xl mb-3 outline-none">
          Thanks, {values.name.split(" ")[0]}. It's in the pantry!
        </h3>
        <p data-no-sprinkle className="text-dp-muted text-base mb-2">
          We've got your enquiry about {interestPhrase(values, "studio")}. We'll reply on {values.phone}{values.email ? ` or to ${values.email}` : ""}.
        </p>
        <p data-no-sprinkle className="text-dp-muted text-sm mb-7">
          {values.email ? "A short confirmation email is on its way. If you can't see it, check your spam folder." : "Keep your phone close: we reply on WhatsApp or by call."}
        </p>
        <a
          data-no-sprinkle
          href={whatsappUrl(values, "after-send")}
          target="_blank"
          rel="noopener noreferrer"
          className={waBtnCls}
          data-testid="button-lead-whatsapp"
          onClick={() => track("whatsapp_click", { surface: "form_sent" })}
        >
          <MessageCircle size={20} aria-hidden="true" />
          Chat on WhatsApp
        </a>
        <p data-no-sprinkle className="font-body text-dp-muted text-xs mt-3">Optional. Handy if it's urgent.</p>
      </div>
    );
  }

  if (phase.name === "fallback") {
    const { values } = phase;
    return (
      <div className={`${cardCls} p-8 md:p-10`} data-testid="lead-fallback" role="alert">
        <h3 ref={headingRef} tabIndex={-1} className="font-semibold tracking-[-0.03em] text-dp-ink text-2xl mb-3 outline-none">
          Let's make sure I get this
        </h3>
        <p className="text-dp-muted text-base mb-2">
          The form couldn't confirm that your enquiry reached us, so don't rely on it. Nothing is lost: your details are below.
          Send them by WhatsApp or email and we'll see them straight away.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 my-6">
          <a
            href={whatsappUrl(values, "fallback", [values.message.trim(), `Phone: ${values.phone}`, values.email && `Email: ${values.email}`].filter(Boolean).join("\n"))}
            target="_blank"
            rel="noopener noreferrer"
            className={waBtnCls}
            data-testid="button-fallback-whatsapp"
            onClick={() => track("whatsapp_click", { surface: "form_fallback" })}
          >
            <MessageCircle size={20} aria-hidden="true" />
            Send on WhatsApp
          </a>
          <a href={mailtoUrl(values)} className={mailBtnCls} data-testid="button-fallback-email" onClick={() => track("email_click", { surface: "form_fallback" })}>
            <Mail size={20} aria-hidden="true" />
            Send by email
          </a>
        </div>
        <button
          type="button"
          onClick={() => setPhase({ name: "form" })}
          className="font-body text-sm text-dp-accent underline underline-offset-4 cursor-pointer"
          data-testid="button-fallback-retry"
        >
          Go back and try the form again
        </button>
      </div>
    );
  }

  const err = (k: keyof LeadFormValues) => errors[k]?.message as string | undefined;
  const aria = (k: keyof LeadFormValues) => ({
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit, () => track("enquiry_form_error", { source: sourceProp, reason: "validation" }))}
      onFocusCapture={() => {
        if (started.current) return;
        started.current = true;
        track("enquiry_form_start", { source: sourceProp });
      }}
      noValidate className={`${cardCls} p-6 md:p-8 space-y-5`} data-testid="lead-form">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="lead-name" className={labelCls}>Your name</label>
          <input id="lead-name" type="text" autoComplete="name" maxLength={LIMITS.name} className={inputCls} data-testid="input-name" {...aria("name")} {...register("name")} />
          <FieldError id="name-error" message={err("name")} />
        </div>
        <div>
          <label htmlFor="lead-business" className={labelCls}>Business name</label>
          <input id="lead-business" type="text" autoComplete="organization" maxLength={LIMITS.businessName} className={inputCls} data-testid="input-business-name" {...aria("businessName")} {...register("businessName")} />
          <FieldError id="businessName-error" message={err("businessName")} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="lead-phone" className={labelCls}>Phone or WhatsApp</label>
          <input id="lead-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0XX XXX XXXX" className={inputCls} data-testid="input-phone" {...aria("phone")} {...register("phone")} />
          <FieldError id="phone-error" message={err("phone")} />
        </div>
        <div>
          <label htmlFor="lead-email" className={labelCls}>
            Email <span className="font-normal text-dp-muted">(optional)</span>
          </label>
          <input id="lead-email" type="email" inputMode="email" autoComplete="email" maxLength={LIMITS.email} placeholder="you@yourbusiness.co.za" className={inputCls} data-testid="input-email" {...aria("email")} {...register("email")} />
          <FieldError id="email-error" message={err("email")} />
        </div>
      </div>

      <fieldset>
        <legend className={labelCls}>I'm interested in</legend>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {INTEREST_OPTIONS.map((o) => (
            <label
              key={o.value}
              className="relative flex min-h-[64px] cursor-pointer flex-col justify-center rounded-[14px] border border-dp-line bg-dp-bg px-3.5 py-2.5 transition-colors hover:border-dp-ink/40 has-[:checked]:border-dp-accent has-[:checked]:bg-dp-accent/10 has-[:checked]:ring-1 has-[:checked]:ring-inset has-[:checked]:ring-dp-accent has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-dp-accent"
            >
              <input type="radio" value={o.value} className="sr-only" data-testid={`radio-interest-${o.value.toLowerCase().replace(/\s+/g, "-")}`} {...register("interest")} />
              <span className="text-[15px] font-medium text-dp-ink">{"name" in o ? o.name : o.value}</span>
              <span className="text-[13px] leading-snug text-dp-muted">{money(o.detail)}</span>
            </label>
          ))}
        </div>
        <FieldError id="interest-error" message={err("interest")} />
      </fieldset>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[15px] text-dp-ink">
          <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-dp-accent" data-testid="checkbox-mockup" {...register("mockup")} />
          <span>
            Send me a free mock-up first <span className="text-dp-muted">(no obligation)</span>
          </span>
        </label>
        {mockup && (
          <p className="text-dp-muted text-sm mt-2 pl-8" data-testid="mockup-note">
            {MOCKUP_FORM_NOTE}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lead-message" className={labelCls}>
          Message <span className="font-normal text-dp-muted">(optional)</span>
        </label>
        <textarea id="lead-message" rows={4} maxLength={LIMITS.message} placeholder={messagePlaceholder} className={`${inputCls} resize-y`} data-testid="textarea-message" {...aria("message")} {...register("message")} />
        <FieldError id="message-error" message={err("message")} />
      </div>

      {/* Honeypot: off-screen, skipped by keyboard and screen readers. Bots fill it, people never see it. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="lead-company-site">Leave this field empty</label>
        <input id="lead-company-site" type="text" tabIndex={-1} autoComplete="off" data-testid="input-honeypot" {...register("companySite")} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        data-testid="button-submit"
        className="w-full min-h-[52px] bg-dp-cta text-dp-cta-fg font-medium rounded-full py-4 text-base transition-transform active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-[0_10px_30px_-12px_var(--dp-glow)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dp-accent"
      >
        {isSubmitting ? "Sending..." : "Send it ★"}
      </button>

      <p className="text-dp-muted text-xs leading-relaxed" data-testid="popia-notice">
        <strong className="font-semibold text-dp-ink">How we use your details.</strong>{" "}
        Digital Pantry (Aaniquah Dicks) asks for your name, phone, email (if you want to give it), business name, what you're interested in and your message so we can reply to this enquiry.
        They are saved in a private Google Sheet and emailed to us, and if you gave an email you get one automatic confirmation email. Only Aaniquah and Imaan can see them.
        Nothing is ticked for marketing and we don't add you to any mailing list.
        Read the full <Link href="/privacy" className="text-dp-accent underline underline-offset-2">Privacy Notice</Link>.
      </p>
    </form>
  );
}
