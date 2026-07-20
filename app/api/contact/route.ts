import { NextResponse } from "next/server";
import {
  NotConfiguredError,
  saveContactMessage,
  sendNotificationEmail,
  uploadAttachments,
  type ContactMessage,
} from "@/lib/contact";
import {
  attachmentExtensionAllowed,
  MAX_ATTACHMENT_TOTAL_BYTES,
  MAX_ATTACHMENTS,
} from "@/lib/attachments";

const FIELDS = ["name", "company", "email", "phone", "message"] as const;

export async function POST(request: Request) {
  console.log("[api/contact] request received");

  // The form posts multipart (to carry attachments); plain JSON still works.
  let body: Record<string, unknown>;
  let files: File[] = [];
  try {
    if (request.headers.get("content-type")?.includes("multipart/form-data")) {
      const formData = await request.formData();
      body = {};
      for (const field of FIELDS) {
        body[field] = formData.get(field);
      }
      files = formData
        .getAll("attachments")
        .filter((f): f is File => f instanceof File && f.size > 0);
    } else {
      body = await request.json();
    }
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

  if (files.length > MAX_ATTACHMENTS) {
    return NextResponse.json(
      { error: `Please attach at most ${MAX_ATTACHMENTS} files.` },
      { status: 400 }
    );
  }
  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  if (totalBytes > MAX_ATTACHMENT_TOTAL_BYTES) {
    return NextResponse.json(
      { error: "Attachments are too large — please keep the total under 4 MB." },
      { status: 400 }
    );
  }
  for (const file of files) {
    if (!attachmentExtensionAllowed(file.name)) {
      return NextResponse.json(
        { error: `File type of "${file.name}" isn't supported.` },
        { status: 400 }
      );
    }
  }

  // Attachments are best-effort: a storage hiccup shouldn't lose the inquiry.
  if (files.length > 0) {
    try {
      const lines = await uploadAttachments(files);
      msg.message += `\n\n--- Attachments ---\n${lines.join("\n")}`;
    } catch (err) {
      console.error("[api/contact] attachment upload failed:", err);
      msg.message += `\n\n[${files.length} attachment(s) were included but failed to upload — follow up with the customer.]`;
    }
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
