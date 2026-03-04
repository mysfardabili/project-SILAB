"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Copy, LineChart, Layers, Clock, FileText, Download, Upload, Calendar, Play, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState, use } from "react";

interface LearningMaterialPageProps {
  params: Promise<{
    type: string;
    id: string;
  }>;
}

export default function LearningMaterialPage({ params: paramsPromise }: LearningMaterialPageProps) {
  const params = use(paramsPromise);
  const { type, id } = params;
  const [dragOver, setDragOver] = useState(false);
  
  // Mock data berdasarkan type dan id
  const getTypeConfig = (type: string) => {
    const configs = {
      quiz: { 
        icon: <Copy className="h-5 w-5" />, 
        color: "text-amber-600", 
        bgColor: "bg-amber-100",
        label: "Quiz",
        actionText: "Start Quiz"
      },
      assignment: { 
        icon: <FileText className="h-5 w-5" />, 
        color: "text-blue-600", 
        bgColor: "bg-blue-100",
        label: "Assignment",
        actionText: "Submit Assignment"
      },
      page: { 
        icon: <BookOpen className="h-5 w-5" />, 
        color: "text-teal-600", 
        bgColor: "bg-teal-100",
        label: "Learning Page",
        actionText: "Read Content"
      },
      "learning-path": { 
        icon: <LineChart className="h-5 w-5" />, 
        color: "text-purple-600", 
        bgColor: "bg-purple-100",
        label: "Learning Path",
        actionText: "Start Path"
      },
      course: { 
        icon: <Layers className="h-5 w-5" />, 
        color: "text-blue-600", 
        bgColor: "bg-blue-100",
        label: "Course",
        actionText: "Continue Course"
      }
    };
    return configs[type as keyof typeof configs] || configs.page;
  };

  const typeConfig = getTypeConfig(type);

  // Mock material data berdasarkan ID yang sebenarnya
  const getMaterialData = (id: string, type: string) => {
    const materialDatabase = {
      "user-experience-optimization": {
        title: "5 Steps Optimizing User Experience",
        subtitle: "UI/UX Design Optimization Guide",
        description: "Learn essential principles and best practices for creating exceptional user experiences through systematic optimization approaches.",
        assignmentTitle: "Laporan Praktikum UX: Optimasi Pengalaman Pengguna",
        criteria: [
          { item: "Analisis user journey dan pain points", percentage: 25 },
          { item: "Implementasi prinsip usability", percentage: 25 },
          { item: "Testing dan evaluasi hasil optimasi", percentage: 30 },
          { item: "Dokumentasi dan rekomendasi dalam bentuk PDF", percentage: 20 }
        ]
      },
      "usability-principles": {
        title: "Heuristics: 10 Usability Principles To improve UI Design",
        subtitle: "Learning Design & Usability Guide",
        description: "Master the fundamental usability principles and heuristics that guide effective user interface design decisions.",
        assignmentTitle: "Laporan Praktikum Design: 10 Prinsip Usability",
        criteria: [
          { item: "Pemahaman konsep heuristic evaluation", percentage: 25 },
          { item: "Analisis kasus studi UI design", percentage: 25 },
          { item: "Evaluasi interface menggunakan 10 prinsip", percentage: 30 },
          { item: "Kesimpulan dan rekomendasi perbaikan", percentage: 20 }
        ]
      },
      "general-knowledge": {
        title: "General Knowledge & Methodology - Layout & Spacing",
        subtitle: "Design Consistency Framework",
        description: "Understand the fundamental principles of layout design and spacing methodologies for consistent user interfaces.",
        assignmentTitle: "Laporan Praktikum Layout: Konsistensi Design System",
        criteria: [
          { item: "Teori dasar layout dan spacing", percentage: 25 },
          { item: "Implementasi grid system", percentage: 25 },
          { item: "Konsistensi visual hierarchy", percentage: 30 },
          { item: "Portfolio design system dalam bentuk PDF", percentage: 20 }
        ]
      },
      "ui-design-mastery": {
        title: "Mastering UI Design for Impactful Solutions",
        subtitle: "Advanced UI Design Course",
        description: "Develop advanced UI design skills and learn how to create impactful, user-centered design solutions.",
        assignmentTitle: "Laporan Praktikum UI: Design Solution Portfolio",
        criteria: [
          { item: "Konsep advanced UI design", percentage: 25 },
          { item: "Design thinking methodology", percentage: 25 },
          { item: "Portfolio project implementation", percentage: 30 },
          { item: "Presentasi dan dokumentasi final", percentage: 20 }
        ]
      }
    };

    return materialDatabase[id as keyof typeof materialDatabase] || {
      title: "Learning Material",
      subtitle: "Educational Content",
      description: "Learn essential principles and best practices for your field of study.",
      assignmentTitle: "5 Steps Optimizing User Experience",
      criteria: [
        { item: "Kelengkapan teori dan konsep", percentage: 25 },
        { item: "Metodologi dan prosedur", percentage: 25 },
        { item: "Analisis hasil dan pembahasan", percentage: 30 },
        { item: "Kesimpulan dan format laporan dalam bentuk PDF", percentage: 20 }
      ]
    };
  };

  const materialData = getMaterialData(id, type);

  // Mock assignment data dengan data yang sesuai
  const assignment = {
    id,
    type,
    title: materialData.assignmentTitle,
    subtitle: materialData.subtitle,
    description: materialData.description,
    dueDate: "14 Juli 2024, 23:59",
    timeRemaining: "Sisa waktu: 3 hari 14 jam 28 menit",
    daysLeft: "4 hari tersisa",
    
    // Kriteria Penilaian - sesuai dengan materi
    criteria: materialData.criteria,
    
    // File formats
    allowedFormats: ["PDF", "DOCX", "ZIP"],
    
    // Template files - sesuai dengan tipe materi
    templateFiles: type === "quiz" ? [] : [
      {
        name: `Template_${materialData.title.replace(/[^a-zA-Z0-9]/g, '_')}.docx`,
        size: "156 KB",
        icon: "📄"
      },
      {
        name: `Data_${type === "page" ? "Reading" : "Analysis"}.xlsx`, 
        size: "89 KB",
        icon: "📊"
      }
    ],
    
    // Status
    status: "Belum Mengumpulkan",
    submissionStatus: "Belum Dinilai",
    submissionDate: "–",
    grade: "–"
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    // Handle file drop logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6 px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content & Sidebar conditional based on type */}
          {type === "assignment" && (
            <>
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-blue-600 text-white rounded-xl p-6 md:p-8 shadow-sm">
                  <h1 className="text-2xl font-bold mb-2">{assignment.title}</h1>
                  <p className="text-blue-100">{assignment.subtitle}</p>
                </div>
                <Card className="shadow-sm border-gray-100">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <FileText className="h-5 w-5 text-blue-500" />
                      Deskripsi Tugas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">{assignment.description}</p>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Kriteria Penilaian:</h3>
                      <ul className="space-y-3">
                        {assignment.criteria.map((criterion, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                            <span className="text-gray-700 text-sm">{criterion.item} <span className="font-medium">({criterion.percentage}%)</span></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-sm border-gray-100">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 bg-amber-50/50 p-4 rounded-xl border border-amber-100">
                      <div className="bg-amber-100 p-2.5 rounded-lg text-amber-600 shrink-0">
                        <Clock className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">Batas Waktu Pengumpulan</p>
                        <p className="text-gray-600 text-sm mt-0.5">{assignment.dueDate}</p>
                      </div>
                      <div className="shrink-0">
                        <Badge variant="outline" className="bg-white border-amber-200 text-amber-700">{assignment.daysLeft}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="lg:col-span-1 space-y-6">
                <Card className="shadow-sm border-gray-100">
                  <CardHeader>
                    <CardTitle className="text-gray-900 text-lg">Submission</CardTitle>
                    <p className="text-sm text-gray-500">Upload jawaban tugas Anda</p>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div className="p-3.5 bg-gray-50 rounded-lg flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Status</span>
                      <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-200 border-none">{assignment.status}</Badge>
                    </div>
                    <div 
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                        dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-gray-50/50 hover:bg-gray-50'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-gray-100">
                        <Upload className="h-5 w-5 text-blue-600" />
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">Upload File Jawaban</p>
                      <p className="text-xs text-gray-500 mb-4">PDF, DOCX max 10MB</p>
                      <input type="file" className="hidden" id="file-upload" />
                      <label htmlFor="file-upload">
                        <Button variant="outline" size="sm" className="cursor-pointer w-full bg-white">Pilih File</Button>
                      </label>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Submit Tugas</Button>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Reading Page / Video Type */}
          {(type === "page" || type === "video" || type === "learning-path") && (
            <div className="lg:col-span-3">
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className="bg-indigo-50 text-indigo-700 border-none hover:bg-indigo-50">{type.toUpperCase()}</Badge>
                    <Badge variant="outline" className="text-gray-500">Mata Kuliah: Desain UI/UX</Badge>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {materialData.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">{materialData.subtitle}</p>

                  {type === "video" && (
                    <div className="aspect-video bg-gray-900 rounded-xl mb-8 flex items-center justify-center relative overflow-hidden group cursor-pointer border border-gray-800">
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                      <button className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 transition-all duration-300 z-10">
                        <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
                      </button>
                    </div>
                  )}

                  <div className="prose prose-indigo max-w-none text-gray-700">
                    <p className="lead text-xl text-gray-600 mb-6">{materialData.description}</p>
                    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Pengantar</h3>
                    <p className="mb-4">
                      Dalam materi ini, kita akan membahas konsep-konsep krusial yang berhubungan dengan {materialData.title.toLowerCase()}. 
                      Praktik yang baik sangat bergantung pada pondasi teoritis yang kuat sebelum diimplementasikan ke dalam proyek nyata.
                    </p>
                    <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Poin-poin Pembelajaran</h3>
                    <ul className="space-y-2 mb-8">
                      <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>Memahami prinsip dasar desain antarmuka.</span></li>
                      <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>Evaluasi kebutuhan pengguna berdasarkan riset.</span></li>
                      <li className="flex gap-2 items-start"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" /> <span>Implementasi layout & hierarki visual.</span></li>
                    </ul>
                    
                    <div className="bg-indigo-50/50 rounded-xl p-6 border border-indigo-100 flex gap-4 mt-8">
                      <BookOpen className="w-8 h-8 text-indigo-500 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-indigo-900 mb-1">Catatan Instruktur</h4>
                        <p className="text-sm text-indigo-800">Silakan baca keseluruhan modul sebelum mengerjakan kuis di akhir sesi. Pastikan Anda telah mengunduh resource pendamping via menu Dashboard.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <Button variant="ghost" className="text-gray-500" disabled>Materi Sebelumnya</Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">Tandai Selesai & Lanjut</Button>
                </div>
              </div>
            </div>
          )}

          {/* Quiz Type */}
          {type === "quiz" && (
            <div className="lg:col-span-3">
              <div className="max-w-3xl mx-auto mt-4">
                <Card className="shadow-sm border-gray-100 overflow-hidden">
                  <div className="h-32 bg-amber-500 flex items-center justify-center p-6 relative">
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                    <Copy className="w-12 h-12 text-white/90 z-10" />
                  </div>
                  <CardContent className="p-8 text-center pt-10">
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none mb-4 uppercase tracking-wider text-xs font-bold">Kuis Evaluasi</Badge>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3">{materialData.title}</h1>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">{materialData.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 text-left">
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-500 font-medium mb-1">Jumlah</p>
                        <p className="text-lg font-bold text-gray-900">20 Soal</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-500 font-medium mb-1">Durasi</p>
                        <p className="text-lg font-bold text-gray-900">30 Menit</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-500 font-medium mb-1">Passing Grade</p>
                        <p className="text-lg font-bold text-amber-600">75%</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <p className="text-xs text-gray-500 font-medium mb-1">Tipe</p>
                        <p className="text-lg font-bold text-gray-900">Pilihan Ganda</p>
                      </div>
                    </div>

                    <div className="bg-amber-50 rounded-xl p-5 mb-8 text-left border border-amber-100/50">
                      <h4 className="font-semibold text-amber-900 mb-2 text-sm">Instruksi Kuis:</h4>
                      <ul className="text-sm text-amber-800 space-y-1.5 list-disc list-inside">
                        <li>Kuis ini memiliki batas waktu. Waktu akan berjalan setelah Anda menekan tombol mulai.</li>
                        <li>Pastikan koneksi internet stabil sebelum memulai.</li>
                        <li>Anda hanya memiliki 2 (dua) kali kesempatan percobaan ulang.</li>
                      </ul>
                    </div>

                    <Button className="w-full sm:w-auto px-8 bg-amber-500 hover:bg-amber-600 text-white shadow-md text-base h-12 rounded-xl">
                      Mulai Kerjakan Kuis
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}