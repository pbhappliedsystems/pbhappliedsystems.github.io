/* ────────────────────────────────────────────────────────────
 * nav.js — hamburger menu toggle for PBH Applied Systems site
 * External file (rather than inline) so a strict Content-Security-Policy
 * that blocks 'unsafe-inline' scripts will still permit it via
 * script-src 'self'.
 * ──────────────────────────────────────────────────────────── */
(function () {
  var toggle = document.getElementById('navToggle');
  var menu   = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    var isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when any link inside it is tapped, so anchor links
  // don't leave the menu hanging open over the section they jumped to.
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();
