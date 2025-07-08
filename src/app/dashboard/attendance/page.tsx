"use client";

<<<<<<< HEAD
import {
  Calendar,
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define types
type AttendanceStatus = "present" | "late" | "absent" | "excused";

interface AttendanceRecord {
  id: string;
  date: string;
  course: string;
  status: AttendanceStatus;
  time?: string;
  instructor: string;
  lateMinutes?: number;
}

interface UpcomingClass {
  id: string;
  date: string;
  course: string;
  time: string;
  room: string;
}

interface CourseStats {
  present: number;
  absent: number;
  late: number;
  total: number;
}

interface AttendanceData {
  summary: {
    present: number;
    absent: number;
    late: number;
    excused: number;
    attendanceRate: number;
  };
  recentAttendance: AttendanceRecord[];
  upcomingClasses: UpcomingClass[];
  coursesAttendance: Record<string, CourseStats>;
}

// Mock data
const attendanceData: AttendanceData = {
  summary: {
    present: 35,
    absent: 3,
    late: 5,
    excused: 2,
    attendanceRate: 87.5,
  },
  recentAttendance: [
    {
      id: "1",
      date: "April 19, 2025",
      course: "Web Technology",
      status: "present",
      time: "9:05 AM",
      instructor: "Dr. Emily Chen",
    },
    {
      id: "2",
      date: "April 18, 2025",
      course: "Data Structures",
      status: "late",
      time: "2:15 PM",
      lateMinutes: 7,
      instructor: "Prof. James Rodriguez",
    },
    {
      id: "3",
      date: "April 16, 2025",
      course: "Web Technology",
      status: "absent",
      instructor: "Dr. Emily Chen",
    },
  ],
  upcomingClasses: [
    {
      id: "1",
      date: "April 21, 2025",
      course: "Web Technology",
      time: "9:00 AM - 10:30 AM",
      room: "Tech Building 305",
    },
    {
      id: "2",
      date: "April 21, 2025",
      course: "Data Structures",
      time: "2:00 PM - 3:30 PM",
      room: "Science Hall 210",
    },
  ],
  coursesAttendance: {
    "Web Technology": { present: 14, absent: 1, late: 2, total: 17 },
    "Data Structures": { present: 12, absent: 2, late: 1, total: 15 },
    "Computer Networks": { present: 9, absent: 0, late: 2, total: 11 },
  },
};

const getStatusIcon = (status: AttendanceStatus) => {
  switch (status) {
    case "present":
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case "late":
      return <Clock className="h-4 w-4 text-amber-500" />;
    case "absent":
      return <XCircle className="h-4 w-4 text-red-500" />;
    case "excused":
      return <AlertCircle className="h-4 w-4 text-blue-500" />;
    default:
      return null;
  }
};

const getStatusClass = (status: AttendanceStatus) => {
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

const getStatusText = (status: AttendanceStatus) => {
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

const AttendancePage = ({ data = attendanceData }: { data?: AttendanceData }) => {
=======
import { Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AttendanceData } from "@/lib/types/attendance";
import { attendanceData } from "@/lib/data/attendance-mock";
// Import components directly (alternative to index.ts)
import { AttendanceSummary } from "./components/AttendanceSummary";
import { RecentAttendance } from "./components/RecentAttendance";
import { UpcomingClasses } from "./components/UpcomingClasses";
import { CourseStats } from "./components/CourseStats";
import { AttendanceFooter } from "./components/AttendanceFooter";

interface AttendancePageProps {
  data?: AttendanceData;
}

const AttendancePage = ({ data = attendanceData }: AttendancePageProps) => {
>>>>>>> 1f8a131 (first commit)
  const safeData = {
    summary: data?.summary || {
      present: 0,
      absent: 0,
      late: 0,
      excused: 0,
      attendanceRate: 0,
    },
    recentAttendance: Array.isArray(data?.recentAttendance)
      ? data.recentAttendance
      : [],
    upcomingClasses: Array.isArray(data?.upcomingClasses)
      ? data.upcomingClasses
      : [],
    coursesAttendance: data?.coursesAttendance || {},
  };

<<<<<<< HEAD
  const hasRecentAttendance = safeData.recentAttendance.length > 0;
  const hasUpcomingClasses = safeData.upcomingClasses.length > 0;
  const hasCoursesAttendance =
    Object.keys(safeData.coursesAttendance).length > 0;

=======
>>>>>>> 1f8a131 (first commit)
  return (
    <div className="mt-6 rounded-lg bg-white shadow-md overflow-hidden h-full py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6 md:space-y-8">
      <div className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-indigo-500" />
          <h3 className="text-lg font-semibold text-gray-800">
            Your Attendance
          </h3>
        </div>
      </div>
<<<<<<< HEAD
      <Separator className="my-2" />
      <div className="px-6 py-4 space-y-5">
        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-green-50 p-3 rounded-md border border-green-100">
            <div className="text-sm text-gray-500">Present</div>
            <div className="text-xl font-semibold text-green-700">
              {safeData.summary.present}
            </div>
          </div>
          <div className="bg-red-50 p-3 rounded-md border border-red-100">
            <div className="text-sm text-gray-500">Absent</div>
            <div className="text-xl font-semibold text-red-700">
              {safeData.summary.absent}
            </div>
          </div>
          <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
            <div className="text-sm text-gray-500">Late</div>
            <div className="text-xl font-semibold text-amber-700">
              {safeData.summary.late}
            </div>
          </div>
          <div className="bg-indigo-50 p-3 rounded-md border border-indigo-100">
            <div className="text-sm text-gray-500">Attendance Rate</div>
            <div className="text-xl font-semibold text-indigo-700">
              {safeData.summary.attendanceRate}%
            </div>
          </div>
        </div>

        {/* Recent Attendance */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-4 w-4 text-indigo-500" />
            <span className="text-sm font-medium text-gray-600">
              Recent Attendance
            </span>
          </div>
          {hasRecentAttendance ? (
            <div className="space-y-2">
              {safeData.recentAttendance.map((record) => (
                <div
                  key={record.id}
                  className={`rounded-md border-l-4 py-2 px-3 ${getStatusClass(
                    record.status as AttendanceStatus
                  )}`}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-sm font-medium text-gray-700">
                      {record.course}
                    </div>
                    <div className="flex items-center gap-1.5">
                      {getStatusIcon(record.status as AttendanceStatus)}
                      <span className="text-xs font-medium">
                        {getStatusText(record.status as AttendanceStatus)}
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
                    {record.status === "late" && (
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

        {/* Upcoming Classes */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-indigo-500" />
            <span className="text-sm font-medium text-gray-600">
              Upcoming Classes
            </span>
          </div>
          {hasUpcomingClasses ? (
            <div className="space-y-2">
              {safeData.upcomingClasses.map((cls) => (
                <div
                  key={cls.id}
                  className="bg-gray-50 rounded-md border border-gray-200 py-2 px-3"
                >
                  <div className="text-sm font-medium text-gray-700">
                    {cls.course}
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">{cls.date}</span>
                    <span className="text-xs text-gray-500">{cls.time}</span>
                  </div>
                  {cls.room && (
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-gray-500">
                        Room: {cls.room}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-md py-4 px-3 text-center">
              <p className="text-sm text-gray-500">
                No upcoming classes scheduled
              </p>
            </div>
          )}
        </div>

        {/* Course Attendance Stats */}
        {hasCoursesAttendance && (
          <div className="bg-indigo-50 rounded-md p-3">
            <div className="text-sm font-medium text-indigo-700 mb-2">
              Course Attendance
            </div>
            <div className="space-y-2">
              {Object.entries(safeData.coursesAttendance).map(
                ([course, stats]) => {
                  const attendanceRate =
                    stats.total > 0
                      ? Math.round((stats.present / stats.total) * 100)
                      : 0;

                  return (
                    <div
                      key={course}
                      className="bg-white rounded-md p-2 border border-indigo-100"
                    >
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-700">
                          {course}
                        </span>
                        <span className="text-sm font-medium text-indigo-600">
                          {attendanceRate}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                        <div
                          className="bg-indigo-500 h-1.5 rounded-full"
                          style={{ width: `${attendanceRate}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Present: {stats.present}</span>
                        <span>Late: {stats.late}</span>
                        <span>Absent: {stats.absent}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}

        {/* Footer Links */}
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
=======

      <Separator className="my-2" />

      <div className="px-6 py-4 space-y-5">
        {/* Summary */}
        <AttendanceSummary summary={safeData.summary} />

        {/* Recent Attendance */}
        <RecentAttendance records={safeData.recentAttendance} />

        {/* Upcoming Classes */}
        <UpcomingClasses classes={safeData.upcomingClasses} />

        {/* Course Attendance Stats */}
        <CourseStats coursesAttendance={safeData.coursesAttendance} />

        {/* Footer Links */}
        <AttendanceFooter />
>>>>>>> 1f8a131 (first commit)
      </div>
    </div>
  );
};

export default AttendancePage;
