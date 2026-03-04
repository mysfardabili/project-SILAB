"use client";

import Link from "next/link";
import { ArrowLeft, Save, User, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { extractInitials } from "@/lib/stringUtils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

export default function ProfileEditPage() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: "+62 812-3456-7890",
    location: "Yogyakarta, Indonesia",
    bio: "Mahasiswa Teknik Informatika UAD yang antusias di bidang web development dan data science.",
    prodi: user?.prodi ?? "Teknik Informatika",
  });

  const f = (field: keyof typeof form, val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      updateUser({ name: form.name, email: form.email, prodi: form.prodi });
    }
    setSaved(true);
    setTimeout(() => router.push("/dashboard/home/profile"), 1200);
  };

  if (!user) return null;

  return (
    <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Link
          href="/dashboard/home/profile"
          className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Kembali ke Profil
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <User className="h-6 w-6 text-indigo-500" />
        <h1 className="text-2xl font-bold text-gray-900">Edit Profil</h1>
      </div>

      <Card className="shadow-sm border-gray-100">
        <CardContent className="pt-6">
          {saved ? (
            <div className="py-10 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
                <Save className="w-7 h-7 text-emerald-600" />
              </div>
              <p className="text-emerald-700 font-semibold text-lg">Profil diperbarui!</p>
              <p className="text-sm text-gray-500">Mengalihkan ke halaman profil...</p>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-5">
              {/* Avatar Section */}
              <div className="flex items-center gap-5">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-2 border-indigo-100">
                    <AvatarFallback className="text-xl font-bold bg-indigo-100 text-indigo-700">
                      {extractInitials(form.name)}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    className="absolute -bottom-1 -right-1 w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center shadow hover:bg-indigo-700 transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">PNG, JPG maks 5MB</p>
                </div>
              </div>

              <div className="space-y-1">
                <Label>Nama Lengkap</Label>
                <Input required value={form.name} onChange={(e) => f("name", e.target.value)} />
              </div>

              <div className="space-y-1">
                <Label>Email</Label>
                <Input required type="email" value={form.email} onChange={(e) => f("email", e.target.value)} />
              </div>

              <div className="space-y-1">
                <Label>Nomor Telepon</Label>
                <Input value={form.phone} onChange={(e) => f("phone", e.target.value)} placeholder="+62 ..." />
              </div>

              <div className="space-y-1">
                <Label>Kota / Lokasi</Label>
                <Input value={form.location} onChange={(e) => f("location", e.target.value)} />
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

              <div className="space-y-1">
                <Label>Bio</Label>
                <Textarea
                  rows={3}
                  className="resize-none"
                  value={form.bio}
                  onChange={(e) => f("bio", e.target.value)}
                  placeholder="Ceritakan sedikit tentang diri Anda..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" type="button" asChild className="flex-1">
                  <Link href="/dashboard/home/profile">Batal</Link>
                </Button>
                <Button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                  <Save className="w-4 h-4 mr-2" /> Simpan Perubahan
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
