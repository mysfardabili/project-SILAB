"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Download, BookOpen, FileText, Play, Eye, Calendar, User, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ResourceDetailPageProps {
  params: Promise<{ id: string }>;
}

const RESOURCE_DATA: Record<string, {
  id: string;
  title: string;
  description: string;
  type: "document" | "video" | "template" | "reference";
  size: string;
  course: string;
  uploadedBy: string;
  uploadedAt: string;
  tags: string[];
  preview?: string;
}> = {
  r1: {
    id: "r1",
    title: "Modul Belajar Teknologi Web - Bab 1-3",
    description: "Materi pengenalan HTML5, CSS3, dan JavaScript modern. Modul ini mencakup:\n\n• **Bab 1 — HTML5**: Struktur semantik, form, media, dan aksesibilitas.\n• **Bab 2 — CSS3**: Flexbox, Grid, variabel CSS, animasi, dan responsive design.\n• **Bab 3 — JavaScript Modern**: ES6+, async/await, fetch API, dan DOM manipulation.\n\nCocok untuk mahasiswa yang baru mengenal web development.",
    type: "document",
    size: "4.2 MB",
    course: "Teknologi Web",
    uploadedBy: "Dr. Ahmad Rizki",
    uploadedAt: "15 Feb 2026",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  r2: {
    id: "r2",
    title: "Tutorial Next.js App Router",
    description: "Rekaman sesi live coding Next.js 15 dengan App Router dan Server Components.\n\nTopik yang dicakup:\n• Setup proyek Next.js 15\n• App Router & file-based routing\n• Server Components vs Client Components\n• Data fetching & caching\n• Deployment ke Vercel",
    type: "video",
    size: "280 MB",
    course: "Teknologi Web",
    uploadedBy: "Dr. Ahmad Rizki",
    uploadedAt: "20 Feb 2026",
    tags: ["Next.js", "React"],
  },
  r3: { id: "r3", title: "Template Laporan Akhir Proyek", description: "Template .docx terstandar untuk laporan tugas akhir atau proyek mata kuliah.", type: "template", size: "1.1 MB", course: "Rekayasa Perangkat Lunak", uploadedBy: "Admin", uploadedAt: "1 Jan 2026", tags: ["Template", "Laporan"] },
  r4: { id: "r4", title: "Cheat Sheet SQL - Query Tingkat Lanjut", description: "Referensi cepat untuk JOIN, subquery, window functions, dan optimasi query.", type: "reference", size: "500 KB", course: "Basis Data", uploadedBy: "Prof. Indah Pratiwi", uploadedAt: "10 Feb 2026", tags: ["SQL", "Database"] },
  r5: { id: "r5", title: "Slide Kuliah Struktur Data", description: "Kumpulan slide kuliah: array, linked list, stack, queue, tree, dan graph.", type: "document", size: "8.7 MB", course: "Struktur Data", uploadedBy: "Dr. Fitri Hanum", uploadedAt: "5 Feb 2026", tags: ["Algoritma", "Data Structure"] },
  r6: { id: "r6", title: "Panduan Git & GitHub untuk Mahasiswa", description: "Panduan lengkap version control dari clone hingga pull request.", type: "reference", size: "2.3 MB", course: "Rekayasa Perangkat Lunak", uploadedBy: "Admin", uploadedAt: "3 Mar 2026", tags: ["Git", "GitHub"] },
};

const TYPE_ICON: Record<string, typeof FileText> = {
  document: FileText, video: Play, template: FileText, reference: BookOpen,
};
const TYPE_LABEL: Record<string, string> = {
  document: "Dokumen", video: "Video", template: "Template", reference: "Referensi",
};
const TYPE_BADGE: Record<string, string> = {
  document: "bg-blue-100 text-blue-700",
  video: "bg-purple-100 text-purple-700",
  template: "bg-amber-100 text-amber-700",
  reference: "bg-emerald-100 text-emerald-700",
};

export default function ResourceDetailPage({ params: paramsPromise }: ResourceDetailPageProps) {
  const params = use(paramsPromise);
  const resource = RESOURCE_DATA[params.id];

  if (!resource) {
    return (
      <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 text-center">
        <BookOpen className="w-14 h-14 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-900 mb-2">Resource tidak ditemukan</h2>
        <Link href="/dashboard/resources" className="text-indigo-600 hover:text-indigo-800 text-sm">
          ← Kembali ke Resources
        </Link>
      </div>
    );
  }

  const Icon = TYPE_ICON[resource.type];

  return (
    <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6 max-w-4xl">
      <Link
        href="/dashboard/resources"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke Resources
      </Link>

      {/* Main content card */}
      <Card className="shadow-sm border-gray-100">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${TYPE_BADGE[resource.type].split(" ")[0].replace("100", "50")}`}>
                <Icon className={`w-6 h-6 ${TYPE_BADGE[resource.type].split(" ")[1]}`} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 leading-snug mb-1">{resource.title}</h1>
                <p className="text-sm text-gray-500">{resource.course}</p>
              </div>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700 shrink-0 hidden sm:flex" onClick={() => alert("Fitur unduh akan tersedia setelah backend diintegrasikan.")}>
              <Download className="w-4 h-4 mr-2" /> Unduh
            </Button>
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap gap-3 mb-6 pb-6 border-b border-gray-100">
            <Badge className={`border-none ${TYPE_BADGE[resource.type]}`}>{TYPE_LABEL[resource.type]}</Badge>
            <span className="flex items-center gap-1.5 text-sm text-gray-500"><User className="w-3.5 h-3.5" /> {resource.uploadedBy}</span>
            <span className="flex items-center gap-1.5 text-sm text-gray-500"><Calendar className="w-3.5 h-3.5" /> {resource.uploadedAt}</span>
            <span className="text-sm text-gray-500 font-mono">{resource.size}</span>
          </div>

          {/* Description */}
          <div className="prose prose-sm max-w-none">
            <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Eye className="w-4 h-4 text-indigo-500" /> Deskripsi
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">{resource.description}</p>
          </div>

          {/* Tags */}
          <div className="mt-6 pt-5 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-1.5">
              <Tag className="w-4 h-4" /> Tag
            </p>
            <div className="flex flex-wrap gap-2">
              {resource.tags.map((tag) => (
                <Badge key={tag} className="bg-gray-100 text-gray-600 border-none">{tag}</Badge>
              ))}
            </div>
          </div>

          {/* Mobile download */}
          <div className="mt-6 sm:hidden">
            <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={() => alert("Fitur unduh akan tersedia setelah backend diintegrasikan.")}>
              <Download className="w-4 h-4 mr-2" /> Unduh Resource
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
