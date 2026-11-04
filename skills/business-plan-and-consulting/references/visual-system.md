# Visual system: how top-tier documents look, with numbers you can paste

Measured from shipped PDFs (Bain Global PE Report 2025, Goldman Top of Mind,
BCG AI Radar deck, a16z State of Crypto) plus firm identity sources. Hex
values for McKinsey are community approximations, not official.

Contents
1. The one rule
2. Palettes
3. Fonts
4. Slide geometry (python-pptx, 16:9)
5. Word and PDF geometry
6. Charts
7. Tables
8. Excel models
9. Cover, footer, stickers, confidentiality
10. Anti-patterns that read as template or machine-made
11. 中文版式
12. Pre-flight

---

## 1. The one rule

Expensive-looking documents are restrained, dense in content and sparse in
decoration. One typeface family (two at most). One ink colour. One accent,
used only on the thing the title is about; everything else grey. White
background. Thin rules instead of boxes. Numbers labelled directly on the
chart. A source line under every exhibit. A message title on every page.
Nothing centred except the cover. If a reader can tell which template made
it, it failed.

What the firms actually ship: Bain's charts are red plus three grey-greens.
BCG's are dark green plus one bright green. Goldman is navy, tints and one
red. One brand hue, its darker shade and two or three greys do 90 percent
of every chart.

## 2. Palettes

Pick one per document. The accent appears on at most one series, bar or
number per page.

A. Consulting navy (McKinsey or Bain restraint)

| Token | Hex | Use |
|---|---|---|
| ink | #1F1F1F | text, rules, totals |
| navy | #051C2C | primary series, highlighted bar |
| accent | #051C2C (default; Bain red #CC0000 only when red is the house colour) | the one so-what element |
| navy-dark | #051C2C | second brand shade when two are needed |
| grey-1 | #595959 | subtitles, sources, secondary text |
| grey-2 | #7F7F7F | ghost series dark |
| grey-3 | #B3B3B3 | ghost series |
| grey-4 | #D9D9D9 | rules, ghost series light |
| grey-5 | #F2F2F2 | table header fill, sidebar panel |

B. Bank navy and grey (Goldman, Morgan Stanley register): ink #1C2B36,
navy #00355F, navy-2 #005079, tints #7593B4 #A1B5E4 #B0C0D5, accent
#BF2026, greys #595959 #8C8C8C #BFBFBF #E5E9F1, panel #F3F5F9.

C. VC black plus one accent (Sequoia, YC, Front register): ink #111111,
grey-1 #595959, grey-3 #BFBFBF, grey-4 #E6E6E6, accent one brand hue
(#0A66C2, #00A87E or #E4572E), white background, near-black cover only.

D. BCG green variant: ink #232326, green #007C53, bright accent #21BF61,
greys as A.

Government-facing Chinese material may use 中国红 #C8102E as the single
accent. Internal reviews and anything for the boss: black and white, red
only for real risk.

Ryan's standing preference: no bright or electric blue and no cyan anywhere, including McKinsey's #2251FF; a deck where blue blocks carry the design reads as machine-made to him. The accent is #051C2C, used on at most one element per page.

Forbidden everywhere: Office defaults #4472C4 #ED7D31 #A5A5A5 #FFC000 #5B9BD5
#70AD47; purple-cyan pairs; gradients; any text colour under 4.5:1 contrast
on white; red and green together unless the chart is literally about good
and bad.

## 3. Fonts

| Firm | Display | Body |
|---|---|---|
| McKinsey | Bower (serif); legacy Georgia | Theinhardt; legacy Arial |
| BCG | Henderson BCG Serif | Henderson BCG Sans; fallback Trebuchet, Arial |
| Bain | Reckless Neue (serif) | Graphik; fallback Arial |
| Goldman | Univers Condensed | Univers; Arial |
| a16z | Noto Sans | Noto Sans |

Licence-free substitutes that keep the look: Source Sans 3, IBM Plex Sans or
Inter for body; Source Serif 4 or Georgia for serif display; Arial and
Calibri as Office fallbacks. Two families maximum. Hierarchy comes from one
weight axis (Light, Regular, Semibold), not from colour or italics.

Sizes, 16:9 deck: title 20 to 24 pt; subtitle 12 to 14; body 12 to 14; chart
labels 10 to 11; axis 9 to 10; footnote and source 8; sticker 9 caps. Never
under 8 pt on a slide, 7 pt in print. A4 landscape reading deck: title 18
to 20, body 11 to 12, source 7 to 8.

## 4. Slide geometry (python-pptx or pptxgenjs, 16:9, inches)

```
slide          13.333 x 7.5
margins        left/right 0.50   top 0.35   bottom 0.45
title          x 0.50  y 0.35  w 12.33  h 0.85   22 pt semibold ink, left and top anchored, never shrink to fit
subtitle/unit  x 0.50  y 1.15  w 12.33  h 0.35   12 pt grey-1 ("Global buyout deal value, $B, 2014-2024")
body           x 0.50  y 1.55  w 12.33  h 5.05   two columns w 6.0 each, gutter 0.33
unit line      10 pt grey-1 directly above each chart ("In $B")
notes/source   x 0.50  y 6.70  w 10.5   h 0.45   8 pt grey-1, "Note:" line then "Source:" line
page number    x 12.30 y 7.05  w 0.55   h 0.25   8 pt grey-1 right-aligned
sticker        x 11.0  y 0.30  w 1.85   h 0.30   9 pt caps grey-1, 0.75 pt grey-3 outline, no fill
tracker        x 10.3  y 0.05  w 2.55   h 0.22   8 pt grey-2 right-aligned (only in decks over ~15 pages)
rules          0.75 pt grey-4; optional title underline 0.75 pt ink at y 1.12
confidential   footer centre 7 pt grey-2 on client and bank decks
```

Footer zone, bottom to top: page number and the footer strip (document title
left, confidentiality centre) at y 7.05; the Note and Source block ends above
them at y 6.95. The two never share a line. Body content should reach at
least two-thirds of the way down the body area; a page that is empty below
the midline has a one-line message, so enlarge the exhibit, add the
commentary panel beside it, or merge the page into its neighbour.

Title, source line and page number sit at identical coordinates on every
slide. Snap everything to a 12-column grid on the 0.5 in margin. Blocks are
separated by at least 0.25 in of white space or a thin rule, never by a
filled box. Left-align everything. A title that needs a third line means the
page has two messages: split it.

Source-line grammar. BCG: "Source: BCG AI Radar 2025 survey (n=1,803)." with
a period. Bain: "Sources: Dealogic; Preqin" plural, semicolons, no period.
McKinsey: "Source: Company annual reports 2022-24; McKinsey analysis", own
work last. Pick one form and keep it.

## 5. Word and PDF geometry

```
page        A4 or Letter; margins 25.4 mm all sides (inside 28 mm if bound); header and footer 12 mm
body        10.5 to 11 pt, leading 1.2 (Chinese 12 pt, 1.5); 6 pt after paragraphs; no first-line indent in one column
H1          18 pt semibold, 24 before, 12 after, 1 pt rule below in accent; headings in ink colour, not brand colour
H2          13 pt semibold, 18 before, 6 after;  H3 11 pt semibold
exhibit     "Exhibit 3: <sentence>" or "图 3：<判断句>" 10 pt bold above; chart; "Note:" then "Source:" 8 pt grey-1 below; 12 pt after
table       see section 7; header 9 pt semibold; body 9 to 9.5 pt; row padding 3 pt
pull quote  16 pt serif display, grey-1, 0.5 pt rules above and below, at most two per chapter, published reports only
sidebar     grey-5 panel, 9.5 pt, 8 mm padding, at most one per spread
footer      left "Confidential - <client>" or the title; right page number; 8 pt grey-1
```

Use styles only, no direct formatting, so the docx skill's output stays
editable. No text boxes, no SmartArt, no section shading, no cover-page
gallery templates. "At a glance" or key-takeaways box: at most one per
chapter, at its start, in published reports; none in a client deliverable.

Exhibit numbering: continuous through a report (Exhibit 1, 2 …) in the
McKinsey style, or per chapter (Figure 2.1) in the Bain style. Caption is a
full-sentence message, up to two lines, bold. Under the exhibit, in order:
unit, Note(s), Source(s).

HTML to PDF: `@page { size: A4; margin: 25mm }`, body 11pt/1.25, h1 18pt
with a 1pt bottom border in the accent, tables with border-collapse and a
0.75pt rule under the header, numbers right-aligned with tabular figures,
sources 8pt #595959. No box-shadow, no border-radius, no gradients.

## 6. Charts

Ten rules that are not negotiable:

1. One message per chart. The message is the title sentence; the data
   description and unit go in the subtitle.
2. Form follows the comparison (Zelazny): share of total → pie with at most
   five slices starting at 12 o'clock largest first, or a 100 percent
   stacked bar; ranking → horizontal bar sorted by value; change over time →
   column up to about 12 periods, line beyond; distribution → histogram;
   relationship → scatter.
3. Direct labels on bars and at line ends. A legend only when more than
   three series would make labels collide.
4. Bars and columns start at zero. Drop the y-axis when every bar is
   labelled; keep a 0.75 pt #B3B3B3 baseline.
5. No gridlines, or light horizontals #E6E6E6 at 0.5 pt. No chart border, no
   plot fill, no vertical gridlines.
6. No 3D, shadows, gradients, rounded bars, pattern fills, exploded pies, or
   dual axes unless unavoidable (then both axes labelled and colour-matched).
7. Units once, in the subtitle or at the top of the axis ("$1,250B" then
   1,000 / 750 / 500), never repeated in every label.
8. Formats: thousands separators; zero or one decimal; changes carry a sign
   ("+37%", "-23%"); multiples "11.2x"; growth "+6% p.a." or "CAGR 2019-24:
   6%".
9. One highlighted series in the brand hue, the rest ghost grey (#B3B3B3,
   #D9D9D9). Negatives in dark grey or the darker brand shade.
10. "Source:" and, where needed, "Note:" directly beneath in 8 pt grey.

House rules by type (think-cell vocabulary):

| Type | Rules |
|---|---|
| Stacked column with totals | bold total above each column; segment labels inside only if the segment is 8 percent or more of the height; at most five segments in a fixed order |
| Waterfall | start and end bars solid brand colour; deltas grey down, light tint up; 0.5 pt grey connectors; signed delta labels; subtotal bars where the logic groups |
| Marimekko | column width equals segment size, height 100 percent; width totals under the axis; at most 6 x 6 cells |
| Gantt | month or quarter ruler on top; one bar colour; milestones as diamonds; dashed today line; one colour per workstream only if that is the message |
| Harvey balls | identical diameter and one colour on a page; 0, quarter, half, three-quarter, full only; legend once; at most 6 x 6 |
| CAGR arrow | thin bracket above the columns with "+x% p.a."; one or two per chart, never one per bar |
| 2x2 | axis labels as the criteria; quadrant labels 9 pt grey; at most 12 bubbles labelled directly; no quadrant fills beyond a 5 percent tint; the recommended quadrant is the only one highlighted |
| Football field | floating horizontal bars per method; current price or offer as a vertical dashed line; percentile ticks; every endpoint footnoted |
| Line | 12 or more periods, at most four series; highlighted series thicker and in brand colour; label at line end; markers only at end points |

When not to draw a chart: two numbers are a sentence or two big numbers,
not a bar chart; a single value against a target is a labelled bullet bar,
not a gauge; more than five lines become small multiples; more than seven
stacked segments get an "other" bucket or a sorted bar. A chart that needs a
paragraph to read is redesigned.

Implementation: label font 10 pt, axis 9 pt, source 8 pt in the deck body
font. Left and top spines off; bottom spine 0.75 pt #B3B3B3; tick marks
off. Bar width 0.6 to 0.7 of the category pitch. Colour sequence [accent,
#7F7F7F, #B3B3B3, #D9D9D9, darker accent]. Save as SVG or EMF into PPT; PNG
only at 220 dpi or more. Set the chart title as a PowerPoint text box, not
inside the image, so it aligns with the grid. Real material beats a
redrawn chart: an Excel screenshot, a site photo with a red circle, a
client's own document, when the reader is an operator rather than a board.

## 7. Tables

Horizontal rules only: 0.75 pt ink under the header row and above the total
row; 0.5 pt #D9D9D9 between body rows or none with 4 to 6 pt padding. No
vertical rules, no outer box. Header 9 to 10 pt semibold, grey ink; white on
dark only for dense bank comps tables. Units in the header ("Revenue
($M)"), never in cells. Numbers right-aligned, decimal-aligned, same decimals
per column, lining figures. Text left-aligned. Totals bold; subtotal single
rule; grand total double rule (banks) or bold plus 0.75 pt rule
(consulting). No zebra striping; no coloured fills except one pale highlight
(#E8EEF8) or bold on the row the title is about. Negatives in parentheses in
finance tables; en dash for zero or not applicable; "n/a" and "n/m"
lowercase. Qualitative comparisons with Harvey balls or text glyphs in ink
colour, never coloured icons or emoji. RAG status tables use the three
colours and nothing else. At most about 7 columns x 12 rows per slide; split
rather than shrink below 9 pt.

## 8. Excel models

Font colour, not fill, carries meaning: inputs and historical actuals blue
#0000FF; formulas black; links from other sheets green #008000; external
links red; items needing attention yellow fill #FFFF00, sparingly. Put the
key on the cover sheet. The client's template wins if it differs.

Structure (FAST standard): sheet order equals calculation order, Cover →
Inputs → Calc → Outputs → Checks; never inputs and presentation on one sheet.
Identical columns on every sheet: A spacer, B labels, C units, D constants
or totals, E onward the time ruler, historical left, forecast right with a
visible boundary. Freeze panes at E6. One formula per row copied across; no
embedded constants; no nested IFs (INDEX over CHOOSE); no merged cells; no
hidden rows; no macros for logic; no circularity in a released model.
Scenarios through one switch cell with data validation. Checks sheet with a
master "Model OK / errors = n" cell linked into every sheet's frozen header.
Version log on the cover.

Number formats (openpyxl): money one decimal `#,##0.0_);(#,##0.0);"–"_)`;
no decimals `#,##0_);(#,##0);"–"_)`; percent `0.0%_);(0.0%);"–"_)`;
multiple `0.0"x"`; years as text or `0`; checks
`[Green]"OK";[Red]"ERROR";[Green]"OK"`. Arial or Calibri 10 pt, 9 pt for
dense sheets. Column widths A 2, B 36, C 8, D 10, periods 10. Gridlines off
on presentation sheets. Print: landscape, fit to one page wide, repeat rows
1 to 5, footer "Confidential, sheet name, page x of y". Run the xlsx skill's
recalc script before delivery so formulas carry values.

## 9. Cover, footer, stickers, confidentiality

Cover carries the logo (small, top-left or bottom-left), the title in 36 to
60 pt left-aligned over one to three lines, a subtitle or dek in 16 to 20 pt
grey, the date or edition, and for client work the client name and
"Confidential, prepared for <client>". Banks add "Strictly private and
confidential" and a one-paragraph legal notice page in a CIM. No tagline
art, no network illustration, no photograph unless it is the client's own
site or product.

Footer on every page: source and footnotes left, confidentiality centre,
page number right. Published reports add a copyright line. Stickers
("Preliminary", "Draft", "For discussion", "Illustrative") only when the
content is genuinely preliminary.

Internal material for the boss or a review: no cover trio (Prepared for,
Prepared by, Version), no document-control table, no table of contents
under ten pages, no stacked header and footer. Business title as the file
title: "K2 L2 critical path 1018", not "Progress Report Final v3".

## 10. Anti-patterns that read as template or machine-made

Any one of these breaks the top-tier impression:

- Gradient backgrounds or text; cards with rounded corners and shadows;
  glassmorphism; coloured left-stripe cards; three- or four-card grids with
  an icon in a circle above a heading.
- Icon grids, decorative line icons, emoji, SmartArt, chevron process
  arrows, cycle diagrams, hero stat tiles with round invented numbers.
- "Key takeaways" box on every page; eyebrow labels in caps above titles;
  italic serif flourish at the end of a headline; accent bars beside every
  text box; cream background with the default accent.
- Stock photography (handshakes, teams, skylines), abstract particle
  illustrations, flat placeholder illustrations.
- Everything centred; the same layout on every slide; equal spacing with no
  grouping; a huge hero headline over a flat hierarchy.
- Office default colours; rainbow categorical palettes; 3D charts; pies
  with more than five slices; legends where labels fit; axes not at zero;
  chart borders and plot fills.
- Label titles ("Market Overview", "Our Solution"); three levels of
  sub-bullets; exclamation marks; "world-class", "cutting-edge", "seamless";
  chains of em dashes; "In today's fast-paced world".
- More than two font families; Calibri body with Arial Black titles; body
  text in all caps; crushed or expanded letter-spacing.
- Inconsistent number formats (1,234 next to 1234 next to 1.2K); missing
  units, sources, dates on market data, page numbers or confidentiality;
  file metadata naming a generator.

Soft tells that add up: 12 pt paragraphs of body text on slides; decorative
sparklines; auto-generated speaker notes; identical sentence rhythm across
titles; charts pasted as low-resolution screenshots; tables with vertical
borders and stripes; bright tracker chips; a wrong copyright year.

Positive tests: the deck tells its story from the titles alone; a stranger
can say the idea back in five seconds; each slide can be absorbed in a
minute; if a chart needs a paragraph, redesign the chart.

## 11. 中文版式

字体。路演与咨询 deck：标题思源黑体 Bold 或微软雅黑 Bold，正文思源黑体
Regular 或微软雅黑；数字与英文用同族拉丁字形或 Arial。PPT 里中英文分别设置
（latin 与 ea 字体）。微软雅黑不可商业嵌入分发，思源黑体（Noto Sans CJK SC）
为开源字体可嵌入。商务材料不用华文楷体、隶书、幼圆、华文彩云。

政府、国企、监管对象的正式文件按 GB/T 9704：A4，版心 156 x 225 mm，上
37 mm，下 35 mm，左 28 mm，右 26 mm；标题二号小标宋居中；一级标题黑体，二级
楷体，三级仿宋；正文三号仿宋，固定行距 28 到 29 磅，每页 22 行 x 28 字；页码
四号半角宋体。报告正文给国企或监管：黑体小二或三号标题，宋体或仿宋小四正文，
1.5 倍行距，英文与数字 Times New Roman。

字号。中文 deck 比拉丁文大 2 到 4 磅才同等易读：标题 24 到 28 磅，不超过
32；正文 14 到 16；图表标签 11 到 12；来源与注 9。行距 deck 1.2 到 1.3，Word
1.5。

双语。中文第一行，英文第二行灰色 #595959、字号 70 到 80%；或左右两栏。不要
中英同字号同字重并列，层级会消失。

标点与数字。中文段落用全角标点，拉丁与数字段落用半角；中英之间是否加空格全
篇一致；范围用"至"或"到"，不用连字符；千分位；单位在表头说明一次（"单位：
亿元"）；年份写 2024 年，不写 24 年；百分比小数位全篇一致。

图表。资料来源行用全角冒号，条目分号分隔，本所分析放最后："资料来源：国家统计
局；Wind；公司分析"。"注："在上。编号"图 1 / 表 1"。标题是判断句（"2025 年新
能源车渗透率将突破 50%，充电需求翻番"），不是名词短语（"市场概览"）。

常见视觉病。淘宝或 WPS 模板的渐变封面、科技蓝粒子背景、地球光线箭头素材、左
上角大 logo 加公司全称、每页彩色色块标题栏；字体杂乱、十档字号；三格四格
icon 卡片、圆形数字序号、SmartArt 环形流程、带阴影圆角框、"核心优势"六宫格；
Excel 默认配色、3D 饼图、有图例无数值、无来源无单位无年份；满页要点无结论、
"赋能 生态 闭环 抓手"、感叹号；居中一切、两端对齐拉开字距、行距 1.0、无页码、
无"保密"、每页"关键结论"框；单位混用、无千分位、"24 年"。

## 12. Pre-flight

1. Every slide or exhibit title is a sentence with a verb and, where the
   topic is size, growth or money, a number. Titles alone tell the story.
2. One accent colour per page on the so-what only; all other series grey;
   no Office default colours anywhere.
3. Every chart: unit once, axis from zero, direct labels, no gridlines,
   border or 3D, source beneath.
4. Every table: horizontal rules only, numbers right-aligned with consistent
   decimals, units in the header, totals bold, no stripes.
5. Two font families at most; sizes from the scale; nothing under 8 pt on a
   slide, 7 pt in print, 9 pt in a Chinese deck.
6. Title, source and page number at identical coordinates on all slides;
   everything left-aligned except the cover.
7. No icons, cards, gradients, shadows, emoji, SmartArt, stock photos,
   key-takeaways boxes, centred paragraphs.
8. Numbers consistent: thousands separators, parentheses for negatives in
   finance, en dash for ranges, sign on changes.
9. Confidentiality legend, date and page numbers present on client and
   investor material; sticker only if genuinely preliminary.
10. Chinese output: 思源黑体 or 微软雅黑 for decks, 仿宋 or 宋体 for formal
    documents; full-width punctuation; units stated; English subordinate in
    grey.
11. Metadata: author is the person or the project team; no tool name in
    Creator, Producer or Application. `scripts/scan.py` checks this.
