"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  BookOpen,
  Users,
  ClipboardCheck,
  TrendingUp,
  Clock,
  Bell,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useCourses } from "@/hooks/useCourses";
import { useAttendanceStats } from "@/hooks/useAttendance";

const mockStats = {
  activeClasses: 3,
  totalStudents: 87,
  avgAttendance: 88,
  pendingCorrections: 4,
};

const mockScheduleToday = [
  { id: "s1", time: "08:00 – 09:40", course: "Teknologi Web", room: "Lab B-201", students: 32 },
  { id: "s2", time: "13:00 – 14:40", course: "Basis Data", room: "Lab A-101", students: 28 },
];

const mockPendingItems = [
  { id: "p1", type: "correction", text: "Koreksi absensi dari Andi Wijaya — Pemrograman Web", time: "2 jam lalu" },
  { id: "p2", type: "correction", text: "Koreksi absensi dari Sari Dewi — Basis Data", time: "5 jam lalu" },
  { id: "p3", type: "discussion", text: "Pertanyaan baru di kelas Teknologi Web", time: "1 jam lalu" },
  { id: "p4", type: "correction", text: "Koreksi absensi dari Budi Santoso — Teknologi Web", time: "1 hari lalu" },
];

// Removed mockCourses in favor of API hook

export default function DosenDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const { courses, isLoading: coursesLoading } = useCourses({ 
    dosenId: user?.id, 
    status: "active" 
  });
  
  const { data: attendanceData } = useAttendanceStats();

  useEffect(() => {
    if (!authLoading && user && user.role !== "dosen") {
      router.replace("/dashboard/home");
    }
  }, [user, authLoading, router]);

  if (authLoading || !user || user.role !== "dosen") return null;

  const firstName = user.name.split(" ").slice(1).join(" ") || user.name;

  const activeClasses = courses.length;
  const totalStudents = courses.reduce((sum, c) => sum + (c.studentsCount || 0), 0);
  const avgAttendance = attendanceData && attendanceData.length > 0 
    ? attendanceData[attendanceData.length - 1].rate 
    : 88.0;

  return (
    <div className="px-6 md:px-10 py-8 space-y-8 max-w-7xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Selamat datang, {firstName} 👋</h1>
        <p className="text-gray-500 mt-1">Berikut ringkasan aktivitas mengajar Anda hari ini.</p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Kelas Aktif", value: coursesLoading ? "..." : activeClasses, icon: BookOpen, color: "indigo" },
          { label: "Total Mahasiswa", value: coursesLoading ? "..." : totalStudents, icon: Users, color: "blue" },
          { label: "Rata-rata Kehadiran", value: `${avgAttendance.toFixed(1)}%`, icon: TrendingUp, color: "emerald" },
          { label: "Koreksi Pending", value: mockStats.pendingCorrections, icon: AlertCircle, color: "amber" },
        ].map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-3 bg-${stat.color}-50`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              {stat.value === "..." ? (
                  <Skeleton className="h-8 w-16 mb-1" />
              ) : (
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              )}
              <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Today's Schedule */}
        <div className="lg:col-span-1">
          <Card className="shadow-sm border-gray-100 h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" /> Jadwal Hari Ini
                </CardTitle>
                <Link href="/dosen/attendance" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                  Lihat semua
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockScheduleToday.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100">
                  <div className="shrink-0 bg-indigo-100 rounded-lg p-2">
                    <Clock className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{item.course}</p>
                    <p className="text-xs text-gray-500">{item.time}</p>
                    <p className="text-xs text-gray-500">{item.room} · {item.students} mahasiswa</p>
                  </div>
                </div>
              ))}
              {mockScheduleToday.length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">Tidak ada jadwal hari ini.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Pending Actions */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm border-gray-100 h-full">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Bell className="w-4 h-4 text-amber-500" /> Perlu Tindakan
                </CardTitle>
                <Badge className="bg-red-100 text-red-700 border-none text-xs">
                  {mockPendingItems.filter(i => i.type === "correction").length} pending
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockPendingItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.type === "correction" ? "bg-amber-500" : "bg-blue-500"}`} />
                    <div>
                      <p className="text-sm text-gray-800">{item.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                </div>
              ))}
              <Link
                href="/dosen/attendance/corrections"
                className="block text-center text-sm text-indigo-600 hover:text-indigo-800 font-medium pt-2"
              >
                Lihat semua koreksi →
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* My Courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Kelas yang Diajar</h2>
          <Link
            href="/dosen/courses"
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
          >
            Kelola kelas <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coursesLoading && <p className="text-sm text-gray-500 col-span-3">Memuat kelas...</p>}
          {!coursesLoading && courses.slice(0, 3).map((course) => (
            <Link key={course.id} href={`/dosen/courses/${course.id}`}>
              <Card className="shadow-sm border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-5">
                  <div className={`inline-flex items-center text-xs font-semibold px-2 py-1 rounded-full mb-3 bg-${course.color || "indigo"}-50 text-${course.color || "indigo"}-700`}>
                    {course.code}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{course.name}</h3>
                  <p className="text-xs text-gray-500">{course.semester}</p>
                  <div className="flex items-center gap-1 mt-3 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{course.studentsCount || 0} mahasiswa</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
