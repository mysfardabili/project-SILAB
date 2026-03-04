"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Plus, Search, MessageSquare, Pin, CheckCircle2, ChevronRight, ThumbsUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Discussion {
  id: string;
  title: string;
  course: string;
  author: string;
  timestamp: string;
  replies: number;
  pinned: boolean;
  hasAnswer: boolean;
  upvotes: number;
  preview: string;
}

const INITIAL: Discussion[] = [
  { id: "d1", title: "Cara deploy Next.js ke Vercel?", course: "Teknologi Web", author: "Andi Wijaya", timestamp: "2 jam lalu", replies: 5, pinned: false, hasAnswer: false, upvotes: 8, preview: "Saya sudah coba deploy tapi error saat build. Apakah ada yang bisa bantu?" },
  { id: "d2", title: "Perbedaan LEFT JOIN dan RIGHT JOIN?", course: "Basis Data", author: "Bella Rahayu", timestamp: "5 jam lalu", replies: 3, pinned: true, hasAnswer: true, upvotes: 12, preview: "Tolong jelaskan perbedaan antara LEFT JOIN dan RIGHT JOIN dengan contoh kasus nyata." },
  { id: "d3", title: "Next.js App Router vs Pages Router", course: "Teknologi Web", author: "Candra Kusuma", timestamp: "1 hari lalu", replies: 7, pinned: false, hasAnswer: false, upvotes: 15, preview: "Kapan sebaiknya menggunakan App Router dibandingkan Pages Router pada proyek baru?" },
  { id: "d4", title: "Query optimasi untuk tabel jutaan baris", course: "Basis Data", author: "Desy Maulida", timestamp: "2 hari lalu", replies: 4, pinned: false, hasAnswer: true, upvotes: 10, preview: "Bagaimana cara mengoptimasi query SELECT yang berjalan lambat pada tabel dengan data besar?" },
  { id: "d5", title: "Penggunaan useState vs useReducer", course: "Pemrograman Web", author: "Eko Prasetyo", timestamp: "3 hari lalu", replies: 2, pinned: false, hasAnswer: false, upvotes: 6, preview: "Kapan saya harus menggunakan useReducer dibandingkan useState?" },
];

export default function DosenDiscussionsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [discussions, setDiscussions] = useState<Discussion[]>(INITIAL);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!isLoading && user && user.role !== "dosen") router.replace("/dashboard/home");
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "dosen") return null;

  const togglePin = (id: string) => {
    setDiscussions((prev) => prev.map((d) => d.id === id ? { ...d, pinned: !d.pinned } : d));
  };
  const markAnswer = (id: string) => {
    setDiscussions((prev) => prev.map((d) => d.id === id ? { ...d, hasAnswer: !d.hasAnswer } : d));
  };

  const filtered = discussions
    .filter((d) =>
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.course.toLowerCase().includes(search.toLowerCase()) ||
      d.author.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div className="px-6 md:px-10 py-8 max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Diskusi Kelas</h1>
          <p className="text-gray-500 text-sm mt-1">{discussions.length} diskusi dari semua kelas Anda</p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input placeholder="Cari diskusi..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="space-y-3">
        {filtered.map((d) => (
          <Card key={d.id} className={`shadow-sm border-gray-100 hover:shadow-md transition-shadow ${d.pinned ? "border-l-4 border-l-indigo-500" : ""}`}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <Avatar className="w-9 h-9 shrink-0">
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-sm font-medium">
                    {d.author.split(" ").map((p) => p[0]).join("").slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    <h3 className="font-semibold text-gray-900 flex-1">{d.title}</h3>
                    <div className="flex gap-1">
                      {d.pinned && <Badge className="bg-indigo-100 text-indigo-700 border-none text-xs">📌 Pinned</Badge>}
                      {d.hasAnswer && <Badge className="bg-emerald-100 text-emerald-700 border-none text-xs">✅ Terjawab</Badge>}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 mb-2">
                    <span className="font-medium text-indigo-600">{d.course}</span> · {d.author} · {d.timestamp}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">{d.preview}</p>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <MessageSquare className="w-3.5 h-3.5" /> {d.replies} balasan
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <ThumbsUp className="w-3.5 h-3.5" /> {d.upvotes}
                    </span>
                    <div className="flex-1" />
                    <button
                      onClick={() => togglePin(d.id)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${d.pinned ? "bg-indigo-100 text-indigo-700" : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"}`}
                    >
                      {d.pinned ? "Unpin" : "📌 Pin"}
                    </button>
                    <button
                      onClick={() => markAnswer(d.id)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-md transition-colors ${d.hasAnswer ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"}`}
                    >
                      {d.hasAnswer ? "✅ Terjawab" : "Tandai Terjawab"}
                    </button>
                    <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1">
                      Balas <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
