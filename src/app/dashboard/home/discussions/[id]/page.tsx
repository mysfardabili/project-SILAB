import Link from "next/link";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HomeDiscussionDetailPageProps {
  params: {
    id: string;
  };
}

export default function HomeDiscussionDetailPage({ params }: HomeDiscussionDetailPageProps) {
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
          <MessageSquare className="h-6 w-6 text-indigo-500" />
          <h1 className="text-2xl font-bold text-gray-900">Discussion #{params.id}</h1>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">
            Discussion Detail Coming Soon
          </h2>
          <p className="text-gray-500 mb-6">
            This discussion feature is under development. Discussion ID: {params.id}
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard/home/discussions">
              <Button variant="outline">All Discussions</Button>
            </Link>
            <Link href="/dashboard/home">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}