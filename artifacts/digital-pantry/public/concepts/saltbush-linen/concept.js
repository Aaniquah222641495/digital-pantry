/* Concept layer for the public concept on digitalpantry.co.za. Loaded last.
   Saltbush & Linen is not a real business, so nothing may open WhatsApp: every WhatsApp link and the booking form
   show a short note instead, with a way back to the studio site. Nothing is stored or sent. */
(function () {
  'use strict';
  var STUDIO = 'https://digitalpantry.co.za/contact';
  var NOTE = 'This is a concept design, so nothing was sent. On a real site, this opens WhatsApp with the request already written.';
  var toast = null;
  var timer = null;

  function build() {
    toast = document.createElement('div');
    toast.className = 'concept-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    var p = document.createElement('p');
    p.textContent = NOTE;
    var row = document.createElement('div');
    row.className = 'concept-toast-row';
    var cta = document.createElement('a');
    cta.href = STUDIO;
    cta.textContent = 'Want a site like this?';
    var close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Close';
    close.addEventListener('click', hide);
    row.appendChild(cta);
    row.appendChild(close);
    toast.appendChild(p);
    toast.appendChild(row);
    document.body.appendChild(toast);
  }
  function show() {
    if (!toast) build();
    toast.classList.add('is-open');
    clearTimeout(timer);
    timer = setTimeout(hide, 9000);
  }
  function hide() {
    if (toast) toast.classList.remove('is-open');
  }
  function isWhatsApp(url) {
    return /^https:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(String(url || ''));
  }

  // The booking form opens WhatsApp with window.open once its own checks pass.
  var open = window.open;
  window.open = function (url) {
    if (isWhatsApp(url)) {
      var status = document.querySelector('[data-booking] [aria-live], [data-booking] [role="status"]');
      if (status) status.textContent = 'Concept design: nothing was sent.';
      show();
      return null;
    }
    return open.apply(window, arguments);
  };

  // Every other WhatsApp link (header, treatments, booking band, floating button).
  document.addEventListener('click', function (ev) {
    var a = ev.target.closest ? ev.target.closest('a[href]') : null;
    if (!a || !isWhatsApp(a.href)) return;
    ev.preventDefault();
    show();
  }, true);

  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') hide();
  });
})();
