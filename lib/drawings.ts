import type { Product } from "@/lib/catalog";

/**
 * Parametric 2D dimension drawings, generated from each product's specs.
 *
 * Architecture: every template emits a backend-neutral list of drawing Ops
 * (lines, paths, circles, polygons, text). The SVG renderer serves the site
 * (`/api/drawing/[id]`); the PDF spec sheet (lib/spec-sheet.ts) renders the
 * same ops with pdf-lib. Paths use only M/L/Q/C/Z so both backends agree.
 *
 * Templates: screws (side + drive end view), washers, gaskets, O-rings,
 * dowel pins, threaded rods, hex nuts, compression/die springs, torsion
 * springs. Dimensions are dual-labeled (inch + mm). Geometry is computed in
 * inches; labels keep the original spec strings.
 */

export type DrawOp =
  | { t: "line"; x1: number; y1: number; x2: number; y2: number; w?: number; color?: string; dash?: string }
  | { t: "path"; d: string; w?: number; color?: string; fill?: string }
  | { t: "circle"; cx: number; cy: number; r: number; w?: number; color?: string; fill?: string; dash?: string }
  | { t: "poly"; pts: [number, number][]; fill: string }
  | { t: "text"; x: number; y: number; s: string; size?: number; color?: string; bold?: boolean; anchor?: "start" | "middle" | "end"; rotate?: number };

export type Drawing = { ops: DrawOp[]; width: number; height: number };

export const INK = "#0F1430";
export const DIM = "#1E3FA0";
export const FAINT = "#828BA6";
const FONT = "IBM Plex Sans, -apple-system, sans-serif";

// Geometry canvas for all templates (frame/title block added separately)
const W = 760;
const GH = 360; // geometry area height

// ---------- dimension parsing ----------

type Dim = { v: number; label: string; convertible: boolean };

function parseDim(s: string | undefined): Dim | null {
  if (!s) return null;
  const t = s.trim();

  const range = t.split(/\s+to\s+/i);
  if (range.length === 2) {
    const a = parseDim(range[0]);
    const b = parseDim(range[1]);
    if (a && b) return { v: (a.v + b.v) / 2, label: t, convertible: false };
  }

  const ft = t.match(/^(\d+(?:\.\d+)?)\s*ft\.?$/i);
  if (ft) return { v: parseFloat(ft[1]) * 12, label: t, convertible: true };

  const mm = t.match(/^(\d+(?:\.\d+)?)\s*mm$/i);
  if (mm) return { v: parseFloat(mm[1]) / 25.4, label: t, convertible: true };

  const frac = t.match(/^(?:(\d+)\s+)?(\d+)\/(\d+)\s*(?:"|in)?$/);
  if (frac) {
    const whole = frac[1] ? parseInt(frac[1]) : 0;
    return {
      v: whole + parseInt(frac[2]) / parseInt(frac[3]),
      label: t,
      convertible: true,
    };
  }

  const dec = t.match(/^(\d+(?:\.\d+)?)\s*(?:"|in)?$/);
  if (dec) return { v: parseFloat(dec[1]), label: t, convertible: true };

  return null;
}

/** Thread designation → nominal diameter (inches); label preserved. */
function threadDia(s: string | undefined): Dim | null {
  if (!s) return null;
  const t = s.trim();
  const num = t.match(/^#(\d+)/);
  if (num)
    return { v: 0.06 + 0.013 * parseInt(num[1]), label: t, convertible: false };
  const metric = t.match(/^M(\d+(?:\.\d+)?)/i);
  if (metric)
    return { v: parseFloat(metric[1]) / 25.4, label: t, convertible: false };
  const frac = t.match(/^(\d+)\/(\d+)/);
  if (frac)
    return {
      v: parseInt(frac[1]) / parseInt(frac[2]),
      label: t,
      convertible: false,
    };
  const dec = t.match(/^(\d+(?:\.\d+)?)"/);
  if (dec) return { v: parseFloat(dec[1]), label: t, convertible: false };
  return null;
}

/** Dual-unit label: `3/4"` → `3/4" (19.05 mm)`; `10mm` → `10mm (0.394")` */
function dual(d: Dim): string {
  if (!d.convertible) return d.label;
  if (/mm$/i.test(d.label.trim())) return `${d.label} (${d.v.toFixed(3)}")`;
  return `${d.label} (${(d.v * 25.4).toFixed(2)} mm)`;
}

function firstSpec(
  specs: Record<string, string>,
  keys: string[]
): string | undefined {
  for (const k of keys) if (specs[k]) return specs[k];
  return undefined;
}

// ---------- op helpers ----------

function arrow(x: number, y: number, angle: number): DrawOp {
  const L = 8;
  const wHalf = 3;
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return {
    t: "poly",
    pts: [
      [x, y],
      [x - L * c + wHalf * s, y - L * s - wHalf * c],
      [x - L * c - wHalf * s, y - L * s + wHalf * c],
    ],
    fill: DIM,
  };
}

/** Horizontal dimension between x1..x2 at height y, reference points at yRef */
function hDim(x1: number, x2: number, yRef: number, y: number, label: string): DrawOp[] {
  const dir = y > yRef ? 4 : -4;
  return [
    { t: "line", x1, y1: yRef, x2: x1, y2: y + dir, w: 0.8, color: DIM },
    { t: "line", x1: x2, y1: yRef, x2, y2: y + dir, w: 0.8, color: DIM },
    { t: "line", x1, y1: y, x2, y2: y, w: 1, color: DIM },
    arrow(x1, y, Math.PI),
    arrow(x2, y, 0),
    { t: "text", x: (x1 + x2) / 2, y: y + 16, s: label },
  ];
}

/** Vertical dimension between y1..y2 at x, reference points at xRef */
function vDim(y1: number, y2: number, xRef: number, x: number, label: string): DrawOp[] {
  const dir = x > xRef ? 4 : -4;
  return [
    { t: "line", x1: xRef, y1, x2: x + dir, y2: y1, w: 0.8, color: DIM },
    { t: "line", x1: xRef, y1: y2, x2: x + dir, y2: y2, w: 0.8, color: DIM },
    { t: "line", x1: x, y1, x2: x, y2, w: 1, color: DIM },
    arrow(x, y1, -Math.PI / 2),
    arrow(x, y2, Math.PI / 2),
    { t: "text", x: x - 6, y: (y1 + y2) / 2, s: label, rotate: -90 },
  ];
}

function centerlineH(x1: number, x2: number, y: number): DrawOp {
  return { t: "line", x1, y1: y, x2, y2: y, w: 0.7, color: FAINT, dash: "14 4 3 4" };
}
function centerlineV(x: number, y1: number, y2: number): DrawOp {
  return { t: "line", x1: x, y1, x2: x, y2, w: 0.7, color: FAINT, dash: "14 4 3 4" };
}
function crosshair(cx: number, cy: number, r: number): DrawOp[] {
  return [centerlineH(cx - r - 16, cx + r + 16, cy), centerlineV(cx, cy - r - 16, cy + r + 16)];
}
function caption(x: number, y: number, s: string): DrawOp {
  return { t: "text", x, y, s, color: FAINT, size: 11 };
}

/** Simplified thread convention: minor-diameter lines + 45° end chamfer. */
function threadOps(
  x1: number,
  x2: number,
  cy: number,
  majorH: number,
  opts: { chamferEnd?: boolean } = {}
): DrawOp[] {
  const minor = majorH * 0.78;
  const ops: DrawOp[] = [
    { t: "line", x1, y1: cy - minor / 2, x2: x2 - (opts.chamferEnd ? majorH * 0.18 : 0), y2: cy - minor / 2, w: 0.7, color: INK },
    { t: "line", x1, y1: cy + minor / 2, x2: x2 - (opts.chamferEnd ? majorH * 0.18 : 0), y2: cy + minor / 2, w: 0.7, color: INK },
  ];
  if (opts.chamferEnd) {
    const ch = majorH * 0.18;
    ops.push(
      { t: "line", x1: x2 - ch, y1: cy - majorH / 2, x2, y2: cy - minor / 2 + 1, w: 1.5, color: INK },
      { t: "line", x1: x2 - ch, y1: cy + majorH / 2, x2, y2: cy + minor / 2 - 1, w: 1.5, color: INK }
    );
  }
  return ops;
}

// ---------- screw ----------

type HeadStyle = "pan" | "button" | "truss" | "cheese" | "round" | "flat" | "socket";

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

function drawScrew(p: Product): Drawing | null {
  const s = p.specs ?? {};
  const D = threadDia(s["Thread Size"]);
  const L = parseDim(s["Length"]);
  const HD = parseDim(s["Head Diameter"]);
  const HH = parseDim(s["Head Height"]);
  if (!D || !L || !HD || !HH) return null;
  const style = screwHeadStyle(p.category);
  const partial = /partial/i.test(s["Threading"] ?? "") || /partial/i.test(p.category);
  const drive = (s["Drive Type"] ?? "").toLowerCase();

  // side view (left ~520px) + end view (right)
  const availW = 470;
  const availH = 210;
  const scale = Math.min(availW / (HH.v + L.v), availH / Math.max(HD.v, D.v * 1.4));
  const hh = HH.v * scale;
  const hd = HD.v * scale;
  const ln = L.v * scale;
  const dd = D.v * scale;
  const x0 = 80 + Math.max(0, (availW - hh - ln) / 2);
  const cy = 160;
  const hTop = cy - hd / 2;
  const hBot = cy + hd / 2;
  const r = Math.min(hh * 0.4, hd * 0.15);
  const ops: DrawOp[] = [];

  ops.push(centerlineH(x0 - 22, x0 + hh + ln + 22, cy));

  // head profile
  switch (style) {
    case "button":
    case "round":
    case "truss":
      ops.push({
        t: "path",
        d: `M${x0 + hh} ${hTop} Q${x0 - hh * 0.35} ${hTop} ${x0 - hh * 0.05} ${cy} Q${x0 - hh * 0.35} ${hBot} ${x0 + hh} ${hBot} Z`,
        w: 1.5,
        color: INK,
      });
      break;
    case "flat":
      ops.push({
        t: "path",
        d: `M${x0} ${hTop} L${x0 + hh} ${cy - dd / 2} L${x0 + hh} ${cy + dd / 2} L${x0} ${hBot} Z`,
        w: 1.5,
        color: INK,
      });
      break;
    default:
      ops.push({
        t: "path",
        d: `M${x0 + r} ${hTop} L${x0 + hh} ${hTop} L${x0 + hh} ${hBot} L${x0 + r} ${hBot} Q${x0} ${hBot} ${x0} ${hBot - r} L${x0} ${hTop + r} Q${x0} ${hTop} ${x0 + r} ${hTop} Z`,
        w: 1.5,
        color: INK,
      });
      if (style === "socket") {
        ops.push(
          { t: "line", x1: x0 + hh * 0.35, y1: cy - dd * 0.35, x2: x0 + hh * 0.35, y2: cy + dd * 0.35, w: 1, color: INK },
          { t: "line", x1: x0 + hh * 0.6, y1: cy - dd * 0.35, x2: x0 + hh * 0.6, y2: cy + dd * 0.35, w: 1, color: INK }
        );
      }
  }

  // shank + simplified thread
  const sx = x0 + hh;
  ops.push({
    t: "path",
    d: `M${sx} ${cy - dd / 2} L${sx + ln} ${cy - dd / 2} L${sx + ln} ${cy + dd / 2} L${sx} ${cy + dd / 2}`,
    w: 1.5,
    color: INK,
  });
  const tStart = partial ? sx + ln * 0.45 : sx;
  ops.push(...threadOps(tStart, sx + ln, cy, dd, { chamferEnd: true }));
  if (partial) {
    ops.push({ t: "line", x1: tStart, y1: cy - dd / 2, x2: tStart, y2: cy + dd / 2, w: 1, color: INK });
  }

  // dims
  ops.push(...hDim(sx, sx + ln, cy + dd / 2, cy + Math.max(dd / 2, hd / 2) + 40, `L = ${dual(L)}`));
  ops.push(...vDim(hTop, hBot, x0, x0 - 34, `⌀ ${dual(HD)}`));
  ops.push(...hDim(x0, sx, hTop, hTop - 26, dual(HH)));
  ops.push(
    { t: "line", x1: sx + ln * 0.7, y1: cy - dd / 2, x2: sx + ln * 0.7 + 30, y2: cy - dd / 2 - 30, w: 0.8, color: DIM },
    { t: "text", x: sx + ln * 0.7 + 34, y: cy - dd / 2 - 34, s: s["Thread Size"] ?? "", anchor: "start" }
  );

  // end view: head circle + drive symbol
  const ex = 650;
  const er = Math.min(hd / 2, 55);
  ops.push(...crosshair(ex, cy, er));
  ops.push({ t: "circle", cx: ex, cy, r: er, w: 1.5, color: INK });
  const isSocket = style === "socket" || style === "button" || (!drive && style !== "cheese");
  if (drive.includes("phillips")) {
    const a = er * 0.55;
    const b = er * 0.14;
    ops.push({
      t: "path",
      d: `M${ex - b} ${cy - a} L${ex + b} ${cy - a} L${ex + b} ${cy - b} L${ex + a} ${cy - b} L${ex + a} ${cy + b} L${ex + b} ${cy + b} L${ex + b} ${cy + a} L${ex - b} ${cy + a} L${ex - b} ${cy + b} L${ex - a} ${cy + b} L${ex - a} ${cy - b} L${ex - b} ${cy - b} Z`,
      w: 1.2,
      color: INK,
    });
  } else if (drive.includes("slot") || style === "cheese") {
    ops.push({ t: "path", d: `M${ex - er * 0.7} ${cy - er * 0.1} L${ex + er * 0.7} ${cy - er * 0.1} L${ex + er * 0.7} ${cy + er * 0.1} L${ex - er * 0.7} ${cy + er * 0.1} Z`, w: 1.2, color: INK });
  } else if (isSocket) {
    const hr = er * 0.5;
    const pts: string[] = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i + Math.PI / 6;
      pts.push(`${i === 0 ? "M" : "L"}${ex + hr * Math.cos(a)} ${cy + hr * Math.sin(a)}`);
    }
    ops.push({ t: "path", d: pts.join(" ") + " Z", w: 1.2, color: INK });
  }
  ops.push(caption(ex, cy + er + 28, "Head view"));

  return { ops, width: W, height: GH };
}

// ---------- washer / gasket ----------

function drawAnnulus(
  p: Product,
  keys: { od: string[]; id: string[]; t: string[] },
  extras?: { boltHoles?: number; sectionLabel?: string }
): Drawing | null {
  const s = p.specs ?? {};
  const OD = parseDim(firstSpec(s, keys.od));
  const ID = parseDim(firstSpec(s, keys.id));
  const T = parseDim(firstSpec(s, keys.t));
  if (!OD || !ID) return null;

  const cy = 165;
  const scale = 220 / OD.v;
  const or_ = (OD.v * scale) / 2;
  const ir = (ID.v * scale) / 2;
  const cx = 215;
  const ops: DrawOp[] = [];

  ops.push(...crosshair(cx, cy, or_));
  ops.push({ t: "circle", cx, cy, r: or_, w: 1.5, color: INK });
  ops.push({ t: "circle", cx, cy, r: ir, w: 1.5, color: INK });
  const holes = extras?.boltHoles ?? 0;
  if (holes >= 2 && holes <= 24) {
    const br = (or_ + ir) / 2;
    const hr = Math.min((or_ - ir) * 0.2, 7);
    for (let i = 0; i < holes; i++) {
      const a = (2 * Math.PI * i) / holes - Math.PI / 2;
      ops.push({ t: "circle", cx: cx + br * Math.cos(a), cy: cy + br * Math.sin(a), r: hr, w: 1.2, color: INK });
    }
    ops.push({ t: "circle", cx, cy, r: br, w: 0.7, color: FAINT, dash: "6 4" });
  }
  ops.push(
    { t: "line", x1: cx - ir, y1: cy - or_ - 30, x2: cx + ir, y2: cy - or_ - 30, w: 1, color: DIM },
    arrow(cx - ir, cy - or_ - 30, Math.PI),
    arrow(cx + ir, cy - or_ - 30, 0),
    { t: "line", x1: cx - ir, y1: cy - or_ - 34, x2: cx - ir, y2: cy - ir * 0.2, w: 0.8, color: DIM },
    { t: "line", x1: cx + ir, y1: cy - or_ - 34, x2: cx + ir, y2: cy - ir * 0.2, w: 0.8, color: DIM },
    { t: "text", x: cx, y: cy - or_ - 38, s: `ID ⌀ ${dual(ID)}` }
  );
  ops.push(...vDim(cy - or_, cy + or_, cx, cx - or_ - 36, `OD ⌀ ${dual(OD)}`));

  if (T) {
    const tw = Math.max(T.v * scale, 8);
    const sx = 560;
    const band = or_ - ir;
    ops.push(
      { t: "path", d: `M${sx} ${cy - or_} L${sx + tw} ${cy - or_} L${sx + tw} ${cy - ir} L${sx} ${cy - ir} Z`, w: 1.5, color: INK },
      { t: "path", d: `M${sx} ${cy + ir} L${sx + tw} ${cy + ir} L${sx + tw} ${cy + or_} L${sx} ${cy + or_} Z`, w: 1.5, color: INK },
      centerlineH(sx - 12, sx + tw + 12, cy),
      ...hDim(sx, sx + tw, cy - or_, cy - or_ - 26, dual(T)),
      caption(sx + tw / 2, cy + or_ + 30, extras?.sectionLabel ?? "Section")
    );
    void band;
  }
  return { ops, width: W, height: GH };
}

function drawWasher(p: Product): Drawing | null {
  return drawAnnulus(p, { od: ["OD"], id: ["ID"], t: ["Thickness"] });
}

function drawGasket(p: Product): Drawing | null {
  const n = parseInt(p.specs?.["Number of Bolt Holes"] ?? "");
  return drawAnnulus(
    p,
    { od: ["Outside Diameter", "OD"], id: ["Inside Diameter", "ID"], t: ["Thickness"] },
    { boltHoles: Number.isNaN(n) ? 0 : n, sectionLabel: "Section" }
  );
}

// ---------- O-ring ----------

function drawORing(p: Product): Drawing | null {
  const s = p.specs ?? {};
  const OD = parseDim(s["OD"]);
  const ID = parseDim(s["ID"]);
  const CS = parseDim(s["Cross Section"]);
  if (!OD || !ID || !CS) return null;
  const base = drawAnnulus(p, { od: ["OD"], id: ["ID"], t: [] });
  if (!base) return null;
  const cy = 165;
  const sx = 590;
  const csR = 42;
  base.ops.push(
    { t: "circle", cx: sx, cy, r: csR, w: 1.5, color: INK },
    { t: "line", x1: sx - csR, y1: cy - csR - 22, x2: sx + csR, y2: cy - csR - 22, w: 1, color: DIM },
    arrow(sx - csR, cy - csR - 22, Math.PI),
    arrow(sx + csR, cy - csR - 22, 0),
    { t: "text", x: sx, y: cy - csR - 28, s: `W ⌀ ${dual(CS)}` },
    caption(sx, cy + csR + 26, "Cross-section (enlarged)")
  );
  return base;
}

// ---------- dowel pin ----------

function drawDowelPin(p: Product): Drawing | null {
  const s = p.specs ?? {};
  const D = parseDim(s["Diameter"]);
  const L = parseDim(s["Length"]);
  if (!D || !L) return null;

  const availW = 440;
  const availH = 180;
  const scale = Math.min(availW / L.v, availH / D.v);
  const ln = L.v * scale;
  const dd = Math.max(D.v * scale, 14);
  const x0 = 90 + Math.max(0, (availW - ln) / 2);
  const cy = 160;
  const ch = Math.min(dd * 0.25, 8); // end chamfers/radii
  const ops: DrawOp[] = [];

  ops.push(centerlineH(x0 - 22, x0 + ln + 22, cy));
  ops.push({
    t: "path",
    d: `M${x0 + ch} ${cy - dd / 2} L${x0 + ln - ch} ${cy - dd / 2} Q${x0 + ln} ${cy - dd / 2} ${x0 + ln} ${cy - dd / 2 + ch} L${x0 + ln} ${cy + dd / 2 - ch} Q${x0 + ln} ${cy + dd / 2} ${x0 + ln - ch} ${cy + dd / 2} L${x0 + ch} ${cy + dd / 2} Q${x0} ${cy + dd / 2} ${x0} ${cy + dd / 2 - ch} L${x0} ${cy - dd / 2 + ch} Q${x0} ${cy - dd / 2} ${x0 + ch} ${cy - dd / 2} Z`,
    w: 1.5,
    color: INK,
  });
  ops.push(...hDim(x0, x0 + ln, cy + dd / 2, cy + dd / 2 + 44, `L = ${dual(L)}`));
  ops.push(...vDim(cy - dd / 2, cy + dd / 2, x0 + ln, x0 + ln + 36, `⌀ ${dual(D)}`));

  const ex = 640;
  const er = Math.max(Math.min(dd / 2, 45), 16);
  ops.push(...crosshair(ex, cy, er));
  ops.push({ t: "circle", cx: ex, cy, r: er, w: 1.5, color: INK });
  ops.push(caption(ex, cy + er + 28, "End view"));
  return { ops, width: W, height: GH };
}

// ---------- threaded rod ----------

function drawThreadedRod(p: Product): Drawing | null {
  const s = p.specs ?? {};
  const D = threadDia(s["Thread Size"]);
  const L = parseDim(s["Length"]);
  if (!D || !L) return null;

  const ln = 440;
  const dd = Math.max(Math.min(D.v * 140, 60), 18);
  const x0 = 95;
  const cy = 155;
  const ops: DrawOp[] = [];

  ops.push(centerlineH(x0 - 22, x0 + ln + 22, cy));
  ops.push({
    t: "path",
    d: `M${x0} ${cy - dd / 2} L${x0 + ln} ${cy - dd / 2} M${x0} ${cy + dd / 2} L${x0 + ln} ${cy + dd / 2} M${x0} ${cy - dd / 2} L${x0} ${cy + dd / 2} M${x0 + ln} ${cy - dd / 2} L${x0 + ln} ${cy + dd / 2}`,
    w: 1.5,
    color: INK,
  });
  ops.push(...threadOps(x0, x0 + ln, cy, dd, { chamferEnd: true }));
  // chamfer left end too
  const ch = dd * 0.18;
  ops.push(
    { t: "line", x1: x0 + ch, y1: cy - dd / 2, x2: x0, y2: cy - dd * 0.39, w: 1.5, color: INK },
    { t: "line", x1: x0 + ch, y1: cy + dd / 2, x2: x0, y2: cy + dd * 0.39, w: 1.5, color: INK }
  );
  ops.push(...hDim(x0, x0 + ln, cy + dd / 2, cy + dd / 2 + 44, `L = ${dual(L)} (fully threaded)`));
  ops.push(
    { t: "line", x1: x0 + ln * 0.72, y1: cy - dd / 2, x2: x0 + ln * 0.72 + 30, y2: cy - dd / 2 - 32, w: 0.8, color: DIM },
    { t: "text", x: x0 + ln * 0.72 + 34, y: cy - dd / 2 - 36, s: s["Thread Size"] ?? "", anchor: "start" }
  );

  const ex = 645;
  const er = Math.min(dd / 2 + 6, 40);
  ops.push(...crosshair(ex, cy, er));
  ops.push({ t: "circle", cx: ex, cy, r: er, w: 1.5, color: INK });
  ops.push({ t: "circle", cx: ex, cy, r: er * 0.78, w: 0.8, color: INK, dash: "5 3" });
  ops.push(caption(ex, cy + er + 28, "End view"));
  return { ops, width: W, height: GH };
}

// ---------- hex nut ----------

function drawNut(p: Product): Drawing | null {
  const s = p.specs ?? {};
  const D = threadDia(s["Thread Size"]);
  const WAF = parseDim(firstSpec(s, ["Width Across Flats", "Width", "Wrench Size"]));
  const H = parseDim(firstSpec(s, ["Height", "Thickness"]));
  if (!D || !WAF || !H) return null;

  const cy = 165;
  const scale = Math.min(200 / WAF.v, 150 / (WAF.v * 1.155));
  const across = WAF.v * scale;
  const R = across / Math.sqrt(3); // circumradius from across-flats
  const cx = 220;
  const ops: DrawOp[] = [];

  ops.push(...crosshair(cx, cy, R));
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    pts.push(`${i === 0 ? "M" : "L"}${cx + R * Math.cos(a)} ${cy + R * Math.sin(a)}`);
  }
  ops.push({ t: "path", d: pts.join(" ") + " Z", w: 1.5, color: INK });
  const thr = (D.v * scale) / 2;
  ops.push({ t: "circle", cx, cy, r: thr, w: 1.2, color: INK });
  ops.push({ t: "circle", cx, cy, r: thr * 0.82, w: 0.8, color: INK, dash: "5 3" });
  ops.push(...vDim(cy - across / 2, cy + across / 2, cx, cx - R - 30, `${dual(WAF)} across flats`));
  ops.push(
    { t: "line", x1: cx + thr * 0.7, y1: cy - thr * 0.7, x2: cx + R + 26, y2: cy - R - 14, w: 0.8, color: DIM },
    { t: "text", x: cx + R + 30, y: cy - R - 18, s: s["Thread Size"] ?? "", anchor: "start" }
  );

  // side view
  const sx = 560;
  const sh = H.v * scale;
  const sw = across;
  ops.push(centerlineV(sx + sw / 2, cy - sh / 2 - 16, cy + sh / 2 + 16));
  ops.push({
    t: "path",
    d: `M${sx} ${cy - sh / 2} L${sx + sw} ${cy - sh / 2} L${sx + sw} ${cy + sh / 2} L${sx} ${cy + sh / 2} Z`,
    w: 1.5,
    color: INK,
  });
  ops.push(
    { t: "line", x1: sx + sw / 3, y1: cy - sh / 2, x2: sx + sw / 3, y2: cy + sh / 2, w: 0.8, color: INK },
    { t: "line", x1: sx + (2 * sw) / 3, y1: cy - sh / 2, x2: sx + (2 * sw) / 3, y2: cy + sh / 2, w: 0.8, color: INK }
  );
  ops.push(...hDim(sx, sx + sw, cy + sh / 2, cy + sh / 2 + 34, "across flats"));
  ops.push(...vDim(cy - sh / 2, cy + sh / 2, sx + sw, sx + sw + 32, dual(H)));
  ops.push(caption(sx + sw / 2, cy + sh / 2 + 62, "Side view"));
  return { ops, width: W, height: GH };
}

/** Polyline with rounded interior vertices (quadratic smoothing). */
function smoothPath(pts: [number, number][], r: number): string {
  if (pts.length < 2) return "";
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    const [nx, ny] = pts[i + 1];
    const inLen = Math.hypot(cx - px, cy - py);
    const outLen = Math.hypot(nx - cx, ny - cy);
    const ri = Math.min(r, inLen / 2.2, outLen / 2.2);
    const inX = cx - ((cx - px) / inLen) * ri;
    const inY = cy - ((cy - py) / inLen) * ri;
    const outX = cx + ((nx - cx) / outLen) * ri;
    const outY = cy + ((ny - cy) / outLen) * ri;
    d += ` L${inX.toFixed(1)} ${inY.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${outX.toFixed(1)} ${outY.toFixed(1)}`;
  }
  const last = pts[pts.length - 1];
  d += ` L${last[0]} ${last[1]}`;
  return d;
}

// ---------- compression / die spring ----------

function drawCoilSpring(p: Product): Drawing | null {
  const s = p.specs ?? {};
  const OD = parseDim(firstSpec(s, ["OD", "Outside Diameter", "Hole Dia."]));
  const L = parseDim(firstSpec(s, ["Length", "Free Length"]));
  const wire = parseDim(firstSpec(s, ["Wire Dia.", "Wire Diameter", "Wire Wd."]));
  if (!OD || !L || !wire) return null;
  const isDie = p.category.startsWith("Die Springs");

  const availW = 300;
  const availH = 210;
  const scale = Math.min(availW / L.v, availH / OD.v);
  const ln = Math.max(L.v * scale, 60);
  const od = Math.max(OD.v * scale, 40);
  const wd = Math.min(Math.max(wire.v * scale, 2), od * 0.09);
  const x0 = 120 + Math.max(0, (availW - ln) / 2);
  const cy = 150;
  const coils = Math.max(3, Math.min(12, Math.round(L.v / (wire.v * 2.6))));
  const ops: DrawOp[] = [];

  ops.push(centerlineH(x0 - 20, x0 + ln + 20, cy));
  const top = cy - od / 2 + wd / 2;
  const bot = cy + od / 2 - wd / 2;
  const pitch = (ln - 2 * wd) / coils;
  const pts: [number, number][] = [
    [x0 + wd / 2, bot],
    [x0 + wd / 2, top],
  ];
  let x = x0 + wd / 2;
  for (let i = 0; i < coils; i++) {
    x += pitch;
    pts.push([x, i % 2 === 0 ? bot : top]);
  }
  const lastY = pts[pts.length - 1][1];
  pts.push([x0 + ln - wd / 2, lastY === bot ? top : bot]); // ground end bar
  ops.push({
    t: "path",
    d: smoothPath(pts, Math.min(pitch * 0.4, od * 0.16)),
    w: wd,
    color: INK,
  });

  ops.push(...hDim(x0, x0 + ln, cy + od / 2, cy + od / 2 + 42, `Free length ${dual(L)}`));
  ops.push(...vDim(cy - od / 2, cy + od / 2, x0, x0 - 34, `⌀ ${isDie ? "fits hole " : ""}${dual(OD)}`));
  ops.push(
    { t: "line", x1: x0 + ln - wd / 2, y1: top - wd / 2, x2: x0 + ln + 28, y2: top - 26, w: 0.8, color: DIM },
    { t: "text", x: x0 + ln + 32, y: top - 30, s: `wire ${dual(wire)}`, anchor: "start" }
  );

  const ex = 630;
  const er = Math.min(od / 2, 48);
  const ir = Math.max(er - Math.max(wd, er * 0.18), er * 0.3);
  ops.push(...crosshair(ex, cy, er));
  ops.push({ t: "circle", cx: ex, cy, r: er, w: 1.5, color: INK });
  ops.push({ t: "circle", cx: ex, cy, r: ir, w: 1.5, color: INK });
  ops.push(caption(ex, cy + er + 28, "End view"));
  if (s["End Type"]) ops.push(caption(x0 + ln / 2, cy - od / 2 - 30, `Ends: ${s["End Type"]}`));
  return { ops, width: W, height: GH };
}

// ---------- torsion spring ----------

function drawTorsionSpring(p: Product): Drawing | null {
  const s = p.specs ?? {};
  const OD = parseDim(firstSpec(s, ["Outside Diameter", "OD"]));
  const wire = parseDim(firstSpec(s, ["Wire Diameter", "Wire Dia."]));
  const leg = parseDim(firstSpec(s, ["Leg Diameter/Length", "Leg Length"]));
  if (!OD || !wire) return null;

  const cy = 165;
  const maxR = 80;
  const scale = Math.min((2 * maxR) / OD.v, 3000);
  const or_ = Math.max((OD.v * scale) / 2, 26);
  const wd = Math.max(wire.v * scale, 2.5);
  const legLen = leg ? Math.min(leg.v * scale, 150) : or_ * 1.6;
  const cx = 230;
  const ops: DrawOp[] = [];

  // axial view: coil + two tangent legs 90° apart (up from the right tangent,
  // rightward from the bottom tangent) — the classic torsion-spring profile
  const wdT = Math.min(Math.max(wire.v * scale, 2.5), or_ * 0.28);
  ops.push(...crosshair(cx, cy, or_));
  ops.push({ t: "circle", cx, cy, r: or_, w: wdT, color: INK });
  ops.push({ t: "line", x1: cx + or_, y1: cy, x2: cx + or_, y2: cy - legLen, w: wdT, color: INK });
  ops.push({ t: "line", x1: cx, y1: cy + or_, x2: cx + legLen, y2: cy + or_, w: wdT, color: INK });
  ops.push(...vDim(cy - or_, cy + or_, cx, cx - or_ - 30, `⌀ ${dual(OD)}`));
  if (leg) {
    ops.push(...hDim(cx, cx + legLen, cy + or_, cy + or_ + 34, `legs ${dual(leg)}`));
  }
  ops.push(
    { t: "line", x1: cx - or_ * 0.72, y1: cy - or_ * 0.72, x2: cx - or_ - 26, y2: cy - or_ - 22, w: 0.8, color: DIM },
    { t: "text", x: cx - or_ - 30, y: cy - or_ - 26, s: `wire ${dual(wire)}`, anchor: "end" }
  );

  // side silhouette
  const coils = Math.max(2, Math.min(10, Math.round(parseFloat(s["Number of Coils"] ?? "4"))));
  const bw = Math.max(coils * wd * 1.15, 26);
  const sx = 590;
  ops.push(centerlineH(sx - bw / 2 - 16, sx + bw / 2 + 16, cy));
  ops.push({
    t: "path",
    d: `M${sx - bw / 2} ${cy - or_} L${sx + bw / 2} ${cy - or_} L${sx + bw / 2} ${cy + or_} L${sx - bw / 2} ${cy + or_} Z`,
    w: 1.5,
    color: INK,
  });
  for (let i = 1; i < coils; i++) {
    const lx = sx - bw / 2 + (bw * i) / coils;
    ops.push({ t: "line", x1: lx, y1: cy - or_, x2: lx, y2: cy + or_, w: 0.7, color: INK });
  }
  const windLabel = s["Winding Direction"] ? `${coils} coils · ${s["Winding Direction"]}` : `${coils} coils`;
  ops.push(caption(sx, cy + or_ + 28, windLabel));
  return { ops, width: W, height: GH };
}

// ---------- frame / title block ----------

function frameOps(p: Product): DrawOp[] {
  const H = 480;
  const s = p.specs ?? {};
  const meta = [
    [s["Material"], s["Finish"], s["Color"]].filter(Boolean).join(" · "),
    [
      s["Threading"],
      s["Drive Type"] ? `${s["Drive Type"]} drive` : "",
      s["End Type"] ? `Ends: ${s["End Type"]}` : "",
      s["Hardness"],
      s["Tensile Strength"] ? `Tensile: ${s["Tensile Strength"]}` : "",
    ]
      .filter(Boolean)
      .join(" · "),
    [s["Specs"], s["Standards"], s["Grade/Class"]].filter(Boolean).join(" · "),
  ].filter(Boolean);
  const subtitle = p.name.length > 82 ? p.name.slice(0, 79) + "…" : p.name;

  const ops: DrawOp[] = [
    { t: "path", d: `M12 12 L${W - 12} 12 L${W - 12} ${H - 12} L12 ${H - 12} Z`, w: 1.2, color: INK },
    { t: "line", x1: 12, y1: H - 92, x2: W - 12, y2: H - 92, w: 1.2, color: INK },
    { t: "text", x: 24, y: H - 71, s: p.part_number, size: 15, color: INK, bold: true, anchor: "start" },
    { t: "text", x: 24, y: H - 56, s: subtitle, size: 11.5, color: FAINT, anchor: "start" },
    { t: "text", x: W - 24, y: H - 71, s: "SONGGLOW", size: 15, color: INK, bold: true, anchor: "end" },
    { t: "text", x: W - 24, y: H - 55, s: "songglow.com", size: 10.5, color: FAINT, anchor: "end" },
    { t: "text", x: W - 24, y: H - 28, s: "Dual dimensions inch (mm) · Not to scale beyond stated dims", size: 9.5, color: FAINT, anchor: "end" },
  ];
  meta.slice(0, 3).forEach((m, i) => {
    ops.push({ t: "text", x: 24, y: H - 40 + i * 12.5, s: m.slice(0, 110), size: 10.5, color: FAINT, anchor: "start" });
  });
  return ops;
}

// ---------- public API ----------

export function buildDrawing(p: Product): Drawing | null {
  if (p.section !== "hardware") return null;
  const c = p.category;
  if (c.startsWith("Screws")) return drawScrew(p);
  if (c.startsWith("Washers")) return drawWasher(p);
  if (c.startsWith("Gaskets")) return drawGasket(p);
  if (c.startsWith("O-Rings")) return drawORing(p);
  if (c.startsWith("Dowel Pins")) return drawDowelPin(p);
  if (c.startsWith("Threaded Rods")) return drawThreadedRod(p);
  if (c.startsWith("Nuts")) return drawNut(p);
  if (c.startsWith("Compression Springs") || c.startsWith("Die Springs")) return drawCoilSpring(p);
  if (c.startsWith("Torsion Springs")) return drawTorsionSpring(p);
  return null;
}

export function canDrawProduct(p: Product): boolean {
  try {
    return buildDrawing(p) !== null;
  } catch {
    return false;
  }
}

// ---------- SVG renderer ----------

const esc = (s: string) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

export function opsToSvg(ops: DrawOp[], width: number, height: number): string {
  const parts: string[] = [];
  for (const op of ops) {
    switch (op.t) {
      case "line":
        parts.push(
          `<line x1="${op.x1.toFixed(1)}" y1="${op.y1.toFixed(1)}" x2="${op.x2.toFixed(1)}" y2="${op.y2.toFixed(1)}" stroke="${op.color ?? INK}" stroke-width="${op.w ?? 1}"${op.dash ? ` stroke-dasharray="${op.dash}"` : ""} stroke-linecap="round"/>`
        );
        break;
      case "path":
        parts.push(
          `<path d="${op.d}" fill="${op.fill ?? "none"}" stroke="${op.color ?? INK}" stroke-width="${op.w ?? 1}" stroke-linejoin="round" stroke-linecap="round"/>`
        );
        break;
      case "circle":
        parts.push(
          `<circle cx="${op.cx.toFixed(1)}" cy="${op.cy.toFixed(1)}" r="${op.r.toFixed(1)}" fill="${op.fill ?? "none"}" stroke="${op.color ?? INK}" stroke-width="${op.w ?? 1}"${op.dash ? ` stroke-dasharray="${op.dash}"` : ""}/>`
        );
        break;
      case "poly":
        parts.push(
          `<polygon points="${op.pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")}" fill="${op.fill}"/>`
        );
        break;
      case "text": {
        const inner = `<text font-family="${FONT}" font-size="${op.size ?? 12}"${op.bold ? ' font-weight="600"' : ""} fill="${op.color ?? DIM}" text-anchor="${op.anchor ?? "middle"}"${op.rotate ? "" : ` x="${op.x.toFixed(1)}" y="${op.y.toFixed(1)}"`}>${esc(op.s)}</text>`;
        parts.push(
          op.rotate
            ? `<g transform="translate(${op.x.toFixed(1)},${op.y.toFixed(1)}) rotate(${op.rotate})">${inner}</g>`
            : inner
        );
        break;
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="#FFFFFF"/>${parts.join("")}</svg>`;
}

/** Full framed drawing as SVG (site + downloads). */
export function generateDrawing(p: Product): string | null {
  const d = buildDrawing(p);
  if (!d) return null;
  return opsToSvg([...d.ops, ...frameOps(p)], W, 480);
}
