"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center mb-4">
          <Image
            src="/silab-logo.svg"
            alt="SI Lab"
            width={180}
            height={48}
            priority
            className="dark:invert"
          />
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <div className="h-16 w-16 bg-amber-50 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="h-8 w-8 text-amber-500" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight mb-2">Terjadi Kesalahan</h1>
          <p className="text-sm text-gray-500 mb-8 max-w-sm">
            Maaf, kami mengalami masalah teknis yang tidak terduga saat memuat halaman ini.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button
              onClick={() => reset()}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
              <RefreshCcw className="w-4 h-4" />
              Coba Lagi
            </button>
            <Link 
              href="/login" 
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition-colors"
            >
              Kembali
            </Link>
          </div>
        </div>
        
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Universitas Ahmad Dahlan. Hak Cipta Dilindungi.
        </p>
      </div>
    </div>
  );
}
