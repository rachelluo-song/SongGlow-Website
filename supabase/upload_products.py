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
            if k and v:
                specs[k] = v
            else:
                warnings.append(f"{pn}: malformed spec '{token}' skipped")
        elif token.upper().startswith("AEC-Q"):
            specs["Qualification"] = token
            warnings.append(f"{pn}: spec '{token}' had no value — stored as Qualification: {token}")
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

# Which part numbers already exist in the database?
pns = ",".join(f'"{k[1]}"' for k in rows)
req = urllib.request.Request(
    f"{URL}/rest/v1/products?select=section,part_number&part_number=in.({urllib.parse.quote(pns)})",
    headers=HEADERS,
)
existing = {(r["section"], r["part_number"]) for r in json.load(urllib.request.urlopen(req))}

to_insert = [rows[k] for k in order if k not in existing]
skipped = [k[1] for k in order if k in existing]

if to_insert:
    req = urllib.request.Request(
        f"{URL}/rest/v1/products",
        data=json.dumps(to_insert).encode(),
        headers={**HEADERS, "Prefer": "return=minimal"},
        method="POST",
    )
    resp = urllib.request.urlopen(req)
    status = resp.status
else:
    status = "n/a"

print(f"insert status: {status}")
print(f"added: {len(to_insert)}")
for r in to_insert:
    print(f"  + [{r['section']}/{r['category']}] {r['part_number']}")
print(f"skipped (already in database): {len(skipped)} -> {', '.join(skipped)}")
if warnings:
    print("warnings:")
    for w in warnings:
        print(f"  ! {w}")
if errors:
    print("errors:")
    for e in errors:
        print(f"  x {e}")
