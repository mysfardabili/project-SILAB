import { SortAsc, ChevronDown } from "lucide-react";
import { useState } from "react";



const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState<string>("newest");

  const sortOptions: SortOption[] = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "a-z", label: "A-Z" },
    { value: "z-a", label: "Z-A" },
    { value: "progress", label: "Progress" }
  ];

  const handleSort = (value: string) => {
    setSortOption(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <SortAsc className="h-4 w-4" />
        <span>Sort By</span>
        <ChevronDown className="h-3 w-3 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-10">
          <ul className="py-1">
            {sortOptions.map(option => (
              <li key={option.value}>
                <button
                  className={`w-full text-left px-4 py-2 text-sm ${sortOption === option.value ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={() => handleSort(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;