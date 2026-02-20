"use client"

import Link from "next/link";
import { MessageSquare, Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dummy data for discussions
const discussions = [
  {
    id: "1",
    title: "How to handle authentication in Next.js 15 App Router?",
    author: {
      name: "Alex Morgan",
      avatar: "/avatars/instructor-1.png",
    },
    replies: 12,
    views: 145,
    lastActive: "2 hours ago",
    tags: ["Next.js", "Auth"],
  },
  {
    id: "2",
    title: "Understanding Server Actions vs API Routes",
    author: {
      name: "Sarah Chen",
      avatar: "/avatars/instructor-2.png",
    },
    replies: 8,
    views: 92,
    lastActive: "5 hours ago",
    tags: ["Server Actions", "API"],
  },
  {
    id: "3",
    title: "Best practices for Tailwind CSS architecture",
    author: {
      name: "John Doe",
      avatar: "",
    },
    replies: 5,
    views: 64,
    lastActive: "1 day ago",
    tags: ["Tailwind", "CSS"],
  },
];

export default function DiscussionsListPage() {
  return (
    <div className="py-6 px-6 md:py-8 md:px-12 lg:px-24 xl:px-24 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <MessageSquare className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Discussion Forum</h1>
            <p className="text-sm text-gray-500">Join the conversation with other learners and instructors.</p>
          </div>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Discussion
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-100 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search discussions..." 
            className="pl-9 bg-gray-50 border-gray-200"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-200">All Topics</Button>
          <Button variant="outline" className="border-gray-200">My Posts</Button>
        </div>
      </div>

      {/* Discussions List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        {discussions.map((discussion, index) => (
          <div key={discussion.id}>
            <div className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-4 items-start flex-grow">
                  <Avatar className="h-10 w-10 mt-1">
                    <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                    <AvatarFallback>{discussion.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <Link href={`/dashboard/home/discussions/${discussion.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                        {discussion.title}
                      </h3>
                    </Link>
                    
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-gray-500">
                      <span>By {discussion.author.name}</span>
                      <span>•</span>
                      <span>{discussion.lastActive}</span>
                      
                      <div className="flex gap-2 ml-2">
                        {discussion.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 sm:gap-8 ml-14 sm:ml-0 text-sm text-gray-500 shrink-0">
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-gray-900">{discussion.replies}</span>
                    <span className="text-xs">Replies</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-gray-900">{discussion.views}</span>
                    <span className="text-xs">Views</span>
                  </div>
                </div>
              </div>
            </div>
            
            {index < discussions.length - 1 && (
              <div className="h-px bg-gray-100 w-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}