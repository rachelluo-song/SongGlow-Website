"use client";

import { useState } from "react";

/** Rasterizes the drawing SVG to a 2x PNG in the browser and downloads it. */
export default function PngDownloadButton({
  svgUrl,
  filename,
}: {
  svgUrl: string;
  filename: string;
}) {
  const [busy, setBusy] = useState(false);

  async function download() {
    setBusy(true);
    try {
      const svgText = await (await fetch(svgUrl)).text();
      const blob = new Blob([svgText], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("SVG load failed"));
        img.src = url;
      });
      const scale = 2;
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      const png = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      if (!png) throw new Error("PNG encode failed");
      const a = document.createElement("a");
      a.href = URL.createObjectURL(png);
      a.download = filename;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch {
      alert("Sorry - PNG export failed in this browser. The SVG download still works.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <button className="btn btn-ghost" onClick={download} disabled={busy}>
      {busy ? "Rendering…" : "Download PNG"}
    </button>
  );
}
