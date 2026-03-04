"use client";

import { useState, useEffect } from "react";
import { Bell, MessageSquare, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { extractInitials } from "@/lib/stringUtils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { removeAuthCookie } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";
import { Badge } from "@/components/ui/badge";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuth();
    const [userInitials, setUserInitials] = useState("");

    useEffect(() => {
        if (user?.name) {
            setUserInitials(extractInitials(user.name));
        }
    }, [user?.name]);

    const navItems = [
        { label: "Home", href: "/dashboard/home" },
        { label: "My Learning", href: "/dashboard/learnings" },
        { label: "Catalog", href: "/dashboard/catalogs" },
        { label: "Roadmap", href: "/dashboard/roadmaps" },
        { label: "Progress", href: "/progress" },
        { label: "Resources", href: "/resources" },
    ];

    const handleLogout = async () => {
        logout();
        await removeAuthCookie();
        router.push("/login");
    };

    const displayName = user?.name ?? "—";
    const displayTitle = user?.title ?? (user?.role === "mahasiswa" ? "Mahasiswa" : user?.role === "dosen" ? "Dosen" : "");

    return (
        <nav className="w-full border-b bg-white">
            {/* Top bar */}
            <div className="h-16 flex items-center justify-between px-6 md:px-12 lg:px-24">
                <Link href="/dashboard/home">
                    <div className="relative w-28 h-10">
                        <Image
                            className="dark:invert"
                            src="/silab-logo.svg"
                            alt="Si Lab logo"
                            width={180}
                            height={38}
                            priority
                        />
                    </div>
                </Link>
                <div className="flex-1" />
                <div className="flex items-center gap-4">
                    <MessageSquare className="w-5 h-5 cursor-pointer text-gray-600 hover:text-indigo-600 transition-colors" />
                    <Popover>
                        <PopoverTrigger>
                            <div className="relative">
                                <Bell className="w-5 h-5 cursor-pointer text-gray-600 hover:text-indigo-600 transition-colors" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="mt-4 w-80 p-0" align="end">
                            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                                <p className="text-sm font-semibold text-gray-900">Notifikasi</p>
                                <Badge variant="secondary" className="text-xs">0 baru</Badge>
                            </div>
                            <div className="px-4 py-8 text-center">
                                <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Tidak ada notifikasi baru</p>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-3 cursor-pointer">
                                <Avatar className="border rounded-md w-9 h-9 text-sm">
                                    <AvatarFallback className="bg-indigo-100 rounded-md text-indigo-700 font-medium">
                                        {userInitials}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col items-start text-sm leading-tight">
                                    <span className="font-medium">{displayName}</span>
                                    <span className="text-xs text-gray-500">{displayTitle}</span>
                                </div>

                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-48 mt-2">
                            <DropdownMenuItem onClick={() => router.push("/dashboard/home/profile")}>
                                Profil
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push("/dashboard/home/settings")}>
                                Pengaturan
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push("/dashboard/course-attendance")}>
                                Check-in Kehadiran
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push("/dashboard/attendance")}>
                                Riwayat Kehadiran
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                                Keluar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Secondary Nav */}
            <div className="px-6 md:px-12 lg:px-24 overflow-x-auto no-scrollbar">
                <div className="flex gap-6 min-w-max">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/dashboard/home" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`whitespace-nowrap pb-2 md:pb-3 text-sm font-medium transition-colors duration-200 ${isActive
                                    ? "border-b-2 border-indigo-600 text-indigo-600"
                                    : "text-gray-500 hover:text-indigo-600"
                                    }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}