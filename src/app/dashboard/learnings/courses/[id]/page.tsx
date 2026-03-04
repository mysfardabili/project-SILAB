import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Users, Award, Play, ChevronRight, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { use } from "react";

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

const courseMockData: Record<string, {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  progress: number;
  category: string;
  level: string;
  modules: { id: string; title: string; lessons: number; duration: string; completed: boolean; locked: boolean }[];
}> = {
  DEFAULT: {
    id: "default",
    title: "Full Stack Web Development",
    description: "Master modern web development from frontend to backend. Build complete, production-ready applications using Next.js, TypeScript, and Node.js.",
    instructor: "Prof. Sarah Jenkins",
    duration: "24 hours",
    students: 342,
    progress: 35,
    category: "Web Development",
    level: "Intermediate",
    modules: [
      { id: "m1", title: "Introduction & Setup", lessons: 4, duration: "1h 20m", completed: true, locked: false },
      { id: "m2", title: "HTML & CSS Foundations", lessons: 6, duration: "2h 10m", completed: true, locked: false },
      { id: "m3", title: "JavaScript Essentials", lessons: 8, duration: "3h 45m", completed: true, locked: false },
      { id: "m4", title: "React Fundamentals", lessons: 7, duration: "2h 55m", completed: false, locked: false },
      { id: "m5", title: "Next.js App Router", lessons: 9, duration: "3h 30m", completed: false, locked: false },
      { id: "m6", title: "Database & Prisma ORM", lessons: 6, duration: "2h 40m", completed: false, locked: true },
      { id: "m7", title: "Authentication & Security", lessons: 5, duration: "2h 00m", completed: false, locked: true },
      { id: "m8", title: "Deployment & DevOps", lessons: 4, duration: "1h 30m", completed: false, locked: true },
    ],
  },
};

export default function CourseDetailPage({ params: paramsPromise }: CourseDetailPageProps) {
  const params = use(paramsPromise);
  const courseId = params.id;
  const course = courseMockData[courseId] || { ...courseMockData.DEFAULT, id: courseId };

  const completedModules = course.modules.filter(m => m.completed).length;
  const totalModules = course.modules.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6">

        {/* Back */}
        <Link
          href="/dashboard/learnings"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to My Learning
        </Link>

        {/* Hero */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 rounded-2xl p-6 md:p-8 text-white">
          <div className="flex flex-col lg:flex-row justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">{course.category}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">{course.level}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold leading-tight">{course.title}</h1>
              <p className="text-white/85 text-sm leading-relaxed max-w-2xl">{course.description}</p>

              <div className="flex flex-wrap gap-5 text-sm">
                <span className="flex items-center gap-1.5 text-white/90">
                  <BookOpen className="h-4 w-4" /> {course.instructor}
                </span>
                <span className="flex items-center gap-1.5 text-white/90">
                  <Clock className="h-4 w-4" /> {course.duration}
                </span>
                <span className="flex items-center gap-1.5 text-white/90">
                  <Users className="h-4 w-4" /> {course.students} students
                </span>
              </div>
            </div>

            <div className="lg:shrink-0 flex flex-col gap-3">
              <Button className="bg-white text-indigo-700 hover:bg-white/90 shadow-lg font-semibold gap-2">
                <Play className="h-4 w-4" />
                Continue Learning
              </Button>
              <p className="text-center text-xs text-white/70">
                {completedModules} / {totalModules} modules complete
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="border-gray-100 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Your Progress</span>
              <span className="text-sm font-bold text-indigo-600">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-2.5 bg-gray-100" />
            <p className="text-xs text-gray-500 mt-2">
              {completedModules} of {totalModules} modules completed
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Modules", value: totalModules, icon: <BookOpen className="h-5 w-5 text-indigo-600" />, bg: "bg-indigo-50" },
            { label: "Completed", value: completedModules, icon: <CheckCircle2 className="h-5 w-5 text-emerald-600" />, bg: "bg-emerald-50" },
            { label: "Total Duration", value: course.duration, icon: <Clock className="h-5 w-5 text-amber-600" />, bg: "bg-amber-50" },
            { label: "Certificate", value: "Available", icon: <Award className="h-5 w-5 text-purple-600" />, bg: "bg-purple-50" },
          ].map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm bg-white">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`h-10 w-10 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                  {stat.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-base font-bold text-gray-900 truncate">{stat.value}</p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modules */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Course Content</h2>
          <div className="space-y-3">
            {course.modules.map((module, idx) => (
              <div
                key={module.id}
                className={`bg-white rounded-xl border shadow-sm p-4 md:p-5 flex items-center justify-between gap-4 transition-shadow hover:shadow-md ${
                  module.locked ? "opacity-60 border-gray-100" : "border-gray-100 cursor-pointer"
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center text-sm font-bold ${
                    module.completed
                      ? "bg-emerald-100 text-emerald-700"
                      : module.locked
                      ? "bg-gray-100 text-gray-400"
                      : "bg-indigo-100 text-indigo-700"
                  }`}>
                    {module.completed ? <CheckCircle2 className="h-5 w-5" /> : module.locked ? <Lock className="h-4 w-4" /> : idx + 1}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{module.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {module.lessons} lessons · {module.duration}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-3">
                  {module.completed && (
                    <Badge className="bg-emerald-50 text-emerald-700 border-none text-xs">Done</Badge>
                  )}
                  {!module.locked && !module.completed && (
                    <Button size="sm" variant="outline" className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 gap-1.5">
                      <Play className="h-3 w-3" />
                      Start
                    </Button>
                  )}
                  {module.locked && (
                    <Lock className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}