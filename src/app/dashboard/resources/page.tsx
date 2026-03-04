"use client";

import Link from "next/link";
import { Search, BookOpen, Download, FileText, Play, Eye, Tag } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

type ResourceType = "document" | "video" | "template" | "reference";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  size: string;
  course: string;
  uploadedBy: string;
  uploadedAt: string;
  tags: string[];
}

const TYPE_CONFIG: Record<ResourceType, { badgeClass: string; icon: typeof FileText; label: string }> = {
  document: { badgeClass: "bg-blue-100 text-blue-700", icon: FileText, label: "Dokumen" },
  video: { badgeClass: "bg-purple-100 text-purple-700", icon: Play, label: "Video" },
  template: { badgeClass: "bg-amber-100 text-amber-700", icon: FileText, label: "Template" },
  reference: { badgeClass: "bg-emerald-100 text-emerald-700", icon: BookOpen, label: "Referensi" },
};

const RESOURCES: Resource[] = [
  { id: "r1", title: "Modul Belajar Teknologi Web - Bab 1-3", description: "Materi pengenalan HTML5, CSS3, dan JavaScript modern. Cocok untuk pemula.", type: "document", size: "4.2 MB", course: "Teknologi Web", uploadedBy: "Dr. Ahmad Rizki", uploadedAt: "15 Feb 2026", tags: ["HTML", "CSS", "JavaScript"] },
  { id: "r2", title: "Tutorial Next.js App Router", description: "Rekaman sesi live coding Next.js 15 dengan App Router dan Server Components.", type: "video", size: "280 MB", course: "Teknologi Web", uploadedBy: "Dr. Ahmad Rizki", uploadedAt: "20 Feb 2026", tags: ["Next.js", "React"] },
  { id: "r3", title: "Template Laporan Akhir Proyek", description: "Template .docx terstandar untuk laporan tugas akhir atau proyek mata kuliah.", type: "template", size: "1.1 MB", course: "Rekayasa Perangkat Lunak", uploadedBy: "Admin", uploadedAt: "1 Jan 2026", tags: ["Template", "Laporan"] },
  { id: "r4", title: "Cheat Sheet SQL - Query Tingkat Lanjut", description: "Referensi cepat untuk JOIN, subquery, window functions, dan optimasi query.", type: "reference", size: "500 KB", course: "Basis Data", uploadedBy: "Prof. Indah Pratiwi", uploadedAt: "10 Feb 2026", tags: ["SQL", "Database"] },
  { id: "r5", title: "Slide Kuliah Struktur Data", description: "Kumpulan slide kuliah : array, linked list, stack, queue, tree, dan graph.", type: "document", size: "8.7 MB", course: "Struktur Data", uploadedBy: "Dr. Fitri Hanum", uploadedAt: "5 Feb 2026", tags: ["Algoritma", "Data Structure"] },
  { id: "r6", title: "Panduan Git & GitHub untuk Mahasiswa", description: "Panduan lengkap version control dari clone hingga pull request.", type: "reference", size: "2.3 MB", course: "Rekayasa Perangkat Lunak", uploadedBy: "Admin", uploadedAt: "3 Mar 2026", tags: ["Git", "GitHub"] },
];

export default function ResourcesPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | ResourceType>("all");

  const filtered = RESOURCES.filter((r) => {
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchType = typeFilter === "all" || r.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <BookOpen className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Resources</h1>
            <p className="text-sm text-gray-500">Materi & referensi dari dosen untuk semua kelas.</p>
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Cari materi, tag, atau deskripsi..."
            className="pl-9 bg-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as typeof typeFilter)}>
          <SelectTrigger className="w-40 bg-white">
            <SelectValue placeholder="Semua Tipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tipe</SelectItem>
            <SelectItem value="document">📄 Dokumen</SelectItem>
            <SelectItem value="video">🎬 Video</SelectItem>
            <SelectItem value="template">📝 Template</SelectItem>
            <SelectItem value="reference">📚 Referensi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((r) => {
          const tc = TYPE_CONFIG[r.type];
          const Icon = tc.icon;
          return (
            <Card key={r.id} className="shadow-sm border-gray-100 hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tc.badgeClass.replace("text-", "bg-").replace("700", "50")}`}>
                    <Icon className={`w-5 h-5 ${tc.badgeClass.split(" ")[1]}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm leading-snug">{r.title}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{r.course}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-2">{r.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  <Badge className={`border-none text-xs ${tc.badgeClass}`}>{tc.label}</Badge>
                  {r.tags.map((tag) => (
                    <Badge key={tag} className="border-none text-xs bg-gray-100 text-gray-600">{tag}</Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-50">
                  <span>{r.size} · {r.uploadedAt}</span>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/resources/${r.id}`}
                      className="flex items-center gap-1 text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" /> Lihat
                    </Link>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
                      <Download className="w-3.5 h-3.5" /> Unduh
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-3 text-center py-14 text-gray-400">
            <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm font-medium">Tidak ada resource ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
