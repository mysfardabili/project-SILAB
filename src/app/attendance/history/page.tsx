"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { attendanceData } from "@/lib/data/attendance-mock";
import { AttendanceRecord } from "@/lib/types/attendance";

// Since the mock data only has 3 items, let's extend it here for the history view
const extendedHistory: AttendanceRecord[] = [
  ...attendanceData.recentAttendance,
  {
    id: "4",
    date: "April 15, 2025",
    course: "Computer Networks",
    status: "present",
    time: "10:05 AM",
    instructor: "Prof. Alan Turing",
  },
  {
    id: "5",
    date: "April 14, 2025",
    course: "Data Structures",
    status: "excused",
    time: "N/A",
    instructor: "Prof. James Rodriguez",
  },
  {
    id: "6",
    date: "April 12, 2025",
    course: "Web Technology",
    status: "present",
    time: "9:02 AM",
    instructor: "Dr. Emily Chen",
  },
  {
    id: "7",
    date: "April 11, 2025",
    course: "Computer Networks",
    status: "present",
    time: "10:00 AM",
    instructor: "Prof. Alan Turing",
  },
  {
    id: "8",
    date: "April 10, 2025",
    course: "Data Structures",
    status: "present",
    time: "2:05 PM",
    instructor: "Prof. James Rodriguez",
  },
];

export default function AttendanceHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredHistory = extendedHistory.filter((record) => {
    const matchesSearch = record.course.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          record.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === "all" || record.course === courseFilter;
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    
    return matchesSearch && matchesCourse && matchesStatus;
  });

  const getStatusBadge = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-none font-medium">Present</Badge>;
      case "late":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-none font-medium">Late</Badge>;
      case "absent":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 border-none font-medium">Absent</Badge>;
      case "excused":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-none font-medium">Excused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Extract unique courses for the filter
  const courses = Array.from(new Set(extendedHistory.map((r) => r.course)));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link 
              href="/dashboard/attendance"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-2 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Attendance History</h1>
            <p className="mt-1 text-sm text-gray-500">
              View your complete attendance record across all courses.
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              type="button" 
              className="inline-flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Export CSV
            </button>
            <Link 
              href="/attendance/request-correction"
              className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-sm text-sm font-medium transition-colors"
            >
              Request Correction
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search by course or instructor..." 
              className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 md:w-auto">
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-gray-200 focus:ring-indigo-500">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="All Courses" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map(course => (
                  <SelectItem key={course} value={course}>{course}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[150px] bg-gray-50 border-gray-200 focus:ring-indigo-500">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="excused">Excused</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table container */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Date</th>
                  <th className="px-6 py-4">Course & Instructor</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Time Recorded</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                        {record.date}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                           <span className="font-semibold text-gray-900">{record.course}</span>
                          <span className="text-gray-500 text-xs mt-0.5">{record.instructor}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(record.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                        {record.time || "N/A"}
                        {record.status === "late" && record.lateMinutes && (
                          <span className="ml-1 text-xs text-amber-600">({record.lateMinutes}m late)</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button type="button" className="px-3 py-1 text-sm font-medium rounded-md text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 transition-colors">
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      <div className="flex flex-col items-center justify-center">
                        <Search className="h-10 w-10 text-gray-300 mb-3" />
                        <p className="text-lg font-medium text-gray-900">No attendance records found</p>
                        <p className="text-sm mt-1">Try adjusting your filters or search term.</p>
                        <button 
                          type="button"
                          className="mt-4 px-4 py-2 border border-gray-200 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setSearchTerm("");
                            setCourseFilter("all");
                            setStatusFilter("all");
                          }}
                        >
                          Clear all filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {filteredHistory.length > 0 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">
                Showing <span className="font-medium text-gray-900">1</span> to <span className="font-medium text-gray-900">{filteredHistory.length}</span> of <span className="font-medium text-gray-900">{filteredHistory.length}</span> results
              </span>
              <div className="flex gap-2">
                <button disabled className="px-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-400 cursor-not-allowed bg-gray-50">Previous</button>
                <button disabled className="px-3 py-1.5 text-sm border border-gray-200 rounded-md text-gray-400 cursor-not-allowed bg-gray-50">Next</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
