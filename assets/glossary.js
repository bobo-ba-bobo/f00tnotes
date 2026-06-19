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

  /* ---------- i18n ---------- */
  function L() { return (window.F00TLang && window.F00TLang.get && window.F00TLang.get() === 'ko') ? 'ko' : 'en'; }
  function isKo() { return L() === 'ko'; }
  // pick a localized field: returns <field>_ko in Korean when present
  function pick(o, field) { var k = field + '_ko'; return (isKo() && o[k] != null) ? o[k] : o[field]; }
  function aliasesOf(t) { return (isKo() && t.aliases_ko) ? t.aliases_ko : (t.aliases || []); }

  var STR = {
    en: { openNote: 'Open full note &rarr;', related: 'Related notes', more: 'More notes',
          appearsIn: 'Appears in: ', thinkLike: 'Think of it like', contents: 'Contents',
          glossaryAll: 'ALL NOTES', glossary: 'NOTES', notFound: 'Note not found',
          notExist: 'That note does not exist (yet).',
          indexLede: 'Plain-language notes for every term that shows up in the writing. Hover an underlined term in an article for the quick version, or read the full note here.',
          searchPlaceholder: 'Search terms...', noResult: 'No terms match that search.',
          notes: function (n) { return n + ' notes'; }, articleTitle: 'The Forgetting Problem' },
    ko: { openNote: '전체 각주 열기 &rarr;', related: '관련 각주', more: '다른 각주',
          appearsIn: '수록 글: ', thinkLike: '비유하자면', contents: '목차',
          glossaryAll: '각주 전체', glossary: '각주', notFound: '각주를 찾을 수 없음',
          notExist: '아직 등록되지 않은 각주입니다.',
          indexLede: '글에 등장하는 모든 용어를 쉬운 말로 풀어둔 각주입니다. 글 속 밑줄 친 용어에 마우스를 올리면 짧은 설명이, 클릭하면 전체 설명이 열립니다.',
          searchPlaceholder: '용어 검색...', noResult: '검색과 일치하는 용어가 없습니다.',
          notes: function (n) { return n + '개'; }, articleTitle: '망각의 문제' }
  };
  function S(k) { return (STR[L()] || STR.en)[k]; }
  var CAT_KO = { 'Foundations': '기초', 'Context': '컨텍스트', 'Memory': '메모리',
    'Reasoning': '추론', 'Action': '실행', 'Business': '비즈니스', 'Plumbing': '기반' };
  function catLabel(c) { return isKo() ? (CAT_KO[c] || c) : c; }

  /* ---------- 1. AUTOLINK ---------- */
  // Wrap the first occurrence of each term. One link per term across the whole body.
  function autolink(root) {
    if (!root) return;
    var used = {};
    var aliases = [];
    DATA.forEach(function (t) {
      aliasesOf(t).forEach(function (a) {
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
      link.href = '/notes/' + best.a.slug;
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
    var showTimer = null, hideTimer = null;

    function fill(slug) {
      var t = BY_SLUG[slug];
      if (!t) return false;
      tip.setAttribute('data-slug', slug);
      tip.innerHTML =
        '<div class="tip-head">' +
          '<span class="tip-term">' + escHtml(pick(t, 'term')) + '</span>' +
          '<span class="tip-cat">' + escHtml(catLabel(t.category)) + '</span>' +
        '</div>' +
        '<div class="tip-body">' + escHtml(pick(t, 'hover')) + '</div>' +
        '<div class="tip-foot">' + S('openNote') + '</div>';
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
    function cancelHide() { clearTimeout(hideTimer); }
    function scheduleHide() {
      clearTimeout(hideTimer);
      // generous delay so the cursor can travel from the word into the bubble
      hideTimer = setTimeout(function () {
        tip.classList.remove('show');
        setTimeout(function () { if (!tip.classList.contains('show')) tip.hidden = true; }, 160);
      }, 240);
    }

    function onEnter(e) {
      var link = e.target.closest && e.target.closest('a.gloss');
      if (!link) return;
      cancelHide();
      clearTimeout(showTimer);
      showTimer = setTimeout(function () { show(link); }, 110);
    }
    function onLeave(e) {
      var link = e.target.closest && e.target.closest('a.gloss');
      if (!link) return;
      clearTimeout(showTimer);
      scheduleHide();
    }

    root.addEventListener('mouseover', onEnter);
    root.addEventListener('mouseout', onLeave);

    // keep the bubble alive while the cursor is inside it; click opens the note
    tip.addEventListener('mouseenter', cancelHide);
    tip.addEventListener('mouseleave', scheduleHide);
    tip.addEventListener('click', function () {
      var slug = tip.getAttribute('data-slug');
      if (slug) location.href = '/notes/' + slug;
    });

    // keyboard accessibility
    root.addEventListener('focusin', function (e) {
      var link = e.target.closest && e.target.closest('a.gloss');
      if (link) { cancelHide(); show(link); }
    });
    root.addEventListener('focusout', function (e) {
      var link = e.target.closest && e.target.closest('a.gloss');
      if (link) scheduleHide();
    });
    window.addEventListener('scroll', function () { if (tip.classList.contains('show')) scheduleHide(); }, { passive: true });
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
    if (last && last !== 'notes' && last !== 'notes.html') return last.replace(/\.html$/, '');
    return '';
  }

  function renderConceptPage() {
    var slug = slugFromUrl();
    var titleEl = document.getElementById('g-title');
    var bodyWrap = document.getElementById('g-content');
    if (!bodyWrap) return;

    // no slug -> the glossary index (navigator)
    if (!slug) { renderIndex(titleEl, bodyWrap); return; }

    var t = BY_SLUG[slug];
    if (!t) {
      if (titleEl) titleEl.textContent = S('notFound');
      var catEl0 = document.getElementById('g-cat'); if (catEl0) catEl0.textContent = S('glossary');
      bodyWrap.innerHTML =
        '<p class="g-lede">' + escHtml(S('notExist')) + '</p>' +
        relatedList(null);
      return;
    }

    document.title = pick(t, 'term') + ' - f00tnotes¹';
    if (titleEl) titleEl.textContent = pick(t, 'term');
    var catEl = document.getElementById('g-cat');
    if (catEl) catEl.textContent = S('glossary') + ' / ' + catLabel(t.category).toUpperCase();
    var diffEl = document.getElementById('g-diff');
    if (diffEl) diffEl.textContent = stars(t.difficulty);

    var html = '';
    html += '<p class="g-lede">' + escHtml(pick(t, 'hover')) + '</p>';
    if (t.infographic) {
      html += '<pre class="g-fig">' + escHtml(pick(t, 'infographic')) + '</pre>';
    }
    (pick(t, 'body') || []).forEach(function (p) { html += '<p>' + escHtml(p) + '</p>'; });
    if (pick(t, 'analogy')) {
      html += '<blockquote class="g-analogy"><span class="g-analogy-label">' + escHtml(S('thinkLike')) + '</span>' +
              escHtml(pick(t, 'analogy')) + '</blockquote>';
    }
    html += '<div class="g-appears">' + escHtml(S('appearsIn')) +
            '<a href="/research/the-forgetting-problem">' + escHtml(S('articleTitle')) + '</a></div>';
    html += relatedList(t.slug);
    bodyWrap.innerHTML = html;
  }

  function renderIndex(titleEl, bodyWrap) {
    document.title = S('glossary').charAt(0) + S('glossary').slice(1).toLowerCase() + ' - f00tnotes¹';
    if (titleEl) titleEl.textContent = isKo() ? '각주' : 'Notes';
    var catEl = document.getElementById('g-cat');
    if (catEl) catEl.textContent = S('glossaryAll');
    var diffEl = document.getElementById('g-diff');
    if (diffEl) diffEl.textContent = S('notes')(DATA.length);

    // group by category, preserving first-seen order
    var order = [], groups = {};
    DATA.forEach(function (t) {
      if (!groups[t.category]) { groups[t.category] = []; order.push(t.category); }
      groups[t.category].push(t);
    });

    var html = '<p class="g-lede">' + escHtml(S('indexLede')) + '</p>' +
               '<div class="g-search-wrap">' +
                 '<input id="g-search" type="search" placeholder="' + escHtml(S('searchPlaceholder')) + '" ' +
                 'autocomplete="off" spellcheck="false" />' +
                 '<span class="g-search-count" id="g-search-count"></span>' +
               '</div>' +
               '<div class="g-index">';
    order.forEach(function (cat) {
      html += '<section class="g-group" data-cat="' + escHtml(cat) + '"><div class="g-group-label">' + escHtml(catLabel(cat)) + '</div>';
      groups[cat].forEach(function (t) {
        var hay = (pick(t, 'term') + ' ' + pick(t, 'hover') + ' ' + catLabel(cat) + ' ' +
                   aliasesOf(t).join(' ') + ' ' + (t.aliases || []).join(' ')).toLowerCase();
        html += '<a class="g-entry" data-search="' + escHtml(hay) + '" href="/notes/' + t.slug + '">' +
                  '<span class="g-entry-term">' + escHtml(pick(t, 'term')) + '</span>' +
                  '<span class="g-entry-hover">' + escHtml(pick(t, 'hover')) + '</span>' +
                '</a>';
      });
      html += '</section>';
    });
    html += '</div><p class="g-noresult" id="g-noresult" hidden>' + escHtml(S('noResult')) + '</p>';
    bodyWrap.innerHTML = html;

    // live search
    var input = document.getElementById('g-search');
    var countEl = document.getElementById('g-search-count');
    var noRes = document.getElementById('g-noresult');
    var entries = Array.prototype.slice.call(bodyWrap.querySelectorAll('.g-entry'));
    var groupEls = Array.prototype.slice.call(bodyWrap.querySelectorAll('.g-group'));

    function applyFilter() {
      var q = (input.value || '').trim().toLowerCase();
      var shown = 0;
      entries.forEach(function (el) {
        var match = !q || el.getAttribute('data-search').indexOf(q) !== -1;
        el.hidden = !match;
        if (match) shown++;
      });
      // hide groups with no visible entries
      groupEls.forEach(function (g) {
        var any = g.querySelector('.g-entry:not([hidden])');
        g.hidden = !any;
      });
      if (noRes) noRes.hidden = shown !== 0;
      if (countEl) countEl.textContent = q ? (shown + ' / ' + entries.length) : S('notes')(entries.length);
    }
    if (input) {
      input.addEventListener('input', applyFilter);
      applyFilter();
    }
  }

  var STOP = ('the and for that this with from into your you are but not can its it is they them their what ' +
    'when which will would than then more most some such only just like over even also does done each every ' +
    'one two thing things kind used uses use real about other another need needs make makes made being been ' +
    'have has had how why who out off per via across before after both many much very own way ways lot lots ' +
    'across still keep keeps gets get got let lets').split(' ').reduce(function (m, w) { m[w] = 1; return m; }, {});

  function tokensOf(t) {
    var text = (t.term + ' ' + t.hover + ' ' + (t.body || []).join(' ') + ' ' +
                (t.aliases || []).join(' ') + ' ' + (t.analogy || '')).toLowerCase();
    var set = {};
    text.split(/[^a-z0-9]+/).forEach(function (w) {
      if (w.length > 3 && !STOP[w]) set[w] = 1;
    });
    return set;
  }

  // pick the N most related terms: same-category bonus + shared-keyword overlap
  function relatedTerms(cur, n) {
    var curTok = tokensOf(cur);
    return DATA
      .filter(function (t) { return t.slug !== cur.slug; })
      .map(function (t) {
        var score = (t.category === cur.category) ? 4 : 0;
        var tok = tokensOf(t);
        for (var w in tok) { if (curTok[w]) score += 1; }
        return { t: t, score: score };
      })
      .sort(function (a, b) { return b.score - a.score; })
      .slice(0, n)
      .map(function (x) { return x.t; });
  }

  function relatedList(currentSlug) {
    var cur = BY_SLUG[currentSlug];
    var list = cur ? relatedTerms(cur, 10)
                   : DATA.filter(function (t) { return t.slug !== currentSlug; }).slice(0, 10);
    var label = cur ? S('related') : S('more');
    var items = list.map(function (t) {
      return '<a class="g-chip" href="/notes/' + t.slug + '">' + escHtml(pick(t, 'term')) + '</a>';
    }).join('');
    return '<div class="g-more"><div class="g-more-label">' + label + '</div>' +
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
