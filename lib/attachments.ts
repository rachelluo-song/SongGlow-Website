/**
 * Contact-form attachment rules, shared by the client form (pre-submit
 * validation + accept attribute) and the API route (authoritative checks).
 * No imports here — this file is bundled into the client.
 */

export const MAX_ATTACHMENTS = 5;

// Vercel rejects request bodies over ~4.5 MB, so the form relays at most
// 4 MB of files through /api/contact. Raise only by switching to direct
// client → Supabase Storage uploads.
export const MAX_ATTACHMENT_TOTAL_BYTES = 4_000_000;

export const ATTACHMENT_EXTENSIONS = [
  "pdf",
  "xls",
  "xlsx",
  "csv",
  "doc",
  "docx",
  "txt",
  "zip",
  "png",
  "jpg",
  "jpeg",
  "webp",
  "step",
  "stp",
  "igs",
  "iges",
  "dxf",
  "dwg",
];

export const ATTACHMENT_ACCEPT = ATTACHMENT_EXTENSIONS.map(
  (ext) => `.${ext}`
).join(",");

export function attachmentExtensionAllowed(filename: string): boolean {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return ATTACHMENT_EXTENSIONS.includes(ext);
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
