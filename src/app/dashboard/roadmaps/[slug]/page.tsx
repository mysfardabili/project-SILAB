import React from 'react';
import { getRoadmapBySlug } from '@/lib/roadmap-data';
import { notFound } from 'next/navigation';
import RoadmapFlow from './_components/RoadmapFlow'; // Ini komponen yang akan kita buat selanjutnya
import Link from 'next/link';
import { ArrowLeft, Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Next.js akan secara otomatis memberikan 'params' ke komponen halaman ini
type Props = {
  params: {
    slug: string; // 'slug' ini sesuai dengan nama folder '[slug]'
  };
};

// Ini adalah Server Component, berjalan di sisi server untuk mengambil data
const RoadmapDetailPage = ({ params }: Props) => {
  // 1. Ambil slug dari URL, contoh: "frontend-developer"
  const slug = params.slug;

  // 2. Panggil data dari library kita menggunakan slug tersebut
  const roadmap = getRoadmapBySlug(slug);

  // 3. Jika data tidak ditemukan, tampilkan halaman 404 Not Found
  if (!roadmap) {
    notFound();
  }

  // 4. Jika data ditemukan, render halaman dengan data tersebut
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header: Tombol kembali dan action buttons */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/dashboard/roadmaps" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            All Roadmaps
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Judul Roadmap */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-4">
                {roadmap.title}
                <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">BEGINNER FRIENDLY VERSION</span>
            </h1>
            <p className="text-gray-500 mt-1">{roadmap.description}</p>
        </div>

        {/* Komponen Interaktif (Client Component) untuk menampilkan alur roadmap */}
        {/* Kita teruskan data 'nodes' sebagai props */}
        <RoadmapFlow nodes={roadmap.nodes} />
      </div>
    </div>
  );
};

export default RoadmapDetailPage;