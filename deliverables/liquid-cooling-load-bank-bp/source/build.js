// 液冷假负载洁净验证服务 商业计划书 — pptxgenjs build (adjusted deck, 15 slides)
// Run: NODE_PATH=<pptxbuild/node_modules> node build.js
// The p9 diagram is recoloured to the deck palette by recolor_diagram.py (diagram_mono.png, kept next to this file).
const path = require('path');
const fs = require('fs');
const pptxgen = require('pptxgenjs');
const JSZip = require('jszip');
const HS = require('/home/user/ALL-STEWARDS-SURVEY/skills/business-plan-and-consulting/assets/house_style.js');

const OUT_DIR = __dirname;
const IN_DIR = '/tmp/claude-0/-home-user-ALL-STEWARDS-SURVEY/915057e1-292a-5d90-abce-ed32ac18baf5/scratchpad/bp_in';
const OUT = path.join(OUT_DIR, 'deck.pptx');

// ---------- palette, fonts, geometry ----------
// One accent (deep navy #051C2C, as the spec sets it), one ink, three greys. Nothing else may appear in the XML.
const ACCENT = '051C2C';
const P = { ...HS.PALETTE.consulting, ink: '1F1F1F', primary: ACCENT, accent: ACCENT, dark: '595959',
  grey1: '595959', grey2: '595959', grey3: 'B3B3B3', grey4: 'D9D9D9', grey5: 'D9D9D9', bg: 'FFFFFF' };
const ALLOWED = ['1F1F1F', '595959', 'B3B3B3', 'D9D9D9', ACCENT];
const INK = P.ink, GREY = P.grey1, RULE = P.grey4, ACC = P.accent;
const FONT = 'Microsoft YaHei';           // post-processed to latin Arial + ea Microsoft YaHei
// the space before the date separates title and date; the date itself is set tight like all other text
const DOC_TITLE = '液冷假负载洁净验证服务 商业计划书 2026年11月';

HS.SIZE.title = 24;                        // placeholder options win over slide options, so set before defineLayouts
HS.GEO.title.h = 0.95;
HS.SIZE.source = 8;                        // slide number size in the layout
// Header zone: title top-anchored at 0.35; subtitle at one fixed y just above the rule;
// the thin rule and the body start never move.
const SUB_Y = 1.30, RULE_Y = 1.64, BODY_Y = 1.8, BODY_BOTTOM = 6.35;
const LX = 0.5, FULL_W = 12.33, RX = 12.83;

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.author = 'Ryan Chen';
pres.company = 'Allstewards';
pres.title = '液冷假负载洁净验证服务 商业计划书';
pres.subject = '商业计划书';
pres.revision = '4';
pres.theme = { headFontFace: 'Arial', bodyFontFace: 'Arial' };

HS.defineLayouts(pres, P, { cjk: true, confidential: '保密', docTitle: DOC_TITLE });
{
  const lay = pres.slideLayouts.find(l => l._name === 'CONTENT');
  // the layout rule sits at a fixed y below the lowest subtitle position
  lay._slideObjects.forEach(o => { if (o._type === 'text' && o.text === null && o.options && o.options.line) o.options.y = RULE_Y; });
  // drop the unused sub/body placeholders so no slide carries empty ghost boxes
  lay._slideObjects = lay._slideObjects.filter(o => !(o._type === 'placeholder' && ['sub', 'body'].includes(o.options.placeholder)));
  lay._slideObjects.forEach(o => { if (o.options && o.options.fontSize === 7) o.options.fontSize = 8; });
  lay._slideNumberProps.fontSize = 8;
  // the house COVER / DIVIDER layouts are not used in this deck
  for (let i = pres.slideLayouts.length - 1; i >= 0; i--) {
    if (['COVER', 'DIVIDER'].includes(pres.slideLayouts[i]._name)) pres.slideLayouts.splice(i, 1);
  }
}
// Cover: white, title placeholder, no page number and no document title; only 保密 at the footer position.
pres.defineSlideMaster({
  title: 'TITLE_PAGE',
  background: { color: P.bg },
  objects: [
    { text: { text: '保密', options: { x: 4.5, y: 7.05, w: 4.3, h: 0.25, fontFace: FONT, fontSize: 8, color: GREY,
      align: 'center', isTextBox: true, margin: 0 } } },
    { placeholder: { options: { name: 'title', type: 'title', x: 0.75, y: 2.6, w: 11.8, h: 0.85, fontFace: FONT,
      fontSize: 40, bold: true, color: INK, align: 'left', valign: 'top', margin: 0 } } },
  ],
});
HS.SIZE.source = 9;                        // source lines are 9 pt
HS.FONT.latin = FONT;                      // source line font (patched to Arial/YaHei split later)

// ---------- text measuring and line breaking ----------
// Widths in em: CJK and full-width forms 1.0; Latin from Arial metrics.
const LATIN_W = { ' ': 0.278, '.': 0.278, ',': 0.278, ':': 0.278, ';': 0.278, '/': 0.278, '-': 0.333, '–': 0.556,
  '(': 0.333, ')': 0.333, '%': 0.889, '×': 0.584, '≤': 0.548, '<': 0.584, '>': 0.584, 'µ': 0.556, '$': 0.556,
  "'": 0.191, '&': 0.667, '+': 0.584, '=': 0.584 };
const UPPER = { A: .667, B: .667, C: .722, D: .722, E: .667, F: .611, G: .778, H: .722, I: .278, J: .5, K: .667, L: .556,
  M: .833, N: .722, O: .778, P: .667, Q: .778, R: .722, S: .667, T: .611, U: .722, V: .667, W: .944, X: .667, Y: .667, Z: .611 };
const LOWER = { a: .556, b: .556, c: .5, d: .556, e: .556, f: .278, g: .556, h: .556, i: .222, j: .222, k: .5, l: .222,
  m: .833, n: .556, o: .556, p: .556, q: .556, r: .333, s: .5, t: .278, u: .556, v: .5, w: .722, x: .5, y: .5, z: .5 };
const isWide = ch => { const c = ch.codePointAt(0); return c >= 0x2E80 || (c >= 0x2460 && c <= 0x24FF) || '“”‘’—…'.includes(ch); };
const hasWide = t => [...t].some(isWide);
// No manual space between Chinese and Latin letters or numerals: LibreOffice already adds its own CJK/Latin
// spacing, so a typed space shows as a double gap, and PowerPoint sets the text tight. Spaces around ×, between
// two Chinese characters, between Latin words and before ≤ < > stay. The '|' '~' '^' line-break markers are looked through.
const TIGHT = /[A-Za-z0-9%$µ]/;
function tidy(text) {
  const c = [...String(text)];
  const out = [];
  for (let i = 0; i < c.length; i++) {
    if (c[i] !== ' ') { out.push(c[i]); continue; }
    let j = i; while (j < c.length && c[j] === ' ') j++;
    let a = out.length - 1; while (a >= 0 && '|~^'.includes(out[a])) a--;
    let b = j; while (b < c.length && '|~^'.includes(c[b])) b++;
    const L = a >= 0 ? out[a] : '', R = c[b] || '';
    const drop = L && R && ((isWide(L) && TIGHT.test(R)) || (TIGHT.test(L) && isWide(R)));
    if (!drop) for (let k = i; k < j; k++) out.push(' ');
    i = j - 1;
  }
  return out.join('');
}
// LibreOffice adds a little space where CJK meets Latin; 0.2 em per switch keeps the estimate on the safe side.
function emWidth(text, bold) {
  let em = 0, prev = null;
  for (const ch of text) {
    if (ch === '|' || ch === '~' || ch === '^') continue;
    if (ch !== ' ') { const cls = isWide(ch); if (prev !== null && cls !== prev) em += 0.2; prev = cls; }
    if (isWide(ch)) { em += 1.0; continue; }
    let w = LATIN_W[ch];
    if (w == null) w = /[0-9]/.test(ch) ? 0.556 : (UPPER[ch] || LOWER[ch] || 0.556);
    em += bold ? w * 1.07 : w;
  }
  return em;
}
// Line breaking. Break opportunities, never inside a word or between a number and its unit:
//   strong: after Chinese punctuation, or at a manual '|' marker (removed from the text)
//   weak:   before 与/和/及/并/或, after 的, at the space after a Latin word (English text wraps by word),
//           or at a manual '~' marker (removed)
// a manual '^' (removed) glues: the punctuation break right after it is not taken
const PUNCT = '，、；：。！？';
const NO_BREAK_PAIR = new Set(['参与', '给与', '以及', '涉及', '普及', '危及', '合并', '总和', '的确']);
function segments(text) {
  const chars = [...tidy(text)];
  const out = []; let cur = '', depth = 0, glue = false; // inside （…） a punctuation break only counts as weak
  const push = strong => { if (cur) out.push({ text: cur, strong }); cur = ''; };
  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i], prev = chars[i - 1] || '', next = chars[i + 1] || '';
    if (ch === '|') { push(true); continue; }
    if (ch === '~') { push(false); continue; }
    if (ch === '^') { glue = true; continue; }
    if (cur && '与和及并或'.includes(ch) && isWide(prev) && !PUNCT.includes(prev) && !NO_BREAK_PAIR.has(prev + ch)) push(false);
    // where a Latin word meets Chinese text (the space that used to sit there is gone), never after a numeral
    else if (cur && /[A-Za-z]/.test(prev) && isWide(ch) && !PUNCT.includes(ch) && !'）》”'.includes(ch)) push(false);
    cur += ch;
    if (ch === '（') depth++;
    if (ch === '）') depth = Math.max(0, depth - 1);
    if (PUNCT.includes(ch)) { if (glue) glue = false; else push(depth === 0); }
    else if (ch === '的' && next && isWide(next) && !PUNCT.includes(next) && !NO_BREAK_PAIR.has(ch + next)) push(false);
    else if (ch === ' ' && next && !PUNCT.includes(next)) {
      // after a Latin word (one with a letter, so never between a number and its unit), before Chinese or more Latin
      const word = cur.trimEnd().split(/\s/).pop();
      if (/[A-Za-z]/.test(word) && !hasWide(word) && (isWide(next) || /[A-Za-z0-9$]/.test(next))) push(false);
    }
  }
  push(true);
  return out;
}
// items: [{text, o, w, strong}] -> array of lines (arrays of items).
// Dynamic programming over the allowed breaks: fewest lines first, then breaks at punctuation, then even fill,
// and no stub of a last line.
function pack(items, cap) {
  const n = items.length;
  if (!n) return [[]];
  const pre = [0];
  items.forEach(it => pre.push(pre[pre.length - 1] + it.w));
  const best = Array(n + 1).fill(Infinity), from = Array(n + 1).fill(-1);
  best[0] = 0;
  for (let j = 1; j <= n; j++) {
    for (let i = j - 1; i >= 0; i--) {
      const w = pre[j] - pre[i];
      if (w > cap && i < j - 1) break;
      let c = 1000 + (w > cap ? 500 : 0);
      if (j < n) {
        const r = (cap - Math.min(w, cap)) / cap;
        c += r * r * 100 + (items[j - 1].strong ? 0 : 30);
      } else if (i > 0 && w < 0.2 * cap) c += 40;
      if (best[i] + c < best[j]) { best[j] = best[i] + c; from[j] = i; }
    }
  }
  const lines = [];
  for (let j = n; j > 0; j = from[j]) lines.unshift(items.slice(from[j], j));
  return lines;
}
function countLines(lines, full) {
  let n = 0;
  lines.forEach(ln => {
    const lw = ln.reduce((a, b) => a + b.w, 0), k = Math.max(1, Math.ceil(lw / full));
    if (k > 1) console.warn(`  wraps naturally (${k} lines): ${ln.map(x => x.text).join('')}`);
    n += k;
  });
  return n;
}
function fitLines(text, widthIn, pt, o = {}) {
  const full = widthIn * 72 / pt, cap = full * (o.fill || 0.96);
  const items = segments(text).map(sg => ({ ...sg, w: emWidth(sg.text, o.bold) }));
  const lines = pack(items, cap);
  return { lines: lines.map(ln => ln.map(x => x.text).join('')), n: countLines(lines, full) };
}
// Runs for one paragraph: segs = [{text, o}] (o = run options). Line breaks are soft breaks inside the paragraph.
function paraRuns(segs, widthIn, pt, fill) {
  if (typeof segs === 'string') segs = [{ text: segs }];
  const full = widthIn * 72 / pt, cap = full * (fill || 0.96);
  const items = [];
  segs.forEach(sg => segments(sg.text).forEach(x => {
    const o = sg.o || {}, f = (o.fontSize || pt) / pt;
    items.push({ text: x.text, strong: x.strong, o, w: emWidth(x.text, o.bold) * f });
  }));
  const lines = pack(items, cap);
  const n = countLines(lines, full);
  const runs = [];
  lines.forEach((ln, li) => {
    let prev = null;
    ln.forEach((it, k) => {
      const key = JSON.stringify(it.o);
      if (prev && prev.key === key) { prev.text += it.text; return; }
      prev = { text: it.text, key, options: { ...it.o, ...(li > 0 && k === 0 ? { softBreakBefore: true } : {}) } };
      runs.push(prev);
    });
  });
  runs.forEach(r => delete r.key);
  return { runs, n };
}
const LH = 1.5;                            // Noto / YaHei natural line height in em (estimate, slightly generous)
const lineIn = (pt, mult = 1) => pt * LH * mult / 72;
const nudge = pt => 0.2 * pt / 72;         // drops a Latin-only line onto the baseline of a CJK line beside it

function T(slide, text, o) {
  const opts = { x: LX, w: FULL_W, h: 0.3, fontFace: FONT, fontSize: 13, color: INK, align: 'left', valign: 'top',
    isTextBox: true, margin: 0, lang: 'zh-CN', ...o };
  if (Array.isArray(text)) text = text.map(r => ({ text: tidy(r.text), options: { lang: 'zh-CN', ...(r.options || {}) } }));
  else text = tidy(text);
  slide.addText(text, opts);
}
// Title (manual line breaks, so no word or number is ever split) and the subtitle directly under its last line.
function head(slide, titleLines, sub) {
  const lines = (Array.isArray(titleLines) ? titleLines : [titleLines]).map(tidy);
  lines.forEach(l => { if (emWidth(l, true) > (12.33 * 72 / 24) * 0.97) console.warn('TITLE LINE TOO LONG:', l); });
  slide.addText(lines.map((t, i) => ({ text: t, options: { lang: 'zh-CN', ...(i ? { softBreakBefore: true } : {}) } })),
    { placeholder: 'title', lineSpacingMultiple: 0.92, lang: 'zh-CN' });
  // the subtitle sits just above the header rule on every page, whether the title runs to one line or two
  if (sub) T(slide, sub, { y: SUB_Y, h: 0.3, fontSize: 12, color: GREY });
}
function heading(slide, text, x, y, w) {
  T(slide, text, { x, y, w, h: 0.28, fontSize: 12, color: GREY });
}
function hline(slide, x, y, w, color, width) {
  slide.addShape(pres.shapes.LINE, { x, y, w, h: 0, line: { color, width } });
}
function source(slide, text, note) { HS.addSourceLine(slide, tidy(text), P, note && tidy(note)); }
// a block of text that breaks at punctuation; returns its bottom
function para(slide, segs, o) {
  const pt = o.fontSize || 13, mult = o.lineSpacingMultiple || 0.95;
  const pr = paraRuns(segs, o.w || FULL_W, pt, o.fill);
  const h = pr.n * lineIn(pt, mult) + 0.04;
  T(slide, pr.runs, { lineSpacingMultiple: mult, ...o, h: o.h || h });
  return o.y + h;
}

// numbered item: the number is an auto-number (plain 1 2 3) in the same paragraph, so it shares the text baseline
function numbered(slide, k, text, o) {
  const pt = o.fontSize || 13, ind = 0.35, mult = o.lineSpacingMultiple || 0.95;
  const pr = paraRuns(text, o.w - ind, pt);
  pr.runs[0].options = { ...pr.runs[0].options, bullet: { type: 'number', style: 'arabicPlain', startAt: k, indent: ind * 72 } };
  const h = pr.n * lineIn(pt, mult) + 0.04;
  T(slide, pr.runs, { lineSpacingMultiple: mult, ...o, h });
  return o.y + h;
}

const B = {
  none: { type: 'none' },
  ink: { type: 'solid', pt: 0.75, color: INK },
  light: { type: 'solid', pt: 0.5, color: RULE },
};
// Horizontal-rule table. rows: array of arrays; cell = string | {text, bold, color, align}
// opts: {x, y, colW, header, total, aligns, boldCol, pad, headPad, leftPad}
// One type scale on every page: table cells 12 pt, table headers 11 pt bold grey (spec), prose 13 pt.
// Returns {bottom, headerBottom, rowBottoms}.
const TABLE_PT = 12, HEAD_PT = 11;
function table(slide, o) {
  const fs = TABLE_PT, hfs = HEAD_PT, pad = o.pad == null ? 0.07 : o.pad, hpad = o.headPad == null ? Math.min(pad, 0.1) : o.headPad;
  const n = o.colW.length;
  const aligns = o.aligns || Array(n).fill('left');
  const mR = c => (c === n - 1 ? 0 : 0.14);
  const mL = c => (o.leftPad && o.leftPad[c]) || 0;
  const rows = [], rowH = [];
  let headerH = 0;
  if (o.header) {
    rows.push(o.header.map((h, c) => ({ text: tidy(h), options: { bold: true, color: GREY, fontSize: hfs, align: aligns[c],
      valign: 'bottom', border: [B.none, B.none, B.ink, B.none], margin: [hpad, mR(c), hpad, mL(c)] } })));
    headerH = lineIn(hfs) + hpad * 2;
    rowH.push(headerH);
  }
  o.rows.forEach((r, ri) => {
    const isTotal = o.total && ri === o.rows.length - 1;
    const isLast = ri === o.rows.length - 1;
    let lines = 1;
    const cells = r.map((cell, c) => {
      const spec = typeof cell === 'string' ? { text: cell } : cell;
      const bold = !!(spec.bold || isTotal || (o.boldCol === c));
      const fl = fitLines(spec.text, o.colW[c] - mR(c) - mL(c), fs, { bold, fill: o.fill });
      lines = Math.max(lines, fl.n + (spec.sub ? 1 : 0));
      const top = pad + (fl.lines[0] && !hasWide(fl.lines[0]) ? nudge(fs) : 0);
      const bottom = isLast ? (o.closeRule === false ? B.none : B.light) : B.light;
      const topB = isTotal ? B.ink : B.none;
      // optional second line in grey regular type under the cell text (a short qualifier such as a rank)
      const text = spec.sub
        ? [{ text: fl.lines.join('\n'), options: { breakLine: true } },
           { text: tidy(spec.sub), options: { bold: false, color: GREY, fontSize: HEAD_PT } }]
        : fl.lines.join('\n');
      return { text, options: { bold, color: spec.color || INK, fontSize: fs,
        align: spec.align || aligns[c], valign: 'top', border: [topB, B.none, isTotal ? B.none : bottom, B.none],
        margin: [top, mR(c), pad, mL(c)] } };
    });
    rows.push(cells);
    rowH.push(lines * lineIn(fs) + pad * 2 + 0.03 + (o.rowExtra || 0));
  });
  const w = o.colW.reduce((a, b) => a + b, 0);
  slide.addTable(rows, { x: o.x, y: o.y, w, colW: o.colW, rowH, fontFace: FONT, fontSize: fs, color: INK,
    autoPage: false, lang: 'zh-CN' });
  const rowBottoms = []; let acc = o.y;
  rowH.forEach(h => { acc += h; rowBottoms.push(acc); });
  return { bottom: acc, headerBottom: o.y + headerH, rowBottoms };
}
function pngSize(file) { const b = fs.readFileSync(file); return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }; }
function jpgSize(file) {
  const b = fs.readFileSync(file);
  for (let i = 2; i < b.length;) {
    const marker = b[i + 1], len = b.readUInt16BE(i + 2);
    if (marker >= 0xC0 && marker <= 0xC3) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) };
    i += 2 + len;
  }
  throw new Error('no SOF in ' + file);
}

const slides = [];
function newSlide(master = 'CONTENT') { const s = pres.addSlide({ masterName: master }); slides.push(s); return s; }

// ====================================================== 1 封面
{
  const s = newSlide('TITLE_PAGE');
  T(s, '商业计划书', { x: 0.75, y: 0.55, w: 4, h: 0.25, fontSize: 9, color: GREY });
  hline(s, 0.75, 2.35, 1.4, ACC, 0.75);                              // the one accent on this page
  s.addText([{ text: '液冷假负载洁净验证服务', options: { lang: 'zh-CN' } }], { placeholder: 'title', lang: 'zh-CN' });
  T(s, [
    { text: 'Cleanliness Verification for Liquid-Cooled Load Banks', options: { fontSize: 18, color: GREY, breakLine: true, paraSpaceAfter: 18 } },
    { text: '液冷假负载上架前的离线冲洗、洁净检测与第三方认证', options: { fontSize: 14, breakLine: true, paraSpaceAfter: 54 } },
    { text: '2026年11月', options: { fontSize: 12, color: GREY } },
  ], { x: 0.75, y: 3.49, w: 11.8, h: 2.3, fontSize: 14 });
}

// ====================================================== 2 摘要
{
  const s = newSlide();
  head(s, ['假负载接入前的洁净验证是液冷交付链上缺位的一环，', '我们的装置、工艺和团队已经到位，首年按 162.5 万元收入测算']);
  // Each figure appears once on the page: the 关键数字 table carries the headline numbers, the left column
  // carries each claim plus one proof that is not already in the table.
  const LW = 7.6, IND = 0.3;
  const pts = [
    ['液冷市场三年内翻倍，假负载接入量随装机同比例增长。',
     '按 140 kW 机柜级假负载计，每 MW 液冷容量满载测试需接入约 7 台。'],
    ['假负载未经验证直接接入，损伤不可逆。',
     '焊渣与金属微粒随冷却液进入 CDU、换热器和冷板微通道，单块焊渣即可损毁价值约 5 万美元的泵叶轮。'],
    ['验收环节缺位，没有人在接入前做独立验证。',
     '厂商以“已清洗”声明交付，总包按“到场后随系统冲洗”安排，GB/T 48023-2026 也不覆盖假负载。'],
    ['装置已建成，工艺已验证，团队已驻场。',
     '20 英尺集装箱式冲洗烘干充氮装置已建成，GB200^、GB300 整机柜假负载测试已完成，调试测试团队常驻马来西亚新山与泰国。'],
    ['轻资产、按台计费。',
     '完整验证按台计费，也可按 MW 整包计费；单台毛利率保守按 60%–70% 测算。'],
  ];
  // one numbered paragraph per point: bold claim, line break, the proof; the number hangs left of both lines
  const runs = [];
  pts.forEach((p, i) => {
    runs.push({ text: p[0], options: { bold: true, fontSize: 13, paraSpaceAfter: 16,
      bullet: { type: 'number', style: 'arabicPlain', startAt: i + 1, indent: IND * 72 } } });
    const pr = paraRuns([{ text: p[1], o: { fontSize: 13, color: INK } }], LW - IND, 13, 0.95);
    pr.runs[0].options.softBreakBefore = true;
    if (i < pts.length - 1) pr.runs[pr.runs.length - 1].options.breakLine = true;
    runs.push(...pr.runs);
  });
  T(s, runs, { x: LX, y: BODY_Y, w: LW, h: BODY_BOTTOM - BODY_Y, lineSpacingMultiple: 0.95 });

  const tw = 4.33, tx = RX - tw;
  heading(s, '关键数字', tx, BODY_Y, tw);
  const kt = table(s, { x: tx, y: BODY_Y + 0.32, colW: [2.7, tw - 2.7], pad: 0.05, aligns: ['left', 'right'],
    header: ['指标', '数值'],
    rows: [
      ['2025 年中国液冷数据中心市场', '159.8 亿元'],
      ['2028 年预测', '470.4 亿元'],
      ['每 MW 需接入机柜级假负载', '约 7 台'],
      ['完整验证定价', '1.5–3 万元/台'],
      ['单台边际成本', '2,000–3,000 元'],
      ['启动资金', '100–140 万元'],
      ['首年收入测算', { text: '162.5 万元', bold: true, color: ACC }],
      ['第二年目标收入', '400–500 万元'],
      ['落地柔佛', '18 个月内'],
    ] });
  if (kt.bottom > BODY_BOTTOM) console.warn('p2 key-figure table runs into the source line', kt.bottom);
  source(s, '资料来源：本计划书第 3 至 13 页');
}

// ====================================================== 3 行业
{
  const s = newSlide();
  head(s, '液冷市场三年内翻倍，每 MW 液冷容量满载测试需接入约 7 台机柜级假负载', '市场规模、渗透率与单机柜功率');
  const cw = 6.0;
  T(s, '中国液冷数据中心市场规模', { x: LX, y: BODY_Y, w: cw, h: 0.28, fontSize: 12 });
  T(s, '亿元', { x: LX, y: BODY_Y + 0.3, w: cw, h: 0.24, fontSize: 10, color: GREY });
  // categories on a time scale: an empty slot for 2027 (no figure in the source), so the spacing is honest.
  // 2025 actual in mid grey, the 2026 forecast in light grey, the 2028 forecast (the title's point) in navy.
  s.addChart(pres.ChartType.bar, [{ name: '市场规模', labels: ['2025年', '2026年预测', '', '2028年预测'], values: [159.8, 232.5, null, 470.4] }],
    HS.chartOptions(P, { x: LX, y: BODY_Y + 0.55, w: cw, h: 3.1 }, {
      chartColors: [P.grey3, P.grey4, P.grey4, ACC], barGapWidthPct: 70, dataLabelFormatCode: '#,##0.0',
      valAxisLineShow: false, catAxisMajorTickMark: 'none', valAxisMajorTickMark: 'none',
      dataLabelFontSize: 11, catAxisLabelFontSize: 10, valAxisMaxVal: 540, catAxisLabelFontFace: 'Arial',
      dataLabelFontFace: 'Arial',
    }));
  T(s, '2025 年同比增长 45.2%；2028 年约为 2026 年预测值的两倍。', { x: LX, y: BODY_Y + 3.7, w: cw, h: 0.3, fontSize: 13 });
  T(s, '来源未给出 2027 年数据，图中留空。', { x: LX + cw - 3.2, y: BODY_Y + 0.02, w: 3.2, h: 0.25, fontSize: 9, color: GREY, align: 'right' });

  // three fact groups stacked from the chart-title line, 0.25 in apart
  const rx = 6.83, rw = 6.0;
  const groups = [
    ['渗透率翻倍', '2025 年液冷在全球数据中心的渗透率 20% 以上，2024 年为 10%。'],
    ['单机柜功率跃升', '通用机柜平均低于 8 kW；GB300 NVL72 为 135–140 kW；2027 年 Rubin Ultra 达 600 kW。'],
    ['全球与柔佛', '2026 年全球智算中心液冷市场规模预测 1,147 亿元，同比增长 273%；柔佛当前在运约 825 MW，未来 3–5 年新增 3.9 GW。'],
  ];
  let gy = BODY_Y;
  groups.forEach(g => {
    const pr = paraRuns(g[1], rw, 13);
    const runs = [{ text: g[0], options: { bold: true, breakLine: true } }, ...pr.runs];
    const h = (pr.n + 1) * lineIn(13, 0.95) + 0.04;
    T(s, runs, { x: rx, y: gy, w: rw, h, fontSize: 13, lineSpacingMultiple: 0.95 });
    gy += h + 0.12;                         // box slack + leading make the visible gap about 0.25 in
  });
  T(s, '按 140 kW 机柜级假负载计，每 MW 液冷容量满载测试需接入约 7 台（30 kW 单机柜约 33 台），假负载接入量随液冷装机规模同比例增加。',
    { x: LX, y: 5.92, w: FULL_W, h: 0.32, fontSize: 13, bold: true, lineSpacingMultiple: 0.95 });
  source(s, '资料来源：赛迪顾问（经济日报 2026-09-21 转载；每日经济新闻 2026-06-16 转引）；中金公司；TrendForce（国金证券 2025-06 转引）；2CRSi；Uptime Institute, Global Data Center Survey 2024；BMI (The Edge Malaysia, 2026-10-23)');
}

// ====================================================== 4 痛点一
{
  const s = newSlide();
  head(s, ['假负载未经验证直接接入，焊渣和颗粒会卡堵冷板、损伤泵与密封，', '单块焊渣即可损毁约 5 万美元的泵叶轮'], '污染路径与损伤后果');
  para(s, '假负载到货后直接接入客户二次侧回路，或以厂商“已清洗”声明替代检验；上架前既无洁净验证，也无离线冲洗，验收清单亦未设假负载洁净度项目。',
    { x: LX, y: BODY_Y, w: FULL_W, fontSize: 13 });
  const y2 = BODY_Y + 0.85;
  const lw = 5.2, rx = 6.1, rw = RX - rx;
  heading(s, '污染路径', LX, y2, lw);
  heading(s, '不可逆损伤', rx, y2, rw);
  const tb = table(s, { x: rx, y: y2 + 0.36, colW: [1.2, rw - 1.2], pad: 0.08, boldCol: 0,
    header: ['部件', '后果'],
    rows: [
      ['冷板', '通道宽度常小于 100 µm，超过通道宽度约一半的颗粒即可卡堵翅片，导致局部过热与 GPU 降频'],
      ['流道', '颗粒冲蚀并腐蚀流道涂层，可引发冷却液泄漏'],
      ['泵与密封', '焊渣与施工碎屑损伤泵叶轮、机械密封与轴承'],
      ['冷却液', '受污染冷却液在换热面结垢，换热效率下降并加速腐蚀'],
    ] });
  // three steps as a ruled list that shares the table's top and bottom edges
  const steps = [
    '假负载内部不锈钢流道积存焊渣、金属微粒、氧化锈蚀与有机残留',
    '接入后随冷却液循环，经快接头进入 CDU 与板式换热器',
    '最终进入冷板微通道；2025 年冷板式占中国液冷数据中心市场 93.5%',
  ];
  const top = y2 + 0.36, rowH = (tb.bottom - top) / steps.length;
  steps.forEach((t, i) => {
    const ry = top + i * rowH;
    numbered(s, i + 1, t, { x: LX, y: ry + 0.08, w: lw, fontSize: TABLE_PT });   // ruled list beside the table: table size
    hline(s, LX, ry + rowH, lw, RULE, 0.5);
  });
  // the pump-impeller figure is a flushing-service vendor's number, so the sentence names the vendor
  const pb = para(s, [{ text: '处置须停机拆检、更换受损部件并对整个二次侧回路重新冲洗，满载测试与交付节点随之顺延；据清洗服务商 CXP Solutions^，单块焊渣即可损毁价值约 5 万美元的泵叶轮。', o: { bold: true } }],
    { x: LX, y: tb.bottom + 0.35, w: FULL_W, fontSize: 13, bold: true });
  if (pb > 6.4) console.warn('p4 closing sentence runs into the source line', pb);
  source(s, '资料来源：ASHRAE Journal, Liquid Cold Plates Part 3, 2025-12；YuanLi Laboratory, 2026-04-08；CXP Solutions, 2026-09；赛迪顾问（每日经济新闻 2026-06-16 转引）');
}

// ====================================================== 5 痛点二
{
  const s = newSlide();
  head(s, '责任、标准、代价、信任四处断点，决定了验证必须由独立第三方在接入前完成', '验收环节缺位的四个表现');
  const tb = table(s, { x: LX, y: BODY_Y, colW: [1.5, 5.6, 5.23], pad: 0.1, boldCol: 0,
    header: ['断点', '现状', '后果'],
    rows: [
      ['责任不清', '假负载厂商以“已清洗”声明交付，总包方按“到场后随系统冲洗”安排，运营商无从追溯', '污染发生后责任难以界定，处置费用归属不明'],
      ['标准缺失', 'GB/T 48023-2026 将于 2027 年 2 月 1 日实施，规范对象为冷板组件、快接头与 CDU，未覆盖假负载等临时测试设备', '验收清单未设假负载洁净度项目'],
      ['代价高昂', '接入后处置须停机、更换负载，并对整个二次侧回路分段冲洗', '工期以周、月计，满载测试与交付节点相应顺延'],
      ['信任不足', '设备厂商自检自证，缺少独立检测报告', 'ASHRAE、OCP 已给出接入前洁净度量化验收值，国内假负载环节尚无对应的独立报告'],
    ] });
  const y3 = Math.max(tb.bottom + 0.4, 4.9);
  heading(s, '解决路径', LX, y3, FULL_W);
  para(s, [
    { text: '假负载上架前在独立回路完成离线处理，单台约需两人一个工作日，不占用客户回路与满载测试窗口；', o: { bold: true } },
    { text: '第三方报告记录假负载进场时的洁净状态，作为验收与责任界定依据。' },
  ], { x: LX, y: y3 + 0.34, w: FULL_W, fontSize: 13 });
  source(s, '资料来源：同花顺财经 2026-08-10；IDCE 2026-08-18；ASHRAE Journal 2025-12；Open Compute Project，TCS Row Manifolds 预调试指南，2025');
}

// ====================================================== 6 竞争
{
  const s = newSlide();
  head(s, ['厂商、总包和检测机构都不做接入前的离线验证，', '我们补的是这一环，预计后进入者需 12–18 个月追赶'], '现有参与方与壁垒');
  const tb = table(s, { x: LX, y: BODY_Y, colW: [1.2, 3.61, 3.91, 3.61], pad: 0.09, boldCol: 0,
    header: ['', '假负载厂商', 'EPC 总包方', '第三方检测机构'],
    rows: [
      ['代表/业务', '鸿康、福德等', '系统安装与冲洗', 'SGS、CTI 等'],
      ['现在做什么', '出厂前进行基础清洗并提供出厂报告', '负责系统整体冲洗，假负载到场后直接接入主管网', '提供水质取样检测'],
      ['局限', '报告属自检性质，未涵盖运输及存储环节', '未配置假负载专用离线冲洗设备与作业规程', '不具备离线冲洗设备与工艺，不提供现场冲洗服务'],
      ['我方定位', '独立第三方，不与厂商竞争，可作为厂商的增值认证合作方', '假负载接入前完成验证，作为总包流程的前置环节', '装置、工艺、现场实施与检测认证一体化；检测报告由江苏四为实验室出具'],
    ] });
  const y3 = tb.bottom + 0.4;
  heading(s, '核心壁垒', LX, y3, FULL_W);
  const bars = ['假负载流道冲洗 SOP 与工艺参数库', '适配不同冷却液配方的验收阈值体系', '标杆项目形成的客户信任与案例积累'];
  bars.forEach((b, i) => {
    const bx = LX + i * 4.2;
    numbered(s, i + 1, b, { x: bx, y: y3 + 0.36, w: 4.05, fontSize: 13 });
  });
  T(s, '检测仪器可外购，壁垒在于工艺与数据积累；三项均依赖项目经验，预计后进入者需 12–18 个月方可追赶。',
    { y: y3 + 0.82, h: 0.28, fontSize: 13 });
  if (y3 + 0.82 + 0.28 > 6.4) console.warn('p6 closing sentence runs into the source line');
  source(s, '资料来源：公司分析');
}

// ====================================================== 7 能力
{
  const s = newSlide();
  head(s, '装置已建成，工艺已验证，团队已驻场新山', '已交付经验与核心能力');
  const tw = 7.6;
  const tb = table(s, { x: LX, y: BODY_Y, colW: [0.95, 2.75, tw - 3.7], pad: 0.085, boldCol: 0,
    header: ['状态', '能力', '说明'],
    rows: [
      ['已交付', '液冷服务器冲洗烘干充氮装置', '已批量交付国内头部互联网企业，冲洗、烘干、充氮工艺经交付验证'],
      ['已建成', '液冷假负载专用冲洗烘干充氮装置', '20 英尺集装箱式；冲洗、三级过滤、烘干与充氮集成于一体'],
      ['已完成', '液冷假负载满载测试', 'GB200、GB300 整机柜及 |30 kW 单机柜液冷假负载测试项目'],
      ['已实施', '二次侧回路冲洗与水质检测', '在液冷测试项目中完成二次侧回路分段冲洗与第三方水质检测'],
      ['已持证', 'CNAS 认可与 CMA 资质', '江苏四为实验室；测试仪器按编号与校准制度管理'],
      ['已驻场', '海外调试测试团队', '常驻马来西亚新山与泰国，可全程驻场至项目投运'],
    ] });
  // photo block shares the table's header rule (top) and last rule (bottom)
  // photos trimmed of their white scan borders by trim_photos.py, so the visible edges are the frame edges
  const ph = n => path.join(OUT_DIR, `photo_${n}_trim.jpg`);
  const [pm, ps, pe] = ['main', 'side', 'end'].map(n => jpgSize(ph(n)));
  const px = LX + tw + 0.33, pw = RX - px;
  const top = tb.headerBottom, H = tb.bottom - top, gap = 0.1;
  const sw = (pw - gap) / 2, sh = sw * ps.h / ps.w, mh = H - gap - sh;
  const mNat = pw * pm.h / pm.w;
  s.addImage({ path: ph('main'), x: px, y: top, w: pw, h: mNat, sizing: { type: 'cover', w: pw, h: mh } });
  const y2 = top + mh + gap;
  s.addImage({ path: ph('side'), x: px, y: y2, w: sw, h: sh });
  s.addImage({ path: ph('end'), x: px + sw + gap, y: y2, w: sw, h: sw * pe.h / pe.w, sizing: { type: 'cover', w: sw, h: sh } });
  T(s, '装置实拍：侧立面、整体透视与端部接口', { x: px, y: tb.bottom + 0.06, w: pw, h: 0.22, fontSize: 9, color: GREY });
  if (mh > mNat + 0.01) console.warn('p7 main photo would need upscaling crop', mh, mNat);
  source(s, '资料来源：公司资料与现场照片');
}

// ====================================================== 8 服务流程
{
  const s = newSlide();
  head(s, '四级递进验证，逐级判定放行，达标后烘干充氮封存并出具第三方报告', '验证流程与准入标准');
  const tb = table(s, { x: LX, y: BODY_Y, colW: [0.85, 2.65, 2.3, 3.9, 2.63], pad: 0.07,
    header: ['', '一  文件审查', '二  目视与内窥', '三  离线循环冲洗', '四  取样认证'],
    rows: [
      [{ text: '做什么', color: GREY }, '核查材质证明（优先 316L）、焊材记录、酸洗钝化报告与出厂耐压测试，确认无碳钢混用、焊接工艺合规',
        '拆检关键接口，以工业内窥镜检查~流道内焊瘤、毛刺、碎屑与油污',
        '接入冲洗烘干充氮装置，在独立回路~进行高流速循环、升温模拟工况与旁路精密过滤，促使疏松氧化层与残留颗粒提前脱落；全程不接触客户主管网',
        '检测颗粒度（ISO 4406）、电导率、pH、总铁、总铜、氯离子与浊度'],
      [{ text: '判定或输出', color: GREY }, '判定：资料不全或材质不符，不予进入下一级', '判定：不合格项拍照留档，退回厂商整改',
        '输出：冲洗至终点后取样', '输出：达标后烘干、充氮封存，出具《液冷假负载洁净验证报告》'],
    ] });
  const y3 = tb.bottom + 0.22;
  heading(s, '准入标准', LX, y3, FULL_W);
  const tb2 = table(s, { x: LX, y: y3 + 0.28, colW: [2.6, 1.7, FULL_W - 4.3], pad: 0.05, aligns: ['left', 'right', 'left'],
    leftPad: [0, 0, 0.3],
    header: ['指标', '准入值', '依据'],
    rows: [
      ['颗粒度（ISO 4406）', { text: '≤16/14/11', bold: true }, '参照 ASHRAE Journal 机柜接入前要求'],
      ['浊度', { text: '<5 NTU', bold: true }, '参照 OCP 预调试指南冲洗终点要求'],
      ['去离子回路电导率', { text: '<5 µS/cm', bold: true }, '本服务 SOP 取值，严于 OCP 冲洗用水 ≤50 µS/cm'],
    ] });
  const yr = tb2.bottom + 0.2;
  T(s, 'pH、总铁、总铜、氯离子准入值按客户冷却液配方设定，并写入服务 SOP。', { x: LX, y: yr, w: FULL_W, h: 0.3, fontSize: 13 });
  if (yr + 0.28 > 6.5) console.warn('p8 remark runs into the source block', yr);
  source(s, '资料来源：ASHRAE Journal 2025-12；Open Compute Project 2025；公司服务 SOP');
}

// ====================================================== 9 装置
{
  const s = newSlide();
  head(s, '冲洗、三级过滤、烘干与充氮集成于一个 20 英尺集装箱，可随项目转场', '冲洗烘干充氮装置系统示意');
  const dpath = path.join(OUT_DIR, 'diagram_mono.png');
  const ds = pngSize(dpath);
  const dh = 4.25, dw = dh * ds.w / ds.h;
  s.addImage({ path: dpath, x: LX, y: BODY_Y, w: dw, h: dh });
  T(s, '装置实拍见第 7 页', { x: LX, y: BODY_Y + dh + 0.06, w: dw, h: 0.22, fontSize: 9, color: GREY });
  const rx = LX + dw + 0.4, rw = RX - rx;
  table(s, { x: rx, y: BODY_Y, colW: [1.25, rw - 1.25], pad: 0.09, boldCol: 0,
    header: ['功能', '对应部件'],
    rows: [
      ['循环冲洗', '① 冲洗水箱、③ 循环泵组；经 ⑧ 快接接口、⑨ 软管|供入假负载并回流'],
      ['过滤', '④ 过滤器组：粗滤、精滤与保安过滤三级'],
      ['烘干', '⑤ 加热与烘干模块；② 顶部排风与烘干风机'],
      ['充氮封存', '⑥ 氮气瓶组及减压装置'],
      ['过程监测', '⑦ 控制柜：流量、压差与电导率'],
      ['处理对象', '⑩⑪ 待处理液冷假负载；图示为两台机柜级假负载同时接入'],
      ['图例', '图中深蓝线为供水（冲洗去程），灰线为回水（冲洗回程）'],
    ] });
  source(s, '资料来源：公司装置设计图');
}

// ====================================================== 10 定价
{
  const s = newSlide();
  head(s, '轻资产按台计费，完整验证 1.5–3 万元/台，毛利率保守按 60%–70% 测算', '服务包与定价');
  const tb = table(s, { x: LX, y: BODY_Y, colW: [1.6, 4.5, 3.1, 3.13], pad: 0.1, boldCol: 0,
    aligns: ['left', 'left', 'right', 'left'], leftPad: [0, 0, 0, 0.35],
    header: ['服务包', '服务内容', '定价参考', '目标客户'],
    rows: [
      ['基础审查包', '文件审查与内窥检查，出具预审意见', '3,000–5,000 元/台', '假负载厂商、租赁商'],
      ['完整验证包', '离线冲洗、取样检测、烘干充氮与认证报告', '1.5–3 万元/台，或 8–15 万元/MW', 'AIDC 运营商、EPC 总包方'],
      ['现场驻场包', '工程师驻场验收、投运初期跟踪监测与异常复检', '2,000–3,000 元/人天，差旅实报实销', '大型园区、海外项目'],
      ['年度框架', '季度抽检、滤芯耗材供应与技术咨询', '20–50 万元/年', '头部 IDC 运营商'],
    ] });
  const y3 = Math.max(tb.bottom + 0.45, 4.6);
  const cw = 6.0;
  [[LX, '成本结构', '设备与仪器一次性投入 45–60 万元（2 套移动冲洗设备及检测仪器）。单台完整验证的边际成本主要为人工（2 人 × 1 天）|与耗材（滤芯、取样瓶），约 2,000–3,000 元。'],
   [6.83, '毛利与海外定价', '单台完整验证毛利率保守按 60%–70% 测算，公司整体目标毛利率 55% 以上；海外项目（马来西亚）定价上浮 50%–100%。']]
    .forEach(([x, hd, body]) => {
      const pr = paraRuns(body, cw, 13, 0.975);
      T(s, [{ text: hd, options: { bold: true, breakLine: true, paraSpaceAfter: 4 } }, ...pr.runs],
        { x, y: y3, w: cw, h: (pr.n + 1) * lineIn(13, 0.95) + 0.1, fontSize: 13, lineSpacingMultiple: 0.95 });
    });
  // at about 7 cabinet-level units per MW (p3) the per-unit price sums above the per-MW rate; say why
  source(s, '资料来源：公司测算');
}

// ====================================================== 11 客户
{
  const s = newSlide();
  head(s, '三类客户分阶段切入，先租赁商与厂商，再头部运营商，再柔佛新建园区', '目标客户与获客路径');
  const tb = table(s, { x: LX, y: BODY_Y, colW: [0.45, 2.3, 3.6, 5.98], pad: 0.1, boldCol: 1,
    header: ['', '客户', '是谁', '为什么先做或怎么做'],
    rows: [
      ['1', '假负载租赁商与厂商', '租赁假负载在各数据中心项目间周转使用', '每次出场前均需洁净认证；租赁商目前出场前自行冲洗约 3 天，所出报告难获客户认可。该群体为独立客户，需求稳定、转化周期短。'],
      ['2', '国内头部 AIDC 运营商', '字节、阿里、腾讯、华为液冷园区；万国数据、世纪互联等第三方 IDC', '掌握验收标准制定权；报告格式一经认可即纳入验收清单，可在多个项目中复制。'],
      ['3', '马来西亚柔佛新建液冷园区', '比特小鹿 65.1 MW、DDSP 45 MW 及规划中的 GW 级园区', '海外项目对第三方认证付费意愿更强、竞争者较少；调试测试团队已常驻新山。'],
    ] });
  const y3 = Math.max(tb.bottom + 0.45, 4.7);
  heading(s, '获客策略', LX, y3, FULL_W);
  para(s, [
    { text: '前 3 个项目以半价或免费方式实施，取得标杆案例与可引用的客户证言；', o: { bold: true } },
    { text: '依托标杆案例参与 CDCC、ODCC 等行业会议、行业协会及运营商技术标准会议，推动“假负载上架前洁净验证”纳入验收流程。' },
  ], { x: LX, y: y3 + 0.34, w: FULL_W, fontSize: 13 });
  source(s, '资料来源：W.Media 2026-09-16；DatacenterDynamics 2026-05；公司分析');
}

// ====================================================== 12 财务
{
  const s = newSlide();
  head(s, ['启动资金 100–140 万元，首年收入测算 162.5 万元，', '第二年目标 400–500 万元'], '启动投入与首年测算');
  const lw = 7.75;
  heading(s, '启动投入', LX, BODY_Y, lw);
  table(s, { x: LX, y: BODY_Y + 0.34, colW: [1.6, 0.85, lw - 2.45], pad: 0.09, total: true,
    aligns: ['left', 'right', 'left'], leftPad: [0, 0, 0.3],
    header: ['项目', '万元', '说明'],
    rows: [
      ['移动冲洗设备 2 套', '30–40', '高压冲洗泵组、旁路精密过滤车、临时软管与接头组'],
      ['检测仪器', '15–20', '在线颗粒计数器、电导率与 pH 计、浊度仪、内窥镜'],
      ['首批耗材备货', '5–8', '各级滤芯、取样瓶、清洗剂、备用密封圈'],
      ['人员（首年）', '40–55', '2 名现场工程师、1 名商务及项目管理人员，由创始人牵头'],
      ['差旅与运营', '10–15', '项目交通住宿、办公与市场推广'],
      ['启动资金合计', '100–140', '轻资产启动，不租赁固定厂房'],
    ] });
  const rx = LX + lw + 0.38, rw = RX - rx;
  heading(s, '首年收入测算', rx, BODY_Y, rw);
  const tb = table(s, { x: rx, y: BODY_Y + 0.34, colW: [1.1, 2.05, rw - 3.15], pad: 0.09, total: true,
    aligns: ['left', 'left', 'right'],
    header: ['项目', '测算', '万元'],
    rows: [
      ['完整验证', '40 台 × 2 万元', '80.0'],
      ['现场驻场', '30 人天 × 2,500 元', '7.5'],
      ['年度框架', '2 家 × 30 万元', '60.0'],
      ['海外项目', '柔佛首个项目', '15.0'],
      ['合计', '', { text: '162.5', color: ACC }],
    ] });
  para(s, '首年力争实现盈亏平衡或微利。第二年目标收入 400–500 万元，毛利率 55% 以上，增量来自项目量增长与海外业务落地。',
    { x: rx, y: tb.bottom + 0.3, w: rw, fontSize: TABLE_PT });   // same size as the tables beside it
  // year-1 Johor revenue vs the 12–18 month Johor phase on p13: the estimate rests on the team already in 新山
  source(s, '资料来源：公司测算',
    '注：启动投入各项下限之和为 100 万元，上限之和为 138 万元。');
}

// ====================================================== 13 路线图
{
  const s = newSlide();
  head(s, ['18 个月内落地柔佛，36 个月内参与标准制定，', '年收入从 162.5 万元走到千万元级'], '发展路线图，按半年');
  const lw = 5.0, gx = LX + lw, gw = RX - gx, cw = gw / 6;
  const colX = m => gx + (m / 36) * gw;
  let y = BODY_Y;
  ['第一年', '第二年', '第三年'].forEach((t, i) => T(s, t, { x: gx + i * 2 * cw, y, w: 2 * cw, h: 0.26, fontSize: 11, bold: true, color: GREY }));
  T(s, '阶段与里程碑', { x: LX, y, w: lw, h: 0.26, fontSize: 11, bold: true, color: GREY });
  y += 0.27;
  ['0–6 个月', '6–12 个月', '12–18 个月', '18–24 个月', '24–30 个月', '30–36 个月'].forEach((t, i) =>
    T(s, t, { x: gx + i * cw, y, w: cw, h: 0.24, fontSize: 10, color: GREY }));
  y += 0.3;
  hline(s, LX, y, FULL_W, INK, 0.75);
  y += 0.02;
  const rows = [
    { kind: 'stage', text: 'SOP 定型与首批标杆', range: '0–6 个月', from: 0, to: 6 },
    { kind: 'ms', text: '3 个标杆项目交付；SOP 与报告模板定型；完成公司注册', when: '第 6 个月', at: 6 },
    { kind: 'stage', text: '国内商业化', range: '6–12 个月', from: 6, to: 12 },
    { kind: 'ms', text: '年度框架客户 2–3 家；进入 1 家头部运营商验收清单；月均 5–8 台', when: '第 12 个月', at: 12 },
    { kind: 'stage', text: '落地马来西亚柔佛', range: '12–18 个月', from: 12, to: 18 },
    { kind: 'ms', text: '柔佛服务点或合作方到位；承接 1 个 GW 级园区项目；海外团队 2–3 人', when: '第 18 个月', at: 18 },
    { kind: 'stage', text: '参与标准制定与区域覆盖', range: '18–36 个月', from: 18, to: 36 },
    { kind: 'ms', text: '参与 ODCC、CDCC 液冷洁净度标准制定；覆盖东南亚主要园区', when: '第 36 个月', at: 36 },
  ];
  const stageH = 0.35, msH = 0.55, labW = 0.6;
  rows.forEach(r => {
    const h = r.kind === 'stage' ? stageH : msH;
    if (r.kind === 'stage') {
      T(s, [{ text: r.text, options: { bold: true } }, { text: `　${r.range}`, options: { color: GREY, fontSize: 10 } }],
        { x: LX, y: y + 0.07, w: lw, h: 0.28, fontSize: 12 });
      s.addShape(pres.shapes.RECTANGLE, { x: colX(r.from), y: y + 0.11, w: colX(r.to) - colX(r.from), h: 0.16, fill: { color: ACC }, line: { type: 'none' } });
    } else {
      // label and text in separate boxes, so a second line hangs under the text, not under the label
      T(s, '里程碑', { x: LX, y: y + 0.03, w: labW, h: 0.26, fontSize: 12, color: GREY });
      const pb = para(s, r.text, { x: LX + labW, y: y + 0.03, w: lw - labW - 0.1, fontSize: 12 });
      if (pb > y + h + 0.01) console.warn('p13 milestone text taller than its row', r.text);
      // every date label sits left of its diamond, right-aligned, so the month-36 diamond at the page edge
      // reads the same way as the others
      const d = 0.15, cx = Math.min(colX(r.at), RX - d / 2), lwW = 0.9;
      s.addShape(pres.shapes.DIAMOND, { x: cx - d / 2, y: y + 0.07, w: d, h: d, fill: { color: INK }, line: { type: 'none' } });
      T(s, r.when, { x: cx - d / 2 - 0.08 - lwW, y: y + 0.03, w: lwW, h: 0.24, fontSize: 10, color: GREY, align: 'right' });
      hline(s, LX, y + h, FULL_W, RULE, 0.5);     // rule after each stage block
    }
    y += h;
  });
  T(s, '年营收目标', { x: LX, y: y + 0.1, w: lw, h: 0.3, fontSize: 12, bold: true });
  [['第一年 162.5 万元', 0], ['第二年 400–500 万元', 1], ['第三年 千万元级', 2]].forEach(([t, i]) =>
    T(s, t, { x: gx + i * 2 * cw, y: y + 0.1, w: 2 * cw, h: 0.3, fontSize: 12 }));
  y += 0.44;
  hline(s, LX, y, FULL_W, RULE, 0.5);
  source(s, '资料来源：公司规划', '注：横条为阶段区间，菱形为里程碑时点。');
}

// ====================================================== 14 风险
{
  const s = newSlide();
  head(s, ['最大的风险是运营商不把验证当必要环节，', '应对是先从担责压力更大的厂商与租赁商切入'], '主要风险及应对');
  table(s, { x: LX, y: BODY_Y, colW: [1.8, 4.6, 5.93], pad: 0.2, headPad: 0.1, boldCol: 0,
    header: ['风险', '描述', '应对'],
    rows: [
      [{ text: '标准认可度不足', sub: '首要风险' }, '运营商未将假负载洁净验证视为必要环节，付费意愿不足', '优先从担责压力更大的假负载厂商与租赁商切入；以实测数据推动运营商采纳，并参与标准制定'],
      ['大型检测机构进入', 'SGS、CTI 等机构待市场成熟后进入', '12 个月内锁定标杆客户与长期框架协议；以现场冲洗与驻场能力形成差异化'],
      ['海外落地难度', '马来西亚本地化、资质与人员派驻成本较高', '调试测试团队已常驻新山，设备随项目转场；初期与当地 EPC 或咨询公司合作分成，不设独立公司'],
      ['技术迭代', '假负载厂商改进工艺，出厂洁净度提升', '将服务扩展至 CDU、管路、快接头等液冷设备的上架前验证'],
    ] });
  source(s, '资料来源：公司分析');
}

// ====================================================== 15 资料来源
{
  const s = newSlide();
  head(s, '资料来源');
  const items = [
    '经济日报（新华网转载），《算力火爆带热液冷赛道》，2026-09-21：赛迪顾问中国液冷数据中心市场数据；中金公司全球智算中心液冷市场预测',
    '每日经济新闻，转引赛迪顾问《2025—2026 年中国液冷数据中心市场报告》，2026-06-16',
    '国金证券，液冷行业深度研究（转引 TrendForce），2025-06',
    // English-language entries take half-width punctuation; Chinese entries keep full-width
    '2CRSi, NVIDIA Rubin vs Blackwell: Vera Rubin NVL72, HGX NVL8, Power & Cooling Guide',
    'Uptime Institute, Global Data Center Survey 2024',
    "The Edge Malaysia, Johor data centres could consume over 90% of peninsula's additional power generation by 2031 (BMI), 2026-10-23",
    'ASHRAE Journal, D. Quirk, J. Seter, D. Demetriou, Liquid Cold Plates, Part 3, 2025-12',
    'YuanLi Laboratory, MCCP Microchannel Cold Plates and the Challenges of Technical Cleanliness, 2026-04-08',
    'CXP Solutions, Data Center Cleaning, Flushing and Passivation Solutions, 2026-09',
    '同花顺财经，GB/T 48023-2026 发布，2026-08-10；IDCE，我国首部数据中心液冷国家标准 2027 年 2 月 1 日正式实施，2026-08-18',
    'Open Compute Project, Guidelines for Pre-Commission Preparation of TCS Row Manifolds, 2025',
    'W.Media, Bitdeer AI signs 10-year agreement for 65.1 MW data center in Malaysia, 2026-09-16',
    'DatacenterDynamics, DDSP secures $283m financing for data center in Johor, Malaysia, 2026-05',
  ];
  // one column over the full body width, one entry per line, spaced to fill the body area
  const colW = FULL_W, ind = 24 / 72, fsz = 10, mult = 0.95;
  const prs = items.map(t => paraRuns(t, colW - ind, fsz, 0.95));
  const nLines = prs.reduce((a, pr) => a + pr.n, 0);
  const avail = BODY_BOTTOM - BODY_Y - 0.15;
  // LH is a generous estimate; a rendered 10 pt line here measures about 0.82 of it
  const gapPt = Math.max(6, Math.min(20, (avail - nLines * lineIn(fsz, mult) * 0.82) / (items.length - 1) * 72));
  const runs = [];
  prs.forEach((pr, i) => {
    pr.runs[0].options = { ...pr.runs[0].options, bullet: { type: 'number', indent: 24, startAt: 1 }, paraSpaceAfter: gapPt };
    if (i < prs.length - 1) pr.runs[pr.runs.length - 1].options.breakLine = true;
    runs.push(...pr.runs);
  });
  T(s, runs, { x: LX, y: BODY_Y, w: colW, h: BODY_BOTTOM - BODY_Y, fontSize: fsz, lineSpacingMultiple: mult });
  console.log(`p15: ${nLines} lines, gap ${gapPt.toFixed(1)} pt`);
}

// ---------- write, then post-process the XML ----------
// 1 font split  2 one <a:pPr> per paragraph, before any run (DrawingML schema)  3 palette-only colours
// 4 theme colours/fonts  5 metadata without a tool name
function fixParagraphs(xml) {
  return xml.replace(/<a:p>([\s\S]*?)<\/a:p>/g, (m, inner) => {
    const firstRun = inner.search(/<a:(r|br|fld)[\s>/]/);
    if (firstRun < 0) return m;
    const head = inner.slice(0, firstRun);
    const tail = inner.slice(firstRun).replace(/<a:pPr\b[^>]*\/>|<a:pPr\b[^>]*>[\s\S]*?<\/a:pPr>/g, '');
    return `<a:p>${head}${tail}</a:p>`;
  });
}
(async () => {
  await pres.writeFile({ fileName: OUT });
  const zip = await JSZip.loadAsync(fs.readFileSync(OUT));
  for (const name of Object.keys(zip.files)) {
    if (!/^ppt\/(slides|slideLayouts|slideMasters|charts|notesSlides|notesMasters)\/.*\.xml$/.test(name)) continue;
    let xml = await zip.file(name).async('string');
    xml = xml.replace(/<a:latin typeface="Microsoft YaHei"/g, '<a:latin typeface="Arial"')
             .replace(/<a:cs typeface="Microsoft YaHei"/g, '<a:cs typeface="Arial"')
             .replace(/<a:ea typeface="Arial"/g, '<a:ea typeface="Microsoft YaHei"');
    xml = fixParagraphs(xml);
    // '≤' is a script-neutral character: next to Chinese text it takes the East Asian font and renders as the
    // slanted CJK glyph. Give each '≤' its own run with Arial as the East Asian font too, so every one matches.
    xml = xml.replace(/<a:r>(<a:rPr\b(?:[^>]*[^\/>])?>(?:(?!<\/a:rPr>)[\s\S])*<\/a:rPr>)<a:t>([^<]*≤[^<]*)<\/a:t><\/a:r>/g, (m, rpr, t) => {
      if (!/<a:ea typeface="[^"]*"/.test(rpr)) { console.warn('≤ run without an ea font:', t); return m; }
      const sym = rpr.replace(/<a:ea typeface="[^"]*"/, '<a:ea typeface="Arial"');
      return t.split(/(≤)/).filter(Boolean).map(piece => `<a:r>${piece === '≤' ? sym : rpr}<a:t>${piece}</a:t></a:r>`).join('');
    });
    xml = xml.replace(/<a:buFont typeface="\+mj-lt"\/>/g, '<a:buFont typeface="Arial" pitchFamily="34" charset="0"/>');
    // white page background through the theme (bg1) and transparent chart areas, so no literal white is written
    xml = xml.replace(/<p:bgPr><a:solidFill><a:srgbClr val="FFFFFF"\/><\/a:solidFill>/g, '<p:bgPr><a:solidFill><a:schemeClr val="bg1"/></a:solidFill>');
    if (name.startsWith('ppt/charts/')) xml = xml.replace(/<a:solidFill><a:srgbClr val="FFFFFF"\/><\/a:solidFill>/g, '<a:noFill/>');
    // the empty 2027 slot: drop its blank cached value (and blank label) so it is a missing point, not a zero
    if (name.startsWith('ppt/charts/')) xml = xml.replace(/<c:pt idx="\d+"><c:v><\/c:v><\/c:pt>/g, '');
    zip.file(name, xml);
  }
  let theme = await zip.file('ppt/theme/theme1.xml').async('string');
  theme = theme.replace(/<a:ea typeface=""\/>/g, '<a:ea typeface="Microsoft YaHei"/>')
               .replace(/typeface="DengXian Light"/g, 'typeface="Microsoft YaHei"')
               .replace(/typeface="DengXian"/g, 'typeface="Microsoft YaHei"')
               .replace(/script="Hans" typeface="[^"]*"/g, 'script="Hans" typeface="Microsoft YaHei"')
               .replace(/<a:clrScheme name="[^"]*">[\s\S]*?<\/a:clrScheme>/, '<a:clrScheme name="Deck">' +
                 '<a:dk1><a:srgbClr val="1F1F1F"/></a:dk1><a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>' +
                 `<a:dk2><a:srgbClr val="${ACCENT}"/></a:dk2><a:lt2><a:srgbClr val="D9D9D9"/></a:lt2>` +
                 `<a:accent1><a:srgbClr val="${ACCENT}"/></a:accent1><a:accent2><a:srgbClr val="595959"/></a:accent2>` +
                 '<a:accent3><a:srgbClr val="B3B3B3"/></a:accent3><a:accent4><a:srgbClr val="D9D9D9"/></a:accent4>' +
                 '<a:accent5><a:srgbClr val="1F1F1F"/></a:accent5><a:accent6><a:srgbClr val="595959"/></a:accent6>' +
                 `<a:hlink><a:srgbClr val="${ACCENT}"/></a:hlink><a:folHlink><a:srgbClr val="595959"/></a:folHlink></a:clrScheme>`)
               .replace(/<a:srgbClr val="000000"/g, '<a:srgbClr val="1F1F1F"');
  zip.file('ppt/theme/theme1.xml', theme);
  let app = await zip.file('docProps/app.xml').async('string');
  app = app.replace(/<Application>[^<]*<\/Application>/, '<Application>Microsoft Office PowerPoint</Application>');
  zip.file('docProps/app.xml', app);
  let core = await zip.file('docProps/core.xml').async('string');
  core = core.replace(/<dc:creator>[^<]*<\/dc:creator>/, '<dc:creator>Ryan Chen</dc:creator>')
             .replace(/<cp:lastModifiedBy>[^<]*<\/cp:lastModifiedBy>/, '<cp:lastModifiedBy>Ryan Chen</cp:lastModifiedBy>');
  zip.file('docProps/core.xml', core);
  // embedded chart workbook carries its own docProps
  for (const name of Object.keys(zip.files)) {
    if (!/^ppt\/embeddings\/.*\.xlsx$/.test(name)) continue;
    const inner = await JSZip.loadAsync(await zip.file(name).async('nodebuffer'));
    for (const n of ['docProps/core.xml', 'docProps/app.xml']) {
      if (!inner.file(n)) continue;
      let x = await inner.file(n).async('string');
      x = x.replace(/PptxGenJS/g, 'Ryan Chen').replace(/<Application>[^<]*<\/Application>/, '<Application>Microsoft Excel</Application>');
      inner.file(n, x);
    }
    zip.file(name, await inner.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
  }
  // checks: colours and paragraph structure
  const seen = {}; let badP = 0;
  for (const name of Object.keys(zip.files)) {
    if (!/^ppt\/.*\.xml$/.test(name)) continue;
    const xml = await zip.file(name).async('string');
    for (const m of xml.matchAll(/srgbClr val="([0-9A-Fa-f]{6})"/g)) seen[m[1].toUpperCase()] = (seen[m[1].toUpperCase()] || 0) + 1;
    for (const m of xml.matchAll(/<a:p>([\s\S]*?)<\/a:p>/g)) {
      const i = m[1].search(/<a:(r|br|fld)[\s>/]/);
      if (i >= 0 && /<a:pPr\b/.test(m[1].slice(i))) badP++;
    }
  }
  const extra = Object.keys(seen).filter(c => !ALLOWED.includes(c));
  console.log('srgbClr values:', JSON.stringify(seen), extra.length ? `NOT ALLOWED: ${extra}` : 'all in palette');
  console.log('paragraphs with <a:pPr> after a run:', badP);
  fs.writeFileSync(OUT, await zip.generateAsync({ type: 'nodebuffer', compression: 'DEFLATE' }));
  console.log('written', OUT, 'slides:', slides.length);
})().catch(e => { console.error(e); process.exit(1); });
