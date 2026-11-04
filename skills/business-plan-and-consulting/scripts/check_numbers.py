#!/usr/bin/env python3
"""Cross-check the numbers in a deliverable.

Usage:
    python3 check_numbers.py <file.xlsx|file.docx|file.pptx|file.md>

What it does:
  1. Tables: for every table with a row whose first cell is 合计/总计/小计/Total/
     Subtotal/Sum, adds the numeric cells above it (down to the previous total
     row or header) column by column and reports any column where the stated
     total differs from the computed one by more than 0.5 percent.
  2. Percent rows: for a column of percentages that ends in a total row, checks
     the parts add to 100 (±1).
  3. Repeated figures: lists every distinct money or percentage figure that
     appears more than once with different surrounding units or more than once
     with a different value for the same label (e.g. "市场规模 1,200 亿" and
     "市场规模 1,500 亿"), so the author can decide which one is right.

This is a readout. It does not change the file. Exit code 1 when a total
mismatch is found.
"""
import os
import re
import sys
from collections import defaultdict

TOTAL_RE = re.compile(r"^\s*(合计|总计|小计|总额|总数|total|subtotal|sum|grand total)\s*[:：]?\s*$", re.I)
NUM_RE = re.compile(r"^\s*\(?-?[\d,]+(\.\d+)?\)?\s*%?\s*$")


def parse_num(s):
    if s is None:
        return None
    if isinstance(s, (int, float)):
        return float(s)
    s = str(s).strip()
    if not NUM_RE.match(s):
        return None
    neg = s.startswith("(") and s.endswith(")")
    s = s.strip("()% ").replace(",", "")
    try:
        v = float(s)
    except ValueError:
        return None
    return -v if neg else v


def tables_xlsx(path):
    import openpyxl
    wb = openpyxl.load_workbook(path, data_only=True)
    for ws in wb.worksheets:
        rows = [[c for c in r] for r in ws.iter_rows(values_only=True)]
        yield ws.title, rows


def tables_docx(path):
    import docx
    for i, t in enumerate(docx.Document(path).tables, 1):
        yield f"table {i}", [[c.text for c in r.cells] for r in t.rows]


def tables_pptx(path):
    from pptx import Presentation
    for i, s in enumerate(Presentation(path).slides, 1):
        for sh in s.shapes:
            if sh.has_table:
                yield f"slide {i}", [[c.text for c in r.cells] for r in sh.table.rows]


def tables_md(path):
    with open(path, encoding="utf-8", errors="ignore") as f:
        lines = f.read().splitlines()
    block, n = [], 0
    for line in lines + [""]:
        if line.strip().startswith("|"):
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if not all(re.match(r"^:?-+:?$", c) for c in cells):
                block.append(cells)
        elif block:
            n += 1
            yield f"table {n}", block
            block = []


def is_header(row):
    nums = [parse_num(c) for c in row[1:]]
    nums = [v for v in nums if v is not None]
    return not nums or all(1990 <= v <= 2100 and float(v).is_integer() for v in nums)


def check_tables(tables):
    problems = 0
    for name, rows in tables:
        start = 0
        for ri, row in enumerate(rows):
            if not row or row[0] is None or not TOTAL_RE.match(str(row[0])):
                continue
            body = [r for r in rows[start:ri] if not is_header(r)]
            for ci in range(1, len(row)):
                stated = parse_num(row[ci])
                if stated is None:
                    continue
                vals = [parse_num(r[ci]) for r in body if ci < len(r)]
                vals = [v for v in vals if v is not None]
                if len(vals) < 2:
                    continue
                calc = sum(vals)
                is_pct = "%" in str(row[ci]) or all("%" in str(r[ci]) for r in body if ci < len(r) and r[ci])
                tol = 1.0 if is_pct else max(abs(stated) * 0.005, 0.01)
                if abs(calc - stated) > tol:
                    problems += 1
                    print(f"MISMATCH {name} row {ri + 1} col {ci + 1}: stated {stated:g}, "
                          f"parts add to {calc:g} ({len(vals)} parts)")
            start = ri + 1
    return problems


STOP_LABELS = re.compile(r"^(to|from|of|by|at|in|on|for|and|or|the|a|an|x|per|vs|is|are|was|were|than|"
                         r"jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec|[a-z]*day|slide|page|figure|"
                         r"exhibit|table|note|source|week|month|year|q[1-4]|fy|h[12]|option|step|phase|day|"
                         r"[\u4e00-\u9fff]{0,2}(图|表|页|第|周|月|年|日|季度|步|阶段|选项))", re.I)


def repeated_figures(text):
    pat = re.compile(r"([一-鿿A-Za-z][一-鿿A-Za-z /]{1,24}?)\s*[:：]?\s*"
                     r"(?:约|超过|近|over|about|c\.|~)?\s*"
                     r"([$¥€£]?\s?[\d,]+(?:\.\d+)?)\s*(亿|万|百万|千万|million|billion|bn|m|k|%|亿元|万元)?")
    seen = defaultdict(set)
    for m in pat.finditer(text):
        label = m.group(1).strip()
        if len(label) < 2 or STOP_LABELS.match(label) or STOP_LABELS.match(label.split()[-1]):
            continue
        seen[label].add((m.group(2).replace(",", ""), m.group(3) or ""))
    for label, vals in seen.items():
        if len(vals) > 1:
            print(f"CHECK    '{label}' appears with different values: "
                  + "; ".join(f"{v}{u}" for v, u in sorted(vals)))


def main():
    path = sys.argv[1]
    ext = os.path.splitext(path)[1].lower()
    gen = {".xlsx": tables_xlsx, ".docx": tables_docx, ".pptx": tables_pptx}.get(ext, tables_md)
    problems = check_tables(gen(path))
    try:
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        from scan import to_text  # same converter as scan.py, with python-docx/pptx/openpyxl fallbacks
        text = to_text(path)
        if not text.strip():
            print("WARN     could not extract text for the repeated-figure check")
        repeated_figures(text)
    except Exception as e:  # noqa: BLE001
        print(f"WARN     repeated-figure check skipped: {e}")
    print(f"\n{problems} total mismatches")
    sys.exit(1 if problems else 0)


if __name__ == "__main__":
    main()
