"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const instructors = [
  {
    name: "Alex Morgan",
    role: "Senior Developer",
    avatar: "/avatars/instructor-1.png",
  },
  {
    name: "Sarah Chen",
    role: "System Architect",
    avatar: "/avatars/instructor-2.png",
  },
]

export default function InstructorsSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Your Instructors</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {instructors.map((instructor, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={instructor.avatar} alt={instructor.name} />
              <AvatarFallback>
                {instructor.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-gray-900">{instructor.name}</h3>
              <p className="text-sm text-gray-600">{instructor.role}</p>
              <p className="text-sm text-gray-700 mt-2">
                Industry expert with over 10 years of experience in backend
                development and system architecture.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
