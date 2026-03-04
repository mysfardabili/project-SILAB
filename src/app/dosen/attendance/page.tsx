"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DOSEN_CLASSES } from "@/lib/mockData";
import {
  RefreshCw, QrCode, Copy, Check, Users, Clock, CheckCircle2,
  XCircle, AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { QRCodeCanvas } from "qrcode.react";

// Use centralized DOSEN_CLASSES — add session info dynamically
const CLASSES = DOSEN_CLASSES.map((c, i) => ({
  ...c,
  session: `Pertemuan ${8 - i} — 5 Maret 2026`,
}));

type AttStatus = "hadir" | "izin" | "alfa";
interface Student {
  id: string; name: string; nim: string; status: AttStatus; checkinTime?: string;
}

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const MOCK_STUDENTS: Student[] = [
  { id: "s1", name: "Andi Wijaya", nim: "2021010001", status: "hadir", checkinTime: "08:05" },
  { id: "s2", name: "Bella Rahayu", nim: "2021010002", status: "hadir", checkinTime: "08:07" },
  { id: "s3", name: "Candra Kusuma", nim: "2021010003", status: "alfa" },
  { id: "s4", name: "Desy Maulida", nim: "2021010004", status: "hadir", checkinTime: "08:12" },
  { id: "s5", name: "Eko Prasetyo", nim: "2021010005", status: "izin" },
  { id: "s6", name: "Fira Nanda", nim: "2021010006", status: "hadir", checkinTime: "08:15" },
  { id: "s7", name: "Gilang Ramadan", nim: "2021010007", status: "hadir", checkinTime: "08:08" },
  { id: "s8", name: "Hana Pertiwi", nim: "2021010008", status: "alfa" },
];

const STATUS_STYLES: Record<AttStatus, { badge: string; label: string }> = {
  hadir: { badge: "bg-emerald-100 text-emerald-700", label: "Hadir" },
  izin: { badge: "bg-yellow-100 text-yellow-700", label: "Izin" },
  alfa: { badge: "bg-red-100 text-red-700", label: "Alfa" },
};

export default function DosenAttendancePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState(CLASSES[0]?.id ?? "c1");
  const [code, setCode] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const [copied, setCopied] = useState(false);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isLoading && user && user.role !== "dosen") router.replace("/dashboard/home");
  }, [user, isLoading, router]);

  useEffect(() => {
    if (countdown > 0) {
      intervalRef.current = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(intervalRef.current!);
            setCode(null);
            return 0;
          }
          return c - 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [countdown]);

  const handleGenerate = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCode(generateCode());
    setCountdown(300); // 5 minutes
  };

  const handleCopy = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStatusChange = (id: string, status: AttStatus) => {
    setStudents((prev) => prev.map((s) => s.id === id ? { ...s, status } : s));
  };

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const hadir = students.filter((s) => s.status === "hadir").length;
  const izin = students.filter((s) => s.status === "izin").length;
  const alfa = students.filter((s) => s.status === "alfa").length;

  if (isLoading || !user || user.role !== "dosen") return null;

  const currentClass = CLASSES.find((c) => c.id === selectedClass)!;

  return (
    <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Absensi</h1>
          <p className="text-gray-500 text-sm mt-1">Generate kode check-in dan pantau kehadiran mahasiswa.</p>
        </div>
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-56 bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CLASSES.map((c) => (
              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Code Generator */}
        <div className="space-y-4">
          <Card className="shadow-sm border-gray-100">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Generate Kode Check-in</CardTitle>
              <p className="text-xs text-gray-500">{currentClass.session}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {code ? (
                <>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
                    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                      <QRCodeCanvas 
                        value={`silab-checkin:${code}`} 
                        size={160}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"Q"}
                        includeMargin={false}
                      />
                    </div>
                    <div className="text-center sm:text-left space-y-2">
                       <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Kode Manual</p>
                       <div className="inline-block bg-indigo-50 border border-indigo-100 rounded-xl px-6 py-4">
                         <p className="text-4xl font-bold font-mono tracking-[0.2em] text-indigo-700">{code}</p>
                       </div>
                    </div>
                  </div>
                  <div className={`flex items-center justify-center gap-2 text-sm font-medium ${countdown < 60 ? "text-red-600" : "text-gray-600"}`}>
                    <Clock className="w-4 h-4" />
                    Kode berlaku {formatTime(countdown)}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={handleCopy}>
                      {copied ? <Check className="w-4 h-4 mr-1 text-emerald-600" /> : <Copy className="w-4 h-4 mr-1" />}
                      {copied ? "Tersalin!" : "Salin"}
                    </Button>
                    <Button variant="outline" className="flex-1" onClick={handleGenerate}>
                      <RefreshCw className="w-4 h-4 mr-1" /> Perbarui
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto">
                    <QrCode className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500">Kode belum dibuat. Tekan tombol di bawah untuk memulai sesi absensi.</p>
                  <Button onClick={handleGenerate} className="w-full bg-indigo-600 hover:bg-indigo-700">
                    <QrCode className="w-4 h-4 mr-2" /> Generate Kode
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="shadow-sm border-gray-100">
            <CardContent className="p-5 space-y-3">
              <h3 className="font-semibold text-sm text-gray-700 mb-2">Rekap Kehadiran</h3>
              {[
                { label: "Hadir", count: hadir, color: "emerald", icon: CheckCircle2 },
                { label: "Izin", count: izin, color: "yellow", icon: AlertCircle },
                { label: "Alfa", count: alfa, color: "red", icon: XCircle },
              ].map(({ label, count, color, icon: Icon }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 text-${color}-500`} />
                    <span className="text-sm text-gray-700">{label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className={`h-full bg-${color}-500 rounded-full`} style={{ width: `${(count / students.length) * 100}%` }} />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-6 text-right">{count}</span>
                  </div>
                </div>
              ))}
              <p className="text-xs text-gray-400 pt-1">Total: {students.length} mahasiswa</p>
            </CardContent>
          </Card>
        </div>

        {/* Student List */}
        <div className="lg:col-span-2">
          <Card className="shadow-sm border-gray-100">
            <CardHeader className="pb-3 border-b border-gray-50">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600" /> Daftar Kehadiran
                </CardTitle>
                <Badge className="bg-emerald-100 text-emerald-700 border-none">
                  {hadir}/{students.length} Hadir
                </Badge>
              </div>
            </CardHeader>
            <div className="divide-y divide-gray-50">
              {students.map((s) => (
                <div key={s.id} className="flex items-center justify-between px-5 py-3 hover:bg-gray-50 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{s.name}</p>
                    <p className="text-xs text-gray-500">{s.nim}{s.checkinTime ? ` · Check-in ${s.checkinTime}` : ""}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`border-none text-xs ${STATUS_STYLES[s.status].badge}`}>
                      {STATUS_STYLES[s.status].label}
                    </Badge>
                    <Select value={s.status} onValueChange={(v) => handleStatusChange(s.id, v as AttStatus)}>
                      <SelectTrigger className="w-24 h-7 text-xs border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hadir">Hadir</SelectItem>
                        <SelectItem value="izin">Izin</SelectItem>
                        <SelectItem value="alfa">Alfa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
