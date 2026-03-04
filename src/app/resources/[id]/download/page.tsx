"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { use } from "react";

interface ResourceDownloadPageProps {
  params: Promise<{ id: string }>;
}

export default function ResourceDownloadPage({ params: paramsPromise }: ResourceDownloadPageProps) {
  const params = use(paramsPromise);
  const [status, setStatus] = useState<"idle" | "downloading" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const handleDownload = () => {
    setStatus("downloading");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStatus("done");
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

        {/* Gradient Header */}
        <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
          <div className="h-14 w-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <FileText className="h-7 w-7 text-white" />
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <p className="text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-1">Resource #{params.id}</p>
            <h1 className="text-xl font-bold text-gray-900">Download File</h1>
            <p className="text-sm text-gray-500 mt-1">
              Your file is ready. Click the button below to start the download.
            </p>
          </div>

          {/* File Info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 border border-gray-100">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">File name</span>
              <span className="font-medium text-gray-900">resource-{params.id}.pdf</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">File type</span>
              <span className="font-medium text-gray-900">PDF Document</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">File size</span>
              <span className="font-medium text-gray-900">4.2 MB</span>
            </div>
          </div>

          {/* Download Area */}
          {status === "idle" && (
            <Button
              onClick={handleDownload}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 h-11"
            >
              <Download className="mr-2 h-4 w-4" />
              Start Download
            </Button>
          )}

          {status === "downloading" && (
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Downloading...</span>
                <span className="font-medium">{progress}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div
                  className="h-2.5 rounded-full bg-indigo-500 transition-all duration-150"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {status === "done" && (
            <div className="text-center space-y-3">
              <div className="h-14 w-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Download Complete!</h3>
              <p className="text-sm text-gray-500">Your file has been downloaded successfully.</p>
              <Button
                variant="outline"
                onClick={handleDownload}
                className="w-full border-gray-200 text-gray-600 hover:bg-gray-50"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Again
              </Button>
            </div>
          )}

          <div className="pt-2 text-center">
            <Link
              href={`/resources/${params.id}`}
              className="inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to resource details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
