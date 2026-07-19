import type { Product } from "@/lib/catalog";

/**
 * Parametric 2D dimension drawings for hardware, generated as SVG from each
 * product's specs. One template per part family:
 *  - Screws  (head-shape variant chosen from the category name)
 *  - Washers (flat washers: face + section views)
 *  - O-Rings (face + enlarged cross-section)
 * All geometry is computed in inches (metric values converted for scale);
 * labels always show the original spec strings.
 */

type Dim = { v: number; label: string };

const INK = "#0F1430";
const DIM = "#1E3FA0";
const FAINT = "#828BA6";
const FONT = "IBM Plex Sans, -apple-system, sans-serif";

function parseDim(s: string | undefined): Dim | null {
  if (!s) return null;
  const t = s.trim();

  const range = t.split(/\s+to\s+/i);
  if (range.length === 2) {
    const a = parseDim(range[0]);
    const b = parseDim(range[1]);
    if (a && b) return { v: (a.v + b.v) / 2, label: t };
  }

  const mm = t.match(/^(\d+(?:\.\d+)?)\s*mm$/i);
  if (mm) return { v: parseFloat(mm[1]) / 25.4, label: t };

  // mixed or pure fraction inches: 3 1/2", 3/4"
  const frac = t.match(/^(?:(\d+)\s+)?(\d+)\/(\d+)\s*(?:"|in)?$/);
  if (frac) {
    const whole = frac[1] ? parseInt(frac[1]) : 0;
    return { v: whole + parseInt(frac[2]) / parseInt(frac[3]), label: t };
  }

  const dec = t.match(/^(\d+(?:\.\d+)?)\s*(?:"|in)?$/);
  if (dec) return { v: parseFloat(dec[1]), label: t };

  return null;
}

/** Thread designation → nominal shank diameter in inches, label preserved. */
function threadDia(s: string | undefined): Dim | null {
  if (!s) return null;
  const t = s.trim();
  const num = t.match(/^#(\d+)/);
  if (num) return { v: 0.06 + 0.013 * parseInt(num[1]), label: t };
  const metric = t.match(/^M(\d+(?:\.\d+)?)/i);
  if (metric) return { v: parseFloat(metric[1]) / 25.4, label: t };
  const frac = t.match(/^(\d+)\/(\d+)/);
  if (frac) return { v: parseInt(frac[1]) / parseInt(frac[2]), label: t };
  const dec = t.match(/^(\d+(?:\.\d+)?)"/);
  if (dec) return { v: parseFloat(dec[1]), label: t };
  return null;
}

type HeadStyle =
  | "pan"
  | "button"
  | "truss"
  | "cheese"
  | "round"
  | "flat"
  | "socket";

function screwHeadStyle(category: string): HeadStyle {
  const c = category.toLowerCase();
  if (c.includes("pan head")) return "pan";
  if (c.includes("button")) return "button";
  if (c.includes("truss")) return "truss";
  if (c.includes("cheese")) return "cheese";
  if (c.includes("flat head")) return "flat";
  if (c.includes("round")) return "round";
  return "socket";
}

// ---------- SVG helpers ----------

const esc = (s: string) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function text(x: number, y: number, s: string, opts: { size?: number; anchor?: string; fill?: string; bold?: boolean } = {}) {
  return `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-family="${FONT}" font-size="${opts.size ?? 12}" ${opts.bold ? 'font-weight="600"' : ""} fill="${opts.fill ?? DIM}" text-anchor="${opts.anchor ?? "middle"}">${esc(s)}</text>`;
}

/** Horizontal dimension: extension lines down from (x1,yRef) and (x2,yRef) to y, arrows between, centered label below. */
function hDim(x1: number, x2: number, yRef: number, y: number, label: string) {
  return [
    `<path d="M${x1} ${yRef} V${y + 4} M${x2} ${yRef} V${y + 4}" stroke="${DIM}" stroke-width="0.8"/>`,
    `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${DIM}" stroke-width="1" marker-start="url(#arrS)" marker-end="url(#arrE)"/>`,
    text((x1 + x2) / 2, y + 16, label),
  ].join("");
}

/** Vertical dimension at x, spanning y1..y2 (reference at xRef), label rotated. */
function vDim(y1: number, y2: number, xRef: number, x: number, label: string) {
  return [
    `<path d="M${xRef} ${y1} H${x - 4} M${xRef} ${y2} H${x - 4}" stroke="${DIM}" stroke-width="0.8"/>`,
    `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${DIM}" stroke-width="1" marker-start="url(#arrS)" marker-end="url(#arrE)"/>`,
    `<g transform="translate(${x - 6},${(y1 + y2) / 2}) rotate(-90)">${text(0, 0, label)}</g>`,
  ].join("");
}

function frame(inner: string, title: string, subtitle: string, meta: string[]) {
  const W = 760;
  const H = 480;
  const metaText = meta
    .filter(Boolean)
    .slice(0, 3)
    .map((m, i) => text(24, H - 40 + i * 12.5, m.slice(0, 110), { anchor: "start", size: 10.5, fill: FAINT }))
    .join("");
  const shortSubtitle = subtitle.length > 82 ? subtitle.slice(0, 79) + "…" : subtitle;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
<marker id="arrE" markerWidth="9" markerHeight="8" refX="8" refY="4" orient="auto"><path d="M0 0 L9 4 L0 8 Z" fill="${DIM}"/></marker>
<marker id="arrS" markerWidth="9" markerHeight="8" refX="1" refY="4" orient="auto-start-reverse"><path d="M0 0 L9 4 L0 8 Z" fill="${DIM}"/></marker>
</defs>
<rect width="${W}" height="${H}" fill="#FFFFFF"/>
<rect x="12" y="12" width="${W - 24}" height="${H - 24}" fill="none" stroke="${INK}" stroke-width="1.2"/>
<line x1="12" y1="${H - 92}" x2="${W - 12}" y2="${H - 92}" stroke="${INK}" stroke-width="1.2"/>
${text(24, H - 71, title, { anchor: "start", size: 15, fill: INK, bold: true })}
${text(24, H - 56, shortSubtitle, { anchor: "start", size: 11.5, fill: FAINT })}
${metaText}
${text(W - 24, H - 66, "SongGlow", { anchor: "end", size: 16, fill: INK, bold: true })}
${text(W - 24, H - 50, "songglow.com", { anchor: "end", size: 10.5, fill: FAINT })}
${text(W - 24, H - 28, "Dimensions in inches unless noted · Not to scale beyond stated dims", { anchor: "end", size: 9.5, fill: FAINT })}
${inner}
</svg>`;
}

// ---------- Screw ----------

function drawScrew(p: Product): string | null {
  const s = p.specs ?? {};
  const D = threadDia(s["Thread Size"] ?? s["Thread"]);
  const L = parseDim(s["Length"]);
  const HD = parseDim(s["Head Diameter"]);
  const HH = parseDim(s["Head Height"]);
  if (!D || !L || !HD || !HH) return null;
  const style = screwHeadStyle(p.category);
  const partial = /partial/i.test(s["Threading"] ?? "") || /partial/i.test(p.category);

  // layout: axis horizontal at cy; head at left
  const availW = 560;
  const availH = 230;
  const scale = Math.min(availW / (HH.v + L.v), availH / Math.max(HD.v, D.v * 1.4), 4000);
  const hh = HH.v * scale;
  const hd = HD.v * scale;
  const ln = L.v * scale;
  const dd = D.v * scale;
  const x0 = 90 + Math.max(0, (availW - hh - ln) / 2);
  const cy = 160;

  let head = "";
  const hTop = cy - hd / 2;
  const hBot = cy + hd / 2;
  const r = Math.min(hh * 0.4, hd * 0.15);
  switch (style) {
    case "button":
    case "round":
    case "truss": {
      // domed head: half-ellipse, truss is shallower+wider handled by data
      head = `<path d="M${x0 + hh} ${hTop} A ${hh} ${hd / 2} 0 0 0 ${x0 + hh} ${hBot} Z" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
      break;
    }
    case "flat": {
      // countersunk: trapezoid narrowing to shank
      head = `<path d="M${x0} ${hTop} L${x0 + hh} ${cy - dd / 2} L${x0 + hh} ${cy + dd / 2} L${x0} ${hBot} Z" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
      break;
    }
    default: {
      // pan / cheese / socket: rectangular profile, rounded outer corners
      head = `<path d="M${x0 + r} ${hTop} H${x0 + hh} V${hBot} H${x0 + r} Q${x0} ${hBot} ${x0} ${hBot - r} V${hTop + r} Q${x0} ${hTop} ${x0 + r} ${hTop} Z" fill="none" stroke="${INK}" stroke-width="1.5"/>`;
      if (style === "socket") {
        head += `<path d="M${x0 + hh * 0.35} ${cy - dd * 0.35} V${cy + dd * 0.35} M${x0 + hh * 0.6} ${cy - dd * 0.35} V${cy + dd * 0.35}" stroke="${INK}" stroke-width="1"/>`;
      }
    }
  }

  const sx = x0 + hh;
  const shank = `<rect x="${sx}" y="${cy - dd / 2}" width="${ln}" height="${dd}" fill="none" stroke="${INK}" stroke-width="1.5"/>`;

  // thread hatching
  const tStart = partial ? sx + ln * 0.45 : sx;
  let hatch = "";
  const step = Math.max(5, Math.min(10, dd * 0.6));
  for (let x = tStart + 3; x < sx + ln - 2; x += step) {
    hatch += `<line x1="${x.toFixed(1)}" y1="${cy - dd / 2}" x2="${(x - dd * 0.35).toFixed(1)}" y2="${cy + dd / 2}" stroke="${INK}" stroke-width="0.7"/>`;
  }
  if (partial) {
    hatch += `<line x1="${tStart}" y1="${cy - dd / 2}" x2="${tStart}" y2="${cy + dd / 2}" stroke="${INK}" stroke-width="1"/>`;
  }

  const center = `<line x1="${x0 - 22}" y1="${cy}" x2="${sx + ln + 22}" y2="${cy}" stroke="${FAINT}" stroke-width="0.7" stroke-dasharray="14 4 3 4"/>`;

  const dims = [
    hDim(sx, sx + ln, cy + dd / 2, cy + Math.max(dd / 2, hd / 2) + 38, `L = ${L.label}`),
    vDim(hTop, hBot, x0, x0 - 34, `⌀ ${HD.label}`),
    hDim(x0, sx, hTop, hTop - 26, HH.label),
    `<line x1="${sx + ln * 0.75}" y1="${cy - dd / 2}" x2="${sx + ln * 0.75 + 34}" y2="${cy - dd / 2 - 32}" stroke="${DIM}" stroke-width="0.8"/>`,
    text(sx + ln * 0.75 + 38, cy - dd / 2 - 36, s["Thread Size"] ?? "", { anchor: "start" }),
  ].join("");

  const meta = [
    [s["Material"], s["Finish"]].filter(Boolean).join(" · "),
    [s["Threading"], s["Drive Type"] ? `${s["Drive Type"]} drive` : "", s["Tensile Strength"] ? `Tensile: ${s["Tensile Strength"]}` : ""].filter(Boolean).join(" · "),
    s["Thread Style"] ? `Thread: ${s["Thread Style"]}` : "",
  ];
  return frame(center + head + shank + hatch + dims, p.part_number, p.name, meta);
}

// ---------- Washer ----------

function drawWasher(p: Product): string | null {
  const s = p.specs ?? {};
  const OD = parseDim(s["OD"]);
  const ID = parseDim(s["ID"]);
  const T = parseDim(s["Thickness"]);
  if (!OD || !ID || !T) return null;

  const cy = 175;
  const scale = Math.min(230 / OD.v, 5000);
  const or_ = (OD.v * scale) / 2;
  const ir = (ID.v * scale) / 2;
  const cx = 230;

  const face = [
    `<circle cx="${cx}" cy="${cy}" r="${or_}" fill="none" stroke="${INK}" stroke-width="1.5"/>`,
    `<circle cx="${cx}" cy="${cy}" r="${ir}" fill="none" stroke="${INK}" stroke-width="1.5"/>`,
    `<line x1="${cx - or_ - 16}" y1="${cy}" x2="${cx + or_ + 16}" y2="${cy}" stroke="${FAINT}" stroke-width="0.7" stroke-dasharray="14 4 3 4"/>`,
    `<line x1="${cx}" y1="${cy - or_ - 16}" x2="${cx}" y2="${cy + or_ + 16}" stroke="${FAINT}" stroke-width="0.7" stroke-dasharray="14 4 3 4"/>`,
    // ID dimension across the bore
    `<line x1="${cx - ir}" y1="${cy - or_ - 30}" x2="${cx + ir}" y2="${cy - or_ - 30}" stroke="${DIM}" stroke-width="1" marker-start="url(#arrS)" marker-end="url(#arrE)"/>`,
    `<path d="M${cx - ir} ${cy - or_ - 34} L${cx - ir} ${cy - Math.sqrt(Math.max(ir * ir - 1, 0))} M${cx + ir} ${cy - or_ - 34} L${cx + ir} ${cy - Math.sqrt(Math.max(ir * ir - 1, 0))}" stroke="${DIM}" stroke-width="0.8"/>`,
    text(cx, cy - or_ - 38, `ID ⌀ ${ID.label}`),
    vDim(cy - or_, cy + or_, cx, cx - or_ - 36, `OD ⌀ ${OD.label}`),
  ].join("");

  // section view: annulus cross-section
  const tw = Math.max(T.v * scale, 8);
  const sx = 540;
  const band = or_ - ir;
  const section = [
    `<rect x="${sx}" y="${cy - or_}" width="${tw}" height="${band}" fill="none" stroke="${INK}" stroke-width="1.5"/>`,
    `<rect x="${sx}" y="${cy + ir}" width="${tw}" height="${band}" fill="none" stroke="${INK}" stroke-width="1.5"/>`,
    `<line x1="${sx - 12}" y1="${cy}" x2="${sx + tw + 12}" y2="${cy}" stroke="${FAINT}" stroke-width="0.7" stroke-dasharray="14 4 3 4"/>`,
    hDim(sx, sx + tw, cy - or_, cy - or_ - 26, T.label),
    text(sx + tw / 2, cy + or_ + 30, "Section", { fill: FAINT, size: 11 }),
  ].join("");

  const meta = [
    [s["Material"], s["Finish"]].filter(Boolean).join(" · "),
    [s["For Screw Size"] ? `For screw size ${s["For Screw Size"]}` : "", s["Grade/Class"], s["Temp Range"] ? `Temp: ${s["Temp Range"]}` : ""].filter(Boolean).join(" · "),
  ];
  return frame(face + section, p.part_number, p.name, meta);
}

// ---------- O-Ring ----------

function drawORing(p: Product): string | null {
  const s = p.specs ?? {};
  const OD = parseDim(s["OD"]);
  const ID = parseDim(s["ID"]);
  const CS = parseDim(s["Cross Section"]);
  if (!OD || !ID || !CS) return null;

  const cy = 175;
  const scale = Math.min(230 / OD.v, 5000);
  const or_ = (OD.v * scale) / 2;
  const ir = (ID.v * scale) / 2;
  const cx = 230;

  const face = [
    `<circle cx="${cx}" cy="${cy}" r="${or_}" fill="none" stroke="${INK}" stroke-width="1.5"/>`,
    `<circle cx="${cx}" cy="${cy}" r="${ir}" fill="none" stroke="${INK}" stroke-width="1.5"/>`,
    `<line x1="${cx - or_ - 16}" y1="${cy}" x2="${cx + or_ + 16}" y2="${cy}" stroke="${FAINT}" stroke-width="0.7" stroke-dasharray="14 4 3 4"/>`,
    `<line x1="${cx}" y1="${cy - or_ - 16}" x2="${cx}" y2="${cy + or_ + 16}" stroke="${FAINT}" stroke-width="0.7" stroke-dasharray="14 4 3 4"/>`,
    `<line x1="${cx - ir}" y1="${cy - or_ - 30}" x2="${cx + ir}" y2="${cy - or_ - 30}" stroke="${DIM}" stroke-width="1" marker-start="url(#arrS)" marker-end="url(#arrE)"/>`,
    `<path d="M${cx - ir} ${cy - or_ - 34} L${cx - ir} ${cy - Math.sqrt(Math.max(ir * ir - 1, 0))} M${cx + ir} ${cy - or_ - 34} L${cx + ir} ${cy - Math.sqrt(Math.max(ir * ir - 1, 0))}" stroke="${DIM}" stroke-width="0.8"/>`,
    text(cx, cy - or_ - 38, `ID ⌀ ${ID.label}`),
    vDim(cy - or_, cy + or_, cx, cx - or_ - 36, `OD ⌀ ${OD.label}`),
  ].join("");

  // enlarged cross-section
  const csR = 42;
  const sx = 560;
  const section = [
    `<circle cx="${sx}" cy="${cy}" r="${csR}" fill="none" stroke="${INK}" stroke-width="1.5"/>`,
    `<line x1="${sx - csR}" y1="${cy - csR - 22}" x2="${sx + csR}" y2="${cy - csR - 22}" stroke="${DIM}" stroke-width="1" marker-start="url(#arrS)" marker-end="url(#arrE)"/>`,
    `<path d="M${sx - csR} ${cy - csR - 26} V${cy - csR} M${sx + csR} ${cy - csR - 26} V${cy - csR}" stroke="${DIM}" stroke-width="0.8"/>`,
    text(sx, cy - csR - 30, `W ⌀ ${CS.label}`),
    text(sx, cy + csR + 26, "Cross-section (enlarged)", { fill: FAINT, size: 11 }),
  ].join("");

  const meta = [
    [s["Material"], s["Hardness"], s["Color"]].filter(Boolean).join(" · "),
    [s["Dash No."] ? `Dash No. ${s["Dash No."]}` : "", s["Temp Range"] ? `Temp: ${s["Temp Range"]}` : "", s["Specs"]].filter(Boolean).join(" · "),
  ];
  return frame(face + section, p.part_number, p.name, meta);
}

// ---------- Public API ----------

export function generateDrawing(p: Product): string | null {
  if (p.section !== "hardware") return null;
  if (p.category.startsWith("Screws")) return drawScrew(p);
  if (p.category.startsWith("Washers")) return drawWasher(p);
  if (p.category.startsWith("O-Rings")) return drawORing(p);
  return null;
}

export function canDrawProduct(p: Product): boolean {
  const s = p.specs ?? {};
  if (p.section !== "hardware") return false;
  if (p.category.startsWith("Screws")) {
    return !!(threadDia(s["Thread Size"]) && parseDim(s["Length"]) && parseDim(s["Head Diameter"]) && parseDim(s["Head Height"]));
  }
  if (p.category.startsWith("Washers")) {
    return !!(parseDim(s["OD"]) && parseDim(s["ID"]) && parseDim(s["Thickness"]));
  }
  if (p.category.startsWith("O-Rings")) {
    return !!(parseDim(s["OD"]) && parseDim(s["ID"]) && parseDim(s["Cross Section"]));
  }
  return false;
}
