import { X } from "lucide-react";
import { getTypeDisplayName } from "../utils/helpers";


const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
    isOpen,
    onClose,
    activeFilters,
    materialTypes,
    allTags,
    toggleTypeFilter,
    toggleTagFilter,
    setStatusFilter,
    clearFilters
}) => {
    if (!isOpen) return null;

    const activeFilterCount = activeFilters.types.length + activeFilters.tags.length +
        (activeFilters.status !== "all" ? 1 : 0);

    return (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-500 bg-opacity-75 flex justify-end">
            <div className="w-80 bg-white h-full overflow-y-auto animate-slide-in-right">
                <div className="p-4 border-b">
                    <div className="flex justify-between items-center">
                        <h3 className="font-semibold text-gray-800">Filters</h3>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-gray-100"
                            aria-label="Close filter panel"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>
                </div>

                <div className="p-4">
                    {activeFilterCount > 0 && (
                        <button
                            onClick={clearFilters}
                            className="mb-4 text-sm text-indigo-600 hover:text-indigo-800"
                        >
                            Clear all filters
                        </button>
                    )}

                    {/* Status filter */}
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="status-mobile"
                                    checked={activeFilters.status === "all"}
                                    onChange={() => setStatusFilter("all")}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">All Status</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="status-mobile"
                                    checked={activeFilters.status === "not-started"}
                                    onChange={() => setStatusFilter("not-started")}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">Not Started</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="status-mobile"
                                    checked={activeFilters.status === "in-progress"}
                                    onChange={() => setStatusFilter("in-progress")}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">In Progress</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="status-mobile"
                                    checked={activeFilters.status === "complete"}
                                    onChange={() => setStatusFilter("complete")}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <span className="ml-2 text-sm text-gray-700">Complete</span>
                            </label>
                        </div>
                    </div>

                    {/* Material type filter */}
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Material Type</h4>
                        <div className="space-y-2">
                            {materialTypes.map(type => (
                                <label key={`mobile-${type}`} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={activeFilters.types.includes(type)}
                                        onChange={() => toggleTypeFilter(type)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{getTypeDisplayName(type)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Tags filter */}
                    <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                        <div className="space-y-2">
                            {allTags.map(tag => (
                                <label key={`mobile-${tag}`} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={activeFilters.tags.includes(tag)}
                                        onChange={() => toggleTagFilter(tag)}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">{tag}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Apply filters button */}
                    <button
                        onClick={onClose}
                        className="w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium mt-4"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MobileFilterDrawer;