"use client";

import { Brain, ChevronRight, TrendingUp, Target, Award } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// Mock data
const skillsData = {
  topSkills: [
    { id: "1", name: "HTML", level: 85, trend: "up" },
    { id: "2", name: "CSS", level: 78, trend: "up" },
    { id: "3", name: "JavaScript", level: 65, trend: "up" }
  ],
  improvementAreas: [
    { id: "4", name: "Data Structures", level: 45, tip: "Focus on linked list exercises" },
    { id: "5", name: "Algorithms", level: 40, tip: "Practice more sorting algorithms" }
  ],
  completedCourses: 2,
  totalCourses: 5,
  completedModules: 8,
  totalModules: 20,
  recentBadge: {
    name: "Fast Learner",
    description: "Completed 3 modules in a week",
    date: "2 days ago"
  }
};

const SkillGraph = () => {
  return (
    <div className="mt-6 rounded-lg bg-white shadow-md overflow-hidden h-full">
      <div className="px-6 py-4">
        <div className="flex items-center gap-3">
          <Brain className="h-5 w-5 text-indigo-500" />
          <h3 className="text-lg font-semibold text-gray-800">Knowledge Map</h3>
        </div>
      </div>
      <Separator className="my-2" />
      <div className="px-6 py-4 space-y-5">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-md p-3 text-center">
            <span className="text-xs text-gray-500">Courses Progress</span>
            <div className="mt-1 text-lg font-bold text-indigo-600">{skillsData.completedCourses}/{skillsData.totalCourses}</div>
          </div>
          <div className="bg-gray-50 rounded-md p-3 text-center">
            <span className="text-xs text-gray-500">Modules Completed</span>
            <div className="mt-1 text-lg font-bold text-indigo-600">{skillsData.completedModules}/{skillsData.totalModules}</div>
          </div>
        </div>
        
        {/* Top Skills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="h-4 w-4 text-indigo-500" />
            <span className="text-sm font-medium text-gray-600">Your Top Skills</span>
          </div>
          <div className="space-y-2">
            {skillsData.topSkills.map((skill) => (
              <div key={skill.id} className="bg-gray-50 rounded-md border-l-4 border-green-400 py-2 px-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-indigo-600">{skill.level}%</span>
                    {skill.trend === "up" && <TrendingUp className="h-3 w-3 text-green-500" />}
                  </div>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-indigo-500 h-1.5 rounded-full" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Areas for Improvement */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-4 w-4 text-indigo-500" />
            <span className="text-sm font-medium text-gray-600">Areas for Improvement</span>
          </div>
          <div className="space-y-2">
            {skillsData.improvementAreas.map((skill) => (
              <div key={skill.id} className="bg-gray-50 rounded-md border-l-4 border-amber-400 py-2 px-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                  <span className="text-xs font-bold text-indigo-600">{skill.level}%</span>
                </div>
                <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-amber-500 h-1.5 rounded-full" 
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Tip: {skill.tip}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Badge */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-md p-3 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <Award className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <div className="text-sm font-medium text-indigo-700">{skillsData.recentBadge.name}</div>
            <div className="text-xs text-indigo-600">{skillsData.recentBadge.description}</div>
            <div className="text-xs text-gray-500 mt-1">Earned {skillsData.recentBadge.date}</div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Link 
            href="/skills" 
            className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
          >
            View full skill map <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SkillGraph;