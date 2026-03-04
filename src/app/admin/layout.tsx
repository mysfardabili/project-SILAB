"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard, Users, BookOpen, FolderOpen,
  BarChart3, Megaphone, ChevronDown, Bell, LogOut, User, Settings,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { extractInitials } from "@/lib/stringUtils";
import { removeAuthCookie } from "@/lib/auth";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Pengguna", href: "/admin/users", icon: Users },
  { label: "Kursus", href: "/admin/courses", icon: BookOpen },
  { label: "Resources", href: "/admin/resources", icon: FolderOpen },
  { label: "Laporan", href: "/admin/reports", icon: BarChart3 },
  { label: "Pengumuman", href: "/admin/announcements", icon: Megaphone },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [initials, setInitials] = useState("");

  useEffect(() => {
    if (user?.name) setInitials(extractInitials(user.name));
  }, [user?.name]);

  const handleLogout = async () => {
    logout();
    await removeAuthCookie();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 bg-white border-r flex-col sticky top-0 h-screen">
        <div className="h-16 flex items-center px-5 border-b shrink-0">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Image src="/silab-logo.svg" alt="SI Lab" width={100} height={28} priority />
            <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User section at bottom */}
        <div className="p-4 border-t shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-gray-50 transition-colors">
                <Avatar className="w-8 h-8 border rounded-lg">
                  <AvatarFallback className="bg-rose-100 text-rose-700 text-xs font-medium rounded-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" align="start" className="w-48 mb-1">
              <DropdownMenuItem><User className="w-4 h-4 mr-2" /> Profil</DropdownMenuItem>
              <DropdownMenuItem><Settings className="w-4 h-4 mr-2" /> Pengaturan</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                <LogOut className="w-4 h-4 mr-2" /> Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="md:hidden h-14 bg-white border-b flex items-center justify-between px-4 sticky top-0 z-30">
          <Link href="/admin/dashboard">
            <Image src="/silab-logo.svg" alt="SI Lab" width={90} height={24} priority />
          </Link>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-500" />
            <Avatar className="w-8 h-8 border rounded-lg">
              <AvatarFallback className="bg-rose-100 text-rose-700 text-xs font-medium rounded-lg">{initials}</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t flex justify-around py-2">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs font-medium ${isActive ? "text-indigo-600" : "text-gray-500"}`}>
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <main className="flex-1 pb-20 md:pb-0">{children}</main>
      </div>
    </div>
  );
}
