# skills

`business-plan-and-consulting/` 是技能源码；`dist/business-plan-and-consulting.skill` 是打包好的安装文件（在 Claude 里打开该文件点 Save skill 即可装入个人技能）。

技能做什么：把商业计划书、咨询报告、融资与 IPO 文件、steering committee 材料改写或生成到顶级事务所与投行的逻辑和视觉水平，并清掉 AI 痕迹。与已有的 ai-eraser、docx、pptx、xlsx、pdf 技能配合使用。

目录：
- `SKILL.md` 工作流程、三种模式、硬规则、交付自检
- `references/` 故事线与标题、文件类型骨架、财务章节、视觉规范、用词、出处
- `scripts/` storyline.py（标题连读与标签检测）、check_numbers.py（合计与同名数字核对）、scan.py（AI 词、黑话、元数据）
- `assets/` pre-build brief 与 dot-dash 模板、pptxgenjs 版式与调色板
- `evals/` 三个测试用例，可用 `claude plugin eval skills/business-plan-and-consulting --allow-tools Write,Edit,Bash --scaffold` 复跑
