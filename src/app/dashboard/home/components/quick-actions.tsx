import Link from "next/link";
import { BookOpen, Calendar, FileText, PlayCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuickActions() {
  const actions = [
    {
      title: "Join Next Class",
      description: "Database Systems - Room 301",
      icon: <PlayCircle className="w-5 h-5 text-indigo-500" />,
      href: "/dashboard/learnings",
      color: "bg-indigo-50 hover:bg-indigo-100 border-indigo-100",
    },
    {
      title: "View Assignments",
      description: "2 pending tasks",
      icon: <FileText className="w-5 h-5 text-amber-500" />,
      href: "/dashboard/learnings",
      color: "bg-amber-50 hover:bg-amber-100 border-amber-100",
    },
    {
      title: "Resume Course",
      description: "Web Technology - Module 3",
      icon: <BookOpen className="w-5 h-5 text-emerald-500" />,
      href: "/dashboard/learnings",
      color: "bg-emerald-50 hover:bg-emerald-100 border-emerald-100",
    },
    {
      title: "Check Schedule",
      description: "View weekly agenda",
      icon: <Calendar className="w-5 h-5 text-purple-500" />,
      href: "/dashboard/attendance",
      color: "bg-purple-50 hover:bg-purple-100 border-purple-100",
    },
  ];

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Link key={index} href={action.href}>
            <div className={`flex flex-col p-3 rounded-lg border transition-colors duration-200 h-full ${action.color}`}>
              <div className="mb-2 bg-white w-8 h-8 rounded-md flex items-center justify-center shadow-sm">
                {action.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{action.title}</h3>
              <p className="text-xs text-gray-600 mt-1 line-clamp-1">{action.description}</p>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
