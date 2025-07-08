"use client";

import { FC } from "react";
import { ChevronLeft, X, BookOpen, Menu } from "lucide-react";
import Link from "next/link";

interface LearningNavbarProps {
    title: string;
    type?: "page" | "quiz" | "learning-path" | "course";
    onClose?: () => void;
    onToggleSidebar?: () => void;
}

const LearningNavbar: FC<LearningNavbarProps> = ({
    title,
    type = "page",
    onClose,
    onToggleSidebar
}) => {
    const typeIcons = {
        "page": <BookOpen className="h-5 w-5 text-white" />,
        "quiz": <BookOpen className="h-5 w-5 text-white" />,
        "learning-path": <BookOpen className="h-5 w-5 text-white" />,
        "course": <BookOpen className="h-5 w-5 text-white" />
    };

    const typeColors = {
        "page": "bg-teal-500",
        "quiz": "bg-amber-500",
        "learning-path": "bg-purple-500",
        "course": "bg-blue-500"
    };

    return (
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
            <div className="flex items-center space-x-3">
                <Link href="/learning">
                    <button className="p-2 rounded-md hover:bg-gray-100">
                        <ChevronLeft className="h-5 w-5 text-gray-600" />
                    </button>
                </Link>

                <div className={`w-8 h-8 rounded-md ${typeColors[type]} flex items-center justify-center flex-shrink-0`}>
                    {typeIcons[type]}
                </div>

                <h1 className="text-base font-medium text-gray-800 truncate max-w-xs sm:max-w-sm md:max-w-md">
                    {title}
                </h1>
            </div>

           
        </div>
    );
};

export default LearningNavbar;