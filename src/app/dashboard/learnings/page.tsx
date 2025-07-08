"use client";

import { Search, SortAsc, Grid, List, ChevronDown } from "lucide-react";
import LastCoursesCard from "../home/components/last-courses-card";
import MaterialCard from "../components/material-card";
import placeholderImage from '../../../../public/placeholder-img.jpg';
import { useState } from "react";
import MaterialListItem from "../components/material-list-item";

const LearningPage = () => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

    const materials = [
        {
            id: "user-experience-optimization",
            type: "quiz" as const,
            title: "5 Steps Optimizing User Experience",
            tags: ["UI/UX Design"],
            totalItems: 20,
            itemType: "Question",
            isPriority: true,
            certified: true,
            progress: 0,
        },
        {
            id: "usability-principles",
            type: "page" as const,
            title: "Heuristics: 10 Usability Principles To improve UI Design",
            tags: ["Learning Design", "Not Urgent"],
            totalItems: 12,
            itemType: "Chapters",
            isPriority: false,
            progress: 40,
        },
        {
            id: "general-knowledge",
            type: "learning-path" as const,
            title: "General Knowledge & Methodology - Layout & Spacing",
            tags: ["Consistency"],
            totalItems: 20,
            itemType: "Path",
            isPriority: false,
            progress: 0,
        },
        {
            id: "ui-design-mastery",
            type: "course" as const,
            title: "Mastering UI Design for Impactful Solutions",
            tags: ["UI/UX Design"],
            totalItems: 12,
            itemType: "Materials",
            isPriority: false,
            progress: 50,
        },
    ];

    return (
        <div className="py-6 px-4 md:py-8 md:px-8 lg:px-12 xl:px-24 space-y-6 md:space-y-8">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                Continue Learning
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <LastCoursesCard
                    id="ui-ux-best-practices"
                    title="Creating Engaging Learning Journeys: UI/UX Best Practices"
                    progress={80}
                    materialsCount={12}
                    imageUrl={placeholderImage}
                />
                <LastCoursesCard
                    id="ui-ux-best-practices"
                    title="Creating Engaging Learning Journeys: UI/UX Best Practices"
                    progress={80}
                    materialsCount={12}
                    imageUrl={placeholderImage}
                />
            </div>

            <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                All Materials
            </h2>

            {/* Filter chips and controls section */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Status filters - left side */}
                <div className="flex flex-wrap gap-2">
                    <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium hover:bg-indigo-200 transition-colors">
                        All Status
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                        Not Started
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                        In Progress
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors">
                        Complete
                    </button>
                </div>

                {/* Controls - right side */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search materials"
                            className="pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>

                    {/* Sort dropdown */}
                    <button className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm hover:bg-gray-50">
                        <SortAsc className="h-4 w-4" />
                        <span>Sort By</span>
                        <ChevronDown className="h-3 w-3 ml-1" />
                    </button>

                    {/* Display toggle */}
                    <div className="flex border rounded-md overflow-hidden">
                        <button
                            className={`flex items-center justify-center p-2 w-10 ${viewMode === "grid" ? "bg-indigo-500 text-white" : "bg-white text-gray-700"}`}
                            onClick={() => setViewMode("grid")}
                        >
                            <Grid className="h-4 w-4" />
                        </button>
                        <button
                            className={`flex items-center justify-center p-2 w-10 ${viewMode === "list" ? "bg-indigo-500 text-white" : "bg-white text-gray-700"}`}
                            onClick={() => setViewMode("list")}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Materials display */}
            <div className={viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                : "space-y-6"}
            >
                {materials.map((material) =>
                    viewMode === "grid" ? (
                        <MaterialCard key={material.id} {...material} />
                    ) : (
                        <MaterialListItem key={material.id} {...material}/>
                    )
                )}
            </div>
        </div>
    );
};

export default LearningPage;