"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Users, BookOpen, TrendingUp, Calendar, AlertCircle,
  UserPlus, ChevronRight, Activity, GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useUsers } from "@/hooks/useUsers";
import { useCourses } from "@/hooks/useCourses";
import { useAttendanceStats } from "@/hooks/useAttendance";

const STATS = [
  { label: "Total Mahasiswa", value: "1,248", icon: GraduationCap, change: "+12 minggu ini", color: "indigo" },
  { label: "Total Dosen", value: "87", icon: Users, change: "+2 bulan ini", color: "blue" },
  { label: "Kursus Aktif", value: "342", icon: BookOpen, change: "8 pending approval", color: "emerald" },
  { label: "Rata-rata Kehadiran", value: "88.4%", icon: TrendingUp, change: "+1.2% dari bulan lalu", color: "purple" },
];

const ALERTS = [
  { id: "a1", type: "warning", text: "8 kursus baru menunggu persetujuan", link: "/admin/courses" },
  { id: "a2", type: "info", text: "15 akun mahasiswa baru ter-register hari ini", link: "/admin/users" },
  { id: "a3", type: "warning", text: "3 laporan absensi kritis perlu ditinjau", link: "/admin/reports" },
];

const RECENT_ACTIVITY = [
  { id: "ac1", text: "Dosen Siti Rahayu membuat kursus baru: Machine Learning Dasar", time: "30 menit lalu", icon: BookOpen },
  { id: "ac2", text: "12 mahasiswa baru mendaftar ke program Teknik Informatika", time: "2 jam lalu", icon: UserPlus },
  { id: "ac3", text: "Pengumuman 'UTS Semester Genap' diterbitkan", time: "4 jam lalu", icon: Activity },
  { id: "ac4", text: "Laporan kehadiran Maret 2026 siap diunduh", time: "1 hari lalu", icon: TrendingUp },
  { id: "ac5", text: "Admin memperbarui data program studi", time: "2 hari lalu", icon: Activity },
];

const USER_GROWTH = [
  { month: "Okt", mahasiswa: 1150, dosen: 82 },
  { month: "Nov", mahasiswa: 1180, dosen: 84 },
  { month: "Des", mahasiswa: 1200, dosen: 84 },
  { month: "Jan", mahasiswa: 1220, dosen: 85 },
  { month: "Feb", mahasiswa: 1236, dosen: 86 },
  { month: "Mar", mahasiswa: 1248, dosen: 87 },
];

export default function AdminDashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const { users, isLoading: usersLoading } = useUsers();
  const { courses, isLoading: coursesLoading } = useCourses();
  const { data: attendanceData, isLoading: attLoading } = useAttendanceStats();

  useEffect(() => {
    if (!authLoading && user && user.role !== "admin") {
      router.replace("/dashboard/home");
    }
  }, [user, authLoading, router]);

  if (authLoading || !user || user.role !== "admin") return null;

  const maxMhs = Math.max(...USER_GROWTH.map((d) => d.mahasiswa));

  const totalMahasiswa = users.filter(u => u.role === "mahasiswa").length;
  const totalDosen = users.filter(u => u.role === "dosen").length;
  const kursusAktif = courses.filter(c => c.status === "active").length;
  const pendingCourses = courses.filter(c => c.status === "pending").length;
  
  // Ambil rata-rata kehadiran global (misal dari data stats terakhir)
  const globalAttendanceRate = attendanceData && attendanceData.length > 0 
    ? attendanceData[attendanceData.length - 1].rate 
    : 80.0;

  const DYNAMIC_STATS = [
    { label: "Total Mahasiswa", value: usersLoading ? "..." : totalMahasiswa.toLocaleString(), icon: GraduationCap, change: "+12 minggu ini", color: "indigo" },
    { label: "Total Dosen", value: usersLoading ? "..." : totalDosen.toLocaleString(), icon: Users, change: "+2 bulan ini", color: "blue" },
    { label: "Kursus Aktif", value: coursesLoading ? "..." : kursusAktif.toLocaleString(), icon: BookOpen, change: `${pendingCourses} pending approval`, color: "emerald" },
    { label: "Rata-rata Kehadiran", value: attLoading ? "..." : `${globalAttendanceRate.toFixed(1)}%`, icon: TrendingUp, change: "+1.2% dari bulan lalu", color: "purple" },
  ];

  return (
    <div className="px-6 md:px-8 py-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-500 mt-1 text-sm">Selamat datang, {user.name}. Berikut ringkasan platform SI Lab.</p>
      </div>

      {/* Alerts */}
      {ALERTS.map((alert) => (
        <div key={alert.id} className={`flex items-center gap-3 p-3 rounded-xl border text-sm ${
          alert.type === "warning" ? "bg-amber-50 border-amber-200 text-amber-800" : "bg-blue-50 border-blue-200 text-blue-800"
        }`}>
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span className="flex-1">{alert.text}</span>
          <Link href={alert.link} className="font-medium hover:underline flex items-center gap-1">
            Tinjau <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ))}

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {DYNAMIC_STATS.map((stat) => (
          <Card key={stat.label} className="border-none shadow-sm">
            <CardContent className="p-5">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-3 bg-${stat.color}-50`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              {stat.value === "..." ? (
                  <Skeleton className="h-8 w-20 mb-1" />
              ) : (
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              )}
              <p className="text-xs font-medium text-gray-500 mt-0.5">{stat.label}</p>
              <p className="text-xs text-emerald-600 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Growth Chart (CSS-based bar chart) */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm border-gray-100 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Pertumbuhan Pengguna (6 Bulan)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3 h-40">
                {USER_GROWTH.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col gap-1 items-center justify-end" style={{ height: "120px" }}>
                      <div
                        className="w-full bg-indigo-500 rounded-t-md transition-all duration-500"
                        style={{ height: `${(d.mahasiswa / maxMhs) * 110}px` }}
                        title={`Mahasiswa: ${d.mahasiswa}`}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{d.month}</span>
                    <span className="text-xs font-semibold text-gray-700">{d.mahasiswa.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 bg-indigo-500 rounded-sm" />
                  <span className="text-xs text-gray-500">Mahasiswa</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Aktivitas Terbaru</CardTitle>
              <Link href="/admin/reports" className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                Lihat semua
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            {RECENT_ACTIVITY.map((act) => (
              <div key={act.id} className="flex items-start gap-3">
                <div className="h-7 w-7 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                  <act.icon className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-800 leading-tight">{act.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{act.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-base font-semibold text-gray-900 mb-3">Aksi Cepat</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Tambah Pengguna", href: "/admin/users/new", icon: UserPlus, color: "indigo" },
            { label: "Buat Pengumuman", href: "/admin/announcements", icon: Activity, color: "purple" },
            { label: "Lihat Laporan", href: "/admin/reports", icon: TrendingUp, color: "emerald" },
            { label: "Kelola Kursus", href: "/admin/courses", icon: BookOpen, color: "blue" },
          ].map((item) => (
            <Link key={item.label} href={item.href}>
              <Card className="shadow-sm border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer">
                <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                  <div className={`h-10 w-10 rounded-xl bg-${item.color}-50 flex items-center justify-center`}>
                    <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                  </div>
                  <p className="text-sm font-medium text-gray-700">{item.label}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
