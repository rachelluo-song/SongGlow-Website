import { createClient } from "@supabase/supabase-js";
import { formatBytes } from "@/lib/attachments";

export type ContactMessage = {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
};

export class NotConfiguredError extends Error {}

/** Insert a contact message into Supabase using the server-side service key. */
export async function saveContactMessage(msg: ContactMessage) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new NotConfiguredError(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local."
    );
  }

  const supabase = createClient(url, serviceKey);
  const { error } = await supabase.from("messages").insert(msg);
  if (error) {
    throw new Error(`Supabase insert failed: ${error.message}`);
  }
}

const ATTACHMENTS_BUCKET = "inquiry-attachments";
// Signed download links in the stored message / notification email stay
// valid this long; the file itself stays in the private bucket regardless.
const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24 * 365;

/**
 * Store inquiry attachments in a private Supabase Storage bucket and return
 * one "name (size): signed-url" line per file, for appending to the message.
 * The bucket is created on first use.
 */
export async function uploadAttachments(files: File[]): Promise<string[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new NotConfiguredError("Supabase is not configured.");
  }
  const supabase = createClient(url, serviceKey);

  const { error: bucketError } = await supabase.storage.createBucket(
    ATTACHMENTS_BUCKET,
    { public: false }
  );
  if (bucketError && !/already exists/i.test(bucketError.message)) {
    throw new Error(`Bucket setup failed: ${bucketError.message}`);
  }

  const folder = `${new Date().toISOString().slice(0, 10)}-${crypto
    .randomUUID()
    .slice(0, 8)}`;
  const lines: string[] = [];
  for (const file of files) {
    const safeName = file.name.replace(/[^\w.\- ]+/g, "_").slice(-120);
    const path = `${folder}/${safeName}`;
    const { error } = await supabase.storage
      .from(ATTACHMENTS_BUCKET)
      .upload(path, await file.arrayBuffer(), {
        contentType: file.type || "application/octet-stream",
      });
    if (error) {
      throw new Error(`Upload of ${safeName} failed: ${error.message}`);
    }
    const { data: signed, error: signError } = await supabase.storage
      .from(ATTACHMENTS_BUCKET)
      .createSignedUrl(path, SIGNED_URL_TTL_SECONDS);
    if (signError || !signed) {
      throw new Error(`Signing ${safeName} failed: ${signError?.message}`);
    }
    lines.push(`${file.name} (${formatBytes(file.size)}): ${signed.signedUrl}`);
  }
  return lines;
}

/**
 * Email the team about a new message via Resend. Optional: skipped (with a
 * log line) when RESEND_API_KEY / CONTACT_NOTIFY_EMAIL are not set, and never
 * fails the request — the message is already stored by the time this runs.
 */
export async function sendNotificationEmail(msg: ContactMessage) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;

  if (!apiKey || !to) {
    console.log(
      "[contact] email notification skipped (RESEND_API_KEY / CONTACT_NOTIFY_EMAIL not set)"
    );
    return;
  }

  const from = process.env.CONTACT_FROM_EMAIL ?? "SongGlow <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: msg.email,
      subject: `New BOM inquiry from ${msg.name} (${msg.company})`,
      text: [
        `Name: ${msg.name}`,
        `Company: ${msg.company}`,
        `Email: ${msg.email}`,
        `Phone / WhatsApp: ${msg.phone}`,
        "",
        msg.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    console.error(
      `[contact] notification email failed: ${response.status} ${await response.text()}`
    );
  }
}
