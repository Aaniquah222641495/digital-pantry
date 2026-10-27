/* Analytics guard (ADR-0026, security condition 1). Loaded before /js/u.js; the tracker calls
 * window.dpUmamiScrub(type, payload) before every send (data-before-send). Returning null drops it.
 * Second line of defence behind src/lib/analytics.ts: event names and property keys are allowlisted
 * here as well, and anything that looks like personal data (an email, a phone number, a WhatsApp or
 * mailto link, free text) is dropped. Keep the lists in step with EVENTS and PROP_KEYS in analytics.ts. */
(function () {
  "use strict";
  var EVENTS = [
    "segment_page_view", "package_view", "package_cta_click", "custom_project_cta_click",
    "whatsapp_click", "email_click", "enquiry_form_start", "enquiry_form_success",
    "enquiry_form_error", "free_mockup_request", "portfolio_case_study_view",
  ];
  var PROP_KEYS = ["segment", "package", "market", "surface", "source", "interest", "reason", "case"];
  var PAYLOAD_KEYS = ["website", "screen", "language", "title", "hostname", "url", "referrer", "tag", "id", "name", "data"];
  var VALUE = /^[a-z0-9_-]{1,40}$/;
  var PERSONAL = /@|mailto|wa\.me|\d{7,}/i;

  // Drop everything from the first "?" or "#", keeping the tracker's own format (full URL or path).
  function stripQuery(u) {
    return typeof u === "string" ? u.split(/[?#]/)[0] : "";
  }

  window.dpUmamiScrub = function (type, p) {
    try {
      // Only plain page views and our own events. No identify, no performance beacons.
      if (type !== "event" || !p || typeof p !== "object") return null;
      for (var k in p) if (PAYLOAD_KEYS.indexOf(k) < 0) return null;
      if (p.id || p.tag) return null;
      if (p.name !== undefined && EVENTS.indexOf(p.name) < 0) return null;
      if (p.data !== undefined) {
        if (p.name === undefined || !p.data || typeof p.data !== "object") return null;
        for (var d in p.data) {
          var v = p.data[d];
          if (PROP_KEYS.indexOf(d) < 0 || typeof v !== "string" || !VALUE.test(v) || PERSONAL.test(v)) return null;
        }
      }
      p.url = stripQuery(p.url);
      if (!p.url || PERSONAL.test(p.url) || PERSONAL.test(p.title || "")) return null;
      p.referrer = stripQuery(p.referrer);
      if (p.referrer && PERSONAL.test(p.referrer)) p.referrer = "";
      return p;
    } catch (e) {
      return null;
    }
  };
})();
