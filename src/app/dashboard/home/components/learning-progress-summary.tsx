"use client";

import { Gauge, Clock, Calendar, Star, BookOpen, Award, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

// Mock data
const learningData = {
    overallProgress: 68,
    weeklyGoal: { completed: 4, total: 5 },
    currentStreak: 12,
    nextMilestone: { name: "Complete Data Structures Course", progress: 75 },
    strongestSubject: "Web Development",
    upcomingDeadlines: [
        { id: "1", title: "Web Technology Quiz", dueDate: "Tomorrow", course: "Web Technology" },
        { id: "2", title: "Project Submission", dueDate: "In 3 days", course: "Data Structures" }
    ],
    recentAchievements: [
        { id: "1", title: "Perfect Score", description: "100% on JavaScript Basics Quiz", date: "Yesterday" },
        { id: "2", title: "Consistency", description: "10-day learning streak", date: "2 days ago" }
    ]
};

const LearningProgressSummary = () => {
    return (
        <div className="mt-6 rounded-lg bg-white shadow-md overflow-hidden h-full">
            <div className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <Gauge className="h-5 w-5 text-indigo-500" />
                    <h3 className="text-lg font-semibold text-gray-800">Learning Progress</h3>
                </div>
            </div>
            <Separator className="my-2" />
            <div className="px-6 py-4 space-y-5">
                {/* Overall Progress */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Overall Progress</span>
                        <span className="text-sm font-bold text-indigo-600">{learningData.overallProgress}%</span>
                    </div>
                    <Progress value={learningData.overallProgress} className="h-2 bg-gray-100" />
                </div>

                {/* Weekly Goal */}
                <div className="bg-gray-50 rounded-md border-l-4 border-indigo-400 py-3 px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-indigo-500" />
                            <span className="text-sm font-medium text-gray-600">Weekly Learning Goal</span>
                        </div>
                        <span className="text-sm font-bold text-indigo-600">
                            {learningData.weeklyGoal.completed}/{learningData.weeklyGoal.total} completed
                        </span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{learningData.weeklyGoal.completed < learningData.weeklyGoal.total ? "You're almost there!" : "Great job completing your goal!"}</p>
                </div>

                {/* Next Milestone */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-amber-500" />
                            <span className="text-sm font-medium text-gray-600">Next Milestone</span>
                        </div>
                        <span className="text-sm font-bold text-indigo-600">{learningData.nextMilestone.progress}%</span>
                    </div>
                    <Progress value={learningData.nextMilestone.progress} className="h-2 bg-gray-100" />
                    <span className="text-xs text-gray-500">{learningData.nextMilestone.name}</span>
                </div>

                {/* Upcoming Deadlines */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Clock className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm font-medium text-gray-600">Upcoming Deadlines</span>
                    </div>
                    <div className="space-y-2">
                        {learningData.upcomingDeadlines.map((deadline) => (
                            <div key={deadline.id} className="bg-gray-50 rounded-md border-l-4 border-amber-400 py-2 px-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">{deadline.title}</span>
                                    <span className="text-xs font-medium text-red-600">{deadline.dueDate}</span>
                                </div>
                                <p className="text-xs text-gray-500">{deadline.course}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Achievements */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Award className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm font-medium text-gray-600">Recent Achievements</span>
                    </div>
                    <div className="space-y-2">
                        {learningData.recentAchievements.map((achievement) => (
                            <div key={achievement.id} className="bg-gray-50 rounded-md border-l-4 border-green-400 py-2 px-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-700">{achievement.title}</span>
                                    <span className="text-xs text-gray-400">{achievement.date}</span>
                                </div>
                                <p className="text-xs text-gray-500">{achievement.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <Link
                        href="/progress"
                        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    >
                        View all progress <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LearningProgressSummary;