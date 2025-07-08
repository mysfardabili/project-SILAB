import { Filter } from "lucide-react";



const FilterButton: React.FC<FilterButtonProps> = ({ activeFilterCount, onClick }) => {
    return (
        <button
            className="md:hidden flex items-center gap-1 px-3 py-2 border rounded-md text-sm bg-white hover:bg-gray-50"
            onClick={onClick}
        >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
                <span className="ml-1 bg-indigo-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {activeFilterCount}
                </span>
            )}
        </button>
    );
};

export default FilterButton;