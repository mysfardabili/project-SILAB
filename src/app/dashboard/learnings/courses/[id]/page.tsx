import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Users, Award, Play, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { use } from "react";

interface CourseDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function CourseDetailPage({ params: paramsPromise }: CourseDetailPageProps) {
  const params = use(paramsPromise);
  const courseId = params.id;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link 
            href="/dashboard/learnings"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learning
          </Link>
        </div>

        {/* Coming Soon Content */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="text-center py-16 px-6">
            <div className="mb-6">
              <Wrench className="h-20 w-20 text-blue-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Coming Soon!
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Course Detail Page
              </p>
              <p className="text-gray-500 max-w-md mx-auto">
                We're working hard to bring you an amazing course learning experience. 
                This feature will be available soon!
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">What's Coming:</h3>
              <ul className="text-sm text-blue-700 text-left space-y-1 max-w-xs mx-auto">
                <li>• Interactive course modules</li>
                <li>• Progress tracking</li>
                <li>• Video lessons</li>
                <li>• Quizzes and assignments</li>
                <li>• Certificates</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/dashboard/learnings">
                <Button className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Back to Learning
                </Button>
              </Link>
              <Link href="/dashboard/home">
                <Button variant="outline" className="flex items-center gap-2">
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            <div className="mt-8 text-xs text-gray-400">
              Course ID: {courseId}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}