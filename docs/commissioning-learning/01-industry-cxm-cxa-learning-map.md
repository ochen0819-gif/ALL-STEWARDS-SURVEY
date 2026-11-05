# 第一部分：数据中心行业与调试管理（CxM）/ 调试代理（CxA）学习与技能地图（庖丁解牛·终稿）

## 目录

- 0. 先读这一页：怎么用、本周最短路径、三件要紧事、五条用前纠错
- 1a. 12 周学习路线（第 1–6 周）：从概念到 OPR——每周指向哪一节
- 1b. 12 周学习路线（第 7–12 周）：L1 到移交、脚本、国标与商务
- 2. 把概念拆开：Cx、CxA、CxP、CxM、各方角色与 RACI
- 3a. 分级框架：L0–L6（核心 L1–L5）每级证明什么、门禁是什么
- 3b. 主干数据模型：部件 × 级别 × 文件（网站、3D 图、prebill 共用一张表），以及各链共用的 L0/L6 文件
- 3c. 纵切示例（一）：UPS 系统（含蓄电池）L1–L5 文件矩阵
- 3d. 纵切示例（二）：柴油发电机＋ATS 文件矩阵，与跨来源冲突
- 3e. 其余电力设备、冷却链（含 CDU 纵切）与水系统：文件与典型测试
- 3f. 控制与监控（BMS/EPMS）、消防联动与 EPO：纵切与典型测试
- 3g. 判据层补漏：UPS 电池、柴发阶跃与额定、NFPA 110 适用边界、UPS L4 参考值
- 4a. 流程主线：ASHRAE 202 第 5–17 条（13 条）与 L 级对照，CxM 每条管什么
- 4b. 如何写 FPT 与 IST 脚本（一）：表头 11 项、11 列行格式、PF01–PF06、TM 5-694 改写、IST 八段骨架
- 4c. 如何写 IST 脚本（二）：场景从哪来、一个完整示例、续航核对与埋错自测
- 4d. 负载箱与 IST 资源计划（报价视角）：P0–P8 阶梯、液冷、颗粒度、燃油、时长、谁付钱
- 4e. CxM 日常管理：会议节奏、问题台账、门禁与证据、安全、工具
- 5a. 必读标准与阅读顺序（一）：国际文件，先免费后付费，先读哪一章
- 5b. 必读标准与阅读顺序（二）：中国标准链、GB 50462 全部附录映射、国际对照
- 6a. GitHub 资源（a）：Claude Skill 格式、可安装的——逐个说补什么、怎么装、坑在哪
- 6b. GitHub 资源（b）：繁体/简体中文教学站——读哪些、什么顺序、怎么避坑
- 6c. GitHub 资源（c）：清单、工作台与知识库——能改造成“部件 × 级别 × 文件”的素材
- 6d. GitHub 资源（d）：模拟器——练 IST 思维和故障判断
- 6e. GitHub 资源（e）：调试管理工具与数据模型参考——学结构，不抄代码
- 7a. 用 Claude 把这些变成你自己的 Skill（一）：分工、目录结构、版权规则、prebill 扩展
- 7b. 用 Claude 把这些变成你自己的 Skill（二）：SKILL.md 骨架、skill-creator 迭代、测试题
- 8. 新手常见误区（11 条）与自检清单
- 9. 资料纠错、未核实事项与可信度分级（完整清单）
- 附录A. 附录 A：中英术语对照（一）流程、文件、级别、脚本
- 附录B. 附录 B：中英术语对照（二）设备、测试、安全与等级
- 附录C. 附录 C：认证与职业路径（国内外）

## 0. 先读这一页：怎么用、本周最短路径、三件要紧事、五条用前纠错

**为什么**：零基础最怕一上来就看全景图。这份地图只回答一个问题：按什么顺序把“数据中心调试管理”一刀一刀拆开学会，并沉淀成自己的 Claude 技能（Skill），再接到你已有的 prebill 报价技能上。

**做什么（怎么读）**：每节固定四段——为什么 → 做什么 → 用什么（资源+URL）→ 怎么验收（自测题或交付物）。先读第 0、1a、1b 节拿到路线，再按路线跳读对应章节。术语表和认证放在附录。

**全文标签规则**
- 来源等级 A–E：A＝标准/规范原文或官方增补件（本轮读到原文）；B＝官方授权转载、主管部门（AHJ, Authority Having Jurisdiction）表格、官方说明页、只核到目录级的官方信息；C＝厂商、协会、期刊的白皮书与案例（有商业立场）；D＝备考站、博客、招聘文、开源仓库、社区文章（二手）；E＝AI 生成的教学站、本地图自己的推算、打不开无法复核的资料。
- 数值性质：【一手】【二手】【示例】【合同定值】（必须由合同、OPR 或厂家资料给出）。二手和示例值只能进网站的“参考值”列，不能进“验收判据”列。

**本周最短路径（7 天，每天 1–1.5 小时）**
1. 第 1–2 天：注册免费 ASHRAE 账号，读 Guideline 1.6P 草稿的目录、术语定义、附录表格结构，用自己的话记笔记（不转载）。入口 https://www.ashrae.org/technical-resources/standards-and-guidelines/public-review-drafts ；公告 https://www.ashrae.org/file%20library/technical%20resources/standards%20and%20guidelines/standards%20actions/sa-oct_2_2026.pdf
2. 第 3 天：GSA《Commissioning Guide》附录 A 责任矩阵 https://www.wbdg.org/FFC/GSA/gsa_commissioning_guide_2020.pdf ，再读第 2 节。
3. 第 4 天：打开 https://samfclement.github.io/Data-Center-Commissioning/ ，切到 Plain English，从 Planning 走到 Turnover。
4. 第 5 天：读 BICSI 备考站 16.1–16.3（链接见第 3a 节），再读第 3a 节。
5. 第 6 天：装第一个 Skill——mbcoalson/mat-skills 的 writing-oprs（第 6a 节），让它写一份 10 MW Tier III 的 OPR，逐条挑错。
6. 第 7 天：读 jordanstahr/cx-fee-estimate 的 SKILL.md 中 Takeoff methodology 与 Scope gate 两段，把思路记入 prebill 待办，不原样安装。
- 本周交付物：一页“1.6P 目录笔记”＋一份带批注的 OPR。

**三件最要紧的事**
1. **时效**：ASHRAE Guideline 1.6P《Application of the Commissioning Process to Data Centers》（数据中心调试过程应用指南，P＝Proposed 草案）首次公开评审期 2026-10-02 至 2026-11-16（A）。今天 2026-11-05，剩约 11 天；截止后下架，正式出版要付费。范围原文为“up to the server racks and IT equipment”；2020 年报道曾说“不含 IT”，以草稿为准。它是 ASHRAE 唯一专门针对数据中心的调试文件。
2. **L1–L5 五级调试（Commissioning Levels）不是法定分级**：是行业惯例，ASHRAE Guideline 0 和 Standard 202 都不用这套说法，各家定义也不同，一律以合同和调试计划为准。
3. **GitHub 上没有“装上就能用”的完整数据中心调试 Skill**：现有三类——繁体中文教学站（ekcwilson-git 系列，无许可证、AI 辅助）、少量英文模拟器（samfclement 等）、少数可装但偏普通建筑的 Skill（写 OPR、调试报价）。所以第 7 节教你自建 3 个 Skill，并扩展 prebill。

**用前必读的五条纠错**（完整清单见第 9 节）
1. NFPA 110 的 Type 10（10 秒内恢复供电）、7.13 安装验收和 8.4 周期试验，只在 AHJ 或合同把系统定为应急电源系统（EPSS, Emergency Power Supply System）时适用。多数数据中心的 IT 备用发电属于美国 NEC 702 条“可选备用”，不是 Level 1 应急系统（dsanusi/white-space NOTES.md，D；CSE，C）。中国大陆项目以设计文件、GB 50150-2016、GB 50462-2024 和合同为准。
2. ASHRAE/IES Standard 202-2013 Addendum a（2017-07-31 批准）把 Commissioning Authority 改为 Commissioning Provider。CxA 签字＝见证与核实，不等于验收。
3. GB 50462-2015 已于 2024-09-01 被 2024 版替代，很多中文文章仍在引用旧版。
4. “BICSI 第 16 章”是免费备考站的编号，不是 BICSI 002 原书章号；那里的数值全是二手。
5. 腾讯假负载方案是 7 步，110% 柴发短时过载只是满载步骤里的可选附加项，不是单独一步。

**本节验收**
- 一句话说出 1.6P 的截止日期和范围。
- 解释为什么“L3”在两个项目里可能指不同的事。
- 说出 NFPA 110 Type 10 在什么条件下才是合同判据。

## 1a. 12 周学习路线（第 1–6 周）：从概念到 OPR——每周指向哪一节

**为什么**：这是全图的主干。后面各节都是“参考章节”，按周跳读即可，不必从头读到尾。每周 6–8 小时。

**做什么**：每周按“目标 → 读哪节 → 资源 → 产出 → 自测”走完，产出物存进你的网站或知识库。

**第 1 周 概念与角色 → 读第 2 节**
- 资源：GSA 指南前半与附录 A；Vertiv 白皮书；CSE 2009 文章；Peter Wicks 综述 https://peterjwicks.substack.com/p/data-center-commissioning ；202-2013 Addendum a 原文（3 页）。
- 产出：用自己的话改写第 2 节 RACI 表。
- 自测：①GSA 为什么说总包不能单独担任独立调试方？（答：独立性；但 GSA 允许承包商在 CxP 监督下分包测试服务）②Vertiv 把 Agent 与 Authority 分开，是行业共识吗？（不是，属 Vertiv 观点）③Addendum a 改了什么？

**第 2 周 流程骨架 → 读第 4a 节**
- 资源：NEBB 讲解 202 幻灯片；Guideline 0 Addendum a；CSE 讲解 202 https://www.csemag.com/?p=12879 ；Schneider WP148（输入—流程—输出、指挥中心通话格式）https://download.se.com/doc/SPD_DBOY-6NJNK6_EN/DBOY-6NJNK6_R1_EN.pdf ；Schneider University 免费课 https://schneider.efrontlearning.com/catalog/view/course/id/68/title/Data%20Center%20Projects:%20Commissioning
- 产出：按 202 第 5–17 条画一张流程图，每条标出交付物。
- 自测：①设计评审为什么不能当同行评审？（202 第 10.2.2 条）②问题台账维护到什么时候？（第 13.2.3 条）③Guideline 0 与 Standard 202 哪个是最低要求？（202）

**第 3 周 分级与门禁 → 读第 3a 节**
- 资源：BICSI 备考站 16.1–16.3；Archdesk；IFMA L0–L6；Uptime Journal 五级说明 https://journal.uptimeinstitute.com/improve-project-success-through-mission-critical-commissioning ；aidc-uptime-cx-learn S07；1.6P 草稿（11-16 前读完）。
- 产出：自己的 L0–L6 门禁表。
- 自测：①2A 与 2B 的区别？②白牌代表哪一级？③哪些项目不能靠“风险接受”带入 L5？（安全联锁与容量项）

**第 4 周 电力常识 → 读第 3c、3d、3g 节**
- 资源：jd-datacenter-course 的 3-5、5-7、10-2-power；Skeeter 工具 01 与 03；Uptime Tier 科普与《Tier Standard: Topology》；B 站电气专栏 https://www.bilibili.com/read/cv26223156/ ；知乎供电测试 https://zhuanlan.zhihu.com/p/660653243
- 产出：画一条 2N 供电链，标出 3 个单点故障（SPOF, Single Point of Failure）。
- 自测：①Tier III 柴发为何不能按备用（standby）额定计算？（Uptime 2020 演示稿：Tier III/IV 按厂家在现场条件下的无限运行时间额定）②PDU 维护时单电源负载会怎样？（掉电，WP75 图 5）③STS 同步转换时间的量级？（约 4 ms 内，二手）

**第 5 周 冷却与水 → 读第 3e 节**
- 资源：B 站暖通运维 57 集 https://www.bilibili.com/video/BV1CBVZ6zEMg/ ；jd 的 10-2-cooling；CoolingTowerSim；OCP 液冷白皮书；AIDC-HVAC 的 CDU 页；B 站液冷科普 https://www.bilibili.com/video/BV1TUtjepEcd/ ；DOE/FEMP 数据中心设计最佳实践 https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design.pdf
- 产出：冷却链图（冷却塔 → 冷机 → 冷冻水 → CRAH/CDU → 机柜），冷冻水与冷却水分两色，液冷画出设施水 FWS 与二次回路 TCS。
- 自测：①冷机防频繁启动定时器（anti-recycle timer）为什么会让 IST 失败？②FWS 与 TCS 各指什么？③漏水检测 L4 要测哪 5 个环节？

**第 6 周 OPR、BOD、Cx 计划与规范 → 读第 4a 节**
- 资源：Cx Associates OPR 样本；mat-skills 的 writing-oprs；BCxA 2025 数据中心讲义第 6–8 页；UFGS 01 91 00.15 目录与 1.10 节；华盛顿州 WACG https://www.des.wa.gov/sites/default/files/2023-01/WACG2019.pdf
- 产出：给 10 MW 示例项目写 10 条可量化 OPR（每条编号，如 OPR-ELEC-03）＋一份 Cx 计划目录。
- 自测：①“机房要凉快”为什么不是合格的 OPR？②BOD 由谁写？③UFGS 就绪证书默认提前多少天提交？（[30] 日历天或 [20] 工作日，方括号值可按项目改）

## 1b. 12 周学习路线（第 7–12 周）：L1 到移交、脚本、国标与商务

**为什么**：后 6 周把知识变成 CxA 的交付物——文件包、脚本、场景矩阵、报价澄清表和自己的 Skill。

**第 7 周 L1–L3 文件与判据 → 读第 3b、3c、3d、3f 节**
- 资源：TM 5-694 附录 A；ACG 附录 C；香港建筑署 ArchSD 电气与空调 T&C 程序（英文文件）；AIDC-ELEC 工作台（打开 ☆ 停留点筛选）；NETA 官方说明页；GenesisAI 的中压开关柜工作手册（AI 生成，引用需复核，第 6c 节）。
- 产出：UPS 的 L1–L3 文件包目录，再对照第 3c 节矩阵自查缺项。
- 自测：①NETA 验收测试和调试有什么区别？②TTR 偏差 0.5% 这个判据为什么要注明版本？③停留点（Hold Point）和见证点（Witness Point）有什么不同？

**第 8 周 L4 功能性能测试（FPT）与脚本写法 → 读第 4b、3g 节**
- 资源：LBNL《Functional Testing Guide》；UFGS 26 32 15 第 3.6.9.1 条；TM 5-694 第 6-5 节 g–j；Yeongje-Kim/cx-preflight-edge；南达科他州卫生部柴发验收表 https://doh.sd.gov/media/4gun1eet/emergency-and-standby-power-systems-installation-acceptance.pdf ；Cummins 授权转载的 NFPA 110；Fluke 电池测试综述。
- 产出：一份柴发 FPT 脚本（用第 4b 节 11 列行格式），并用 PF01–PF06 自查。
- 自测：①NFPA 110 冷启动失电试验在什么条件下才是合同要求？（AHJ 或合同指定 EPSS 时）②NFPA 110-2016 第 8.4.2 与 8.4.2.3 条各规定什么？（答：每月至少运行 30 分钟，负载不低于铭牌 kW 的 30% 或达到厂家最低排气温度；只有达不到的柴油机组才每年补做附加负载试验：50% 运行 30 分钟＋75% 运行 1 小时）③电池内阻比基线升高多少视为劣化信号？（≥20%，二手）

**第 9 周 L5 综合系统测试（IST, Integrated Systems Test）→ 读第 4c 节**
- 资源：CxPlanner 10 个边缘场景；samfclement 的 10 个 L5 场景；dc-twin；open-engineering-notes 的就绪门禁；aidc-uptime-cx-learn S12（T0–T9）；BICSI 16.3 黑启动时间线；知乎《停电“彩排”》https://zhuanlan.zhihu.com/p/533263177 ；iRecruit 的 11 项脚本要素。
- 产出：IST 场景矩阵（正常 → 计划切换 → 单点故障 → 多重故障 → 恢复）＋黑启动时间线＋一份“2N 市电全失＋一路柴发拒启”脚本。
- 自测：①IST 开始前必须满足哪些前提？②为什么“恢复运行≠缺陷关闭”？③二次泵 VFD 只接柴发应急盘会出什么问题？

**第 10 周 移交、运维与认证 → 读第 3b 节共用行与附录 C**
- 资源：UFGS 第 3.12、3.14 条；GSA 保修第 10 个月复查；Uptime TCCF 页 https://ats.uptimeinstitute.com/tier-certification/construction ；Chayora 天津案例；GB/T 51314；WP148 的三份输出（竣工脚本报告、部件错误日志、趋势报告）。
- 产出：移交证据包目录＋季节性测试计划。
- 自测：①TCCF 能替代 IST 吗？②系统手册与 O&M 手册有什么不同？③保修从哪天起算更合理？（cxms-platform 的规则：L5 IST 通过且有证据可查之后）

**第 11 周 中国标准与国内做法 → 读第 5b 节**
- 资源：GB 50462-2024 与 GB 50174-2017 目录；YD/T 4628-2023；腾讯假负载方案；深圳案例；知乎 L0–L6 文章；知乎《测试验证重点内容解析》https://zhuanlan.zhihu.com/p/644052756
- 产出：“双轨”文件对照表（每个部件一列国际、一列国标附录表号）。
- 自测：①腾讯方案的步骤依次是什么？（答：空载 → 半载 50% → 满载 100%（可附加柴发短时 110%）→ BA 群控 → 故障及监控 → 极限温升 → 系统联调，共 7 步）②深圳案例发现多少问题？（779 条：电气 382、暖通 273、弱电 124；文中另一处写 776，前后不一致）

**第 12 周 管理、商务与自建 Skill → 读第 4d、4e、7a、7b 节**
- 资源：GSA 会议与月报要求；cx-fee-estimate；密西西比州 CxA 合同范本；Vertiv 白皮书（复杂数据中心理想调试预算约为总建造成本 1.5%，实际很少拿到）；aidc-calculator commissioning 页；cxms-platform 的 SpecCheck；skill-creator。
- 产出：3 个 Skill＋一份不少于 15 条的对外澄清表（含第 4d 节三个问题）。
- 自测：①DOE 2018 研究给出的新建项目 CxP 费用区间？（每平方英尺 0.40–1.35 美元；按施工造价百分比的那张表出自 GSA 2015 收费表，不是 DOE）②报价为什么要把负载箱、燃油、复测单列？

## 2. 把概念拆开：Cx、CxA、CxP、CxM、各方角色与 RACI

**为什么**：新手最常把“调试”理解成“开机”，并把 CxA 签字当成验收。概念错了，后面的报价范围和责任边界都会错。

**2.1 调试（Commissioning, Cx）是什么**
- **调试**：以业主项目要求（OPR, Owner's Project Requirements）为准绳，从预设计一直到保修期结束的质量保证过程。
- **验收测试（Acceptance Testing）**：对单台设备的试验，如 ANSI/NETA ATS 电气验收测试；国内对应 GB 50150 的“交接试验”。
- **开机/启动（Start-up）**：由厂家执行。
- 验收测试和开机是调试的“输入证据”，由 CxA 见证与审核，但不能替代调试（Vertiv 白皮书，C）。
- 中文“调试”有三层意思：施工方的狭义调试（GB 50243 第 11 章“系统调试”）；业主或第三方的“测试验证/验证测试”（YD/T 4628 用语）；管理层面的“调试管理/调试顾问”。台湾称“試車”，香港政府称“測試及調試（T&C）”。

**2.2 CxA、CxP、Commissioning Agent 的关系**
- **CxP（Commissioning Provider，调试服务提供方）**：202 的正式术语。202-2013 Addendum a（ASHRAE 2017-07-31 批准）全文把 Commissioning Authority 改为 Commissioning Provider，定义为“由业主指定、领导、计划、排程并协调调试团队执行调试过程的实体”。https://www.ashrae.org/File%20Library/Technical%20Resources/Standards%20and%20Guidelines/Standards%20Addenda/202_2013_a_20170810.pdf
- **CxA（Commissioning Authority，第三方调试顾问）**：旧称，仍是 ACG 证书名，LEED 文件常见；数据中心口头常说 Commissioning Agent（调试代理）。
- Vertiv 把 Authority（无决策权）与 Agent（被授权代业主决策）分开，这只是 Vertiv 的观点，权责看合同。
- CSE（2009）：CxA“不是设计方（engineer of record），而是业主的代理人”，职责是“核实并强制执行设计，不修改、不修补设计”。https://www.csemag.com/articles/commissioning-mission-critical-systems/
- NEBB 对 202 的解读：标准不要求 CxA 代表业主“接受（accept）”承包商工作，验收权在业主。

**2.3 CxM（调试经理）是岗位名，不是标准术语**
- 业主侧：管理外聘 CxA，审批脚本。
- 总包/EPC 侧：如 PCL 招聘要求对接业主调试移交团队、组织调试会、签署移交包，10 年以上机电经验并完成至少 2 个数据中心调试。https://careers.pcl.com/job/Denver-Commissioning-Manager-CO-80002/1327852900/
- 英国 CIBSE Code M 体系下的 Commissioning Manager。
- **独立性**：GSA 要求独立调试方由业主直接聘请或由 CMa 分包，“但不能只由施工总包自己担任”；同时 GSA 允许承包商在 CxP 监督下分包测试服务。ACG 更严：CxA 申请人的雇主必须是独立调试公司。

**2.4 其他角色**
- 业主代表：定 OPR，批准计划与延期，最终验收付款。
- 设计方（A/E）：编写设计依据（BOD, Basis of Design），回复评审意见。
- 总包调试负责人：把调试排进总进度，组织 L2–L3，准备 L4/L5 前置条件，汇编移交包。
- 厂商现场服务工程师：执行 L1 工厂测试，负责启动，L4/L5 待命。
- 第三方测试：NETA 电气试验公司；TAB（Testing, Adjusting and Balancing，测试、调整与平衡）单位；负载箱商。
- 能量管控员（Energy Marshal）：负责上锁挂牌（LOTO, Lockout/Tagout），依据 NFPA 70E。
- 另有 AHJ（如消防）、运维团队、Uptime 认证方（认证不是调试）。

**2.5 RACI（R 执行、A 批准、C 咨询/见证、I 知会；每行只有一个 A；按合同调整）**

GSA 附录 A 原模板只用 L（主导）/P（参与）。下表是数据中心常见分工：

| 活动 | 业主 | CxA | 设计方 | 总包 | 分包/厂商 | 第三方测试 | 运维 |
|---|---|---|---|---|---|---|---|
| OPR | A | R | C | I | – | – | C |
| 设计评审（L0） | A | R | R（回复） | I | – | – | C |
| Cx 计划/规范 | A | R | C | C | I | – | I |
| L1 工厂见证 | C（可派人见证） | C（见证） | C | A（按合同签发运放行） | R | – | I |
| L2/L3 | I | C（抽查/见证） | I | A | R | R | I |
| L4 FPT | A | R（脚本/见证） | C | R | R | R | C |
| L5 IST | A | R（指挥/判定） | C | R | R | C | C |
| 移交 | A | R | C | R | C | – | C |

- 注：若项目由业主签发 FAT 放行，L1 行的 A 改为业主。

**2.6 国内常见组织方式**：业主自定方法论（腾讯假负载方案）；建设单位委托第三方（深圳案例）；国际 Cx 公司承担整套 CxM（NV5 自述贵安 30 MW 项目）；托管运营商把调试职能分散到工程岗和运维岗（万国数据）。

**2.7 对 prebill 的提示**：合同写明“CxA 签字＝见证与核实（witness & verify），不等于验收（accept）”；写明谁有权停工、谁有权要求复测。

**验收**：①202 哪年把 CxA 改称 CxP？②总包自己的调试团队能单独满足 GSA 的独立性要求吗？③L4 脚本由谁写？（看合同：CxA 写，或总包写、CxA 批）

## 3a. 分级框架：L0–L6（核心 L1–L5）每级证明什么、门禁是什么

**为什么**：每一级都是下一级的门禁（gate）。L2 没完成不得通电；L3 预功能检查表（PFC, Pre-Functional Checklist）有未关闭项不得开始 L4；L5 的前提是 L4 全部通过、问题关闭（业主书面批准的延期除外）。问题台账里的问题“永远不能行政关闭”，必须复测（BICSI 备考站原话，D）。Uptime Journal 指出完整的调试要五级都做，调试的严谨度与 Tier 等级无关。

**做什么：一张表看懂**（颜色牌按 CxPlanner：红 L1、黄 L2、绿 L3、蓝 L4、白 L5；各公司用法可能不同）

| 级别 | 英文 | 国内常见叫法 | 证明什么 | 执行/见证 | 出门条件 |
|---|---|---|---|---|---|
| L0 | Design Review & Cx Planning | 设计审查/设计图纸验证 | 设计满足 OPR 且可测试 | CxA 执行，业主批准 | 评审意见全部有处置；Cx 计划与规范进合同 |
| L1 | Factory Witness/Acceptance Test（FWT/FAT） | 出厂验收、厂验 | 定制设备出厂前在额定工况下合格 | 厂家执行；CxA、业主、设计方见证 | FAT 报告会签；punch 项关闭或书面接受 |
| L2 | Delivery & Installation Verification（2A 到货，2B 安装/通电前） | 到货验收、安装检查 | 到货的就是测过的那台，且装对 | 分包、总包 QA/QC 执行；CxA 抽查 | 检查表 100% 完成、无关键未关闭项才允许通电 |
| L3 | Pre-Functional Checks & Start-up | 单机调试、预检查 | 单台设备装对、接对、设对，并安全开机 | 厂家、NETA、TAB、自控商执行；CxA 审核 | 每张 PFC 签 PASS |
| L4 | Functional Performance Test（FPT） | 单系统测试 | 单系统按控制顺序在各工况运行、性能实测达标 | 总包与厂家操作；CxA 见证签字 | 每步 PASS；问题关闭或批准延期 |
| L5 | Integrated Systems Test（IST） | 综合联调、综合系统测试 | 电、冷、控作为一条链在满载模拟下承受故障并恢复 | CxA 指挥；运维见证 | 场景全部达标；IT 负载零中断；温度不出包络 |
| L6 | Turnover & Occupancy | 移交、接维 | 证据交给运维，排好季节性补测 | CxA、总包执行；业主接收 | 最终报告、系统手册、培训记录齐全 |

**用什么**
- BICSI 备考站 16.1 https://open-exam-prep.com/study-guides/bicsi-dcdc/ch16-commissioning-ist/sec01-cx-process-levels1-3 ；16.2 https://open-exam-prep.com/study-guides/bicsi-dcdc/ch16-commissioning-ist/sec02-level4-functional-testing ；16.3 https://open-exam-prep.com/study-guides/bicsi-dcdc/ch16-commissioning-ist/sec03-level5-ist-turnover
- Archdesk（每级交付文件）https://archdesk.com/blog/data-center-commissioning-levels
- IFMA（L0–L6 与 2A/2B）https://fmj.ifma.org/beyond-traditional-nebb
- CxPlanner https://cxplanner.com/commissioning-101/data-centers-level-testing
- GAI Consultants（L0–L6）https://gaiconsultants.com/data-center-mission-critical-facility-commissioning/
- Uptime Journal https://journal.uptimeinstitute.com/improve-project-success-through-mission-critical-commissioning

**各家定义不一样，所以必须写进合同**
- GAI、IFMA、Uptime 的 CDCCP 课纲用 L0–L6 七级。
- CriticalArc 真实项目：L1 Site Acceptance → L2a 就位 → L2b 安装 → L2c 通电前 → L3 通电启动。
- vdc-cxa 课程把 L1 写成“设计文件审查＋FAT”。
- modernecotech 把 L4 写成 IST；anshuS1310/EPC-Data_Centre 把 L3 叫“SOT”、L4 叫 IST、L5 只是移交；log-wade/datacenter-mcp-server 用 L3＝FPT、L4＝IST、L5＝季节性验证；Mithu2706 同一仓库把 IST 同时叫 L3 和 L5。
- Construction-Gamma 的 SKILL.md 定义 L4＝综合、L5＝运行，而其 IST 参考文件定义 L4＝系统测试，前后矛盾（据早前仓库评估）。

**这些“级别”不要和调试级别混用**
- Uptime Tier I–IV、TIA-942 Rated-1～4、EN 50600/ISO/IEC 22237 可用性等级 1–4、GB 50174 的 A/B/C 级：设施要具备的冗余或可用性能力。
- NFPA 110 的 Level 1/2：应急电源系统的重要性等级。
- 调试 L1–L5：用哪一步去证明这些能力。

**验收**
①默写上表“证明什么”一列。
②判断：L4 有一项失败且影响 IST 场景，能带进 L5 吗？（答：必须先关闭或取得业主书面风险接受；安全联锁和容量项不适用风险接受——aidc-uptime-cx-learn S07 的规则）
③说出三种不同的 L4 定义。

## 3b. 主干数据模型：部件 × 级别 × 文件（网站、3D 图、prebill 共用一张表），以及各链共用的 L0/L6 文件

**为什么**：你网站上“每个部件在每一步要交的报告”，本质是一个三维矩阵：部件 × 级别 × 交付文件。先定数据模型，再往里放模板；顺序反过来，最后只会得到一堆互不关联的 PDF。第 3c–3f 节的纵切示例都按这个模型写。

**做什么：最小字段（与技术栈无关，CSV、JSON、数据库都行）**
- component：部件编号（如 UPS-A1）、类型、所属链（电/冷/水/控/消防）、别名（简/繁/英）
- level：L0–L6
- deliverable：doc_id、中英文件名、模板来源（URL＋节号/表号）、是否免费
- roles：performer 执行 / witness 见证 / signoff 签认
- criterion：数值＋单位；标准名＋条号＋版本；来源等级 A–E；数值性质（一手/二手/示例/合同定值）
- gb_track：国标对应（标准＋章节＋附录表号）
- gate：停留点/见证点/无；没完成会卡住哪一级
- attempt：第几次、日期、结果、证据文件（复测另起一条，不覆盖首测）
- issue：字段见第 4e 节，source 指向对应 attempt 或检查表行

**命名与着色规则（可直接借用）**
- doc_id 用 Archdesk 体例“级别＋资产编号＋测试类型＋版次”，如 Cx-L4-ELEC-UPS-01-FUNC-RevA；证据目录 /Cx/<资产>/<级别>/。
- 就绪着色（samtindal/cx-ledger 的规则）：Ready＝PFC 完成＋FPT 通过＋无未关闭问题；Blocked＝FPT 失败或有关键问题；其余 Open。
- 汇总规则（EPMS-CX-Report-Generator）：任一设备受阻，整个资产即 Blocked；全部配置完成且通讯正常才算 L3 Complete。
- 门禁（anshuS1310/EPC-Data_Centre）：存在未关闭的 NCR（Non-Conformance Report，不合格报告）时相关测试不可做、证书锁定。

**各链共用的 L0/L6 文件**
- L0：OPR、BOD、设计评审记录、Cx 计划、Cx 规范（常见 CSI 章节 01 91 13、23 08 00、26 08 00）、设备矩阵（每台设备 × 要做到的级别、表单号、脚本号）、负载箱计划、RACI。L0 必须查：关键水泵、CRAH 风机、BMS 控制器是否由 UPS 供电（真实失败案例见第 8 节误区 6）。
- L6：系统手册（格式参考 ASHRAE Guideline 1.4-2019）、培训记录、按资产编号交叉索引的 O&M 与保修、最终调试报告、季节性与延期测试计划、保修第 10 个月复查。

**共用行（UPS、柴发等所有设备都要有；模板均免费）**

| 编号 | 级别 | 交付物 | 模板来源 | 执行/见证/签认 | 判据（出处，等级） | 国标轨 |
|---|---|---|---|---|---|---|
| S01 | L0 | 调试设计评审报告 Design Review Report | UFGS 01 91 00.15 §3.3 | CxC 执行；CO/CM/DOR 会商；CO 签 | 设计完成度 ≤[60]% 前评审；获批后 ≤[14] 天出报告；会商 ≤14 天（A） | 无直接对应 |
| S02 | L0 | 送审审查意见 Submittal Review | 同上 §3.4 | CxC 审、DOR 回复、CO 定案 | CxC 与 DOR 并行审，回复抄送 CxC（A） | GB 50462 第 3.2 节（目录级 B） |
| S03 | L0 | 电气验收测试程序＋机构/技师资质 | UFGS 26 08 00 §1.4 | 独立一级分包测试机构编；CO 批 | 程序 ≥45 天前提交；技师 NETA Level III 或 NICET 且 ≥5 年；**默认清单不含 UPS，须在项目规范补列**（A） | GB 50150 第 3 章（目录级 B） |
| S04 | L3 | NETA 验收报告＋首次送电在场 | 同上 §1.4.2、§3.1、§3.3 | 测试机构；测试前 ≥14 天通知 | 报告 ≤10 天；按 NETA ATS-2025；可选项默认不做（A） | GB 50150 交接试验报告 |
| S05 | L3 | 系统就绪证书 Certificate of Readiness | 01 91 00.15 §1.16 | QC 经理签发；业主批准 | 测试前 [30] 日历天或 [20] 工作日；批准前不得排测（A） | GB 50462 第 14.1 节（B） |
| S06 | 全程 | 问题台账 Issues Log | 同上 §1.15 | CxC 维护；CxC＋CO 确认关闭 | 每月提交、变化后 3 个工作日内提交；条目不得删除（A）；Archdesk：超 14 天无关闭计划须升级（D） | GB 50462 附录 J（推断） |
| S07 | L6 | 系统手册 Systems Manual | 同上 §3.12 | 承包商编；CxC 签“完整、清楚、准确”证明 | FPT/IST 后 ≤30 日历天（A） | 第 15.2 节＋附录 K |
| S08 | L6 | 调试报告 Cx Report | 同上 §3.14 | CxC 编；CO 接收 | 测试经团队确认后 ≤14 天；含执行摘要、缺陷、PFC/FPT/IST 表、台账、培训签到（A） | 第 15 章＋附录 J、K |

- UFGS 01 91 00.15：https://www.wbdg.org/FFC/DOD/UFGS/UFGS%2001%2091%2000.15.pdf ；26 08 00：https://www.wbdg.org/FFC/DOD/UFGS/UFGS%2026%2008%2000.pdf

**一张表三种用途**：网站渲染部件页；3D 图按状态着色；prebill 计价（每个 test_id 对应人·天、是否见证、是否需要负载箱）。

**验收**：用此模型录入 1 台 UPS 在 L0–L6 的全部条目（≥15 行，可直接抄第 3c 节结构），导出 CSV，并能按“级别＝L3 且 gate＝停留点”筛选。

## 3c. 纵切示例（一）：UPS 系统（含蓄电池）L1–L5 文件矩阵

**为什么**：UPS 是你网站最典型的部件。下面把“每一步要交什么、按什么模板、谁签、判据从哪来、国标对哪张表”一次排满，其他部件照抄结构。共用的 L0/L6 行见第 3b 节 S01–S08。

**用什么（代号）**：[TM] TM 5-694 https://www.wbdg.org/FFC/ARMYCOE/COETM/tm_5_694.pdf ；[AD] Archdesk；[AIDC] https://aidc-elec-l2l3-review.vercel.app （设备对象 Powerblock_APT_EPS_UPS_A006）；[GB462] GB 50462-2024 https://www.gongbiaoku.com/mobile/book/ju425808iun ；[GB150] GB 50150-2016 https://codeofchina.com/standard/GB50150-2016.html 。国标正文付费，只核到章节与附录标题。

| 编号 | 级别 | 交付物（英文/编号） | 模板来源 | 执行/见证/签认 | 判据（出处，等级） | 国标轨 |
|---|---|---|---|---|---|---|
| U01 | L1 | FAT 报告＋工厂整改闭合 FAT-RPT-UPS-3MW-001 Rev B、FAT-PCL-001 | [AD] | 厂家执行；分包 QC＋CxA 见证；三方签放行 | 示例判据“60% 负载下静态开关切换”【示例】（D） | 无 FAT 条款；进场按 GB462 第 3.2 节查出厂文件 |
| U02 | L2 | 现场安装验收包 SAT-PKG-UPS-001 | [AD] | 分包编；CxA＋电气 QA 签封面；总包盖“Released for Energization” | 必含序列号与 FAT 对照、冲击指示证书、固件核对、目视表；缺包则保持上锁（D） | GB462 第 5.5 节＋附录 A |
| U03 | L2 | 扭矩表 TRQ-SHT＋扳手校准证书 CAL-CRT-TW-047 | [AD] | 分包；总包审；CxA 见证 | 扭矩值不得空白、证书须在包内，否则整包退回（文中案例停工 3 天、闲置约 4.5 万美元）（D） | 附录 A |
| U04 | L2 | UPS 检查表 DA 7472-R | [TM] 图 6-5，p.6-13 | 表内 Tested by；表上无见证栏，见证由 Cx 计划定 | 状态码 A 合格/R 需修/C 已更正；系统接地只能一点（A，格式） | GB150 第 26 章；GB462 附录 A、B |
| U05 | L2 | 蓄电池检查表 DA 7473-R | [TM] 图 6-6，p.6-14 | Tested by | 液位、排气栓、极性、紧固、洗眼器、封闭电池间排风机；必测连接电阻、单体电压、比重（富液）；阈值【合同定值】 | GB462 第 5.2 节＋附录 A |
| U06 | L2 | UPS 配电盘检查表 DA 7474-R | [TM] 图 6-7，p.6-15 | Tested by | 1000 V 测母线绝缘（样例 10/12/12 MΩ 是样例不是限值）；限值【合同定值】 | GB150 第 23 章；附录 A |
| U07 | L2 | Powerblock 安装验证停留点/见证点 | [AIDC] l2 | 施工自检；CxA 在 ☆ 签 | ☆ 铭牌、TAG 与单线图一致、母线相色、基础锚固、端子扭力、中性/接地排、接口端子、LOTO、控制线；◆ 搬运损伤、A/B 路标识、I/O 点表、通讯线；门禁：FAT 结论“同意”（D） | 附录 A、B |
| U08 | L3 | 点对点表 PPT-SHT-BKR-008…015＋报警验证 ALM-VER-UPS-001 | [AD] | 分包测完 48 h 内交 CxA；CxA 见证（重发版须重新见证） | 每条报警与报警矩阵一致；全部签字前不放行任何 L4 脚本（D） | GB462 附录 E |
| U09 | L3 | Powerblock 送电前单机预功能 | [AIDC] l3 | 同 U07 | ☆ 相序、接地导通、与 UPS 接口信号、ATS 逻辑联锁、继电器整定；绝缘与接触电阻 ≥允收值【合同定值】 | GB150 第 23、26 章 |
| U10 | L3 | 分段送电记录 | [TM] §6-5 a | 测试人员 | 由电源侧向负载侧逐级送电，每级查控制、联锁、报警并测电压、相序、电流（A） | 附录 A |
| U11 | L3 | 电池预功能（开路电压、内阻、连接电阻、温度） | 见第 3g 节 | 测试人员＋厂家 | VRLA ≥2.1 V/单体；内阻在出厂基线 ±20%；连接 <0.1 mΩ；25±5 °C【二手】（D） | 国标无对应，按厂家 |
| U12 | L3→L4 | 整流器/充电器/电池送电与初充 | [TM] §6-5 e | 测试人员 | 断开时测电池电压极性；充满或至少 24 h，每 4 h 读充电电流；再由电池运行至最低电压 1–4 h（A） | 第 14.12 节＋附录 H |
| U13 | L4 | 逆变器与静态开关验证 | [TM] §6-5 f | 模块一为主做一遍，模块二重复 | 测浮充电压；A/B 同相；断 A 输入转 B 须无扰（bumpless，原文无数值，允差须写进 OPR）；低压跳闸（A＋合同定值） | 第 14.12 节＋附录 H |
| U14 | L4 | UPS 带载运行 | [TM] §6-5 g | 测试人员 | 逐个合负载开关、每步测量；到设计负载运行 4 h 查过热（A） | 第 14.13 节＋附录 H |
| U15 | L4 | 负载箱功能测试 FPT-SCR-LB-001 | [AD] | 分包执行；CxA 每步签；业主见证 | 每步记实测、判据、结果；每个 FPT 至少 4 h 稳定运行趋势（D） | 第 14.13 节＋附录 H |
| U16 | L4 | 逆变器 A→B 带载切换 | [TM] §6-5 i | 测试人员 | 母线测电压电流，切换与回切均无扰（A＋合同定值） | 附录 H |
| U17 | L4 | 电池放电试验 | [TM] §6-5 j | 先通知厂区；闭锁柴发 | 断柴发断路器并封锁自动与手动启动；断市电放至最低电压（1–4 h）；逆变器在最低电压跳闸；恢复后记录充满时间（A）；终止电压见第 3g 节 | 第 14.12/14.13 节＋附录 H |
| U18 | L4 | UPS 系统检查与测试表 DA 7475-R | [TM] 图 6-8，§6-5 k | 测试人员 | 元件、送电、市电跳闸、带载转换、放电、诊断指示全部勾 A；样例 THD 数值未注明电压或电流，不是限值；本表合格即视为检查完成（A） | 第 14.8 节＋附录 H |
| U19 | L4 | 电能质量、过载、动态性能 | BICSI 16.2 | 测试方；CxA 见证 | ±1% 电压平衡、±0.1 Hz、THDv≈3%/5%、125%/10 min、150%/60 s、IEC 62040-3 等级【二手】（D） | 第 14.8 节 |
| U20 | L5 | 市电失电联动（与第 3d 节 G20 合并执行） | [TM] §6-5 h | 测试人员；见证按 Cx 计划 | 电池接载 → 柴发启动 → ATS 转换 → 柴发带载 → 电池回浮充；恢复后回切、柴发停机，全程无扰（A） | 附录 H |
| U21 | L5 | IST 脚本、报告与整改 IST-SCR-LP-A、IST-PCL-LP-A | [AD] | 运维、CxA、总包、专业负责人共签 | 趋势覆盖事件前后 60–120 s、1 s 采样；切换后 3 min 内白区温升 ≤2°F（约 1.1 K）；进入 IST 的就绪度 ≥92%（12 项过 11 项）【示例】（D） | 附录 H；问题闭合对附录 J |

**怎么用**：把 U01–U21 加上 S01–S08 录进第 3b 节模型；3D 图里点 UPS 即按级别拉出这些行，U02 未盖放行章时 UPS 输出母线保持灰色。

**验收**：不看表，说出 UPS 在 L2、L3、L4 各 3 份文件、模板编号和签认人；指出哪 3 行的判据是【合同定值】，以及该去哪里取值。

## 3d. 纵切示例（二）：柴油发电机＋ATS 文件矩阵，与跨来源冲突

**为什么**：柴发与自动转换开关（ATS, Automatic Transfer Switch）是 L5 失电场景的核心，也是 NFPA 110 适用性最容易用错的地方。共用 L0/L6 行见第 3b 节。

**用什么（代号）**：[GEN] UFGS 26 32 15（2026-02）https://www.wbdg.org/FFC/DOD/UFGS/UFGS%2026%2032%2015.pdf ；[S110] 西雅图消防局验收表（引 NFPA 110-2019，表单版本 07/21/2026）https://www.seattle.gov/documents/Departments/Fire/Business/Systems%20Testing%20Generator%20Install.pdf ；[SD110] 南达科他州卫生部表（引 NFPA 110-2010 第 7.13 节）；[TM]、[AD]、[AIDC]（设备对象 Generator）同第 3c 节。**标“EPSS”的行只在 AHJ 或合同指定应急电源系统时适用。**

| 编号 | 级别 | 交付物 | 模板来源 | 执行/见证/签认 | 判据（出处，等级） | 国标轨 |
|---|---|---|---|---|---|---|
| G01 | L0 | EPSS 负载分级与容量核算（EPSS） | [S110] Inventory 段、第 17–18 项 | 承包商填；AHJ 审 | 一级＋二级负载 ≤ 机组容量，否则设自动选择性加载/甩负载（NFPA 110-2019 第 4.4、7.1.5 条，B） | 国标无 Level 1/2 分级，在 OPR 自定义 |
| G02 | L0 | 额定类型与降额核对 | Traver 演示稿（第 3g 节） | CxA 设计审查 | Tier III/IV 按现场条件无限运行时间额定；standby 与未降额 prime 只适用 Tier I/II（B） | GB 50174 A 级仅作概念对照 |
| G03 | L1 | 厂家额定负载试验证明（EPSS） | [S110] 第 7 项 | 厂家；承包商上传；AHJ 审 | 额定功率因数下额定负载，记录环境温度、海拔、燃油等级（NFPA 110-2019 第 7.13.4.6 条，B） | 无 FAT 条款 |
| G04 | L1 | 柴发 FAT 报告与放行 | [AD] 类推 | 厂家；分包 QC＋CxA 见证 | 数值【合同定值】（D，类推） | 同上 |
| G05 | L1/L4 | 阶跃加载录波 | BICSI 16.1/16.2 | 厂家/启动工程师；CxA 见证 | 0→100%、33%、50% 阶跃，G3 典型约 7%/3 s、15%/4 s【二手】【合同定值】 | GB/T 2820.5（版本待核实） |
| G06 | L2 | 柴油发电机组检查表 DA 7468-R A–C 段 | [TM] 图 5-5，p.5-10 | Tested by；表注：厂家代表须在场见证或执行 | 转向、油位、接地、仪表、紧固、调速调压、振动、电池、冷却液、报警指示、锚固、防溢（A） | 附录 A |
| G07 | L2 | AIDC 发电机停留点/见证点 | [AIDC] Generator l2 | 施工自检；CxA 在 ☆ 签 | ☆ 铭牌 kW/kVA/60 Hz、运输固定件拆除、排烟进风净空、隔振锚固、对中记录、端子扭力、中性/接地、LOTO、急停与起动电池；门禁：FAT 同意（无 FAT 须业主同意 NA）、燃油冷却排烟就绪（D） | 附录 A、B |
| G08 | L2 | 燃油系统与安装 | [S110] 第 10–13 项 | 承包商；AHJ 做油罐超装试验 | 低油位开关在剩油不足满载运行时报警；高层燃油管 UL 1489 认证 1 h 保护或耐火 ≥2 h（全喷淋可 1 h）（B） | GB 50462 附录无燃油表（缺口，须自补） |
| G09 | L2 | 市电/发电机断路器检查表 DA 7469-R | [TM] 图 5-6，p.5-12 | Tested by | 1000 V 绝缘（样例非限值）、继电器试验、接触电阻、联锁、手动操作（A） | GB150 第 23、26 章 |
| G10 | L2 | ATS 检查表 DA 7471-R | [TM] 图 6-4，p.6-12 | Tested by | 动作灵活、电气机械联锁、定时整定、接触电阻、PT 与熔断器规格；按延时转换与回切；辅助触点正确（A；延时【合同定值】） | GB150 第 26 章（归类为推断） |
| G11 | L3 | 发电机电气试验 DA 7468-R D 段 | [TM] 第 17–21 项 | 测试人员＋厂家代表 | 极化指数 PI＝10 min 读数÷1 min 读数；直流耐压最高试验电压＝R×(2×铭牌电压)×1.6，安装时 R＝0.8，且不超厂家建议；第二页记空载、25%、75%、100%（110% 仅主用机组）（A；PI 限值【合同定值】） | GB150 第 4 章（限值需查正文） |
| G12 | L3 | AIDC 发电机单机预功能 | [AIDC] l3 | 同 G07 | ☆ 相序、接地导通、就地启停、急停、保护模拟（过流、过压、欠压、逆功率、接地）；空载 V/Hz（60 Hz±合同允差）、油压水温、振动（D） | 第 4 章 |
| G13 | L3 | 盘车试验（EPSS） | [SD110] 第 14 项 | 承包商；表设见证人栏 | 按厂家建议（NFPA 110-2010 第 7.13.4.4 条，B） | 第 14.12 节（推断） |
| G14 | L4 | 连续带载运行试验 | [GEN] §3.6.9.1 | 厂家启动工程师（26 08 00 §3.1 a）；业主、CxA 见证 | 75%×2 h → 100%×4 h →（仅主用）110%×2 h → 100%×2 h 或至稳定；每 15 min 记 A、V、kW、kvar、PF、Hz、油压与各温度；换载后测端部轴承三向振动；中断须整段重做；白天进行；“稳定”＝连续 4 次读数在带宽内；备用机组删 110%（A） | 第 14.13 节＋附录 H |
| G15 | L4 | 2 h 满载试验（EPSS） | [SD110] 第 13 项；[S110] 第 15 项 | 承包商 | 建筑负载＋负载箱补到铭牌 kW 的 100% 减现场降额（2010 版第 7.13.4.3 条）；西雅图：服务消防泵的机组 8 h（B） | 第 14.13 节 |
| G16 | L4 | ATS 功能试验 | [TM] §6-5 d | 测试人员 | 柴发停机且在自动位；断市电记录到启动、到完成转换的时间；合回记录回切与停机延时；再用测试按钮做一遍（A；时间【合同定值】） | 第 14.12 节＋附录 H |
| G17 | L4 | 断路器操作与核相 | [TM] §6-5 b、c | 测试人员 | 合柴发断路器前确认电压幅值相同、相序一致；试后回自动位（A） | 附录 A、H |
| G18 | L4 | 强制转换脚本 FPT-SCR-ATS-001 | [AD] | 分包；CxA 每步签 | 文中无转换时间数值（D） | 附录 H |
| G19 | L5 | 冷启动失电试验（EPSS） | [S110] 第 14 项；[SD110] 第 1–12 项 | 承包商；西雅图 AHJ 不到场只审报告 | 断全部常用电源（7.13.4.1）或至少一台 ATS 测试功能；负载＝EPSS 全部负载；记录启动延时、盘车时间、到额定转速、超调、转应急稳态时间；前 15 min 每 5 min、之后每 15 min 记到 2 h；回切延时最小 5 min；应急 ≤10 s、法定备用 ≤60 s（2021 SFC 1203.1.4，B） | 第 14.12 节＋附录 H |
| G20 | L5 | 市电失电全链路 IST（与 U20、U21 合并） | [TM] §6-5 h；[AD] | 同 U21 | Archdesk FAQ：通常 10–12 s 内启动并同步（D，通用说法） | 附录 H、J |
| G21 | L5→L6 | AHJ 验收报告与挂牌（EPSS） | [S110] 第 19–25 项 | 持证技师签声明；总包提交 | 通过第 7.13 节全部试验；挂白色服务标签；检查日起 24 h 内提交；N/A 只用于现场确实没有的项（B） | 国标无同类表，最接近附录 K |
| G22 | L6 | 说明书、专用工具、备件 | [S110] 第 8–9 项 | 承包商 | 说明书两套，一套放设备旁（NFPA 110-2019 第 8.2 节，B） | 第 15.2 节＋附录 K |

**跨来源冲突（CxA 必须在 OPR/合同里写死）**
1. 供电时间：西雅图表 10 s/60 s；Archdesk“通常 10–12 s”。数据中心 IT 负载一般不是生命安全负载，须在 OPR 写明柴发类别、目标时间及 UPS 后备裕量。
2. 带载时长：UFGS 备用机组合计约 8 h；NFPA 110 7.13.4.3 为 2 h；西雅图消防泵机组 8 h；Archdesk 每个 FPT ≥4 h。Cx 计划逐项写明采用哪条、哪个版本。
3. 110%：UFGS 编写人注与 DA 7468-R 都写明只用于主用机组；备用柴发不做 110%，除非合同另有规定。
4. TM 5-694 第 1 章文字把 DA 7469/7470 名称写反；以印刷表单为准（7469-R＝市电/发电机断路器，7470-R＝后备电源系统）。
5. AIDC 仓库只给了 ☆＝停留點 的图例，◆ 没有图例，本地图按见证点使用；复用前在自己模板里写清定义。

**验收**：对一个国内项目，标出 G01–G22 中哪些行因不是 EPSS 而不适用，并说出替代判据从哪来（设计文件、GB 50150、合同）。

## 3e. 其余电力设备、冷却链（含 CDU 纵切）与水系统：文件与典型测试

**为什么**：第 3c、3d 节只覆盖 UPS 与柴发。网站其余部件也要挂“本级文件＋判据来源＋谁执行谁见证”三个字段。Standard 202 只规定 CxP 要见证测试，不规定谁填检查表，“谁执行”按合同填。

**做什么：其余电力设备**（中压开关柜、变压器、低压柜、静态转换开关 STS、母线槽/PDU/列头柜）
- L1：并机柜失电模拟、同期检查、继电保护二次注入；STS 转换 <4 ms（BICSI 备考站，二手）。
- L2：到货（序列号、固件与 FAT 一致、冲击指示器）；开关柜加热器尽早通电；扭矩记录与扳手校准证书。表单：TM 5-694 DA 7463-R～7466-R（断路开关、变压器、开关柜、电力电缆）。
- L3：NETA 验收试验（绝缘、变比 TTR、继保二次注入、接地）。TTR 偏差 ≤0.5% 出自 ANSI/NETA ATS-2017 第 7.2.2 条（两份二手资料一致）；ATS-2025 已改条款编号，引用须注版本。
- L4：红外热成像、电能质量测量；PDU/RPP/母线槽经插接箱带负载箱、测零地电压（国内实践）。
- L5：单路与双路市电失电、黑启动、用维修旁路演示可并行维护、一台柴发不启动或带载跳机；交付 IST 脚本与时间线、事件顺序记录（SOE）、问题台账。

**冷却链**（冷水机组、冷却塔、水泵、CRAH/风墙）
- L1：冷机工厂性能试验（AHRI 550/590，二手）。
- L3：ACG 附录 C 冷水机组表：上锁挂牌程序已审、压力与泄漏试验、化学清洗报告、水流开关联锁、点对点完成、启动证书；电机点动确认转向；VFD 检查；TAB 初稿。https://www.commissioning.org/wp-content/uploads/2019/07/ACGCommissioningGuideline.pdf
- L4：加减机与轮换、冷冻水温度重设、二次泵压差控制（在最不利 CRAH 处）；ASHRAE TC 9.9 第 5 版推荐包络是 **IT 设备进风** 18–27 °C、露点 −9～15 °C、RH ≤70%——只有冷/热通道封闭时才可近似当作 CRAH 送风判据；封闭通道压差约 5–12 Pa（二手）。
- L5：单台冷机、水泵、CRAH 故障；冷源中断时的极限温升；冷机 anti-recycle 定时器与蓄冷罐缓冲是否衔接。

**纵切：冷却液分配单元（CDU, Coolant Distribution Unit）**

| 级别 | 交付物与要点 | 来源（等级） |
|---|---|---|
| L1 | CDU 出厂试验报告（项目合同定义） | 合同 |
| L2 | FWS/TCS 接口、过滤器、膨胀罐、处理液备量检查（OCP 第 2 阶段“机械检查”） | OCP 白皮书（C） |
| L2/L3 | 逐步充注、分段停顿查漏；氮气或合成气体做压力衰减；冲洗与取液样；PG25 冷却液记录 | OCP（C）；AIDC-HVAC（D） |
| L3 | 电气检查、控制器设置、点对点；漏液检测在集液盘、地板、感知带、快接区逐点触发并测自保持/复归 | OCP（C）；AIDC-HVAC ☆（D） |
| L3/L4 | 二次泵流量 ±10%【合同示例】；主备轮换与故障切换；急停 | AIDC-HVAC（D） |
| L4 | 25/50/75/100% 负载换热量 ≥95% 设计（AIDC 注明“现场可达成时”，属合同示例）；须用液冷负载箱，纯风冷热负荷无法在设计温差下证明 CDU/TCS（见第 4d 节） | AIDC-HVAC（D）；aidc-calculator（D） |
| L5 | CDU 退出、FWS 隔离场景（AIDC-Uptime-Workshop M-01、M-02）；满设计负载下证明蓄冷桥接有效（aidc-calculator FM-LIQ-010） | D |
| L6 | 液样与过滤记录；Tetra Tech 访谈提到 CDU 处 5 微米过滤与预冲洗 | C |

- OCP https://opencompute.org/documents/ocp-liquid-cooling-integration-and-logistics-white-paper-revision-1-0-1-pdf ；AIDC-HVAC https://aidc-hvac-l2l3-review.vercel.app ；Tetra Tech https://www.tetratech.com/experts/john-herboth-discusses-challenges-in-commissioning-liquid-cooled-ai-data-centers/ ；NSF/宾汉顿 CDU 调试论文 https://par.nsf.gov/servlets/purl/10611018

**水系统**（冷冻水与冷却水管网、补水、蓄冷罐、漏水检测）
- L2/L3：管道水压试验按 ASME B31.9/B31.1，常见 1.5 倍最大设计工作压力、保压 2–4 h、无可测压降（BICSI 备考站，二手）；冲洗与水质报告；风管漏风试验国际按 SMACNA，国内按 GB 50243 附录 C。
- L3/L4：TAB 水平衡报告；漏水检测端到端五环节：模拟漏水 → 报警分级 → 通知 → 自动关阀且不产生水锤 → 手动超驰；另测断电、断网、探测器被旁路；定位式漏水绳核对报警米数与竣工图。https://www.watts.com/blog/prevent-false-leak-alarms-in-data-centers
- L5：冷冻水主管关断、联络阀打开、备用泵升速；蓄冷罐放冷时间（腾讯方案）。
- L2 模板：AIDC-Piping-L2FIV-Review 的三级结论（合格/有条件合格/不合格，不合格者复验前不得进入后续工序）与五方签认（含 CxA）。https://aidc-piping-l2fiv-review.vercel.app

**验收**：①说出漏水检测 L4 的五个环节；②为什么 18–27 °C 不能直接当 CRAH 送风判据；③CDU 的 L4 为什么必须用液冷负载箱。

## 3f. 控制与监控（BMS/EPMS）、消防联动与 EPO：纵切与典型测试

**为什么**：IST 失败常常不是设备坏，而是点位、报警、控制顺序没验证。消防与紧急断电（EPO, Emergency Power Off）则涉及“绝对不能实喷/实断”的安全边界。

**做什么：BMS/EPMS 纵切**（楼宇自控 BMS、电力监控 EPMS、动环/DCIM、PLC）

| 级别 | 交付物与要点 | 来源（等级） |
|---|---|---|
| L2 | 盘柜与网络安装；BACnet 设备实例号唯一；点位命名 100% 通过正则检查，正确性抽样 | ACE-IoT corona-digital-cx（D） |
| L3 | 点对点核对（P2P, Point-to-Point）100% 签认、零未决；传感器校准；报警生成/确认/复位；趋势设置 | ACG 附录 C-16（C）；ashrae-gl13-2024-teaching（D） |
| L3 | P2P 表列：点名/标签、点类型（AI/AO/DI/DO/网络点）、设备与位置、现场施加值或实测值、BMS 显示值、偏差、量程单位、报警限值与是否送达、图形页、趋势、执行人与日期 | 模板主题综合（C/D） |
| L3 | 检查方法用香港 ArchSD 空调 T&C 2017 附件 IV 六张流程图（总流程、传感器、DO、AO、报警、控制回路）（英文文件） | B |
| L3→L4 | VDC 业主规范的“BAS Online 十条件”（控制盘就位、网络连通、永久电源、逻辑载入、图控上线等）可作门禁参考；属单一业主要求，只限私下学习 | D |
| L4 | 控制顺序（SOO）测试；PID 阶跃；报警矩阵（等级、路由、升级、确认）；每个 FPT 至少 4 h 稳定趋势（Archdesk） | D |
| L4 | 判据写法样板：PNNL ConStrain 每项按“规则 → 伪代码 → 数据点 → 容差 → 通过/失败” | B |
| L5 | BMS 通讯中断（open-engineering-notes 六步表）；控制器失效与监控服务器失效分测；多设备同时断通讯时本地逻辑能否保持；恢复须单独测（通讯恢复、点位校验、再协调，不能一下覆盖有效本地设定）；报警升级失败（CxPlanner） | D |
| L3 汇总 | EPMS 汇总规则：任一设备受阻即 Blocked；全部配置完成且通讯正常才 L3 Complete | D |

- ArchSD 空调 T&C https://www.archsd.gov.hk/media/publications-publicity/t-c-procedure-for-air-conditioning,-refrigeration,-ventilation-and-central-monitoring-control-system-installation/ac_tcp2017.pdf ；BMS 通讯失效测试 https://github.com/DatacenterGuidelines/open-engineering-notes/blob/main/functional-testing/bms-communication-failure-test.md ；ConStrain https://github.com/pnnl/ConStrain ；corona https://ace-iot-solutions.github.io/corona-digital-cx/

**做什么：消防联动纵切（以 IG-100 惰性气体灭火为例）**
- L2/L3：一个防护区一张表；L2/L3 禁止实喷，只做模拟释放（AIDC-FIRE 模板规则，D）。顺序：二回路探测模拟 → 预警 → 延时 → 模拟释放输出 → 中止按钮测试。
- L2/L3（国内）：火灾自动报警调试按 GB 50166-2019 第 4 章，记录用附录 E。https://www.chinesestandard.net/AMP/English.amp.aspx/GB50166-2019
- L3：气体灭火房间门扇风机密封性试验（door fan test），方法见 NFPA 2001 附录 C，一般要求灭火浓度保持约 10 分钟；新装投用前必做，改造后复测。https://kordfire.com/room-integrity-testing-for-clean-agent-systems/
- L4：完整联动链：火警 → 空调停机、防火阀与排烟联动 → 预警 → 延时 → 模拟释放 → 声光 → 门禁释放 → BMS/DCIM 收到报警；另做消防泵测试。施耐德 WP148：消防调试从进水与室外阀门开始，经报警与自动上报，最后到喷淋和/或气体灭火。
- L5：火警联动场景（GDC-TPC-IST-Checklist 的 VF 类场景可作样例）。
- 注意：AIDC-FIRE 依据台湾消防法规加 NFPA 2001/ISO 14520。大陆项目先换成国标；常被引用的 GB 50263（气体灭火）与 GB 50116（火灾报警设计）的编号、年份、名称本资料未核实，标“待核实”。

**做什么：EPO**
- 在尚未安装 IT 设备的机房、监护下实际按下（BICSI 备考站，二手）。
- 预期：指定的 IT 电源与专用空调断开、规定风阀关闭、无关基础设施保持带电；适用 NEC 645 条时，机房内 UPS 输出与电池按 645.11 一并断开。
- 同时验证防误触罩、复位流程与报警。

**用什么**：AIDC-ELV（只看 BMS/SCADA、PLC 盘、超音波流量计三表）https://aidc-elv-l2l3-review.vercel.app ；AIDC-FIRE https://aidc-fire-l2l3-review.vercel.app

**验收**：①P2P 为什么属于 L3 而不是 L4？②为什么 L2/L3 不能实喷？③EPO 为什么要在未装 IT 设备时做？④写出 BMS 通讯中断测试的“恢复”判据。

## 3g. 判据层补漏：UPS 电池、柴发阶跃与额定、NFPA 110 适用边界、UPS L4 参考值

**为什么**：UPS 是最典型部件，但电池验收值、柴发阶跃瞬态、NFPA 110 何时适用，正是新手最容易“背数字不看来源”的地方。本节每条判据都带标签。

**(a) 电池标准（4 本，全部付费；加入第 5a 节读单）**
- IEEE 450-2020：富液（排气式）铅酸电池（VLA）维护、试验与更换，取代 450-2010。https://standards.ieee.org/standard/450-2020.html
- IEEE 1188-2005：阀控式铅酸电池（VRLA）。**IEEE SA 页面显示 1188-2025 已于 2025-12-10 批准、2026-10-19 出版，取代 1188-2005 与 1188a-2014**；合同引用哪一版要澄清。https://standards.ieee.org/ieee/1188/11656/
- IEEE 485-2020：铅酸电池选型（买多大），不含试验与充电器选型。https://standards.ieee.org/standard/485-2020.html
- 边界：以上只覆盖铅酸（485 另含镍镉）。锂电 UPS 按厂家 BMS 资料与合同执行，不能套用下列数值。

**(b) UPS 电池 L3（安装后、上电前）【二手】**（Industrial Monitor Direct 文章引用 IEEE 但无条款号，D）
1. 开路电压：VRLA ≥2.1 V/单体，富液 ≥2.0 V/单体。
2. 内阻：在出厂基线 ±20% 内；更重要的是逐节录入基线，供以后趋势判断。
3. 连接条电阻 <0.1 mΩ（受连接件规格影响大，同时保存本项目基线）。
4. 测量环境温度 25±5 °C。
- 交付物：单体 OCV 表、内阻表、连接电阻表、扭矩记录、温度记录。

**(c) UPS 电池 L4 放电【二手】**——先分清两种放电
- 容量试验（还剩多少 Ah）：按厂家 C8 或 C10 率恒流放电；终止电压 VRLA 1.75 V/单体、富液 1.85 V/单体（IMD；富液值高于常见 1.75 V，须对照厂家放电表）；新电池容量 ≥95%，部分厂家要求 100%。
- 后备时间试验（满载撑多久）：按 100% 设计 kW 恒功率放电；短时放电终止电压铅酸典型 1.67–1.75 V/单体；部分负载结果不能外推满载（BICSI 16.2）。
- 记录单体电压、串电流、环境温度，采样 ≤1 s（IMD）；全程红外热像，同类端子温差 >5 °C 或高出环境 >15 °C 记缺陷（BICSI 16.2）。

**(d) 移交运维的电池周期判据【二手】**（Fluke，D）
- 容量试验间隔 ≤ 预期寿命 25% 或 2 年取短者；到寿命 85% 或容量下降 >10% 改为每年；低于 80% 多数厂家建议更换；内阻比基线升 ≥20% 为劣化信号；内阻测试是趋势工具，不能代替放电。
- 冲突：IMD 另给按年龄的门槛（1–3 年 ≥90%、3–5 年 ≥80%、5 年以上 ≥70%）。网站两套都列，标【合同定值】。
- https://www.fluke.com/en/learn/blog/energy-efficiency/recommended-battery-tests ；https://industrialmonitordirect.com/blogs/knowledgebase/ups-battery-bank-commissioning-required-tests-and-procedures

**(e) 柴发阶跃加载：ISO 8528-5 G3【二手】【合同定值】**
- 典型值：频率跌落约 ≤7%、约 3 s 恢复；电压跌落约 ≤15%、约 4 s 恢复。**出处更正：数值在 BICSI 备考站 16.2 页，不在 16.1**；16.1 只说按 G3 做 0→100%、33%、50% 阶跃。
- ISO 8528-5 现行为 2025 版（2022 版已撤销），付费 https://www.iso.org/standard/85960.html ；国内对应 GB/T 2820.5（2025 版替代 2009 版的信息本轮未核实）。
- 位置：L1 工厂做全套阶跃；L4 现场至少复做一次最大加载块并录波，作为 L5 基线。

**(f) Uptime 柴发额定规则**
- Traver（Uptime 副总裁）2020 演示稿原文：Tier III/IV 按厂家在现场条件下的无限运行时间额定；standby 与未降额 prime 只适用 Tier I/II（B）。https://nex75.iea-ebc.org/Data/Sites/4/media/events/2020-10/presentations/1.4b--traver--uptime-institute.pdf
- Uptime ATD 技术论文《Engine-Generator Ratings》本轮返回 403 未读到；据检索摘要，continuous、降额 prime、无运行时间限制的 standby 三种可满足 Tier III/IV。CSE 免费讲解 https://www.csemag.com/articles/generator-ratings-and-the-implications-for-data-centers/
- Cx 动作：设计审查与 L1 送审时核铭牌额定类型（ISO 8528-1）、海拔与温度降额后的现场容量、厂家书面确认函。

**(g) NFPA 110 适用边界**
- 先判性质：多数数据中心 IT 备用发电属 NEC 702 可选备用（dsanusi/white-space NOTES.md），10 秒对 IT 负载多是设计目标；同楼生命安全负载仍按应急系统。CSE：702 不在 NFPA 110 管辖内；700 大致对应 Level 1、701 大致对应 Level 2，具体由其他规范与 AHJ 指定。https://www.csemag.com/articles/standby-vs-emergency-power-in-mission-critical-facilities/
- 只有指定为 EPSS 时才套 7.13（冷启动失电、2 h 满载）、Type 10、8.4 周期试验（2016 版：8.4.2 每月 ≥30 min、≥30% 铭牌 kW 或达最低排气温度；8.4.2.3 年度 50%×30 min＋75%×60 min；8.4.9 Level 1 每 36 个月按 Class 时长、超过 4 h 者可在 4 h 后终止；条号随版本变）。
- 大陆项目：依据设计文件、GB 50150-2016、GB 50462-2024 与合同；外资规格书引 NFPA 110 或 Uptime 时是合同义务，不是法定义务。

**(h) UPS L4 参考值【二手】**（BICSI 16.2）
- 稳态：三相电压平衡 ±1%；频率 ±0.1 Hz；THDv 线性负载约 3%、非线性约 5%。
- 过载：125%/10 min、150%/60 s 示例，以型号数据表为准；同时验证转静态旁路并自动返回。
- 动态：瞬态在合同指定的 IEC 62040-3 等级内，并远在 ITIC 包络内；20–50 ms 内恢复到 ±1%。IEC 62040-3 现行 2021 版（第 3 版），分类码如 VFI-SS-111，末三位是动态等级（1 最严）https://webstore.iec.ch/en/publication/60140 。ITIC 原本针对 120 V/60 Hz IT 设备，230/400 V、50 Hz 项目只作参考 https://powermonitors.com/whitepapers/cbema-and-itic-curves/

**验收**：①说出容量试验与后备时间试验各回答什么问题；②给出一个国内项目里 NFPA 110 7.13 不适用的理由与替代依据；③IEEE 1188 当前版本是哪年？

## 4a. 流程主线：ASHRAE 202 第 5–17 条（13 条）与 L 级对照，CxM 每条管什么

**为什么**：标准按“条款/阶段”组织（Standard 202 第 5–17 条正好 13 条），现场按“L 级”组织。CxM 要把两套对齐，并在每一步管住五件事：文件、门禁、问题、资源、时间。注意：202 的顺序是 §6 OPR → §7 Cx 计划 → §8 BoD；L 级在 202 中没有编号，属行业惯例，测试活动大多落在 §12。条号以 2013 版为例（NEBB 幻灯片），2024 版可能调整。

**做什么：一张对照表**

| 202 条款 | 内容 | 对应 L 级 | 主要交付物 | CxM 管什么（含报价提示） |
|---|---|---|---|---|
| §5 | 启动调试流程 | L0 | 调试范围、团队名单 | 范围从第几级开始介入，写进报价第一行 |
| §6 | OPR 业主项目要求 | L0 | 可用度/Tier、冗余、PUE/WUE、机柜密度、温湿度包络、可维护性、培训与保修 | 每条可量化并编号；业主没有 OPR 时把“协助编写”单列 |
| §7 | Cx 计划 | L0 | 范围、系统清单、组织沟通、日程、平台、台账流程、各级前提与签字矩阵 | 7.2.1：项目启动时出初版并持续更新；写清见证比例 |
| §8 | BoD 设计依据 | L0 | 设计方逐条回应 OPR | 8.2.2–8.2.3：每个设计里程碑交业主与 CxP 审 |
| §9 | 承包商/供应商/厂家调试要求（Cx 规范） | L0 | 招标文件中的配合义务 | 写进复测费用、就绪声明、负载箱与燃油责任；免费样本 UFGS 01 91 00.15 |
| §10 | 设计审查 | L0 | 设计评审报告 | 10.2.1 施工图发出前完成；10.2.2 不得当同行评审或规范审查；评审轮数决定工时 |
| §11 | 调试送审审查 | L0–L1 | 送审审查报告、FAT 程序审批 | 对照 OPR 核型号、容量、接口；FAT 见证日期提前确认（Archdesk 样例 ≥30 天） |
| §12 | 施工观察与测试 | L1–L5 | FAT 报告、到货与安装检查、PFC、启动/NETA/TAB/P2P 报告、就绪证书、FPT、IST | 抽样规则（UFGS）：中央机房与系统级设备 100%；同型末端可抽 25% 或 50%、每批 ≥3 台；首批 10% 失败再抽一批，仍 10% 失败则全测；CSE：关键系统 100%；夜班、负载箱、燃油、复测要计价 |
| §13 | 问题与解决记录 | 全程 | 问题台账 | 13.2.3：维护到全部解决或被业主接受（第 4e 节） |
| §14 | 系统手册 | L6 | 系统手册 | UFGS：FPT/IST 后 30 日历天内；“谁编”报价前问清 |
| §15 | 培训 | L6 | 培训计划与签到 | 课堂＋现场实操，最好用 IST 故障场景演练 EOP/MOP |
| §16 | 入住后运行 | L6 | 季节性/延期测试、保修复查 | 16.1：保修期满前完成；GSA：12 个月保修的第 10 个月复查，建议 3–5 年后再调试 |
| §17 | 调试报告 | L6 | 最终调试报告 | UFGS：测试确认后 14 天内；2024 版拆分初版与终版报告 |
| （非 202 条款） | 经验教训研讨 | L6 后 | 研讨记录 | 写进下一个项目的 OPR 与 Cx 规范，可作增值服务 |

**就绪证书与复查费（更正）**：UFGS 默认在测试前 [30] 日历天或 [20] 工作日提交，批准前不得排测。BCxA 2025 讲义的就绪声明样表写的是：若 CxA 到场发现未就绪，**业主可向施工方收取**每小时 350 美元（含路途时间）加差旅的回扣费（back-charge）——CxA 不直接向施工方开票。对 prebill：合同里写明 CxA 白跑一趟的工时由谁付、业主如何向施工方回扣。

**用什么**
- NEBB 202 幻灯片 https://www.nebb.org/wp-content/uploads/2021/09/NEBBinar_ASHRAE_202.pdf
- UFGS 01 91 00.15 https://www.wbdg.org/FFC/DOD/UFGS/UFGS%2001%2091%2000.15.pdf
- GSA 指南 https://www.wbdg.org/FFC/GSA/gsa_commissioning_guide_2020.pdf
- BCxA 2025 数据中心讲义 https://cdn.fs.pathlms.com/U7EEo7ZjSSy8MsH2XSIh
- ABB 一页纸（IST 预留电池回充时间）https://library.e.abb.com/public/14f50a02d03b4c87a67f17a47d2a13b3/Data%20Center%20Tips_January.pdf

**验收**
①拿一份招标文件，10 分钟内判断它覆盖了 202 第 5–17 条中的哪几条。
②说出就绪证书的作用，以及没有它就排测试的损失由谁承担。

## 4b. 如何写 FPT 与 IST 脚本（一）：表头 11 项、11 列行格式、PF01–PF06、TM 5-694 改写、IST 八段骨架

**为什么**：脚本是 CxA 的核心交付物，也是 prebill 估算见证工日的底稿。写不清“预期结果＋容差＋回退”的脚本，现场无法判通过或失败。

**做什么 第 1 步：场景表头（iRecruit 原文 11 项）**
目的、前提条件、参与者、初始状态、模拟事件、预期响应、通过/失败判据、安全与中止控制、沟通、证据、恢复步骤。另一处摘要称 9 项，漏了“参与者”与“沟通”。原文：“Restoration alone does not close a deficiency. A controlled retest is required.” https://www.irecruit.co/insights/level-5-commissioning-ist-jobs-data-center-cx-certs-pay

**第 2 步：统一的 11 列行格式**
步骤号 | 前置状态 | 操作 | 预期结果（引 OPR 编号或“标准＋条号＋版本”）| 容差 | 实测值 | 结果 | 执行人 | 见证人 | 时间戳 | 关联问题编号
- 一行只做一件改变设备状态的事；步骤号写成“脚本号＋行号”（WP148 用 EE15、EE16）。
- 前置状态必须能由仪表或 BMS 点判定（cx-preflight-edge 写成 CH1_STATUS==1）。
- 预期写成“点位 运算符 数值，X 秒内达到并保持 Y 秒”；把“bumpless”这类形容词换成数字。
- 结果用四态：PASS / FAIL / ABORT（触发中止）/ HOLD（缺数据，交工程师确认）。
- 时间戳至少记请求、许可、动作完成三个时刻。
- 两个必填子项：中止条件、回退（rollback）。

**第 3 步：PF01–PF06 预检码**（Yeongje-Kim/cx-preflight-edge 的 cxpe/preflight.py，Apache-2.0，韩文，D）
- ERROR（阻止批准）：PF01 改变状态的步骤没有前置条件；PF02 前置与前面步骤结果矛盾或要到后面才成立；PF03 没有预期结果；PF04 点位标签不在点表或别名表。
- WARN（必须给处置）：PF05 改变状态的步骤没有回退；PF06 同一浮点点位在两步中要求互不相交的区间。
- 该仓库把冷机切换叫“Level 4 IST”，层级名不对；12–30 s 的冷机重启时间不现实。

**第 4 步：用 TM 5-694 第 6-5 节 g–j 练改写**【一手】
- g 带载：逐个合负载开关、每步测量，到设计负载运行 4 h 查过热 → 每级一行，“查过热”改为红外点位＋温升限值。
- h 市电跳闸：断市电 → 电池接载 → 柴发启动、ATS 转换、柴发带载 → 浮充；合回后回切、柴发停机 → 至少拆 6 行。
- i 逆变器 A→B 带载切换 → 两行，各带回退。
- j 电池放电：通知厂区 → 断柴发断路器并封锁自动与手动启动 → 断市电放至最低电压（1–4 h）→ 逆变器跳闸 → 恢复 → 记录充满时间。三条结论：封锁柴发启动就是“模拟拒启”的注入方法；原文大量“ensure bumpless”没有数值，正是容差列要补的；“充满时间”决定下一场依赖电池的场景何时能开始。

**示范行（h 段改写）**
- 步骤号 EE-07-02；前置：UPS 带载接市电、两台柴发 AUTO、无活动告警、指挥中心已许可。
- 操作：手动断开市电进线断路器。
- 预期：电池接载输出连续，柴发启动 → ATS 转柴发 → 带载 → 回浮充（TM 5-694 §6-5 h）；电压带宽引 OPR-E-03【示例编号】。
- 容差：输出电压 ±X%（从 OPR 取）；ATS ≤10 s 仅在 EPSS 或合同要求时适用。
- 时间戳示例：请求 01:05、许可 01:34、完成 01:40（WP148 图 7）。
- 中止：任一负载箱掉载或 UPS 输出越限。回退：重合市电进线断路器。

**第 5 步：IST 八段骨架**
1. 审批：WP148——主脚本贯穿施工期逐步完善，最后合成整体脚本；CxPlanner——每个注入故障都要有事先批准的回退，并纳入安全经理与厂商；版本冻结，复测另开新编号。
2. 范围与前提：L4 全部关闭；无活动告警；阀门、风阀、开关正常位置清单已签（BCxA 第 35 页）；负载箱布置与接线核查（aidc FM-PWR-008：核 kW 与级数、电缆载流量、低级别先确认三相平衡）；开测前记时间、天气与 as-found 状态（第 36 页）。
3. 安全：LOTO 与 NFPA 70E；弧闪标签与研究版本一致（FM-PWR-007）；NO-GO 清单（见第 4c 节）。
4. 角色与指挥中心：WP148 图 7 通话格式——“CxA→CC：请求许可断开 CB#102，脚本行 EE15，01:05”→“CC：已确认，许可执行，01:34”→“CxA：CB#102 已断开并上锁挂牌，01:40”。执行人只管安全与测试，沟通与记录归指挥中心。
5. 场景排序：正常 → 单一故障 → 多重故障 → 恢复；做过放电的场景后先充满电。
6. 数据采集：趋势 1 s 采样（示例）、事件时刻、截图（含数据质量标识）、电能质量与机柜进风温度。
7. 问题与复测：FAIL/ABORT 必开问题单；复测新编号、保留旧记录。
8. 签核：WP148 三份输出——竣工脚本报告（逐行通过/失败）、部件错误日志、趋势报告（含 CxA 验证声明）。

**用什么**：WP148 https://download.se.com/doc/SPD_DBOY-6NJNK6_EN/DBOY-6NJNK6_R1_EN.pdf ；cx-preflight-edge https://github.com/Yeongje-Kim/cx-preflight-edge ；BCxA 讲义第 34–36 页（FPT 范例：AHU 送风温度传感器失效）https://cdn.fs.pathlms.com/U7EEo7ZjSSy8MsH2XSIh ；LBNL FTG https://escholarship.org/content/qt4w4400cm/qt4w4400cm.pdf

**验收**：把 TM 5-694 §6-5 h 拆成 ≥6 行，逐行用 PF01–PF06 检查，再与示范行对照。

## 4c. 如何写 IST 脚本（二）：场景从哪来、一个完整示例、续航核对与埋错自测

**为什么**：IST 场景不能拍脑袋。要从拓扑单点、FMEA、失效模式库和边缘场景中推导，并用续航计算定出“停止点”和 NO-GO 理由。

**做什么：五道推导工序**
- **A 拓扑单点移除**：Skeeter-spec 工具 01 加载 WP75 图 5（分布式冗余），移除 PDU 1，只有单电源线负载 LOAD 1 断电。WP75 对该设计的优点有前提“all loads are dual-corded”，而图 5 的 6 个负载里 3 个是单电源线。规则：每个单电源线负载至少写一条“移除其上游唯一部件”的场景；“负载有几根电源线”写进前置状态。工具只看拓扑不算容量。
- **B FMEA 排序**：tier3-cx-teaching 规则 RPN＝S×O×D（各 1–5）；≥16 必须故障注入、写中止条件与应急预案；12–15 在整合测试验证；8–11 在功能测试覆盖。**页面等级标签有错**（RPN 24、27 标“中高”，16 标“高”），数值本身对，复用前自己重排。FE-02 发电机启动失败 RPN 5×2×3＝30，必须注入——即下文示例的来由。
- **C 失效模式库**：aidc-calculator risks.html 共 116 条；按 COMMISSION 阶段筛选，一处核查报 44 条，另一处按 risksdata.js（提交 7dec5c9）数出 32 条，**以你打开页面时的筛选计数为准**。把 detection 字段改写成测试步骤，如 FM-GEN-008（ATS 逻辑/时序）→ 全程计时并注入电压暂降波形；FM-UPS-010（调试期电池深放电）→ 以容量测试为闸门。
- **D 边缘场景**：CxPlanner Top 10——ATS 卡开位同时断路器拒动；柴发暖机期间 UPS 电池部分失效；低温冷机重启；多设备同时与 BMS 失联；BMS 与现场设定冲突；防火阀被堵无超控；传感器故障掩盖升温；邮件服务器离线致告警不升级；开关柜带载紧急停机；来电时仍有系统处于故障切换态。https://cxplanner.com/data-centers/resources/pressure-testing-your-ist-plan
- **E 画图核对**：SchemaTex 托管 MCP https://schematex.js.org/mcp ，有简体中文单线图、FMEA、故障树文档 https://schematex.js.org/zh-Hans/docs/sld （AGPL-3.0：嵌入代码对外服务要开源；导出的静态 SVG 一般是你自己的产出）。**警告**：其“Data center 2N UPS”示例把 UPS_A、UPS_B 都接进同一个 STS，这个 STS 是单点故障，不是真 2N；画图时 A、B 两路要分别画到双电源线负载。

**完整示例：2N 市电全失＋A 路柴发拒启（100% 负载）**【示例，拓扑参数取自 dc-twin 虚构夹具 REF-DC-2N-001；时间轴套用 BICSI 16.3，二手】
- 拓扑：A、B 两路各 2 MW；每路 UPS 可用电池 120 kWh；每路 1 柴发＋1 ATS；双电源线负载箱 2×800 kW＝1.6 MW。假设“B 路冷机＋蓄冷罐能独带 100% 热负荷”须由 BOD 证实。
- 前提：L4 关闭、无告警、正常位置签字、1.6 MW 稳定 ≥30 min、两路电池充满、**B 路不在检修**。
- 注入：G-A 按 TM 5-694 j 段“断开柴发断路器并封锁自动/手动启动”；断开 MV-A、MV-B 进线。
- 全局中止：任一负载箱掉载；UPS 输出越出 OPR 带宽；任一机柜进风 >32 °C（ASHRAE A1 允许上限，二手）；UPS-A 剩余 ≤20% 而未获 GO。

| 时刻 | 步骤 | 预期 |
|---|---|---|
| T−30 min | S0 基线 | 记时间天气、截屏、开趋势；数据质量 LIVE |
| T−5 min | S1 封锁 G-A | EPMS 报“G-A 非自动”；回退＝解除封锁 |
| T0 | S2 断 MV-A、MV-B | 两路 UPS 0 ms 转电池，负载箱不掉载 |
| T+0.5 s | S3 | 两台柴发收到运行信号 |
| T+7 s | S4 | G-B 达额定转速（60 Hz 机组 1800 rpm）；G-A 按 SOO 报启动失败 |
| T+8.5 s | S5 | G-B 合闸上母线 |
| T+9.5 s | S6 | ATS-B 转柴发；ATS-A 留常用侧 |
| T+12 s 起 | S7 | UPS-B 整流器软启动（walk-in）15–30 s，电池 B 回充；UPS-A 仍由电池带约 800 kW |
| T+30 s | S8 | UPS 供电的二次泵循环蓄冷罐冷水，进风不超中止限 |
| T+3.5 min | S9 | B 路冷机过 anti-recycle 后重启 |
| T+6 min | S10 | 冷冻水回设定（备考站例 52°F，能否做到看 BOD） |
| T+7.2 min | S11 停止点 | UPS-A 剩 20%，指挥中心召集 GO/NO-GO：GO＝放空后由 B 路独带 1.6 MW（须事先核 G-B 与 B 路容量）；NO-GO＝解除封锁手动起 G-A 或恢复 MV-A |
| T+15 min | S12 | 重合 MV-A、MV-B，市电稳定计时 15–30 min |
| 其后 | S13–S16 | 闭式回切（先合后断，需供电部门同意）；柴发空载冷却 5–10 min 停机；G-A 回 AUTO、记录充满时间；无设备滞留在故障切换/旁路态 |

**续航核对（dc-twin）**
- 参考场景（README 与 REFERENCE_SCENARIO.md，虚构）：B 路先检修、A 路失电且柴发拒启，UPS-A 独带 1.6 MW；手算 120 kWh÷1.6 MW＝270 s；120 s 开始放电 → 336 s 剩 20% 告警 → 390 s 放空 → 422 s 恢复，中断 32 s。https://github.com/NishikawaButterfly/dc-twin
- 本例 B 路健康：120 kWh÷0.8 MW＝540 s＝9 min；剩 20% 在 432 s＝7.2 min，即 S11。
- 若误做成“B 路检修＋A 路拒启”，UPS-A 4.5 min 放空，比冷冻水恢复（T+6 min）还早——这就是 NO-GO“一路检修时不做另一路拒启测试”的定量理由。
- 局限：恒功率线性模型；真实续航随倍率、温度、老化非线性变化，停止点要用厂家放电曲线和 L4 容量测试复核。

**埋错自测（满分 12 分，漏任何 ERROR 级判不及格）**：点表 MVA_CB、MVB_CB、GA_START_BLOCK、GB_RUN、GB_CB、ATSB_POS、UPSA_BATT_SOC、CHWS_T。
- S2 封锁 G-A：前置为空。S3 断 MV：无回退。S4 确认 G-B 合闸：前置写 ATSB_POS＝GEN。S6 UPS-B 软启：预期“观察是否正常”。S7 前置 MVA_CB＝0、预期 UPS_A_SOC ≥20%。S1 要求 CHWS_T 11–12 °C、S8 要求 14–16 °C。
- 答案：PF01 在 S2；PF02 在 S4（ATS 在柴发合闸后才转换）；PF03 在 S6；PF04 在 S7（点表只有 UPSA_BATT_SOC）；PF05 在 S3（补“重合 MV 进线”）；PF06 在 S1 与 S8（改为“≤设定值＋Δ，6 min 内回 11–12 °C”）。加分：缺 OPR 引用、8.5 s 应引项目 SOO、缺执行/见证/时间戳列、缺中止条件。

**验收**：独立写出本示例 S0–S16 的完整行，并用自己的项目参数重算停止点。

## 4d. 负载箱与 IST 资源计划（报价视角）：P0–P8 阶梯、液冷、颗粒度、燃油、时长、谁付钱

**为什么**：CxA 报价最容易漏、最易起争议的不是工程师人日，而是随级别放大的五类资源：临时负载（负载箱/假负载）、柴发燃油、测试电费、夜班连续作业、复测。这一步把它们变成 prebill 的行项目。

**做什么 1：负载阶梯 P0–P8**（dmvevents/aidc-calculator，规划级估计，D）
- P0 临时施工电约 5%（假设）→ P1 房屋与控制上电约 2–3%（BMS 在线是一切前提）→ P2 冷站调试约 15%（按气候重算）→ P3 柴发负载箱＝已装机组 MVA → P4 UPS 逐路径负载箱约 92% →（白牌）P5 IST 100% → P6 GPU 安装约 43% → P7 分批烧机 → P8 100% 验收浸泡。
- P4 公式：IT ×（1＋UPS 带机械负荷 3.9%）×（1＋UPS 损耗 2.4%）÷ 设施功率。两条规则：负载箱总量按单路径测试确定；L5 白牌前不做 GPU 烧机，除非业主书面承担风险。
- 算例【示例】：1 MW IT、PUE 1.15 → P4 约 1.064 MW、P5 1.15 MW；工具默认 P4＋P5 测试窗口 150–250 h，能耗约 160–288 MWh，国内按 0.6–0.8 元/kWh 约 10–23 万元。调试峰值可能触发需量电费棘轮（之后 12 个月按此峰值计）——写“除外”或单列。https://dmvevents.github.io/aidc-calculator/commissioning.html

**2：液冷**：液侧＝P4 × 液冷比例（默认 0.87）；纯空气热负荷无法在设计温差下证明 CDU/TCS。Aggreko 手册列负载箱 100 kW–6 MW、液冷 600 kW；Crestchic 液冷负载箱 415 V 下最高 648 kW、ΔT ±0.5 °C（媒体报道）；Aggreko 悉尼案例 12 台 600 kW＋1 备用、每回路 1.2 MW、供水 70 °C、约 20 kW/级、4 台换热器隔离一次侧 PG25（C）。行项目：液冷负载箱台·天、隔离换热器、软管与快接头、冲洗与水处理（排放责任写明）、液侧传感器。

**3：空侧颗粒度**
- 腾讯：机架式假负载单台 4–6 kW、每档 1–1.5 kW 可调（D）。
- Aggreko《Robust IST》：西方常用 100–500 kW 负载箱阵列，亚洲常用小到 3 kW 的加热器或风扇；该项目用 12 台最高 200 kW 负载箱对 1,450 kW 机房做 1,500 kW L5，调试 21 天（C，厂商案例）。
- Avtron：风扇加热器无仪表、不记录数据、需手动接线（C）。
- BICSI 16.3：服务器模拟器约 120–160 CFM/kW；黑启动序列约 40 min（二手）。1 MW 约需 20–27 万 m³/h 风量；风量不够则气流组织不像服务器，结论站不住。

**4：柴发与燃油**：按 UFGS 26 32 15 §3.6.9.1 序列，一台 2,000 kW 备用机组约耗 15 MWh；按 0.25–0.28 L/kWh【示例，须用机组油耗曲线替换】约 3,750–4,200 L/台/次；总量＝台数×单台×复测系数。“中断全部重做”与“只能白天做”意味着燃油与租期要留余量、多台要分天排。§3.6.1.3：承包商提供燃油、仪表、按规定功率因数配置的负载箱；§3.6.1.4：仪表测试前 30 天内校准，精度电流/电压/功率 ±1.5%、PF ±3%、频率 ±0.5%（A）。

**5：时长口径（不要写死）**：CSDN 金融数据中心文（单机 ≥8 h、子系统 ≥24 h、综合 ≥72 h，本轮返回 521，E）；知乎假负载文（每级 15–60 min、100% 持续 8–24 h，本轮 403，E）；UFGS 单次 8 h（备用）或 10 h（主用）（A）。

**6：谁付钱——三种口径并存**：UFGS 承包商提供（A）；CSE 2009 说 GC 通常把燃油计入预算、燃油可达业主当年运营预算 10%（C）；BCxA 讲义说 CxP 可能被要求雇用负载箱测试方（C）。CxA 可选报法【示例】：A 纯见证型（临时负载与能源全部除外）；B 组织型（含方案、调度、数据整理，租赁与燃油由他方付）；C 交钥匙型（含租赁、电缆、操作员，燃油电费按实或暂列金，加管理费与风险金）。

**7：招标文件体检**：cxms-platform SpecCheck 3.1（是否有条款为负载箱对相邻在用空间的热影响指定责任）、6.1（每个 go/no-go 测点是否有收费级电表及表计等级与点位对照表）。扩建项目里负载箱排热、柴发排烟被吸进在运营区域新风口是真实风险。https://github.com/thediversecandidate/cxms-platform/blob/main/app/spec_checks/checklist.py

**8：复测与夜班**：BCxP 备考笔记的常见条款——首次复测含在基础费内，之后按费率从总包进度款回扣（示例 210 美元/小时）（D）；BCxA 样表 350 美元/小时含路途另加差旅（业主向施工方收）；Azure 悉尼 2023 事件中当晚现场只有 3 人、来不及重启冷机（D）；夜班按当地劳动法计（中国《劳动法》第 44 条：延时 150%、休息日 200%、法定节假日 300%）。

**汇总表**

| 级别 | 负载类型 | 典型规模 | 时长 | 谁提供 | 报价行项目 | 依据 |
|---|---|---|---|---|---|---|
| L1 FAT | 厂内阻性/感性负载箱 | 设备额定 | 厂家程序 | 厂家 | 见证人·天、差旅 | Aggreko（C） |
| P1/L3 | 建筑实际负载 | 2–3% | 随进度 | 总包 | 0；前置条件 | aidc（D） |
| P2 冷站 | 热负荷（可与 P4 复用） | 约 15% | 各工况 | 视合同 | 台·天（可选） | aidc（D） |
| L4 柴发 | 阻＋感负载箱 | 机组 kVA | 见 UFGS 序列 | UFGS：承包商 | 台·天、电缆、燃油、校准仪表、记录员 | UFGS（A）、CSE（C） |
| L4 UPS | 落地式阻性 | 单路径约 92% | 每级 15–60 min，100% 8–24 h | 视合同 | 台·天×路径数、临时配电、操作员 | aidc（D）、知乎（E） |
| L4–L5 液冷 | 液冷负载箱 | 600–648 kW/台；液侧 87% | 逐级加热 | 租赁商＋机械承包商 | 台·天、换热器、软管、冲洗 | Aggreko、Crestchic（C） |
| L5 IST | 机架式 4–6 kW 或落地式＋围挡风管 | 100%；120–160 CFM/kW | 综合 ≥72 h（E）；黑启动约 40 min | 视合同 | 假负载台·天、集中控制、24 h 班组、电费、需量电费 | 腾讯（D）、BICSI（D） |
| P6–P8 | 真实 IT | 43%→100% | 白牌后 | 业主/集成商 | 只报见证人·天 | aidc（D） |
| 横向 | 收费级电表、记录仪 | 每个测点 | 全程 | 视合同 | 表计租赁、复测费率 | cxms（D） |

**三条可直接发甲方的澄清**
1. 临时负载与能源界面：L4（柴发、UPS 逐路径、冷站/CDU）与 L5 所需全部临时负载、电缆、风管围挡、燃油、测试电费（含需量电费）各由哪方提供、计入哪方合同价？如由我方提供，请给各级目标负载（kW/kVA 与功率因数）、液冷与风冷比例、UPS 路径数、柴发台数与额定。
2. 阶梯、时长与时段：负载阶梯与时长的合同依据（规范条款号）；每级保持、100% 持续、单机/子系统/综合最短时长；记录间隔；中断后续测还是重做；是否允许夜间与周末连续作业，有无用电、噪声、排放时段限制。
3. 复测、计量与相邻影响：基础报价含几次复测、超出部分计费与承担方；go/no-go 测点是否配收费级电表及点位表；负载箱排热排风与柴发排烟对相邻在用区域的影响由谁负责、如何隔离。

**验收**：为一个 2 MW IT、PUE 1.2、液冷比例 0.8 的项目，算出 P4、液冷负载箱台数与能耗区间，并写进 prebill 的资源假设表。

## 4e. CxM 日常管理：会议节奏、问题台账、门禁与证据、安全、工具

**为什么**：调试失败多半不是技术问题，而是信息没有闭环。

**做什么 1：节奏**
- GSA 最低要求：施工阶段每月一次调试团队会，参会人须有权代表本方决定；议程＝上期行动项 → 未关闭问题 → 进度 → 新问题。每月一份进度报告，含：进度状态、前瞻计划（look-ahead）、不满足 OPR 的系统、问题台账、测试数据、延期与季节性测试及原因、改进建议（共 7 项）。
- 数据中心行业惯例（非标准条文）：每周协调会＋2–3 周滚动计划；测试窗口期内每天开工前交底、收工复盘、问题当场录入。

**2：问题台账最小字段**（合并 UFGS 01 91 00.15 第 1.15 条、GSA、CxAlloy 的 Issue 对象）
1 编号；2 描述及违反的合同/规范条款；3 设备标签、位置、图纸号；4 提出人、首次发现日期；5 类别、优先级、责任方、到期日；6 来源（哪张 PFC/FPT/IST 的哪一行）；7 建议措施及日期；8 后续观察；9 关闭日期与确认人；10 状态。
- 规则：不得删除只能关闭（UFGS）；维护到全部解决或被业主接受（202 第 13.2.3 条）；不能行政关闭必须复测（BICSI 备考站）；“恢复运行不等于关闭缺陷”（iRecruit）。
- 可借鉴：深圳案例按高中低风险分级；VDC 课程（私下学习）的四级优先级与“复测费用由过错方承担”；mhshaon98/agent-skills 的 eng-report 问题列 ID | Description | Severity | Owner | Status（据早前仓库评估）。

**3：门禁与证据**
- “谁有权说这一级完成了”写进 Cx 计划。AIDC-Uptime-Workshop：每个决定只能有一个 A；L5 操作必须由将来要值班的人来做。
- 证据三态：见证过 / 作为文件被接受 / 没做（geese1028 仓库的提法可借用，但其书籍保留版权）。
- 复测：同一测试可有多次尝试（attempt），复测不覆盖首测（CxAlloy 数据结构）；失败与复测结果一并保留（robotjaol）。
- 开放 NCR 阻塞相关测试、证书锁定（anshuS1310/EPC-Data_Centre）。
- the-shovel 的 testing_commissioning 数据模型：performer/witness/approver；PASS/FAIL/CONDITIONAL_PASS/PENDING_WITNESSING；WITNESS/HOLD/REVIEW 点；失败自动生成 punch 项（据早前仓库评估，D）。

**4：安全**
- 每次故障注入都要有预先批准的回退方案（CxPlanner），完成 LOTO、满足 NFPA 70E。
- 每次注入都要有 MOP（Method of Procedure，方法程序/维护作业程序），列出 NO-GO 条件；BCxA 讲义要求承包商 MOP 写清逐步操作、安全要求、预计时长。
- 反复测试会让断路器累积几百次操作，造成隐性磨损（CSE）。
- 疲劳管理：WP148 建议白天做、轮班、连续高强度后避免周末加班。

**5：工具**
- 商用平台：CxAlloy、Bluerithm、Procore、Facility Grid；“用哪个平台、许可谁付、表谁建”本身就是报价澄清项。
- 免费可学：CxAlloy 公开 API 数据结构（第 6e 节）；CriticalArc 的 KPI 清单（问题账龄 >60 天、45–60 天；按承包商的 FPT 通过率）。
- 用什么：GSA 指南；UFGS 01 91 00.15；CxAlloy 网络研讨会《Accelerate Data Center Construction Through Commissioning Readiness》https://www.cxalloy.com/media/20200923

**验收**：①设计一张 12 列问题台账表头并说明“来源”列为什么重要；②解释复测为什么新建 attempt；③说出月报必须包含的 7 项。

## 5a. 必读标准与阅读顺序（一）：国际文件，先免费后付费，先读哪一章

**为什么**：标准分五层——流程层、数据中心专用层、判据层、分级认证层、中国标准层。平铺着读一定读不完。顺序：免费骨架 → 数据中心专用 → 判据 → 需要时再买原文。

**做什么 第一轮：免费流程骨架（第 1–3 周）**
1. GSA《Commissioning Guide》（2020，66 页）：四个阶段＋附录 A 责任矩阵。https://www.wbdg.org/FFC/GSA/gsa_commissioning_guide_2020.pdf
2. NEBB 讲解 202 的 42 页幻灯片：17 条目录、附录 A–O（B 文件矩阵、C 角色职责、K 问题日志）、多条 shall 原文；以 2013 版为例。https://www.nebb.org/wp-content/uploads/2021/09/NEBBinar_ASHRAE_202.pdf
3. Guideline 0-2019 Addendum a（2020-06-03 获批）：1.1（高于 202 的最低要求）与 2.2（范围 a–f）。https://www.ashrae.org/file%20library/technical%20resources/standards%20and%20guidelines/standards%20addenda/g0_2019_a_20200603.pdf
4. ACG Commissioning Guideline（2005，145 页）只看附录：A 调试服务 RFP 样本（对报价有用）、B 承包商责任、C 启动检查表（含 C-16 点对点）、D FPT 样表。
5. BCxA Best Practices V2.0（网站对抓取有拦截，用浏览器下载）https://www.bcxa.org/wp-content/uploads/2018/11/BCA-New-Const-Best-Practices-2018-05-14-V2.0.pdf
6. WBDG 调试专栏（免费文件总索引）https://www.wbdg.org/building-commissioning ；ASHRAE 各文件范围一览 https://www.ashrae.org/technical-resources/standards-and-guidelines/titles-purposes-and-scopes

**第二轮：数据中心专用（第 3–4 周）**
7. ASHRAE Guideline 1.6P 草稿（11-16 截止）。
8. BICSI 002-2024 在备考站的 16.1–16.3（原书 575 页、17 章、12 个附录，付费）。
9. Uptime《Tier Standard: Topology》（注册后免费）https://uptimeinstitute.com/resources/asset/tier-standard-topology ；科普 https://journal.uptimeinstitute.com/explaining-uptime-institutes-tier-classification-system/ ；TCCF 准备 https://journal.uptimeinstitute.com/tiercertificationpreparation/
10. TIA-942 一页纸 https://dcmag.fr/wp-content/uploads/2024/05/TIA-942-Standard_OnePager-230615.pdf
11. 施耐德 WP148 与 Vertiv 白皮书（第 4b、2 节）；Aggreko 负载箱白皮书 https://bynder.aggreko.com/m/34acbfd3f0f96433/original/AGK5006-1_loadbank-and-commissioning-for-data-centres_whitepaper_global_Apr2020-pdf.pdf

**第三轮：判据（第 7–9 周，按设备读）**
12. TM 5-694 第 5、6 章与附录 A 的 13 张 DA 表；配套机械手册 TM 5-697 https://www.wbdg.org/FFC/ARMYCOE/COETM/tm_5_697.pdf
13. UFGS 三份：01 91 00.15、26 08 00、26 32 15。
14. NFPA 110（注册后免费只读）https://www.nfpa.org/codes-and-standards/free-access ；先读 7.13 与 8.4，配合 Cummins 授权转载 https://www.cummins.com/sites/default/files/2021-02/External%20(Final)%20NFPA%20110%20Testing%20and%20service%20requirements%20for%20Standby%20Power%20Systems_12.15.2020.pdf 与西雅图、南达科他验收表；先确认适用性（第 3g 节）。
15. LBNL《Functional Testing Guide》：学 FPT 写法。
16. ANSI/NETA ATS-2025（新增 7.28 电池储能 BESS、7.29 光伏）与 ECS-2024（第 3 版，2024-07-02 获批，新增 UPS、ATS、PV 章节）；付费，只读你关心的设备章节，结构为“目视与机械检查 → 电气测试 → 测试值”。https://www.netaworld.org/standards/ansi-neta-ats 、https://www.netaworld.org/standards/ansi-neta-ecs ；NETA World 2026 数据中心验收测试文章 https://digitaleditions.sheridan.com/article/ANSINETA+Standards+in+Data+Center+Acceptance+Testing/5109321/860587/article.html
17. 电池：IEEE 450-2020、1188（2005 版已被 2025 版取代）、485-2020（付费，第 3g 节）。
18. 发电机：ISO 8528-5:2025；UPS：IEC 62040-3:2021（付费）。

**第四轮：付费原文（有项目或考证需要时再买）**
- ANSI/ASHRAE/IES Standard 202-2024：先读附录 B、C，再读第 6–13 条。https://webstore.ansi.org/standards/ashrae/ansiashraeies2022024
- Guideline 0-2019；Guideline 1.1-2025（暖通；“2025-01-13 发布、约 28 页”仅见于检索摘要，书店页未打开，**未核实**；常被引用的 CSE 文章讲的是 1.1-2007）；Guideline 1.4-2019（系统手册）；Guideline 13-2024（BAS，配套示例规范免费）。
- ISO/IEC 22237-1:2021（EVS 售价 212.09 欧元）https://www.evs.ee/en/iso-iec-22237-1-2021 ；EN 50600：海外 OPR 写“满足 AC3”时再读。
- ASHRAE 90.4-2022 事实页（免费）https://www.ashrae.org/file%20library/about/government%20affairs/advocacy%20toolkit/virtual%20packet/standard-90.4-2022-fact-sheet.pdf
- LEED v5：EAp3 基础调试；EAc5 增强调试（引 202-2024；选项 2 承诺 3 年 MBCx）https://leeduser.buildinggreen.com/credit/NC-v5/EAc5

**验收**：每读完一份写三句话：①回答了什么问题；②网站哪一页要引用；③引用到哪一条、哪个版本。

## 5b. 必读标准与阅读顺序（二）：中国标准链、GB 50462 全部附录映射、国际对照

**为什么**：国内项目“每一步要交的报告”主要来自国标附录的记录表；外资与海外项目用国际文件。两条线都要会，网站每个部件挂“双轨”两列。

**做什么：按工程顺序读**
1. **设计**：GB 50174-2017《数据中心设计规范》，2017-05-04 发布、2018-01-01 实施，替代 2008 版；13 章＋附录 A；A 级容错、B 级冗余、C 级基本；强制性条文 8.4.4、13.2.1、13.2.4、13.3.1、13.4.1；**无检测与验收章节**，验收看 GB 50462。https://www.gongbiaoku.com/mobile/book/9cn191161ft
2. **施工与验收**：GB 50462-2024《数据中心基础设施施工及验收标准》，2024-05-08 发布、2024-09-01 实施，替代 2015 版；强制性条文 5.2.10、5.2.11（条文内容需读正文）。第 14 章综合测试 14.1–14.13（温湿度、尘埃、照度、噪声、电磁屏蔽、接地电阻、供电电源质量、无线电骚扰与工频磁场、综合布线、静电防护、14.12 系统功能测试、14.13 设计负荷测试）；第 15 章竣工验收。第 14 章偏测量，不等于带故障场景的 IST。https://www.gongbiaoku.com/mobile/book/ju425808iun
3. **专业交接与调试**：GB 50150-2016（2016-04-15 发布、2016-12-01 实施），第 4 章同步发电机、第 23 章 1 kV 及以下配电装置及馈电线路、第 25 章接地装置、第 26 章低压电器；**没有 UPS 与蓄电池组章节**，这几行国标轨写“国标无对应，按厂家”。https://www.chinesestandard.net/PDF.aspx/GB50150-2016 ；GB 50243-2016（第 11 章系统调试、12 章竣工验收、附录 C 风管强度与严密性、附录 E 调试要求；英文版是商业译本）；GB 50166-2019（第 4 章系统调试、附录 E 调试记录）。
4. **验证测试专门标准**：YD/T 4628-2023《数据中心基础设施验证测试技术要求》（部分资料简称《数据中心基础设施验证测试》，以正式文本为准），工信部行业标准，2023-12-20 发布、2024-04-01 实施（日期只见于第三方销售网站）https://www.chinesestandard.net/PDF/English.amp.aspx/YDT4628-2023 ；T/CCAA 87-2024《数据中心基础设施测试与评估要求》，CQC 牵头，发布日期本轮未核实 https://cqc.com.cn/www/english/c/2024-09-10/597551.shtml
5. **运维**：GB/T 51314-2018（2018-09-11 发布、2019-03-01 实施）。web_resources 给的 ndls 链接打开后是 TIA-942-A，请改用 https://www.chinesestandard.net/PDF/English.aspx/GBT51314-2018
6. **新兴**：GB/T 48023-2026《数据中心冷板式液冷系统技术规范》，2027-02-01 实施，含试验方法；“首部液冷国标”是宣传说法，准确说是首部冷板式液冷系统国标。
7. **认证**：CQC 数据中心场地基础设施认证（测试＋现场审核与见证测试＋认证后监督）https://www.cqc.com.cn/www/en/col3510/595693.html
8. **香港**：建筑署 T&C 程序免费，附测试表与证书格式（**英文文件**）。电气 2022 版 https://www.archsd.gov.hk/media/publications-publicity/t-c-procedure-for-electrical-installation/ee_tcp2022.pdf

**GB 50462-2024 全部附录（只核到标题，表内栏目未核实；无附录 I 是国标惯例）**
A 配电系统验收记录表；B 防雷与接地装置验收记录表；C 空调系统测试记录表；D 线缆及光缆综合布线系统工程性能测试记录表；E 监控与安全防范系统功能检测记录表；F 电磁屏蔽室屏蔽效能测试记录表；G 电磁屏蔽室工程验收表；H 数据中心综合测试记录表；J 工程符合性验收表；K 工程竣工验收表。

**各链映射**
- 电力链（UPS、柴发、ATS、开关柜）：A（安装、配电盘、电池安装、分段送电）、B（接地）、E（报警上传）、H（功能与负荷测试、供电质量）、J（设计送审与问题闭合，推断）、K（系统手册与竣工）。
- 冷却链与水系统：C（空调测试）、H（综合测试）、A/B 只涉及接口（UPS 室空调、发电机房通风）。
- 控制与监控：E；网络布线：D；屏蔽室：F、G。
- **国标轨四个结构性缺口**：没有 L1 FAT 记录表；没有燃油系统附录表；附录表没有停留点/见证点/签认人栏（可按 AIDC 的 ☆/◆ 加列）；没有 NFPA 110 式冷启动计时记录（可把南达科他表第 1–12 项并进附录 H）。

**编号/年份待核实（本资料未验证，勿直接引用版次）**：GB 50303、GB 50339、GB 50312（可能与附录 D 交叉）、GB 50116、GB 50263。核实路径：工标库或国家标准全文公开系统查现行/废止与替代关系。

**查条款工具**：arcwei2060.site（77 份标准、258 条结构化要求，可按专业、指标、房间筛选）https://arcwei2060.site ；局限：GB 50462 只有 5 条；专有许可，数据不能复用。

**国际与国内对照**

| 问题 | 国际依据 | 国内依据 | 备注 |
|---|---|---|---|
| 调试流程 | ASHRAE G0、Std 202、GSA | 无直接对应；YD/T 4628、T/CCAA 87 最近 | 国内多为“施工验收＋第三方验证测试” |
| 电气单机合格值 | NETA ATS-2025 | GB 50150-2016 | 都付费 |
| 暖通调试 | ASHRAE G1.1、LBNL FTG | GB 50243 第 11 章 | 英文版为商业译本 |
| 消防联动 | NFPA 2001 附录 C | GB 50166 第 4 章 | 气体灭火国标待核实 |
| 综合测试/IST | 1.6P、BICSI、Uptime | GB 50462 第 14 章、附录 H | 带故障场景的 IST 要在合同另写 |
| 设施等级 | Tier、TIA Rated、EN 50600 AC | GB 50174 A/B/C | 只能概念对照 |
| 柴发验收 | NFPA 110 第 7.13 节（仅 EPSS） | 本资料未核实国内对应条文 | 以设计文件和合同为准 |
| 运维移交 | Std 202 第 14–17 条 | GB/T 51314 | – |

**验收**：UPS、冷机、火灾报警三类设备，每类写一行“国标附录表号＋国际模板出处”。

## 6a. GitHub 资源（a）：Claude Skill 格式、可安装的——逐个说补什么、怎么装、坑在哪

**为什么**：先知道“现成的能补哪块、不能补哪块”，才知道自己要建什么（第 7 节）。结论：本次检索与早前 19 个仓库评估都没找到开源 Skill 能完整覆盖数据中心 L0–L6 调试管理。

**做什么：通用装法**
- 个人技能放 ~/.claude/skills/<技能名>/SKILL.md；插件型用 /plugin marketplace add <owner/repo>。
- 装前先通读 SKILL.md 和它引用的文件；第三方技能会改变 Claude 的回答方式。只复制需要的单个文件夹。

**用什么（按对你的价值排序）**
1. **jordanstahr/cx-fee-estimate**（MIT；真实 CxA 公司 SES 的 Claude Code 插件）https://github.com/jordanstahr/cx-fee-estimate
   - 补：报价工作量拆解（设备清单 → WBS 工时 → 人工、软件、差旅）、抽样比例并在提案中显示、Div 01 调试章节缺失检查、RFI 范围澄清邮件、假设备忘录；agents/cx-reviewer.md 的“准确性门禁”（引原文、自我反驳、不向客户引规范条文）。
   - 坑：针对美国普通建筑与医疗，无数据中心白区与 L5 IST 计价行；模板带公司品牌、测试夹具有真实客户名；cx-reviewer 引用的 cx-doc-review 文件不在仓库。
   - 建议：拆思路并入 prebill，不原样安装。
2. **mbcoalson/mat-skills 的 writing-oprs**（MIT）https://github.com/mbcoalson/mat-skills
   - 补：OPR 写成可量化判据，模板句“[系统] 应 [动作] 达到 [目标] [容差] [条件] [验证方法]”；按阶段的 CxP 工作清单（OPR_2022_HS.md 约 455–491 行 32 项）；承包商移交包表格。
   - 装：git clone 后 cp -r mat-skills/writing-oprs ~/.claude/skills/
   - 坑（据早前仓库评估）：零数据中心内容；部分引用文件缺失；两份 OPR 模板是 Word 转 Markdown，有乱码与原客户信息残留。
3. **Construction-Gamma/construction-gamma-skills**（专有：Skills Library License v1.0，按席位年度付费订阅，禁止再分发）https://github.com/Construction-Gamma/construction-gamma-skills
   - 补：data-center-construction 与 commissioning-closeout 两技能，含 L1–L5、38 个 IST 场景、10 段 IST/FPT 程序结构、负载箱与 OPR/BOD 内容。
   - 坑：总包 PM 视角；SKILL.md 与 IST 参考文件对 L4/L5 定义矛盾；负载箱文件把 NFPA 110 每月运行与年度附加负载试验混成一条，且漏了验收 2 h 满载与冷启动试验。
   - 建议：没有订阅不要装。
4. **Griffing-Technology-LLC/engineering-pe-skills**（CC BY-ND 4.0）https://github.com/Griffing-Technology-LLC/engineering-pe-skills —— 电气（标幺值、短路、配合、弧闪框架）与控制（PID、阀门失效位、4–20 mA）基础；每条引用标 VERIFIED/REQUIRES VERIFICATION 的好习惯。不讲调试；README 写 12 个技能实有 9 个；ND 许可不允许改后再分发。
5. **ArchSightLabs/archsight-aios**（Apache-2.0）https://github.com/ArchSightLabs/archsight-aios —— 招标评分点响应矩阵、废标风险、变更签证证据链；条款表按“对象/条件/判定/例外/来源”；缺来源时返回 need_context/not_found/conflict。适合并入 prebill。无数据中心内容；不要运行 install --target all。
6. **6HssNipEr/wind-farm-grid-commissioning-skill**（MIT，简体中文）https://github.com/6HssNipEr/wind-farm-grid-commissioning-skill —— 中文调试 Skill 骨架：M0 口径确认规则（先问用哪套规范再给数值）、10 列验收表、模式库（症状 → 诊断 → 整改 → 复验）。内容是风电并网；references/模式库.md 已损坏（M7 截断、M8/M9 缺失）。
7. **log-wade/datacenter-mcp-server**（MIT，MCP 服务器）https://github.com/log-wade/datacenter-mcp-server —— dc_generate_commissioning_plan 按级别生成通用程序；L4 随 Tier 升级（基础 IST → Tier III 加并行维护模拟 → Tier IV 加故障注入）是好的教学阶梯；11 个默认系统清单。坑：级别编号非主流（L3＝FPT、L4＝IST、L5＝季节性）；只有模板没有判据；已知工期 bug（6 MW Tier IV 报约 210 周）。
8. **可借格式的其他仓库**（均据早前评估）
   - K-Dense-AI/scientific-agents（MIT）https://github.com/K-Dense-AI/scientific-agents —— hvac-engineer 等档案可作“AI 评审员”，不教 L1–L5。
   - mhshaon98/agent-skills（MIT）https://github.com/mhshaon98/agent-skills —— eng-report 的 FAT/SAT 测试报告骨架与结果表列 Test ID | Description | Expected | Actual | Pass/Fail | Deviation；commissioning-logger 是工业自动化调试日志，不是数据中心。
   - rade-nugroho/Agentic-Enteprises-Skill（MIT）https://github.com/rade-nugroho/Agentic-Enteprises-Skill —— G0–G5 就绪门禁表，内容很薄。
   - timjrobinson/Claude-Code-Construction-Manager（MIT）https://github.com/timjrobinson/Claude-Code-Construction-Manager —— 35 行 commissioning-agent 卡写清“不得设计、不得修、不得接受不满足 OPR 的系统”；但把 CxA 放在 QA 负责人之下，会误导。
   - Tibsfox/gsd-skill-creator https://github.com/Tibsfox/gsd-skill-creator —— physical-infrastructure 包的预功能测试单与带停留点的安装顺序；许可证不一致（LICENSE 为 BSL 1.1，package.json 写 MIT），AI 草稿，标准引用有误。
   - xiaocaioh14-arch/idc-inspection https://github.com/xiaocaioh14-arch/idc-inspection —— 中文 Skill 范例：口述 → 红橙绿分级 PDF；属运维尽调，不是调试。
9. **不推荐**
   - lionelsimai/claude-skills-collection https://github.com/lionelsimai/claude-skills-collection ：5,148 个模板空壳，commissioning-plan 只有一句话。
   - majiayu000/claude-skill-registry：只当搜索引擎用 https://majiayu000.github.io/claude-skill-registry/ ，不要克隆 3.7 GB 指针存根。
   - geese1028/data-center-field-guides：SKILL.md 为 MIT，但 AI/SEO 套话、标准出处错配（称 Guideline 0 定义 Level 0–6），书籍保留版权。
   - 低分：yemugua/agent-skills、theneoai/awesome-skills（批量生成的填充内容）。

**验收**：装好 writing-oprs 后让 Claude 写“10 MW Tier III 数据中心 OPR”，逐条检查数值、容差、条件、验证方法；不合格的自己改写，并记下这个 Skill 缺什么。

## 6b. GitHub 资源（b）：繁体/简体中文教学站——读哪些、什么顺序、怎么避坑

**为什么**：中文材料能大幅降低入门成本，但这批站点版权与准确性风险都高，必须带着“只学结构、数字重核”的规则读。

**三条提醒**
- ekcwilson-git 系列几乎都是繁体中文、台湾用语（試運轉、監造、標），都没有 LICENSE 文件（默认保留所有权利）：可以学，不要转载。转简体用 OpenCC 的 tw2sp 或 t2s。
- 多数内容 AI 辅助生成：可疑引用（把草案 1.6 当已出版的“ASHRAE Guideline 1.6”）、反复出现 99.982% 可用度、仓库间 L 级定义对不上。
- 两门课取材自真实客户（VDC）的专有或保密文件，只能私下阅读。

**做什么：推荐顺序（先治理 → 再场景 → 最后专题）**
1. **AIDC-Uptime-Workshop**（质量 7、Cx 相关度 8）https://github.com/ekcwilson-git/AIDC-Uptime-Workshop ；在线 https://aidc-uptime-workshop.vercel.app/
   - 按 03 → 04 → 05 → 06 → 09 → 11 读：Cx 计划门禁、各级证明什么、L5 场景矩阵（N-01 正常、M-01 FWS 隔离、M-02 CDU 退出、F-01 拔插头、F-02 BMS 失效）、见证日站位、单一 A 的 RACI。
   - 坑：每页正文约 3–5 KB，是提纲；sources 页引“ASHRAE Guideline 1.6”须自核。
2. **aidc-uptime-cx-learn**（30 课）https://github.com/ekcwilson-git/aidc-uptime-cx-learn ；在线 https://aidc-uptime-cx-learn.vercel.app
   - 先读 S07（L1–L5 门禁、三类 punch、风险接受）、S25（9 项活动 × 8 个角色 RACI）、S12（拔插头 T0–T9 时间线，可直接做动画关键帧）、S06（TCDD/TCCF/TCOS）。
3. **ashrae202-commissioning-course**（24 章）https://ekcwilson-git.github.io/ashrae202-commissioning-course/
   - 按 Ch04 → 06 → 07 → 12 → 13 → 17 → 19 读；每项活动对应到 202 条款，讲 Table A1 文件矩阵与 B1–B3 抽样规则；2024 版变化讲得准确。
   - 坑：案例数字（437 条 issue）是编的；figs/ 为 ASHRAE 表格截图有版权；“>100% 抽样”指多名独立检查人，不是见证 6 倍设备。
4. **-l5-ist-tccf-teaching**（无在线版）https://github.com/ekcwilson-git/-l5-ist-tccf-teaching
   - 可用：L1–L6 每级交付物与负责人表、IST 前提与判据表、四条链结构。
   - 已知错误：判据表与测验写“UPS 转电池 <4 ms”（另一处又说双变换在线式 0 ms，前后不一）；把 ASHRAE A1“允许范围”15–32 °C 写成“推荐范围”；把 L1–L5 归到 ASHRAE/NIBS。
5. **tier3-cx-teaching** https://ekcwilson-git.github.io/tier3-cx-teaching/
   - 14 个 LV5 场景（不是 13 个），每个按“准备 → 注入 → 观察 → 判定 → 恢复”写并附通过与中止判据，可直接当 IST 页面模板；LV4→LV5 六项门禁。
   - 坑：FMEA 等级标签与自身阈值矛盾（24、27 标“中高”）；复用前自己重排。
6. **tier3-risk-story** https://ekcwilson-git.github.io/tier3-risk-story/ —— 备胎、器官、多米诺、疫苗四个比喻讲 IST 价值，适合讲给客户听；把冷冻水与冷却水回路说混了。
7. **专题**
   - ashrae-gl13-2024-teaching：BAS 点对点（“100% 點數簽認，零未決”）。
   - ashrae-tc99-datacenter-learning：液冷背景知识；“筆者曾…”开头的经历是编的。
   - tbcxa：cdu-hlt 热负载测试课扎实（设计基础 340 kW、51,000 CFM、6+1 CRAH、故障注入 → 观察 → 复归 → 再确认闭环）。它含 CNS 标准原文和客户调试计划，属于他人的保密材料——只学方法，不要转载或传播。
   - ashrae-gl13-2024-knowledge-site：数字有错，跳过。
8. **只限私下学习**
   - vdc-cx-course-website：业主规范级细节（30/15/10/5 工作日审批链、BAS Online 十条件、复测费由过错方承担、L5 后 48 h 内开完工证书）——是一个业主的要求，不是行业规范。
   - vdc-cxa-course-website：转载真实客户 BoD 原图，保密风险高。

**简体中文资源**
- **Cao-Shuang/jd-datacenter-course** https://cao-shuang.github.io/jd-datacenter-course/ ：10 章 56 课（不是 62 课），“预测 → 证据 → 修正”教学法很好。读 5-7（柴发验收与“能力声明—测试工况—证据矩阵”）→ 10-2-power → 10-2-cooling → 3-5 → 7-6。几乎没有 OPR、L1–L5、IST；网站公开整本书扫描内容有版权风险——只链接不复制。
- **yanpei446505484/data-center-english-training** https://github.com/yanpei446505484/data-center-english-training ：81 个运维场景、2,600 句中英对照，练和外资 CxA 沟通；调试词汇少（缺 IST、FAT、PFC、OPR/BOD）。
- **TaiMaBenJi/knowledge-commons** 机房管理系列（运维向，非调试，低分）https://taimabenji.github.io/knowledge-commons/learn/

**验收**：用 OpenCC 转换 S07，写出你自己的“L4 → L5 门禁清单”，标明哪几条来自原文、哪几条是你补的。

## 6c. GitHub 资源（c）：清单、工作台与知识库——能改造成“部件 × 级别 × 文件”的素材

**为什么**：第 3b 节的数据模型需要“行”。这些仓库提供现成的条目、字段和判据写法，但许可证与准确性差异很大，每条都要标来源等级。

**做什么 / 用什么**
1. **datacenter-cx-checklist**（**繁体中文＋英文**对照）https://ekcwilson-git.github.io/datacenter-cx-checklist/ —— L0–L6 共 156 项，L0 占 62 项；用 L0 清单做项目级交付物总索引（OPR、BOD、Cx 文件清单、RACI、L4/L5 脚本、负载箱方案、因果矩阵）。坑：译自来源不明的第三方 Excel；L0-27 到 L0-62 像凑数；状态列是静态文字。
2. **AIDC-*-L2L3-Review 工作台**（同一作者，繁体中文，无许可证，模板来自鸿海龙庆 AIDC）
   - 电气 https://aidc-elec-l2l3-review.vercel.app ：15 个设备对象（含两组近似重复，独立设备类约 12 类），L2 342 项、L3 341 项，每项标 ☆ 停留点或 ◆ 标记；规则“L2 禁止系统受电；L3 用试验电源并须通过 FIV 门禁”。
   - 暖通 https://aidc-hvac-l2l3-review.vercel.app ：12 类、L2 319 项、L3 326 项；CDU 与 PG25 条目公开资料少见（±10% 等为合同示例）。
   - 消防 https://aidc-fire-l2l3-review.vercel.app ；弱电 https://aidc-elv-l2l3-review.vercel.app （只看 BMS/SCADA、PLC 盘、超音波流量计三表）。
   - 用法：导出 CSV → OpenCC 转简体 → 对应国标条文 → 挂到部件页。约 146 处判据写“依合约/原厂/IOM”；按 ☆/◆ 数量估见证工时只能粗略参考。
3. **GDC-TPC-IST-Checklist**（**繁体中文**）https://ekcwilson-git.github.io/GDC-TPC-IST-Checklist/ —— 来自真实 IST 计划的离线勾选 App：IST 开始门禁（承包商自检 → 监造复核 → 业主签认）、人员与校准仪器清单、44 个 VMP 可并行维护场景、UPS 脚本把输出来源 normal(3)/bypass(4)/battery(5) 与 DCIM 比对。坑：5 个 VMP 编号重复（VE4、VEG6、VI1、VI2、VM10）；含真实承包商名称和地址，只供私下学习。
4. **DatacenterGuidelines/open-engineering-notes**（CC BY 4.0，署名后可翻译复用）https://github.com/DatacenterGuidelines/open-engineering-notes —— IST 前就绪门禁、两份 IST 脚本（BMS 通讯中断；控制器与服务器失效）、控制系统 FMEA 提示。配套网站 https://datacenterguidelines.com 正文有版权，只能转述。
5. **robotjaol/datacenter**（MIT）—— OPR 每条带验收证据、需求追溯 CSV（OPR → 设计 → 计算 → 验证）；“失败结果与复测一并保留”；“陈旧数据优先于看似健康的信号”。
6. **modernecotech/OpenSourceDataCentre**（文档 CC BY 4.0）—— 证据登记 CSV 字段 evidence_id、level、test、owner、acceptance、criticality、status；它把 L4 定为 IST，复用前改回主流编号。
7. **Yeongje-Kim/cx-preflight-edge**（Apache-2.0，韩文）—— 机器可检查的脚本字段与 PF01–PF06（第 4b 节）。
8. **pnnl/ConStrain**（BSD）—— 63 个基于 ASHRAE G36 与 90.1 的趋势验证项；冷冻水重设一项的检查比说明更松（无法发现缺失的重设），只学结构。
9. **ACE-IoT-Solutions/corona-digital-cx**（CC BY-SA）—— BACnet 与点位命名验证、数字调试负责人（DCA）角色；复制须保持同许可证。
10. **thediversecandidate/GenesisAI**（pyproject 声明 MIT，但仓库无 LICENSE 文件；单次提交、AI 生成）https://github.com/thediversecandidate/GenesisAI —— 748 行中压开关柜调试工作手册：文件分类、8 阶段顺序、六问差距分析框架、P1–P4 优先级、绝缘/PI/耐压/真空/接触电阻/分合闸时间/接地/VLF 数值判据、5 方签字链；8 列测试表结构（测点、方法/标准、参数、实测、判据、通过/失败、技师、时间）。坑：有错误引用（如“NETA ATS 2023”并不存在），复用前逐条核对；只覆盖中压开关柜，对应约 L1–L3。
11. **通用知识卡（均为英文表格速查，无引用）**：tanyunhao/bim-agent 与 DharshanParasu/RevitMCPBridge2026 的 knowledge/commissioning.md（443 行）提供问题台账字段与 FPT 程序骨架（Objective / Prerequisites / Equipment / Procedure / Expected / Actual）；读取上游文件 https://raw.githubusercontent.com/DharshanParasu/RevitMCPBridge2026/HEAD/knowledge/commissioning.md 。坑：bim-agent 无许可证；“Tier IV 柴发 72+ 小时”等数值有误。
12. **bopoadz-del/the-shovel**（MIT）https://github.com/bopoadz-del/the-shovel —— testing_commissioning 程序记录的数据模型（第 4e 节）；“Load Bank Test – IEEE 450”属错配（IEEE 450 是电池标准）。
13. **shenoyabhijith/requirements**（无许可证）https://github.com/shenoyabhijith/requirements —— 24 张 AI 起草的调试需求卡，每张一个 SHALL＋量化参数表＋三级符合性评价；含“在运营 GPU 集群旁扩建调试”等 AI 机房角度。
14. **lpolovets/reference**（无许可证）https://humbaventures.com/reference/data-center-infrastructure/ —— 35 个数据中心系统条目（每条含关键数字与延伸阅读），条目 34 讲 Tier 与调试；适合按“供电 → 后备 → 风冷 → 液冷 → 排热 → 设施 → 机柜”顺序补背景，不是调试操作手册。
15. **其他**：thediversecandidate/GenesisAI 之外的 mohamedgamal6m5g7/air-cooled-chilled-water-automation（只有 README，但给出冷站加减机阈值：>90% 负载持续约 5 min 加机、<80% 持续 10 min 减机、20 min 防频繁切换）。

**非 GitHub 的免费母版**：UFGS、TM 5-694、ACG 附录、香港 ArchSD 表格、Cx Associates OPR 样本 https://www.cx-associates.com/hubfs/OPR%20CxAssoc%20Example.docx

**验收**：用三份材料拼出你自己的“柴发 L3/L4 文件包目录”（≥8 份）：AIDC-ELEC 柴发 L3 清单＋UFGS 26 32 15＋西雅图验收表，并对照第 3d 节自查。

## 6d. GitHub 资源（d）：模拟器——练 IST 思维和故障判断

**为什么**：CxA 的核心能力是“预想故障 → 写脚本 → 判定结果”。没有现场时用模拟器练，每玩一个场景就写一行脚本。

**做什么 / 用什么**
1. **samfclement/Data-Center-Commissioning**（本批最好）https://samfclement.github.io/Data-Center-Commissioning/
   - 从规划（OPR/BOD 评审、Cx 计划、风险登记）到 L1–L5 与移交，约 189 个活动；L5 有 10 个可回放场景；每个数值标依据类型，并明说 L1–L5 只是行业惯例。
   - 用法：切 Plain English 按阶段走；英文吃力时第一遍开浏览器翻译。级别门禁信息分散在各测试的前提条件和“performedBy”里，需要你自己汇总。
   - 坑：无 LICENSE、代码压缩，只能学；标为“standard”的数值只有约 12 个，其余是项目值或示意值。
2. **samfclement/Data-Center-Troubleshooting** https://samfclement.github.io/Data-Center-Troubleshooting/ —— 35 个场景、97 个故障变体；只有拿出能排除其他可能的证据诊断才算对。先做 A 类（UPS）与 B 类（柴发/ATS）。英制单位要换算；偏运维。
3. **NishikawaButterfly/dc-twin**（MIT）https://dc-twin.fly.dev/ —— 确定性容量仿真；参考场景 PDU-B 维护 → A 路失电 → 柴发 A 拒启，UPS 120 kWh 以 1.6 MW 放电 270 s，可手算核对（第 4c 节）。只有电气有功，无冷却侧；用 HEAD 请求检测会误报 404，直接用浏览器打开。
4. **Skeeter-spec/power-service-toolbox**（AGPL-3.0）https://skeeter-spec.github.io/power-service-toolbox/ —— 8 个经过核对的电气工具；工具 01 加载 WP75 图 5 移除 PDU 1 找单点故障 https://skeeter-spec.github.io/power-service-toolbox/projects/01-power-chain/build/index.html ；工具 03 是 ATS 时序。各工具要用完整路径 /projects/NN-*/build/index.html；08（NETA 清单）与 09（调试脚本运行器）还是空壳；AGPL 代码不要复制进你的网站。
5. **jamesccupps/CoolingTowerSim**（MIT）https://jamesccupps.github.io/CoolingTowerSim/ —— 用真实趋势校准的冷却水回路；在“现场实际程序”与“设计控制顺序”之间切换，强制水泵 HAND 看触发哪个报警——程序和设计对不上正是 FPT 要抓的。办公楼冷却塔、英制单位。
6. **dmvevents/aidc-calculator**（MIT）https://dmvevents.github.io/aidc-calculator/ —— commissioning 页的 P0–P8 通电阶梯与 L0–L6 标签表（第 4d 节）；risks 页 116 个失效模式（COMMISSION 阶段计数有 44 与 32 两个说法，见第 4c 节）。部分推导引用仓库外私有资料。
7. **platformps/Module-524-Critical-Facilities-Technician-Day-One-Readiness** —— 一门真实课程的 16 个实验：负载箱六参数记录、单线图路径追踪、EOP/SOP/MOP 分类、MOP 回退。仓库根页面 404，直接打开具体实验文件；无许可证。
8. **TexanAlph/gridforge**（MIT）https://do-roan.vercel.app —— 15 课分支决策训练（双电源幻象、2N 维护窗口、ATS 状态不一致）；内容全部由 AI 撰写、无专家审核记录、正确答案套路固定。
9. **anshuS1310/EPC-Data_Centre**（无许可证）https://epc-data-centre-frontend.onrender.com —— 可点击的 L1–L5 清单与“开放 NCR 阻塞测试、证书锁定”演示；Render 冷启动需等 60–90 s；19 条清单均为模拟数据，级别命名不规范。
10. **不推荐用于学调试**：HaZy-RL/DCTtraining（IT 技术员，非机电调试）；Rowling4060/cdu-simulator（有事实错误）；3D 类 XdruidR/clonee-hyperscale-dc-explorer 与 dsanusi/white-space 放到第二部分讲。

**练法**：每玩完一个场景写一行：初始状态 / 注入故障 / 预期响应 / 判据 / 恢复步骤 / 谁操作、谁见证——直接用第 4b 节 11 列格式。

**验收**：做完 samfclement 的 10 个 L5 场景后，独立写出其中 3 个的 IST 脚本，并用 dc-twin 的算法复核一遍 UPS 后备时间。

## 6e. GitHub 资源（e）：调试管理工具与数据模型参考——学结构，不抄代码

**为什么**：第 3b 节的模型不是凭空设计的。商业平台和开源原型已经回答了“设备、检查表、测试、复测、问题怎样关联”，学它们的结构可以少走弯路；但多数仓库无许可证或泄露真实数据。

**做什么 / 用什么**
1. **CxAlloy TQ 公开 API** https://api.cxalloy.com/ —— OpenAPI 文档公开可读，调用才需要密钥。层级：Project → Building/Floor/Space；System → Equipment（attributes 存厂家、型号、序列号）；Checklist → Section → Line；Test → Attempt（复测另起一条）；Issue（source_type/source_id 追溯来源表格）。最好的免费蓝本。
2. **thediversecandidate/cxms-platform**（MIT）https://github.com/thediversecandidate/cxms-platform —— 每台资产有调试深度等级 doc_tier 与 L0–L5 门禁证据链接；保修只能在 L5 IST 通过且有证据后起算；降级 Tier 1 资产需业主与 CxA 双签；15 条授标前规范完整性问题（负载箱热影响、计量表、保修起算等）可直接变成 prebill 澄清条目。坑：AI 每周自动构建；法规层只有加州 Title 24；设计文档放在返回 404 的仓库。
3. **samtindal/cx-ledger**（无许可证）—— Ready/Blocked/Open 就绪规则（第 3b 节），可直接当 3D 部件着色逻辑；设备是普通暖通电气。
4. **CriticalArccx/Switch-DataCenter-Dashboard**（无许可证）—— 真实级别分类 L1 Site Acceptance → L2a/L2b/L2c → L3；问题状态“Delayed Until After IST”。仓库提交了约 60 MB 真实项目数据库——不要打开、不要传播。
5. **jack-weinheimer-dg/EPMS-CX-Report-Generator** —— L3 EPMS 汇总规则与按区域的每日阻塞清单；同样泄露真实客户数据，只学规则。
6. **Mithu2706/Commissioning_Readiness_Intelligence** —— 前提依赖图 FAT → L2 → 通电 → 启动 → 负载测试 → 切换 → IST → 移交可借用；它自己把 IST 同时叫 L3 和 L5，数据物理上也说不通。
7. **XdruidR/clonee-hyperscale-dc-explorer** —— 把调试建模成“移交包＋阶段＋证据”，能回答“这个机柜为什么还不能验收”（常见原因：冷却包阻塞）。详见第二部分。
8. **eakarsu/ai-data-center-construction-coordinator**（无许可证）—— 模板生成的空壳，只有“Test scripts, systems, load banks…”一句调试文字；不推荐，最多借 featureSurfaces 的字段名（evidenceSource、evidenceVerified、approval、nextStep）。
9. **商用平台公开页**：Bluerithm 模板页（需试用账号）https://bluerithm.com/free-bluerithm-templates/ ；Bluerithm 数据中心页（把测试链接到 3D/BIM 模型的模式）https://bluerithm.com/data-center-commissioning/ ；Facility Grid（从规范生成检查表）https://datacenterdynamics.com/en/product-news/facility-grid-launches-tailored-solution-for-data-centers

**一个建议**：甲方若已指定平台，你网站的部件文件清单要能导出成 CSV，方便导入这些平台。

**验收**：画出你自己的实体关系图（Component、Deliverable、Test、Attempt、Issue、Gate），并在图上标出 CxAlloy 中对应的对象名。

## 7a. 用 Claude 把这些变成你自己的 Skill（一）：分工、目录结构、版权规则、prebill 扩展

**为什么自己建**：现有 Skill 有三种问题——讲的不是数据中心；许可证不允许改；内容是 AI 凑的。你已有网站知识页和 prebill，最省力的是建 3 个小而准的 Skill，各管一块。

**做什么：分工**
1. **dc-cx-mentor（导师）**：教学、答疑、出题、批改；每个回答按“为什么/做什么/用什么/怎么验收”展开，写明出处与核实状态。
2. **cx-level-docs（五级调试文件清单）**：输入部件＋级别（可全选）＋口径（国际/国标/合同）；输出文件清单、判据来源、谁执行谁见证、门禁、缺失项。数据来源：第 3b 节矩阵 CSV（第 3c、3d 节可直接录入）。
3. **cx-script（FPT/IST 脚本助手）**：输入 OPR 条目、SOO、点表；输出 11 列脚本行；内置 PF01–PF06 自检、NO-GO 清单、iRecruit 11 项表头完整性检查（第 4b、4c 节）。
4. **prebill（已有）**：读 cx-level-docs 的 test_id 与 cx-script 的脚本行数、见证点数作为工作量底稿；新增负载箱与 IST 资源假设表（第 4d 节）。

**目录结构**（个人技能放 ~/.claude/skills/；Claude 应用可在设置里上传技能文件夹，入口以你所用版本为准）
```
dc-cx-mentor/
  SKILL.md
  references/
    00-口径与引用规则.md
    01-概念与角色RACI.md
    02-分级与门禁.md
    03-流程主线与CxM管理.md
    04-标准索引.csv   # 标准号,版本,条号,自己的话摘要,免费/付费,URL,来源等级,核实状态
    05-术语表.csv
    06-误区与自检.md
    quiz/题库.md      # 题目,答案,出处,难度
cx-level-docs/
  SKILL.md
  references/
    matrix.csv        # component,chain,level,test_id,doc_id,deliverable_zh,deliverable_en,template_source,criterion,unit,standard_ref,edition,grade,nature,performer,witness,signoff,gate,gb_track,source_url
    components.md     # 部件与别名(简/繁/英)
    gates.md
    cn-mapping.md     # GB 50462 附录 A–K 与国际模板对照
cx-script/
  SKILL.md
  references/
    row-format.md     # 11列+中止/回退
    preflight-codes.md # PF01–PF06
    no-go.md
    examples/2N-utility-loss-gen-fail.md
prebill/              # 已有,新增:
  references/cx-scope-checklist.md
  references/loadbank-ist.md
```

**内容来源与版权规则**（写进 00-口径与引用规则.md）
- 只放自己写的摘要并标来源 URL；不复制：VDC 课程、Construction-Gamma、tbcxa、书籍扫描件、ASHRAE 表格截图、含真实客户数据的仓库（GDC-TPC、CriticalArc、EPMS 报告器）。
- 按许可证处理：CC BY 4.0（DatacenterGuidelines、modernecotech 文档）与 MIT（mat-skills、robotjaol、dc-twin、cxms-platform）署名后可复用；CC BY-SA 复制后须同许可；CC BY-ND 只能链接；AGPL 代码不要嵌入；无许可证者只学思路。
- 每个数值标来源等级 A–E 与数值性质（一手/二手/示例/合同定值）；M0 规则（借自风电 Skill）：用户没说口径时先问再给数值。

**prebill 新增 cx-scope-checklist.md（范围边界）**，至少列：
- 从第几级介入；见证 100% 还是抽样（比例、每批最少几台）。
- FAT 出差次数与天数；脚本谁写、谁审批、提前几天提交。
- 负载箱谁提供、多少 kW、租多久，燃油、临时电源、测试电费与需量电费归谁（第 4d 节三问）。
- 夜班与周末计费；免费复测次数、超出单价；未就绪复查费（业主向施工方回扣）。
- 系统手册与培训由谁负责；季节性测试与保修第 10 个月复查是否包含；是否包含 MOP/SOP/EOP 编写。
- 调试平台与许可费；是否配合 Uptime TCCF 或 CQC 认证。
- 口径：ASHRAE/Uptime 还是 GB 50462/YD/T 4628；柴发是否被指定为 EPSS。
- 参考：cx-fee-estimate 的范围门禁与假设备忘录；archsight-aios 的响应矩阵；密西西比州 CxA 合同范本（费率按施工造价对数递减：X/log10(造价)，X 取 5–11）https://www.dfa.ms.gov/sites/default/files/Bureau%20of%20Building%20Grounds%20RPM%20Home/Forms%20and%20Information/Professionals/Miscellaneous/AE%20Prof%20Contracts/Cx%20Contract%20Sample%20for%20web%20112022.pdf

**验收**：给 4 个 Skill 的 description 各写一句“何时用、何时不用”；测试：问“UPS 在 L3 要交什么”只触发 cx-level-docs；“帮我写柴发拒启 IST 脚本”只触发 cx-script；“帮我报这个项目”触发 prebill。

## 7b. 用 Claude 把这些变成你自己的 Skill（二）：SKILL.md 骨架、skill-creator 迭代、测试题

**为什么**：Skill 的价值在于“不编造”。骨架里要把口径确认、引用规则、缺项处理写死，再用测试题量化效果。

**做什么 1：dc-cx-mentor 的 SKILL.md 骨架**
```
---
name: dc-cx-mentor
description: 数据中心调试管理（CxM）与调试代理（CxA）学习导师。用户问调试概念、角色与RACI、L0-L6分级与门禁、OPR/BOD/Cx计划、FWT/PFC/FPT/IST、问题台账、移交、标准阅读顺序、认证与职业，或要求出题、批改时使用。报价交给 prebill；某部件的文件清单交给 cx-level-docs；写脚本交给 cx-script。
---
# 数据中心调试导师
## 0 口径确认（必须先做）
- 用户未说明时先问：国际（ASHRAE G0/202、Uptime、NETA、NFPA）、国标（GB 50462、GB 50150、GB 50243、YD/T 4628）还是项目合同。
- 涉及L1-L5时说明：行业惯例，以合同和调试计划为准。
- 涉及NFPA 110时先问：AHJ或合同是否把柴发定为EPSS。
## 1 回答格式
为什么 → 做什么 → 用什么（资源、条号、版本）→ 怎么验收（自测题）。
## 2 引用规则
- 只引用 references/04-标准索引.csv 中的条目，标来源等级A-E与核实状态。
- 找不到来源时回答 need_context 或 not_found，不编造条号、日期、数值。
- 数值必须带单位、版本、数值性质（一手/二手/示例/合同定值）。
## 3 模式
- 新手模式：一句话定义 + 一个数据中心例子（UPS、柴发、冷机三选一）。
- 出题模式：从 quiz/题库.md 抽题，答后给出处。
- 批改模式：对照 06-误区与自检.md 指出误区类别。
## 4 何时读哪份参考
角色/独立性/RACI → 01；级别/门禁/颜色牌 → 02；流程/会议/台账 → 03；标准 → 04；术语 → 05。
```

**2：cx-level-docs 的关键段落**
```
---
name: cx-level-docs
description: 输入数据中心部件（UPS、柴发、ATS、冷机、CDU、BMS点位、气体灭火等）和调试级别L0-L6，输出该级必须提交的文件、模板来源、判据与来源等级、执行与见证方、门禁与缺失项、国标附录表号。用户问某设备某一步要交什么报告时使用；报价用 prebill；写脚本用 cx-script。
---
## 工作流
1. 用 components.md 识别部件与别名，确认口径。
2. 在 matrix.csv 中筛选 component+level；查不到的标“矩阵缺项”，不自行编造。
3. 输出表：test_id | 文件 | 模板来源 | 判据与等级 | 执行 | 见证 | 签认 | 阻塞的下一级 | 国标轨。
4. 门禁检查：前一级是否完成，未关闭问题是否影响本级。
5. 判据为“合同定值”时，提示到 OPR、规格书或厂家资料取值。
```

**3：cx-script 的关键规则**
- 每个改变状态的步骤必须有前置、预期（含容差与时限）、中止、回退；输出前自跑 PF01–PF06，ERROR 未清零不得输出“可批准”。
- 数值来源只能是用户给的 OPR/SOO/点表；二手时间轴（如 BICSI 16.3）只能标【二手】作参考。
- 自动附 NO-GO 清单（一路检修时不做另一路拒启；有活动告警不开测；电池未充满不做依赖电池的场景；EPO 只在无 IT 设备区实测）。

**4：用 skill-creator 建立和迭代**（Claude 中的 skill-creator 能新建与修改技能、跑评测、优化 description 触发）
1. 对 Claude 说：“用 skill-creator 帮我新建 dc-cx-mentor，按我给的目录与骨架。”把本报告第 2–5 节、第 8–9 节和你网站的知识页作为素材。
2. 先写 12 道测试题（evals）并写好期望要点，例如：CxA 签字等于验收吗？UPS 在 L3 要交哪些文件？NFPA 110-2016 对每月运行有什么要求、什么时候适用？GB 50174 有没有验收章节？L4 有一项失败能进 L5 吗？腾讯假负载方案有几步？IEEE 1188 当前版本？给一段埋错脚本找出 PF 码。
3. 跑测试，对比装技能前后，重点看：有没有编造条号；有没有先确认口径；二手值有没有标签。
4. 每轮只改一处（某份参考文件或某条规则），改完再测；最后优化 description，避免与 prebill 抢触发。
5. 每季度更新标准索引（如 1.6P 正式出版、NETA 新版、IEEE 1188-2025）。

**验收标准**
- 12 道题至少 11 道答案有出处、无编造。
- 遇到未核实或二手数值会主动提示。
- 矩阵里没有的判据明确说“缺项”，不自己编。

## 8. 新手常见误区（11 条）与自检清单

**为什么**：把常见错误先列出来，读资料时就知道该警惕什么；也可直接做成 dc-cx-mentor 的批改依据。

**做什么：逐条对照**
1. **把调试当成开机或单机调试**。正解：从预设计覆盖到保修期结束，开机和验收测试只是证据。自检：能说出 L0 与 L6 各要交哪些文件吗？
2. **以为 L1–L5 是法定分级**。正解：行业惯例；G0 与 202 不用这套说法；各家定义不同（L0–L6、L2a/b/c、L1＝设计审查＋FAT、L4＝IST）。自检：合同里每级定义写清了吗？
3. **把调试级别和设施等级混为一谈**。L1–L5 与 Tier I–IV、TIA Rated、EN 50600 可用性等级、GB 50174 A/B/C、NFPA 110 Level 1/2 各是不同的东西。
4. **以为 CxA 签字就是验收，或 CxA 可以改设计**。正解：202 不要求 CxA 代业主验收；CSE：CxA 核实并督促按设计执行，不修改设计；aidc-uptime-cx-learn：CxA 可以建议、警告、拒绝见证，但不能替业主决定。
5. **以为 Uptime TCCF 可以替代 IST**。正解：TCCF 是认证方在调试完成后抽选项目做现场演示，以 L5 完成为前提。
6. **以为“有冗余就安全”**。真实案例（BICSI 备考站，20 MW 托管机房，二手）：二次泵 VFD 只接柴发应急盘，失电约 9 s；VFD 重启又用约 45 s；冷机被 4 分钟 anti-recycle 锁住；冷冻水断流超过 50 s，机柜进风 75 s 内从 23 °C 升到 34 °C，超过 ASHRAE A1 允许上限 32 °C，CxA 中止测试。整改：泵 VFD 与 CRAH EC 风机改接 UPS、增加约 85,000 加仑分层蓄冷罐、冷机快速重启 4.0 → 1.75 min；复测最大温升 1.1 °C。另一例：SchemaTex 的“2N UPS”示例两台 UPS 都经过同一台 STS，STS 本身就是单点故障。
7. **问题“行政关闭”，或以为恢复运行就算关闭**。正解：必须受控复测，并保留首测记录。
8. **只背数字，不看来源和版本**。Construction-Gamma 把 NFPA 110 每月运行与年度附加负载试验混成一条；多个 AI 站重复 99.982%；有资料把 A1“允许范围”当“推荐范围”；TTR 条号随 NETA 版本变；IEEE 1188-2005 已被 2025 版取代。
9. **以为 NFPA 110 的 10 秒、2 小时满载自动适用于数据中心柴发**。正解：多数数据中心 IT 备用发电属 NEC 702 可选备用；只有 AHJ 或合同指定 EPSS 时才套 7.13 与 Type 10；大陆项目按设计文件、GB 50150、合同。
10. **等到 L4/L5 才介入**。知乎《走好这七步》指出国内常到 L4/L5 才请第三方；CAI 白皮书主张 30% 设计阶段就引入 CxA；Vertiv 称近 70% 早期设备故障可追溯到设计、安装或开机缺陷。对报价来说，L0–L3 正是增值点。
11. **照搬网上资料和 AI 内容**。风险：版权（客户文件、书籍扫描、ASHRAE 截图）、繁体或台湾用语、AI 编造的引用、真实项目数据外泄。正解：只学结构，用自己的话重写，标来源与许可证。

**自检清单（每月过一遍）**
- [ ] 能用 1 分钟讲清调试、验收测试、开机的区别
- [ ] 能默写 L0–L6 门禁表与每级出门条件
- [ ] 每个判据都写了“标准＋条号＋版本＋来源等级＋数值性质”
- [ ] 清楚当前项目用哪套口径、柴发是否为 EPSS
- [ ] 每个 IST 场景都有前提、回退、中止条件和 NO-GO 清单
- [ ] 问题台账有“来源”与“复测”两个字段
- [ ] 报价澄清表覆盖负载箱、燃油、电费与需量电费、复测、夜班、系统手册、季节性测试
- [ ] 能在一个冗余设计里指出单点故障（含单电源线负载与共用 STS）
- [ ] 用过的网上资源都核对过许可证
- [ ] 已在 2026-11-16 前读完 1.6P 草稿目录

**用什么**：本节各条出处见第 2、3a、3g、4c、9 节。

**验收**：随机挑 3 条误区，各用一个你自己项目里的例子说明“错在哪、正解依据是什么”。

## 9. 资料纠错、未核实事项与可信度分级（完整清单）

**为什么**：第 0 节只放了五条最要紧的纠错，这里是完整清单，供你给网站每个数值打标签、给 Skill 写引用规则。

**做什么：已纠正的错误（有证据）**
1. web_resources 把 CSE 文章配给 Guideline 1.1-2025，实际讲的是 1.1-2007；1.1-2025 的发布日期与页数只见于检索摘要，未核实。
2. GB/T 51314 的 ndls 链接打开是 TIA-942-A，改用 chinesestandard 条目。
3. GB 50462-2015 已于 2024-09-01 被 2024 版替代。
4. “BICSI 第 16 章”是备考站编号；ISO 8528-5 G3 数值在备考站 16.2 页，不在 16.1。
5. 1.6P 范围：2020 年报道“不含 IT”，2026 草稿为“直到服务器机柜和 IT 设备”。
6. NFPA 110-2016 周期试验的三个限定：8.4.2.3 只适用于达不到 8.4.2 的柴油机组；年度附加负载合计 1.5 h；8.4.9“满 4 h 可终止”只适用于 Class 超过 4 h 的系统；2016 版不是最新版。另：整套 NFPA 110 判据只在 EPSS 时适用。
7. GSA 指南费用来源分开：每平方英尺 0.40–1.35 美元来自 DOE 2018；按施工造价百分比的表来自 GSA 2015 收费表。
8. IFMA 案例 kW/ton 0.82 → 0.75 约降 8.5%；“约 9%”是稳态冷站效率。
9. 腾讯方案是 7 步，110% 过载只是满载步骤的可选补充；腾讯云页面是 2018-03-16 转载，原文 2016-01-15。
10. Uptime 中文教育门户约 27–28 项课程，没有 CDCCP。
11. GB/T 48023-2026 “首部液冷国标”是宣传说法。
12. 深圳案例前文 779 条、后文 776 条，不一致。
13. GB 50243 英文版是商业译本。
14. Agent 与 Authority 的区分是 Vertiv 观点。
15. jd-datacenter-course 56 课（不是 62）；tier3-cx-teaching 14 个场景（不是 13）。
16. ACG CxA 资格补两点：有“同等军队训练”选项；资格项目不含独户与双户住宅。
17. RACI 每行只能一个 A（原 L1 行缺 A，已补）。
18. 202 的 13 条是第 5–17 条；顺序 OPR → Cx 计划 → BoD；“经验教训”不是 202 条款。
19. BCxA 350 美元/小时复查费是业主向施工方收取，不是 CxA 直接开票。
20. YD/T 4628-2023 标题以《数据中心基础设施验证测试技术要求》为准。
21. iRecruit 的脚本要素原文是 11 项（不是 9 项）。
22. aidc-calculator COMMISSION 阶段失效模式计数有 44 与 32 两说。
23. IEEE 1188-2005 已被 1188-2025 取代（2025-12-10 批准、2026-10-19 出版）。
24. TM 5-694 第 1 章文字把 DA 7469/7470 名称写反，以印刷表单为准。
25. TC 9.9 的 18–27 °C 是 IT 设备进风推荐范围，只有封闭通道时才近似 CRAH 送风。
26. AIDC-ELEC 的“15 类设备”含两组近似重复，独立设备类约 12 类。
27. SchemaTex 的 2N UPS 示例经共用 STS，不是真 2N；其 Tier III RBD 是过度简化的模型（ATS 只放在柴发支路、无 UPS 与配电块），不是算错。
28. tier3-cx-teaching 的 FMEA 等级标签错误（RPN 数值本身对）。
29. 关于“这些仓库不在资料中”的质疑：K-Dense、mhshaon98、rade-nugroho、Tibsfox、lionelsimai、majiayu000、anshuS1310、shenoyabhijith、GenesisAI、Construction-Gamma、6HssNipEr 均来自早前 19 个仓库评估（prior_reads），已核对存在；mat-skills 的 MIT 许可与 OPR 模板乱码、Construction-Gamma 的按席位年度订阅与 L4/L5 矛盾也出自该评估。

**未能核实（拦截或只见摘要）**
- ashrae.org 多个页面、Uptime 官网与期刊（403）、Uptime ATD 发电机额定论文（403）、BCxA PDF（反爬）。
- NFPA 70B 自 2023 版改为“标准”；IEEE 450 修订项目。
- YD/T 4628 目录；T/CCAA 87 发布日期；CDCE 课程内容（H3C 页 500）；GB/T 2820.5 新版。
- 部分知乎原文（403）；CSDN 金融数据中心文（521）；《数据中心项目规范》编号。
- GB 50303、GB 50339、GB 50312、GB 50116、GB 50263 的编号、年份与名称。
- BICSI 备考站的 NETA 绝缘电阻值、ISO 8528-5 值、UPS 参考值、黑启动时间轴，全部二手。

**可信度分级示例**（定义见第 0 节）
- A：G0 Addendum a、202 Addendum a、UFGS、TM 5-694、ASHRAE Standards Actions。
- B：Cummins 转载的 NFPA 110、西雅图与南达科他验收表、NETA 官方说明页、IEEE SA 页面、Traver 的 Uptime 演示稿、工标库目录。
- C：Vertiv、Schneider、Aggreko、ABB、CSE、IFMA、BCxA 讲义。
- D：OpenExamPrep、Archdesk、CxPlanner、iRecruit、Fluke 博客、Industrial Monitor Direct、各开源仓库。
- E：ekcwilson-git 大部分内容、geese1028、gridforge；本地图的推算值；打不开的知乎与 CSDN 原文。

**用什么**：本节所有条目的 URL 见对应章节。

**验收**：随机抽查你网站的 10 个数值，每个都能说出来源等级、版本和数值性质。

## 附录A. 附录 A：中英术语对照（一）流程、文件、级别、脚本

**为什么**：大陆、台湾、香港说法不一。**怎么用**：网站和 Skill 以英文缩写为主键，各地中文叫法存成别名数组。**验收**：随机遮住中文列，能说出 20 条的中文与一句话说明。

| 英文（缩写） | 中文 | 一句话说明 |
|---|---|---|
| Commissioning (Cx) | 调试/调试验证；台：試車；港：測試及調試 T&C | 以 OPR 为准绳的全过程质量流程 |
| Commissioning Provider (CxP) | 调试服务提供方 | 202 正式用语，2017 年起替代 CxA |
| Commissioning Authority/Agent (CxA) | 调试顾问/调试代理 | ACG 证书名；权限看合同 |
| Commissioning Manager (CxM) | 调试经理；台：試車經理 | 岗位名，业主侧或总包侧 |
| Owner's Project Requirements (OPR) | 业主项目要求 | 所有判据的源头，逐条编号 |
| Basis of Design (BOD) | 设计依据；台：設計基準 | 设计方对 OPR 的回应 |
| Commissioning Plan / Specification | 调试计划 / 调试技术规范 | 计划定流程门禁；规范写进合同 |
| Design Review / Submittal Review | 设计评审 / 送审资料审查 | L0；不等于同行评审 |
| Equipment Matrix | 调试设备矩阵 | 每台设备 × 级别 × 表单 |
| FAT / FWT | 出厂验收 / 工厂见证测试 | L1 |
| SAT | 现场验收测试 | 范围在 L2–L4 间浮动 |
| Installation Verification (FIV) | 安装检查/安装验证 | L2，分 2A 到货、2B 通电前 |
| Pre-Functional Checklist (PFC) | 预功能检查表 | L3，每台一张 |
| Start-up | 启动/单机试运转 | 厂家执行，CxA 见证 |
| Functional Performance Test (FPT) | 功能性能测试/单系统测试 | L4 |
| Integrated Systems Test (IST) | 综合系统测试/综合联调；台：整合系統測試 | L5 |
| Pull-the-plug / Black Start | 拔插头/全失电（黑启动）测试 | 满载切断全部市电 |
| Turnover / Handover | 移交/接维 | L6 |
| Issues Log | 问题台账 | 不得删除，复测后才关闭 |
| Punch List / Close-out | 遗留问题清单/销项 | 逐条关闭 |
| Non-Conformance Report (NCR) | 不合格报告 | 未关闭可卡住测试 |
| Certificate of Readiness | 就绪证书 | UFGS 默认测试前 30 天 |
| Witness Point / Hold Point | 见证点/停留点 | 工作台用 ◆/☆ |
| Risk Acceptance | 风险接受 | 业主书面接受方可带项进下一级 |
| Systems Manual / O&M Manual | 系统手册/运维手册 | 前者项目专用，后者厂家资料 |
| Seasonal / Deferred Testing | 季节性/延期测试 | 入住后补做 |
| Warranty Review (10-month) | 保修第 10 个月复查 | GSA 要求 |
| Re-commissioning / MBCx | 再调试/基于监测的调试 | LEED v5 EAc5 |
| Sequence of Operations (SOO) | 控制顺序/运行逻辑 | FPT 的依据 |
| Point-to-Point (P2P) | 点对点核对 | BMS/EPMS 逐点核对 |
| Alarm Matrix | 报警矩阵 | 等级、路由、升级 |
| Look-ahead | 滚动前瞻计划 | 每周排 2–3 周 |
| Verification Testing | 验证测试 | YD/T 4628 用语 |
| Supervision Engineer | 监理 | 国内法定见证方 |
| Test Script / Method Statement | 测试脚本/测试方案 | FPT、IST 核心交付物 |
| Abort Condition / Rollback | 中止条件/回退程序 | 改变状态的步骤必填 |
| Command Center (CC) | 指挥中心 | 放行、沟通、记录 |
| GO/NO-GO Hold Point | 停止点/继续与否决策 | 如 UPS 剩 20% 时决策 |
| Preflight codes PF01–PF06 | 脚本预检码 | 01–04 为 ERROR |
| As-built Script Report | 竣工脚本报告 | WP148 三份输出之一 |
| Back-charge | 回扣费 | 未就绪复查费由业主向施工方收 |
| Demand Charge Ratchet | 需量电费棘轮 | 调试峰值锁定之后 12 个月需量 |

## 附录B. 附录 B：中英术语对照（二）设备、测试、安全与等级

**为什么**：设备与测试术语是读判据的前提。**怎么用**：与附录 A 合并成网站术语主表。**验收**：给出 10 个缩写，能说出中文与对应的调试级别。

| 英文（缩写） | 中文 | 一句话说明 |
|---|---|---|
| TAB | 测试、调整与平衡；台：測試調整平衡 | 风、水平衡 |
| ANSI/NETA ATS / ECS | NETA 验收测试/电气调试规范 | 国内对应 GB 50150 交接试验 |
| Insulation Resistance (IR) / Polarization Index (PI) | 绝缘电阻/极化指数 | PI＝10 min÷1 min 读数 |
| Transformer Turns Ratio (TTR) | 变压器变比试验 | 偏差 ≤0.5%（二手，注版本） |
| Secondary/Primary Injection | 二次/一次电流注入 | 校验保护与脱扣 |
| Infrared Thermography | 红外热成像 | 带载查接点过热 |
| Power Quality Analyzer | 电能质量分析仪 | 谐波、暂态 |
| Load Bank / Liquid-cooled Load Bank | 负载箱/液冷负载箱 | 液冷单台约 600 kW |
| Server Simulator | 机架式假负载 | 国内常见 4–6 kW |
| UPS | 不间断电源 | 转旁路、放电测试 |
| Rectifier Walk-in | 整流器软启动 | 二手时间轴 15–30 s |
| VLA / VRLA | 富液式/阀控式铅酸电池 | 适用 IEEE 450 / 1188 |
| Open-Circuit Voltage (OCV) | 开路电压 | L3 查荷电状态 |
| End-of-Discharge Voltage | 放电终止电压 | 按电池类型与时长 |
| STS / ATS | 静态转换开关/自动转换开关 | 母线级 ATS 国内叫“备自投” |
| Closed-transition Retransfer | 闭式回切（先合后断） | 需供电部门同意短时并网 |
| Diesel Generator Set | 柴油发电机组（柴发） | 主用 prime 与备用 standby 额定 |
| Service Load | 服务负载 | UFGS 带载基准，不等于铭牌 |
| ISO 8528-5 G3 | 发电机组性能等级 G3 | 阶跃瞬态要求严 |
| EPSS / Type 10 / Level 1 | 应急电源系统/10 秒类型/一级 | NFPA 110 用语 |
| NEC 700 / 701 / 702 | 应急/法定备用/可选备用 | 多数 IT 备用属 702 |
| PDU / RPP | 电源分配单元/列头柜 | 列头柜是国内叫法 |
| Busway | 母线槽 | 满载红外 |
| EPMS / BMS / DCIM | 电力监控/楼宇自控（BA 群控）/动环 | 核对点位与告警 |
| Chiller / Anti-recycle Timer | 冷水机组/防频繁启动定时器 | 冷机重启锁定时间 |
| CRAH / CRAC | 冷冻水型/直膨型精密空调 | 冗余与故障测试 |
| CDU / FWS / TCS | 冷却液分配单元/设施水回路/二次冷却回路 | 液冷调试对象 |
| Thermal Energy Storage (TES) | 蓄冷罐 | 覆盖冷机重启窗口 |
| EPO | 紧急断电 | 只在无 IT 设备区受控实测 |
| VESDA | 极早期烟雾探测（吸气式） | 分级报警 |
| Clean Agent / Door Fan Test | 洁净气体灭火/门扇风机密封性试验 | 保持时间验证 |
| LOTO / Energy Marshal | 上锁挂牌/能量管控员 | 每步切换的安全前提 |
| MOP / SOP / EOP | 方法程序/标准操作流程/应急操作流程 | 移交运维的核心程序 |
| AHJ | 有管辖权的主管部门 | 如消防局 |
| N / N+1 / 2N | 冗余配置 | GB 50174 B 级为冗余 |
| Dual-corded Load | 双电源线负载 | 单电源线负载是盲点 |
| Concurrent Maintainability / Fault Tolerance | 可并行维护/容错 | 对应 Tier III / IV |
| SPOF | 单点故障 | IST 场景从此入手 |
| TCDD / TCCF / TCOS | 设计认证/建成设施认证/运营可持续性认证 | TCCF 在 L5 之后 |
| Availability Class | 可用性等级 | EN 50600/ISO/IEC 22237，1–4 级 |
| FMEA / RPN | 失效模式与影响分析/风险优先数 | RPN 自己重算 |
| IEC 62040-3 VFI-SS-111 | UPS 分类码 | 末三位动态等级，1 最严 |
| ITIC / CBEMA Curve | 电压耐受包络 | 原为 120 V/60 Hz，作参考 |
| RACI | 执行/批准/咨询/知会 | 每行一个 A |
| Not-to-Exceed (NTE) | 封顶价 | 按工时计费上限 |

## 附录C. 附录 C：认证与职业路径（国内外）

**为什么**：证书证明你懂流程，项目证据证明你会做。iRecruit 提醒 BCxP、CCP、CxA 这类流程证书“不能单独证明现场 IST 能力”，雇主会追问你是“见证过”还是“主导过”。https://www.irecruit.co/insights/level-5-commissioning-ist-jobs-data-center-cx-certs-pay

**做什么：证书对照**（费用会变，以官方为准）

| 证书 | 机构 | 要点 |
|---|---|---|
| CDCCP 数据中心调试专家 | Uptime，由 CNet 授课 | 唯一专讲数据中心 CxM：5 天远程＋约 20 h 预习；Pearson BTEC Level 5；课纲 Level 0–6 与 RACI 练习；每 3 年再认证；中文门户没有此课 |
| CxA | ACG | 4 条资格路径（PE/注册建筑师＋3 年调试；建筑科学本科或同等军队训练＋5 年；大专等＋8 年其中 5 年调试；高中＋10 年其中 5 年调试）；≥3 个项目合计覆盖 8 项活动中 ≥6 项（不含独户与双户住宅）；雇主须为独立调试公司；申请费 350/400/2,500 美元；考前 ≥21 天提交；2025 年起考试参考为 ACG Building Systems Commissioning Guideline |
| BCxP | ASHRAE | ANAB/ISO 17024；iRecruit 汇总会员 245、非会员 375 美元，3 个合格项目（二手） |
| CCP | BCxA/BCCB | 会员申请费约 750 美元，每 3 年再认证；ACP 是否同卷未核实 |
| CBCP | AEE | 4 天培训，偏能源与机械 |
| ATD / ATS / AOS | Uptime | ATD 只对持证专业工程师开放（美国 PE 或同等国际注册，部分国家可能不适用）；ATS 不要求 PE |
| CDCP → CDCS → CDCE | EPI | 大陆 H3C 开课、台湾恆逸开课；CDCE 含设备测试计划（IET）与集成性能验证测试（IPVT）的说法来自检索摘要，未核实 |
| HCIA/HCIP-Data Center Facility | 华为 | HCIP 侧重安装、调试与排障（第三方页面） |
| DCCA 等 | Schneider Electric University | 免费自学，含 Data Center Projects: Commissioning |
| Code M | CIBSE | 英国、香港规范项目 |

- CDCCP 手册 https://cnet-training.com/wp-content/uploads/pdf/Certified-Data-Center-Commissioning-Professional-CDCCP-US.pdf ；ACG 申请表 https://www.commissioning.org/wp-content/uploads/2026/07/CxA-Application.pdf ；ACG 新指南预览 https://commissioning.org/building-systems-commissioning-guideline-preview ；华为 https://www.flane.ru/certification/hcia-dc-facility ；Schneider University https://www.se.com/ww/en/about-us/university/ ；Uptime 中文门户 https://zh.uptimeinstitute.com/education ；BCxA University https://www.bcxa.org/university/ ；CIBSE Code M https://www.cibse.org/knowledge-research/knowledge-portal/commissioning-code-m-ccm-commissioning-management-2022

**建议顺序**
1. 现在（免费）：Schneider University、GSA 指南、NEBB 讲义、1.6P 草稿。
2. 第 1 年：CDCCP，或先 EPI CDCP 打基础；低成本入门可看 Udemy BCxP 备考课 https://www.udemy.com/course/ashrae-bcxp-building-commissioning-professional/
3. 积累 3–5 年项目后：在 CCP、BCxP、CxA 中选一，看目标客户认哪个。
4. 做设计评审或 TCCF 准备时：ATS（非 PE）或 ATD（PE）。

**职业阶梯与薪资（只作对标）**
- 美国（iRecruit 招聘博客，非独立薪资调查）：Cx 技术员 0–3 年 → 工程师 3–7 年 113k–150k 美元 → 高级 7–10 年 140k–185k → 负责人/CxA 10 年以上 170k–220k → 经理/总监 12 年以上 200k–260k；很多岗位出差 50%–75%。
- 中国大陆（猎聘 2026-11-05 抓取，仅两条样本）：北京 12–16k×13 薪（5–10 年）；深圳 15–20k（3–5 年）；岗位多写“调试工程师/测试验证工程师”。https://www.liepin.com/jobsdiaoshirenyuan/ ；万国数据看重中级以上高压、低压、空调上岗证，CDCP/CDCD/CDCMP 优先 https://www.gds-services.com/zh_cn/jobslist_20.html
- 台湾：“試車總監”，人才多来自晶圆厂厂务（KiTalent）。
- 新要求风向（招聘页）：Nscale 要求在在建项目中主导过 L5 IST，懂直接液冷、CDU、漏液检测 https://job-boards.eu.greenhouse.io/nscaleoperationsukltd/jobs/4981757101

**四条路径**：第三方 CxA（技术员 → 工程师 → CxA）；业主侧 CxM；总包/EPC 调试经理（PCL 要求 10 年以上并做过 2 个数据中心）；**建议你走**：Cx 商务/售前 → 技术型商务（能读 OPR、写范围、算见证工时与负载箱资源）→ 项目 CxM。先用 CDCCP 补体系，每次投标练习把 L0–L6 范围与第 4d 节资源表写进报价。

**社区与持续学习**：Inside Commissioning 播客 https://podcasts.apple.com/us/podcast/inside-commissioning/id1896619373 ；7x24 Exchange https://www.7x24exchange.org/ ；DCPro 课程 https://www.datacenterdynamics.com/en/dcpro/all-courses/

**验收**：写出你 3 年内的证书与项目计划，每一步对应一条能拿出来的证据（证书、你主导的测试、你签过的报告）。

## 资源排行

| 排名 | 名称 | 类型 | 语言 | 用来补什么 | 怎么用 | 注意 |
|---|---|---|---|---|---|---|
| 1 | [ASHRAE Guideline 1.6P 公开评审草稿入口（数据中心调试应用指南）](https://www.ashrae.org/technical-resources/standards-and-guidelines/public-review-drafts) | standard-draft | en | ASHRAE 唯一专门针对数据中心的调试文件，作为网站与 Skill 的英文术语与结构基准。 | 注册免费账号，2026-11-16 前读目录、术语、附录表格结构，用自己的话记笔记；公告见 Standards Actions 2026-10-02。 | 草案，条文会改；截止后下架，正式版付费；不得转载全文。 |
| 2 | [GSA Commissioning Guide（2020，66 页）](https://www.wbdg.org/FFC/GSA/gsa_commissioning_guide_2020.pdf) | free-guide | en | 流程骨架：附录 A 责任矩阵、问题台账最低字段、月会与月报 7 项、保修第 10 个月复查、独立性原则。 | 先读四个阶段，再把附录 A 的 L/P 矩阵改成第 2 节的数据中心 RACI（每行一个 A）。 | 面向联邦建筑；按造价百分比的费用表出自 GSA 2015 收费表，不是 DOE；允许承包商在 CxP 监督下分包测试。 |
| 3 | [samfclement/Data-Center-Commissioning（全生命周期调试模拟器）](https://samfclement.github.io/Data-Center-Commissioning/) | simulator | en | 从 OPR/BOD 评审到 L5 的 10 个可回放场景与移交，数值标依据类型。 | 切 Plain English 按阶段走；把 10 个 L5 场景各写成第 4b 节格式的 IST 脚本。 | 无 LICENSE、代码压缩，只能学习；标为 standard 的数值约 12 个。 |
| 4 | [UFGS 01 91 00.15 Building Commissioning（May 2023, Change 3）](https://www.wbdg.org/FFC/DOD/UFGS/UFGS%2001%2091%2000.15.pdf) | spec-template | en | 免费里最完整的调试总规范：设计评审、送审、问题台账、就绪证书、抽样规则、系统手册、调试报告时限（第 3b 节共用行）。 | 把 1.10 提交物清单复制成网站“项目级文件主表”；抽样规则写进同型设备页。 | 方括号值须按项目填写；美军项目规范。 |
| 5 | [US Army TM 5-694 关键设施电气系统调试手册（含 DA 7463-R～7475-R）](https://www.wbdg.org/FFC/ARMYCOE/COETM/tm_5_694.pdf) | manual | en | UPS、电池、ATS、柴发、断路器的现成检查表；§6-5 g–j 是可改写成脚本行的原始程序（第 3c、3d、4b 节）。 | 读第 5、6 章与附录 A；用 §6-5 h 练习拆成 ≥6 行脚本并做 PF 检查。 | 2006 年版，判据以现行 NETA 与厂家为准；第 1 章文字把 DA 7469/7470 名称写反。 |
| 6 | [Schneider White Paper 148《Data Center Projects: Commissioning》](https://download.se.com/doc/SPD_DBOY-6NJNK6_EN/DBOY-6NJNK6_R1_EN.pdf) | whitepaper | en | 输入—流程—输出框架；图 7 指挥中心通话原文；竣工脚本报告、部件错误日志、趋势报告三份输出；疲劳管理。 | 第 2 周阅读；IST 八段骨架的“角色与签核”照此写。 | 较早文献，不覆盖液冷。 |
| 7 | [OpenExamPrep：BICSI 002 第 16 章拆解（16.1 L1–L3）](https://open-exam-prep.com/study-guides/bicsi-dcdc/ch16-commissioning-ist/sec01-cx-process-levels1-3) | study-guide | en | 按设备的 L1–L3 测试项、门禁规则与案例；同站 16.2（L4、UPS 参考值、ISO 8528-5 G3 值）与 16.3（黑启动时间线、20 MW 失败案例）。 | 三节连读，把门禁与测试项抄进自己的 L0–L6 表，数值一律标【二手】。 | 二手；“第 16 章”是备考站编号；数值入库前对照原文。 |
| 8 | [BCxA《Data Center Commissioning》讲义（Koons，2025）](https://cdn.fs.pathlms.com/U7EEo7ZjSSy8MsH2XSIh) | slides | en | 数据中心 OPR/BOD 必写条目、就绪声明（未就绪时业主向施工方收 350 美元/小时）、MOP 要求、FPT 范例与 IST 前提（第 34–36 页）。 | 补 OPR 模板；把就绪声明条款写进 prebill 澄清表；按第 35 页写 IST 前提。 | 复查费由业主向施工方收取，不是 CxA 直接开票；样表数字不是统一费率。 |
| 9 | [NEBB：ASHRAE Standard 202 讲解幻灯片](https://www.nebb.org/wp-content/uploads/2021/09/NEBBinar_ASHRAE_202.pdf) | slides | en | 免费了解 202 第 5–17 条（13 条）、附录 A–O 与多条 shall 原文（第 4a 节对照表）。 | 先看附录 B 文件矩阵与 C 职责，再看第 6–13 条。 | 按 2013 版讲解，2024 版条号可能调整。 |
| 10 | [ekcwilson-git/AIDC-Uptime-Workshop（繁中工作坊站）](https://aidc-uptime-workshop.vercel.app/) | course | zh-TW | CxA 治理视角：Cx 计划门禁、L5 场景矩阵（N/M/F 编号）、见证日站位、单一 A 的 RACI。 | 按 03→04→05→06→09→11 读，OpenCC 转简体；场景矩阵当 3D 故障预设。仓库 https://github.com/ekcwilson-git/AIDC-Uptime-Workshop | 无许可证；页面是提纲；引“ASHRAE Guideline 1.6”须自核。 |
| 11 | [ekcwilson-git/aidc-uptime-cx-learn（30 课繁中课程）](https://aidc-uptime-cx-learn.vercel.app) | course | zh-TW | S07 门禁与风险接受、S25 RACI、S12 拔插头 T0–T9、S06 认证链。 | 先读 S07、S25、S12、S06；S12 时间线做动画关键帧。仓库 https://github.com/ekcwilson-git/aidc-uptime-cx-learn | AI 模板生成，有可疑引用，术语与同作者仓库不一致，无许可证。 |
| 12 | [Archdesk：Data center commissioning levels](https://archdesk.com/blog/data-center-commissioning-levels) | article | en | 每级负责人、交付文件编号链（FAT-RPT → SAT-PKG → PPT/ALM → FPT-SCR → IST-SCR）、放行规则与移交最低证据集（第 3c 节）。 | 借用 doc_id 命名体例；把放行规则做成 3D 门禁。 | 博客级（D）；编号只是示例格式。 |
| 13 | [Yeongje-Kim/cx-preflight-edge（IST 脚本预检原型）](https://github.com/Yeongje-Kim/cx-preflight-edge) | tool | ko | 结构化脚本字段（前置、触发、within/hold 预期、中止、回退）与 PF01–PF06 预检码、埋错示例。 | 只读 data/plan_n1_cooling.md 与 cxpe/preflight.py，把 PF 码写进 cx-script Skill。 | 韩文；把冷机切换叫 Level 4 IST；时间设定不现实；只阅读不运行。 |
| 14 | [jordanstahr/cx-fee-estimate（调试报价 Claude 插件）](https://github.com/jordanstahr/cx-fee-estimate) | claude-skill | en | 真实 CxA 公司的报价方法：设备清单、抽样比例、WBS 工时、范围门禁、RFI 邮件、假设备忘录、准确性门禁。 | 读 SKILL.md 的 Takeoff methodology 与 Scope gate，并入 prebill，再补数据中心行项目。 | 美国普通建筑与医疗；模板带品牌与真实客户名；cx-reviewer 引用文件缺失。 |
| 15 | [mbcoalson/mat-skills（writing-oprs）](https://github.com/mbcoalson/mat-skills) | claude-skill | en | 把 OPR 写成可量化判据；按阶段的 CxP 工作清单；承包商移交包表。 | 复制 writing-oprs 到 ~/.claude/skills，让它写数据中心 OPR 后逐条检查。 | 无数据中心内容；部分引用文件缺失；OPR 模板有乱码与客户残留（据早前评估）。 |
| 16 | [iRecruit：Level 5 commissioning / IST jobs, certs, pay](https://www.irecruit.co/insights/level-5-commissioning-ist-jobs-data-center-cx-certs-pay) | article | en | IST 脚本表头 11 项；“恢复不等于关闭缺陷”；流程证书不能证明 IST 能力。 | 把 11 项做成脚本表头必填检查。 | 招聘方博客；另一处摘要写成 9 项。 |
| 17 | [CxPlanner：Pressure-testing your IST plan](https://cxplanner.com/data-centers/resources/pressure-testing-your-ist-plan) | article | en | 10 个 IST 边缘场景与“每个注入都要预批回退”的要求。 | 补进场景矩阵的“多重故障”与“恢复”两栏。 | 厂商博客，有软件推广。 |
| 18 | [NishikawaButterfly/dc-twin（确定性容量仿真）](https://dc-twin.fly.dev/) | simulator | en | 2N 维护＋失电＋柴发拒启组合故障；UPS 续航手算（120 kWh÷1.6 MW＝270 s），用来定停止点与 NO-GO 理由。 | 把场景 JSON 改写成 IST 步骤表；用同法算自己项目的停止点。仓库 https://github.com/NishikawaButterfly/dc-twin | 只有电气有功、恒功率线性模型；HEAD 请求会误报 404。 |
| 19 | [dmvevents/aidc-calculator（commissioning 与 risks 页）](https://dmvevents.github.io/aidc-calculator/commissioning.html) | calculator | en | P0–P8 负载阶梯、负载箱逐路径规模、液冷比例、调试能耗与需量电费；risks 页失效模式可改写成测试步骤。 | 输入 IT MW 与 PUE，把结果搬进 prebill 资源假设表。 | 规划级估计；部分推导引私有资料；COMMISSION 计数有 44 与 32 两说。 |
| 20 | [UFGS 26 32 15 发电机组（Feb 2026）](https://www.wbdg.org/FFC/DOD/UFGS/UFGS%2026%2032%2015.pdf) | spec-template | en | §3.6.9.1 连续带载序列、15 分钟记录项、振动；§3.6.1.3 承包商提供燃油/仪表/负载箱；§3.6.1.4 仪表校准精度。 | 直接改成柴发 L4 脚本与燃油估算依据。 | 备用机组删 110%；美军规范。 |
| 21 | [西雅图消防局 发电机安装/验收报告表](https://www.seattle.gov/documents/Departments/Fire/Business/Systems%20Testing%20Generator%20Install.pdf) | checklist | en | 真实 AHJ 表：NFPA 110-2019 7.13.4.1/7.13.4.6、10 s/60 s、负载分级、燃油与挂牌（第 3d 节）。 | 作为柴发 EPSS 情形下的 L4/L5 文件样板。 | 只在 AHJ 或合同指定 EPSS 时适用；SFD 不到场见证。 |
| 22 | [NFPA Free Access（NFPA 110/70E 在线只读）](https://www.nfpa.org/codes-and-standards/free-access) | standard | en | 免费核对柴发验收 7.13、周期试验 8.4 与 70E 安全原文。 | 注册后在线读；配合 Cummins 授权转载与西雅图表。 | 不能下载；条号随版本变；先判断是否 EPSS。 |
| 23 | [dsanusi/white-space NOTES.md](https://github.com/dsanusi/white-space/blob/main/NOTES.md) | knowledge-base | en | 指出多数数据中心备用发电属 NEC 702 而非 Level 1；示范每个常数写来源、用 ⚑ 标可变值。 | 把 ATS/柴发时序常数改写成 FPT 判据列，并标“以项目 SOO 为准”。 | 原型，只有 1 个图完成；美国 480 V/60 Hz 默认值。 |
| 24 | [Uptime Traver 演示稿：Mission Related – Critical Power Requirements（2020）](https://nex75.iea-ebc.org/Data/Sites/4/media/events/2020-10/presentations/1.4b--traver--uptime-institute.pdf) | slides | en | Tier I–IV 简明定义；Tier III/IV 柴发按现场无限运行时间额定的原文。 | 设计审查与 L1 送审时核铭牌额定类型与降额。 | Uptime 人员演示稿，不是 Tier 标准正文。 |
| 25 | [Industrial Monitor Direct：UPS Battery Bank Commissioning](https://industrialmonitordirect.com/blogs/knowledgebase/ups-battery-bank-commissioning-required-tests-and-procedures) | article | en | 电池 L3/L4 二手数值：OCV、内阻 ±20%、连接电阻、终止电压、新电池 ≥95%（第 3g 节）。 | 只填“参考值”列，正式判据回到 IEEE 原文与厂家资料。 | 引 IEEE 但无条款号；富液终止电压 1.85 V 须核厂家表。 |
| 26 | [Fluke：Recommended battery tests and testing schedule](https://www.fluke.com/en/learn/blog/energy-efficiency/recommended-battery-tests) | article | en | 移交运维的电池周期判据：25% 寿命或 2 年、85% 寿命后每年、80% 更换、内阻升 20%。 | 写进 L6 移交包的运维试验计划。 | 二手；与 IMD 的按年龄门槛不同，两套都列。 |
| 27 | [AIDC-ELEC-L2L3-Review（电气 L2/L3 工作台）](https://aidc-elec-l2l3-review.vercel.app) | checklist | zh-TW | 发电机、Powerblock（UPS 接口）等 L2 342 项、L3 341 项，带 ☆ 停留点与 ◆ 标记、方法与单位。 | 打开 ☆ 筛选，导出 CSV，转简体后挂到部件页（第 3c、3d 节）。 | 无许可证；约 146 处判据写“依合约/原厂”；独立设备类约 12 类；◆ 无图例。 |
| 28 | [AIDC-HVAC-L2L3-Review（暖通/液冷工作台）](https://aidc-hvac-l2l3-review.vercel.app) | checklist | zh-TW | CDU、PG25、冷机、冷却塔的 L2/L3 条目，公开资料少见的液冷检查项。 | 先读 CDU 与风冷冷机 L3，挂到 3D 冷却链热点（第 3e 节 CDU 纵切）。 | CDU 数值为合同示例；无许可证；繁体。 |
| 29 | [GB 50462-2024 数据中心基础设施施工及验收标准（工标库目录）](https://www.gongbiaoku.com/mobile/book/ju425808iun) | standard-cn | zh | 第 14 章综合测试、第 15 章竣工验收、附录 A–K 记录表——国内“每一步要交的报告”（第 5b 节映射）。 | 用附录表号给每个部件页加“国标轨”列。 | 正文付费，只核到标题；综合测试偏测量，不等于 IST。 |
| 30 | [腾讯云：数据中心假负载验证测试实战指导方案](https://cloud.tencent.com/developer/article/1063952) | article | zh | 甲方视角 7 步顺序与 4–6 kW 机架式假负载参数。 | 做成国内 IST 时间轴，用第 3g、4b 节的数值准则补空白。 | 判定多写“符合设计要求”；110% 过载只是满载的可选附加；页面为 2018 年转载。 |
| 31 | [论数据中心验证测试——以深圳某数据中心为例](https://www.sohu.com/a/747008312_121124371) | case-study | zh | 国内第三方验证测试完整案例：阶段、分工、779 条问题按专业与风险分级。 | 用其分类结构做问题台账样例数据。 | 自媒体单一来源；779 与 776 前后不一致。 |
| 32 | [ekcwilson-git/ashrae202-commissioning-course（202 逐条讲解）](https://ekcwilson-git.github.io/ashrae202-commissioning-course/) | course | zh-TW | 每项活动对应 202 条款；Table A1 文件矩阵与 B1–B3 抽样规则；2024 版变化。 | 按 Ch04→06→07→12→13→17→19 读。 | 案例数字虚构；含 ASHRAE 截图；“>100% 抽样”指多名独立检查人。 |
| 33 | [DatacenterGuidelines/open-engineering-notes](https://github.com/DatacenterGuidelines/open-engineering-notes) | knowledge-base | en | IST 前就绪门禁、BMS 通讯失效与控制器失效脚本（步骤/预期/通过失败表）、控制 FMEA 提示。 | CC BY 4.0，署名后译成中文挂在 IST 步骤下。 | 只有 9 篇短文；配套网站正文有版权。 |
| 34 | [Skeeter-spec/power-service-toolbox 工具 01（WP75 拓扑单点移除）](https://skeeter-spec.github.io/power-service-toolbox/projects/01-power-chain/build/index.html) | simulator | en | 在单线图上找单点故障，推导“移除上游唯一部件”场景；工具 03 学 ATS 时序。 | 加载 WP75 图 5 移除 PDU 1；用完整 projects 路径访问。 | AGPL，不复制代码；08、09 是空壳；只看拓扑不算容量。 |
| 35 | [IFMA FMJ：Beyond Traditional（L0–L6 与技术调试）](https://fmj.ifma.org/beyond-traditional-nebb) | article | en | 补 L0 与 L6，L2 拆 2A/2B；“技术调试”＝仪表实测；12 MW 冷站 kW/ton 案例。 | 与第 3a 节表对照，修订自己的门禁。 | kW/ton 降幅约 8.5%，“约 9%”是另一指标。 |
| 36 | [Aggreko 案例：Precision testing with liquid-cooled load banks](https://www.aggreko.com/en-nz/case-studies/data-centres/precision-testing-with-liquid-cooled-load-banks) | case-study | en | 液冷调试资源实例：12 台 600 kW＋1 备用、每回路 1.2 MW、70 °C、换热器隔离 PG25。 | 作为第 4d 节液冷负载箱行项目的规模参照。 | 厂商案例，有立场。 |
| 37 | [Uptime Institute《Tier Standard: Topology》](https://uptimeinstitute.com/resources/asset/tier-standard-topology) | standard | en | Tier I–IV 正式定义与性能确认概念，是写 IST 场景的依据。 | 注册下载，把 Tier III/IV 每条要求改写成 IST 场景。 | 需注册；TCCF 是认证，不能替代 IST。 |
| 38 | [Uptime/CNet CDCCP 认证数据中心调试专家课程手册](https://cnet-training.com/wp-content/uploads/pdf/Certified-Data-Center-Commissioning-Professional-CDCCP-US.pdf) | certification | en | 唯一专讲数据中心 CxM 的证书，课纲覆盖 Level 0–6 与 RACI。 | 课纲当自学大纲；建议第 1 年报考。 | 英文授课付费；Uptime 中文门户没有此课。 |
| 39 | [ACG CxA 申请表（2026-07-08 版）](https://www.commissioning.org/wp-content/uploads/2026/07/CxA-Application.pdf) | certification | en | CxA 证书的一手门槛：4 条资格路径、项目与 8 项活动要求、费用。 | 对照规划 3–5 年内要积累的项目证据。 | 雇主须为独立调试公司；费用随版本变化。 |
| 40 | [CxAlloy TQ 公开 API（调试软件数据模型）](https://api.cxalloy.com/) | data-model | en | Equipment、Checklist、Test、Attempt、Issue 层级，是第 3b 节数据模型的蓝本。 | 读 OpenAPI 文档，照着设计自己的 CSV 或数据库表。 | 调用需账户密钥；商业产品。 |
| 41 | [Cao-Shuang/jd-datacenter-course（京东数据中心构建实战学习站）](https://cao-shuang.github.io/jd-datacenter-course/) | course | zh-CN | 简体中文的电力、冷却、消防常识与“能力声明—测试工况—证据矩阵”训练。 | 按 5-7→10-2-power→10-2-cooling→3-5→7-6 学并完成练习。 | 调试流程内容很少；公开整本书扫描件有版权风险，只链接。 |
| 42 | [cxms-platform SpecCheck（授标前规范完整性检查）](https://github.com/thediversecandidate/cxms-platform/blob/main/app/spec_checks/checklist.py) | tool | en | 15 条规范缺口问题（3.1 负载箱热影响、6.1 收费级电表、保修起算等）。 | 译成 prebill 读标书时的对内体检项与对外澄清项。 | 关键词正则启发式，会误报漏报；AI 自动构建。 |
| 43 | [SchemaTex 简体中文单线图文档（托管 MCP）](https://schematex.js.org/zh-Hans/docs/sld) | tool | zh-CN | 让 Claude 画单线图、FMEA、故障树，核对 IST 场景与单点故障。 | 在 Claude 连接器中添加 https://schematex.js.org/mcp ；画图时 A、B 两路分别画到双电源线负载。 | AGPL-3.0；其 2N UPS 示例共用一个 STS，是反例。 |
| 44 | [Vertiv 白皮书：Commissioning Your Data Center…](https://www.vertiv.com/49916b/globalassets/services/services/project-services/commissioning-your-data-center-for-greater-availability-safety.pdf) | whitepaper | en | 调试、验收测试、开机三者区别；OPR 内容清单；约 1.5% 造价的预算参考。 | 作为报价合理性外部参照与向客户解释调试价值的材料。 | Agent 与 Authority 的区分是 Vertiv 观点。 |
| 45 | [中国数据中心标准规范政策查询库](https://arcwei2060.site) | tool | zh | 按专业、指标、房间筛选国标条款号。 | 给每个部件的验收判据查对应国标条款。 | 专有许可，数据不能复用；GB 50462 只收 5 条。 |
| 46 | [Construction-Gamma/construction-gamma-skills（付费数据中心与调试技能）](https://github.com/Construction-Gamma/construction-gamma-skills) | claude-skill | en | 数据中心调试参考文件，含 38 个 IST 场景与 10 段程序结构。 | 只有订阅后才使用；即便订阅也只学结构。 | 按席位年度付费、禁止再分发；L4/L5 定义自相矛盾；NFPA 110 试验描述有误。 |

## 参考来源

- https://www.ashrae.org/file%20library/technical%20resources/standards%20and%20guidelines/standards%20actions/sa-oct_2_2026.pdf
- https://www.ashrae.org/technical-resources/standards-and-guidelines/public-review-drafts
- https://www.ashrae.org/file%20library/technical%20resources/standards%20and%20guidelines/standards%20addenda/g0_2019_a_20200603.pdf
- https://www.ashrae.org/File%20Library/Technical%20Resources/Standards%20and%20Guidelines/Standards%20Addenda/202_2013_a_20170810.pdf
- https://www.ashrae.org/technical-resources/standards-and-guidelines/titles-purposes-and-scopes
- https://www.nebb.org/wp-content/uploads/2021/09/NEBBinar_ASHRAE_202.pdf
- https://webstore.ansi.org/standards/ashrae/ansiashraeies2022024
- https://www.csemag.com/?p=12879
- https://www.csemag.com/articles/commissioning-mission-critical-systems/
- https://www.csemag.com/articles/generator-ratings-and-the-implications-for-data-centers/
- https://www.csemag.com/articles/standby-vs-emergency-power-in-mission-critical-facilities/
- https://www.wbdg.org/FFC/GSA/gsa_commissioning_guide_2020.pdf
- https://www.wbdg.org/building-commissioning
- https://www.commissioning.org/wp-content/uploads/2019/07/ACGCommissioningGuideline.pdf
- https://www.bcxa.org/wp-content/uploads/2018/11/BCA-New-Const-Best-Practices-2018-05-14-V2.0.pdf
- https://cdn.fs.pathlms.com/U7EEo7ZjSSy8MsH2XSIh
- https://www.wbdg.org/FFC/ARMYCOE/COETM/tm_5_694.pdf
- https://www.wbdg.org/FFC/ARMYCOE/COETM/tm_5_697.pdf
- https://www.wbdg.org/FFC/DOD/UFGS/UFGS%2001%2091%2000.15.pdf
- https://www.wbdg.org/FFC/DOD/UFGS/UFGS%2026%2032%2015.pdf
- https://www.wbdg.org/FFC/DOD/UFGS/UFGS%2026%2008%2000.pdf
- https://www.netaworld.org/standards/ansi-neta-ats
- https://www.netaworld.org/standards/ansi-neta-ecs
- https://digitaleditions.sheridan.com/article/ANSINETA+Standards+in+Data+Center+Acceptance+Testing/5109321/860587/article.html
- https://www.nfpa.org/codes-and-standards/free-access
- https://www.cummins.com/sites/default/files/2021-02/External%20(Final)%20NFPA%20110%20Testing%20and%20service%20requirements%20for%20Standby%20Power%20Systems_12.15.2020.pdf
- https://www.seattle.gov/documents/Departments/Fire/Business/Systems%20Testing%20Generator%20Install.pdf
- https://doh.sd.gov/media/4gun1eet/emergency-and-standby-power-systems-installation-acceptance.pdf
- https://standards.ieee.org/standard/450-2020.html
- https://standards.ieee.org/ieee/1188/11656/
- https://standards.ieee.org/standard/485-2020.html
- https://industrialmonitordirect.com/blogs/knowledgebase/ups-battery-bank-commissioning-required-tests-and-procedures
- https://www.fluke.com/en/learn/blog/energy-efficiency/recommended-battery-tests
- https://www.iso.org/standard/85960.html
- https://webstore.iec.ch/en/publication/60140
- https://powermonitors.com/whitepapers/cbema-and-itic-curves/
- https://nex75.iea-ebc.org/Data/Sites/4/media/events/2020-10/presentations/1.4b--traver--uptime-institute.pdf
- https://uptimeinstitute.com/resources/asset/tier-standard-topology
- https://journal.uptimeinstitute.com/explaining-uptime-institutes-tier-classification-system/
- https://journal.uptimeinstitute.com/tiercertificationpreparation/
- https://journal.uptimeinstitute.com/improve-project-success-through-mission-critical-commissioning
- https://ats.uptimeinstitute.com/tier-certification/construction
- https://dcmag.fr/wp-content/uploads/2024/05/TIA-942-Standard_OnePager-230615.pdf
- https://open-exam-prep.com/study-guides/bicsi-dcdc/ch16-commissioning-ist/sec01-cx-process-levels1-3
- https://open-exam-prep.com/study-guides/bicsi-dcdc/ch16-commissioning-ist/sec02-level4-functional-testing
- https://open-exam-prep.com/study-guides/bicsi-dcdc/ch16-commissioning-ist/sec03-level5-ist-turnover
- https://www.evs.ee/en/iso-iec-22237-1-2021
- https://leeduser.buildinggreen.com/credit/NC-v5/EAc5
- https://www.ashrae.org/file%20library/about/government%20affairs/advocacy%20toolkit/virtual%20packet/standard-90.4-2022-fact-sheet.pdf
- https://www.gongbiaoku.com/mobile/book/9cn191161ft
- https://www.gongbiaoku.com/mobile/book/ju425808iun
- https://codeofchina.com/standard/GB50150-2016.html
- https://www.chinesestandard.net/PDF.aspx/GB50150-2016
- https://www.chinesestandard.net/PDF.aspx/GB50243-2016
- https://www.chinesestandard.net/AMP/English.amp.aspx/GB50166-2019
- https://www.chinesestandard.net/PDF/English.aspx/GBT51314-2018
- https://www.chinesestandard.net/PDF/English.amp.aspx/YDT4628-2023
- https://cqc.com.cn/www/english/c/2024-09-10/597551.shtml
- https://www.cqc.com.cn/www/en/col3510/595693.html
- https://escholarship.org/content/qt4w4400cm/qt4w4400cm.pdf
- https://www.archsd.gov.hk/media/publications-publicity/t-c-procedure-for-air-conditioning,-refrigeration,-ventilation-and-central-monitoring-control-system-installation/ac_tcp2017.pdf
- https://www.archsd.gov.hk/media/publications-publicity/t-c-procedure-for-electrical-installation/ee_tcp2022.pdf
- https://www.cx-associates.com/hubfs/OPR%20CxAssoc%20Example.docx
- https://www.des.wa.gov/sites/default/files/2023-01/WACG2019.pdf
- https://download.se.com/doc/SPD_DBOY-6NJNK6_EN/DBOY-6NJNK6_R1_EN.pdf
- https://schneider.efrontlearning.com/catalog/view/course/id/68/title/Data%20Center%20Projects:%20Commissioning
- https://www.vertiv.com/49916b/globalassets/services/services/project-services/commissioning-your-data-center-for-greater-availability-safety.pdf
- https://library.e.abb.com/public/14f50a02d03b4c87a67f17a47d2a13b3/Data%20Center%20Tips_January.pdf
- https://bynder.aggreko.com/m/34acbfd3f0f96433/original/AGK5006-1_loadbank-and-commissioning-for-data-centres_whitepaper_global_Apr2020-pdf.pdf
- https://www.aggreko.com/en-nz/case-studies/data-centres/precision-testing-with-liquid-cooled-load-banks
- https://archdesk.com/blog/data-center-commissioning-levels
- https://fmj.ifma.org/beyond-traditional-nebb
- https://gaiconsultants.com/data-center-mission-critical-facility-commissioning/
- https://cxplanner.com/commissioning-101/data-centers-level-testing
- https://cxplanner.com/data-centers/resources/pressure-testing-your-ist-plan
- https://peterjwicks.substack.com/p/data-center-commissioning
- https://opencompute.org/documents/ocp-liquid-cooling-integration-and-logistics-white-paper-revision-1-0-1-pdf
- https://www.tetratech.com/experts/john-herboth-discusses-challenges-in-commissioning-liquid-cooled-ai-data-centers/
- https://par.nsf.gov/servlets/purl/10611018
- https://www.energy.gov/sites/default/files/2024-07/best-practice-guide-data-center-design.pdf
- https://www.watts.com/blog/prevent-false-leak-alarms-in-data-centers
- https://kordfire.com/room-integrity-testing-for-clean-agent-systems/
- https://www.irecruit.co/insights/level-5-commissioning-ist-jobs-data-center-cx-certs-pay
- https://careers.pcl.com/job/Denver-Commissioning-Manager-CO-80002/1327852900/
- https://cnet-training.com/wp-content/uploads/pdf/Certified-Data-Center-Commissioning-Professional-CDCCP-US.pdf
- https://www.commissioning.org/wp-content/uploads/2026/07/CxA-Application.pdf
- https://commissioning.org/building-systems-commissioning-guideline-preview
- https://www.bcxa.org/university/
- https://www.udemy.com/course/ashrae-bcxp-building-commissioning-professional/
- https://www.cibse.org/knowledge-research/knowledge-portal/commissioning-code-m-ccm-commissioning-management-2022
- https://zh.uptimeinstitute.com/education
- https://www.flane.ru/certification/hcia-dc-facility
- https://www.se.com/ww/en/about-us/university/
- https://www.liepin.com/jobsdiaoshirenyuan/
- https://www.gds-services.com/zh_cn/jobslist_20.html
- https://job-boards.eu.greenhouse.io/nscaleoperationsukltd/jobs/4981757101
- https://podcasts.apple.com/us/podcast/inside-commissioning/id1896619373
- https://www.7x24exchange.org/
- https://www.datacenterdynamics.com/en/dcpro/all-courses/
- https://www.dfa.ms.gov/sites/default/files/Bureau%20of%20Building%20Grounds%20RPM%20Home/Forms%20and%20Information/Professionals/Miscellaneous/AE%20Prof%20Contracts/Cx%20Contract%20Sample%20for%20web%20112022.pdf
- https://cloud.tencent.com/developer/article/1063952
- https://www.sohu.com/a/747008312_121124371
- https://zhuanlan.zhihu.com/p/533263177
- https://zhuanlan.zhihu.com/p/644052756
- https://zhuanlan.zhihu.com/p/660653243
- https://www.bilibili.com/video/BV1CBVZ6zEMg/
- https://www.bilibili.com/video/BV1TUtjepEcd/
- https://www.bilibili.com/read/cv26223156/
- https://arcwei2060.site
- https://cao-shuang.github.io/jd-datacenter-course/
- https://api.cxalloy.com/
- https://www.cxalloy.com/media/20200923
- https://bluerithm.com/free-bluerithm-templates/
- https://bluerithm.com/data-center-commissioning/
- https://datacenterdynamics.com/en/product-news/facility-grid-launches-tailored-solution-for-data-centers
- https://majiayu000.github.io/claude-skill-registry/
- https://github.com/jordanstahr/cx-fee-estimate
- https://github.com/mbcoalson/mat-skills
- https://github.com/Construction-Gamma/construction-gamma-skills
- https://github.com/Griffing-Technology-LLC/engineering-pe-skills
- https://github.com/ArchSightLabs/archsight-aios
- https://github.com/6HssNipEr/wind-farm-grid-commissioning-skill
- https://github.com/log-wade/datacenter-mcp-server
- https://github.com/K-Dense-AI/scientific-agents
- https://github.com/mhshaon98/agent-skills
- https://github.com/rade-nugroho/Agentic-Enteprises-Skill
- https://github.com/timjrobinson/Claude-Code-Construction-Manager
- https://github.com/Tibsfox/gsd-skill-creator
- https://github.com/xiaocaioh14-arch/idc-inspection
- https://github.com/lionelsimai/claude-skills-collection
- https://github.com/ekcwilson-git/AIDC-Uptime-Workshop
- https://aidc-uptime-workshop.vercel.app/
- https://github.com/ekcwilson-git/aidc-uptime-cx-learn
- https://aidc-uptime-cx-learn.vercel.app
- https://ekcwilson-git.github.io/ashrae202-commissioning-course/
- https://github.com/ekcwilson-git/-l5-ist-tccf-teaching
- https://ekcwilson-git.github.io/tier3-cx-teaching/
- https://ekcwilson-git.github.io/tier3-risk-story/
- https://github.com/yanpei446505484/data-center-english-training
- https://taimabenji.github.io/knowledge-commons/learn/
- https://ekcwilson-git.github.io/datacenter-cx-checklist/
- https://aidc-elec-l2l3-review.vercel.app
- https://aidc-hvac-l2l3-review.vercel.app
- https://aidc-fire-l2l3-review.vercel.app
- https://aidc-elv-l2l3-review.vercel.app
- https://aidc-piping-l2fiv-review.vercel.app
- https://ekcwilson-git.github.io/GDC-TPC-IST-Checklist/
- https://github.com/DatacenterGuidelines/open-engineering-notes
- https://github.com/DatacenterGuidelines/open-engineering-notes/blob/main/functional-testing/bms-communication-failure-test.md
- https://datacenterguidelines.com
- https://github.com/pnnl/ConStrain
- https://ace-iot-solutions.github.io/corona-digital-cx/
- https://github.com/thediversecandidate/GenesisAI
- https://raw.githubusercontent.com/DharshanParasu/RevitMCPBridge2026/HEAD/knowledge/commissioning.md
- https://github.com/bopoadz-del/the-shovel
- https://github.com/shenoyabhijith/requirements
- https://humbaventures.com/reference/data-center-infrastructure/
- https://github.com/Yeongje-Kim/cx-preflight-edge
- https://github.com/thediversecandidate/cxms-platform
- https://github.com/thediversecandidate/cxms-platform/blob/main/app/spec_checks/checklist.py
- https://samfclement.github.io/Data-Center-Commissioning/
- https://samfclement.github.io/Data-Center-Troubleshooting/
- https://dc-twin.fly.dev/
- https://github.com/NishikawaButterfly/dc-twin
- https://skeeter-spec.github.io/power-service-toolbox/
- https://skeeter-spec.github.io/power-service-toolbox/projects/01-power-chain/build/index.html
- https://jamesccupps.github.io/CoolingTowerSim/
- https://dmvevents.github.io/aidc-calculator/
- https://dmvevents.github.io/aidc-calculator/commissioning.html
- https://do-roan.vercel.app
- https://epc-data-centre-frontend.onrender.com
- https://schematex.js.org/mcp
- https://schematex.js.org/zh-Hans/docs/sld
- https://github.com/dsanusi/white-space/blob/main/NOTES.md
