import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { use } from "react";

interface HomeCourseDiscussionPageProps {
  params: Promise<{
    course: string;
  }>;
}

export default function HomeCourseDiscussionPage({ params: paramsPromise }: HomeCourseDiscussionPageProps) {
  const params = use(paramsPromise);
  const courseName = params.course.replace('-', ' ');
  
  return (
    <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/dashboard/home/discussions"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Discussions
        </Link>
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900 capitalize">{courseName} Discussions</h1>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Course Discussions Coming Soon
          </h2>
          <p className="text-gray-500 mb-6">
            Course-specific discussions for <span className="font-medium capitalize">{courseName}</span> will be available soon.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard/home/discussions/new">
              <Button variant="outline">Ask Question</Button>
            </Link>
            <Link href="/dashboard/home/discussions">
              <Button>All Discussions</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}