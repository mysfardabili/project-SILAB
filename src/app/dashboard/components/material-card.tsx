"use client";

import { FC } from "react";
import { Copy, BookOpen, LineChart, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MaterialCardProps {
    id: string;
    type: "quiz" | "page" | "learning-path" | "course";
    title: string;
    tags: string[];
    progress?: number;
    totalItems?: number;
    itemType?: string;
    isPriority?: boolean;
    imageUrl?: string;
    certified?: boolean;
}

const MaterialCard: FC<MaterialCardProps> = ({
    id,
    type,
    title,
    tags,
    progress,
    totalItems,
    itemType,
    isPriority = false,
    imageUrl,
    certified = false,
}) => {
    const typeConfig = {
        "quiz": { bgColor: "bg-amber-100", iconBg: "bg-amber-500", icon: <Copy className="h-4 w-4 text-white" />, label: "Quiz", labelColor: "text-amber-500" },
        "page": { bgColor: "bg-teal-100", iconBg: "bg-teal-500", icon: <BookOpen className="h-4 w-4 text-white" />, label: "Page", labelColor: "text-teal-500" },
        "learning-path": { bgColor: "bg-purple-100", iconBg: "bg-purple-500", icon: <LineChart className="h-4 w-4 text-white" />, label: "Learning Path", labelColor: "text-purple-500" },
        "course": { bgColor: "bg-blue-100", iconBg: "bg-blue-500", icon: <Layers className="h-4 w-4 text-white" />, label: "Course", labelColor: "text-blue-500" }
    };

    const config = typeConfig[type];
    const priorityLabel = isPriority ? "Urgent" : "Not Urgent";
    const priorityClass = isPriority ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600";
    const allTags = [...tags, priorityLabel];
    const displayedTags = allTags.slice(0, 3);
    const remainingTagsCount = allTags.length - displayedTags.length;

    return (
        <Link href={`/dashboard/learnings/materials/${type}/${id}`}>
            <div className="rounded-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-gray-300 flex flex-col h-full">
                <div className={`relative ${config.bgColor} h-36`}>
                    {imageUrl && <Image src={imageUrl} alt={title} fill className="object-cover" />}
                    <div className="absolute inset-0 p-3 flex flex-col justify-between">
                        <div className="flex justify-between">
                            {totalItems && (
                                <div className="bg-black/60 rounded-md px-2 py-1 text-white text-xs flex items-center gap-1">
                                    <span>{totalItems}</span>
                                    <span>{itemType}</span>
                                    {certified && <span className="ml-1 p-1 bg-blue-500 rounded-full text-white flex items-center justify-center">✓</span>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`p-1 rounded-md ${config.iconBg}`}>{config.icon}</div>
                        <span className={`text-sm font-medium ${config.labelColor}`}>{config.label}</span>
                        {certified && (
                            <div className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                                <span>Certified</span>
                                <span className="w-3 h-3 bg-blue-600 rounded-full text-white flex items-center justify-center text-xs">✓</span>
                            </div>
                        )}
                    </div>

                    <h3 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>

                    <div className="flex flex-wrap gap-2 mb-auto">
                        {displayedTags.map((tag, index) => (
                            <span key={index} className={`text-xs px-2 py-1 rounded-md ${tag === priorityLabel ? priorityClass : 'bg-indigo-100 text-indigo-700'}`}>
                                {tag}
                            </span>
                        ))}
                        {remainingTagsCount > 0 && (
                            <span className="text-xs px-2 py-1 bg-gray-200 text-gray-600 rounded-md cursor-pointer" title={`+${remainingTagsCount} more tags`}>
                                +{remainingTagsCount}
                            </span>
                        )}
                    </div>

                    {progress !== undefined && (
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-gray-500">{progress === 0 ? "Not Started" : `Progress:`}</span>
                                {progress > 0 && <span className="text-xs font-medium text-gray-700">{progress}%</span>}
                            </div>
                            <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                {progress > 0 && <div className="h-full bg-green-500 rounded-full" style={{ width: `${progress}%` }} />}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default MaterialCard;