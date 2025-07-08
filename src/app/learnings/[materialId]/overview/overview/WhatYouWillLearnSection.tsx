"use client"

import { Check } from "lucide-react"

const WhatYouWillLearnSection = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-xl font-bold text-gray-900 mb-4">What You'll Learn</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          "Design scalable database architectures",
          "Build RESTful and GraphQL APIs",
          "Implement authentication and authorization",
          "Deploy and scale backend services",
          "Optimize application performance",
          "Implement message queues and caching"
        ].map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="mt-1 bg-indigo-100 rounded-full p-1">
              <Check className="w-4 h-4 text-indigo-600" />
            </div>
            <span className="text-gray-700">{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WhatYouWillLearnSection
