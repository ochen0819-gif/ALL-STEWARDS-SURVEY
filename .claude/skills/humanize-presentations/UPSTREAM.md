# 来源与本地改动

上游：https://github.com/dmmdea/humanize-presentations
版本：9510a5f5ae6c2689ffc0c4d77f68194c1eaee7f3（2026-08-15）
许可：MIT（见 LICENSE，原作者版权声明保留）
未带过来：README.md

本地改动（2026-11-04）：
- 修正 pptx 技能的查找路径：原来的 '*skills/pptx/SKILL.md' 找不到本环境里的同步技能（路径是 skills/synced/<id>/pptx/），改成 '*/pptx/SKILL.md'。已实测能找到，validate.py 能跑通。
- description 加中文触发词。
- Word budget 加中文阈值，取自 roy-tong/deck-humanizer（MIT，051880eb49d398af61caa09bbbca318c9400ddda）：主标题不超过 16 字，超过 24 字说明还在描述；每组要点不超过 5 条；单条不超过 2 行（约 30 字）；每页正文不超过 9 行。
- Non-English decks 加中文 AI 痕迹（二元对比骨架、旨在/赋能/闭环一类、名词化空动词、翻译腔、页面上的首先其次）；中文破折号每页最多留一处，不全删；L2、IST、RFS、FAT、SAT、MOP、GC 等行业缩写保留。
