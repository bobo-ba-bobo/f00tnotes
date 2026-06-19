/* f00tnotes glossary engine
 * - autolink(root): wrap the FIRST occurrence of each glossary term in body text
 * - initTooltips(root): footnote-style hover bubble on .gloss links
 * - renderConceptPage(): render a single concept page from the slug in the URL
 * Depends on window.F00T_GLOSSARY (assets/glossary-data.js).
 */
(function () {
  'use strict';

  var DATA = (window.F00T_GLOSSARY && window.F00T_GLOSSARY.terms) || [];
  var BY_SLUG = {};
  DATA.forEach(function (t) { BY_SLUG[t.slug] = t; });

  function escHtml(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function escReg(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  /* ---------- 1. AUTOLINK ---------- */
  // Wrap the first occurrence of each term. One link per term across the whole body.
  function autolink(root) {
    if (!root) return;
    var used = {};
    var aliases = [];
    DATA.forEach(function (t) {
      (t.aliases || []).forEach(function (a) {
        aliases.push({ slug: t.slug, text: a, len: a.length });
      });
    });
    // longest aliases first so "context window" wins over a bare "context"
    aliases.sort(function (a, b) { return b.len - a.len; });
    aliases.forEach(function (a) {
      // boundary: not preceded/followed by a word char or hyphen
      a.re = new RegExp('(^|[^\\w-])(' + escReg(a.text) + ')(?![\\w-])', 'i');
    });

    // snapshot eligible text nodes (skip code, pre, headings, existing links, .no-gloss)
    var nodes = [];
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        while (p && p !== root) {
          var tag = p.nodeName;
          if (tag === 'CODE' || tag === 'PRE' || tag === 'A' || /^H[1-6]$/.test(tag)) {
            return NodeFilter.FILTER_REJECT;
          }
          if (p.classList && p.classList.contains('no-gloss')) return NodeFilter.FILTER_REJECT;
          p = p.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(processNode);

    function processNode(node) {
      var text = node.nodeValue;
      var best = null;
      for (var i = 0; i < aliases.length; i++) {
        var a = aliases[i];
        if (used[a.slug]) continue;
        var m = a.re.exec(text);
        if (!m) continue;
        var idx = m.index + m[1].length;
        if (best === null || idx < best.idx || (idx === best.idx && a.len > best.matchLen)) {
          best = { a: a, idx: idx, matchLen: m[2].length, matched: m[2] };
        }
      }
      if (!best) return;
      used[best.a.slug] = true;

      var before = text.slice(0, best.idx);
      var after = text.slice(best.idx + best.matchLen);
      var frag = document.createDocumentFragment();
      if (before) frag.appendChild(document.createTextNode(before));

      var link = document.createElement('a');
      link.href = '/glossary/' + best.a.slug;
      link.className = 'gloss';
      link.setAttribute('data-slug', best.a.slug);
      link.textContent = best.matched;
      frag.appendChild(link);

      var afterNode = document.createTextNode(after);
      frag.appendChild(afterNode);
      node.parentNode.replaceChild(frag, node);

      if (after) processNode(afterNode); // catch other terms later in the same sentence
    }
  }

  /* ---------- 2. TOOLTIP ---------- */
  function initTooltips(root) {
    root = root || document;
    var tip = document.getElementById('gloss-tip');
    if (!tip) {
      tip = document.createElement('div');
      tip.id = 'gloss-tip';
      tip.setAttribute('role', 'tooltip');
      tip.hidden = true;
      document.body.appendChild(tip);
    }
    var showTimer = null, hideTimer = null, current = null;

    function fill(slug) {
      var t = BY_SLUG[slug];
      if (!t) return false;
      tip.innerHTML =
        '<div class="tip-head">' +
          '<span class="tip-term">' + escHtml(t.term) + '</span>' +
          '<span class="tip-cat">' + escHtml(t.category) + '</span>' +
        '</div>' +
        '<div class="tip-body">' + escHtml(t.hover) + '</div>' +
        '<div class="tip-foot">Open full note &rarr;</div>';
      return true;
    }

    function place(linkEl) {
      // measure off-screen first
      tip.hidden = false;
      var r = linkEl.getBoundingClientRect();
      var tr = tip.getBoundingClientRect();
      var margin = 10, gap = 8;
      var left = r.left + (r.width / 2) - (tr.width / 2);
      left = Math.max(margin, Math.min(left, window.innerWidth - tr.width - margin));
      var top = r.bottom + gap;            // below the word by default
      var below = true;
      if (top + tr.height > window.innerHeight - margin && r.top - gap - tr.height > margin) {
        top = r.top - gap - tr.height;     // flip above if no room below
        below = false;
      }
      tip.style.left = (left + window.scrollX) + 'px';
      tip.style.top = (top + window.scrollY) + 'px';
      tip.setAttribute('data-pos', below ? 'below' : 'above');
    }

    function show(linkEl) {
      var slug = linkEl.getAttribute('data-slug');
      if (!fill(slug)) return;
      place(linkEl);
      requestAnimationFrame(function () { tip.classList.add('show'); });
    }
    function hide() {
      tip.classList.remove('show');
      hideTimer = setTimeout(function () { tip.hidden = true; }, 140);
    }

    function onEnter(e) {
      var link = e.target.closest && e.target.closest('a.gloss');
      if (!link) return;
      clearTimeout(hideTimer);
      clearTimeout(showTimer);
      current = link;
      showTimer = setTimeout(function () { show(link); }, 110);
    }
    function onLeave(e) {
      var link = e.target.closest && e.target.closest('a.gloss');
      if (!link) return;
      clearTimeout(showTimer);
      hideTimer = setTimeout(hide, 80);
    }

    root.addEventListener('mouseover', onEnter);
    root.addEventListener('mouseout', onLeave);
    // keyboard accessibility
    root.addEventListener('focusin', function (e) {
      var link = e.target.closest && e.target.closest('a.gloss');
      if (link) { current = link; show(link); }
    });
    root.addEventListener('focusout', function (e) {
      var link = e.target.closest && e.target.closest('a.gloss');
      if (link) hide();
    });
    window.addEventListener('scroll', function () { if (!tip.hidden) hide(); }, { passive: true });
  }

  /* ---------- 3. CONCEPT PAGE ---------- */
  function stars(n) {
    n = n || 1;
    return '★★★'.slice(0, n) + '☆☆☆'.slice(0, 3 - n);
  }
  function slugFromUrl() {
    var qs = new URLSearchParams(location.search);
    if (qs.get('term')) return qs.get('term');
    var parts = location.pathname.replace(/\/+$/, '').split('/');
    var last = parts[parts.length - 1];
    if (last && last !== 'glossary' && last !== 'glossary.html') return last.replace(/\.html$/, '');
    return '';
  }

  function renderConceptPage() {
    var slug = slugFromUrl();
    var t = BY_SLUG[slug];
    var titleEl = document.getElementById('g-title');
    var bodyWrap = document.getElementById('g-content');
    if (!bodyWrap) return;

    if (!t) {
      if (titleEl) titleEl.textContent = 'Term not found';
      bodyWrap.innerHTML =
        '<p class="g-lede">That glossary entry does not exist (yet).</p>' +
        relatedList(null);
      return;
    }

    document.title = t.term + ' - f00tnotes glossary';
    if (titleEl) titleEl.textContent = t.term;
    var catEl = document.getElementById('g-cat');
    if (catEl) catEl.textContent = 'GLOSSARY / ' + t.category.toUpperCase();
    var diffEl = document.getElementById('g-diff');
    if (diffEl) diffEl.textContent = stars(t.difficulty);

    var html = '';
    html += '<p class="g-lede">' + escHtml(t.hover) + '</p>';
    if (t.infographic) {
      html += '<pre class="g-fig">' + escHtml(t.infographic) + '</pre>';
    }
    (t.body || []).forEach(function (p) { html += '<p>' + escHtml(p) + '</p>'; });
    if (t.analogy) {
      html += '<blockquote class="g-analogy"><span class="g-analogy-label">Think of it like</span>' +
              escHtml(t.analogy) + '</blockquote>';
    }
    html += '<div class="g-appears">Appears in: ' +
            '<a href="/research/the-forgetting-problem">The Forgetting Problem</a></div>';
    html += relatedList(t.slug);
    bodyWrap.innerHTML = html;
  }

  function relatedList(currentSlug) {
    var items = DATA
      .filter(function (t) { return t.slug !== currentSlug; })
      .map(function (t) {
        return '<a class="g-chip" href="/glossary/' + t.slug + '">' + escHtml(t.term) + '</a>';
      }).join('');
    return '<div class="g-more"><div class="g-more-label">More notes</div>' +
           '<div class="g-chips">' + items + '</div></div>';
  }

  window.F00T = {
    autolink: autolink,
    initTooltips: initTooltips,
    renderConceptPage: renderConceptPage,
    data: DATA,
    bySlug: BY_SLUG
  };
})();
