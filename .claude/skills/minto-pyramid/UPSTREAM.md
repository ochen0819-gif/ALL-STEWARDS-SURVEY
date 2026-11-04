# 来源与本地改动

上游：https://github.com/millwright-labs/minto-pyramid-skill
版本：49d1f584f5661f4dd47c834f5a7f9f0c4c4279d0（2026-08-16）
许可：MIT（见 LICENSE，原作者版权声明保留）
未带过来：README.md、evals/（评测材料，运行时用不到）

本地改动（2026-11-04）：
- frontmatter 的 description 改成 YAML 块标量（原文值里含冒号，严格 YAML 解析会报错）。
- description 加上述标稿、MOP、测试程序（后两者不套金字塔），去掉 "status update with an ask"，例行进度汇报交给 read-in-seconds。
- Step 0 问题 2 后加一句：中文里"改、重写、去AI化、润色、帮我弄一下、按金字塔改"都算要求修改；只说"看看、你觉得呢"不算，仍按原规则只回两句。
