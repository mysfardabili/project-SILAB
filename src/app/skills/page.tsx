"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Brain, TrendingUp, Target, Award, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const skillsData = {
  topSkills: [
    { id: "1", name: "HTML & CSS", level: 85, category: "Frontend", trend: "up" },
    { id: "2", name: "JavaScript", level: 72, category: "Frontend", trend: "up" },
    { id: "3", name: "React.js", level: 65, category: "Frontend", trend: "up" },
    { id: "4", name: "Node.js", level: 55, category: "Backend", trend: "up" },
    { id: "5", name: "SQL & Databases", level: 60, category: "Backend", trend: "same" },
    { id: "6", name: "Git & Version Control", level: 78, category: "Tools", trend: "same" },
  ],
  improvementAreas: [
    { id: "7", name: "Data Structures", level: 45, tip: "Practice linked lists and trees daily" },
    { id: "8", name: "Algorithms", level: 38, tip: "Complete sorting algorithm exercises" },
    { id: "9", name: "System Design", level: 30, tip: "Study common architecture patterns" },
  ],
  badges: [
    { id: "b1", name: "Fast Learner", description: "Completed 3 modules in one week", icon: "🚀", date: "2 days ago" },
    { id: "b2", name: "HTML Master", description: "100% score on HTML Fundamentals", icon: "🏆", date: "1 week ago" },
    { id: "b3", name: "Consistent Coder", description: "10-day learning streak", icon: "🔥", date: "2 weeks ago" },
    { id: "b4", name: "Team Player", description: "Participated in 5 group discussions", icon: "🤝", date: "3 weeks ago" },
  ],
  stats: {
    totalSkills: 9,
    masteredSkills: 2,
    inProgressSkills: 5,
    totalXP: 1240,
    currentLevel: "Intermediate",
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Frontend": return "bg-blue-100 text-blue-700";
    case "Backend": return "bg-green-100 text-green-700";
    case "Tools": return "bg-purple-100 text-purple-700";
    default: return "bg-gray-100 text-gray-700";
  }
};

const getSkillBarColor = (level: number) => {
  if (level >= 75) return "bg-emerald-500";
  if (level >= 50) return "bg-indigo-500";
  return "bg-amber-500";
};

export default function SkillsPage() {
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
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Skill Map</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track your technical skills, achievements, and areas for growth.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Brain className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Current Level</p>
              <p className="text-lg font-bold text-gray-900">{skillsData.stats.currentLevel}</p>
              <p className="text-xs text-indigo-600 font-medium">{skillsData.stats.totalXP} XP earned</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Skills", value: skillsData.stats.totalSkills, color: "text-gray-900" },
            { label: "Mastered", value: skillsData.stats.masteredSkills, color: "text-emerald-600" },
            { label: "In Progress", value: skillsData.stats.inProgressSkills, color: "text-indigo-600" },
            { label: "Total XP", value: `${skillsData.stats.totalXP}`, color: "text-amber-600" },
          ].map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm bg-white">
              <CardContent className="p-5 text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Skill Levels */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="border-b border-gray-50 bg-gray-50/50 pb-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  <CardTitle className="text-xl text-gray-900">Your Skills</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {skillsData.topSkills.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{skill.name}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getCategoryColor(skill.category)}`}>
                          {skill.category}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-gray-700">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${getSkillBarColor(skill.level)}`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="border-b border-gray-50 bg-gray-50/50 pb-4">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-amber-500" />
                  <CardTitle className="text-xl text-gray-900">Areas for Improvement</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {skillsData.improvementAreas.map((skill) => (
                  <div key={skill.id}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <span className="text-sm font-bold text-gray-700">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full bg-amber-400 transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                      <Zap className="h-3 w-3 text-amber-500" />
                      Tip: {skill.tip}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Badges */}
          <div>
            <Card className="border-gray-100 shadow-sm">
              <CardHeader className="border-b border-gray-50 bg-gray-50/50 pb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-500" />
                  <CardTitle className="text-xl text-gray-900">Badges Earned</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {skillsData.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-indigo-50/50 transition-colors"
                  >
                    <div className="text-2xl shrink-0">{badge.icon}</div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{badge.name}</h4>
                      <p className="text-xs text-gray-600 mt-0.5">{badge.description}</p>
                      <p className="text-xs text-gray-400 mt-1">Earned {badge.date}</p>
                    </div>
                  </div>
                ))}

                <div className="pt-2 text-center">
                  <Button variant="outline" className="w-full text-indigo-600 border-indigo-200 hover:bg-indigo-50">
                    View All Badges
                    <ChevronRight className="ml-1 h-4 w-4" />
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
