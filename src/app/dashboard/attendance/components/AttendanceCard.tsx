"use client";

import { AttendanceRecord } from "@/lib/types/attendance";
import { getStatusIcon, getStatusClass, getStatusText, getStatusIconColor } from "@/lib/utils/attendance-utils";

interface AttendanceCardProps {
  record: AttendanceRecord;
}

export const AttendanceCard = ({ record }: AttendanceCardProps) => {
  const StatusIcon = getStatusIcon(record.status);
  
  return (
    <div
      className={`rounded-md border-l-4 py-2 px-3 ${getStatusClass(record.status)}`}
    >
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium text-gray-700">
          {record.course}
        </div>
        <div className="flex items-center gap-1.5">
          {StatusIcon && (
            <StatusIcon className={`h-4 w-4 ${getStatusIconColor(record.status)}`} />
          )}
          <span className="text-xs font-medium">
            {getStatusText(record.status)}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500">
          {record.date}
        </span>
        {record.time && (
          <span className="text-xs text-gray-500">
            {record.time}
          </span>
        )}
      </div>
      <div className="flex items-center gap-1 mt-1">
        {record.status === "late" && record.lateMinutes && (
          <span className="text-xs text-amber-600">
            {record.lateMinutes} minutes late
          </span>
        )}
        {record.instructor && (
          <span className="text-xs text-gray-500 ml-auto">
            Instructor: {record.instructor}
          </span>
        )}
      </div>
    </div>
  );
};
