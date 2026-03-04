"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, FileText, Upload, CheckCircle2, Clock, XCircle, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

type ReqStatus = "pending" | "approved" | "rejected";

interface SubmittedRequest {
  id: string;
  date: string;
  course: string;
  reason: string;
  status: ReqStatus;
  submittedAt: string;
  note?: string;
}

const REASONS = ["Sakit", "Keperluan Keluarga", "Kecelakaan", "Kegiatan Akademik Resmi", "Izin Lainnya"];

const MOCK_HISTORY: SubmittedRequest[] = [
  { id: "r1", date: "15 Feb 2026", course: "Teknologi Web", reason: "Sakit", status: "approved", submittedAt: "17 Feb 2026", note: "Disetujui oleh Dr. Ahmad" },
  { id: "r2", date: "3 Jan 2026", course: "Basis Data", reason: "Keperluan Keluarga", status: "rejected", submittedAt: "5 Jan 2026", note: "Keterangan kurang lengkap" },
  { id: "r3", date: "20 Feb 2026", course: "Pemrograman Web", reason: "Sakit", status: "pending", submittedAt: "22 Feb 2026" },
];

const STATUS_CONFIG: Record<ReqStatus, { label: string; badge: string; icon: typeof Clock }> = {
  pending: { label: "Menunggu", badge: "bg-amber-100 text-amber-700", icon: Clock },
  approved: { label: "Disetujui", badge: "bg-emerald-100 text-emerald-700", icon: CheckCircle2 },
  rejected: { label: "Ditolak", badge: "bg-red-100 text-red-700", icon: XCircle },
};

export default function AttendanceCorrectionPage() {
  const [history, setHistory] = useState<SubmittedRequest[]>(MOCK_HISTORY);
  const [form, setForm] = useState({ date: "", course: "", reason: "", note: "" });
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.course || !form.reason) return;
    const newReq: SubmittedRequest = {
      id: `r${Date.now()}`,
      date: form.date,
      course: form.course,
      reason: form.reason,
      status: "pending",
      submittedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    };
    setHistory((prev) => [newReq, ...prev]);
    setForm({ date: "", course: "", reason: "", note: "" });
    setFileName(null);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/attendance" className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Absensi
        </Link>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Koreksi Absensi</h1>
        <p className="text-gray-500 text-sm mt-1">Ajukan permintaan koreksi untuk ketidakhadiran yang sah.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm border-gray-100 sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Send className="w-4 h-4 text-indigo-600" /> Form Pengajuan
              </CardTitle>
            </CardHeader>
            <CardContent>
              {submitted ? (
                <div className="py-8 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <p className="text-emerald-700 font-semibold">Pengajuan berhasil dikirim!</p>
                  <p className="text-sm text-gray-500">Mohon tunggu konfirmasi dari dosen.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <Label>Tanggal Tidak Hadir</Label>
                    <Input
                      type="date"
                      required
                      value={form.date}
                      onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Mata Kuliah</Label>
                    <Select value={form.course} onValueChange={(v) => setForm((f) => ({ ...f, course: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih mata kuliah..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Teknologi Web">Teknologi Web</SelectItem>
                        <SelectItem value="Basis Data">Basis Data</SelectItem>
                        <SelectItem value="Pemrograman Web">Pemrograman Web</SelectItem>
                        <SelectItem value="Struktur Data">Struktur Data</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Alasan Ketidakhadiran</Label>
                    <Select value={form.reason} onValueChange={(v) => setForm((f) => ({ ...f, reason: v }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih alasan..." />
                      </SelectTrigger>
                      <SelectContent>
                        {REASONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <Label>Keterangan Tambahan</Label>
                    <Textarea
                      placeholder="Jelaskan alasan ketidakhadiran Anda secara lebih rinci..."
                      rows={3}
                      className="resize-none"
                      value={form.note}
                      onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-1">
                    <Label>Lampiran (Opsional)</Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-indigo-300 transition-colors cursor-pointer">
                      <label className="cursor-pointer space-y-2 block">
                        <Upload className="w-7 h-7 text-gray-400 mx-auto" />
                        <p className="text-sm text-gray-500">
                          {fileName ? (
                            <span className="text-indigo-600 font-medium">{fileName}</span>
                          ) : (
                            <>Klik untuk unggah dokumen<br /><span className="text-xs">PDF, JPG, PNG (max 5 MB)</span></>
                          )}
                        </p>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                        />
                      </label>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <Send className="w-4 h-4 mr-2" /> Kirim Pengajuan
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* History */}
        <div className="lg:col-span-3 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Riwayat Pengajuan</h2>
          {history.map((req) => {
            const sc = STATUS_CONFIG[req.status];
            const Icon = sc.icon;
            return (
              <Card key={req.id} className="shadow-sm border-gray-100">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <p className="font-semibold text-gray-900">{req.course}</p>
                        <Badge className={`border-none text-xs ${sc.badge}`}>
                          <Icon className="w-3 h-3 mr-1" /> {sc.label}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {req.date}</span>
                        <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> {req.reason}</span>
                      </div>
                      {req.note && (
                        <p className={`mt-2 text-sm px-3 py-2 rounded-lg ${
                          req.status === "approved" ? "bg-emerald-50 text-emerald-700" :
                          req.status === "rejected" ? "bg-red-50 text-red-700" :
                          "bg-gray-50 text-gray-600"
                        }`}>
                          {req.note}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 shrink-0">Diajukan {req.submittedAt}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {history.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-medium">Belum ada pengajuan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
