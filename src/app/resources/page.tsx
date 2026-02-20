"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Book, FileText, Download, Filter, FileCode2, Presentation, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock resource data
const allResources = [
  {
    id: "res-1",
    title: "Database System Fundamentals",
    course: "Database Systems",
    type: "PDF",
    size: "4.2 MB",
    uploadedBy: "Dr. Robert Chen",
    uploadDate: "May 10, 2025",
    category: "E-Books",
    icon: <Book className="h-6 w-6 text-blue-500" />
  },
  {
    id: "res-2",
    title: "Week 4: Advanced SQL Queries",
    course: "Database Systems",
    type: "PPTX",
    size: "8.5 MB",
    uploadedBy: "Dr. Robert Chen",
    uploadDate: "May 12, 2025",
    category: "Lecture Slides",
    icon: <Presentation className="h-6 w-6 text-orange-500" />
  },
  {
    id: "res-3",
    title: "React Hooks Cheat Sheet",
    course: "Web Technology",
    type: "PDF",
    size: "1.1 MB",
    uploadedBy: "Prof. Sarah Jenkins",
    uploadDate: "April 28, 2025",
    category: "Cheat Sheets",
    icon: <FileText className="h-6 w-6 text-red-500" />
  },
  {
    id: "res-4",
    title: "Binary Tree Implementation",
    course: "Data Structures",
    type: "ZIP",
    size: "245 KB",
    uploadedBy: "Dr. Alan Turing",
    uploadDate: "April 15, 2025",
    category: "Source Code",
    icon: <FileCode2 className="h-6 w-6 text-green-500" />
  },
  {
    id: "res-5",
    title: "Midterm Exam 2024 - With Solutions",
    course: "Data Structures",
    type: "PDF",
    size: "3.4 MB",
    uploadedBy: "Dr. Alan Turing",
    uploadDate: "March 10, 2025",
    category: "Past Exams",
    icon: <FileText className="h-6 w-6 text-purple-500" />
  },
  {
    id: "res-6",
    title: "Next.js App Router Guide",
    course: "Web Technology",
    type: "PDF",
    size: "5.6 MB",
    uploadedBy: "Prof. Sarah Jenkins",
    uploadDate: "May 05, 2025",
    category: "E-Books",
    icon: <Book className="h-6 w-6 text-blue-500" />
  }
];

export default function ResourcesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const courses = Array.from(new Set(allResources.map(r => r.course)));
  const categories = Array.from(new Set(allResources.map(r => r.category)));

  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          resource.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = courseFilter === "all" || resource.course === courseFilter;
    const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter;
    
    return matchesSearch && matchesCourse && matchesCategory;
  });

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
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Resource Library</h1>
            <p className="mt-1 text-sm text-gray-500">
              Access and download shared materials across all your enrolled courses.
            </p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search resources by title or course..." 
              className="pl-9 bg-gray-50 border-gray-200 focus-visible:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 md:w-auto">
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger className="w-full sm:w-[200px] bg-gray-50 border-gray-200 focus:ring-indigo-500">
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

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-gray-200 focus:ring-indigo-500">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <div 
                key={resource.id} 
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200 flex flex-col h-full group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-indigo-50/50 transition-colors">
                    {resource.icon}
                  </div>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium border-none">
                    {resource.type}
                  </Badge>
                </div>
                
                <div className="flex-1 space-y-2">
                  <Link href={`/resources/${resource.id}`} className="block group-hover:text-indigo-600 transition-colors">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2 leading-tight">
                      {resource.title}
                    </h3>
                  </Link>
                  <p className="text-sm font-medium text-indigo-600">{resource.course}</p>
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> {resource.uploadDate}
                    </span>
                    <span className="text-xs font-medium text-gray-700">{resource.size}</span>
                  </div>
                  <Button size="sm" variant="outline" className="border-indigo-100 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
              <Search className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-500 mb-6">We couldn't find any materials matching your current filters.</p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setCourseFilter("all");
                  setCategoryFilter("all");
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
