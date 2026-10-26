(function () {
  var root = document.documentElement;
  var KEY_THEME = 'xenamorph-theme';
  var KEY_USER = 'xenamorph_user';

  function applyTheme(mode) {
    if (mode === 'dark') root.setAttribute('data-theme', 'dark');
    else root.removeAttribute('data-theme');
    var btn = document.getElementById('theme-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', String(mode === 'dark'));
      btn.setAttribute('aria-label', mode === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
      var lbl = btn.querySelector('.lbl');
      if (lbl) lbl.textContent = mode === 'dark' ? 'Terang' : 'Gelap';
    }
    try { localStorage.setItem(KEY_THEME, mode); } catch (e) {}
  }

  var saved = 'light';
  try { saved = localStorage.getItem(KEY_THEME) || 'light'; } catch (e) {}
  applyTheme(saved === 'dark' ? 'dark' : 'light');

  function getUser() {
    try {
      var u = JSON.parse(localStorage.getItem(KEY_USER) || 'null');
      return u && u.username ? u : null;
    } catch (e) { return null; }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.addEventListener('click', function () {
      applyTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });

    // Sinkron status login dengan dashboard (kunci localStorage yang sama)
    var user = getUser();
    if (user) {
      document.querySelectorAll('[data-guest]').forEach(function (el) { el.hidden = true; });
      document.querySelectorAll('[data-user]').forEach(function (el) { el.hidden = false; });
      document.querySelectorAll('.js-username').forEach(function (el) { el.textContent = '@' + user.username; });
      document.querySelectorAll('[data-cta-main]').forEach(function (el) {
        var label = el.querySelector('span');
        if (label) label.textContent = 'Lanjut ke dashboard';
      });
    }

    // Simulasi chat: dimainkan sekali saat halaman dibuka
    var chat = document.getElementById('chat');
    if (chat && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      var msgs = chat.querySelectorAll('.msg');
      chat.classList.add('is-playing');
      msgs.forEach(function (m, i) {
        setTimeout(function () { m.classList.add('show'); }, 600 + i * 1100);
      });
    }
  });
})();
