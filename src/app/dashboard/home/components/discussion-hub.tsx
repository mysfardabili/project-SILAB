"use client";

import { MessageSquare, ChevronRight, Users, Reply, ThumbsUp, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock data
const discussionData = {
    recentPosts: [
        {
            id: "1",
            title: "How to implement recursion in linked lists?",
            author: "Sarah Wilson",
            authorAvatar: "",
            course: "Data Structures",
            replies: 5,
            likes: 3,
            timeAgo: "2 hours ago"
        },
        {
            id: "2",
            title: "Best practices for responsive web design?",
            author: "David Kim",
            authorAvatar: "",
            course: "Web Technology",
            replies: 12,
            likes: 8,
            timeAgo: "Yesterday"
        }
    ],
    unansweredQuestions: [
        {
            id: "3",
            title: "Trouble with flexbox alignment",
            author: "Raj Patel",
            authorAvatar: "",
            course: "Web Technology",
            timeAgo: "3 hours ago"
        }
    ],
    courseDiscussions: {
        "Web Technology": 27,
        "Data Structures": 15
    }
};

const getInitials = (name: string): string => {
    return name && typeof name === 'string' 
        ? name.split(' ').map((n: string) => n[0]).join('')
        : '';
};

const DiscussionHub = ({ data = discussionData }) => {
    // Ensure data has all required properties with fallbacks for empty data
    const safeData = {
        recentPosts: Array.isArray(data?.recentPosts) ? data.recentPosts : [],
        unansweredQuestions: Array.isArray(data?.unansweredQuestions) ? data.unansweredQuestions : [],
        courseDiscussions: data?.courseDiscussions || {}
    };

    const hasRecentPosts = safeData.recentPosts.length > 0;
    const hasUnansweredQuestions = safeData.unansweredQuestions.length > 0;
    const hasCourseDiscussions = Object.keys(safeData.courseDiscussions).length > 0;

    return (
        <div className="mt-6 rounded-lg bg-white shadow-md overflow-hidden h-full">
            <div className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-indigo-500" />
                    <h3 className="text-lg font-semibold text-gray-800">Class Discussions</h3>
                </div>
            </div>
            <Separator className="my-2" />
            <div className="px-6 py-4 space-y-5">
                {/* Recent Posts */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <MessageCircle className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm font-medium text-gray-600">Recent Discussions</span>
                    </div>
                    {hasRecentPosts ? (
                        <div className="space-y-2">
                            {safeData.recentPosts.map((post) => (
                                <div key={post.id} className="bg-gray-50 rounded-md border-l-4 border-indigo-400 py-2 px-3">
                                    <Link
                                        href={`/dashboard/home/discussions/${post.id}`}
                                        className="text-sm font-medium text-gray-700 hover:text-indigo-700 transition-colors duration-200"
                                    >
                                        {post.title}
                                    </Link>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-5 w-5">
                                                <AvatarImage src={post.authorAvatar} alt={post.author || ''} />
                                                <AvatarFallback className="bg-indigo-100 text-indigo-800 text-xs">
                                                    {getInitials(post.author)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs text-gray-500">{post.author}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">{post.timeAgo}</span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-2">
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <Reply className="h-3 w-3" />
                                            {post.replies || 0} replies
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <ThumbsUp className="h-3 w-3" />
                                            {post.likes || 0} likes
                                        </div>
                                        <span className="text-xs text-gray-500">{post.course}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-md py-4 px-3 text-center">
                            <p className="text-sm text-gray-500">No recent discussions available</p>
                        </div>
                    )}
                </div>

                {/* Unanswered Questions */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Users className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm font-medium text-gray-600">Unanswered Questions</span>
                    </div>
                    {hasUnansweredQuestions ? (
                        <div className="space-y-2">
                            {safeData.unansweredQuestions.map((question) => (
                                <div key={question.id} className="bg-gray-50 rounded-md border-l-4 border-amber-400 py-2 px-3">
                                    <Link
                                        href={`/dashboard/home/discussions/${question.id}`}
                                        className="text-sm font-medium text-gray-700 hover:text-indigo-700 transition-colors duration-200"
                                    >
                                        {question.title}
                                    </Link>
                                    <div className="flex justify-between items-center mt-2">
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-5 w-5">
                                                <AvatarImage src={question.authorAvatar} alt={question.author || ''} />
                                                <AvatarFallback className="bg-amber-100 text-amber-800 text-xs">
                                                    {getInitials(question.author)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-xs text-gray-500">{question.author}</span>
                                        </div>
                                        <span className="text-xs text-gray-500">{question.timeAgo}</span>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <span className="text-xs text-amber-600 font-medium">Help needed</span>
                                        <span className="text-xs text-gray-400 mx-2">•</span>
                                        <span className="text-xs text-gray-500">{question.course}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-md py-4 px-3 text-center">
                            <p className="text-sm text-gray-500">No unanswered questions at the moment</p>
                        </div>
                    )}
                </div>

                {/* Course Discussion Stats */}
                {hasCourseDiscussions ? (
                    <div className="bg-indigo-50 rounded-md p-3">
                        <div className="text-sm font-medium text-indigo-700 mb-2">Course Discussions</div>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(safeData.courseDiscussions).map(([course, count]) => (
                                <Link
                                    key={course}
                                    href={`/dashboard/home/discussions/course/${course.toLowerCase().replace(' ', '-')}`}
                                    className="inline-flex items-center gap-1 py-1 px-3 bg-white rounded-full text-xs font-medium text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-colors duration-200"
                                >
                                    {course} <span className="bg-indigo-100 text-indigo-800 rounded-full px-1.5">{count}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-indigo-50 rounded-md p-3 text-center">
                        <div className="text-sm font-medium text-indigo-700 mb-2">Course Discussions</div>
                        <p className="text-sm text-indigo-500">No course discussions available</p>
                    </div>
                )}

                <div className="flex justify-between pt-2">
                    <Link
                        href="/dashboard/home/discussions/new"
                        className="inline-flex items-center text-sm font-medium text-green-600 hover:text-green-800 transition-colors duration-200"
                    >
                        Ask a question <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                    <Link
                        href="/dashboard/home/discussions"
                        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    >
                        All discussions <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DiscussionHub;