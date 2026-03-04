import { NextResponse } from "next/server";
import { database, delay } from "@/lib/mockData";

export async function GET(request: Request) {
  await delay(500);
  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");

  if (courseId) {
    const rate = database.courses.find(c => c.id === courseId)?.attendanceRate || 0;
    return NextResponse.json({ success: true, data: { rate } });
  }

  return NextResponse.json({ success: true, data: database.stats.monthlyAttendance });
}

export async function POST(request: Request) {
  await delay(800);
  try {
    const body = await request.json();
    return NextResponse.json({ success: true, message: "Attendance recorded", data: body }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  }
}
