#!/usr/bin/env python3
"""Generate the SongGlow OpenGraph share image (public/og.png).

Rebuilds the 1200x630 blueprint-style social card from the design spec:
the SongGlow lockup + tagline + description on the left, a realistic
Bill-of-Materials table on the right. Barlow / Barlow Condensed are pulled
from Google Fonts and embedded, then the card is rendered at 2x
(2400x1260) with headless Chrome for retina crispness.

Usage:
    python3 scripts/build_og_image.py [output.png]

Defaults to writing public/og.png. Requires network access (fetches the
fonts once) and Google Chrome. Override the browser with
OG_CHROME=/path/to/chrome if it isn't at the macOS default.

To change the card (or make a per-page variant), edit COPY and BOM below
and re-run. Keep the BOM values real and self-consistent: an engineer will
read these, and a part number whose code doesn't match its description
(e.g. a Murata "...221..." bead is 220 ohm, not 600) reads as sloppy.
"""
import base64
import os
import re
import subprocess
import sys
import tempfile
import urllib.request

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(REPO, "public", "og.png")
CHROME = os.environ.get(
    "OG_CHROME", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
)
UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
)

# --- Editable content ------------------------------------------------------
COPY = {
    "badgeId": "BOM-2026-0417",
    "badgeRev": "REV. A",
    "tagline": "Parts, Sourced.",
    "description": "BOM consolidation and hardware sourcing, built for manufacturing teams.",
    "footerTag": "Sourcing · Consolidation · Manufacturing",
    "siteUrl": "SONGGLOW.COM",
    "catalogFooter": "32 LINE ITEMS",
}
# (ref, description, mfr part number, qty) — all real, verified parts.
BOM = [
    ("U1", "MCU, 32-bit Arm Cortex-M4", "STM32F407VG", "1"),
    ("C1-C4", "Aluminum Electrolytic Cap, 100µF", "EEU-FC1H101", "4"),
    ("C5-C12", "Ceramic Capacitor, 0.1µF 0603", "CL10B104KB8", "8"),
    ("R1-R6", "Chip Resistor, 2.2kΩ 0603", "RC0603FR-072K2L", "6"),
    ("L1", "Ferrite Bead, 220Ω @ 100MHz", "BLM18PG221SN1D", "1"),
    ("J1", "Connector, 4-Pin JST-PH", "B4B-PH-K-S", "1"),
]
# ---------------------------------------------------------------------------


def fetch_fonts_css():
    """Google Fonts CSS with the woff2 files inlined as base64 (no runtime deps)."""
    url = (
        "https://fonts.googleapis.com/css2?family=Barlow:wght@400"
        "&family=Barlow+Condensed:wght@600&display=block"
    )
    css = urllib.request.urlopen(
        urllib.request.Request(url, headers={"User-Agent": UA})
    ).read().decode()
    for woff in set(re.findall(r"url\((https://[^)]+\.woff2)\)", css)):
        data = urllib.request.urlopen(
            urllib.request.Request(woff, headers={"User-Agent": UA})
        ).read()
        css = css.replace(woff, "data:font/woff2;base64," + base64.b64encode(data).decode())
    return css


def corner(pos):
    return (
        f'<div style="position:absolute;{pos};width:22px;height:22px">'
        '<div style="position:absolute;top:50%;left:0;width:100%;height:1px;background:#3d5c78"></div>'
        '<div style="position:absolute;left:50%;top:0;width:1px;height:100%;background:#3d5c78"></div></div>'
    )


def build_html(css):
    rows = ""
    for ref, name, mpn, qty in BOM:
        rows += (
            '<div style="display:flex;align-items:center;gap:10px;padding:10px 18px;border-bottom:1px solid #16283f">'
            f'<div style="width:34px;font:400 11px ui-monospace,Menlo,monospace;color:#5980a6">{ref}</div>'
            f'<div style="flex:1;min-width:0;font-size:13px;color:#e2e9ef;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{name}</div>'
            f'<div style="width:96px;font:400 10.5px ui-monospace,Menlo,monospace;color:#7a9cbc;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{mpn}</div>'
            f'<div style="width:36px;text-align:right;font:400 11px ui-monospace,Menlo,monospace;color:#c5d5e3">{qty}</div>'
            "</div>"
        )
    c = COPY
    return f"""<!DOCTYPE html><html><head><meta charset="utf-8"><style>
{css}
body{{margin:0;background:#0d1b2e}}
</style></head><body>
<div style="width:1200px;height:630px;position:relative;background:#0d1b2e;overflow:hidden;font-family:'Barlow',sans-serif">
<div style="position:absolute;inset:0;background-image:linear-gradient(#16283f 1px,transparent 1px),linear-gradient(90deg,#16283f 1px,transparent 1px);background-size:48px 48px;opacity:0.55"></div>
<div style="position:absolute;left:0;top:0;width:560px;height:100%;border-right:1px solid #1f3a5c"></div>
{corner('top:40px;left:40px')}{corner('top:40px;right:40px')}{corner('bottom:40px;left:40px')}{corner('bottom:40px;right:40px')}
<div style="position:absolute;top:40px;left:72px;font:400 11px ui-monospace,Menlo,monospace;letter-spacing:.1em;color:#4a6f96">{c['badgeId']}</div>
<div style="position:absolute;top:40px;right:72px;font:400 11px ui-monospace,Menlo,monospace;letter-spacing:.1em;color:#4a6f96;text-align:right">{c['badgeRev']}</div>
<div style="position:absolute;left:0;top:0;width:560px;height:100%;display:flex;flex-direction:column;justify-content:center;padding-left:72px">
<svg width="88" height="88" viewBox="0 0 56 56" fill="none" style="margin-bottom:18px">
<path d="M28 8 L46 18 L28 28 L10 18 Z" stroke="#7a9cbc" stroke-width="1.6" stroke-linejoin="round"></path>
<path d="M10 28 L28 38 L46 28" stroke="#7a9cbc" stroke-width="1.6" stroke-linejoin="round" fill="none"></path>
<path d="M10 38 L28 48 L46 38" stroke="#7a9cbc" stroke-width="1.6" stroke-linejoin="round" fill="none"></path>
</svg>
<div style="font-family:'Barlow Condensed',sans-serif;font-weight:600;letter-spacing:.01em;font-size:76px;line-height:1;color:#f2f2f3">SONG<span style="color:#7a9cbc">GLOW</span></div>
<div style="font-size:18px;letter-spacing:.28em;text-transform:uppercase;color:#9fb3c8;margin-top:14px">{c['tagline']}</div>
<div style="width:64px;height:1px;background:#3d5c78;margin:26px 0"></div>
<div style="font-size:19px;line-height:1.5;color:#c5d5e3;max-width:400px">{c['description']}</div>
</div>
<div style="position:absolute;left:560px;top:0;width:640px;height:100%;display:flex;align-items:center;justify-content:center">
<div style="width:460px;border:1px solid #3d5c78;background:#0f223a">
<div style="display:flex;align-items:center;justify-content:space-between;padding:14px 18px;border-bottom:1px solid #3d5c78">
<div style="font-family:'Barlow Condensed',sans-serif;font-weight:600;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:#c5d5e3">Bill of Materials</div>
<div style="font:400 10px ui-monospace,Menlo,monospace;letter-spacing:.08em;color:#5980a6">REV. C</div>
</div>
<div style="display:flex;align-items:center;gap:10px;padding:8px 18px;border-bottom:1px solid #1f3a5c;font:400 10px ui-monospace,Menlo,monospace;letter-spacing:.06em;color:#3d5c78">
<div style="width:34px">REF</div><div style="flex:1">DESCRIPTION</div><div style="width:96px">MFR P/N</div><div style="width:36px;text-align:right">QTY</div>
</div>
{rows}
<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 18px">
<div style="font:400 11px ui-monospace,Menlo,monospace;letter-spacing:.06em;color:#4a6f96">{c['catalogFooter']}</div>
<div style="display:flex;align-items:center;gap:6px">
<svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8.5 L6.5 12 L13 4" stroke="#5cb37a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
<div style="font:400 10px ui-monospace,Menlo,monospace;letter-spacing:.06em;color:#5cb37a">ALL SOURCED</div>
</div></div>
</div></div>
<div style="position:absolute;left:560px;top:0;bottom:0;width:1px;background:#1f3a5c"></div>
<div style="position:absolute;bottom:40px;left:72px;right:72px;display:flex;align-items:center;justify-content:space-between">
<div style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#5980a6">{c['footerTag']}</div>
<div style="font:400 11px ui-monospace,Menlo,monospace;color:#4a6f96;letter-spacing:.1em">{c['siteUrl']}</div>
</div>
</div></body></html>"""


def main():
    print("fetching + embedding fonts...")
    html = build_html(fetch_fonts_css())
    with tempfile.NamedTemporaryFile(
        "w", suffix=".html", delete=False, encoding="utf-8"
    ) as f:
        f.write(html)
        html_path = f.name

    render = [
        CHROME, "--headless", "--disable-gpu", "--force-device-scale-factor=2",
        "--window-size=1200,630", "--hide-scrollbars",
        "--run-all-compositor-stages-before-draw", "--virtual-time-budget=6000",
        f"--screenshot={OUT}", f"file://{html_path}",
    ]
    if not os.path.exists(CHROME):
        print(f"HTML written to {html_path}")
        print(f"Chrome not found at {CHROME}. Set OG_CHROME, or render manually:")
        print("  " + " ".join(f'"{a}"' if " " in a else a for a in render))
        return
    subprocess.run(render, check=True)
    os.unlink(html_path)
    print("wrote", OUT)


if __name__ == "__main__":
    main()
