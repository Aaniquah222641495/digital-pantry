/* dp-mockups shared script. Reads window.MOCKUP (set in the template's config.js)
   and fills the page. Everything is written with textContent, never innerHTML. */
(function () {
  'use strict';
  var C = window.MOCKUP;
  if (!C) { console.error('config.js did not load (window.MOCKUP missing).'); return; }

  // ---- small helpers ---------------------------------------------------
  function h(tag, attrs, kids) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    [].concat(kids == null ? [] : kids).forEach(function (k) {
      e.appendChild(typeof k === 'string' ? document.createTextNode(k) : k);
    });
    return e;
  }
  function get(path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, C);
  }
  function lum(hex) {
    var n = parseInt(hex.replace('#', ''), 16);
    return [n >> 16, (n >> 8) & 255, n & 255].map(function (v) {
      v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }).reduce(function (s, v, i) { return s + v * [0.2126, 0.7152, 0.0722][i]; }, 0);
  }
  function contrast(a, b) {
    var x = lum(a), y = lum(b), hi = Math.max(x, y), lo = Math.min(x, y);
    return (hi + 0.05) / (lo + 0.05);
  }

  // ---- theme -------------------------------------------------------------
  var col = C.colours || {};
  var root = document.documentElement;
  ['primary', 'accent', 'ink', 'bg', 'soft'].forEach(function (k) {
    if (col[k]) root.style.setProperty('--' + k, col[k]);
  });
  if (col.primary) {
    // Pick whichever of white / ink gives the better contrast on the primary colour.
    var onP = contrast(col.primary, '#ffffff') >= contrast(col.primary, col.ink || '#000000') ? '#ffffff' : (col.ink || '#000000');
    root.style.setProperty('--on-primary', onP);
    if (contrast(col.primary, onP) < 4.5) console.warn('Primary colour contrast is below 4.5:1. Pick a darker or lighter primary.');
  }
  if (C.headingFont) root.setAttribute('data-font', C.headingFont);

  // ---- contact links -------------------------------------------------------
  function waNumber() {
    var d = String(C.whatsapp || '').replace(/\D/g, '');
    return d.charAt(0) === '0' ? '27' + d.slice(1) : d;
  }
  function waLink(msg) {
    return 'https://wa.me/' + waNumber() + '?text=' + encodeURIComponent(msg || C.waMessage || '');
  }

  document.title = C.name + (C.tagline ? ' | ' + C.tagline : '');
  var desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute('content', (C.tagline || C.name) + ' (website mock-up)');

  // ---- simple bindings -----------------------------------------------------
  document.querySelectorAll('[data-bind]').forEach(function (el) {
    var v = get(el.getAttribute('data-bind'));
    if (v == null || v === '') { if (el.hasAttribute('data-optional')) el.hidden = true; return; }
    el.textContent = v;
  });
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    el.setAttribute('href', waLink(el.getAttribute('data-wa') || ''));
    el.setAttribute('rel', 'noopener');
    el.setAttribute('target', '_blank');
  });
  document.querySelectorAll('[data-tel]').forEach(function (el) {
    el.setAttribute('href', 'tel:+' + waNumber());
    if (!el.textContent.trim()) el.textContent = C.phone;
  });
  document.querySelectorAll('[data-mail]').forEach(function (el) {
    el.setAttribute('href', 'mailto:' + C.email);
    if (!el.textContent.trim()) el.textContent = C.email;
  });
  document.querySelectorAll('[data-logo]').forEach(function (el) {
    if (C.logo) {
      el.appendChild(h('img', { src: C.logo, alt: C.name + ' logo', height: '36' }));
    } else {
      // Text logo: monogram + name. Use this when we have no permission to use their logo.
      el.appendChild(h('span', { 'class': 'mono', 'aria-hidden': 'true' }, C.name.charAt(0).toUpperCase()));
      el.appendChild(h('span', {}, C.name));
    }
  });

  // ---- images (optional) ------------------------------------------------------
  // <img data-img="images.hero"> reads { src, alt, w, h } (or a plain path string) from config.
  // No value: the img is removed and its [data-img-box] gets class "no-img" (CSS shows a placeholder).
  function imgObj(v) { return typeof v === 'string' ? { src: v } : v; }
  function applyImg(el, v) {
    var o = imgObj(v);
    el.setAttribute('src', o.src);
    el.setAttribute('alt', o.alt || '');
    if (o.w) el.setAttribute('width', o.w);
    if (o.h) el.setAttribute('height', o.h);
  }
  document.querySelectorAll('img[data-img]').forEach(function (el) {
    var v = get(el.getAttribute('data-img'));
    if (!v) {
      var box = el.closest('[data-img-box]');
      if (box) box.classList.add('no-img');
      el.remove();
      return;
    }
    applyImg(el, v);
  });

  // ---- renderers (data-render="..." data-source="config.path") -------------
  var R = {
    hours: function (el, rows) {
      var dl = h('dl', { 'class': 'hours' });
      rows.forEach(function (r) { dl.appendChild(h('div', {}, [h('dt', {}, r.days), h('dd', {}, r.time)])); });
      el.appendChild(dl);
    },
    priced: function (el, groups) {
      // data-book="Book": adds a WhatsApp link per item, pre-filled with that item's name.
      // item.placeholder: true marks a row as "your content goes here" (no real details yet).
      var bookLabel = el.getAttribute('data-book');
      groups.forEach(function (g) {
        var sec = h('div', { 'class': 'priced-sec' }, [h('h3', {}, g.title)]);
        if (g.image) {
          var gi = h('img', {}); applyImg(gi, g.image);
          sec.insertBefore(h('figure', { 'class': 'cover' }, [gi]), sec.firstChild);
        }
        if (g.note) sec.appendChild(h('p', { 'class': 'credit' }, g.note));
        var ul = h('ul', { 'class': 'priced' });
        g.items.forEach(function (i) {
          var name = i.name + (i.extra ? ' (' + i.extra + ')' : '');
          var row = h('div', { 'class': 'row' }, [h('span', {}, name)]);
          if (i.price) row.appendChild(h('span', { 'class': 'price' }, i.price));
          var li = h('li', i.placeholder ? { 'class': 'is-ph' } : {}, [row]);
          if (i.desc) li.appendChild(h('p', { 'class': 'desc' }, i.desc));
          if (bookLabel) {
            li.appendChild(h('a', {
              'class': 'book', target: '_blank', rel: 'noopener',
              href: waLink('Hi ' + C.name + ", I'd like to book: " + i.name + '.')
            }, [bookLabel, h('span', { 'class': 'sr-only' }, ': ' + i.name)]));
          }
          ul.appendChild(li);
        });
        sec.appendChild(ul);
        el.appendChild(sec);
      });
    },
    cards: function (el, items) {
      items.forEach(function (i) {
        var c = h('div', { 'class': 'card' }, [h('h3', {}, i.title)]);
        if (i.meta) c.appendChild(h('p', { 'class': 'meta' }, i.meta));
        if (i.text) c.appendChild(h('p', {}, i.text));
        el.appendChild(c);
      });
    },
    steps: function (el, items) {
      items.forEach(function (s) { el.appendChild(h('li', {}, [h('div', {}, [h('strong', {}, s.title), h('p', {}, s.text)])])); });
    },
    gallery: function (el, labels) {
      labels.forEach(function (l) {
        el.appendChild(h('figure', { 'class': 'ph', role: 'img', 'aria-label': 'Placeholder image: ' + l }, [h('span', {}, l)]));
      });
    },
    photos: function (el, items) {
      // Strings render as labelled placeholder slots; { src, alt, w, h } objects render as photos.
      items.forEach(function (p) {
        if (typeof p === 'string') {
          el.appendChild(h('figure', { 'class': 'ph', role: 'img', 'aria-label': 'Placeholder image: ' + p }, [h('span', {}, p)]));
        } else {
          var im = h('img', {}); applyImg(im, p);
          el.appendChild(h('figure', { 'class': 'shot' }, [im]));
        }
      });
    },
    paragraphs: function (el, items) {
      items.forEach(function (t) { el.appendChild(h('p', {}, t)); });
    },
    table: function (el, rows) {
      // data-cols="key:Heading,key:Heading"
      var cols = el.getAttribute('data-cols').split(',').map(function (c) { var p = c.split(':'); return { k: p[0], t: p[1] }; });
      var table = h('table', {});
      var cap = el.getAttribute('data-caption');
      if (cap) table.appendChild(h('caption', {}, cap));
      table.appendChild(h('thead', {}, [h('tr', {}, cols.map(function (c) { return h('th', { scope: 'col' }, c.t); }))]));
      var tb = h('tbody', {});
      rows.forEach(function (r) {
        tb.appendChild(h('tr', {}, cols.map(function (c, idx) {
          return h(idx === 0 ? 'th' : 'td', idx === 0 ? { scope: 'row' } : {}, r[c.k] == null ? '' : String(r[c.k]));
        })));
      });
      table.appendChild(tb);
      el.appendChild(table);
    }
  };
  document.querySelectorAll('[data-render]').forEach(function (el) {
    var data = get(el.getAttribute('data-source'));
    var fn = R[el.getAttribute('data-render')];
    if (!fn || !data) { console.warn('Nothing to render for', el.getAttribute('data-source')); return; }
    fn(el, data);
  });

  // ---- mock-up forms: never send anything ----------------------------------
  document.querySelectorAll('form[data-mock-form]').forEach(function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var s = f.querySelector('[data-form-status]');
      if (s) s.textContent = 'Mock-up only: nothing was sent. On the real site this goes to ' + (C.name || 'the business') + '.';
    });
  });
})();
