"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DOSEN_CLASSES, DOSEN_MATERIALS, type MatType, type DosenMaterial } from "@/lib/mockData";
import {
  Plus, Search, FileText, Video, HelpCircle, BookOpen,
  MoreVertical, Edit2, Trash2, GripVertical,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// CLASSES and Material types are now imported from mockData.ts
type Material = DosenMaterial;

const CLASSES = DOSEN_CLASSES;

const TYPE_CONFIG: Record<MatType, { label: string; icon: typeof FileText; color: string; bg: string }> = {
  dokumen: { label: "Dokumen", icon: FileText, color: "text-blue-600", bg: "bg-blue-50" },
  video: { label: "Video", icon: Video, color: "text-purple-600", bg: "bg-purple-50" },
  quiz: { label: "Quiz", icon: HelpCircle, color: "text-amber-600", bg: "bg-amber-50" },
  learning_path: { label: "Learning Path", icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
};

export default function DosenMaterialsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [materials, setMaterials] = useState<Material[]>(DOSEN_MATERIALS);
  const [selectedClass, setSelectedClass] = useState(DOSEN_CLASSES[0]?.id ?? "c1");
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: "", type: "dokumen" as MatType });

  useEffect(() => {
    if (!isLoading && user && user.role !== "dosen") router.replace("/dashboard/home");
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "dosen") return null;

  const filtered = materials
    .filter((m) => m.course === selectedClass && m.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.order - b.order);

  const handleCreate = () => {
    if (!form.title) return;
    const newMat: Material = {
      id: `m${Date.now()}`,
      title: form.title,
      type: form.type,
      course: selectedClass,
      order: filtered.length + 1,
      published: false,
      createdAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    };
    setMaterials((prev) => [...prev, newMat]);
    setForm({ title: "", type: "dokumen" });
    setShowCreate(false);
  };

  const handleDelete = (id: string) => setMaterials((prev) => prev.filter((m) => m.id !== id));
  const togglePublish = (id: string) => setMaterials((prev) => prev.map((m) => m.id === id ? { ...m, published: !m.published } : m));

  return (
    <div className="px-6 md:px-10 py-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Materi Kuliah</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola materi pembelajaran untuk setiap kelas.</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" /> Tambah Materi
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-52 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CLASSES.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Cari materi..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Materials List */}
      <div className="space-y-3">
        {filtered.map((mat, idx) => {
          const cfg = TYPE_CONFIG[mat.type];
          const Icon = cfg.icon;
          return (
            <Card key={mat.id} className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="text-gray-300 cursor-grab shrink-0">
                  <GripVertical className="w-4 h-4" />
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                  <Icon className={`w-5 h-5 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-gray-900">{mat.title}</p>
                    <Badge className={`text-xs border-none ${mat.published ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                      {mat.published ? "Dipublikasikan" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{cfg.label} · Urutan {mat.order} · Dibuat {mat.createdAt}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => togglePublish(mat.id)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${mat.published ? "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}`}
                  >
                    {mat.published ? "Draft" : "Publish"}
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dosen/materials/${mat.id}/edit`}>
                          <Edit2 className="w-4 h-4 mr-2" /> Edit
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDelete(mat.id)} className="text-red-600 focus:text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" /> Hapus
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-14 text-gray-400">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">Belum ada materi untuk kelas ini</p>
            <p className="text-sm mt-1">Klik &quot;Tambah Materi&quot; untuk menambahkan materi baru.</p>
          </div>
        )}
      </div>

      {/* Create Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Tambah Materi Baru</DialogTitle></DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <Label>Judul Materi</Label>
              <Input placeholder="cth. Pengenalan React Hooks" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="space-y-1">
              <Label>Tipe Materi</Label>
              <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v as MatType }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
                    <SelectItem key={key} value={key}>{cfg.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
