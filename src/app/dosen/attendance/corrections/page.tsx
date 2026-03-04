"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  CheckCircle2, XCircle, Clock, Search, Filter,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type ReqStatus = "pending" | "approved" | "rejected";

interface CorrectionRequest {
  id: string;
  student: string;
  nim: string;
  course: string;
  date: string;
  reason: string;
  note: string;
  status: ReqStatus;
  submittedAt: string;
}

const INITIAL_REQUESTS: CorrectionRequest[] = [
  { id: "r1", student: "Andi Wijaya", nim: "2021010001", course: "Teknologi Web", date: "20 Feb 2026", reason: "Sakit", note: "Saya sakit demam dan sudah ke dokter. Terlampir surat keterangan dokter.", status: "pending", submittedAt: "3 Mar 2026" },
  { id: "r2", student: "Sari Dewi", nim: "2021010015", course: "Basis Data", date: "18 Feb 2026", reason: "Keperluan Keluarga", note: "Ada acara keluarga mendadak yang tidak bisa ditinggalkan.", status: "pending", submittedAt: "2 Mar 2026" },
  { id: "r3", student: "Budi Santoso", nim: "2021010007", course: "Teknologi Web", date: "15 Feb 2026", reason: "Kecelakaan", note: "Saya mengalami kecelakaan di jalan saat hendak ke kampus.", status: "pending", submittedAt: "1 Mar 2026" },
  { id: "r4", student: "Citra Lestari", nim: "2021010022", course: "Pemrograman Web", date: "10 Feb 2026", reason: "Sakit", note: "Saya sakit flu berat.", status: "approved", submittedAt: "25 Feb 2026" },
  { id: "r5", student: "Dodi Prasetyo", nim: "2021010033", course: "Pemrograman Web", date: "8 Feb 2026", reason: "Izin Lainnya", note: "Mengikuti lomba di tingkat nasional.", status: "rejected", submittedAt: "20 Feb 2026" },
];

const STATUS_CONFIG: Record<ReqStatus, { label: string; badge: string }> = {
  pending: { label: "Pending", badge: "bg-amber-100 text-amber-700" },
  approved: { label: "Disetujui", badge: "bg-emerald-100 text-emerald-700" },
  rejected: { label: "Ditolak", badge: "bg-red-100 text-red-700" },
};

export default function DosenCorrectionsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<CorrectionRequest[]>(INITIAL_REQUESTS);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | ReqStatus>("all");

  useEffect(() => {
    if (!isLoading && user && user.role !== "dosen") router.replace("/dashboard/home");
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "dosen") return null;

  const handleAction = (id: string, action: "approved" | "rejected") => {
    setRequests((prev) => prev.map((r) => r.id === id ? { ...r, status: action } : r));
  };

  const filtered = requests.filter((r) => {
    const matchSearch = r.student.toLowerCase().includes(search.toLowerCase()) || r.course.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || r.status === filter;
    return matchSearch && matchFilter;
  });

  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <div className="px-6 md:px-10 py-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Request Koreksi Absensi</h1>
          <p className="text-gray-500 text-sm mt-1">{pendingCount} permintaan menunggu persetujuan</p>
        </div>
        <Badge className="bg-amber-100 text-amber-800 border-none px-3 py-1.5 text-sm self-start sm:self-auto">
          {pendingCount} Pending
        </Badge>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Cari mahasiswa / kelas..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2">
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === f ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}
            >
              {f === "all" ? "Semua" : STATUS_CONFIG[f].label}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.map((req) => (
          <Card key={req.id} className="shadow-sm border-gray-100">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <p className="font-semibold text-gray-900">{req.student}</p>
                    <span className="text-xs text-gray-400">{req.nim}</span>
                    <Badge className={`border-none text-xs ${STATUS_CONFIG[req.status].badge}`}>
                      {STATUS_CONFIG[req.status].label}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600 mb-3">
                    <span>📚 {req.course}</span>
                    <span>📅 Absen: {req.date}</span>
                    <span>🏷️ Alasan: {req.reason}</span>
                    <span className="text-xs text-gray-400">Diajukan: {req.submittedAt}</span>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-700 border border-gray-100">
                    <p className="font-medium text-gray-600 text-xs mb-1">Keterangan Mahasiswa:</p>
                    {req.note}
                  </div>
                </div>

                {req.status === "pending" && (
                  <div className="flex gap-2 sm:flex-col shrink-0">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 flex items-center gap-1.5"
                      onClick={() => handleAction(req.id, "approved")}
                    >
                      <CheckCircle2 className="w-4 h-4" /> Setujui
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-200 text-red-600 hover:bg-red-50 flex items-center gap-1.5"
                      onClick={() => handleAction(req.id, "rejected")}
                    >
                      <XCircle className="w-4 h-4" /> Tolak
                    </Button>
                  </div>
                )}
                {req.status !== "pending" && (
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${req.status === "approved" ? "bg-emerald-100" : "bg-red-100"}`}>
                    {req.status === "approved"
                      ? <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      : <XCircle className="w-4 h-4 text-red-600" />
                    }
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-14 text-gray-400">
            <Clock className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">Tidak ada permintaan ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
