"use client";

import { FC } from "react";
import { Copy, BookOpen, LineChart, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MaterialListItemProps {
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

const MaterialListItem: FC<MaterialListItemProps> = ({
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
        quiz: { icon: <Copy className="h-4 w-4 text-white" />, color: "bg-amber-500", label: "Quiz" },
        page: { icon: <BookOpen className="h-4 w-4 text-white" />, color: "bg-teal-500", label: "Page" },
        "learning-path": { icon: <LineChart className="h-4 w-4 text-white" />, color: "bg-purple-500", label: "Learning Path" },
        course: { icon: <Layers className="h-4 w-4 text-white" />, color: "bg-blue-500", label: "Course" },
    };

    const config = typeConfig[type];
    const priorityLabel = isPriority ? "Urgent" : "Not Urgent";
    const priorityClass = isPriority ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600";

    const displayedTags = [...tags, priorityLabel].slice(0, 3);

    return (
        <Link href={`/learning/${type}/${id}`} >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 border border-gray-200 rounded-lg p-4 hover:shadow-md transition mb-4">
                {imageUrl && (
                    <div className="relative w-full md:w-48 h-32 md:h-24 rounded-lg overflow-hidden">
                        <Image src={imageUrl} alt={title} fill className="object-cover" />
                    </div>
                )}

                <div className="flex flex-col gap-2 flex-grow">
                    <div className="flex items-center gap-2">
                        <div className={`p-1 rounded-md ${config.color}`}>{config.icon}</div>
                        <span className="text-sm font-medium text-gray-700">{config.label}</span>
                        {certified && (
                            <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                                Certified ✓
                            </span>
                        )}
                    </div>

                    <h3 className="text-base font-semibold text-gray-800 line-clamp-2">{title}</h3>

                    <div className="flex flex-wrap gap-2">
                        {displayedTags.map((tag, index) => (
                            <span key={index} className={`text-xs px-2 py-1 rounded-md ${tag === priorityLabel ? priorityClass : 'bg-indigo-100 text-indigo-700'}`}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    {progress !== undefined && (
                        <div className="mt-2">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>{progress === 0 ? "Not Started" : "Progress:"}</span>
                                {progress > 0 && <span className="font-medium text-gray-700">{progress}%</span>}
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                {progress > 0 && (
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${progress}%` }} />
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default MaterialListItem;
