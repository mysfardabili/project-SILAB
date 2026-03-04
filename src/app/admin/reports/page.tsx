"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Download, BarChart3, TrendingUp, Users, BookOpen, Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const ATTENDANCE_DATA = [
  { course: "Teknologi Web", total: 32, present: 28, absent: 4, rate: 87.5 },
  { course: "Basis Data", total: 28, present: 26, absent: 2, rate: 92.8 },
  { course: "Pemrograman Web", total: 27, present: 22, absent: 5, rate: 81.5 },
  { course: "Struktur Data", total: 30, present: 28, absent: 2, rate: 93.3 },
  { course: "Rekayasa Perangkat Lunak", total: 25, present: 21, absent: 4, rate: 84.0 },
];

const MONTHLY = [
  { month: "Okt 2025", rate: 85.2 },
  { month: "Nov 2025", rate: 87.4 },
  { month: "Des 2025", rate: 82.1 },
  { month: "Jan 2026", rate: 89.3 },
  { month: "Feb 2026", rate: 88.0 },
  { month: "Mar 2026", rate: 88.4 },
];

const ACTIVITY_DATA = [
  { student: "Andi Wijaya", course: "Teknologi Web", completedModules: 12, totalModules: 15, lastActive: "Hari ini" },
  { student: "Bella Rahayu", course: "Basis Data", completedModules: 9, totalModules: 10, lastActive: "Kemarin" },
  { student: "Candra Kusuma", course: "Pemrograman Web", completedModules: 5, totalModules: 15, lastActive: "3 hari lalu" },
  { student: "Desy Maulida", course: "Teknologi Web", completedModules: 14, totalModules: 15, lastActive: "Hari ini" },
  { student: "Eko Prasetyo", course: "Struktur Data", completedModules: 7, totalModules: 12, lastActive: "2 hari lalu" },
];

export default function AdminReportsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [period, setPeriod] = useState("mar-2026");

  useEffect(() => {
    if (!isLoading && user && user.role !== "admin") router.replace("/dashboard/home");
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") return null;

  const maxRate = 100;

  const handleExportCSV = (data: object[], filename: string) => {
    if (!data.length) return;
    const keys = Object.keys(data[0]);
    const csv = [keys.join(","), ...data.map((r) => keys.map((k) => (r as Record<string, unknown>)[k]).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = filename; a.click();
  };

  return (
    <div className="px-6 md:px-8 py-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Laporan & Analitik</h1>
          <p className="text-gray-500 text-sm mt-1">Ringkasan kehadiran dan aktivitas belajar mahasiswa.</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-40 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mar-2026">Maret 2026</SelectItem>
            <SelectItem value="feb-2026">Februari 2026</SelectItem>
            <SelectItem value="jan-2026">Januari 2026</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Global stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Avg Kehadiran", value: "88.4%", icon: TrendingUp, color: "emerald" },
          { label: "Total Kursus", value: "342", icon: BookOpen, color: "indigo" },
          { label: "Mahasiswa Aktif", value: "1,248", icon: Users, color: "blue" },
          { label: "Sesi Tercatat", value: "2,841", icon: Calendar, color: "purple" },
        ].map((s) => (
          <Card key={s.label} className="border-none shadow-sm">
            <CardContent className="p-4">
              <div className={`h-9 w-9 rounded-xl bg-${s.color}-50 flex items-center justify-center mb-2`}>
                <s.icon className={`w-4 h-4 text-${s.color}-600`} />
              </div>
              <p className="text-xl font-bold text-gray-900">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Attendance Trend */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Tren Kehadiran Bulanan</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {MONTHLY.map((m) => (
                <div key={m.month} className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 w-20 shrink-0">{m.month}</span>
                  <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${m.rate}%` }}
                    >
                      <span className="text-xs text-white font-medium">{m.rate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Attendance by Course */}
        <Card className="shadow-sm border-gray-100">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Kehadiran per Kursus</CardTitle>
              <Button variant="outline" size="sm" onClick={() => handleExportCSV(ATTENDANCE_DATA, "laporan-kehadiran.csv")}>
                <Download className="w-3.5 h-3.5 mr-1.5" /> CSV
              </Button>
            </div>
          </CardHeader>
          <div className="divide-y divide-gray-50">
            {ATTENDANCE_DATA.map((d) => (
              <div key={d.course} className="px-5 py-3 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">{d.course}</p>
                  <p className="text-xs text-gray-500">{d.present}/{d.total} hadir</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${d.rate >= 90 ? "bg-emerald-500" : d.rate >= 80 ? "bg-indigo-500" : "bg-amber-500"}`}
                      style={{ width: `${d.rate}%` }}
                    />
                  </div>
                  <span className={`text-sm font-bold w-12 text-right ${d.rate >= 90 ? "text-emerald-600" : d.rate >= 80 ? "text-indigo-600" : "text-amber-600"}`}>
                    {d.rate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Student Activity */}
      <Card className="shadow-sm border-gray-100">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Aktivitas Belajar Mahasiswa</CardTitle>
            <Button variant="outline" size="sm" onClick={() => handleExportCSV(ACTIVITY_DATA, "aktivitas-mahasiswa.csv")}>
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export CSV
            </Button>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">Mahasiswa</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">Kursus</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Progress</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">Terakhir Aktif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {ACTIVITY_DATA.map((s, i) => {
                const pct = Math.round((s.completedModules / s.totalModules) * 100);
                return (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3.5 font-medium text-gray-900">{s.student}</td>
                    <td className="px-4 py-3.5 text-gray-600 hidden md:table-cell">{s.course}</td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${pct >= 80 ? "bg-emerald-500" : pct >= 50 ? "bg-indigo-500" : "bg-amber-500"}`} style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs font-medium text-gray-700">{s.completedModules}/{s.totalModules}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-gray-500 hidden sm:table-cell">{s.lastActive}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
