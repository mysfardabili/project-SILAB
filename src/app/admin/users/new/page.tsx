"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowLeft, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function AdminNewUserPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", email: "", role: "mahasiswa" as "mahasiswa" | "dosen",
    prodi: "Teknik Informatika", angkatan: "2024", nim: "", nip: "", password: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && user && user.role !== "admin") router.replace("/dashboard/home");
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== "admin") return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => router.push("/admin/users"), 1200);
  };

  const f = (field: keyof typeof form, val: string) => setForm((prev) => ({ ...prev, [field]: val }));

  return (
    <div className="px-6 md:px-8 py-8 max-w-2xl mx-auto">
      <Link href="/admin/users" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-5 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Kembali ke Pengguna
      </Link>
      <Card className="shadow-sm border-gray-100">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <UserPlus className="w-5 h-5 text-indigo-600" /> Tambah Pengguna Baru
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-1">
                <Label>Nama Lengkap</Label>
                <Input required placeholder="cth. Ahmad Fauzi" value={form.name} onChange={(e) => f("name", e.target.value)} />
              </div>
              <div className="sm:col-span-2 space-y-1">
                <Label>Email</Label>
                <Input required type="email" placeholder="cth. ahmad@std.uad.ac.id" value={form.email} onChange={(e) => f("email", e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label>Role</Label>
                <Select value={form.role} onValueChange={(v) => f("role", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
                    <SelectItem value="dosen">Dosen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label>Program Studi</Label>
                <Select value={form.prodi} onValueChange={(v) => f("prodi", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Teknik Informatika">Teknik Informatika</SelectItem>
                    <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
                    <SelectItem value="Teknik Elektro">Teknik Elektro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {form.role === "mahasiswa" ? (
                <>
                  <div className="space-y-1">
                    <Label>NIM</Label>
                    <Input placeholder="cth. 2024010001" value={form.nim} onChange={(e) => f("nim", e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <Label>Angkatan</Label>
                    <Select value={form.angkatan} onValueChange={(v) => f("angkatan", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {["2024", "2023", "2022", "2021", "2020"].map((y) => (
                          <SelectItem key={y} value={y}>{y}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <div className="space-y-1">
                  <Label>NIP</Label>
                  <Input placeholder="cth. 197801012005011001" value={form.nip} onChange={(e) => f("nip", e.target.value)} />
                </div>
              )}
              <div className="sm:col-span-2 space-y-1">
                <Label>Password Awal</Label>
                <Input required type="password" placeholder="Minimal 8 karakter" value={form.password} onChange={(e) => f("password", e.target.value)} />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" type="button" asChild className="flex-1">
                <Link href="/admin/users">Batal</Link>
              </Button>
              <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700" disabled={saved}>
                {saved ? "✅ Tersimpan!" : "Simpan Pengguna"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
