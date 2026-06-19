/* f00tnotes - 어드민이 발행한 글을 클라이언트에서 렌더링 */
(function () {
  'use strict';

  var POSTS_INDEX = '/_admin/posts/index.json';

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function fmtDate(iso) {
    var d = new Date(iso);
    if (isNaN(d.getTime())) return '';
    var p = function (n) { return String(n).padStart(2, '0'); };
    return d.getFullYear() + '.' + p(d.getMonth() + 1) + '.' + p(d.getDate());
  }

  // published 글만, 오래된 순으로 번호(No.) 부여
  function loadIndex() {
    return fetch(POSTS_INDEX, { cache: 'no-store' }).then(function (res) {
      if (!res.ok) throw new Error('index fetch failed');
      return res.json();
    }).then(function (all) {
      return all
        .filter(function (p) { return p.status === 'published'; })
        .sort(function (a, b) { return new Date(a.createdAt) - new Date(b.createdAt); })
        .map(function (p, i) { p.no = String(i + 1).padStart(3, '0'); return p; });
    });
  }

  // 목록 그리드 (index.html, research.html)
  window.renderPostGrid = function (gridId) {
    var grid = document.getElementById(gridId);
    if (!grid) return;
    loadIndex().then(function (posts) {
      if (!posts.length) {
        grid.innerHTML =
          '<div class="card empty"><span class="card-coming">Coming soon</span></div>' +
          '<div class="card empty"><span class="card-coming">Coming soon</span></div>' +
          '<div class="card empty"><span class="card-coming">Coming soon</span></div>';
        return;
      }
      var display = posts.slice().reverse(); // 최신 먼저
      grid.innerHTML = display.map(function (p) {
        // a post may override its destination with `url` (hand-authored pages);
        // otherwise it renders through the generic /post?id= template (admin posts)
        var href = p.url ? p.url : ('/post?id=' + encodeURIComponent(p.id));
        return '' +
          '<a class="card" href="' + href + '">' +
            '<div class="card-meta">' +
              '<span class="card-issue">No. ' + p.no + '</span>' +
              '<span class="card-dot"></span>' +
              '<span class="card-issue">' + fmtDate(p.createdAt) + '</span>' +
            '</div>' +
            '<div class="card-title">' + esc(p.title) + '</div>' +
            '<div class="card-footer">' +
              '<div class="card-tags">' +
                (p.createdBy ? '<span class="tag">' + esc(p.createdBy) + '</span>' : '') +
              '</div>' +
              '<span class="card-arrow">↗</span>' +
            '</div>' +
          '</a>';
      }).join('');
    }).catch(function () {
      grid.innerHTML = '<div class="card empty"><span class="card-coming">목록을 불러오지 못했습니다</span></div>';
    });
  };

  // 글 본문 (post.html). marked 가 먼저 로드돼 있어야 함.
  window.renderPost = function () {
    var params = new URLSearchParams(location.search);
    var id = params.get('id');
    var titleEl = document.getElementById('art-title');
    var bodyEl = document.getElementById('art-body');
    var noEl = document.getElementById('art-no');
    var dateEl = document.getElementById('art-date');
    var catEl = document.getElementById('art-cat');
    var ledeEl = document.getElementById('art-lede');
    var coverWrap = document.getElementById('art-cover-wrap');
    var coverImg = document.getElementById('art-cover');
    var authorEl = document.getElementById('art-author');
    var authorDot = document.getElementById('art-author-dot');

    function fail(msg) { if (bodyEl) bodyEl.innerHTML = '<p>' + esc(msg) + '</p>'; }

    if (!id) { fail('글을 찾을 수 없습니다.'); return; }

    loadIndex().then(function (posts) {
      var post = posts.find(function (p) { return p.id === id; });
      if (!post) { if (titleEl) titleEl.textContent = 'Not found'; fail('해당 글을 찾을 수 없습니다.'); return; }

      document.title = post.title + ' - f00tnotes¹';
      if (titleEl) titleEl.textContent = post.title;
      if (noEl) noEl.textContent = 'No. ' + post.no;
      if (dateEl) dateEl.textContent = fmtDate(post.createdAt);
      if (catEl) catEl.textContent = (post.category || 'Research').toUpperCase();
      if (ledeEl && post.subtitle) { ledeEl.textContent = post.subtitle; ledeEl.hidden = false; }
      if (authorEl && post.createdBy) {
        authorEl.textContent = post.createdBy; authorEl.hidden = false;
        if (authorDot) authorDot.hidden = false;
      }
      if (coverWrap && coverImg && post.cover) { coverImg.src = post.cover; coverWrap.hidden = false; }

      var mdPath = post.publishedPath || '';
      if (mdPath.charAt(0) !== '/') mdPath = '/' + mdPath;
      return fetch(mdPath, { cache: 'no-store' }).then(function (res) {
        if (!res.ok) throw new Error('md fetch failed');
        return res.text();
      }).then(function (md) {
        // 헤더가 제목/리드문/커버를 이미 보여주므로 본문 맨 앞 중복 제거
        md = md.replace(/^\s*#\s+(.*)\n?/, function (m, t) {
          return t.trim() === String(post.title).trim() ? '' : m;
        });
        md = md.replace(/^\s*\*[^\n*][^\n]*\*\s*\n?/, '');        // 선두 이탤릭 리드문
        md = md.replace(/^\s*!\[[^\]]*\]\([^)]*\)\s*\n?/, '');    // 선두 커버 이미지
        bodyEl.innerHTML = (typeof marked !== 'undefined')
          ? marked.parse(md)
          : '<pre>' + esc(md) + '</pre>';
      });
    }).catch(function () { fail('본문을 불러오지 못했습니다.'); });
  };
})();
