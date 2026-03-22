(async () => {

// ── 1. Load fonts ───────────────────────────────────────────────────────
const FONTS = [
  { family: 'IBM Plex Mono', style: 'Regular' },
  { family: 'IBM Plex Mono', style: 'Bold' },
  { family: 'Inter', style: 'Light' },
  { family: 'Inter', style: 'Regular' },
  { family: 'Inter', style: 'Medium' },
  { family: 'Inter', style: 'Semi Bold' },
  { family: 'Inter', style: 'Bold' },
];
for (const f of FONTS) {
  try { await figma.loadFontAsync(f); } catch(e) { console.warn('font skip:', f.family, f.style); }
}

// ── 2. Tokens ────────────────────────────────────────────────────────────
const rgb = h => ({
  r: parseInt(h.slice(1,3),16)/255,
  g: parseInt(h.slice(3,5),16)/255,
  b: parseInt(h.slice(5,7),16)/255,
});
const solid  = c     => [{ type:'SOLID', color: rgb(c) }];
const solidA = (c,a) => [{ type:'SOLID', color: rgb(c), opacity: a }];

const C = {
  bg:      '#0C0C0C', raised:  '#141414', elevated:'#1C1C1C',
  bdS:     '#1E1E1E', bd:      '#2A2A2A', bdH:     '#3A3A3A',
  t1:      '#F0F0F0', t2:      '#888888', t3:      '#4A4A4A',
  accent:  '#E8F5E0',
};

// ── 3. Helpers ────────────────────────────────────────────────────────────
const W_MAP = { 300:'Light', 400:'Regular', 500:'Medium', 600:'Semi Bold', 700:'Bold' };

function T(str, o = {}) {
  const n = figma.createText();
  const fam = o.mono ? 'IBM Plex Mono' : 'Inter';
  const sty = typeof o.w === 'number' ? (W_MAP[o.w] || 'Regular') : (o.w || 'Regular');
  try { n.fontName = { family: fam, style: sty }; }
  catch(e) { n.fontName = { family:'Inter', style:'Regular' }; }
  n.characters = String(str);
  n.fontSize   = o.sz  ?? 14;
  n.fills      = solid(o.c ?? C.t1);
  n.textAutoResize = 'WIDTH_AND_HEIGHT';
  if (o.ls != null) n.letterSpacing = { value: o.ls,  unit:'PERCENT' };
  if (o.lh != null) n.lineHeight    = { value: o.lh,  unit:'PERCENT' };
  return n;
}

function Rect(w, h, c, o = {}) {
  const n = figma.createRectangle();
  n.resize(w, h);
  n.fills = solid(c);
  if (o.r)  n.cornerRadius = o.r;
  if (o.sc) { n.strokes = [{ type:'SOLID', color: rgb(o.sc) }]; n.strokeWeight = 1; n.strokeAlign = 'INSIDE'; }
  return n;
}

function stroke(node, c) {
  node.strokes = [{ type:'SOLID', color: rgb(c) }];
  node.strokeWeight = 1;
  node.strokeAlign = 'INSIDE';
}

function Frame(name, dir, spacing, pad = 0) {
  const n = figma.createFrame();
  n.name = name;
  n.layoutMode  = dir === 'H' ? 'HORIZONTAL' : 'VERTICAL';
  n.itemSpacing = spacing;
  n.primaryAxisSizingMode   = 'AUTO';
  n.counterAxisSizingMode   = 'AUTO';
  n.fills = [];
  const p = Array.isArray(pad) ? pad : [pad, pad, pad, pad];
  [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft] = p;
  return n;
}

function SectionHeader(num, title, desc) {
  const f = Frame(`hdr`, 'V', 8);
  f.appendChild(T(String(num).padStart(2,'0'), { sz:11, mono:true, c:C.t3, ls:14 }));
  f.appendChild(T(title, { sz:24, w:600, ls:-2 }));
  if (desc) f.appendChild(T(desc, { sz:13, c:C.t2, lh:160 }));
  return f;
}

function Divider() {
  const r = Rect(1200, 1, C.bdS);
  r.name = 'divider';
  return r;
}

function Btn(label, bg, tc, sc=null, sz=11, pv=10, ph=20) {
  const f = Frame(label, 'H', 0, [pv, ph, pv, ph]);
  f.primaryAxisAlignItems   = 'CENTER';
  f.counterAxisAlignItems   = 'CENTER';
  f.primaryAxisSizingMode   = 'AUTO';
  f.counterAxisSizingMode   = 'AUTO';
  f.fills        = solid(bg);
  f.cornerRadius = 4;
  if (sc) stroke(f, sc);
  f.appendChild(T(label, { sz, mono:true, w:'Bold', ls:8, c:tc }));
  return f;
}

function Tag(label, bg=C.raised, tc=C.t2, sc=C.bd) {
  const f = Frame(label, 'H', 0, [3, 10, 3, 10]);
  f.primaryAxisAlignItems = 'CENTER';
  f.counterAxisAlignItems = 'CENTER';
  f.fills        = solid(bg);
  f.cornerRadius = 4;
  stroke(f, sc);
  f.appendChild(T(label, { sz:10, mono:true, ls:8, c:tc }));
  return f;
}

// ── 4. Build ──────────────────────────────────────────────────────────────
const MAIN = figma.createFrame();
MAIN.name   = 'f00tnotes¹ — Design System';
MAIN.layoutMode   = 'VERTICAL';
MAIN.itemSpacing  = 80;
MAIN.paddingTop   = 100; MAIN.paddingBottom = 120;
MAIN.paddingLeft  = 120; MAIN.paddingRight  = 120;
MAIN.primaryAxisSizingMode = 'AUTO';
MAIN.counterAxisSizingMode = 'FIXED';
MAIN.resize(1440, 100);
MAIN.fills = solid(C.bg);

const add = n => MAIN.appendChild(n);

// ── HEADER ──────────────────────────────────────────────────────
{
  const f = Frame('Header', 'V', 16);
  f.appendChild(T('Design System  ·  v1.0', { sz:11, mono:true, c:C.t3, ls:14 }));
  f.appendChild(T('f00tnotes¹', { sz:56, w:700, mono:true, ls:-3 }));
  f.appendChild(T('Dark-first. Monochromatic. IBM Plex Mono + Inter.', { sz:16, c:C.t2, lh:160 }));
  add(f);
}
add(Divider());

// ── 01. COLOR ────────────────────────────────────────────────────
{
  const sec = Frame('01 · Color', 'V', 40);
  sec.appendChild(SectionHeader(1, 'Color', '단일 색조. 배경-텍스트-경계선 3계층. Accent는 극히 제한적으로.'));

  const groups = [
    { label:'Background', items:[
      { name:'--bg',          hex:'#0C0C0C', desc:'Page background' },
      { name:'--bg-raised',   hex:'#141414', desc:'Cards, panels'   },
      { name:'--bg-elevated', hex:'#1C1C1C', desc:'Hover surfaces'  },
    ]},
    { label:'Text', items:[
      { name:'--text-1', hex:'#F0F0F0', desc:'Headings, body' },
      { name:'--text-2', hex:'#888888', desc:'Meta, labels'   },
      { name:'--text-3', hex:'#4A4A4A', desc:'Disabled'       },
    ]},
    { label:'Border & Accent', items:[
      { name:'--border-subtle', hex:'#1E1E1E', desc:'Faint dividers' },
      { name:'--border',        hex:'#2A2A2A', desc:'Standard'       },
      { name:'--accent',        hex:'#E8F5E0', desc:'Sparingly only' },
    ]},
  ];

  for (const g of groups) {
    const gf = Frame(g.label, 'V', 12);
    gf.appendChild(T(g.label.toUpperCase(), { sz:10, mono:true, c:C.t3, ls:14 }));

    const row = Frame('swatches', 'H', 12);
    for (const s of g.items) {
      const sw = figma.createFrame();
      sw.name = s.name;
      sw.layoutMode = 'VERTICAL'; sw.itemSpacing = 0;
      sw.primaryAxisSizingMode = 'AUTO'; sw.counterAxisSizingMode = 'FIXED';
      sw.resize(164, 100); sw.fills = solid(C.raised);
      sw.cornerRadius = 8; sw.clipsContent = true;
      stroke(sw, C.bdS);

      sw.appendChild(Rect(164, 64, s.hex));

      const info = Frame('info', 'V', 4, [10, 12, 12, 12]);
      info.fills = solid(C.raised);
      info.appendChild(T(s.name, { sz:11, mono:true, w:'Bold' }));
      info.appendChild(T(s.hex,  { sz:11, mono:true, c:C.t3   }));
      info.appendChild(T(s.desc, { sz:11, mono:true, c:C.t2   }));
      sw.appendChild(info);
      row.appendChild(sw);
    }
    gf.appendChild(row);
    sec.appendChild(gf);
  }
  add(sec);
}
add(Divider());

// ── 02. TYPOGRAPHY ───────────────────────────────────────────────
{
  const sec = Frame('02 · Typography', 'V', 0);
  sec.appendChild(SectionHeader(2, 'Typography', 'IBM Plex Mono — 브랜드/nav/레이블.  Inter — 본문/제목.'));
  sec.appendChild(Rect(1, 40, C.bg)); // spacer

  const rows = [
    { meta:'5xl · 60px · 600', sample:'Display',                                    sz:60, w:600, ls:-3 },
    { meta:'4xl · 48px · 600', sample:'Heading 1',                                  sz:48, w:600, ls:-3 },
    { meta:'3xl · 38px · 600', sample:'Heading 2',                                  sz:38, w:600, ls:-2 },
    { meta:'2xl · 30px · 600', sample:'Heading 3',                                  sz:30, w:600, ls:-2 },
    { meta:'xl  · 24px · 600', sample:'Heading 4',                                  sz:24, w:600, ls:-2 },
    { meta:'lg  · 20px · 500', sample:'Subtitle',                                   sz:20, w:500, ls:-2 },
    { meta:'md  · 17px · 400 · Lead',      sample:'Lead paragraph — sets context.', sz:17, w:400, c:C.t2 },
    { meta:'base· 15px · 400 · Body',      sample:'Body text. The primary reading experience.', sz:15, w:400 },
    { meta:'sm  · 13px · 400 · Secondary', sample:'Meta, timestamps, annotations.',  sz:13, w:400, c:C.t2 },
    { meta:'Mono· 12px · Nav', sample:'RESEARCH  ·  COMPANIES  ·  ABOUT',            sz:12, mono:true, ls:14, c:C.t2 },
    { meta:'Mono· 10px · Tag', sample:'AI / ML  ·  ISSUE #12  ·  2026-W12',          sz:10, mono:true, ls:14, c:C.t3 },
  ];

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    const row = Frame('type-row', 'H', 40);
    row.counterAxisAlignItems = 'CENTER';
    row.appendChild(T(r.meta, { sz:11, mono:true, c:C.t3 }));
    row.appendChild(T(r.sample, { sz:r.sz, w:r.w, mono:r.mono||false, c:r.c||C.t1, ls:r.ls??0 }));
    sec.appendChild(row);
    if (i < rows.length - 1) sec.appendChild(Rect(1200, 1, C.bdS));
  }
  add(sec);
}
add(Divider());

// ── 03. SPACING ──────────────────────────────────────────────────
{
  const sec = Frame('03 · Spacing', 'V', 0);
  sec.appendChild(SectionHeader(3, 'Spacing', '4px 기반 스케일. --sp-4 (16px)가 기본 단위.'));
  sec.appendChild(Rect(1, 40, C.bg));

  const spaces = [
    ['--sp-1',4],['--sp-2',8],['--sp-3',12],['--sp-4',16],['--sp-5',20],
    ['--sp-6',24],['--sp-8',32],['--sp-10',40],['--sp-12',48],['--sp-16',64],['--sp-24',96],
  ];
  for (let i = 0; i < spaces.length; i++) {
    const [token, px] = spaces[i];
    const row = Frame('sp', 'H', 32);
    row.counterAxisAlignItems = 'CENTER';
    row.appendChild(T(`${token}  ·  ${px}px`, { sz:11, mono:true, c:C.t2 }));
    row.appendChild(Rect(px, 6, C.t1, { r:2 }));
    sec.appendChild(row);
    if (i < spaces.length - 1) sec.appendChild(Rect(1200, 1, C.bdS));
  }
  add(sec);
}
add(Divider());

// ── 04. BUTTONS ──────────────────────────────────────────────────
{
  const sec = Frame('04 · Buttons', 'V', 32);
  sec.appendChild(SectionHeader(4, 'Buttons', 'IBM Plex Mono uppercase. 4가지 variant × 3가지 size.'));

  const vg = Frame('variants', 'V', 16);
  vg.appendChild(T('VARIANTS', { sz:10, mono:true, c:C.t3, ls:14 }));
  const vr = Frame('row', 'H', 12); vr.counterAxisAlignItems = 'CENTER';
  vr.appendChild(Btn('PRIMARY', C.t1,      C.bg));
  vr.appendChild(Btn('GHOST',   C.bg,      C.t2, C.bdH));
  vr.appendChild(Btn('MUTED',   C.elevated,C.t2));
  vr.appendChild(Btn('ACCENT',  C.accent,  C.bg));
  vg.appendChild(vr); sec.appendChild(vg);

  const sg = Frame('sizes', 'V', 16);
  sg.appendChild(T('SIZES', { sz:10, mono:true, c:C.t3, ls:14 }));
  const sr = Frame('row', 'H', 12); sr.counterAxisAlignItems = 'CENTER';
  sr.appendChild(Btn('SMALL',  C.t1, C.bg, null, 10,  6, 14));
  sr.appendChild(Btn('MEDIUM', C.t1, C.bg, null, 11, 10, 20));
  sr.appendChild(Btn('LARGE',  C.t1, C.bg, null, 13, 14, 28));
  sg.appendChild(sr); sec.appendChild(sg);

  add(sec);
}
add(Divider());

// ── 05. TAGS ─────────────────────────────────────────────────────
{
  const sec = Frame('05 · Tags', 'V', 24);
  sec.appendChild(SectionHeader(5, 'Tags & Badges', '섹터 태그, 이슈 번호, 상태 표시.'));

  const row = Frame('tags', 'H', 8);
  row.counterAxisAlignItems = 'CENTER';
  ['AI / ML','Space Economy','Biotech','Fintech','W12 · 2026'].forEach(l => row.appendChild(Tag(l)));

  const at = Frame('NEW', 'H', 0, [3, 10, 3, 10]);
  at.primaryAxisAlignItems = 'CENTER'; at.counterAxisAlignItems = 'CENTER';
  at.fills = solidA(C.accent, 0.15); at.cornerRadius = 4; at.strokes = [];
  at.appendChild(T('NEW', { sz:10, mono:true, ls:8, c:C.accent }));
  row.appendChild(at);

  sec.appendChild(row);
  add(sec);
}
add(Divider());

// ── 06. CARDS ────────────────────────────────────────────────────
{
  const sec = Frame('06 · Cards', 'V', 24);
  sec.appendChild(SectionHeader(6, 'Research Card', '홈 피드, 리서치 리스트 카드.'));

  function Card(issue, title, body, tags) {
    const f = figma.createFrame();
    f.name = `card · ${issue}`;
    f.layoutMode = 'VERTICAL'; f.itemSpacing = 12;
    f.paddingTop = 24; f.paddingBottom = 24;
    f.paddingLeft = 24; f.paddingRight = 24;
    f.primaryAxisSizingMode = 'AUTO';
    f.counterAxisSizingMode = 'FIXED';
    f.resize(320, 100);
    f.fills = solid(C.raised); f.cornerRadius = 8;
    stroke(f, C.bdS);

    f.appendChild(T(issue, { sz:10, mono:true, c:C.t3, ls:14 }));

    const tN = figma.createText();
    try { tN.fontName = { family:'Inter', style:'Semi Bold' }; } catch(e) {}
    tN.characters = title; tN.fontSize = 17;
    tN.fills = solid(C.t1);
    tN.letterSpacing = { value:-2, unit:'PERCENT' };
    tN.lineHeight    = { value:130, unit:'PERCENT' };
    tN.textAutoResize = 'HEIGHT';
    tN.resize(272, 20);
    f.appendChild(tN);

    const bN = figma.createText();
    try { bN.fontName = { family:'Inter', style:'Regular' }; } catch(e) {}
    bN.characters = body; bN.fontSize = 13;
    bN.fills = solid(C.t2);
    bN.lineHeight = { value:160, unit:'PERCENT' };
    bN.textAutoResize = 'HEIGHT';
    bN.resize(272, 20);
    f.appendChild(bN);

    const tr = Frame('tags', 'H', 6); tr.counterAxisAlignItems = 'CENTER';
    tags.forEach(t => tr.appendChild(Tag(t, C.elevated, C.t2, C.bd)));
    f.appendChild(tr);
    return f;
  }

  const cardRow = Frame('cards', 'H', 16);
  cardRow.counterAxisAlignItems = 'MIN';
  cardRow.appendChild(Card('2026 · W12','NVIDIA GTC 2026 — What Actually Matters','GB300, 차세대 NVLink, 로봇 파운데이션 모델. 발표 뒤에 숨은 실질적 의미.',['AI / ML','Semiconductors']));
  cardRow.appendChild(Card('2026 · W11',"Niantic's Spatial Intelligence Layer",'AR을 넘어 공간 데이터 인프라로. Niantic이 쌓아온 것의 진짜 가치.',['AR / XR','Infrastructure']));
  cardRow.appendChild(Card('2026 · W10','The Edge AI Stack Is Consolidating','온디바이스 추론 시장의 레이어별 승자 구조. 누가 마진을 가져가는가.',['Edge AI']));
  sec.appendChild(cardRow);
  add(sec);
}

// ── Done ────────────────────────────────────────────────────────
figma.currentPage.appendChild(MAIN);
figma.viewport.scrollAndZoomIntoView([MAIN]);
console.log('✓ f00tnotes Design System created!');

})();
