import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, Mail, MessageCircle } from "lucide-react";
import { Link, useSearch } from "wouter";
import {
  INTEREST_OPTIONS,
  LIMITS,
  interestFromQuery,
  leadSchema,
  mailtoUrl,
  submitLead,
  whatsappUrl,
  type LeadFormValues,
} from "../lib/leads";

type Phase = { name: "form" } | { name: "sent"; values: LeadFormValues } | { name: "fallback"; values: LeadFormValues };

const inputCls =
  "w-full min-h-12 bg-gray-50 dark:bg-[#0A0A0A] border border-gray-300 dark:border-white/15 focus:border-[#FF2D87] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2D87] aria-[invalid=true]:border-[#C2005F] dark:aria-[invalid=true]:border-[#FF7AB2] rounded-xl px-4 py-3 font-body text-gray-900 dark:text-white text-base outline-none transition-colors placeholder:text-gray-500 dark:placeholder:text-white/40";
const labelCls = "block font-mono-brand text-gray-600 dark:text-white/65 text-xs tracking-widest uppercase mb-2";
const errCls = "font-body text-[#B0004F] dark:text-[#FF8DBD] text-sm mt-1.5";

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
  "inline-flex items-center justify-center gap-2 min-h-12 rounded-full border-2 border-[#FF2D87] text-[#B0004F] dark:text-[#FF8DBD] hover:bg-[#FF2D87] hover:text-white font-body font-semibold px-6 py-3 text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF2D87]";

/**
 * The lead form. Sends to the Google Apps Script endpoint (VITE_LEADS_ENDPOINT, see apps-script/).
 * If that is missing or fails, the visitor gets their details back with WhatsApp and email buttons,
 * so a lead is never silently lost.
 * `source` is saved with the lead so we know which page it came from.
 */
export function LeadForm({ source = "contact-page" }: { source?: string }) {
  const [phase, setPhase] = useState<Phase>({ name: "form" });
  const search = useSearch();
  const headingRef = useRef<HTMLHeadingElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", phone: "", email: "", businessName: "", message: "", companySite: "" },
  });

  // Preselect from ?interest=mockup. Done after mount so the prerendered HTML matches the first render.
  useEffect(() => {
    const wanted = interestFromQuery(search);
    if (wanted) setValue("interest", wanted);
  }, [search, setValue]);

  useEffect(() => {
    if (phase.name !== "form") headingRef.current?.focus();
  }, [phase.name]);

  const interest = watch("interest");

  const onSubmit = async (values: LeadFormValues) => {
    // A filled honeypot means a bot. Pretend it worked and send nothing.
    if (values.companySite) {
      setPhase({ name: "sent", values });
      return;
    }
    const result = await submitLead(values, source);
    setPhase(result.status === "sent" ? { name: "sent", values } : { name: "fallback", values });
  };

  const cardCls =
    "bg-white dark:bg-[#120a0e] border-2 border-[#111] dark:border-[#FF2D87]/50 rounded-2xl shadow-[6px_6px_0_#FF2D87] dark:shadow-[6px_6px_0_rgba(255,45,135,0.45)]";

  if (phase.name === "sent") {
    const { values } = phase;
    return (
      <div className={`${cardCls} p-8 md:p-10 text-center`} data-testid="lead-success">
        <div className="text-5xl mb-3 text-[#FFD700]" aria-hidden="true">★</div>
        <h3 ref={headingRef} tabIndex={-1} className="font-display font-black text-gray-900 dark:text-white text-2xl md:text-3xl mb-3 outline-none">
          Thanks, {values.name.split(" ")[0]}. It's in the pantry!
        </h3>
        <p className="font-body text-gray-600 dark:text-white/65 text-base mb-2">
          Your enquiry about {values.interest === "Free mock-up" ? "a free mock-up" : values.interest === "Not sure yet" ? "our websites" : `the ${values.interest} package`} has been sent. I'll reply to {values.email} or on {values.phone}.
        </p>
        <p className="font-body text-gray-600 dark:text-white/65 text-sm mb-7">
          A short confirmation email is on its way. If you can't see it, check your spam folder.
        </p>
        <a
          href={whatsappUrl(values, "after-send")}
          target="_blank"
          rel="noopener noreferrer"
          className={waBtnCls}
          data-testid="button-lead-whatsapp"
        >
          <MessageCircle size={20} aria-hidden="true" />
          Chat on WhatsApp
        </a>
        <p className="font-body text-gray-500 dark:text-white/50 text-xs mt-3">Optional. Handy if it's urgent.</p>
      </div>
    );
  }

  if (phase.name === "fallback") {
    const { values } = phase;
    return (
      <div className={`${cardCls} p-8 md:p-10`} data-testid="lead-fallback" role="alert">
        <h3 ref={headingRef} tabIndex={-1} className="font-display font-black text-gray-900 dark:text-white text-2xl mb-3 outline-none">
          Let's make sure I get this
        </h3>
        <p className="font-body text-gray-700 dark:text-white/75 text-base mb-2">
          The form couldn't confirm that your enquiry reached me, so don't rely on it. Nothing is lost: your details are below.
          Send them by WhatsApp or email and I'll see them straight away.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 my-6">
          <a
            href={whatsappUrl(values, "fallback", [values.message.trim(), `Phone: ${values.phone}`, `Email: ${values.email}`].filter(Boolean).join("\n"))}
            target="_blank"
            rel="noopener noreferrer"
            className={waBtnCls}
            data-testid="button-fallback-whatsapp"
          >
            <MessageCircle size={20} aria-hidden="true" />
            Send on WhatsApp
          </a>
          <a href={mailtoUrl(values)} className={mailBtnCls} data-testid="button-fallback-email">
            <Mail size={20} aria-hidden="true" />
            Send by email
          </a>
        </div>
        <button
          type="button"
          onClick={() => setPhase({ name: "form" })}
          className="font-body text-sm text-[#B0004F] dark:text-[#FF8DBD] underline underline-offset-4 cursor-pointer"
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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={`${cardCls} p-6 md:p-8 space-y-5`} data-testid="lead-form">
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
          <input id="lead-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="072 411 1011" className={inputCls} data-testid="input-phone" {...aria("phone")} {...register("phone")} />
          <FieldError id="phone-error" message={err("phone")} />
        </div>
        <div>
          <label htmlFor="lead-email" className={labelCls}>Email</label>
          <input id="lead-email" type="email" inputMode="email" autoComplete="email" maxLength={LIMITS.email} placeholder="you@yourbusiness.co.za" className={inputCls} data-testid="input-email" {...aria("email")} {...register("email")} />
          <FieldError id="email-error" message={err("email")} />
        </div>
      </div>

      <div>
        <label htmlFor="lead-interest" className={labelCls}>I'm interested in</label>
        <div className="relative">
          <select id="lead-interest" defaultValue="" className={`${inputCls} appearance-none pr-11 cursor-pointer`} data-testid="select-interest" {...aria("interest")} {...register("interest")}>
            <option value="" disabled>Choose one</option>
            {INTEREST_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown size={18} aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-white/50" />
        </div>
        <FieldError id="interest-error" message={err("interest")} />
        {interest === "Free mock-up" && (
          <p className="font-body text-gray-600 dark:text-white/65 text-sm mt-2" data-testid="mockup-note">
            A free preview of your site, with no obligation to go ahead.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="lead-message" className={labelCls}>
          Message <span className="normal-case tracking-normal text-gray-500 dark:text-white/50">(optional)</span>
        </label>
        <textarea id="lead-message" rows={4} maxLength={LIMITS.message} placeholder="Tell me about your business and what you need." className={`${inputCls} resize-y`} data-testid="textarea-message" {...aria("message")} {...register("message")} />
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
        className="w-full min-h-12 bg-[#FF2D87] hover:bg-[#e0006e] text-white font-body font-semibold rounded-full py-4 text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111] dark:focus-visible:outline-white"
      >
        {isSubmitting ? "Sending..." : "Send it ★"}
      </button>

      <p className="font-body text-gray-600 dark:text-white/60 text-xs leading-relaxed" data-testid="popia-notice">
        <strong className="font-semibold text-gray-800 dark:text-white/80">How we use your details.</strong>{" "}
        Digital Pantry (Aaniquah Dicks) asks for your name, phone, email, business name, what you're interested in and your message so we can reply to this enquiry.
        They are saved in a private Google Sheet and emailed to me, and you get one automatic confirmation email. Only I can see them.
        Nothing is ticked for marketing and we don't add you to any mailing list.
        Read the full <Link href="/privacy" className="text-[#B0004F] dark:text-[#FF8DBD] underline underline-offset-2">Privacy Notice</Link>.
      </p>
    </form>
  );
}
