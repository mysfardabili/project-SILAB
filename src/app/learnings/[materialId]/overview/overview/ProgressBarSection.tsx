"use client"

import React from "react"
import { Progress } from "@/components/ui/progress"

const ProgressBarSection = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h3 className="font-medium text-gray-900">Your Progress</h3>
          <p className="text-sm text-gray-600">You've completed 2 of 8 modules</p>
        </div>
        <div className="w-full md:w-2/3">
          <Progress value={25} className="h-2 bg-gray-200" />
          <div className="flex justify-between mt-1">
            <span className="text-xs font-medium text-indigo-600">25% complete</span>
            <span className="text-xs text-gray-500">Last accessed: 2 days ago</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressBarSection
