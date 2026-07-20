#!/usr/bin/env python3
"""Validate products-template.csv and upload new rows to Supabase.

Usage: python3 supabase/upload_products.py [path/to/file.csv]
Reads credentials from .env.local. Skips part numbers already in the
database, dedupes rows (last occurrence wins), converts "Key: Value; ..."
specs to JSON, and prints a report of everything added/skipped/fixed.
"""
import csv
import json
import os
import sys
import urllib.request
import urllib.parse

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(REPO, ".env.local")
CSV_PATH = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
    REPO, "supabase", "products-template.csv"
)

# Distributor-export category names → SongGlow's clean names (agreed 2026-07-18).
# Extend this map as new export styles show up.
CATEGORY_MAP = {
    "Capacitors": "Aluminum Electrolytic Capacitors",
    "Capacitors - Ceramic Capacitors": "Ceramic Capacitors",
    "Chip Resistor - Surface Mount": "Chip Resistors",
    "Resistors": "Chip Resistors",
    "Inductors - Fixed Inductors": "Fixed Inductors",
    "Crystals, Oscillators, Resonators - Crystals": "Crystals",
    "Circuit Protection - TVS Diodes": "TVS Diodes",
    "Circuit Protection - Fuses": "Fuses",
    "Filters - Ferrite Beads and Chips": "Ferrite Beads",
}
VALID_SECTIONS = {"components", "hardware"}

def load_env(path):
    env = {}
    with open(path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, _, v = line.partition("=")
                env[k.strip()] = v.strip()
    return env

def parse_specs(text, warnings, pn):
    specs = {}
    if not text or not text.strip():
        return specs
    for token in text.split(";"):
        token = token.strip()
        if not token:
            continue
        if ":" in token:
            k, _, v = token.partition(":")
            k, v = k.strip(), v.strip()
            if k.lower() in ("mcmaster part number", "mcmaster-carr part number", "mcmaster"):
                warnings.append(f"{pn}: competitor part number spec removed")
                continue
            if k and v:
                specs[k] = v
            else:
                warnings.append(f"{pn}: malformed spec '{token}' skipped")
        elif token.upper().startswith("AEC-Q"):
            specs["Qualification"] = token
            warnings.append(f"{pn}: spec '{token}' had no value — stored as Qualification: {token}")
        elif token in ("Metric Size", "Inch Size"):
            specs["Sizing"] = token.split()[0]
        else:
            warnings.append(f"{pn}: spec '{token}' has no 'Key: Value' form — skipped")
    return specs

env = load_env(ENV_PATH)
URL = env["NEXT_PUBLIC_SUPABASE_URL"]
KEY = env["SUPABASE_SERVICE_ROLE_KEY"]
HEADERS = {
    "apikey": KEY,
    "Authorization": f"Bearer {KEY}",
    "Content-Type": "application/json",
}

warnings, errors = [], []
rows = {}
order = []

with open(CSV_PATH, newline="", encoding="utf-8-sig") as f:
    for i, row in enumerate(csv.DictReader(f), start=2):
        section = (row.get("section") or "").strip().lower()
        category = (row.get("category") or "").strip()
        pn = (row.get("part_number") or "").strip()
        name = (row.get("name") or "").strip()
        if not pn:
            errors.append(f"line {i}: missing part_number — row skipped")
            continue
        if section not in VALID_SECTIONS:
            errors.append(f"line {i} ({pn}): section '{section}' invalid — row skipped")
            continue
        if not category or not name:
            errors.append(f"line {i} ({pn}): missing category or name — row skipped")
            continue
        if category in CATEGORY_MAP:
            new_cat = CATEGORY_MAP[category]
            warnings.append(f"{pn}: category '{category}' normalized to '{new_cat}'")
            category = new_cat
        key = (section, pn)
        if key in rows:
            warnings.append(f"{pn}: appears more than once in the CSV — kept the LAST occurrence (line {i})")
        else:
            order.append(key)
        rows[key] = {
            "section": section,
            "category": category,
            "part_number": pn,
            "name": name,
            "manufacturer": (row.get("manufacturer") or "").strip() or None,
            "description": (row.get("description") or "").strip() or None,
            "specs": parse_specs(row.get("specs") or "", warnings, pn),
            "datasheet_url": (row.get("datasheet_url") or "").strip() or None,
        }

# Which part numbers already exist in the database? (chunked — URL length limits)
existing = set()
all_pns = [k[1] for k in rows]
for i in range(0, len(all_pns), 150):
    chunk = ",".join(f'"{p}"' for p in all_pns[i : i + 150])
    req = urllib.request.Request(
        f"{URL}/rest/v1/products?select=section,part_number&part_number=in.({urllib.parse.quote(chunk)})",
        headers=HEADERS,
    )
    existing |= {(r["section"], r["part_number"]) for r in json.load(urllib.request.urlopen(req))}

to_insert = [rows[k] for k in order if k not in existing]
skipped = [k[1] for k in order if k in existing]

# Insert in batches so no single request gets too large
inserted = 0
for i in range(0, len(to_insert), 500):
    batch = to_insert[i : i + 500]
    req = urllib.request.Request(
        f"{URL}/rest/v1/products",
        data=json.dumps(batch).encode(),
        headers={**HEADERS, "Prefer": "return=minimal"},
        method="POST",
    )
    resp = urllib.request.urlopen(req)
    if resp.status not in (200, 201):
        print(f"INSERT FAILED at batch {i // 500 + 1}: HTTP {resp.status}")
        sys.exit(1)
    inserted += len(batch)
    print(f"  batch {i // 500 + 1}: {len(batch)} rows inserted")

import collections
by_cat = collections.Counter(f"{r['section']}/{r['category']}" for r in to_insert)
print(f"\nadded: {inserted}")
for cat, n in by_cat.most_common():
    print(f"  + {cat}: {n}")
print(f"skipped (already in database): {len(skipped)}")
if skipped[:10]:
    print(f"  e.g. {', '.join(skipped[:10])}{'…' if len(skipped) > 10 else ''}")
if warnings:
    print(f"warnings ({len(warnings)}):")
    for w in warnings[:15]:
        print(f"  ! {w}")
    if len(warnings) > 15:
        print(f"  … and {len(warnings) - 15} more")
if errors:
    print(f"errors ({len(errors)}):")
    for e in errors[:15]:
        print(f"  x {e}")
    if len(errors) > 15:
        print(f"  … and {len(errors) - 15} more")
