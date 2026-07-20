import {
  PDFDocument,
  PDFFont,
  PDFPage,
  StandardFonts,
  degrees,
  rgb,
} from "pdf-lib";
import { buildDrawing, type DrawOp } from "@/lib/drawings";
import { orderedSpecs, type Product } from "@/lib/catalog";

/** One-page branded spec sheet: header + dimension drawing + spec table. */

const A4 = { w: 595.28, h: 841.89 };
const M = 42; // page margin

const NAVY = rgb(0x0f / 255, 0x14 / 255, 0x30 / 255);
const BLUE = rgb(0x1e / 255, 0x3f / 255, 0xa0 / 255);
const GRAY = rgb(0x82 / 255, 0x8b / 255, 0xa6 / 255);
const LINE = rgb(0xdf / 255, 0xe4 / 255, 0xec / 255);
const ZEBRA = rgb(0.965, 0.972, 0.98);

function hexColor(c: string) {
  const m = c.match(/^#(..)(..)(..)$/);
  if (!m) return NAVY;
  return rgb(parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255);
}

/** Helvetica (WinAnsi) can't encode every glyph we use — substitute safely. */
function safe(s: string): string {
  return s
    .replaceAll("⌀", "Ø")
    .replaceAll("Ω", " Ohm")
    .replaceAll("μ", "µ")
    .replaceAll("–", "-")
    .replaceAll("→", "->")
    .replace(/[^\x00-\xFF]/g, "");
}

function parseDash(dash?: string): number[] | undefined {
  if (!dash) return undefined;
  return dash.split(/\s+/).map(Number).filter((n) => !Number.isNaN(n));
}

/** Render drawing ops into a box whose TOP-LEFT is (ox, oyTop), scaled by s. */
function renderOps(
  page: PDFPage,
  ops: DrawOp[],
  ox: number,
  oyTop: number,
  s: number,
  fontR: PDFFont,
  fontB: PDFFont
) {
  const X = (x: number) => ox + x * s;
  const Y = (y: number) => oyTop - y * s;
  for (const op of ops) {
    switch (op.t) {
      case "line":
        page.drawLine({
          start: { x: X(op.x1), y: Y(op.y1) },
          end: { x: X(op.x2), y: Y(op.y2) },
          thickness: Math.max((op.w ?? 1) * s, 0.4),
          color: hexColor(op.color ?? "#0F1430"),
          dashArray: parseDash(op.dash)?.map((n) => n * s),
        });
        break;
      case "path":
        page.drawSvgPath(op.d, {
          x: ox,
          y: oyTop,
          scale: s,
          borderColor: hexColor(op.color ?? "#0F1430"),
          borderWidth: Math.max((op.w ?? 1) * s, 0.4),
          color: op.fill && op.fill !== "none" ? hexColor(op.fill) : undefined,
        });
        break;
      case "circle":
        page.drawCircle({
          x: X(op.cx),
          y: Y(op.cy),
          size: op.r * s,
          borderColor: hexColor(op.color ?? "#0F1430"),
          borderWidth: Math.max((op.w ?? 1) * s, 0.4),
          borderDashArray: parseDash(op.dash)?.map((n) => n * s),
        });
        break;
      case "poly": {
        const d =
          op.pts
            .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`)
            .join(" ") + " Z";
        page.drawSvgPath(d, { x: ox, y: oyTop, scale: s, color: hexColor(op.fill) });
        break;
      }
      case "text": {
        const font = op.bold ? fontB : fontR;
        const size = (op.size ?? 12) * s;
        const text = safe(op.s);
        const w = font.widthOfTextAtSize(text, size);
        if (op.rotate) {
          // vertical label reading upward, centered on (x, y)
          page.drawText(text, {
            x: X(op.x) + size * 0.35,
            y: Y(op.y) - w / 2,
            size,
            font,
            color: hexColor(op.color ?? "#1E3FA0"),
            rotate: degrees(90),
          });
        } else {
          const anchor = op.anchor ?? "middle";
          const dx = anchor === "middle" ? -w / 2 : anchor === "end" ? -w : 0;
          page.drawText(text, {
            x: X(op.x) + dx,
            y: Y(op.y),
            size,
            font,
            color: hexColor(op.color ?? "#1E3FA0"),
          });
        }
        break;
      }
    }
  }
}

export async function generateSpecSheet(p: Product): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const page = doc.addPage([A4.w, A4.h]);
  const fontR = await doc.embedFont(StandardFonts.Helvetica);
  const fontB = await doc.embedFont(StandardFonts.HelveticaBold);
  let y = A4.h - M;

  // --- header: banner logo (layers mark + two-tone wordmark + tagline) ---
  const STEEL = rgb(0x48 / 255, 0x74 / 255, 0xa8 / 255);
  const BLACK = rgb(0x1a / 255, 0x1a / 255, 0x1a / 255);
  const mark = 30;
  const markOpts = { x: M, y, scale: mark / 24, borderColor: STEEL, borderWidth: 1.7 };
  page.drawSvgPath("M12 1.5 L21 7 L12 12.5 L3 7 Z", markOpts);
  page.drawSvgPath("M3 11.5 L12 17 L21 11.5", markOpts);
  page.drawSvgPath("M3 16.5 L12 22 L21 16.5", markOpts);
  const wx = M + mark + 12;
  const wordSize = 19;
  page.drawText("SONG", { x: wx, y: y - 16, size: wordSize, font: fontB, color: BLACK });
  page.drawText("GLOW", {
    x: wx + fontB.widthOfTextAtSize("SONG", wordSize),
    y: y - 16,
    size: wordSize,
    font: fontB,
    color: STEEL,
  });
  page.drawText("P A R T S ,   S O U R C E D .", {
    x: wx + 1,
    y: y - 27,
    size: 6.5,
    font: fontB,
    color: GRAY,
  });
  const label = "PRODUCT SPEC SHEET";
  page.drawText(label, {
    x: A4.w - M - fontR.widthOfTextAtSize(label, 9.5),
    y: y - 20,
    size: 9.5,
    font: fontR,
    color: GRAY,
  });
  y -= mark + 12;
  page.drawLine({ start: { x: M, y }, end: { x: A4.w - M, y }, thickness: 1.1, color: NAVY });
  y -= 24;

  // --- part identity ---
  page.drawText(safe(p.part_number), { x: M, y, size: 15, font: fontB, color: NAVY });
  y -= 16;
  const nameLines = wrap(safe(p.name), fontR, 10.5, A4.w - 2 * M);
  for (const ln of nameLines.slice(0, 2)) {
    page.drawText(ln, { x: M, y, size: 10.5, font: fontR, color: GRAY });
    y -= 13;
  }
  const context = [p.category, p.manufacturer].filter(Boolean).join("  ·  ");
  page.drawText(safe(context), { x: M, y, size: 9.5, font: fontR, color: GRAY });
  y -= 18;

  // --- drawing ---
  const drawing = buildDrawing(p);
  if (drawing) {
    const boxW = A4.w - 2 * M;
    const s = boxW / drawing.width;
    const boxH = drawing.height * s;
    page.drawRectangle({
      x: M,
      y: y - boxH,
      width: boxW,
      height: boxH,
      borderColor: LINE,
      borderWidth: 1,
    });
    renderOps(page, drawing.ops, M, y, s, fontR, fontB);
    y -= boxH + 22;
  }

  // --- spec table ---
  page.drawText("SPECIFICATIONS", { x: M, y, size: 10, font: fontB, color: NAVY });
  y -= 14;
  const rows = orderedSpecs(p.specs ?? {});
  if (p.datasheet_url) rows.push(["Datasheet", p.datasheet_url]);
  const rowH = 15.5;
  const twoCol = rows.length > 14;
  const colW = twoCol ? (A4.w - 2 * M - 16) / 2 : A4.w - 2 * M;
  const perCol = twoCol ? Math.ceil(rows.length / 2) : rows.length;
  const startY = y;
  rows.forEach(([k, v], i) => {
    const col = twoCol ? Math.floor(i / perCol) : 0;
    const row = twoCol ? i % perCol : i;
    const rx = M + col * (colW + 16);
    const ry = startY - row * rowH;
    if (ry < 70) return; // never collide with footer
    if (row % 2 === 0) {
      page.drawRectangle({ x: rx, y: ry - rowH + 4, width: colW, height: rowH, color: ZEBRA });
    }
    page.drawText(safe(k), { x: rx + 6, y: ry - 8, size: 8.8, font: fontR, color: GRAY });
    const val = truncate(safe(v), fontR, 9.2, colW - 130);
    page.drawText(val, { x: rx + 124, y: ry - 8, size: 9.2, font: fontR, color: NAVY });
  });
  const used = Math.min(perCol, Math.ceil(rows.length / (twoCol ? 2 : 1))) * rowH;
  y = startY - used - 10;

  // --- footer ---
  const fy = 46;
  page.drawLine({ start: { x: M, y: fy + 14 }, end: { x: A4.w - M, y: fy + 14 }, thickness: 0.8, color: LINE });
  page.drawText("SongGlow · Electronic components & hardware sourcing · songglow.com", {
    x: M,
    y: fy,
    size: 8.5,
    font: fontR,
    color: GRAY,
  });
  const gen = `Generated ${new Date().toISOString().slice(0, 10)} · Dual dimensions inch (mm)`;
  page.drawText(gen, {
    x: A4.w - M - fontR.widthOfTextAtSize(gen, 8.5),
    y: fy,
    size: 8.5,
    font: fontR,
    color: GRAY,
  });

  return doc.save();
}

function wrap(text: string, font: PDFFont, size: number, maxW: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    const trial = cur ? `${cur} ${w}` : w;
    if (font.widthOfTextAtSize(trial, size) > maxW && cur) {
      lines.push(cur);
      cur = w;
    } else {
      cur = trial;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

function truncate(text: string, font: PDFFont, size: number, maxW: number): string {
  if (font.widthOfTextAtSize(text, size) <= maxW) return text;
  let t = text;
  while (t.length > 1 && font.widthOfTextAtSize(t + "…", size) > maxW) {
    t = t.slice(0, -1);
  }
  return t + "…";
}
