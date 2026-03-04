"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const AttendanceFooter = () => {
  return (
    <div className="flex justify-between pt-2">
      <Link
        href="/dashboard/attendance/request-correction"
        className="inline-flex items-center text-sm font-medium text-amber-600 hover:text-amber-800 transition-colors duration-200"
      >
        Ajukan koreksi <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
      <Link
        href="/dashboard/attendance"
        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
      >
        Lihat riwayat penuh <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};
