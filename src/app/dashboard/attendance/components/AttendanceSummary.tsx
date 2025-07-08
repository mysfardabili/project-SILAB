"use client";

import { AttendanceSummary as AttendanceSummaryType } from "@/lib/types/attendance";

interface AttendanceSummaryProps {
  summary: AttendanceSummaryType;
}

export const AttendanceSummary = ({ summary }: AttendanceSummaryProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="bg-green-50 p-3 rounded-md border border-green-100">
        <div className="text-sm text-gray-500">Present</div>
        <div className="text-xl font-semibold text-green-700">
          {summary.present}
        </div>
      </div>
      <div className="bg-red-50 p-3 rounded-md border border-red-100">
        <div className="text-sm text-gray-500">Absent</div>
        <div className="text-xl font-semibold text-red-700">
          {summary.absent}
        </div>
      </div>
      <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
        <div className="text-sm text-gray-500">Late</div>
        <div className="text-xl font-semibold text-amber-700">
          {summary.late}
        </div>
      </div>
      <div className="bg-indigo-50 p-3 rounded-md border border-indigo-100">
        <div className="text-sm text-gray-500">Attendance Rate</div>
        <div className="text-xl font-semibold text-indigo-700">
          {summary.attendanceRate}%
        </div>
      </div>
    </div>
  );
};