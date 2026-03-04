"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, Save, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import YooptaEditor from "@/components/editor/yoopta-editor";

export default function EditMaterialPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [title, setTitle] = useState("Pengenalan Next.js 15 dan App Router");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isLoading && user && user.role !== "dosen") router.replace("/dashboard/home");
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "dosen") return null;

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      router.push("/dosen/materials");
    }, 1000);
  };

  return (
    <div className="h-[calc(100vh-64px)] lg:h-screen flex flex-col bg-slate-50">
      {/* Editor Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <Link href="/dosen/materials" className="p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors shrink-0">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex-1 min-w-0 max-w-xl">
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)}
              className="font-semibold text-lg border-transparent hover:border-gray-200 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all bg-transparent rounded-lg px-2 shadow-none"
              placeholder="Judul Materi..."
            />
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline" className="hidden sm:flex text-gray-600 bg-white">
            <Globe className="w-4 h-4 mr-2 text-gray-400" />
            Pengaturan Publikasi
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-indigo-600 hover:bg-indigo-700">
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Menyimpan..." : "Simpan Konten"}
          </Button>
        </div>
      </header>

      {/* Editor Canvas */}
      <div className="flex-1 overflow-y-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto bg-white min-h-[60vh] rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 lg:p-16">
          <YooptaEditor 
            value={undefined}
            readOnly={false}
            isReady={true}
          />
        </div>
      </div>
    </div>
  );
}
