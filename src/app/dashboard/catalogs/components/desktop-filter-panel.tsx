import { getTypeDisplayName } from "../utils/helpers";



const DesktopFilterPanel: React.FC<DesktopFilterPanelProps> = ({
    activeFilters,
    materialTypes,
    allTags,
    toggleTypeFilter,
    toggleTagFilter,
    setStatusFilter,
    clearFilters
}) => {
    const activeFilterCount = activeFilters.types.length + activeFilters.tags.length +
        (activeFilters.status !== "all" ? 1 : 0);

    return (
        <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800">Filters</h3>
                    {activeFilterCount > 0 && (
                        <button
                            onClick={clearFilters}
                            className="text-sm text-indigo-600 hover:text-indigo-800"
                        >
                            Clear all
                        </button>
                    )}
                </div>

                {/* Status filter */}
                <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Status</h4>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="status"
                                checked={activeFilters.status === "all"}
                                onChange={() => setStatusFilter("all")}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">All Status</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="status"
                                checked={activeFilters.status === "not-started"}
                                onChange={() => setStatusFilter("not-started")}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">Not Started</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="status"
                                checked={activeFilters.status === "in-progress"}
                                onChange={() => setStatusFilter("in-progress")}
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <span className="ml-2 text-sm text-gray-700">In Progress</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="status"
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
                            <label key={type} className="flex items-center">
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
                <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Tags</h4>
                    <div className="space-y-2">
                        {allTags.map(tag => (
                            <label key={tag} className="flex items-center">
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
            </div>
        </div>
    );
};

export default DesktopFilterPanel;