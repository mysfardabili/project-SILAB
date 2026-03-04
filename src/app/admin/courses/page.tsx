"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Search, CheckCircle2, XCircle, Clock, BookOpen, MoreVertical, Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCourses } from "@/hooks/useCourses";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

type CourseStatus = "active" | "pending" | "rejected";

interface AdminCourse {
  id: string;
  name: string;
  code: string;
  dosen: string;
  prodi: string;
  semester: string;
  students: number;
  status: CourseStatus;
  createdAt: string;
}

const STATUS_CONFIG: Record<CourseStatus, { label: string; badge: string; icon: typeof CheckCircle2 }> = {
  active: { label: "Aktif", badge: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  pending: { label: "Pending", badge: "bg-amber-100 text-amber-700", icon: Clock },
  rejected: { label: "Ditolak", badge: "bg-red-100 text-red-700", icon: XCircle },
};

export default function AdminCoursesPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | CourseStatus>("all");

  const { courses, isLoading, mutate, refetch } = useCourses({ 
    status: statusFilter === "all" ? undefined : statusFilter 
  });

  useEffect(() => {
    if (!authLoading && user && user.role !== "admin") router.replace("/dashboard/home");
  }, [user, authLoading, router]);

  if (authLoading || !user || user.role !== "admin") return null;

  const handleApprove = (id: string) => mutate(courses.map((c) => c.id === id ? { ...c, status: "active" } : c));
  const handleReject = (id: string) => mutate(courses.map((c) => c.id === id ? { ...c, status: "rejected" } : c));
  const handleDelete = (id: string) => mutate(courses.filter((c) => c.id !== id));

  const filtered = courses.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
      (c.dosenName?.toLowerCase() || "").includes(search.toLowerCase()) || 
      c.code.toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  const pendingCount = courses.filter((c) => c.status === "pending").length;

  return (
    <div className="px-6 md:px-8 py-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Kursus</h1>
          <p className="text-gray-500 text-sm mt-1">{courses.length} kursus terdaftar · {pendingCount} menunggu persetujuan</p>
        </div>
        {pendingCount > 0 && (
          <Badge className="bg-amber-100 text-amber-800 border-none px-3 py-1.5 text-sm">
            ⚠️ {pendingCount} Kursus Pending
          </Badge>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Cari kursus / dosen..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
          <SelectTrigger className="w-36 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="rejected">Ditolak</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        {isLoading && (
          <div className="py-12 flex flex-col items-center justify-center text-gray-400">
            <Loader2 className="w-8 h-8 animate-spin mb-3 text-indigo-600" />
            <p className="font-medium text-sm">Memuat kursus dari API...</p>
          </div>
        )}
        {!isLoading && filtered.map((c) => {
          const sc = STATUS_CONFIG[c.status];
          const StIcon = sc.icon;
          return (
            <Card key={c.id} className={`shadow-sm border-gray-100 ${c.status === "pending" ? "border-l-4 border-l-amber-400" : ""}`}>
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-semibold text-gray-900">{c.name}</p>
                    <span className="text-xs text-gray-400 font-mono">{c.code}</span>
                    <Badge className={`border-none text-xs ${sc.badge}`}>
                      <StIcon className="w-3 h-3 mr-1" />{sc.label}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-sm text-gray-500">
                    <span>👨‍🏫 {c.dosenName}</span>
                    <span>📚 {c.prodi}</span>
                    <span>📅 {c.semester}</span>
                    {(c.studentsCount || 0) > 0 && <span>👥 {c.studentsCount} mahasiswa</span>}
                    <span className="text-xs text-gray-400">Dibuat: {c.createdAt}</span>
                  </div>
                  {c.status === "pending" && (
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleApprove(c.id)}
                        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Setujui
                      </button>
                      <button
                        onClick={() => handleReject(c.id)}
                        className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Tolak
                      </button>
                    </div>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1.5 rounded hover:bg-gray-100 transition-colors shrink-0">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {c.status === "pending" && (
                      <>
                        <DropdownMenuItem onClick={() => handleApprove(c.id)} className="text-emerald-600">✅ Setujui</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleReject(c.id)} className="text-red-600">❌ Tolak</DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem onClick={() => handleDelete(c.id)} className="text-red-600 focus:text-red-600">🗑️ Hapus</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
          </Card>
          );
        })}
        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-14 text-gray-400">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium text-sm">Tidak ada kursus ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
