"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, TrendingUp, BookOpen, Award, BarChart3, Clock, CheckCircle2, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Mock student progress data
const studentProgress = {
  gpa: 3.85,
  totalCredits: 85,
  completedCourses: 24,
  inProgressCourses: 5,
  overallAttendance: 92,
  studyHours: 340,
  recentActivity: [
    { title: "Completed Module: React Hooks", course: "Web Technology", time: "2 hours ago", type: "completion" },
    { title: "Submitted Assignment: Binary Trees", course: "Data Structures", time: "1 day ago", type: "submission" },
    { title: "Attended Lecture: System Design", course: "Software Engineering", time: "2 days ago", type: "attendance" },
  ],
  courseProgress: [
    { name: "Web Technology", progress: 75, grade: "A", status: "In Progress" },
    { name: "Data Structures", progress: 60, grade: "B+", status: "In Progress" },
    { name: "Database Systems", progress: 90, grade: "A", status: "In Progress" },
    { name: "Computer Networks", progress: 100, grade: "A", status: "Completed" },
    { name: "Operating Systems", progress: 100, grade: "A-", status: "Completed" },
  ]
};

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link 
              href="/dashboard/home"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-2 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Academic Progress</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your performance, course completion, and overall academic standing.
            </p>
          </div>
          
          <Button variant="outline" className="bg-white shadow-sm self-start sm:self-auto">
            <Download className="mr-2 h-4 w-4" /> Download Transcript
          </Button>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-none shadow-sm shadow-indigo-100/50 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                </div>
                <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">+0.12 this term</span>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">Cumulative GPA</h3>
              <p className="text-3xl font-bold text-gray-900">{studentProgress.gpa.toFixed(2)}</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm shadow-purple-100/50 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-purple-50 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">Total Earned Credits</h3>
              <p className="text-3xl font-bold text-gray-900">{studentProgress.totalCredits}</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm shadow-emerald-100/50 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">Courses Completed</h3>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-gray-900">{studentProgress.completedCourses}</p>
                <p className="text-sm text-gray-500 font-medium mb-1">/ {studentProgress.completedCourses + studentProgress.inProgressCourses} total</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm shadow-amber-100/50 bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-amber-600" />
                </div>
              </div>
              <h3 className="text-gray-500 text-sm font-medium mb-1">Overall Attendance</h3>
              <p className="text-3xl font-bold text-gray-900">{studentProgress.overallAttendance}%</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Course Progress */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="border-b border-gray-50 bg-gray-50/50 pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">Current Course Progress</CardTitle>
                    <CardDescription className="mt-1">Tracking your performance across active enrollments.</CardDescription>
                  </div>
                  <BarChart3 className="h-5 w-5 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y divide-gray-50">
                  {studentProgress.courseProgress.filter(c => c.status === "In Progress").map((course, idx) => (
                    <li key={idx} className="p-6 hover:bg-gray-50/50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{course.name}</h4>
                          <p className="text-sm text-gray-500 mt-0.5">Current Grade Standing: <span className="font-medium text-gray-700">{course.grade}</span></p>
                        </div>
                        <span className="text-lg font-bold text-indigo-600">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2.5 bg-gray-100" indicatorClassName={
                        course.progress > 80 ? "bg-emerald-500" : course.progress > 60 ? "bg-indigo-500" : "bg-amber-500"
                      } />
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-gray-100 shadow-sm">
                <CardHeader className="border-b border-gray-50 bg-gray-50/50 pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl text-gray-900">Recently Completed</CardTitle>
                      <Link href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View History</Link>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {studentProgress.courseProgress.filter(c => c.status === "Completed").slice(0, 4).map((course, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                                <div className="h-10 w-10 shrink-0 bg-emerald-100 rounded-full flex items-center justify-center">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 text-sm leading-tight mb-1">{course.name}</h4>
                                    <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
                                        Grade: {course.grade}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            <Card className="border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-full -mr-10 -mt-10 blur-2xl pointer-events-none"></div>
                <CardHeader>
                    <CardTitle className="text-lg text-gray-900">Learning Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-600">Total Study Hours</span>
                            <span className="text-sm font-bold text-gray-900">{studentProgress.studyHours}h</span>
                        </div>
                        <p className="text-xs text-indigo-600 font-medium">Top 15% of your cohort</p>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity Timeline</h4>
                        <div className="space-y-4">
                            {studentProgress.recentActivity.map((activity, idx) => (
                                <div key={idx} className="flex gap-3 relative">
                                    {idx !== studentProgress.recentActivity.length - 1 && (
                                        <div className="absolute left-4 top-8 bottom-0 w-0.5 bg-gray-100 -ml-px"></div>
                                    )}
                                    <div className={`h-8 w-8 shrink-0 rounded-full flex items-center justify-center z-10 
                                        ${activity.type === 'completion' ? 'bg-emerald-100 text-emerald-600' : 
                                          activity.type === 'submission' ? 'bg-indigo-100 text-indigo-600' : 
                                          'bg-blue-100 text-blue-600'}`}
                                    >
                                        {activity.type === 'completion' ? <CheckCircle2 className="h-4 w-4" /> : 
                                         activity.type === 'submission' ? <BookOpen className="h-4 w-4" /> : 
                                         <Clock className="h-4 w-4" />}
                                    </div>
                                    <div className="pt-1.5 pb-2">
                                        <p className="text-sm font-medium text-gray-900 leading-tight">{activity.title}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-indigo-600 font-medium">{activity.course}</span>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-xs text-gray-500">{activity.time}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-4 text-sm text-gray-500 hover:text-indigo-600">
                            View All Activity <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                    </div>
                </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
