import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { generateDrawing } from "@/lib/drawings";
import type { Product } from "@/lib/catalog";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("[api/drawing] request received");
  const { id } = await params;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json({ error: "Not configured." }, { status: 503 });
  }

  const supabase = createClient(url, serviceKey);
  const { data, error } = await supabase
    .from("products")
    .select(
      "id, section, category, part_number, name, manufacturer, description, specs, datasheet_url"
    )
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return NextResponse.json({ error: "Part not found." }, { status: 404 });
  }

  const svg = generateDrawing(data as Product);
  if (!svg) {
    return NextResponse.json(
      { error: "No drawing available for this part." },
      { status: 404 }
    );
  }

  console.log(`[api/drawing] served ${data.part_number}`);
  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
      "Content-Disposition": `inline; filename="${data.part_number.replaceAll("/", "-")}.svg"`,
    },
  });
}
