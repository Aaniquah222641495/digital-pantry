// Lead form: rules, the request to the Google Apps Script endpoint, and the WhatsApp / email
// fallbacks. The limits below are repeated in apps-script/Code.gs (the server checks them
// again). If you change one, change both.
import { z } from "zod";

export const WHATSAPP_NUMBER = "27724111011";
export const CONTACT_EMAIL = "thedigitalpantryza@gmail.com";

export const LIMITS = { name: 80, businessName: 100, email: 254, message: 1000 } as const;

// The package choices. The free mock-up is a separate tick box, and USD comes from the Local /
// International switch (sent as `market`), so neither is a choice here any more (2026-10-29).
export const INTEREST_OPTIONS = [
  // Details carry price tokens; LeadForm fills them for the Local / International switch.
  { value: "Starter", detail: "{Starter}" },
  { value: "Standard", detail: "{Standard}" },
  { value: "Premium", detail: "{Premium}" },
  { value: "Pro", detail: "{Pro}, with lead automation" },
  { value: "Larger business", name: "Bigger or custom", detail: "Custom quote" },
  { value: "Not sure yet", detail: "We'll help you choose" },
] as const;

export type Interest = (typeof INTEREST_OPTIONS)[number]["value"];
const INTEREST_VALUES = INTEREST_OPTIONS.map((o) => o.value) as [Interest, ...Interest[]];

// ?interest=standard preselects a package; ?interest=mockup ticks the free mock-up box.
// ?interest=international is still accepted: the Local / International switch already says it.
const INTEREST_ALIASES: Record<string, { interest?: Interest; mockup?: true }> = {
  mockup: { mockup: true },
  "mock-up": { mockup: true },
  starter: { interest: "Starter" },
  standard: { interest: "Standard" },
  premium: { interest: "Premium" },
  pro: { interest: "Pro" },
  unsure: { interest: "Not sure yet" },
  larger: { interest: "Larger business" },
  international: {},
  intl: {},
};
export function interestFromQuery(search: string): { interest?: Interest; mockup?: true } | undefined {
  const raw = new URLSearchParams(search).get("interest")?.toLowerCase().trim();
  return raw ? INTEREST_ALIASES[raw] : undefined;
}

// Same check as validate_ in apps-script/Code.gs.
const EMAIL_RE = /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;

/**
 * South African numbers: 0XX XXX XXXX, +27 XX XXX XXXX or 27XXXXXXXXX. Returns +27XXXXXXXXX.
 * International clients: +<country code><number> or 00<country code><number>, 8 to 15 digits. Returns +<digits>.
 * Keep in step with the phone check in validate_ (apps-script/Code.gs).
 */
export function normalisePhone(input: string): string | null {
  const digits = input.replace(/[\s\-().]/g, "");
  const za = /^(?:\+27|0027|27|0)([1-9]\d{8})$/.exec(digits);
  if (za) return `+27${za[1]}`;
  const intl = /^(?:\+|00)([1-9]\d{7,14})$/.exec(digits);
  return intl ? `+${intl[1]}` : null;
}

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(LIMITS.name, `Keep it under ${LIMITS.name} characters`),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter your phone number")
    .refine((v) => normalisePhone(v) !== null, "Use a South African number like 0XX XXX XXXX, or your country code (+44...) from abroad"),
  // Optional: the phone number is enough for us to reply.
  email: z
    .string()
    .trim()
    .max(LIMITS.email, "That email is too long")
    .refine((v) => v === "" || EMAIL_RE.test(v), "That email doesn't look right"),
  interest: z.enum(INTEREST_VALUES, { error: "Pick what you're interested in" }),
  mockup: z.boolean(),
  businessName: z
    .string()
    .trim()
    .min(1, "Please enter your business name")
    .max(LIMITS.businessName, `Keep it under ${LIMITS.businessName} characters`),
  message: z.string().trim().max(LIMITS.message, `Keep it under ${LIMITS.message} characters`),
  // Honeypot: real people never see or fill this. Bots do.
  companySite: z.string().max(200),
});

export type LeadFormValues = z.infer<typeof leadSchema>;

// The live Apps Script web app (public by design, no secret). Kept in code so the form works on
// any host: the Cloudflare move dropped Netlify's build variable and the form fell back for hours
// (2026-10-28). VITE_LEADS_ENDPOINT still overrides it, e.g. for a test deployment. Either must look
// like an Apps Script web app URL, or we treat it as missing so a typo can never send leads elsewhere.
const DEFAULT_ENDPOINT = "https://script.google.com/macros/s/AKfycbzevDhzAEXUtTEHDU2lyVb4Hg6evHy0vqHwnSZXF7ufqUB79nFdXrHD1k22kMVhatgA/exec";
const rawEndpoint = (import.meta.env.VITE_LEADS_ENDPOINT as string | undefined)?.trim() || DEFAULT_ENDPOINT;
export const LEADS_ENDPOINT =
  rawEndpoint && /^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(rawEndpoint) ? rawEndpoint : undefined;

export type SubmitResult =
  | { status: "sent" }
  // Went wrong in a way we KNOW about (no endpoint set, server said no, or the page is offline).
  | { status: "failed"; reason: "no-endpoint" | "rejected" | "network" };

/**
 * Posts the lead as text/plain JSON. text/plain is a "simple" request, so the browser skips the
 * CORS preflight that Apps Script cannot answer (it has no OPTIONS handler). Apps Script answers
 * a POST with a redirect to script.googleusercontent.com; fetch follows it, and the reply is
 * readable because Google serves it with `Access-Control-Allow-Origin: *`.
 * If the request fails for ANY reason we cannot be sure the lead was saved, so the caller shows
 * the WhatsApp / email fallback. The server ignores a repeat of the same lead (duplicate guard).
 */
export async function submitLead(values: LeadFormValues, source: string, market: "za" | "intl"): Promise<SubmitResult> {
  if (!LEADS_ENDPOINT) {
    if (import.meta.env.DEV) console.warn("VITE_LEADS_ENDPOINT is not set: the lead form will use the WhatsApp / email fallback.");
    return { status: "failed", reason: "no-endpoint" };
  }
  const phone = normalisePhone(values.phone);
  if (!phone) return { status: "failed", reason: "rejected" };

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 20000);
  try {
    const res = await fetch(LEADS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        name: values.name,
        phone,
        email: values.email,
        interest: values.interest,
        mockup: values.mockup,
        market,
        businessName: values.businessName,
        message: values.message,
        companySite: values.companySite,
        source,
      }),
      signal: controller.signal,
      credentials: "omit",
      redirect: "follow",
    });
    const data = (await res.json()) as { ok?: boolean };
    return data.ok === true ? { status: "sent" } : { status: "failed", reason: "rejected" };
  } catch {
    return { status: "failed", reason: "network" };
  } finally {
    window.clearTimeout(timer);
  }
}

/** What the lead asked about, in the visitor's words (WhatsApp, email) or ours (thank-you screen). */
export function interestPhrase(v: Pick<LeadFormValues, "interest" | "mockup">, voice: "visitor" | "studio" = "visitor"): string {
  const what =
    v.interest === "Not sure yet"
      ? voice === "visitor" ? "your websites (not sure which package yet)" : "our websites"
      : v.interest === "Larger business"
        ? `a custom website for ${voice === "visitor" ? "my" : "your"} business`
        : `the ${v.interest} package`;
  return v.mockup ? `${what}, with a free mock-up first` : what;
}

/** wa.me link with a message that names the person and what they asked about. */
export function whatsappUrl(v: Pick<LeadFormValues, "name" | "businessName" | "interest" | "mockup">, kind: "after-send" | "fallback", extra?: string): string {
  const intro = `Hi Aaniquah, it's ${v.name} from ${v.businessName}.`;
  const body =
    kind === "after-send"
      ? `${intro} I just sent an enquiry on your website about ${interestPhrase(v)}.`
      : `${intro} I'm interested in ${interestPhrase(v)}.${extra ? `\n\n${extra}` : ""}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
}

/** mailto fallback with every field filled in. */
export function mailtoUrl(v: LeadFormValues): string {
  const body = [
    "Hi Aaniquah,",
    "",
    `Name: ${v.name}`,
    `Business: ${v.businessName}`,
    `Phone: ${v.phone}`,
    ...(v.email ? [`Email: ${v.email}`] : []),
    `Interested in: ${v.interest}${v.mockup ? " + free mock-up" : ""}`,
    "",
    v.message.trim() ? `Message:\n${v.message.trim()}` : "",
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Website enquiry: ${v.interest}`)}&body=${encodeURIComponent(body)}`;
}
