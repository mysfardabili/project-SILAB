import React from "react";
import Link from "next/link";
import { ArrowLeft, Download, FileText, Calendar, HardDrive, User, Clock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ResourceDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ResourceDetailPage({ params }: ResourceDetailPageProps) {
  const { id } = await params;

  // Mock fetching a specific resource by ID
  const resource = {
    id: id,
    title: "Database System Fundamentals",
    course: "Database Systems",
    type: "PDF",
    size: "4.2 MB",
    uploadedBy: "Dr. Robert Chen",
    uploadDate: "May 10, 2025",
    category: "E-Books",
    description: "Comprehensive guide to relational database design, normalization, and SQL optimization techniques. Required reading for Module 3 and 4.",
    downloads: 128,
    lastUpdated: "May 10, 2025"
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation */}
        <Link 
          href="/resources"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Link>

        {/* Resource Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                <div className="absolute -bottom-8 left-8">
                    <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center border border-gray-100">
                        <FileText className="h-8 w-8 text-indigo-500" />
                    </div>
                </div>
            </div>
            
            <div className="pt-12 px-8 pb-8">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-4 flex-1">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border-none">
                                    {resource.type}
                                </Badge>
                                <span className="text-sm font-medium text-indigo-600">{resource.course}</span>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                                {resource.title}
                            </h1>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                            {resource.description}
                        </p>
                    </div>

                    <div className="flex-shrink-0 flex flex-col gap-3">
                        <Button className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200">
                            <Download className="mr-2 h-4 w-4" /> Download File
                        </Button>
                        <p className="text-xs text-center text-gray-500 font-medium">
                            {resource.size} • {resource.downloads} downloads
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Resource Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">File Information</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                                <User className="h-4 w-4" /> Uploaded By
                            </p>
                            <p className="font-medium text-gray-900">{resource.uploadedBy}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                                <Calendar className="h-4 w-4" /> Upload Date
                            </p>
                            <p className="font-medium text-gray-900">{resource.uploadDate}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                                <HardDrive className="h-4 w-4" /> File Size
                            </p>
                            <p className="font-medium text-gray-900">{resource.size}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 flex items-center gap-2 mb-1">
                                <Clock className="h-4 w-4" /> Last Updated
                            </p>
                            <p className="font-medium text-gray-900">{resource.lastUpdated}</p>
                        </div>
                    </div>
                </div>

                {/* Optional Preview Placeholder */}
                <div className="bg-gray-100/50 rounded-2xl border border-gray-200 border-dashed p-12 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                        <FileText className="h-6 w-6 text-gray-400" />
                    </div>
                    <h4 className="text-gray-700 font-medium mb-1">Document Preview Unavailable</h4>
                    <p className="text-sm text-gray-500 max-w-sm">
                        Preview is currently not supported for this file type. Please download the file to view its contents.
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Security</h3>
                    <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 p-2 rounded-lg shrink-0">
                            <ShieldCheck className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Scanned for Viruses</p>
                            <p className="text-xs text-gray-500 mt-1">This file was scanned by the system and is safe to download.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
