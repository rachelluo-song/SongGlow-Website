import { createClient } from "@supabase/supabase-js";

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
