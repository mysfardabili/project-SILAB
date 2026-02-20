"use client";

import { useAttendance } from "@/hooks/useAttendance";
import { AttendanceSummary } from "./components/AttendanceSummary";
import { RecentAttendance } from "./components/RecentAttendance";
import { UpcomingClasses } from "./components/UpcomingClasses";
import { CourseStats } from "./components/CourseStats";
import { AttendanceFooter } from "./components/AttendanceFooter";
import { Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

const AttendancePage = () => {
  const { data, loading, refreshData } = useAttendance();

  useEffect(() => {
    refreshData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading attendance data...</div>;
  }

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
      <Separator className="my-2" />
      <div className="px-6 py-4 space-y-8">
        <AttendanceSummary summary={safeData.summary} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RecentAttendance records={safeData.recentAttendance} />
          <UpcomingClasses classes={safeData.upcomingClasses} />
        </div>
        
        <CourseStats coursesAttendance={safeData.coursesAttendance} />
        <AttendanceFooter />
      </div>
    </div>
  );
};

export default AttendancePage;
