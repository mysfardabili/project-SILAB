// lib/utils/attendance-utils.ts
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";
import { AttendanceStatus } from "@/lib/types/attendance";

export const getStatusIcon = (status: AttendanceStatus) => {
  switch (status) {
    case "present":
      return CheckCircle;
    case "late":
      return Clock;
    case "absent":
      return XCircle;
    case "excused":
      return AlertCircle;
    default:
      return null;
  }
};

export const getStatusIconColor = (status: AttendanceStatus) => {
  switch (status) {
    case "present":
      return "text-green-500";
    case "late":
      return "text-amber-500";
    case "absent":
      return "text-red-500";
    case "excused":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
};

export const getStatusClass = (status: AttendanceStatus) => {
  switch (status) {
    case "present":
      return "border-green-400 bg-green-50";
    case "late":
      return "border-amber-400 bg-amber-50";
    case "absent":
      return "border-red-400 bg-red-50";
    case "excused":
      return "border-blue-400 bg-blue-50";
    default:
      return "border-gray-200 bg-gray-50";
  }
};

export const getStatusText = (status: AttendanceStatus) => {
  switch (status) {
    case "present":
      return "Present";
    case "late":
      return "Late";
    case "absent":
      return "Absent";
    case "excused":
      return "Excused";
    default:
      return status;
  }
};

export const calculateAttendanceRate = (
  present: number,
  total: number
): number => {
  return total > 0 ? Math.round((present / total) * 100) : 0;
};
export const getAttendanceSummaryText = (attendanceRate: number): string => {
  if (attendanceRate >= 90) {
    return "Excellent";
  } else if (attendanceRate >= 75) {
    return "Good";
  } else if (attendanceRate >= 50) {
    return "Needs Improvement";
  } else {
    return "Poor";
  }
};