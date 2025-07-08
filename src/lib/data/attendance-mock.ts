// lib/data/attendance-mock.ts
import { AttendanceData } from "@/lib/types/attendance";

export const attendanceData: AttendanceData = {
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
export default attendanceData;