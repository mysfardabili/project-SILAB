"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Send, Tag, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const COURSES = ["Teknologi Web", "Basis Data", "Pemrograman Web", "Struktur Data", "Rekayasa Perangkat Lunak"];
const SUGGESTED_TAGS = ["Next.js", "React", "JavaScript", "Python", "SQL", "Database", "HTML/CSS", "Git", "Algoritma"];

export default function NewDiscussionPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ title: "", course: "", body: "" });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const addTag = (tag: string) => {
    const clean = tag.trim();
    if (clean && !tags.includes(clean) && tags.length < 5) {
      setTags((prev) => [...prev, clean]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => setTags((prev) => prev.filter((t) => t !== tag));

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); addTag(tagInput); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.body) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setTimeout(() => router.push("/dashboard/home/discussions"), 1500);
  };

  if (submitted) {
    return (
      <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 flex items-center justify-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <MessageSquare className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Diskusi berhasil dibuat!</h2>
          <p className="text-gray-500 text-sm">Mengalihkan ke halaman diskusi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6 max-w-3xl">
      <Link
        href="/dashboard/home/discussions"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke Diskusi
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-900">Buat Diskusi Baru</h1>
        <p className="text-gray-500 text-sm mt-1">Ajukan pertanyaan atau mulai diskusi dengan teman dan dosen.</p>
      </div>

      <Card className="shadow-sm border-gray-100">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Author info */}
            {user && (
              <div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-xl text-sm text-indigo-700">
                <MessageSquare className="w-4 h-4" />
                Berdiskusi sebagai <span className="font-semibold">{user.name}</span>
              </div>
            )}

            <div className="space-y-1">
              <Label>Judul Diskusi <span className="text-red-500">*</span></Label>
              <Input
                required
                placeholder="cth. Bagaimana cara menggunakan useState dengan TypeScript?"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="text-base"
              />
              <p className="text-xs text-gray-400">{form.title.length}/150 karakter</p>
            </div>

            <div className="space-y-1">
              <Label>Mata Kuliah (Opsional)</Label>
              <Select value={form.course} onValueChange={(v) => setForm((f) => ({ ...f, course: v }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih mata kuliah terkait..." />
                </SelectTrigger>
                <SelectContent>
                  {COURSES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label>Deskripsi <span className="text-red-500">*</span></Label>
              <Textarea
                required
                placeholder="Jelaskan pertanyaan atau topik diskusi Anda secara detail. Semakin jelas, semakin mudah dijawab..."
                rows={6}
                className="resize-none"
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label className="flex items-center gap-1"><Tag className="w-3.5 h-3.5" /> Tag (maksimal 5)</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((t) => (
                  <Badge
                    key={t}
                    className="bg-indigo-100 text-indigo-700 border-none pr-1.5 flex items-center gap-1"
                  >
                    {t}
                    <button type="button" onClick={() => removeTag(t)}>
                      <X className="w-3 h-3 hover:text-red-500" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Tambah tag... (Enter untuk konfirmasi)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                disabled={tags.length >= 5}
              />
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs text-gray-400">Saran:</span>
                {SUGGESTED_TAGS.filter((t) => !tags.includes(t)).slice(0, 6).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => addTag(t)}
                    className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full hover:bg-indigo-100 hover:text-indigo-700 transition-colors"
                  >
                    + {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button variant="outline" type="button" asChild className="flex-1">
                <Link href="/dashboard/home/discussions">Batal</Link>
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                disabled={submitting || !form.title || !form.body}
              >
                {submitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Mengirim...
                  </span>
                ) : (
                  <><Send className="w-4 h-4 mr-2" /> Buat Diskusi</>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}