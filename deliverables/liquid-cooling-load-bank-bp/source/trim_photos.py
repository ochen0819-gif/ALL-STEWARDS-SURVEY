"""Trim the white scan borders off the three site photos so their visible edges meet the table rules on p7.
Usage: python3 -I trim_photos.py <in_dir> <out_dir>"""
import sys, os
import numpy as np
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
for name in ['photo_main.jpg', 'photo_side.jpg', 'photo_end.jpg']:
    im = Image.open(os.path.join(src, name)).convert('RGB')
    a = np.asarray(im).astype(int).min(axis=2)
    rows = np.nonzero(a.mean(axis=1) < 235)[0]; cols = np.nonzero(a.mean(axis=0) < 235)[0]
    box = (int(cols[0]) + 1, int(rows[0]) + 1, int(cols[-1]), int(rows[-1]))   # one more pixel for the anti-aliased edge
    out = im.crop(box)
    out.save(os.path.join(dst, name.replace('.jpg', '_trim.jpg')), quality=92)
    print(name, im.size, '->', out.size, box)
