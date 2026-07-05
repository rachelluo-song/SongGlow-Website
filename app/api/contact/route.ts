import { NextResponse } from "next/server";
import {
  NotConfiguredError,
  saveContactMessage,
  sendNotificationEmail,
  type ContactMessage,
} from "@/lib/contact";

const FIELDS = ["name", "company", "email", "phone", "message"] as const;

export async function POST(request: Request) {
  console.log("[api/contact] request received");

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const msg = {} as ContactMessage;
  for (const field of FIELDS) {
    const value = body[field];
    if (typeof value !== "string" || !value.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }
    msg[field] = value.trim().slice(0, 5000);
  }

  try {
    await saveContactMessage(msg);
  } catch (err) {
    console.error("[api/contact] failed:", err);
    if (err instanceof NotConfiguredError) {
      return NextResponse.json(
        {
          error:
            "The contact form isn't connected to a database yet. Please email us directly.",
        },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong saving your message. Please try again." },
      { status: 500 }
    );
  }

  await sendNotificationEmail(msg);

  console.log("[api/contact] message stored");
  return NextResponse.json({ ok: true });
}
