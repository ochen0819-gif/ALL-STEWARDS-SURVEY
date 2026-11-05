# 第二部分：3D 图与网站如何更好地适配与优化（庖丁解牛·十三刀）

## 目录

- 0. 总纲与起刀前检查：顺序、前提、许可证、脱敏红线
- 1. 第一刀 诊断：七项体检
- 2. 第二刀 认引擎：先弄清 3D 用什么做的
- 3. 第三刀 写数据：一份拓扑 + 调试证据 + 出处标签
- 4. 第四刀 中国化：GB 50174 等级、10 kV/HVDC 电压链、国标术语
- 5. 第五刀 从图纸取数：施工图 → topology.json，以及上线前脱敏
- 6. 第六刀 定视图：每课先选主视图，再决定要不要 3D
- 7. 第七刀 写仿真：场景状态机 + 纯函数 simulate()
- 8. 第八刀 画流动：让管线和母线「说真话」
- 9. 第九刀 性能与部署：手机预算、glTF 压缩、Netlify 缓存
- 10. 第十刀 调试教学层：Cx 透镜、点设备看文件、FMEA、测验
- 11. 第十一刀 IST 剧本（上）：统一模板 + 四个基础剧本
- 12. 第十二刀 IST 剧本（下）：同时维护、液冷、消防/EPO、漏水与中国假负载方案
- 13. 第十三刀 路线图与交给 Claude 的写法
- A. 附录 A 可借鉴的 GitHub 项目总表（许可证与语言）
- B. 附录 B 资产台账与找错题

## 0. 总纲与起刀前检查：顺序、前提、许可证、脱敏红线

**一句话目标**：把「会动的电、水、冷 3D 图」改造成「带调试证据层、能演练综合系统测试（IST, Integrated Systems Testing）的可探索讲解（Explorable Explanation）」。

**十三刀顺序（后一刀依赖前一刀）**：1 诊断 → 2 认引擎 → 3 写数据 → 4 中国化 → 5 从图纸取数（含脱敏）→ 6 定视图 → 7 写仿真 → 8 画流动 → 9 性能与部署 → 10 调试教学层 → 11–12 IST 剧本 → 13 路线图与 Claude 执行。附录 A 项目总表，附录 B 资产与找错题。

**三个前提**
1. 我们看不到你的网站（GitHub 上那个仓库是无关的匿名问卷 Netlify 应用），建议与技术栈无关；第 2 刀先认出你的引擎，第 8–9 刀代码以 three.js / React Three Fiber（R3F）为例。
2. 数值分三类：标准或论文原文（注明出处）、项目惯例（以合同、厂家、运行顺序 SOO, Sequence of Operations 为准）、我的经验值（明确标出）。带 ⚑ 的值随现场变化，不能直接写进测试脚本或 prebill 澄清函。
3. 网站上的施工报告和图纸，公开前必须脱敏（命令见 5.5）。

**0.1 许可证速查（借任何代码之前先看）**
| 类型 | 可以 | 不可以 | 本部分涉及 |
|---|---|---|---|
| MIT / Apache-2.0 | 复制、修改、商用，保留声明 | 删声明 | three.js、drei、Babylon、model-viewer、lottie-web、bugan9527（代码）、dc-twin、Crusoe、Caylor-Made、isostate、sld-kit、xyflow、FUXA、cx-preflight-edge、aidc-calculator、DavidVeksler、pshenok、CoolingTowerSim、qinghao6972、Utilix、nexus-datacenter-ceo、ThatOpen、ezdxf |
| MPL-2.0 | 作依赖；改了的文件要开源 | — | web-ifc |
| LGPL/GPL 离线工具 | 本地转换自己的文件，产出归你 | 把代码嵌进站点不开源 | IfcOpenShell、Bonsai、LibreDWG、Inkscape、pdf2svg |
| AGPL-3.0 | 学习、本地自用；导出的 SVG 一般归你 | 嵌进对外站点却不公开源码 | Schematex、power-service-toolbox、idc-visual-ops、xeokit、Theatre studio、PyMuPDF（另有商业许可）|
| 无 LICENSE | 读、学思路、重写 | 复制代码/文字/模型 | samfclement 全系列、clonee、white-space（内嵌 Anatomy 套件为 MIT）、AIDC-twin、Ham12-3、ezraharris385、DaisyDeng0111、tansitong486、Liyucheng1997 两仓库、factory-sim、tier3-risk-story、26-sc-sim-bid、Krud3、Farrel492、AsmaaAbdelnaser、GenesisAI（pyproject 写 MIT 但无 LICENSE 文件）、lpolovets/reference |
| CC BY-NC | 非商用署名 | 商用 | Mirage 3D 资产 |
| 专有 | 按条款 | 再分发 | GSAP（免费含商用，禁用于与 Webflow 竞争的无代码工具）、Spline、Unity Personal、Construction-Gamma（付费订阅）|
| 互相矛盾 | 先别用 | — | Tibsfox（LICENSE 为 BSL 1.1，package.json 写 MIT）|

**0.2 脱敏红线**：只处理副本，先确认合同/NDA 允许二次使用；安防类图纸（CCTV、门禁、周界、油罐与加油路线、市电进线路由）整页剔除；PDF 盖黑框不算涂黑；发布前第二人复核。别人的保密材料同样不转载：ekcwilson-git 的 vdc-cx/vdc-cxa 来自客户专有规范，tbcxa 有密码且含客户材料，GDC-TPC-IST-Checklist 由真实项目 IST 计划整理，L2/L3 审查工作台写着具体项目名——只学结构。

**0.3 可信度标签**：每个数字带出处标签（第 3 刀），否则示意值会被抄进报价或脚本。

**自测**：为什么先改数据后改画面？（四个视图读同一份状态才不矛盾。）没有 LICENSE 的仓库能复制 tube.ts 吗？（不能，重写或书面征得许可；Crusoe 的 tube.ts 是 MIT，可复制但保留声明。）

## 1. 第一刀 诊断：七项体检

**为什么**：最常见的错是把力气花在「更炫」而不是「更能教」。Mayer《Multimedia Learning》第 3 版第 14 条沉浸原则（据 FutureLearn 一页摘要，二手）：3D 沉浸不一定比对应 2D 学得更好。Tversky 等（2002）：动画「常常太复杂或太快」，应「偏向示意」，「审慎使用交互性可能克服这两个缺点」。

**四个问题**：在哪里（空间）、怎么连（谁供谁、经哪个开关、A/B 路）、何时发生（t=0、10 s、温升）、凭什么证明（L0–L6 哪级、哪些文件、谁见证）。常见中文「3D 机房」（如 https://blog.51cto.com/yeyunfei/4756741 ）只答第一问。

| 项 | 为什么 | 怎么查 | 合格标准 |
|---|---|---|---|
| 1.1 拓扑完整 | Traver（Uptime）幻灯片：Tier III 的 each and every 延伸到阀门管件、开关柜（日期 2020-10 只见于 URL）| 断路器、ATS、STS、阀门都是独立对象；清单可借 log-wade 的 DEFAULT_SYSTEMS 11 类（它的口径 L3=FPT、L4=IST、L5=季节验证，只借清单）；液冷加 CDU/TCS/FWS | 任指一台 UPS 说出上下游各三跳 |
| 1.2 流向正确 | tier3-risk-story（繁体中文）把冷冻水画去冷却塔；qinghao6972 供水红、回水蓝却是 7/12 °C 制冷工况 | 冷却塔只在冷却水环路；电池放电直流反向；流向由数据定（samsgates：不按屏幕左右推断）| 断任一开关，下游一帧内停流 |
| 1.3 冗余可见 | 原文「有冗餘 ≠ 安全」；DavidVeksler：联络开关、共用控制电源、两根线都在 A 路会让 2N 塌缩；Schematex 2N 示例两台 UPS 共用一台 STS（单点故障 SPOF）且无柴发 | A/B 两色两线型；冗余组虚框标 2N/N+1（中国项目同时标 A/B/C 级）| 隔离任一开关/阀门，每台负载显示受保护/走旁路/失电三态（Skeeter 图例）|
| 1.4 调试层绑定 | 文档与 3D 无共享编号会脱节 | 对象名（网格/材质/节点名，视引擎）= 设备位号 | 两次点击内找到 L4 FPT 脚本（NN/g：渐进披露超过 2 层可用性差）|
| 1.5 手机性能 | R3F 文档：draw call 最多 1000，最好几百 | renderer.info.render.calls、首屏 MB、真机帧率、静止是否仍渲染 | 经验值：draw call ≤150、三角形 ≤30 万、首屏 ≤5–8 MB、DPR ≤1.5、静止停渲染 |
| 1.6 出处 | 示意值被当规范值代价大 | 文件有出具方/见证方；数字有标签 | 抽 10 个链接全开、10 个数字可追溯 |
| 1.7 无障碍双语 | 术语中英并列、色弱、prefers-reduced-motion | 颜色+徽章+图标三重编码；键盘可操作；文字版步骤 | 灰度截图分得清 A/B 与级别 |

**打分**：每项 0/1/2。<8 先做第 3 刀；8–11 按 6–10 刀补；≥12 直接做 10–12 刀。

**自测**：冷却塔接哪个环路？（冷却水。）两台 UPS 共用一台 STS 还是 2N 吗？（不是，STS 是单点。）

## 2. 第二刀 认引擎：先弄清 3D 用什么做的

**为什么**：第 8–9 刀的着色器、InstancedFlow 都假设 three.js/R3F；Spline、Babylon、Unity、model-viewer、Sketchfab、Lottie/视频做法完全不同。

**2.1 F12 四项检查（不写代码）**
1. 元素面板搜：<spline-viewer（Spline）、<model-viewer、含 sketchfab.com/models/…/embed 的 iframe、<video、lottie-player；只有 <canvas> 做下一项。
2. 网络面板过滤：splinecode / @splinetool（Spline）；*.loader.js+*.framework.js+*.wasm+*.data（Unity）；.glb（three/Babylon/model-viewer）；含 v/fr/ip/op/layers 的 .json（Lottie）。
3. 控制台：window.__THREE__、window.BABYLON、typeof createUnityInstance、customElements.get('model-viewer')、typeof Sketchfab、window.lottie。
4. 启动日志出现「Babylon.js v8.x」即 Babylon（打包后也会打印）。
**陷阱**：@splinetool/runtime 2.0.138 standalone 和 model-viewer UMD 都内置 three.js 并写 __THREE__，所以先排除这两者。

**2.2 速查**
| 引擎 | 改色/显隐/点击 | 费用 | 限制 | 最便宜去向 |
|---|---|---|---|---|
| three.js/R3F | getObjectByName、clone 材质后 color.set、visible、Raycaster | MIT | — | 主地图 |
| Babylon | getMeshByName、albedoColor、setEnabled、onPointerObservable；标签 GUI linkWithMesh | Apache-2.0 | thin instances 显隐只能整体切换 | 主地图 |
| Spline | findObjectByName、color、visible、state、setVariables | Free 有水印；Hobby $15/月；代码导出从 Pro 起；自托管仅 Enterprise | 动画和新管线要回编辑器做 | 封面与导览，流程课迁 SVG |
| Unity WebGL | SendMessage('Bridge','ApplyState',json)；.jslib 回调 | Personal：近 12 个月收入加融资 <20 万美元免费 | SendMessage 只传一个字符串/数字；包大 | 有源码才留，否则导出 glTF |
| model-viewer | 热点 slot、getMaterialByName().setBaseColorFactor、materialFromPoint | Apache-2.0 | 按材质改色拾取，无按节点显隐 API | 单设备课程卡片 |
| Sketchfab | getNodeMap、show/hide、setMaterial、gotoAnnotation | Basic 免费有 logo；Viewer API 商用条件要确认 | iframe 异步有延迟 | 厂商设备库 |
| Lottie/视频 | goToAndStop(帧,true)、currentTime | lottie-web MIT | 视频不能改单个对象 | 时序叙事 |

**2.3 统一适配器**：业务规则写进 simulate()，每个视图只写 applyState(state) 和 onSelect(id)。
```js
const state = simulate(topo, scenario); // 纯函数，第 7 刀
views.forEach(v => v.applyState(state));
location.hash = 'step=' + scenario.step;
```
aidc-calculator 把视图写进 URL hash；tansitong486 的 viewer.html 只给 model-viewer 容器切 CSS 类（停机灰、故障红晕），最便宜（无许可证，只学）。

**2.4 四个坑**：对象名与位号逐条对齐；glTF 共用材质要 clone 或建模时拆分；等加载完成事件再 applyState；首屏放海报图、点击才加载 3D。

**资源**：https://www.npmjs.com/package/@splinetool/runtime 、https://spline.design/pricing 、https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/thinInstances 、https://docs.unity.com/en-us/engine/6000.0/manual/platform-specific/webgl/develop/interactingwithbrowserscripting/web-interacting-browser-unity-to-js 、https://modelviewer.dev/docs/index.html 、https://sketchfab.com/developers/viewer/functions 、https://github.com/airbnb/lottie-web

**验收**：写出「我的站是 __ 引擎 __ 版本」并截图；改一次 topology.json，三个视图同时变，3D 场景文件不用动。

## 3. 第三刀 写数据：一份拓扑 + 调试证据 + 出处标签

**为什么**：四个视图手工各维护必然矛盾。bugan9527 BUILD_STEPS 第 1 步：三张表（节点、阶段、布局），标准是「不看图只读表能讲明白」。dc-twin（MIT）快照含 components、connections、redundancy_groups、provenance（只算无损有功容量）。

**3.1 示例（自洽：所有引用 id 都在 nodes；L0–L6 都有槽位）**
```json
{"meta":{"levelScheme":"L0-L6 行业惯例，以本项目 Cx 计划为准","grade":{"gb50174":"A级"}},
"nodes":[
{"id":"UTIL-A","type":"UTIL_MV_FEED","voltage":"10 kV","verified":"practice"},
{"id":"TX-A1","type":"XFMR","voltage":"10/0.4 kV"},
{"id":"LVSG-A","type":"LV_SWGR"},
{"id":"CB-A-03","type":"BREAKER","normallyClosed":true},
{"id":"UPS-A1","type":"UPS_AC","label":{"zh":"不间断电源 A1","en":"UPS A1"},
 "state":{"energized":true,"carrying":true,"lockout":false},
 "cx":{"current":"L3","L0":{"status":"pass"},"L1":{"status":"pass","docs":["FAT 报告"]},
  "L2":{"status":"pass","docs":["到货检查","安装检查表","力矩记录"]},
  "L3":{"status":"open","issues":["ISS-0123"]},"L4":{"status":"blocked","script":"FPT-UPS-03"},
  "L5":{"status":"blocked","script":"IST-01"},"L6":{"status":"not_started","docs":["系统手册章节"]}},
 "provenance":"SYNTHETIC"},
{"id":"UPS-B1","type":"UPS_AC"},
{"id":"CH-1","type":"CHILLER","params":{"restart_s":{"value":720,"basis":"M","source":"WP179 示例 1","flag":"⚑"}}},
{"id":"CH-2","type":"CHILLER"},{"id":"CH-3","type":"CHILLER"},
{"id":"HDR-CHWS","type":"HEADER"},{"id":"V-CHW-11","type":"VALVE","normallyOpen":true}],
"edges":[
{"id":"e1","from":"UTIL-A","to":"TX-A1","medium":"MV"},
{"id":"e2","from":"TX-A1","to":"LVSG-A","medium":"LV"},
{"id":"e7","from":"LVSG-A","to":"UPS-A1","medium":"LV","device":"CB-A-03","flowState":"flowing","evidence":"E-601 p3","verifiedBy":null},
{"id":"e21","from":"CH-1","to":"HDR-CHWS","medium":"CHWS","device":"V-CHW-11","flowState":"unknown"}],
"groups":[{"mode":"2N","members":["UPS-A1","UPS-B1"]},{"mode":"N+1","members":["CH-1","CH-2","CH-3"]}],
"tests":[{"id":"FPT-UPS-03","level":"L4","targets":["UPS-A1"],"criteria":[{"text":"UPS-A1 应在额定负载下转静态旁路时输出不中断，电压在 ITIC 曲线内，用电能质量分析仪验证","basis":"P"}],"witness":["CxA","业主运维"],"effort":{"personDays":null,"loadBank":true}}],
"scenarios":[{"id":"IST-01","events":[{"t_ms":0,"do":"fail","target":"UTIL-A"}],"expect":[{"metric":"load.served","min":1.0}]}]}
```
UPS-B1 等只写了最少字段；B 路上游未画，2N 检查要等补齐。构建时跑「引用完整性」脚本：edges、groups、tests、scenarios 中每个 id 都必须在 nodes 里。

**3.2 字段要点**
- medium 枚举：MV、LV、DC（HVDC 用 voltage 240/336 V）；CHWS/CHWR、CWS/CWR；液冷 FWS_S/R（设施水）、TCS_S/R（技术冷却回路）、GLYCOL_S/R、REFRIG_LIQ/GAS、MAKEUP、DRAIN；FUEL、AIR、CTRL；CLEAN_AGENT、FIRE_SIG、LEAK_SIG、EPO_SIG；KEY_INTERLOCK（逻辑关系）。建议色（非标准）：FWS #0F766E/#C2410C，TCS #06B6D4/#EC4899，GLYCOL #65A30D/#B45309，制冷剂紫色双线，信号类平时灰色虚/点线、激活变饱和色；每种都配线型和文字，跑一次色弱模拟。
- 电气状态三层：energized（有电压）、carrying（有功率流过，samfclement 求解器区分二者）、lockout（LOTO 上锁挂牌）；水侧加 isolated/drained（对应 Uptime 的 dead lugs / dry pipes）。
- flowState：flowing/stopped/unknown；unknown 中等透明、无动画（tansitong486 manifest 约定）。
- 出处两字段：provenance 用 clonee 四类（PUBLIC FACT/DERIVED/TYPICAL/SYNTHETIC）；basis 用 S 标准/M 厂家/P 项目/T 教学压缩，随现场变加 ⚑。samfclement 统计：标 standard 的约 12 个，project 177 个——多数验收值是项目约定。
- 判据句式：mat-skills（MIT）模板「[System] shall [action] to achieve [target] [tolerance] [under conditions] [verified by method]」，五要素：数值、容差、条件、依据标准、验证方法。
- 测试记录 8 列（GenesisAI §9.2 第 5 步）：测试点、方法/标准、参数、实测值、验收准则、通过与否、签名、日期时间。
- tests 表即 prebill 工作量清单（人·天、是否见证、是否要负载箱）。

**3.3 门禁不变量**：L2 未完成不通电；L3 预功能检查表（PFC）有未关闭项不进 L4；L5 前提是 L4 全过、问题关闭（业主书面批准的延期除外）；问题台账不能行政关闭；移交包按 requires 拓扑排序（clonee：调试状态属于系统和移交边界，不属于全局进度条）。

**验收**：引用完整性 0 悬空；只读 JSON 讲清 A 路失电谁接管；FPT-UPS-03 判据五要素齐全。

## 4. 第四刀 中国化：GB 50174 等级、10 kV/HVDC 电压链、国标术语

**为什么**：中国业主写「A级」不写「Tier III」；供电链常见 10 kV、240/336 V 高压直流（HVDC）；验收用 GB 50462 术语。

**4.1 GB 50174-2017 要点（正文核对条款号）**：3.1.1 分 A/B/C；3.1.6 整体等级「按其中最低等级部分确定」→ 3D 加规则：自动高亮最弱子系统；3.2.1 A级「宜按容错系统配置」（是「宜」不是「应」）；3.2.4 B级「应按冗余要求配置」；条文说明 2.1.14：冷机这类大设备 N+X 加双路由即可满足可靠性，所以 A级冷源不必 2N。

**4.2 对照表（颜色为设计建议）**
| Tier | GB 50174 | 透镜标签 | 颜色/线型 |
|---|---|---|---|
| I | C级（N）| N 基本 | 灰，单实线 |
| II | B级（N+1；冷冻水宜单一路径）| N+1 单路径 | 蓝，加虚线备用件 |
| III | 无单独等级，只对应 A级定义里「维护检修时不中断」 | CM 双路径 | 琥珀，实线+虚线 |
| IV | A级（宜容错：2N 或 M(N+1) UPS、(N+X) 柴发、双供双回、物理隔离、蓄冷≥UPS 时间）| FT 容错 | 红，双实线+分区底色 |
| 无法映射 | A级替代配置：3.2.2 UPS+市电、3.2.3 异地互备、8.1.12 专用馈线代柴发 | GB-A 替代·单独评估 | 紫，点划线 |
对不上之处：GB 逐项规定、Uptime 按结果判拓扑；A级很多项是「宜」；Uptime 视柴发为现场主电源，GB 允许专用馈线替代；B级 ≠ Tier III。结论：不要把 A级直接涂成 Tier IV，按子系统着色取最低。（Uptime 网页抓取返回 403，以注册免费下载的 Tier Standard: Topology 为准。）

**4.3 附录 A 写进 redundancy_by_grade**（UPS、电池、柴发容量、储油行已对照 PDF 图片页；其余取自 tomatoparkdao 仓库的 OCR 全文，有错字风险，仅宜查阅）
| 项 | A级 | B级 | C级 |
|---|---|---|---|
| 供电电源 | 应双重电源 | 宜双重 | 两回线路 |
| 变压器 | 容错（2N 等）| 宜 N+1 | N |
| 柴发 | 应 (N+X)；储油宜 12 h | 单路市电时设，宜 N+1 | 可不设 |
| UPS | 宜 2N 或 M(N+1)，N≤4 | 宜 N+1 | N |
| 电池（柴发后备）| 15 min | 7 min | 按需 |
| 冷机/泵/冷却塔 | 应 N+X | 宜 N+1 | N |
| UPS 供电的空调设备 | 末端风机、控制、末端冷冻泵 | 控制系统 | — |
| 冷冻水管网 | 双供双回、环形 | 宜单一路径 | — |
| 电源质量 | 电压 +7%～−10%、±0.5 Hz、失真 ≤5%、切换断电 0～10 ms | 同 | 同 |
另：8.1.8 空调与 IT 不应同一组 UPS（可做连线校验）。

**4.4 三条供电链**：A 交流 UPS 链（两路 10 kV→变压器→0.4 kV→ATS→UPS→列头柜→PDU；10 kV 是行业实践值，GB 未规定）；B 一路市电+一路 HVDC（240 V 依据 YD/T 2378-2020；336 V 是另一项标准 YD/T 3089-2016）；C 巴拿马电源（2019-11-20 阿里巴巴与台达、中恒电气发布，10 kV 交流直变 240/336 V 直流；98.5% 效率等为厂商数据），3D 画成跨 MV/LV/DC 的复合节点。AIDC-twin（中文，无许可证）已画 220 kV→10 kV→HVDC 240 V 链，但不模拟停电切换。

**4.5 双语徽章与国标术语**：GB 50462-2024（2024-09-01 实施，只核实到公告与目录）没有 L1–L5；第 14 章「综合测试」中 14.12 系统功能测试、14.13 设计负荷测试最接近 FPT/IST；附录 H 综合测试记录表，第 15 章与附录 K 竣工验收。YD/T 4628-2023（2024-04-01 实施）只核实到题录，不要编造其分级。徽章（中文是行业惯用名，不是条文术语）：L1 工厂见证测试 FWT/FAT；L2 到货验收与安装检查 SAT；L3 预功能检查与单机启动 PFC；L4 系统功能性能测试 FPT（≈14.12）；L5 综合系统测试 IST（≈14.13，记录用附录 H）；竣工验收（第 15 章）；另设「验证测试 VT（YD/T 4628，题录）」。

**资源**：https://www.jyecorp.com/static/upload/file/20220301/1646096920490057.pdf 、https://cn.jyecorp.com/static/upload/file/20220301/1646096864775673.pdf 、https://www.gongbiaoku.com/mobile/book/ju425808iun 、https://www.chinesestandard.net/PDF/English.amp.aspx/YDT2378-2020 、https://brandnews.deltaww.com/EN/SpecialDetail/1440 、https://arcwei2060.site

**验收**：打掉一个子系统冗余，整体等级随之下降并说明原因；所有 YD/T 4628 说法标「题录」。

## 5. 第五刀 从图纸取数：施工图 → topology.json，以及上线前脱敏

**5.1 选路线**：所有视图只靠 node id 关联；每条边加 evidence（图号/位置）、verifiedBy、normal（NO/NC）。有带端口连接的 IFC → 路线 1；矢量 PDF/DWG → 路线 2（Cx 服务方最常见）；扫描件 → 路线 3。NVIDIA DPS 也是「单线图→JSON→校验→导入」。

**5.2 路线 1 IFC**
| 方案 | 版本/许可 | 用途 | 注意 |
|---|---|---|---|
| ThatOpen | 3.6.0 MIT；web-ifc 0.0.78 MPL-2.0 | IDS 查移交数据、BCFTopics 带视点问题单 | 导入白名单不含 IfcRelConnectsPorts，「谁接谁」另抽；Revit 导出的管段多是子类 |
| xeokit | 2.6.114 AGPL | 大模型、剖切、BCF 视点 | IFC 直转为 alpha、无属性集 |
| Bonsai/IfcConvert | Bonsai 0.9.0（alpha，GPL）；IfcOpenShell LGPL | 出 glb 接你现有动画 | 属性和端口全丢 |
```
IfcConvert -j 4 --include entities IfcChiller IfcPump IfcElectricDistributionBoard IfcPipeSegment dc.ifc dc.glb
```
拓扑用 IfcOpenShell：先查 IfcRelConnectsPorts 数量，为 0 就退回路线 2/3；有则用 ifcopenshell.util.system 的 get_connected_to 与 get_connected_from 双向交叉核对，FlowDirection 常不可靠，供回水方向人工确认。

**5.3 路线 2 PDF/DWG → SVG 底图 + 热点**
```
pdftocairo -svg -f 3 -l 3 E-601.pdf e601.svg
inkscape --pages=3 --export-type=svg --export-plain-svg -o e601.svg E-601.pdf
pdftotext -tsv -f 3 -l 3 E-601.pdf e601.tsv
```
从 tsv 用正则筛位号和外框坐标，追加 rect data-node="UPS-A1" 热点，第一张图目测校准。pdf.js 自 v4.0.189 移除 SVG 后端，手机单画布上限 5,242,880 像素，大图用 SVG 或瓦片。DWG：LibreDWG dwg2SVG 只转部分图元（HATCH、DIMENSION、TABLE 等未支持），正式走 ODA File Converter（需注册，核对条款）转 DXF，再 ezdxf draw 出 SVG；块属性 TAG 即位号，注意 Y 轴翻转。

**5.4 路线 3 Claude 视觉半自动**：①分块（重叠 10–15%）；据官方文档单图上限 8000 px，Claude 4.7 起长边 2,576 px、其他模型 1,568 px，单请求超过 20 张需 ≤3,000 px；②同时给 pdftotext 文字层防止编造位号；③只输出 JSON，看不见的连线不推断，跨页做 offpage 节点；④脚本校验（两端存在、A/B 两路齐、CHWS/CHWR 成对、常开不计入常态）；⑤人工核对表：上游｜本设备｜下游｜介质｜NC/NO｜冗余组｜证据｜置信度｜核对人｜结论，「待澄清」直接转问题台账或 RFI（与 prebill 澄清表同法）。常见错：交叉线当 T 接、常开当常闭、跨页断链、0/O 1/I 混淆、图例当设备、坐标漂移（官方说定位是近似）。建议抽检：置信度 <0.8 全检，其余每图 ≥20%。

**5.5 脱敏命令清单**
```
exiftool -all:all= -overwrite_original E-601.pdf
qpdf --linearize --remove-info --remove-metadata E-601.pdf E-601.clean.pdf
qpdf E-all.pdf --pages . 1-12,15-z -- E-public.pdf
exiftool -all= -overwrite_original *.jpg
```
两条 PDF 命令都要跑：ExifTool 官方说明它用增量更新，旧信息可恢复，需 qpdf --linearize 重写。内容涂黑用 PyMuPDF 的 add_redact_annot + apply_redactions 真删（框每边放大约 5 pt），处理标题栏、项目名、IP、坐标。DWG 转 DXF 后用 ezdxf 删安防图层、替换文字和块属性、重命名图层，但 Layer.rename 改不到扩展数据，所以对外只发 SVG。IFC 用 IfcOpenShell 清文件头、IfcSite 经纬度、人员机构、联系人/网络类属性集（IFC2X3 的 OwnerHistory 必填不能删）。最后统一扫描：grep 项目名与 IP、SVG 用 --export-plain-svg 去掉路径元数据、npx @gltf-transform/cli inspect 查 GLB 节点名与 extras、第二人目视、保存 sha256。

**资源**：https://docs.ifcopenshell.org/autoapi/ifcopenshell/util/system/index.html 、https://docs.thatopen.com/Tutorials/Components/Core/IDSSpecifications 、https://manpages.debian.org/testing/poppler-utils/pdftotext.1.en.html 、https://platform.claude.com/docs/en/build-with-claude/vision 、https://exiftool.org/TagNames/PDF.html 、https://pymupdf.readthedocs.io/en/latest/page.html

**验收**：一张单线图走完路线 2 或 3，核对表全部通过；对外产物扫描 0 命中，第二人签字。

## 6. 第六刀 定视图：每课先选主视图，再决定要不要 3D

**为什么**：这一步必须在任何渲染前。Mayer 沉浸原则、Tversky 偏示意；samfclement/Data-Center-Commissioning 约 1.8 MB 单文件 SVG 就覆盖 L1–L5、10 个 IST 场景，证明不用 3D 也能做完整调试培训（无许可证，只学）。

| 要讲 | 主视图 | 工具 | 注意 |
|---|---|---|---|
| 谁供谁、2N/N+1、ATS、旁路 | 动态单线图 SLD | sld-kit FlowOverlay（MIT）、React Flow animateMotion（MIT）、Schematex 底图（AGPL）、CSS stroke-dashoffset | React Flow 动画边超过 100 条会卡；Schematex 示例 STS 为单点 |
| 冷站阀门、泵、仪表 | 动态 P&ID | open-pid-icons（MIT，但 v1.0.0 只有 6 个：闸阀、手动闸阀、手动截止阀、旋转阀、止回阀、储罐，没有冷机、泵、冷却塔、换热器、仪表）；补齐用 FormsCAD ISA 5.1（约 60 个，需转换）、SchemaTex P&ID 或自绘；HMI 参考 FUXA | 先确认符号齐全 |
| 设备内部机理 | 2.5D 等轴测剖切 | isostate（MIT，<20 KB）、white-space 规范（45°/30°、一屏一焦点）| 电气暖通资产要自己画 |
| 在哪、管线路由、冷热通道 | 3D | 第 8 刀 | — |
| 穿越时间、温升、回切 | 时间轴曲线 | Skeeter 工具 03 泳道图（AGPL 只学）、uPlot | — |
| 启动顺序、切换时序 | Lottie/视频定格 | lottie-web | — |
| 能量去向 | 粒子桑基图 | Elijah Meeks particle Sankey | — |
| 要交什么文件 | 表格/卡片 | 第 10 刀 | 不放进 3D |

**五条规则（我的）**：出现「如果…就…断开/接管」→ SLD 或 P&ID；「里面怎么工作」→ 2.5D；「在哪、从哪走」→ 3D；有「几秒、几分钟」→ 必配时间轴；手机默认 2D/2.5D，每课一个「在 3D 中查看」按钮。

**总体结构**：3D 当地图与枢纽，四个视图读同一状态、互相联动。

**验收**：每课写明主视图和理由。自测：「ATS 转换为何计入 10 s 预算」用哪种视图？（时间轴+SLD，3D 只定位。）

## 7. 第七刀 写仿真：场景状态机 + 纯函数 simulate()

**7.1 仿真与画面分离**：simulate(topology, scenario) 不碰 DOM、不读时钟，返回 samples 和 events（white-space model.ts 做法）；所有视图读同一次结果。mizcausevic-dev 测试断言「静态旁路从不被选中」「来源份额和为 1」。验收：暂停后两张截图逐像素一致（bugan9527 第 4 步）。

**7.2 四个顶层状态**：正常 NORMAL；维护 MAINTENANCE（计划隔离，Tier III 思路，被隔离段灰化加 LOTO 标记）；故障 FAULT（计划外失效，Tier IV 思路）；恢复 RECOVERY（回切、复测）。

**7.3 市电失电时序（两套来源已对齐）**
| 时刻 | 子状态 | 说明 |
|---|---|---|
| t=0 | UTILITY_LOST | 双变换 UPS 逆变器持续输出，无切换间断 |
| 0–3 s ⚑ | 启机延时 | CSE 对 NFPA 110 第 6.2.5 条的解读：多数系统至少 1 s，计入 10 s 预算 |
| ≤10 s | ATS 转应急 | Type 10；多数数据中心柴发属 NEC 702 可选备用，10 s 是设计目标 |
| 10–30 s ⚑ | 整流器软加载 | white-space 15 s，BICSI 备考材料 15–30 s |
| 市电恢复 5–30 min 后 ⚑ | 回切 | white-space 默认 30 min；BICSI 15–30 min；南达科他州表格最小整定 5 min |
| 5–10 min ⚑ | 空载冷却 | white-space 5 min，BICSI 5–10 min |
constants.json 每项存「模型值 + 范围 + 来源数组 + basis」，页面显示模型值，悬停看范围，并留「本项目值」由 SOO 填写，例如 retransferDelay_min: {model:30, range:[5,30], basis:"P", flag:"⚑"}。

**7.4 故障分支**：柴发启动失败（white-space 按 NFPA 110 循环盘车 15 s 盘车/15 s 休息 ×3，78 s 判失败，模型值）；ATS 拒动；启机延时内市电恢复。单台柴发时 UPS 放电到低电量后掉电是最关键的一课。级联：utility.lost → chillers.off → chw.supply_temp（white-space DESIGN.md）。

**7.5 同时可维护检查 survives(graph, removed)**：删除节点和断开的边，从各源 BFS，检查每个负载容量是否满足，输出三态。参考 Skeeter engine.js energized()（AGPL，重写）；用 dc-twin（MIT）复合场景核对：62 s PDU-B 检修、120 s 市电 A 失电、135 s 柴发 A 启动失败，UPS A 120 kWh 以 1.6 MW 放电只撑 270 s。中国规则「最低等级」「空调与 IT 不共用 UPS」也在此运行。页面写明：教学拓扑检验，不等于 Uptime 认证。

**验收**：N、N+1、2N 下关键负载存活；隔离任一开关/阀门后存活；constants.json 每项都有来源。

## 8. 第八刀 画流动：让管线和母线「说真话」

**8.1 六条语义规则**
1. 速度正比于流量，全站一个比例尺 k：着色器 uSpeed = k×flow；CSS 动画周期 = 路径长度/(k×flow)。纠正：Caylor-Made 的 --flow-speed = 2.4 − 1.6×负载率 是 CSS 动画周期（秒），负载越高越快但不成正比：25% 负载 2.0 s、100% 负载 0.8 s，速度比 0.4 而非 0.25，只借思路不抄公式。sld-kit 建议 intensity = 负载/容量。
2. 方向 = 数据符号：Crusoe（MIT）uSpeed ≈ sign(flow)×min(velocity, 2.5)（2.5 是视觉截断，超出不再正比）；Ham12-3 FlowLine 用负速度画电池放电（无许可证，只学）。
3. 失电母线必须停流熄灭；unknown 不加动画。
4. 颜色只表示介质（Cx 透镜模式例外，见第 10 刀）；CHWS 冷色、CHWR 暖色且明度不同；Caylor 的 tempColor 是 12–38 °C 空气色标，用于冷冻水要重调。
5. 方向感三件套：切线箭头 + 相位错开 1/3 的光点 + 流动虚线，同屏 sprite ≤40（bugan9527）。
6. 每屏一个焦点：无关线路降到 25% 不透明（clonee）。

**8.2 五种做法（成本由低到高）**
| 做法 | 关键代码 | 坑 |
|---|---|---|
| 虚线偏移 | Line2+LineMaterial dashOffset；drei Line；meshline | 原生 LineDashedMaterial 忽略线宽；meshline 2024-06 后未更新 |
| 管道+纹理/着色器 | z2586300277 pipeFlow.js / flowTube.js（Apache）；Crusoe tube.ts FLOW_FRAG | R3F ≥9.8 挂载时复制 uniforms，改 material.uniforms |
| 沿曲线粒子 | CatmullRomCurve3.getPointAt（按弧长，速度均匀）| pshenok pulses.js 是直线插值，只借思路 |
| InstancedFlow | three.js CurveModifier.js：setCurve、moveIndividualAlongCurve | 只支持 WebGLRenderer，WebGPU 用 CurveModifierGPU.js |
| 半透明管壁+冷热渐变 | Liyucheng1997 materials.js（无许可证）| — |

**8.3 机柜与高亮**：成排机柜用 InstancedMesh；issue #18533 说明 OutlinePass 会把所有实例一起高亮，单台高亮用 setColorAt；R3F 用 drei Outlines。qinghao6972（MIT）把 3053 网格合批为 951 个 InstancedMesh。

**8.4 相机与标签**：camera-controls（MIT，setLookAt/fitToBox 返回 Promise，可 await 串导览）；GSAP 时间线+ScrollTrigger（专有免费许可；MotionPathPlugin 只支持 2D，3D 补间 t 再 getPointAt）；Theatre.js 公开开发已转私有、@theatre/r3f 依赖 R3F 8 与当前 drei 冲突、studio 为 AGPL。导览顺序：预训练 → 信号 → 分段 → 预测 → 揭晓。标签用 CSS2DRenderer 或 drei Html，pointerEvents:none；sbcode 示例用 innerHTML 注入，改 textContent。

**资源**：https://threejs.org/examples/#webgl_modifier_curve_instanced 、https://github.com/pmndrs/meshline 、https://z2586300277.github.io/examples/three/application/flowTube.html 、https://github.com/yomotsu/camera-controls 、https://sbcode.net/threejs/annotations/

**验收**：断开 CB-A-03 下游一帧停流；50% 负载流速恰为 100% 的一半；只选中的一台机柜高亮；导览任一步按 Esc 可退。自测：Caylor 公式 25% 负载时速度是满载几分之几？（0.4。）

## 9. 第九刀 性能与部署：手机预算、glTF 压缩、Netlify 缓存

**9.1 官方建议**：R3F 用 frameloop="demand"+invalidate() 按需渲染、复用几何和材质、instancedMesh、Detailed 做 LOD、PerformanceMonitor 掉帧降 DPR；discoverthreejs：像素比上限 2–3、直射光越少越好、运行时不增删灯、能烘焙就烘焙；原生 three.js 静止时 setAnimationLoop(null)。其他引擎：Spline 用 Performance Panel、灯光 <3；Babylon adaptToDeviceRatio 默认关；model-viewer 海报图 + loading=lazy；Lottie 图层多时用 canvas 渲染器。

**9.2 手机预算（我的经验值）**：draw call ≤150、可见三角形 ≤30 万、首屏 ≤5–8 MB、道具纹理 ≤1K、一盏方向光+环境贴图、DPR ≤1.5、静止停渲染。设备尽量用盒体圆柱程序化建模（bugan9527 的 Blender 脚本代码为 MIT）。

**9.3 glTF 压缩**：gltf-transform optimize in.glb out.glb --compress draco --texture-compress webp。Meshopt 解码更快但要配 gzip/brotli；压缩只减下载量不提帧率；解码器自托管在 /decoders/。

**9.4 Netlify**：静态资源默认 Netlify-CDN-Cache-Control: public, s-maxage=31536000, must-revalidate 与 Cache-Control: public, max-age=0, must-revalidate（CDN 缓存一年、每次部署失效，浏览器每次重新验证）。只给带哈希或版本号的路径设 immutable：
```
/assets/*
  Cache-Control: public, max-age=31536000, immutable
/models/v3/*
  Cache-Control: public, max-age=31536000, immutable
```
模型更新时换新目录（v3→v4）并改引用，或让构建工具把 .glb 带哈希放进 /assets/。没有版本号的 /models/*.glb、index.html、无哈希 JSON 都不要设 immutable，否则老访客看不到更新。

**资源**：https://r3f.docs.pmnd.rs/advanced/scaling-performance 、https://discoverthreejs.com/tips-and-tricks/ 、https://gltf-transform.dev/cli 、https://docs.netlify.com/build/caching/caching-overview 、https://docs.netlify.com/manage/routing/headers/

**验收**：中端真机达到自定预算；网络面板中带哈希文件返回 immutable，index.html 不是。

## 10. 第十刀 调试教学层：Cx 透镜、点设备看文件、FMEA、测验

**10.1 Cx 透镜**
- 为什么：门禁挂在系统和移交包上（clonee）。
- 做：顶栏「Cx 透镜」开关 + 「项目第 N 周」滑块；徽章写中文名+英文缩写（第 4 刀）；门禁未满足显示锁和原因；☆ 停止点、◆ 见证点借自 ekcwilson-git 的 L2/L3 审查工作台（繁体中文，已核实；写着具体项目名，只借符号）。
- 颜色冲突处理：aidc-calculator 用 L1 红、L2 黄、L3 绿、L4 蓝、L5 白，但来源间不统一，必须配图例。透镜打开时，介质颜色全部退为中性灰并降低不透明度，级别色只上在设备本体，图例同步切换——这样 L4 蓝不会与 B 路 #5B6BD6 混淆，也不违反「颜色只表示介质」。L5 白在浅色背景看不见：改为白填充 + 深色描边 + 「L5」字样。Cx 透镜与 A/B/C 冗余透镜互斥。
- 资源：clonee 的 commissioning.ts（15 个 L0–L6 阶段带 evidence/needs）、turnover.ts、store.ts 的 blockersForPackage()（无许可证；其 Cx 内容是通用惯例，非 Clonee 真实数据）。
- 验收：随机一台设备能说出为何还不能进 L4（如「L3 的 ISS-0123 未关闭」）。

**10.2 点设备看文件**：右侧面板七个标签：前六个借 white-space DESIGN.md 学习面板（看到了什么、关键数字、冗余、故障模式、报警点、提问；引用前在原文核对清单），第七个「该级调试文件」。每级卡片写目的、执行方、见证方、证据文件、通过准则、阻塞谁；中国项目 L5 卡链接 GB 50462 附录 H，竣工卡链接附录 K。层级 ≤2，更深用相机飞入+面包屑+Esc。问题台账可学 ThatOpen BCFTopics（MIT，问题单带 3D 视点，导出 BCF）。

**10.3 FMEA**：每台设备一张失效模式与影响分析（FMEA）表：失效模式、影响、S/O/D、RPN、由哪步 FPT/IST 发现、由哪条 L2/L3 预防；3D 按 RPN 着热度色。资源：aidc-calculator risks.html 116 个失效模式、44 个属调试阶段（MIT）；Schematex FMEA/故障树/RBD（AGPL；其 Tier III RBD 过度简化：ATS 只放在柴发支路、没有 UPS 方块）；ekcwilson-git/tier3-cx-teaching（繁体中文，已核实；等级标注违反自定阈值，重复 99.982% 可用度说法）；tier3-risk-story 的 fallDominoes(protectAt) 多米诺动画（繁体，无许可证，重写）。

**10.4 测验与通关**：L(k−1) 测验通过才解锁 Lk；题型：预测、找单点（Skeeter 工具 01 载入 WP75 图 5 拿掉 PDU 1，单电源 LOAD 1 失电）、排序 MOP、判定趋势（Crusoe：判据测试前冻结，UNKNOWN 永不算 PASS）、诊断（samfclement Troubleshooting：有排除证据才算对）；随机种子可复现。建议通关：每级正确率 ≥80%，走完一个场景并写出合格的问题台账条目。

**验收**：每个 L5 场景都能追溯到至少一行 FMEA。

## 11. 第十一刀 IST 剧本（上）：统一模板 + 四个基础剧本

**11.1 统一模板**：meta（适用拓扑 N/N+1/2N 可切换、前置条件、见证方）；states[]（时刻、basis S/M/P/T、拓扑变化、观测量、报警点、是否 hold point）；acceptance[]（测什么、仪表、合格值、来源）；views（3D/SLD 或 P&ID/时间轴各显示什么）。步骤字段借 cx-preflight-edge（Apache-2.0，韩文）：动作、前提、触发、预期（X 秒内达到并保持 Y 秒）、中止、回退；但它把单机组冷机切换叫「Level 4 IST」口径不对，冷机 12–30 s 重启不现实。

**七步闭环**：预测（Nicky Case 的 Place Your Bets）→ 前提门禁（L4 全过、负载就位、每个注入故障有预批回退方案，CxPlanner）→ 注入 → 三屏观察 → 判定 PASS/FAIL/ABORT/HOLD → 生成问题台账并绑定相机视角 → 整改后复测（新一次运行）。

**剧本 A 拉闸黑启动**（BICSI 备考材料示意时间线，二手）：T=0 UPS 接管；T+7 s 柴发额定转速；T+8.5 s 首台合并机母线；T+9.5 s 经 ATS 供电；T+12 s 整流器 15–30 s 软加载；T+30 s 由 UPS 供电的泵循环蓄冷罐；T+3.5 min 冷机越过防频繁启动计时完成重启；T+6 min 冷冻水回到设定。判据：IT 零中断、温度不出包络。画面：电池直流反向流动、柴发转速表升起、ATS 拨杆翻转。

**剧本 B 柴发启动失败**：white-space 模型 78 s 判失败；单台柴发时 UPS 放电到低电量后掉电。dc-twin 复合场景说明冗余只在两份都在时才保护你。

**剧本 C 冷机失效+热时间线**：N+1 切换状态机：跳机报警 → BMS 启备用（开阀、启泵）→ 启动程序 → 负荷稳定 → 蓄冷罐回充，各段时长以厂家和 SOO 为准并在 L4 实测。WP179（第三方托管 PDF）：无制冷时温升「很容易达到 5 °C/min 或更高」；冷机重启通常 10–15 min，新技术 4–5 min；示例 1（400 kW、单柜 4 kW、供水 7.2 °C、只有 IT 接 UPS、柴发 60 s、冷机 12 min、无蓄冷）出现第二个温度峰，若重启只需 4 min，温度只略超论文的可接受上限 90 °F（约 32.2 °C）而不是超过 105 °F（约 40.6 °C）。BICSI 20 MW 案例：二次泵 VFD 只接柴发盘，机柜进风 75 s 内从 23 °C 升到 34 °C，超 ASHRAE A1 允许上限 32 °C。色带：推荐 18–27 °C、A1 允许 15–32 °C。

**剧本 D 控制失效**（CxPlanner 边缘场景）：BMS 网络中断、多设备同时断通信时本地逻辑能否保持、设定值冲突、传感器失效掩盖高温、邮件服务器宕机致报警不升级。阈值写法参考 99kevindk 动环接口规范（AGPL，只读文档：hi/hiHi、回差、延时确认、断通信 >30 s 记 info 级）和 Mirage 告警滞回（33 °C 触发、31 °C 清除，演示值）。

**验收**：学员独立完成一次 N+1 UPS 故障分析，每步有判定和台账条目。

## 12. 第十二刀 IST 剧本（下）：同时维护、液冷、消防/EPO、漏水与中国假负载方案

**剧本 E 计划性同时维护：UPS-A 转维修旁路**（Tier III 核心演示）
- 状态：确认旁路源健康 → UPS 转静态旁路 → SKRU（电磁钥匙释放单元）在电气许可满足后放出钥匙 → 钥匙插 MBB-A（维修旁路断路器）→ 合 MBB-A（先合后断）→ 断 UOB-A（输出）→ 断 UIB-A、SBB-A 和电池断路器 → LOTO 并「验-测-验」确认交直流无电（hold point）→ 维护 → 反序恢复，钥匙回 SKRU。参考 Caylor-Made procedures.ts 的 mop-ups-bypass / mop-ups-return 与 interlocks.ts（MIT，保留声明）。
- 判据：两路母线电能质量在项目规定包络内 ⚑；联锁负测试全过（逆变时取不出钥匙、无钥匙合不上 MBB）；每次变位在 EPMS 时间戳顺序与 MOP 一致；验电无电。Traver 幻灯片：UPS 下游关键路径不允许不带电，维护要做到 dead lugs。加 WP75 拓扑切换器：单路设计下维修旁路期间全部负载在原始电源上，2N 下只有 A 路降级。
- 画面：钥匙作为可见物体移动，KEY_INTERLOCK 线取钥后变虚线。

**剧本 F 液冷：CDU 主泵跳闸 → 备泵 → 设施水（FWS）中断 → 泄漏隔离**
- 状态：稳态 → 主泵跳闸 → 低流量/低压差报警 → 备泵升速 → 恢复（记录 TCS 供液温度上冲）→ 「冗余丧失」报警保持 → 关 FWS 阀，温度按热惯量上升 → 切冗余支路或备用 CDU → 泄漏点式传感器触发，只关该区阀门。时长均为厂家/项目值 ⚑；Caylor 的「冷板几乎不储热、约 30 s 降频」是模型假设。
- 依据：NSF PAR 论文（Binghamton 与 NVIDIA）实测 L2A CDU 额定 91 kW、PG-25、75 μm 过滤，瞬态测试压差保持 16.5 psi（文献示例，非通用值），流程含冲洗后检查过滤器杂质；Avtron 液冷负载箱五阶段；ASHRAE 第 5 版 W17–W+ 等级；aidc-calculator 提醒：只用风冷负载无法证明 CDU/TCS 在设计温差下的表现。nexus-datacenter-ceo（MIT，中文）有「CDU 泵组故障散热降至 50%」事件卡，只是经营游戏抽象。

**剧本 G 火警 → 洁净气体预放气 → HVAC/防火阀关闭 + EPO**
- 原则：IST 验证的是已批准的因果矩阵；放气通常做模拟释放。
- 时序例：Ham12-3 场景 Alert 3 s、Action 10 s、Fire1 16 s、Fire2 22 s、放气 52 s，全是教学压缩（basis T，无许可证）。
- 待核实数字（二手）：NFPA 76 预警 0.2%/ft、报警 1.0%/ft；NFPA 2001 卤代烃 10 s 达 95%、保持 ≥10 min、附录 C 门扇风机试验。NEC 645.10/645.11：断开 IT 与专用 HVAC，机房内 UPS 输出和电池一并断开（以当地版本为准）。EPO 在负载箱上单独测，只用于人身安全。

**剧本 H 漏水端到端**（Watts 2026-10-15）：系统级流量/压力/液位为主，绳式/点式为辅；慢漏与突发分设阈值；测断线报「传感器故障」而非沉默；负测试：正常阀门动作不应误报。

**剧本 I 中国：腾讯假负载方案改写**（原文只给假负载 4–6 kW、50%/100%、柴发短时 110% 等数字，其余判据为补充并标来源）：S0 前提（L3 签认、仪表合格、空调连续运行 ≥48 h［GB 50462-2015 条文说明］）→ S1 空载测线电压、零地电压（电压 +7%～−10%、±0.5 Hz、THD ≤5%［GB 50174］）→ S2 50% 红外测温（温差分级［NETA，经备考站转述］）→ S3 100% 电池放电 A级 ≥15 min［GB］、蓄冷 ≥UPS 时间［GB］→ S4 BA 群控 → S5 逐台故障，负载不中断 → S6 极限温升（中止阈值进风 32 °C［ASHRAE，转述］，需业主书面批准）→ S7 断一路、断两路市电，切换断电 0～10 ms［GB］、柴发 10 s 内供电［NFPA，转述］。记录用 GB 50462-2024 附录 H。

**资源**：https://github.com/Caylor-Made-Technologies/critical-facilities-sim/blob/main/src/content/procedures.ts 、https://par.nsf.gov/servlets/purl/10611018 、https://www.watts.com/blog/choosing-data-center-leak-detection-technology 、https://cloud.tencent.com/developer/article/1063952 、https://www.nfpa.org/codes-and-standards/free-access

**验收**：九个剧本都有时间轴、判据来源标签和对应的 FMEA 行。

## 13. 第十三刀 路线图与交给 Claude 的写法

**第 1 周：只改数据，不碰画面**
| 天 | 刀 | 任务 | 交给 Claude | 验收 |
|---|---|---|---|---|
| D1 | 1、2 | 七项体检 + 认引擎，截图存档 | — | 有分数和引擎名 |
| D2 | 5 | 建脱敏副本，选取数路线 | P1 | 核对表草稿 |
| D3 | 3 | topology.json：一条 2N 电力链 + 一套 N+1 冷站，≤60 节点 | P1 | 只读表能讲清原理 |
| D4 | 3、4 | cx.json + 等级与电压字段 + 出处标签 | P1 | 抽 10 个数字都有标签 |
| D5 | 7 | survives() 断言测试 | P3 | 单点清单与设计意图一致 |
| D6 | 3、4 | 中英标签与徽章文案规范 | — | 全部中文+缩写 |
| D7 | — | 只拿 JSON 给朋友讲 A 路失电 | — | 对方能复述 |

**第 1 月**：第 2 周（刀 6）生成 SLD/P&ID，点断路器看到下游失电；第 3 周（刀 8）3D 绑定位号、改造流动层、加减少动态效果支持（P2）；第 4 周（刀 7、9）simulate() + 可拖时间轴 + 压缩与缓存，截图逐像素一致、真机达标。
**第 1 季**：第 2 月（刀 10、11）Cx 透镜（P4）+ 四个基础剧本；第 3 月（刀 12）同时维护、液冷、消防、漏水与假负载剧本 + FMEA + 测验 + 给 prebill 导出工作量清单 + 资产台账。
**风险**：范围失控（只做一条链一套冷站）；数字被当规范（无出处不上线）；图纸泄密（5.5 清单）。

**装 Skill 与 MCP**
- Claude Code：技能文件夹放 ~/.claude/skills/<名称>/。claude.ai/桌面版（你的 prebill 是账户级技能）：把文件夹打成 zip（SKILL.md 在根部）在设置的技能页上传，菜单名以当前界面为准。
- Schematex MCP（https://schematex.js.org/mcp ，AGPL）：claude.ai 在设置的连接器页添加自定义连接器；Claude Code 运行 claude mcp add --transport http schematex https://schematex.js.org/mcp 。
- 可用：samsgates/animated-diagram（MIT；SKILL.md 仅 43 行，边类型都是软件用语，要补电力/冷冻水/冷却水/气流/控制）；isostate 三个 Skill（MIT）；wheresryan22/anatomy（MIT，需 Node 20.10+ 与 Chrome）；factory-sim 的 threejs-digital-twin（无许可证、繁体中文、无电气模型，仅个人用）。
- 不当知识源：log-wade（模板；6 MW Tier IV 算出约 210 周的未修缺陷）；Construction-Gamma（付费专有，可学不可贴）；lionelsimai（5,148 个样板空壳）；majiayu000（312,160 个指针占位文件）。
- 自建 cx-explainer-content：按 6HssNipEr（MIT，中文）章节顺序，加其 M0 规则「未说明采用 ASHRAE/Uptime 还是 GB 口径时先问」；它的 模式库.md 是无效 UTF-8，不要复制。

**提示词（五原则：先给数据和技术栈、一次一个可验收目标、写明不做什么、先计划后代码、数字带标签）**
- P1 图纸取拓扑：「输入单线图分块与 pdftotext 文字层；只输出 topology.json 草稿，参照示例结构并保证所有引用 id 都在 nodes；开关、阀门独立成节点；看不清写 null 和 unknown；另给上游-本设备-下游核对表。」
- P2 流动层：「为 CHWS/CHWR 边实现流动；速度=k×流量；方向由 from→to 和流量符号决定；stopped 静止、unknown 半透明无动画；支持 prefers-reduced-motion；不加依赖，先给计划。」
- P3 仿真：「写纯函数 simulate(topology, scenario)，时序读 constants.json（含范围和来源）；vitest 断言关键事件时刻、开式转换时负载最多一个电源、电池只在放电时下降。」
- P4 Cx 透镜：「L0–L6 状态着色+徽章+锁；透镜开时介质色退灰；不满足门禁写一句原因。」
- P5 只审查：「列出无出处数字、第三方代码及其许可证、物理错误（冷却塔接错环路、2N 共用 STS、双变换 UPS 写成要切换）；不确定写待核实。」

**验收 Claude 产出**：测试通过；数字与第一部分逐条对照；网址逐个打开；重点查级别口径混用（如把 L4 叫 IST）。

## A. 附录 A 可借鉴的 GitHub 项目总表（许可证与语言）

**教学讲解型**
| 项目 | 借什么（→刀）| 许可/语言 | 注意 |
|---|---|---|---|
| https://github.com/bugan9527-tech/data-center-3d-explainer | PIPELINE.md、BUILD_STEPS.md、supportSystems.js（3、8）| 代码 MIT；GLB 与 Blender 源为同仓库原创资产，用前确认 LICENSE 是否明确覆盖；简体中文 | 线上 404；无冷站和中压 |
| https://github.com/dsanusi/white-space | NOTES.md 时序常数、model.ts（7）| 无 LICENSE | 八张图只做完一张；480 V |
| https://samfclement.github.io/Data-Center-Power-Distribution/ | energized/carrying 两遍求解（3、7）| 无 LICENSE | 北美电压 |
| https://github.com/Ham12-3/data-center | FlowLine.tsx 脉冲着色器、PowerFlow.tsx（2N A/B、电池直流反向）、scenarios.ts（6 个带单元测试的场景含火灾/VESDA）、StaticBatch.tsx（8、12）| 无 LICENSE；无线上站 | 流动渲染技法本批最佳，只学不抄 |
| https://github.com/DavidVeksler/CheatSheets | 8 级缩放、流动图层开关、Operator check 列（8）| MIT | 3D 代码压缩成单行 |
| https://liyucheng1997.github.io/325_lab-digitaltwin-datacenter/ | Promise 驱动旁白（8）| 无 LICENSE；简体中文 | 无柴发冷机；失电后 CRAC 仍靠电池，过于乐观 |
| https://github.com/monapaopao/AIDC-twin | 中国电力链、CameraDirector（4、8）| 应用代码无 LICENSE | 线上 404 |
| https://github.com/ezraharris385/data-center-buildout | FlowPath 粒子（8）| 无 LICENSE | 61 个设备尺寸有 60 个是凭记忆估计 |

**数字孪生与数据型**
| 项目 | 借什么 | 许可 | 注意 |
|---|---|---|---|
| https://github.com/XdruidR/clonee-hyperscale-dc-explorer | commissioning.ts、turnover.ts、Flows.tsx（3、10）| 无 LICENSE | 无 OPR/RACI/FMEA；残留新西兰项目字样 |
| https://github.com/chetas1208/Crusoe-Cooler-System | tube.ts、PipeFlow.tsx（8）| MIT | 依赖重，只拷文件 |
| https://github.com/NishikawaButterfly/dc-twin | 快照与场景格式（3、7）| MIT | 只算有功容量；HEAD 请求返回 404，GET 正常 |
| https://github.com/Caylor-Made-Technologies/critical-facilities-sim | power.ts、interlocks.ts、procedures.ts（7、12）| MIT | 需连同 types.ts、physics.ts；AI 快速生成；默认 °F |
| https://github.com/dmvevents/aidc-calculator | risks.html、L0–L6 色、URL hash（2、10）| MIT | 3D 无流动 |
| https://github.com/qinghao6972/3D-air-cooled-heat-pump-twin | .blend/.glb、点表（B、8）| MIT | 流速固定 2.15 m/s 与 README 不符 |
| https://github.com/tansitong486-hue/prototype | flowState 约定、cp-* 接管口命名（3）| 无 LICENSE | 只学约定 |
| https://github.com/zzugbb/Mirage | 叠加层约束、告警滞回（11）| 代码 Apache；资产 CC BY-NC | 电力气流层未实现 |

**单线图、等轴测与模拟器**：isostate（MIT）、sld-kit（MIT）、Schematex（AGPL）、power-service-toolbox（AGPL；08/09 为空壳）、NextJS-Utilix（MIT；无时间行为）、FUXA（MIT）、samfclement/Data-Center-Commissioning（无 LICENSE，学流程）、pshenok/datacenter-survival（MIT；电压跌落时 UPS 不动作）、CoolingTowerSim（MIT；办公楼冷却水，°F）、cx-preflight-edge（Apache；韩文）、samfclement/Data-Center-Troubleshooting（无 LICENSE；英制）。

**不推荐深挖**：DaisyDeng0111（品牌表混入家具五金厂和大疆；无 LICENSE）；softwarelink-net/26-sc-sim-bid（无 ATS、电池会自己回升）；dhruvameena7855（自称 Tier-IV 但只有单 ATS、单柴发、单 UPS）；faryanra（README 称 Tier-III、写单台 800 kVA UPS 和 4 台 CRAH，YAML 却列 2 台 UPS、3 台 CRAH、2 台冷机——问题是说明与配置不一致加 Tier 宣称）；Krud3、Farrel492（内容浅、无 LICENSE）。

**前期评估的 19 个 Skill/知识型仓库**：3D 价值评分都 ≤4，只借数据结构：log-wade 的 11 类系统清单、lpolovets 的分类法（7 类 8 族 5 个维度，35 条设备）、GenesisAI 的 8 列记录表、mat-skills 的判据句式、6HssNipEr 的章节顺序。

## B. 附录 B 资产台账与找错题

**B.1 资产来源**
- 程序化建模优先（只画通用设备，不放商标铭牌）。
- CC0：Poly Haven（https://polyhaven.com/models ，环境光与材质）、Kenney（https://kenney.nl/assets ，无数据中心套件）。
- Sketchfab：https://sketchfab.com/search?q=data+center&type=models 用许可筛选；Schneider（https://sketchfab.com/SchneiderElectric ）、Vertiv（https://sketchfab.com/vertiv/models ）逐个确认可否下载与许可。
- CGTrader 冷却设备包约 15.75 美元（https://www.cgtrader.com/3d-model-packs/cooling-infrastructure ）。
- 属性模板：NVIDIA SimReady（一台 CDU 带 81 个属性）https://docs.omniverse.nvidia.com/dsx/latest/simready-assets.html 。
- 设计参考：OCP 文件 https://www.opencompute.org/wp-content/uploads/2026/10/Open-Data-center-Spec-Revision-0.7.0-4.pdf 的标题是《Open Data Center: Next-Generation ML Infrastructure Design Principles, Revision 0.7.0》（2026-08-27），是 ML 基础设施设计原则，不是调试标准。
- 真实曲线：OpenModelica 数据中心冷站示例 https://build.openmodelica.org/Documentation/Buildings.Applications.DataCenters.ChillerCooled.Examples.html 。
- 讲解金标准：https://ciechanow.ski/mechanical-watch/ 。
**台账列**：资产｜来源 URL｜许可证｜作者｜是否修改｜能否商用｜署名位置。验收：台账里没有「许可证未知」行。

**B.2 公开项目里见过的错误（直接做找错题）**
1. 冷却塔接在冷冻水环路上（tier3-risk-story）。
2. 自称 Tier IV 却只有单 ATS/单柴发/单 UPS（dhruvameena7855）；README 与配置不一致（faryanra）。
3. 没有 ATS、确认 UPS 在线后电池电量上升（26-sc-sim-bid）。
4. 「2N」两路共用一台 STS（Schematex 示例）。
5. 双变换 UPS 写成「不到 4 ms 切到电池」，A1 允许范围 15–32 °C 当成推荐范围（ekcwilson-git/-l5-ist-tccf-teaching；推荐范围是 18–27 °C）。
6. 市电失电后 CRAC 继续靠电池制冷（325_lab）；WP179 指出 CRAC/CRAH 风机、冷冻泵、冷机通常不接 UPS。
7. 冷机 12–30 s 重启（cx-preflight-edge）；WP179 给的是 10–15 min，新技术 4–5 min。
8. 流速宣称随仿真变化，代码却是常数（qinghao6972）。
9. Caylor 的流速公式被当成正比（第 8 刀）。
10. 可疑引用：aidc-uptime-cx-learn 中部分「逐字 Uptime 原文」和「TCCF 要求 RACI」疑似编造；ASHRAE Guideline 1.6P 确实存在，首次公开评审期 2026-10-02 至 2026-11-16，任何声称引用其「正式发布条文」的页面都不可信；「99.982% 可用度」是流传说法。
11. NFPA 110 混淆：Construction-Gamma 写「年度负载试验 30%/30 min」，实为把每月运行与年度附加负载试验（50% 30 min + 75% 1 h）混在一起。

**自测**：某 IST 脚本写「冷机跳机后 20 s 内备用机满负荷」，问题台账怎么写？（引用 WP179，要求厂家提供重启时间数据，标 ⚑ 待核实。）

## 资源排行

| 排名 | 名称 | 类型 | 语言 | 用来补什么 | 怎么用 | 注意 |
|---|---|---|---|---|---|---|
| 1 | [bugan9527-tech/data-center-3d-explainer](https://github.com/bugan9527-tech/data-center-3d-explainer) | GitHub 仓库（方法 + R3F 代码 + Blender 资产） | 简体中文 | 「先写数据再画像素」的方法：三张表、单一时钟、方向三件套 | 读 PIPELINE.md 和 docs/BUILD_STEPS.md 第 1–6 步，把网站数据改成节点/阶段/布局三张表并加 cx 列 | 代码 MIT，GLB 是否受 LICENSE 覆盖需确认；线上 404；无冷站和中压 |
| 2 | [XdruidR/clonee-hyperscale-dc-explorer](https://github.com/XdruidR/clonee-hyperscale-dc-explorer) | GitHub 仓库（R3F + 调试模式） | English | 3D 加调试层的最佳参考：L0–L6 证据、移交包门禁、按介质流动样式 | 读 commissioning.ts、turnover.ts、store.ts 的 blockersForPackage()，照结构重写 cx.json | 无 LICENSE，只学重写；Cx 内容是通用惯例 |
| 3 | [dsanusi/white-space](https://github.com/dsanusi/white-space) | GitHub 仓库（2.5D BMS/EPMS 讲解） | English | 市电失电时序常数与「一个纯函数驱动所有视图」架构 | 把 NOTES.md 常数整理进 constants.json，并与 BICSI 范围并列 | 无 LICENSE；八张图只做完一张 |
| 4 | [Caylor-Made-Technologies/critical-facilities-sim](https://github.com/Caylor-Made-Technologies/critical-facilities-sim) | GitHub 仓库 + 在线 PWA | English | 可合法复用的电气求解器、Kirk 钥匙联锁、UPS 维修旁路 MOP | 复用 power.ts、interlocks.ts（连同 types.ts、physics.ts），改编 mop-ups-bypass 为剧本 E | AI 快速生成未经工程师审核；默认 °F；流速公式不成正比 |
| 5 | [samfclement/Data-Center-Commissioning（在线）](https://samfclement.github.io/Data-Center-Commissioning/) | 在线模拟器 | English | 证明不用 3D 也能做完整调试训练；门禁、见证方、10 个 IST 场景 | 按 Planning → L1–L5 → Turnover 走一遍，用自己的话改写剧本模板 | 无 LICENSE、JS 已压缩；标 standard 的数值只有约 12 个 |
| 6 | [NishikawaButterfly/dc-twin](https://github.com/NishikawaButterfly/dc-twin) | GitHub 仓库（容量仿真） | English | 拓扑快照与事件场景格式，核对 survives() | 读 EXPLAINER.md，把 composite-failure 场景改写成 IST 步骤表 | 只算无损有功容量，无冷却侧 |
| 7 | [GB 50174-2017 正文 PDF](https://www.jyecorp.com/static/upload/file/20220301/1646096920490057.pdf) | 国家标准正文 | 简体中文 | A/B/C 级定义、最低等级规则、附录 A 冗余要求 | 把附录 A 各行写成 redundancy_by_grade 字段 | 附录 A 为图片页，部分行需对照纸本 |
| 8 | [腾讯：数据中心假负载验证测试实战指导方案](https://cloud.tencent.com/developer/article/1063952) | 中文实操文章 | 简体中文 | 中国 L5 流程原型，改写为剧本 I | 按空载→半载→满载→群控→故障→极限温升→联调排序，补数值判据并标来源 | 原文多写「符合设计要求」，缺数字阈值 |
| 9 | [ifcopenshell.util.system](https://docs.ifcopenshell.org/autoapi/ifcopenshell/util/system/index.html) | 官方 API 文档 | English | 从 IFC 端口连接抽上下游拓扑 | 先查 IfcRelConnectsPorts 数量，再用 get_connected_to/from 双向核对 | Revit 导出常不带连接关系 |
| 10 | [Claude 视觉文档](https://platform.claude.com/docs/en/build-with-claude/vision) | 官方文档 | English | 图纸分块尺寸与定位、计数的局限 | 按长边上限分块重叠 10–15%，同时给文字层 | 定位与计数只是近似，需人工核对表 |
| 11 | [ExifTool PDF 标签说明](https://exiftool.org/TagNames/PDF.html) | 工具文档 | English | 说明为什么删 PDF 元数据后还要 qpdf --linearize | exiftool 清元数据后用 qpdf 重写 | 元数据清理不等于内容涂黑 |
| 12 | [PyMuPDF Page（涂黑接口）](https://pymupdf.readthedocs.io/en/latest/page.html) | 库文档 | English | 真正删除标题栏、项目名、IP | add_redact_annot + apply_redactions，框每边放大约 5 pt | AGPL/商业双许可；扫描件需先 OCR |
| 13 | [model-viewer 文档](https://modelviewer.dev/docs/index.html) | 官方文档 | English | 引擎分诊后做单设备课程卡片 | 热点 slot 标检查点，按材质改色 | 无按节点显隐 API |
| 14 | [three.js InstancedFlow 示例](https://threejs.org/examples/#webgl_modifier_curve_instanced) | 官方示例 | English | 在 GPU 上沿管线移动大量箭头 | 读 CurveModifier.js：setCurve、moveIndividualAlongCurve | 仅 WebGLRenderer |
| 15 | [chetas1208/Crusoe-Cooler-System](https://github.com/chetas1208/Crusoe-Cooler-System) | GitHub 仓库（液冷管道渲染） | English | 流速流向取自求解流量的着色器 | 复制 tube.ts、PipeFlow.tsx 并保留 MIT 声明 | 技术栈重；速度有 2.5 上限截断 |
| 16 | [React Three Fiber: Scaling performance](https://r3f.docs.pmnd.rs/advanced/scaling-performance) | 官方文档 | English | 手机性能：按需渲染、LOD、PerformanceMonitor | frameloop=demand + invalidate() | 仅 R3F |
| 17 | [Netlify Caching overview](https://docs.netlify.com/build/caching/caching-overview) | 官方文档 | English | 默认缓存头与长期缓存 | 只给带哈希或版本目录的文件设 immutable | 无版本号的模型不要设 immutable |
| 18 | [adrisanchu/sld-kit](https://adrisanchu.github.io/sld-kit/) | 单线图引擎 + 演示 | English | FlowStyle：active/direction/speed/intensity | 写 resolveFlow(lineId)，intensity=负载/容量 | 输电站术语；无自身求解器 |
| 19 | [sebastianwessel/isostate](https://sebastianwessel.github.io/isostate/) | 2.5D 工具 + Claude Skill | English | 手机友好的设备机理分步场景 | 装两个 Skill 让 Claude 写 YAML 和画资产 | 电气暖通资产要自画；连线无状态模型 |
| 20 | [Skeeter-spec/power-service-toolbox](https://skeeter-spec.github.io/power-service-toolbox/) | 在线电气工具 | English | 拿掉部件找单点故障、ATS 时序泳道图 | 在根地址后接 projects/01-power-chain/build/index.html | AGPL；只有电气 |
| 21 | [Schneider WP179](https://www.sustainabilitymatters.net.au/content/sustainability/white-paper/data-centre-temperature-rise-during-a-cooling-system-outage-303657868/download) | 白皮书 | English | 热时间线与冷机失效剧本依据 | 用示例 1 参数画温升曲线，对比 12 min 与 4 min 重启 | 第三方托管；温度以 °F 给出需换算 |
| 22 | [Uptime（Todd Traver）Tier 幻灯片](https://nex75.iea-ebc.org/Data/Sites/4/media/events/2020-10/presentations/1.4b--traver--uptime-institute.pdf) | 会议幻灯片 | English | 同时可维护定义：each and every 含阀门和开关柜 | 据此检查开关阀门是否都建成节点 | 日期只能从 URL 推断；以 Tier Standard 为准 |
| 23 | [dmvevents/aidc-calculator](https://dmvevents.github.io/aidc-calculator/) | 在线计算器 + FMEA 数据 | English | 116 个失效模式做 FMEA 层 | 筛 phase=COMMISSION，把 detection 改写成测试步骤 | 3D 无流动动画 |
| 24 | [NSF PAR：CDU 调试论文](https://par.nsf.gov/servlets/purl/10611018) | 学术论文 | English | 液冷剧本 F 的调试流程和数据 | 把冲洗、充液、分级水力调试写进 CDU 组件页 | 文献示例值，非通用 |
| 25 | [Ham12-3/data-center](https://github.com/Ham12-3/data-center) | GitHub 仓库（R3F 讲解） | English | 流动脉冲着色器、2N 电池反向流、火灾场景时间线 | 只读 FlowLine.tsx、PowerFlow.tsx、scenarios.ts 学思路 | 无 LICENSE，不得复制；无线上站 |
| 26 | [Mayer 多媒体原则（一页摘要）](https://ugc.futurelearn.com/uploads/files/7d/d6/7dd6188d-c343-4311-b064-ac98d2c95abc/Multimedia_Principles._R._E._Mayer__2020.pdf) | 教学设计原则 | English | 逐课自检预训练、分段、信号、沉浸原则 | 每课按 15 条打勾 | 二手摘要，非原书 |

## 参考来源

- https://faculty.washington.edu/aragon/classes/hcde411/w13/readings/Tversky_AnimationFacilitate_IJHCS02.pdf
- https://ugc.futurelearn.com/uploads/files/7d/d6/7dd6188d-c343-4311-b064-ac98d2c95abc/Multimedia_Principles._R._E._Mayer__2020.pdf
- https://www.nngroup.com/articles/progressive-disclosure/
- https://blog.51cto.com/yeyunfei/4756741
- https://nex75.iea-ebc.org/Data/Sites/4/media/events/2020-10/presentations/1.4b--traver--uptime-institute.pdf
- https://uptimeinstitute.com/resources/asset/tier-standard-topology
- https://docs.nvidia.com/datacenter/dps/versions/latest/sdk/administrator/operations/pdn_diagrams.html
- https://www.csemag.com/?p=19168
- https://www.sustainabilitymatters.net.au/content/sustainability/white-paper/data-centre-temperature-rise-during-a-cooling-system-outage-303657868/download
- https://open-exam-prep.com/study-guides/bicsi-dcdc/ch16-commissioning-ist/sec03-level5-ist-turnover
- https://cxplanner.com/data-centers/resources/pressure-testing-your-ist-plan
- https://doh.sd.gov/media/4gun1eet/emergency-and-standby-power-systems-installation-acceptance.pdf
- https://www.npmjs.com/package/@splinetool/runtime
- https://spline.design/pricing
- https://doc.babylonjs.com/features/featuresDeepDive/mesh/copies/thinInstances
- https://docs.unity.com/en-us/engine/6000.0/manual/platform-specific/webgl/develop/interactingwithbrowserscripting/web-interacting-browser-unity-to-js
- https://unity.com/products/unity-personal
- https://modelviewer.dev/docs/index.html
- https://sketchfab.com/developers/viewer/functions
- https://sketchfab.com/plans
- https://github.com/airbnb/lottie-web
- https://www.jyecorp.com/static/upload/file/20220301/1646096920490057.pdf
- https://cn.jyecorp.com/static/upload/file/20220301/1646096864775673.pdf
- https://github.com/tomatoparkdao/registered-architect/blob/HEAD/skills/country-china/references/standards/text/gb-50174-2017%E6%95%B0%E6%8D%AE%E4%B8%AD%E5%BF%83%E8%AE%BE%E8%AE%A1%E8%A7%84%E8%8C%83-e99839c4-001.md
- https://www.gongbiaoku.com/mobile/book/ju425808iun
- https://www.chinesestandard.net/PDF/English.amp.aspx/YDT2378-2020
- https://www.chinesestandard.net/PDF/English.amp.aspx/YDT3089-2016
- https://www.chinesestandard.net/PDF/English.amp.aspx/YDT4628-2023
- https://brandnews.deltaww.com/EN/SpecialDetail/1440
- https://arcwei2060.site
- https://cloud.tencent.com/developer/article/1063952
- https://docs.thatopen.com/Tutorials/Components/Core/IDSSpecifications
- https://docs.thatopen.com/Tutorials/Components/Core/BCFTopics
- https://github.com/xeokit/xeokit-sdk
- https://docs.ifcopenshell.org/ifcconvert/usage.html
- https://docs.ifcopenshell.org/autoapi/ifcopenshell/util/system/index.html
- https://bonsaibim.org/download.html
- https://github.com/mozilla/pdf.js/releases/tag/v4.0.189
- https://manpages.debian.org/testing/poppler-utils/pdftotext.1.en.html
- https://manpages.debian.org/testing/poppler-utils/pdftocairo.1.en.html
- https://inkscape.org/doc/inkscape-man.html
- https://github.com/LibreDWG/libredwg/blob/master/programs/dwg2SVG.c
- https://www.opendesign.com/guestfiles/oda_file_converter
- https://ezdxf.readthedocs.io/en/stable/launcher.html
- https://platform.claude.com/docs/en/build-with-claude/vision
- https://arxiv.org/abs/2411.13929
- https://exiftool.org/TagNames/PDF.html
- https://qpdf.readthedocs.io/en/stable/cli.html
- https://pymupdf.readthedocs.io/en/latest/page.html
- https://github.com/Caylor-Made-Technologies/critical-facilities-sim/blob/main/src/content/procedures.ts
- https://github.com/Caylor-Made-Technologies/critical-facilities-sim/blob/main/src/sim/interlocks.ts
- https://www.se.com/us/en/download/document/SPD_SADE-5TPL8X_EN
- https://par.nsf.gov/servlets/purl/10611018
- https://avtronpower.com/wp-content/uploads/2026/02/Simplifying-Data-Ctr-readiness-LCLB.pdf
- https://www.upsite.com/blog/major-changes-to-ashraes-fifth-edition-of-thermal-guidelines-part-3-liquid-cooling-chapter-updates/
- https://www.watts.com/blog/choosing-data-center-leak-detection-technology
- https://www.nfpa.org/codes-and-standards/free-access
- https://www.ecmweb.com/code-basics/exploring-requirements-information-technology-equipment
- https://raw.githubusercontent.com/Ham12-3/data-center/master/lib/sim/scenarios.ts
- https://github.com/B-M-Capital-Research/nexus-datacenter-ceo
- https://threejs.org/examples/#webgl_modifier_curve_instanced
- https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/jsm/modifiers/CurveModifier.js
- https://github.com/mrdoob/three.js/issues/18533
- https://github.com/pmndrs/meshline
- https://z2586300277.github.io/examples/three/application/flowTube.html
- https://github.com/yomotsu/camera-controls
- https://blog.codepen.io/2025/05/05/chris-corner-gsap-more-like-freesap/
- https://www.theatrejs.com/docs/latest/getting-started/with-react-three-fiber
- https://sbcode.net/threejs/annotations/
- https://r3f.docs.pmnd.rs/advanced/scaling-performance
- https://discoverthreejs.com/tips-and-tricks/
- https://gltf-transform.dev/cli
- https://docs.netlify.com/build/caching/caching-overview
- https://docs.netlify.com/manage/routing/headers/
- https://schematex.js.org/examples/sld-data-center-2n-ups
- https://schematex.js.org/mcp
- https://adrisanchu.github.io/sld-kit/
- https://reactflow.dev/examples/edges/animating-edges
- https://sebastianwessel.github.io/isostate/
- https://www.npmjs.com/package/open-pid-icons
- https://formscad-community.pages.dev/packs/isa-pid-symbols/
- https://observablehq.com/@benjamesdavis/elijah-meeks-particle-sankey
- https://github.com/bugan9527-tech/data-center-3d-explainer
- https://github.com/XdruidR/clonee-hyperscale-dc-explorer
- https://github.com/dsanusi/white-space
- https://github.com/wheresryan22/anatomy
- https://samfclement.github.io/Data-Center-Commissioning/
- https://samfclement.github.io/Data-Center-Power-Distribution/
- https://github.com/NishikawaButterfly/dc-twin
- https://github.com/chetas1208/Crusoe-Cooler-System
- https://github.com/Caylor-Made-Technologies/critical-facilities-sim
- https://github.com/qinghao6972/3D-air-cooled-heat-pump-twin
- https://github.com/zzugbb/Mirage
- https://dmvevents.github.io/aidc-calculator/
- https://github.com/tansitong486-hue/prototype
- https://github.com/99kevindk/idc-visual-ops
- https://github.com/monapaopao/AIDC-twin
- https://github.com/ezraharris385/data-center-buildout
- https://github.com/Ham12-3/data-center
- https://github.com/DavidVeksler/CheatSheets
- https://liyucheng1997.github.io/325_lab-digitaltwin-datacenter/
- https://github.com/mizcausevic-dev/data-center-power-delivery-chain-explainer
- https://skeeter-spec.github.io/power-service-toolbox/
- https://github.com/jackysetiawan6/NextJS-Utilix
- https://github.com/frangoteam/FUXA
- https://github.com/SchemaTex/SchemaTex
- https://github.com/Yeongje-Kim/cx-preflight-edge
- https://github.com/samfclement/Data-Center-Troubleshooting
- https://github.com/pshenok/datacenter-survival
- https://github.com/jamesccupps/CoolingTowerSim
- https://github.com/softwarelink-net/26-sc-sim-bid
- https://github.com/dhruvameena7855/Data-Center-Power-Chain-Simulator
- https://github.com/faryanra/data-center-digital-twin
- https://github.com/DaisyDeng0111/datacenter-teardown
- https://github.com/Krud3/dc_as_system
- https://github.com/Farrel492/Visualisasi_Data_Center
- https://github.com/ekcwilson-git/tier3-risk-story
- https://github.com/ekcwilson-git/tier3-cx-teaching
- https://github.com/ekcwilson-git/AIDC-ELEC-L2L3-Review
- https://github.com/ekcwilson-git/aidc-uptime-cx-learn
- https://github.com/ekcwilson-git/-l5-ist-tccf-teaching
- https://github.com/samsgates/animated-diagram
- https://github.com/nutcelvischen-jpg/factory-sim
- https://github.com/6HssNipEr/wind-farm-grid-commissioning-skill
- https://github.com/log-wade/datacenter-mcp-server
- https://github.com/mbcoalson/mat-skills
- https://github.com/thediversecandidate/GenesisAI
- https://github.com/lpolovets/reference
- https://github.com/Construction-Gamma/construction-gamma-skills
- https://github.com/Tibsfox/gsd-skill-creator
- https://github.com/lionelsimai/claude-skills-collection
- https://github.com/majiayu000/claude-skill-registry
- https://github.com/ThatOpen/engine_components
- https://polyhaven.com/models
- https://kenney.nl/assets
- https://sketchfab.com/search?q=data+center&type=models
- https://sketchfab.com/SchneiderElectric
- https://sketchfab.com/vertiv/models
- https://www.cgtrader.com/3d-model-packs/cooling-infrastructure
- https://docs.omniverse.nvidia.com/dsx/latest/simready-assets.html
- https://www.opencompute.org/wp-content/uploads/2026/10/Open-Data-center-Spec-Revision-0.7.0-4.pdf
- https://build.openmodelica.org/Documentation/Buildings.Applications.DataCenters.ChillerCooled.Examples.html
- https://ciechanow.ski/mechanical-watch/
- https://www.ashrae.org/file%20library/technical%20resources/standards%20and%20guidelines/standards%20actions/sa-oct_2_2026.pdf
