"use client";

import { Search, SortAsc, Grid, List, ChevronDown } from "lucide-react";
import LastCoursesCard from "../home/components/last-courses-card";
import MaterialCard from "../components/material-card";
import placeholderImage from '../../../../public/placeholder-img.jpg';
import { useState, useMemo } from "react";
import MaterialListItem from "../components/material-list-item";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LearningPage = () => {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [statusFilter, setStatusFilter] = useState<"all" | "not-started" | "in-progress" | "complete">("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<"title" | "progress" | "type" | "priority">("title");

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
        {
            id: "advanced-react",
            type: "course" as const,
            title: "Advanced React Development Patterns",
            tags: ["Frontend", "JavaScript"],
            totalItems: 15,
            itemType: "Modules",
            isPriority: true,
            progress: 100,
        },
        {
            id: "database-design",
            type: "quiz" as const,
            title: "Database Design Fundamentals Quiz",
            tags: ["Backend", "Database"],
            totalItems: 25,
            itemType: "Questions",
            isPriority: false,
            certified: true,
            progress: 75,
        }
    ];

    // Function to get status from progress
    const getStatus = (progress: number) => {
        if (progress === 0) return "not-started";
        if (progress === 100) return "complete";
        return "in-progress";
    };

    // Filter and sort materials
    const filteredAndSortedMaterials = useMemo(() => {
        let filtered = materials;

        // Filter by status
        if (statusFilter !== "all") {
            filtered = filtered.filter(material => getStatus(material.progress) === statusFilter);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(material =>
                material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Sort materials
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "title":
                    return a.title.localeCompare(b.title);
                case "progress":
                    return b.progress - a.progress;
                case "type":
                    return a.type.localeCompare(b.type);
                case "priority":
                    return b.isPriority ? 1 : -1;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [statusFilter, searchQuery, sortBy]);

    const statusCounts = {
        all: materials.length,
        "not-started": materials.filter(m => getStatus(m.progress) === "not-started").length,
        "in-progress": materials.filter(m => getStatus(m.progress) === "in-progress").length,
        complete: materials.filter(m => getStatus(m.progress) === "complete").length,
    };

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
                All Materials ({filteredAndSortedMaterials.length})
            </h2>

            {/* Filter chips and controls section */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
                {/* Status filters - left side */}
                <div className="flex flex-wrap gap-2">
                    <button 
                        onClick={() => setStatusFilter("all")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            statusFilter === "all"
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        All Status ({statusCounts.all})
                    </button>
                    <button 
                        onClick={() => setStatusFilter("not-started")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            statusFilter === "not-started"
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Not Started ({statusCounts["not-started"]})
                    </button>
                    <button 
                        onClick={() => setStatusFilter("in-progress")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            statusFilter === "in-progress"
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        In Progress ({statusCounts["in-progress"]})
                    </button>
                    <button 
                        onClick={() => setStatusFilter("complete")}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            statusFilter === "complete"
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        Complete ({statusCounts.complete})
                    </button>
                </div>

                {/* Controls - right side */}
                <div className="flex flex-wrap items-center gap-2">
                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search materials"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>

                    {/* Sort dropdown */}
                    <Select value={sortBy} onValueChange={(value: "title" | "progress" | "type" | "priority") => setSortBy(value)}>
                        <SelectTrigger className="w-40">
                            <div className="flex items-center gap-2">
                                <SortAsc className="h-4 w-4" />
                                <SelectValue placeholder="Sort By" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="title">Title A-Z</SelectItem>
                            <SelectItem value="progress">Progress</SelectItem>
                            <SelectItem value="type">Type</SelectItem>
                            <SelectItem value="priority">Priority</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Display toggle */}
                    <div className="flex border rounded-md overflow-hidden">
                        <button
                            className={`flex items-center justify-center p-2 w-10 transition-colors ${
                                viewMode === "grid" 
                                    ? "bg-indigo-500 text-white" 
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                            onClick={() => setViewMode("grid")}
                        >
                            <Grid className="h-4 w-4" />
                        </button>
                        <button
                            className={`flex items-center justify-center p-2 w-10 transition-colors ${
                                viewMode === "list" 
                                    ? "bg-indigo-500 text-white" 
                                    : "bg-white text-gray-700 hover:bg-gray-50"
                            }`}
                            onClick={() => setViewMode("list")}
                        >
                            <List className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* No results message */}
            {filteredAndSortedMaterials.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                        <Search className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-600 mb-2">No materials found</h3>
                    <p className="text-gray-500">
                        Try adjusting your search or filter criteria
                    </p>
                    <button 
                        onClick={() => {
                            setSearchQuery("");
                            setStatusFilter("all");
                        }}
                        className="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {/* Materials display */}
            {filteredAndSortedMaterials.length > 0 && (
                <div className={viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                    : "space-y-6"}
                >
                    {filteredAndSortedMaterials.map((material) =>
                        viewMode === "grid" ? (
                            <MaterialCard key={material.id} {...material} />
                        ) : (
                            <MaterialListItem key={material.id} {...material}/>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default LearningPage;