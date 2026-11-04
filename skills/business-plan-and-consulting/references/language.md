# Language: what partners cut, and what to write instead

This file extends the ai-eraser skill with the consulting and finance
register. The test for any word: is its opposite absurd? ("select
acquisitions", "positive growth", "forward planning" fail; that is Terry
Smith's rule at Fundsmith.) Does deleting it lose information? Could a
number or an action replace it? If yes to any, cut.

`scripts/scan.py` greps a document for the lists below plus the ai-eraser
lists. A hit may stay only with a reason, for example a quoted client phrase.

Contents
1. English: words and phrases
2. English: structure
3. 中文：黑话、公文腔、AI 味
4. 中文：结构
5. Both languages: numbers and claims
6. Before and after

---

## 1. English: words and phrases

| Cut | Write instead |
|---|---|
| leverage | use, rely on, borrow (if literal) |
| synergies | cost savings of $X from Y |
| holistic, comprehensive, end-to-end | name the parts covered |
| robust | name the stress test it passed |
| going forward, on a go-forward basis | from Q1, from now |
| best-in-class, world-class, cutting-edge, state-of-the-art, next-generation, iconic | delete, or give the rank and the source |
| ecosystem | partners, suppliers, customers (name them) |
| paradigm, transformative, game-changing, disruptive, revolutionize | say what changes, by how much |
| drive value, unlock value, empower, enable | raise EBITDA by $X; let the team do Y |
| seamless, scalable, agile, streamline, optimize, enhance, facilitate, utilize | plain verb, or the volume it scales to |
| align, alignment, bandwidth, cadence, touch base, circle back, reach out, deep dive, granular | agree, capacity, schedule, meet, call, review, detail |
| key (as filler), strategic (as filler), impactful, innovative | delete |
| stakeholders | name them |
| footprint, space (sector), runway (except cash runway), talent, journey, north star | sites, sector, months of cash, staff, plan, target |
| low-hanging fruit, move the needle, at the end of the day, in terms of, at this point in time | delete |
| delve, tapestry, testament, landscape, pivotal, crucial, intricate, vibrant, showcase, underscore, garner, multifaceted, boasts, renowned, groundbreaking, diverse array, commitment to | the plain noun or verb |
| additionally, furthermore, moreover, in addition, notably, it is worth noting, it is important to note, in conclusion, overall, in summary | delete; start with the fact |
| experts argue, studies show, industry reports suggest | the named study, year, figure |
| may potentially, could possibly, to some extent | one qualifier at most, or a probability |

Deloitte's most-hated list: leverage, bandwidth, touch base, robust,
synergize, incentivize, bleeding edge.

## 2. English: structure

- Answer first. No warm-up paragraph, no "this document aims to", no "this
  report is structured as follows".
- No forced triads ("robust, scalable and holistic"). No "not only X but
  also Y". No "it's not X, it's Y". No rhetorical questions. No one-line
  dramatic closers. No closing paragraph that restates.
- Sentences under 30 words, subject-verb-object, active voice. "Use" not
  "utilize"; "because" not "due to the fact that"; "by" not "pursuant to
  the procedures described herein".
- Replace adjectives with data: "customers love the product" becomes "net
  revenue retention is 118 percent".
- Trailing participles are padding: "..., highlighting the need for",
  "..., ensuring alignment", "..., fostering". Cut the clause.
- Hedging stacks are a junior tell. One qualifier, or a number with a
  confidence.
- Em dash: at most one per page. Bold: at most one phrase per page, the
  number or claim the reader must see. Title case only on the cover.
- Attribution is specific: "Gartner, 2024" not "industry reports". Opinion
  is flagged: "I recommend", "we believe".
- Risk factors: one risk per heading, the specific failure, no mitigant
  inside the risk, in order of materiality (SEC and HKEX both require this).

## 3. 中文：黑话、公文腔、AI 味

互联网黑话，翻译成人话再决定要不要：

| 删 | 改成 |
|---|---|
| 赋能 | 帮助、给工具、让 X 能做 Y |
| 抓手 | 具体做法（写出来） |
| 闭环 | 做完并反馈；或写流程的最后一步 |
| 生态、生态圈 | 合作伙伴网络（列出谁） |
| 打法、组合拳 | 方法；同时做的几件事（逐一列出） |
| 顶层设计 | 总体方案 |
| 全链路、全流程、一站式 | 从 X 到 Y 的每个环节（列出环节） |
| 降本增效 | 成本降 X%，效率升 Y%（必须给数） |
| 对齐、拉通、打通 | 统一口径、协调、连接 |
| 落地 | 执行（谁、何时） |
| 沉淀、输出 | 记录、积累；提供 |
| 颗粒度、底层逻辑 | 细节程度；原因 |
| 复盘 | 总结教训 |
| 赛道、蓝海、红海、护城河、弯道超车 | 行业；竞争少或多的市场；优势（说明是什么）；用更强的位置竞争 |
| 布局、深耕、夯实、打造、构建、助力、引领、驱动、聚焦、推进、强化、提升（作空动词时） | 进入、投资、做了什么、改了哪里、到多少 |
| 痛点、心智、画像、私域、声量、头部、腰部 | 问题、用户印象、用户特征、自有渠道、曝光量、排名前 X |
| 行业领先、国际一流、世界一流、填补空白、高质量 | 给排名、份额、来源 |
| 数字化转型、智能化升级（无内容时） | 做了哪个系统、替代了什么、省了多少 |

公文腔（咨询报告和 BP 都要避免）：铺垫先行、结论在尾；"进一步、切实、扎实、深入、全面、有力、积极、稳步、不断、大力"程度副词堆叠；四字对仗排比当论证用（"提质增效、稳中求进"）；"以…为抓手，以…为引领"句式；"高度重视、充分认识"；"要…要…要…"的祈使段落；"加强管理、完善机制、优化流程"无指标无主体的动宾空转。

AI 味连接词：首先、其次、再次、最后、综上所述、总而言之、值得注意的是、值得一提的是、不言而喻、毋庸置疑、与此同时、此外、事实上、总体来说、不难发现、换言之、简而言之。"无论是…还是…抑或是…"三段排比；"不是…而是…"；"不仅…而且…"；每句等长、全部中性语气、无立场；"可能会、一定程度上"；空洞形容词（"出色的性能表现"）；"随着…的发展、在…背景下、近年来"开场；"体现了、彰显了、标志着、奠定了基础、具有重要意义、未来可期"升华句；"希望对您有帮助、以上是、以下是"客套。

## 4. 中文：结构

- 第一句是结论，带数字。摘要第一段不写背景。
- 删掉所有不带指标的"加强、完善、优化、提升、推进"；删掉所有程度副词。
- 四字排比每页不超过一组，只作标题，不作论证。
- 每个建议写全五项：做什么、谁做、何时、花多少、得多少。
- 段落第一句即判断，后接硬数据和案例；段落 3 到 6 句；长短句交错；一句可以成段。
- 引用写来源与时间："按 10/17 中建 Update"；对方原话加引号。
- 不编造：人名、数字、日期、引语只能来自原文或作者；缺的写"待核：等谁、等什么"。
- 对外不点客户名时用统一代称；对内直接写人名。
- 不装人味：不编第一人称经历、不故意错字、不堆口头禅。

## 5. Both languages: numbers and claims

- Every size, growth, cost, share or saving claim carries a number, a base,
  a period and a source. "Market is growing fast" is not a sentence a
  partner signs.
- A percentage without a base is a flag. "Up 40 percent" needs "from 12 to
  17 customers" next to it when the base is small.
- The same figure is the same everywhere: the executive summary, the body,
  the table and the chart. `scripts/check_numbers.py` finds a label with two
  values and a total that does not foot.
- A projection without its assumptions table is a hockey stick.
- "No competitors" is never written. "Conservative projections" is never
  written; show the downside case instead.
- Market leadership names the segment and the segment's share of the whole.
- Unknown is written as unknown, with what is being waited for and from
  whom. It is not smoothed over with a phrase.

## 6. Before and after

English executive summary opener

Before: In today's rapidly evolving data centre landscape, our company is
uniquely positioned to leverage its robust capabilities and deliver
best-in-class commissioning services, driving significant value for
stakeholders across the ecosystem.

After: We commission hyperscale data centres in Johor and Guangdong at 30
percent below the international firms' price and 40 percent faster than the
local ones, and have delivered 18 MW across three sites since 2024. We are
raising RMB 30M to add two L4/L5 teams and win the next 60 MW of Johor
build-outs by end-2027.

中文摘要开头

改前：随着数字经济的快速发展，数据中心建设进入高速增长期。本项目旨在打造一
站式数据中心智能调试服务平台，赋能行业客户，构建调试服务新生态。

改后：我们给柔佛和广东的超大规模数据中心做调试，报价比国际公司低 30%，交付比
本地公司快 40%，2024 年至今完成 3 个园区共 18 MW。本轮融资 3,000 万元，用于新增
两支 L4/L5 团队，目标 2027 年底拿下柔佛下一批 60 MW 的调试合同。

标题

改前：三、市场分析
改后：柔佛 2024 到 2027 年新建 1.2 GW，调试费按 1.5% 计为 18 亿元，其中我们能触
达的 L3 到 L5 部分约 6 亿元

Risk factor

Before: Competition risk: large companies may enter the market, but our
experience and local relationships give us a strong moat.

After: Three international firms (named in the appendix) bid on every Johor
hyperscale project. We won two of the last five bids on price; if they
match our price, our margin falls from 28 to 15 percent.

## 7. Chinese structural tells beyond vocabulary

Word-level tells fade with every model release; discourse-level tells do
not. Check these after the word pass:

- 叠"的"："我们的产品的核心的优势" → 产品的核心优势。
- "进行 + 动词"名词化："对方案进行优化" → 改方案。
- 连环被字句。
- 四字词排比当论证；一篇最多一处对仗金句（"硬件为入口、订阅为粘性"）。
- 同一概念在不同段落换同义词（平台、系统、产品、方案指同一个东西）：一文
  一词。
- 段落连接词链（首先、其次、此外、综上 超过三处）。
- "结论：""核心逻辑：""定位宣言：""一句话概括："标签体行；代码块放卖点。
- 三个结构完全相同的并列项；每段等长；每句中性无立场。
- 正文里留着写作批注：[估算假设]、[待补充]、"> 自洽铁律"、文末自检清单、
  ⚠️✅★。
- 表格轰炸：痛点、团队、模式全用表格。表格只放参数、财务、对标矩阵，每张表
  前有一句过渡；图注在图下，表注在表上，"如图 1-1 所示"引入。
- 英文框架名出现在客户页面上（SCQA、MECE、Pyramid、Key takeaways）。

## 8. What a rewrite must preserve

Rewriting is not a licence to improve the facts. Keep, unchanged: who does
what; every number, date, unit and comparison direction; conditions, scope
and negation; modality (may, will, must) and completion state (done,
planned, under test); attribution (reporting a claim is not making it);
the author's hesitation and intentional repetition; quotations, titles and
proper names. Never add a fact, name, number, date, quote or citation.
Never upgrade an exclusion ("not for lack of effort") into a positive fact
("everyone worked hard").

The five edits that are always allowed: cut greetings, thanks and teasers;
cut writing-order markers; cut full duplicates; cut nominalisation and
function-word clutter; cut baseless reader flattery.

When rules conflict, the order is: facts and evidence strength, then the
user's scope and register, then the author's voice, then natural language,
then the original form.
