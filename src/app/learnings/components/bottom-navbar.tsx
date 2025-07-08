"use client";

import { FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface BottomNavbarProps {
    courseId: string;
    prevChapter?: {
        sectionId: string;
        chapterId: string;
        title: string;
    } | null;
    nextChapter?: {
        sectionId: string;
        chapterId: string;
        title: string;
    } | null;
}

const BottomNavbar: FC<BottomNavbarProps> = ({
    courseId,
    prevChapter,
    nextChapter
}) => {
    return (
        <div className="border-t border-gray-200 bg-white py-4 px-4 sm:px-6">
            <div className=" mx-auto flex justify-between"> {/* Ensure max-width */}
                {/* Back Button */}
                {prevChapter ? (
                    <Link
                        href={`/learning/course/${courseId}/${prevChapter.sectionId}/${prevChapter.chapterId}`}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group"
                    >
                        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 group-hover:bg-gray-200 mr-2 sm:mr-4 transition-colors">
                            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                        <div className="max-w-[100px] sm:max-w-[200px] overflow-hidden">
                            <div className="text-xs text-gray-500">Previous</div>
                            <div className="font-medium text-sm sm:text-base truncate">{prevChapter.title}</div>
                        </div>
                    </Link>
                ) : (
                    <div></div>
                )}

                {/* Next Button */}
                {nextChapter ? (
                    <Link
                        href={`/learning/course/${courseId}/${nextChapter.sectionId}/${nextChapter.chapterId}`}
                        className="flex items-center text-gray-600 hover:text-gray-900 transition-colors group text-right"
                    >
                        <div className="max-w-[100px] sm:max-w-[200px] overflow-hidden mr-2 sm:mr-4">
                            <div className="text-xs text-gray-500">Next</div>
                            <div className="font-medium text-sm sm:text-base truncate">{nextChapter.title}</div>
                        </div>
                        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors">
                            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </div>
                    </Link>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};


export default BottomNavbar;