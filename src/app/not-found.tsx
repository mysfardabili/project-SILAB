import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFound() {
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
          <div className="h-16 w-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
          
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">404</h1>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Halaman Tidak Ditemukan</h2>
          <p className="text-sm text-gray-500 mb-8 max-w-sm">
            Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
          </p>
          
          <Link 
            href="/login" 
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors w-full justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
        </div>
        
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} Universitas Ahmad Dahlan. Hak Cipta Dilindungi.
        </p>
      </div>
    </div>
  );
}
