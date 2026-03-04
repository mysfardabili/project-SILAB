import { NextResponse } from "next/server";
import { delay } from "@/lib/mockData";

// In-memory store for active check-in codes (keyed by courseId)
// In a real app, this would be stored in a database with expiry
const activeCodes: Record<string, { code: string; expiresAt: number }> = {};

export async function POST(request: Request) {
  await delay(600);

  try {
    const body = await request.json();
    const { courseId, code } = body;

    if (!courseId || !code) {
      return NextResponse.json(
        { success: false, error: "courseId dan code wajib diisi." },
        { status: 400 }
      );
    }

    const now = Date.now();
    const activeEntry = activeCodes[courseId];

    // If a code exists for this course and it hasn't expired, validate it
    if (activeEntry && activeEntry.expiresAt > now) {
      if (activeEntry.code === code) {
        return NextResponse.json({
          success: true,
          message: "Absensi berhasil dicatat.",
          data: { courseId, checkedInAt: new Date().toISOString() },
        });
      } else {
        return NextResponse.json(
          { success: false, error: "Kode check-in tidak valid." },
          { status: 422 }
        );
      }
    }

    // No active code for course — accept any 6-digit code (for demo purposes)
    // This lets the student check in even without a dosen-generated code
    if (/^\d{6}$/.test(code)) {
      return NextResponse.json({
        success: true,
        message: "Absensi berhasil dicatat.",
        data: { courseId, checkedInAt: new Date().toISOString() },
      });
    }

    return NextResponse.json(
      { success: false, error: "Format kode tidak valid. Gunakan 6 digit angka." },
      { status: 422 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Permintaan tidak valid." },
      { status: 400 }
    );
  }
}

// Endpoint untuk dosen generate/register kode aktif
export async function PUT(request: Request) {
  await delay(400);
  try {
    const { courseId, code } = await request.json();
    if (!courseId || !code) {
      return NextResponse.json({ success: false, error: "courseId dan code wajib." }, { status: 400 });
    }
    activeCodes[courseId] = {
      code,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 menit
    };
    return NextResponse.json({ success: true, message: "Kode berhasil diaktifkan." });
  } catch {
    return NextResponse.json({ success: false, error: "Permintaan tidak valid." }, { status: 400 });
  }
}
