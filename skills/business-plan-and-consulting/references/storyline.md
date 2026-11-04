# Storyline: how the argument is built before anything is formatted

Read this before drafting or rewriting any plan, report, memo or deck. The
rules come from Minto (Pyramid Principle), McKinsey/BCG/Bain practice, Amazon
narrative memos and the SEC plain-English handbook. Where a rule is firm lore
rather than a published source it is marked (lore).

Contents
1. The pyramid: three rules, two directions
2. SCQA: the introduction, four orderings
3. Executive summary spec
4. Action titles and the titles test
5. Workflow: storyline → dot-dash → ghost deck → pages
6. MECE and the four orders
7. Problem solving when the answer is not known yet
8. Narrative memo (Amazon six-pager / PR-FAQ / BLUF)
9. The twelve tests a partner applies
10. 中文要点

---

## 1. The pyramid

Three rules. A document that breaks one of them reads as unfinished however
well it is formatted.

1. Every statement summarizes the statements grouped under it. The top is the
   insight the group proves, not a table of contents. "There are three
   problems" is banned (Minto calls it intellectually blank). Write what the
   three problems add up to: "The plant loses money because overtime, scrap
   and freight each run 20 to 30 percent above benchmark."
2. Every grouping holds ideas of one kind: all reasons, or all steps, or all
   parts. Never a reason, a step and a risk in one list. Test: name the plural
   noun that covers every item ("four levers", "two risks"). If one item does
   not fit the noun, it belongs elsewhere.
3. Every grouping is in one of four orders, and you can name which:
   deductive (premise, premise, therefore), chronological, structural (parts
   of a whole), or comparative (largest first, most important first).

Two directions. Going down, each level answers the question the statement
above raises ("why?", "how?", "how do you know?") and nothing else. Going up,
"so what?" of each group must give the parent statement. Never raise a
question you do not answer at the next level. Never answer one the reader was
not led to ask.

Depth. Level 1 is one governing thought, a complete assertion with a verb.
Level 2 is three to five key lines. Level 3 is evidence. More than five key
lines means the prioritizing is not done.

Inductive over deductive for business readers: "Do X because A, B, C" lets a
reader reject B and still accept X. A deductive chain breaks at the first
disputed link. Keep deductive chains to three links.

## 2. SCQA

Situation: one to three sentences the reader already accepts. Nothing
contested, nothing new. Complication: what changed or what is at stake, which
makes the situation untenable. Question: the one question the document
answers; write it down even if it stays implicit. Answer: the governing
thought.

Four orderings, chosen by the reader's state:

| Order | Sequence | Use when |
|---|---|---|
| Direct | A, S, C | Reader is waiting for the answer. Default for boards, CEOs, investors, executive summaries. |
| Standard | S, C, A | Reader has no strong prior, or is hostile and would dismiss a blunt opener. Reach A inside the first paragraph anyway. |
| Concerned | C, S, A | Urgency is the message ("Cash runs out in nine months"). |
| Aggressive | Q, S, C, A | The status quo must be shaken. Rare. |

Worked example. S: the European division has been a priority for five years.
C: margins have been negative three years running and HQ capital is
constrained. Q: do we stay? A: exit Europe within 18 months and move the
capital to Asian operations returning 22 percent ROCE.

## 3. Executive summary

One page or one slide, 300 to 500 words. The reader who reads nothing else
can decide.

- Sentence one is the answer with the single most important number.
- Then three to five key lines. Each is one sentence with a number, a base and
  a period, provable by one exhibit in the body. Reading only these lines
  gives the whole argument. Each may carry one to three evidence sub-points
  with sources.
- Weight: situation and complication together about 20 percent; the
  recommendation 60 to 70 percent; the ask the last two lines.
- End with the decision requested, the owner, the date, and the next 30 days.
- No charts, no method, no caveats, no process narrative ("we interviewed 20
  people"). Accent color on at most two or three items.
- Draft a day-one version first; rewrite it last.

Template:

> We recommend buying Meridian at the proposed $180M.
> Valuation is 5.2x EBITDA against a 6.8x sector average.
> Financing fits inside the existing facility; no new equity.
> LOI by January, close by Q2; the two integration risks and their owners are on page 9.
> Decision requested: approve the LOI on 12 December. Owner: CFO.

## 4. Action titles

A title is a full sentence that states the page's conclusion, with a verb and
usually a number. Not a label. Two lines maximum, about 15 words. Active
voice. One message per title: if it needs "and" to join two findings, split
the page. The exhibit below must prove the title and the title must not claim
more than the exhibit shows. Keep tense, voice and end punctuation parallel
across the deck.

Before and after:

- Market overview → German market grows 12 percent a year, three times the US rate
- Competitive analysis → We lead on four of six purchase criteria but lose on price and delivery
- Financial projections → The acquisition returns 15 percent IRR on conservative assumptions
- Customer feedback → NPS fell 20 points after the Q2 price change, all in SMB accounts
- Cost structure → SG&A is up 15 percent while revenue is down 6 percent; overtime is 55 percent of the gap
- 市场概览 → 华东市场年增12%，增速为华南3倍
- 成本结构分析 → 销售管理费用三年上升15%，其中加班费占增量55%
- 降本增效举措 → 关停两条低效产线并集中采购，年省成本1.2亿元
- 公司战略方向 → 退出欧洲业务，把资本转向回报22%的亚洲市场

Titles test. Read only the titles, in order, aloud. They must form the whole
argument with no gap and no repetition. A partner flips an 80-page deck in ten
minutes this way. `scripts/storyline.py` prints the titles and flags labels.

Cousin test (lore). An intelligent outsider reading the title alone should
grasp the point and roughly guess the chart.

## 5. Workflow

1. Storyline in prose: SCQA, one paragraph, before any page exists.
2. Dot-dash outline in a text file: dots are the key lines that become titles,
   dashes are the facts or exhibits under each. Review this with the client
   or boss. Changes here cost minutes; changes in PowerPoint cost hours.
3. Ghost deck: every page as title plus a pencil sketch of the exhibit, no
   data. If the ghost deck does not tell the story, stop and fix the story.
4. Build exhibits. Re-read every title against its body. Cut any page the
   story survives without. Then rewrite the executive summary last.
5. Prewire: walk each decision maker through the findings one to one before
   the meeting. No surprises in the room.

## 6. MECE

Mutually exclusive, collectively exhaustive, relative to the question asked.
Canonical cuts: revenue / cost / capital; price x volume; fixed / variable;
people / process / technology; short / medium / long term; segments by size
or geography. Smell tests: "sales problem, marketing problem, brand problem"
overlaps; "profitability depends on cost" ignores revenue. If an item could
sit in two branches, cut differently.

## 7. Problem solving when the answer is not known

| Step | Output | Rule |
|---|---|---|
| Define | One SMART question: specific, measurable, action-oriented, relevant, time-bound. "How can Airline Inc. cut operating cost by $400M before 2027?" | Also scope, success criteria, decision maker. |
| Structure | Issue tree (questions) or hypothesis tree (testable claims) | MECE at each level; terminal branches provable with data. |
| Prioritize | Impact x ease 2x2 | Prune early; 80/20. |
| Workplan | Per issue: hypothesis, analysis, data, source, sketch of the end chart, owner, date | Sketch the chart before doing the analysis. |
| Analyze | Proof or disproof | Facts beat opinion; if the facts contradict the hypothesis, change the hypothesis. Do not boil the ocean. |
| Synthesize | Pyramid | Write a day-one answer; revise it weekly. |
| Recommend | Actions with sequence, owner, cost, timing, quick wins, risks | Plausible, feasible, noticeable. |

A hypothesis is worth testing only if it is debatable, material, points to an
action and is not already obvious to the client.

## 8. Narrative memo

When the reader is a board, an operating executive or an investment committee
that reads rather than watches, a prose memo beats a deck.

Amazon six-pager: six pages of full sentences, no bullets in the body,
appendices unlimited. Skeleton: decision sought; goals; tenets (the principles
that break ties); state of the business; lessons learned; plan; FAQ with the
hardest objections answered honestly; appendix. Sentences under 30 words.
Replace adjectives with data ("customers love Prime" becomes "Prime members
spend 2.3x and renew at 93 percent"). Flag opinion as "I recommend". Use
"because of that" and "so now" to make causality visible.

PR-FAQ: a one-page mock press release dated at launch (headline benefit,
problem, solution, executive quote, how to start, customer quote), then
external FAQ, then internal FAQ (economics, dependencies, what has to be
true). A PR-FAQ with soft questions is sent back.

BLUF: first sentence is the conclusion and the action required of the
reader. Exception: a hostile reader, where standard SCQA order reaches the
answer inside the first paragraph instead.

## 9. The twelve tests a partner applies

1. Elevator: the answer and three reasons in 30 seconds.
2. Titles: the titles alone tell the story in order, no gaps.
3. Blank: no title or heading names a topic or a count instead of a claim.
4. Number: every title and key line carries a number with a base and period.
5. Source: every number has a source line; every exhibit has a unit.
6. One message: each page proves exactly one title; no "and" titles.
7. MECE: every item sits in one branch; nothing material is missing.
8. Order: you can name which of the four orders each list follows.
9. So what: the reader does something different after this page, or it goes to the appendix.
10. Ask: the document ends with the decision requested, owner and date.
11. Jargon: zero words from `language.md` unless literally meant.
12. Asymmetry: the biggest lever gets the most space, and there is one number the reader will remember.

## 10. 中文要点

- 中文报告同样结论先行。摘要第一句就是判断加数字，不写"随着…的发展"。
- 章节标题写成判断句：主语 + 动词或趋势 + 数字 + 原因或含义，12 到 25 字，一行为佳，句末不加句号，全篇一致。动词用具体动作（关停、合并、提价、退出、投入），不用探讨、分析、梳理、推进、赋能。
- 顶级事务所中国报告（罗兰贝格《预见2024》、麦肯锡中文洞见）的做法：中英文标题并列；前言由具名合伙人署名、开头即判断；段落 3 到 6 句；图表下先"注："再"资料来源：国家统计局；Wind；罗兰贝格分析"，本所分析放最后；建议动词开头、逐条编号、写到人和时间。
- 智库式要求：开门见山、2 到 3 千字正文另附详版、论据一手、不讲常识、不放公式。
- 每个建议写全五项：做什么、谁做、何时、花多少、得多少。缺一项就是口号。
- "以…为抓手、以…为引领"一律改成"通过做 X，实现 Y（数字）"。
