// House style for pptxgenjs decks built under the business-plan-and-consulting skill.
// Usage in a generator script:
//   const HS = require('./house_style.js');
//   const pres = new pptxgen(); pres.layout = 'LAYOUT_WIDE';
//   HS.defineLayouts(pres, HS.PALETTE.consulting);
//   const s = pres.addSlide({ masterName: 'CONTENT' });
//   s.addText('Revenue doubles to $4.2M by 2027 if churn stays under 3%', { placeholder: 'title' });
//   HS.addSourceLine(s, 'Source: Company accounts FY2023-25; project analysis');
//   s.addChart(pres.ChartType.bar, data, HS.chartOptions(HS.PALETTE.consulting, { x: 0.5, y: 1.55, w: 7.6, h: 5.0 }));
// Coordinates follow references/visual-system.md section 4 (13.333 x 7.5 in). Colours are hex without '#'.

const PALETTE = {
  consulting: { ink: '0B1F3A', primary: '0B1F3A', accent: '2251FF', dark: '051C2C',
                grey1: '595959', grey2: '7F7F7F', grey3: 'B3B3B3', grey4: 'D9D9D9', grey5: 'F2F2F2', bg: 'FFFFFF' },
  bain:       { ink: '0B1F3A', primary: '0B1F3A', accent: 'CC0000', dark: '051C2C',
                grey1: '595959', grey2: '7F7F7F', grey3: 'B3B3B3', grey4: 'D9D9D9', grey5: 'F2F2F2', bg: 'FFFFFF' },
  bank:       { ink: '1C2B36', primary: '00355F', accent: 'BF2026', dark: '005079',
                grey1: '595959', grey2: '8C8C8C', grey3: 'BFBFBF', grey4: 'E5E9F1', grey5: 'F3F5F9', bg: 'FFFFFF' },
  vc:         { ink: '111111', primary: '111111', accent: '0A66C2', dark: '111111',
                grey1: '595959', grey2: '7F7F7F', grey3: 'BFBFBF', grey4: 'E6E6E6', grey5: 'F2F2F2', bg: 'FFFFFF' },
  bcg:        { ink: '232326', primary: '007C53', accent: '21BF61', dark: '03522D',
                grey1: '595959', grey2: '7F7F7F', grey3: 'B3B3B3', grey4: 'D9D9D9', grey5: 'F8F8F9', bg: 'FFFFFF' },
};

// Fonts that exist on every Office install. Never Inter or Noto inside a .pptx.
const FONT = { latin: 'Arial', latinSerif: 'Georgia', cjk: 'Microsoft YaHei', cjkFormal: 'SimSun' };

const GEO = {
  title:   { x: 0.5,  y: 0.35, w: 12.33, h: 0.85 },
  sub:     { x: 0.5,  y: 1.15, w: 12.33, h: 0.35 },
  body:    { x: 0.5,  y: 1.55, w: 12.33, h: 5.05 },
  left:    { x: 0.5,  y: 1.55, w: 6.0,   h: 5.05 },
  right:   { x: 6.83, y: 1.55, w: 6.0,   h: 5.05 },
  source:  { x: 0.5,  y: 6.70, w: 10.5,  h: 0.45 },
  pageNo:  { x: 12.3, y: 7.05, w: 0.55,  h: 0.25 },
  sticker: { x: 11.0, y: 0.30, w: 1.85,  h: 0.30 },
};

const SIZE = { title: 22, sub: 12, body: 13, label: 10, axis: 9, source: 8, sticker: 9 };

function defineLayouts(pres, P, opts = {}) {
  const font = opts.cjk ? FONT.cjk : FONT.latin;
  const common = {
    background: { color: P.bg },
    objects: [
      { rect: { x: 0.5, y: 1.12, w: 12.33, h: 0, line: { color: P.grey4, width: 0.75 } } },
    ],
    slideNumber: { x: GEO.pageNo.x, y: GEO.pageNo.y, w: GEO.pageNo.w, h: GEO.pageNo.h,
                   fontFace: font, fontSize: SIZE.source, color: P.grey1, align: 'right' },
  };
  if (opts.confidential) {
    common.objects.push({ text: { text: opts.confidential, options: { x: 4.5, y: 7.05, w: 4.3, h: 0.25,
      fontFace: font, fontSize: 7, color: P.grey2, align: 'center', isTextBox: true, margin: 0 } } });
  }
  pres.defineSlideMaster({
    title: 'CONTENT',
    ...common,
    objects: [
      ...common.objects,
      { placeholder: { options: { name: 'title', type: 'title', ...GEO.title, fontFace: font, fontSize: SIZE.title,
          bold: true, color: P.ink, align: 'left', valign: 'top', margin: 0, fit: 'none' } } },
      { placeholder: { options: { name: 'sub', type: 'body', ...GEO.sub, fontFace: font, fontSize: SIZE.sub,
          color: P.grey1, align: 'left', valign: 'top', margin: 0 } } },
      { placeholder: { options: { name: 'body', type: 'body', ...GEO.body, fontFace: font, fontSize: SIZE.body,
          color: P.ink, align: 'left', valign: 'top', margin: 0 } } },
    ],
  });
  pres.defineSlideMaster({
    title: 'COVER',
    background: { color: P.bg },
    objects: [
      { placeholder: { options: { name: 'title', type: 'title', x: 0.75, y: 2.6, w: 11.8, h: 1.6, fontFace: font,
          fontSize: 40, bold: true, color: P.ink, align: 'left', valign: 'bottom', margin: 0 } } },
      { placeholder: { options: { name: 'sub', type: 'body', x: 0.75, y: 4.3, w: 11.8, h: 1.2, fontFace: font,
          fontSize: 18, color: P.grey1, align: 'left', valign: 'top', margin: 0 } } },
    ],
  });
  pres.defineSlideMaster({
    title: 'DIVIDER',
    background: { color: P.primary },
    objects: [
      { placeholder: { options: { name: 'title', type: 'title', x: 0.75, y: 3.0, w: 11.8, h: 1.5, fontFace: font,
          fontSize: 32, bold: true, color: 'FFFFFF', align: 'left', valign: 'middle', margin: 0 } } },
    ],
  });
}

function addSourceLine(slide, text, P = PALETTE.consulting, note) {
  const lines = note ? [{ text: note, options: { breakLine: true } }, { text }] : text;
  slide.addText(lines, { ...GEO.source, fontFace: FONT.latin, fontSize: SIZE.source, color: P.grey1,
    align: 'left', valign: 'bottom', isTextBox: true, margin: 0 });
}

function addSticker(slide, text, P = PALETTE.consulting) {
  slide.addText(text.toUpperCase(), { ...GEO.sticker, fontFace: FONT.latin, fontSize: SIZE.sticker, color: P.grey1,
    align: 'center', valign: 'middle', isTextBox: true, margin: 0, line: { color: P.grey3, width: 0.75 } });
}

// Quiet chart frame: one accent on the highlighted series, the rest grey, direct labels, no gridlines or legend.
function chartOptions(P, pos, extra = {}) {
  return {
    ...pos,
    chartColors: [P.accent, P.grey2, P.grey3, P.grey4, P.dark],
    showLegend: false,
    showTitle: false,
    showValue: true,
    dataLabelFontFace: FONT.latin, dataLabelFontSize: SIZE.label, dataLabelColor: P.ink,
    dataLabelPosition: 'outEnd',
    catAxisLabelFontFace: FONT.latin, catAxisLabelFontSize: SIZE.axis, catAxisLabelColor: P.grey1,
    valAxisLabelFontFace: FONT.latin, valAxisLabelFontSize: SIZE.axis, valAxisLabelColor: P.grey1,
    valAxisHidden: true,
    valGridLine: { style: 'none' },
    catGridLine: { style: 'none' },
    catAxisLineShow: true, catAxisLineColor: P.grey3,
    valAxisMinVal: 0,
    barGapWidthPct: 50,
    ...extra,
  };
}

// For a single-series bar chart where only one bar should carry the accent:
// pass one series per category and use chartColors = bars.map((_, i) => i === hi ? P.accent : P.grey3).
function highlightColors(P, n, highlightIndex) {
  return Array.from({ length: n }, (_, i) => (i === highlightIndex ? P.accent : P.grey3));
}

module.exports = { PALETTE, FONT, GEO, SIZE, defineLayouts, addSourceLine, addSticker, chartOptions, highlightColors };
