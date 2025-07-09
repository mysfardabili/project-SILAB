"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { BookOpen, ChevronRight, Target } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

type LastCoursesCardProps = {
    id: string;
    title: string;
    progress: number;
    materialsCount: number;
    imageUrl?: string | StaticImageData;
    onContinue?: () => void;
};

const LastCoursesCard = ({
    id,
    title,
    progress,
    materialsCount,
    imageUrl,
    onContinue,
}: LastCoursesCardProps) => {
    return (
        <div className="rounded-lg shadow-md overflow-hidden border border-gray-200 transition-shadow hover:shadow-lg w-full">
            {/* Main Course Card */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-white">
                {/* Course Image/Icon */}
                <div className="relative w-full md:w-48 h-32 rounded-md overflow-hidden flex-shrink-0">
                    {imageUrl ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={imageUrl}
                                alt={title}
                                className="object-cover"
                                fill
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center relative">
                            {/* Default illustrations/stats graphics */}
                            <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-medium py-1 px-2 rounded flex items-center gap-1 z-10">
                                <BookOpen className="w-3 h-3" />
                                <span>{materialsCount} Materials</span>
                            </div>

                            <div className="relative z-0">
                                <Target className="w-8 h-8 text-blue-500 stroke-2 mb-1 mx-auto" />
                                <div className="flex items-center justify-center">
                                    <div className="h-12 w-1 bg-blue-300 rounded-full mr-1"></div>
                                    <div className="h-16 w-1 bg-blue-500 rounded-full mr-1"></div>
                                    <div className="h-14 w-1 bg-blue-200 rounded-full"></div>
                                </div>
                            </div>

                            <div className="absolute bottom-2 right-2 bg-white rounded-full p-1">
                                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>

                            <div className="absolute bottom-3 left-3 bg-white rounded-full p-1">
                                <div className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Course Info */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center text-gray-500 text-sm mb-1">
                            <BookOpen className="w-4 h-4 mr-1" />
                            <span>Course</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>

                        <div className="mb-3">
                            <span className="text-xs text-gray-600">Progress: {progress}%</span>
                            <Progress value={progress} className="mt-1" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <Link
                            href={`/dashboard/learnings/courses/${id}`}
                            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                        >
                            Continue Learning <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                        {onContinue && (
                            <Button size="sm" onClick={onContinue} className="hidden sm:inline-flex">
                                Continue
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LastCoursesCard;