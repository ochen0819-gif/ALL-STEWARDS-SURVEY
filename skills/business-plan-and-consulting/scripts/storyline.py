#!/usr/bin/env python3
"""Print the storyline of a deck or document from its titles alone.

Usage:
    python3 storyline.py <file.pptx|file.docx|file.md> [--max-chars 110]

Reads slide titles (pptx), heading paragraphs (docx: styles Heading 1-3 / 标题 1-3)
or markdown headings, prints them in order, and flags titles that fail the
horizontal-logic test: a reader who sees only the titles should get the whole
argument. Flags:
    LABEL   topic label, not a claim (no verb or under four words; "Overview",
            "Background", "市场分析", "Introduction" ...). The first slide of a
            .pptx is tagged COV and not scored when it looks like a cover
            (three or fewer text boxes, no table or chart).
    LONG    over --max-chars characters (two lines at 20pt)
    COLON   "Label: claim" or "X: from A to B" title; the label half is a
            table-of-contents entry, start the title with the subject instead
    QUESTION a title that asks instead of answers
    NONUM   a title about size, growth, cost or share that carries no number
    COUNT   title names a count of elements ("three reasons", "5 steps", "三大优势");
            a count is not a claim, say what the elements add up to
    PATTERN printed once at the end when 60 percent or more of titles open with
            the same two words; a deck whose titles share one template reads as
            copied, not argued

For .pptx it also prints words per slide (consulting main-flow slides run
60 to 175 words) and the share of sentence titles (top decks: 70 percent+).

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
COUNT_RE = re.compile(r"\b(two|three|four|five|six|seven|\d+)\s+(reasons|steps|levers|pillars|ways|"
                      r"drivers|factors|priorities|options|phases|risks|areas|themes|initiatives)\b|"
                      r"[三四五六七八九十两\d]+[大个项条种类]?(原因|步骤|举措|支柱|方面|优势|驱动|因素|"
                      r"阶段|风险|建议|方向|措施|维度|环节|要点)", re.I)
NUM_TOPICS = re.compile(r"(market size|market grows|growth|margin|market share|saving|cagr|"
                        r"市场规模|增长|增速|毛利率|份额|规模|节省|年复合)", re.I)
VERB_HINT = re.compile(r"\b(is|are|was|were|be|been|will|can|could|would|should|must|may|has|have|had|do|does|"
                       r"did|need|needs|drive|drives|grow|grows|grew|fall|falls|fell|rise|rises|rose|cost|costs|"
                       r"save|saves|beat|beats|require|requires|deliver|delivers|show|shows|mean|means|reach|"
                       r"reaches|exceed|exceeds|double|doubles|halve|halves|cut|cuts|add|adds|lose|loses|lost|"
                       r"win|wins|won|outperform|outperforms|fail|fails|lack|lacks|depend|depends|stay|stays|"
                       r"remain|remains|meet|meets|take|takes|keep|keeps|hold|holds|start|starts|end|ends|move|"
                       r"moves|close|closes|open|opens|lag|lags|lead|leads|run|runs|put|puts|get|gets|give|"
                       r"gives|make|makes|set|sets|pay|pays|buy|buys|sell|sells|spend|spends|earn|earns|miss|"
                       r"misses|hit|hits|push|pushes|pull|pulls|slip|slips|drop|drops|jump|jumps|top|tops|"
                       r"trail|trails|limit|limits|allow|allows|block|blocks|delay|delays|bring|brings|carry|"
                       r"carries|cover|covers|explain|explains|support|supports|prove|proves|imply|implies|"
                       r"confirm|confirms|decide|decides|demand|demands|call|calls|rely|relies|commit|commits|"
                       r"plan|plans|expect|expects|forecast|forecasts|recommend|recommends|propose|proposes|"
                       r"sit|sits|land|lands|leave|leaves|return|returns|turn|turns|stand|stands|come|comes|"
                       r"go|goes|see|sees|know|knows|want|wants|look|looks|seem|seems|become|becomes|"
                       r"only if|unless|because|but|so that|than|while|until|before|after)\b", re.I)
ZH_VERB_HINT = re.compile(r"(是|为|将|能|应|需|要|可|已|比|超|达|占|降|升|增|减|缺|靠|取决|决定|带来|"
                          r"意味|说明|只有|才|不足|过高|过低|领先|落后|亏|赚|省|卡在|等于|高于|低于)")


def is_cover(slide):
    shapes = [sh for sh in slide.shapes]
    texty = [sh for sh in shapes if sh.has_text_frame and sh.text_frame.text.strip()]
    return len(texty) <= 3 and not any(sh.has_table or sh.has_chart for sh in shapes)


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
        tag = "COV" if i == 1 and is_cover(s) else f"S{i}"
        out.append((tag, t.strip().replace("\n", " ")))
    return out


def titles_docx(path):
    import docx
    out = []
    for p in docx.Document(path).paragraphs:
        try:
            name = (p.style.name or "").lower()
        except AttributeError:  # docx-js output may leave the default style unset
            name = ""
        if not name and p.runs and all(r.bold for r in p.runs if r.text.strip()) and len(p.text) < 120:
            name = "heading 2"  # bold-only short paragraph used as a heading
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
        has_num = bool(re.search(r"\d|待填|待核", t))
        if len(words) < 4 or (not VERB_HINT.search(t) and not (has_num and len(words) >= 6)):
            f.append("LABEL")
    if len(t) > max_chars:
        f.append("LONG")
    if re.search(r"[:：]\s*(from|从)|[:：]\s*\S+.*(到|to)\s", t, re.I) or (re.search(r"[:：]", t) and len(t) < 40):
        f.append("COLON")
    if t.endswith("?") or t.endswith("？"):
        f.append("QUESTION")
    if NUM_TOPICS.search(t) and not re.search(r"\d|待填|待核|\[X\]|\bX\b|TBD", t):
        f.append("NONUM")
    if COUNT_RE.search(t):
        f.append("COUNT")
    return f


def slide_words(path):
    from pptx import Presentation
    out = []
    for s in Presentation(path).slides:
        n = 0
        for sh in s.shapes:
            if sh.has_text_frame:
                txt = sh.text_frame.text
                n += len(re.findall(r"[A-Za-z0-9]+|[\u4e00-\u9fff]", txt))
        out.append(n)
    return out


def opening(t):
    words = re.findall(r"[A-Za-z]+|[\u4e00-\u9fff]{2}", t)
    return " ".join(w.lower() for w in words[:2])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("file")
    ap.add_argument("--max-chars", type=int, default=110)
    a = ap.parse_args()
    ext = os.path.splitext(a.file)[1].lower()
    items = {".pptx": titles_pptx, ".docx": titles_docx}.get(ext, titles_md)(a.file)
    bad = 0
    words = slide_words(a.file) if ext == ".pptx" else []
    for i, (tag, t) in enumerate(items):
        fl = [] if tag == "COV" else flags(t, a.max_chars)
        bad += bool(fl)
        w = f"{words[i]:>4}w " if words else ""
        print(f"{tag:<4} {w}{','.join(fl) or '-':<18} {t}")
    scored = [t for tag, t in items if tag != "COV"]
    sentence_share = sum(1 for t in scored if "LABEL" not in flags(t, a.max_chars)) / max(len(scored), 1)
    print(f"\n{len(items)} titles, {bad} flagged, {sentence_share:.0%} sentence titles "
          f"(top-tier decks: 70% or more).")
    if words:
        heavy = [i + 1 for i, n in enumerate(words) if n > 175]
        light = [i + 1 for i, n in enumerate(words) if 0 < n < 25]
        print(f"words per slide: median {sorted(words)[len(words) // 2]}; over 175: {heavy or 'none'}; "
              f"under 25: {light or 'none'} (main-flow slides run 60 to 175)")
    from collections import Counter
    opens = Counter(opening(t) for _, t in items if t)
    if items and opens:
        top, cnt = opens.most_common(1)[0]
        if cnt / len(items) >= 0.6 and len(items) >= 4:
            print(f"PATTERN: {cnt} of {len(items)} titles open with '{top}'; vary the construction.")
    print("Read the titles top to bottom: do they alone make the argument? If not, the storyline is not done.")


if __name__ == "__main__":
    main()
