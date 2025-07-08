import React from 'react';
<<<<<<< HEAD
import { Button } from '@/components/ui/button'; // If you have custom button
import { cn } from '@/lib/utils'; // If you have a utility for class names

const ComingSoonPage = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900">
                    Coming Soon
                </h1>
                <p className="text-lg sm:text-xl text-gray-600">
                    We're preparing something special. Stay tuned!
                </p>
                <Button
                    variant="default"
                    size="lg"
                    className={cn(
                        "bg-blue-600 text-white font-semibold px-6 py-3 rounded-full",
                        "hover:bg-blue-700 transition-colors duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    )}
                >
                    Get Notified
                </Button>
            </div>
        </div>
    );
};

export default ComingSoonPage;
=======
import Link from 'next/link';
import { allRoadmaps } from '@/lib/roadmap-data'; // 1. Impor data
import { Bookmark } from 'lucide-react'; // Ikon dari shadcn

const RoadmapsPage = () => {
  return (
    <div className="bg-white p-6 sm:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            SILAB Developer Roadmaps
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            SILAB Developer Roadmaps provides a clear, role-based guide for building and maintaining the platform. It helps developers across frontend, backend, DevOps, and integration focus on key tasks and technologies to ensure a seamless and effective learning experience.
          </p>
        </div>

        {/* Role-based chip */}
        <div className="flex justify-center mb-10">
          <span className="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-4 py-2 rounded-full">
            Role-based Roadmaps
          </span>
        </div>

        {/* Grid of Roadmaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allRoadmaps.map((roadmap) => (
            <Link 
              href={`/dashboard/roadmaps/${roadmap.slug}`} 
              key={roadmap.slug}
              className="bg-blue-600 text-white p-4 rounded-xl flex justify-between items-center hover:bg-blue-700 transition-transform transform hover:-translate-y-1 shadow-lg"
            >
              <span className="font-semibold text-lg">{roadmap.title}</span>
              <div className="bg-blue-700/50 p-2 rounded-md">
                <Bookmark className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoadmapsPage;
>>>>>>> 1f8a131 (first commit)
