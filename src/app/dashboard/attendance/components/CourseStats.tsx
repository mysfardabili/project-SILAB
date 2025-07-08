"use client";

import { CourseStats as CourseStatsType } from "@/lib/types/attendance";
import { calculateAttendanceRate } from "@/lib/utils/attendance-utils";

interface CourseStatsProps {
  coursesAttendance: Record<string, CourseStatsType>;
}

export const CourseStats = ({ coursesAttendance }: CourseStatsProps) => {
  const hasCourseStats = Object.keys(coursesAttendance).length > 0;

  if (!hasCourseStats) {
    return null;
  }

  return (
    <div className="bg-indigo-50 rounded-md p-3">
      <div className="text-sm font-medium text-indigo-700 mb-2">
        Course Attendance
      </div>
      <div className="space-y-2">
        {Object.entries(coursesAttendance).map(([course, stats]) => {
          const attendanceRate = calculateAttendanceRate(stats.present, stats.total);

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
        })}
      </div>
    </div>
  );
};