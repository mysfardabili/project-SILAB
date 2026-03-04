"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MapPin, ChevronLeft, ChevronRight, BookOpen, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const scheduleData: Record<string, { id: string; time: string; endTime: string; course: string; type: string; room: string; instructor: string; color: string }[]> = {
  Mon: [
    { id: "s1", time: "08:00", endTime: "09:40", course: "Web Technology", type: "Lecture", room: "Room A-201", instructor: "Prof. Sarah Jenkins", color: "indigo" },
    { id: "s2", time: "13:00", endTime: "14:40", course: "Data Structures", type: "Lab", room: "Lab C-101", instructor: "Dr. Alan Turing", color: "emerald" },
  ],
  Tue: [
    { id: "s3", time: "10:00", endTime: "11:40", course: "Database Systems", type: "Lecture", room: "Room B-301", instructor: "Dr. Robert Chen", color: "blue" },
  ],
  Wed: [
    { id: "s4", time: "08:00", endTime: "09:40", course: "Software Engineering", type: "Lecture", room: "Room A-101", instructor: "Dr. Mike Wilson", color: "purple" },
    { id: "s5", time: "13:00", endTime: "14:40", course: "Web Technology", type: "Lab", room: "Lab B-201", instructor: "Prof. Sarah Jenkins", color: "indigo" },
  ],
  Thu: [
    { id: "s6", time: "09:00", endTime: "10:40", course: "Data Structures", type: "Lecture", room: "Room A-201", instructor: "Dr. Alan Turing", color: "emerald" },
    { id: "s7", time: "14:00", endTime: "15:40", course: "Database Systems", type: "Lab", room: "Lab C-201", instructor: "Dr. Robert Chen", color: "blue" },
  ],
  Fri: [
    { id: "s8", time: "08:00", endTime: "09:40", course: "Software Engineering", type: "Lecture", room: "Room B-101", instructor: "Dr. Mike Wilson", color: "purple" },
  ],
  Sat: [],
};

const colorMap: Record<string, string> = {
  indigo: "border-l-indigo-500 bg-indigo-50",
  emerald: "border-l-emerald-500 bg-emerald-50",
  blue: "border-l-blue-500 bg-blue-50",
  purple: "border-l-purple-500 bg-purple-50",
};

const badgeColorMap: Record<string, string> = {
  Lecture: "bg-gray-100 text-gray-700",
  Lab: "bg-amber-100 text-amber-700",
};

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Mon");

  const currentDayClasses = scheduleData[selectedDay] || [];
  const totalWeeklyClasses = Object.values(scheduleData).flat().length;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div>
          <Link
            href="/dashboard/home"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-2 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Class Schedule</h1>
          <p className="mt-1 text-sm text-gray-500">
            Your weekly class and lab timetable for this semester.
          </p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="h-10 w-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Calendar className="h-5 w-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{totalWeeklyClasses}</p>
                <p className="text-xs text-gray-500">Classes / Week</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">4</p>
                <p className="text-xs text-gray-500">Active Courses</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-sm bg-white col-span-2 sm:col-span-1">
            <CardContent className="p-5 flex items-center gap-3">
              <div className="h-10 w-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">16h</p>
                <p className="text-xs text-gray-500">Contact Hours</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Day Selector */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-gray-900">Weekly View</h2>
            <span className="text-sm text-gray-500">Semester 4 — Feb 2026</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {weekDays.map((day) => {
              const count = scheduleData[day]?.length || 0;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`flex-1 min-w-[60px] flex flex-col items-center py-3 px-2 rounded-xl transition-all font-medium text-sm ${
                    selectedDay === day
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span>{day}</span>
                  {count > 0 && (
                    <span className={`mt-1 text-xs rounded-full px-1.5 py-0.5 ${
                      selectedDay === day ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-700"
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Classes for Selected Day */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{selectedDay === "Sat" ? "Saturday" : selectedDay + "day"}&apos;s Classes</h3>
          {currentDayClasses.length > 0 ? (
            <div className="space-y-4">
              {currentDayClasses.map((cls) => (
                <div
                  key={cls.id}
                  className={`bg-white rounded-xl border-l-4 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow ${colorMap[cls.color]}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center shrink-0 text-center bg-gray-50 rounded-lg p-3 min-w-[72px]">
                      <span className="text-sm font-bold text-gray-900">{cls.time}</span>
                      <span className="text-xs text-gray-400 mt-0.5">to</span>
                      <span className="text-sm font-bold text-gray-900">{cls.endTime}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900">{cls.course}</h4>
                        <Badge className={`text-xs border-none ${badgeColorMap[cls.type]}`}>{cls.type}</Badge>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {cls.room}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" /> {cls.instructor}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
              <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h4 className="text-gray-700 font-medium">No classes scheduled</h4>
              <p className="text-sm text-gray-500 mt-1">Enjoy your free day!</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
