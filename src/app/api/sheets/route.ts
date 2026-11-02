import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.MISSION_CONTROL_SHEETS_URL;
  const token = process.env.MISSION_CONTROL_SHEETS_TOKEN;

  if (!url || !token) {
    return NextResponse.json({ error: "Sheets integration not configured" }, { status: 503 });
  }

  const response = await fetch(`${url}?token=${encodeURIComponent(token)}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Sheets API request failed" }, { status: 502 });
  }

  return NextResponse.json(await response.json());
}
