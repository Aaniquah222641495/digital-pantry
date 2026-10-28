// Lead form: rules, the request to the Google Apps Script endpoint, and the WhatsApp / email
// fallbacks. The limits below are repeated in apps-script/Code.gs (the server checks them
// again). If you change one, change both.
import { z } from "zod";

export const WHATSAPP_NUMBER = "27724111011";
export const CONTACT_EMAIL = "thedigitalpantryza@gmail.com";

export const LIMITS = { name: 80, businessName: 100, email: 254, message: 1000 } as const;

export const INTEREST_OPTIONS = [
  // Labels carry price tokens; LeadForm fills them for the Local / International switch.
  { value: "Starter", label: "Starter ({Starter})" },
  { value: "Standard", label: "Standard ({Standard})" },
  { value: "Premium", label: "Premium ({Premium})" },
  { value: "Pro", label: "Pro ({Pro}, with lead automation)" },
  { value: "Larger business", label: "A larger business (custom quote)" },
  { value: "International", label: "International client (USD packages)" },
  { value: "Free mock-up", label: "A free mock-up of my site" },
  { value: "Not sure yet", label: "Not sure yet" },
] as const;

export type Interest = (typeof INTEREST_OPTIONS)[number]["value"];
const INTEREST_VALUES = INTEREST_OPTIONS.map((o) => o.value) as [Interest, ...Interest[]];

// ?interest=mockup on the URL preselects the free mock-up option.
const INTEREST_ALIASES: Record<string, Interest> = {
  mockup: "Free mock-up",
  "mock-up": "Free mock-up",
  starter: "Starter",
  standard: "Standard",
  premium: "Premium",
  pro: "Pro",
  unsure: "Not sure yet",
  larger: "Larger business",
  international: "International",
  intl: "International",
};
export function interestFromQuery(search: string): Interest | undefined {
  const raw = new URLSearchParams(search).get("interest")?.toLowerCase().trim();
  return raw ? INTEREST_ALIASES[raw] : undefined;
}

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
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .max(LIMITS.email, "That email is too long")
    .email("That email doesn't look right"),
  interest: z.enum(INTEREST_VALUES, { error: "Pick what you're interested in" }),
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
export async function submitLead(values: LeadFormValues, source: string): Promise<SubmitResult> {
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

const interestPhrase = (i: string) => (i === "Free mock-up" ? "a free mock-up of my site" : i === "Not sure yet" ? "your websites (not sure which package yet)" : `the ${i} package`);

/** wa.me link with a message that names the person and what they asked about. */
export function whatsappUrl(v: Pick<LeadFormValues, "name" | "businessName" | "interest">, kind: "after-send" | "fallback", extra?: string): string {
  const intro = `Hi Aaniquah, it's ${v.name} from ${v.businessName}.`;
  const body =
    kind === "after-send"
      ? `${intro} I just sent an enquiry on your website about ${interestPhrase(v.interest)}.`
      : `${intro} I'm interested in ${interestPhrase(v.interest)}.${extra ? `\n\n${extra}` : ""}`;
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
    `Email: ${v.email}`,
    `Interested in: ${v.interest}`,
    "",
    v.message.trim() ? `Message:\n${v.message.trim()}` : "",
  ].join("\n");
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Website enquiry: ${v.interest}`)}&body=${encodeURIComponent(body)}`;
}
