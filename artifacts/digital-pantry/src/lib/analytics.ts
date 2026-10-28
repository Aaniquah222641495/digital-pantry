// Cookieless funnel analytics (Umami Cloud, ADR-0026). Components call only track() and the hooks
// below; nothing else in the site mentions Umami. Event names and property values are fixed unions,
// so a URL, form value or any free text cannot get in. public/js/u-guard.js checks every payload again
// before it leaves the browser: keep EVENTS and PROP_KEYS in step with it.
// Never call umami.identify, never set data-distinct-id or data-host-url, never add data-umami-event-*
// attributes (security and counsel conditions in ADR-0026).
import { useEffect, useRef, type RefObject } from "react";

export const EVENTS = [
  "segment_page_view",
  "package_view",
  "package_cta_click",
  "custom_project_cta_click",
  "whatsapp_click",
  "email_click",
  "enquiry_form_start",
  "enquiry_form_success",
  "enquiry_form_error",
  "free_mockup_request",
  "portfolio_case_study_view",
] as const;
export type EventName = (typeof EVENTS)[number];

export type Package = "starter" | "standard" | "premium" | "pro";
export type { Market } from "./plans";
import type { Market } from "./plans";

export type EventProps = {
  segment?: "food" | "schools";
  package?: Package | "free_mockup";
  market?: Market;
  surface?:
    | "pricing"
    | "pricing_shelf"
    | "home_shelf"
    | "mockup_band"
    | "pricing_larger"
    | "bubble"
    | "footer"
    | "home_chefs"
    | "contact_card"
    | "form_sent"
    | "form_fallback";
  source?: "contact-page";
  interest?: "starter" | "standard" | "premium" | "pro" | "larger" | "international" | "free_mockup" | "not_sure";
  reason?: "no-endpoint" | "rejected" | "network" | "validation";
  case?: "stuffd_bagels" | "beginners_madrasah" | "concept_beauty";
};
export const PROP_KEYS = ["segment", "package", "market", "surface", "source", "interest", "reason", "case"] as const;

type Umami = { track: (name: string, data?: Record<string, string>) => unknown };

/** Sends one event. Does nothing without the tracker (prerender, ad blockers, Do Not Track) and never throws. */
export function track(name: EventName, props?: EventProps): void {
  try {
    const umami = (window as unknown as { umami?: Umami }).umami;
    if (!umami) return;
    const data = props ? (Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined)) as Record<string, string>) : undefined;
    void Promise.resolve(umami.track(name, data)).catch(() => {});
  } catch {
    // Analytics must never break the page.
  }
}

/**
 * Sends the event once when at least half the element is on screen (or, for an element taller than
 * two screens, when it fills half the screen). Re-arms when `key` changes.
 */
export function useTrackOnView(ref: RefObject<Element | null>, name: EventName, props: EventProps, key = ""): void {
  const latest = useRef(props);
  latest.current = props;
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.some(
          (e) => e.isIntersecting && (e.intersectionRatio >= 0.5 || e.intersectionRect.height >= window.innerHeight * 0.5),
        );
        if (seen) {
          track(name, latest.current);
          io.disconnect();
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, name, key]);
}

/** Sends the event once when the component mounts. */
export function useTrackOnMount(name: EventName, props: EventProps): void {
  const latest = useRef(props);
  latest.current = props;
  useEffect(() => {
    // The tracker loads with `defer`; give it a moment on the first page of a visit.
    const send = () => track(name, latest.current);
    if ((window as unknown as { umami?: Umami }).umami) send();
    else window.addEventListener("load", send, { once: true });
    return () => window.removeEventListener("load", send);
  }, [name]);
}

/** Maps a lead-form interest to its fixed analytics value. */
export function interestValue(interest: string): NonNullable<EventProps["interest"]> | undefined {
  const map: Record<string, NonNullable<EventProps["interest"]>> = {
    Starter: "starter",
    Standard: "standard",
    Premium: "premium",
    Pro: "pro",
    "Larger business": "larger",
    International: "international",
    "Free mock-up": "free_mockup",
    "Not sure yet": "not_sure",
  };
  return map[interest];
}
