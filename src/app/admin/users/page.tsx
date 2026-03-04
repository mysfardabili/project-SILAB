"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUsers } from "@/hooks/useUsers";
import {
  Search, Plus, Filter, MoreVertical, Edit2, Trash2,
  UserCheck, UserX, KeyRound, Download, Loader2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

type UserRole = "mahasiswa" | "dosen";
type UserStatus = "active" | "inactive";

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  prodi: string;
  nim?: string;
  nip?: string;
  angkatan?: string;
  status: UserStatus;
  joinedAt: string;
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

export default function AdminUsersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | UserRole>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | UserStatus>("all");

  const { users, isLoading, refetch, mutate } = useUsers({ 
    role: roleFilter, 
    status: statusFilter,
    search: search === "" ? undefined : search 
  });

  useEffect(() => {
    if (!authLoading && user && user.role !== "admin") router.replace("/dashboard/home");
  }, [user, authLoading, router]);

  if (authLoading || !user || user.role !== "admin") return null;

  const toggleStatus = async (id: string) => {
    // Optimistic UI update
    const previous = users;
    mutate(users.map((u) => u.id === id ? { ...u, status: u.status === "active" ? "inactive" : "active" } : u));
    
    // In real app, make PUT/PATCH request here
    // await fetch(`/api/users/${id}`, { method: "PATCH", ... }) 
    
    // Simulate delay
    setTimeout(() => refetch(), 500);
  };
  
  const deleteUser = async (id: string) => {
    mutate(users.filter((u) => u.id !== id));
    // In real app, make DELETE request here
    setTimeout(() => refetch(), 500);
  };

  return (
    <div className="px-6 md:px-8 py-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Pengguna</h1>
          <p className="text-gray-500 text-sm mt-1">{isLoading ? "Memuat data..." : `${users.length} pengguna`}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
            <Link href="/admin/users/new">
              <Plus className="w-4 h-4 mr-2" /> Tambah Pengguna
            </Link>
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Cari nama, email, NIM..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as typeof roleFilter)}>
          <SelectTrigger className="w-36 bg-white">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Role</SelectItem>
            <SelectItem value="mahasiswa">Mahasiswa</SelectItem>
            <SelectItem value="dosen">Dosen</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
          <SelectTrigger className="w-36 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="active">Aktif</SelectItem>
            <SelectItem value="inactive">Nonaktif</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="shadow-sm border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Pengguna</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Role</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden lg:table-cell">Program Studi</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden xl:table-cell">ID</th>
                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading && (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={`skel-u-${i}`} className="border-b last:border-0 border-gray-50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-9 h-9 border rounded-lg shrink-0" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-40" />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell"><Skeleton className="h-5 w-20 rounded-full" /></td>
                    <td className="px-4 py-4 hidden lg:table-cell"><Skeleton className="h-4 w-24" /></td>
                    <td className="px-4 py-4 hidden xl:table-cell"><Skeleton className="h-4 w-16" /></td>
                    <td className="px-4 py-4 text-center"><Skeleton className="h-5 w-16 rounded-full mx-auto" /></td>
                    <td className="px-4 py-4"><Skeleton className="h-6 w-6 rounded shrink-0" /></td>
                  </tr>
                ))
              )}
              {!isLoading && users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9 border rounded-lg shrink-0">
                        <AvatarFallback className={`rounded-lg text-xs font-semibold ${u.role === "dosen" ? "bg-blue-100 text-blue-700" : "bg-indigo-100 text-indigo-700"}`}>
                          {getInitials(u.name || "?")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">{u.name}</p>
                        <p className="text-xs text-gray-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <Badge className={`border-none text-xs capitalize ${u.role === "dosen" ? "bg-blue-100 text-blue-700" : "bg-indigo-100 text-indigo-700"}`}>
                      {u.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-gray-600 hidden lg:table-cell">{u.prodi}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-400 hidden xl:table-cell font-mono">
                    {u.nim ?? u.nip ?? "—"}
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <Badge className={`border-none text-xs ${u.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                      {u.status === "active" ? "Aktif" : "Nonaktif"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded hover:bg-gray-100 transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Edit2 className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem><KeyRound className="w-4 h-4 mr-2" /> Reset Password</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toggleStatus(u.id)}>
                          {u.status === "active"
                            ? <><UserX className="w-4 h-4 mr-2 text-amber-500" /> Nonaktifkan</>
                            : <><UserCheck className="w-4 h-4 mr-2 text-emerald-500" /> Aktifkan</>
                          }
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => deleteUser(u.id)} className="text-red-600 focus:text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" /> Hapus
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!isLoading && users.length === 0 && (
            <div className="text-center py-14 text-gray-400">
              <Search className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="font-medium text-sm">Tidak ada pengguna ditemukan</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
