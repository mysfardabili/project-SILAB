// hooks/useAttendance.ts
import { useState, useEffect } from "react";
import { AttendanceData } from "@/lib/types/attendance";
import { attendanceData as mockData } from "@/lib/data/attendance-mock";

export const useAttendance = (initialData?: AttendanceData) => {
  const [data, setData] = useState<AttendanceData>(initialData || mockData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fungsi untuk fetch data dari API
  const fetchAttendanceData = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/attendance');
      // const data = await response.json();
      // setData(data);

      // Sementara menggunakan mock data
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
      setData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk refresh data
  const refreshData = () => {
    fetchAttendanceData();
  };

  // Fungsi untuk mendapatkan statistik singkat
  const getQuickStats = () => {
    const totalClasses =
      data.summary.present +
      data.summary.absent +
      data.summary.late +
      data.summary.excused;

    return {
      totalClasses,
      attendanceRate: data.summary.attendanceRate,
      mostRecentStatus: data.recentAttendance[0]?.status || null,
      upcomingCount: data.upcomingClasses.length,
    };
  };

  return {
    data,
    loading,
    error,
    refreshData,
    getQuickStats,
  };
};
