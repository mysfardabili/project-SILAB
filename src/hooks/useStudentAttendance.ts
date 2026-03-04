import { useState } from "react";
import { attendanceData as mockData } from "@/lib/data/attendance-mock";

export const useStudentAttendance = () => {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setData(mockData);
    setLoading(false);
  };

  return {
    data,
    loading,
    refreshData,
  };
};
