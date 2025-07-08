"use client";

import { useState, useEffect } from "react";
import { Bell, MessageSquare, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { extractInitials } from "@/lib/stringUtils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


export default function Navbar() {
    const pathname = usePathname();
    const [userInitials, setUserInitials] = useState("");

    // Dummy user data
    const user = {
        name: "John Doe",
        title: "Backend Developer",
    };

    useEffect(() => {
        setUserInitials(extractInitials(user.name));
    }, [user.name]);

    const navItems = [
        { label: "Home", href: "/dashboard/home" },
        { label: "My Learning", href: "/dashboard/learnings" },
        { label: "Catalog", href: "/dashboard/catalogs" },
        { label: "Roadmap", href: "/dashboard/roadmaps" },
    ];

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
                    <MessageSquare className="w-5 h-5 cursor-pointer text-gray-600" />
                    <Popover>
                        <PopoverTrigger><Bell className="w-5 h-5 cursor-pointer text-gray-600" /></PopoverTrigger>
                        <PopoverContent className="mt-4">Notification will goes here later Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, enim.</PopoverContent>
                    </Popover>


                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div className="flex items-center gap-3 cursor-pointer">
                                <Avatar className="border rounded-md w-9 h-9 text-sm">
                                    <AvatarFallback className="bg-muted rounded-md text-muted-foreground">
                                        {userInitials}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col items-start text-sm leading-tight">
                                    <span className="font-medium">{user.name}</span>
                                    <span className="text-xs text-gray-500">{user.title}</span>
                                </div>

                                <ChevronDown className="w-4 h-4 text-gray-500" />
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-48 mt-2">
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Check-in Attendance</DropdownMenuItem>
                            <DropdownMenuItem>Attendance</DropdownMenuItem>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Secondary Nav */}
            <div className="px-6 md:px-12 lg:px-24">
                <div className="flex gap-6">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
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
