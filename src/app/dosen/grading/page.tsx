"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Download, Search, TrendingUp, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const CLASSES = [
  { id: "c1", name: "Teknologi Web" },
  { id: "c2", name: "Basis Data" },
  { id: "c3", name: "Pemrograman Web" },
];

interface StudentGrade {
  id: string;
  name: string;
  nim: string;
  tugas1: number | null;
  tugas2: number | null;
  uts: number | null;
  uas: number | null;
}

const INITIAL_GRADES: StudentGrade[] = [
  { id: "s1", name: "Andi Wijaya", nim: "2021010001", tugas1: 85, tugas2: 90, uts: 78, uas: null },
  { id: "s2", name: "Bella Rahayu", nim: "2021010002", tugas1: 92, tugas2: 88, uts: 85, uas: null },
  { id: "s3", name: "Candra Kusuma", nim: "2021010003", tugas1: 70, tugas2: 75, uts: 65, uas: null },
  { id: "s4", name: "Desy Maulida", nim: "2021010004", tugas1: 95, tugas2: 92, uts: 90, uas: null },
  { id: "s5", name: "Eko Prasetyo", nim: "2021010005", tugas1: 75, tugas2: 80, uts: 72, uas: null },
  { id: "s6", name: "Fira Nanda", nim: "2021010006", tugas1: 88, tugas2: 85, uts: 82, uas: null },
];

function calcFinal(g: StudentGrade): number | null {
  const { tugas1, tugas2, uts, uas } = g;
  if (tugas1 === null || tugas2 === null || uts === null || uas === null) return null;
  return Math.round(0.15 * tugas1 + 0.15 * tugas2 + 0.30 * uts + 0.40 * uas);
}

function toGrade(score: number | null): string {
  if (score === null) return "—";
  if (score >= 90) return "A";
  if (score >= 80) return "B+";
  if (score >= 75) return "B";
  if (score >= 70) return "C+";
  if (score >= 60) return "C";
  return "D";
}

export default function DosenGradingPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [grades, setGrades] = useState<StudentGrade[]>(INITIAL_GRADES);
  const [selectedClass, setSelectedClass] = useState("c1");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Record<string, Partial<StudentGrade>>>({});

  useEffect(() => {
    if (!isLoading && user && user.role !== "dosen") router.replace("/dashboard/home");
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "dosen") return null;

  const filtered = grades.filter(
    (g) =>
      g.name.toLowerCase().includes(search.toLowerCase()) ||
      g.nim.includes(search)
  );

  const handleEdit = (id: string, field: keyof StudentGrade, raw: string) => {
    const val = raw === "" ? null : Number(raw);
    setEditing((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? {}), [field]: val },
    }));
  };

  const handleSave = (id: string) => {
    const changes = editing[id];
    if (!changes) return;
    setGrades((prev) => prev.map((g) => g.id === id ? { ...g, ...changes } : g));
    setEditing((prev) => { const n = { ...prev }; delete n[id]; return n; });
  };

  const handleExportCSV = () => {
    const rows = [
      ["NIM", "Nama", "Tugas 1", "Tugas 2", "UTS", "UAS", "Akhir", "Grade"],
      ...grades.map((g) => {
        const fin = calcFinal(g);
        return [g.nim, g.name, g.tugas1 ?? "", g.tugas2 ?? "", g.uts ?? "", g.uas ?? "", fin ?? "", toGrade(fin)];
      }),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "rekap-nilai.csv"; a.click();
  };

  return (
    <div className="px-6 md:px-10 py-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Penilaian</h1>
          <p className="text-gray-500 text-sm mt-1">Input dan kelola nilai mahasiswa per kelas.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-48 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CLASSES.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="bg-indigo-50 rounded-xl p-4 text-sm text-indigo-700 flex items-start gap-2">
        <TrendingUp className="w-4 h-4 shrink-0 mt-0.5" />
        <span>Formula nilai akhir: 15% Tugas 1 + 15% Tugas 2 + 30% UTS + 40% UAS. Klik nilai untuk mengeditnya.</span>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Cari mahasiswa / NIM..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Table */}
      <Card className="shadow-sm border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Mahasiswa</th>
                {["Tugas 1", "Tugas 2", "UTS", "UAS"].map((h) => (
                  <th key={h} className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">{h}</th>
                ))}
                <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Akhir</th>
                <th className="text-center px-3 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Grade</th>
                <th className="px-3 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((g) => {
                const ev = editing[g.id];
                const current: StudentGrade = ev ? { ...g, ...ev } : g;
                const final = calcFinal(current);
                const hasEdits = !!ev;

                return (
                  <tr key={g.id} className={`hover:bg-gray-50 transition-colors ${hasEdits ? "bg-amber-50/40" : ""}`}>
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-900">{g.name}</p>
                      <p className="text-xs text-gray-400">{g.nim}</p>
                    </td>
                    {(["tugas1", "tugas2", "uts", "uas"] as const).map((f) => (
                      <td key={f} className="px-3 py-3 text-center">
                        <input
                          type="number"
                          min={0}
                          max={100}
                          value={(ev?.[f] !== undefined ? ev[f] : g[f]) ?? ""}
                          onChange={(e) => handleEdit(g.id, f, e.target.value)}
                          className="w-16 text-center border border-gray-200 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        />
                      </td>
                    ))}
                    <td className="px-3 py-3 text-center font-bold text-gray-900">{final ?? "—"}</td>
                    <td className="px-3 py-3 text-center">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${
                        final === null ? "bg-gray-100 text-gray-500"
                        : final >= 80 ? "bg-emerald-100 text-emerald-700"
                        : final >= 60 ? "bg-amber-100 text-amber-700"
                        : "bg-red-100 text-red-700"
                      }`}>
                        {toGrade(final)}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      {hasEdits && (
                        <button
                          onClick={() => handleSave(g.id)}
                          className="text-xs font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2 py-1 rounded-md"
                        >
                          Simpan
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
