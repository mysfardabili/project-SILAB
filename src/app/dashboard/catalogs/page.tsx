"use client";

import { useState } from "react";

import SearchBar from "./components/search-bar";
import FilterButton from "./components/filter-button";
import SortDropdown from "./components/sort-dropdown";
import ViewToggle from "./components/view-toggle";
import DesktopFilterPanel from "./components/desktop-filter-panel";
import MobileFilterDrawer from "./components/mobile-filter-drawer";
import ActiveFilterChips from "./components/active-filter-chips";
import { SAMPLE_MATERIALS } from "./sample-data";
import MaterialCard from "../components/material-card";
import MaterialListItem from "../components/material-list-item";
import { ViewMode } from "./components/view-toggle";

interface ActiveFilters {
    types: string[];
    tags: string[];
    status: "all" | "not-started" | "in-progress" | "complete";
}

const CatalogPage = () => {
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
        types: [],
        tags: [],
        status: "all",
    });

    // Extract unique tags and material types for filters
    const allTags: string[] = Array.from(new Set(SAMPLE_MATERIALS.flatMap(material => material.tags)));
    const materialTypes: string[] = Array.from(new Set(SAMPLE_MATERIALS.map(material => material.type)));

    // Toggle filter for material types
    const toggleTypeFilter = (type: string) => {
        setActiveFilters(prev => {
            if (prev.types.includes(type)) {
                return { ...prev, types: prev.types.filter(t => t !== type) };
            } else {
                return { ...prev, types: [...prev.types, type] };
            }
        });
    };

    // Toggle filter for tags
    const toggleTagFilter = (tag: string) => {
        setActiveFilters(prev => {
            if (prev.tags.includes(tag)) {
                return { ...prev, tags: prev.tags.filter(t => t !== tag) };
            } else {
                return { ...prev, tags: [...prev.tags, tag] };
            }
        });
    };

    // Set status filter
    const setStatusFilter = (status: "all" | "not-started" | "in-progress" | "complete") => {
        setActiveFilters(prev => ({ ...prev, status }));
    };

    // Clear all filters
    const clearFilters = () => {
        setActiveFilters({
            types: [],
            tags: [],
            status: "all"
        });
    };

    // Handle search
    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Filter materials based on active filters and search query
    const filteredMaterials = SAMPLE_MATERIALS.filter(material => {
        // Search filter
        if (searchQuery && !material.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        // Filter by type
        if (activeFilters.types.length > 0 && !activeFilters.types.includes(material.type)) {
            return false;
        }

        // Filter by tag
        if (activeFilters.tags.length > 0 && !material.tags.some(tag => activeFilters.tags.includes(tag))) {
            return false;
        }

        // Filter by status
        if (activeFilters.status === "not-started" && material.progress > 0) {
            return false;
        } else if (activeFilters.status === "in-progress" && (material.progress === 0 || material.progress === 100)) {
            return false;
        } else if (activeFilters.status === "complete" && material.progress !== 100) {
            return false;
        }

        return true;
    });

    // Count active filters
    const activeFilterCount = activeFilters.types.length + activeFilters.tags.length +
        (activeFilters.status !== "all" ? 1 : 0);

    // Shared filter props for both mobile and desktop
    const filterProps = {
        activeFilters,
        materialTypes,
        allTags,
        toggleTypeFilter,
        toggleTagFilter,
        setStatusFilter,
        clearFilters
    };

    return (
        <div className="py-6 px-4 md:py-8 md:px-8 lg:px-12 xl:px-24">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Learning Catalog</h1>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                    <SearchBar onSearch={handleSearch} />

                    <FilterButton
                        activeFilterCount={activeFilterCount}
                        onClick={() => setFilterMenuOpen(true)}
                    />

                    <SortDropdown />

                    <ViewToggle
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Desktop Filter Panel */}
                <DesktopFilterPanel {...filterProps} />

                {/* Mobile Filter Drawer */}
                <MobileFilterDrawer
                    isOpen={filterMenuOpen}
                    onClose={() => setFilterMenuOpen(false)}
                    {...filterProps}
                />

                {/* Main Content Area */}
                <div className="flex-1">
                    {/* Active Filters Display */}
                    <ActiveFilterChips
                        activeFilters={activeFilters}
                        toggleTypeFilter={toggleTypeFilter}
                        toggleTagFilter={toggleTagFilter}
                        setStatusFilter={setStatusFilter}
                        clearFilters={clearFilters}
                    />

                    {/* Materials count */}
                    <div className="mb-4 text-sm text-gray-600">
                        Showing {filteredMaterials.length} {filteredMaterials.length === 1 ? 'material' : 'materials'}
                    </div>

                    {/* Materials Display */}
                    {filteredMaterials.length > 0 ? (
                        <div className={viewMode === "grid"
                            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                            : "space-y-4"}
                        >
                            {filteredMaterials.map((material) =>
                                viewMode === "grid" ? (
                                    <MaterialCard key={material.id} {...material} type={material.type as "course" | "quiz" | "learning-path" | "page"} />

                                ) : (
                                    <MaterialListItem key={material.id} {...material} type={material.type as "course" | "quiz" | "learning-path" | "page"} />
                                )
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No materials match your filters</p>
                            <button
                                onClick={clearFilters}
                                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CatalogPage;