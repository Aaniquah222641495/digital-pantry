/* "Want a website like this?" card on the sites we host as examples (/work/*, /concepts/*),
   founder 2026-10-28. Shows once per visit, closes for the rest of the visit. Nothing is sent. */
(function () {
  'use strict';
  var KEY = 'dp-showcase-closed';
  try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}

  function show() {
    var card = document.createElement('aside');
    card.className = 'dp-showcase';
    card.setAttribute('aria-label', 'Digital Pantry');
    var text = document.createElement('p');
    text.appendChild(document.createTextNode('Want a website like this?'));
    var small = document.createElement('small');
    small.textContent = 'Digital Pantry made it.';
    text.appendChild(small);
    var cta = document.createElement('a');
    cta.href = '/contact?interest=mockup';
    cta.textContent = 'Get a free mock-up';
    var close = document.createElement('button');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close');
    close.textContent = '×';
    close.addEventListener('click', function () {
      card.remove();
      try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    });
    card.appendChild(text);
    card.appendChild(cta);
    card.appendChild(close);
    document.body.appendChild(card);
    requestAnimationFrame(function () { requestAnimationFrame(function () { card.classList.add('is-open'); }); });
  }
  window.addEventListener('load', function () { setTimeout(show, 1200); });
})();
