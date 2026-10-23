/**
 * Digital Pantry: lead endpoint (Google Apps Script web app).
 *
 * What it does for every enquiry sent from the contact form:
 *   1. checks the data again on the server (the browser check is not enough, this URL is public)
 *   2. adds a row to the "Leads" tab of this Google Sheet
 *   3. emails an instant alert to the owner
 *   4. sends the visitor one plain confirmation email (no marketing)
 *
 * Deploy steps are in README.md next to this file. Paste this whole file into the Sheet's
 * Apps Script editor (Extensions > Apps Script) and change only the CONFIG block if needed.
 *
 * The limits below must match src/lib/leads.ts in the website code.
 */

const CONFIG = {
  OWNER_EMAIL: 'thedigitalpantryza@gmail.com',
  // Leave empty when the script is attached to the Sheet (Extensions > Apps Script). For a standalone
  // project, paste the Sheet's ID: the part of its URL between /d/ and /edit.
  SPREADSHEET_ID: '',
  SHEET_NAME: 'Leads',
  SITE_URL: 'https://thedigitalpantry.netlify.app',
  WHATSAPP_NUMBER: '27724111011',
  WHATSAPP_DISPLAY: '+27 72 411 1011',
  TIMEZONE: 'Africa/Johannesburg',
  MAX_BODY_CHARS: 8000,          // anything bigger is rejected before it is parsed
  DUPLICATE_WINDOW_SECONDS: 600, // the same lead sent again within 10 minutes is ignored
  MAX_PER_EMAIL_PER_HOUR: 3,     // one email address can send 3 enquiries an hour
  MAX_LEADS_PER_HOUR: 40,        // whole form: protects the Sheet and the email quota from floods
  MIN_QUOTA_FOR_AUTOREPLY: 3     // keep spare daily emails for the owner alert
};

const LIMITS = { name: 80, businessName: 100, email: 254, message: 1000 };

const INTERESTS = ['Starter', 'Standard', 'Premium', 'Pro', 'Larger business', 'International', 'Free mock-up', 'Not sure yet'];

const HEADERS = [
  'Received (SAST)', 'Name', 'Business', 'Phone', 'Email',
  'Interested in', 'Message', 'Source page', 'Auto-reply', 'Status'
];

/* ------------------------------------------------------------------ */
/* Web app entry points                                                */
/* ------------------------------------------------------------------ */

/** Opening the web app URL in a browser shows this line. Handy for checking the deploy worked. */
function doGet() {
  return reply_({ ok: true, service: 'Digital Pantry lead endpoint', status: 'running' });
}

/** The contact form posts here as text/plain JSON. */
function doPost(e) {
  try {
    const body = e && e.postData && e.postData.contents ? String(e.postData.contents) : '';
    if (!body || body.length > CONFIG.MAX_BODY_CHARS) return reply_({ ok: false, error: 'invalid' });

    let data;
    try { data = JSON.parse(body); } catch (err) { return reply_({ ok: false, error: 'invalid' }); }
    if (!data || typeof data !== 'object') return reply_({ ok: false, error: 'invalid' });

    return reply_(processLead_(data));
  } catch (err) {
    console.error('doPost failed: ' + err);
    return reply_({ ok: false, error: 'server' });
  }
}

function reply_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* ------------------------------------------------------------------ */
/* The pipeline                                                        */
/* ------------------------------------------------------------------ */

function processLead_(data) {
  // Honeypot: a real visitor never sees this field. Pretend all is well and save nothing.
  if (clean_(data.companySite, 200, true) !== '') {
    console.warn('Honeypot filled: ignored');
    return { ok: true };
  }

  const v = validate_(data);
  if (!v.ok) return { ok: false, error: 'invalid' };
  const lead = v.lead;

  // Only one lead at a time past this point, so the row, the counters and the duplicate check cannot clash.
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) return { ok: false, error: 'busy' };

  let row;
  try {
    const cache = CacheService.getScriptCache();

    const dupeKey = 'dupe_' + hash_([lead.email, lead.interest, lead.name, lead.message].join('|'));
    if (cache.get(dupeKey)) return { ok: true, duplicate: true };

    const emailKey = 'rl_e_' + hash_(lead.email);
    const perEmail = Number(cache.get(emailKey) || 0);
    const allLeads = Number(cache.get('rl_all') || 0);
    if (perEmail >= CONFIG.MAX_PER_EMAIL_PER_HOUR || allLeads >= CONFIG.MAX_LEADS_PER_HOUR) {
      return { ok: false, error: 'rate_limited' };
    }

    const sheet = getSheet_();
    row = sheet.getLastRow() + 1;
    const range = sheet.getRange(row, 1, 1, HEADERS.length);
    range.setNumberFormat('@'); // plain text: a lead typing =FORMULA() just sees text
    range.setValues([[
      Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss'),
      lead.name, lead.businessName, lead.phone, lead.email,
      lead.interest, lead.message, lead.source, 'pending', 'New'
    ]]);

    cache.put(dupeKey, '1', CONFIG.DUPLICATE_WINDOW_SECONDS);
    cache.put(emailKey, String(perEmail + 1), 3600);
    cache.put('rl_all', String(allLeads + 1), 3600);
  } finally {
    lock.releaseLock();
  }

  // The lead is safely in the Sheet. Emails come next; if one fails the lead is still saved.
  const sheetUrl = spreadsheet_().getUrl();
  try {
    sendAlert_(lead, sheetUrl);
  } catch (err) {
    console.error('Alert email failed: ' + err);
  }

  let autoReply = 'sent';
  try {
    if (MailApp.getRemainingDailyQuota() < CONFIG.MIN_QUOTA_FOR_AUTOREPLY) {
      autoReply = 'skipped (daily email limit)';
    } else {
      sendAutoReply_(lead);
    }
  } catch (err) {
    console.error('Auto-reply failed: ' + err);
    autoReply = 'failed';
  }
  try {
    getSheet_().getRange(row, HEADERS.indexOf('Auto-reply') + 1).setValue(autoReply);
  } catch (err) {
    console.error('Could not update the auto-reply cell: ' + err);
  }

  return { ok: true };
}

/* ------------------------------------------------------------------ */
/* Validation (mirrors src/lib/leads.ts)                               */
/* ------------------------------------------------------------------ */

/** Strips control characters. Single-line fields also lose line breaks, which blocks email header tricks. */
function clean_(value, maxLen, singleLine) {
  let s = value === null || value === undefined ? '' : String(value);
  s = s.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
  if (singleLine) s = s.replace(/[\r\n\t]+/g, ' ');
  s = s.trim();
  return s.length > maxLen ? s.slice(0, maxLen + 1) : s; // one extra char so the length check below fails
}

function validate_(d) {
  const name = clean_(d.name, LIMITS.name, true);
  const businessName = clean_(d.businessName, LIMITS.businessName, true);
  const email = clean_(d.email, LIMITS.email, true);
  const message = clean_(d.message, LIMITS.message, false);
  const interest = clean_(d.interest, 40, true);
  const source = /^[a-z0-9-]{1,40}$/.test(String(d.source || '')) ? String(d.source) : 'unknown';

  const digits = clean_(d.phone, 40, true).replace(/[\s\-().]/g, '');
  // South African numbers become +27...; international ones (+ or 00, 8 to 15 digits) keep their country code.
  // Keep in step with normalisePhone in src/lib/leads.ts.
  const za = /^(?:\+27|0027|27|0)([1-9]\d{8})$/.exec(digits);
  const intl = /^(?:\+|00)([1-9]\d{7,14})$/.exec(digits);
  const phone = za ? '+27' + za[1] : intl ? '+' + intl[1] : '';

  const ok =
    name.length >= 2 && name.length <= LIMITS.name &&
    businessName.length >= 1 && businessName.length <= LIMITS.businessName &&
    email.length <= LIMITS.email && /^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/.test(email) &&
    phone !== '' &&
    INTERESTS.indexOf(interest) !== -1 &&
    message.length <= LIMITS.message;

  return { ok: ok, lead: { name: name, businessName: businessName, email: email, phone: phone, interest: interest, message: message, source: source } };
}

function hash_(text) {
  const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, text.toLowerCase());
  return bytes.map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join('');
}

/* ------------------------------------------------------------------ */
/* Sheet                                                               */
/* ------------------------------------------------------------------ */

function spreadsheet_() {
  return CONFIG.SPREADSHEET_ID ? SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
}

function getSheet_() {
  const ss = spreadsheet_();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold').setBackground('#FFA7D2');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 150);
    sheet.setColumnWidth(7, 320);
  }
  return sheet;
}

/* ------------------------------------------------------------------ */
/* Emails                                                              */
/* ------------------------------------------------------------------ */

function interestPhrase_(interest) {
  if (interest === 'Free mock-up') return 'a free mock-up of your website';
  if (interest === 'Not sure yet') return 'our websites';
  if (interest === 'Larger business') return 'a custom website for your business';
  if (interest === 'International') return 'our international website packages';
  return 'the ' + interest + ' package';
}

function esc_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Instant alert to the owner. Plain text only, so nothing a visitor typed is ever run as HTML. */
function sendAlert_(lead, sheetUrl) {
  const waLink = 'https://wa.me/' + lead.phone.replace('+', '');
  const body = [
    'New enquiry from the website.',
    '',
    'Name: ' + lead.name,
    'Business: ' + lead.businessName,
    'Phone: ' + lead.phone,
    'Email: ' + lead.email,
    'Interested in: ' + lead.interest,
    'From page: ' + lead.source,
    '',
    'Message:',
    lead.message || '(none)',
    '',
    'Reply on WhatsApp: ' + waLink,
    'Or just reply to this email: it goes to ' + lead.email + '.',
    '',
    'All leads: ' + sheetUrl
  ].join('\n');

  MailApp.sendEmail({
    to: CONFIG.OWNER_EMAIL,
    subject: 'New lead: ' + lead.name + ' (' + lead.interest + ')',
    body: body,
    replyTo: lead.email,
    name: 'Digital Pantry website'
  });
}

/** One plain confirmation to the visitor. Not marketing: no offers, no links except the privacy notice and WhatsApp. */
function sendAutoReply_(lead) {
  const first = lead.name.split(' ')[0].slice(0, 40);
  const what = interestPhrase_(lead.interest);
  const mockupLine = lead.interest === 'Free mock-up'
    ? "You asked for a free mock-up. It's a free preview of your site, with no obligation to go ahead."
    : '';
  const waUrl = 'https://wa.me/' + CONFIG.WHATSAPP_NUMBER;
  const privacyUrl = CONFIG.SITE_URL + '/privacy';

  const lines = [
    'Hi ' + first + ',',
    '',
    "Thanks for getting in touch with Digital Pantry. I've received your enquiry about " + what + ", and I'll reply to you personally on " + lead.email + ' or ' + lead.phone + '.',
    ''
  ];
  if (mockupLine) lines.push(mockupLine, '');
  lines.push(
    'If you want to add something, reply to this email or message me on WhatsApp: ' + CONFIG.WHATSAPP_DISPLAY + ' (' + waUrl + ').',
    '',
    'Your details:',
    'Business: ' + lead.businessName,
    'Interested in: ' + lead.interest,
    '',
    'Aaniquah',
    'Digital Pantry Web Studio, Cape Town',
    'Coded in Pink. Built to Perform.',
    '',
    '---',
    'This is an automatic confirmation of the enquiry you sent through ' + CONFIG.SITE_URL + '. I only use your details to reply to it. ' +
      'Privacy Notice: ' + privacyUrl + '. To have your details deleted, reply to this email and say so.'
  );
  const text = lines.join('\n');

  const html =
    '<div style="background:#FFF0F5;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#111111;">' +
    '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#ffffff;border:2px solid #111111;border-radius:14px;overflow:hidden;">' +
    '<tr><td style="background:#FF2D87;padding:18px 24px;color:#ffffff;font-size:22px;font-weight:bold;">digital pantry &#9733;</td></tr>' +
    '<tr><td style="padding:24px;font-size:16px;line-height:1.55;">' +
    '<p style="margin:0 0 14px;">Hi ' + esc_(first) + ',</p>' +
    "<p style=\"margin:0 0 14px;\">Thanks for getting in touch with Digital Pantry. I've received your enquiry about " + esc_(what) + ", and I'll reply to you personally on " + esc_(lead.email) + ' or ' + esc_(lead.phone) + '.</p>' +
    (mockupLine ? '<p style="margin:0 0 14px;">' + esc_(mockupLine) + '</p>' : '') +
    '<p style="margin:0 0 14px;">If you want to add something, reply to this email or message me on WhatsApp: <a href="' + waUrl + '" style="color:#B0004F;">' + esc_(CONFIG.WHATSAPP_DISPLAY) + '</a>.</p>' +
    '<p style="margin:0 0 6px;font-size:14px;color:#444444;"><strong>Your details</strong><br>Business: ' + esc_(lead.businessName) + '<br>Interested in: ' + esc_(lead.interest) + '</p>' +
    '<p style="margin:18px 0 0;">Aaniquah<br><span style="font-size:14px;color:#444444;">Digital Pantry Web Studio, Cape Town<br>Coded in Pink. Built to Perform.</span></p>' +
    '</td></tr>' +
    '<tr><td style="padding:14px 24px;background:#FFF8FB;border-top:1px solid #eeeeee;font-size:12px;line-height:1.5;color:#555555;">' +
    'This is an automatic confirmation of the enquiry you sent through ' + esc_(CONFIG.SITE_URL) + ". I only use your details to reply to it. " +
    '<a href="' + privacyUrl + '" style="color:#B0004F;">Privacy Notice</a>. To have your details deleted, reply to this email and say so.' +
    '</td></tr></table></div>';

  MailApp.sendEmail({
    to: lead.email,
    subject: 'We got your enquiry | Digital Pantry',
    body: text,
    htmlBody: html,
    replyTo: CONFIG.OWNER_EMAIL,
    name: 'Digital Pantry'
  });
}

/* ------------------------------------------------------------------ */
/* Run these by hand from the editor (see README)                      */
/* ------------------------------------------------------------------ */

/** Run once after pasting the code. Creates the Leads tab and asks Google for permission to send email. */
function setup() {
  getSheet_();
  console.log('Leads tab ready. Emails left today: ' + MailApp.getRemainingDailyQuota());
}

/** Optional check: sends a pretend lead to YOUR OWN email, so you can see the Sheet row, the alert and the auto-reply. */
function testLead() {
  const result = processLead_({
    name: 'Test Person',
    businessName: 'Test Business',
    email: CONFIG.OWNER_EMAIL,
    phone: '0724111011',
    interest: 'Free mock-up',
    message: 'This is a test from the Apps Script editor. ' + new Date().toISOString(),
    source: 'script-test',
    companySite: ''
  });
  console.log(JSON.stringify(result));
}
