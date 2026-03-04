import { NextResponse } from "next/server";
import { database, delay } from "@/lib/mockData";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await delay(500);
  const { id } = await params;
  
  const course = database.courses.find((c) => c.id === id);

  if (!course) {
    return NextResponse.json({ success: false, error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: course });
}
