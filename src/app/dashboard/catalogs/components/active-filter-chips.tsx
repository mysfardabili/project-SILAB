import { X } from "lucide-react";
import { getTypeDisplayName, getStatusDisplayName } from "../utils/helpers";


const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
    activeFilters,
    toggleTypeFilter,
    toggleTagFilter,
    setStatusFilter,
    clearFilters
}) => {
    const activeFilterCount = activeFilters.types.length + activeFilters.tags.length +
        (activeFilters.status !== "all" ? 1 : 0);

    if (activeFilterCount === 0) return null;

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {activeFilters.status !== "all" && (
                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <span>{getStatusDisplayName(activeFilters.status)}</span>
                    <button
                        onClick={() => setStatusFilter("all")}
                        className="ml-1 hover:text-indigo-600"
                        aria-label="Remove status filter"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            )}

            {activeFilters.types.map(type => (
                <div key={`chip-${type}`} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <span>{getTypeDisplayName(type)}</span>
                    <button
                        onClick={() => toggleTypeFilter(type)}
                        className="ml-1 hover:text-indigo-600"
                        aria-label={`Remove ${type} filter`}
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            ))}

            {activeFilters.tags.map(tag => (
                <div key={`chip-${tag}`} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <span>{tag}</span>
                    <button
                        onClick={() => toggleTagFilter(tag)}
                        className="ml-1 hover:text-indigo-600"
                        aria-label={`Remove ${tag} filter`}
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            ))}

            <button
                onClick={clearFilters}
                className="text-sm text-gray-600 hover:text-gray-800 flex items-center"
            >
                Clear all
            </button>
        </div>
    );
};

export default ActiveFilterChips;