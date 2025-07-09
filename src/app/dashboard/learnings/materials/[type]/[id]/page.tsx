"use client";

import Link from "next/link";
import { ArrowLeft, BookOpen, Copy, LineChart, Layers, Clock, FileText, Download, Upload, Calendar } from "lucide-react";
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Assignment Header */}
            <div className="bg-blue-500 text-white rounded-lg p-6">
              <h1 className="text-2xl font-bold mb-2">{assignment.title}</h1>
              <p className="text-blue-100">{assignment.subtitle}</p>
            </div>

            {/* Assignment Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Deskripsi Tugas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {assignment.description}
                </p>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Kriteria Penilaian:</h3>
                  <ul className="space-y-2">
                    {assignment.criteria.map((criterion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">
                          {criterion.item} <span className="font-medium">({criterion.percentage}%)</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Deadline Info */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900">Batas Waktu</p>
                    <p className="text-blue-700 text-lg font-bold">{assignment.dueDate}</p>
                    <p className="text-blue-600 text-sm">{assignment.timeRemaining}</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {assignment.daysLeft}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* File Formats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-500" />
                  Format File yang Diizinkan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  {assignment.allowedFormats.map((format, index) => (
                    <Badge key={index} variant="outline" className="bg-gray-50">
                      {format}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Template Files */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5 text-blue-500" />
                  File Lampiran
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {assignment.templateFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{file.icon}</div>
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">{file.size}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Submission Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Pengumpulan Tugas</CardTitle>
                <p className="text-sm text-gray-600">Submit your assignment</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-gray-50 rounded-lg flex items-center gap-3">
                  <FileText className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{assignment.status}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status</span>
                    <span className="text-gray-900">{assignment.submissionStatus}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Waktu Submit</span>
                    <span className="text-gray-900">{assignment.submissionDate}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Waktu Submit</span>
                    <span className="text-gray-900">{assignment.submissionDate}</span>
                  </div>
                </div>

                {/* File Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragOver 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 bg-gray-50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Drag & Drop file di sini
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    atau klik untuk memilih file
                  </p>
                  <input type="file" className="hidden" id="file-upload" />
                  <label htmlFor="file-upload">
                    <Button variant="outline" size="sm" className="cursor-pointer">
                      Choose File
                    </Button>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    Kirim Tugas
                  </Button>
                  <Button variant="outline" className="flex-1 text-blue-600 border-blue-600">
                    Simpan Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}