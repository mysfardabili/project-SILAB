"use client";

import Link from "next/link";
import { ArrowLeft, User, Mail, Phone, MapPin, Calendar, Edit, Award, BookOpen, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { extractInitials } from "@/lib/stringUtils";

const STATIC_ACHIEVEMENTS = [
  { title: "Performa Terbaik", description: "Kelas Teknologi Web", date: "Okt 2025" },
  { title: "Kehadiran Sempurna", description: "Sistem Basis Data", date: "Sep 2025" },
  { title: "Proyek Unggulan", description: "Nilai Akhir A", date: "Agt 2025" },
];

const STATIC_SKILLS = ["JavaScript", "React", "Python", "SQL", "Git", "Next.js"];

const STATIC_STATS = {
  coursesCompleted: 12,
  totalStudyHours: 156,
  discussionPosts: 23,
  helpfulAnswers: 15,
};

export default function HomeProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  const nim = user.nim ?? user.nip ?? "—";
  const program = user.prodi ?? "Teknik Informatika";
  const semester = user.angkatan ? `Angkatan ${user.angkatan}` : "Semester 5";

  return (
    <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/home" className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
          <div className="flex items-center gap-2">
            <User className="h-6 w-6 text-indigo-500" />
            <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard/home/settings">
            <Button variant="outline" className="flex items-center gap-2">
              <Edit className="h-4 w-4" /> Pengaturan
            </Button>
          </Link>
          <Link href="/dashboard/home/profile/edit">
            <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
              <Edit className="h-4 w-4" /> Edit Profil
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <Avatar className="w-24 h-24 mx-auto border-2 border-indigo-100 shadow-sm">
                  <AvatarFallback className="text-xl font-semibold bg-indigo-100 text-indigo-800">
                    {extractInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-sm text-gray-500">{program} · {semester}</p>
                  <p className="text-xs text-gray-400 mt-0.5">ID: {nim}</p>
                </div>
                <div className="flex justify-center">
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 border-none capitalize">
                    {user.role}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Informasi Kontak</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-gray-500" /><span className="text-sm">{user.email}</span></div>
              <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-gray-500" /><span className="text-sm">+62 812-3456-7890</span></div>
              <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-gray-500" /><span className="text-sm">Yogyakarta, Indonesia</span></div>
              <div className="flex items-center gap-3"><Calendar className="h-4 w-4 text-gray-500" /><span className="text-sm">Bergabung {user.angkatan ?? "2021"}</span></div>
            </CardContent>
          </Card>

          {/* Skills */}
          <Card>
            <CardHeader><CardTitle className="text-lg">Keahlian</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {STATIC_SKILLS.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs bg-gray-50">{skill}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Kursus", value: STATIC_STATS.coursesCompleted, icon: BookOpen, color: "text-indigo-500" },
              { label: "Jam Belajar", value: `${STATIC_STATS.totalStudyHours}j`, icon: Clock, color: "text-emerald-500" },
              { label: "Forum Post", value: STATIC_STATS.discussionPosts, icon: User, color: "text-purple-500" },
              { label: "Jawaban Helpful", value: STATIC_STATS.helpfulAnswers, icon: Award, color: "text-amber-500" },
            ].map((s) => (
              <Card key={s.label} className="text-center">
                <CardContent className="pt-4">
                  <s.icon className={`h-6 w-6 ${s.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5 text-amber-500" /> Pencapaian Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {STATIC_ACHIEVEMENTS.map((ach, i) => (
                <div key={i} className="flex items-start gap-4 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="bg-amber-500 text-white rounded-full p-2 shadow-sm">
                    <Award className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{ach.title}</h4>
                    <p className="text-sm text-gray-600 mt-0.5">{ach.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{ach.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}