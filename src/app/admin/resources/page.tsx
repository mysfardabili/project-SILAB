"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  FolderOpen, Plus, FileText, Download, Trash2, Search, Filter, MoreVertical, Edit2, ShieldAlert
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Resource {
  id: string;
  name: string;
  category: string;
  type: string;
  size: string;
  access: "all" | "mahasiswa" | "dosen";
  uploadedAt: string;
}

const INITIAL: Resource[] = [
  { id: "r1", name: "Buku Pedoman Akademik 2025/2026", category: "Pedoman", type: "PDF", size: "4.2 MB", access: "all", uploadedAt: "1 Feb 2026" },
  { id: "r2", name: "Panduan Penggunaan SI Lab (Mahasiswa)", category: "Tutorial", type: "PDF", size: "2.8 MB", access: "mahasiswa", uploadedAt: "10 Feb 2026" },
  { id: "r3", name: "Panduan Input Nilai (Dosen)", category: "Tutorial", type: "PDF", size: "1.5 MB", access: "dosen", uploadedAt: "15 Feb 2026" },
  { id: "r4", name: "Template Silabus Mata Kuliah Kosong", category: "Template", type: "DOCX", size: "120 KB", access: "dosen", uploadedAt: "5 Mar 2026" },
  { id: "r5", name: "Formulir Pengajuan Cuti Kuliah", category: "Formulir", type: "PDF", size: "450 KB", access: "mahasiswa", uploadedAt: "2 Mar 2026" },
];

const ACCESS_LABELS = {
  all: { label: "Semua", badge: "bg-indigo-100 text-indigo-700" },
  mahasiswa: { label: "Mahasiswa", badge: "bg-blue-100 text-blue-700" },
  dosen: { label: "Dosen", badge: "bg-purple-100 text-purple-700" },
};

export default function AdminResourcesPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [resources, setResources] = useState<Resource[]>(INITIAL);
  const [search, setSearch] = useState("");
  const [accessFilter, setAccessFilter] = useState<"all" | "mahasiswa" | "dosen" | "semua">("semua");

  useEffect(() => {
    if (!isLoading && user && user.role !== "admin") router.replace("/dashboard/home");
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") return null;

  const handleDelete = (id: string) => setResources(prev => prev.filter(r => r.id !== id));

  const filtered = resources.filter(r => {
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.category.toLowerCase().includes(search.toLowerCase());
    const matchAccess = accessFilter === "semua" || r.access === accessFilter || r.access === "all";
    return matchSearch && matchAccess;
  });

  return (
    <div className="px-6 md:px-8 py-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Resources</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola file dan dokumen panduan untuk seluruh pengguna.</p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700">
          <Plus className="w-4 h-4 mr-2" /> Upload Dokumen
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Cari dokumen, kategori..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={accessFilter} onValueChange={(v) => setAccessFilter(v as any)}>
          <SelectTrigger className="w-40 bg-white">
            <SelectValue placeholder="Hak Akses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semua">Semua Akses</SelectItem>
            <SelectItem value="mahasiswa">Khusus Mahasiswa</SelectItem>
            <SelectItem value="dosen">Khusus Dosen</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="shadow-sm border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs font-semibold">
              <tr>
                <th className="px-5 py-3">Nama Dokumen</th>
                <th className="px-4 py-3 hidden md:table-cell">Kategori</th>
                <th className="px-4 py-3">Hak Akses</th>
                <th className="px-4 py-3 hidden sm:table-cell">Ukuran</th>
                <th className="px-4 py-3 hidden lg:table-cell">Diunggah</th>
                <th className="px-4 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{r.name}</p>
                        <p className="text-xs text-gray-500">{r.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-gray-600 hidden md:table-cell">{r.category}</td>
                  <td className="px-4 py-3.5">
                    <Badge className={`border-none font-medium text-xs ${ACCESS_LABELS[r.access].badge}`}>
                      {ACCESS_LABELS[r.access].label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 text-gray-500 hidden sm:table-cell font-mono text-xs">{r.size}</td>
                  <td className="px-4 py-3.5 text-gray-500 hidden lg:table-cell text-xs">{r.uploadedAt}</td>
                  <td className="px-4 py-3.5 text-right">
                     <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Download className="w-4 h-4 mr-2" /> Download</DropdownMenuItem>
                        <DropdownMenuItem><Edit2 className="w-4 h-4 mr-2" /> Edit Info</DropdownMenuItem>
                        <DropdownMenuItem><ShieldAlert className="w-4 h-4 mr-2" /> Ubah Akses</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(r.id)} className="text-red-600 focus:text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" /> Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-gray-500">
                    <FolderOpen className="w-8 h-8 mx-auto mb-3 opacity-30" />
                    Tidak ada dokumen yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
