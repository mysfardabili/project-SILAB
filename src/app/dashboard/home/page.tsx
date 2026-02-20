"use client";

import { Brain, ChevronRight, Clock, FolderGit2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import CourseActivitiesCard from "./components/course-activities-card";
import { Announcement } from "./components/announcement";
import DiscussionHub from "./components/discussion-hub";
import QuickActions from "./components/quick-actions";
import UpcomingSchedule from "./components/upcoming-schedule";

export default function Page() {
    return (
        <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6 md:space-y-8 bg-gray-50/50 min-h-screen">
            {/* Greeting & Stats Section */}
            <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-6">
                <div className="space-y-2 flex-1">
                    <h1 className="font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">Good morning, Adolf 👋</h1>
                    <p className="text-gray-600 text-lg">Welcome back to SI Lab. Here is your learning overview for today.</p>
                </div>
                
                <div className="flex flex-wrap lg:flex-nowrap items-center gap-4">
                    <Card className="flex-1 min-w-[200px] hover:shadow-md transition-shadow duration-200">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="bg-purple-100 p-3 rounded-xl">
                                <Clock className="w-6 h-6 text-purple-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-900 leading-none">14h</span>
                                <span className="text-sm text-gray-500 font-medium">Study Time</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex-1 min-w-[200px] hover:shadow-md transition-shadow duration-200">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="bg-indigo-100 p-3 rounded-xl">
                                <Brain className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-900 leading-none">3</span>
                                <span className="text-sm text-gray-500 font-medium">Skills Mastered</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="flex-1 min-w-[200px] hover:shadow-md transition-shadow duration-200">
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className="bg-emerald-100 p-3 rounded-xl">
                                <FolderGit2 className="w-6 h-6 text-emerald-600" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-900 leading-none">5</span>
                                <span className="text-sm text-gray-500 font-medium">Projects</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Top Grid: Announcement & Actions & Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 flex flex-col gap-6">
                    <Announcement
                        title="Mid-term Examinations Schedule 📢"
                        description="The mid-term examinations for the current semester will begin on May 15, 2025. Please review the updated examination guidelines and ensure your attendance records are complete before the deadline."
                    />
                    
                    {/* Learning Content Section */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                In Progress Learning <AlertCircle className="h-5 w-5 text-indigo-500" />
                            </h2>
                            <Link
                                href="/dashboard/learnings"
                                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200 bg-indigo-50 px-3 py-1.5 rounded-full"
                            >
                                View all <ChevronRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                        <CourseActivitiesCard
                            activities={[
                                {
                                    title: "Web technology : Module 1 - Introduction to Next.js App Router",
                                    link: "/learnings/web-tech-1/overview",
                                },
                                {
                                    title: "Data Structures : Module 2 - Advanced Linked Lists and Trees",
                                    link: "/learnings/data-structures-2/overview",
                                },
                            ]}
                        />
                    </div>
                </div>
                
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <QuickActions />
                    <UpcomingSchedule />
                </div>
            </div>

            {/* Bottom Grid: Discussions */}
            <div className="grid grid-cols-1 gap-6">
                <div className="w-full">
                    <DiscussionHub />
                </div>
            </div>
        </div>
    );
}