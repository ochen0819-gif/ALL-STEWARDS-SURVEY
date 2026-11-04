#!/usr/bin/env python3
"""Scan a deliverable for AI traces, consulting filler, and metadata leaks.

Usage:
    python3 scan.py <file> [--lang zh|en|both] [--json]

Accepts .docx .pptx .xlsx .pdf .md .txt .html. Converts Office/PDF files to
text with markitdown (falls back to python-pptx/python-docx/openpyxl when
markitdown is missing). Prints every hit with line number and context, then a
summary. Exit code 1 when any hit is found, so it can gate a delivery step.

The word lists mirror the ai-eraser skill plus consulting-specific filler.
A hit is not automatically wrong (a quoted client phrase may contain it), but
every hit needs a reason to stay.
"""
import argparse
import json
import os
import re
import subprocess
import sys
import zipfile

ZH_SIGNPOSTS = ["首先", "其次", "再次", "最后，", "综上所述", "总的来说", "总而言之", "由此可见",
                "不难发现", "值得注意的是", "众所周知", "显而易见", "换言之", "简而言之", "话不多说"]
ZH_JARGON = ["赋能", "抓手", "闭环", "底层逻辑", "颗粒度", "拉通", "打通", "夯实", "助力", "打造",
             "构建", "深耕", "全方位", "多维度", "系统性", "高质量发展", "精准", "组合拳", "顶层设计",
             "全链路", "降本增效", "生态圈", "打法", "护城河", "赛道", "蓝海", "弯道超车", "一站式",
             "数字化转型", "智能化升级", "行业领先", "国际一流", "世界一流", "填补空白"]
ZH_LIFT = ["体现了", "彰显了", "标志着", "奠定了基础", "具有重要意义", "未来可期", "任重道远", "必将",
           "蓬勃", "乘势而上", "砥砺前行"]
ZH_OPENERS = ["随着.{0,20}的发展", "在.{0,20}背景下", "当今.{0,10}时代", "近年来，"]
ZH_FILLER = ["希望对您有帮助", "如有问题请随时联系", "以上是", "以下是", "感谢您的理解", "祝工作顺利",
             "这是个很好的问题", "本文档旨在", "本报告分为", "各有利弊", "见仁见智", "因人而异"]
ZH_PAIRS = ["不仅.{0,30}而且", "不是.{0,30}而是", "一方面.{0,60}另一方面", "无论.{0,20}还是"]

EN_WORDS = ["delve", "leverage", "utilize", "harness", "facilitate", "streamline", "foster",
            "navigate", "underscore", "showcase", "empower", "unlock", "elevate", "robust",
            "seamless", "comprehensive", "holistic", "pivotal", "crucial", "transformative",
            "cutting-edge", "game-changer", "game changer", "innovative", "impactful", "landscape",
            "realm", "tapestry", "testament", "journey", "synergy", "synergies", "ecosystem",
            "paradigm", "best-in-class", "world-class", "state-of-the-art", "value-add",
            "drive value", "going forward", "at the end of the day", "low-hanging fruit",
            "move the needle", "think outside the box", "win-win", "next-generation",
            "revolutionize", "disrupt", "disruptive", "scalable solution", "end-to-end"]
EN_PHRASES = ["additionally", "furthermore", "moreover", "in addition,", "in conclusion", "overall,",
              "it is worth noting", "it is important to note", "notably,", "not only", "but also",
              "whether you're", "whether you are", "i hope this email finds you well",
              "please find attached", "kindly", "at your earliest convenience",
              "looking forward to hearing", "feel free to", "do not hesitate", "i wanted to reach out",
              "circle back", "touch base", "as per", "in today's", "in the ever-evolving",
              "in an era of", "this document aims", "this report is structured"]

TRACE = ["Claude", "ChatGPT", "GPT", "AI生成", "大模型", "prompt", "skill", "种子", "prebill", "弹药",
         "TODO", "lorem", "[insert", "[INSERT", "XXX", "TBD", "placeholder",
         # drafting tags that must not survive into a delivered document
         "[估算假设]", "[真实数据]", "[待补充]", "[NOT PROVIDED]", "[INFORMATION NEEDED]", "[VERIFY]",
         "[LEGAL REVIEW]", "[A]", "[D]", "[M]", "[B]", "[E]"]
# "Label: claim" lines and bold-label lists read as machine-made in business documents
LABEL_COLON_RE = re.compile(r"^\s*(定位宣言|核心逻辑|一句话概括|关键结论|核心观点|总结|结论|背景|现状|问题|方案|建议|"
                            r"Key takeaway|Bottom line|Summary|Conclusion|Insight|Takeaway|Context|Problem|"
                            r"Solution|Recommendation)\s*[:：]", re.I)
BOLD_LABEL_RE = re.compile(r"^\s*[-*•]?\s*\*\*[^*]{1,30}\*\*\s*[:：]")

EMOJI_RE = re.compile("[\U0001F300-\U0001FAFF✅❌⚠⭐✔✖➡→⬆]")
DASH_RE = re.compile("—")


def to_text(path):
    ext = os.path.splitext(path)[1].lower()
    if ext in (".md", ".txt", ".html", ".htm", ".csv"):
        with open(path, encoding="utf-8", errors="ignore") as f:
            return f.read()
    try:
        out = subprocess.run(["markitdown", path], capture_output=True, text=True, timeout=120)
        if out.returncode == 0 and out.stdout.strip():
            return out.stdout
    except Exception:
        pass
    if ext == ".pptx":
        from pptx import Presentation
        lines = []
        for i, s in enumerate(Presentation(path).slides, 1):
            lines.append(f"<!-- Slide {i} -->")
            for sh in s.shapes:
                if sh.has_text_frame:
                    lines.append(sh.text_frame.text)
        return "\n".join(lines)
    if ext == ".docx":
        import docx
        d = docx.Document(path)
        lines = [p.text for p in d.paragraphs]
        for t in d.tables:
            for r in t.rows:
                lines.append(" | ".join(c.text for c in r.cells))
        return "\n".join(lines)
    if ext == ".xlsx":
        import openpyxl
        wb = openpyxl.load_workbook(path, data_only=True)
        lines = []
        for ws in wb.worksheets:
            lines.append(f"## {ws.title}")
            for row in ws.iter_rows(values_only=True):
                lines.append(" | ".join("" if v is None else str(v) for v in row))
        return "\n".join(lines)
    if ext == ".pdf":
        out = subprocess.run(["pdftotext", "-layout", path, "-"], capture_output=True, text=True)
        return out.stdout
    with open(path, encoding="utf-8", errors="ignore") as f:
        return f.read()


def metadata(path):
    ext = os.path.splitext(path)[1].lower()
    issues = []
    if ext in (".docx", ".pptx", ".xlsx"):
        try:
            core = zipfile.ZipFile(path).read("docProps/core.xml").decode("utf-8", "ignore")
            app = ""
            try:
                app = zipfile.ZipFile(path).read("docProps/app.xml").decode("utf-8", "ignore")
            except KeyError:
                pass
            for tag in ("creator", "lastModifiedBy"):
                m = re.search(rf"<dc:{tag}>(.*?)</dc:{tag}>|<cp:{tag}>(.*?)</cp:{tag}>", core)
                val = (m.group(1) or m.group(2)) if m else ""
                if not val or re.search(r"claude|gpt|python|docx|pptx|openpyxl|anthropic|unknown", val, re.I):
                    issues.append(f"metadata {tag}={val!r} (set to author or project team)")
            m = re.search(r"<Application>(.*?)</Application>", app)
            if m and re.search(r"python|node|docx|pptxgen|openpyxl", m.group(1), re.I):
                issues.append(f"metadata Application={m.group(1)!r}")
        except Exception as e:  # noqa: BLE001
            issues.append(f"could not read metadata: {e}")
    elif ext == ".pdf":
        try:
            info = subprocess.run(["pdfinfo", path], capture_output=True, text=True).stdout
            for line in info.splitlines():
                if re.match(r"(Creator|Producer|Author):", line) and re.search(
                        r"chrom|skia|libreoffice|python|reportlab|wkhtml|weasy|pandoc|claude", line, re.I):
                    issues.append(f"metadata {line.strip()}")
        except Exception:
            pass
    return issues


def scan(text, lang):
    hits = []
    lines = text.splitlines()
    groups = []
    if lang in ("zh", "both"):
        groups += [("zh-signpost", ZH_SIGNPOSTS, False), ("zh-jargon", ZH_JARGON, False),
                   ("zh-lift", ZH_LIFT, False), ("zh-opener", ZH_OPENERS, True),
                   ("zh-filler", ZH_FILLER, False), ("zh-pair", ZH_PAIRS, True)]
    if lang in ("en", "both"):
        groups += [("en-word", [rf"\b{re.escape(w)}\b" for w in EN_WORDS], True),
                   ("en-phrase", [re.escape(p) for p in EN_PHRASES], True)]
    groups += [("trace", [re.escape(t) for t in TRACE], True)]
    for n, line in enumerate(lines, 1):
        low = line.lower()
        for cat, pats, is_re in groups:
            for p in pats:
                if is_re:
                    flags = re.I if cat.startswith("en") else 0
                    m = re.search(p, line if cat == "trace" else low if cat.startswith("en") else line, flags)
                    if m:
                        hits.append((cat, m.group(0), n, line.strip()[:120]))
                elif p in line:
                    hits.append((cat, p, n, line.strip()[:120]))
        if EMOJI_RE.search(line):
            hits.append(("emoji", EMOJI_RE.search(line).group(0), n, line.strip()[:120]))
        if LABEL_COLON_RE.match(line):
            hits.append(("label-colon", LABEL_COLON_RE.match(line).group(0).strip(), n, line.strip()[:120]))
        if BOLD_LABEL_RE.match(line):
            hits.append(("bold-label", "**x**:", n, line.strip()[:120]))
    dashes = len(DASH_RE.findall(text))
    bold = len(re.findall(r"\*\*[^*]+\*\*", text))
    return hits, {"em_dashes": dashes, "bold_runs": bold, "lines": len(lines)}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("file")
    ap.add_argument("--lang", default="both", choices=["zh", "en", "both"])
    ap.add_argument("--json", action="store_true")
    a = ap.parse_args()
    text = to_text(a.file)
    hits, stats = scan(text, a.lang)
    meta = metadata(a.file)
    if a.json:
        print(json.dumps({"hits": hits, "stats": stats, "metadata": meta}, ensure_ascii=False, indent=1))
    else:
        for cat, word, n, ctx in hits:
            print(f"L{n:<5} {cat:<12} {word!r:<28} {ctx}")
        for m in meta:
            print(f"META  {m}")
        print(f"\n{len(hits)} text hits, {len(meta)} metadata issues, "
              f"{stats['em_dashes']} em dashes, {stats['bold_runs']} bold runs, {stats['lines']} lines")
    sys.exit(1 if (hits or meta) else 0)


if __name__ == "__main__":
    main()
