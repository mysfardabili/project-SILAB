import { NextResponse } from "next/server";
import { database, delay } from "@/lib/mockData";

export async function GET(request: Request) {
  await delay(600);
  return NextResponse.json({ success: true, data: database.discussions });
}

export async function POST(request: Request) {
  await delay(800);
  try {
    const body = await request.json();
    const newTopic = {
      id: `d${Date.now()}`,
      ...body,
      replies: 0,
      lastActive: "Baru saja",
      isPinned: false
    };

    database.discussions.unshift(newTopic);

    return NextResponse.json({ success: true, data: newTopic }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  }
}
