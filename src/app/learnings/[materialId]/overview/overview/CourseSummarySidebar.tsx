"use client"

import { BadgeCheck, Calendar, Clock, Languages, Share2, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const CourseSummarySidebar = () => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-5 border border-gray-200 sticky top-6">
      <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">Course Summary</h3>

      <div className="flex items-center justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-600" />
          <span>Estimation</span>
        </div>
        <span className="font-medium text-gray-900">2h 30m</span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <span>Points</span>
        </div>
        <span className="font-medium text-gray-900">120 XP</span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Languages className="w-4 h-4 text-blue-600" />
          <span>Language</span>
        </div>
        <span className="font-medium text-gray-900">English</span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <BadgeCheck className="w-4 h-4 text-green-600" />
          <span>Certificate</span>
        </div>
        <span className="font-medium text-green-600">Available</span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-red-500" />
          <span>Due Date</span>
        </div>
        <span className="font-medium text-red-500">May 5, 2025</span>
      </div>

      <div className="border-t border-gray-100 pt-4 mt-2">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
          Continue Learning
        </Button>
        <Button variant="outline" className="w-full mt-3 border-gray-200 text-gray-700 hover:bg-gray-50 flex justify-center gap-2">
          <Share2 className="w-4 h-4" />
          Share Course
        </Button>
      </div>
    </div>
  )
}

export default CourseSummarySidebar
