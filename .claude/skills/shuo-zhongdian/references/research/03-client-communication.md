# 乙方对客户沟通方法论调研 — 说重点 skill 素材

调研范围：WIIFM/feature-benefit、SPIN Selling、咨询业 answer-first 汇报规范、坏消息传达框架、谈判与请求表达、freelancer 社区避坑。
黑名单已遵守：未使用知乎/微信公众号/百度百科。

---

## 1. WIIFM + Feature→Benefit 翻译

### 1.1 核心框架
- **来源**：[DealHub Glossary – WIIFM](https://dealhub.io/glossary/wiifm-whats-in-it-for-me/)｜可信度：中（营销词汇站，定义类内容，无原创研究）
- **来源**：[Weldon Long – WIIFM](https://weldonlong.com/blog/wiifm-whats-in-it-for-me/)｜可信度：中（销售培训博主，方法论有实操细节但非学术）
- 要点：沟通必须从"我想说什么"转向"对方需要听什么"。Feature 是事实陈述，Benefit 才是"你会因此变得更好"的结果陈述。

### 1.2 可操作规则：「…对你意味着…」翻译公式
- 来源同上（Weldon Long）
- 规则：**每说一个技术事实，必须接一句"这对你意味着……"**，强制把 feature 转成客户视角的结果。
  - 反例（feature）："我们用了向量数据库做语义检索。"
  - 正例（benefit）："我们用了向量数据库做语义检索——这对你意味着，客户在你的网站上搜'退货'也能搜到'退换货政策'，不会因为搜不到答案而流失。"
- 规则：**量化优先于形容词**。"节省时间/提高转化"不如"每周省 10 小时"/"转化提升 15%"。
  来源：[inmotionmktg – WIIFM](https://inmotionmktg.com/blog/wiifm-whats-in-it-for-me/)（可信度：中，营销代理商博客）

### 1.3 对个人开发者场景的直接映射
- 客户在乎的从来不是"用了什么模型/架构"，而是：省了多少人力、少踩了什么坑、多赚了多少钱、几天能上线。
- 规则：**技术选型、架构决策默认不进日常汇报**，除非客户主动问，或该决策直接影响交付时间/价格（那也要翻译成时间/价格影响再说）。

---

## 2. SPIN Selling（Neil Rackham）—— 先问、再说重点

### 2.1 四类问题结构
- 来源：[Highspot – SPIN selling, explained](https://www.highspot.com/blog/spin-selling/)｜可信度：中高（销售 enablement 公司整理，忠实转述 Rackham 原意，配了具体例句）
- 来源：[Shopify – SPIN Selling Guide](https://www.shopify.com/blog/spin-selling)｜可信度：中
- 来源：[Pulse RevOps – SPIN Selling Cliff Notes](https://pulserevops.com/sales-book-summaries/bs0238)｜可信度：中

| 类型 | 目的 | 例句 |
|---|---|---|
| Situation（现状） | 摸清背景 | "你们现在这块是怎么处理的？" |
| Problem（问题） | 找痛点 | "这个环节最让你头疼的是什么？" |
| Implication（影响） | 放大后果、建立紧迫感 | "这个问题拖着不解决，对你下个月的目标有什么影响？" |
| Need-payoff（需求-收益） | **让客户自己说出价值**，不是卖方说 | "如果这个问题解决了，对你意味着什么？" |

### 2.2 三层：Feature / Advantage / Benefit（Rackham 原书核心区分）
- 来源：[Pulse RevOps summary](https://pulserevops.com/sales-book-summaries/bs0238)｜可信度：中
- Feature：产品事实（"这套系统有自动重试机制"）
- Advantage：feature 的一般性作用（"意味着任务失败会自动重跑"）
- **Benefit**：必须对应客户**已经明确表达过**的需求（"你上次说过夜间批处理老失败没人管，这个能解决"）

### 2.3 关键可操作规则：**premature benefit statement 会制造反对**
- 来源同上
- 规则：**客户没先承认"有这个需求/这是个问题"之前，别先抛benefit/卖点**。这是 SPIN 对"什么时候不该说重点、该先问"的核心启示——顺序错了（先讲好处，客户没认同痛点）会激发"这个我不需要"的本能反驳。
- 对个人开发者的映射：报价/提方案前，先用 1-2 句 Problem/Implication 式提问确认客户认的痛点是什么，再讲你的方案怎么解决**这个**痛点，不要上来就列功能清单。
- Need-payoff 问题的价值：**让客户自己说出"如果做成了值多少钱/省多少事"**——他自己说的话，他不会反驳。个人开发者报价前可以问"如果这个功能上线，对你团队意味着什么"，客户的回答就是你报价的锚点素材。

---

## 3. 咨询业 Answer-First 汇报规范

### 3.1 Minto Pyramid Principle
- 来源：[Slideworks – The Pyramid Principle](https://slideworks.io/resources/the-pyramid-principle-mckinsey-toolbox-with-examples)｜可信度：中高（专做咨询方法论培训的机构，内容具体）
- 来源：[Medium – Ameet Ranadive, Lessons from McKinsey](https://medium.com/lessons-from-mckinsey/the-pyramid-principle-f0885dd3c5c7)｜可信度：中（前 McKinsey 员工一手经验）
- 结构：**顶层结论先说 → 第二层 2-3 个支撑论点 → 第三层数据/证据**。核心是"答案在最上面"，不是按调研过程的时间顺序叙述。

### 3.2 BLUF（Bottom Line Up Front）—— 军事沟通标准，可直接套用
- 来源：[Animalz – BLUF: The Military Standard](https://www.animalz.co/blog/bottom-line-up-front/)｜可信度：中高（B2B 内容策略公司，写作方法论具体且有可操作步骤）
- 来源：[ThinkInsights – Bottomline Upfront](https://thinkinsights.net/consulting/bottomline-upfront-bluf)｜可信度：中
- 三种自检法找到你的 BLUF：
  1. 直接回答标题/主题在问的问题
  2. 问自己"如果对方只读一句话，该读哪句"
  3. 检查结尾是否藏着"简单说/也就是说/这意味着"——那句话就该挪到开头
- 对消息体的映射：**Slack/微信消息结构 = What（具体请求）+ Why（背景/原因）+ When（截止时间）**，一条消息就给全对方回复所需的一切信息，不用来回追问。
- BLUF 要求"quickly answer the five W's: who, what, where, when, why"并"声明目的和需要采取的行动"——即消息末尾必须有明确 ask。

### 3.3 Status Report 标准结构：BLUF + RAG 红绿灯 + Ask
- 来源：[ProjectManagerCopilot – Project Status Report for Executives](https://projectmanagercopilot.eu/project-status-report-for-executives/)｜可信度：中（项目管理工具博客，但结构描述具体可落地）
- 来源：[Tability – What is a status report](https://www.tability.io/odt/articles/what-is-a-status-report-templates-examples-and-tips-for-better-team-updates)｜可信度：中
- 标准结构（可直接套模板）：
  1. **RAG 状态**（红/黄/绿，对应 schedule/budget/scope 或整体健康度）
  2. **一句话摘要**（3 句以内说清"现在状态+原因"，例句原文：*"Yellow – timeline at risk due to delayed vendor inputs affecting system testing."*）
  3. **本周完成了什么**（3-5 条，讲完成不讲过程）
  4. **接下来做什么**（3-5 条，承诺范围要现实不要理想化）
  5. **阻塞/需要客户做什么**（明确写"在等谁的什么，预计什么时候需要"）
- 规则来源：executives 平均只有 60 秒扫读时间，报告要"短、直接、可重复"（格式一致比好看更重要）。

### 3.4 对个人开发者的映射：进度汇报固定模板
```
【状态】🟢/🟡/🔴 <一句话：现在怎样+为什么>
【本周做了】
- ...
【接下来】
- ...
【需要你】
- <具体的人/具体的事/具体的截止时间>，没有就不写这一节
```
不写过程叙事（"我先研究了A方案，又试了B方案，后来发现……"）——那是讲给自己听的，客户只要结论。

---

## 4. 坏消息传达框架

### 4.1 Bad news sandwich（表扬-批评-表扬）—— 已被研究证伪，但语境有限定
- 来源：[Phys.org – Research shows the 'compliment sandwich' is no longer effective](https://phys.org/news/2025-08-compliment-sandwich-longer-effective.html)（2025-08，Ivey Business School, Karen MacMillan 等人研究）｜可信度：**高**（引用具体学者/机构/发表时间，非泛化博客）
  - 核心发现：员工能识破表扬是"缓冲垫"，导致"等另一只鞋掉下来"的心态；表扬和批评混在一起，员工反而不清楚具体该改什么。
  - 推荐替代：**candor（直接+关怀的坦诚）**，五步框架：准备具体案例和清晰目标 → 制造对话而非单向说教 → 把反馈和对方的价值/目标挂钩 → 结尾给出具体跟进计划 → 把反馈当持续过程不是一次性事件。
  - 原话："The real measure of feedback isn't how well it's delivered, it's whether it creates change and strengthens relationships."
- 来源：[Forbes Coaches Council – How To Avoid The Feedback Sandwich](https://www.forbes.com/councils/forbescoachescouncil/2019/04/16/how-to-avoid-the-feedback-sandwich/)｜可信度：中（引用 HBR 2013 与一项 2011 研究，但为二次转述）
  - 补充规则：正面/负面反馈**分开单独给**，不要在一次对话里混合；反馈要**实时给**（事件刚发生时），不要攒起来。
- **注意**：以上研究场景主要是「上级对员工」的绩效反馈，不完全等同于「乙方对客户」的坏消息场景——客户是甲方，权力关系相反，直接程度需要调整（见 §6 矛盾记录）。

### 4.2 经典商务写作教材：Indirect Bad-news Pattern（针对外部客户/顾客场景）
- 来源：[Pressbooks BC Campus – 8.3 Indirect Bad-news Message Organization](https://pressbooks.bccampus.ca/businesswritingessentials2/chapter/8-3-indirect-bad-news-message-organization/)｜可信度：中高（加拿大公开商务写作教材，标准教科书内容）
- 四段式结构：**Buffer（缓冲，中性/正面开场，不能提前透露坏消息）→ Reasons（先讲原因/背景）→ Bad news（坏消息本身）→ Redirect/Goodwill close（替代方案+维护关系的结尾）**
- 适用场景原则：**当你需要读者先理解"为什么"才能不产生对抗情绪时**，用 indirect pattern；如果坏消息本身很小、或对方期待直接、或关系足够信任，直接式更好。

### 4.3 实操：项目延期通知
- 来源：[SiteMate – Project delay letter to client](https://sitemate.com/resources/articles/commercial/project-delay-letter-to-client/)｜可信度：中（B2B SaaS 内容，行业通用建议）
- 来源：[MyProjectLessons – Notify Your Client Of Project Delays](https://myprojectlessons.com/notify-client-of-delays/)｜可信度：中
- 核心规则：
  1. **发现延期立刻说，不要等到临近截止日才说**——这是所有来源的共识第一条。
  2. 直说结论，不甩锅（"不因为任何人任何事甩责任"）。
  3. 給出新的具体日期或时间线，不要模糊表述。
  4. 后面跟一个"我们已经做了什么来减少影响"的行动计划。
- 延期通知最小模板：
  ```
  [坏消息] X 会比原计划晚 [N天]，新完成时间是 [具体日期]。
  [原因，一句话，不甩锅] 因为 [客观原因]。
  [已经做的补救] 我已经 [具体动作] 来把影响降到最低。
  [对客户的影响+要不要做什么] 这会影响 [具体环节]；如果你需要我优先做 [A] 还是 [B]，告诉我。
  ```

### 4.4 加钱/加范围（scope creep）话术
- 来源：[FreshBooks – 5 Scripts You Can Use to Handle Project Scope Creep](https://www.freshbooks.com/blog/how-to-handle-scope-creep-5-scripts-you-can-use-now)｜可信度：中高（面向 freelancer 的老牌财务工具公司博客，脚本可直接抄）
- 来源：[Jennifer Bourn – Script: How To Address And Prevent Scope Creep](https://jenniferbourn.com/script-address-prevent-scope-creep/)｜可信度：中（独立设计顾问博客，脚本具体）
- 可复用脚本骨架（拼合上述来源，去掉过度客气的部分）：
  ```
  这个想法很好，但它超出了我们原来约定的范围 [附范围文档/合同片段]。
  我可以按 [新报价] 把它加进来；或者我们先按原计划走，这个留到下一期。你选一个。
  ```
  - 关键结构：**先认可（不否定客户）→ 指出超范围（客观引用文档，不靠记忆/口头争辩）→ 给两个选项（加钱 or 不做），不问"你觉得呢"**。
  - Jennifer Bourn 补充：如果客户对首次提醒没反应且持续扩大范围，第二封信可以直接暂停项目——"I'm hitting pause on your project until we can have a conversation about the current scope..."（这是可用的最后手段模板，不是首选）。

---

## 5. 谈判与请求表达

### 5.1 Anchoring：先出价、精确数字
- 来源：[PON Harvard – Negotiation Research: For Effective Price Anchoring, Strive for Precision](https://www.pon.harvard.edu/daily/dealmaking-daily/negotiation-research-can-use-effective-first-offer-strive-precision-nb/)｜可信度：高（哈佛法学院谈判项目，学术性强）
- 来源：[PON Harvard – What is Anchoring in Negotiation?](https://www.pon.harvard.edu/daily/negotiation-skills-daily/what-is-anchoring-in-negotiation/)｜可信度：高
- 核心发现：**先出价的一方通常拿到更好的结果**（元研究显示首次出价与最终结果相关系数 r≈0.497）；**精确数字（如 ¥28,600）比整数（如 ¥30,000）锚定效果更强**——精确数字暗示"这是算出来的，不是拍脑袋"。
- 对个人开发者的映射：报价时**先给一个具体、精确的数字**（不是区间、不是"大概"），比等客户先开口或给模糊范围更有利。

### 5.2 给选项而非开放式问题
- 来源：[HBR – Having Too Many Options Can Make You a Worse Negotiator](https://hbr.org/2017/05/having-too-many-options-can-make-you-a-worse-negotiator)｜可信度：高（HBR，但全文付费墙，只取到摘要论点）——摘要指出"更多选项=更好结果"是常见误解，实际选项过多会伤害谈判者自己的判断质量。
- 来源：[ScienceDirect – Multiple equivalent simultaneous offers (MESOs)](https://www.sciencedirect.com/science/article/pii/S074959781630557X)（Leonardelli, Gu, McRuer, Medvec, Galinsky）｜可信度：**高**（同行评审期刊 Organizational Behavior and Human Decision Processes，6 个实验）
  - 核心发现：**同时给 2-3 个"等价但不同"的方案（MESO）比给单一方案，在经济结果和关系结果上都更好**——对方会把"给选择"感知为更有诚意（agreement sincerity），谈判氛围更合作。
  - 限定条件：选项数**别超过 3 个**，选项过多会造成"choice overload"，反而抵消这个策略的好处；且 MESO 本身也会形成锚定，不是"中立展示"。
- 来源：[BoldHaus – Consulting Proposal Template: Why Multi-Option Pitches Fail](https://boldhaus.com/consulting-proposal-template-options/)｜可信度：中（咨询定价顾问博客，无学术引用，但和 MESO 研究方向一致）
  - 规则："What works for you?" 这种开放式问题把认知负担全甩给客户；应该改成"预设好的 2-3 个选项"降低决策疲劳。
- **对个人开发者的映射（核心规则）**：
  - 报进度/提方案/要决策时，**默认给 A/B（最多 A/B/C）方案而不是开放式提问**。
  - 每个选项要**说清代价和结果**（"A方案：3天，¥X，效果Y；B方案：1天，¥0，效果Z"），不是干巴巴列名字。
  - 开放式问题只在真正需要探索需求阶段（SPIN 的 situation/problem 提问）用，一旦进入"要做决定"的阶段就切换成选项制。

### 5.3 CTA 明确化：一条消息一个 ask
- 来源：[GetProspect – Effective call to action for email](https://getprospect.com/blog/email-call-to-action-examples)｜可信度：中（B2B 邮件营销工具博客，引用了具体转化率数字但未给一级来源）
- 核心数据引用（二级来源，需谨慎对待）：单一 CTA 相比多重 CTA 能提升点击率 371%、销售 1617%（原始出处未标注，视为营销行业常见引用而非严格学术数据，标注为**可信度中低，仅作方向性参考**）。
- 可直接采信的定性规则（多个来源一致）：
  - **一条消息只提一个明确的 ask**，多个请求混在一起会让对方"评估太多选项→不行动"。
  - CTA 必须是"具体下一步"（回复我/选A或B/确认这个日期），不是"你觉得怎么样"这种无边界开放问句。
  - 消息结尾前重复一次"你需要做什么"，不要让 ask 埋在中间段落。

---

## 6. Freelancer/独立开发者社区避坑

### 6.1 Toptal — 常见沟通错误与修复（可信度中高，Toptal 是面向自由职业者的老牌平台，内容基于大量案例整理）
来源：[Toptal – Freelancer Client Communication Tips](https://www.toptal.com/remote/common-mistakes-client-communication)
- **错误1：两次交付之间没消息**。修复：哪怕没有异常也要"每隔几天发一封进度邮件"，主动说延迟/疑虑，不要等对方来问。
- **错误2：制造不切实际的预期**（承诺太多）。修复：先听、先分析、先确认预算和排期可行，再决定要不要提出额外建议。
- **错误3：没确认理解就假设需求**。修复：把理解整理成时间线，再约一次会议"复述你的理解"让客户确认，消除歧义在开工前，不是开工后。
- **错误4：过度依赖书面文档**。修复：**永远配一个原型/草图**，哪怕只是手绘，纯文字对非技术客户是灾难。
- **错误5：承诺固定死线**。修复：给"预估"并明确标注是预估不是死线；一旦发现比预期慢，立刻说，让客户能配合调整。

### 6.2 Simple Programmer / arc.dev — 技术细节要不要讲
- 来源：[Simple Programmer – How to Relate to Non-Tech Clients](https://simpleprogrammer.com/relate-to-non-tech-clients/)｜可信度：中（自由职业培训类博客，无学术引用但方向和其他来源一致）
- 规则：不用行话；不要在建立业务背景前先讲实现细节；每一句话都要挂回"这对客户的投入和目标意味着什么"；用业务指标不用技术指标描述结果（例："帮客户把新客户上线能力提升300%"而不是讲用了什么架构）。
- 来源：[arc.dev – 13 Things Freelance Software Developers Hate Hearing From Clients](https://arc.dev/employer-blog/things-software-developers-hate-hearing-from-clients/)｜可信度：中（招聘平台内容营销，但列举具体案例）
- 反向教训（客户给乙方的坏沟通样本，可用来识别"客户在犯什么错，我该怎么把话说清楚让客户别犯"）：模糊方向（"你是专家你决定就好"）、拿非正式反馈当市场验证（"我问了几个朋友"）、项目中途空降新技术要求、重大转向不解释理由。**对乙方的启示**：这些问题的根源往往是乙方没有在早期用选项制/结构化提问把决策权和信息收窄，才导致客户用模糊语言"甩锅"。

### 6.3 不要过度道歉
- 来源：[SMTP2GO – Stop Apologizing: Write Confident Emails](https://www.smtp2go.com/blog/confident-emails/)｜可信度：中（邮件工具厂商博客）
- 规则："sorry to bother you"/"I know you're busy"/"I hate to take up your time" 这类开场**会让对方觉得你自己都不信自己的价值**。合理的请求不需要预先道歉。
- 真出错时的规则：**道歉要真诚但简短，紧接着立刻给"接下来怎么办"的方案**，不要长时间停留在道歉状态——"apologize sincerely but also confidently move toward resolving the issue"。

### 6.4 Hacker News 一手讨论（独立咨询者经验）
- 来源：[HN – Ask HN: What mistakes did you make when starting as a consultant/freelancer?](https://news.ycombinator.com/item?id=21728436)｜可信度：中（一手实践者经验，非结构化，个体样本，需谨慎泛化）
- 摘录方向性教训（经由搜索摘要获取，原帖抓取被限流未能逐条引用）：不预收定金就开工是常见早期错误；客户按"价值"理解价格而非工时（"$20,000/年"式框架比逐小时报价更容易被接受）；每个客户都是新老板，不了解也不关心你其他客户的情况，沟通不能假设对方有你的上下文。

---

## 7. 框架间矛盾记录（写 skill 时必须显式处理，不能装看不见）

### 矛盾1：「直接」vs「关系维护/缓冲」
- **直接阵营**（§4.1 Ivey研究、Forbes）：sandwich式缓冲让对方识破套路，破坏信任；候选证据场景是"上级对下属的绩效反馈"。
- **缓冲阵营**（§4.2 商务写作教材 indirect pattern）：**外部客户/顾客场景**（不是内部员工）明确建议先给 reason 再给坏消息，因为读者需要先理解"为什么"才不会情绪对抗，且客户是甲方，乙方没有"绩效反馈"那种居高临下的权力位置。
- **调和方案（给 skill 用的裁决规则）**：
  - 判断权力关系：**对方是付钱的甲方**时，不能照搬对下属直接说"这不行"的强度；但"不能照搬"≠"就该走三明治"——三明治的问题是**用无关的表扬当缓冲**，而不是"给背景原因"本身有问题。
  - 落地规则：**用"原因/背景"当缓冲，不用"无关的表扬"当缓冲**。即：直接说结论（BLUF）+ 一句真实的原因（不是灌水的好话）+ 具体解决方案，而不是"你人真好，不过……，你人真的很好"。
  - 这本质是把 §4.2 的 buffer 换成"一句话原因"，同时遵守 §3 的 answer-first——结论仍然放最前面，"原因"不是拖慢真相的开场白，是紧跟结论的合理化。

### 矛盾2：「先问再说」(SPIN) vs 「Answer-first / BLUF」(咨询汇报)
- SPIN 强调：报价值之前先问需求，不要抢跑讲 benefit。
- BLUF/Pyramid 强调：汇报时结论先说，不要先铺垫过程。
- **调和**：这两者不冲突，因为**适用的沟通阶段不同**——
  - **需求探索/报价前**（还不确定客户认可什么价值）：用 SPIN 提问，先问后说。
  - **进度汇报/交付坏消息/已经有明确信息要传达时**：用 answer-first，结论先说。
  - 判据：**如果你手上已经有一个明确结论要传达，直接说结论；如果你需要从客户那里换取信息或认可，先问**。两者的公共原则都是"别绕圈子/别自说自话"。

### 矛盾3：给选项 vs 开放式提问
- SPIN 的 situation/problem 阶段需要开放式提问（了解现状）。
- §5.2 的谈判/决策阶12段强烈建议用 A/B 选项代替开放式问题。
- **调和**：同矛盾2的判据——**探索期开放问，决策期选项问**。开放式问题的正确用法仅限"我还不知道答案，需要了解你"；一旦轮到"我需要你做决定"，必须收窄成选项。

---

## 8. 汇总：可直接进 skill 的规则清单

1. Feature 后必须接"这对你意味着……"，量化优先。
2. 报价/提方案前，先用一句 SPIN 式提问确认客户认的痛点，再讲对应方案——不认痛点就先别抛benefit。
3. 一切消息结论先说（BLUF），原因和过程放后面，不按时间顺序叙事。
4. 进度汇报固定结构：红绿灯状态 → 一句话摘要 → 做了什么(≤5条) → 接下来(≤5条) → 需要对方做什么。
5. 坏消息：发现即说，不等临近截止日；结论先说+一句真实原因（不是无关表扬）+已采取的补救+对客户的具体影响+需要客户配合的点。
6. 加钱/超范围：先认可 → 客观指出超出原约定范围（引用文档）→ 给两个选项（加价或不做），不问"你怎么看"。
7. 报价用精确数字先出价，不用模糊区间等对方先开口。
8. 需要客户决策时默认给 2-3 个结构化选项（每个选项写清代价+结果），不用开放式问题；开放式问题只留给探索期。
9. 每条消息只提一个 ask，结尾前明确写"需要你做什么/什么时候之前"。
10. 不用技术行话，不主动展开架构/实现细节，除非直接影响时间或价格；技术决策一律翻译成时间/价格/风险的变化再说。
11. 不过度道歉；真出错先简短承认+立刻给下一步方案，不停留在道歉状态。
12. 不把决策抛给客户当"甩锅"（"你是专家你看着办"是客户在犯的错，乙方要靠结构化提问和选项制反过来引导，不要用同样模糊的方式回应模糊）。

---

## 附：可信度分级说明
- **高**：同行评审期刊/学术机构（HBR、PON Harvard、ScienceDirect、Ivey Business School 研究）
- **中高**：行业老牌平台/教材/专做该方法论的培训机构（Toptal、FreshBooks、Highspot、Animalz、Pressbooks 教材、Slideworks）
- **中**：垂直领域博客/营销工具厂商内容（有具体可操作细节，但缺少一级数据来源，需要交叉验证）
- **中低**：转述二级数字（如 CTA 转化率提升371%），未见一级来源，仅作方向参考不可当作精确数据引用
