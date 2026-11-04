#!/bin/bash
# build, convert to PDF, render 70 dpi slide PNGs (and 110 dpi copies for close checking)
set -e
cd "$(dirname "$0")"
NODE_PATH=/tmp/claude-0/-home-user-ALL-STEWARDS-SURVEY/915057e1-292a-5d90-abce-ed32ac18baf5/scratchpad/pptxbuild/node_modules node build.js
rm -f slide-*.png deck.pdf
soffice --headless --convert-to pdf deck.pptx >/dev/null 2>&1
pdftoppm -png -r 70 deck.pdf slide
mkdir -p ../hires_final && rm -f ../hires_final/*.png && pdftoppm -png -r 110 deck.pdf ../hires_final/s
ls slide-*.png | wc -l
