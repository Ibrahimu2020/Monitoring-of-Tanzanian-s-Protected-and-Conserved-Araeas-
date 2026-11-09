/* Welcome pop-up: covers the whole interface on first load of each browser session */
(function () {
  var KEY = 'tfw-welcome-seen';
  try { if (sessionStorage.getItem(KEY)) return; } catch (e) {}

  var overlay = document.createElement('div');
  overlay.className = 'welcome-overlay';
  overlay.innerHTML =
    '<div class="welcome-card" role="dialog" aria-modal="true" aria-labelledby="welcome-title" aria-describedby="welcome-text">' +
      '<div class="welcome-top"><span id="welcome-title">Welcome</span></div>' +
      '<div class="welcome-body">' +
        '<h2>Empowering Conservation through Satellite Intelligence</h2>' +
        '<p id="welcome-text">This portal brings interactive Earth observation and Geospatial analysis of our forest ecosystem in a real time, directly to researchers, conservationists and decision-makers.</p>' +
      '</div>' +
      '<div class="welcome-foot"><button type="button" class="welcome-close">Close</button></div>' +
    '</div>';

  var previous = document.activeElement;

  function close() {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) {}
    document.removeEventListener('keydown', onKey);
    document.body.classList.remove('welcome-open');
    overlay.remove();
    if (previous && previous.focus) previous.focus();
  }
  function onKey(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'Tab') { e.preventDefault(); btn.focus(); } /* keep focus inside the dialog */
  }

  document.body.appendChild(overlay);
  document.body.classList.add('welcome-open');
  var btn = overlay.querySelector('.welcome-close');
  btn.addEventListener('click', close);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
  document.addEventListener('keydown', onKey);
  btn.focus();
})();
