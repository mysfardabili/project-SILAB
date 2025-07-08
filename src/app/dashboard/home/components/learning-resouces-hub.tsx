"use client";

import { Book, FileText, Video, Link as LinkIcon, ChevronRight, Download, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const resourcesData = {
    recommendedResources: [
        {
            id: "1",
            title: "Advanced CSS Techniques",
            type: "article",
            source: "CSS-Tricks",
            relevance: "Matches your Web Technology course"
        },
        {
            id: "2",
            title: "Data Structures Visualization",
            type: "interactive",
            source: "CS Visualized",
            relevance: "Helpful for Module 2 - Linked Lists"
        },
        {
            id: "3",
            title: "JavaScript ES6+ Features",
            type: "video",
            source: "Tech Academy",
            relevance: "Related to your learning path"
        }
    ],
    courseSpecificResources: [
        {
            id: "4",
            title: "Web Technology - Lecture Notes",
            type: "document",
            course: "Web Technology",
            downloads: 235
        },
        {
            id: "5",
            title: "Linked List Implementation Examples",
            type: "code",
            course: "Data Structures",
            downloads: 187
        }
    ]
};

const getResourceIcon = (type: any) => {
    switch (type) {
        case 'article': return <FileText className="h-4 w-4 text-blue-500" />;
        case 'video': return <Video className="h-4 w-4 text-red-500" />;
        case 'interactive': return <LinkIcon className="h-4 w-4 text-green-500" />;
        case 'document': return <Book className="h-4 w-4 text-amber-500" />;
        case 'code': return <FileText className="h-4 w-4 text-indigo-500" />;
        default: return <FileText className="h-4 w-4 text-gray-500" />;
    }
};

const LearningResourcesHub = () => {
    return (
        <div className="mt-6 rounded-lg bg-white shadow-md overflow-hidden h-full">
            <div className="px-6 py-4">
                <div className="flex items-center gap-3">
                    <Book className="h-5 w-5 text-indigo-500" />
                    <h3 className="text-lg font-semibold text-gray-800">Learning Resources</h3>
                </div>
            </div>
            <Separator className="my-2" />
            <div className="px-6 py-4 space-y-5">
                {/* Recommended Resources */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Star className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm font-medium text-gray-600">Recommended For You</span>
                    </div>
                    <div className="space-y-2">
                        {resourcesData.recommendedResources.map((resource) => (
                            <div key={resource.id} className="bg-gray-50 rounded-md border-l-4 border-indigo-400 py-2 px-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        {getResourceIcon(resource.type)}
                                        <span className="text-sm font-medium text-gray-700">{resource.title}</span>
                                    </div>
                                    <Link
                                        href={`/resources/${resource.id}`}
                                        className="inline-flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                                    >
                                        View <ChevronRight className="ml-1 h-3 w-3" />
                                    </Link>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">{resource.source}</span>
                                    <span className="text-xs text-gray-500">{resource.relevance}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Course Materials */}
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <Download className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm font-medium text-gray-600">Course Materials</span>
                    </div>
                    <div className="space-y-2">
                        {resourcesData.courseSpecificResources.map((resource) => (
                            <div key={resource.id} className="bg-gray-50 rounded-md border-l-4 border-amber-400 py-2 px-3">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        {getResourceIcon(resource.type)}
                                        <span className="text-sm font-medium text-gray-700">{resource.title}</span>
                                    </div>
                                    <Link
                                        href={`/resources/${resource.id}/download`}
                                        className="inline-flex items-center text-xs font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                                    >
                                        Download <Download className="ml-1 h-3 w-3" />
                                    </Link>
                                </div>
                                <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-gray-500">{resource.course}</span>
                                    <span className="text-xs text-gray-500">{resource.downloads} downloads</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <Link
                        href="/resources"
                        className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    >
                        Browse all resources <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LearningResourcesHub;