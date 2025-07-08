"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const AttendanceFooter = () => {
  return (
    <div className="flex justify-between pt-2">
      <Link
        href="/attendance/request-correction"
        className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800 transition-colors duration-200"
      >
        Request correction <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
      <Link
        href="/attendance/history"
        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
      >
        View full history <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};
