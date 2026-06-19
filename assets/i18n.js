/* f00tnotes language toggle (en <-> ko)
 * - reads/writes localStorage, default 'en'
 * - sets <html data-lang> as early as possible (loaded in <head>) to avoid a flash
 * - injects CSS so [data-en]/[data-ko] elements show only in the active language
 * - wires any .lang-toggle button in the nav
 * Content rendered by JS (glossary, article) reads window.F00TLang.get().
 */
(function () {
  'use strict';
  var KEY = 'f00t-lang';

  function get() {
    try { return localStorage.getItem(KEY) === 'ko' ? 'ko' : 'en'; }
    catch (e) { return 'en'; }
  }
  function apply(l) { document.documentElement.setAttribute('data-lang', l); }
  function set(l) {
    l = (l === 'ko') ? 'ko' : 'en';
    try { localStorage.setItem(KEY, l); } catch (e) {}
    apply(l);
  }

  // apply immediately (script is in <head>, before body paints)
  apply(get());

  // language-span visibility + toggle button styling
  var css =
    '[data-lang="en"] [data-ko]{display:none !important}' +
    '[data-lang="ko"] [data-en]{display:none !important}' +
    '.lang-toggle{font-family:"IBMPlexMono",monospace;font-size:11px;text-transform:uppercase;' +
      'letter-spacing:0.1em;color:var(--text-3);background:none;border:1px solid var(--border);' +
      'border-radius:4px;padding:6px 0;cursor:pointer;transition:color .15s,border-color .15s;' +
      'min-width:60px;text-align:center;box-sizing:border-box;}' +
    '.lang-toggle:hover{color:var(--text-1);border-color:var(--border-h);}';
  var st = document.createElement('style');
  st.textContent = css;
  (document.head || document.documentElement).appendChild(st);

  function toggle() { set(get() === 'en' ? 'ko' : 'en'); location.reload(); }
  function label() { return get() === 'en' ? '한국어' : 'EN'; }

  function mount() {
    var btns = document.querySelectorAll('.lang-toggle');
    for (var i = 0; i < btns.length; i++) {
      btns[i].textContent = label();
      btns[i].setAttribute('aria-label', 'Toggle language');
      btns[i].addEventListener('click', toggle);
    }
  }
  if (document.readyState !== 'loading') mount();
  else document.addEventListener('DOMContentLoaded', mount);

  window.F00TLang = { get: get, set: set, toggle: toggle };
})();
