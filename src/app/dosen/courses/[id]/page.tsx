"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DOSEN_CLASSES } from "@/lib/mockData";
import {
  ArrowLeft, Users, BookOpen, Clock, MapPin, Search, Download
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Per-class mock student data
const MOCK_STUDENTS_BY_COURSE: Record<string, typeof MOCK_STUDENTS_DEFAULT> = {};

const MOCK_STUDENTS_DEFAULT = [
  { id: "s1", name: "Andi Wijaya", nim: "2021010001", email: "andi@student.silab.id", status: "Aktif" },
  { id: "s2", name: "Bella Rahayu", nim: "2021010002", email: "bella@student.silab.id", status: "Aktif" },
  { id: "s3", name: "Candra Kusuma", nim: "2021010003", email: "candra@student.silab.id", status: "Cuti" },
  { id: "s4", name: "Desy Maulida", nim: "2021010004", email: "desy@student.silab.id", status: "Aktif" },
  { id: "s5", name: "Eko Prasetyo", nim: "2021010005", email: "eko@student.silab.id", status: "Aktif" },
];

export default function CourseDetailPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [search, setSearch] = useState("");

  const courseId = Array.isArray(params.id) ? params.id[0] : params.id ?? "";
  const course = DOSEN_CLASSES.find((c) => c.id === courseId);
  const MOCK_STUDENTS = MOCK_STUDENTS_DEFAULT;

  useEffect(() => {
    if (!isLoading && user && user.role !== "dosen") router.replace("/dashboard/home");
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "dosen") return null;

  if (!course) {
    return (
      <div className="px-6 md:px-10 py-16 max-w-7xl mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Kelas tidak ditemukan</h1>
        <p className="text-gray-500 mb-6">Kelas dengan ID "{courseId}" tidak ada.</p>
        <Link href="/dosen/courses" className="text-indigo-600 hover:underline font-medium">
          ← Kembali ke Kelas
        </Link>
      </div>
    );
  }

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.nim.includes(search)
  );

  const COLOR_MAP: Record<string, string> = {
    indigo: "bg-indigo-100 text-indigo-700",
    emerald: "bg-emerald-100 text-emerald-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
    amber: "bg-amber-100 text-amber-700",
  };
  const badgeClass = COLOR_MAP[course.color] ?? COLOR_MAP.indigo;

  return (
    <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link href="/dosen/courses" className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 font-medium mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Kembali ke Kelas
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Badge className={`border-none px-3 py-1 font-semibold ${badgeClass}`}>{course.code}</Badge>
              <Badge className={course.status === "active" ? "bg-emerald-100 text-emerald-700 border-none" : "bg-gray-100 text-gray-700 border-none"}>
                {course.status === "active" ? "Kelas Aktif" : "Selesai"}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
            <p className="text-gray-500 mt-2 max-w-2xl">{course.description}</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="outline" onClick={() => router.push("/dosen/materials")}>
              <BookOpen className="w-4 h-4 mr-2" /> Kelola Materi
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Info Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-sm border-gray-100">
            <CardHeader className="pb-3 border-b border-gray-50">
              <CardTitle className="text-base text-gray-900">Informasi Kelas</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Jadwal</p>
                  <p className="text-gray-500">{course.schedule}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Ruangan</p>
                  <p className="text-gray-500">{course.room}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-400 shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Total Mahasiswa</p>
                  <p className="text-gray-500">{course.students} Terdaftar</p>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Semester</p>
                  <p className="font-medium text-gray-900">{course.semester}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">SKS</p>
                  <p className="font-medium text-gray-900">{course.sks} SKS</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="students" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent space-x-6">
              <TabsTrigger value="students" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-0 pb-3 pt-2 text-gray-500 data-[state=active]:text-indigo-600 hover:text-gray-900 transition-none">
                <Users className="w-4 h-4 mr-2" /> Mahasiswa Terdaftar
              </TabsTrigger>
              <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-indigo-600 data-[state=active]:bg-transparent px-0 pb-3 pt-2 text-gray-500 data-[state=active]:text-indigo-600 hover:text-gray-900 transition-none">
                <BookOpen className="w-4 h-4 mr-2" /> Aktivitas Materi
              </TabsTrigger>
            </TabsList>

            <TabsContent value="students" className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="relative max-w-sm flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Cari mahasiswa / NIM..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <Button variant="outline" className="ml-4 shrink-0">
                  <Download className="w-4 h-4 mr-2" /> Export
                </Button>
              </div>

              <Card className="shadow-sm border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="text-left px-5 py-3 font-semibold text-gray-600">Nama Mahasiswa</th>
                        <th className="text-left px-5 py-3 font-semibold text-gray-600">NIM</th>
                        <th className="text-left px-5 py-3 font-semibold text-gray-600">Email</th>
                        <th className="text-center px-5 py-3 font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredStudents.map((s) => (
                        <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-5 py-3 font-medium text-gray-900">{s.name}</td>
                          <td className="px-5 py-3 text-gray-600">{s.nim}</td>
                          <td className="px-5 py-3 text-gray-600">{s.email}</td>
                          <td className="px-5 py-3 text-center">
                            <Badge className={`border-none ${s.status === "Aktif" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"}`}>
                              {s.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                      {filteredStudents.length === 0 && (
                        <tr>
                          <td colSpan={4} className="px-5 py-12 text-center text-gray-500">
                            Tidak ada mahasiswa yang ditemukan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="pt-6">
              <Card className="shadow-sm border-gray-100 flex items-center justify-center p-12">
                <div className="text-center space-y-2">
                  <BookOpen className="w-10 h-10 text-gray-300 mx-auto" />
                  <p className="text-gray-900 font-medium">Belum ada insight aktivitas.</p>
                  <p className="text-gray-500 text-sm">Data aktivitas mahasiswa terhadap materi akan muncul di sini.</p>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
