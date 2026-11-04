"""Recolour the system diagram to the deck palette.

- everything becomes neutral grey (no blue-grey tint)
- supply lines (teal in the source) -> accent #051C2C
- return lines (red in the source)  -> grey #595959
- the pale floor ellipse and the cast shadows around the objects -> white
Usage: python3 -I recolor_diagram.py <in.png> <out.png>
"""
import sys
import numpy as np
from PIL import Image
from PIL import ImageDraw


def dilate(m, it):
    m = m.copy()
    for _ in range(it):
        n = m.copy()
        n[1:] |= m[:-1]; n[:-1] |= m[1:]; n[:, 1:] |= m[:, :-1]; n[:, :-1] |= m[:, 1:]
        m = n
    return m

src, dst = sys.argv[1], sys.argv[2]
a = np.asarray(Image.open(src).convert('RGB')).astype(float)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
lum = 0.299 * r + 0.587 * g + 0.114 * b
chroma = a.max(-1) - a.min(-1)

SUPPLY = np.array([5, 28, 44], float)      # #051C2C
RETURN = np.array([89, 89, 89], float)     # #595959
TEAL = np.array([41, 134, 157], float)
RED = np.array([141, 31, 33], float)

def alpha(feature, lo, hi):
    x = np.clip((feature - lo) / (hi - lo), 0, 1)
    x[x < 0.08] = 0
    return x

a_sup = alpha(g - r, 12, TEAL[1] - TEAL[0])
a_ret = alpha(r - g, 6, RED[0] - RED[1])
# teal and red never overlap in one pixel by more than a hair: keep the stronger one
both = (a_sup > 0) & (a_ret > 0)
a_sup[both & (a_ret > a_sup)] = 0
a_ret[both & (a_sup >= a_ret)] = 0

def background_lum(alpha_map, line_rgb):
    lc = 0.299 * line_rgb[0] + 0.587 * line_rgb[1] + 0.114 * line_rgb[2]
    with np.errstate(divide='ignore', invalid='ignore'):
        bl = (lum - alpha_map * lc) / (1 - alpha_map)
    return np.clip(np.nan_to_num(bl, nan=255), 0, 255)

grey = lum.copy()
out = np.repeat(grey[..., None], 3, axis=2)

# floor ellipse and cast shadows: pale, low-chroma pixels connected to the outer white background
pale = (lum >= 218) & (chroma <= 14) & (a_sup == 0) & (a_ret == 0)
mask = Image.fromarray((pale * 255).astype(np.uint8), 'L').copy()
H, W = pale.shape
edge = [(x, 0) for x in range(W)] + [(x, H - 1) for x in range(W)] + [(0, y) for y in range(H)] + [(W - 1, y) for y in range(H)]
for xy in edge:
    if mask.getpixel(xy) == 255:
        ImageDraw.floodfill(mask, xy, 128)
# floor patches enclosed by the pipe loop in front of the container (bounded box, so the
# pale container walls are never touched)
BOX = (430, 730, 1200, 1090)   # x0, y0, x1, y1 in source pixels
for y in range(BOX[1], BOX[3], 20):
    for x in range(BOX[0], BOX[2], 20):
        if mask.getpixel((x, y)) != 255:
            continue
        ImageDraw.floodfill(mask, (x, y), 100)
        comp = np.array(mask) == 100
        ys, xs = np.nonzero(comp)
        inside = xs.min() >= BOX[0] and xs.max() <= BOX[2] and ys.min() >= BOX[1] and ys.max() <= BOX[3]
        ImageDraw.floodfill(mask, (x, y), 128 if inside else 50)
outside = np.array(mask) == 128
out[outside] = 255

for amap, line in ((a_sup, SUPPLY), (a_ret, RETURN)):
    m = amap > 0
    if not m.any():
        continue
    bl = background_lum(amap, TEAL if line is SUPPLY else RED)
    # a line pixel sitting on the floor or a shadow gets a white background
    bl = np.where(dilate(outside, 3) & (bl > 200), 255, bl)
    full = amap >= 0.97
    bl[full] = 255
    for c in range(3):
        out[..., c][m] = amap[m] * line[c] + (1 - amap[m]) * bl[m]

res = np.clip(out + 0.5, 0, 255).astype(np.uint8)
# crop the empty white margin left by the removed floor (keep 24 px of air)
ink = np.nonzero(res.min(-1) < 245)
y0, y1 = max(ink[0].min() - 24, 0), min(ink[0].max() + 24, res.shape[0])
x0, x1 = max(ink[1].min() - 24, 0), min(ink[1].max() + 24, res.shape[1])
res = res[y0:y1, x0:x1]
Image.fromarray(res).save(dst, optimize=True)
print('size', res.shape[1], res.shape[0])
print('written', dst)
