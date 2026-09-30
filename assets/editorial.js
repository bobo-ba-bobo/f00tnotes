/* Navigation and keyboard access shared across the publication. */
(function () {
  var main = document.querySelector('main, .page, .wrap');
  if (main) {
    if (!main.id) main.id = 'main-content';
    var skip = document.createElement('a');
    skip.className = 'skip-link'; skip.href = '#' + main.id;
    skip.textContent = document.documentElement.dataset.lang === 'ko' ? '본문으로 건너뛰기' : 'Skip to content';
    document.body.prepend(skip);
    main.setAttribute('tabindex', '-1');
  }
  var links = document.querySelector('.nav-links');
  if (links && !links.querySelector('a[href="/startupdb"]')) {
    var item = document.createElement('li');
    item.innerHTML = '<a href="/startupdb">Startup DB</a>';
    var instagram = links.querySelector('a[href*="instagram"]');
    links.insertBefore(item, instagram ? instagram.closest('li') : links.lastElementChild);
  }
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var path = new URL(a.href).pathname;
    if (new URL(a.href).origin === location.origin && (path === location.pathname || (path !== '/' && location.pathname.indexOf(path + '/') === 0))) {
      a.classList.add('active'); a.setAttribute('aria-current', 'page');
    }
  });
})();
