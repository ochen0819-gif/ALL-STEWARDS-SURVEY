#!/usr/bin/env python3
"""Print the storyline of a deck or document from its titles alone.

Usage:
    python3 storyline.py <file.pptx|file.docx|file.md> [--max-chars 110]

Reads slide titles (pptx), heading paragraphs (docx: styles Heading 1-3 / 标题 1-3)
or markdown headings, prints them in order, and flags titles that fail the
horizontal-logic test: a reader who sees only the titles should get the whole
argument. Flags:
    LABEL   topic label, not a claim (no verb or under four words; "Overview",
            "Background", "市场分析", "Introduction" ...)
    LONG    over --max-chars characters (two lines at 20pt)
    COLON   "X: from A to B" style title; usually a label in disguise
    QUESTION a title that asks instead of answers
    NONUM   a title about size, growth, cost or share that carries no number

Exit code 0 always; this is a readout for a human, not a gate.
"""
import argparse
import os
import re
import sys

LABEL_WORDS = {"overview", "background", "introduction", "summary", "agenda", "context", "analysis",
               "approach", "methodology", "next steps", "appendix", "financials", "team", "market",
               "competition", "product", "solution", "problem", "conclusion", "recommendations",
               "key takeaways", "thank you", "q&a", "qa", "update", "status",
               "概述", "概览", "背景", "引言", "目录", "议程", "市场分析", "行业分析", "竞争分析",
               "产品介绍", "团队介绍", "财务预测", "融资计划", "风险分析", "总结", "谢谢", "附录",
               "项目概况", "公司简介", "发展规划", "商业模式", "下一步", "现状", "问题", "方案"}
NUM_TOPICS = re.compile(r"(market|growth|cost|revenue|margin|share|size|price|saving|cagr|"
                        r"市场|增长|成本|收入|毛利|份额|规模|价格|节省|利润|产能)", re.I)
VERB_HINT = re.compile(r"\b(is|are|will|can|should|must|has|have|need|needs|drives|grows|falls|"
                       r"rises|costs|saves|beats|requires|delivers|shows|means|reaches|exceeds|"
                       r"doubles|cuts|adds|loses|wins|outperforms|fails|lacks|depends|stays|remains)\b", re.I)
ZH_VERB_HINT = re.compile(r"(是|为|将|能|应|需|要|可|已|比|超|达|占|降|升|增|减|缺|靠|取决|决定|带来|"
                          r"意味|说明|只有|才|不足|过高|过低|领先|落后|亏|赚|省|卡在|等于|高于|低于)")


def titles_pptx(path):
    from pptx import Presentation
    out = []
    for i, s in enumerate(Presentation(path).slides, 1):
        t = ""
        if s.shapes.title is not None and s.shapes.title.has_text_frame:
            t = s.shapes.title.text_frame.text
        if not t:
            # fall back to the top-most text box
            boxes = [sh for sh in s.shapes if sh.has_text_frame and sh.text_frame.text.strip()]
            boxes.sort(key=lambda sh: (sh.top or 0))
            t = boxes[0].text_frame.text if boxes else ""
        out.append((f"S{i}", t.strip().replace("\n", " ")))
    return out


def titles_docx(path):
    import docx
    out = []
    for p in docx.Document(path).paragraphs:
        name = (p.style.name or "").lower()
        if name.startswith("heading") or name.startswith("标题") or name == "title":
            lvl = re.sub(r"\D", "", name) or "1"
            out.append((f"H{lvl}", p.text.strip()))
    return out


def titles_md(path):
    out = []
    with open(path, encoding="utf-8", errors="ignore") as f:
        for line in f:
            m = re.match(r"^(#{1,4})\s+(.*)", line)
            if m:
                out.append((f"H{len(m.group(1))}", m.group(2).strip()))
    return out


def flags(title, max_chars):
    f = []
    t = title.strip()
    low = t.lower().strip(" :：")
    is_zh = bool(re.search(r"[一-鿿]", t))
    if not t:
        return ["EMPTY"]
    if low in LABEL_WORDS or re.sub(r"[\d.\s]+", "", low) in LABEL_WORDS:
        f.append("LABEL")
    elif is_zh:
        if len(t) <= 8 and not ZH_VERB_HINT.search(t):
            f.append("LABEL")
    else:
        words = re.findall(r"[A-Za-z']+", t)
        if len(words) < 4 or not VERB_HINT.search(t):
            f.append("LABEL")
    if len(t) > max_chars:
        f.append("LONG")
    if re.search(r"[:：]\s*(from|从)|[:：]\s*\S+.*(到|to)\s", t, re.I) or (re.search(r"[:：]", t) and len(t) < 40):
        f.append("COLON")
    if t.endswith("?") or t.endswith("？"):
        f.append("QUESTION")
    if NUM_TOPICS.search(t) and not re.search(r"\d", t):
        f.append("NONUM")
    return f


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("file")
    ap.add_argument("--max-chars", type=int, default=110)
    a = ap.parse_args()
    ext = os.path.splitext(a.file)[1].lower()
    items = {".pptx": titles_pptx, ".docx": titles_docx}.get(ext, titles_md)(a.file)
    bad = 0
    for tag, t in items:
        fl = flags(t, a.max_chars)
        bad += bool(fl)
        print(f"{tag:<4} {','.join(fl) or '-':<18} {t}")
    print(f"\n{len(items)} titles, {bad} flagged. Read the titles top to bottom: "
          f"do they alone make the argument? If not, the storyline is not done.")


if __name__ == "__main__":
    main()
