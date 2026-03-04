import { NextResponse } from "next/server";
import { database, delay } from "@/lib/mockData";

export async function GET(request: Request) {
  await delay(500);
  const { searchParams } = new URL(request.url);
  const dosenId = searchParams.get("dosenId");
  const status = searchParams.get("status");

  let courses = [...database.courses];

  if (dosenId) {
    courses = courses.filter((c) => c.dosenId === dosenId);
  }
  if (status) {
    courses = courses.filter((c) => c.status === status);
  }

  return NextResponse.json({ success: true, data: courses });
}
