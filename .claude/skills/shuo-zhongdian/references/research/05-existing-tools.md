# 竞品扫描：现有「说重点」类 AI 沟通改写工具

调研时间：2026-07-09
方法：WebSearch + WebFetch，未使用知乎/微信公众号/百度百科作为信源。

---

## 1. GitHub 同类项目

### 1.1 howardmann/rewrite — `/rewrite` Claude skill
- 来源：https://github.com/howardmann/rewrite （referenced via https://github.com/hesreallyhim/awesome-claude-code/issues/1450）
- Star 数：**4**（非常小，未被广泛采用）
- 形态：单指令 `/rewrite`，粘贴文本 → 返回改写版本，无追问、无场景选择。
- 核心设计目标（摘录自项目描述）：
  - 把 corporate jargon（公司黑话）转成 plain English
  - **"Reorganizes content to place key information first"**（重排内容把关键信息放前面）——这是它最接近"说重点"的部分
  - 目标压缩率 50%+
  - 输出即可直接用，不加评论
- 示例：把一句"鉴于近期客户满意度指标的相关进展……可能需要对我们的市场进入战略进行全面审查"改写为"客户满意度在下降，增长在放缓。我们需要重新思考核心产品的销售方式。"
- **盲点**：只有一种改写强度，不问"给谁看""什么场合"；纯粹是压缩+提前关键信息，没有场景分型（坏消息/报价/进度汇报的处理方式完全一样）。

### 1.2 JuliusBrussee/caveman
- 来源：https://github.com/JuliusBrussee/caveman
- 定位：让 Claude Code **自己的回复**变简短（穴居人式语气），号称削减 65% 输出 token，代码/命令/报错保持逐字精确。
- 与"说重点"目标不同：它压缩的是 AI 对用户的输出，不是帮用户改写发给别人的话；没有受众换位、没有场景分型，纯粹是"少说废话"。
- 说明一个常见误区：把"说重点"简化为"字数变短"——caveman 证明这条路径已经被别人做过，且做得很极端，新 skill 如果只做"压缩"就是重复劳动。

### 1.3 anthropics/skills 官方 `internal-comms`
- 来源：https://github.com/anthropics/skills/blob/main/skills/internal-comms/SKILL.md
- 所属仓库 anthropics/skills 目前约 **149k~160k star**（母仓库量级，非本 skill 单独数据）
- 设计：不是一个改写 prompt，而是一个**模板路由器**——识别用户要写哪种内部沟通（3P update / 公司通讯 / FAQ / 状态报告 / 领导汇报 / 事故报告），加载 `examples/` 下对应指南文件，再按该文件的格式/语气/取材要求生成。
- SKILL.md 原文关键句：
  > "Claude should use this skill whenever asked to write some sort of internal communications (status reports, leadership updates, 3P updates, company newsletters, FAQs, incident reports, project updates, etc.)"
- 3P（Progress/Plans/Problems）模板的定位很关键：**面向高管/领导层，要求 30-60 秒内读完**——这是目前调研到的唯一一个明确按"读者是谁+要多快看完"来定义格式的官方模板。
- **盲点**：只做格式路由（选对模板），不做"这段话到底想让对方做什么/对方最关心什么"的换位分析；也不覆盖非正式沟通（微信一对一对话、临时解释、道歉、催办）。

### 1.4 MrGeDiao/shuorenhua（说人话）— 目前最接近的中文竞品
- 来源：https://github.com/MrGeDiao/shuorenhua
- 定位：**中文优先**的去 AI 味改写 skill，适配 Codex / Claude Code / Cursor / ChatGPT，"保事实、分场景、改完可直接发"
- 核心工作流（原文摘录）：
  > "判场景、划保护片段、按命中强度定力度、先按模式改词表只兜底、保真回读、仍有残味才做第二遍"
- 4 种场景强度：Chat（最小改动）/ Status（保留动作-状态-阻塞-下一步）/ Docs（技术准确优先）/ Public-writing（激进，配 README/发版说明/论坛帖/issue 回复的 Scene Pack）
- 核心原则：**"先保信息，再谈风格"**
- 明确不做的事：不模仿个人写作风格、不改代码/日志/命令行输出、不做"反AI检测"、无受众画像建模、英文是次要支持
- **这是最直接的差异化参照物**：它解决的是"这段话读起来像不像 AI 写的"，靠"去除颁奖式开头/推销式结尾"让内容显得更自然；它**不**回答"这段话有没有说到点子上""对方看完知不知道我要他做什么"。换句话说，"说人话"管的是语气自然度，不管信息结构和受众换位。

### 1.5 Pyramid Principle 系列工具（GPT/Claude 版）
- 来源：https://www.ai4chat.co/gpt/pyramidprinciple ；https://gist.github.com/tijmenon/f3f628e99c364b28df26490540566960
- 基于 Barbara Minto 金字塔原理："先给答案，人的思维习惯是自上而下"
- Promptiers 的 AI Presentation Toolkit 面向咨询顾问做 PPT 故事线（deck builder / action-title reviewer / storyline reviewer），本质是给**幻灯片**用的结构化工具，不是给对话/邮件/即时消息用的。
- **盲点**：场景锁定在"做汇报 PPT"，不覆盖日常沟通（微信消息、临时解释、道歉、催办）。

---

## 2. 商业产品

### 2.1 Grammarly（Tone Detector + Conciseness）
- 来源：https://www.grammarly.com/tone ；https://www.grammarly.com/blog/product/grammarly-conciseness-suggestions/
- Conciseness 功能：识别冗余/滥用/不必要的短语（如"for what it's worth"），建议拆分或简化长句。
- Tone 功能：通过词汇/句式/标点/大小写判断语气，建议让语气更 personable/positive/confident。
- **盲点**：两个功能都是句子级微调（换词、断句、调语气），**不重排信息结构**、不判断"重点是否前置"、不做场景分型，本质是语法/语气检查器的延伸，不是"结构性改写"。

### 2.2 Poised — AI 沟通教练
- 来源：https://www.poised.com/ ；https://www.g2.com/products/poised/reviews
- 定位：会议中的**实时语音**反馈（Zoom/Slack/Teams/Meet），维度是填充词、语速、自信度、能量、同理心。
- 缺点（用户反馈）：把音视频实时传到服务器处理，占带宽；不支持文本改写场景。
- **盲点**：是"说话方式"教练（语速/填充词/自信），完全不处理"文字消息该怎么组织"这件事——跟"说重点"skill 的输入形态（文本）完全不重叠。

### 2.3 Yoodli — AI 沟通教练
- 来源：https://yoodli.ai/use-cases/speech-coaches
- 六维度：filler words、pacing、eye contact、vocabulary diversity、talk-to-listen ratio、conciseness。
- 面向面试/演讲/日常对话练习，是**练习+复盘**工具，不是**发送前改写**工具。
- **盲点**：同 Poised，语音场景为主，且是"训练你说话的习惯"而非"帮你把这条要发的消息改好"。

### 2.4 Flowrite / MailMaestro
- 来源：https://www.maestrolabs.com/flowrite
- 定位：给几个要点关键词 → AI 生成完整邮件；支持改语气/精简/扩写/纠错。
- 未检索到明确的"BLUF/重点先行"专属功能——它的核心是"从要点生成完整邮件"，跟"说重点"（反向操作：从冗长原文提炼重点）方向相反。

### 2.5 BLUF 类单点小工具
- 来源：https://bluf.ai/ ；https://anakin.ai/apps/bluf-message-1488
- bluf.ai：浏览器插件，用于**读**长内容（网页/PDF/YouTube/文件）产出摘要+简化解释，是"帮你看"的工具，不是"帮你写"的工具。
- Anakin BLUF Message：prompt 原文大意为"把以下文本改写成 BLUF 格式：粗体加粗关键信息在前，支撑细节在后"——**没有**任何关于受众、场景类型的追问，是纯格式化模板。
- **共同盲点**：BLUF 类工具几乎都停留在"格式重排"（结论提前+加粗），不做"这条信息对不同受众该强调什么不同的点"的判断。

---

## 3. 社区流传 prompt（Reddit / PromptBase / lobehub）

- Reddit r/ChatGPTPromptGenius：未检索到与"说重点/BLUF改写"直接匹配的高质量帖子（搜索无结果）。
- PromptBase：主要是"写 Executive Summary"（从0生成商业计划摘要），是**生成**类而非**改写**类；没有检索到专门的"沟通教练"改写类畅销 prompt。
- 社区流传的"executive communication coach" prompt 套路（来源：https://www.docket.io/chat-gpt-prompts-for-marketing/chatgpt-prompts-for-brand-communications-director 等聚合站）：
  > "Act as an executive communication coach. Rewrite this draft speech/email from our CEO into a version that is clear, motivational, and on-brand for a B2B audience."
  这类 prompt 的结构是：角色设定（executive coach）+ 任务（rewrite）+ 3个形容词式要求（clear/motivational/on-brand）+ 受众标签（B2B audience）。**受众标签是扁平的一个词**，不是结构化的"对方是谁、TA在忙什么、TA最怕看到什么"。
- lobehub：搜索未定位到专门的中文"说重点/汇报"类上架 prompt，其 Marketplace 更多是通用写作模板聚合，没有找到差异化的沟通教练类目。

---

## 4. Claude Code skill 生态里的沟通类 skill 全景

已确认存在的相关 skill（按接近程度排序）：
1. **MrGeDiao/shuorenhua**（说人话）——中文、分场景、去AI味，最接近但目标是"语气自然"不是"信息结构"
2. **anthropics/skills `internal-comms`**——官方、模板路由（3P/newsletter/FAQ/incident），英文、企业场景，无受众换位分析
3. **howardmann/rewrite**——单一改写强度，压缩+关键信息前置，无场景分型，star=4 几乎无人用
4. **JuliusBrussee/caveman**——压缩 AI 自己的回复，不是改写用户要发的消息，目标错位
5. 未检索到任何**中文、场景分型（报价/坏消息/进度汇报/催办）、且做"受众换位"三者同时具备**的 Claude Code skill。

---

## 5. 猜想验证

| 猜想 | 结论 | 证据 |
|---|---|---|
| 大多只做"压缩"不做"受众换位" | **证实** | rewrite/caveman/Grammarly/BLUF小工具全部是压缩或格式重排；唯一提到受众的（executive coach 社区prompt、3P模板）也只是扁平标签"B2B audience"/"leadership"，没有结构化的换位分析步骤 |
| 大多面向英文 email 不面向中文微信 | **部分证实** | Grammarly/Poised/Yoodli/Flowrite/BLUF工具/PromptBase 全英文语境；中文侧搜到的工具（微信群聊总结类）解决的是**读**别人发的一堆消息，不是**改**自己要发的一条消息；shuorenhua 是唯一中文改写skill但目标是去AI味非结构重点 |
| 大多没有场景分型（报价/坏消息/进度汇报） | **证实，但有一个例外** | shuorenhua 有4级场景强度（Chat/Status/Docs/Public-writing）+ Scene Pack，但这些是"改写激进程度"分级，不是"沟通目的"分型；internal-comms 有格式分型（3P/newsletter/FAQ/incident）但局限于英文企业内部通讯，且是格式模板不是话术策略；**没有任何工具把"报价/坏消息/进度汇报/催办/道歉"这种日常沟通目的当作显式分型维度** |

---

## 6. 差异化空间

基于以上扫描，新 skill「说重点」可以做别人都没做的三件事：

1. **受众换位是显式步骤，不是隐含标签**：现有工具最多给一个"B2B audience"式扁平标签；新 skill 应该强制追问/推断"对方是谁、TA现在在忙什么、TA看到这条消息第一反应是什么、TA需要做什么动作"，再决定重点怎么摆——这是所有竞品都缺失的结构化步骤。
2. **按沟通目的分型，而非按改写强度分型**：shuorenhua 按"场合正式度"分级（chat/status/docs/public），internal-comms 按"文档类型"分型（3P/newsletter/FAQ）。新 skill 应该按**沟通目的**分型——报价、坏消息、进度汇报（尤其是"进度不达预期"这种）、催办、道歉、请求批准——每种目的对应不同的重点摆放策略（例如坏消息类：先给判断/影响，再给原因，最后给方案，避免"先道歉再绕半天才说重点"）。
3. **原生中文语境 + 微信场景**：现有中文工具集中在"总结别人发的一堆群聊消息"，没有工具处理"我自己要发一条消息给老板/客户/同事，怎么把重点放前面又不显得生硬无礼"这个真实痛点（中文沟通有"先寒暄再说事"的礼貌层，直接套用英文 BLUF 模板会显得冒犯，需要专门处理中文语境下"重点前置但不失礼"的平衡，这是英文竞品完全没有考虑过的维度）。

综合结论：市场上"压缩类"（caveman/rewrite/Grammarly）和"去AI味类"（shuorenhua）已经饱和且有强竞品，不应该往这两个方向做增量；空白地带在"**沟通目的分型 + 结构化受众换位 + 中文礼貌层处理**"的交集，这三者同时具备的工具目前不存在。
