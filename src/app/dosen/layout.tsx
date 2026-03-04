"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  ClipboardCheck,
  Star,
  MessageSquare,
  ChevronDown,
  Bell,
  LogOut,
  User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { extractInitials } from "@/lib/stringUtils";
import { removeAuthCookie } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/dosen/dashboard", icon: LayoutDashboard },
  { label: "Kelas Saya", href: "/dosen/courses", icon: BookOpen },
  { label: "Materi", href: "/dosen/materials", icon: FileText },
  { label: "Absensi", href: "/dosen/attendance", icon: ClipboardCheck },
  { label: "Penilaian", href: "/dosen/grading", icon: Star },
  { label: "Diskusi", href: "/dosen/discussions", icon: MessageSquare },
];

export default function DosenLayout({ children }: { children: ReactNode }) {
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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar */}
      <header className="h-16 bg-white border-b flex items-center justify-between px-6 md:px-10 sticky top-0 z-30">
        <Link href="/dosen/dashboard" className="flex items-center gap-2">
          <Image src="/silab-logo.svg" alt="SI Lab" width={120} height={32} priority />
          <span className="hidden sm:inline-block text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full ml-1">
            Dosen
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dosen/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-gray-500 hover:text-indigo-600 cursor-pointer transition-colors" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar className="w-9 h-9 border rounded-lg">
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-sm font-medium text-gray-900 max-w-[140px] truncate">{user?.name}</span>
                  <span className="text-xs text-gray-500">{user?.title}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 mt-2">
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" /> Profil
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                <LogOut className="w-4 h-4 mr-2" /> Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t flex justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dosen/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs font-medium transition-colors ${
                isActive ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Page content */}
      <main className="flex-1 pb-20 md:pb-0">
        {children}
      </main>
    </div>
  );
}
