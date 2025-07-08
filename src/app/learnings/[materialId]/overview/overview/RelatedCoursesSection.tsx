"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

const relatedCourses = [
  {
    title: "Mastering API Development",
    level: "Intermediate",
    duration: "5h 30m",
    image: "/course-thumbnails/api.png",
  },
  {
    title: "Build Scalable Backend with Node.js",
    level: "Advanced",
    duration: "7h 45m",
    image: "/course-thumbnails/nodejs.png",
  },
]

export default function RelatedCoursesSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Courses</h3>
      <div className="space-y-4">
        {relatedCourses.map((course, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
              <Image
                src={course.image}
                alt={course.title}
                width={40}
                height={40}
                className="object-cover"
              />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm">{course.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-600">{course.level}</span>
                <span className="text-gray-400">•</span>
                <span className="text-xs text-gray-600">{course.duration}</span>
              </div>
              <Button
                variant="link"
                className="text-indigo-600 hover:text-indigo-700 p-0 h-auto text-sm mt-1"
              >
                View Course
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
