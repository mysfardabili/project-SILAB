"use client";

import { Clock } from "lucide-react";
import { AttendanceRecord } from "@/lib/types/attendance";
import { AttendanceCard } from "./AttendanceCard";

interface RecentAttendanceProps {
  records: AttendanceRecord[];
}

export const RecentAttendance = ({ records }: RecentAttendanceProps) => {
  const hasRecentAttendance = records.length > 0;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Clock className="h-4 w-4 text-indigo-500" />
        <span className="text-sm font-medium text-gray-600">
          Recent Attendance
        </span>
      </div>
      {hasRecentAttendance ? (
        <div className="space-y-2">
          {records.map((record) => (
            <AttendanceCard key={record.id} record={record} />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-md py-4 px-3 text-center">
          <p className="text-sm text-gray-500">
            No recent attendance records available
          </p>
        </div>
      )}
    </div>
  );
};
