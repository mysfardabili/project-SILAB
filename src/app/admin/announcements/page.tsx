"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Plus, Megaphone, Calendar, Users, Trash2, Edit2, MoreVertical, Target,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Target = "semua" | "mahasiswa" | "dosen";

interface Announcement {
  id: string;
  title: string;
  content: string;
  target: Target;
  startDate: string;
  endDate: string;
  active: boolean;
  createdAt: string;
}

const TARGET_CONFIG: Record<Target, { label: string; badge: string }> = {
  semua: { label: "Semua Pengguna", badge: "bg-indigo-100 text-indigo-700" },
  mahasiswa: { label: "Mahasiswa", badge: "bg-blue-100 text-blue-700" },
  dosen: { label: "Dosen", badge: "bg-purple-100 text-purple-700" },
};

const INITIAL: Announcement[] = [
  { id: "a1", title: "Jadwal UTS Semester Genap 2025/2026", content: "Ujian Tengah Semester akan dilaksanakan mulai tanggal 15–20 April 2026. Mohon pastikan data kehadiran Anda sudah lengkap sebelum tanggal tersebut.", target: "semua", startDate: "2026-03-10", endDate: "2026-04-20", active: true, createdAt: "4 Mar 2026" },
  { id: "a2", title: "Batas Akhir Input Nilai Semester Gasal", content: "Dosen diwajibkan menginput nilai akhir mahasiswa sebelum tanggal 20 Maret 2026.", target: "dosen", startDate: "2026-03-01", endDate: "2026-03-20", active: true, createdAt: "1 Mar 2026" },
  { id: "a3", title: "Pembaruan Sistem SI Lab v2.0", content: "SI Lab akan menjalani maintenance pada 5 Maret 2026 pukul 00:00–06:00 WIB.", target: "semua", startDate: "2026-03-03", endDate: "2026-03-06", active: false, createdAt: "3 Mar 2026" },
];

export default function AdminAnnouncementsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", target: "semua" as Target, startDate: "", endDate: "" });

  useEffect(() => {
    if (!isLoading && user && user.role !== "admin") router.replace("/dashboard/home");
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") return null;

  const handleCreate = () => {
    if (!form.title || !form.content) return;
    const newAnn: Announcement = {
      id: `a${Date.now()}`,
      title: form.title,
      content: form.content,
      target: form.target,
      startDate: form.startDate,
      endDate: form.endDate,
      active: true,
      createdAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
    setForm({ title: "", content: "", target: "semua", startDate: "", endDate: "" });
    setShowCreate(false);
  };

  const handleDelete = (id: string) => setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  const toggleActive = (id: string) => setAnnouncements((prev) => prev.map((a) => a.id === id ? { ...a, active: !a.active } : a));

  return (
    <div className="px-6 md:px-8 py-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pengumuman Global</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola pengumuman yang tampil di dashboard semua pengguna.</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" /> Buat Pengumuman
        </Button>
      </div>

      <div className="space-y-4">
        {announcements.map((ann) => (
          <Card key={ann.id} className={`shadow-sm border-gray-100 ${!ann.active ? "opacity-60" : ""}`}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center shrink-0">
                    <Megaphone className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-gray-900">{ann.title}</h3>
                      <Badge className={`border-none text-xs ${TARGET_CONFIG[ann.target].badge}`}>
                        <Target className="w-3 h-3 mr-1" />{TARGET_CONFIG[ann.target].label}
                      </Badge>
                      <Badge className={`border-none text-xs ${ann.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                        {ann.active ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{ann.content}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{ann.startDate} – {ann.endDate || "—"}</span>
                      <span>Dibuat: {ann.createdAt}</span>
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-1.5 rounded hover:bg-gray-100 transition-colors shrink-0">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Edit2 className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleActive(ann.id)}>
                      {ann.active ? "🔕 Nonaktifkan" : "🔔 Aktifkan"}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(ann.id)} className="text-red-600 focus:text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" /> Hapus
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Buat Pengumuman Baru</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <Label>Judul Pengumuman</Label>
              <Input placeholder="cth. Jadwal UTS..." value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label>Isi Pengumuman</Label>
              <Textarea rows={4} placeholder="Tulis isi pengumuman di sini..." value={form.content} onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label>Target Penerima</Label>
              <Select value={form.target} onValueChange={(v) => setForm((f) => ({ ...f, target: v as Target }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua Pengguna</SelectItem>
                  <SelectItem value="mahasiswa">Mahasiswa Saja</SelectItem>
                  <SelectItem value="dosen">Dosen Saja</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label>Tanggal Mulai</Label>
                <Input type="date" value={form.startDate} onChange={(e) => setForm((f) => ({ ...f, startDate: e.target.value }))} />
              </div>
              <div className="space-y-1">
                <Label>Tanggal Berakhir</Label>
                <Input type="date" value={form.endDate} onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))} />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowCreate(false)}>Batal</Button>
              <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700" onClick={handleCreate}>Terbitkan</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
