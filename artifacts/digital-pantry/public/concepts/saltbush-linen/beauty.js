/* Beauty template script. Loaded after ../../shared/mockup.js; reads the same window.MOCKUP.
   Adds: extra colour tokens, an optional display word in the h1, the tabbed treatment menu,
   the booking request form and the reviews block.
   The booking form stores nothing and sends nothing: it only opens the visitor's own WhatsApp
   with a message already written. All text is written with textContent, never innerHTML. */
(function () {
  'use strict';
  var C = window.MOCKUP;
  if (!C) return;
  var SVG = 'http://www.w3.org/2000/svg';

  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    [].concat(kids == null ? [] : kids).forEach(function (k) {
      e.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
    });
    return e;
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function waLink(msg) {
    var d = String(C.whatsapp || '').replace(/\D/g, '');
    if (d.charAt(0) === '0') d = '27' + d.slice(1);
    return 'https://wa.me/' + d + '?text=' + encodeURIComponent(msg);
  }
  function stars(n) {
    // Drawn stars (no glyph font needed). Read out as "5 out of 5 stars".
    var box = h('span', { 'class': 'stars', role: 'img', 'aria-label': n + ' out of 5 stars' });
    for (var i = 0; i < n; i++) {
      var s = document.createElementNS(SVG, 'svg');
      s.setAttribute('viewBox', '0 0 20 20'); s.setAttribute('aria-hidden', 'true');
      var p = document.createElementNS(SVG, 'path');
      p.setAttribute('d', 'M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z');
      s.appendChild(p); box.appendChild(s);
    }
    return box;
  }

  // ---- typeset: config.typeset (A, B or C) picks the type system in beauty.css; default A ----
  document.documentElement.setAttribute('data-typeset', String(C.typeset || 'A').toLowerCase());

  // ---- ticks in the call-to-action band: config.cta.points (short facts; `steps` is still read for older configs) ----
  document.querySelectorAll('[data-ticks]').forEach(function (ul) {
    var st = (C.cta && (C.cta.points || C.cta.steps)) || [];
    if (!st.length) { ul.hidden = true; return; }
    st.forEach(function (t) { ul.appendChild(h('li', {}, t)); });
  });

  // ---- hero portrait in strips: <div data-strips="hero">. One photo (config.images.hero) shown through four tall rounded strips.
  // Each strip holds the same image, sized to the whole strip area and shifted, so the figure runs across the gaps. The first copy
  // carries the alt text; the others are hidden from assistive tech. No photo: the strip area is removed and the panel fills the row. ----
  document.querySelectorAll('[data-strips]').forEach(function (box) {
    var I = (C.images || {})[box.getAttribute('data-strips')], N = 4;
    if (!I || !I.src) { box.hidden = true; if (box.parentNode) box.parentNode.classList.add('no-strips'); return; }
    if (I.pos && /^[0-9a-z% .-]{1,30}$/i.test(I.pos)) box.style.setProperty('--pos', I.pos);
    if (I.posPhone && /^[0-9a-z% .-]{1,30}$/i.test(I.posPhone)) box.style.setProperty('--pos-m', I.posPhone);   // phone focal point (see the phone block in beauty.css)
    for (var i = 0; i < N; i++) {
      var im = h('img', { src: I.src, alt: i === 0 ? (I.alt || '') : '' });
      if (I.w) im.setAttribute('width', I.w);
      if (I.h) im.setAttribute('height', I.h);
      if (i === 0) im.setAttribute('fetchpriority', 'high'); else im.setAttribute('aria-hidden', 'true');
      var sp = h('span', { 'class': 'strip' }, [im]);
      sp.style.setProperty('--i', i);
      box.appendChild(sp);
    }
  });

  // ---- hero flower: off unless config.heroFloral is true (the ornament file stays in images/ornaments/) ----
  if (C.heroFloral) document.querySelectorAll('.stage').forEach(function (el) { el.classList.add('has-floral'); });

  // ---- About photo: when there is none yet, shared/mockup.js marks the box "no-img"; give the framed placeholder a plain label ----
  document.querySelectorAll('.about-img.no-img').forEach(function (el) {
    el.setAttribute('role', 'img'); el.setAttribute('aria-label', 'Photo placeholder: your photo goes here');
    var note = el.parentNode.querySelector('.about-note'); if (note) note.hidden = true;
  });

  // ---- About facts: <dl data-facts>. Two numbers, both computed from this config so they cannot drift:
  // the Google rating (config.reviews.rating) and the number of treatments on the menu (counted from config.services). ----
  document.querySelectorAll('[data-facts]').forEach(function (dl) {
    var V = C.reviews || {}, n = 0, facts = [];
    (C.services || []).forEach(function (g) { n += (g.items || []).length; });
    if (V.rating) facts.push([String(V.rating), 'on ' + (V.source || 'Google')]);
    if (n) facts.push([String(n), n === 1 ? 'treatment' : 'treatments']);
    if (!facts.length) { dl.hidden = true; return; }
    facts.forEach(function (f) { dl.appendChild(h('div', {}, [h('dt', {}, f[0]), h('dd', {}, f[1])])); });
  });

  // ---- extra colour tokens: every key in config.colours becomes a CSS variable (--key) ----
  var col = C.colours || {};
  Object.keys(col).forEach(function (k) { document.documentElement.style.setProperty('--' + k, col[k]); });

  // ---- display word: config.scriptWord is wrapped so CSS can set it in a display face ----
  document.querySelectorAll('[data-script-word]').forEach(function (el) {
    var t = el.textContent, w = C.scriptWord, i = w ? t.indexOf(w) : -1;
    if (i < 0) return;
    var pre = t.slice(0, i).trim(), post = t.slice(i + w.length).trim();
    el.textContent = '';
    if (pre) { el.appendChild(h('span', { 'class': 'name-pre' }, pre)); el.appendChild(document.createTextNode(' ')); }
    el.appendChild(h('span', { 'class': 'name-script' }, w));
    if (post) { el.appendChild(document.createTextNode(' ')); el.appendChild(h('span', { 'class': 'name-post' }, post)); }
  });

  // ---- treatments: one flat list with ids, used by the menu and the booking form ----
  var groups = C.services || [], flat = [], byId = {}, seen = {};
  groups.forEach(function (g, gi) {
    g.items.forEach(function (it, ii) {
      var label = it.name + (it.extra ? ' (' + it.extra + ')' : '');
      seen[label] = (seen[label] || 0) + 1;
      var t = { id: 't' + gi + '-' + ii, group: g.title, label: label, item: it };
      flat.push(t); byId[t.id] = t;
    });
  });
  // Same treatment name in two groups: the message also names the group.
  flat.forEach(function (t) { t.msg = seen[t.label] > 1 ? t.label + ' - ' + t.group : t.label; });

  // ---- menu: <div data-menu data-book="Request this treatment">. Category tabs, one group shown at a time.
  // A tap on a treatment selects it (the row opens to show a request button) and a bar carries the choice
  // while you browse other categories. Every group is in the page; only the active group is visible. ----
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('[data-menu]').forEach(function (el) {
    var ctaLabel = el.getAttribute('data-book') || 'Request this treatment';
    var tabs = [], panels = [], rows = {}, pickedId = null, current = 0;

    el.appendChild(h('p', { 'class': 'mhint' }, C.servicesHint || 'Choose a category, then tap a treatment to see it and request it.'));
    var tablist = h('div', { 'class': 'mtablist', role: 'tablist', 'aria-label': 'Treatment categories' });
    var tabsBar = h('div', { 'class': 'mtabs' }, [tablist]);
    var panelBox = h('div', { 'class': 'mpanels' });
    el.appendChild(tabsBar); el.appendChild(panelBox);

    groups.forEach(function (g, gi) {
      var tab = h('button', { 'class': 'mtab', type: 'button', role: 'tab', id: 'mtab-' + gi, 'aria-controls': 'mpanel-' + gi, 'aria-selected': 'false', tabindex: '-1' }, g.short || g.title);
      tablist.appendChild(tab); tabs.push(tab);

      var n = g.items.length;
      var panel = h('div', { 'class': 'mpanel', role: 'tabpanel', id: 'mpanel-' + gi, 'aria-labelledby': 'mtab-' + gi });
      panel.hidden = true;
      if (g.image && g.image.src) {
        var im = h('img', { src: g.image.src, alt: g.image.alt || '' });
        if (g.image.w) im.setAttribute('width', g.image.w);
        if (g.image.h) im.setAttribute('height', g.image.h);
        if (g.image.pos && /^[0-9a-z% .-]{1,30}$/i.test(g.image.pos)) im.style.objectPosition = g.image.pos;
        if (g.image.posPhone && /^[0-9a-z% .-]{1,30}$/i.test(g.image.posPhone)) im.style.setProperty('--pos-m', g.image.posPhone);
        if (gi > 0) im.setAttribute('loading', 'lazy');
        panel.appendChild(h('figure', { 'class': 'mcover' }, [im]));
      } else panel.classList.add('no-cover');

      var body = h('div', { 'class': 'mbody' });
      body.appendChild(h('div', { 'class': 'mhead' }, [h('h3', {}, g.title), h('p', { 'class': 'mcount' }, n + (n === 1 ? ' treatment' : ' treatments'))]));
      if (g.note) body.appendChild(h('p', { 'class': 'credit mnote' }, g.note));
      var ul = h('ul', { 'class': 'mlist' });
      g.items.forEach(function (it, ii) {
        var t = byId['t' + gi + '-' + ii];
        var name = h('span', { 'class': 'mname' }, it.name);
        if (it.extra) name.appendChild(h('span', { 'class': 'mdur' }, ' (' + it.extra + ')'));
        var info = h('span', { 'class': 'minfo' }, [name]);
        if (it.desc) info.appendChild(h('span', { 'class': 'desc' }, it.desc));
        var price = h('span', { 'class': 'mprice' + (it.placeholder ? ' is-ph' : '') }, [h('span', { 'class': 'sr-only' }, ', '), it.price || '']);
        var row = h('button', { 'class': 'mrow', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'mdet-' + t.id }, [info, price, h('span', { 'class': 'mmark', 'aria-hidden': 'true' })]);
        var cta = h('a', { 'class': 'btn mcta', href: '#book', 'data-treatment': t.id }, [ctaLabel, h('span', { 'class': 'sr-only' }, ': ' + t.label)]);
        var more = h('div', { 'class': 'mmore' }, [cta, h('p', { 'class': 'mnext' }, 'Next, choose a day and a time.')]);
        var det = h('div', { 'class': 'mdetail', id: 'mdet-' + t.id }, [h('div', { 'class': 'mdetail-in' }, [more])]);
        var li = h('li', { 'class': 'mitem' }, [row, det]);
        rows[t.id] = { li: li, row: row };
        row.addEventListener('click', function () { pick(pickedId === t.id ? null : t.id); });
        ul.appendChild(li);
      });
      body.appendChild(ul); panel.appendChild(body);
      panelBox.appendChild(panel); panels.push(panel);
      tab.addEventListener('click', function () { show(gi, false); });
    });

    // Selected-treatment bar: carries the choice across categories
    var pickLabel = h('p', { 'class': 'mpick-label' }, 'Your choice');
    var pickName = h('p', { 'class': 'mpick-name' });
    var pickGo = h('a', { 'class': 'btn small mpick-go', href: '#book' }, 'Request');
    var pickX = h('button', { 'class': 'mpick-x', type: 'button', 'aria-label': 'Clear selected treatment' });
    var bar = h('div', { 'class': 'mpick', role: 'group', 'aria-label': 'Selected treatment' },
      [h('div', { 'class': 'mpick-text', 'aria-live': 'polite' }, [pickLabel, pickName]), pickGo, pickX]);
    bar.hidden = true; el.appendChild(bar);
    pickX.addEventListener('click', function () { var id = pickedId; pick(null); if (id) rows[id].row.focus(); });

    function pick(id) {
      pickedId = id;
      Object.keys(rows).forEach(function (k) {
        var on = k === id;
        rows[k].li.classList.toggle('is-open', on);
        rows[k].row.setAttribute('aria-expanded', on ? 'true' : 'false');
      });
      bar.hidden = !id;
      if (id) {
        var t = byId[id], it = t.item;
        pickName.textContent = '';
        pickName.appendChild(document.createTextNode(t.msg.replace(/\([^)]*\)/, function (m) { return m.replace(/ /g, '\u00a0'); })));
        if (it.price) pickName.appendChild(h('span', { 'class': 'mpick-price' }, it.price));
        pickGo.setAttribute('data-treatment', id);
        pickGo.setAttribute('aria-label', 'Request ' + t.label);
      }
      live();
    }

    function fades() {
      tablist.classList.toggle('can-l', tablist.scrollLeft > 4);
      tablist.classList.toggle('can-r', tablist.scrollLeft + tablist.clientWidth < tablist.scrollWidth - 4);
    }
    tablist.addEventListener('scroll', fades, { passive: true });
    window.addEventListener('resize', fades);

    function show(i, focus, quiet) {
      var changed = i !== current;
      current = i;
      tabs.forEach(function (t, k) {
        var on = k === i;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        panels[k].hidden = !on;
      });
      if (focus) tabs[i].focus({ preventScroll: !!quiet });
      var t = tabs[i];
      tablist.scrollTo({ left: t.offsetLeft - (tablist.clientWidth - t.offsetWidth) / 2, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      fades();
      // If the tab row is stuck under the header, bring the new group's top into view
      if (changed && !quiet) {
        var stickTop = parseFloat(getComputedStyle(tabsBar).top) || 0, barH = tabsBar.offsetHeight;
        var pt = panelBox.getBoundingClientRect().top;
        if (pt < stickTop + barH) window.scrollTo({ top: window.pageYOffset + pt - stickTop - barH, behavior: 'auto' });
      }
    }
    tablist.addEventListener('keydown', function (ev) {
      var k = ev.key, i = current, n = tabs.length;
      if (k === 'ArrowRight') i = (i + 1) % n;
      else if (k === 'ArrowLeft') i = (i - 1 + n) % n;
      else if (k === 'Home') i = 0;
      else if (k === 'End') i = n - 1;
      else return;
      ev.preventDefault(); show(i, true);
    });

    // Links elsewhere on the page (footer) open the menu on a given category: <a href="#services" data-tab="2">.
    // The browser's own jump to #services does the scrolling, so the tab is switched quietly.
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest ? ev.target.closest('a[data-tab]') : null;
      if (!a) return;
      var i = parseInt(a.getAttribute('data-tab'), 10);
      if (isNaN(i) || i < 0 || i >= tabs.length) return;
      show(i, false, true);
    });

    // On phones the fixed bottom bar gives way to the selection bar while the menu is on screen.
    var inView = false;
    function live() { document.body.classList.toggle('pick-live', inView && !!pickedId); }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) { inView = es[0].isIntersecting; live(); }).observe(el);
    }
    show(0, false);
  });

  // ---- booking request: <form data-booking>. Treatment + preferred date + preferred time -> WhatsApp ----
  var form = document.querySelector('form[data-booking]');
  if (form) {
    var B = C.booking || {};
    var selT = form.querySelector('[name="treatment"]');
    var inD = form.querySelector('[name="date"]');
    var selTime = form.querySelector('[name="time"]');
    var preview = form.querySelector('[data-booking-preview]');
    var status = form.querySelector('[data-booking-status]');
    var KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var DAYNAMES = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
    var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var step = B.step || 30;
    var tried = false;

    groups.forEach(function (g, gi) {
      var og = h('optgroup', { label: g.title });
      g.items.forEach(function (it, ii) { var t = byId['t' + gi + '-' + ii]; og.appendChild(h('option', { value: t.id }, t.label)); });
      selT.appendChild(og);
    });

    function iso(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
    function parse(v) {
      var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || '');
      if (!m) return null;
      var d = new Date(+m[1], +m[2] - 1, +m[3]);
      return d.getMonth() === +m[2] - 1 ? d : null;
    }
    function human(d) { return DAYS[d.getDay()] + ' ' + d.getDate() + ' ' + MONTHS[d.getMonth()] + ' ' + d.getFullYear(); }
    function mins(t) { var p = t.split(':'); return +p[0] * 60 + +p[1]; }

    // booking.hours: { mon: ["08:00","17:00"], ..., sun: null }  (null = closed). Without it: booking.range, or 08:00 to 17:00.
    var widest = B.range || ['08:00', '17:00'];
    if (B.hours) {
      var open = KEYS.map(function (k) { return B.hours[k]; }).filter(Boolean);
      if (open.length) widest = [
        open.map(function (r) { return r[0]; }).sort()[0],
        open.map(function (r) { return r[1]; }).sort().pop()
      ];
    }
    function rangeFor(d) {
      if (!B.hours || !d) return widest;
      var r = B.hours[KEYS[d.getDay()]];
      return r === undefined ? widest : r;
    }
    function fillTimes(r) {
      var keep = selTime.value;
      while (selTime.options.length > 1) selTime.remove(1);
      if (r) for (var m = mins(r[0]); m <= mins(r[1]) - step; m += step) {
        var v = pad(Math.floor(m / 60)) + ':' + pad(m % 60);
        selTime.appendChild(h('option', { value: v }, v));
      }
      selTime.value = keep;
      if (selTime.value !== keep) selTime.value = '';
    }
    inD.setAttribute('min', iso(new Date()));
    fillTimes(widest);

    function check() {
      var now = new Date(), e = {}, t = byId[selT.value], d = parse(inD.value);
      if (!t) e.treatment = 'Please choose a treatment.';
      if (!inD.value) e.date = 'Please choose a date.';
      else if (!d) e.date = 'Please enter a full date.';
      else if (iso(d) < iso(now)) e.date = 'That date has passed. Please choose today or a later date.';
      else if (rangeFor(d) === null) e.date = 'We are closed on ' + DAYNAMES[d.getDay()] + '. Please choose another day.';
      if (!selTime.value) e.time = 'Please choose a time.';
      else if (d && iso(d) === iso(now) && mins(selTime.value) <= now.getHours() * 60 + now.getMinutes()) e.time = 'That time has passed. Please choose a later time.';
      var ok = !e.treatment && !e.date && !e.time;
      return { errors: e, ok: ok,
        message: ok ? (B.message || "Hi, I'd like to book: {treatment} on {date} at {time}. Is that available?")
          .replace('{treatment}', t.msg).replace('{date}', human(d)).replace('{time}', selTime.value) : '' };
    }
    function show(res, withErrors) {
      [['treatment', selT], ['date', inD], ['time', selTime]].forEach(function (f) {
        var p = form.querySelector('[data-error="' + f[0] + '"]'), msg = withErrors ? res.errors[f[0]] : '';
        p.textContent = msg || ''; p.hidden = !msg;
        if (msg) f[1].setAttribute('aria-invalid', 'true'); else f[1].removeAttribute('aria-invalid');
      });
      if (preview) {
        preview.hidden = !res.ok;
        var body = preview.querySelector('[data-booking-message]');
        if (body) body.textContent = res.message;
      }
    }
    function update() {
      var d = parse(inD.value);
      fillTimes(d ? rangeFor(d) : widest);
      if (status) status.textContent = '';
      show(check(), tried);
    }
    [selT, inD, selTime].forEach(function (f) { f.addEventListener('change', update); });
    inD.addEventListener('input', update);

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      tried = true;
      var res = check();
      show(res, true);
      if (!res.ok) {
        var first = res.errors.treatment ? selT : res.errors.date ? inD : selTime;
        first.focus();
        return;
      }
      if (status) status.textContent = 'WhatsApp is opening with your request. Nothing was saved on this website.';
      window.open(waLink(res.message), '_blank', 'noopener');
    });

    // Each treatment's Book link jumps to the form with that treatment already chosen.
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest ? ev.target.closest('a[data-treatment]') : null;
      if (!a) return;
      selT.value = a.getAttribute('data-treatment');
      update();
      setTimeout(function () { selT.focus({ preventScroll: true }); }, 0);
    });
  }

  // ---- reviews: <div data-reviews>. Real reviews word for word, or labelled placeholder cards ----
  document.querySelectorAll('[data-reviews]').forEach(function (el) {
    var V = C.reviews;
    if (!V || !V.items || !V.items.length) {
      var sec = el.closest('section');
      if (sec) {
        sec.hidden = true;
        document.querySelectorAll('a[href="#' + sec.id + '"]').forEach(function (a) { (a.closest('li') || a).hidden = true; });
      }
      return;
    }
    var src = V.source || 'Google';
    if (V.rating && V.count) {
      // The figure is only shown when config carries it (read from the listing on the day). One tidy line under the heading.
      var sum = h('p', { 'class': 'rating' }, [h('span', { 'class': 'rating-num' }, String(V.rating))]);
      if (Number(V.rating) === Math.round(Number(V.rating))) sum.appendChild(stars(Math.round(Number(V.rating))));
      sum.appendChild(h('span', { 'class': 'rating-count' }, V.count + ' reviews on ' + src));
      if (V.checked) sum.appendChild(h('span', { 'class': 'rating-date' }, 'as shown on ' + V.checked));
      var slot = document.querySelector('[data-rating]');
      (slot || el).appendChild(sum);
    }
    // A row of cards that scrolls sideways. The list itself is focusable (arrow keys scroll it) and the two round buttons move it one card.
    var ul = h('ul', { 'class': 'quotes', id: 'reviews-list', tabindex: '0', 'aria-label': 'Reviews. Scroll sideways for more.' });
    V.items.forEach(function (r, i) {
      if (r.placeholder) { ul.appendChild(h('li', { 'class': 'quote is-ph' }, [h('p', {}, r.text)])); return; }
      var fig = h('figure', {}, []);
      if (r.stars) fig.appendChild(stars(r.stars));
      fig.appendChild(h('blockquote', {}, [h('p', {}, r.text)]));
      // avatar: the reviewer's initial in a coloured circle (never a profile photo)
      fig.appendChild(h('figcaption', {}, [h('span', { 'class': 'av av-' + (i % 4), 'aria-hidden': 'true' }, (r.name || '?').charAt(0)), h('span', { 'class': 'meta' }, [h('span', { 'class': 'who' }, r.name || ''), h('span', { 'class': 'src' }, r.label || (src + ' review'))])]));
      ul.appendChild(h('li', { 'class': 'quote' }, [fig]));
    });
    el.appendChild(ul);

    var nav = document.querySelector('[data-reviews-nav]');
    if (nav) {
      var btns = nav.querySelectorAll('button[data-dir]');
      var stepW = function () {
        var a = ul.children[0], b = ul.children[1];
        return b ? b.getBoundingClientRect().left - a.getBoundingClientRect().left : ul.clientWidth;
      };
      var sync = function () {
        var max = ul.scrollWidth - ul.clientWidth;
        nav.hidden = max <= 4;
        btns.forEach(function (b) {
          var off = +b.getAttribute('data-dir') < 0 ? ul.scrollLeft <= 4 : ul.scrollLeft >= max - 4;
          // aria-disabled (not disabled) so keyboard focus is not thrown off the button when the row reaches an end
          b.setAttribute('aria-disabled', off ? 'true' : 'false');
        });
      };
      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          if (b.getAttribute('aria-disabled') === 'true') return;
          ul.scrollBy({ left: +b.getAttribute('data-dir') * stepW(), behavior: reduceMotion.matches ? 'auto' : 'smooth' });
        });
      });
      ul.addEventListener('scroll', sync, { passive: true });
      window.addEventListener('resize', sync);
      sync();
    }
  });
  // ---- location map: a static picture that links out to Google Maps directions. No live map, no iframe, no third-party script,
  // nothing loads from outside the page. config.map = { src, w, h, alt, button, lat, lon }; the directions link is built from config.area.
  // No config.map.src: a "Map goes here" panel is shown and the Get directions button still works. ----
  document.querySelectorAll('[data-map]').forEach(function (el) {
    var M = C.map || {};
    var url = 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(C.area || '');
    var newTab = h('span', { 'class': 'sr-only' }, ' (opens in a new tab)');
    var card = h('div', { 'class': 'map-card' });
    if (M.src) {
      var im = h('img', { src: M.src, alt: M.alt || 'Map showing the studio location', loading: 'lazy' });
      if (M.w) im.setAttribute('width', M.w);
      if (M.h) im.setAttribute('height', M.h);
      card.appendChild(h('a', { 'class': 'map-link', href: url, target: '_blank', rel: 'noopener' }, [im, h('span', { 'class': 'map-tag', 'aria-hidden': 'true' }, 'Open in Google Maps'), newTab.cloneNode(true)]));
      card.appendChild(h('p', { 'class': 'map-credit' }, ['\u00a9 ', h('a', { href: 'https://www.openstreetmap.org/copyright', target: '_blank', rel: 'noopener' }, 'OpenStreetMap contributors')]));
    } else {
      card.appendChild(h('div', { 'class': 'map-empty', role: 'img', 'aria-label': 'Map placeholder' }, [h('span', {}, 'Map goes here')]));
    }
    el.appendChild(card);
    el.appendChild(h('a', { 'class': 'btn map-btn', href: url, target: '_blank', rel: 'noopener' }, [M.button || 'Get directions', newTab]));
  });
  // ---- contact and socials in the Find us column. Only real values are shown: placeholders (phone 000...) and empty fields stay hidden. ----
  document.querySelectorAll('[data-contact]').forEach(function (ul) {
    var rows = [];
    var tel = String(C.phone || '').replace(/\D/g, '');
    if (tel && !/^0+$/.test(tel)) rows.push(['Call', C.phone, 'tel:' + (tel.charAt(0) === '0' ? '+27' + tel.slice(1) : '+' + tel)]);
    if (C.email) rows.push(['Email', C.email, 'mailto:' + C.email]);
    (C.socials || []).forEach(function (s) { if (s && /^https:\/\//.test(s.url || '')) rows.push([s.label, s.handle || s.url.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, ''), s.url, true]); });
    if (!rows.length) { ul.hidden = true; return; }
    rows.forEach(function (r) {
      var a = h('a', { href: r[2] }, [h('span', { 'class': 'c-label' }, r[0]), h('span', { 'class': 'c-val' }, r[1])]);
      if (r[3]) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); }
      ul.appendChild(h('li', {}, [a]));
    });
  });

  // ---- FAQ: accessible accordion (buttons with aria-expanded; one open at a time; smooth height via grid rows) ----
  document.querySelectorAll('[data-faq]').forEach(function (box) {
    var F = C.faq, items = (F && F.items) || [];
    if (!items.length) { var s = box.closest('section'); if (s) s.hidden = true; return; }
    var all = [];
    // An answer may carry one in-page link: a: "... listed {link}, and ...", link: { text, href: "#hours" } (in-page anchors only)
    function answer(it) {
      var a = String(it.a || ''), L = it.link, k = a.indexOf('{link}');
      if (!L || k < 0 || !/^#[\w-]+$/.test(L.href || '')) return h('p', {}, a.replace('{link}', (L && L.text) || ''));
      return h('p', {}, [a.slice(0, k), h('a', { href: L.href }, L.text || ''), a.slice(k + 6)]);
    }
    items.forEach(function (it, i) {
      var btn = h('button', { 'class': 'faq-q', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'faq-a-' + i, id: 'faq-q-' + i }, [h('span', {}, it.q), h('span', { 'class': 'faq-mark', 'aria-hidden': 'true' })]);
      var inner = h('div', { 'class': 'faq-a-in' }, [answer(it), it.placeholder ? h('p', { 'class': 'faq-ph' }, 'Placeholder: to be written with the owner.') : ''].filter(Boolean));
      var panel = h('div', { 'class': 'faq-a', id: 'faq-a-' + i, role: 'region', 'aria-labelledby': 'faq-q-' + i }, [inner]);
      var item = h('div', { 'class': 'faq-item' }, [btn, panel]);
      all.push({ btn: btn, item: item });
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') !== 'true';
        all.forEach(function (o) { o.btn.setAttribute('aria-expanded', 'false'); o.item.classList.remove('is-open'); });
        if (open) { btn.setAttribute('aria-expanded', 'true'); item.classList.add('is-open'); }
      });
      box.appendChild(item);
    });
    all[0].btn.setAttribute('aria-expanded', 'true'); all[0].item.classList.add('is-open');
  });

  // ---- why book here: <ul data-why>. config.why.points = [{ title, text }]. {rating} {count} {checked} are filled from config.reviews,
  // so the figures on this panel can never drift from the reviews block. Facts only: write nothing here the business cannot show. ----
  function fill(t) {
    var V = C.reviews || {};
    return String(t || '').replace('{rating}', V.rating || '').replace('{count}', V.count || '').replace('{checked}', V.checked || '');
  }
  document.querySelectorAll('[data-why]').forEach(function (ul) {
    var pts = (C.why && C.why.points) || [];
    if (!pts.length) { var sec = ul.closest('section'); if (sec) sec.hidden = true; return; }
    pts.forEach(function (p) {
      ul.appendChild(h('li', {}, [h('h3', {}, fill(p.title)), h('p', {}, fill(p.text))]));
    });
  });
  // The collage hides itself when no photo is configured
  document.querySelectorAll('.collage').forEach(function (c) { if (!c.querySelector('img')) c.hidden = true; });

  // ---- insights: <ul data-insights>. SAMPLE article cards: a photo, a caption bar with the title, a "Read more" button and a
  // "Sample article" chip. "Read more" opens a short note inside the card (no dialog, no navigation): these are not real articles. ----
  document.querySelectorAll('[data-insights]').forEach(function (ul) {
    var N = C.insights || {}, items = N.items || [];
    if (!items.length) { var sec = ul.closest('section'); if (sec) sec.hidden = true; return; }
    items.forEach(function (it, i) {
      var kids = [];
      if (it.image && it.image.src) {
        var im = h('img', { src: it.image.src, alt: it.image.alt || '', loading: 'lazy' });
        if (it.image.w) im.setAttribute('width', it.image.w);
        if (it.image.h) im.setAttribute('height', it.image.h);
        if (it.image.pos && /^[0-9a-z% .-]{1,30}$/i.test(it.image.pos)) im.style.objectPosition = it.image.pos;
        if (it.image.posPhone && /^[0-9a-z% .-]{1,30}$/i.test(it.image.posPhone)) im.style.setProperty('--pos-m', it.image.posPhone);
        kids.push(im);
      }
      var note = h('p', { 'class': 'inote', id: 'inote-' + i }, N.sample || 'Sample article. Your own articles and tips would go here.');
      note.hidden = true;
      var go = h('button', { 'class': 'igo', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'inote-' + i }, [N.more || 'Read more', h('span', { 'class': 'sr-only' }, ': ' + it.title)]);
      go.addEventListener('click', function () {
        var open = go.getAttribute('aria-expanded') !== 'true';
        go.setAttribute('aria-expanded', open ? 'true' : 'false'); note.hidden = !open;
      });
      kids.push(h('div', { 'class': 'ibar' }, [
        h('h3', { 'class': 'iname' }, it.title),
        h('div', { 'class': 'imeta' }, [go, h('span', { 'class': 'ichip' }, N.chip || 'Sample article')]),
        note
      ]));
      ul.appendChild(h('li', { 'class': 'icard' }, kids));
    });
  });

  // ---- footer: blurb, treatment links (one per menu category) and contacts. Only real values are shown; otherwise a quiet placeholder. ----
  document.querySelectorAll('[data-foot-blurb]').forEach(function (p) {
    p.textContent = (C.tagline || '') + '.' + (C.badge ? ' ' + C.badge + '.' : '');
  });
  document.querySelectorAll('[data-foot-treatments]').forEach(function (ul) {
    groups.forEach(function (g, gi) {
      ul.appendChild(h('li', {}, [h('a', { href: '#services', 'data-tab': String(gi) }, g.card || g.short || g.title)]));
    });
  });
  document.querySelectorAll('[data-foot-contacts]').forEach(function (ul) {
    var li = h('li', {}, [C.area || '']);
    if (C.addressNote) li.appendChild(h('span', { 'class': 'credit' }, C.addressNote));
    ul.appendChild(li);
    var tel = String(C.phone || '').replace(/\D/g, ''), real = 0;
    if (tel && !/^0+$/.test(tel)) { real++; ul.appendChild(h('li', {}, [h('a', { href: 'tel:' + (tel.charAt(0) === '0' ? '+27' + tel.slice(1) : '+' + tel) }, C.phone)])); }
    if (C.email) { real++; ul.appendChild(h('li', {}, [h('a', { href: 'mailto:' + C.email }, C.email)])); }
    (C.socials || []).forEach(function (s) {
      if (s && /^https:\/\//.test(s.url || '')) { real++; ul.appendChild(h('li', {}, [h('a', { href: s.url, target: '_blank', rel: 'noopener' }, 'Follow on ' + (s.label || 'social media'))])); }
    });
    if (!real) ul.appendChild(h('li', {}, [h('span', { 'class': 'ph-line' }, 'Your phone and email go here.')]));
  });
  // Phone focal points for the photos that sit in plain <img data-img="images.x"> tags: config.images.x.posPhone = "50% 30%"
  document.querySelectorAll('img[data-img]').forEach(function (im) {
    var path = (im.getAttribute('data-img') || '').split('.'), v = C;
    path.forEach(function (k) { v = v && v[k]; });
    if (v && v.posPhone && /^[0-9a-z% .-]{1,30}$/i.test(v.posPhone)) im.style.setProperty('--pos-m', v.posPhone);
  });
  // Photos below the first screen load lazily (the hero stays eager)
  document.querySelectorAll('img[data-img]:not([fetchpriority])').forEach(function (im) { im.setAttribute('loading', 'lazy'); });

  // ---- fixed "Request a booking" bar (phones). It steps aside while any other booking button, the booking form or the footer is on screen,
  // so it never sits on top of another button or of the content. The CSS (body.bar-off) slides it away; reduced motion just hides it. ----
  var fixedBar = document.querySelector('.sticky-cta');
  if (fixedBar && 'IntersectionObserver' in window) {
    var watch = [].slice.call(document.querySelectorAll('.stage .btn[href="#book"], #book, .why-copy .btn[href="#book"], .cta .btn[href="#book"], .visit .btn[href="#book"], .site-foot')), seenNow = [];
    var bio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { var i = seenNow.indexOf(e.target); if (e.isIntersecting && i < 0) seenNow.push(e.target); else if (!e.isIntersecting && i >= 0) seenNow.splice(i, 1); });
      document.body.classList.toggle('bar-off', seenNow.length > 0);
    });
    watch.forEach(function (el) { bio.observe(el); });
  }

  // ---- smooth scroll feel: gentle reveals and a slow hero parallax. Native scrolling is never taken over (no scroll-jacking),
  // nothing external loads, and everything is skipped for visitors who ask for reduced motion. ----
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!calm && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js-rv');
    var groups2 = ['.section-head', '.rev-intro', '.ins-head', '.faq-head', '.faq-item', '.faq-photo', '.book-copy', '.book-form', '.why-copy', '.collage figure', '.rev-nav', '.quote', '.cta-art', '.cta-copy', '.icard', '.about-art', '.about-copy', '.visit-hours', '.visit-find', '.foot-panel'];
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.01, rootMargin: '0px 0px -6% 0px' });
    groups2.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el, i) {
        el.classList.add('rv'); el.style.setProperty('--d', Math.min(i, 4) * 90 + 'ms'); io.observe(el);
      });
    });
    // anything the visitor has already scrolled past (fast drag, anchor jump) is shown, never left hidden
    var tick = false;
    function catchUp() {
      tick = false;
      document.querySelectorAll('.rv:not(.in)').forEach(function (el) { if (el.getBoundingClientRect().top < innerHeight * 0.94) { el.classList.add('in'); io.unobserve(el); } });
    }
    addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(catchUp); } }, { passive: true });
    catchUp();
    // header gains a soft edge once the page moves
    var hdr = document.querySelector('.site-header');
    if (hdr) addEventListener('scroll', function () { hdr.classList.toggle('is-scrolled', scrollY > 8); }, { passive: true });
  }
})();
