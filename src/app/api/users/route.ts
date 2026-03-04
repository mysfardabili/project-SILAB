import { NextResponse } from "next/server";
import { database, delay } from "@/lib/mockData";

export async function GET(request: Request) {
  await delay(500);
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role");
  const status = searchParams.get("status");
  const search = searchParams.get("search")?.toLowerCase() || "";

  let users = [...database.users];

  if (role) {
    users = users.filter((u) => u.role === role);
  }
  if (status) {
    users = users.filter((u) => u.status === status);
  }
  if (search) {
    users = users.filter(
      (u) =>
        u.name.toLowerCase().includes(search) ||
        u.email.toLowerCase().includes(search) ||
        u.nim?.includes(search) ||
        u.nip?.includes(search)
    );
  }

  return NextResponse.json({ success: true, data: users });
}

export async function POST(request: Request) {
  await delay(800);
  try {
    const body = await request.json();
    const newUser = {
      id: `u${Date.now()}`,
      ...body,
      status: "active",
      joinedAt: new Date().toLocaleDateString("id-ID", { month: "short", year: "numeric" }),
    };

    database.users.push(newUser);

    return NextResponse.json({ success: true, data: newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid payload" }, { status: 400 });
  }
}
