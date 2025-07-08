export type AttendanceStatus = "present" | "late" | "absent" | "excused";

export interface AttendanceRecord {
  id: string;
  date: string;
  course: string;
  status: AttendanceStatus;
  time?: string;
  instructor: string;
  lateMinutes?: number;
}

export interface UpcomingClass {
  id: string;
  date: string;
  course: string;
  time: string;
  room: string;
}

export interface CourseStats {
  present: number;
  absent: number;
  late: number;
  total: number;
}

export interface AttendanceSummary {
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
}

export interface AttendanceData {
  summary: AttendanceSummary;
  recentAttendance: AttendanceRecord[];
  upcomingClasses: UpcomingClass[];
  coursesAttendance: Record<string, CourseStats>;
}

