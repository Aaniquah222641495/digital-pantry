// Runs before first paint so the page never flashes the wrong side.
// Night (Imaan) is the default; Day (Aaniquah) if the visitor chose it or their device prefers light.
(function () {
  var root = document.documentElement;
  var side = "night";
  try {
    var saved = localStorage.getItem("dp-theme");
    if (saved === "light" || saved === "dark") side = saved === "light" ? "day" : "night";
    else if (window.matchMedia("(prefers-color-scheme: light)").matches) side = "day";
  } catch (e) {}
  root.classList.toggle("dark", side === "night");

  // Scroll reveals may start hidden only when scripts run. If the app has not started
  // within 3.5 s (slow phone, blocked script), show everything.
  root.classList.add("js");
  window.setTimeout(function () {
    if (window.__dpReady) return;
    var els = document.querySelectorAll("[data-reveal]");
    for (var i = 0; i < els.length; i++) els[i].classList.add("is-in");
  }, 3500);
})();
