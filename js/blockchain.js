/* Navigation enhancement; all primary content remains available without JS. */
(function () {
  "use strict";
  var root = document.documentElement;
  var header = document.getElementById("siteHeader");
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("siteNav");
  var mobile = window.matchMedia("(max-width: 820px)");
  root.classList.add("js");
  function close(restoreFocus) {
    if (!toggle || !nav) return;
    var wasOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation");
    nav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
    if (restoreFocus && wasOpen) toggle.focus();
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute(
        "aria-label",
        open ? "Close navigation" : "Open navigation",
      );
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("nav-open", open);
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        close(false);
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close(true);
    });
    mobile.addEventListener("change", function () {
      close(false);
    });
  }
  function scroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 18);
  }
  window.addEventListener("scroll", scroll, { passive: true });
  scroll();
  // Suspend decorative motion when the illustration or tab is not visible.
  var art = document.querySelector(".chain-hero-art");
  if (art) {
    var artVisible = true;
    function updateArtMotion() {
      art.classList.toggle("is-motion-paused", document.hidden || !artVisible);
    }
    if ("IntersectionObserver" in window) {
      var artObserver = new IntersectionObserver(
        function (entries) {
          artVisible = entries[0].isIntersecting;
          updateArtMotion();
        },
        { threshold: 0 },
      );
      artObserver.observe(art);
    }
    document.addEventListener("visibilitychange", updateArtMotion);
    updateArtMotion();
  }
  var year = document.getElementById("currentYear");
  if (year) year.textContent = String(new Date().getFullYear());
})();
