# Financial sections: market size, unit economics, projections, the ask

Every number in a plan is a claim that a reader will try to re-derive.
Show the arithmetic, name the source, keep units consistent, and make sure
the same figure is the same everywhere. `scripts/numbers.py` checks totals
and finds a label that appears with two different values.

Contents
1. Market size
2. Unit economics
3. Projections and the assumptions table
4. The ask, use of funds, milestones
5. Cap table and terms
6. Number formatting rules
7. Model conventions (Excel)
8. Questions investors ask; answer them inside the document

---

## 1. Market size

TAM is the demand at 100 percent share; SAM is what the current product,
geography and channel can reach; SOM is what sales capacity and competition
allow in three to five years.

Build bottom-up: number of target customers x adoption rate x price (or units
x price), from a named customer profile, with every input on the page.
Top-down (industry report x assumed share) is a cross-check only; if the two
differ by more than about 20 percent, say why. Third-party TAM figures carry
little weight with investors; the "1 percent of a 100 billion market" line is
the canonical junior error because the first 1 percent is the hardest to
win.

Show the beachhead first (the narrow segment where the company wins now),
then the expansion path with the trigger for each step. Give the source,
year and, for commissioned research, who paid for it. A segment leadership
claim must state what share of the whole industry that segment is (HKEX's
example: 70 percent of provincial sportswear is 5 percent of PRC apparel).

Worked example in the Airbnb form: 84M trips a year, about 25 percent
price-sensitive, about 15 percent addressable, times fee per trip, equals
the revenue opportunity. Each factor is testable.

## 2. Unit economics

| Metric | Definition | Healthy (SaaS unless noted) |
|---|---|---|
| CAC | fully loaded sales and marketing / new customers, by channel | falling or flat as volume rises |
| Payback | CAC / monthly gross profit per customer | ≤ 12 months good; 12 to 18 acceptable; > 24 red flag |
| LTV | ARPU x gross margin / churn, or cohort-based | LTV:CAC ≥ 3 |
| Gross margin | revenue less direct cost | 70 to 80 percent software; 30 to 50 percent hardware; marketplaces on net revenue |
| Contribution margin | after all variable cost | positive by the second year of a customer |
| Net revenue retention | revenue from last year's cohort this year | > 100 percent; > 120 percent best |
| Churn | logo and revenue separately, monthly | with the base stated |
| Burn multiple | net burn / net new ARR | < 1 good; > 2 poor |

Present as a table: metric, definition, current value, last three periods,
benchmark, source. Define each metric once (what counts as a customer, when
revenue is recognised). Cohort curves by month for Series A and later; the
Front deck showed 22 months with candid notes on the bad months, and that
candour is what won.

For a project-based services business (commissioning, engineering,
construction) the equivalents are: revenue per MW or per project, gross
margin per project, utilisation of billable staff, days sales outstanding,
backlog and book-to-bill, win rate by channel, and concentration of the top
three clients.

## 3. Projections and the assumptions table

Three years monthly or quarterly, then annual to year five. Lines: revenue by
stream, cost of revenue, gross profit and margin, sales and marketing, R&D,
G&A, EBITDA, net income, headcount, cash balance, runway; capex where it
matters.

The assumptions table drives everything: price, customers or units by
period, conversion rates, churn, sales headcount and quota, CAC by channel,
salary bands, gross-margin path. Every inflection in the revenue line must
trace to a row on this table. A hockey stick with no driver is the single
most-cited red flag.

Sensitivity: base, downside and upside sharing one set of assumptions, or a
two-variable table (price x churn; CAC x conversion), showing the cash low
point and runway in each. A-share rules require 敏感性分析 on quantified
risks.

Historicals: 24 months of monthly P&L and cash; the deck's metrics must
reconcile to the books. Show three years of history if year three was weak;
hiding it is found in diligence.

## 4. The ask, use of funds, milestones

One number, not a range. A use-of-funds table in money and percent by
category (product and engineering, go-to-market, operations, buffer) with
headcount and timing; a seed software round is typically 50 to 70 percent
product, 20 to 30 percent go-to-market, 10 to 15 percent operations and
buffer. The table sums to 100 percent; check it.

Milestones the money buys: three to five measurable outcomes with baseline,
target and date ("ARR from 2.4M to 10M; customers from 85 to 150; 18
months"), and what the next round will be raised on. Investors fund
milestones, not months; "18 months of runway" alone is a red flag. Raise 100
to 125 percent of what the milestone plan needs, 18 to 24 months of runway,
24 to 36 in a tight market, with six months in hand to run the next process.

## 5. Cap table and terms

Fully diluted, pre and post money. Option pool 10 to 15 percent post (investors
push it into the pre-money). Founders below 50 percent at seed or A, heavy
advisor equity and unconverted notes with unclear terms are red flags. List
every SAFE or note and its conversion. Valuation and terms go in the term
sheet or the conversation for US-style decks; 拟出让比例或估值区间 is
customary in a Chinese BP.

Returns framing for the reader: exit scenarios x ownership at exit after
future dilution gives the multiple on invested capital; a venture investor
needs a credible path to a fund-returning outcome.

## 6. Number formatting rules

- Thousands separators always. Units in the header ("$ in millions",
  "RMB千元", "US$'000"), never per cell; one convention per document, never
  "$M" in one table and "MM" in another.
- Negatives in parentheses (1,234). Percentages to one decimal. Multiples to
  one decimal with x (8.5x). Per-share to two decimals. Same decimals down a
  column.
- Numbers right-aligned, text left-aligned. Single rule above subtotals,
  double rule above grand totals. Totals bold. No zebra striping in Word or
  PDF; light grey banding is tolerated on slides.
- Period labels explicit: FY2024A, FY2025E, LTM Jun-25. Define LTM, NTM, EV,
  EBITDA on first use.
- Rounding footnote where it applies: "Figures may not sum due to rounding."
  中文："合计数与各分项数之和的尾差系四舍五入所致。"
- Every table and chart carries a source line and, where adjusted, a note
  line, in 7 to 8 pt at the foot. Exhibits numbered and cross-referenced.
- Charts to scale, same scale across comparative charts, two-dimensional,
  axes labelled with units, bar values labelled, one highlight colour on a
  grey base.
- Chinese figures: 阿拉伯数字加中文单位（1.2 万亿元、下降约 6%、3 到 5 线城市）；首次出现的英文缩写括注（KPI、EBITDA）；全角标点；百分号用半角。

## 7. Model conventions (Excel)

Inputs blue font, formulas black, links to other sheets green. One
assumptions sheet, separate from calculations and outputs. Years across
columns, one consistent units row. A checks row (balance sheet balances,
sources equal uses, use of funds sums to 100). No merged cells. Freeze panes
on the header row and label column. Negatives in parentheses through the
number format. Named scenarios switched from one cell. No hardcodes inside
formulas. Formulas stay live in the delivered file. The `xlsx` skill's
recalc script verifies formulas before delivery.

## 8. Questions investors ask; answer them inside the document

Financials are the most common question topic in investor Q&A. A plan that
answers these before they are asked reads as institutional:

- What do you do, for whom, in two sentences; why now; why you.
- How big is the obtainable market and how was it computed bottom-up.
- Who buys versus who uses; the sales cycle; what has repeated.
- CAC by channel, payback, LTV:CAC, gross margin, net retention, churn,
  cohorts; what breaks if CAC doubles.
- The moat in three years; how long an incumbent needs to copy it.
- Named competitors and the do-nothing alternative; deals lost and why.
- Cash, net burn, runway; what this round buys; what the next round is
  raised on; what if it takes twice as long.
- Cap table, prior terms, founder vesting, notes and SAFEs, option pool.
- Key hires; founders' history together; references.
- Biggest risks; what is still being tested; what would prove you wrong.
- Regulatory exposure, IP ownership, customer concentration, platform
  dependency.

Put the answers in an FAQ appendix when they do not fit the body.
