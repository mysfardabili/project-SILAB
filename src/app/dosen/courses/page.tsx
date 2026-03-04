"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DOSEN_CLASSES, type DosenClass } from "@/lib/mockData";
import {
  Plus, BookOpen, Users, MoreVertical, Search,
  Edit2, Trash2, Eye, ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Course type is now imported from mockData as DosenClass
type Course = DosenClass;

const COLOR_OPTIONS = ["indigo", "emerald", "blue", "purple", "amber"];

const COLOR_CLASSES: Record<string, { bg: string; text: string; border: string }> = {
  indigo: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-l-indigo-500" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-l-emerald-500" },
  blue: { bg: "bg-blue-50", text: "text-blue-700", border: "border-l-blue-500" },
  purple: { bg: "bg-purple-50", text: "text-purple-700", border: "border-l-purple-500" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", border: "border-l-amber-500" },
};

export default function DosenCoursesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>(DOSEN_CLASSES);
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", code: "", sks: "3", semester: "Genap 2025/2026", schedule: "", room: "", color: "indigo" });

  useEffect(() => {
    if (!isLoading && user && user.role !== "dosen") router.replace("/dashboard/home");
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "dosen") return null;

  const filtered = courses.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = () => {
    if (!form.name || !form.code) return;
    const newCourse: Course = {
      id: `c${Date.now()}`,
      name: form.name,
      code: form.code,
      sks: parseInt(form.sks) || 3,
      semester: form.semester,
      schedule: form.schedule,
      room: form.room,
      students: 0,
      color: form.color,
      status: "active",
    };
    setCourses((prev) => [newCourse, ...prev]);
    setForm({ name: "", code: "", sks: "3", semester: "Genap 2025/2026", schedule: "", room: "", color: "indigo" });
    setShowCreate(false);
  };

  const handleDelete = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelas Saya</h1>
          <p className="text-gray-500 text-sm mt-1">{courses.length} kelas aktif semester ini</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" /> Buat Kelas Baru
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Cari kelas..."
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((course) => {
          const cc = COLOR_CLASSES[course.color] ?? COLOR_CLASSES.indigo;
          return (
            <Card key={course.id} className={`shadow-sm border-l-4 ${cc.border} hover:shadow-md transition-shadow`}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${cc.bg} ${cc.text}`}>
                    {course.code}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dosen/courses/${course.id}`}>
                          <Eye className="w-4 h-4 mr-2" /> Lihat Detail
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit2 className="w-4 h-4 mr-2" /> Edit Kelas
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(course.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" /> Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">{course.name}</h3>
                <p className="text-xs text-gray-500 mb-3">{course.semester} · {course.sks} SKS</p>

                <div className="space-y-1 text-sm text-gray-600 mb-4">
                  <p>🕐 {course.schedule || "—"}</p>
                  <p>📍 {course.room || "—"}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{course.students} mahasiswa</span>
                  </div>
                  <Link
                    href={`/dosen/courses/${course.id}`}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                  >
                    Detail <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-16 text-gray-400">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">Tidak ada kelas ditemukan</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Buat Kelas Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 space-y-1">
                <Label>Nama Mata Kuliah</Label>
                <Input placeholder="cth. Teknologi Web" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label>Kode MK</Label>
                <Input placeholder="TI-301" value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label>SKS</Label>
                <Input type="number" min={1} max={6} value={form.sks} onChange={(e) => setForm((f) => ({ ...f, sks: e.target.value }))} />
              </div>
              <div className="col-span-2 space-y-1">
                <Label>Semester</Label>
                <Input placeholder="Genap 2025/2026" value={form.semester} onChange={(e) => setForm((f) => ({ ...f, semester: e.target.value }))} />
              </div>
              <div className="col-span-2 space-y-1">
                <Label>Jadwal</Label>
                <Input placeholder="Senin 08:00–09:40" value={form.schedule} onChange={(e) => setForm((f) => ({ ...f, schedule: e.target.value }))} />
              </div>
              <div className="col-span-2 space-y-1">
                <Label>Ruangan</Label>
                <Input placeholder="Lab B-201" value={form.room} onChange={(e) => setForm((f) => ({ ...f, room: e.target.value }))} />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Warna Label</Label>
                <div className="flex gap-2">
                  {COLOR_OPTIONS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setForm((f) => ({ ...f, color: c }))}
                      className={`w-7 h-7 rounded-full border-2 transition-all bg-${c}-500 ${form.color === c ? "border-gray-900 scale-110" : "border-transparent"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowCreate(false)}>Batal</Button>
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700" onClick={handleCreate}>Simpan</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
